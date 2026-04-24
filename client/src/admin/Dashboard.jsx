import React, { useEffect, useState } from "react";
import { Section, Container, Text, Card, Button } from "../components/ui";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../services/productService";
import { getOrders } from "../services/orderService";
import { getUsers } from "../services/userService";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const formatOrderId = (id) => id?.slice(-6).toUpperCase();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          getProducts(),
          getOrders(),
          getUsers(),
        ]);

        const products = productsRes.data || [];

        // ✅ FIX ORDERS
        const orders = Array.isArray(ordersRes.data)
          ? ordersRes.data
          : ordersRes.data?.orders || [];

        // ✅ FIX USERS (MAIN FIX)
        const users = Array.isArray(usersRes.data)
          ? usersRes.data
          : usersRes.data?.users || [];

        // 💰 revenue
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

        // ✅ latest 10
        setRecentOrders(orders.slice(-10).reverse());
        setRecentUsers(users.slice(-10).reverse());

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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {statsData.map((item, index) => (
                <Card key={index} className="p-4 text-center">
                  <Text className="text-gray-600 text-sm">
                    {item.title}
                  </Text>
                  <Text className="text-orange-500 mt-2 text-lg font-bold">
                    {item.value}
                  </Text>
                </Card>
              ))}
            </div>

            {/* ================= RECENT ORDERS ================= */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <Text variant="subtitle">Recent Orders</Text>

                <Button
                  variant="primary"
                  onClick={() => navigate("/admin/orders")}
                >
                  View All
                </Button>
              </div>

              <div className="bg-white shadow rounded overflow-x-auto">
                <div className="min-w-[700px] grid grid-cols-5 bg-gray-100 p-3 font-semibold text-sm">
                  <span>Order ID</span>
                  <span>Customer</span>
                  <span>Items</span>
                  <span>Total</span>
                  <span>Status</span>
                </div>

                {recentOrders.length === 0 ? (
                  <p className="p-4 text-gray-500">No orders found</p>
                ) : (
                  recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="min-w-[700px] grid grid-cols-5 p-3 border-t text-sm"
                    >
                      <span>#{formatOrderId(order._id)}</span>

                      <span>{order.user?.name || "User"}</span>

                      <div className="text-gray-600">
                        {order.orderItems?.map((item, i) => (
                          <div key={i}>
                            {item.name} ({item.qty})
                          </div>
                        ))}
                      </div>

                      <span>₹{order.totalPrice}</span>

                      <span
                        className={
                          order.isDelivered
                            ? "text-green-500"
                            : "text-yellow-500"
                        }
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
              <div className="flex justify-between items-center mb-4">
                <Text variant="subtitle">New Users</Text>

                <Button
                  variant="primary"
                  onClick={() => navigate("/admin/users")}
                >
                  View All
                </Button>
              </div>

              <div className="bg-white shadow rounded overflow-x-auto">
                <div className="min-w-[400px] grid grid-cols-2 bg-gray-100 p-3 font-semibold">
                  <span>Name</span>
                  <span>Email</span>
                </div>

                {recentUsers.length === 0 ? (
                  <p className="p-4 text-gray-500">No users found</p>
                ) : (
                  recentUsers.map((user) => (
                    <div
                      key={user._id}
                      className="min-w-[400px] grid grid-cols-2 p-3 border-t"
                    >
                      <span>{user.name}</span>
                      <span className="text-gray-500 break-all">
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