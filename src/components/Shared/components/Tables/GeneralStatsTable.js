import React from 'react';
import classes from './GeneralStatsTable.module.css';
import GeneralStatDiv from './GeneralStatDiv';
import Card from '../UI/Card';

const GeneralStatsTable = props => {
    /* Grid table which contains stats div's with general stats of the player */
    // The states will received in javascript object form [Hash table].
    const stats = [];
    for (const [key, value] of Object.entries(props.data)) {
        stats.push(<GeneralStatDiv key={key} header={key} value={value}></GeneralStatDiv>);
    }
    return (
        <Card>
            <h2 className={classes.general_table_h2}> {props.header}</h2>
            <div className={classes.general_stats_container}>
                {stats}
            </div>
        </Card>

    );
};

export default GeneralStatsTable;