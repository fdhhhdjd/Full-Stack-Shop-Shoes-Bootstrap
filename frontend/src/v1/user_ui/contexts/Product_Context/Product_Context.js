import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Get_All_Product_Initial } from "../../../redux/product_slice/Api_Redux_Thunk_Products";
const ProductApi = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Get_All_Product_Initial());
  }, []);

  return {};
};
export default ProductApi;
