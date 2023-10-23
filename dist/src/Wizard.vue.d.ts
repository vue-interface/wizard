import { type Component } from 'vue';
import { Button, type ButtonPropFunction } from './WizardControls.vue';
export interface Props {
    active?: number;
    buttons?: Button[] | ButtonPropFunction<Button[]>;
    indicator?: Component;
    size?: string;
    submitLabel?: string;
    nextLabel?: string;
    prevLabel?: string;
}
declare function next(): any;
declare function prev(): any;
declare function goto(index: number): any;
declare function success(): void;
declare function failed(e?: Error): void;
declare function totalSlots(): number;
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    active: {
        type: import("vue").PropType<number>;
        default: any;
    };
    buttons: {
        type: import("vue").PropType<Button[] | ButtonPropFunction<Button[]>>;
        default: any;
    };
    indicator: {
        type: import("vue").PropType<Component>;
        default: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    };
    size: {
        type: import("vue").PropType<string>;
        default: string;
    };
    submitLabel: {
        type: import("vue").PropType<string>;
        default: string;
    };
    nextLabel: {
        type: import("vue").PropType<string>;
        default: string;
    };
    prevLabel: {
        type: import("vue").PropType<string>;
        default: string;
    };
}, {
    next: typeof next;
    prev: typeof prev;
    goto: typeof goto;
    failed: typeof failed;
    success: typeof success;
    totalSlots: typeof totalSlots;
    isFirstSlot: import("vue").ComputedRef<boolean>;
    isLastSlot: import("vue").ComputedRef<boolean>;
    finished: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    fix: (...args: any[]) => void;
    enter: (...args: any[]) => void;
    leave: (...args: any[]) => void;
    "after-enter": (...args: any[]) => void;
    "after-leave": (...args: any[]) => void;
    "before-enter": (...args: any[]) => void;
    "before-leave": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    active: {
        type: import("vue").PropType<number>;
        default: any;
    };
    buttons: {
        type: import("vue").PropType<Button[] | ButtonPropFunction<Button[]>>;
        default: any;
    };
    indicator: {
        type: import("vue").PropType<Component>;
        default: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    };
    size: {
        type: import("vue").PropType<string>;
        default: string;
    };
    submitLabel: {
        type: import("vue").PropType<string>;
        default: string;
    };
    nextLabel: {
        type: import("vue").PropType<string>;
        default: string;
    };
    prevLabel: {
        type: import("vue").PropType<string>;
        default: string;
    };
}>> & {
    onFix?: (...args: any[]) => any;
    onEnter?: (...args: any[]) => any;
    onLeave?: (...args: any[]) => any;
    "onAfter-enter"?: (...args: any[]) => any;
    "onAfter-leave"?: (...args: any[]) => any;
    "onBefore-enter"?: (...args: any[]) => any;
    "onBefore-leave"?: (...args: any[]) => any;
}, {
    active: number;
    buttons: Button[] | ButtonPropFunction<Button[]>;
    indicator: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    size: string;
    submitLabel: string;
    nextLabel: string;
    prevLabel: string;
}, {}>, {
    progress?(_: {
        active: number;
        highestStep: number;
    }): any;
    success?(_: {}): any;
    error?(_: {
        error: Error;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
