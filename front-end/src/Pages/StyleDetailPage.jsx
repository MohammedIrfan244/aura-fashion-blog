import { useLocation, useParams } from "react-router-dom"

function StyleDetailPage() {
    const {id}=useParams()
    const location=useLocation()
    const {style}=location.state
  return (
    <div className="pt-16">
      {id}
      <img src={style?.styleImage} alt={style?.styleName} />
    </div>
  )
}

export default StyleDetailPage
