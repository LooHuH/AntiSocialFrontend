import {Component} from "react";

import "./css/404.css";


class Page404 extends Component {
    render() {
        return (
            <div className={`page-404-main-container`}>
                <h1>404</h1>
                <div className={`page-404-main-text-container`}>
                    <h2>Oops!</h2>
                    <h3>Looks like you tried to find <br/> something different here.</h3>
                    <h4>It’s okay, everyone make mistakes ;P</h4>
                </div>
            </div>
        );
    }
}

export default Page404;