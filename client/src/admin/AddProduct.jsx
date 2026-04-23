import React, { useState } from "react";
import {
  Section,
  Container,
  Text,
  Form,
  Input,
  Button,
} from "../components/ui";

import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createProduct(form);

      alert("Product added successfully!");

      setForm({
        name: "",
        price: "",
        image: "",
        description: "",
      });

      navigate("/admin/products");

    } catch (error) {
      console.log("Add product failed", error);
      alert(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="pt-20">
      <Container className="flex justify-center">

        <div className="w-full max-w-lg bg-white p-6 rounded shadow space-y-4">

          <Text variant="title" className="text-center">
            Add Product
          </Text>

          <Form onSubmit={handleSubmit} className="space-y-4">

            <Input
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Input
              name="price"
              type="number"
              placeholder="Price (₹)"
              value={form.price}
              onChange={handleChange}
              required
            />

            <Input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
            />

            {/* ✅ NEW FIELD */}
            <Input
              name="description"
              placeholder="Product Description"
              value={form.description}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </Button>

          </Form>

        </div>

      </Container>
    </Section>
  );
};

export default AddProduct;