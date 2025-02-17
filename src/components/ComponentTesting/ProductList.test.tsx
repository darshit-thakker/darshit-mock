import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductList from '../ProductList';
import { ProductListProps } from '../../types/types';
import db from '../../../db.json';

const productTitles = db.items.map(item => item.title);
const productCategories = db.categories.map(category => category.name);

const defaultProps: ProductListProps = {
  filters: {
    colors: db.color.map(c => c.name),
    categories: productCategories,
    collections: db.collection.map(c => c.name),
    priceRange: 10000,
  },
  searchQuery: '',
};

const renderComponent = (props: Partial<ProductListProps> = {}) => {
  return render(
    <Router>
      <ProductList {...defaultProps} {...props} />
    </Router>
  );
};

describe('ProductList', () => {
  afterEach(() => {
    jest.clearAllMocks(); //Resets the state of all mocks
  });

  test('renders ProductList component', async () => {
    renderComponent();
    expect(await screen.findByText('Furniture Shop')).toBeInTheDocument();
  });

  test('filters by category', async () => {
    renderComponent({ filters: { ...defaultProps.filters, categories: [productCategories[0]]} });
    await waitFor(() => {
      expect(screen.getByText(productTitles[0])).toBeInTheDocument();
    });
  });

  test('adding products', async () => {
    renderComponent();
    const addToCartButton = await screen.findByLabelText(`Add ${productTitles[0]} to cart`);
    fireEvent.click(addToCartButton);
    await waitFor(() => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      expect(cartItems).toHaveLength(1);
      expect(cartItems[0].title).toBe(productTitles[0]);
    });
  });
});