import React from 'react'

import { Modal } from '../src'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    component: Modal,
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
    render: () => (
        <Modal>
            <Modal.Header title="Modal Title" />
        </Modal>
    ),
}
