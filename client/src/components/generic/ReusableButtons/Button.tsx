type Props = object

const Button = (props: Props) => {
  return (
    <>
      <button
        className="bg-transparent hover:bg-blue-200 p-3 m-8
      font-semibold rounded-full
      before:ease relative h-12 w-50 overflow-hidden border border-black before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-blue-700 before:transition-all before:duration-300 hover:text-white hover:blue hover:before:-rotate-180"
      >
        UASC web button v1
      </button>

      <button className="bg-orange-500 hover:bg-orange-200 p-1.5">
        UASC web button v1
      </button>
    </>
  )
}

export default Button
