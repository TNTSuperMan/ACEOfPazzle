import { existsSync, rmdirSync } from "fs";

if(existsSync("./dist/html"))
    rmdirSync("./dist/html", {recursive: true});
Bun.build({
    entrypoints: ["./index.html"],
    outdir: "dist/html",
}).then(e=>e.logs.map(e=>console.log(`${e.level}: ${e.message}`)))
.catch(console.error);
