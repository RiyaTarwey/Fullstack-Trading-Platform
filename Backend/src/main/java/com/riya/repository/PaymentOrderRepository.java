package com.riya.repository;

import com.riya.modal.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {

}
