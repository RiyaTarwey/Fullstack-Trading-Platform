package com.riya.service;

import com.riya.domain.VerificationType;
import com.riya.modal.User;
import com.riya.modal.VerificationCode;

public interface VerificationCodeService {
    VerificationCode sendVerificationCode(User user, VerificationType verificationType);

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUser(Long userId);

    void deleteVerificationCodeId(VerificationCode verificationCode);
}
