package com.riya.request;

import com.riya.domain.VerificationType;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String Otp;
    private String password;
}
