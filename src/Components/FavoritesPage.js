import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "./Product";
import { CircularProgress } from "@material-ui/core";
import { useAuth } from "../Contexts/AuthContext";
import FavoritesSwitch from "./FavoritesSwitch";
import { getMyFavorites } from "../API/favorites";

export default function FavoritesPage() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    getMyFavorites()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [currentUser]);
  //after removing an item from favorites
  const afterRemovingFromFavorites = (id) => {
    setProducts(products.filter((item) => item.product._id !== id));
  };
  return (
    <div className="shop-class">
      <div className="product-category container-fluid" style={{ paddingTop: "30px" }}>
        <FavoritesSwitch />
        {loading ? (
          <div className="center">
            <CircularProgress />
          </div>
        ) : products.length ? (
          products.map((item, index) => {
            return (
              <Product
                id={item.product._id}
                name={item.product.name}
                image={item.product.image}
                status={item.product.status}
                price={item.product.price}
                discount={item.product.discount}
                categories={item.product.categories}
                key={item.product._id}
                afterRemovingFromFavorites={afterRemovingFromFavorites}
                inFavorites={true}
              />
            );
          })
        ) : (
          <div className="nothing-found-message-wrapper">
            <p className="nothing-found-message">You haven't added anything to favorites yet!</p>
          </div>
        )}
      </div>
    </div>
  );
}
