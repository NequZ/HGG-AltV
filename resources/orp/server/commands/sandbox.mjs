import * as alt from 'alt';
import * as chat from '../chat/chat.mjs';
import * as configurationItems from '../configuration/items.mjs';
import fs from 'fs';
import { addWeapon } from '../systems/inventory.mjs';
import { addXP, setXP } from '../systems/skills.mjs';
import { generateHash } from '../utility/encryption.mjs';

console.log('Loaded: commands->sandbox.mjs');

// Development sandbox commands
const sandboxhelp = [
    //
    '/b, /me, /do',
    '/addveh (model)',
    '/addcash (amount)',
    '/addwep (name)',
    '/face, /addxp, /setxp',
    '/tpto (rp-name)',
    '/players, /clearchat',
    '/tpwp',
    '/taxi, /mechanic',
    '/cancel',
    '/quitjob, /getsector',
    '/tryparticle',
    '/phonenumber',
    '/t, /call, /addcontact, /removecontact, /hangup',
    '/d20 /flipcoin, /sf'
];

chat.registerCmd('help', player => {
    sandboxhelp.forEach(helper => {
        player.send(`${helper}`);
    });
});

chat.registerCmd('addcash', (player, value) => {
    let data = value * 1;
    if (value > 600000) return;
    player.addCash(data);
});

chat.registerCmd('addwep', (player, arg) => {
    if (arg === undefined || arg.length == 0) {
        player.send('Usage: /addwep (name)');
        return;
    }

    if (!addWeapon(player, arg[0])) {
        player.send('Weapon does not exist');
        return;
    }

    player.send(`Weapon was added to your inventory.`);
});

chat.registerCmd('face', player => {
    player.showFaceCustomizerDialogue(player.pos);
});

chat.registerCmd('additem', (player, arg) => {
    if (arg == undefined || arg.length == 0) {
        player.send('Usage: /additem (item)');
        return;
    }

    let itemTemplate = configurationItems.Items[`${arg[0]}`];
    if (!itemTemplate) {
        player.send('Item does not exist');
        return;
    }

    if (!arg[1]) {
        arg[1] = 1;
    }

    if (player.addItem(arg[0], parseInt(arg[1]), itemTemplate.props)) {
        player.send('Added Item');
    } else {
        player.send('Did not add item.');
    }
});

chat.registerCmd('addveh', (player, arg) => {
    if (arg == undefined || arg.length == 0) {
        player.send('Usage: /addveh (vehicle)');
        return;
    }

    try {
        player.addVehicle(arg[0], player.pos, new alt.Vector3(0, 0, 0));
    } catch (e) {
        player.send('Not a valid vehicle model. Must be a plain name. ie. infernus');
    }
});

chat.registerCmd('coord', (player, args) => {
    if (args.length <= 2) {
        player.send('Usage: /coord (x, y, z)');
        return;
    }

    player.pos = {
        x: args[0],
        y: args[1],
        z: args[2]
    };
});

chat.registerCmd('tpto', (player, arg) => {
    if (arg === undefined || arg.length == 0) {
        player.send('Usage: /tpto (roleplay_name)');
        return;
    }

    let target = alt.Player.all.find(x => x.data.name.includes(arg[0]));

    if (target === undefined) {
        player.send('User was not found.');
        return;
    }

    player.pos = target.pos;
});

chat.registerCmd('tpwp', player => {
    alt.emitClient(player, 'teleportToWaypoint');
});



chat.registerCmd('players', player => {
    alt.Player.all.forEach(t => {
        if (!t.data) return;
        player.send(`${t.data.name}`);
    });
});

chat.registerCmd('pos', player => {
    player.send(`${JSON.stringify(player.pos)}`);
    console.log(player.pos);
});

chat.registerCmd('save', player => {
    player.data.pos = JSON.stringify(player.pos);
    player.save();
});

chat.registerCmd('sector', player => {
    player.send(`Current Sector -> X: ${player.sector.x}, Y: ${player.sector.y}`);
});

chat.registerCmd('addxp', (player, args) => {
    const _skill = args[0];
    const _amount = parseInt(args[1]);

    if (!_skill || !_amount) {
        player.send(`/addxp <skill> <amount>`);
        return;
    }

    addXP(player, _skill, _amount);
});

chat.registerCmd('setxp', (player, args) => {
    const _skill = args[0];
    const _amount = parseInt(args[1]);

    if (!_skill || !_amount) {
        player.send(`/setxp <skill> <amount>`);
        return;
    }

    setXP(player, _skill, _amount);
});

// /tryparticle core ent_dst_gen_gobstop 5000 1 0 0 0
// /tryparticle core ent_dst_rocks 20 1 0 1.2 -1
chat.registerCmd('tryparticle', (player, args) => {
    const _dict = args[0];
    const _name = args[1];
    const _duration = args[2];
    const _scale = args[3];
    const _x = parseFloat(args[4]);
    const _y = parseFloat(args[5]);
    const _z = parseFloat(args[6]);

    if (args.length < 6) {
        player.send(`/tryparticle dict name duration scale x y z`);
        return;
    }

    alt.emitClient(
        player,
        'tryParticle',
        _dict,
        _name,
        parseFloat(_duration),
        parseFloat(_scale),
        _x,
        _y,
        _z
    );
});

// /tryprop prop_tool_mallet 57005 0.10 0.1 0 80 0 180
chat.registerCmd('tryprop', (player, args) => {
    const _prop = args[0];
    const _bone = args[1];
    const _x = parseFloat(args[2]);
    const _y = parseFloat(args[3]);
    const _z = parseFloat(args[4]);
    const _pitch = parseFloat(args[5]);
    const _roll = parseFloat(args[6]);
    const _yaw = parseFloat(args[7]);
    if (args.length < 7) {
        player.send(`/tryprop prop bone x y z pitch roll yaw`);
        return;
    }

    alt.emitClient(player, 'tryprop', _prop, _bone, _x, _y, _z, _pitch, _roll, _yaw);
});

let trackPoints = [];

chat.registerCmd('track', (player, args) => {
    trackPoints.push(player.pos);
});

chat.registerCmd('trackclear', () => {
    trackPoints = [];
});

chat.registerCmd('trackdone', () => {
    fs.writeFileSync(`trackpoints.json`, JSON.stringify(trackPoints, null, '\t'));
    trackPoints = [];
});

chat.registerCmd('rmveh', (player, args) => {
    if(args.length > 0) { 
        let veh = player.vehicles;
        if(args[0] = "all") { 
            veh.forEach(veh => { 
                console.log(`${player.username} - remove car ${veh.data.model} with id ${veh.data.model}`) 
                veh.deleteForEver()   
            });
        } else {
            let vehs = veh.filter(veh => veh.data.model === args[0])
            let vehsC = ehs.length;
            if(vehsC > 0) { //any car
                if(vehsC > 1) { //multply veh 
                    if(args.length > 1) { //have index
                        let iVeh = parseInt(arg[1]);
                        if (!isNaN(iVeh)) { //sec arg is prased
                            if(iVeh < vehsC ) { //sec arg bound
                                let veh = vehs[iVeh]
                                console.log(`${player.username} - remove car ${veh.data.model} with id ${veh.data.id}`) 
                                veh.deleteForEver()
                            } else { 
                                player.send(`Please select a number between 0 and ${vehsC}`)
                            }
                        } else { 
                            player.send(`You are an idit, you have to choos a number from 0 to ${vehsC}`)
                        }
                    } else {  //no index
                        player.send("Please add a index:");
                        veh.forEach((veh, iVeh) => player.send(`[${iVeh}] ${veh.data.model}`))
                    }
                } else { //one car
                    veh[0].deleteForEver()
                    console.log(`${player.username} - remove car ${veh.data.model} with id ${veh.data.id}`) 
                }
            } else { 
                player.send(`You dont have car like ${arg[0]}`)
            }
        }
    } else { 
        player.send('Usage: /rmveh (vehicale name|all) [number]')
        player.send('or use /listVeh')
    }
}); 

chat.registerCmd("listVeh", (player) => { 
    let vehList = player.vehicles.map(veh => veh.data.model).join(",")
    player.send(vehList)
});