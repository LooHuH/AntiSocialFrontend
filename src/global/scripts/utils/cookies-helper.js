import Cookies from "js-cookie";


class Cookie {
    constructor(name, expires = -1) {
        this.cookieName = name;
        this.expires = expires;
    }

    set(value) {
        Cookies.set(this.cookieName, value, {expires: this.expires});
    }

    get() {
        return Cookies.get(this.cookieName);
    }

    remove() {
        Cookies.remove(this.cookieName);
    }

    checkIsValid() {
        return !!this.get();
    }

    use(onValid, onExpired = () => {}) {
        return this.checkIsValid() ? onValid(this.get()) : onExpired();
    }

    async useAsync(onValid, onExpired = async () => {}) {
        return this.checkIsValid() ? await onValid(this.get()) : await onExpired()
    }
}

const cookies = {
    accessToken: new Cookie('access_token', 7),
};

export default cookies;