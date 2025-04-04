import { useLibkey } from "libkey";
import { createRuntime } from "./runtime";

export const start = async () => {
    const canvas = document.querySelector("canvas");
    if(!canvas) return alert("Failed to find canvas element");

    const ctx = canvas.getContext("2d");
    if(!ctx) return alert("Failed to get 2d canvas context");

    const { state } = useLibkey(document.body);

    const runtime = await createRuntime({
        ctx,
        key: ()=>parseInt([
            state.keys.has("ArrowUp"),
            state.keys.has("ArrowDown"),
            state.keys.has("ArrowLeft"),
            state.keys.has("ArrowRight"),
            state.keys.has("KeyV"),
            state.keys.has("KeyC"),
            state.keys.has("KeyZ"),
            state.keys.has("KeyX"),
          ].map(e=>e?"1":"0").join(""), 2),
        onRedraw: ()=>{
            try{
                const err = runtime.EmulateFrame();
                if(err)
                    alert("GameEngineError: " + err);
            }catch(e){
                if(e instanceof Error)
                    alert(`JavaScript Error ${e.name}: ${e.message}`);
            }
        },
        saveSRAM(){},
        loadSRAM(){return new Uint8Array}
    });
    runtime.EmulateFrame();
}
