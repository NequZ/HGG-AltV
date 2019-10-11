import * as alt from 'alt';
import * as native from 'natives';

alt.log('Loaded: client->events->connectionComplete.mjs');

alt.on('connectionComplete', () => {
    alt.log('Loading Interiors');

    alt.requestIpl('ex_dt1_02_office_02b');

    let coordLoc = native.getInteriorAtCoords(-141.1987, -620.913, 168.8205);
    alt.log(`Interior Location ID: ${coordLoc}`);

    native.pinInteriorInMemory(coordLoc);
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
    native.requestIpl('chop_props');
    native.requestIpl('FIBlobby');
    native.removeIpl('FIBlobbyfake');
    native.requestIpl('FBI_colPLUG');
    native.requestIpl('FBI_repair');
    native.requestIpl('v_tunnel_hole');
    native.requestIpl('TrevorsMP');
    native.requestIpl('TrevorsTrailer');
    native.requestIpl('TrevorsTrailerTidy');
    native.removeIpl('farm_burnt');
    native.removeIpl('farm_burnt_lod');
    native.removeIpl('farm_burnt_props');
    native.removeIpl('farmint_cap');
    native.removeIpl('farmint_cap_lod');
    native.requestIpl('farm');
    native.requestIpl('farmint');
    native.requestIpl('farm_lod');
    native.requestIpl('farm_props');
    native.requestIpl('facelobby');
    native.removeIpl('CS1_02_cf_offmission');
    native.requestIpl('CS1_02_cf_onmission1');
    native.requestIpl('CS1_02_cf_onmission2');
    native.requestIpl('CS1_02_cf_onmission3');
    native.requestIpl('CS1_02_cf_onmission4');
    native.requestIpl('v_rockclub');
    native.requestIpl('v_janitor');
    native.removeIpl('hei_bi_hw1_13_door');
    native.requestIpl('bkr_bi_hw1_13_int');
    native.requestIpl('ufo');
    native.requestIpl('ufo_lod');
    native.requestIpl('ufo_eye');
    native.removeIpl('v_carshowroom');
    native.removeIpl('shutter_open');
    native.removeIpl('shutter_closed');
    native.removeIpl('shr_int');
    native.requestIpl('csr_afterMission');
    native.requestIpl('v_carshowroom');
    native.requestIpl('shr_int');
    native.requestIpl('shutter_closed');
    native.requestIpl('smboat');
    native.requestIpl('smboat_distantlights');
    native.requestIpl('smboat_lod');
    native.requestIpl('smboat_lodlights');
    native.requestIpl('cargoship');
    native.requestIpl('railing_start');
    native.removeIpl('sp1_10_fake_interior');
    native.removeIpl('sp1_10_fake_interior_lod');
    native.requestIpl('sp1_10_real_interior');
    native.requestIpl('sp1_10_real_interior_lod');
    native.removeIpl('id2_14_during_door');
    native.removeIpl('id2_14_during1');
    native.removeIpl('id2_14_during2');
    native.removeIpl('id2_14_on_fire');
    native.removeIpl('id2_14_post_no_int');
    native.removeIpl('id2_14_pre_no_int');
    native.removeIpl('id2_14_during_door');
    native.requestIpl('id2_14_during1');
    native.removeIpl('Coroner_Int_off');
    native.requestIpl('coronertrash');
    native.requestIpl('Coroner_Int_on');
    native.removeIpl('bh1_16_refurb');
    native.removeIpl('jewel2fake');
    native.removeIpl('bh1_16_doors_shut');
    native.requestIpl('refit_unload');
    native.requestIpl('post_hiest_unload');
    native.requestIpl('Carwash_with_spinners');
    native.requestIpl('KT_CarWash');
    native.requestIpl('ferris_finale_Anim');
    native.removeIpl('ch1_02_closed');
    native.requestIpl('ch1_02_open');
    native.requestIpl('AP1_04_TriAf01');
    native.requestIpl('CS2_06_TriAf02');
    native.requestIpl('CS4_04_TriAf03');
    native.removeIpl('scafstartimap');
    native.requestIpl('scafendimap');
    native.removeIpl('DT1_05_HC_REMOVE');
    native.requestIpl('DT1_05_HC_REQ');
    native.requestIpl('DT1_05_REQUEST');
    native.requestIpl('dt1_05_hc_remove');
    native.requestIpl('dt1_05_hc_remove_lod');
    native.requestIpl('FINBANK');
    native.removeIpl('DT1_03_Shutter');
    native.removeIpl('DT1_03_Gr_Closed');
    native.requestIpl('golfflags');
    native.requestIpl('airfield');
    native.requestIpl('v_garages');
    native.requestIpl('v_foundry');
    native.requestIpl('hei_yacht_heist');
    native.requestIpl('hei_yacht_heist_Bar');
    native.requestIpl('hei_yacht_heist_Bedrm');
    native.requestIpl('hei_yacht_heist_Bridge');
    native.requestIpl('hei_yacht_heist_DistantLights');
    native.requestIpl('hei_yacht_heist_enginrm');
    native.requestIpl('hei_yacht_heist_LODLights');
    native.requestIpl('hei_yacht_heist_Lounge');
    native.requestIpl('hei_carrier');
    native.requestIpl('hei_Carrier_int1');
    native.requestIpl('hei_Carrier_int2');
    native.requestIpl('hei_Carrier_int3');
    native.requestIpl('hei_Carrier_int4');
    native.requestIpl('hei_Carrier_int5');
    native.requestIpl('hei_Carrier_int6');
    native.requestIpl('hei_carrier_LODLights');
    native.requestIpl('bkr_bi_id1_23_door');
    native.requestIpl('lr_cs6_08_grave_closed');
    native.requestIpl('hei_sm_16_interior_v_bahama_milo_');
    native.requestIpl('CS3_07_MPGates');
    native.requestIpl('cs5_4_trains');
    native.requestIpl('v_lesters');
    native.requestIpl('v_trevors');
    native.requestIpl('v_michael');
    native.requestIpl('v_comedy');
    native.requestIpl('v_cinema');
    native.requestIpl('V_Sweat');
    native.requestIpl('V_35_Fireman');
    native.requestIpl('redCarpet');
    native.requestIpl('triathlon2_VBprops');
    native.requestIpl('jetstenativeurnel');
    native.requestIpl('Jetsteal_ipl_grp1');
    native.requestIpl('v_hospital');
    native.removeIpl('RC12B_Default');
    native.removeIpl('RC12B_Fixed');
    native.requestIpl('RC12B_Destroyed');
    native.requestIpl('RC12B_HospitalInterior');
    native.requestIpl('canyonriver01');
    native.requestIpl('canyonriver01_lod');
    native.requestIpl('cs3_05_water_grp1');
    native.requestIpl('cs3_05_water_grp1_lod');
    native.requestIpl('trv1_trail_start');
    native.requestIpl('CanyonRvrShallow');
});
