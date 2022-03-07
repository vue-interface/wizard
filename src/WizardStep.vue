<script>
import Context from './Context';

export default {

    name: 'WizardStep',

    mixins: [
        Context
    ],

    props: {

        /**
         * The step's label in the progress bar.
         *
         * @type {String}
         */
        label: String

    },

    updated() {
        this.$nextTick(this.performValidityChecks);
    },

    methods: {

        performValidityChecks() {
            this.$emit('validate', this.runValidators());
        },

        onEnter(...args) {
            this.performValidityChecks();
            this.$emit('enter', ...args);
        },

        onLeave(...args) {
            this.$emit('leave', ...args);
        }

    },

    render(createElement) {
        return createElement('div', {
            staticClass: 'wizard-slot'
        }, this.$slots.default);
    }

};
</script>
