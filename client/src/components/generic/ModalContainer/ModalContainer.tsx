interface IModalContainer {
  children?: React.ReactNode
  /**
   * Whether or not the modal should be displayed or not
   */
  isOpen?: boolean
}

/**
 * Used as the absolutely positioned wrapper for popup elements. Will hide the children and
 * disable pointer events when closed.
 *
 * Must be controlled via the `isOpen` prop. It is recommended to have an `onClose` handler
 * or similar on any child elements, as this does now provide one
 *
 * @example
 * <ModalContainer isOpen={openState}>
 *  <ModalContents handleClose={() => setOpenState(false)}/>
 * </ModalContainer>
 */
const ModalContainer = ({ children, isOpen = false }: IModalContainer) => {
  return (
    <div
      className={`${isOpen && "animate-fadeIn"}
                  ${!isOpen && "pointer-events-none opacity-0"}
                    min-w-screen absolute left-0 top-0 flex h-full min-h-screen w-full items-center
                    justify-center overflow-auto bg-black/75 transition-opacity sm:pb-4`}
    >
      {children}
    </div>
  )
}

export default ModalContainer
