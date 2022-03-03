import { camelCase } from "camel-case";

export default {
    props: {

        /**
         * The index or key of the active step.
         *
         * @type {String|Number}
         */
        active: {
            type: [String, Number],
            default: 0
        },

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

    watch: {
        active(value) {
            this.currentActive = value;
        }
    },

    data() {
        return {
            currentActive: this.active
        };
    },

    computed: {
        context() {
            return this;
        },
        isFirstSlot() {
            return this.currentActive === 0;
        },
        isLastSlot() {
            return this.currentActive === this.slots.length - 1;
        }
    },

    beforeCreate() {
        Object
            .entries(this.$vnode.data.attrs || {})
            .forEach(([key, value]) => {
                this.$options.props[camelCase(key)] = {
                    type: [Function, Boolean],
                    default: value
                };

                delete this.$attrs[key];
            });
    },

    methods: {
        isValid(value) {
            return value === true || typeof value === 'undefined';
        },
        hasCallback(key) {
            return typeof this[key] !== 'undefined';
        },
        callback(key) {
            if(typeof this[key] === 'undefined') {
                return Promise.resolve(true);
            }

            return this.promise(this.value(this[key], this));
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
                return Object.assign(carry, {
                    [key]: this.isValid(this.value(this[camelCase(`validate-${key}`)], this))
                });
            }, {});
        },
        value(value, ...args) {
            return typeof value === 'function'
                ? value.apply(this, args)
                : value;
        }
    }

};