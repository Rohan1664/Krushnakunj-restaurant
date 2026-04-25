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
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await getProducts(page);

      const productList = Array.isArray(data)
        ? data
        : data?.products || [];

      setProducts(productList);
      setPages(data?.pages || 1);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="pt-16">
      <Header
        title="Menu"
        subtitle="Our Food"
        bgImage="/images/hero/menu.jpg"
      />

      {/* ✅ USE SECTION VARIANT INSTEAD OF RAW BG */}
      <Section variant="primary">
        <Container size="lg">

          {loading ? (
            <Text className="text-center" color="muted">
              Loading...
            </Text>
          ) : (
            <>
              {/* PRODUCTS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

                {products.length === 0 ? (
                  <Text
                    className="text-center col-span-3"
                    color="muted"
                  >
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
                      <Text
                        variant="subtitle"
                        className="mt-3"
                        color="dark"
                      >
                        {item.name}
                      </Text>

                      {/* PRICE */}
                      <Text
                        variant="base"
                        color="primary"
                        className="font-bold mt-1"
                      >
                        ₹{item.price}
                      </Text>

                      {/* BUTTON */}
                      <Button
                        variant="primary"
                        className="mt-4 w-full"
                        onClick={() =>
                          navigate(`/order/${item._id}`)
                        }
                      >
                        Order Now
                      </Button>

                    </Card>
                  ))
                )}

              </div>

              {/* PAGINATION */}
              <div className="flex justify-center items-center mt-10 gap-4">

                <Button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  ⬅ Prev
                </Button>

                <Text variant="base" color="dark">
                  Page {page} of {pages}
                </Text>

                <Button
                  disabled={page === pages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next ➡
                </Button>

              </div>
            </>
          )}

        </Container>
      </Section>
    </div>
  );
};

export default Menu;