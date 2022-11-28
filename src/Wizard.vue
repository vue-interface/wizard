<script lang="ts" setup>
import { SlideDeck } from '@vue-interface/slide-deck';
import { setgroups } from 'process';
import { computed, useSlots, VNode, ref } from 'vue';
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

const emit = defineEmits(['fix']);

const props = withDefaults(defineProps<Props>(), {
    active: undefined,
    indicator: 'spinner',
    size: 'md',
    buttons: () => defaultButtons,
    first,
    last,
    next,
    prev,
    goto
});

const slots = useSlots(), buttons = $ref(props.buttons);

function onEnter(current: VNode, previous?: VNode) {
    currentSlot = current;
    previousSlot = previous;
    currentActive = Number(current.key);
    highestStep = Math.max(highestStep, currentActive);
}

function onLeave(current: VNode, previous?: VNode) {
    
}

function onFix(event: Event, error: Error) {
    emit('fix', event, error);
            
    if(!event.defaultPrevented) {
        finished = false;
    }
}
</script>

<script lang="ts">
let currentSlot: VNode | undefined = $ref(undefined);
let previousSlot: VNode | undefined = $ref(undefined);
let currentActive: number = $ref(0);
let highestStep: number = $ref(0);
let finished = $ref(false);
let error = $ref<Error>();
let deck = $ref<typeof SlideDeck>();

export interface sdf {
    active: number
    buttons: Button[]
    error: Error | undefined
    finished: boolean
    highestStep: number
    indicator: string
    size: string
    previousSlot: VNode | undefined
    currentSlot: VNode | undefined
    currentActive: number
    deck: typeof deck
}

function success() {
    finished = true;
    error = undefined;
}

export function failed(e?: Error) {
    finished = true;
    error = e || new Error;
}

function slots(): VNode[] {
    return useSlots().default?.() || [];
}

function totalSlots(): number {
    return slots().length || 0;
}

const context = { failed, success, totalSlots };
    
const isLastSlot = computed(() => currentActive === totalSlots() - 1);
const isFirstSlot = computed(() => currentActive === 0);

function first() {
    return deck?.first();
}

function last() {
    return deck?.last();
}

function next() {
    return deck?.next();
}

function prev() {
    return deck?.prev();
}

function goto(step: number) {
    return deck?.goto(step);
}

const defaultButtons = [{
    id: 'back',
    align: 'left',
    label: 'Back',
    variant: 'secondary',
    onClick: () => {
        if(!isFirstSlot.value) {
            prev();
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
            next();
        }
        else {
            finished = true;
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
                    @leave="onLeave" />
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
