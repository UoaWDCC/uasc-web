interface IResponsiveBackgroundImage {
  children: React.ReactNode
}
/**
 * to find/change the bg you need to check the
 * `backgroundImage` property in `tailwind.config.ts`
 */
const ResponsiveBackgroundImage = ({ children }: IResponsiveBackgroundImage) => (
    <div className="relative bg-mountain-background-image min-h-screen bg-cover">
      <div className="absolute inset-0 bg-gray-1 opacity-70 pointer-events-none" />
      <div className="relative inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );

export default ResponsiveBackgroundImage
