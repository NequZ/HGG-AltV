import * as alt from 'alt';
import * as native from 'natives';
import { ContextMenu } from '/client/systems/context.mjs';

alt.log('Loaded: client->contextmenus->vehicle.mjs');

const doorNames = [
    'Fahrertür',
    'Beifahrertür',
    'Hintere Fahrertür',
    'Hintere Beifahrertür'
];

alt.on('menu:Vehicle', ent => {
    if (alt.Player.local.getMeta('arrest')) return;
    const name = native.getLabelText(
        native.getDisplayNameFromVehicleModel(native.getEntityModel(ent))
    );

    if (alt.Player.local.vehicle) {
        let vehClass = native.getVehicleClass(alt.Player.local.vehicle.scriptID);
        let items = [
            {
                label: name
            },
            {
                label: 'Fahrzeug An/Abschließen',
                isServer: true,
                event: 'vehicle:ToggleLock'
            },
            {
                label: 'Motor An/Abschalten',
                isServer: true,
                event: 'vehicle:ToggleEngine'
            },
            {
                label: 'Sicherheitsverschließung',
                isServer: true,
                event: 'vehicle:SafetyLock'
            }
        ];

        if (vehClass === 8) {
            items.pop();
        }

        new ContextMenu(ent, items);
        return;
    }

    new ContextMenu(ent, [
        {
            label: name
        },
        {
            label: 'Fahrzeug auf/Abschließen',
            isServer: true,
            event: 'vehicle:ToggleLock'
        },
        {
            label: 'Tür Menü',
            isServer: false,
            event: 'submenu:VehicleDoors'
        }
    ]);
});

alt.on('submenu:VehicleDoors', ent => {
    const doorCount = native.getVehicleMaxNumberOfPassengers(ent) + 1;

    let items = [
        {
            label: 'Tür Kontrolle'
        },
        {
            label: 'Kofferraum',
            isServer: true,
            event: 'vehicle:ToggleDoor',
            data: 5
        },
        {
            label: 'Motorhaube',
            isServer: true,
            event: 'vehicle:ToggleDoor',
            data: 4
        }
    ];

    for (let i = 0; i < doorCount; i++) {
        items.push({
            label: doorNames[i],
            isServer: true,
            event: 'vehicle:ToggleDoor',
            data: i
        });
    }

    new ContextMenu(ent, items);
});
