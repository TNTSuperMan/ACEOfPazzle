import "../../macro";

export function draw(){
    let addr = 0n;
    addr = 0xa100n;
    while(addr.bottom != 16){
        if($("get*", addr) != 0){
            rect(
                (addr.bottom % 4) * 32 + 2,
                (addr.bottom / 4) * 32 + 2,
                28, 28, $("color", 0, 3, 3));
            graph(52 + $("get*", addr) % 10,
                (addr.bottom % 4) * 32 + 16,
                (addr.bottom / 4) * 32 + 16);
            if($("get*",addr) > 9){
                graph(53,
                    (addr.bottom % 4) * 32 + 8,
                    (addr.bottom / 4) * 32 + 16);
            }
        }
        addr += 1;
    }
    redraw();
    return;
}
