import {Meta, StoryObj} from "@storybook/react";
import {Footer} from "../../components/Footer/Footer";

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['aotodocs'],
  parameters: {
    docs: {
      description: {
        component: 'It show only if @media(max-width: 390px)'
      }
    }
  }
}

export default meta;
type Story = StoryObj<typeof Footer>;

export const Primary: Story = {
  render: () => <Footer />
}