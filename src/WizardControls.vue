<template>
    <div class="wizard-controls" :class="classes">
        <slot v-bind="context">
            <div class="wizard-controls-left wizard-controls-section">
                <slot name="back" v-bind="context">
                    <btn-activity
                        ref="back"
                        type="button"
                        :activity="!!activity.back"
                        :disabled="!validated.back"
                        :indicator="indicator"
                        :size="size"
                        :variant="value(backVariant)"
                        @click="onClickBack">
                        {{ value(backLabel) }}
                    </btn-activity>
                </slot>
            </div>
            <div class="wizard-controls-right wizard-controls-section">
                <slot name="submit" v-bind="context">
                    <btn-activity
                        ref="submit"
                        type="button"
                        :activity="!!activity.submit"
                        :disabled="!validated.submit"
                        :indicator="indicator"
                        :size="size"
                        :variant="value(submitVariant)"
                        @click="onClickSubmit">
                        {{ value(submitLabel) }}
                    </btn-activity>
                </slot>
            </div>
        </slot>
    </div>
</template>

<script>
import { BtnActivity } from '@vue-interface/btn-activity';
import { Sizeable } from '@vue-interface/sizeable';
import Context from './Context';

export default {

    name: 'WizardControls',

    components: {
        BtnActivity
    },

    mixins: [
        Context,
        Sizeable
    ],

    props: {

        /**
         * An object of key/values to show activity indicators on the buttons.
         *
         * @type {String}
         */
        activity: {
            type: Object,
            default: () => ({})
        },

        /**
         * Override the "Back" button label.
         *
         * @type {String}
         */
        backLabel: {
            type: [Function, String],
            default: 'Back'
        },

        /**
         * The "Back" button variable.
         *
         * @type {String}
         */
        backVariant: {
            type: [Function, String],
            default: 'secondary'
        },

        /**
         * Override the submit button label.
         *
         * @type {String}
         */
        submitLabel: {
            type: [Function, String],
            default() {
                return !this.isLastSlot ? 'Next' : 'Finish';
            }
        },

        /**
         * The submit button variable.
         *
         * @type {String}
         */
        submitVariant: {
            type: [Function, String],
            default: 'primary'
        },

        /**
         * The type of activity indicator to show.
         *
         * @type {Boolean}
         */
        indicator: String,

        /**
         * An array of vnoted passed from the parent.
         *
         * @type {Array}
         */
        slots: {
            type: Array,
            required: true
        },

        /**
         * An object of key/values to disable buttons.
         *
         * @type {String}
         */
        validated: {
            type: Object,
            default: () => ({})
        },

    },

    computed: {
        classes() {
            return {
                [this.sizeableClass]: !!this.size
            };
        }
    },

    methods: {
        onClickBack(e) {
            this.$emit('back', e);
        },
        onClickSubmit(e) {
            this.$emit('submit', e);
        }
    }

};
</script>

<style>
.wizard-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.wizard-controls-section {
    display: grid;
    gap: .5rem;
    grid-auto-flow: column;
    grid-auto-columns: min-content;
}
</style>