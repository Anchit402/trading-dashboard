package trading_dashboard.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import trading_dashboard.backend.dto.SymbolDTO;
import trading_dashboard.backend.service.SymbolService;

import java.io.IOException;
import java.util.List;

@RestController
public class SymbolController {

    private final SymbolService symbolService;

    public SymbolController(SymbolService symbolService) {
        this.symbolService = symbolService;
    }

    @GetMapping("/symbols")
    public List<SymbolDTO> getSymbols() throws IOException {
        List<SymbolDTO> a = symbolService.loadSymbols();
        return a;
    }
}
