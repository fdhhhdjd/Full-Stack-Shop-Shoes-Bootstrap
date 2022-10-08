import { v4 as uuidv4 } from "uuid";
const HeaderData = [
  {
    id: uuidv4(),
    address: "hhttps://www.facebook.com/profile.php?id=100006139249437",
    navigate: "_blank",
    icon: "fab fa-facebook-f",
  },
  {
    id: uuidv4(),
    address: "https://www.instagram.com/nguyentientai10/",
    navigate: "_blank",
    icon: "fab fa-instagram",
  },
  {
    id: uuidv4(),
    address:
      "https://www.linkedin.com/in/ti%E1%BA%BFn-t%C3%A0i-nguy%E1%BB%85n-787545213/",
    navigate: "_blank",
    icon: "fab fa-linkedin-in",
  },
  {
    id: uuidv4(),
    address: "tel:0798805741",
    navigate: null,
    icon: "fas fa-phone",
  },
  {
    id: uuidv4(),
    address: "https://profile-forme.surge.sh/",
    navigate: "_blank",
    icon: "fas fa-user",
  },
];

export default HeaderData;
