import type { Meta } from "@storybook/react"

import ModalContainer from "./ModalContainer"

const meta: Meta<typeof ModalContainer> = {
  component: ModalContainer
}

export default meta

export const ModalContainerOpen = () => <ModalContainer isOpen />
export const ModalContainerClosed = () => <ModalContainer isOpen={false} />
