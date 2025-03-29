import { $ } from "bun";
import { resolve } from "path";

const run = (): unknown =>
    $`bun ${resolve(__dirname, "hot-program.ts")}`
        .then(()=>console.log("Hard reload!")).then(run);
run();
