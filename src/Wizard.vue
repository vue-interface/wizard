<template>
    <div class="wizard" :class="classes">
        <template v-if="!finished">
            <slot name="progress" v-bind="context">
                <wizard-progress
                    v-if="mounted && slots.length > 1"
                    :active="currentActive"
                    :highest-step="highestStep"
                    :slots="slots"
                    @click="onClickProgress" />
            </slot>

            <slot name="header" v-bind="context" />
            
            <div class="wizard-content">
                <slide-deck
                    ref="slideDeck"
                    :active="currentActive"
                    :props="{
                        active: currentActive,
                        buttons: currentButtons
                    }"
                    @enter="onEnter"
                    @leave="onLeave">
                    <slot />
                </slide-deck>
            </div>
            <slot name="controls" v-bind="this">
                <wizard-controls
                    v-if="mounted && controls"
                    ref="controls"
                    :active="currentActive"
                    :buttons="currentButtons"
                    :size="size"
                    :slots="slots"
                    @back="onClickBack"
                    @submit="onClickSubmit">
                    <template #back="context">
                        <slot name="back" v-bind="context" />
                    </template>
                    <template #submit="context">
                        <slot name="submit" v-bind="context" />
                    </template>
                </wizard-controls>
            </slot>
        </template>
        <template v-else-if="error">
            <slot name="error">
                <wizard-error
                    :error="error"
                    :extract="errors"
                    :size="size"
                    @fix="onFix">
                    <template #default>
                        <slot name="error-content" />
                    </template>
                </wizard-error>
            </slot>
        </template>
        <template v-else>
            <slot name="success">
                <wizard-success :size="size">
                    <template #default>
                        <slot name="success-content" />
                    </template>
                </wizard-success>
            </slot>
        </template>
    </div>
</template>

<script>
import { Sizeable } from '@vue-interface/sizeable';
import { SlideDeck } from '@vue-interface/slide-deck';
import WizardControls from './WizardControls.vue';
import WizardError from './WizardError.vue';
import WizardProgress from './WizardProgress.vue';
import WizardSuccess from './WizardSuccess.vue';
import Context from './Context';

const defaultButton = {
    activity: false,
    align: 'right',
    disabled: false,
    label: undefined,
    ref: undefined,
    variant: 'secondary',
};

export default {

    name: 'Wizard',

    components: {
        SlideDeck,
        WizardControls,
        WizardError,
        WizardProgress,
        WizardSuccess,
    },

    mixins: [
        Context,
        Sizeable,
    ],

    props: {
        /**
         * The buttons for the wizard.
         *
         * @type {Array}
         */
        buttons: {
            type: Object,
            default() {
                return {
                    back: {
                        activity: false,
                        align: 'left',
                        disabled: false,
                        label: 'Back',
                        ref: 'back',
                        variant: 'secondary',
                    },
                    submit: {
                        activity: false,
                        align: 'right',
                        disabled: false,
                        label: () => !this.isLastSlot ? 'Next' : 'Submit',
                        ref: 'submit',
                        variant: 'primary',
                    }
                };
            }
        },

        /**
         * Show the wizard controls container.
         *
         * @type {Boolean}
         */
        controls: {
            type: Boolean,
            default: true
        },

        /**
         * Extract the errors message display from the Error instance.
         * 
         * @type {Function}
         */
        errors: Function,

        /**
         * This method gets triggered when the submit failed.
         *
         * @type {Function}
         */
        failed: {
            type: Function,
            default: function(e) {
                this.response = null;
                this.error = e;
                this.finished = true;
            }
        },

        /**
         * Pass a header as a string.
         *
         * @type {String}
         */
        header: String,

        /**
         * The type of activity indicator to show.
         *
         * @type {Boolean}
         */
        indicator: String,

        /**
         * Called after the wizard has been submitted.
         * 
         * @type {Function}
         */
        submit: Function,

        /**
         * This method gets triggered when the submit succeeds.
         *
         * @type {Function}
         */
        success: {
            type: Function,
            default: function(response) {
                this.response = response;
                this.error = null;
                this.finished = true;
            }
        }
    },

    data() {
        return {
            currentButtons: null,
            error: null,
            finished: false,
            highestStep: 0,
            mounted: false,
            response: null,
            slots: []
        };
    },

    computed: {
        classes() {
            return {
                [this.sizeableClass]: !!this.size
            };
        }
    },

    beforeMount() {
        this.resetButtons();
    },

    mounted() {
        this.$nextTick(() => {
            this.mounted = true;
            this.slots = this.$refs.slideDeck.slots();
        });
    },

    methods: {

        activate(key) {
            this.$set(this.currentButtons[key], 'activity', true);
        },

        checkValidity(prop, ...args) {
            return !!this.value(this[prop], ...args);
        },

        deactivate(key) {
            this.$set(this.currentButtons[key], 'activity', false);
        },

        disableButtons() {
            Object.keys(this.currentButtons).forEach(key => {
                this.disable(key);
            });
        },

        disable(key) {
            this.$set(this.currentButtons[key], 'disabled', true);
        },

        emitBubbleEvent(key, ...args) {
            args = [key].concat(args);

            const instance = this.$refs.slideDeck.slot().componentInstance;

            instance.$emit.apply(instance, args);

            this.$emit.apply(this, args);
        },

        enableButtons() {
            Object.keys(this.currentButtons).forEach(key => {
                this.enable(key);
            });
        },

        enable(key) {
            this.$set(this.currentButtons[key], 'disabled', false);
        },

        handleButtonCallback(key, method) {
            if(!this.slot().hasCallback(key)) {
                return Promise.resolve();
            }
            
            return new Promise((resolve, reject) => {
                this.activate(key);
                this.slot().callback(key).then(value => {
                    if(this.isValid(value)) {
                        resolve();
                    }
                    else {
                        reject(null);
                    }
                }, reject);
            });
        },

        goto(index) {
            this.$refs.slideDeck.goto(index);
        },

        isValid(value) {
            return value === true || typeof value === 'undefined';
        },
        
        next() {
            this.$refs.slideDeck.next();
        },
        
        prev() {
            this.$refs.slideDeck.prev();
        },

        slot() {
            return this.$refs.slideDeck.slot().componentInstance;
        },

        resetButtons() {
            return this.currentButtons = Object.fromEntries(
                Object.entries(this.buttons).map(([key, button]) => ([
                    key, Object.assign({}, defaultButton, button)
                ]))
            );  
        },

        onClickBack(event) {
            this.emitBubbleEvent('back', event, this);
            
            if(event.defaultPrevented) {
                return;
            }

            this.handleButtonCallback('back', 'click')
                .then(this.prev)
                .finally(() => {
                    this.deactivate('back');
                });
        },
        
        onClickProgress(event, slide) {
            // Need to properly implement this with validation...
        },

        onClickSubmit(event) {
            this.emitBubbleEvent(
                !this.isLastSlot ? 'next' : 'submit', event, this
            );
            
            if(event.defaultPrevented) {
                return;
            }
            
            if(!this.isLastSlot) {
                this.handleButtonCallback('submit', 'click')
                    .then(this.next)
                    .finally(() => {
                        this.deactivate('submit');
                    });
            }
            else {
                this.handleButtonCallback('submit', 'click').then(response => {
                    if(this.submit) {
                        Promise.resolve(this.submit(this)).finally(() => {
                            this.deactivate('submit');
                        });
                    }
                    else if(response instanceof Error) {
                        this.failed(response);
                    }
                    else {
                        this.success(response);
                    }
                });
            }
        },

        onEnter(slide, prevSlide) {
            this.currentActive = this.$refs.slideDeck.currentActive;
            this.highestStep = Math.max(this.highestStep, this.currentActive);

            slide.componentInstance.onEnter(slide, prevSlide);

            this.$nextTick(() => {
                this.currentButtons = slide.componentInstance.runOverrides(this.resetButtons());
            });
        },

        onFix(event, error) {
            this.$emit('fix', event, error, this);
            
            if(!event.defaultPrevented) {
                this.finished = false;
            }
        },

        onLeave(slide, prevSlide) {
            this.$nextTick(() => {
                slide.componentInstance.onLeave(slide, prevSlide);
            });
        }

    }

};
</script>

<style>
.wizard .wizard-content {
    margin-bottom: 1rem;
}
</style>
