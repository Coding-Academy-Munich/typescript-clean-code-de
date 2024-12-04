// -*- coding: utf-8 -*-
// %% [markdown]
// <!--
// clang-format off
// -->
//
// <div style="text-align:center; font-size:200%;">
//   <b>SOLID: Liskov-Substitutions-Prinzip</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// # SOLID: Liskov Substitutions-Prinzip
//
// Ein Objekt einer Unterklasse soll immer für ein Objekt der Oberklasse
// eingesetzt werden können.

// %% [markdown]
//
// ## LSP Verletzung

// %%
class Rectangle {
    private _length: number = 0;
    private _width: number = 0;

    constructor(length: number = 0, width: number = 0) {
        this._length = length;
        this._width = width;
    }

    get length(): number {
        return this._length;
    }
    set length(value: number) {
        this._length = value;
    }

    get width(): number {
        return this._width;
    }
    set width(value: number) {
        this._width = value;
    }

    get area(): number {
        return this._length * this._width;
    }
}

// %%
class Square extends Rectangle {
    constructor(private side: number = 0) {
        super(side, side);
    }

    override get length(): number {
        return this.side;
    }

    override set length(value: number) {
        this.side = value;
    }

    override get width(): number {
        return this.side;
    }

    override set width(value: number) {
        this.side = value;
    }
}

// %%
const r = new Rectangle(2, 3);

// %%
console.log(r);

// %%
const s = new Square(2, 3);

// %%
console.log(s);

// %%
console.log(new Square(3, 2));

// %%
r.length = 4;
r.width = 3;
console.log(r.area);

// %%
s.length = 4;
s.width = 3;
console.log(s.area);

// %%
r.width = 3;
r.length = 4;
console.log(r.area);

// %%
s.width = 3;
s.length = 4;
console.log(s.area);
