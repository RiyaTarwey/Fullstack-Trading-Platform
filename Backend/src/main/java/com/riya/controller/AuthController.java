package com.riya.controller;

import com.riya.Utils.OtpUtils;
import com.riya.config.JwtProvider;
import com.riya.modal.TwoFactorOTP;
import com.riya.modal.User;
import com.riya.repository.UserRepository;
import com.riya.response.AuthResponse;
import com.riya.service.CustomUserDetailsService;
import com.riya.service.EmailService;
import com.riya.service.TwoFactorOtpService;
import com.riya.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private TwoFactorOtpService twoFactorOtpService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private WatchlistService watchlistService;
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) {

        User isEmailExists = userRepository.findByEmail(user.getEmail());
        if (isEmailExists != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already used with another account");
        }

        User newUser = new User();

        newUser.setFullName(user.getFullName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(
                NoOpPasswordEncoder.getInstance().encode(user.getPassword())
        );


        // role and twoFactorAuth automatically set by entity defaults

        User savedUser = userRepository.save(newUser);
        watchlistService.createWatchList(savedUser);

        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                user.getPassword()
        );

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("register success");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }



    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) {
        String userName=user.getEmail();
        String password=user.getPassword();




        Authentication auth=authenticate(userName,password);

        SecurityContextHolder.getContext().setAuthentication(auth);


        String jwt= JwtProvider.generateToken(auth);

        User authUser=userRepository.findByEmail(userName);


        if(user.getTwoFactorAuth().isEnabled()){
            AuthResponse res=new AuthResponse();
            res.setMessage("Two-Factor auth is enabled");
            res.setTwoFactorAuthEnabled(true);
            String otp= OtpUtils.generateOTP();

            TwoFactorOTP oldTwoFactorOtp=twoFactorOtpService.findByUser(authUser.getId());
            if(oldTwoFactorOtp!=null){
                twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOtp);

            }
            TwoFactorOTP newTwoFactorOtp=twoFactorOtpService.createTwoFactorOtp(authUser,otp,jwt);

            try {
                emailService.sendVerificationOtpEmail(userName, otp);
            } catch (jakarta.mail.MessagingException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send OTP email", e);
            }

            res.setSession(newTwoFactorOtp.getId());
            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }

        AuthResponse res=new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("login success");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    private Authentication authenticate(String userName, String password) {

        UserDetails userDetails= customUserDetailsService.loadUserByUsername(userName);

        if(userDetails==null) {
            throw new BadCredentialsException("Invalid username");
        }
       if(!password.equals(userDetails.getPassword())) {
           throw new BadCredentialsException("Invalid password");

       }


    return  new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
    }
@PostMapping("/two-factor/otp/{otp}")
public ResponseEntity<AuthResponse> verifySignInOtp(
        @PathVariable String otp,
        @RequestParam String id ) throws Exception{


        TwoFactorOTP twoFactorOTP = twoFactorOtpService.findById(id);

    if(twoFactorOtpService.verifyTwofactorOtp(twoFactorOTP,otp)){
AuthResponse res=new AuthResponse();
res.setMessage("Two factor authentication verified");
res.setTwoFactorAuthEnabled(true);
res.setJwt(twoFactorOTP.getJwt());
return new ResponseEntity<>(res, HttpStatus.OK);
}
throw new Exception("invalid otp");
}
}
