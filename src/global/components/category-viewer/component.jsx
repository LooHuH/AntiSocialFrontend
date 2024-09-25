import {useRef, useState, useEffect} from "react";
import {splitCSSValue, assembleCSSValue, sumCSSValues} from "../../scripts/utils/css-helper.js";

import "./css/category-viewer.css";


const CategoryViewer = ({categories}) => {
    const contentRef = useRef(null);
    const contentPageRefs = [];
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

    const categoryIsActive = (index) => {
        return (index === activeCategoryIndex);
    };

    const addRef = () => {
        const newRef = useRef(null);
        contentPageRefs.push(newRef);
        return newRef;
    };

    useEffect(() => {
        if (contentRef.current) {
            const contentPageRefsHeights = [];
            let prevRefHeight = '';
            for (const i in contentPageRefs) {
                const currentRef = contentPageRefs[i].current;
                const refHeight = getComputedStyle(currentRef).height;
                contentPageRefsHeights.push(splitCSSValue(refHeight)[0]);
                if (i !== 0) {
                    currentRef.style.transform = `translateY(-${prevRefHeight})`;
                }
                prevRefHeight = sumCSSValues(prevRefHeight, refHeight);
            }

            contentRef.current.style.height = assembleCSSValue([Math.max(...contentPageRefsHeights), 'px']);
        }
    }, []);

    return (
        <div className={`category-viewer-main-container`}>
            <div className={`category-viewer-category-buttons`}>
                {categories.map((category, index) => (
                    <CategoryButton
                        key={index}
                        categoryName={category['name']}
                        isActive={categoryIsActive(index)}
                        onClick={() => setActiveCategoryIndex(index)}
                    />
                ))}
            </div>
            <div ref={contentRef}>
                {categories.map((category, index) => (
                    <div
                        className={`category-viewer-category-content-page ${categoryIsActive(index) ? '' : 'hidden'}`}
                        ref={addRef()}
                    >
                        {category['content'].map((item, _) => (item))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const CategoryButton = ({categoryName, isActive, onClick}) => {
    return (
        <button
            className={`${isActive ? 'white' : 'black'}-button category-viewer-category-button ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            {categoryName}
        </button>
    );
};

export default CategoryViewer;