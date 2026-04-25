import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productService";

import {
  Button,
  Text,
  Card,
  Container,
  Section,
} from "../ui";

const PopularDishes = () => {
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProducts();

        const productList = Array.isArray(data)
          ? data
          : data?.products || [];

        setDishes(productList.slice(0, 5));
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Section className="bg-white text-center py-16" variant="primary">
      <Container>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">

          <Text variant="subtitle" color="dark">
            Popular Dishes
          </Text>

          <Button onClick={() => navigate("/menu")}>
            View Menu
          </Button>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          {dishes.length === 0 ? (
            <Text color="muted" className="col-span-4">
              No dishes found
            </Text>
          ) : (
            dishes.map((dish) => (
              <Card
                key={dish._id}
                className="overflow-hidden hover:shadow-lg transition"
              >

                {/* IMAGE */}
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-40 md:h-48 object-cover"
                />

                {/* CONTENT */}
                <div className="p-4">

                  <Text variant="subtitle" color="dark" className="text-left">
                    {dish.name}
                  </Text>

                  <Text
                    color="dark"
                    className="mt-2 text-left font-bold"
                  >
                    ₹{dish.price}
                  </Text>

                  <Button
                    className="mt-4 w-full"
                    onClick={() =>
                      navigate(`/order/${dish._id}`)
                    }
                  >
                    Order Now
                  </Button>

                </div>
              </Card>
            ))
          )}

        </div>

      </Container>
    </Section>
  );
};

export default PopularDishes;