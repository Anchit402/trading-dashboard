package trading_dashboard.backend.controller;

import org.springframework.web.bind.annotation.*;
import trading_dashboard.backend.dto.OrderDTO;
import trading_dashboard.backend.response.BaseResponse;
import trading_dashboard.backend.service.OrderService;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders/{symbol}")
    public BaseResponse<List<OrderDTO>> getOrders(@PathVariable String symbol) {
        return BaseResponse.success(orderService.parseOrders(symbol));
    }
}
