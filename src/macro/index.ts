import { Bundle, defres } from "bge-compiler";
import "./graphics/merge"
import type { MacroType } from "bgex-compiler"
import type { BGEXScope } from "bgex-compiler/src/compile";
import { compileExpression } from "bgex-compiler/src/compile/expr";
import type { Variable } from "bgex-compiler/src/compile/var";
import { parseExpression } from "bgex-compiler/src/parse/expr";
import { graphic } from "./resources";
import { readFileSync } from "fs";
import { resolve } from "path";
 
const findVar = (scope: BGEXScope, name: string) =>
    scope.vars.reduceRight<Variable|void>((v, c) => v || c.get(name), undefined);
const ptr2asm = (ptr: number) => 
    `${Math.floor(ptr/256).toString(16).padStart(2, "0")} ${(ptr%256).toString(16).padStart(2, "0")}`
const compile = (scope: BGEXScope, expr: MacroType extends 
    (scope: BGEXScope, ...args: (infer P)[]) => string ? P : never, isbig?: boolean) =>
        expr.type != "SpreadElement" ?
            compileExpression(scope, parseExpression(expr), isbig) :
            undefined;

const textMap: Map<string, string> = new Map;

const macro: MacroType = (scope, ...args): string => {
    if(args[0]?.type == "Literal"){
        switch(args[0].value){
            case "set*":
                if(!args[1] || !args[2]) throw new Error("Argument count not match");
                const addr = compile(scope, args[1], true);
                const value = compile(scope, args[2]);
                if(addr && value){
                    return `${value} ${addr.startsWith("!")?addr.substring(1):addr} store`;
                }else throw new Error("Could not to find variable");
            case "get*":
                if(!args[1]) throw new Error("Argument count not match");
                const _addr = compile(scope, args[1], true);
                if(_addr){
                    return `${_addr.startsWith("!") ? _addr.substring(1) : _addr} load`;
                }else if(args[1]?.type == "Literal" && typeof args[1].value == "bigint"){
                    return `${ptr2asm(Number(args[1].value))} load`;
                }else throw new Error("Cannot read as simple bigint");
            case "color":
                if(args.length < 3) throw new Error("Not specified RGB Arguments");
                const r = args[1]?.type == "Literal" ? args[1].value : undefined;
                const g = args[2]?.type == "Literal" ? args[2].value : undefined;
                const b = args[3]?.type == "Literal" ? args[3].value : undefined;
                const f = args[4]?.type == "Literal" ? args[4].value : 0;
                if(typeof r == "number" && typeof g == "number" && typeof b == "number" && typeof f == "number"){
                    return ((f << 6) | (r << 4) | (g << 2) | (b << 0)).toString(16).padStart(2,"0");
                }else throw new Error(`Arguments must be number literal(${typeof r},${typeof g},${typeof b},${typeof f})`);
            case "graph":
                return graphic + "/";
            case "glen":
                return ptr2asm(readFileSync(resolve(__dirname,"graphics","graphics.bin")).length);
            case "resource":
                return "\n" + Bundle([]);
        }
    }else if(args[0]?.type == "UnaryExpression"){
        if(args[0].operator == "!"){
            const value = args[0].argument.type == "Literal" ? args[0].argument.value : undefined;
            if(typeof value != "string") throw new Error("This data is not string")
            else{
                const alr = textMap.get(value);
                if(alr) return alr;
                else{
                    const data = defres("text_" + value.replaceAll(" ","_"), [
                        ...value.split("").map(e=>{
                            const p = (e: string) => e.charCodeAt(0);
                            if(p("A") <= p(e) && p(e) <= p("Z")) return p(e) - p("A");
                            if(p("a") <= p(e) && p(e) <= p("z")) return p(e) - p("a") + 26;
                            if(p("0") <= p(e) && p(e) <= p("9")) return p(e) - p("0") + 52;
                            switch(e){
                                case "-": return 62;
                                case "!": return 63;
                                case "?": return 64;
                                case ",": return 65;
                                case ".": return 66;
                                case "(": return 67;
                                case ")": return 68;
                                case "'": return 69;
                                case ":": return 70;
                                case "$": return 71;
                                case ">": return 72;
                                case " ": return 73;
                                default: throw new Error("Unknown char: " + e);
                            }
                        }).map(e=>String.fromCharCode(e)),
                        String.fromCharCode(0xff)
                    ].join("")).substring(2)+"/";
                    textMap.set(value, data);
                    return data;
                }
            }
        }
    }
    return "";
}
export default macro;