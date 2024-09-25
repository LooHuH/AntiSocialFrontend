import {useEffect, useState} from "react";

import "./css/small-screen-alert.css";

import phone from './assets/images/phone.png';
import pc from './assets/images/pc.png';


export default function SmallScreenAlert() {
    const [isScreenLargeEnough, setIsScreenLargeEnough] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const minWidth = 1340;
            const minHeight = 720;

            const isLargeEnough = screenWidth >= minWidth && screenHeight >= minHeight;
            setIsScreenLargeEnough(isLargeEnough);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    if (!isScreenLargeEnough) {
        return (
            <div className={`index-screen-size-warning`}>
                <div className={`index-screen-size-warning-info-container`}>
                    <div className={`index-screen-size-warning-visualised-container`}>
                        <img className={`index-screen-size-warning-image1`} src={phone} alt={`phone`}/>
                        <div className={`index-screen-size-warning-arrow`}>
                            {'>'}
                        </div>
                        <img className={`index-screen-size-warning-image2`} src={pc} alt={`pc`}/>
                    </div>
                    <div className={`index-screen-size-warning-text`}>
                        This website is optimized for desktop screens. Please use a larger screen or a device with a
                        larger screen to enjoy the full experience.
                    </div>
                </div>
            </div>
        );
    }

    return null;
};