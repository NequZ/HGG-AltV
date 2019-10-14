import * as alt from 'alt';

console.log('Loaded: interactions->atms.mjs');

// Called when the player wants to make a withdrawl from the ATM.
export function withdraw(player, value) {
    const result = player.subBank(value);

    if (!result) {
        // Add alert.
        console.log(`${player.name} versucht das System zu knacken.`);
        return;
    }

    player.addCash(value);
    player.updateAtmCash(player.getCash());
    player.updateAtmBank(player.getBank());
    player.showAtmSuccess(`Erfolgreich Geld ausgezahlt $${value}.`);
}

// Called when the player wants to make a deposit to the ATM.
export function deposit(player, value) {
    const result = player.subCash(value);

    if (!result) {
        // Add alert.
        console.log(`${player.name} versucht das System zu knacken.`);
        return;
    }

    player.addBank(value);
    player.updateAtmCash(player.getCash());
    player.updateAtmBank(player.getBank());
    player.showAtmSuccess(`Erfolgreich Geld eingezahlt: $${value}.`);
}

export function ready(player) {
    player.updateAtmCash(player.getCash());
    player.updateAtmBank(player.getBank());
}
