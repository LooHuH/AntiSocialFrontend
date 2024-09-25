import {Link, useLocation, useParams} from "react-router-dom";
import {
    page404Path, cryptoPath, questsPath, blogPath, profilePath,
    questsParams
} from "../../../index.jsx";
import userAPI from "../../../global/scripts/user-api.js";
import {TelegramSvg, XSvg, DiscordSvg, MailSvg, SupportSvg, UserSvg} from "./assets/images/svg/svg_items.jsx";

import "./css/footer.css";


const Footer = () => {
    const location = useLocation().pathname;
    const params = useParams();
    const links_blacklist = [
        {
            path: page404Path,
            params: undefined
        },
        {
            path: questsPath,
            params: params[questsParams]
        },
        {
            path: profilePath,
            params: undefined
        }
    ];

    for (const item of links_blacklist) {
        const link = {
            path: item.path,
            params: (item.params === undefined ? '' : (`/${params.questId}`))
        };
        if (location.includes(link.path + link.params)) {
            return null;
        }
    }

    return (
        <div className='footer-container'>
            <div className='footer-content'>
                <div className={'footer-left'}>
                    <div className={'footer-text'}>
                        <div className={'footer-description'}>
                            <span>ANTI-SOCIAL</span> is a platform for enthusiasts of hacking culture and technology.
                            Join our community, participate in exciting quests, and use our bridges and swaps for
                            managing crypto assets.
                            Engage in quests from our partners and earn rewards along the way!
                        </div>
                        <div className={'footer-disclaimer-header'}>
                            DISCLAIMER
                        </div>
                        <div className={'footer-disclaimer'}>
                            Nothing here is financial advice.
                        </div>
                    </div>
                </div>
                <div className={'footer-right'}>
                    <div className={'footer-links'}>
                        <div className={'footer-products-container'}>
                            <p>PRODUCTS</p>
                            <div className={'footer-products-links'}>
                                <Link to={cryptoPath} className={'footer-products-link-crypto'}>Crypto</Link>
                                <Link to={questsPath} className={"footer-products-link-quests"}>Quests</Link>
                                <Link to={blogPath} className={"footer-products-link-blog"}>Blog</Link>
                            </div>
                        </div>
                        <div className={'footer-social-container'}>
                            <p>FOLLOW US</p>
                            <div className={'footer-social-links'}>
                                <a href={'https://t.me/anti_social_community'} className={'footer-social-link-telegram'}>
                                    <TelegramSvg/>
                                    Telegram
                                </a>
                                <a href={'https://discord.gg/6FGf4vMdHy'} className={"footer-social-link-discord"}>
                                    <DiscordSvg/>
                                    Discord
                                </a>
                                <a href={'https://x.com/AntiSocial_cmty'} className={"footer-social-link-twitter"}>
                                    <XSvg/>
                                    Twitter
                                </a>
                            </div>

                        </div>
                        <div className={'footer-contact-container'}>
                            <p>CONTACT US</p>
                            <div className={'footer-contact-links'}>
                                <a href={'mailto:xetokky@gmail.com'} className={'footer-social-link-email'}>
                                    <MailSvg/>
                                    Email
                                </a>
                                <a href={'https://discord.gg/WCnEHUBu5P'} className={"footer-social-link-support"}>
                                    <SupportSvg/>
                                    Support
                                </a>
                            </div>

                        </div>
                        <TodayUsers/>
                    </div>
                    <div className={'footer-rights'}>©2024 AntiSocial. All rights reserved.</div>
                </div>
            </div>
        </div>
    );
}

const TodayUsers = () => {
    const {data: todayUsers, isLoading} = userAPI.users.getOnline();

    return (
        <div className={'footer-today-users-container'}>
            <p>DAILY ONLINE</p>
            <div className={'footer-social-links footer-user-link'}>
                <UserSvg/>
                <span className="today-users-text">{isLoading ? '?' : todayUsers['count']}</span>
            </div>
        </div>
    );
}

export default Footer;