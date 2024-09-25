import {Component} from "react";
import {Link} from "react-router-dom";
import SwiperCore from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import RenderContent from "./components/quests-content.jsx";
import {cryptoPath} from "../index.jsx";

import "../../node_modules/swiper/swiper-bundle.min.css";
import "../../node_modules/swiper/swiper.min.css";
import "./css/quests.css";
import "./css/quests-main-part-quests-cards.css";

//Services pics
import searchIcon from './assets/images/services-pics/search-icon.png';
import arrow from './assets/images/services-pics/arrow.png';
import inProgress from './assets/images/services-pics/in-progress.png';
import promoted from './assets/images/services-pics/promoted.png';
import trending from './assets/images/services-pics/trending.png';
import newq from './assets/images/services-pics/new.png';
import check from '../../src/global/assets/images/check.png';
import cross from '../../src/global/assets/images/cross.png';

//Chains pics
import BNBChain from './assets/images/chains-pics/bnb-chain.png';
import Polygonchain from './assets/images/chains-pics/polygon-chain.png';
import SolanaChain from './assets/images/chains-pics/solana-chain.png';
import OPChain from './assets/images/chains-pics/op-chain.png';
import ArbitrumChain from './assets/images/chains-pics/arbitrum-chain.png';
import ZebraChain from './assets/images/chains-pics/zebra-chain.png';
import AvalancheChain from './assets/images/chains-pics/avalanche-chain.png';
import VillagerChain from './assets/images/chains-pics/villager-chain.png';
import ScroolChain from './assets/images/chains-pics/scroll-chain.png';
import QredoChain from './assets/images/chains-pics/qredo-chain.png';
//Quests cards pics
import questCard1QuestPic from './assets/images/quests-cards-pics/quest-card-1-quest-pic.jpg'
import questCard2QuestPic from './assets/images/quests-cards-pics/quest-card-2-quest-pic.jpg'
import questCard3QuestPic from './assets/images/quests-cards-pics/quest-card-3-quest-pic.jpg'
import questCard4QuestPic from './assets/images/quests-cards-pics/quest-card-4-quest-pic.jpg'
import questCard5QuestPic from './assets/images/quests-cards-pics/quest-card-5-quest-pic.jpg'
import questCard6QuestPic from './assets/images/quests-cards-pics/quest-card-6-quest-pic.jpg'
//Company cards pics
import company1CardPic from './assets/images/company-pics/company-1-card-pic.png'
import company2CardPic from './assets/images/company-pics/company-2-card-pic.png'
import company3CardPic from './assets/images/company-pics/company-3-card-pic.png'
import company4CardPic from './assets/images/company-pics/company-4-card-pic.png'
import company5CardPic from './assets/images/company-pics/company-5-card-pic.png'
import company6CardPic from './assets/images/company-pics/company-6-card-pic.png'


SwiperCore.use([Navigation, Pagination]);

class Quests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            selectedStatus: null,
            selectedChains: [],
            selectedCommunities: [],
            showAllQuests: false
        };
        this.handleShowAllQuestsClick = this.handleShowAllQuestsClick.bind(this);
    }

    handleShowAllQuestsClick() {
        // При клике скрываем кнопку и отображаем все квесты
        this.setState({ showAllQuests: true });
    }

    handleInputChange = (event) => {
        this.setState({query: event.target.value});
    };

    handleSearch = () => {
        console.log('Search query:', this.state.query);
        // Логика обработки поиска
    };

    handleStatusClick = (status) => {
        const {selectedStatus} = this.state;
        if (selectedStatus === status) {
            // Если статус уже выбран, снять выбор
            this.setState({selectedStatus: null});
        } else {
            // Если статус не выбран, установить его как текущий
            this.setState({selectedStatus: status});
        }
    };

    handleChainClick = (chain) => {
        const {selectedChains} = this.state;
        if (selectedChains.includes(chain)) {
            // Если элемент уже выбран, удаляем его из массива
            this.setState({
                selectedChains: selectedChains.filter((selectedChain) => selectedChain !== chain),
            });
        } else {
            // Если элемент не выбран, добавляем его в массив
            this.setState({selectedChains: [...selectedChains, chain]});
        }
    };

    handleClearSelectedChains() {
        this.setState({ selectedChains: [] });
    }

    handleCommunitiesClick = (communities) => {
        const {selectedCommunities} = this.state;
        if (selectedCommunities.includes(communities)) {
            // Если элемент уже выбран, удаляем его из массива
            this.setState({
                selectedCommunities: selectedCommunities.filter((selectedCommunities) => selectedCommunities !== communities),
            });
        } else {
            // Если элемент не выбран, добавляем его в массив
            this.setState({selectedCommunities: [...selectedCommunities, communities]});
        }
    };

    handleClearSelectedCommunities() {
        this.setState({ selectedCommunities: [] });
    }

    renderSearchBar() {
        return (
            <div className="search-bar-area">
                <div className='search-bar'>
                    <div className='frame-search-bar'>
                        <img src={searchIcon} alt="Search Icon"/>
                    </div>
                    <input
                        type="text"
                        value={this.state.query}
                        onChange={this.handleInputChange}
                        placeholder="Search"
                    />
                </div>
            </div>
        );
    }


    renderSlide(imageSrc, altText, title, companyName, companyLogo, link) {
        return (
            <a href={link} rel="noopener noreferrer" target="_blank" className='slide'>
                <div className='slide-img'>
                    <img src={imageSrc} alt={altText}/>
                </div>
                <div className='quests-pic-name-company'>
                    <img src={companyLogo} alt='pic-project'/>
                    <p>{companyName}</p>
                </div>
                <p className='quests-slide-text-name-quest'>{title}</p>
            </a>
        );
    }


    renderSidebarFilters() {
        const {selectedStatus, selectedChains, selectedCommunities} = this.state;
        return (
            <div className="sidebarFilters">
                <div className="status">
                    <label>Status</label>
                    <div
                        className={`status-tile ${selectedStatus === 'recommended' ? 'selected' : ''}`}
                        onClick={() => this.handleStatusClick('recommended')}
                    >
                        <img src={inProgress} alt={'inProgress'}/>
                        <p>In Progress</p>
                    </div>
                    <div
                        className={`status-tile ${selectedStatus === 'inProgress' ? 'selected' : ''}`}
                        onClick={() => this.handleStatusClick('inProgress')}
                    >
                        <img src={promoted} alt={'promoted'}/>
                        <p>Promoted</p>
                    </div>
                    <div
                        className={`status-tile ${selectedStatus === 'new' ? 'selected' : ''}`}
                        onClick={() => this.handleStatusClick('new')}
                    >
                        <img src={newq} alt={'newq'}/>
                        <p>Trending</p>
                    </div>
                    <div
                        className={`status-tile ${selectedStatus === 'trending' ? 'selected' : ''}`}
                        onClick={() => this.handleStatusClick('trending')}
                    >
                        <img src={trending} alt={'trending'} style={{ width: '22px', height: '22px' }}/>
                        <p>Popular</p>
                    </div>
                </div>
                <div className="chain">
                    <label>
                        Chain {selectedChains.length > 0 && `[${selectedChains.length}]`}
                        {selectedChains.length > 0 && (
                            <img
                                className={`cross-icon small`}
                                src={cross}
                                alt={'cross'}
                                onClick={() => this.handleClearSelectedChains()}
                            />
                        )}
                    </label>
                    <div className="scroll-menu">
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleChainClick('bnbChain')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={BNBChain} alt={'BNBChain'}/>
                                <p>BNB Chain</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedChains.includes('bnbChain') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleChainClick('opMainnet')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={OPChain} alt={'OPChain'}/>
                                <p>OP Mainnet</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedChains.includes('opMainnet') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleChainClick('scroll')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={ScroolChain} alt={'ScroolChain'}/>
                                <p>Scroll</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedChains.includes('scroll') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleChainClick('arbitrum')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={ArbitrumChain} alt={'ArbitrumChain'}/>
                                <p>Arbitrum</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedChains.includes('arbitrum') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleChainClick('avax')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={AvalancheChain} alt={'AvalancheChain'}/>
                                <p>Avalanche</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedChains.includes('avax') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleChainClick('Polygon')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={Polygonchain} alt={'Polygonchain'}/>
                                <p>Polygon</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedChains.includes('Polygon') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleChainClick('Qredo')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={QredoChain} alt={'QredoChain'}/>
                                <p>Qredo</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedChains.includes('Qredo') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleChainClick('Solana')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={SolanaChain} alt={'SolanaChain'}/>
                                <p>Solana</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedChains.includes('Solana') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleChainClick('Villager')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={VillagerChain} alt={'VillagerChain'}/>
                                <p>Villager</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedChains.includes('Villager') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleChainClick('Zebra')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={ZebraChain} alt={'ZebraChain'}/>
                                <p>Zebra</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedChains.includes('Zebra') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chain">
                    <label>
                        Communities {selectedCommunities.length > 0 && `[${selectedCommunities.length}]`}
                        {selectedCommunities.length > 0 && (
                            <img
                                className={`cross-icon small`}
                                src={cross}
                                alt={'cross'}
                                onClick={() => this.handleClearSelectedCommunities()}
                            />
                        )}
                    </label>
                    <div className="scroll-menu">
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleCommunitiesClick('bnbChain')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={BNBChain} alt={'BNBChain'}/>
                                <p>BNB Chain</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedCommunities.includes('bnbChain') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleCommunitiesClick('opMainnet')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={OPChain} alt={'OPChain'}/>
                                <p>OP Mainnet</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedCommunities.includes('opMainnet') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleCommunitiesClick('scroll')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={ScroolChain} alt={'ScroolChain'}/>
                                <p>Scroll</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedCommunities.includes('scroll') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleCommunitiesClick('arbitrum')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={ArbitrumChain} alt={'ArbitrumChain'}/>
                                <p>Arbitrum</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedCommunities.includes('arbitrum') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleCommunitiesClick('avax')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={AvalancheChain} alt={'AvalancheChain'}/>
                                <p>Avalanche</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedCommunities.includes('avax') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleCommunitiesClick('Polygon')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={Polygonchain} alt={'Polygonchain'}/>
                                <p>Polygon</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedCommunities.includes('Polygon') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleCommunitiesClick('Qredo')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={QredoChain} alt={'QredoChain'}/>
                                <p>Qredo</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedCommunities.includes('Qredo') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleCommunitiesClick('Solana')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={SolanaChain} alt={'SolanaChain'}/>
                                <p>Solana</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedCommunities.includes('Solana') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleCommunitiesClick('Villager')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={VillagerChain} alt={'VillagerChain'}/>
                                <p>Villager</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedCommunities.includes('Villager') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                        <div
                            className={`chain-tile`}
                            onClick={() => this.handleCommunitiesClick('Zebra')}
                        >
                            <div className="chain-tile-chainname">
                                <img src={ZebraChain} alt={'ZebraChain'}/>
                                <p>Zebra</p>
                            </div>
                            <div className="chain-tile-select">
                                {selectedCommunities.includes('Zebra') && (
                                    <img src={check} alt={'check'}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderShowAllQuestsButton() {
        if (!this.state.showAllQuests) {
            return (
                <Link to={cryptoPath} rel="noopener noreferrer"
                    className="showAllQuestsButton"
                    onClick={this.handleShowAllQuestsClick}
                >
                    Show All Quests
                </Link>
            );
        }
        return null;
    }

    render() {
        return (
            <div className='quests-page'>
                {/* {this.renderWelcomeBanner()} */}
                <div className="main-part-of-quest-page">
                    <RenderContent />
                    <div className='quest-filter-container'>
                        {this.renderSearchBar()}
                        {this.renderSidebarFilters()}
                        {this.renderShowAllQuestsButton()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Quests;
