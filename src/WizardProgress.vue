<template>
    <div class="wizard-progress">
        <a
            v-for="(step, i) in steps"
            :key="i"
            href="#"
            class="wizard-step"
            :class="{'active': i === active, 'disabled': i > highestStep, 'complete': i + 1 <= highestStep}"
            :data-step="i"
            :title="step.label || step.title"
            :style="{width: `${100 / steps.length}%`}"
            @click.prevent="onClick($event, step)">
            <span v-if="step.componentOptions && step.componentOptions.propsData.label" class="wizard-step-label" v-html="step.componentOptions.propsData.label" />
            <span v-else-if="step.componentOptions && step.componentOptions.propsData.title" class="wizard-step-label" v-html="step.componentOptions.propsData.title" />
        </a>
    </div>
</template>

<script>
export default {

    name: 'WizardProgress',

    props: {

        /**
         * The index or key of the active step.
         *
         * @type {String|Number}
         */
        active: {
            type: [String, Number],
            default: 0
        },

        /**
         * The wizard highest available to the user.
         *
         * @type {Array}
         */
        highestStep: {
            type: Number,
            required: true
        },

        /**
         * The wizard steps
         *
         * @type {Array}
         */
        steps: {
            type: Array,
            required: true
        }

    },

    data() {
        return {
            isActive: false
        };
    },

    methods: {

        onClick(event, step) {
            if(!event.target.classList.contains('disabled')) {
                this.$emit('click', event, step);
            }
        }

    }

};
</script>

<style>
.wizard-progress {
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    counter-reset: step;
}

.wizard-step {
    cursor: default;
    display: inline-block;
    list-style-type: none;
    font-size: 1rem;
    position: relative;
    text-align: center;
    text-transform: uppercase;
}

.wizard-step:before {
    width: 40px;
    height: 40px;
    content: counter(step);
    counter-increment: step;
    line-height: 36px;
    font-size: 15px;
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: white;
    position: relative;
    z-index: 1;
    border: 2px solid #008cc0;
    color: #008cc0;
}

.wizard-step:after {
    width: 100%;
    height: 2px;
    content: '';
    position: absolute;
    background-color: #7d7d7d;
    top: 20px;
    left: -50%;
}

.wizard-step:first-child:after {
    content: none;
}

.wizard-step, .wizard-step:hover {
    color: #7d7d7d;
    text-decoration: none;
}

.wizard-step:not(.disabled) {
    cursor: pointer;
}

.wizard-step .wizard-step-label {
    color: #008cc0;
}

.wizard-step.disabled {
    cursor: default;
}

.wizard-step.disabled:before {
    color: #7d7d7d;
    border-color: #7d7d7d;
}

.wizard-step.disabled .wizard-step-label {
    color: #7d7d7d;
}

.wizard-step.complete:before {
    border-color: #55b776;
    color: #55b776;
}

.wizard-step.complete:before {
    content: "✓";
    line-height: 40px;
    font-size: 1em;
    font-weight: bold;
}

.wizard-step.complete + .wizard-step:after {
    background-color: #55b776;
}

.wizard-step-label {
    color: #55b776;
}

.wizard-step.active:before {
    border-color: #b10805;
    color: #b10805;
}

.wizard-step.active .wizard-step-label {
    color: #b10805;
}

.wizard:not(.wizard-finished) .wizard-step.active:hover:before,
.wizard:not(.wizard-finished) .wizard-step.complete:hover:before {
    border-color: #b10805;
    color: #b10805;
}

.wizard:not(.wizard-finished) .wizard-step.complete:hover + .wizard-step:after {
    background-color: #b10805;
}
</style>
