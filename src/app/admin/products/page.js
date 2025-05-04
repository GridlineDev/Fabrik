"use client"
import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Settings, Image, Plus, Filter, RefreshCcw, X } from 'lucide-react';
import { redirect } from 'next/navigation';
import debounce from 'lodash.debounce';

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const productsPerPage = 10;

  // Simulated API call (replace with actual Shopify REST API call)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = searchTerm ? `?title=${encodeURIComponent(searchTerm)}` : '';
        const response = await fetch(`/api/products${query}`);
        const data = await response.json();
        setProducts(data.products || []);
        setCurrentPage(1); // Reset page on new fetch
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to avoid too many API calls
    const debouncedFetch = debounce(fetchProducts, 500);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm]);



  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleCustomize = (productID) => {
    redirect(`/admin/customize/${productID}`);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const refreshData = () => {
    setLoading(true);
    // Simulate refresh delay
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Products</h2>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all flex items-center space-x-2 shadow-md"
            onClick={() => alert("Add new product")}
          >
            <Plus size={18} />
            <span>Add Product</span>
          </button>
        </div>
        
        {/* Controls Row */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all bg-white"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              onClick={() => alert("Filter options")}
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
            
            <button 
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              onClick={refreshData}
            >
              <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="mb-4 text-sm text-gray-600 flex items-center justify-between">
          <div>
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
          </div>
          {sortField && (
            <div className="flex items-center space-x-1">
              <span>Sorted by:</span>
              <span className="font-medium">{sortField}</span>
              <span>({sortDirection === 'asc' ? 'A-Z' : 'Z-A'})</span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Product Table */}
            <div className="overflow-hidden bg-white rounded-xl shadow-md">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th 
                      className="py-4 px-6 text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>ID</span>
                        {sortField === 'id' && (
                          <span className="text-blue-600">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="py-4 px-6 text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Product</span>
                        {sortField === 'title' && (
                          <span className="text-blue-600">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-600">Image</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-blue-50 transition-colors border-b border-gray-100">
                        <td className="py-4 px-6 text-gray-500 font-mono text-sm">{product.id}</td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-800">{product.title}</div>
                          {product.variant_count && (
                            <div className="text-xs text-gray-500 mt-1">
                              {product.variant_count} variants
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {product.images && product.images[0] ? (
                            <div className="relative h-16 w-16 rounded-lg overflow-hidden shadow-sm">
                              <img
                                src={product.images[0].src}
                                alt={product.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-16 w-16 flex items-center justify-center bg-gray-100 rounded-lg">
                              <Image size={24} className="text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm"
                            onClick={() => handleCustomize(product.id)}
                          >
                            <Settings size={16} />
                            <span>Customize</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-16 px-6 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <Image size={48} className="text-gray-300" />
                          <div className="text-lg font-medium text-gray-600">No products found</div>
                          <p className="text-gray-500 max-w-sm">
                            Try adjusting your search or filters to find what you're looking for
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm'
                    }`}
                  >
                    <ChevronLeft size={16} />
                    <span className="ml-1">Previous</span>
                  </button>
                  
                  {totalPages <= 5 ? (
                    // Show all page numbers if 5 or fewer pages
                    Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-2 rounded-lg ${
                          currentPage === index + 1
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))
                  ) : (
                    // Show limited page numbers with ellipsis for more than 5 pages
                    <>
                      <button
                        onClick={() => paginate(1)}
                        className={`px-3 py-2 rounded-lg ${
                          currentPage === 1
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm'
                        }`}
                      >
                        1
                      </button>
                      
                      {currentPage > 3 && <span className="px-2 py-2">...</span>}
                      
                      {currentPage > 2 && currentPage < totalPages && (
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          className="px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
                        >
                          {currentPage - 1}
                        </button>
                      )}
                      
                      {currentPage > 1 && currentPage < totalPages && (
                        <button className="px-3 py-2 rounded-lg bg-blue-600 text-white shadow-sm">
                          {currentPage}
                        </button>
                      )}
                      
                      {currentPage < totalPages - 1 && currentPage > 1 && (
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          className="px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
                        >
                          {currentPage + 1}
                        </button>
                      )}
                      
                      {currentPage < totalPages - 2 && <span className="px-2 py-2">...</span>}
                      
                      <button
                        onClick={() => paginate(totalPages)}
                        className={`px-3 py-2 rounded-lg ${
                          currentPage === totalPages
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm'
                    }`}
                  >
                    <span className="mr-1">Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
            
            {/* Product Customization Modal */}
            {selectedProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Customize Product
                    </h3>
                    <button 
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 p-2 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    {selectedProduct.images && selectedProduct.images[0] ? (
                      <div className="mb-6 rounded-xl overflow-hidden shadow-md">
                        <img
                          src={selectedProduct.images[0].src}
                          alt={selectedProduct.title}
                          className="w-full object-cover h-64"
                        />
                      </div>
                    ) : (
                      <div className="h-64 w-full flex items-center justify-center bg-gray-100 rounded-xl mb-6">
                        <Image size={64} className="text-gray-300" />
                      </div>
                    )}
                    
                    <h4 className="font-medium text-xl text-gray-800 mb-2">
                      {selectedProduct.title}
                    </h4>
                    <p className="text-gray-500 text-sm mb-6">
                      Product ID: {selectedProduct.id}
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Customization Options
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h5 className="font-medium text-gray-700 mb-2">Color</h5>
                            <div className="flex space-x-2">
                              <button className="w-8 h-8 rounded-full bg-red-500 ring-2 ring-offset-2 ring-red-500"></button>
                              <button className="w-8 h-8 rounded-full bg-blue-500"></button>
                              <button className="w-8 h-8 rounded-full bg-green-500"></button>
                              <button className="w-8 h-8 rounded-full bg-purple-500"></button>
                              <button className="w-8 h-8 rounded-full bg-yellow-500"></button>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h5 className="font-medium text-gray-700 mb-2">Size</h5>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 border border-gray-300 rounded bg-white text-sm">S</button>
                              <button className="px-3 py-1 border border-blue-500 bg-blue-50 text-blue-700 rounded text-sm">M</button>
                              <button className="px-3 py-1 border border-gray-300 rounded bg-white text-sm">L</button>
                              <button className="px-3 py-1 border border-gray-300 rounded bg-white text-sm">XL</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Description
                        </label>
                        <textarea 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="3"
                          defaultValue={selectedProduct.description || ""}
                          placeholder="Enter product description"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center">
                            featured
                            <button className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center">
                            sale
                            <button className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center">
                            new
                            <button className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                          </span>
                          <input 
                            type="text" 
                            className="border border-dashed border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Add tag..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button 
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}