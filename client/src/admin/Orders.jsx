import React, { useEffect, useState } from "react";
import { Section, Container, Text, Button } from "../components/ui";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatOrderId = (id) => id.slice(-6).toUpperCase();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getOrders();
        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // STATUS TOGGLE
  const handleStatusChange = async (id) => {
    try {
      const { data } = await updateOrderStatus(id);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? data : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE ORDER
  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);

      setOrders((prev) =>
        prev.filter((order) => order._id !== id)
      );
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

        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow rounded-lg p-6"
              >

                {/* TOP */}
                <div className="flex justify-between mb-4">

                  <div>
                    <Text>
                      <strong>ID:</strong> #{formatOrderId(order._id)}
                    </Text>

                    <Text>
                      <strong>Customer:</strong>{" "}
                      {order.user?.name}
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
                        variant="primary"
                        onClick={() =>
                          handleStatusChange(order._id)
                        }
                      >
                        Toggle
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
            ))}

          </div>
        )}

      </Container>
    </Section>
  );
};

export default Orders;