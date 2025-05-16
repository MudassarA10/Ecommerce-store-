import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Helper to render with initial route
const renderWithRoute = (initialRoute = '/') => {
    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
            <App />
        </MemoryRouter>
    );
};

describe('App Routing', () => {
    test('renders Home page at "/"', () => {
        renderWithRoute('/');
        expect(screen.getByText(/home/i)).toBeInTheDocument(); // adjust if needed
    });

    test('renders Products page at "/products"', () => {
        renderWithRoute('/products');
        expect(screen.getByText(/products/i)).toBeInTheDocument();
    });

    test('renders Cart page at "/cart"', () => {
        renderWithRoute('/cart');
        expect(screen.getByText(/cart/i)).toBeInTheDocument();
    });

    test('renders Wishlist page at "/wishlist"', () => {
        renderWithRoute('/wishlist');
        expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
    });

    test('renders Checkout page at "/checkout"', () => {
        renderWithRoute('/checkout');
        expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    });

    test('renders About page at "/about"', () => {
        renderWithRoute('/about');
        expect(screen.getByText(/about/i)).toBeInTheDocument();
    });

    test('renders Contact Us page at "/contact"', () => {
        renderWithRoute('/contact');
        expect(screen.getByText(/contact/i)).toBeInTheDocument();
    });

    test('renders Order Confirmation at "/order-confirmation"', () => {
        renderWithRoute('/order-confirmation');
        expect(screen.getByText(/order confirmation/i)).toBeInTheDocument();
    });

    test('renders Product Detail at "/product/:id"', () => {
        renderWithRoute('/product/123');
        expect(screen.getByText(/product detail/i)).toBeInTheDocument();
    });

    test('renders Admin Login at "/admin/login"', () => {
        renderWithRoute('/admin/login');
        expect(screen.getByText(/admin login/i)).toBeInTheDocument();
    });

    test('redirects to login or renders PrivateRoute at "/admin"', () => {
        renderWithRoute('/admin');
        expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
    });

    test('renders Admin Products at "/admin/products"', () => {
        renderWithRoute('/admin/products');
        expect(screen.getByText(/admin products/i)).toBeInTheDocument();
    });

    test('renders Add Product at "/admin/products/add"', () => {
        renderWithRoute('/admin/products/add');
        expect(screen.getByText(/add product/i)).toBeInTheDocument();
    });

    test('renders Edit Product at "/admin/products/edit/:id"', () => {
        renderWithRoute('/admin/products/edit/123');
        expect(screen.getByText(/edit product/i)).toBeInTheDocument();
    });
});