import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productService";

import { Button } from "../ui";

const PopularDishes = () => {
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProducts();

        // ✅ FIX: handle paginated response
        const productList = Array.isArray(data)
          ? data
          : data?.products || [];

        // ✅ take first 5
        setDishes(productList.slice(0, 5));

      } catch (error) {
        console.log("Error fetching products", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-16 bg-white text-center">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Popular Dishes</h2>

        <Button onClick={() => navigate("/menu")} variant="primary">
          View Menu
        </Button>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4">
        {dishes.length === 0 ? (
          <p className="col-span-4 text-gray-500">No dishes found</p>
        ) : (
          dishes.map((dish) => (
            <div
              key={dish._id}
              className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold">{dish.name}</h3>

                <p className="text-orange-500 font-bold mt-2">
                  ₹{dish.price}
                </p>

                <Button
                  variant="primary"
                  className="mt-4 w-full"
                  onClick={() => navigate(`/order/${dish._id}`)}
                >
                  Order Now
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

    </section>
  );
};

export default PopularDishes;