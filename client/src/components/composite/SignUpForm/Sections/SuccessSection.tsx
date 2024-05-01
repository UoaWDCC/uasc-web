export interface ISuccessSectionProps {
  infoText: string
}

type props = ISuccessSectionProps

const SuccessSection = ({ infoText }: props) => {
  return (
    <div>
      <h3 className="text-bold">{infoText}</h3>
    </div>
  )
}

export default SuccessSection
