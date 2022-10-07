import swal from "sweetalert";
const toastNotification = (count) => {
  if (count === 0) {
    swal(`${`Unlocked Login Account 😊`}`, {
      icon: "warning",
      closeOnClickOutside: true,
      buttons: ["No", "Yes"], //with custom label
      dangerMode: false,
    });
  } else {
    swal(`${`You Block ${count}s,Thank You 🙃`}`, {
      icon: "warning",
      closeOnClickOutside: false,
      buttons: ["No"], //with custom label
      dangerMode: true,
    });
  }
};
export default toastNotification;
