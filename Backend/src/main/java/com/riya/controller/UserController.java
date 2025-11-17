package com.riya.controller;

import com.riya.request.ForgotPasswordTokenRequest;
import com.riya.Utils.OtpUtils;
import com.riya.domain.VerificationType;
import com.riya.modal.ForgotPasswordToken;
import com.riya.modal.User;
import com.riya.modal.VerificationCode;
import com.riya.request.ResetPasswordRequest;
import com.riya.response.ApiResponse;
import com.riya.response.AuthResponse;
import com.riya.service.EmailService;
import com.riya.service.ForgotPasswordService;
import com.riya.service.UserService;
import com.riya.service.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt)  {

        User user = userService.findUserProfileByJwt(jwt);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }





//    @GetMapping("/api/users/profile")
//    public ResponseEntity<String> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws Exception  {
//
//        User user = userService.findUserProfileByJwt(jwt);
//        user.setPassword(null);
//
//        return new ResponseEntity<>("verification otp sent Successfully", HttpStatus.OK);
//    }

    @PostMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<User> sendVerificationOtp(
            @RequestHeader("Authorization") String jwt,
            @PathVariable VerificationType verificationType) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        user.setPassword(null);


        VerificationCode verificationCode = verificationCodeService.
                    getVerificationCodeByUser(user.getId());

        if (verificationCode != null) {
            verificationCode=verificationCodeService
                    .sendVerificationCode(user,verificationType);
        }
        if(verificationType.equals(VerificationType.EMAIL)){
            emailService.sendVerificationOtpEmail(user.getEmail(), verificationCode.getOtp());
        }

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }


@PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication(
            @PathVariable String otp,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        user.setPassword(null);

        VerificationCode verificationCode=verificationCodeService.getVerificationCodeByUser(user.getId());

        String sendTo=verificationCode.getVerificationType().equals(VerificationType.EMAIL)?
                verificationCode.getEmail():verificationCode.getMobile();

        boolean isVerified =verificationCode.getOtp().equals(otp);

        if(isVerified){
            User updatedUser=userService.enableTwoFactorAuthentication(
                    verificationCode.getVerificationType(),sendTo,user);

            verificationCodeService.deleteVerificationCodeId(verificationCode);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }

        throw new Exception("Wrong OTP");
    }


    @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(

            @RequestBody ForgotPasswordTokenRequest req) throws Exception {

        User user = userService.findUserByEmail(req.getSendTo());
        String otp = OtpUtils.generateOTP();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());

        if(token==null){
            token = forgotPasswordService.createToken(user,id,otp,req.getVerificationType(),req.getSendTo());
        }

        if(req.getVerificationType().equals(VerificationType.EMAIL)){
            emailService.sendVerificationOtpEmail(user.getEmail(), token.getOtp());
        }

        AuthResponse response = new AuthResponse();
        response.setSession(token.getId());
        response.setMessage("Password reset otp  sent Successfully");


        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String id,
            @RequestBody ResetPasswordRequest req,
            @RequestHeader("Authorization") String jwt) throws Exception {


        ForgotPasswordToken forgotPasswordToken=forgotPasswordService.findById(id);

       boolean isVerified = forgotPasswordToken.getOtp().equals(req.getOtp());
       if(isVerified){
           userService.updatePassword(forgotPasswordToken.getUser(), req.getPassword());
           ApiResponse res = new ApiResponse();
           res.setMessage("Password updated Successfully");
           return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
       }
       throw new Exception("Wrong OTP");
    }


}
