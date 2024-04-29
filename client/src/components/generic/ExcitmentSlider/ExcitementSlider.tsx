import React, { useState } from "react"

interface ExcitementSliderProps {
  min: number
  max: number
  children: string
}

const ExcitementSlider: React.FC<ExcitementSliderProps> = ({ min, max }) => {
  const [value, setValue] = useState(min)
  const [isDragging, setIsDragging] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value) // updates value state based on the new value
    setValue(newValue)
  }

  const handleMouseDown = () => {
      setIsDragging(true) // checks if current value equals the max value and set isMax to true
    
  }
  const handleMouseUp = () => {
    setIsDragging(false) // checks if current value equals the max value and set isMax to true
  
}
  return (
    <div>
      {isDragging ? (
        <div className="bg-light-blue-100 p-4 text-center transition-all duration-300 ease-in-out">
          {"Text"}
        </div>
      ) : (
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="w-full"
        />
      )}
    </div>
  )
}

export default ExcitementSlider
