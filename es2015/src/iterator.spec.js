import { assert, expect, should } from "chai";
import { Iterable, Iterator, IteratorResult, toIterable } from './iterator';

describe("Iterator Tests", () => {
    it("toIterable test", (done) => {
        let obj = {
            a: 1,
            b: "a",
            c: true,
            d: [1, 2, 3],
            e: () => {}
        };

        toIterable(obj);
        let props = [...obj];
        let it = obj[Symbol.iterator]();
        
        assert(
            it[Symbol.toStringTag] !== "Generator", 
            "The iterator must be hand coded!"
        );
        assert(
            props.length === Object.keys(obj).length, 
            `the properties length must be ${Object.keys(obj).length}`
        );
        
        for (let prop of obj) {
            assert( 
                prop.key != undefined && prop.value != undefined,
                'The iteration value must be a key/value object'
            );
            assert(
                obj.hasOwnProperty(prop.key),
                `the property '${prop.key}' does not exists on the object`
            );
            assert(
                prop.value === obj[prop.key],
                `the property '${prop.key}' must have the value ${obj[prop.key]}` 
            );
        }
        done();
    });

    it("IteratorResult class test", (done) => {
        let iterationResult = new IteratorResult(1, false);
        assert(
            iterationResult.value === 1,
            "The IteratorResult value property must be 1"
        );

        assert(
            iterationResult.done === false,
            "The IteratorResult done property must be false"
        );
        done();
    });

    it("Iterator class test", (end) => {
        let values = [ 
           Math.floor((Math.random() * 100) + 1), 
           Math.floor((Math.random() * 100) + 1),
           Math.floor((Math.random() * 100) + 1)
        ];
        let i = 0;
        let iterator = new Iterator(() => {
            if (i < values.length) {
                return values[i++];
            }
        });

        assert(
            typeof iterator.next === 'function',
            "The Iterator next property must be  a function"
        );

        let iterationResult = iterator.next();
        assert(
             iterationResult.value === values[0] && iterationResult.done === false,
             `The first iteration result value must be ${values[0]} and must not be done`
        );
        iterationResult = iterator.next();
        assert(
             iterationResult.value === values[1] && iterationResult.done === false,
             `The second iteration result value must be ${values[1]} and must not be done`
        );
        iterationResult = iterator.next();
        assert(
             iterationResult.value === values[2] && iterationResult.done === false,
             `The third iteration result value must be ${values[2]} and must not be done`
        );
        iterationResult = iterator.next(); 
        assert(
             iterationResult.value === undefined && iterationResult.done === true,
             `The last iteration result value must be undefined and must be done`
        );
        end();
    });
});