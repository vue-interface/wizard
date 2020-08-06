<template>
    <div class="wizard-error">
        <div v-if="icon" class="wizard-error-icon">
            <i :class="icon" size="3x" />
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
                    <font-awesome-icon icon="long-arrow-alt-left" /> Go Back
                </btn>
            </div>
        </div>
    </div>
</template>

<script>
import Btn from '@vue-interface/btn';
import WizardStep from './WizardStep';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';

library.add(faCheck);
library.add(faLongArrowAltLeft);

export default {

    name: 'WizardError',

    components: {
        Btn,
        FontAwesomeIcon
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
