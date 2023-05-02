import {Meta, StoryObj} from "@storybook/react";
import {Button} from "../../shared/ui/Button/Button";

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button new text',
  },
  argTypes: {
    theme: {
      table: {
        defaultValue: {
          summary: 'primary'
        }
      }
    },
    onClick: {action: 'clicked'}
  }
}

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {theme: "primary"}
}

export const PrimaryWhite: Story = {
  args: {theme: "primaryWhite"}
}

export const Outline: Story = {
  args: {theme: "outline"}
}

export const Clear: Story = {
  args: {theme: 'clear'}
}

