interface IFullPageBackgroundImage {
  children: React.ReactNode
}
/**
 * to find/change the bg you need to check the
 * `backgroundImage` property in `tailwind.config.ts`
 */
const FullPageBackgroundImage = ({ children }: IFullPageBackgroundImage) => (
  <div
    className="bg-mountain-background-image 
         relative z-0 -mt-14 flex h-screen
          min-h-screen flex-col items-center
         justify-center overflow-hidden
         bg-cover bg-center " 
  >
    <div className="bg-gray-1 pointer-events-none absolute -z-30 h-screen w-full opacity-70" />
    {children}
  </div>
)

export default FullPageBackgroundImage
