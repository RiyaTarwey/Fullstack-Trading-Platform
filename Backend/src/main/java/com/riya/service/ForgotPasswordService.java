package com.riya.service;

import com.riya.domain.VerificationType;
import com.riya.modal.ForgotPasswordToken;
import com.riya.modal.User;

public interface ForgotPasswordService {

    ForgotPasswordToken createToken(User user,
                                    String id, String otp,
                                    VerificationType verificationType,
                                    String sendTo);

    ForgotPasswordToken findById(String id);

    ForgotPasswordToken findByUser(Long  userId);

    void deleteToken(ForgotPasswordToken token);
}
