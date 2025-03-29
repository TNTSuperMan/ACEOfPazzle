import * as fs from "node:fs"
import { resolve } from "node:path";
const merged:{data:number[][]}[] = []
fs.readdirSync(__dirname).sort().forEach(e=>
    /\.json$/.test(e) ?
    merged.push(
        ...JSON.parse(
            fs.readFileSync(resolve(__dirname, e)).toString())):0)

export default merged;