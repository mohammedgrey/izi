import { TextField, FormControl, Select, InputLabel, MenuItem, Button, CircularProgress } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import ImageUpload from "./ImageUpload";
import { addProduct } from "../API/products";
import allCategories from "../utils/productCategories";
import { useHistory } from "react-router";
import qs from "query-string";
import useNotify from "../customHooks/useNotify";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: "80%",
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
class ProductStatus {
  static AVAILABLE = "Available";
  static OUT_OF_STOCK = "Out of Stock";
  static UPON_REQUEST = "Upon Request";
}

export default function AddProduct() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const initialProductData = {
    id: null,
    name: "",
    price: 0,
    discount: 0,
    status: "",
    categories: [],
    file: null,
  };
  const [product, setProduct] = useState(initialProductData);
  const history = useHistory();
  const initialImageState = {
    mainState: "initial", // initial, search, gallery, uploaded
    imageUploaded: 0,
    selectedFile: null,
    searchURL: "",
  };
  const [imageState, setImageState] = useState(initialImageState);
  const { notify, Notify } = useNotify();

  useEffect(() => {
    setLoading(true);
    const urlStrings = history.location.pathname.split("/");
    if (urlStrings.length === 3) {
      const productQueryString = urlStrings[2];
      const productObj = qs.parse(productQueryString);
      productObj.categories = productObj.categories.split(",");
      productObj.file = productObj.image;
      delete productObj["image"];
      setProduct(productObj);
      setImageState((i) => {
        return { ...i, mainState: "uploaded", imageUploaded: true, selectedFile: productObj.file, fileReader: undefined };
      });
    }
    setLoading(false);
  }, [history]);

  const handleProductChange = (e) => {
    const name = e.target.name;
    setProduct({
      ...product,
      [name]: e.target.value,
    });
  };

  const validateInput = () => {
    return product.name !== "" && product.price > 0 && product.status !== "" && product.file !== null && product.categories.length && product.discount >= 0 && product.discount <= 100;
  };

  const handleAddProduct = () => {
    setLoading(true);
    addProduct(product)
      .then((res) => {
        if (product.id === null) {
          setProduct(initialProductData);
          setImageState(initialImageState);
        } else {
          const returnedProduct = res.data.product;
          const productQuery = qs.stringify({
            id: returnedProduct._id,
            name: returnedProduct.name,
            image: returnedProduct.image,
            status: returnedProduct.status,
            price: returnedProduct.price,
            discount: returnedProduct.discount,
            categories: returnedProduct.categories.join(","),
          });
          history.replace(`/addProduct/${productQuery}`);
        }
        notify("Product Saved!", "success");
      })
      .catch((err) => {
        notify("Failed to save product!", "error");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="add-product-page">
      {loading ? (
        <div className="center">
          <CircularProgress />
        </div>
      ) : (
        <div className="add-product-block">
          <TextField
            variant="outlined"
            style={{ display: "block", margin: "10px auto" }}
            inputProps={{ style: { textAlign: "center" } }} // the change is here
            label="Product Name"
            InputLabelProps={{
              shrink: true,
            }}
            value={product.name}
            onChange={handleProductChange}
            name="name"
          />
          <TextField
            variant="outlined"
            style={{ display: "block", margin: "10px auto" }}
            label="Price"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 0 } }}
            value={product.price}
            onChange={handleProductChange}
            name="price"
          />
          <TextField
            variant="outlined"
            style={{ display: "block", margin: "10px auto" }}
            label="Discount %"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            value={product.discount}
            onChange={handleProductChange}
            name="discount"
          />
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
            <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" name="status" value={product.status} onChange={handleProductChange}>
              <MenuItem value={ProductStatus.AVAILABLE}>Available</MenuItem>
              <MenuItem value={ProductStatus.OUT_OF_STOCK}>Out Of Stock</MenuItem>
              <MenuItem value={ProductStatus.UPON_REQUEST}>Upon Request</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            className={classes.formControl}
            multiple
            id="tags-outlined"
            options={allCategories}
            getOptionLabel={(option) => option}
            //   defaultValue={[top100Films[13]]}
            filterSelectedOptions
            value={product.categories}
            onChange={(_, values) => {
              setProduct({
                ...product,
                categories: values,
              });
            }}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Categories" />}
          />
          <ImageUpload
            Name="Input Image"
            imageState={imageState}
            setImageState={setImageState}
            getTheImage={(image) => {
              setProduct({
                ...product,
                file: image,
              });
            }}
          />
          <div className="save-product-or-cancel">
            <Button
              onClick={() => {
                history.goBack();
              }}
              style={{ marginTop: "10px", fontWeight: "900", color: "rgb(41,98,117)", marginRight: "10px" }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button onClick={handleAddProduct} color="primary" style={{ marginTop: "10px", fontWeight: "900", color: "white" }} variant="contained" disabled={!validateInput()}>
              Save
            </Button>
          </div>
          <Notify />
        </div>
      )}
    </div>
  );
}
