
import BoutiqueCard from "../Shared/BoutiqueCard";


function Boutique() {
  const boutique = [
    {
      image:
        "https://i.pinimg.com/564x/bd/ec/ce/bdeccedb65043b577e8eeb886b1f230b.jpg",
      name: "Fenty Beauty",
    },
    {
      image:
        "https://i.pinimg.com/736x/a8/47/01/a84701b1405cac56dcccf743e5070975.jpg",
      name: "Gucci",
    },
    {
      image:
        "https://i.pinimg.com/564x/6c/47/d7/6c47d73e1f71a1a40b0f4468770de3ea.jpg",
      name: "Maybelline",
    },
    {
      image:
        "https://i.pinimg.com/564x/9d/74/28/9d7428c68c353a4754df7c69a823e3d7.jpg",
      name: "Loreal",
    },
    {
      image:
        "https://i.pinimg.com/564x/36/f7/2e/36f72eaaaf2e89f7a192d9ae89962126.jpg",
      name: "Huda Beauty",
    },
    {
      image:
        "https://i.pinimg.com/564x/2c/9c/9e/2c9c9eb1a0c46cc49071ad7c2a41d0b4.jpg",
      name: "Dior Beauty",
    },
    {
      image:
        "https://i.pinimg.com/564x/5e/38/03/5e3803becc34c6202a3eb527e25b565d.jpg",
      name: "Prada",
    },
    {
      image:
        "https://i.pinimg.com/736x/e3/a4/ae/e3a4ae26b6e81ec271ca2e7c6134f65a.jpg",
      name: "Victoria's Secret",
    },
  ];
  return (
<div className="mt-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-auto place-items-center gap-y-5">
        {boutique.map((item,index)=><BoutiqueCard key={index} image={item.image} name={item.name} index={index}/>)}
    </div>
    </div>
  )
}

export default Boutique