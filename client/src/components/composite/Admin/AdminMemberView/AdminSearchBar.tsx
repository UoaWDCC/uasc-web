import TextInput from "components/generic/TextInputComponent/TextInput"
import { debounce } from "components/utils/Utils"

interface IAdminSearchBar {
  onQueryChanged?: (newQuery: string) => void
}

const ADMIN_SEARCH_BAR_DEFAULT_DEBOUNCE = 300 as const

const AdminSearchBar = ({ onQueryChanged }: IAdminSearchBar) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const debouncedCallback = debounce(
      () => onQueryChanged?.(e.target.value),
      ADMIN_SEARCH_BAR_DEFAULT_DEBOUNCE
    )
    debouncedCallback()
  }

  return (
    <TextInput
      data-testid="search-input"
      type="text"
      onChange={(e) => changeHandler(e)}
      placeholder="search"
    />
  )
}

export default AdminSearchBar
