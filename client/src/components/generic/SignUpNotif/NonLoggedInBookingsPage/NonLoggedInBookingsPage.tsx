import LockIcon from "assets/icons/lock.svg?react"

const NonLoggedInBookingsPage = () => {
  return (
    <div className="bg-gray-1 absolute inset-0 flex h-screen w-full justify-center overflow-hidden bg-opacity-70 px-4 py-2">
      <div className="border-gray-3 mt-12 h-fit rounded-md border-2 bg-white p-5">
        <div className="flex items-center justify-center">
          <LockIcon />
        </div>
        <h2 className="xxs:mb-5 mb-10 mt-5 text-center font-bold text-black">
          Sorry!
        </h2>
        <h4 className="text-center text-black">
          Bookings are only available for UASC members.
        </h4>
        <h4 className="xxs:mb-5 mb-10 mt-1 text-center text-black">
          Please sign up or wait until your membership payment has been
          processed.
        </h4>
        <div className="mb-2 flex justify-center">
          <button className="bg-dark-blue-100 rounded-md border p-2 px-8 text-sm font-bold text-white hover:scale-110">
            <a href="/register">Join Now!</a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NonLoggedInBookingsPage
