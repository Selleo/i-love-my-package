import { ChangeEvent, useEffect, useState } from 'react'
import { ReactComponent as IconSearch } from '../../assets/images/IconSearch.svg'
import PackageCard from '../../components/PackageCard'
import { useGetPackagesMutation } from '../../store/packageReducer'

function PackageSearch() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [packages, setPackages] = useState<any>([])

  const [getPackages] = useGetPackagesMutation()

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    if (searchValue !== '') {
      getPackages(searchValue)
        .unwrap()
        .then((res) => console.log('res', setPackages(res)))
    }
  }, [searchValue])

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
      <ul className="package-search__list">
        {packages?.map((element: any) => (
          <PackageCard packageElement={element} />
        ))}
      </ul>
    </div>
  )
}

export default PackageSearch
