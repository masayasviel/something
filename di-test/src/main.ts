/** 依存性注入クラスの型 */
interface Type<T> extends Function {
    new (...args: any[]): T;
}

/** DIマッピング用 */
const DIMapper = new Map<string, Object>();

/** クラスにつけるデコレータ */
function mapping(_constructor: Type<any>) {
    DIMapper.set(_constructor.name, new _constructor())
}

/** プロパティに依存性を注入するデコレータ */
function inject (arg: string) {
    return (target: any, member: string): any => {
        return {
            configurable: true,
            enumerable: true,
            value: DIMapper.get(arg),
            writable: true
        };
    };
}

@mapping
class A {
    prop: string;
    constructor() {
        this.prop = 'propA';
    }
}

@mapping
class B {
    @inject('A') private aaa!: A;
    constructor() {
        console.log("A in B")
        console.log(this.aaa)
    }

    get ap(): A {
        return this.aaa;
    }
}

@mapping
class C {
    @inject('B') private bbb!: B;

    constructor() {
        console.log("B in C")
        console.log(this.bbb)
    }

    get bp(): B {
        return this.bbb;
    }
}

console.log(Array.from(DIMapper.entries()))

const ccc = DIMapper.get('C')! as C;
console.log(ccc.bp)
console.log(ccc.bp.ap)
