import React from 'react';
import '../css/stuff.css';

const Stuff_slide_card = ({signature, image, description_data}) => {
    const {name, aka, age, location, nationality, balance, crimes} = description_data;

    return (
        <div className="card-container">
            <div className='stuff-card'>
                <div className='container-3d'>
                </div>

                <div className='front-card'>
                    <div className='card-image-container'>
                        <img className="card-image" src={image} alt="CardImage"/>
                    </div>

                    <div className='card-signature'>
                        <p>{signature}</p>
                    </div>
                </div>

                <div className='card-description'>
                    <div className='small-img'>
                        <img src={image} alt="CardImageSmall"/>
                    </div>
                    <div className='card-id-container'>
                        <p>ID CARD</p>
                    </div>
                    <p className='card-name'>
                        Name: <span className='card-green-text'>{name}</span>
                    </p>
                    <p className='card-aka'>
                        Aka: <span className='card-green-text'>{aka}</span>
                    </p>
                    <p className='card-nationality'>
                        Nationality: <span className='card-green-text'>{nationality}</span>
                    </p>
                    <p className='card-location'>
                        Last Location: <span className='card-green-text'>{location}</span>
                    </p>
                    <p className='card-balance'>
                        Estimated balance: <span className='card-green-text'>{balance}</span>
                    </p>
                    <p className='card-age'>
                        Age: <span className='card-green-text'>{age}</span>
                    </p>
                    <div className='card-crimes'>
                        <p>CYBER VIOLATIONS</p>
                        <ul>
                            {crimes.map((crime, index) => <li key={index}>{crime}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stuff_slide_card;
