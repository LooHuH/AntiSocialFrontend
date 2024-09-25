import {Component} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SmallScreenAlert from "./global/components/small-screen-alert/component.jsx";
import Header from "./global/components/header/component.jsx";
import Footer from "./global/components/footer/component.jsx";
import Page404 from "./page-404/page.jsx";
import Home from "./home/page.jsx";
import Crypto from "./crypto/page.jsx";
import Quests from "./quests/page.jsx";
import Quest from "./quests/[questId]/page.jsx";
import Blog from "./blog/page.jsx";
import Profile from "./profile/page.jsx";
import SeasonPass from "./season-pass/page.jsx";

import "./index.css";
import "./global/css/fonts.css";


const anyPath = '*';
const page404Path = '/404';
const homePath = '/';
const cryptoPath = '/crypto';
const questsPath = '/quests';
const blogPath = '/blog';
const profilePath = '/profile';
const seasonPassPath = '/season-pass';

const questsParams = 'questId';

export default class App extends Component {
    render() {
        return (
            <>
                <SmallScreenAlert/>
                <Router>
                    <Header/>
                    <Routes>
                        <Route
                            path={anyPath}
                            element={<Navigate to={page404Path}/>}
                        />
                        <Route
                            path={page404Path}
                            element={<Page404/>}
                        />
                        <Route
                            path={homePath}
                            element={<Home/>}
                        />
                        <Route
                            path={cryptoPath}
                            element={<Crypto/>}
                        />
                        <Route
                            path={questsPath}
                            element={<Quests/>}
                        />
                        <Route
                            path={`${questsPath}/:${questsParams}`}
                            element={<Quest/>}
                        />
                        <Route
                            path={blogPath}
                            element={<Blog/>}
                        />
                        <Route
                            path={profilePath}
                            element={<Profile/>}
                        />
                        <Route
                            path={seasonPassPath}
                            element={<SeasonPass/>}
                        />
                    </Routes>
                    <Footer/>
                </Router>
            </>
        );
    }
}

let cursorPosition = {x: 0, y: 0};
document.addEventListener('mousemove', (event) => {
    cursorPosition.x = event.clientX;
    cursorPosition.y = event.clientY;
});
const getCursorPosition = () => {
    return {...cursorPosition};
};

export {
    anyPath, page404Path, homePath, cryptoPath, questsPath, blogPath, profilePath, seasonPassPath,
    questsParams,
    getCursorPosition,
};
