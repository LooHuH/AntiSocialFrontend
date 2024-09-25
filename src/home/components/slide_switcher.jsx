import React, { useState, useEffect, useRef } from 'react';
import arrow from '../assets/images/arrow-down.png';

const SlideSwitcher = ({ onSwitch }) => {
    const [isVisible, setIsVisible] = useState(true);
    const arrowRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const firstWhiteLine = document.querySelector('.white-line');
            const distanceFromTopToLineBottom = firstWhiteLine.getBoundingClientRect().bottom + window.scrollY;

            if (arrowRef.current) {
                const distanceFromTopToArrowBottom = window.scrollY + arrowRef.current.getBoundingClientRect().bottom;

                if (distanceFromTopToLineBottom <= distanceFromTopToArrowBottom) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Для начальной проверки видимости

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div 
            className={`page-switcher ${isVisible ? '' : 'hidden'}`} 
            onClick={onSwitch}
            ref={arrowRef}
        >
            <img src={arrow} alt='switcher' />
        </div>
    );
}

export default SlideSwitcher;
