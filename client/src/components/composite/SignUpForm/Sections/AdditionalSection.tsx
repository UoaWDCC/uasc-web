import { useSignUpFormData } from "store/signupform"
import Dropdown from "components/generic/Dropdown/Dropdown"

export const AdditionalSection = () => {
  const [{ does_ski, does_racing }, { updateFormData }] = useSignUpFormData()

  return (
    <div className="flex max-w-sm flex-col gap-5">
      <Dropdown
        value={
          does_ski !== undefined
            ? does_ski
              ? "Skier"
              : "Snowboarder"
            : undefined
        }
        label="Skier or Snowboarder?"
        onChange={(e) =>
          updateFormData({ does_ski: e.target?.value === "Skier" })
        }
      >
        <option value="" disabled selected>
          Select your option
        </option>
        <option key="Skier" value="Skier">
          Skier
        </option>
        <option key="Snowboarder" value="Snowboarder">
          Snowboarder
        </option>
      </Dropdown>
      <Dropdown
        value={
          does_racing !== undefined ? (does_racing ? "Yes" : "No") : undefined
        }
        label="Would you be keen on Racing in 2024?"
        description="All skill levels welcome! Multiple ski races held throughout the season"
        onChange={(e) =>
          updateFormData({ does_racing: e.target?.value === "Yes" })
        }
      >
        <option value="" disabled selected>
          Select your option
        </option>
        <option key="Yes" value="Yes">
          Yes
        </option>
        <option key="No" value="No">
          No
        </option>
      </Dropdown>
    </div>
  )
}
