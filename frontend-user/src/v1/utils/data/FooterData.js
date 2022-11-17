import { v4 as uuidv4 } from 'uuid';
import { Stripe_Png } from '../../user_ui/imports/Assets_Import';
const FooterData = [
  {
    id: uuidv4(),
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png',
    alt: 'mastercard',
  },
  {
    id: uuidv4(),
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
    alt: 'visa',
  },
  {
    id: uuidv4(),
    img: 'https://pbs.twimg.com/media/EfTZlEnWAAMn1lX.png',
    alt: 'paypal',
  },
  {
    id: uuidv4(),
    img: Stripe_Png,
    alt: 'Stripe',
  },
  {
    id: uuidv4(),
    img: 'https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png',
    alt: 'express',
  },
  {
    id: uuidv4(),
    img: 'https://icons-for-free.com/iconfiles/png/512/cash+checkout+discover+network+online+shopping+payment+method-1320191225548835050.png',
    alt: 'discover',
  },
];

export default FooterData;
