import {Header as HeaderComponent} from "../../components/Header/Header";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof HeaderComponent> = {
  title: 'Components/Header',
  component: HeaderComponent,
  tags: ['aotodocs']
}

export default meta;
type Story = StoryObj<typeof HeaderComponent>;

export const Header: Story = {
  render: () => <HeaderComponent />
}