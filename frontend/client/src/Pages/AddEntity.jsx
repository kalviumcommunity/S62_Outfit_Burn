import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const AddEntityPage = ({ onEntityAdded }) => {
  const [formData, setFormData] = useState({ name: '', type: '', price: '' });
  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace this URL with your actual API endpoint for adding entities
    const response = await fetch('https://your-api-url.com/entities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newEntity = await response.json();
      onEntityAdded(newEntity); // Notify the parent component about the new entity
      setFormData({ name: '', type: '', price: '' }); // Reset the form
      setIsFormVisible(false); // Hide form after submission
    } else {
      console.error('Failed to add entity');
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)} // Toggle form visibility
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
      >
        {isFormVisible ? 'Hide' : 'Post Outfit'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Type:</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Outfit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddEntityPage;
