import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Get_All_Carousel_Initial } from '../../../redux/carousel_slice/Api_Redux_Thunk_Carousel';
const CarouselApi = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Get_All_Carousel_Initial());
  }, []);

  return {};
};
export default CarouselApi;
