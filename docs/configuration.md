# Online Order Frontend Configuration

This file records the non-code setup needed to run and pair the frontend with its backend.

## Runtime Shape

This is a Create React App frontend. It is kept in a separate GitHub repo for development history.

The current low-cost deployed portfolio version is served by the backend repo after a production build is copied into:

```text
../OnlineOrder_Backend/src/main/resources/public
```

This frontend repo does not have its own database.

## Local API Wiring

The source code calls relative API paths such as:

```text
/signup
/restaurants/menu
/cart
```

During local development, Create React App forwards those requests using the proxy in `package.json`:

```json
"proxy": "http://localhost:8081"
```

So the local startup order is:

1. Start `OnlineOrder_Backend` on `http://localhost:8081`.
2. Start this frontend on `http://localhost:3002` when running the full portfolio stack.

## Local Environment

`.env.example` is intentionally minimal:

```env
PORT=3002
```

The effective backend URL is the `proxy` field in `package.json`, not an env var.

## Local Startup

```bash
cd OnlineOrder_Backend
PORT=8081 SPRING_PROFILES_ACTIVE=demo ./gradlew bootRun
```

In another terminal:

```bash
cd OnlineOrder_Frontend
npm install
PORT=3002 npm start
```

Open:

```text
http://localhost:3002
```

## Production Build Handoff

When the frontend changes and you want the single low-cost Cloud Run service to show the new UI:

```bash
cd OnlineOrder_Frontend
npm run build
rm -rf ../OnlineOrder_Backend/src/main/resources/public
cp -R build ../OnlineOrder_Backend/src/main/resources/public
```

Then commit and push the backend repo so the `onlineorder-main-deploy` trigger redeploys the combined service.

## Cloud Resources

The standalone frontend repo currently has no separate Cloud Run service.

Combined deployed service:

```text
https://onlineorder-gb7rmueyna-uc.a.run.app
```

Custom domain:

```text
onlineorder.junliu.dev
```

## Cost Notes

- Keeping this frontend served by the backend means one Cloud Run service instead of two.
- No database, object storage, or secrets are required in this frontend repo.
