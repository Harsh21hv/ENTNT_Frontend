import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const AdminForm = () => {
  const navigate = useNavigate();

  const defaultMethods = [
    {
      method: "LinkedIn Post",
      description: "Post about the company",
      sequence: 1,
      mandatory: true,
    },
    {
      method: "LinkedIn Message",
      description: "Send a message on LinkedIn",
      sequence: 2,
      mandatory: true,
    },
    {
      method: "Email",
      description: "Send an email",
      sequence: 3,
      mandatory: true,
    },
    {
      method: "Phone Call",
      description: "Call the company",
      sequence: 4,
      mandatory: false,
    },
    {
      method: "Other",
      description: "Other means of communication",
      sequence: 5,
      mandatory: false,
    },
  ];

  const [useDefaultMethods, setUseDefaultMethods] = useState(false);

  const [company, setCompany] = useState({
    name: "",
    location: "",
    linkedinProfile: "",
    emails: [""],
    phoneNumbers: [""],
    comments: "",
    communicationPeriodicity: "14",
    communications: [{}],
  });

  const handleUseDefaultMethods = (e) => {
    const checked = e.target.checked;
    setUseDefaultMethods(checked);

    if (checked) {
      setCompany({ ...company, communications: defaultMethods });
    } else {
      setCompany({
        ...company,
        communications: [
          { method: "", description: "", sequence: 1, mandatory: false },
        ],
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleAddCommunication = () => {
    setCompany({
      ...company,
      communications: [
        ...company.communications,
        {
          method: "",
          description: "",
          sequence: company.communications.length + 1,
          mandatory: false,
        },
      ],
    });
  };

  // for communication methods
  const handleCommunicationChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedCommunications = [...company.communications];
    updatedCommunications[index][name] = type === "checkbox" ? checked : value;
    setCompany({ ...company, communications: updatedCommunications });
  };

  // for changes in any email/phone number
  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    const updatedArray = [...company[field]];
    updatedArray[index] = value;
    setCompany({ ...company, [field]: updatedArray });
  };

  // for removing any email/phone number
  const handleRemoveArrayItem = (type, index) => {
    const updatedArray = company[type].filter((_, i) => i !== index);
    setCompany({ ...company, [type]: updatedArray });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://entnt-backend-hvtripathi21.up.railway.app/api/admin/add-company",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(company),
        },
      );
      const data = await response.json();
      if (response.ok) {
        alert("Company added successfully");
        setCompany({
          name: "",
          location: "",
          linkedinProfile: "",
          emails: [""],
          phoneNumbers: [""],
          comments: "",
          communicationPeriodicity: "14",
          communications: [
            { method: "", description: "", sequence: 1, mandatory: false },
          ],
        });

        navigate("/admin", { replace: true });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add company");
    }
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-white pb-5 underline w-fit mx-auto">New Company Form</h2>
          <button
            onClick={() => navigate("/admin")}
            className="text-white hover:bg-blue-600 font-medium bg-blue-500 px-2 py-1 rounded-md"
          >
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name
                <input
                  name="name"
                  value={company.name}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                  className="mt-1 p-3 w-full border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
                <input
                  name="location"
                  value={company.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                  className="mt-1 p-3 w-full border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                LinkedIn Profile
                <input
                  name="linkedinProfile"
                  value={company.linkedinProfile}
                  onChange={handleChange}
                  placeholder="LinkedIn Profile"
                  required
                  className="mt-1 p-3 w-full border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                />
              </label>
            </div>
  
            {/* Emails Section */}
            <div>
              <h4 className="text-lg font-medium text-white mb-2">Emails</h4>
              {company.emails.map((email, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <input
                    value={email}
                    onChange={(e) => handleArrayChange(e, "emails", index)}
                    placeholder="Email"
                    className="p-3 w-full border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  />
                  {company.emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem("emails", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaMinusCircle />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setCompany({ ...company, emails: [...company.emails, ""] })
                }
                className="text-green-400 hover:text-green-600 flex items-center"
              >
                <FaPlusCircle className="mr-1" /> Add Email
              </button>
            </div>
  
            {/* Phone Numbers Section */}
            <div>
              <h4 className="text-lg font-medium text-white mb-2">Phone Numbers</h4>
              {company.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <input
                    value={phone}
                    onChange={(e) =>
                      handleArrayChange(e, "phoneNumbers", index)
                    }
                    placeholder="Phone Number"
                    className="p-3 w-full border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  />
                  {company.phoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveArrayItem("phoneNumbers", index)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaMinusCircle />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setCompany({
                    ...company,
                    phoneNumbers: [...company.phoneNumbers, ""],
                  })
                }
                className="text-green-400 hover:text-green-600 flex items-center"
              >
                <FaPlusCircle className="mr-1" /> Add Phone Number
              </button>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Comments
                <textarea
                  name="comments"
                  value={company.comments}
                  onChange={handleChange}
                  placeholder="Comments"
                  className="mt-1 p-3 w-full border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                />
              </label>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Communication Periodicity (in days)
                <input
                  name="communicationPeriodicity"
                  type="number"
                  value={company.communicationPeriodicity}
                  onChange={handleChange}
                  className="mt-1 p-3 w-full border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  placeholder="e.g., 30 days"
                  min={1}
                />
              </label>
            </div>
  
            {/* Communication Methods Section */}
            <div className="mb-4">
              <h4 className="text-lg font-medium text-white mb-2">
                Communication Methods
              </h4>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={useDefaultMethods}
                  onChange={handleUseDefaultMethods}
                  className="mr-2"
                />
                <label className="text-white">Use Default Methods</label>
              </div>
  
              <table className="min-w-full table-auto border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-2 text-left text-white border border-gray-600">Method</th>
                    <th className="p-2 text-left text-white border border-gray-600">Description</th>
                    <th className="p-2 text-left text-white border border-gray-600">Sequence</th>
                    <th className="p-2 text-left text-white border border-gray-600">Mandatory</th>
                  </tr>
                </thead>
                <tbody>
                  {company.communications.map((comm, index) => (
                    <tr key={index} className="border border-gray-600">
                      <td className="p-2">
                        <input
                          name="method"
                          value={comm.method}
                          onChange={(e) => handleCommunicationChange(e, index)}
                          placeholder="Method"
                          disabled={useDefaultMethods}
                          required
                          className="p-2 w-full border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          name="description"
                          value={comm.description}
                          onChange={(e) => handleCommunicationChange(e, index)}
                          placeholder="Description"
                          disabled={useDefaultMethods}
                          required
                          className="p-2 w-full border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          name="sequence"
                          type="number"
                          value={comm.sequence}
                          onChange={(e) => handleCommunicationChange(e, index)}
                          disabled={useDefaultMethods}
                          required
                          className="p-2 w-full border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          name="mandatory"
                          type="checkbox"
                          checked={comm.mandatory}
                          onChange={(e) => handleCommunicationChange(e, index)}
                          disabled={useDefaultMethods}
                          className="h-5 w-5"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
  
              {/* Add Communication Button */}
              {!useDefaultMethods && (
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={handleAddCommunication}
                    className="text-green-400 hover:text-green-600 flex items-center"
                  >
                    <FaPlusCircle className="mr-1" /> Add Communication Method
                  </button>
                </div>
              )}
            </div>
  
            {/* Save Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
              >
                Save Company
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
  
  );
  

};

export default AdminForm;
