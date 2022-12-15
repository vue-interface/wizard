<script lang="ts" setup>
defineEmits(['enter', 'leave']);
</script>

<template>
    <div class="wizard-step">
        <slot
            ref="content" />
    </div>
</template>