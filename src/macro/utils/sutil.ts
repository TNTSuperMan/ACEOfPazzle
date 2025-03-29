import { defn, Expr, If, not, num, Pointer, setP, useSutil, vr, vrP, While, equal, ret } from "bge-compiler";

export const sutil = useSutil();
const isEqual = defn<[Expr, Expr, Expr, Expr, Expr, Expr]>("isequal", (addr00, addr01, addr10, addr11, val0, val1) => {
    const addr0:Pointer = [vr(addr00), vr(addr01)]
    const addr1:Pointer = [vr(addr10), vr(addr11)]
    return[
    If(not(equal(vrP(addr0), vr(val0))),[
        ret(num(0))
    ]),If(not(equal(vrP(addr1), vr(val1))),[
        ret(num(0))
    ]),
    ret(num(1))
]})
export const copy = defn<[Expr, Expr, Expr, Expr, Expr, Expr]>("copy",(start0, start1, len0, len1, to0, to1)=>{
    const i = sutil.defvar();
    const src = sutil.defvar();
    const tod = sutil.defvar();
    return [
        sutil.Store(vr(len0), vr(len1), i),
        sutil.Store(vr(start0), vr(start1), src),
        sutil.Store(vr(to0), vr(to1), tod),
        While(not(isEqual(...sutil.toPtr(i), num(0), num(0))), [
            setP(sutil.Load(tod), vrP(sutil.Load(src))),

            sutil.Sub(...sutil.toPtr(i), num(1)),
            sutil.Add(...sutil.toPtr(src),num(1)),
            sutil.Add(...sutil.toPtr(tod),num(1))
        ]),
        ret()
    ]
})