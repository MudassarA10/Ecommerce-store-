 import '@testing-library/jest-dom'
 import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Fix: Mock window.matchMedia for react-slick or any media queries
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

// Optional: Mock react-slick globally (if you don’t care to test the actual slider)
jest.mock('react-slick', () => () => <div>Mocked Slider</div>);

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
       expect(screen.getByText(/home/i)).toBeInTheDocument();
    });

    test('renders Products page at "/products"', () => {
        renderWithRoute('/products');
        expect(screen.getByText(/home/i)).toBeInTheDocument();
    });

    test('renders Cart page at "/cart"', () => {
        renderWithRoute('/cart');
        expect(screen.getByText(/Continue/i)).toBeInTheDocument();
    });

    test('renders Wishlist page at "/wishlist"', () => {
        renderWithRoute('/wishlist');
        expect(screen.getByText(/home/i)).toBeInTheDocument();
    });

    test('renders Checkout page at "/checkout"', () => {
        renderWithRoute('/checkout');
        expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    });

    test('renders About page at "/about"', () => {
        renderWithRoute('/about');
        expect(screen.getByText(/destination/i)).toBeInTheDocument();
    });

    test('renders Contact Us page at "/contact"', () => {
        renderWithRoute('/contact');
        expect(screen.getByText(/available/i)).toBeInTheDocument();
    });

   
    test('renders Admin Login at "/admin/login"', () => {
        renderWithRoute('/admin/login');
        expect(screen.getByText(/admin login/i)).toBeInTheDocument();
    });

    test('redirects to login or renders PrivateRoute at "/admin"', () => {
        renderWithRoute('/admin');
        expect(screen.getByText(/home/i)).toBeInTheDocument();
    });

     

     

    
});