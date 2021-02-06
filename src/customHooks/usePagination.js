import { useEffect, useState } from "react";
import axios, { axiosMain } from "../API/index";

const UsePagination = (url, pageNumber, newFlag, setLoadingNew) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (newFlag.current) setLoadingNew(true);
    else setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: url,
      params: { page: pageNumber, limit: 20 },
      cancelToken: new axiosMain.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setItems((prevItems) => {
          if (newFlag && newFlag.current) return res.data.data.products;
          else return [...prevItems, ...res.data.data.products];
        });
        setHasMore(res.data.length > 0);
        setLoadingNew(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        if (axiosMain.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [url, pageNumber, newFlag, setLoadingNew]);

  return { loading, error, products: items, setProducts: setItems, hasMore };
};

export default UsePagination;
