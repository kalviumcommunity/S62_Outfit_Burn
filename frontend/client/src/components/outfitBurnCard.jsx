/* eslint-disable react/prop-types */
import './outfitBurnCard.css'

const OutfitBurnCard = ({ image, name, burn }) => {
    return (
        <div className="outfit-burn-card">
            <img src={image} alt={name} className="outfit-image" />
            <h3>{name}</h3>
            <p className="burn-comment">{burn}</p>
        </div>
    );
};

export default OutfitBurnCard;
