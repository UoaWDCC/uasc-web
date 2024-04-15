import { Benefits } from "components/utils/types"
import LodgeIcon from "assets/icons/mountain_lodge.svg?react"
import TicketIcon from "assets/icons/ticket.svg?react"
import PriceTagIcon from "assets/icons/price_tag.svg?react"
import HandSignIcon from "assets/icons/hand_sign.svg?react"

export const benefits: Benefits[] = [
  {
    text: "Book our cozy ski lodge on the Whakapapa skifield!",
    icon: LodgeIcon
  },
  {
    text: "Access cheaper tickets and priority admission to our sell-out events!",
    icon: TicketIcon
  },
  {
    text: "Meet lifelong friends you can send it with on and off the mountain!",
    icon: HandSignIcon
  },
  {
    text: "Enjoy a range of discounts with our sponsors such as Snowcentre, Pit Viper and many more!",
    icon: PriceTagIcon
  }
]
