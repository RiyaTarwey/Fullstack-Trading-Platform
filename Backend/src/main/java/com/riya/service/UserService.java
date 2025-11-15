package com.riya.service;

import com.riya.domain.VerificationType;
import com.riya.modal.User;

public interface UserService {

    public User findUserProfileByJwt(String jwt);

    public User findUserByEmail(String email);

    public User findUserById(Long userId) throws Exception;

    public User enableTwoFactorAuthentication(VerificationType verificationType, String sendTo, User user);

    User updatePassword(User user, String newPassword);


}
