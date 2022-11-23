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
export default _sfc_main;
