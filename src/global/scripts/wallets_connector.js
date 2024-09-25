import Web3 from "web3";
import {jwtDecode} from "jwt-decode";
import userAPI from "./user-api.js";

const walletInstalled = (wallet) => {
    switch (wallet) {
        case ('metamask'): {
            return window.ethereum && window.ethereum.isMetaMask;
        }
        case ('rabby'): {
            return window.rabby;
        }
        case ('phantom'): {
            return window.solana && window.solana.isPhantom;
        }
        case ('backpack'): {
            return window.backpack;
        }
        default: {
            return true;
        }
    }
}

const okxReplaces = (wallet) => {
    return (
        window.okxwallet
        && (window.okxwallet.isOkxWallet || window.okxwallet.isOKExWallet)
        && (wallet === 'metamask' || wallet === 'phantom')
    );
}

const connectWallet = async (wallet, connectType, onWalletConnect) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const web3 = new Web3(window.ethereum);

    try {
        let accounts = null;
        let response = null;
        switch (wallet) {
            case ('metamask'): {
                await window.ethereum.request({method: 'eth_requestAccounts'});
                accounts = await web3.eth.getAccounts();
                break;
            }
            case ('rabby'): {
                await window.rabby.request({method: 'eth_requestAccounts'});
                accounts = await web3.eth.getAccounts();
                break;
            }
            case ('phantom'): {
                response = await window.solana.connect();
                break;
            }
            case ('backpack'): {
                response = await window.backpack.connect();
                break;
            }
        }
        await delay(500);

        let account = null;
        if (accounts) {
            account = accounts[0];
        } else if (response) {
            account = response.publicKey.toString();
        }

        if (!account) {
            console.error(`Не удалось получить ${wallet} аккаунт.`);
        }

        const {response: tempTokenJson} = await userAPI.auth.generateNonce(account);
        const tempToken = tempTokenJson['temp_token'];
        const message = jwtDecode(tempToken)['nonce']
        let encodedMessage = null;
        switch (wallet) {
            case ('metamask'):
            case ('rabby'): {
                encodedMessage = web3.utils.asciiToHex(message);
                break;
            }
            case ('phantom'):
            case ('backpack'): {
                encodedMessage = new TextEncoder().encode(message);
                break;
            }
        }

        let signature = null;
        let solanaSignature = null;
        switch (wallet) {
            case ('metamask'): {
                signature = await window.ethereum.request({
                    method: 'personal_sign',
                    params: [encodedMessage, account],
                });
                break;
            }
            case ('rabby'): {
                signature = await window.rabby.request({
                    method: 'personal_sign',
                    params: [encodedMessage, account],
                });
                break;
            }
            case ('phantom'): {
                solanaSignature = await window.solana.signMessage(encodedMessage);
                break;
            }
            case ('backpack'): {
                solanaSignature = await window.backpack.signMessage(encodedMessage);
                break;
            }
        }

        let outputSignature = null;
        if (signature) {
            outputSignature = signature;
        } else if (solanaSignature) {
            outputSignature = btoa(String.fromCharCode(...solanaSignature.signature));
        }

        const {response: accessTokenJson} = await userAPI.auth.verifySignature(tempToken, outputSignature, connectType);
        const accessToken = accessTokenJson['access_token'];

        onWalletConnect(accessToken);
    } catch (error) {
        console.error(`Ошибка подключения кошелька ${wallet}:`, error);
    }
};

export {walletInstalled, okxReplaces, connectWallet};