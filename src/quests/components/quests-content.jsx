import React, { useState, Component, createRef } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Link} from 'react-router-dom';
import {Pagination, Navigation, Autoplay} from 'swiper/modules';
import SwiperCore from 'swiper';
import {questsPath} from "../../index.jsx";
import {cryptoPath} from "../../index.jsx";

//Services pics
import arrow from '../assets/images/services-pics/arrow.png';
//Chains pics
import BNBChain from '../assets/images/chains-pics/bnb-chain.png';
import Polygonchain from '../assets/images/chains-pics/polygon-chain.png';
import SolanaChain from '../assets/images/chains-pics/solana-chain.png';
import OPChain from '../assets/images/chains-pics/op-chain.png';
import ArbitrumChain from '../assets/images/chains-pics/arbitrum-chain.png';
import ZebraChain from '../assets/images/chains-pics/zebra-chain.png';
import AvalancheChain from '../assets/images/chains-pics/avalanche-chain.png';
import VillagerChain from '../assets/images/chains-pics/villager-chain.png';
import ScroolChain from '../assets/images/chains-pics/scroll-chain.png';
import QredoChain from '../assets/images/chains-pics/qredo-chain.png';
//Quests cards pics
import questCard1QuestPic from '../assets/images/quests-cards-pics/quest-card-1-quest-pic.jpg'
import questCard2QuestPic from '../assets/images/quests-cards-pics/quest-card-2-quest-pic.jpg'
import questCard3QuestPic from '../assets/images/quests-cards-pics/quest-card-3-quest-pic.jpg'
import questCard4QuestPic from '../assets/images/quests-cards-pics/quest-card-4-quest-pic.jpg'
import questCard5QuestPic from '../assets/images/quests-cards-pics/quest-card-5-quest-pic.jpg'
import questCard6QuestPic from '../assets/images/quests-cards-pics/quest-card-6-quest-pic.jpg'
//Company cards pics
import company1CardPic from '../assets/images/company-pics/company-1-card-pic.png'
import company2CardPic from '../assets/images/company-pics/company-2-card-pic.png'
import company3CardPic from '../assets/images/company-pics/company-3-card-pic.png'
import company4CardPic from '../assets/images/company-pics/company-4-card-pic.png'
import company5CardPic from '../assets/images/company-pics/company-5-card-pic.png'
import company6CardPic from '../assets/images/company-pics/company-6-card-pic.png'

SwiperCore.use([Navigation, Pagination]);

class RenderContent extends Component {
    constructor(props) {
        super(props);
        this.swiperRefWelcome = createRef();
        this.swiperRef = createRef();
        this.swiperRefEcosystems = createRef();
        this.swiperRefSprints = createRef();
        this.swiperRefNFT = createRef();
        this.state = {
            query: '',
            isPrevButtonDisabled: true,
            isNextButtonDisabled: false,
            isPrevButtonEcosystemsDisabled: true,
            isNextButtonEcosystemsDisabled: false,
            isPrevButtonDisabledSprints: true,
            isNextButtonDisabledSprints: false,
            isPrevButtonDisabledNFT: true,
            isNextButtonDisabledNFT: false,
            showAllQuests: false,
            activeSlide: 0,
        };
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevEcosystems = this.handlePrevEcosystems.bind(this);
        this.handleNextEcosystems = this.handleNextEcosystems.bind(this);
        this.handlePrevSprints = this.handlePrevSprints.bind(this);
        this.handleNextSprints = this.handleNextSprints.bind(this);
        this.handlePrevNFT = this.handlePrevNFT.bind(this);
        this.handleNextNFT = this.handleNextNFT.bind(this);
        this.handleShowAllQuestsClick = this.handleShowAllQuestsClick.bind(this);
    }

    handleIndicatorClick = (index) => {
        if (this.swiperRefWelcome.current && this.swiperRefWelcome.current.swiper) {
            this.swiperRefWelcome.current.swiper.slideTo(index);
            this.setState({ activeSlide: index });
        }
    }
    handleShowAllQuestsClick() {
        // При клике скрываем кнопку и отображаем все квесты
        this.setState({ showAllQuests: true });
    }

    updateButtonStates(swiper) {
        if (swiper.isBeginning) {
            this.setState({isPrevButtonDisabled: true});
        } else {
            this.setState({isPrevButtonDisabled: false});
        }
        if (swiper.isEnd) {
            this.setState({isNextButtonDisabled: true});
        } else {
            this.setState({isNextButtonDisabled: false});
        }
    }

    updateButtonStatesEcosystems(swiper) {
        if (swiper.isBeginning) {
            this.setState({isPrevButtonEcosystemsDisabled: true});
        } else {
            this.setState({isPrevButtonEcosystemsDisabled: false});
        }
        if (swiper.isEnd) {
            this.setState({isNextButtonEcosystemsDisabled: true});
        } else {
            this.setState({isNextButtonEcosystemsDisabled: false});
        }
    }

    updateButtonStatesSprints(swiper) {
        if (swiper.isBeginning) {
            this.setState({isPrevButtonDisabledSprints: true});
        } else {
            this.setState({isPrevButtonDisabledSprints: false});
        }
        if (swiper.isEnd) {
            this.setState({isNextButtonDisabledSprints: true});
        } else {
            this.setState({isNextButtonDisabledSprints: false});
        }
    }

    updateButtonStatesNFT(swiper) {
        if (swiper.isBeginning) {
            this.setState({isPrevButtonDisabledNFT: true});
        } else {
            this.setState({isPrevButtonDisabledNFT: false});
        }
        if (swiper.isEnd) {
            this.setState({isNextButtonDisabledNFT: true});
        } else {
            this.setState({isNextButtonDisabledNFT: false});
        }
    }

    handlePrev() {
        if (this.swiperRef.current && this.swiperRef.current.swiper) {
            this.swiperRef.current.swiper.slidePrev();
            this.updateButtonStates(this.swiperRef.current.swiper);
        }
    }

    handleNext() {
        if (this.swiperRef.current && this.swiperRef.current.swiper) {
            this.swiperRef.current.swiper.slideNext();
            this.updateButtonStates(this.swiperRef.current.swiper);
        }
    }

    handlePrevEcosystems() {
        if (this.swiperRefEcosystems.current && this.swiperRefEcosystems.current.swiper) {
            this.swiperRefEcosystems.current.swiper.slidePrev();
            this.updateButtonStatesEcosystems(this.swiperRefEcosystems.current.swiper);
        }
    }

    handleNextEcosystems() {
        if (this.swiperRefEcosystems.current && this.swiperRefEcosystems.current.swiper) {
            this.swiperRefEcosystems.current.swiper.slideNext();
            this.updateButtonStatesEcosystems(this.swiperRefEcosystems.current.swiper);
        }
    }

    handlePrevSprints() {
        if (this.swiperRefSprints.current && this.swiperRefSprints.current.swiper) {
            this.swiperRefSprints.current.swiper.slidePrev();
            this.updateButtonStatesSprints(this.swiperRefSprints.current.swiper);
        }
    }

    handleNextSprints() {
        if (this.swiperRefSprints.current && this.swiperRefSprints.current.swiper) {
            this.swiperRefSprints.current.swiper.slideNext();
            this.updateButtonStatesSprints(this.swiperRefSprints.current.swiper);
        }
    }

    handlePrevNFT() {
        if (this.swiperRefNFT.current && this.swiperRefNFT.current.swiper) {
            this.swiperRefNFT.current.swiper.slidePrev();
            this.updateButtonStatesNFT(this.swiperRefNFT.current.swiper);
        }
    }

    handleNextNFT() {
        if (this.swiperRefNFT.current && this.swiperRefNFT.current.swiper) {
            this.swiperRefNFT.current.swiper.slideNext();
            this.updateButtonStatesNFT(this.swiperRefNFT.current.swiper);
        }
    }

    handleSwiperSlideChange = (swiper) => {
        this.updateButtonStates(swiper);
    }

    handleSwiperSlideChangeEcosystems = (swiper) => {
        this.updateButtonStatesEcosystems(swiper);
    }

    handleSwiperSlideChangeSprints = (swiper) => {
        this.updateButtonStatesSprints(swiper);
    }

    handleSwiperSlideChangeNFT = (swiper) => {
        this.updateButtonStatesNFT(swiper);
    }

    handleInputChange = (event) => {
        this.setState({query: event.target.value});
    };
    render() {
        const {
            isPrevButtonDisabled,
            isNextButtonDisabled,
            isPrevButtonEcosystemsDisabled,
            isNextButtonEcosystemsDisabled,
            isPrevButtonDisabledSprints,
            isNextButtonDisabledSprints,
            isPrevButtonDisabledNFT,
            isNextButtonDisabledNFT,
            activeSlide,
        } = this.state;


    const slidesDataNewQuests = [
        {
            mainLink: questsPath,
            image: questCard1QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company1CardPic,
            companyName: 'Aave',
            chainLink: 'https://www.bnbchain.org',
            chainLogo: BNBChain,
        },
        {
            mainLink: 'https://qredo.com',
            image: questCard2QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company2CardPic,
            companyName: 'XSwap',
            chainLink: 'https://optimism.io',
            chainLogo: OPChain,
        },
        {
            mainLink: 'https://qredo.com',
            image: questCard3QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company3CardPic,
            companyName: 'Rubic',
            chainLink: 'https://zebrachain.org',
            chainLogo: ZebraChain,
        },
        {
            mainLink: 'https://qredo.com',
            image: questCard4QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company4CardPic,
            companyName: 'Celo',
            chainLink: 'https://qredo.com',
            chainLogo: QredoChain,
        },
        {
            mainLink: 'https://qredo.com',
            image: questCard5QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company5CardPic,
            companyName: 'Layer3',
            chainLink: 'https://avax.network',
            chainLogo: AvalancheChain,
        },
        {
            mainLink: 'https://qredo.com',
            image: questCard6QuestPic,
            title: 'Stablecoin Yields on Optimism',
            tasks: '7 tasks',
            exp: '500 exp',
            companyLink: 'https://optimism.io',
            companyLogo: company6CardPic,
            companyName: 'Across',
            chainLink: 'https://scroll.io',
            chainLogo: ScroolChain,
        },
        //Add new clides
    ];

    const slidesNewQuests = slidesDataNewQuests.map((slidesNewQuests, index) => (
        <SwiperSlide key={index}>
            <div className="quests-card-quests">
                <Link to={`${questsPath}/${slidesNewQuests.id}`} rel="noopener noreferrer">
                    <img src={slidesNewQuests.image} alt={`Slide ${index} Image`}
                        className='quests-card-quests-main-pic'/>
                    <div className="quests-card-quests-text">
                        <p>{slidesNewQuests.title}</p>
                    </div>
                    <div className="quests-card-quests-points-tasks">
                        <div className="quests-card-quests-points-tasks-inner">
                            <div className="quests-card-quests-tasks">
                                <p>{slidesNewQuests.tasks}</p>
                            </div>
                            <div className="quests-card-quests-points">
                                <p>{slidesNewQuests.exp}</p>
                            </div>
                        </div>
                    </div>
                    <div className='quests-card-quests-img-info'>
                        <a href={slidesNewQuests.companyLink} rel="noopener noreferrer">
                            <div className='quests-card-quests-img-info-company'>
                                <img src={slidesNewQuests.companyLogo} alt={`${slidesNewQuests.companyName} Logo`}/>
                                <p>{slidesNewQuests.companyName}</p>
                            </div>
                        </a>
                        <a href={slidesNewQuests.chainLink} rel="noopener noreferrer">
                            <div className='quests-card-quests-img-info-chain'>
                                <img src={slidesNewQuests.chainLogo} alt="Chain Logo Stuff_slide_card"/>
                            </div>
                        </a>
                    </div>
                </Link>
            </div>
        </SwiperSlide>
    ));

    const slidesDataEcosystems = [
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: BNBChain,
            chainName: 'BNB',
            countQuests: '52 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: ArbitrumChain,
            chainName: 'Arbitrum',
            countQuests: '20 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: AvalancheChain,
            chainName: 'Avax',
            countQuests: '34 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: OPChain,
            chainName: 'Optimism',
            countQuests: '5 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: Polygonchain,
            chainName: 'Polygon',
            countQuests: '26 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: QredoChain,
            chainName: 'Qredo',
            countQuests: '10 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: ScroolChain,
            chainName: 'Scroll',
            countQuests: '60 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: SolanaChain,
            chainName: 'Solana',
            countQuests: '78 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: VillagerChain,
            chainName: 'Villager',
            countQuests: '29 quests',
        },
        {
            chainLink: 'https://www.bnbchain.org',
            chainLogo: ZebraChain,
            chainName: 'Zebra',
            countQuests: '6 quests',
        },
    ];

    const slideDataWelcomeBanner = [
        {
            imageSrc: questCard2QuestPic,
            altText: "Image 1",
            title: "XRP Ledger Universe - Earn Exclusive NFTs & Rewards - Phase 1",
            companyName: "XRP Ledger",
            companyLogo: company1CardPic,
            link: "https://qredo.com"
        },
        {
            imageSrc: questCard2QuestPic,
            altText: "Image 2",
            title: "Ethereum Quest - Unlock Unique Tokens and Rewards",
            companyName: "Ethereum",
            companyLogo: company2CardPic,
            link: "https://ethereum.org"
        },
        {
            imageSrc: questCard2QuestPic,
            altText: "Image 3",
            title: "Polkadot Journey - Earn Staking Rewards",
            companyName: "Polkadot",
            companyLogo: company3CardPic,
            link: "https://polkadot.network"
        },
        {
            imageSrc: questCard2QuestPic,
            altText: "Image 3",
            title: "Polkadot Journey - Earn Staking Rewards",
            companyName: "Polkadot",
            companyLogo: company3CardPic,
            link: "https://polkadot.network"
        },
        {
            imageSrc: questCard2QuestPic,
            altText: "Image 3",
            title: "Polkadot Journey - Earn Staking Rewards",
            companyName: "Polkadot",
            companyLogo: company3CardPic,
            link: "https://polkadot.network"
        },
        {
            imageSrc: questCard2QuestPic,
            altText: "Image 3",
            title: "Polkadot Journey - Earn Staking Rewards",
            companyName: "Polkadot",
            companyLogo: company3CardPic,
            link: "https://polkadot.network"
        },
        
    ];


    const slides_ecosystems = slidesDataEcosystems.map((slidesDataEcosystems, index) => (
        <SwiperSlide key={index}>
            <div className="quests-card-quests-ecosystems">
                <a href={slidesDataEcosystems.chainLink} rel="noopener noreferrer">
                    <img className="image-ecosystems" src={slidesDataEcosystems.chainLogo} alt="BNB Chain"/>
                    <p className='quests-card-quests-ecosystems-name-chain'>{slidesDataEcosystems.chainName}</p>
                    <p className='quests-card-quests-ecosystems-count-quests'>{slidesDataEcosystems.countQuests}</p>
                </a>
            </div>
        </SwiperSlide>
    ));

    const slides_welcome_banner = slideDataWelcomeBanner.map((slideDataWelcomeBanner, index) => (
        <SwiperSlide key={index}>
            <a href={slideDataWelcomeBanner.link} rel="noopener noreferrer" target="_blank" className='slide'>
                <div className='slide-text'>
                    <div className='quests-pic-name-company'>
                        <img src={slideDataWelcomeBanner.companyLogo} alt='pic-project'/>
                        <p>{slideDataWelcomeBanner.companyName}</p>
                    </div>
                    <p className='quests-slide-text-name-quest'>{slideDataWelcomeBanner.title}</p>
                </div>
                <div className='slide-img'>
                    <img src={slideDataWelcomeBanner.imageSrc} alt={slideDataWelcomeBanner.altText}/>
                </div>
            </a>
        </SwiperSlide>
    ));

    return (
        <div className='quests-content'>
            <div className="content-section-text-welcome-banner">
                <p>Featured</p>
            </div>
            <div className='welcome-banner-slider'>
                <div className='slide-indicators'>
                        {slideDataWelcomeBanner.map((_, index) => (
                            <div 
                                key={index} 
                                className={`indicator ${this.state.activeSlide === index ? 'active' : ''}`} 
                                onClick={() => this.handleIndicatorClick(index)}
                                >
                            </div>
                        ))}
                </div>
                <div className='welcome-banner-slider-swiper'>
                    <Swiper
                        ref={this.swiperRefWelcome}
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        centeredSlides={false}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: true,
                        }}
                        loop={true}
                        grabCursor={true}
                        onSlideChange={(swiper) => this.setState({ activeSlide: swiper.realIndex })}
                        className='mySwiper'
                    >
                        {slides_welcome_banner}
                    </Swiper>
                </div>
            </div>
            <div className="content-section-text">
                <div className='content-section-text-last-month'>
                    <p>Last month recents</p>
                    <Link to={`${questsPath}/${slidesNewQuests.id}`} rel="noopener noreferrer" className='content-section-text-showall'>
                        <p>Show all</p>
                    </Link>
                </div>
            </div>
            <div className='content-section-slider-new'>
                <div className={`custom-button-prev ${isPrevButtonDisabled ? 'disabled' : ''}`}
                    onClick={this.handlePrev}>
                    <img src={arrow} alt="Back"/>
                </div>
                <div className="swiper-container">
                    <Swiper
                        ref={this.swiperRef}
                        slidesPerView={1}
                        spaceBetween={0}
                        breakpoints={{
                            1700: {
                                slidesPerView: 3,
                                spaceBetween: 45,
                            },
                            1400: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                            }
                        }}
                        onSlideChange={this.handleSwiperSlideChange}
                    >
                        {slidesNewQuests}
                    </Swiper>
                </div>
                <div
                    className={`custom-button-next ${isNextButtonDisabled ? 'disabled' : ''}`}
                    onClick={this.handleNext}
                >
                    <img src={arrow} alt="Next"/>
                </div>
            </div>
            <div className="content-section-text-ecosystems">
                <p>Ecosystems</p>
            </div>
            <div className='content-section-slider-ecosystems'>
                <div
                    className={`custom-button-prev-ecosystems ${isPrevButtonEcosystemsDisabled ? 'disabled' : ''}`}
                    onClick={this.handlePrevEcosystems}
                >
                    <img src={arrow} alt="Back"/>
                </div>
                <div className="swiper-container-ecosystems">
                    <Swiper
                        ref={this.swiperRefEcosystems}
                        spaceBetween={15}
                        slidesPerView={2}
                        breakpoints={{
                            1700: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                            1400: {
                                slidesPerView: 5,
                                spaceBetween: 15,
                            },
                            1200: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 5,
                            }
                        }}
                        onSlideChange={this.handleSwiperSlideChangeEcosystems}
                    >
                        {slides_ecosystems}
                    </Swiper>
                </div>
                <div
                    className={`custom-button-next-ecosystems ${isNextButtonEcosystemsDisabled ? 'disabled' : ''}`}
                    onClick={this.handleNextEcosystems}
                >
                    <img src={arrow} alt="Next"/>
                </div>
            </div>
            <div className="content-section-text-another">
                <div className='content-section-text-last-month'>
                    <p>Sprints</p>
                    <Link to={`${questsPath}/${slidesNewQuests.id}`} rel="noopener noreferrer" className='content-section-text-showall'>
                        <p>Show all</p>
                    </Link>
                </div>
            </div>
            <div className='content-section-slider-new'>
                <div className={`custom-button-prev ${isPrevButtonDisabledSprints ? 'disabled' : ''}`}
                    onClick={this.handlePrevSprints}>
                    <img src={arrow} alt="Back"/>
                </div>
                <div className="swiper-container">
                    <Swiper
                        ref={this.swiperRefSprints}
                        slidesPerView={1}
                        spaceBetween={0}
                        breakpoints={{
                            1700: {
                                slidesPerView: 3,
                                spaceBetween: 45,
                            },
                            1400: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                            }
                        }}
                        onSlideChange={this.handleSwiperSlideChangeSprints}
                    >
                        {slidesNewQuests}
                    </Swiper>
                </div>
                <div
                    className={`custom-button-next ${isNextButtonDisabledSprints ? 'disabled' : ''}`}
                    onClick={this.handleNextSprints}
                >
                    <img src={arrow} alt="Next"/>
                </div>
            </div>
            <div className="content-section-text-another">
                <div className='content-section-text-last-month'>
                    <p>NFT</p>
                    <Link to={`${questsPath}/${slidesNewQuests.id}`} rel="noopener noreferrer" className='content-section-text-showall'>
                        <p>Show all</p>
                    </Link>
                </div>
            </div>
            <div className='content-section-slider-new'>
                <div className={`custom-button-prev ${isPrevButtonDisabledNFT ? 'disabled' : ''}`}
                    onClick={this.handlePrevNFT}>
                    <img src={arrow} alt="Back"/>
                </div>
                <div className="swiper-container">
                    <Swiper
                        ref={this.swiperRefNFT}
                        slidesPerView={1}
                        spaceBetween={0}
                        breakpoints={{
                            1700: {
                                slidesPerView: 3,
                                spaceBetween: 45,
                            },
                            1400: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                            }
                        }}
                        onSlideChange={this.handleSwiperSlideChangeNFT}
                    >
                        {slidesNewQuests}
                    </Swiper>
                </div>
                <div
                    className={`custom-button-next ${isNextButtonDisabledNFT ? 'disabled' : ''}`}
                    onClick={this.handleNextNFT}
                >
                    <img src={arrow} alt="Next"/>
                </div>
            </div>
            {/* <div className="show-all-quests-button-content">
                <Link to={`${cryptoPath}`} rel="noopener noreferrer"
                        className="showAllQuestsButtonContent"
                        onClick={this.handleShowAllQuestsClick}
                    >
                        Show All Quests
                </Link>
            </div> */}
        </div>
    );
    };
}

export default RenderContent;