import { type Component } from 'vue';
import { Button } from './WizardControls.vue';
export interface Props {
    active?: number;
    buttons?: Button[];
    indicator?: Component;
    size?: string;
}
export declare function next(): any;
export declare function prev(): any;
export declare function goto(index: number): any;
export declare function success(): void;
export declare function failed(e?: Error): void;
declare function totalSlots(): number;
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    active: {
        type: import("vue").PropType<number>;
        default: any;
    };
    buttons: {
        type: import("vue").PropType<Button[]>;
        default: () => ({
            id: string;
            align: string;
            label: string;
            variant: string;
            onClick: () => void;
        } | {
            id: string;
            align: string;
            variant: string;
            label: () => "Submit" | "Next";
            onClick: () => Promise<void>;
        })[];
    };
    indicator: {
        type: import("vue").PropType<Component>;
        default: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    };
    size: {
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    fix: (...args: any[]) => void;
    "before-enter": (...args: any[]) => void;
    enter: (...args: any[]) => void;
    "after-enter": (...args: any[]) => void;
    "before-leave": (...args: any[]) => void;
    leave: (...args: any[]) => void;
    "after-leave": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    active: {
        type: import("vue").PropType<number>;
        default: any;
    };
    buttons: {
        type: import("vue").PropType<Button[]>;
        default: () => ({
            id: string;
            align: string;
            label: string;
            variant: string;
            onClick: () => void;
        } | {
            id: string;
            align: string;
            variant: string;
            label: () => "Submit" | "Next";
            onClick: () => Promise<void>;
        })[];
    };
    indicator: {
        type: import("vue").PropType<Component>;
        default: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    };
    size: {
        type: import("vue").PropType<string>;
        default: string;
    };
}>> & {
    onFix?: (...args: any[]) => any;
    "onBefore-enter"?: (...args: any[]) => any;
    onEnter?: (...args: any[]) => any;
    "onAfter-enter"?: (...args: any[]) => any;
    "onBefore-leave"?: (...args: any[]) => any;
    onLeave?: (...args: any[]) => any;
    "onAfter-leave"?: (...args: any[]) => any;
}, {
    active: number;
    buttons: Button[];
    indicator: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
    size: string;
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
