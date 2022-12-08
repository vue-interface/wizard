<script lang="ts">
import { Wizard, WizardStep } from '../index';

export const wizard = $ref();

function submit() {
    console.log(wizard);
}

export default {
    components: {
        Wizard,
        WizardStep
    },
    setup() {
        return {
            wizard,
            submit
        };
    }
}

</script>

<template>
    <div>
        <wizard 
            ref="wizard"
            size="lg">
                <wizard-step
                    label="Age"
                    :submit="submit">
                </wizard-step>
            </wizard>
    </div>
</template>