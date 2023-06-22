<script lang="ts" setup>
import { SlideDeck } from '@vue-interface/slide-deck';
import { computed, useSlots, VNode } from 'vue';
import WizardControls, { Button } from './WizardControls.vue';
import WizardError from './WizardError.vue';
import WizardProgress from './WizardProgress.vue';
import WizardSuccess from './WizardSuccess.vue';

export interface Props {
    active?: number
    buttons?: Button[]
    indicator?: string
    size?: string
}

const emit = defineEmits(['fix', 'enter', 'leave', 'after-enter', 'after-leave', 'before-enter', 'before-leave']);

const props = withDefaults(defineProps<Props>(), {
    active: undefined,
    indicator: 'spinner',
    size: 'md',
    buttons: () => defaultButtons,
});

const slots = useSlots(), buttons = ref(props.buttons);


function onEnter(current: VNode, previous?: VNode) {
    deck.value?.$refs.slide && deck.value?.$refs.slide.$refs.node.$emit('enter', current, previous);

    // emit('enter', current, previous);

    currentSlot.value = current;
    previousSlot.value = previous;
    currentActive.value = Number(current.key);
    highestStep.value = Math.max(highestStep.value, currentActive.value);
}

function onLeave(current: VNode, previous?: VNode) {
    deck.value?.$refs.slide && deck.value?.$refs.slide.$refs.node.$emit('leave', current, previous);

    // emit('leave', current, previous);
    
    currentSlot.value = current;
    previousSlot.value = previous;
    currentActive.value = Number(current.key);
    highestStep.value = Math.max(highestStep.value, currentActive.value);
}

function onAfterEnter(current: VNode, previous?: VNode) {
    deck.value?.$refs.slide && deck.value?.$refs.slide.$refs.node.$emit('after-enter', current, previous);

    // emit('after-enter', current, previous);

    currentSlot.value = current;
    previousSlot.value = previous;
    currentActive.value = Number(current.key);
    highestStep.value = Math.max(highestStep.value, currentActive.value);
}

function onAfterLeave(current: VNode, previous?: VNode) {
    deck.value?.$refs.slide && deck.value?.$refs.slide.$refs.node.$emit('after-leave', current, previous);

    // emit('after-leave', current, previous);

    currentSlot.value = current;
    previousSlot.value = previous;
    currentActive.value = Number(current.key);
    highestStep.value = Math.max(highestStep.value, currentActive.value);
}

function onBeforeEnter(current: VNode, previous?: VNode) {
    deck.value?.$refs.slide && deck.value?.$refs.slide.$refs.node.$emit('before-enter', current, previous);

    // emit('before-enter', current, previous);

    currentSlot.value = current;
    previousSlot.value = previous;
    currentActive.value = Number(current.key);
    highestStep.value = Math.max(highestStep.value, currentActive.value);
}

function onBeforeLeave(current: VNode, previous?: VNode) {
    deck.value?.$refs.slide && deck.value?.$refs.slide.$refs.node.$emit('before-leave', current, previous);

    // emit('before-leave', current, previous);

    currentSlot.value = current;
    previousSlot.value = previous;
    currentActive.value = Number(current.key);
    highestStep.value = Math.max(highestStep.value, currentActive.value);
}

function onFix(event: Event, error: Error) {
    emit('fix', event, error);
            
    if(!event.defaultPrevented) {
        finished.value = false;
    }
}

defineExpose({
    next, prev, goto, failed, success, totalSlots
});
</script>

<script lang="ts">
import { ref } from 'vue';

let currentSlot = ref<VNode>();
let previousSlot = ref<VNode>();
let currentActive = ref(0);
let highestStep = ref(0);
let finished = ref(false);
let error = ref<Error>();
let deck = ref<typeof SlideDeck>();

export function next() {
    return deck.value?.next();
}

export function prev() {
    return deck.value?.prev();
}

export function goto(index: number) {
    return deck.value?.goto(index);
}

export function success() {
    finished.value = true;
    error.value = undefined;
}

export function failed(e?: Error) {
    finished.value = true;
    error.value = e || new Error;
}

function slots(): VNode[] {
    return useSlots().default?.() || [];
}

function totalSlots(): number {
    return slots().length || 0;
}

const context = { next, prev, goto, failed, success, totalSlots };
    
const isLastSlot = computed(() => currentActive.value === totalSlots() - 1);
const isFirstSlot = computed(() => currentActive.value === 0);

const defaultButtons = [{
    id: 'back',
    align: 'left',
    label: 'Back',
    variant: 'secondary',
    onClick: () => {
        if(!isFirstSlot.value) {
            deck.value?.prev();
        }
    },
},
{
    id: 'submit',
    align: 'right',
    variant: 'primary',
    label: () => (isLastSlot.value ? 'Submit' : 'Next'),
    onClick: async () => {
        if(!isLastSlot.value) {
            deck.value?.next();
        }
        else {
            finished.value = true;
        }
    },
}];

</script>

<template>
    <div class="wizard">
        <template v-if="!finished">
            <slot
                name="progress"
                :active="currentActive"
                :highest-step="highestStep">
                <WizardProgress
                    v-if="totalSlots() > 1"
                    :active="currentActive"
                    :highest-step="highestStep"
                    :slots="slots.default?.()" />
            </slot>

            <div class="wizard-content">
                <SlideDeck
                    ref="deck"
                    :slots="slots.default?.()"
                    @enter="onEnter"
                    @leave="onLeave"
                    @after-enter="onAfterEnter"
                    @after-leave="onAfterLeave"
                    @before-enter="onBeforeEnter"
                    @before-leave="onBeforeLeave" />
            </div>

            <WizardControls
                :active="currentActive"
                :current-slot="currentSlot"
                :buttons="buttons"
                :indicator="indicator"
                :is-first-slot="isFirstSlot"
                :is-last-slot="isLastSlot"
                :size="size"
                :total-slots="totalSlots()"
                :context="context" />
        </template>
        <template v-else-if="!error">
            <slot name="success">
                <WizardSuccess />
            </slot>
        </template>
        <div v-else>
            <slot
                name="error"
                :error="error">
                <WizardError
                    :error="error"
                    @fix="onFix" />
            </slot>
        </div>
    </div>
</template>

<style>
.wizard .wizard-content {
    margin-bottom: 1rem;
}
</style>
