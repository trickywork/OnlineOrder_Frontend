// User login API call
export const login = (credentials) => {
  // Build login URL with username and password as query parameters
  const loginUrl = `/login?username=${credentials.username}&password=${credentials.password}`;

  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    // Check if response status indicates an error
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log in");
    }
    // Read response body to ensure request completes
    await response.text();
    return response;
  });
};

// User signup API call
export const signup = (data) => {
  const signupUrl = "/signup";

  return fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Convert JS object to JSON string
  }).then(async (response) => {
    // Check if response status indicates an error
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to sign up");
    }
    // Read response body to ensure request completes
    await response.text();
    return response;
  });
};

// Get menu items for a specific restaurant
export const getMenus = (restId) => {
  return fetch(`/restaurant/${restId}/menu`).then((response) => {
    // Check if response status indicates an error
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get menus");
    }
    // Parse response as JSON
    return response.json();
  });
};

/*

What's the difference between JSON and JS Object?
JSON - string, but it has the format of a obj i.e. {key: value}
- key: must be double quoted

JS Object - Object {key: value}
- key: double quoted?

*/

// Get list of all restaurants
export const getRestaurants = () => {
  return fetch("/restaurants/menu").then((response) => {
    // Check if response status indicates an error
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get restaurants");
    }
    // Parse response as JSON
    return response.json();
  });
};

// Get current shopping cart data
export const getCart = () => {
  return fetch("/cart").then((response) => {
    // Check if response status indicates an error
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get shopping cart data");
    }
    // Parse response as JSON
    return response.json();
  });
};

// Checkout and complete the order
export const checkout = () => {
  return fetch("/cart/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    // Check if response status indicates an error
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to checkout");
    }
    // Read response body to ensure request completes
    await response.text();
    return response;
  });
};

// Add a menu item to shopping cart
export const addItemToCart = async (itemId) => {
  // Prepare payload with menu item ID
  const payload = {
    menu_id: itemId,
  };

  const response = await fetch(`/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // Check if response status indicates an error
  if (response.status < 200 || response.status >= 300) {
    throw Error("Fail to add menu item to shopping cart");
  }
  // Read response body to ensure request completes
  await response.text();
  return;
};


