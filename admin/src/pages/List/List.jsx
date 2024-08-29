import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function List({url}) {
  
  const [list, setList] = useState([]);

  const fetchData = async () => {
    console.log("working fetchdata");
    const response = await axios.get(`${url}/api/food/list`);
    setList(response.data.data);
    console.log(response);
    console.log(response.data.data);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    console.log(foodId);
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchData();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All the foods</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Item</b>
          <b>Name</b>
          <b>Price</b>
          <b>category</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{item.category}</p>
              <p className="cursor" onClick={()=>removeFood(item._id)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
