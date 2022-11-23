import { VNode } from 'vue';
export declare type Context = Record<string, any>;
export declare type ButtonPropFunction<T> = (context: Context) => T;
export declare type ButtonLiteral = string | boolean | undefined;
export declare type ButtonProp = ButtonLiteral | ButtonPropFunction<ButtonLiteral> | ButtonEventHandler;
export declare type ButtonEventHandler = (e: Event, button: Button) => void;
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
    indicator: string;
    isFirstSlot: boolean;
    isLastSlot: boolean;
    size: string;
    totalSlots: number;
}
declare const _sfc_main: import("vue").DefineComponent<{
    active: {
        type: NumberConstructor;
        required: true;
    };
    buttons: {
        type: ArrayConstructor;
        required: true;
    };
    context: {
        type: ObjectConstructor;
        required: true;
        default: () => {};
    };
    currentSlot: {
        type: null;
        required: true;
    };
    indicator: {
        type: StringConstructor;
        required: true;
    };
    isFirstSlot: {
        type: BooleanConstructor;
        required: true;
    };
    isLastSlot: {
        type: BooleanConstructor;
        required: true;
    };
    size: {
        type: StringConstructor;
        required: true;
    };
    totalSlots: {
        type: NumberConstructor;
        required: true;
    };
}, {
    props: any;
    leftButtons: import("vue").ComputedRef<Button[]>;
    rightButtons: import("vue").ComputedRef<Button[]>;
    value: (subject: ButtonProp) => ButtonLiteral;
    run: (button: Button, method: string) => ButtonProp;
    isValid: (value: any) => boolean;
    onClickButton: (e: Event, button: Button) => Promise<void>;
    readonly BtnActivity: import("vue").DefineComponent<{
        active: BooleanConstructor;
        activity: BooleanConstructor;
        block: BooleanConstructor;
        disabled: BooleanConstructor;
        indicator: {
            type: (StringConstructor | ObjectConstructor)[];
            default: string;
        };
        label: {
            type: StringConstructor;
            default: undefined;
        };
        orientation: {
            type: StringConstructor;
            default: string;
        };
        size: {
            type: StringConstructor;
            default: string;
        };
        tag: {
            type: StringConstructor;
            default: undefined;
        };
        variant: {
            type: StringConstructor;
            default: string;
        };
    }, unknown, {
        currentActivity: boolean;
    }, {
        classes(): {
            [x: string]: any;
            disabled: any;
            active: any;
            'btn-activity': any;
        };
        indicatorProps(): any;
    }, {
        disable(): void;
        enable(): void;
        hideActivity(): void;
        showActivity(): void;
        toggle(): void;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "hide-activity" | "show-activity")[], "click" | "hide-activity" | "show-activity", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        active: BooleanConstructor;
        activity: BooleanConstructor;
        block: BooleanConstructor;
        disabled: BooleanConstructor;
        indicator: {
            type: (StringConstructor | ObjectConstructor)[];
            default: string;
        };
        label: {
            type: StringConstructor;
            default: undefined;
        };
        orientation: {
            type: StringConstructor;
            default: string;
        };
        size: {
            type: StringConstructor;
            default: string;
        };
        tag: {
            type: StringConstructor;
            default: undefined;
        };
        variant: {
            type: StringConstructor;
            default: string;
        };
    }>> & {
        onClick?: ((...args: any[]) => any) | undefined;
        "onHide-activity"?: ((...args: any[]) => any) | undefined;
        "onShow-activity"?: ((...args: any[]) => any) | undefined;
    }, {
        label: string;
        size: string;
        active: boolean;
        block: boolean;
        disabled: boolean;
        tag: string;
        variant: string;
        activity: boolean;
        indicator: string | Record<string, any>;
        orientation: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    active: {
        type: NumberConstructor;
        required: true;
    };
    buttons: {
        type: ArrayConstructor;
        required: true;
    };
    context: {
        type: ObjectConstructor;
        required: true;
        default: () => {};
    };
    currentSlot: {
        type: null;
        required: true;
    };
    indicator: {
        type: StringConstructor;
        required: true;
    };
    isFirstSlot: {
        type: BooleanConstructor;
        required: true;
    };
    isLastSlot: {
        type: BooleanConstructor;
        required: true;
    };
    size: {
        type: StringConstructor;
        required: true;
    };
    totalSlots: {
        type: NumberConstructor;
        required: true;
    };
}>>, {
    context: Record<string, any>;
}>;
export default _sfc_main;
