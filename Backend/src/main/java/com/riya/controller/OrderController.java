package com.riya.controller;

import com.riya.domain.OrderType;
import com.riya.modal.Coin;
import com.riya.modal.Order;
import com.riya.modal.User;
import com.riya.request.CreateOrderRequest;
import com.riya.service.CoinService;
import com.riya.service.OrderService;
import com.riya.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userSerivce;

    @Autowired
    private CoinService coinService;

//    @Autowired
//    private WalletTransactionService walletTransactionService;


    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(
            @RequestHeader("Authorization") String jwt,
            @RequestBody CreateOrderRequest req

    ) throws Exception {
        User user = userSerivce.findUserProfileByJwt(jwt);
        Coin coin =coinService.findById(req.getCoinId());


        Order order = orderService.processOrder(coin,req.getQuantity(),req.getOrderType(),user);

        return ResponseEntity.ok(order);

    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @RequestHeader("Authorization") String jwtToken,
            @PathVariable Long orderId
    ) throws Exception {

        User user = userSerivce.findUserProfileByJwt(jwtToken);

        Order order = orderService.getOrderById(orderId);
        if (order.getUser().getId()==(user.getId())) {
            return ResponseEntity.ok(order);
        } else {
            throw new Exception("you don't have access");
        }
    }

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrdersForUser(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(required = false) OrderType order_type,
            @RequestParam(required = false) String asset_symbol
    ) throws Exception {

        Long userId = userSerivce.findUserProfileByJwt(jwt).getId();

        List<Order> userOrders = orderService.getAllOrdersOfUser(userId,order_type,asset_symbol);
        return ResponseEntity.ok(userOrders);
    }
}
