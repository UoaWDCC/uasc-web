// 4 props: 3 string, 1 image

const EventsCardPreview = () => {
  return (
    <div className="border-gray-3 flex w-full items-center justify-center border p-14">
      <div className="border-gray-3 border">image</div>
      <div className="flex flex-col">
        <h5>date and time</h5>
        <h2>title</h2>
        <p>location</p>
      </div>
    </div>
  )
}

export default EventsCardPreview
