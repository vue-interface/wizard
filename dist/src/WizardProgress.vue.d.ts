import { VNode } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    /**
     * The index or key of the active step.
     */
    active: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    /**
     * The wizard highest available to the user.
     */
    highestStep: {
        type: NumberConstructor;
        required: true;
    };
    /**
     * The wizard slots.
     */
    slots: {
        type: ArrayConstructor;
        required: true;
    };
}, unknown, unknown, {}, {
    label(vnode: VNode): any;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * The index or key of the active step.
     */
    active: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    /**
     * The wizard highest available to the user.
     */
    highestStep: {
        type: NumberConstructor;
        required: true;
    };
    /**
     * The wizard slots.
     */
    slots: {
        type: ArrayConstructor;
        required: true;
    };
}>>, {}>;
export default _sfc_main;
