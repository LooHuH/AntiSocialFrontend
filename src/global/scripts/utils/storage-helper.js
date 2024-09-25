import {timeLeftToDate} from "./formatters.js";


class Storage {
    constructor(storage) {
        this.storage = storage;
        try {
            this.storage.setItem('test', 'test');
            this.storage.removeItem('test');
            this.storageExists = true;
            // this.storage.clear();
        } catch (error) {
            console.error(`Storage ${storage} doesn't exist`);
            this.storageExists = false;
        }
    }

    setItem(key, value, options = {}) {
        if (this.storageExists) {
            this.checkAllItems()
            if (options.hasOwnProperty('expires')) {
                switch (typeof options.expires) {
                    case (Date): {
                        break;
                    }
                    case ('object'): {
                        if (
                            options.expires.hasOwnProperty('days')
                            || options.expires.hasOwnProperty('hours')
                            || options.expires.hasOwnProperty('minutes')
                            || options.expires.hasOwnProperty('seconds')
                        ) {
                            options.expires = timeLeftToDate(options.expires);
                        }
                        break;
                    }
                    case ('boolean'):
                    case ('undefined'): {
                        options.expires = null;
                        break;
                    }
                    case ('number'): {
                        options.expires = new Date(options.expires);
                        break;
                    }
                }
            }
            try {
                this.storage.setItem(key, JSON.stringify({value, options}));
            } catch (error) {
                console.error(`Error setting item ${key} in storage`, error);
            }
        }
    }

    getItem(key, raw = false) {
        if (this.storageExists) {
            try {
                const item = JSON.parse(this.storage.getItem(key));
                return !raw ? item.value : item;
            } catch (error) {
                console.error(`Error getting item ${key} from storage`, error);
                this.storage.removeItem(key);
                return null;
            }
        } else {
            return null;
        }
    }

    removeItem(key) {
        if (this.storageExists) {
            try {
                this.storage.removeItem(key);
            } catch (error) {
                console.error(`Error removing item ${key} from storage`, error);
            }
        }
    }

    checkItemIsValid(key) {
        if (this.storageExists) {
            const item = this.getItem(key, true);
            if (item) {
                if (item.options.hasOwnProperty('expires')) {
                    if (!item.options.expires) {
                        return true;
                    } else {
                        const currentDate = new Date();
                        const itemDate = item.options.expires;
                        if (currentDate > new Date(itemDate)) {
                            this.removeItem(key);
                            return false;
                        }
                    }
                }
                return true;
            } else {
                return false;
            }
        }
    }

    checkAllItems() {
        const keys = Object.keys(this.storage);
        for (const key of keys) {
            this.checkItemIsValid(key);
        }
    }
}

const localStorage = new Storage(window.localStorage);
const sessionStorage = new Storage(window.sessionStorage);

export {localStorage, sessionStorage};