import { useSignUpFormData } from "store/SignUpForm"
import Dropdown from "components/generic/Dropdown/Dropdown"
import TextInput from "components/generic/TextInputComponent/TextInput"
import ExcitementSlider from "components/generic/ExcitmentSlider/ExcitementSlider"

enum SportOptions {
  SKIER = "Skier",
  SNOWBOARDER = "SnowBoarder",
  NEW = "New!",
  BOTH = "Both"
}

/**
 * @returns the correct dropdown option for the user's sport
 */
const determineSport = (
  doesSki: boolean,
  doesSnowboarding: boolean
): SportOptions => {
  if (doesSki && doesSnowboarding) return SportOptions.BOTH
  if (doesSki) return SportOptions.SKIER
  if (doesSnowboarding) return SportOptions.SNOWBOARDER
  return SportOptions.NEW
}

/**
 * @param currentSportOption from the dropdown event
 * @returns whether or not `does_ski` should be set to true or not
 */
const doesSki = (currentSportOption: SportOptions) => {
  switch (currentSportOption) {
    case SportOptions.BOTH:
    case SportOptions.SKIER:
      return true
    default:
      return false
  }
}

/**
 * @param currentSportOption from the dropdown event
 * @returns whether or not `does_snowboarding` should be set to true or not
 */
const doesSnowboarding = (currentSportOption: SportOptions) => {
  switch (currentSportOption) {
    case SportOptions.BOTH:
    case SportOptions.SNOWBOARDER:
      return true
    default:
      return false
  }
}

export const AdditionalSection = () => {
  const [
    { does_ski, does_snowboarding, does_racing, dietary_requirements },
    { updateFormData }
  ] = useSignUpFormData()

  return (
    <div className="flex max-w-sm flex-col gap-5">
      <Dropdown
        value={determineSport(does_ski, does_snowboarding)}
        label="Skier or Snowboarder?"
        onChange={(e) =>
          updateFormData({
            does_ski: doesSki(e.target.value as SportOptions),
            does_snowboarding: doesSnowboarding(e.target.value as SportOptions)
          })
        }
      >
        <option value="" disabled>
          Select...
        </option>
        <option key={SportOptions.SKIER} value={SportOptions.SKIER}>
          Skier
        </option>
        <option key={SportOptions.SNOWBOARDER} value={SportOptions.SNOWBOARDER}>
          Snowboarder
        </option>
        <option key={SportOptions.BOTH} value={SportOptions.BOTH}>
          Both
        </option>
        <option key={SportOptions.NEW} value={SportOptions.NEW}>
          New!
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
        <option value="" disabled>
          Select...
        </option>
        <option key="Yes" value="Yes">
          Yes
        </option>
        <option key="No" value="No">
          No
        </option>
      </Dropdown>

      <TextInput
        type="text"
        label="Dietary Requirements"
        id="DietaryRequirements"
        description="Nuts, Dairy etc"
        defaultValue={dietary_requirements}
        onChange={(e) => {
          updateFormData({ dietary_requirements: e.target.value })
        }}
        required
      />

      <div className="flex flex-col">
        <label htmlFor="hypeLevel">
          How f#&@g excited are you to SEND IT IN 2024!!!!
        </label>
        <ExcitementSlider min={0} max={20} />
      </div>
    </div>
  )
}
