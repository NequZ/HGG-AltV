import * as alt from 'alt';

const time = 60000;
let nextSavePlayerPlayTime = Date.now() + 60000 * 5;

setInterval(() => {
    console.log('Saving ALL player data.');
    // Edit by Isa
    alt.Player.forEach(player => {  //player instant of alt.Player.all[iPlayer] 
        if (!player.data) continue;
        player.saveData();

        if (nextSavePlayerPlayTime < Date.now()) {
            nextSavePlayerPlayTime = Date.now() + 60000 * 5;
            player.updatePlayingTime();
        }
    })  
    // Old 
    // for (let iPlayer = 0, nPlayer = alt.Player.all.length; iPlayer < nPlayer; iPlayer++) {
    //     if (!alt.Player.all[iPlayer].data) continue;
    //     alt.Player.all[iPlayer].saveData();

    //     if (nextSavePlayerPlayTime < Date.now()) {
    //         nextSavePlayerPlayTime = Date.now() + 60000 * 5;
    //         alt.Player.all[iPlayer].updatePlayingTime();
    //     }
    // }
}, time);
