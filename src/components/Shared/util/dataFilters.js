/* This file will contain filters functions that will be applied on specific data sources */

export const lifeTimeFilter = dataObj => {
    const wantedData = ["wins", "kills", "kdRatio", "downs", "topTwentyFive", "topTen", "revives", "topFive", "timePlayed", "gamesPlayed", "scorePerMinute", "deaths"];
    const toFixed = ["kdRatio", "scorePerMinute"];
    const res = {};
    for (const [key, value] of Object.entries(dataObj)) {
        if (wantedData.includes(key)) {
            if (toFixed.includes(key)) {
                res[[key]] = value.toFixed(2);
            }
            else if (key === "timePlayed") {
                let timeInDays = Math.floor((value / (3600 * 24)));
                let timeInHours = Math.floor((((value / (3600 * 24)) - timeInDays) * 24));
                timeInDays = timeInDays.toFixed(0);
                res[[key]] = `${timeInDays} Days ${timeInHours} Hours`;
            }
            else {
                res[[key]] = value;
            }
        }
    }
    return res;
};

export const allWeeklyFilter = dataObj => {
    const wantedData = ["kills", "kdRatio", "killsPerGame", "avgLifeTime", "damageDone", "damageTaken", "distanceTraveled", "timePlayed", "matchesPlayed", "scorePerMinute", "deaths", "assists"];
    const toFixed = ["kdRatio", "scorePerMinute", "headshotPercentage", "killsPerGame", "distanceTraveled", "avgLifeTime"];
    const res = {};
    for (const [key, value] of Object.entries(dataObj)) {
        if (wantedData.includes(key)) {
            if (toFixed.includes(key)) {
                res[[key]] = value.toFixed(2);
            }
            else if (key === "timePlayed") {
                let timeInDays = Math.floor((value / (3600 * 24)));
                let timeInHours = Math.floor((((value / (3600 * 24)) - timeInDays) * 24));
                timeInDays = timeInDays.toFixed(0);
                res[[key]] = `${timeInDays} Days ${timeInHours} Hours`;
            }
            else {
                res[[key]] = value;
            }
        }
    }
    return res;
};

export const modeNameConverter = (modeName) => {
    switch (modeName) {
        case "br_rebirth_rbrthquad":
            return "rebirth_quads"

        case "br_rebirth_rbrthtrios":
            return "rebirth_trios"

        case "br_rebirth_rbrthduos":
            return "rebirth_duos"

        case "br_rebirth_reverse_playlist_wz325/rbrthsolos":
            return "rebirth_solo"

        case "br_brquads":
            return "wz_quads"

        case "br_brtrios":
            return "wz_trios"

        case "br_brduos":
            return "wz_duos"

        case "br_brsolo":
            return "wz_solo"

        case "br_br_quads":
            return "wz_quads"

        case "br_br_trios":
            return "wz_trios"

        case "br_br_duos":
            return "wz_duos"

        case "br_br_solo":
            return "wz_solo"

        case "br_vg_royale_quads":
            return "wz_quads"

        case "br_vg_royale_trios":
            return "wz_trios"

        case "br_vg_royale_duos":
            return "wz_duos"

        case "br_vg_royale_solo":
            return "wz_solo"
        
        default:
            if(modeName.length > 25) {
                return modeName.slice(-5);
            }
            else {
                return modeName;
            }

    }
};