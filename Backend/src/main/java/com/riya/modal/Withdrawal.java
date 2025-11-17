package com.riya.modal;

import com.riya.domain.WithdrawalStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Entity
public class Withdrawal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private WithdrawalStatus status;

    private Long amount;

    @ManyToOne
    private User user;

    private LocalDateTime date = LocalDateTime.now();

}
