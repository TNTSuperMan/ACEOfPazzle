import "../../macro"
function drawText_raw(x, y, space, text = 0n){
    while($("get*",text) != 0xff){
        graph($("get*",text), x, y);
        text += 1;
        x += space;
    }
    return;
}

export function drawTextWithSpace(x, y, space, text = 0n){
    drawText_raw(x, y, space, text);
    return;
}

export function drawText(x, y, text = 0n){
    drawText_raw(x, y, 6, text);
    return;
}
