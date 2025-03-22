interface IMembersOnlyMessage {
    isMembersOnly: boolean
}

export const MembersOnlyMessage = ({ isMembersOnly }: IMembersOnlyMessage) => {
    return isMembersOnly ? <span className="text-light-blue-100"> - Members Only!</span> : null
}