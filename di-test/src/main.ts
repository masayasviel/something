interface Type<T> extends Function {
    new (...args: any[]): T;
}

const DIMapper = new Map<string, Object>();

function di(_constructor: Type<any>) {
    DIMapper.set(_constructor.name, new _constructor())
}

function ch (arg: string) {
    return (target: any, member: string): any => {
        return {
            configurable: false,
            enumerable: false,
            value: DIMapper.get(arg),
            writable: true
        };
    };
}

@di
class A {
    prop: string;
    constructor() {
        this.prop = 'propA';
    }
}

@di
class B {
    @ch('A') private aaa!: A;
    constructor() {}

    getAaa() {
        console.log(this.aaa)
    }
}

@di
class C {
    @ch('B') private bbb!: B;

    constructor() {}

    getBbb() {
        this.bbb.getAaa()
    }
}

console.log(Array.from(DIMapper.entries()))

const ccc = DIMapper.get('C')! as C;
ccc.getBbb()
