import { MenuItem } from "@material-ui/core";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { addToFavorites, checkFavorites, removeFromFavorites } from "../API/favorites";
import useNotify from "../customHooks/useNotify";
import { useAuth } from "../Contexts/AuthContext";

export default function FavoriteButton({ productID, afterRemovingFromFavorites, inFavorites, handleCloseMenu, setModalShow }) {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { notify, Notify } = useNotify();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      setIsFavorite(false);
      return;
    }
    setLoading(true);
    checkFavorites({ product: productID })
      .then((res) => {
        if (_isMounted.current) setIsFavorite(res.favored);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (_isMounted.current) setLoading(false);
      });
  }, [productID, currentUser]);

  const favoritesAdd = async () => {
    setLoading(true);
    try {
      await addToFavorites({ product: productID });
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      notify("Product added to favorites!", "success");
    } catch (err) {
      console.log(err);
      notify("Oops something went wrong!", "error");
    }
    setLoading(false);
  };
  const favoritesRemove = async () => {
    setLoading(true);
    try {
      await removeFromFavorites({ product: productID });
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      if (inFavorites) afterRemovingFromFavorites(productID);
      notify("Product removed from favorites!", "warning");
    } catch (err) {
      console.log(err);
      notify("Oops something went wrong!", "error");
    }
    setLoading(false);
  };

  const handleFavoriteButton = async () => {
    if (!currentUser) {
      handleCloseMenu();
      setModalShow(true); //Show login modal
    } else return isFavorite ? favoritesRemove() : favoritesAdd();
  };

  //For cleaning up
  const _isMounted = useRef(true); // Initial value _isMounted = true
  useEffect(() => {
    return () => {
      // ComponentWillUnmount in Class Component
      _isMounted.current = false;
    };
  }, []);
  return (
    <MenuItem disabled={loading} onClick={handleFavoriteButton}>
      {isFavorite ? <i className="fas fa-minus-circle" style={{ marginRight: "5px" }}></i> : <i className="fas fa-plus-circle" style={{ marginRight: "5px" }}></i>}
      {isFavorite ? "Remove from favorites" : "Add To favorites"}
      <Notify />
    </MenuItem>
  );
}
