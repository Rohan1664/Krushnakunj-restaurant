import React, { useEffect, useState } from "react";
import { Section, Container, Text, Button, Input } from "../components/ui";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);

  const formatOrderId = (id) => id.slice(-6).toUpperCase();

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await getOrders(page, keyword, status);

      setOrders(data.orders);
      setPages(data.pages);
    } catch (error) {
      console.log("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, keyword, status]);

  // TOGGLE STATUS
  const handleStatusChange = async (id) => {
    try {
      const { data } = await updateOrderStatus(id);

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? data : o))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Section className="pt-20">
      <Container>

        <Text variant="title" className="mb-6">
          Manage Orders
        </Text>

        {/* 🔍 SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">

          <Input
            placeholder="Search by Order ID or Customer"
            value={keyword}
            onChange={(e) => {
              setPage(1);
              setKeyword(e.target.value);
            }}
          />

          <select
            className="border p-2 rounded"
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="delivered">Delivered</option>
            <option value="pending">Pending</option>
          </select>

        </div>

        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <>
            {/* ORDERS */}
            <div className="space-y-6">

              {orders.length === 0 ? (
                <p>No orders found</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white shadow rounded-lg p-6"
                  >

                    <div className="flex justify-between mb-4">

                      <div>
                        <Text>
                          <strong>ID:</strong> #{formatOrderId(order._id)}
                        </Text>

                        <Text>
                          <strong>Customer:</strong>{" "}
                          {order.user?.name || "User"}
                        </Text>

                        <Text>
                          <strong>Total:</strong> ₹{order.totalPrice}
                        </Text>
                      </div>

                      <div className="text-right">

                        <span
                          className={`px-3 py-1 rounded text-white text-sm ${
                            order.isDelivered
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {order.isDelivered
                            ? "Delivered"
                            : "Pending"}
                        </span>

                        <div className="flex gap-2 mt-2">

                          <Button
                            onClick={() =>
                              handleStatusChange(order._id)
                            }
                          >
                            Status
                          </Button>

                          <Button
                            className="bg-red-500 text-white"
                            onClick={() =>
                              handleDelete(order._id)
                            }
                          >
                            Delete
                          </Button>

                        </div>

                      </div>
                    </div>

                    {/* ITEMS */}
                    <div className="border-t pt-4">
                      <Text variant="subtitle">Items:</Text>

                      {order.orderItems.map((item, i) => (
                        <div key={i} className="flex gap-4 mt-2">
                          <img
                            src={item.image}
                            className="w-14 h-14 rounded"
                            alt={item.name}
                          />
                          <div>
                            <p>{item.name}</p>
                            <p className="text-sm text-gray-500">
                              Qty {item.qty} × ₹{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ADDRESS */}
                    <div className="border-t pt-4 mt-4 text-sm text-gray-600">
                      {order.shippingAddress?.address},{" "}
                      {order.shippingAddress?.city},{" "}
                      {order.shippingAddress?.postalCode}
                    </div>

                  </div>
                ))
              )}

            </div>

            {/* PAGINATION */}
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

export default Orders;