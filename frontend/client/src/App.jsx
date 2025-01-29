import OutfitBurnCard from "./components/outfitBurnCard";
import EntitiesList from './components/entitiesList';

import "./App.css";

function App() {
    const outfits = [
        {
            image: "https://via.placeholder.com/300x200?text=Casual+Shirt",
            name: "Casual Shirt",
            burn: "Did you steal this from your grandpa's closet?"
        },
        {
            image: "https://via.placeholder.com/300x200?text=Formal+Suit",
            name: "Formal Suit",
            burn: "Trying too hard to look like James Bond, huh?"
        },
        {
            image: "https://via.placeholder.com/300x200?text=Party+Dress",
            name: "Party Dress",
            burn: "Is this a dress or a disco ball?"
        },
    ];

    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to Outfit Burn</h1>
                <p>Outfit Burn is a fun platform for roasting different outfits</p>
            </header>
            <main className="outfit-grid">
                {outfits.map((outfit, index) => (
                    <OutfitBurnCard
                        key={index}
                        image={outfit.image}
                        name={outfit.name}
                        burn={outfit.burn}
                    />
                ))}
            </main>
            <EntitiesList />
        </div>
    );
}

export default App;
