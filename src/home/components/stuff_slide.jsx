import React from 'react';
import SlideTitle from './slide_title.jsx';
import Stuff_slide_card from './stuff_slide_card.jsx';
import '../css/stuff.css';

import hacker1 from '../assets/images/hackers/hacker1.jpg';
import hacker2 from '../assets/images/hackers/hacker2.jpg';
import hacker3 from '../assets/images/hackers/hacker3.png';
import hacker4 from '../assets/images/hackers/hacker4.png';


const cardData_haze = {
    name: "Dylan Campbell",
    aka: "HAZE",
    nationality: "Canadian",
    location: "Toronto",
    balance: "17 BTC",
    age: 22,
    crimes: [
        "Cryptojacking",
        "ICO scams",
        "Smart contract exploits",
        "Phishing",
    ]
};

const cardData_nothacker = {
    name: "Jay Brons",
    aka: "NOTHACKER",
    nationality: "American",
    location: "Zermatt",
    balance: "6.66 BTC",
    age: 26,
    crimes: [
        "Carding",
        "SIM hijacking",
        "Pump and Dump schemes",
        "Dusting Attack",
    ]
};

const cardData_fingerprint = {
    name: "Max Torres",
    aka: "FINGERPRINT",
    nationality: "Canadian",
    location: "Dubai",
    balance: "12.34 BTC",
    age: 28,
    crimes: [
        "Remote Access Trojan",
        "Ransomware Attacks",
        "Mirai Botnet Attacks",
        "Domain Kiting",
    ]
};

const cardData_n3t5n4k3
    = {
    name: "Max Torres",
    aka: "FINGERPRINT",
    nationality: "Canadian",
    location: "Dubai",
    balance: "12.34 BTC",
    age: 28,
    crimes: [
        "Remote Access Trojan",
        "Ransomware Attacks",
        "Mirai Botnet Attacks",
        "Domain Kiting",
    ]
};

const Stuff_slide = () => {
    return (
        <div className="stuff-container">
            <SlideTitle pageName='STUFF'/>
            <Stuff_slide_card signature='@HAZE' image={hacker1} description_data={cardData_haze}/>
            <Stuff_slide_card signature='@NOTHACKER' image={hacker2} description_data={cardData_nothacker}/>
            <Stuff_slide_card signature='@FINGERPRINT' image={hacker3} description_data={cardData_fingerprint}/>
            <Stuff_slide_card signature='@HACKER4' image={hacker4} description_data={cardData_n3t5n4k3}/>
        </div>
    );
};

export default Stuff_slide;
