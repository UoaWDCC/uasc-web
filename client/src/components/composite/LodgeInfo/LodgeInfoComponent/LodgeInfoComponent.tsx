import Link from "next/link"
import Button from "@/components/generic/FigmaButtons/FigmaButton"

const LodgeInfoComponent = () => {
  const handleBookLodgeClick = () => {
    // Your onClick logic here
    console.log("Book The Lodge button clicked")
  }

  return (
    <div className="border-gray-3 flex h-full w-full flex-col justify-center rounded border bg-white px-6 py-12 pb-8">
      <div className="text-dark-blue-100 flex flex-col gap-4 lg:justify-center">
        <div className="flex flex-col gap-4">
          <p>
            The UASC Lodge is located in the Whakapapa Ski field and is just a
            3-5 min walk from the bottom of the Sky Waka Gondola, meaning you
            can be on the slopes in no time!
          </p>
          <p>
            Visit{" "}
            <Link href="https://www.whakapapa.com/report" legacyBehavior>
              <a className="text-blue-500 underline">
                www.whakapapa.com/report
              </a>
            </Link>{" "}
            for the Whakapapa Ski field status, lift, food and retail status and
            status of other activities.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-dark-blue-100 text-2xl font-bold">Address</h2>
          <p>Bruce Road, Manawatū-Whanganui</p>
          <p>
            <b>Please read UASC policy below before booking.</b>
          </p>
        </div>
        <div className="flex justify-center pt-3">
          <Link href="/booking">
            <Button variant="default-sm" onClick={handleBookLodgeClick}>
              Book The Lodge
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LodgeInfoComponent
