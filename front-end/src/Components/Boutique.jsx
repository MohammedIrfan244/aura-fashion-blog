
import BoutiqueCard from "../Shared/BoutiqueCard";


function Boutique() {
  const boutique = [
    {
      image:
        "https://preview.redd.it/nkq3ww7opnp51.jpg?width=640&crop=smart&auto=webp&s=1bbdd79cdf370a81be8b904efcc28a55582a6186",
      name: "Fenty Beauty",
    },
    {
      image:
        "https://i.pinimg.com/736x/97/1a/db/971adb4199aa3565a124806c72eca97e.jpg",
      name: "Gucci",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKpbDuD0udNzWWJ8EwqXaAzPmvnxTskWv1xQ&s",
      name: "Maybelline",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwvzSsZvpBMJCsR2pGFxD-pRiiIVOWesgz4w&s",
      name: "Urban Decay",
    },
    {
      image:
        "https://i.pinimg.com/736x/1c/ed/c2/1cedc25580c92ceb0ef59254dee9cf5f.jpg",
      name: "Huda Beauty",
    },
    {
      image:
        "https://kreafolk.com/cdn/shop/articles/dior-logo-design-history-and-evolution-kreafolk_637ca925-15a9-4a0f-8b46-ee73ee0236eb.jpg?v=1717725054&width=1024",
      name: "Dior Beauty",
    },
    {
      image:
        "https://i.pinimg.com/originals/6e/ed/2f/6eed2fbc746c4f0d4166fa1e06931402.jpg",
      name: "Prada",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3b5QIG_ER-v_DAmij6UyUTx08VAG5bSSvhg&s",
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