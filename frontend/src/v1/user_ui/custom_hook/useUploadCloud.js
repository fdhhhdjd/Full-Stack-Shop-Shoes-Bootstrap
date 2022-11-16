import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Destroy_Cloud_Initial, Upload_Cloud_Initial } from '../../redux/upload_Slice/Api_Redux_Thunk_Upload';
import { reset_upload } from '../../redux/upload_Slice/Upload_Slice';
import { SwaleMessage } from '../imports/General_Global_Import';
const useUploadCloud = (accessToken) => {
  const { result, result_destroy } = useSelector((state) => ({
    ...state.upload_cloud,
  }));
  const dispatch = useDispatch();
  const handleUpload = (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return SwaleMessage('File not Exists', 'error');
      if (file.size > 1024 * 1024)
        // 1mb
        return SwaleMessage('Size too large !', 'error');
      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return SwaleMessage('File format is incorrect.', 'error');
      let formData = new FormData();

      formData.append('file', file);
      dispatch(Upload_Cloud_Initial({ formData, accessToken }));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const handleDestroy = () => {
    dispatch(Destroy_Cloud_Initial({ public_id: result?.public_id, accessToken }));
  };
  useEffect(() => {
    if (result_destroy) {
      dispatch(reset_upload());
    }
  }, [result_destroy]);
  return { handleUpload, handleDestroy };
};

export default useUploadCloud;
