<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

    props: {

        /**
         * The HTML tag.
         */
        center: {
            type: Boolean,
            default: true
        },

        /**
         * The HTML tag.
         */
        tag: {
            type: String,
            default: 'h2'
        }

    }

});
</script>

<template>
    <component
        :is="tag"
        class="wizard-header"
        :class="{ 'wizard-header-center': center }">
        <slot />
    </component>
</template>

<style>
.card>.wizard .wizard-header {
    margin-top: 1rem;
}
.card>.wizard .wizard-header-center {
    text-align: center;
}
</style>
