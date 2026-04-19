import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '../button'
import React from 'react'

describe('Button Component', () => {
  it('renders correctly with given text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeDefined()
  })

  it('applies standard variant styles', () => {
    render(<Button variant="default">Test Button</Button>)
    const button = screen.getByText('Test Button')
    expect(button.className).toContain('bg-primary')
  })

  it('renders as a disabled element when specified', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByText('Disabled Button')
    expect(button).toBeDisabled()
  })
})
