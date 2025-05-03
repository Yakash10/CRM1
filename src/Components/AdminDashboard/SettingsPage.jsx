// src/pages/SettingsPage.jsx
import React, { useState } from "react";

const settingsConfig = [
  {
    section: "Profile Information",
    fields: [
      {
        type: "text",
        label: "Full Name",
        name: "fullName",
        placeholder: "John Doe",
      },
      {
        type: "email",
        label: "Email Address",
        name: "email",
        placeholder: "john@example.com",
      },
      {
        type: "text",
        label: "Phone Number",
        name: "phone",
        placeholder: "+1 234 567 890",
      },
      {
        type: "text",
        label: "Company",
        name: "company",
        placeholder: "ABC Realty",
      },
    ],
  },
  {
    section: "Account Details",
    fields: [
      {
        type: "select",
        label: "Role",
        name: "role",
        options: ["Admin", "Agent", "Broker"],
      },
      {
        type: "text",
        label: "Username",
        name: "username",
        placeholder: "john_doe",
      },
    ],
  },
  {
    section: "Notification Preferences",
    fields: [
      { type: "checkbox", label: "Email Alerts", name: "emailAlerts" },
      {
        type: "checkbox",
        label: "SMS Notifications",
        name: "smsNotifications",
      },
      {
        type: "checkbox",
        label: "Push Notifications",
        name: "pushNotifications",
      },
    ],
  },
  {
    section: "Change Password",
    fields: [
      { type: "password", label: "Current Password", name: "currentPassword" },
      { type: "password", label: "New Password", name: "newPassword" },
      {
        type: "password",
        label: "Confirm New Password",
        name: "confirmPassword",
      },
    ],
    saveText: "Update Password",
    saveColor: "red",
  },
];

export default function SettingsPage() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (section) => {
    console.log(`Saving section: ${section}`, formData);
    // You can connect to API here
  };

  return (
    <div className="p-6 mx-auto space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 border-b pb-4">
        Settings
      </h1>

      {settingsConfig.map((section, i) => (
        <SettingsSection
          key={i}
          title={section.section}
          fields={section.fields}
          formData={formData}
          onChange={handleChange}
          onSave={() => handleSubmit(section.section)}
          saveText={section.saveText}
          saveColor={section.saveColor}
        />
      ))}
    </div>
  );
}

function SettingsSection({
  title,
  fields,
  formData,
  onChange,
  onSave,
  saveText = "Save Changes",
  saveColor = "blue",
}) {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field, i) => {
          const value = formData[field.name] || "";
          if (field.type === "select") {
            return (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <select
                  name={field.name}
                  value={value}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  {field.options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (field.type === "checkbox") {
            return (
              <label key={i} className="flex items-center space-x-2 col-span-2">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name] || false}
                  onChange={onChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{field.label}</span>
              </label>
            );
          }

          return (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={value}
                placeholder={field.placeholder}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={onSave}
        className={`mt-6 px-5 py-2 bg-${saveColor}-600 text-white rounded-lg hover:bg-${saveColor}-700 transition`}
      >
        {saveText}
      </button>
    </section>
  );
}
