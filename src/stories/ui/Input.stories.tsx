import { Meta, StoryObj } from '@storybook/react'
import { Input } from '../../shared/ui/Input/Input'

const meta: Meta<typeof Input> = {
    title: 'UI/_Input',
    component: Input,
    tags: ['autodocs'],
    args: {
        error: '',
        password: false
    }
}

export default meta
type Story = StoryObj<typeof Input>

export const BaseInput: Story = {
    render: (args) => <Input {...args} />
}

export const Error: Story = {
    args: {
        error: 'Some error message!'
    }
}
