package com.riya.service;

import com.riya.modal.PaymentDetails;
import com.riya.modal.User;
import org.springframework.web.bind.annotation.RequestHeader;

public interface PaymentDetailsService {

    public PaymentDetails addPaymentDetails(String accountNumber,
                                            String accountHolderName,
                                            String ifsc,
                                            String bankName,
                                            User user);

    public PaymentDetails getUsersPaymentDetails(User user);

}
