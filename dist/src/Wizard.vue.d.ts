import { VNode } from 'vue';
import { Button } from './WizardControls.vue';
declare let deck: import("vue/macros").ReactiveVariable<import("vue").DefineComponent<{
    attrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    active: {
        type: NumberConstructor;
        default: number;
    };
    autoResize: {
        type: BooleanConstructor;
        default: boolean;
    };
    controls: BooleanConstructor;
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    slots: {
        type: ArrayConstructor;
        default: undefined;
    };
}, unknown, {
    currentActive: number;
    direction: string;
    maxHeight: undefined;
    mounted: boolean;
    lastSlide: null;
    sliding: boolean;
}, {}, {
    findIndex(key: string | number): number;
    find(key: string | number): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | undefined;
    first(): void;
    last(): void;
    goto(key: number): void;
    next(): void;
    prev(): void;
    resize(el: HTMLElement): void;
    slot(): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    vnodes(): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    onClickControl(e: Event, vnode: VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>): void;
    onBeforeLeave(el: HTMLElement): void;
    onBeforeEnter(): void;
    onEnter(el: HTMLElement): void;
    onAfterEnter(): void;
    onLeave(): void;
    onAfterLeave(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("before-enter" | "enter" | "after-enter" | "before-leave" | "leave" | "after-leave")[], "before-enter" | "enter" | "after-enter" | "before-leave" | "leave" | "after-leave", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    attrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    active: {
        type: NumberConstructor;
        default: number;
    };
    autoResize: {
        type: BooleanConstructor;
        default: boolean;
    };
    controls: BooleanConstructor;
    props: {
        type: ObjectConstructor;
        default: () => {};
    };
    slots: {
        type: ArrayConstructor;
        default: undefined;
    };
}>> & {
    "onBefore-enter"?: ((...args: any[]) => any) | undefined;
    onEnter?: ((...args: any[]) => any) | undefined;
    "onAfter-enter"?: ((...args: any[]) => any) | undefined;
    "onBefore-leave"?: ((...args: any[]) => any) | undefined;
    onLeave?: ((...args: any[]) => any) | undefined;
    "onAfter-leave"?: ((...args: any[]) => any) | undefined;
}, {
    props: Record<string, any>;
    attrs: Record<string, any>;
    active: number;
    autoResize: boolean;
    controls: boolean;
    slots: unknown[];
}>> | undefined;
export interface sdf {
    active: number;
    buttons: Button[];
    error: Error | undefined;
    finished: boolean;
    highestStep: number;
    indicator: string;
    size: string;
    previousSlot: VNode | undefined;
    currentSlot: VNode | undefined;
    currentActive: number;
    deck: typeof deck;
}
declare function success(): void;
export declare function failed(e?: Error): void;
declare function totalSlots(): number;
declare function first(): any;
declare function last(): any;
declare function next(): any;
declare function prev(): any;
declare function goto(step: number): any;
export interface Props {
    active?: number;
    buttons?: Button[];
    indicator?: string;
    size?: string;
}
declare const _sfc_main: import("vue").DefineComponent<{
    active: {
        type: NumberConstructor;
        required: false;
        default: undefined;
    };
    buttons: {
        type: ArrayConstructor;
        required: false;
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
        type: StringConstructor;
        required: false;
        default: string;
    };
    size: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, {
    currentSlot: VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | undefined;
    previousSlot: VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | undefined;
    currentActive: number;
    highestStep: number;
    finished: import("vue/macros").ReactiveVariable<false> | import("vue/macros").ReactiveVariable<true>;
    error: import("vue/macros").ReactiveVariable<Error> | undefined;
    deck: import("vue/macros").ReactiveVariable<import("vue").DefineComponent<{
        attrs: {
            type: ObjectConstructor;
            default: () => {};
        };
        active: {
            type: NumberConstructor;
            default: number;
        };
        autoResize: {
            type: BooleanConstructor;
            default: boolean;
        };
        controls: BooleanConstructor;
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        slots: {
            type: ArrayConstructor;
            default: undefined;
        };
    }, unknown, {
        currentActive: number;
        direction: string;
        maxHeight: undefined;
        mounted: boolean;
        lastSlide: null;
        sliding: boolean;
    }, {}, {
        findIndex(key: string | number): number;
        find(key: string | number): VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }> | undefined;
        first(): void;
        last(): void;
        goto(key: number): void;
        next(): void;
        prev(): void;
        resize(el: HTMLElement): void;
        slot(): VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
        vnodes(): VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[];
        onClickControl(e: Event, vnode: VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>): void;
        onBeforeLeave(el: HTMLElement): void;
        onBeforeEnter(): void;
        onEnter(el: HTMLElement): void;
        onAfterEnter(): void;
        onLeave(): void;
        onAfterLeave(): void;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("before-enter" | "enter" | "after-enter" | "before-leave" | "leave" | "after-leave")[], "before-enter" | "enter" | "after-enter" | "before-leave" | "leave" | "after-leave", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        attrs: {
            type: ObjectConstructor;
            default: () => {};
        };
        active: {
            type: NumberConstructor;
            default: number;
        };
        autoResize: {
            type: BooleanConstructor;
            default: boolean;
        };
        controls: BooleanConstructor;
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        slots: {
            type: ArrayConstructor;
            default: undefined;
        };
    }>> & {
        "onBefore-enter"?: ((...args: any[]) => any) | undefined;
        onEnter?: ((...args: any[]) => any) | undefined;
        "onAfter-enter"?: ((...args: any[]) => any) | undefined;
        "onBefore-leave"?: ((...args: any[]) => any) | undefined;
        onLeave?: ((...args: any[]) => any) | undefined;
        "onAfter-leave"?: ((...args: any[]) => any) | undefined;
    }, {
        props: Record<string, any>;
        attrs: Record<string, any>;
        active: number;
        autoResize: boolean;
        controls: boolean;
        slots: unknown[];
    }>> | undefined;
    success: typeof success;
    failed: typeof failed;
    slots: Readonly<{
        [name: string]: import("vue").Slot | undefined;
    }>;
    totalSlots: typeof totalSlots;
    context: {
        failed: typeof failed;
        success: typeof success;
        totalSlots: typeof totalSlots;
    };
    isLastSlot: import("vue").ComputedRef<boolean>;
    isFirstSlot: import("vue").ComputedRef<boolean>;
    first: typeof first;
    last: typeof last;
    next: typeof next;
    prev: typeof prev;
    goto: typeof goto;
    defaultButtons: ({
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
    emit: (event: "fix", ...args: any[]) => void;
    props: any;
    buttons: import("vue/macros").ReactiveVariable<{
        [x: string]: import("./WizardControls.vue").ButtonProp;
        id: string;
        activity?: boolean | import("./WizardControls.vue").ButtonPropFunction<boolean> | undefined;
        align?: string | import("./WizardControls.vue").ButtonPropFunction<string> | undefined;
        disabled?: boolean | import("./WizardControls.vue").ButtonPropFunction<boolean> | undefined;
        label?: string | import("./WizardControls.vue").ButtonPropFunction<string> | undefined;
        variant?: string | import("./WizardControls.vue").ButtonPropFunction<string> | undefined;
        onClick?: import("./WizardControls.vue").ButtonEventHandler | undefined;
    }[]>;
    onEnter: (current: VNode, previous?: VNode) => void;
    onLeave: (current: VNode, previous?: VNode) => void;
    onFix: (event: Event, error: Error) => void;
    readonly SlideDeck: import("vue").DefineComponent<{
        attrs: {
            type: ObjectConstructor;
            default: () => {};
        };
        active: {
            type: NumberConstructor;
            default: number;
        };
        autoResize: {
            type: BooleanConstructor;
            default: boolean;
        };
        controls: BooleanConstructor;
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        slots: {
            type: ArrayConstructor;
            default: undefined;
        };
    }, unknown, {
        currentActive: number;
        direction: string;
        maxHeight: undefined;
        mounted: boolean;
        lastSlide: null;
        sliding: boolean;
    }, {}, {
        findIndex(key: string | number): number;
        find(key: string | number): VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }> | undefined;
        first(): void;
        last(): void;
        goto(key: number): void;
        next(): void;
        prev(): void;
        resize(el: HTMLElement): void;
        slot(): VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
        vnodes(): VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[];
        onClickControl(e: Event, vnode: VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>): void;
        onBeforeLeave(el: HTMLElement): void;
        onBeforeEnter(): void;
        onEnter(el: HTMLElement): void;
        onAfterEnter(): void;
        onLeave(): void;
        onAfterLeave(): void;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("before-enter" | "enter" | "after-enter" | "before-leave" | "leave" | "after-leave")[], "before-enter" | "enter" | "after-enter" | "before-leave" | "leave" | "after-leave", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        attrs: {
            type: ObjectConstructor;
            default: () => {};
        };
        active: {
            type: NumberConstructor;
            default: number;
        };
        autoResize: {
            type: BooleanConstructor;
            default: boolean;
        };
        controls: BooleanConstructor;
        props: {
            type: ObjectConstructor;
            default: () => {};
        };
        slots: {
            type: ArrayConstructor;
            default: undefined;
        };
    }>> & {
        "onBefore-enter"?: ((...args: any[]) => any) | undefined;
        onEnter?: ((...args: any[]) => any) | undefined;
        "onAfter-enter"?: ((...args: any[]) => any) | undefined;
        "onBefore-leave"?: ((...args: any[]) => any) | undefined;
        onLeave?: ((...args: any[]) => any) | undefined;
        "onAfter-leave"?: ((...args: any[]) => any) | undefined;
    }, {
        props: Record<string, any>;
        attrs: Record<string, any>;
        active: number;
        autoResize: boolean;
        controls: boolean;
        slots: unknown[];
    }>;
    WizardControls: import("vue").DefineComponent<{
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
        value: (subject: import("./WizardControls.vue").ButtonProp) => import("./WizardControls.vue").ButtonLiteral;
        run: (button: Button, method: string) => import("./WizardControls.vue").ButtonProp;
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
    WizardError: import("vue").DefineComponent<{
        title: {
            type: StringConstructor;
            default: string;
        };
        error: {
            type: ErrorConstructor;
            required: true;
        };
        extract: {
            type: FunctionConstructor;
            default(e: Event): Event;
        };
    }, unknown, {
        errors: any;
    }, {
        isString(): boolean;
        isError(): boolean;
    }, {}, {
        props: {
            componentPrefix: StringConstructor;
            size: StringConstructor;
            sizePrefix: StringConstructor;
        };
        computed: {
            sizeableClassPrefix(): string | undefined;
            hasSizeablePrefix(): boolean;
            sizeableClass(): string;
        };
    }, import("vue").ComponentOptionsMixin, "fix"[], "fix", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        error: {
            type: ErrorConstructor;
            required: true;
        };
        extract: {
            type: FunctionConstructor;
            default(e: Event): Event;
        };
    }>> & {
        onFix?: ((...args: any[]) => any) | undefined;
    }, {
        title: string;
        extract: Function;
    }>;
    WizardProgress: import("vue").DefineComponent<{
        active: {
            type: (NumberConstructor | StringConstructor)[];
            required: true;
        };
        highestStep: {
            type: NumberConstructor;
            required: true;
        };
        slots: {
            type: ArrayConstructor;
            required: true;
        };
    }, unknown, unknown, {}, {
        label(vnode: VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>): any;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        active: {
            type: (NumberConstructor | StringConstructor)[];
            required: true;
        };
        highestStep: {
            type: NumberConstructor;
            required: true;
        };
        slots: {
            type: ArrayConstructor;
            required: true;
        };
    }>>, {}>;
    WizardSuccess: import("vue").DefineComponent<{
        title: {
            type: StringConstructor;
            default: string;
        };
    }, unknown, unknown, {}, {}, {
        props: {
            componentPrefix: StringConstructor;
            size: StringConstructor;
            sizePrefix: StringConstructor;
        };
        computed: {
            sizeableClassPrefix(): string | undefined;
            hasSizeablePrefix(): boolean;
            sizeableClass(): string;
        };
    }, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
    }>>, {
        title: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "fix"[], "fix", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    active: {
        type: NumberConstructor;
        required: false;
        default: undefined;
    };
    buttons: {
        type: ArrayConstructor;
        required: false;
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
        type: StringConstructor;
        required: false;
        default: string;
    };
    size: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>> & {
    onFix?: ((...args: any[]) => any) | undefined;
}, {
    active: number;
    buttons: unknown[];
    indicator: string;
    size: string;
}>;
export default _sfc_main;
