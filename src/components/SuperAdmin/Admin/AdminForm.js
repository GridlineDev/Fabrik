import { X } from 'lucide-react';

const AdminForm = ({ formData, handleChange, handleSubmit, onCancel }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength="8"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Mobile */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            pattern="^\+?\d{10,15}$"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="vendor">Vendor</option>
            <option value="super">Super Admin</option>
          </select>
        </div>

        {/* Status */}
        <div className="col-span-1 flex items-center">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
            Active
          </label>
        </div>

        {/* Profile Picture */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
          <input
            type="url"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Shopify Domain */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Shopify Domain</label>
          <input
            type="text"
            name="shopifyDomain"
            value={formData.shopifyDomain}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Shopify Admin Access Token */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Shopify Admin Token</label>
          <input
            type="text"
            name="shopifyAdminAccessToken"
            value={formData.shopifyAdminAccessToken}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* API Access Token */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">API Access Token</label>
          <input
            type="text"
            name="apiAccessToken"
            value={formData.apiAccessToken}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* API Key */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
          <input
            type="text"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Storefront API */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Storefront API</label>
          <input
            type="text"
            name="storefrontApi"
            value={formData.storefrontApi}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address Section */}
        <div className="col-span-2 border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Street */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* City */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* State */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Postal Code */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Country */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {formData._id ? 'Update Admin' : 'Create Admin'}
        </button>
      </div>
    </form>
  );
};

export default AdminForm;