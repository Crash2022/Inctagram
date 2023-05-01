import {Header} from "../../components/Header/Header";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['aotodocs']
}

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  render: () => <Header />
}