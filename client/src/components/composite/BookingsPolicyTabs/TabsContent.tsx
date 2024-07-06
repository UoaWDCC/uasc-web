import { useState, ReactNode } from "react"
import TabsComponent from "components/generic/TabsComponent/TabsComponent"

const PolicyContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-7 px-3">{children}</div>
}
const PolicyDecimalList = ({ children }: { children: ReactNode }) => {
  return (
    <ol className="text-p mt-4 flex list-decimal flex-col gap-4">{children}</ol>
  )
}
const PolicyLatinList = ({ children }: { children: ReactNode }) => {
  return (
    <ol className="text-p ml-4 flex list-[lower-latin] flex-col gap-4">
      {children}
    </ol>
  )
}

export const BookingPolicyContent = () => (
  <PolicyContainer>
    <h2>Lodge Bookings Policy</h2>
    <section>
      <h3>Making your Booking</h3>
      <PolicyDecimalList>
        <li>Bookings can be made through our website www.uasc.co.nz</li>
        <li>
          The cost of staying at UASC lodge for members is NZD$40.00 per night
          (NZD$60.00 for a Friday/Saturday single night booking). For guests
          (who may only stay with a current member), the cost is NZD$60.00 per
          guest per night or NZD$80.00 for staying Friday/Saturday night only.
        </li>
        <li>
          Members must be aware of and understand the club’s cancellation policy
          (below) before booking.
        </li>
        <li>
          Bookings will be confirmed instantly; you will receive an email
          confirming your booking.
        </li>
        <li>
          Cash payments are not accepted by UASC, even when staying at the
          lodge. All payments must be received through the online booking
          system.
        </li>
        <li>
          When booking using lodge credits, the total cost will be deducted from
          your available credit. You may book nights using a combination of
          lodge credit and paying by card; however, the lodge credit will be
          used first. The full terms for using lodge credits can be found here.
        </li>
      </PolicyDecimalList>
    </section>
    <section>
      <h3>Booking Information for Members</h3>
      <PolicyDecimalList>
        <li>
          Members requiring changes to their booking dates must communicate this
          request via email to the bookings officer at bookings@uasc.co.nz. The
          cancellation policy will apply to any alterations.
        </li>
        <li>
          The occupancy limit of the lodge is 32 members. Members or non-members
          without bookings will be refused accommodation if the lodge is full,
          which may result in disciplinary action.
        </li>
      </PolicyDecimalList>
    </section>
    <section>
      <h3>Booking Information for Guests</h3>
      <PolicyDecimalList>
        <li>
          Members can bring non-member guests throughout Sunday-Thursday nights.
          Guests must be paid for upon booking by emailing bookings@uasc.co.nz.
        </li>
        <PolicyLatinList>
          <li>
            Members are responsible for any non-members they bring along,
            including any damage they sustain to club property.
          </li>
          <li>
            The cancellation policy (below) for guests differs from regular
            member bookings.
          </li>
          <li>
            Guest bookings can be declined during periods of high demand to
            prioritise member bookings.
          </li>
          <li>
            Once a guest booking has been confirmed via email the dates are
            final. There will be a delay in booking confirmation and an invoice
            will be sent. Any changes to the agreed booking are considered
            cancellations and will be processed via the cancellation policy
          </li>
        </PolicyLatinList>
        <li>
          Group bookings for non-members can be organised by contacting the
          bookings officer at bookings@uasc.co.nz
        </li>
      </PolicyDecimalList>
    </section>
    <section>
      <h3>General Rules</h3>
      <PolicyDecimalList>
        <li>
          It is assumed you will arrive after 7 pm on the first night of your
          booking, and therefore, dinner will not be prepared for you. You can
          request dinner on your arrival night by emailing custodian@uasc.co.nz
          at least two days before arrival.
        </li>
        <li>
          UASC lodge credits expire on the 31st of December each year, are not
          transferable to the next ski season and are non-transferable to
          another person.
        </li>
        <li>
          Any matter arising not covered here will be dealt with at the
          discretion of the UASC Committee. All decisions are final.{" "}
        </li>
        <li>
          For any booking disputes, please email the Club Booking Officer at
          bookings@uasc.co.nz. Correspondence will be dealt with at the next
          meeting of the committee.
        </li>
      </PolicyDecimalList>
    </section>
  </PolicyContainer>
)

export const CancellationPolicyContent = () => (
  <PolicyContainer>
    <h2>Cancellation Policy</h2>
    <div className="flex flex-col gap-2">
      <p>
        The club’s cancellation rules are set out below. UASC is a non-profit
        student club that survives on a limited income, and by cancelling at the
        last minute, we may be unable to find someone else to fill the gaps.
        Please keep this in mind when making a booking.
      </p>
      <p>
        All cancellations must be formally communicated via email to the
        Bookings Officer at <u>bookings@uasc.co.nz</u> in accordance with the
        specified timelines and procedures.
      </p>
    </div>
    <section>
      <h3>Member Cancellations</h3>
      <PolicyDecimalList>
        <li>
          To receive a cash or bank transfer refund, an administration fee of
          NZD $5.00 will be charged, and the Bookings Officer must be contacted
          more than seven days prior to the booking.
        </li>
        <li>
          To receive a credit towards a future night, the Booking Officer must
          be contacted more than five days prior to the booking.
        </li>
        <li>
          Cancellations made within five days will not receive a cash refund or
          lodge credit.
        </li>
      </PolicyDecimalList>
    </section>
    <section>
      <h3>Guest Cancellations</h3>
      <PolicyDecimalList>
        <li>
          To receive a cash or bank transfer refund, an administration fee of
          NZD $10.00 will be charged, and the Bookings Officer must be contacted
          more than ten days prior to the booking.
        </li>
        <li>
          Cancellations made within ten days will not receive a cash refund or
          lodge credit.
        </li>
      </PolicyDecimalList>
    </section>
    <section>
      <h3>Further Information</h3>
      <PolicyDecimalList>
        <li>
          Cash refunds may be issued in special circumstances that prevent you
          from getting down to the mountain, as long as the Bookings Officer is
          notified, who has the sole authority to make this decision. If they
          feel it is necessary, they can take it to the committee for a
          decision.
        </li>
        <li>
          If a night or weekend is fully booked and you would like to express
          your interest in being on a waiting list, an email can be sent to the
          Bookings Officer, who will notify those on that list if there is a
          cancellation.
        </li>
        <li>
          Changing the dates of a booking is considered a cancellation and will
          be dealt with as specified here.
        </li>
        <li>
          UASC will not give refunds if you have gone down to the lodge and
          decided to come home early due to bad weather.
        </li>
      </PolicyDecimalList>
    </section>
    <section>
      <h3>Road and Weather Conditions</h3>
      <PolicyDecimalList>
        <li>
          If access to the mountain is closed, i.e. the upper Bruce Road or
          State Highways are officially closed, and you cannot get to the lodge,
          you can claim a refund in the form of credit. This must be claimed by
          contacting the Bookings Officer within a week of the night that was
          booked and not used.
        </li>
        <li>
          Please be aware that if the State Highways or the upper Bruce Road are
          restricted to 4WD or chains, then we will not issue refunds. It is the
          member’s responsibility to check weather reports, state highway
          reports and forecasts to ensure that the lodge is accessible and to
          carry chains if necessary.
        </li>
      </PolicyDecimalList>
    </section>
    <div className="mt-4 flex flex-col gap-2">
      <p>
        For further enquiries or assistance, please direct your correspondence
        to bookings@uasc.co.nz.
      </p>
      <p>
        Any other circumstances or issues that are not covered here will be
        dealt with at the discretion of the UASC Committee. All decisions made
        by the committee are final.
      </p>
      <p>
        If you are unsatisfied with any of the above or want to dispute any
        booking and/or cancellation, please contact the Bookings Officer.
      </p>
    </div>
  </PolicyContainer>
)

export const BehaviourPolicyContent = () => (
  <PolicyContainer>
    <h2>Behaviour Policy</h2>
    <p>
      It is important that all members and guests conduct themselves in a
      responsible manner while at the UASC lodge, any associated lodges and UASC
      events. They must show the utmost respect for their own safety, the safety
      and well-being of other guests, and for the lodge or venue itself. By
      staying at or visiting the lodge, or attending any UASC affiliated events
      you are agreeing to the following rules. If you do not adhere to these
      rules, you may face suspension of your membership or in extreme cases,
      expulsion from the club.
    </p>
    <section>
      <h3>Lodge Rules</h3>
      <PolicyDecimalList>
        <li>
          Everyone staying at or visiting the lodge shall acquaint themselves
          with the fire and safety procedures and comply immediately with fire
          or other safety drills, alarms, instructions, and procedures.{" "}
        </li>
        <li>
          Everyone at the lodge is expected to take all reasonable steps to
          ensure the safety and well-being of themselves, other members, and
          guests.
        </li>
        <li>
          Everyone staying at the lodge is to sign up for a chore and they are
          to complete their duty in a reasonable timeframe.
        </li>
        <PolicyLatinList>
          <li>
            Breakfast and lounge clean-up duties are to be done before skiing or
            boarding that day.
          </li>
          <li>
            All other duties require common sense as to when they should be
            completed. If unsure, then ask the custodian or any senior member of
            the club.
          </li>
        </PolicyLatinList>
        <li>
          All people staying in or visiting the lodge are required to treat each
          other kindly. Any violence, discrimination, or bullying of any kind
          will not be tolerated.{" "}
        </li>
        <li>
          All instructions issued by the custodian or any member of the
          committee must be strictly adhered to.{" "}
        </li>
        <li>
          Members and guests are to take responsibility for their bunk area as
          well as all communal areas, making sure that they are clean, tidy, and
          properly looked after.
        </li>
        <li>
          The food kept in the food store is only for members and guests for
          breakfast and dinner. The custodian or their appointee will point out
          what food is to be used for those meals.{" "}
        </li>
        <li>
          Outside of breakfast and dinner, any food prepared is not to be the
          club's and must be cleaned up by the person/s making the food.
        </li>
        <li>
          Do not help yourself to food or drinks that do not belong to you
          regardless of whether it is the club's or another guest's.
        </li>
        <li>
          All visitors to the lodge who are not staying at the UASC lodge or
          another lodge booked by UASC must be approved and introduced to the
          custodian and/or a member of the committee.
        </li>
        <li>
          The custodian room, committee room, and food store are out of bounds
          for members and guests unless permission is granted by the custodian
          or a member of the committee.
        </li>
        <li>
          UASC is not responsible for the loss, theft, or damage of any personal
          belongings. Guests are responsible for their personal belongings.
        </li>
        <li>
          Damage of any lodge property must be reported to the custodian
          immediately. If damage is deemed to be purposeful or reckless, the
          perpetrator may be responsible for repairs.
        </li>
        <li>
          The UASC Lodge is a drug & smoke-free environment; vaping is only
          allowed outdoors.
        </li>
      </PolicyDecimalList>
    </section>
    <section>
      <h3>Drinking and Partying Rules:</h3>
      <PolicyDecimalList>
        <li>
          All members and guests must ensure they drink responsibly when at the
          lodge.
        </li>
        <li>
          Anybody found to consistently put themselves or others in danger, or
          being a general nuisance as a result of consuming alcohol will be
          given two warnings, followed by a suspension of membership if the
          behaviour continues.
        </li>
        <li>
          All empties are to be put in the appropriate recycling bins as they
          are finished
        </li>
        <li>
          Music must be off by 1am during regular weekday/weeknight bookings or
          at the custodian/committee's discretion.
        </li>
        <li>
          All members, guests, committee and custodians are expected to clean up
          any and all of their messes as they occur, with appropriate cleaning
          supplies
        </li>
      </PolicyDecimalList>
    </section>
    <section>
      <h3>Staying in Other Lodges while Affiliated with UASC:</h3>
      <PolicyDecimalList>
        <li>
          While staying in any lodge or accommodation as either a UASC member or
          a guest to a UASC event these rules will serve as a minimum and
          members/guests are expected to know both these rules and the rules of
          the lodge they are staying at.
        </li>
        <li>
          Any complaints received by the committee about any conduct of any
          member staying in another lodge will be deemed as a severe disregard
          of these rules and treated as such.
        </li>
      </PolicyDecimalList>
    </section>
    <section>
      <h3>Grounds for Suspension or Expulsion of Membership:</h3>
      <PolicyDecimalList>
        <li>
          Any blatant or severe disregard for the above rules will go before the
          committee as per the constitution for suspension or expulsion of
          membership, as per the contitution.
        </li>
        <PolicyLatinList>
          <li>
            Given that the Committee shall first call upon that member or
            members for an explanation of their conduct,{" "}
          </li>
          <li>
            The Committee shall hear what they may wish to urge in her or his
            defence.
          </li>
          <li>
            The decision of the Committee thereon shall be final and binding,
            and shall not be subject to review by any person or body.
          </li>
        </PolicyLatinList>
        <li>
          As per the constitution, the president or their representative may
          temporarily suspend a member from enjoyment of any or all of the
          privileges of membership until the next meeting of the Committee, or
          for any period for less than one month in duration.
        </li>
        <li>
          All members have the right to voice a complaint or concern about the
          behaviour, actions or conduct of another member. These can be directed
          to the wellbeing officers' email/ form, or any committee members' club
          email address.
        </li>
        <PolicyLatinList>
          <li>
            If a complaint or concern is voiced to the wellbeing officers, the
            officers will first try to resolve the issue through informal action
            or mediation between the parties. This complaint or concern will not
            be voiced to the whole committee. If this issue is unable to be
            resolved, the wellbeing officers will raise the complaint or concern
            with the President. If it still goes unresolved, the complaint or
            concern will be raised with the committee, and will be reviewed at
            the next committee meeting to determine if there are grounds to
            pursue the complaint or concern further, and reach a resolution.
          </li>
          <li>
            If an email is directly sent to any committee member's club email
            address, the complaint or concern will be reviewed at the next
            committee meeting to determine if there are grounds to pursue the
            complaint or concern further.
          </li>
        </PolicyLatinList>
        <li>
          All discussions and proceedings related to conflict resolution or
          disciplinary matters shall be treated with utmost confidentiality.
        </li>
        <li>
          Any other conduct not covered by these rules that is deemed
          unacceptable, by any member of the club or person or group will be
          reviewed by the committee and dealt with as they see fit in accordance
          with the constitution.
        </li>
      </PolicyDecimalList>
    </section>
  </PolicyContainer>
)
enum PolicyPage {
  ONE,
  TWO,
  THREE
}
const exampleHeadings = [
  {
    title: "LODGE BOOKINGS",
    content: <BookingPolicyContent />,
    index: PolicyPage.ONE
  },
  {
    title: "CANCELLATION",
    content: <CancellationPolicyContent />,
    index: PolicyPage.TWO
  },
  {
    title: "BEHAVIOUR",
    content: <BehaviourPolicyContent />,
    index: PolicyPage.THREE
  }
]

export const PolicyTabs = () => {
  const [index, setIndex] = useState<PolicyPage>(PolicyPage.ONE)
  return (
    <TabsComponent
      tabs={exampleHeadings}
      selectedIndex={index}
      setCurrentIndex={setIndex}
    />
  )
}
