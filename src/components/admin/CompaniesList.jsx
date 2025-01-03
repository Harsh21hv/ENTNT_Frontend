import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { deleteCompany, fetchCompanies } from "../../api";


const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/edit-company/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await deleteCompany(id);
        setLoading(true);
        const data = await fetchCompanies();
        setCompanies(data);
        setLoading(false);
      } catch (error) {
        alert(`Failed to delete comapny, ${error}`);
      }
    }
  };

  useEffect(() => {
    const getCompanies = async () => {
      try {
        setLoading(true);
        const data = await fetchCompanies();
        setCompanies(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load companies");
        setLoading(false);
      }
    };

    getCompanies();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center mt-auto mb-auto h-full">Loading companies...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center bg-red-400 h-full mt-auto mb-auto">{error}</div>;
  }

  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6">
    <h2 className="text-3xl font-bold text-gray-200 mb-6">Companies List</h2>
    {companies.length === 0 ? (
      <p className="text-gray-400 text-lg">No companies available.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company._id}
            className="bg-gray-700 p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl hover:scale-105 transform duration-300"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-200">{company.name}</h3>
              <p className="text-gray-300">Location: {company.location}</p>
              <p className="text-gray-300">
                Communication Periodicity: {company.communicationPeriodicity} days
              </p>
              <p className="text-gray-300">
                LinkedIn:{" "}
                <a
                  href={company.linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {company.linkedinProfile}
                </a>
              </p>
              {company.emails.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-200">Emails:</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    {company.emails.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))}
                  </ul>
                </div>
              )}
              {company.phoneNumbers.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-200">Phone Numbers:</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    {company.phoneNumbers.map((phone, index) => (
                      <li key={index}>{phone}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => handleEdit(company._id)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(company._id)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  
  );
};

export default CompaniesList;
