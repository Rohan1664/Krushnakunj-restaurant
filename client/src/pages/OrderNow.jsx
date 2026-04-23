import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import {
  Section,
  Container,
  Text,
  Button,
  Input,
} from "../components/ui";

import { getProducts } from "../services/productService";
import { createOrder } from "../services/orderService";

const OrderNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  // ✅ USER ADDRESS STATE
  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "India",
  });

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProducts();
        const selected = data.find((p) => p._id === id);
        setProduct(selected);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // HANDLE ADDRESS CHANGE
  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // PLACE ORDER
  const handleOrder = async () => {
    // ✅ VALIDATION
    if (
      !address.address ||
      !address.city ||
      !address.postalCode ||
      !address.country
    ) {
      alert("Please fill delivery address");
      return;
    }

    try {
      const orderData = {
        orderItems: [
          {
            name: product.name,
            qty: Number(qty),
            image: product.image || "https://via.placeholder.com/150",
            price: product.price,
            product: product._id,
          },
        ],
        shippingAddress: address,
        paymentMethod: "COD",
        totalPrice: product.price * qty,
      };

      await createOrder(orderData);

      alert("✅ Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Order failed");
    }
  };

  if (!product) return <p className="p-10">Loading...</p>;

  return (
    <div className="pt-16">
      <Header
        title="Order Now"
        subtitle="Confirm your order"
        bgImage="/images/hero/menu.jpg"
      />

      <Section className="bg-gray-100">
        <Container className="flex justify-center">

          <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">

            {/* PRODUCT */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />

            <Text variant="title">{product.name}</Text>

            <Text>Price: ₹{product.price}</Text>

            {/* QUANTITY */}
            <Input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />

            {/* ✅ ADDRESS FORM */}
            <Text variant="subtitle">Delivery Address</Text>

            <Input
              name="address"
              placeholder="Street Address"
              value={address.address}
              onChange={handleAddressChange}
            />

            <Input
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleAddressChange}
            />

            <Input
              name="postalCode"
              placeholder="Postal Code"
              value={address.postalCode}
              onChange={handleAddressChange}
            />

            <Input
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleAddressChange}
            />

            {/* TOTAL */}
            <Text variant="subtitle">
              Total: ₹{product.price * qty}
            </Text>

            {/* BUTTON */}
            <Button
              variant="primary"
              className="w-full"
              onClick={handleOrder}
            >
              Place Order
            </Button>

          </div>

        </Container>
      </Section>
    </div>
  );
};

export default OrderNow;