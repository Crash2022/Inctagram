import { Meta, StoryObj } from '@storybook/react'
import { Footer } from '../../components/Footer/Footer'
import { HeaderLayout } from '../../components/HeaderLayout/HeaderLayout'

const meta: Meta<typeof Footer> = {
    title: 'Components/Footer',
    component: Footer,
    tags: ['aotodocs']
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {
    render: () => <Footer />
}

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    },
    render: () => <HeaderLayout />
}
