import * as fs from "node:fs"
import font from "./fonts/_.js"
import { resolve } from "node:path";
const merged = [...font,
    //...JSON.parse(fs.readFileSync(resolve(__dirname, "tiles/tiles.json")).toString()),
    /*...JSON.parse(fs.readFileSync(resolve(__dirname, "tiles/player.json")).toString()),*/];
fs.writeFile(resolve(__dirname, "graphics.json"), JSON.stringify(merged), ()=>{})
const bin:number[] = [];
merged.forEach(g=>{
    g.data.forEach(l=>{
        const line = [...l]
        while((line[line.length-1] & 0b11000000) == 0b01000000) line.pop();
        line.forEach(num=>{
            bin.push(num);
        })
        bin.push(128);
    })
    bin.push(0b11000000);
})

fs.writeFileSync(resolve(__dirname, "graphics.bin"), new Uint8Array(bin));
if(bin.length > 0x0fff) throw new RangeError("Image too big")
