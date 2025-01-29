import { useEffect, useState } from 'react';

const EntitiesList = () => {
    const [entities, setEntities] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/user/user') 
            .then(response => response.json())
            .then(data => setEntities(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    return (
        <div>
            <h1>Entities</h1>
            <ul>
                {entities.map(entity => (
                    <li key={entity._id}>{entity.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default EntitiesList;
