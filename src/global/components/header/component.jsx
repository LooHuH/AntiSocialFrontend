import {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {
    blogPath, cryptoPath, homePath, profilePath, questsPath,
    getCursorPosition
} from "../../../index.jsx";
import ConnectWalletPopupButton from "../connect-wallet-popup-button/component.jsx";
import userAPI from "../../scripts/user-api.js";
import cookies from "../../scripts/utils/cookies-helper.js";
import {formatUsername, formatWalletAddress} from "../../scripts/utils/formatters.js";

import "./css/header.css";

import pixel_mask from "./assets/images/pixel-mask.png";

import header_logo_back from "./assets/images/header-logo-icons/header-logo-back.png";
import header_logo_middle from "./assets/images/header-logo-icons/header-logo-middle.png";
import header_logo_front from "./assets/images/header-logo-icons/header-logo-front.png";
import header_logo_hover from "./assets/images/header-logo-icons/header-logo-hover.png";

import docs_icon from "../../assets/images/docs-icon.png";

import network_icon_1 from "./assets/images/network-icons/network-icon-1.png";
import network_icon_2 from "./assets/images/network-icons/network-icon-2.png";
import network_icon_3 from "./assets/images/network-icons/network-icon-3.png";

import profile_icon from "./assets/images/profile-menu-icons/profile.png";
import logout_icon from "./assets/images/profile-menu-icons/logout.png";


const Header = () => {
    return (
        <div>
            <div className={`ticker-header-behind-container`}/>
            <Ticker/>
            <div className={`header`}>
                <PixelMask/>
                <Logo/>
                <LinkItem
                    title={`HOME`}
                    url={homePath}
                />
                <LinkItem
                    title={`CRYPTO`}
                    url={cryptoPath}
                />
                <LinkItem
                    title={`QUESTS`}
                    url={questsPath}
                />
                <LinkItem
                    title={`BLOG`}
                    url={blogPath}
                />
                <ProfileData/>
            </div>
        </div>
    );
};

const Ticker = ({test = true}) => {
    let text;
    if (!test) {
        text = '* tru3 hack3rs h3r3 * d3finit3ly n0t scam * l3av3 all y0ur data f0r us <3 * big br0th3r watch1ng * th3 cyb3r c0nflict 1s 3t3rnal * l3ave all y0ur m0n3y h3r3 * thi5 is th3 w0rk 0f art * w3 ar3 4lway5 a5king f0r pa55w0rds * sh4d0ws alway5 w4tching * bitc0in will fall s0m3day * wh3r3 th3 s3cur1ty g0e5, w3 f0ll0w * g0v3rnm3nt n3v3r sl33ps '
    } else {
        text = '* This site is still IN DEVELOPMENT!!! This means that any part of it may change at any time, your progress doesn\'t affect on any existing data or wallet. You can just watch it grow and developing. GL! '
    }
    const speed = 400;
    const [displayedText, setDisplayedText] = useState(text.repeat(3));

    useEffect(() => {
        const tick = () => {
            setDisplayedText(prev => prev.slice(1) + prev[0]);
        };
        const interval = setInterval(tick, speed);
        return () => clearInterval(interval);
    }, [displayedText, speed]);

    return (
        <div className={`ticker-container`}>
            <pre>{displayedText}</pre>
        </div>
    );
};

const PixelMask = () => {
    const pixelMaskRef = useRef(null);

    useEffect(() => {
        const tick = () => {
            const {x, y} = getCursorPosition();
            if (pixelMaskRef.current) {
                pixelMaskRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 0%, rgba(0, 0, 0, 1) 150px)`
            }
        }

        const interval = setInterval(tick, 0);
        return () => clearInterval(interval);
    });

    return (
        <div className={`header-pixel-mask-container`}>
            <img
                src={pixel_mask}
                alt={`pixel mask`}
            />
            <div
                className={`header-pixel-mask`}
                ref={pixelMaskRef}
            />
        </div>
    );

};

const Logo = () => {
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    return (
        <Link
            className="header-logo-container"
            to={homePath}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isHovered ? (
                <img
                    className="header-logo"
                    src={header_logo_hover}
                    alt="logo"
                />
            ) : (
                <div>
                    <div className="header-logo back">
                        <img
                            src={header_logo_back}
                            alt="logo"
                        />
                    </div>
                    <div className="header-logo middle">
                        <img
                            src={header_logo_middle}
                            alt="logo"
                        />
                    </div>
                    <div className="header-logo front">
                        <img
                            src={header_logo_front}
                            alt="logo"
                        />
                    </div>
                </div>
            )}
        </Link>
    );
};

const LinkItem = ({title, url}) => {
    const isActive = useLocation().pathname === url;

    return (
        <Link
            className={`header-menu-item ${isActive ? 'active' : ''}`}
            to={url}
        >
            {title}
        </Link>
    );
};

const ProfileData = () => {
    const containerRef = useRef(null);
    const [profileExpanded, setProfileExpanded] = useState(false);
    const {data: userAccount, isLoading: userIsLoading} = userAPI.user.get();

    const handleWalletConnect = async (accessToken) => {
        if (accessToken) {
            cookies.accessToken.set(accessToken);
            window.location.reload();
        }
    };

    const accountLoaded = (userAccount) => !!userAccount?.id;

    const preventEvents = (event) => {
        event.preventDefault();
    };

    const handlePointerEnter = () => {
        if (containerRef.current) {
            containerRef.current.addEventListener('wheel', preventEvents, {passive: false});
            containerRef.current.addEventListener('mousedown', preventEvents, {passive: false});
        }
    };

    const handlePointerLeave = () => {
        if (containerRef.current) {
            containerRef.current.removeEventListener('wheel', preventEvents);
            containerRef.current.removeEventListener('mousedown', preventEvents);
        }
        setProfileExpanded(false);
    };

    const handleLogoutButton = () => {
        userAPI.auth.deactivateToken()
            .then(() => {
                cookies.accessToken.remove();
                window.location.reload();
            });
    };

    useEffect(() => {
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('wheel', preventEvents);
                containerRef.current.removeEventListener('mousedown', preventEvents);
            }
        };
    });

    if (!userIsLoading) {
        let userAvatar = null;
        let userAddress = null;
        let username = null;
        if (accountLoaded(userAccount)) {
            userAvatar = userAccount['avatar'];
            userAddress = userAccount['wallets'][0]['web3_address'];
            username = userAccount['username'];
        }

        return (
            <div className={`header-data-container`}>
                <PingWidget/>
                {!accountLoaded(userAccount) ? (
                    <ConnectWalletPopupButton onWalletConnect={handleWalletConnect}/>
                ) : (
                    <>
                        <DocsCounter userAccount={userAccount}/>
                        <div
                            className={`header-data-profile-info-container ${profileExpanded ? 'expanded' : ''}`}
                            onPointerEnter={handlePointerEnter}
                            onPointerLeave={handlePointerLeave}
                            ref={containerRef}
                        >
                            <div className={`header-data-profile-info`}>
                                {profileExpanded ? (
                                    <div className={`header-data-profile-info-text-container`}>
                                        <h1>{formatUsername(username)}</h1>
                                        <h2>{formatWalletAddress(userAddress)}</h2>
                                    </div>
                                ) : null}
                                <Link
                                    className={`header-data-profile-info-button`}
                                    to={profilePath}
                                    onPointerEnter={() => setProfileExpanded(true)}
                                >
                                    <div className={`header-data-profile-info-picture-bg`}>
                                        <img
                                            className={`header-data-profile-info-picture`}
                                            src={userAvatar}
                                            alt={`profile-picture`}
                                        />
                                    </div>
                                </Link>
                            </div>
                            {profileExpanded ? (
                                <div className={`header-data-profile-info-menu-buttons-container`}>
                                    <ProfileButton
                                        title={`My profile`}
                                        img_src={profile_icon}
                                        onClick={profilePath}
                                    />
                                    {/* TODO VVV uncomment if needed VVV */}
                                    {/*<ProfileButton*/}
                                    {/*    title={`Achievements`}*/}
                                    {/*    img_src={achievement_icon}*/}
                                    {/*/>*/}
                                    <div className={`header-data-profile-info-menu-separator`}/>
                                    <ProfileButton
                                        title={`Logout`}
                                        img_src={logout_icon}
                                        onClick={handleLogoutButton}
                                        alt={true}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </>
                )}
            </div>
        );
    }
};

const PingWidget = () => {
    const updatePing = () => {
        const startTime = performance.now();
        fetch(window.location.origin, {method: 'HEAD', mode: 'no-cors'})
            .then(() => {
                const ping = (performance.now() - startTime).toFixed(0)
                setPing(ping);

                if (ping <= 1000) {
                    setPingIcon(network_icon_1);
                } else if (ping <= 1500) {
                    setPingIcon(network_icon_2);
                } else {
                    setPingIcon(network_icon_3);
                }

                setPingLoading(false);
            });
    }

    const [pingLoading, setPingLoading] = useState(true);
    const [ping, setPing] = useState(null);
    const [pingIcon, setPingIcon] = useState(null);

    useEffect(() => {
        updatePing();
    }, [])

    useEffect(() => {
        const interval = setInterval(updatePing, 5000);
        return () => clearInterval(interval);
    });

    if (!pingLoading) {
        return (
            <div className={`header-data-ping-widget`}>
                <img
                    src={pingIcon}
                    alt={`ping-icon`}
                />
                <h1>
                    {ping}<span>ms</span>
                </h1>
            </div>
        );
    }
};

const Timer = ({grabTime, onFinish = () => {}}) => {
    const {hours, minutes, seconds} = grabTime;
    const initialTime = useRef({hours, minutes, seconds});
    const [time, setTime] = useState(initialTime.current);

    useEffect(() => {
        let timer;
        if (time.hours > 0 || time.minutes > 0 || time.seconds > 0) {
            timer = setInterval(() => {
                decrementTime();
            }, 1000);
        } else {
            clearInterval(timer);
            if (onFinish) {
                onFinish();
            }
        }

        return () => clearInterval(timer);
    }, [time]);

    const decrementTime = () => {
        setTime((prevTime) => {
            const {hours, minutes, seconds} = prevTime;

            if (seconds > 0) {
                return {...prevTime, seconds: seconds - 1};
            } else if (minutes > 0) {
                return {hours, minutes: minutes - 1, seconds: 59};
            } else if (hours > 0) {
                return {hours: hours - 1, minutes: 59, seconds: 59};
            }

            return prevTime;
        });
    };

    return null;
};

const DocsCounter = ({userAccount}) => {
    const grabDocsButtonStates = {
        default: 'Grab docs',
        disabled: '...',
    };

    const [docsCounterHovered, setDocsCounterHovered] = useState(false);
    const [docsDropdownVisible, setDocsDropdownVisible] = useState(false);
    const [grabDocsButtonForceDisabled, setGrabDocsButtonForceDisabled] = useState(false);

    const [docsInfo, setDocsInfo] = useState(userAccount);
    let docsStatus = userAPI.docs.checkStatus();

    const handlePointerEnter = () => {
        setDocsCounterHovered(true);
        setDocsDropdownVisible(true);
    };

    const handlePointerLeave = () => {
        setDocsCounterHovered(false);
        setDocsDropdownVisible(false);
    };

    const handleGrabDocsButton = () => {
        setGrabDocsButtonForceDisabled(true);
        userAPI.docs.grab()
            .then(({response}) => {
                setDocsInfo(response);
                docsStatus = {
                    data: response,
                    isLoading: false,
                };
                setGrabDocsButtonForceDisabled(false);
            })
    };

    if (!!docsInfo && !docsStatus.isLoading) {
        const currDocsStreak = docsInfo['curr_docs_streak'];
        const maxDocsStreak = docsInfo['max_docs_streak'];

        const grabDocsButtonDisabled = docsStatus.isLoading;
        const grabDocsButtonHasTimer = !docsStatus?.data['can_grab'];

        const isGrabDocsButtonDisabled = () => grabDocsButtonDisabled || grabDocsButtonForceDisabled;

        return (
            <div
                className={`header-data-profile-docs-counter`}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            >
                <img
                    src={docs_icon}
                    alt={`docs icon`}
                />
                <h1>{currDocsStreak}</h1>

                {docsCounterHovered || docsDropdownVisible ? (
                    <div
                        className={`header-data-profile-docs-counter-dropdown`}
                        onPointerLeave={() => setDocsDropdownVisible(false)}
                    >
                        <p>Max docs grabbed:</p>
                        <div className={`header-data-profile-docs-counter-dropdown-max-docs`}>
                            <img
                                src={docs_icon}
                                alt={`docs icon`}
                            />
                            <h2>{maxDocsStreak}</h2>
                        </div>
                        <button
                            className={`white-button ${isGrabDocsButtonDisabled() || grabDocsButtonHasTimer ? 'disabled' : ''}`}
                            onClick={isGrabDocsButtonDisabled() || grabDocsButtonHasTimer ? null : handleGrabDocsButton}
                        >
                            {!isGrabDocsButtonDisabled() && grabDocsButtonHasTimer ? (
                                <Timer grabTime={docsStatus.data['time_left']}/>
                            ) : (
                                isGrabDocsButtonDisabled() ?
                                    (grabDocsButtonStates.disabled)
                                    :
                                    (grabDocsButtonStates.default)
                            )}
                        </button>
                    </div>
                ) : null}
            </div>
        );
    }
};

const ProfileButton = ({title, img_src, onClick, alt}) => {
    const link = useLocation().pathname;
    let linkTo;
    if (typeof onClick === 'string') {
        linkTo = onClick;
        onClick = () => {
        }
    } else {
        linkTo = link;
    }

    return (
        <Link
            className={`header-data-profile-info-menu-button ${alt ? 'alt' : ''}`}
            onClick={onClick}
            to={linkTo}
        >
            <img
                src={img_src}
                alt={`profile-menu-button`}
            />
            <h1>{title}</h1>
        </Link>
    );
};

export default Header;
