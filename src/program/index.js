import "../macro"
import { resource } from "./resource.js";

import { draw } from "./piece/draw.js";
import { copy } from "./utils/copy.js";
import { drawText } from "./utils/text.js";
import { px, py } from "./piece/data.js";
import { process } from "./piece/process.js";

export function main(){
    copy($("graph"), $("glen"), 0xf000n);
    io(0);
    while((dumpkey() & 0b00000110) == 0){
        rect(0, 0, 128, 128, $("color", 3, 3, 2));
        drawText(10, 10, $(!"ACE of Pazzle"))
        drawText(5, 40, $(!"Press A or Start"));
        drawText(5, 120, $(!"(C) TNTSuperMan 2025"));
        redraw();
    }
    $("set*", 0xa100n, 1);
    $("set*", 0xa101n, 2);
    $("set*", 0xa102n, 3);
    $("set*", 0xa103n, 4);
    $("set*", 0xa104n, 5);
    $("set*", 0xa105n, 6);
    $("set*", 0xa106n, 7);
    $("set*", 0xa107n, 8);
    $("set*", 0xa108n, 9);
    $("set*", 0xa109n, 10);
    $("set*", 0xa10an, 11);
    $("set*", 0xa10bn, 12);
    $("set*", 0xa10cn, 13);
    $("set*", 0xa10dn, 14);
    $("set*", 0xa10en, 15);
    px = 3;
    py = 3;
    while(1){
        process();
        draw();
    }
    return;
}
