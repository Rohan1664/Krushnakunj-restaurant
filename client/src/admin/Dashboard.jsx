import React, { useEffect, useState } from "react";
import { Section, Container, Text, Card } from "../components/ui";

import { getProducts } from "../services/productService";
import { getOrders } from "../services/orderService";
import { getUsers } from "../services/userService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const formatOrderId = (id) => id.slice(-6).toUpperCase();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          getProducts(),
          getOrders(),
          getUsers(),
        ]);

        const products = productsRes.data;
        const orders = ordersRes.data;
        const users = usersRes.data;

        const revenue = orders.reduce(
          (total, order) => total + (order.totalPrice || 0),
          0
        );

        setStats({
          products: products.length,
          orders: orders.length,
          users: users.length,
          revenue,
        });

        setRecentOrders(orders.slice(-5).reverse());
        setRecentUsers(users.slice(-5).reverse());

      } catch (error) {
        console.log("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = [
    { title: "Total Products", value: stats.products },
    { title: "Total Orders", value: stats.orders },
    { title: "Total Users", value: stats.users },
    { title: "Revenue", value: `₹${stats.revenue}` },
  ];

  return (
    <Section className="pt-20">
      <Container>

        <Text variant="title" className="mb-8">
          Admin Dashboard
        </Text>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            {/* ================= STATS ================= */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              {statsData.map((item, index) => (
                <Card key={index} className="p-6 text-center">
                  <Text className="text-gray-600">{item.title}</Text>
                  <Text variant="title" className="text-orange-500 mt-2">
                    {item.value}
                  </Text>
                </Card>
              ))}
            </div>

            
            {/* ================= RECENT ORDERS ================= */}
            <div className="mb-10">
              <Text variant="subtitle" className="mb-4">
                Recent Orders
              </Text>

              <div className="bg-white shadow rounded overflow-hidden">

                {/* ✅ HEADER */}
                <div className="grid grid-cols-5 bg-gray-100 p-4 font-semibold">
                  <span>Order ID</span>
                  <span>Customer</span>
                  <span>Items</span>
                  <span>Total</span>
                  <span>Status</span>
                </div>

                {/* ✅ BODY */}
                {recentOrders.length === 0 ? (
                  <p className="p-4 text-gray-500">No orders found</p>
                ) : (
                  recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="grid grid-cols-5 p-4 border-t items-center"
                    >
                      {/* ✅ ORDER ID */}
                      <span className="font-semibold">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>

                      {/* ✅ CUSTOMER */}
                      <span>{order.user?.name || "User"}</span>

                      {/* ✅ ITEMS */}
                      <div className="text-sm text-gray-600">
                        {order.orderItems.map((item, index) => (
                          <div key={index}>
                            {item.name} ({item.qty})
                          </div>
                        ))}
                      </div>

                      {/* ✅ TOTAL */}
                      <span>₹{order.totalPrice}</span>

                      {/* ✅ STATUS (SEPARATE COLUMN) */}
                      <span
                        className={`font-semibold ${order.isDelivered
                            ? "text-green-500"
                            : "text-yellow-500"
                          }`}
                      >
                        {order.isDelivered ? "Delivered" : "Pending"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ================= RECENT USERS ================= */}
            <div>
              <Text variant="subtitle" className="mb-4">
                New Users
              </Text>

              <div className="bg-white shadow rounded overflow-hidden">

                {/* HEADER */}
                <div className="grid grid-cols-2 bg-gray-100 p-4 font-semibold">
                  <span>Name</span>
                  <span>Email</span>
                </div>

                {recentUsers.length === 0 ? (
                  <p className="p-4 text-gray-500">No users found</p>
                ) : (
                  recentUsers.map((user) => (
                    <div
                      key={user._id}
                      className="grid grid-cols-2 p-4 border-t"
                    >
                      <span>{user.name}</span>
                      <span className="text-gray-500">
                        {user.email}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </>
        )}

      </Container>
    </Section>
  );
};

export default Dashboard;