import { Button, Card, List, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

// Button component to add item to cart
const AddToCartButton = ({ itemId }) => {
  // Track loading state for the button
  const [loading, setLoading] = useState(false);

  // Handle adding item to cart
  const AddToCart = async () => {
    setLoading(true);
    try {
      await addItemToCart(itemId);
      message.success(`Successfully add item`);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip title="Add to shopping cart">
      <Button
        loading={loading}
        type="primary"
        icon={<PlusOutlined />}
        onClick={AddToCart}
      />
    </Tooltip>
  );
};

// Main component to display restaurant menu items
const FoodList = () => {
  // State for menu items of selected restaurant
  const [foodData, setFoodData] = useState([]);
  // State for currently selected restaurant ID
  const [curRest, setCurRest] = useState();
  // State for list of all restaurants
  const [restaurants, setRestaurants] = useState([]);
  // Loading state for menu items
  const [loading, setLoading] = useState(false);
  // Loading state for restaurants list
  const [loadingRest, setLoadingRest] = useState(false);

  // Fetch restaurants list on component mount
  useEffect(() => {
    setLoadingRest(true);
    getRestaurants()
      .then((data) => {
        // Update restaurants list with fetched data
        setRestaurants(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoadingRest(false);
      });
  }, []);

  // Fetch menu items when restaurant is selected
  useEffect(() => {
    if (curRest) {
      setLoading(true);
      getMenus(curRest)
        .then((data) => {
          // Update food data with fetched menu items
          setFoodData(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [curRest]);

  return (
    <>
      {/* Restaurant selection dropdown */}
      <Select
        value={curRest}
        onSelect={(value) => setCurRest(value)}
        placeholder="Select a restaurant"
        loading={loadingRest}
        style={{ width: 300 }}
        onChange={() => {}}
      >
        {restaurants.map((item) => {
          return <Option value={item.id}>{item.name}</Option>;
        })}
      </Select>
      {/* Display menu items when restaurant is selected */}
      {curRest && (
        <List
          style={{ marginTop: 20 }}
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 3,
            xxl: 3,
          }}
          dataSource={foodData}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.name}
                extra={<AddToCartButton itemId={item.id} />}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{ width: "100%", display: "block" }}
                />
                {`Price: ${item.price}`}
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default FoodList;

