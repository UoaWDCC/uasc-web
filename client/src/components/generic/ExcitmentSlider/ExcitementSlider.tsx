"use client"

import type React from "react"
import { useState } from "react"

interface ExcitementSliderProps {
  /**
   * The lowest value the slider should go to
   *
   * @example -69
   */
  min: number

  /**
   * The lowest value the slider should go to
   *
   * @example 69
   */
  max: number
}

const ExcitementSlider: React.FC<ExcitementSliderProps> = ({ min, max }) => {
  const [value, setValue] = useState(min)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value) // updates value state based on the new value
    setValue(newValue)
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center">
      <div className="mt-3 flex w-full items-center gap-4">
        <span>0</span>
        <div className="relative h-10 w-full">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            className="slider bg-gray-2 rounded-m h-3 w-full translate-y-3/4 transform appearance-none"
          />
          <div className="pointer-events-none absolute top-0 h-10 w-full overflow-hidden rounded-md">
            <div
              className="bg-orange  w-[calc(100%-20px)] p-1 text-center text-3xl font-black italic text-white transition-all duration-100 ease-in-out"
              style={{
                clipPath: `inset(0 ${(1 - value / max) * 100}% 0 0)`
              }}
            >
              HYPED!!!!!!!!!!!!!
            </div>
          </div>
        </div>
        <style>
          {` 
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 40px;
            background: #fff;
            border: 2px solid darkgrey;
            border-radius: 0.25rem; 
            cursor: pointer;
          }
        `}
        </style>
        <span>10</span>
      </div>
    </div>
  )
}

export default ExcitementSlider
