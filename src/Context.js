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
    
    methods: {
        value(value, ...args) {
            return typeof value === 'function'
                ? value.apply(this, args)
                : value;
        }
    }

};