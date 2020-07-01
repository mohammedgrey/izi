import React from "react";
import './Product.css'
import OrderModal from "./OrderModal";



const Product =(props)=>{
  const [modalShow, setModalShow] = React.useState(false);
  return(
    <div className="product-class">
    
            <img src={props.image} className="img-style-item-general" />
            <p className="product-name">{props.name} </p>
            <div className="details-class">
            <p>Size: <span>{`${props.size}cm`}</span></p>
            <p>Status: <span>{props.status}</span></p>
            <p>Price: <span>{`${props.price}EGP`}</span></p>
            <button onClick={()=>setModalShow(true)} className="order-now"><i class="fas fa-shopping-cart"></i><text>Order Now</text></button>
            {/* <button className="show-details"><i class="fas fa-plus"></i><text>Show Details</text></button> */}

            <OrderModal
            name={props.name}
            size={props.size}
            image={props.image}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
            </div>
    
           
    
    </div>
    )

}




export default Product;