import swal from "sweetalert";
const SwaleMessage = (title, icon) => {
  return swal(title, {
    icon: icon,
  });
};

export default SwaleMessage;
