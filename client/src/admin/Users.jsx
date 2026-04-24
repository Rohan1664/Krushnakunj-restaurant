import React, { useEffect, useState } from "react";
import { Section, Container, Text, Button, Input } from "../components/ui";
import { getUsers, deleteUser } from "../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const [loading, setLoading] = useState(true);

  // 🔥 debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const { data } = await getUsers(page, debouncedKeyword);

      setUsers(data.users || []);
      setPages(data.pages || 1);

    } catch (error) {
      console.log("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, debouncedKeyword]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      fetchUsers();
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

        {/* 🔍 SEARCH */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <>
            {/* MOBILE */}
            <div className="md:hidden space-y-4">
              {users.length === 0 ? (
                <p>No users found</p>
              ) : (
                users.map((user) => (
                  <div key={user._id} className="bg-white p-4 rounded shadow">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>

                    <Button
                      className="mt-2 bg-red-500 hover:bg-red-600 w-full"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* DESKTOP */}
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
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-4 text-center">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="border-t">
                        <td className="p-4">{user._id.slice(-6)}</td>
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
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* ✅ PAGINATION (MATCHED WITH ORDERS) */}
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

export default Users;