package trading_dashboard.backend.response;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class BaseResponse<T> {
    private Boolean success;
    private T data;
    private Instant timestamp;
    private String message;
    private String errorCode;

    public static <T> BaseResponse<T> success() {
        return new BaseResponse(true, (Object)null, Instant.now(), (String)null, (String)null);
    }

    public static <T> BaseResponse<T> success(T data) {
        return new BaseResponse(true, data, Instant.now(), (String)null, (String)null);
    }

    public static <T> BaseResponse<T> error() {
        return new BaseResponse(false, (Object)null, Instant.now(), (String)null, (String)null);
    }

    public static <T> BaseResponse<T> error(String message, String errorCode) {
        return new BaseResponse(false, (Object)null, Instant.now(), message, errorCode);
    }

    public String toString() {
        return "BaseResponse(success=" + this.getSuccess() + ", data=" + this.getData() + ", timestamp=" + this.getTimestamp() + ", message=" + this.getMessage() + ", errorCode=" + this.getErrorCode() + ")";
    }

    public BaseResponse(Boolean success, T data, Instant timestamp, String message, String errorCode) {
        this.success = success;
        this.data = data;
        this.timestamp = timestamp;
        this.message = message;
        this.errorCode = errorCode;
    }

    public BaseResponse() {
    }
}
