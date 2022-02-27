<template>
    <div class="wizard" :class="classes">
        <template v-if="!finished">
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
        <template v-else-if="!error">
            <slot name="success">
                <wizard-success :size="size">
                    <template #default>
                        <slot name="success-content" />
                    </template>
                </wizard-success>
            </slot>
        </template>
        <template v-else>
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

export default {

    name: 'Wizard',

    components: {
        SlideDeck,
        WizardControls,
        WizardError,
        WizardSuccess
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
            default() {
                //
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
         * This method gets triggered when the submit succeeded.
         *
         * @type Function
         */
        submit: {
            type: Function,
            default() {
                console.log('success');
                // this.success();
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
            validated: this.validate.reduce((carry, key) => {
                return Object.assign(carry, {
                    [key]: true
                });
            }, {}),
            finished: false,
            mounted: false,
            response: null,
            slots: [],
            // currentStep: this.index(),
            // highestStep: this.index(this.completed),
            // isBackButtonDisabled: true,
            // isNextButtonDisabled: true,
            // isFinishButtonDisabled: true
        };
    },

    computed: {
        classes() {
            return {
                [this.sizeableClass]: !!this.size
            };
        }
    },

    watch: {

        // active() {
        //     this.currentStep = this.index();
        // },

        // currentStep(value) {
        //     this.$emit('update:active', value);
        // }

    },

    mounted() {
        this.$nextTick(() => {
            this.mounted = true;
            this.slots = this.$refs.slideDeck.slots();
        });

        // const slide = this.$refs.slideDeck.slide(this.currentStep);

        // if(slide) {
        //     (slide.componentInstance || slide.context).$refs.wizard = this;
        //     (slide.componentInstance || slide.context).$emit('enter');
        //     this.$emit('enter', slide);
        // }

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

        handleClickNext(event) {
            this.emitBubbleEvent('next', event, this);
                
            if(event.defaultPrevented) {
                return;
            }

            this.next();
        },

        handleClickSubmit(event) {            
            this.emitBubbleEvent('submit', event, this);
                
            if(event.defaultPrevented) {
                return;
            }

            const promise = this.submit();

            if(promise instanceof Promise) {
                this.activity.submit = true;

                promise.then(response => {
                    this.success(this.response = response);
                }, e => {
                    this.failed(this.error = e);
                }).finally(() => {
                    this.finished = true;
                    this.activity.submit = false;
                });
            }
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

        success() {
            this.error = null;
            this.finished = true;
        },

        onClickBack(event) {
            this.emitBubbleEvent('back', event);

            if(!event.defaultPrevented) {
                this.prev();
            }
        },

        onClickSubmit(event) {
            if(!this.isLastSlot) {
                this.handleClickNext(event);
            }
            else {
                this.handleClickSubmit(event);
            }
        },

        onEnter(slide, prevSlide) {
            this.currentActive = this.$refs.slideDeck.currentActive;
            
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
            slide.componentInstance.onLeave(slide, prevSlide);
        },

        onValidate(validated) {
            const global = this.runValidators();

            this.validated = this.validate.reduce((carry, key) => {
                return Object.assign(carry, {
                    [key]: validated[key] && global[key]
                });
            }, {});
        },

        // onProgressClick(event, slide) {
        //     if(this.$refs.slideDeck) {
        //         this.currentStep = this.$refs.slideDeck.$refs.slides.getSlideIndex(slide);
        //     }
        //     else {
        //         this.finished = false;
        //         this.currentStep = this.index(slide.key);
        //     }
        // }

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
