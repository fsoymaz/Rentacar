// validationSchemas/cardSchema.js

import * as yup from 'yup';

export const cardSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required('Kart numarası zorunludur.')
    .matches(/^\d{16}$/, 'Geçersiz kart numarası.'),
  cardHolder: yup
    .string()
    .required('Kart sahibi zorunludur.')
    .matches(/^[a-zA-Z ]*$/, 'Geçersiz kart sahibi.'),
  expirationMonth: yup
    .string()
    .required('Son kullanma ayı zorunludur.'),
  expirationYear: yup
    .string()
    .required('Son kullanma yılı zorunludur.')
    .matches(/^\d{4}$/, 'Geçersiz son kullanma yılı.'),
  ccv: yup
    .string()
    .required('CCV zorunludur.')
    .matches(/^\d{3}$/, 'Geçersiz CCV.')
});
