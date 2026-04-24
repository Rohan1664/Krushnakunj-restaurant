import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section, Container, Text, Button, Input } from "../components/ui";
import { getProducts, deleteProduct } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔥 debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  // FETCH
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await getProducts(page, debouncedKeyword);

      setProducts(data.products || []);
      setPages(data.pages || 1);

    } catch (error) {
      console.log("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, debouncedKeyword]);

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      fetchProducts();
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

        {/* 🔍 SEARCH */}
        <div className="mb-4">
          <Input
            placeholder="Search by name or description..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            <div className="bg-white shadow rounded-lg overflow-x-auto">

              <table className="w-full text-left">

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

                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    products.map((item) => (
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

                        <td className="p-4">
                          {item.description}
                        </td>

                        <td className="p-4">₹{item.price}</td>

                        <td className="p-4 flex gap-2">

                          <Button
                            className="bg-blue-500 hover:bg-blue-600"
                            onClick={() =>
                              navigate(`/admin/edit-product/${item._id}`)
                            }
                          >
                            Edit
                          </Button>

                          <Button
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>

                        </td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>

            </div>

            {/* ✅ PAGINATION */}
            <div className="flex justify-center mt-6 gap-3">

              <Button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ⬅ Prev
              </Button>

              <span className="px-3 py-2">
                Page {page} of {pages}
              </span>

              <Button
                disabled={page === pages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next ➡
              </Button>

            </div>
          </>
        )}

      </Container>
    </Section>
  );
};

export default Products;