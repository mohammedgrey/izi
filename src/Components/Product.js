import React from "react";
import './Product.css'



const Product =(props)=>{


  return(
    <div className="product-class">
    
            <img src={props.image} className="img-style-item-general" />
            <p className="product-name">{props.name} </p>
            <div className="details-class">
            <p>Size: <span>{`${props.size}cm`}</span></p>
            <p>Status: <span>{props.status}</span></p>
            <p>Price: <span>{`${props.price}EGP`}</span></p>
            </div>
    
           
    
    </div>
    )

}




export default Product;