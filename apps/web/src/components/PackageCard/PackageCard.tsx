const PackageCard = () => {
  return (
    <li className="package-card">
      <div className="package-card__info-wrapper">
        <p className="package-card__paragraph">
          name <span className="-gray">(24 people used)</span>
        </p>
        <p className="package-card__paragraph -light-gray">Received Cards:</p>
      </div>
      <div className="package-card__likes-wrapper">serduszko</div>
    </li>
  )
}

export default PackageCard
