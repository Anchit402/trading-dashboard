package trading_dashboard.backend.ticker;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import trading_dashboard.backend.dto.SymbolDTO;
import trading_dashboard.backend.service.SymbolService;

import java.io.IOException;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.*;

@Component
public class TickWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper mapper = new ObjectMapper();
    private final Map<WebSocketSession, Set<String>> subscriptions = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private final SymbolService symbolService;
    private final List<SymbolDTO> Symbols;

    public TickWebSocketHandler(SymbolService symbolService) {
        scheduler.scheduleAtFixedRate(this::broadcastTicks, 1, 1, TimeUnit.SECONDS);
        this.symbolService = symbolService;
        this.Symbols = this.symbolService.loadSymbols();
    }


    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        subscriptions.put(session, ConcurrentHashMap.newKeySet());
        System.out.println("Client connected: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        JsonNode json = mapper.readTree(message.getPayload());
        String action = json.get("action").asText();
        String symbol = json.get("symbol").asText();

        if ("subscribe".equalsIgnoreCase(action)) {
            subscriptions.get(session).add(symbol);
        }
        else if ("unsubscribe".equalsIgnoreCase(action)) {
            subscriptions.get(session).remove(symbol);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        subscriptions.remove(session);
        System.out.println("Client disconnected: " + session.getId());
    }

    private void broadcastTicks() {
        for (WebSocketSession key : subscriptions.keySet()) {
            WebSocketSession session = key;
            if (!session.isOpen()) continue;

            Set<String> symbols = subscriptions.get(key);
            for (String symbol : symbols) {
                try {
                    Map<String, Object> tick = generateTick(symbol);
                    String json = mapper.writeValueAsString(tick);
                    session.sendMessage(new TextMessage(json));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private Map<String, Object> generateTick(String symbol) {
        int volume = (int) (Math.random() * 100) + 1;
        long timestamp = Instant.now().getEpochSecond();

        Map<String, Object> tick = new HashMap<>();

        tick.put("symbol", symbol);
        tick.put("price", Math.round(computeRandomPriceWithinClosePriceRange(symbol) * 100.0) / 100.0);
        tick.put("volume", volume);
        tick.put("timestamp", timestamp);
        return tick;
    }

    private double computeRandomPriceWithinClosePriceRange(String symbol) {
        double closePrice = Symbols.stream()
                .filter(s -> s.getSymbol().equals(symbol))
                .map(SymbolDTO::getClosePrice)   // extract price
                .findFirst()
                .orElse(0.0);


        if (closePrice <= 0) {
            return 0.0; // fallback for invalid symbols
        }

        // ±5% range
        double min = closePrice * 0.95;
        double max = closePrice * 1.05;

        // random value in range
        return min + (max - min) * (new Random()).nextDouble();
    }
}

