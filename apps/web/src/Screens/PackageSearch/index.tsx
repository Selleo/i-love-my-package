import { ChangeEvent, useState } from 'react'
import { ReactComponent as IconSearch } from '../../assets/images/IconSearch.svg'

function PackageSearch() {
  const [searchValue, setSearchValue] = useState<string>()

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="package-search">
      <div className="package-search__input-wrapper">
        <input
          className="package-search__input"
          placeholder="Search package"
          value={searchValue}
          onChange={handleChangeInput}
        />
        <IconSearch />
      </div>
    </div>
  )
}

export default PackageSearch
