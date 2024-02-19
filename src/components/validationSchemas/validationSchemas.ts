// validationSchemas.ts

import * as Yup from "yup";

export const carSchema = Yup.object().shape({
  modelYear: Yup.number()
    .required("Model yılı zorunludur")
    .min(2018, "Model yılı en az 2018 olmalıdır")
    .max(2024, "Model yılı 2024'ten büyük olamaz"),
  plate: Yup.string()
    .required("Plaka zorunludur")
    .matches(
      /^(?:\d{1,2}\s?[A-Z]{1,3}\s?\d{1,4})?$/,
      "Geçersiz plaka formatı"
    ),
  minFindeksRate: Yup.number()
    .required("Min Findeks Puanı zorunludur")
    .min(50, "Min Findeks Puanı 50'den küçük olamaz"),
  kilometer: Yup.number()
    .required("Kilometre zorunludur")
    .positive("Kilometre pozitif bir sayı olmalıdır")
    .integer("Kilometre tam sayı olmalıdır"),
  dailyPrice: Yup.number()
    .required("Günlük Ücret zorunludur")
    .min(500, "Günlük Ücret 500'den küçük olamaz"),
  modelId: Yup.number().required("Model zorunludur").positive("Model ID pozitif bir sayı olmalıdır"),
  colorId: Yup.number().required("Renk zorunludur").positive("Renk ID pozitif bir sayı olmalıdır"),
  imagePath: Yup.string().required("Resim Yolu zorunludur"),
  transmissionType: Yup.string().required("Vites Tipi zorunludur"),
  fuelType: Yup.string().required("Yakıt Tipi zorunludur"),
  category: Yup.string().required("Kategori zorunludur"),
  passengerCapacity: Yup.number()
    .required("Yolcu Kapasitesi zorunludur")
    .positive("Yolcu Kapasitesi pozitif bir sayı olmalıdır")
    .integer("Yolcu Kapasitesi tam sayı olmalıdır"),
});



export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("İsim alanı zorunludur."),
  lastName: Yup.string().required("Soyisim alanı zorunludur."),
  email: Yup.string()
    .email("Geçersiz e-posta formatı")
    .required("E-posta alanı zorunludur."),
  birthDate: Yup.date()
    .required("Doğum tarihi zorunludur.")
    .test(
      "age",
      "18 yaşından küçük ve 65 yaşından büyük kullanıcılar kayıt olamaz",
      function (value) {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18 && age <= 65;
      }
    ),
  username: Yup.string().required("Kullanıcı adı zorunludur."),
  password: Yup.string()
    .required("Şifre alanı zorunludur!")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.@#$%^&+=!])(?=\S+$).{8,}$/,
      "Şifre güçlü olmalıdır: en az bir rakam, bir büyük harf, bir küçük harf, bir özel karakter içermeli ve boşluk içermemelidir."
    ),
  confirmPassword: Yup.string()
    .required("Şifre alanı zorunludur!")
    .oneOf([Yup.ref("password")], "Şifreler uyuşmuyor"),
});

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});


