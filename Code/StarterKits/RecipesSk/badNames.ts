// badNames.ts

export interface One {
    aaa: string; // Name
    bbb: string[]; // List of ingredients
    ccc: string; // Instructions
    ddd?: number; // Optional rating
  }

  export class Many {
    private foo: One[] = []; // List of One objects

    constructor(initialFoo: One[] = []) {
      this.foo = initialFoo;
    }

    addThing(thing: One): void {
      this.foo.push(thing);
    }

    getThing(aaa: string): One {
      const found = this.foo.find((item) => item.aaa === aaa);
      if (!found) {
        throw new Error(`recipe ${aaa} not found!`);
      }
      return found;
    }

    getThings1(bbb: string): One[] {
      return this.foo.filter((item) => item.bbb.includes(bbb));
    }

    getThings2(ddd: number): One[] {
      return this.foo.filter((item) => item.ddd === ddd);
    }

    getThings3(ddd: number): One[] {
      return this.foo.filter(
        (item) => item.ddd === undefined || item.ddd >= ddd
      );
    }
  }
