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
 * Must be controlled via the `isOpen` prop.
 *
 * @example
 * <ModalContainer>
 *  <ModalContents/>
 * </ModalContainer>
 */
const ModalContainer = ({ children, isOpen = false }: IModalContainer) => {
  return (
    <div
      className={`${isOpen && "animate-fadeIn"}  ${!isOpen && "pointer-events-none opacity-0"}
                    absolute left-0 top-0 flex 
                    h-fit min-h-screen w-[calc(100vw-16px)] max-w-full
                    items-center justify-center overflow-hidden overflow-y-auto 
                    overflow-x-hidden bg-black/75 transition-opacity`}
    >
      {children}
    </div>
  )
}

export default ModalContainer
