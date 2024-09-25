import Roadmap_slide_ellipse from './roadmap_slide_ellipse.jsx';

const RoadmapCard = ({season_number, className, header, text,}) => {
    return (
        <div className={`roadmap-card ${className ? className : ''}`}>
            <div className="roadmap-content">
                <div className={`roadmap-text-container ${className ? className : ''}`}>
                    <h2 className='broken-text'>{header}</h2>
                    <p className='broken-text'>{text}</p>
                </div>
                <Roadmap_slide_ellipse season_number={season_number} className={className}/>
            </div>
        </div>
    );
};

export default RoadmapCard;
