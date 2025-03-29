import "../../macro";
export function copy(src = 0n, i = 0n, to = 0n){

    while(i.top != 0 || i.bottom != 0){
        $("set*", to, $("get*", src));
        src += 1;
        to += 1;
        i -= 1;
    }
    return;
}
