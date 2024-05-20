interface IResponsiveBackgroundImage {
  children: React.ReactNode
}
/**
 * to find/change the bg you need to check the
 * `backgroundImage` property in `tailwind.config.ts`
 */
const ResponsiveBackgroundImage = ({
  children
}: IResponsiveBackgroundImage) => (
  <div className="bg-mountain-background-image relative min-h-screen bg-cover">
    <div className="bg-gray-1 pointer-events-none absolute inset-0 opacity-70" />
    <div className="relative inset-0 flex items-center justify-center">
      {children}
    </div>
  </div>
)

export default ResponsiveBackgroundImage
