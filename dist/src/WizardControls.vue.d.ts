import { type Component, VNode } from 'vue';
export type Context = Record<string, any>;
export type ButtonPropFunction<T> = (context: Context) => T;
export type ButtonLiteral = string | boolean | undefined;
export type ButtonProp = ButtonLiteral | ButtonPropFunction<ButtonLiteral> | ButtonEventHandler;
export type ButtonEventHandler = (e: Event, button: Button) => void;
export interface Button extends Record<string, ButtonProp> {
    id: string;
    activity?: boolean | ButtonPropFunction<boolean>;
    align?: string | ButtonPropFunction<string>;
    disabled?: boolean | ButtonPropFunction<boolean>;
    label?: string | ButtonPropFunction<string>;
    variant?: string | ButtonPropFunction<string>;
    onClick?: ButtonEventHandler;
}
export interface Props {
    active: number;
    buttons: Button[];
    context: Context;
    currentSlot: VNode;
    indicator: Component;
    isFirstSlot: boolean;
    isLastSlot: boolean;
    size: string;
    totalSlots: number;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    active: {
        type: import("vue").PropType<number>;
        required: true;
    };
    buttons: {
        type: import("vue").PropType<Button[]>;
        required: true;
    };
    context: {
        type: import("vue").PropType<Context>;
        required: true;
        default: () => {};
    };
    currentSlot: {
        type: import("vue").PropType<VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>>;
        required: true;
    };
    indicator: {
        type: import("vue").PropType<Component>;
        required: true;
    };
    isFirstSlot: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    isLastSlot: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    size: {
        type: import("vue").PropType<string>;
        required: true;
    };
    totalSlots: {
        type: import("vue").PropType<number>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    active: {
        type: import("vue").PropType<number>;
        required: true;
    };
    buttons: {
        type: import("vue").PropType<Button[]>;
        required: true;
    };
    context: {
        type: import("vue").PropType<Context>;
        required: true;
        default: () => {};
    };
    currentSlot: {
        type: import("vue").PropType<VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>>;
        required: true;
    };
    indicator: {
        type: import("vue").PropType<Component>;
        required: true;
    };
    isFirstSlot: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    isLastSlot: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    size: {
        type: import("vue").PropType<string>;
        required: true;
    };
    totalSlots: {
        type: import("vue").PropType<number>;
        required: true;
    };
}>>, {
    context: {};
}, {}>, {
    left?(_: {
        leftButtons: Button[];
    }): any;
    right?(_: {
        rightButtons: Button[];
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
