declare const _default: import("vue").DefineComponent<{
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
    componentPrefix: StringConstructor;
    size: StringConstructor;
    sizePrefix: StringConstructor;
}, unknown, unknown, {
    sizeableClassPrefix(): string;
    hasSizeablePrefix(): boolean;
    sizeableClass(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    componentPrefix: StringConstructor;
    size: StringConstructor;
    sizePrefix: StringConstructor;
}>>, {}, {}>, import("vue").ComponentOptionsMixin, "fix"[], "fix", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
    onFix?: (...args: any[]) => any;
}, {
    title: string;
    extract: Function;
}, {}>;
export default _default;
