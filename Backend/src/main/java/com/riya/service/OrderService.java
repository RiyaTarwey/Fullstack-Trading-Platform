package com.riya.service;

import com.riya.domain.OrderType;
import com.riya.modal.Coin;
import com.riya.modal.Order;
import com.riya.modal.OrderItem;
import com.riya.modal.User;

import java.util.List;

public interface OrderService {
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId,OrderType orderType,String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;
}

