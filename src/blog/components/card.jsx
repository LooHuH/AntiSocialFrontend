import React from "react";
import "../css/card.css";

const BlogCard = () => {
    return (
        <div className="blog-card-container">
            <div className="date-container">
                <div className="blog-date">17</div>
                <div className="blog-date-month">Aug</div>

            </div>
            <div className="blog-line"></div>
            <div className="blog-description-container">
                <div className="blog-text-container">
                    <div className="blog-header-text">
                        INTRODUCTION
                    </div>
                    <div className="blog-second-text">
                        Hello everyone, we are a crypto-hacker community. We actually find it funny that you don’t
                        realize how you're being watched...
                    </div>

                </div>

                <div className="blog-read-more">
                    Read More...
                </div>

            </div>


        </div>
    );
};

export default BlogCard;
