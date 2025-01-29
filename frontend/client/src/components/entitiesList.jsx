import { useEffect, useState } from 'react';

const EntitiesList = () => {
    const [entities, setEntities] = useState([]);
    
    // Fetch entities from the server
    const fetchEntities = () => {
        fetch('http://localhost:3000/user/user') // Update API endpoint if needed
            .then(response => response.json())
            .then(data => setEntities(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    // Initial fetch on component mount
    useEffect(() => {
        fetchEntities();
    }, []);

    // Function to handle re-fetching after adding an entity
    const handleEntityAdded = () => {
        fetchEntities();
    };

    return (
        <div>
            <h1>Entities</h1>
            <ul>
                {entities.map(entity => (
                    <li key={entity._id}>{entity.name}</li>
                ))}
            </ul>
            {/* Button to simulate an entity being added */}
            <button onClick={handleEntityAdded}>Refresh List</button>
        </div>
    );
};

export default EntitiesList;
