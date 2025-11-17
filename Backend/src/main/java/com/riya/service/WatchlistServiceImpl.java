package com.riya.service;

import com.riya.modal.Coin;
import com.riya.modal.User;
import com.riya.modal.Watchlist;
import com.riya.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchlistServiceImpl implements WatchlistService {

    @Autowired
    private WatchlistRepository watchListRepository;

    @Override
    public Watchlist findUserWatchList(Long userId) throws Exception {
         Watchlist watchList = watchListRepository.findByUserId(userId);
         if(watchList == null){
             throw new Exception("watchlist not found");
         }
        return watchList;
    }

    @Override
    public Watchlist createWatchList(User user) {
        Watchlist watchList = new Watchlist();
        watchList.setUser(user);

        return watchListRepository.save(watchList);
    }

    @Override
    public Watchlist findById(Long id) throws Exception {
        Optional<Watchlist> watchListOptional = watchListRepository.findById(id);
        if(watchListOptional.isEmpty()){
            throw new Exception("watchlist not found");
        }
        return watchListOptional.get();
    }

    @Override
    public Coin addItemToWatchList(Coin coin, User user) throws Exception {
        Watchlist watchList = findUserWatchList(user.getId());

        if(watchList.getCoins().contains(coin)){
            watchList.getCoins().remove(coin);
        }
        else watchList.getCoins().add(coin);
        watchListRepository.save(watchList);

        return coin;
    }
}
