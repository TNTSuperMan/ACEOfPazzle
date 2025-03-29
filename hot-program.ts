import { resolve } from "path";
import { watch } from "fs";
import compile from "./build";

const w = watch(resolve(__dirname, "./src/program"), {recursive: true}, ()=>
    compile().catch(console.error));

const macro_w = watch(resolve(__dirname, "./src/macros"), {recursive: true}, (_,e)=>{
    if(w && !e?.startsWith("graphics/graphics.")){
        w.close();
        macro_w.close();
    }
})
