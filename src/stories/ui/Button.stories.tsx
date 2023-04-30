import {Meta, StoryObj} from "@storybook/react";
import {Button} from "../../shared/ui/Button/Button";

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => (
    <Button theme={'primary'}>Button</Button>
  )
}

export const PrimaryWhite: Story = {
  render: () => (
    <Button theme={'primaryWhite'}>Button</Button>
  )
}

export const Outline: Story = {
  render: () => (
    <Button theme={'outline'}>Button</Button>
  )
}

export const Clear: Story = {
  render: () => (
    <Button theme={'clear'}>Button</Button>
  )
}

