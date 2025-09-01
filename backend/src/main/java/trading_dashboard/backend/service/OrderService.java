package trading_dashboard.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import trading_dashboard.backend.dto.OrderDTO;
import trading_dashboard.backend.dto.SymbolDTO;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private static final Path BASE_DIR = Path.of("db-files/orders");
    private final ObjectMapper objectMapper;

    public OrderService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<OrderDTO> parseOrders(String symbol) {
        String fileName = "db-files/orders/" + symbol + ".json";
        ClassPathResource resource = new ClassPathResource(fileName);

        if (!resource.exists()) {
            return new ArrayList<>();
        }


        try (InputStream is = resource.getInputStream()) {
            return objectMapper.readValue(is, new TypeReference<>() {});
        } catch (IOException e) {
            throw new RuntimeException("Failed to read orders for symbol " + symbol, e);
        }
    }
}
