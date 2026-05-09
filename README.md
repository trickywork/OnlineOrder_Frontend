# Online Order Frontend

React frontend for the Online Order portfolio project. It provides the customer-facing ordering experience: authentication, restaurant/menu browsing, cart management, and checkout.

## Live Demo

The production portfolio demo is served by the backend Cloud Run service:

- Portfolio URL: `https://onlineorder.junliu.dev`
- Cloud Run service: `onlineorder`
- Cloud Run URL: `https://onlineorder-gb7rmueyna-uc.a.run.app`

This frontend repo remains separate so frontend development history is clear. For low-cost deployment, a production build is copied into the backend repo and served from Spring Boot.

## Tech Stack

- React 19
- Create React App
- Ant Design 4
- Axios/fetch-style API helpers through `src/utils.js`
- Backend pairing: Spring Boot API in `OnlineOrder_Backend`

## Project Structure

```text
OnlineOrder_Frontend/
  src/
    App.js
    index.js
    utils.js
    components/
      FoodList.js
      LoginForm.js
      MyCart.js
      SignupForm.js
  public/
  docs/
    configuration.md
  package.json
```

## Features

- Login and signup screens.
- Restaurant dropdown.
- Menu item grid with names, prices, images, and add-to-cart buttons.
- Cart drawer with item quantities and total price.
- Checkout flow that clears the cart after a successful backend response.

Payment is intentionally not implemented. Checkout confirms the order in the demo backend.

## Local Development

Install dependencies:

```bash
npm install
```

Start the backend first:

```bash
cd /Users/junliu/git_repo/OnlineOrder_Backend
SPRING_PROFILES_ACTIVE=demo PORT=8081 ./gradlew bootRun
```

Start the frontend:

```bash
cd /Users/junliu/git_repo/OnlineOrder_Frontend
npm start
```

Expected local URLs:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:8081
```

The frontend dev server proxies API requests to the backend through `package.json`:

```json
"proxy": "http://localhost:8081"
```

If your backend runs on another port, update the proxy or start Spring Boot with `PORT=8081`.

## How To Use

1. Open the frontend.
2. Register a user or log in with a seeded account.
3. Select a restaurant.
4. Add menu items to the cart.
5. Open the cart drawer.
6. Click checkout.

Expected result:

- The restaurant selector loads from the backend.
- Menu cards render for the selected restaurant.
- Cart total updates after adding items.
- Checkout succeeds and clears the cart.

## API Contract

The frontend expects these backend endpoints:

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/login` | User login. |
| `POST` | `/signup` | User registration. |
| `GET` | `/restaurants/menu` | Restaurant list. |
| `GET` | `/restaurant/{restId}/menu` | Menu for one restaurant. |
| `GET` | `/cart` | Current cart. |
| `POST` | `/cart` | Add item to cart. |
| `POST` | `/cart/checkout` | Checkout current cart. |

## Build

```bash
npm run build
```

The `build/` output can be copied to the backend repo:

```text
/Users/junliu/git_repo/OnlineOrder_Backend/src/main/resources/public
```

## Tests

```bash
npm test
```

## Deployment Notes

This repo is not deployed as a separate Cloud Run service right now. The current cost-conscious setup is:

1. Build this React app.
2. Copy the static build into the backend repo.
3. Deploy one Spring Boot container.
4. Use `onlineorder.junliu.dev` for the complete app.

For a larger production setup, this frontend could also be deployed separately to Cloud Run, Cloudflare Pages, Firebase Hosting, or another static host.

## Additional Notes

Non-code configuration notes are in:

```text
docs/configuration.md
```
