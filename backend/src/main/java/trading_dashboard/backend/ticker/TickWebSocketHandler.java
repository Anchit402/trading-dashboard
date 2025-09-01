package trading_dashboard.backend.ticker;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.*;

@Component
public class TickWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper mapper = new ObjectMapper();
    private final Map<WebSocketSession, Set<String>> subscriptions = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public TickWebSocketHandler() {
        scheduler.scheduleAtFixedRate(this::broadcastTicks, 1, 1, TimeUnit.SECONDS);
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
            System.out.println("Subscribed to " + symbol + " for session " + session.getId());
        } else if ("unsubscribe".equalsIgnoreCase(action)) {
            subscriptions.get(session).remove(symbol);
            System.out.println("Unsubscribed from " + symbol + " for session " + session.getId());
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

            try {
                session.sendMessage(new TextMessage("sent"));
            } catch (IOException e) {
                e.printStackTrace();
            }

//            for (String symbol : subscriptions.get(key)) {
//
//                try {
//                    Map<String, Object> tick = generateTick(symbol);
//                    String json = mapper.writeValueAsString(tick);
//                    session.sendMessage(new TextMessage(json));
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
        }
    }

    private Map<String, Object> generateTick(String symbol) {
        double price = 180 + Math.random() * 5; // $180–185 range
        int volume = (int) (Math.random() * 100) + 1;
        long timestamp = Instant.now().getEpochSecond();

        Map<String, Object> tick = new HashMap<>();
        tick.put("symbol", symbol);
        tick.put("price", Math.round(price * 100.0) / 100.0);
        tick.put("volume", volume);
        tick.put("timestamp", timestamp);
        return tick;
    }
}

