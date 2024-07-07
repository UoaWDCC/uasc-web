import { useState } from "react"
import PaginatedForm, { PageProps } from "./PaginatedForm"
import { render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"

describe("paginated form", () => {
  it("should not perform any callbacks if buttons are disabled", async () => {
    const nextCallBack = jest.fn()
    const backCallBack = jest.fn()
    const TestForm = () => {
      const [currentPage, setCurrentPage] = useState<number>(0)
      const PageContents = [
        <>
          <p>First Page</p>
        </>
      ]

      const PageProps: PageProps[] = [
        {
          title: "First Page",
          index: 0,
          onNext: () => {
            nextCallBack()
            setCurrentPage(1)
          },
          onBack: () => {
            backCallBack()
          },
          backDisabled: true,
          backButtonText: "Exit"
        },

        {
          title: "Second Page",
          index: 1,
          onBack: () => {
            backCallBack()
            setCurrentPage(0)
          }
        }
      ]

      return (
        <>
          <PaginatedForm pages={PageProps} currentPageIndex={currentPage}>
            {PageContents[currentPage]}
          </PaginatedForm>
        </>
      )
    }
    render(<TestForm />)
    const back = await screen.getByTestId("back-button")
    const next = await screen.getByTestId("next-button")

    await act(async () => {
      await back.click()
    })

    expect(backCallBack).not.toHaveBeenCalled()

    await act(async () => {
      await next.click()
    })

    expect(nextCallBack).toHaveBeenCalledTimes(1)

    // click the now disabled button
    await act(async () => {
      await next.click()
    })

    expect(nextCallBack).toHaveBeenCalledTimes(1)

    await act(async () => {
      await back.click()
    })

    // back is now enabled
    expect(backCallBack).toHaveBeenCalledTimes(1)

    await act(async () => {
      await next.click()
    })

    expect(nextCallBack).toHaveBeenCalledTimes(2)
  })
})
