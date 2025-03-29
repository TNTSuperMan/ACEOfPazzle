import { Bundle } from "bge-compiler";
import { BGEXCompile } from "bgex-compiler/src/index"
import { existsSync, mkdirSync, writeFileSync } from "fs"
import { resolve } from "path";
const compile = async () => {console.time("Compile");
    const result = await BGEXCompile(resolve(__dirname, "./src/program/index.js"), "main", () => Bundle([]));
    console.timeEnd("Compile")
    if(result){
        if(!existsSync(resolve(__dirname, "dist")))
            mkdirSync(resolve(__dirname, "dist"));
        writeFileSync(resolve(__dirname, "dist/obj.bge"), result[0]);
        writeFileSync(resolve(__dirname, "dist/var.map"), "addr,name,at\n"+result[1].map(e=>`${e[0].toString(16)},${e[2]},${e[1]}`).join("\n"))
        if(result[2]){
            writeFileSync(resolve(__dirname, "dist/out.bin"), new Uint8Array(result[2]));
            writeFileSync(resolve(__dirname, "./runtime/src/rom.bin"), new Uint8Array(result[2]));
        }
    }
}
export default compile;
compile().catch(console.error);
