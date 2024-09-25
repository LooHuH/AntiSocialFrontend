import {useEffect, useState} from "react";

const LoadingScreen = () => {
    const [index, setIndex] = useState(0);
    const interval = 100;
    const frames = [
        '|',
        '/',
        '—',
        '\\',
    ];
    const [displayText, setDisplayText] = useState(frames[index]);

    useEffect(() => {
        const tick = () => {
            setIndex(index + 1);
            setDisplayText(frames[index % frames.length]);
        }

        const intervalId = setInterval(tick, interval);

        return () => clearInterval(intervalId);
    });

    return (
        <div className={`loading-bg`}>
            <div className={`loading-anim`}>
                {displayText}
            </div>
        </div>
    );
};

export default LoadingScreen;