import React, { useState, useEffect } from 'react';
import "./Order.css";
import { toast } from 'react-toastify';
import axios from "axios";
import parcel_icon from '../../assets/admin_assets/parcel_icon.png';

export default function List({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllorders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error: " + response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllorders();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllorders();
  }, [url]); // Re-fetch orders when url changes

  return (
    <div className="order name">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-food-item">
                {order.items &&
                  order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
              </p>
              {order.address && (
                <>
                  <p className="order-item-name">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <p>
                    {order.address.street}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                </>
              )}
            </div>
            <div className="order-item-phone">{order.address && order.address.phone}</div>
            <p>Items: {order.items ? order.items.length : 0}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food processing">Food processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
