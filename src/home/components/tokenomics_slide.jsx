import React, { useState, useRef, useEffect } from 'react';
import SlideTitle from './slide_title.jsx';
import '../css/tokenomics.css';
import tokenomics_video from '../assets/video/tokenomics-video.mp4';


const TokenomicsSlide = () => {
    const [videoFirstLaunched, setVideoFirstLaunched] = useState(false);
    const [videoEnded, setVideoEnded] = useState(true);
    const videoRef = useRef(null);

    const handleScroll = () => {
        if (videoRef.current) {
            const rect = videoRef.current.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            if (!videoFirstLaunched) {
                if (isVisible) {
                    videoRef.current.play();
                    setVideoEnded(false);
                    setVideoFirstLaunched(true);
                }
                else {
                    videoRef.current.pause();
                }
            }
        }
    };

    const handleVideoEnded = () => {
        setVideoEnded(true);
    };

    const handleRestart = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setVideoEnded(false);
        }
    };

    useEffect(() => {
        const handleVideoLoad = () => {
            if (videoRef.current) {
                videoRef.current.load();
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleVideoLoad);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('load', handleVideoLoad);
        };
    });

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('ended', handleVideoEnded);
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('ended', handleVideoEnded);
            }
        };
    });

    return (
        <div className='tokenomics-wrapper'>
            <video
                ref={videoRef}
                className='tokenomics-video'
                src={tokenomics_video}
                muted
                playsInline
                preload="auto"
            />
            <p className={`tokenomics-supply-text ${!videoEnded || !videoFirstLaunched ? 'hidden' : ''}`}>
                Total Supply - <span className="tokenomics-supply-text-percentage">10,000,000</span>
            </p>
            <SlideTitle pageName='TOKENOMICS' />
            <button
                className={`tokenomics-rescan-button ${!videoEnded || !videoFirstLaunched ? 'hidden' : ''}`}
                onClick={handleRestart}
            >
                Rescan
            </button>
        </div>
    );
};

export default TokenomicsSlide;