import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../Navbar';
import { NavbarProps } from '../../types/types';

const renderComponent = (props: Partial<NavbarProps> = {}) => {  //helper function
  const defaultProps: NavbarProps = {
    onToggleFilter: jest.fn(),
    showFilterToggle: true,
    onSearch: jest.fn(),
    ...props,
  };

  return render(
    <Router>
      <Navbar {...defaultProps} />
    </Router>
  );
};

describe('Navbar', () => {
  
  afterEach(() => {
    jest.clearAllMocks(); //Resets the state of all mocks
  });

  test('renders Navbar', () => {
    renderComponent();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favourites')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('calls onToggleFilter when filter button is clicked', () => {
    const onToggleFilter = jest.fn();
    renderComponent({ onToggleFilter });
    fireEvent.click(screen.getByRole('button'));
    expect(onToggleFilter).toHaveBeenCalledTimes(1);
  });

  test('does not render filter button when showFilterToggle is false', () => {
    renderComponent({ showFilterToggle: false });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('calls onSearch when search input changes', () => {
    const onSearch = jest.fn();
    renderComponent({ onSearch });
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'patio' } });
    expect(onSearch).toHaveBeenCalledWith('patio');
  });

  test('navigates to cart page when cart link is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('link', { name: '' }));
    expect(window.location.pathname).toBe('/cart');
  });

  test('navigates to login page when login link is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('link', { name: 'Login' }));
    expect(window.location.pathname).toBe('/login');
  });
});