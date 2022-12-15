declare const _sfc_main: import("vue").DefineComponent<{
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
export default _sfc_main;
