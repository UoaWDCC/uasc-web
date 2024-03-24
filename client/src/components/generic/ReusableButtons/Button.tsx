type Props = object

const Button = (props: Props) => {
  return (
    <>
      <button className="bg-amber-400 hover:bg-cyan-600 p-2 m-8">
        Button Version 1
      </button>

      <button className="bg-amber-400 hover:bg-cyan-600">
        Button Version 2
      </button>
    </>
  )
}

export default Button
