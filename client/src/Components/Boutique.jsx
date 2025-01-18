import { useEffect, useState } from "react";
import BoutiqueCard from "../Shared/BoutiqueCard";
import BoutiqueBanner from "./BoutiqueBanner";
import axios from "axios";
import axiosErrorManager from "../Utilities/axiosErrorManager";

// const boutiques = [
//   {
//     name: "Fenty Beauty",
//     banner:"https://i.pinimg.com/736x/a2/9d/07/a29d0780c758324da2e1bbab7ec58e28.jpg",
//     image:"https://i.pinimg.com/564x/bd/ec/ce/bdeccedb65043b577e8eeb886b1f230b.jpg",
//   },
//   {
//     name: "Gucci",
//     banner:"https://i.pinimg.com/736x/b6/91/ef/b691ef408a87507555b2c89463419efb.jpg",
//     image:"https://i.pinimg.com/564x/64/e7/c8/64e7c8198afbf988c757a72c3ac9163c.jpg",
//   },
//   {
//     name: "Maybelline",
//     banner:"https://i.pinimg.com/736x/9a/a3/71/9aa371f1cc645260e32fa08cd65d42c9.jpg",
//     image:"https://i.pinimg.com/564x/6c/47/d7/6c47d73e1f71a1a40b0f4468770de3ea.jpg",
//   },
//   {
//     name: "Victoria's Secret",
//     banner:"https://i.pinimg.com/736x/5a/ef/93/5aef933a0f36ee593dd67ac7aa5d1086.jpg",
//     image:"https://i.pinimg.com/736x/14/14/c1/1414c12cbcceddfef7886e3dd72b9d81.jpg",
//   },
//   {
//     name: "Huda Beauty",
//     banner:"https://i.pinimg.com/736x/fc/a0/55/fca055f7b9fc108b55bcca4b83ab4b1b.jpg",
//     image:"https://i.pinimg.com/564x/36/f7/2e/36f72eaaaf2e89f7a192d9ae89962126.jpg",
//   },
//   {
//     name: "Prada",
//     banner:"https://i.pinimg.com/736x/02/c0/eb/02c0ebbcafe56eb362e8d6c52a9e17b1.jpg",
//     image:"https://i.pinimg.com/564x/5e/38/03/5e3803becc34c6202a3eb527e25b565d.jpg",
//   },
//   {
//     name: "O P I",
//     banner:"https://i.pinimg.com/736x/40/c9/9d/40c99d88e134e6bc3a69ea08a7ae8ac5.jpg",
//     image:"https://i.pinimg.com/564x/ca/cd/33/cacd33b108f51029d0d79cb2f6468fff.jpg",
//   },
//   {
//     name: "Balenciaga",
//     banner:"https://i.pinimg.com/736x/f1/13/ba/f113baf812218151fd275de930f1f9ce.jpg",
//     image:"https://i.pinimg.com/564x/79/d2/88/79d288cfeee5b45c7210d6b2705701db.jpg",
//   },
// ];
function Boutique() {
  const [boutiques, setBoutiques] = useState([]);
  const fetchBoutiques = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + "/public/all-boutique-categories");
      setBoutiques(response.data.categories);
    } catch (err) {
      console.log(axiosErrorManager(err));
    }
  }

  useEffect(() => {
    fetchBoutiques();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-windSong font-bold text-center my-10">
        Checkout Your Brands
      </h1>
      <BoutiqueBanner />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-auto place-items-center py-1 gap-y-3">
        {boutiques?.map((item, index) => (
          <BoutiqueCard key={index} name={item.name} title={item.title} image={item.image} />
        ))}
      </div>
    </div>
  );
}

export default Boutique;
