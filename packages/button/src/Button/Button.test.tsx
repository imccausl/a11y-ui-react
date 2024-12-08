import { render, screen } from '@testing-library/react'

import Button from '.'

describe('Button', () => {
    it('should be clickable', () => {
        render(<Button onClick={() => {}} />)
        expect(screen.getByRole('button')).toMatchInlineSnapshot(`
          <button
            class="sc-bczRLJ dlSsm"
          />
        `)
    })
})
