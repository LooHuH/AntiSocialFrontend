const percentageToColor = (percentage) => {
    return {
        r: Math.min(255, Math.round(2 * (1 - percentage) * 255)),
        g: Math.min(255, Math.round(2 * percentage * 255)),
        b: 0
    };
};

export {percentageToColor};