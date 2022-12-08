declare const _sfc_main: import("vue").DefineComponent<{
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
}, {}, import("vue").DefineComponent<{
    componentPrefix: {
        type: StringConstructor;
        default: undefined;
    };
    size: {
        type: StringConstructor;
        default: undefined;
    };
    sizePrefix: {
        type: StringConstructor;
        default: undefined;
    };
}, unknown, unknown, {
    sizeableClassPrefix(): string | undefined;
    hasSizeablePrefix(): boolean;
    sizeableClass(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    componentPrefix: {
        type: StringConstructor;
        default: undefined;
    };
    size: {
        type: StringConstructor;
        default: undefined;
    };
    sizePrefix: {
        type: StringConstructor;
        default: undefined;
    };
}>>, {
    componentPrefix: string;
    size: string;
    sizePrefix: string;
}>, import("vue").ComponentOptionsMixin, "fix"[], "fix", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
export default _sfc_main;
