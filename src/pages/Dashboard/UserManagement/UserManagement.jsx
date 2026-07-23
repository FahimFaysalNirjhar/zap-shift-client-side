import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to make ${user.displayName || "this user"} an admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "admin" };

        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: `${user.displayName || "User"} is now an admin.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to remove admin access from ${user.displayName || "this user"}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "user" };

        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: `${user.displayName || "User"} is no longer an admin.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();
    return (
      user.displayName?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const roleBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "bg-emerald-500 text-white";
      case "rider":
        return "bg-amber-500 text-white";
      default:
        return "bg-slate-600 text-white";
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          User Management
        </h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="input input-bordered w-full md:w-72 bg-white text-slate-900 placeholder:text-slate-400 border-slate-300"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="table">
          <thead className="bg-slate-800">
            <tr>
              <th className="text-slate-100">#</th>
              <th className="text-slate-100">User</th>
              <th className="text-slate-100">Email</th>
              <th className="text-slate-100">Role</th>
              <th className="text-right text-slate-100">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td className="text-slate-700">{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/2FsfXqM/default-avatar.png"
                          }
                          alt={user.displayName || "User"}
                        />
                      </div>
                    </div>
                    <span className="font-medium text-slate-900">
                      {user.displayName || "Unnamed User"}
                    </span>
                  </div>
                </td>
                <td className="text-slate-700">{user.email}</td>
                <td>
                  <span
                    className={`badge font-medium border-0 ${roleBadgeClass(
                      user.role,
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="text-right">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-sm border border-red-500 text-red-600 bg-white hover:bg-red-50"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm border border-emerald-500 text-emerald-600 bg-white hover:bg-emerald-50"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-slate-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
