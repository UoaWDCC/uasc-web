/**
 * import Dialog, { ConfirmationDialog, IDialogProps } from "./ConfirmationDialog.story";
import { useState } from "react"
import { render, act, screen } from "@testing-library/react"

test("Calls the correct function upon clicking on the buttons", async ()=>{
    const leftFakeFunction = jest.fn()
    const rightFakeFunction = jest.fn()
    const TestComponent = () => {
        return(
            <ConfirmationDialog title='w' text='w' variant="default" left='w' right=''/>
        )   
    }
    render(<ConfirmationDialog />)
    const test1 = screen.getByTestId("first")

    await act(async ()=>){
        await TestComponent
    }
}) 

*/
