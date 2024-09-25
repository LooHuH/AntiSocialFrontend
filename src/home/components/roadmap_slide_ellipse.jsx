import React from 'react';

const Roadmap_slide_ellipse = ({season_number, className}) => {
    return (
        <svg className={`ellipse ${className ? className : ''}`} width="120" height="120" viewBox="0 0 200 200"
             xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="100" rx="100" ry="100" fill="white" stroke="black" strokeWidth="6"/>
            <text x="100" y="108" className='ellipse-text' textAnchor="middle" dominantBaseline="middle">
                <tspan fill="#FF0000">s</tspan>
                <tspan className="season_number">{season_number}</tspan>
            </text>
        </svg>
    );
}

export default Roadmap_slide_ellipse;
