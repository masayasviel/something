class MatchExpression<T, U> {
    private target: T;
    private result: U;
    private defaultValue: U;
    private isSet: boolean = false;

    constructor(target: T, defaultValue: U) {
        this.target = target;
        this.result = defaultValue;
        this.defaultValue = defaultValue;
    }

    when(res: U, f: (it: T) => boolean): this {
        if (this.isSet) {
            return this;
        }

        if (f(this.target)) {
            this.result = res;
            this.isSet = true;
        }

        return this;
    }

    run(): U {
        if (!this.isSet) {
            this.result = this.defaultValue;
        }

        return this.result;
    }
}

const res = (new MatchExpression('aaa', 'YYY'))
    .when('bbb', (it) => it === 'zzz')
    .when('ccc', (it) => it > 'zzz')
    .when('ddd', (it) => it === 'aaa')
    .when('eee', (it) => it === 'www')
    .run();

console.log(res);
