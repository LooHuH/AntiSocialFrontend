const insertCharIn = (string, index, char) => {
    return string.slice(0, index) + char + string.slice(index);
};

export {insertCharIn};