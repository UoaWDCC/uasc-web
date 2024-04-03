import type { Meta, StoryObj } from "@storybook/react"
import { PaymentForm } from "./PaymentForm"

const meta: Meta<typeof PaymentForm> = {
  component: PaymentForm,
  title: "Payment Form"
}

export default meta

type Story = StoryObj<typeof meta>

/** 
Run 

```
stripe checkout sessions create --currency="nzd" --mode="payment" --ui-mode="embedded" --return-url="asddsad" -d "line_items[0][price_data][currency]=NZD" -d "line_items[0][price_data][unit_amount]=323232" -d "line_items[0][price_data][product]=prod_NjYL3Kyja4nLqf" -d "line_items[0][quantity]=69" 
```

In stripe cli to generate client secret
*/
export const PaymentFormExample: Story = {
  tags: ["autodocs"]
}
