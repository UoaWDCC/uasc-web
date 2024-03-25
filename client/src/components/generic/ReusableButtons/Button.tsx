type Props = object

const Button = (props: Props) => {
  return (
    <>
      <button
        className="bg-transparent hover:bg-blue-200 p-3 m-8
          font-semibold rounded-full
          before:ease 
          relative h-12 w-50 
          overflow-hidden 
          border border-black 
          before:absolute 
          before:left-0 
          before:-ml-2 
          before:h-48 
          before:w-48 
          before:origin-top-right 
          before:-translate-x-full 
          before:translate-y-12 
          before:-rotate-90 
          before:bg-blue-700 
          before:transition-all 
          before:duration-300 
          hover:text-white 
          hover:before:-rotate-180"
      >
        <span className="relative z-10 hover:text-white">sign up button</span>
      </button>

      <button
        className="relative flex h-[60px] 
        border border-black
        w-40 
        items-center 
        justify-center 
        overflow-hidden 
        bg-white
        text-black
        shadow-2xl 
        transition-all 
        before:absolute 
        before:h-0
        before:w-0
        before:rounded-full 
        before:bg-blue-600 
        before:duration-700 
        before:ease-out 
        hover:shadow-blue-600 
        hover:before:h-56 
        hover:before:w-56 
        m-8"
      >
        <span className="relative z-10 hover:text-white">sign up button</span>
      </button>

      <button className="bg-orange-500 hover:bg-orange-200 p-1.5 m-8">
        UASC web button v2
      </button>
    </>
  )
}

export default Button
