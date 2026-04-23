import React, { useEffect, useState } from "react";
import { Section, Container, Text, Button } from "../components/ui";
import { getUsers } from "../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers();
        setUsers(data);
      } catch (error) {
        console.log("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      // optional backend delete API
      // await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

  return (
    <Section className="pt-20">
      <Container>

        <Text variant="title" className="mb-6">
          Manage Users
        </Text>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">

            <table className="w-full text-left">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">

                    <td className="p-4">{user._id}</td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>

                    <td className="p-4">
                      <Button
                        variant="primary"
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(user._id)}
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

export default Users;