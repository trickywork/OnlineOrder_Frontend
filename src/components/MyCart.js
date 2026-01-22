import { Button, Drawer, List, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart } from "../utils";

const { Text } = Typography;

// Shopping cart component with drawer
const MyCart = () => {
  // State to control drawer visibility
  const [cartVisible, setCartVisible] = useState(false);
  // State to store cart data
  const [cartData, setCartData] = useState();
  // Loading state for fetching cart data
  const [loading, setLoading] = useState(false);
  // Loading state for checkout process
  const [checking, setChecking] = useState(false);

  // Fetch cart data when drawer opens
  useEffect(() => {
    if (!cartVisible) {
      return;
    }

    setLoading(true);
    getCart()
      .then((data) => {
        // Update cart data with fetched information
        setCartData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cartVisible]);

  // Handle checkout process
  const onCheckOut = () => {
    setChecking(true);
    checkout()
      .then(() => {
        // Show success message and close drawer
        message.success("Successfully checkout");
        setCartVisible(false);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setChecking(false);
      });
  };

  // Close the cart drawer
  const onCloseDrawer = () => {
    setCartVisible(false);
  };

  // Open the cart drawer
  const onOpenDrawer = () => {
    setCartVisible(true);
  };

  return (
    <>
      {/* Cart button to open drawer */}
      <Button type="primary" shape="round" onClick={onOpenDrawer}>
        Cart
      </Button>
      {/* Shopping cart drawer */}
      <Drawer
        title="My Shopping Cart"
        onClose={onCloseDrawer}
        open={cartVisible}
        width={520}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Display total price */}
            <Text
              strong={true}
            >{`Total price: $${cartData?.total_price}`}</Text>
            <div>
              <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                onClick={onCheckOut}
                type="primary"
                loading={checking}
                disabled={loading || cartData?.order_items.length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        }
      >
        {/* List of cart items */}
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={cartData?.order_items}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.menu_item_name}
                description={`$${item.price} x ${item.quantity || 1}`}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default MyCart;

