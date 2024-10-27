
// eslint-disable-next-line react/prop-types
function BoutiqueDetails({boutiqueItem={},close}) {
  return (
    <div className="h-100vh absolute top-36 left-96">
        <div className="absolute top-[40%] left-[45%]">
        <button onClick={()=>close(null)}>close</button>
      <img src={boutiqueItem?.collectionImage} alt="product" />
      <p>{boutiqueItem?.collectionName}</p>
      <p>{boutiqueItem?.collectionPrice}</p>
      <ul>
        {
            boutiqueItem?.collectionReview?.map((item,index)=><li key={index}>{item.comment}{item.commentrId}</li>)
        }
      </ul>
    </div>
    </div>
  )
}

export default BoutiqueDetails
