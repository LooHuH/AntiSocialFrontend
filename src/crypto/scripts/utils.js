import arrowUp from "../assets/images/arrow-up.png";
import arrowDown from "../assets/images/arrow-down.png";

const positivePercentage = (percentage) => {
    return (percentage >= 0 ? percentage : (percentage - 2 * percentage));
};

const widgetColor = (percentage) => {
    return (percentage >= 0 ? 'green' : 'red');
};

const arrowDirection = (color) => {
    return (color === 'green' ? arrowUp : arrowDown);
};

export {positivePercentage, widgetColor, arrowDirection};