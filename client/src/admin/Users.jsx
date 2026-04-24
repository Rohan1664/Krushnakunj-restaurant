import React, { useEffect, useState } from "react";
import { Section, Container, Text, Button } from "../components/ui";
import { getUsers, deleteUser } from "../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const { data } = await getUsers(pageNumber);

      setUsers(data.users);
      setPage(data.page);
      setPages(data.pages);
    } catch (error) {
      console.log("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);

      // reload current page
      fetchUsers(page);
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
          <>
            {/* MOBILE VIEW */}
            <div className="md:hidden space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-4 rounded shadow"
                >
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>

                  <Button
                    className="mt-2 bg-red-500 hover:bg-red-600 w-full"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
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
                      <td className="p-4">
                        {user._id.slice(-6)}
                      </td>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>

                      <td className="p-4">
                        <Button
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

            {/* PAGINATION */}
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              {[...Array(pages).keys()].map((x) => (
                <Button
                  key={x + 1}
                  variant={page === x + 1 ? "primary" : "outline"}
                  onClick={() => setPage(x + 1)}
                >
                  {x + 1}
                </Button>
              ))}
            </div>
          </>
        )}

      </Container>
    </Section>
  );
};

export default Users;