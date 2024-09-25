import {Component, createRef, forwardRef} from 'react';
import MainSlide from './components/main_slide.jsx';
import TokenomicsSlide from './components/tokenomics_slide.jsx';
import RoadmapSlide from './components/roadmap_slide.jsx';
import Stuff_slide from './components/stuff_slide.jsx';
import SlideSwitcher from './components/slide_switcher.jsx';

import './css/home.css';


class Home extends Component {
    constructor(props) {
        super(props);
        this.secondWhiteLine = createRef();
    }

    scrollToSecondWhiteLine = () => {
        const nextWhiteLineRef = this.secondWhiteLine
    
        if (nextWhiteLineRef && nextWhiteLineRef.current) {
            console.log(nextWhiteLineRef);
            console.log(nextWhiteLineRef.current);
            const element = nextWhiteLineRef.current;
            const rect = element.getBoundingClientRect();
            const offsetTop = window.scrollY || document.documentElement.scrollTop;
    
            // Вычислить положение, где верхняя граница элемента окажется снизу видимой области
            const scrollPosition = rect.top + offsetTop - window.innerHeight;
    
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    };
    

    render() {
        return (
            <div className="home-page">
                <SlideSwitcher onSwitch={this.scrollToSecondWhiteLine}/>
                <MainSlide />
                <SlideSeparator />
                <TokenomicsSlide />
                <SlideSeparator ref={this.secondWhiteLine} />
                <RoadmapSlide />
                <SlideSeparator />
                <Stuff_slide />
            </div>
        );
    }
}

const SlideSeparator = forwardRef(({ className }, ref) => {
    return (
        <div ref={ref} className={`white-line ${className ? className : ''}`}>
        </div>
    );
});

export default Home;
