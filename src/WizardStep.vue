<script>
import { camelCase } from "camel-case";
import Context from './Context';
import Validators from './Validators';

export default {

    name: 'WizardStep',

    mixins: [
        Context,
        Validators
    ],

    props: {

        /**
         * The step's label in the progress bar.
         *
         * @type {String}
         */
        label: String,

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
