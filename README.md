# Online Order Frontend

Frontend application for Jun's Restaurant online ordering system built with React and Ant Design.

## Features

- User authentication (login/signup)
- Restaurant menu browsing
- Shopping cart management
- Order checkout

## Feature Details

### User Authentication

The app supports user registration and login. New users can create an account by providing:
- Email address
- Password
- First name and last name

Registered users can log in using their username and password. The authentication state is managed in the main App component, which conditionally renders either the login form or the main application interface.

### Restaurant Menu Browsing

Users can browse available restaurants and their menus:
- A dropdown selector displays all available restaurants
- Selecting a restaurant loads and displays its menu items
- Each menu item shows:
  - Food image
  - Item name
  - Price
  - Add to cart button

The menu items are displayed in a responsive grid layout that adapts to different screen sizes.

### Shopping Cart

The shopping cart functionality allows users to:
- Add items to cart by clicking the "+" button on menu items
- View all items in the cart with their quantities
- See the total price of all items
- Access the cart via a drawer component that slides in from the right

The cart data is fetched from the backend when the drawer is opened, ensuring it always displays the current state.

### Order Checkout

Users can complete their orders through the checkout process:
- Click the "Checkout" button in the cart drawer
- The system processes the order through the backend API
- Upon successful checkout, the cart is cleared and a success message is displayed
- The cart drawer automatically closes after checkout

**Note**: Payment integration is not implemented in the current version. The checkout process only confirms the order without processing actual payment.

## Tech Stack

- React 19.2.3
- Ant Design 4.24.16
- Create React App

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`.

### Configuration

The backend API proxy is configured in `package.json`:

```json
"proxy": "http://localhost:8080"
```

Update this if your backend runs on a different port.

## Project Structure

```
src/
├── components/
│   ├── FoodList.js      # Menu display component
│   ├── LoginForm.js     # Login form
│   ├── MyCart.js        # Shopping cart
│   └── SignupForm.js    # Registration form
├── utils.js             # API utilities
├── App.js               # Main app component
└── index.js             # Entry point
```

## API Endpoints

- `POST /login` - User login
- `POST /signup` - User registration
- `GET /restaurants/menu` - Get restaurants list
- `GET /restaurant/:restId/menu` - Get restaurant menu
- `GET /cart` - Get cart data
- `POST /cart` - Add item to cart
- `POST /cart/checkout` - Checkout

## Available Scripts

- `npm start` - Start dev server
- `npm test` - Run tests
- `npm run build` - Build for production

## Usage

### Test Account

A default test account is available for quick access:

- **Email**: `foo@mail.com`
- **Password**: `123456`

### User Flow

1. Register a new account or login with the test account
2. Select a restaurant from the dropdown
3. Browse menu items and add to cart
4. View cart and checkout

