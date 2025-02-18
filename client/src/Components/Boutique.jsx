import { useEffect, useState } from "react";
import BoutiqueCard from "../Shared/BoutiqueCard";
import BoutiqueBanner from "./BoutiqueBanner";
import axios from "axios";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import BoutiqueCardSkeleton from "../skeltons/BoutiqueCardSkeleton";

function Boutique() {
  const [boutiques, setBoutiques] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchBoutiques = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/public/all-boutique-categories"
      );
      setBoutiques(response.data.categories);
    } catch (err) {
      console.log(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoutiques();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-windSong font-bold text-center my-10">
        Checkout Your Brands
      </h1>
      <BoutiqueBanner />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-auto place-items-center py-1 gap-y-3">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <BoutiqueCardSkeleton key={index} />
            ))
          : boutiques.map((item, index) => (
              <BoutiqueCard
                key={index}
                name={item.name}
                title={item.title}
                image={item.image}
              />
            ))}
      </div>
    </div>
  );
}

export default Boutique;
