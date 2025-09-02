package trading_dashboard.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import trading_dashboard.backend.dto.CreateOrderDTO;
import trading_dashboard.backend.dto.OrderDTO;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class OrderService {

    private static final Path BASE_DIR = Path.of("db-files/orders");
    private final ObjectMapper objectMapper;

    public OrderService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<OrderDTO> parseOrders(String symbol) throws IOException {
        Path file = BASE_DIR.resolve(symbol + ".json");
        if (!Files.exists(file) || Files.size(file) == 0) {
            return new ArrayList<>();
        }
        try (InputStream is = Files.newInputStream(file)) {
            return objectMapper.readValue(is, new TypeReference<>() {});
        } catch (IOException e) {
            throw new RuntimeException("Failed to read orders for symbol " + symbol, e);
        }
    }

    public OrderDTO saveOrder(CreateOrderDTO orderMeta) {
        final String symbol = orderMeta.getSymbol().toUpperCase(Locale.ROOT);
        final String side = orderMeta.getSide().toUpperCase(Locale.ROOT);

        try {
            Files.createDirectories(BASE_DIR);
            Path file = BASE_DIR.resolve(symbol + ".json");

            // Step 2: Load existing orders (if any)
            List<OrderDTO> existing;
            if (Files.exists(file) && Files.size(file) > 0) {
                try (InputStream is = Files.newInputStream(file)) {
                    existing = objectMapper.readValue(is, new com.fasterxml.jackson.core.type.TypeReference<List<OrderDTO>>() {});
                }
            } else {
                existing = new ArrayList<>();
            }

            // Step 3: Generate next id
            int nextId = existing.stream()
                    .mapToInt(OrderDTO::getId)
                    .max()
                    .orElse(0) + 1;

            // Step 4: Build new order
            OrderDTO newOrder = new OrderDTO();
            newOrder.setId(nextId);
            newOrder.setSymbol(symbol);
            newOrder.setSide(side); // validated already
            newOrder.setQty(orderMeta.getQty());
            newOrder.setPrice(orderMeta.getPrice());
            newOrder.setTimestamp(System.currentTimeMillis() / 1000);

            existing.add(newOrder);

            // Step 5: Persist atomically
            Path tmp = Files.createTempFile(BASE_DIR, symbol + "_", ".json");
            objectMapper.writeValue(tmp.toFile(), existing);
            Files.move(tmp, file,
                    StandardCopyOption.REPLACE_EXISTING,
                    StandardCopyOption.ATOMIC_MOVE);

            return newOrder;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save order for symbol " + orderMeta.getSymbol(), e);
        }
    }
}
