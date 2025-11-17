package com.riya.repository;

import com.riya.modal.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
    Watchlist findByUserId(Long userId);
}
