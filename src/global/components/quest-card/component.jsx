import {Link} from "react-router-dom";
import {questsPath} from "../../../index.jsx";

import "./css/quest-card.css";

import error from "../../assets/images/error.png";


const QuestCard = ({questInfo, key}) => {
    const {
        id: questId = null,
        image: questImage = error,
        title: questTitle = 'Error title',
        tasks: questTasks = 0,
        xp: questXP = 0,
        project: {
            image: questProjectImage = error,
            name: questProjectName = 'Project'
        } = {},
        chain: {
            image: questChainImage = error
        } = {},
    } = questInfo || {};

    return (
        <Link
            className={`quest-card-container`}
            to={questId !== null ? (`${questsPath}/${questId}`) : null}
            key={key}
        >
            <img
                className={`quest-card-image`}
                src={questImage}
                alt={`Quest image`}
            />
            <div className={`quest-card-info-container`}>
                <h1>{questTitle}</h1>
                <div className={`quest-card-info`}>
                    <div className={`quest-card-info-tasks-xp`}>
                        <h2 className={`quest-card-info-tasks`}>
                            {questTasks} tasks
                        </h2>
                        <h2 className={`quest-card-info-xp`}>
                            {questXP} xp
                        </h2>
                    </div>
                    <div className={`quest-card-info-separator`}/>
                    <div className={`quest-card-info-project-chain`}>
                        <div className={`quest-card-info-project`}>
                            <img
                                src={questProjectImage}
                                alt={`Project image`}
                            />
                            <h3>{questProjectName}</h3>
                        </div>
                        <div className={`quest-card-info-chain`}>
                            <img
                                src={questChainImage}
                                alt={`Chain image`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default QuestCard;