import BoutiqueCard from "../Shared/BoutiqueCard";
import { useSelector } from "react-redux";

function Boutique() {
  const { boutiques } = useSelector((state) => state.boutiques);
  return (
    <div className="mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-auto place-items-center gap-y-5">
        {boutiques.map((item, index) => (
          <BoutiqueCard key={index} boutique={item} boutiqueIndex={index} />
        ))}
      </div>
    </div>
  );
}

export default Boutique;
