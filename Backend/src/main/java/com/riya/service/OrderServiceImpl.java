package com.riya.service;

import com.riya.domain.OrderStatus;
import com.riya.domain.OrderType;
import com.riya.modal.Coin;
import com.riya.modal.Order;
import com.riya.modal.OrderItem;
import com.riya.modal.User;
import com.riya.repository.OrderItemRepository;
import com.riya.repository.OrderRepository;
import com.riya.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    private WalletService walletService;

    @Override
    public Order createOrder(User user, OrderItem orderItem, OrderType orderType) {

        double price=orderItem.getCoin().getCurrentPrice()*orderItem.getQuantity();

        Order order = new Order();
        order.setUser(user);
        order.setOrderItem(orderItem);
        order.setOrderType(orderType);
        order.setPrice(BigDecimal.valueOf(price));
        order.setTimestamp(LocalDateTime.now());
        order.setOrderStatus(OrderStatus.PENDING);


        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(long orderId) throws Exception {
        return orderRepository.findById(orderId)
                .orElseThrow(
                        ()->new Exception("order not found"));
    }

    @Override
    public List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol) {
        return orderRepository.findByUserID(userId);
    }

    private OrderItem createOrderItem(Coin coin,double quantity,
                                      double buyPrice ,double sellPrice) {
        OrderItem orderItem = new OrderItem();
        orderItem.setCoin(coin);
        orderItem.setQuantity(quantity);
        orderItem.setBuyPrice(buyPrice);
        orderItem.setSellPrice(sellPrice);
        return orderItemRepository.save(orderItem);

    }

    @Transactional
    public OrderItem buyAsset(Coin coin,double quantity,User user) throws Exception {
        if(quantity<=0){
            throw new Exception("quantity should be>0");
        }

        double buyPrice = coin.getCurrentPrice()*quantity;
        OrderItem orderItem=createOrderItem(coin,quantity,buyPrice,0);

        Order order=createOrder(user,orderItem,OrderType.BUY);
        orderItem.setOrder(order);

        walletService.payOrderPayment(order,user);

        order.setOrderStatus(OrderStatus.SUCCESS);
        order.setOrderType(OrderType.BUY);
        Order savedOrder=orderRepository.save(order);

        // create asset;
        return savedOrder.getOrderItem();
    }


    @Transactional
    public OrderItem sellAsset(Coin coin,double quantity,User user) throws Exception {
        if(quantity<=0){
            throw new Exception("quantity should be>0");
        }

        double sellPrice = coin.getCurrentPrice()*quantity;

        double buyPrice = assetTosell.getPrice();
        OrderItem orderItem=createOrderItem(coin,quantity,buyPrice,sellPrice);

        Order order=createOrder(user,orderItem,OrderType.SELL);
        orderItem.setOrder(order);


        if(assetTosell.getQuantity()>=quantity){
            walletService.payOrderPayment(order,user);

            order.setOrderStatus(OrderStatus.SUCCESS);
            order.setOrderType(OrderType.SELL);
            Order savedOrder=orderRepository.save(order);

            Asset updateAsset =assetService.updateAsset(assetToSell.getId(),-quantity);

            if(updateAsset.getQuantity()*coin.getCurrentPrice()<=1){
                assetService.deleteAsset(updateAsset.getId);
            }
            return savedOrder.getOrderItem();
        }
        throw new Exception("Insufficient quantity to sell");

    }

    @Override
    @Transactional
    public Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception {
        if(orderType.equals(OrderType.BUY)){
            return buyAsset(coin,quantity,user).getOrder();
        }
        else if(orderType.equals(OrderType.SELL)){
            return sellAsset(coin,quantity,user).getOrder();
        }
       throw new Exception("invalid order type");
    }
}
