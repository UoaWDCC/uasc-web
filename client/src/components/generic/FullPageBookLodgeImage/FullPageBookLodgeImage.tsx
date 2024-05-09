interface IFullPageBookLodgeImage {
  children: React.ReactNode
}

const FullPageBookLodgeImage = ({ children }: IFullPageBookLodgeImage) => (
  <div className="bg-book-lodge-image relative z-0 mt-10 flex h-screen flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat">
    <div className="bg-gray-1  absolute -z-30 h-screen w-full opacity-20" />
    {children}
  </div>
)

export default FullPageBookLodgeImage
