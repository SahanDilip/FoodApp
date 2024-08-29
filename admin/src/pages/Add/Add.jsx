import React, { useState, useEffect } from "react";
import "./Add.css";
import assets from "../../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export default function Add({ url }) {
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Hello");
    const formData = new FormData();
    formData.append("name", data.name),
      formData.append("description", data.description),
      formData.append("category", data.category),
      formData.append("price", data.price),
      formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({ name: "", description: "", price: "", category: "Salad" });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="upload-image flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className=""
              alt="uploadareaimg"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            name="image"
            hidden
            required
          />
          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input
              onChange={handleOnChange}
              value={data.name}
              type="text"
              placeholder="Type here"
              name="name"
            />
          </div>
          <div className="add-product-description flex-col">
            <p>product Description</p>
            <textarea
              onChange={handleOnChange}
              value={data.description}
              name="description"
              id=""
              cols="30"
              rows="10"
              placeholder="type your description here"
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select
                name="category"
                onChange={handleOnChange}
                value={data.category}
              >
                <option value="salad">salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Desserts">Desserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="pasta">pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input
                type="Number"
                placeholder="$20"
                name="price"
                onChange={handleOnChange}
                value={data.price}
              />
            </div>
          </div>
          <button type="Submit" className="add-btn">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
