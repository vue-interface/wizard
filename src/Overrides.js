export default {

    props: {
        /**
         * The buttons for the wizard.
         *
         * @type {Array}
         */
        buttons: {
            type: Object,
            required: true
        }
    },
    
    beforeCreate() {
        this.$vnode.componentOptions.overrides = Object
            .entries(this.$vnode.data.attrs || {})
            .reduce((carry, [key, value]) => {
                // delete this.$attrs[key];

                return Object.assign(carry, {
                    [key]: value
                });
            }, {});
    },

    created() {
        this.overrides = this.$vnode.componentOptions.overrides || {};
    },

    // mounted() {
    //     this.runOverrides();

    //     setTimeout(() => {
    //         this.$forceUpdate();
    //     }, 1000);
    // },
    
    data() {
        return {
            overrides: null
        };
    },

    methods: {
        hasCallback(key) {
            return typeof this.overrides[key] !== 'undefined';
        },
        callback(key) {
            if(typeof this.overrides[key] === 'undefined') {
                return Promise.resolve(true);
            }

            return this.promise(this.value(this.overrides[key], this));
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
        runOverrides(buttons) {
            for(let [key, button] of Object.entries(buttons || this.buttons)) {
                for(let [prop, value] of Object.entries(button)) {
                    this.buttons[key][prop] = this.value(
                        this.overrides[`${key}-${prop}`] || value
                    );
                }
            }

            return this.buttons;
        }
    }

};