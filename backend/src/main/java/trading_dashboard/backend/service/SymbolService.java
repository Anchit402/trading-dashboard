package trading_dashboard.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import trading_dashboard.backend.dto.SymbolDTO;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class SymbolService {

    private final ObjectMapper objectMapper;

    public SymbolService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<SymbolDTO> loadSymbols() {
        try (InputStream is = getClass().getResourceAsStream("/db-files/symbols.json")) {
            if (is == null) {
                throw new IllegalStateException("symbols.json not found in resources!");
            }
            return objectMapper.readValue(is, new TypeReference<>() {});
        } catch (IOException e) {
            throw new RuntimeException("Failed to load symbols.json", e);
        }
    }
}
