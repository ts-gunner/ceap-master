package com.forty.ceap.handler;



import com.forty.ceap.enums.ErrorCode;
import com.forty.ceap.exception.BusinessException;
import com.forty.ceap.response.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.MessageFormat;

@Slf4j
public class WebAppExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public BaseResponse<Object> exceptionHandler(Exception e) {
        if (e instanceof BusinessException businessException) {
            return new BaseResponse<>(businessException.getCode(), businessException.getMessage());
        }
        else if (e instanceof MethodArgumentNotValidException validException) {
            return new BaseResponse<>(ErrorCode.PARAM_ERROR.getCode(), validException.getBindingResult().getFieldError().getDefaultMessage());
        }

        log.error(MessageFormat.format("【system error】: {0}", e.getMessage()));
        return new BaseResponse<>(ErrorCode.SYSTEM_ERROR);
    }
}
