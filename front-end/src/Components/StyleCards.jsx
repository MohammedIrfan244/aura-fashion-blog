

// eslint-disable-next-line react/prop-types
function StyleCards({image,message}) {
  return (
    <div className='h-[400px] w-80 overflow-hidden relative hover:text-electricBlue'>
    <img src={image} alt="image" className="absolute -top-10" />
    <p className="font-extralight text-5xl absolute bottom-0 flex flex-wrap">{message}</p>
  </div>
  )
}

export default StyleCards
