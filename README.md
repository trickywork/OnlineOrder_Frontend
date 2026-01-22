# Online Order Frontend

Frontend application for Jun's Restaurant online ordering system built with React and Ant Design.

## Features

- User authentication (login/signup)
- Restaurant menu browsing
- Shopping cart management
- Order checkout

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

1. Register a new account or login
2. Select a restaurant from the dropdown
3. Browse menu items and add to cart
4. View cart and checkout

## License

Private
