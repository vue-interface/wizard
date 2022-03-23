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
                    :props="{active: currentActive, validate}"
                    @enter="onEnter"
                    @leave="onLeave">
                    <slot />
                </slide-deck>
            </div>
            <slot name="controls" v-bind="this">
                <wizard-controls
                    v-if="mounted && controls"
                    ref="controls"
                    :activity="activity"
                    :active="currentActive"
                    :validated="validated"
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
import Validators from './Validators';

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
        Sizeable,
        Validators
    ],

    props: {

        /**
         * An object of key/values to show activity indicators on the buttons.
         *
         * @type {String}
         */
        activity: {
            type: Object,
            default() {
                return this.validate.reduce((carry, key) => {
                    return Object.assign(carry, {
                        [key]: false
                    });
                }, {});
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

        // /**
        //  * The the index or key of the max completed step.
        //  *
        //  * @type {String|Number}
        //  */
        // completed: [String, Number],

        /**
         * Extract the errors message display from the Error instance.
         */
        errors: Function,

        /**
         * This method gets triggered when the submit failed.
         *
         * @type Function
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
         * This method gets triggered when the submit succeeds.
         *
         * @type Function
         */
        success: {
            type: Function,
            default: function(response) {
                this.response = response;
                this.error = null;
                this.finished = true;
            }
        },

        /**
         * The default validator for the back button.
         *
         * @type {Function|Boolean}
         */
        validateBack: {
            type: [Function, Boolean],
            default() {
                return this.currentActive > 0;
            }
        }
    },

    data() {
        return {
            error: null,
            finished: false,
            highestStep: 0,
            mounted: false,
            response: null,
            slots: [],
            validated: this.validate.reduce((carry, key) => {
                return Object.assign(carry, {
                    [key]: true
                });
            }, {})
        };
    },

    computed: {
        classes() {
            return {
                [this.sizeableClass]: !!this.size
            };
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.mounted = true;
            this.slots = this.$refs.slideDeck.slots();
        });
    },

    methods: {

        checkValidity(prop, ...args) {
            return !!this.value(this[prop], ...args);
        },

        disableButtons() {
            Object.keys(this.validated).forEach(key => {
                this.disable(key);
            });
        },

        disable(key) {
            this.validated[key] = true;
        },

        emitBubbleEvent(key, ...args) {
            args = [key].concat(args);

            const instance = this.$refs.slideDeck.slot().componentInstance;

            instance.$emit.apply(instance, args);

            this.$emit.apply(this, args);
        },

        enableButtons() {
            Object.keys(this.validated).forEach(key => {
                this.enable(key);
            });
        },

        enable(key) {
            this.validated[key] = false;
        },

        handleButtonClick(event, key) {
            if(!this.slot().hasCallback(key)) {
                return Promise.resolve();
            }
            
            return new Promise((resolve, reject) => {
                this.activity[key] = true;
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
            this.$resf.slideDeck.goto(index);
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

        onClickBack(event) {
            this.emitBubbleEvent('back', event, this);
            
            if(event.defaultPrevented) {
                return;
            }
            this.handleButtonClick(event, 'back')
                .then(this.prev)
                .finally(() => {
                    this.activity.back = false;
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
                this.handleButtonClick(event, 'submit')
                    .then(this.next)
                    .finally(() => {
                        this.activity.submit = false;
                    });
            }
            else {
                this.handleButtonClick(event, 'submit').then(response => {
                    if(this.hasCallback('submit')) {
                        this.callback('submit').finally(() => {
                            this.activity.submit = false;
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

            slide.componentInstance.$on('validate', this.onValidate);
            slide.componentInstance.onEnter(slide, prevSlide);
        },

        onFix(event, error) {
            this.$emit('fix', event, error, this);
            
            if(!event.defaultPrevented) {
                this.finished = false;
            }
        },

        onLeave(slide, prevSlide) {
            prevSlide.componentInstance.$off('validate', this.onValidate);

            this.$nextTick(() => {
                slide.componentInstance.onLeave(slide, prevSlide);
            });
        },

        onValidate(validated) {
            const global = this.runValidators();

            this.validated = this.validate.reduce((carry, key) => {
                return Object.assign(carry, {
                    [key]: validated[key] && global[key]
                });
            }, {});
        }

    }

};
</script>

<style>
.wizard .wizard-content {
    margin-bottom: 1rem;
}
/* .wizard .wizard-content {
    padding: .5rem;
}

.wizard .wizard-content + hr {
    margin-bottom: 0;
}

.wizard .wizard-buttons {
    padding: 1rem;
} */
</style>
