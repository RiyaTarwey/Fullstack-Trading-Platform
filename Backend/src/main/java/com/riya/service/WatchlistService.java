package com.riya.service;

import com.riya.modal.Coin;
import com.riya.modal.User;
import com.riya.modal.Watchlist;

public interface WatchlistService {

    Watchlist findUserWatchList(Long userId) throws Exception;

    Watchlist createWatchList(User user);

    Watchlist findById(Long id) throws Exception;

    Coin addItemToWatchList(Coin coin, User user) throws Exception;
}
