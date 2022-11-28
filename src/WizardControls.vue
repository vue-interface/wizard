<script lang="ts" setup>
import { BtnActivity } from '@vue-interface/btn-activity';
import { computed, VNode } from 'vue';

export type Context = Record<string,any>;

export type ButtonPropFunction<T> = (context:Context) => T;

export type ButtonLiteral = string | boolean | undefined;

export type ButtonProp = ButtonLiteral | ButtonPropFunction<ButtonLiteral> | ButtonEventHandler;

export type ButtonEventHandler = (e: Event, button: Button) => void;

export interface Button extends Record<string,ButtonProp> {
    id: string,
    activity?: boolean | ButtonPropFunction<boolean>,
    align?: string | ButtonPropFunction<string>,
    disabled?: boolean | ButtonPropFunction<boolean>,
    label?: string | ButtonPropFunction<string>,
    variant?: string | ButtonPropFunction<string>,
    onClick?: ButtonEventHandler
}

export interface Props {
    active: number,
    buttons: Button[],
    context: Context,
    currentSlot: VNode,
    indicator: string,
    isFirstSlot: boolean,
    isLastSlot: boolean,
    size: string,
    totalSlots: number
}

const props = withDefaults(defineProps<Props>(), {
    context: () => ({})
});

const leftButtons = computed(() => props.buttons.filter(button => {
    return value(button.align) === 'left';
}));

const rightButtons = computed(() => props.buttons.filter(button => {
    const align = value(button.align);

    return align === undefined || button.align === 'right';
}));

function value(subject: ButtonProp) {
    if(typeof subject === 'function') {
        return (subject as ButtonPropFunction<ButtonLiteral>)(props.context);
    }
    
    return subject;
}

function run(button: Button, method: string) {
    const dynamicProp = props.currentSlot?.props?.[`${button.id}-${method}`];

    if(dynamicProp) {
        return !!value(dynamicProp);
    }
    
    if(typeof button[method] === 'function') {
        return !!value(button[method] as ButtonPropFunction<string>);
    }

    return button[method];
}

function isValid(value: any) {
    return value === true || typeof value === 'undefined';
}

async function onClickButton(e: Event, button: Button) {
    const fn = props.currentSlot?.props?.[button.id];

    if(!fn) {
        return button.onClick?.(e, button);
    }

    button.activity = true;

    if(isValid(await Promise.resolve(value(fn)))) {
        button.onClick?.(e, button);
    }

    button.activity = false;
}

</script>

<template>
    <div
        class="wizard-controls"
        :class="{[`wizard-controls-${props.size}`]: true}">
        <div class="wizard-controls-left wizard-controls-section">
            <slot
                name="left"
                :left-buttons="leftButtons">
                <btn-activity
                    v-for="button,key in leftButtons"
                    :key="`left-button-${key}`"
                    type="button"
                    :activity="!!run(button, 'activity')"
                    :disabled="!!run(button, 'disabled')"
                    :indicator="props.indicator"
                    :size="props.size"
                    :variant="String(run(button, 'variant') || 'secondary')"
                    @click="e => onClickButton(e, button)">
                    {{ value(button.label) }}
                </btn-activity>
            </slot>
        </div>
        <div class="wizard-controls-right wizard-controls-section">
            <slot
                name="right"
                :right-buttons="rightButtons">
                <btn-activity
                    v-for="button,key in rightButtons"
                    :key="`right-button-${key}`"
                    type="button"
                    :activity="!!run(button, 'activity')"
                    :disabled="!!run(button, 'disabled')"
                    :indicator="props.indicator"
                    :size="props.size"
                    :variant="String(run(button, 'variant'))"
                    @click="e => onClickButton(e, button)">
                    {{ value(button.label) }}
                </btn-activity>
            </slot>
        </div>
    </div>
</template>

<style>
.wizard-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.wizard-controls-section {
    display: grid;
    gap: .5rem;
    grid-auto-flow: column;
}
</style>