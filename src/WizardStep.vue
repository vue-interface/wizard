<script>
import Context from './Context';
import Overrides from './Overrides';

export default {

    name: 'WizardStep',

    mixins: [
        Context,
        Overrides
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
        console.log('updated');
        
        this.$nextTick(this.performValidityChecks);
    },

    methods: {

        performValidityChecks() {
            this.$emit('validate', this.runOverrides());
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
