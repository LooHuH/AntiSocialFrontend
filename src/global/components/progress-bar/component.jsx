import {percentageToColor} from "../../scripts/utils/color-helper.js";

import './css/progress-bar.css'


const ProgressBar = (
    {
        className,
        currentValue,
        maxValue,
        showValues = false,
        mode = 'classic',
        style
    }
) => {
    const percentage = currentValue / maxValue;

    let filledColor;
    let unfilledColor;
    switch (mode) {
        case ('rainbow'): {
            const {r, g ,b} = percentageToColor(percentage);
            filledColor = `rgb(${r}, ${g}, ${b})`;
            unfilledColor = `rgb(${Math.round(r / 2)}, ${Math.round(g / 2)}, ${b})`;
            break;
        }
        default: {
            filledColor = '';
            unfilledColor = '';
        }
    }

    let zeros;
    if (showValues) {
        const maxValueNumCount = maxValue.toString().length;
        const currentValueNumCount = currentValue.toString().length;
        if (maxValueNumCount > currentValueNumCount) {
            zeros = '0'.repeat(maxValueNumCount - currentValueNumCount);
        } else {
            zeros = '';
        }
    }

    return (
        <div className={className}>
            <div
                className={`progress-bar-container ${mode}`}
                style={{...style, backgroundColor: unfilledColor}}
            >
                <div
                    style={{
                        width: `${percentage * 100}%`,
                        backgroundColor: filledColor
                    }}
                />
                {showValues && (<h1>{zeros + currentValue}/{maxValue}</h1>)}
            </div>
        </div>
    );
};

export default ProgressBar;