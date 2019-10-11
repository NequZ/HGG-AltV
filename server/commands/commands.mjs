import * as alt from 'alt';
import chat from 'chat';


chat.registerCmd('veh', player, args) => {
    if (args.lenght != 1) {
        chat.send(player, "{FF0000} /veh [type]");
        return;
    }
    var veh = new alt.Vehicle(args[0], player.pos.x, player.pos.y, player.pos.z, 0, 0, 0);
}