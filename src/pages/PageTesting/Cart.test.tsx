import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CartPage from '../Cart';

describe('CartPage', () => {
  const renderComponent = () => {
    return render(
      <Router>
        <CartPage />
      </Router>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('renders empty cart message when no items is in the cart', () => {
    renderComponent();
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('renders cart items', () => {
    const cartItems = [
      {
        id: 1,
        title: 'Couch1',
        price: 6500,
        quantity: 1,
        img_url: 'https://i.pinimg.com/originals/04/31/96/0431960cb4edc8c4889faef67289188f.png',
      },
    ];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderComponent();
    expect(screen.getByText('Couch1')).toBeInTheDocument();
    expect(screen.getByText('Quantity:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  test('updates quantity & Price', () => {
    const cartItems = [
      {
        id: 1,
        title: 'Couch1',
        price: 6500,
        quantity: 1,
        img_url: 'https://i.pinimg.com/originals/04/31/96/0431960cb4edc8c4889faef67289188f.png',
      },
    ];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderComponent();
    const quantityInput = screen.getByDisplayValue('1');
    fireEvent.change(quantityInput, { target: { value: '2' } });
    expect(quantityInput).toHaveValue(2);
    expect(screen.getByText('$13000.00')).toBeInTheDocument();
  });

  test('removes item from cart correctly', () => {
    const cartItems = [
      {
        id: 1,
        title: 'Couch1',
        price: 6500,
        quantity: 1,
        img_url: 'https://i.pinimg.com/originals/04/31/96/0431960cb4edc8c4889faef67289188f.png',
      },
    ];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderComponent();
    fireEvent.click(screen.getByText('Remove'));
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('calculates total price', () => {
    const cartItems = [
      {
        id: 1,
        title: 'Couch1',
        price: 6500,
        quantity: 1,
        img_url: 'https://i.pinimg.com/originals/04/31/96/0431960cb4edc8c4889faef67289188f.png',
      },
      {
        id: 2,
        title: 'Couch2',
        price: 8500,
        quantity: 2,
        img_url: 'https://tse2.mm.bing.net/th/id/OIP.TJ-vLPHLHYLmR_OVB98PsAHaHa?pid=ImgDet&w=178&h=178&c=7&dpr=1.5',
      },
    ];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderComponent();
    expect(screen.getByText('Total: $23500.00')).toBeInTheDocument();
  });

  test('navigates to checkout page on checkout button click', async () => {
    const cartItems = [
      {
        id: 1,
        title: 'Couch1',
        price: 6500,
        quantity: 1,
        img_url: 'https://i.pinimg.com/originals/04/31/96/0431960cb4edc8c4889faef67289188f.png',
      },
    ];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderComponent();
    fireEvent.click(screen.getByText('Checkout'));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/checkout');
    });
  });
});