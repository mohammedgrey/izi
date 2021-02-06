import axios from "./index";

export const getAllProducts = async (search, categories) => {
  const queryCategories = categories.join(",");
  return (await axios.get(`/api/products?search=${search}&categories=${queryCategories}`)).data;
};
export const addProduct = async (formData) => {
  let fd = new FormData();
  for (const property in formData) {
    fd.append(property, formData[property]);
  }
  return (await axios.post("/api/products", fd)).data;
};

export const deleteProduct = async (id) => {
  return (await axios.delete(`/api/products/${id}`)).data;
};
