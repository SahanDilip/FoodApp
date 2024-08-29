import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/admin_assets/assets";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink to="./add" className="sidebar-option">
            <img className="add-items" src={assets.add_icon} alt="addicon" />
            <p>Add Items</p>
          </NavLink>
          <NavLink to="./list" className="sidebar-option">
            <img
              className="list-items"
              src={assets.order_icon}
              alt="listicon"
            />
            <p>List Items</p>
          </NavLink>
          <NavLink to="./order" className="sidebar-option">
            <img
              className="order"
              src={assets.order_icon}
              alt="listordericon"
            />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>    
  );
}
