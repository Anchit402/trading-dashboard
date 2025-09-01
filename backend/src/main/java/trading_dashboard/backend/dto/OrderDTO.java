package trading_dashboard.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                   // Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor      // Generates no-args constructor
@AllArgsConstructor     // Generates all-args constructor
public class OrderDTO {
    private Integer id;
    private String symbol;
    private String side;
    private Integer qty;
    private Double price;
    private Long timestamp;
}