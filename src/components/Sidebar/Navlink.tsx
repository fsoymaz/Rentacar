import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar, faTags, faCubes } from '@fortawesome/free-solid-svg-icons';

export const navLinks = [
    {
      path: "/admin",
      display: "Dashboard",
      icon: faHome
    },
    {
      path: "/admin/admincar",
      display: "Araç",
      icon: faCar
    },
    {
      path: "/admin/addBrand",
      display: "Marka",
      icon: faTags
    },
    {
      path: "/admin/addmodel",
      display: "Model",
      icon: faCubes
    },
];

// Daha sonra, navLinks dizisini kullanarak navLinkleri oluşturabilirsiniz.
