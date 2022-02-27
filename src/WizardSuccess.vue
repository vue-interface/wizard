<template>
    <div class="wizard-success">
        <div class="wizard-success-icon">
            <slot name="icon" v-bind="this">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="#55b776" d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
                </svg>
            </slot>
        </div>

        <h3 v-if="title" class="wizard-success-title" v-html="title" />

        <slot v-bind="this" />
    </div>
</template>

<script>
import { Sizeable } from '@vue-interface/sizeable';

export default {

    name: 'WizardSuccess',

    mixins: [
        Sizeable
    ],

    props: {

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
