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

import { getProductById } from "../services/productService";
import { createOrder } from "../services/orderService";

const OrderNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "India",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = async () => {
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
            image: product.image,
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

  if (!product)
    return (
      <Section>
        <Container>
          <Text className="text-center">Loading...</Text>
        </Container>
      </Section>
    );

  return (
    <div className="pt-16">
      <Header
        title="Order Now"
        subtitle="Confirm your order"
        bgImage="/images/hero/menu.jpg"
      />

      <Section variant="primary">
        <Container className="flex justify-center">

          <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />

            <Text variant="title" color="dark">
              {product.name}
            </Text>

            <Text color="dark">₹{product.price}</Text>

            <Input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />

            <Text variant="subtitle">Delivery Address</Text>

            <Input name="address" placeholder="Street Address" onChange={handleAddressChange} />
            <Input name="city" placeholder="City" onChange={handleAddressChange} />
            <Input name="postalCode" placeholder="Postal Code" onChange={handleAddressChange} />
            <Input name="country" placeholder="Country" value={address.country} onChange={handleAddressChange} />

            <Text variant="subtitle">
              Total: ₹{product.price * qty}
            </Text>

            <Button className="w-full" onClick={handleOrder}>
              Place Order
            </Button>

          </div>

        </Container>
      </Section>
    </div>
  );
};

export default OrderNow;