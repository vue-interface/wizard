<template>
    <div class="wizard-error">
        <div v-if="icon" class="wizard-error-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="#b10805" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
            </svg>
        </div>

        <h3 v-if="title" class="wizard-error-title" v-html="title" />

        <slot />

        <div class="row justify-content-center">
            <div class="col-sm-6">
                <div v-if="errors" class="my-5">
                    <ul class="mb-0 text-left">
                        <li v-for="(error, i) in errors" :key="i">
                            {{ error[0] }}
                        </li>
                    </ul>
                </div>

                <btn size="lg" variant="danger" block @click="$emit('back')">
                    Go Back
                </btn>
            </div>
        </div>
    </div>
</template>

<script>
import { Btn } from '@vue-interface/btn';
import WizardStep from './WizardStep.vue';

export default {

    name: 'WizardError',

    components: {
        Btn
    },

    extends: WizardStep,

    props: {

        icon: {
            type: String,
            default: 'check'
        },

        title: {
            type: String,
            default: 'Error!'
        },

        errors: [Array, Object]

    }

};
</script>

<style>
.wizard-error {
    text-align: center;
    font-size: 1.25rem;
    padding: calc(1.25rem * 4) 1.25rem;
}

.wizard-error-title {
    font-size: 2.5rem;
    color: #b10805;
}

.wizard-error-icon {
    color: #b10805;
    font-size: 1.25rem;
    border: 5px solid #b10805;
    border-radius: 100%;
    text-align: center;
    width: 7rem;
    height: 7rem;
    margin: 1.25rem auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wizard-error-icon svg {
    width: 100%;
    line-height: 0;
}
</style>
