<template>
    <div class="wizard-progress">
        <div
            v-for="(slot, i) in slots"
            :key="i"
            class="wizard-progress-step"
            :class="{
                'active': i === active,
                'disabled': i > highestStep,
                'complete': i + 1 <= highestStep
            }"
            @click.prevent="onClick($event, slot)">
            <div class="wizard-progress-label">
                {{ label(slot) }}
            </div>
        </div>
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
            required: true
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
         * The wizard slots
         *
         * @type {Array}
         */
        slots: {
            type: Array,
            required: true
        }

    },

    methods: {

        label(vnode) {
            return vnode.componentOptions
                && vnode.componentOptions.propsData.label;
        },

        onClick(event, slot) {
            // if(!event.target.classList.contains('disabled')) {
            //     this.$emit('click', event, slot);
            // }
        }

    }

};
</script>

<style>
.wizard-progress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    counter-reset: step;
    margin-bottom: 2rem;
}

.wizard-progress-step {
    flex: 1;
    cursor: default;
    font-size: 1rem;
    position: relative;
    text-align: center;
    text-transform: uppercase;
}

.wizard-progress-step::before {
    width: 40px;
    height: 40px;
    content: counter(step);
    counter-increment: step;
    line-height: 36px;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: white;
    position: relative;
    z-index: 1;
    border: 2px solid #008cc0;
    color: #008cc0;
}

.wizard-progress-step::after {
    width: 100%;
    height: 2px;
    content: '';
    position: absolute;
    background-color: #7d7d7d;
    top: 20px;
    right: 0;
}

.wizard-progress-step:first-child::after,
.wizard-progress-step:last-child::after {
    width: 50%;
}

.wizard-progress-step:last-child::after {
    left: 0;
}

/* .wizard-progress-step:not(.disabled) {
    cursor: pointer;
} */

.wizard-progress-step.disabled {
    cursor: default;
}

.wizard-progress-step.disabled::before {
    color: #7d7d7d;
    border-color: #7d7d7d;
}

.wizard-progress-step.disabled .wizard-progress-step-label {
    color: #7d7d7d;
}

.wizard-progress-step.complete::before {
    border-color: #55b776;
    color: #55b776;
}

.wizard-progress-step.complete::after,
.wizard-progress-step.complete + .wizard-progress-step:last-child::after {
    background: #55b776;
}

.wizard-progress-step.complete + .wizard-progress-step:not(.complete):not(:last-child)::after {
    background: linear-gradient(to right, #55b776 50%, #7d7d7d 50%);
}

.wizard-progress-step.active::before {
    border-color: #b10805;
    color: #b10805;
}

.wizard-progress-step.complete::before {
    content: "✓";
    line-height: 40px;
    font-size: 1em;
    font-weight: bold;
}

/* .wizard-progress-step.complete:not(.active):hover::before {
    border-color: #b10805;
    color: #b10805;
} */
</style>
