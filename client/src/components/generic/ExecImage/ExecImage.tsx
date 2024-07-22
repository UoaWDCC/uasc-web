import React from "react"
import Image from "next/image"
// import "./ExecImage.css"

export interface ExecImageProps {
  src: string
  alt: string
  title: string
  name: string
}

const ExecImage: React.FC<ExecImageProps> = ({ src, alt, title, name }) => {
  return (
    <div className="group relative flex h-[163px] w-[163px] flex-shrink-0 overflow-hidden rounded-[4px]">
      <Image
        src={src}
        alt={alt}
        width={163}
        height={163}
        className="h-full w-full object-cover transition-opacity duration-300"
      />
      <div className="absolute left-0 top-0 h-full w-full bg-[rgba(40,61,135,0.8)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-[12px] font-bold uppercase tracking-wider text-white">
          {title}
        </p>
        <p className="text-[16px] font-normal text-white">{name}</p>
      </div>
    </div>
  )
}

export default ExecImage
