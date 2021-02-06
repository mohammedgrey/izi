import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Shop.css";
import Product from "./Product";
import allCategories from "../utils/productCategories";
import { Autocomplete } from "@material-ui/lab";
import { CircularProgress, makeStyles, TextField } from "@material-ui/core";
import { useAuth } from "../Contexts/AuthContext";
import usePagination from "../customHooks/usePagination";
import { Link } from "react-router-dom";
import FavoritesSwitch from "./FavoritesSwitch";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 338,
    maxWidth: "95%",
    borderRadius: "50px",
  },
}));
const Shop = (props) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(false);
  const [categories, setCategories] = useState([]);
  const userClaims = useRef({});
  useEffect(() => {
    setLoadingCurrentUser(true);
    if (currentUser) {
      currentUser
        .getIdTokenResult()
        .then((idToken) => {
          userClaims.current = idToken.claims;
        })
        .catch(console.log);
    }
    setLoadingCurrentUser(false);
  }, [currentUser]);

  const IamAnAdmin = () => {
    return currentUser && userClaims.current && userClaims.current.isAdmin;
  };

  //For pagination
  const [pageNumber, setPageNumber] = useState(1);
  const newFlag = useRef(true);
  const [loadingNew, setLoadingNew] = useState(false);
  const { products, setProducts, hasMore, loading, error } = usePagination(`/api/products?search=${search}&categories=${categories.join(",")}`, pageNumber, newFlag, setLoadingNew);
  const observer = useRef();
  const lastItemElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
          newFlag.current = false;
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  useEffect(() => {
    setPageNumber(1);
    newFlag.current = true;
  }, [categories, search]);

  //for deletion
  const afterDeletion = (id) => {
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div className="shop-class">
      {IamAnAdmin() && (
        <Link to="/addproduct">
          <i className="fas fa-plus-circle add-product"></i>
        </Link>
      )}
      {currentUser && <FavoritesSwitch />}
      <div className="search-and-categories-block">
        <div className="search-bar-wrapper">
          <input
            className="search-bar"
            type="text"
            value={search}
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
          <i className="fas fa-times" style={{ display: search === "" ? "none" : null }} onClick={() => setSearch("")}></i>
        </div>
        <Autocomplete
          className={classes.formControl}
          multiple
          id="tags-outlined"
          options={allCategories}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          onChange={(_, values) => {
            setCategories(values);
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" label="Categories" />}
        />
      </div>
      <div className="product-category container-fluid">
        {loadingCurrentUser ? (
          <div className="center">
            <CircularProgress />
          </div>
        ) : loadingNew ? (
          <div className="center">
            <CircularProgress />
          </div>
        ) : products.length ? (
          products.map((item, index) => {
            if (products.length === index + 1)
              return (
                <div ref={lastItemElementRef} key={item._id}>
                  <Product
                    IamAnAdmin={IamAnAdmin()}
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    status={item.status}
                    price={item.price}
                    discount={item.discount}
                    categories={item.categories}
                    afterDeletion={afterDeletion}
                  />
                </div>
              );
            else
              return (
                <div key={item._id}>
                  <Product
                    IamAnAdmin={IamAnAdmin}
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    status={item.status}
                    price={item.price}
                    discount={item.discount}
                    categories={item.categories}
                    afterDeletion={afterDeletion}
                  />
                </div>
              );
          })
        ) : (
          !loading &&
          !loadingNew && (
            <div className="nothing-found-message-wrapper">
              <p className="nothing-found-message">Sorry! We are afraid we might not currently have what you are looking for. Please contact us so we can customize what you want!</p>
              <div className="contact-us-to-customize">
                <a href="https://www.facebook.com/izi.handmade/" target="_blank" rel="noopener noreferrer">
                  <span>
                    <i className="fab fa-facebook-f"></i>
                  </span>
                </a>

                <a href="https://www.instagram.com/izi.handmade/" target="_blank" rel="noopener noreferrer">
                  <span>
                    <i className="fab fa-instagram"></i>
                  </span>
                </a>

                <a target="_blank" rel="noopener noreferrer" href={"https://api.WhatsApp.com/send?phone=+201101038345&text=I would like to customize an order..."}>
                  <span>
                    <i className="fab fa-whatsapp"></i>
                  </span>
                </a>
              </div>
            </div>
          )
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>{loading && !loadingNew && <CircularProgress />}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>{error && "Error"}</div>
      </div>
    </div>
  );
};

export default Shop;
