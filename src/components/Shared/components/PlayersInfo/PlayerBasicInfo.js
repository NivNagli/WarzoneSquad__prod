import React from 'react';
import classes from './PlayerBasicInfo.module.css';
import Card from '../UI/Card';

const PlayerBasicInfo = props => {
    // Simple component which will display the player username wrapped inside Card component.
    return (
        <Card>
            <div className={classes.player_base_info}>
                <span className={classes.player_name}>{props.name}</span>
            </div>
        </Card>

    );
};
export default PlayerBasicInfo;
