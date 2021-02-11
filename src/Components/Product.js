import React from "react";
import "./Product.css";
import OrderModal from "./OrderModal";
import LoginModal from "./LoginModal";
import qs from "query-string";
import { useHistory } from "react-router";
import { useDialog } from "muibox";
import useNotify from "../customHooks/useNotify";
import { deleteProduct } from "../API/products";
import FavoriteButton from "../Components/FavoriteButton";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const Product = (props) => {
  const [orderModalShow, setOrderModalShow] = React.useState(false);
  const [loginModalShow, setLoginModalShow] = React.useState(false);
  //For the options menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  const dialog = useDialog();
  const { notify, Notify } = useNotify();
  const handleEditProduct = () => {
    const productQuery = qs.stringify({
      id: props.id,
      name: props.name,
      image: props.image,
      status: props.status,
      price: props.price,
      discount: props.discount,
      categories: props.categories.join(","),
    });
    history.push(`/addProduct/${productQuery}`);
  };
  const handleDeleteProduct = async () => {
    dialog
      .confirm("Are you sure you want to delete this?")
      .then(async (_) => {
        try {
          await deleteProduct(props.id);
          props.afterDeletion(props.id);
          notify("Product deleted!", "success");
        } catch (err) {
          notify("Deletion failed!", "error");
        }
      })
      .catch(console.log);
  };
  return (
    <div className="product-class">
      <img
        src={props.image}
        className="img-style-item-general"
        alt="broken"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = require("../assets/images/logo.jpg");
        }}
      />
      <p className="product-name" style={{ fontSize: props.name && props.name.length > 30 ? "0.8rem" : props.name && props.name.length > 50 ? "0.6rem" : "1rem" }}>
        {props.name}
      </p>
      <div className="details-class">
        <p>
          Status: <span>{props.status}</span>
        </p>
        <p>
          Price:{" "}
          {props.discount === 0 ? (
            <span>{`${props.price}`}</span>
          ) : (
            <strike style={{ color: "white" }}>
              <span style={{ color: "brown" }}>{`${props.price}`}</span>
            </strike>
          )}
          <span style={{ display: props.discount ? "inline-block" : "none" }}>{`${props.price - props.price * (props.discount / 100)}`}</span>
          <span>{`EGP`}</span>
        </p>
        <IconButton
          aria-label="more"
          // aria-controls="long-menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickMenu}
          className="order-now"
        >
          <MoreHorizIcon style={{ marginLeft: "4px" }} />
        </IconButton>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              setOrderModalShow(true);
            }}
          >
            <i className="fas fa-shopping-cart" style={{ marginRight: "5px" }}></i>
            Order Now
          </MenuItem>
          <FavoriteButton
            setModalShow={setLoginModalShow}
            handleCloseMenu={handleCloseMenu}
            productID={props.id}
            afterRemovingFromFavorites={props.afterRemovingFromFavorites}
            inFavorites={props.inFavorites}
          ></FavoriteButton>
        </Menu>
        {props.IamAnAdmin && (
          <div>
            <button className="edit-product button-add-or-remove" onClick={handleEditProduct}>
              <i className="fas fa-edit"></i>
            </button>
            <button className="delete-product button-add-or-remove" onClick={handleDeleteProduct}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        )}
        {props.discount !== 0 && <p className="discount-tag">{`${props.discount}% OFF`}</p>}

        <OrderModal name={props.name} image={props.image} show={orderModalShow} onHide={() => setOrderModalShow(false)} />
        <LoginModal
          show={loginModalShow}
          onHide={() => {
            setLoginModalShow(false);
          }}
        />
      </div>
      <Notify />
    </div>
  );
};

export default Product;
