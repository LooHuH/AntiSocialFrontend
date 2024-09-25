const splitCSSValue = (inputStr) => {
    if (
        inputStr === undefined
        || inputStr === null
        || inputStr === ''
    ) {
        return [0, ''];
    }

    const match = inputStr.match(/^(\d+(\.\d+)?)(\D*)$/);

    if (match) {
        return [parseFloat(match[1]), match[3] || ''];
    } else {
        return null;
    }
};

const assembleCSSValue = (arr) => {
    if (arr && arr.length > 0) {
        return arr[0].toString() + (arr[1] || '');
    } else {
        return null;
    }
};

const sumCSSValues = (value1, value2) => {
    const value1Split = splitCSSValue(value1);
    const value2Split = splitCSSValue(value2);

    if (
        (value1Split[0] === 0 && value1Split[1] === '')
        || (value1Split[1] === value2Split[1])
    ) {
        const newValue = value1Split[0] + value2Split[0];
        return assembleCSSValue([newValue, value1Split[1] || value2Split[1] || '']);
    } else {
        console.error('CSS units must be the same');
        return null;
    }
};

export {splitCSSValue, assembleCSSValue, sumCSSValues};