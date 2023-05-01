import {Meta, StoryObj} from "@storybook/react";
import {Loader} from "../../shared/ui/Loader/Loader";

const meta: Meta<typeof Loader> = {
  title: 'UI/Loader',
  component: Loader,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof Loader>;

export const Loading: Story = {
  render: () => <Loader variant={'loader'}/>
}

export const Circle: Story = {
  render: () => <Loader variant={'circle'}/>
}

export const Ellipsis: Story = {
  render: () => <Loader variant={'ellipsis'}/>
}

export const Spinner: Story = {
  render: () => <Loader variant={'spinner'}/>
}
