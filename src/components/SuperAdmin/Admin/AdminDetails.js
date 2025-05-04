import { X } from 'lucide-react';

const AdminDetails = ({ admin, onClose }) => {
  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img 
            className="h-16 w-16 rounded-full" 
            src={admin.profilePicture || 'https://via.placeholder.com/64'} 
            alt={admin.name} 
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{admin.name}</h3>
            <p className="text-sm text-gray-500">{admin.role}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900">Basic Information</h4>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-medium">{admin.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="text-sm font-medium">{admin.mobile || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-sm font-medium">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                  ${admin.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {admin.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Login</p>
              <p className="text-sm font-medium">
                {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}
              </p>
            </div>
          </div>
        </div>

        {/* Shopify Info */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900">Shopify Information</h4>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Shopify Domain</p>
              <p className="text-sm font-medium">{admin.shopifyDomain || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Admin Access Token</p>
              <p className="text-sm font-medium break-all">
                {admin.shopifyAdminAccessToken ? '••••••••••••••••••••' : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">API Access Token</p>
              <p className="text-sm font-medium break-all">
                {admin.apiAccessToken ? '••••••••••••••••••••' : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">API Key</p>
              <p className="text-sm font-medium break-all">
                {admin.apiKey ? '••••••••••••••••••••' : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Storefront API</p>
              <p className="text-sm font-medium break-all">
                {admin.storefrontApi ? '••••••••••••••••••••' : '-'}
              </p>
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div className="space-y-4 col-span-2">
          <h4 className="text-md font-medium text-gray-900">Address</h4>
          {admin.address.street || admin.address.city ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Street</p>
                <p className="text-sm font-medium">{admin.address.street || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="text-sm font-medium">{admin.address.city || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="text-sm font-medium">{admin.address.state || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Postal Code</p>
                <p className="text-sm font-medium">{admin.address.postalCode || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="text-sm font-medium">{admin.address.country || '-'}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No address information available</p>
          )}
        </div>

        {/* Dates */}
        <div className="space-y-4 col-span-2">
          <h4 className="text-md font-medium text-gray-900">System Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="text-sm font-medium">
                {new Date(admin.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Updated At</p>
              <p className="text-sm font-medium">
                {new Date(admin.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AdminDetails;