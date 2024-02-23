import React from "react";
import style from "./AllOrders.module.css";
import axios from "axios";
import { useQuery } from "react-query";

export default function AllOrders() {
 
  //getting product
  function getAllOrders() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`);
  }

  let { data, isLoading, refetch } = useQuery("getAllOrders", getAllOrders);

  return (
    <>
      <h2 className="h3 py-4">All Last orders</h2>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Number Of items</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col" >Image</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.data[0].cartItems.map((item,index)=><tr key={index}>
              <td>{item.count}</td>
              <td>{item.product.title}</td>
              <td>{item.price}</td>
              <td><img src={item.product.imageCover} alt="" width={50} /></td>
            </tr>)}
            
          </tbody>
          
        </table>
        <h3>
          total price: {data?.data.data[0].totalOrderPrice}
          </h3>
      </div>
    </>
  );
}
