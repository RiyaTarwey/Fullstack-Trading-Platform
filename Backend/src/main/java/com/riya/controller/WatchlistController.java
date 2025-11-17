package com.riya.controller;

import com.riya.modal.Coin;
import com.riya.modal.User;
import com.riya.modal.Watchlist;
import com.riya.repository.WatchlistRepository;
import com.riya.service.CoinService;
import com.riya.service.UserService;
import com.riya.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private  WatchlistService watchlistService;

    @Autowired
    private  UserService userService;

    @Autowired
    private CoinService coinService;

    @GetMapping("/user")
    public ResponseEntity<Watchlist> getUserWatchlist(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user=userService.findUserProfileByJwt(jwt);
        Watchlist watchlist = watchlistService.findUserWatchList(user.getId());
        return ResponseEntity.ok(watchlist);

    }



    @GetMapping("/{watchlistId}")
    public ResponseEntity<Watchlist> getWatchlistById(
            @PathVariable Long watchlistId) throws Exception {

        Watchlist watchlist = watchlistService.findById(watchlistId);
        return ResponseEntity.ok(watchlist);

    }

    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<Coin> addItemToWatchlist(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String coinId) throws Exception {


        User user=userService.findUserProfileByJwt(jwt);
        Coin coin=coinService.findById(coinId);
        Coin addedCoin = watchlistService.addItemToWatchList(coin, user);
        return ResponseEntity.ok(addedCoin);

    }
}
