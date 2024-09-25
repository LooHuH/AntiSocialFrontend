import {Component} from "react";
import BlogCard from "./components/card.jsx";

import "./css/blog.css";


class Blog extends Component {
    render() {
        const blogCards = Array.from({length: 5}, (_, index) => index);

        return (
            <div className="blog-container">
                {blogCards.map((index) => (
                    <BlogCard key={index}/>
                ))}
            </div>
        );
    }
}

export default Blog;
