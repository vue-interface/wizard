import { camelCase } from "camel-case";
import Context from "./Context";

export default {

    mixins: [
        Context
    ],

    props: {
        /**
         * An array of keys that should be validate.
         *
         * @type {Array}
         */
        validate: {
            type: Array,
            default: () => ([
                'back',
                'submit'
            ])
        }
    },
    
    beforeCreate() {
        Object
            .entries(this.$vnode.data.attrs || {})
            .reduce((carry, [key, value]) => {
                delete this.$attrs[key];

                return Object.assign(carry, {
                    [camelCase(key)]: value
                });
            }, this.$vnode.componentOptions.validators = {});
    },

    created() {
        this.validators = this.$vnode.componentOptions.validators;
    },

    data() {
        return {
            validators: {}
        };
    },

    methods: {
        isValid(value) {
            return value === true || typeof value === 'undefined';
        },
        hasCallback(key) {
            return typeof this.validators[key] !== 'undefined';
        },
        callback(key) {
            if(typeof this.validators[key] === 'undefined') {
                return Promise.resolve(true);
            }

            return this.promise(this.value(this.validators[key], this));
        },
        promise(value) {
            if(value instanceof Promise) {
                return value;
            }
            
            if(value instanceof Error) {
                return Promise.reject(error);
            }

            return Promise.resolve(value);
        },
        runValidators() {
            return this.validate.reduce((carry, key) => {
                const validator = this.validators[camelCase(`validate-${key}`)];
                
                return Object.assign(carry, {
                    [key]: this.isValid(this.value(validator, this))
                });
            }, {});
        }
    }

};