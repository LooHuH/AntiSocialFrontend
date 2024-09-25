import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {homePath} from "../index.jsx";
import LoadingScreen from "../global/components/loading-screen/component.jsx";
import SettingsPopup from "../global/components/settings-popup/component.jsx";
import QuestCard from "../global/components/quest-card/component.jsx";
import ProgressBar from "../global/components/progress-bar/component.jsx";
import Pentagon, {countPentagonWidth} from "../global/components/pentagon/component.jsx";
import userAPI from "../global/scripts/user-api.js";
import cookies from "../global/scripts/utils/cookies-helper.js";
import {formatUsername, formatWalletAddress, timeFromDatetime} from "../global/scripts/utils/formatters.js";
import {percentageToColor} from "../global/scripts/utils/color-helper.js";

import "./css/profile.css";

import docImage from "../global/assets/images/docs-icon.png";
import LastAchievementAvatar from "./assets/images/pixel-syringe.png";

import questCard1QuestPic from "../quests/assets/images/quests-cards-pics/quest-card-1-quest-pic.jpg";
import company1CardPic from "../quests/assets/images/company-pics/company-1-card-pic.png";
import chain1ChainPic from "../quests/assets/images/chains-pics/op-chain.png";


const Profile = () => {
    const {data: userAccount, isLoading: userAccountIsLoading} = userAPI.user.get();

    if (!cookies.accessToken.checkIsValid()) {
        return <Navigate to={homePath}/>;
    }

    if (userAccountIsLoading) {
        return <LoadingScreen/>;
    } else {
        return (
            <>
                <div className={`profile-side-container left`}>
                    <IDCard userAccount={userAccount}/>
                    <SeasonPass userAccount={userAccount}/>
                </div>
                <div className={`profile-center-container`}>
                    <Quests userAccount={userAccount}/>
                </div>
                <div className={`profile-side-container right`}>
                    <Achievements userAccount={userAccount}/>
                </div>
            </>
        );
    }
};

const ProfileSubtitle = ({className, type = 'big', align = 'center', children}) => {
    const defClassName = 'profile-subtitle-container';

    const titleTypes = {
        big: 'big',
        small: 'small',
        default: 'big',
    }

    return (
        <div
            className={className ? `${defClassName} ${className}` : defClassName}
        >
            <div
                className={`profile-subtitle ${titleTypes[type]}`}
                style={{justifyContent: align}}
            >
                <h1>{children}</h1>
            </div>
        </div>
    );
};

const IDCard = ({userAccount}) => {
    const [settingsPopupVisible, setSettingsPopupVisible] = useState(false);

    const userAvatar = userAccount['avatar'];
    const username = userAccount['username'];
    const userAddress = userAccount['wallets'][0]['web3_address'];
    const userMaxDocs = userAccount['max_docs_streak'];
    const totalUserXp = userAccount['xp'];
    const maxLevelXp = 5000;
    const userRegisteredAt = userAccount['registered_at'];

    const onEditButtonClick = () => {
        setSettingsPopupVisible(true);
    };

    const onSettingsPopupClose = () => {
        setSettingsPopupVisible(false);
    }

    return (
        <>
            <SettingsPopup
                visible={settingsPopupVisible}
                onClose={onSettingsPopupClose}
            />
            <div className={`profile-id-card-container`}>
                <ProfileSubtitle align={`left`}>
                    ID CARD
                </ProfileSubtitle>
                <div className={`profile-block`}>
                    <div className={`profile-id-card-user-info`}>
                        <img
                            className={`profile-id-card-user-avatar`}
                            src={userAvatar}
                            alt={`Avatar`}
                        />
                        <div className={`profile-id-card-user-texts-counters`}>
                            <div className={`profile-id-card-user-texts`}>
                                <h1>{formatUsername(username)}</h1>
                                <h2>{formatWalletAddress(userAddress)}</h2>
                            </div>
                            <div className={`profile-id-card-user-counters`}>
                                <div className={`profile-id-card-user-counter`}>
                                    <h1>Docs</h1>
                                    <div>
                                        <img
                                            src={docImage}
                                            alt={`Icon`}
                                        />
                                        <h2>{userMaxDocs}</h2>
                                    </div>
                                </div>
                                <div className={`profile-id-card-user-counter`}>
                                    <h1>Quests</h1>
                                    <div>
                                        <img
                                            src={docImage}
                                            alt={`Icon`}
                                        /> {/*TODO: заменить на картинку для квестов*/}
                                        <h2>0</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <UserLevel
                        totalUserXp={totalUserXp}
                        maxLevelXp={maxLevelXp}
                    />
                    <div className={`profile-id-card-user-joined-date`}>
                        <h1>Joined {timeFromDatetime(userRegisteredAt)}</h1>
                    </div>
                </div>
                <button
                    className={`white-button`}
                    onClick={onEditButtonClick}
                >
                    Edit Profile
                </button>
            </div>
        </>
    );
};

const UserLevel = ({totalUserXp, maxLevelXp}) => {
    const pentagonHeight = 50
    const pentagonWidth = countPentagonWidth(pentagonHeight)
    const currentUserXp = totalUserXp % maxLevelXp;
    const userLevel = 1 + Math.floor(totalUserXp / maxLevelXp);

    return (
        <div className={`profile-id-card-user-level`}>
            <ProgressBar
                className={`profile-id-card-user-level-progress-bar`}
                currentValue={currentUserXp}
                maxValue={maxLevelXp}
                style={{
                    width: `calc(100% - ${pentagonWidth / 2}px)`,
                    left: `${pentagonHeight / 2}px`
                }}
            />
            <Pentagon
                className={`profile-id-card-user-level-number`}
                text={userLevel}
                fontSize={22}
            />
            <h1 className={`profile-id-card-user-level-experience`}>
                {currentUserXp} / {maxLevelXp} xp
            </h1>
        </div>
    );
};

const SeasonPass = ({userAccount}) => {
    const [currentValue, setCurrentValue] = useState(0);
    const maxValue = 200;

    const tierNumberColor = percentageToColor(currentValue / maxValue);
    const {r, g, b} = tierNumberColor;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentValue(prev => {
                if (prev >= 200) {
                    return 0;
                }
                return prev + 1;
            });
        }, 0);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={`profile-season-pass-container`}>
            <ProfileSubtitle align={`left`}>
                ANTI PASS
            </ProfileSubtitle>
            <div className={`profile-block season-pass`}>
                <div className={`profile-season-pass-info`}>
                    <h1>Season 1</h1>
                    <div className={`profile-season-pass-time-left`}>
                        <img
                            src={docImage}
                            alt={'Time left icon'}
                        />
                        <h2>69 days</h2>
                    </div>
                </div>
                <div className={`profile-season-pass-progress`}>
                    <h1 className={`profile-season-pass-progress-text`}>
                        TIER<br/>
                        <span style={{color: `rgb(${r}, ${g}, ${b})`}}>
                            69
                        </span>
                    </h1>
                    <ProgressBar
                        className={`profile-season-pass-progress-bar`}
                        currentValue={currentValue}
                        maxValue={maxValue}
                        showValues={true}
                        mode={`rainbow`}
                    />
                </div>
                <button className={`white-button profile-season-pass-button`}>
                    More...
                </button>
            </div>
        </div>
    );
};

const Quests = ({userAccount}) => {
    return (
        <div className={`profile-completed-quests-container`}>
            <ProfileSubtitle>COMPLETED QUESTS</ProfileSubtitle>
            <div className={`profile-block quests`}>
                <Slides/>
            </div>
        </div>
    );
};

const Slides = () => {
    const questInfo = {
        id: 1,
        image: questCard1QuestPic,
        title: 'Quest title for tests here',
        tasks: 10,
        xp: 1000,
        project: {
            image: company1CardPic,
            name: 'Project D'
        },
        chain: {
            image: chain1ChainPic
        }
    };

    return (
        Array.from({length: 12})
            .map((_, index) => {
                return <QuestCard questInfo={questInfo} key={index}/>;
            })
    );
};

const Achievements = ({userAccount}) => {
    return (
        <div className={`profile-achievements-container`}>
            <ProfileSubtitle align={`right`}>
                ACHIEVEMENTS
            </ProfileSubtitle>
            <div className={`profile-block achievements`}>
                <div className={`profile-achievements-block-part`}>
                    <ProfileSubtitle
                        type={'small'}
                        align={`left`}
                    >
                        Last:
                    </ProfileSubtitle>
                    <Achievement/>
                </div>
                <div className={`profile-achievements-block-part`}>
                    <ProfileSubtitle
                        type={'small'}
                        align={`left`}
                    >
                        Unlocked:
                    </ProfileSubtitle>
                    <Achievement/>
                    <Achievement/>
                    <Achievement/>
                    <Achievement/>
                    <Achievement/>
                </div>
                <div className={`profile-achievements-block-part`}>
                    <ProfileSubtitle
                        type={'small'}
                        align={`left`}
                    >
                        Locked:
                    </ProfileSubtitle>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                </div>
            </div>
        </div>
    );
};

const Achievement = ({locked}) => {
    return (
        <div className={`profile-achievement-container ${locked ? 'locked' : ''}`}>
            <div className={`profile-achievement-info`}>
                <img
                    src={LastAchievementAvatar}
                    alt={`Icon`}
                />
                <div className={`profile-achievement-header-desc`}>
                    <h1>Injection</h1>
                    <h2>Complete the first quest.</h2>
                </div>
            </div>
            <h3>300 <br/> xp</h3>
        </div>
    );
};

export default Profile;