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

        setDishes(productList.slice(0, 2));
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Section variant="primary" className="py-16">
      <Container size="lg">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <Text variant="title" color="dark">
            Popular Dishes
          </Text>

          <Button onClick={() => navigate("/menu")}>
            View Menu
          </Button>
        </div>

        {/* LIST STYLE (LIKE IMAGE) */}
        <div className="space-y-6">

          {dishes.length === 0 ? (
            <Text color="muted">No dishes found</Text>
          ) : (
            dishes.map((dish, index) => {
              const isReverse = index % 2 !== 0;

              return (
                <Card
                  key={dish._id}
                  className={`
                    flex flex-col md:flex-row
                    ${isReverse ? "md:flex-row-reverse" : ""}
                    overflow-hidden
                  `}
                  size="lg"
                >

                  {/* IMAGE */}
                  <div className="md:w-1/2 flex items-center justify-center bg-gray-100">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full max-h-80 object-contain"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center text-left">

                    <Text variant="subtitle" color="dark">
                      {dish.name}
                    </Text>

                    <Text color="muted" className="mt-2">
                      {dish.description }
                    </Text>

                    <Text
                      color="dark"
                      className="mt-3 font-bold text-lg"
                    >
                      ₹{dish.price}
                    </Text>

                    <Button
                      className="mt-4 w-fit"
                      onClick={() =>
                        navigate(`/order/${dish._id}`)
                      }
                    >
                      Order Now
                    </Button>

                  </div>

                </Card>
              );
            })
          )}

        </div>

      </Container>
    </Section>
  );
};

export default PopularDishes;