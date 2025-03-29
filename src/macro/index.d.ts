declare function $(type: "bigset", target: bigint, var1: number, var2: number): void;
declare function $(type: "set*", addr: bigint, value: number): void;
declare function $(type: "get*", addr: bigint): number;
declare function $(type: "color", r: number, g: number, b: number, flag?: 0 | 1 | 2 | 3): number;
declare function $(value: boolean): bigint;
declare function $(type: "graph"): bigint;
declare function $(type: "glen"): bigint;
declare function $(type: "resource"): void;