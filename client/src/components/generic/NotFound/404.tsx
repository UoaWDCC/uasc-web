import Wind from "@/assets/icons/wind.svg"
import Button from "@/components/generic/FigmaButtons/FigmaButton"
import Link from "next/link"

const NoMatch = () => {
  return (
    <div className="flex h-screen justify-center ">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <Wind className="fill-dark-blue-100" />

        <h2>Error 404</h2>
        <h4>Sorry! Page not found</h4>
        <div className="pt-12">
          <Link href="/">
            <Button iconSide="left" variant="progress-default">
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NoMatch
