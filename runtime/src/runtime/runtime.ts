
import init, { Runtime as BGERuntime } from "bge-wasm/web";
import wasm from "bge-wasm/wasm";
//@ts-ignore
import rompath from "../../../dist/out.bin";

const initP = init(wasm as any).then(e=>e.init_panic_fook());

const rom = fetch(rompath).then(e=>e.arrayBuffer()).then(e=>new Uint8Array(e));

export type Runtime = {
  EmulateFrame: () => string | void,
  Load: (addr: number) => number,
  Store: (addr: number, value: number) => void
}

export const createRuntime = async function({ctx, key, onRedraw}: {
  ctx: CanvasRenderingContext2D,
  key: ()=>number,
  saveSRAM: (data: Uint8Array) => void,
  loadSRAM: () => Uint8Array,
  onRedraw: () => void
}): Promise<Runtime>{
  await initP;
  const toSigned = (e:number) => {
    if(e < 128){
      return e;
    }else{
      return -(256 - e);
    }
  }
  const runtime = new BGERuntime(await rom, false);
  let images: HTMLImageElement[] = [];
  return {
    EmulateFrame(){
      runtime.set_key_state(key());
      const result = runtime.emulate_frame();
      if(result){
        console.error(result);
        console.log({
          pc: runtime.get_pc(),
          stack: Array.from(runtime.get_stack()),
          callstack: Array.from(runtime.get_callstack())
        })
        return result;
      }
      const state = runtime.frame_state();
      if(state._do_updimg){
        images.forEach(e=>URL.revokeObjectURL(e.src));
        images = state.get_imgs().map(e=>{
          const img = new Image();
          img.src = URL.createObjectURL(new Blob([e.get()],{type:"image/png"}));
          return img;
        })
      }
      requestAnimationFrame(()=>{
        if(state._do_redraw){
          ctx.clearRect(0,0,128,128);
          state.get_disps().forEach(e=>{
            if(e.is_graph){
              if(images.length > e.gid)
                ctx.drawImage(images[e.gid], toSigned(e.x), toSigned(e.y));
            }else if(e.a){
              ctx.fillStyle = `rgb(${e.r},${e.g},${e.b})`;
              ctx.fillRect(toSigned(e.x),toSigned(e.y),e.w,e.h);
            }
            e.free();
          });
          state.free();
        }
        onRedraw();
      })
    },
    Load: a=>runtime.load(a),
    Store: (a,v)=>runtime.store(a,v)
  }
}
