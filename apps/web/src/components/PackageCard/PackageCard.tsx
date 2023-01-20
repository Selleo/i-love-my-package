import { useNavigate } from 'react-router-dom'
import Tag from '../../components/Tag'

const PackageCard = ({ packageElement }: any) => {
  const navigate = useNavigate()
  console.log('packageElement', packageElement)
  const onClickCard = () => navigate(`/details/${packageElement.id}`)

  return (
    <li className="package-card">
      <div className="package-card__info-wrapper">
        <div className="package-card__name-wrapper">
          <button className="package-card__name" onClick={onClickCard}>
            {packageElement.name}
          </button>
          <button className="package-card__people">
            ({packageElement?.usedBy?.length}{' '}
            {packageElement?.usedBy?.length === 1 || 0 ? 'person' : 'people'}{' '}
            used)
          </button>
        </div>
        <div className="package-card__cards-wrapper">
          <p className="package-card__paragraph -light-gray">Received Cards:</p>
          <Tag count={1} variant="danger" /> <Tag count={3} variant="warning" />
        </div>
      </div>
      <div className="package-card__likes-wrapper">
        <Tag count={2} variant="like" />
      </div>
    </li>
  )
}

export default PackageCard
