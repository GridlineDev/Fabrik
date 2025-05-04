"use client"
import { useState, useEffect } from 'react';
import { Pencil, Trash2, Eye, Plus, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import AdminForm from '@/components/SuperAdmin/Admin/AdminForm';
import AdminDetails from '@/components/SuperAdmin/Admin/AdminDetails';

const AdminList = () => {
  // Static data matching the schema
  const [admins, setAdmins] = useState([
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      shopifyAdminAccessToken: 'shpat_1234567890abcdef',
      apiAccessToken: 'api_1234567890',
      apiKey: 'key_1234567890',
      shopifyDomain: 'store1.myshopify.com',
      password: 'password123',
      storefrontApi: 'storefront_1234567890',
      mobile: '+1234567890',
      role: 'admin',
      isActive: true,
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA'
      },
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastLogin: new Date('2023-05-15T10:30:00Z'),
      createdAt: new Date('2023-01-10T08:00:00Z'),
      updatedAt: new Date('2023-05-15T10:30:00Z')
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      shopifyAdminAccessToken: 'shpat_0987654321fedcba',
      apiAccessToken: 'api_0987654321',
      apiKey: 'key_0987654321',
      shopifyDomain: 'store2.myshopify.com',
      password: 'password456',
      storefrontApi: 'storefront_0987654321',
      mobile: '+1987654321',
      role: 'vendor',
      isActive: true,
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90001',
        country: 'USA'
      },
      profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
      lastLogin: new Date('2023-05-10T14:15:00Z'),
      createdAt: new Date('2023-02-15T09:30:00Z'),
      updatedAt: new Date('2023-05-10T14:15:00Z')
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shopifyAdminAccessToken: '',
    apiAccessToken: '',
    apiKey: '',
    shopifyDomain: '',
    password: '',
    storefrontApi: '',
    mobile: '',
    role: 'user',
    isActive: true,
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    profilePicture: ''
  });

  const itemsPerPage = 5;

  // Filter admins based on search term
  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (admin) => {
    setFormData({
      ...admin,
      // Ensure nested objects are properly spread
      address: { ...admin.address }
    });
    setIsFormOpen(true);
  };

  const handleView = (admin) => {
    setSelectedAdmin(admin);
    setIsViewOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(admin => admin._id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData._id) {
      // Update existing admin
      setAdmins(admins.map(admin => 
        admin._id === formData._id ? formData : admin
      ));
    } else {
      // Add new admin
      const newAdmin = {
        ...formData,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: null
      };
      setAdmins([...admins, newAdmin]);
    }
    setIsFormOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      shopifyAdminAccessToken: '',
      apiAccessToken: '',
      apiKey: '',
      shopifyDomain: '',
      password: '',
      storefrontApi: '',
      mobile: '',
      role: 'user',
      isActive: true,
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      },
      profilePicture: ''
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested address fields
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-svh rounded-4xl">
      <h1 className="text-2xl font-bold mb-6">Admin Management</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search admins..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto justify-center"
        >
          <Plus size={18} />
          Add Admin
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedAdmins.length > 0 ? (
                paginatedAdmins.map((admin) => (
                  <tr key={admin._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={admin.profilePicture || 'https://via.placeholder.com/40'} alt={admin.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                          <div className="text-sm text-gray-500">{admin.mobile}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${admin.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                          admin.role === 'vendor' ? 'bg-orange-100 text-orange-800' : 
                          admin.role === 'super' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${admin.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {admin.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(admin)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(admin)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(admin._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No admins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredAdmins.length)}</span> of{' '}
                  <span className="font-medium">{filteredAdmins.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft size={20} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium 
                        ${currentPage === page ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight size={20} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Admin Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {formData._id ? 'Edit Admin' : 'Add New Admin'}
              </h2>
              <AdminForm 
                formData={formData} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                onCancel={() => setIsFormOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Admin Details Modal */}
      {isViewOpen && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Admin Details</h2>
              <AdminDetails 
                admin={selectedAdmin} 
                onClose={() => setIsViewOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminList;