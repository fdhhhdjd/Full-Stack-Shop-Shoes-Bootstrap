import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Get_All_Product_Initial } from '../../../redux/product_slice/Api_Redux_Thunk_Products';
const ProductApi = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { reviews } = useSelector((state) => ({
    ...state.Comment_product,
  }));
  const { transaction } = useSelector((state) => ({ ...state.payment_user }));

  useEffect(() => {
    dispatch(Get_All_Product_Initial());
  }, [reviews, transaction]);

  return {
    edit_comment: [edit, setEdit],
  };
};
export default ProductApi;
