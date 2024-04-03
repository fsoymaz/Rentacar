import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar, faTags, faCubes, faMapMarkerAlt, faPalette } from '@fortawesome/free-solid-svg-icons';

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
    {
      path: "/admin/addlocation",
      display: "Lokasyon",
      icon: faMapMarkerAlt
    },
    {
      path: "/admin/addcolor",
      display: "Renk",
      icon: faPalette
    },
];

// Daha sonra, navLinks dizisini kullanarak navLinkleri oluşturabilirsiniz.
