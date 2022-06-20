<template>
    <div class="wizard-controls" :class="classes">
        <slot v-bind="context">
            <div class="wizard-controls-left wizard-controls-section">
                <slot name="back" v-bind="context">
                    <btn-activity
                        v-for="([key, button]) in Object.entries(buttons).filter(([key, button]) => button.align && button.align === 'left')"
                        :ref="key"
                        :key="`button-${key}`"
                        type="button"
                        :activity="!!button.activity"
                        :disabled="!!button.disabled"
                        :indicator="indicator"
                        :size="size"
                        :variant="value(button.variant)"
                        @click="e => $emit(key, e)">
                        {{ value(button.label) }}
                    </btn-activity>
                </slot>
            </div>
            <div class="wizard-controls-right wizard-controls-section">
                <slot name="submit" v-bind="context">
                    <btn-activity
                        v-for="([key, button]) in Object.entries(buttons).filter(([key, button]) => !button.align || button.align === 'right')"
                        :ref="key"
                        :key="`button-${key}`"
                        type="button"
                        :activity="!!button.activity"
                        :disabled="!!button.disabled"
                        :indicator="indicator"
                        :size="size"
                        :variant="value(button.variant)"
                        @click="e => $emit(key, e)">
                        {{ value(button.label) }}
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
         * The buttons to appear in the wizard.
         *
         * @type {String}
         */
        buttons: {
            type: Object,
            required: true
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
        }

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
}
</style>