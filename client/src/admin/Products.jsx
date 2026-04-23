import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section, Container, Text, Button } from "../components/ui";
import { getProducts, deleteProduct } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // FETCH DATA
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

  return (
    <Section className="pt-20">
      <Container>

        <Text variant="title" className="mb-6">
          Manage Products
        </Text>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">

            <table className="w-full text-left">

              {/* HEADER */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {products.map((item) => (
                  <tr key={item._id} className="border-t">

                    <td className="p-4">
                      {item._id.slice(-6)}
                    </td>

                    <td className="p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="p-4">{item.name}</td>

                    <td className="p-4">{item.description}</td>

                    <td className="p-4">₹{item.price}</td>

                    <td className="p-4 flex gap-2">

                      {/* ✏️ EDIT BUTTON */}
                      <Button
                        variant="primary"
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() =>
                          navigate(`/admin/edit-product/${item._id}`)
                        }
                      >
                        Edit
                      </Button>

                      {/* 🗑 DELETE BUTTON */}
                      <Button
                        variant="primary"
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </Container>
    </Section>
  );
};

export default Products;