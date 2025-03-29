import { loadbinary } from "bge-compiler";
import "./graphics/merge"
import { resolve } from "node:path";

export const graphic = loadbinary("graphic", resolve(__dirname, "graphics/graphics.bin")).substring(2)