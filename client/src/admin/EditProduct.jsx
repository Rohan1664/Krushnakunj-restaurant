import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Section,
  Container,
  Text,
  Input,
  Button,
} from "../components/ui";

import {
  getProductById,
  updateProduct,
} from "../services/productService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(id);
        setForm(data);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await updateProduct(id, form);

      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log("Update failed", error);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="pt-20">
      <Container>

        <Text variant="title" className="mb-6">
          Edit Product
        </Text>

        <div className="max-w-md bg-white p-6 rounded shadow space-y-4">

          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
          />

          <Input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <Input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <Input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </Button>

        </div>

      </Container>
    </Section>
  );
};

export default EditProduct;