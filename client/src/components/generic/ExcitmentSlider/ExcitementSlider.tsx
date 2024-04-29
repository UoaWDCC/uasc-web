import React, { useState } from "react"

interface ExcitementSliderProps {
  min: number
  max: number
  children?: string
}

const ExcitementSlider: React.FC<ExcitementSliderProps> = ({ min, max }) => {
  const [value, setValue] = useState(min)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value))
  }

  const handleMouseUp = () => {
    if (value === max) {
      // Convert the range slider to a text box or perform any other action
      console.log("Slider reached maximum")
    }
  }

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleMouseUp}
      />
    </div>
  )
}

export default ExcitementSlider
