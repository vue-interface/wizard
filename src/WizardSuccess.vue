<template>
    <div class="wizard-success">
        <div v-if="icon" class="wizard-success-icon">
            <font-awesome-icon :icon="icon" />
        </div>

        <h3 v-if="title" class="wizard-success-title" v-html="title" />

        <slot />
    </div>
</template>

<script>
import WizardStep from './WizardStep';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

library.add(faCheck);

export default {

    name: 'WizardSuccess',

    components: {
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
            default: 'Success!'
        }

    }

};
</script>

<style>
.wizard-success {
    text-align: center;
    font-size: 1.25rem;
    padding: calc(1.25rem * 4) 1.25rem;
}

.wizard-success-title {
    font-size: 2.5rem;
    color: #55b776;
}

.wizard-success-icon {
    color: #55b776;
    font-size: 3.75rem;
    border: 5px solid #55b776;
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

.wizard-success-icon svg {
    width: 100%;
    line-height: 0;
}
</style>
