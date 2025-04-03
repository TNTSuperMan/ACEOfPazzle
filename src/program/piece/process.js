import "../../macro";
import { Index, px, py } from "./data.js";
import { draw } from "./draw.js";

function to(x, y){
    let target = 0n;
    target.top = 0xa1;
    target.bottom = Index(px, py);
    let to = 0n;
    to.top = 0xa1;
    to.bottom = Index(x, y);
    $("set*", target, $("get*", to))
    px = x;
    py = y;
    return;
}

export function process(){
    if((dumpkey() & 0b11110000) > 0){
              if(((dumpkey() & 0b10000000) > 0) && py != 0){
            to(px, py - 1);
        }else if(((dumpkey() & 0b01000000) > 0) && py != 3){
            to(px, py + 1);
        }else if(((dumpkey() & 0b00100000) > 0) && px != 0){
            to(px - 1, py);
        }else if(((dumpkey() & 0b00010000) > 0) && px != 3){
            to(px + 1, py);
        }
        while((dumpkey() & 0b11110000) > 0) draw();
    }
    return;
}
