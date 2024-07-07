interface IFullPageBookLodgeImage {
  children: React.ReactNode
}

const FullPageBookLodgeImage = ({ children }: IFullPageBookLodgeImage) => (
  <div className="bg-book-lodge-image relative z-0 -mt-14 flex h-svh flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat">
    <div className="bg-gray-1  absolute -z-30 h-svh w-full overflow-hidden opacity-20" />
    {children}
  </div>
)

export default FullPageBookLodgeImage
