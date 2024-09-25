const timeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

const timeFromDatetime = (datetime) => {
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return [day, month, year].join('.');
};

const timeLeftToMilliseconds = ({
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
}) => {
    return ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds) * 1000;
}

const timeLeftToDate = ({
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
}) => {
    const totalMilliseconds = timeLeftToMilliseconds({days, hours, minutes, seconds});
    return new Date(Date.now() + totalMilliseconds);
}

const formatUsername = (username) => {
    const maxLength = 10;
    if (username.length > maxLength) {
        return `${username.slice(0, maxLength)}...`;
    } else {
        return username;
    }
};

const formatWalletAddress = (address) => {
    if (!address) {
        return 'No wallet connected';
    } else {
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    }
};

export {
    timeFromTimestamp, timeFromDatetime, timeLeftToMilliseconds, timeLeftToDate,
    formatUsername, formatWalletAddress
};