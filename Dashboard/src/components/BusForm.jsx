import { useState } from 'react';

export default function BusForm() {
  const [formData, setFormData] = useState({
    busName: '',
    busImage: null,
    busType: 'AC',
    busModel: '',
    seater: '28',
    price: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, busImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Convert image file to base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    // Validate required fields
    if (!formData.busName.trim()) {
      setMessage({ type: 'error', text: 'Please enter Bus Name' });
      return;
    }

    if (!formData.busModel.trim()) {
      setMessage({ type: 'error', text: 'Please enter Bus Model' });
      return;
    }
    
    if (!formData.busType) {
      setMessage({ type: 'error', text: 'Please select Bus Type' });
      return;
    }
    
    if (!formData.seater) {
      setMessage({ type: 'error', text: 'Please select Seater Capacity' });
      return;
    }
    
    if (!formData.price || formData.price <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid Price' });
      return;
    }

    try {
      setLoading(true);

      // Convert image to base64 if provided
      let busImageBase64 = null;
      if (formData.busImage) {
        busImageBase64 = await fileToBase64(formData.busImage);
      }

      // Prepare API payload
      const payload = {
        busName: formData.busName.trim(),
        busModel: formData.busModel.trim(),
        busType: formData.busType,
        seater: parseInt(formData.seater),
        price: parseFloat(formData.price),
        busImage: busImageBase64
      };

      // Make API call
      const response = await fetch('https://busjncation1.onrender.com/api/buses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({ type: 'success', text: 'Bus added successfully! ✅' });
        console.log('Bus created:', result.data);
        
        // Show success popup
        setSuccessData(result.data);
        setShowSuccessPopup(true);
        
        // Reset form
        setFormData({
          busName: '',
          busImage: null,
          busType: 'AC',
          busModel: '',
          seater: '28',
          price: '',
        });
        setImagePreview(null);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to add bus' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Provide more detailed error messages
      let errorMessage = 'Error: ';
      
      if (error.message === 'Failed to fetch') {
        errorMessage = '❌ Cannot connect to backend server. Make sure:\n1. Backend is running on  https://busjncation1.onrender.com\n2. Start backend with: npm start\n3. Check if port 5000 is in use';
      } else {
        errorMessage += error.message;
      }
      
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-0">
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8 max-w-sm w-full transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
            {/* Success Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8 sm:w-12 sm:h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Title and Message */}
            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-1 sm:mb-2">
              Bus Added! 🎉
            </h3>
            <p className="text-center text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              Your bus has been added successfully.
            </p>

            {/* Bus Details */}
            {successData && (
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 space-y-2 sm:space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Name:</span>
                  <span className="text-gray-900 font-semibold text-right truncate ml-2">{successData.busName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Model:</span>
                  <span className="text-gray-900 font-semibold text-right truncate ml-2">{successData.busModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Type:</span>
                  <span className="text-gray-900 font-semibold">{successData.busType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Capacity:</span>
                  <span className="text-gray-900 font-semibold">{successData.seater}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Price:</span>
                  <span className="text-gray-900 font-semibold">₹{successData.price}</span>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 sm:py-3 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm sm:text-base"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-2 sm:py-3 rounded-lg hover:shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 text-sm sm:text-base"
              >
                Add More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 sm:px-8 py-5 sm:py-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Add New Bus</h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">Fill in the details below</p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-8">
          {/* Success/Error Message */}
          {message.text && (
            <div
              className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Bus Name */}
          <div className="mb-5 sm:mb-8">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Bus Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="busName"
              value={formData.busName}
              onChange={handleInputChange}
              placeholder="e.g., Shriram Express"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 text-sm"
            />
          </div>

          {/* Bus Image */}
          <div className="mb-5 sm:mb-8">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3">
              Bus Image <span className="text-gray-500 text-xs font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="busImage"
              />
              <label
                htmlFor="busImage"
                className="flex items-center justify-center w-full border-2 border-dashed border-blue-300 rounded-xl p-4 sm:p-8 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 active:bg-blue-100"
              >
                {imagePreview ? (
                  <div className="w-full">
                    <img
                      src={imagePreview}
                      alt="Bus Preview"
                      className="w-full h-32 sm:h-48 object-cover rounded-lg"
                    />
                    <p className="text-center mt-2 sm:mt-3 text-xs sm:text-sm text-blue-600 font-medium">
                      Tap to change
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg
                      className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-blue-400 mb-1 sm:mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <p className="text-gray-700 font-medium text-sm">Upload Image</p>
                    <p className="text-gray-500 text-xs mt-1">or drag & drop</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Bus Type */}
          <div className="mb-5 sm:mb-8">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3">
              Bus Type
            </label>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {['AC', 'Non-AC'].map((type) => (
                <label
                  key={type}
                  className="flex items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 min-h-[48px] sm:min-h-auto"
                  style={{
                    borderColor: formData.busType === type ? '#2563eb' : '#e5e7eb',
                    backgroundColor: formData.busType === type ? '#eff6ff' : '#ffffff',
                  }}
                >
                  <input
                    type="radio"
                    name="busType"
                    value={type}
                    checked={formData.busType === type}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 cursor-pointer"
                  />
                  <span className={`ml-2 sm:ml-3 font-medium text-sm ${
                    formData.busType === type ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Bus Model */}
          <div className="mb-5 sm:mb-8">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Bus Model <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="busModel"
              value={formData.busModel}
              onChange={handleInputChange}
              placeholder="e.g., Volvo B11R"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 text-sm"
            />
          </div>

          {/* Seater Dropdown */}
          <div className="mb-5 sm:mb-8">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Seater Capacity <span className="text-red-600">*</span>
            </label>
            <select
              name="seater"
              value={formData.seater}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-white cursor-pointer appearance-none text-sm"
            >
              {[11, 21, 25, 28, 32, 36, 38, 41, 42].map((seat) => (
                <option key={seat} value={seat}>
                  {seat} Seater
                </option>
              ))}
            </select>
          </div>

          {/* Price Input */}
          <div className="mb-5 sm:mb-8">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Price (INR) <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-700 font-semibold text-sm">₹</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                className="w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 text-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-4 pt-3 sm:pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-300 min-h-[44px] sm:min-h-auto text-sm sm:text-base ${
                loading
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="hidden xs:inline">Adding...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Bus
                  </>
                )}
              </span>
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setFormData({
                  busName: '',
                  busImage: null,
                  busType: 'AC',
                  busModel: '',
                  seater: '28',
                  price: '',
                });
                setImagePreview(null);
                setMessage({ type: '', text: '' });
              }}
              className={`flex-1 font-semibold py-2.5 sm:py-3 rounded-lg transition-colors duration-300 min-h-[44px] sm:min-h-auto text-sm sm:text-base ${
                loading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95'
              }`}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
