import {useState, useEffect} from "react";
import cookies from "./utils/cookies-helper.js";
import {localStorage} from "./utils/storage-helper.js";
import {timeLeftToMilliseconds} from "./utils/formatters.js";


class UserAPI {
    base_url = '...';

    nullResponse = {data: {}, error: false, isLoading: false};

    buildRequest = (args, params) => {
        let request = args.join('/');
        if (params && Object.keys(params).length > 0) {
            request += '?' + new URLSearchParams(params).toString();
        }
        const url = this.base_url + request;
        return [url, request];
    };

    generatedOptions = (method, acceptOption, token, body) => {
        const acceptOptions = {
            json: 'application/json',
            default: 'application/json',
        };
        const options = {
            method: method,
            headers: {
                Accept: acceptOptions[acceptOption],
            },
        };
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        if (body && Object.keys(body).length > 0) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        return options;
    };

    fetchRaw = async ({
        method,
        args,
        params = {},
        acceptOption = 'json',
        token = null,
        body = {},
    }) => {
        const [url, request] = this.buildRequest(args, params);
        const options = this.generatedOptions(method, acceptOption, token, body)
        const response = await fetch(url, options)
            .then(res => {
                if (acceptOption === 'json') {
                    return res.json();
                }
            });
        return {
            request: request,
            response: response
        };
    };

    fetchWithLocalStorageAsync = async ({
        method,
        args,
        params = {},
        acceptOption = 'json',
        token = null,
        body = {},
        validTime = {minutes: 1}
    }) => {
        return await this.fetchRaw({
            method: method,
            args: args,
            params: params,
            acceptOption: acceptOption,
            token: token,
            body: body,
        })
            .then(({request, response}) => {
                localStorage.setItem(request, response, {expires: validTime});
                return {
                    request: request,
                    response: response
                };
            });
    }

    fetchWithLocalStorage = ({
        method,
        args,
        params = {},
        acceptOption = 'json',
        token = null,
        body = {},
        validTime = {minutes: 1}
    }) => {
        const [response, setResponse] = useState({});
        const [error, setError] = useState(false);
        const [responseIsLoading, setResponseIsLoading] = useState(true);

        const check = () => {
            setResponseIsLoading(true);
            localStorage.checkAllItems();
            const [, request] = this.buildRequest(args, params);
            if (localStorage.checkItemIsValid(request)) {
                setResponse(localStorage.getItem(request));
                setResponseIsLoading(false);
            } else {
                update();
            }
        };

        const update = () => {
            setResponseIsLoading(true);
            this.fetchRaw({
                method: method,
                args: args,
                params: params,
                acceptOption: acceptOption,
                token: token,
                body: body,
            })
                .then(({request, response}) => {
                    setResponse(response);
                    setResponseIsLoading(false);
                    localStorage.setItem(request, response, {expires: validTime});
                });
        };

        useEffect(() => check(), [])

        useEffect(() => {
            const interval = setInterval(update, timeLeftToMilliseconds(validTime));
            return () => clearInterval(interval);
        })

        return {
            data: response,
            error: error,
            isLoading: responseIsLoading
        }
    };

    users = {
        getOnline: () =>
            this.fetchWithLocalStorage({
                method: 'GET',
                args: ['users', 'get-online'],
                validTime: {seconds: 5}
            })
    };

    auth = {
        generateNonce: async (address) =>
            await this.fetchWithLocalStorageAsync({
                method: 'POST',
                args: ['auth', 'web3', 'generate-nonce'],
                params: {address: address},
                validTime: {minutes: 1}
            }),
        verifySignature: async (tempToken, signature, type) =>
            await this.fetchRaw({
                method: 'POST',
                args: ['auth', 'web3', 'verify-signature'],
                params: {type: type},
                body: {
                    temp_token: tempToken,
                    signature: signature
                }
            }),
        isValid: async () =>
            cookies.accessToken.useAsync(async token =>
                await this.fetchRaw({
                    method: 'GET',
                    args: ['auth', 'web3', 'is-valid'],
                    token: token
                })
            ),
        deactivateToken: async () =>
            cookies.accessToken.useAsync(async token =>
                await this.fetchRaw({
                    method: 'DELETE',
                    args: ['auth', 'web3', 'deactivate'],
                    acceptOption: '',
                    token: token
                })
            )
    };

    user = {
        updateTimeInSeconds: 30,
        get: () =>
            cookies.accessToken.use(token =>
                this.fetchWithLocalStorage({
                    method: 'GET',
                    args: ['user'],
                    token: token,
                    validTime: {seconds: this.user.updateTimeInSeconds}
                }),
                () => this.nullResponse
            ),
        patch: async (userData) =>
            cookies.accessToken.useAsync(async token =>
                await this.fetchRaw({
                    method: 'PATCH',
                    args: ['user'],
                    token: token,
                    body: userData
                })
            )
    };

    docs = {
        grab: async () =>
            cookies.accessToken.useAsync(async token =>
                await this.fetchRaw({
                    method: 'PATCH',
                    args: ['docs', 'grab'],
                    token: token
                })
            ),
        checkStatus: () =>
            cookies.accessToken.use(token =>
                this.fetchWithLocalStorage({
                    method: 'GET',
                    args: ['docs', 'check-status'],
                    token: token
                }),
                () => this.nullResponse
            )
    };

    quests = {
        get: (questId = null) =>
            this.fetchWithLocalStorage({
                method: 'GET',
                args: questId ? ['quests', questId] : ['quests']
            })
    };

    chains = {
        get: (chainId = null) =>
            this.fetchWithLocalStorage({
                method: 'GET',
                args: chainId ? ['chains', chainId] : ['chains']
            })
    };

    projects = {
        get: (projectId = null) =>
            this.fetchWithLocalStorage({
                method: 'GET',
                args: projectId ? ['projects', projectId] : ['projects']
            })
    };
}

let userAPI = new UserAPI();

export default userAPI;