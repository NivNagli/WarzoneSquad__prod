import classes from './homePage.module.css';
import PlayerSearch from './PlayerSearch';
import React from 'react';
import img from '../../../photos/test2.jpeg';
import BenefitMessage from '../../Shared/components/UI/BenefitMessage';
const homePage = () => {
    // The main page for the application.
    return (
        <React.Fragment>
            <span className={classes.main_span}>Welcome To WarzoneSquad </span>
            <BenefitMessage title={' Registered Users:'} message={'You can save squads in the site! which we take care of monitoring their information from the day they were created.'} subMessage={'And therefore the information is based beyond the last 100 games.'}></BenefitMessage>
            <PlayerSearch />
            <span className={classes.secondary_span}>The Data Based On Each Player's Last 100 Games</span>
            <img src={img} alt="homePagePicture" className={classes.homePage_img}></img>

        </React.Fragment>
    );
};

export default homePage;