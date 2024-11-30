import BoutiqueCard from "../Shared/BoutiqueCard";

function Boutique() {
  const boutiques = [
    {
      name: "Fenty Beauty",
      image:
        "https://i.pinimg.com/564x/bd/ec/ce/bdeccedb65043b577e8eeb886b1f230b.jpg",
    },
    {
      name: "Gucci",
      image:
        "https://i.pinimg.com/564x/64/e7/c8/64e7c8198afbf988c757a72c3ac9163c.jpg",
    },
    {
      name: "Maybelline",
      image:
        "https://i.pinimg.com/564x/6c/47/d7/6c47d73e1f71a1a40b0f4468770de3ea.jpg",
    },
    {
      name: "Victoria's Secret",
      image:
        "https://i.pinimg.com/736x/14/14/c1/1414c12cbcceddfef7886e3dd72b9d81.jpg",
    },
    {
      name: "Huda Beauty",
      image:
        "https://i.pinimg.com/564x/36/f7/2e/36f72eaaaf2e89f7a192d9ae89962126.jpg",
    },
    {
      name: "Prada",
      image:
        "https://i.pinimg.com/564x/5e/38/03/5e3803becc34c6202a3eb527e25b565d.jpg",
    },
    {
      name: "O P I",
      image:
        "https://i.pinimg.com/564x/ca/cd/33/cacd33b108f51029d0d79cb2f6468fff.jpg",
    },
    {
      name: "Balenciaga",
      image:
        "https://i.pinimg.com/564x/79/d2/88/79d288cfeee5b45c7210d6b2705701db.jpg",
    },
  ];
  return (
    <div className="mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-auto place-items-center py-1 gap-y-3">
        {boutiques.map((item, index) => (
          <BoutiqueCard key={index} name={item.name} image={item.image} />
        ))}
      </div>
    </div>
  );
}

export default Boutique;
