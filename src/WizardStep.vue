<script lang="ts" setup>
// defineEmits(['enter', 'leave', 'after-enter', 'after-leave', 'before-enter', 'before-leave']);
</script>

<template>
    <div class="wizard-step">
        <slot
            ref="content" />
    </div>
</template>