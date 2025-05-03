import React from "react";

const HelpPage = () => {
  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Help & Support</h1>

      {/* Search bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search help topics..."
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Help Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-5 border rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">How to add a property?</h2>
          <p className="text-gray-600">
            Go to the Properties page and click the "Add Property" button. Fill
            in the required details and submit.
          </p>
        </div>

        <div className="p-5 border rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">How to assign a lead?</h2>
          <p className="text-gray-600">
            Navigate to the Leads section, select the lead and assign it to a
            broker/agent.
          </p>
        </div>

        <div className="p-5 border rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">
            How to generate reports?
          </h2>
          <p className="text-gray-600">
            Visit the Reports tab, choose the report type, date range, and click
            Generate.
          </p>
        </div>

        <div className="p-5 border rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">
            How to contact support?
          </h2>
          <p className="text-gray-600">
            Use the contact form below or email us directly at{" "}
            <span className="text-blue-500">support@crm.com</span>.
          </p>
        </div>
      </div>

      {/* Contact Support */}
      <div className="p-6 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded"
          />
          <textarea
            placeholder="Describe your issue..."
            rows="4"
            className="w-full p-3 border rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpPage;
