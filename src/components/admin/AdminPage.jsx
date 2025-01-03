import React from "react";
import LogoutButton from "../LogoutButton";
import { Link } from "react-router";
import { FaPlusCircle } from "react-icons/fa";
import CompaniesList from "./CompaniesList";

const AdminPage = () => {
  return (
    <div className="bg-[#111825] min-h-screen h-max">
  <nav className="bg-gray-950 p-4 text-white flex justify-between items-center shadow-md">
  <div className="text-xl font-bold">Admin Dashboard</div>
  <div className="flex items-center space-x-8">
    <Link
      to="/admin/create-company"
      className="flex items-center text-blue-400 hover:text-blue-600 transition-colors"
    >
      <FaPlusCircle className="mr-2" />
      <span>Create Company</span>
    </Link>
    <div className="flex items-center">
      <LogoutButton className="text-red-500 hover:text-red-700 transition-colors" />
    </div>
  </div>
</nav>


<div className="container mx-auto p-6 ">
  <CompaniesList />
</div>

    </div>
  );
};

export default AdminPage;
