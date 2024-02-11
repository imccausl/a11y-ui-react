import { Button } from '../src'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Button
} satisfies Meta<typeof Button>

export default meta

type Story  = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: "I am a Button"
  }
}
