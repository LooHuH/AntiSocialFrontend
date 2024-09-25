import RoadmapCard from './roadmap_slide_card.jsx';
import SlideTitle from './slide_title.jsx';
import '../css/roadmap.css';

const RoadmapSlide = () => {
    let text = '**Objective:**\n' +
        'Your mission is to gather critical data on major corporations. By completing quests, you\'ll explore internal processes, identify vulnerabilities, and collect compromising documents that give you an edge by the end.\n' +
        '\n' +
        '**Mission Stages:**\n' +
        '\n' +
        '1) **Data Collection:**\n' +
        '   - Collect confidential documents daily, including reports, emails, financial records, and partner data.\n' +
        '   \n' +
        '2) **Corporate Mechanics Study:**\n' +
        '   - Complete quests to learn about company functions and identify security gaps that can be exploited later.\n' +
        '   \n' +
        '3) **Final Stage:**\n' +
        '   - Gather as much compromising material as possible to prepare for the final strike. Success depends on the quality of data and understanding of corporate systems.\n' +
        '\n' +
        'Information is your key weapon.';

    return (
        <div className="roadmap-container">
            <RoadmapCard season_number='1' header='INJECTION' text={text}/>
            <RoadmapCard season_number='2' className='reversed' header='Boost community' text={text}/>
            <RoadmapCard season_number='3' header='Boost community' text={text}/>
            <RoadmapCard season_number='4' className='reversed' header='Boost community' text={text}/>
            <RoadmapCard season_number='5' header='Boost community' text={text}/>

            <SlideTitle pageName='ROADMAP'/>
        </div>
    );
};

export default RoadmapSlide;
