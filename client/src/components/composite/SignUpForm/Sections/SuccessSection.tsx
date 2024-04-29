export interface ISuccessSectionProps {
  infoText: string
}

type props = ISuccessSectionProps

const SuccessSection = ({ infoText }: props) => {
  return (
    <div>
      <p>{infoText}</p>
    </div>
  )
}

export default SuccessSection
