import { SearchInput } from '../../shared/ui/SearchInput/SearchInput'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SearchInput> = {
    title: 'UI/Search _Input',
    component: SearchInput
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Input: Story = {
    render: (args) => <SearchInput {...args} />
}
