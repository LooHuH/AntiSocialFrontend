import {useState} from "react";
import PopupMenu from "../popup-menu/component.jsx";
import {connectWallet, okxReplaces, walletInstalled} from "../../scripts/wallets_connector.js";

import "./css/connect-wallet-popup-button.css";

import metamask_icon from "../../assets/images/metamask-logo.png";
import rabby_icon from "../../assets/images/rabby-logo.png";
import phantom_icon from "../../assets/images/phantom-logo.png";
import backpack_icon from "../../assets/images/backpack-logo.png";
import okx_icon from "../../assets/images/okx-logo.png";
import CategoryViewer from "../category-viewer/component.jsx";


const ConnectWalletPopupButton = ({onWalletConnect}) => {
    const [walletsPopupVisible, setWalletsPopupVisible] = useState(false);

    return (
        <>
            <ConnectWalletPopup
                visible={walletsPopupVisible}
                onClose={() => setWalletsPopupVisible(false)}
                onWalletConnect={onWalletConnect}
            />
            <button
                className={`white-button connect-wallet-popup-button`}
                onClick={() => setWalletsPopupVisible(true)}
            >
                Connect Wallet
            </button>
        </>
    );
};

const ConnectWalletPopup = ({visible, onClose, onWalletConnect}) => {
    const categories = [
        {
            'name': 'Ethereum',
            content: ethCategory(onWalletConnect),
        },
        {
            'name': 'Solana',
            content: solanaCategory(onWalletConnect),
        }
    ];
    return (
        <PopupMenu
            title={`CONNECT_WALLET.exe`}
            visible={visible}
            onClose={onClose}
            contentClassName={`connect-wallet-popup-content`}
        >
            <CategoryViewer categories={categories}/>
        </PopupMenu>
    );
}

const ethCategory = (onWalletConnect) => {
    return ([
        <ConnectWalletButton
            wallet={`metamask`}
            connectType={'sign_in'}
            onWalletConnect={onWalletConnect}
        />,
        <ConnectWalletButton
            wallet={`rabby`}
            connectType={'sign_in'}
            onWalletConnect={onWalletConnect}
        />
    ]);
}

const solanaCategory = (onWalletConnect) => {
    return ([
        <ConnectWalletButton
            wallet={`phantom`}
            connectType={'sign_in'}
            onWalletConnect={onWalletConnect}
        />,
        <ConnectWalletButton
            wallet={`backpack`}
            connectType={'sign_in'}
            onWalletConnect={onWalletConnect}
        />
    ]);
}

const ConnectWalletButton = ({wallet, connectType, onWalletConnect}) => {
    const walletNames = {
        metamask: 'Metamask',
        rabby: 'Rabby',
        phantom: 'Phantom',
        backpack: 'Backpack',
    };

    const walletIcons = {
        metamask: metamask_icon,
        rabby: rabby_icon,
        phantom: phantom_icon,
        backpack: backpack_icon,
        default: ''
    };

    let mode = 'disabled',
        onButtonClick = null,
        walletStatus = 'Not installed',
        walletStatusColor = 'red';
    if (walletInstalled(wallet)) {
        mode = '';
        onButtonClick = () => connectWallet(wallet, connectType, onWalletConnect);
        walletStatus = 'Installed';
        walletStatusColor = 'green';
    }

    return (
        <button
            className={`black-button ${mode} connect-wallet-popup-wallet-button`}
            onClick={onButtonClick}
        >
            <div className={`connect-wallet-popup-wallet-button-icon-container`}>
                {okxReplaces(wallet) ? (
                    <img
                        className={`connect-wallet-popup-wallet-button-icon right`}
                        src={okx_icon}
                        alt={`header-profile-wallet-popup-button-icon`}
                    />
                ) : null}
                <img
                    className={`connect-wallet-popup-wallet-button-icon ${okxReplaces(wallet) ? 'left' : ''}`}
                    src={walletIcons[wallet]}
                    alt={`header-profile-wallet-popup-button-icon`}
                />
            </div>
            <div className={`connect-wallet-popup-wallet-button-text ${walletStatusColor}`}>
                <h1>{walletNames[wallet] || wallet} {okxReplaces(wallet) ? '/ OKX Wallet' : ''}</h1>
                <h2>{walletStatus}</h2>
            </div>
        </button>
    );
};

export default ConnectWalletPopupButton;