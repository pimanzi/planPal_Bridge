import { render, fireEvent } from '@testing-library/react';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import DarkModeToggle from './DarkModeToggle';
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  // Mock window.matchMedia for each test
  (window.matchMedia as any) = vi.fn().mockImplementation((query) => ({
    matches: query.includes('dark'),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));

  // Clear localStorage before each test
  localStorage.clear();
});

describe('DarkModeToggle', () => {
  it('initially sets dark mode based on system preference', () => {
    // Simulating user prefers dark mode
    (window.matchMedia as any).mockImplementationOnce(() => ({
      matches: true, // Simulating user prefers dark mode
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    render(
      <DarkModeContext>
        <DarkModeToggle />
      </DarkModeContext>
    );

    // Check if dark mode class is set based on system preference
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles dark mode based on button clicks and respects localStorage', () => {
    // Simulate user prefers light mode for the toggle test
    (window.matchMedia as any).mockImplementationOnce(() => ({
      matches: false, // Simulating user prefers light mode
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    const { getByRole } = render(
      <DarkModeContext>
        <DarkModeToggle />
      </DarkModeContext>
    );

    const button = getByRole('button');
    expect(button).toBeInTheDocument();

    // Initially, it should not have dark class
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click to toggle dark mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    // Verify localStorage is set
    expect(localStorage.getItem('isDark')).toBe('true');

    // Click again to toggle back to light mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    // Verify localStorage is set
    expect(localStorage.getItem('isDark')).toBe('false');
  });
});
