import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import { getProducts } from "../services/productService";

import {
  Section,
  Container,
  Card,
  Text,
  Button,
} from "../components/ui";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-16">
      <Header
        title="Menu"
        subtitle="Our Food"
        bgImage="/images/hero/menu.jpg"
      />

      <Section className="bg-gray-100">
        <Container>

          {loading ? (
            <Text className="text-center">Loading...</Text>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">

              {products.length === 0 ? (
                <Text className="text-center col-span-3">
                  No products found
                </Text>
              ) : (
                products.map((item) => (
                  <Card key={item._id} className="p-4">

                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded"
                    />

                    {/* NAME */}
                    <Text variant="subtitle" className="mt-3">
                      {item.name}
                    </Text>

                    {/* PRICE */}
                    <Text className="text-orange-500 font-bold">
                      ₹{item.price}
                    </Text>

                    {/* BUTTON */}
                    <Button
                      variant="primary"
                      className="mt-4 w-full"
                      onClick={() => navigate(`/order/${item._id}`)}
                    >
                      Order Now
                    </Button>

                  </Card>
                ))
              )}

            </div>
          )}

        </Container>
      </Section>
    </div>
  );
};

export default Menu;