import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import SwiperCore from "swiper";
import {Pagination, Navigation} from "swiper/modules";

import "./css/quest-tasks-page.css";

import leftSectionLogoCompanyTasks from "../assets/images/company-pics/company-1-card-pic.png";
import rightSectionLogoCompanyTasks from "../assets/images/company-pics/company-2-card-pic.png";
import linkTask from "../assets/images/services-pics/link-task.png";


SwiperCore.use([Navigation, Pagination]);

const tasksData = [
    {
        imageSrc: rightSectionLogoCompanyTasks,
        title: 'Mint NFT',
        description: 'Mint the inaugural limited-edition NFT for the launch of the Celosphere, an NFT marketplace powered by RaribleX.',
        buttonText: 'Open Uniswap',
        buttonLink: 'https://uniswap.org/',
    },
    {
        imageSrc: rightSectionLogoCompanyTasks, // Можете заменить на другие изображения
        title: 'Subscribe to X account',
        description: 'Subscribe to the official X account to stay updated with the latest news and announcements.',
        buttonText: 'Open X',
        buttonLink: 'https://x.com',
    },
    {
        imageSrc: rightSectionLogoCompanyTasks,
        title: 'Swap on Base',
        description: 'Swap tokens on the Base network to complete the task and earn rewards.',
        buttonText: 'Open Base Swap',
        buttonLink: 'https://uniswap.org/',
    },
    // Добавьте больше задач по необходимости
];

const QuestTasksButtons = ({selectedTaskIndex, onTaskSelect}) => {
    return (
        <div className='quest-tasks-page-left-section-buttons-container'>
            {tasksData.map((task, index) => (
                <div
                    key={index}
                    className='quest-tasks-page-left-section-buttons-container-button'
                    onClick={() => onTaskSelect(index)}
                    style={{
                        backgroundColor: selectedTaskIndex === index ? '#656668' : 'transparent',
                        cursor: 'pointer',
                    }}
                >
                    <div className='quest-tasks-page-left-section-buttons-container-button-number'>
                        <p>{index + 1}</p>
                    </div>
                    <div className='quest-tasks-page-left-section-buttons-container-button-text'>
                        <p>{task.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Quest = () => {
    const {questId} = useParams();
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
    const [taskCompleted, setTaskCompleted] = useState(false); // Состояние для отслеживания нажатия на кнопку с Link

    const selectedTask = tasksData[selectedTaskIndex];

    const handleVerifyClick = () => {
        if (taskCompleted && selectedTaskIndex < tasksData.length - 1) {
            setSelectedTaskIndex(selectedTaskIndex + 1); // Переключение на следующую задачу
            setTaskCompleted(false); // Сброс состояния taskCompleted
        }
    };

    const handleLinkClick = () => {
        setTaskCompleted(true); // Установка состояния taskCompleted в true при нажатии на кнопку с Link
    };

    return (
        <div className='quest-tasks-page'>
            <section className='quest-tasks-page-left-section'>
                <div className='quest-tasks-page-left-section-all'>
                    <div className='quest-tasks-page-left-section-description'>
                        <div className='quest-tasks-page-left-section-description-pic'>
                            <Link className='quest-tasks-page-left-section-description-pic-link' to={''}
                                rel="noopener noreferrer">
                                <img className="leftSectionLogoCompanyTasks" src={leftSectionLogoCompanyTasks}
                                    alt='leftSectionLogoCompanyTasks'/>
                            </Link>
                        </div>
                        <div className='quest-tasks-page-left-section-description-text'>
                            <div className='quest-tasks-page-left-section-description-text-title'>
                                <h2 className='quest-tasks-page-left-section-description-text-title-h2'>
                                    Welcome to the Celosphere
                                </h2>
                            </div>
                            <div className='quest-tasks-page-left-section-description-text-descript'>
                                <p className='quest-tasks-page-left-section-description-text-descript-p'>
                                    Celebrate the launch of Celosphere.xyz, a new NFT marketplace on Celo powered by
                                    RaribleX, with a free, limited-edition NFT mint.
                                </p>
                            </div>
                        </div>
                        <div className='quest-tasks-page-left-section-description-chain-level'>
                            <Link className='quest-tasks-page-left-section-description-chain-link' to={''}
                                rel="noopener noreferrer">
                                <img className="pic-chain" src={leftSectionLogoCompanyTasks} alt='picChain'/>
                                <p className="text-chain">
                                    Avalanche
                                </p>
                            </Link>
                            <div className='quest-tasks-page-left-section-description-level-pic-text'>
                                <img className="pic-level" src={leftSectionLogoCompanyTasks} alt='picLevel'/>
                                <p className="text-level">
                                    Medium
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='quest-tasks-page-left-section-buttons'>
                        <QuestTasksButtons
                            selectedTaskIndex={selectedTaskIndex}
                            onTaskSelect={setSelectedTaskIndex}
                        />
                    </div>
                </div>
            </section>
            <section className='quest-tasks-page-right-section'>
                <div className='quest-tasks-page-right-section-all'>
                    <div className='quest-tasks-page-right-section-task'>
                        <div className='quest-tasks-page-right-section-task-pic'>
                            <img className="task-pic" src={selectedTask.imageSrc} alt='taskPic'/>
                        </div>
                        <div className='quest-tasks-page-right-section-task-text'>
                            <div className='quest-tasks-page-right-section-task-text-title'>
                                <h2>{selectedTask.title}</h2>
                            </div>
                            <div className='quest-tasks-page-right-section-task-text-descript'>
                                <p>{selectedTask.description}</p>
                            </div>
                        </div>
                        <div className='quest-tasks-page-right-section-task-button'>
                            <Link
                                className='quest-tasks-page-right-section-task-button-link'
                                to={selectedTask.buttonLink}
                                onClick={handleLinkClick} // Обработчик клика
                                target="_blank" // Открытие в новой вкладке
                                rel="noopener noreferrer" // Защита от уязвимостей
                            >
                                <p>{selectedTask.buttonText}</p>
                                <img className="pic-task-button" src={linkTask} alt='picTaskButton'/>
                            </Link>
                        </div>
                        <div className='quest-tasks-page-right-section-task-button-verify'>
                            <button onClick={handleVerifyClick}>
                                <p>Verify</p>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Quest;
