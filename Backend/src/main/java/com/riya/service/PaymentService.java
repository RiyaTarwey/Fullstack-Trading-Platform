package com.riya.service;

import com.razorpay.RazorpayException;
import com.riya.domain.PaymentMethod;
import com.riya.modal.PaymentOrder;
import com.riya.modal.User;
import com.riya.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user, Long amount,
                             PaymentMethod paymentMethod);
    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    Boolean ProccedPaymentOrder(PaymentOrder paymentOrder,String paymentId) throws RazorpayException;

    PaymentResponse createRazorPaymentLing(User user, Long amount) throws RazorpayException;

    PaymentResponse createStripePaymentLing(User user, Long amount,Long orderId) throws StripeException;
}
