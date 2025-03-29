export function darkout(){
    let i;
    let j;
    j = 4;
    while(j){
        j -= 1;
        i = 10;
        while(i){
            i -= 1;
            rect(0, 0, 128, 128, 0b010101 * j);
            redraw();
        }
    }
    return;
}
