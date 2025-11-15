package com.riya.repository;

import com.riya.modal.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepositery extends JpaRepository<Wallet,Long> {
    Wallet findByUserId(Long userId);
}
