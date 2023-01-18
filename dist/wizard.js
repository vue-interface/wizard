import { ref as C, defineComponent as S, onMounted as ue, openBlock as a, createElementBlock as d, createBlock as k, resolveDynamicComponent as V, resolveComponent as T, normalizeClass as N, renderSlot as g, createElementVNode as z, normalizeStyle as ie, createVNode as E, Transition as he, withCtx as A, KeepAlive as ve, inject as fe, createCommentVNode as j, toDisplayString as P, mergeProps as J, createTextVNode as O, normalizeProps as pe, guardReactiveProps as ge, computed as q, unref as w, Fragment as I, renderList as D, useSlots as se } from "vue";
const me = { class: "slide-deck-slide" };
let X = C();
const ye = /* @__PURE__ */ S({
  __name: "Slide",
  props: {
    node: null
  },
  setup(e) {
    const t = e;
    return ue(() => {
      var i, r;
      (r = (i = X.value) == null ? void 0 : i.el) == null || r.dispatchEvent(new Event("enter"));
    }), (i, r) => (a(), d("div", me, [
      (a(), k(V(t.node), {
        ref_key: "node",
        ref: X
      }, null, 512))
    ]));
  }
}), be = S({
  components: {
    Slide: ye
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    },
    active: {
      type: Number,
      default: 0
    },
    autoResize: {
      type: Boolean,
      default: !0
    },
    controls: Boolean,
    props: {
      type: Object,
      default: () => ({})
    },
    slots: {
      type: Array,
      default: void 0
    }
  },
  emits: [
    "before-enter",
    "enter",
    "after-enter",
    "before-leave",
    "leave",
    "after-leave"
  ],
  data() {
    return {
      currentActive: this.active,
      direction: "forward",
      maxHeight: void 0,
      mounted: !1,
      lastSlide: null,
      sliding: !1
    };
  },
  watch: {
    currentActive(e, t) {
      this.lastSlide = t, this.direction = this.findIndex(t) > this.findIndex(e) ? "backward" : "forward";
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mounted = !0, this.$emit("enter", this.slot());
    });
  },
  methods: {
    findIndex(e) {
      return this.vnodes().findIndex((t, i) => t.key === e || i === e);
    },
    find(e) {
      return this.vnodes()[this.findIndex(e)];
    },
    first() {
      this.goto(0);
    },
    last() {
      this.goto(this.vnodes().length - 1);
    },
    goto(e) {
      this.sliding || (this.currentActive = Math.max(0, e));
    },
    next() {
      this.sliding || (this.currentActive = Math.min(
        this.findIndex(this.currentActive) + 1,
        this.vnodes().length - 1
      ));
    },
    prev() {
      this.sliding || (this.currentActive = Math.max(
        this.findIndex(this.currentActive) - 1,
        0
      ));
    },
    resize(e) {
      const t = getComputedStyle(e).height;
      this.maxHeight = t === "0x" ? this.maxHeight : t;
    },
    slot() {
      return this.find(this.currentActive);
    },
    vnodes() {
      return (this.slots || this.$slots.default(this)).map((e, t) => (e.props = Object.assign(
        {},
        e.props,
        this.props,
        this.attrs
      ), Object.assign(e, {
        key: t
      })));
    },
    onClickControl(e, t) {
      this.sliding || this.goto(t);
    },
    onBeforeLeave(e) {
      this.autoResize && this.resize(e), this.$emit(
        "before-leave",
        this.slot(),
        this.find(this.lastSlide)
      );
    },
    onBeforeEnter() {
      this.sliding = !0, this.$emit(
        "before-enter",
        this.slot(),
        this.find(this.lastSlide)
      );
    },
    onEnter(e) {
      this.$nextTick(() => {
        this.autoResize && this.resize(e), this.$emit(
          "enter",
          this.slot(),
          this.find(this.lastSlide)
        );
      });
    },
    onAfterEnter() {
      this.$emit(
        "after-enter",
        this.slot(),
        this.find(this.lastSlide)
      );
    },
    onLeave() {
      this.$nextTick(() => {
        this.$emit(
          "leave",
          this.slot(),
          this.find(this.lastSlide)
        );
      });
    },
    onAfterLeave() {
      this.sliding = !1, this.$nextTick(() => {
        this.maxHeight = null, this.$emit(
          "after-leave",
          this.slot(),
          this.find(this.lastSlide)
        );
      });
    }
  }
}), $e = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [r, s] of t)
    i[r] = s;
  return i;
};
function ze(e, t, i, r, s, f) {
  const _ = T("slide");
  return a(), d("div", {
    class: N(["slide-deck", { sliding: e.sliding }])
  }, [
    g(e.$slots, "top", { active: e.currentActive }),
    z("div", {
      ref: "content",
      class: N(["slide-deck-content", { [e.direction]: !0 }]),
      style: ie({ maxHeight: e.maxHeight })
    }, [
      E(he, {
        name: `slide-${e.direction}`,
        onBeforeEnter: e.onBeforeEnter,
        onEnter: e.onEnter,
        onAfterEnter: e.onAfterEnter,
        onBeforeLeave: e.onBeforeLeave,
        onLeave: e.onLeave,
        onAfterLeave: e.onAfterLeave
      }, {
        default: A(() => [
          (a(), k(ve, null, [
            (a(), k(_, {
              ref: "slide",
              key: e.currentActive,
              node: e.find(e.currentActive)
            }, null, 8, ["node"]))
          ], 1024))
        ]),
        _: 1
      }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
    ], 6),
    g(e.$slots, "middle", { active: e.currentActive }),
    g(e.$slots, "bottom", { active: e.currentActive })
  ], 2);
}
const _e = /* @__PURE__ */ $e(be, [["render", ze]]);
function L(e, t = "px") {
  return e != null && e !== !1 && isFinite(e) ? `${e}${t}` : e;
}
const xe = S({
  props: {
    absolute: Boolean,
    center: Boolean,
    label: String,
    size: {
      type: String,
      default: "md"
    },
    registry: {
      type: String,
      default: "indicators"
    },
    type: {
      type: String,
      required: !0
    },
    height: [String, Number],
    maxHeight: [String, Number],
    minHeight: [String, Number],
    width: [String, Number],
    maxWidth: [String, Number],
    minWidth: [String, Number]
  },
  data: () => ({
    is: null
  }),
  setup(e) {
    return {
      registryInstance: fe(e.registry || "indicators")
    };
  },
  computed: {
    classes() {
      return {
        "activity-indicator-center": this.center,
        "activity-indicator-absolute": this.absolute,
        [this.size && `activity-indicator-${this.size}`]: !!this.size
      };
    },
    style() {
      return {
        width: L(this.width),
        maxWidth: L(this.maxWidth),
        minWidth: L(this.minWidth),
        height: L(this.height),
        maxHeight: L(this.maxHeight),
        minHeight: L(this.minHeight)
      };
    }
  },
  async mounted() {
    const e = await this.component();
    this.is = () => e;
  },
  methods: {
    async component() {
      let e = this.registryInstance.get(this.type);
      return e instanceof Promise ? e : (typeof e == "function" && (e = await e()), e.default ? e.default : e);
    }
  }
}), Se = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [r, s] of t)
    i[r] = s;
  return i;
}, Pe = { class: "activity-indicator-content" }, we = {
  key: 1,
  class: "activity-indicator-label"
};
function ke(e, t, i, r, s, f) {
  return a(), d("div", {
    class: N(["activity-indicator", e.classes]),
    style: ie(e.style)
  }, [
    z("div", Pe, [
      e.is ? (a(), k(V(e.is()), {
        key: 0,
        class: "mx-auto"
      })) : j("", !0),
      e.label ? (a(), d("div", we, P(e.label), 1)) : j("", !0)
    ])
  ], 6);
}
const Ce = /* @__PURE__ */ Se(xe, [["render", ke]]);
var Ae = Object.defineProperty, Be = (e, t, i) => t in e ? Ae(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Ee = (e, t, i) => (Be(e, typeof t != "symbol" ? t + "" : t, i), i), Z = function() {
  return Z = Object.assign || function(e) {
    for (var t, i = 1, r = arguments.length; i < r; i++) {
      t = arguments[i];
      for (var s in t)
        Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
    }
    return e;
  }, Z.apply(this, arguments);
};
function Le(e) {
  return e.toLowerCase();
}
var We = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], Ne = /[^A-Z0-9]+/gi;
function Oe(e, t) {
  t === void 0 && (t = {});
  for (var i = t.splitRegexp, r = i === void 0 ? We : i, s = t.stripRegexp, f = s === void 0 ? Ne : s, _ = t.transform, m = _ === void 0 ? Le : _, o = t.delimiter, u = o === void 0 ? " " : o, c = Y(Y(e, r, "$1\0$2"), f, "\0"), b = 0, $ = c.length; c.charAt(b) === "\0"; )
    b++;
  for (; c.charAt($ - 1) === "\0"; )
    $--;
  return c.slice(b, $).split("\0").map(m).join(u);
}
function Y(e, t, i) {
  return t instanceof RegExp ? e.replace(t, i) : t.reduce(function(r, s) {
    return r.replace(s, i);
  }, e);
}
function Me(e, t) {
  return t === void 0 && (t = {}), Oe(e, Z({ delimiter: "." }, t));
}
function F(e, t) {
  return t === void 0 && (t = {}), Me(e, Z({ delimiter: "-" }, t));
}
class He {
  constructor(t = {}) {
    Ee(this, "components"), this.components = /* @__PURE__ */ new Map(), Object.entries(t).forEach(([i, r]) => {
      this.register(i, r);
    });
  }
  get(t) {
    const i = this.components.get(
      t = F(t)
    );
    if (i)
      return i;
    throw new Error(`"${t}" has not been registered yet!`);
  }
  register(t, i) {
    return typeof t == "object" ? (Object.entries(t).forEach(([r, s]) => {
      this.register(F(r), s);
    }), this) : (this.components.set(F(t), i), this);
  }
  remove(t) {
    return this.components.delete(F(t)), this;
  }
  reset() {
    return this.components = /* @__PURE__ */ new Map(), this;
  }
}
function je(e = {}) {
  return new He(e);
}
je();
const Ie = {
  props: {
    componentPrefix: String,
    size: String,
    sizePrefix: String
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size === void 0 ? !1 : !!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`));
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, Re = {
  props: {
    componentPrefix: String,
    variant: String,
    variantPrefix: String
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix || this.componentPrefix;
    },
    hasVariantPrefix() {
      return this.variant === void 0 ? !1 : !!this.variant.match(new RegExp(`^${this.variantClassPrefix}`));
    },
    variantClass() {
      return this.variant ? !this.variantClassPrefix || this.hasVariantPrefix ? this.variant : `${this.variantClassPrefix}-${this.variant}` : "";
    }
  }
}, Ve = S({
  mixins: [
    Ie,
    Re
  ],
  props: {
    active: Boolean,
    block: Boolean,
    componentPrefix: {
      type: String,
      default: "btn"
    },
    disabled: Boolean,
    label: String,
    outline: Boolean,
    tag: String,
    variant: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    classes() {
      return [
        "btn",
        this.variantClass,
        this.sizeableClass,
        this.active && "active",
        this.block && "btn-block",
        this.disabled && "disabled"
      ];
    },
    component() {
      return this.tag ? this.tag : this.$attrs.href ? "a" : "button";
    },
    variantClassPrefix() {
      return (this.variantPrefix || this.componentPrefix) + (this.outline ? "-outline" : "");
    }
  }
}), Fe = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [r, s] of t)
    i[r] = s;
  return i;
};
function Te(e, t, i, r, s, f) {
  return a(), k(V(e.component), J(e.$attrs, {
    disabled: e.disabled,
    class: e.classes,
    role: "button"
  }), {
    default: A(() => [
      g(e.$slots, "default", {}, () => [
        O(P(e.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const qe = /* @__PURE__ */ Fe(Ve, [["render", Te]]), De = function(e) {
  const t = parseFloat(e || 0), i = e && e.match(/m?s/), r = i ? i[0] : !1;
  let s;
  switch (r) {
    case "s":
      s = t * 1e3;
      break;
    case "ms":
    default:
      s = t;
      break;
  }
  return s || 0;
}, ee = function(e, t) {
  const i = (e.ownerDocument || document).defaultView;
  setTimeout(
    t,
    De(
      i == null ? void 0 : i.getComputedStyle(e).animationDuration
    )
  );
}, Ze = S({
  components: {
    ActivityIndicator: Ce,
    Btn: qe
  },
  inheritAttrs: !1,
  props: {
    active: Boolean,
    activity: Boolean,
    block: Boolean,
    disabled: Boolean,
    indicator: {
      type: [Object, String],
      default: "spinner"
    },
    label: {
      type: String,
      default: void 0
    },
    orientation: {
      type: String,
      default: "right"
    },
    size: {
      type: String,
      default: "md"
    },
    tag: {
      type: String,
      default: void 0
    },
    variant: {
      type: String,
      default: "primary"
    }
  },
  emits: ["click", "hide-activity", "show-activity"],
  data() {
    return {
      currentActivity: this.activity
    };
  },
  computed: {
    classes() {
      return {
        disabled: this.disabled,
        active: this.active,
        "btn-activity": this.activity,
        [`btn-activity-${this.orientation.replace("btn-activity-", "")}`]: !!this.orientation,
        [`btn-activity-indicator-${this.indicatorProps.type.replace("btn-activity-indicator-", "")}`]: !!this.indicatorProps.type
      };
    },
    indicatorProps() {
      return Object.assign(
        {
          type: "spinner"
        },
        (typeof this.indicator == "string" ? {
          type: this.indicator
        } : this.indicator) || {}
      );
    }
  },
  watch: {
    activity(e) {
      e ? this.showActivity() : this.hideActivity();
    }
  },
  mounted() {
    this.activity && this.showActivity();
  },
  methods: {
    disable() {
      this.$el.disabled = !0, this.$el.classList.add("disabled");
    },
    enable() {
      this.$el.disabled = !1, this.$el.classList.remove("disabled");
    },
    hideActivity() {
      this.$el.classList.add("btn-hide-activity"), ee(this.$el, () => {
        this.disabled || this.enable(), this.currentActivity = !1, this.$el.classList.remove("btn-activity", "btn-hide-activity"), this.$emit("hide-activity");
      });
    },
    showActivity() {
      this.currentActivity = !0, this.disable(), ee(this.$el, () => {
        this.$el.classList.add("btn-activity"), this.$emit("show-activity");
      });
    },
    toggle() {
      this.currentActivity ? this.hideActivity() : this.showActivity();
    }
  }
}), Ke = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [r, s] of t)
    i[r] = s;
  return i;
};
function Ge(e, t, i, r, s, f) {
  const _ = T("activity-indicator"), m = T("btn");
  return a(), k(m, J({
    active: e.active,
    block: e.block,
    disabled: e.disabled,
    size: e.size,
    tag: e.tag,
    variant: e.variant,
    class: e.classes
  }, Object.assign({}, e.$attrs, { onClick: void 0 }), {
    onClick: t[0] || (t[0] = (o) => !e.disabled && e.$emit("click", o, {
      disable: e.disable,
      enable: e.enable,
      toggle: e.toggle,
      showActivity: e.showActivity,
      hideActivity: e.hideActivity
    }))
  }), {
    default: A(() => [
      g(e.$slots, "default", {}, () => [
        O(P(e.label), 1)
      ]),
      E(_, pe(ge(e.indicatorProps)), null, 16)
    ]),
    _: 3
  }, 16, ["active", "block", "disabled", "size", "tag", "variant", "class"]);
}
const te = /* @__PURE__ */ Ke(Ze, [["render", Ge]]), Je = { class: "wizard-controls-left wizard-controls-section" }, Qe = { class: "wizard-controls-right wizard-controls-section" }, Ue = /* @__PURE__ */ S({
  __name: "WizardControls",
  props: {
    active: null,
    buttons: null,
    context: { default: () => ({}) },
    currentSlot: null,
    indicator: null,
    isFirstSlot: { type: Boolean },
    isLastSlot: { type: Boolean },
    size: null,
    totalSlots: null
  },
  setup(e) {
    const t = e, i = q(() => t.buttons.filter((o) => s(o.align) === "left")), r = q(() => t.buttons.filter((o) => s(o.align) === void 0 || o.align === "right"));
    function s(o) {
      return typeof o == "function" ? o(t.context) : o;
    }
    function f(o, u) {
      var b, $;
      const c = ($ = (b = t.currentSlot) == null ? void 0 : b.props) == null ? void 0 : $[`${o.id}-${u}`];
      return c ? !!s(c) : typeof o[u] == "function" ? !!s(o[u]) : o[u];
    }
    function _(o) {
      return o === !0 || typeof o > "u";
    }
    async function m(o, u) {
      var b, $, n, l;
      const c = ($ = (b = t.currentSlot) == null ? void 0 : b.props) == null ? void 0 : $[u.id];
      if (!c)
        return (n = u.onClick) == null ? void 0 : n.call(u, o, u);
      u.activity = !0, _(await Promise.resolve(s(c))) && ((l = u.onClick) == null || l.call(u, o, u)), u.activity = !1;
    }
    return (o, u) => (a(), d("div", {
      class: N(["wizard-controls", { [`wizard-controls-${t.size}`]: !0 }])
    }, [
      z("div", Je, [
        g(o.$slots, "left", { leftButtons: w(i) }, () => [
          (a(!0), d(I, null, D(w(i), (c, b) => (a(), k(w(te), {
            key: `left-button-${b}`,
            type: "button",
            activity: !!f(c, "activity"),
            disabled: !!f(c, "disabled"),
            indicator: t.indicator,
            size: t.size,
            variant: String(f(c, "variant") || "secondary"),
            onClick: ($) => m($, c)
          }, {
            default: A(() => [
              O(P(s(c.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ]),
      z("div", Qe, [
        g(o.$slots, "right", { rightButtons: w(r) }, () => [
          (a(!0), d(I, null, D(w(r), (c, b) => (a(), k(w(te), {
            key: `right-button-${b}`,
            type: "button",
            activity: !!f(c, "activity"),
            disabled: !!f(c, "disabled"),
            indicator: t.indicator,
            size: t.size,
            variant: String(f(c, "variant")),
            onClick: ($) => m($, c)
          }, {
            default: A(() => [
              O(P(s(c.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ])
    ], 2));
  }
});
const Xe = {
  props: {
    componentPrefix: String,
    size: String,
    sizePrefix: String
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size === void 0 ? !1 : !!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`));
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, Ye = {
  props: {
    componentPrefix: String,
    variant: String,
    variantPrefix: String
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix || this.componentPrefix;
    },
    hasVariantPrefix() {
      return this.variant === void 0 ? !1 : !!this.variant.match(new RegExp(`^${this.variantClassPrefix}`));
    },
    variantClass() {
      return this.variant ? !this.variantClassPrefix || this.hasVariantPrefix ? this.variant : `${this.variantClassPrefix}-${this.variant}` : "";
    }
  }
}, et = S({
  mixins: [
    Xe,
    Ye
  ],
  props: {
    active: Boolean,
    block: Boolean,
    componentPrefix: {
      type: String,
      default: "btn"
    },
    disabled: Boolean,
    label: String,
    outline: Boolean,
    tag: String,
    variant: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    classes() {
      return [
        "btn",
        this.variantClass,
        this.sizeableClass,
        this.active && "active",
        this.block && "btn-block",
        this.disabled && "disabled"
      ];
    },
    component() {
      return this.tag ? this.tag : this.$attrs.href ? "a" : "button";
    },
    variantClassPrefix() {
      return (this.variantPrefix || this.componentPrefix) + (this.outline ? "-outline" : "");
    }
  }
}), tt = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [r, s] of t)
    i[r] = s;
  return i;
};
function it(e, t, i, r, s, f) {
  return a(), k(V(e.component), J(e.$attrs, {
    disabled: e.disabled,
    class: e.classes,
    role: "button"
  }), {
    default: A(() => [
      g(e.$slots, "default", {}, () => [
        O(P(e.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const st = /* @__PURE__ */ tt(et, [["render", it]]), re = {
  props: {
    componentPrefix: String,
    size: String,
    sizePrefix: String
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size === void 0 ? !1 : !!this.size.match(
        new RegExp(`^${this.sizeableClassPrefix}`)
      );
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, rt = S({
  components: {
    Btn: st
  },
  mixins: [
    re
  ],
  props: {
    title: {
      type: String,
      default: "Error!"
    },
    error: {
      type: Error,
      required: !0
    },
    extract: {
      type: Function,
      default(e) {
        return e;
      }
    }
  },
  emits: [
    "fix"
  ],
  data() {
    return {
      errors: this.extract(this.error)
    };
  },
  computed: {
    isString() {
      return typeof this.errors == "string";
    },
    isError() {
      return this.errors instanceof Error;
    }
  }
});
const K = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [r, s] of t)
    i[r] = s;
  return i;
}, nt = { class: "wizard-error" }, at = { class: "wizard-error-icon" }, ot = /* @__PURE__ */ z("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ z("path", {
    fill: "#b10805",
    d: "M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
  })
], -1), lt = { class: "wizard-error-body" }, ct = {
  key: 0,
  class: "wizard-error-title"
}, dt = { key: 0 }, ut = { key: 1 }, ht = { key: 2 }, vt = { class: "wizard-error-list" };
function ft(e, t, i, r, s, f) {
  const _ = T("btn");
  return a(), d("div", nt, [
    z("div", at, [
      g(e.$slots, "icon", {}, () => [
        ot
      ])
    ]),
    z("div", null, [
      z("div", lt, [
        e.title ? (a(), d("h3", ct, P(e.title), 1)) : j("", !0),
        g(e.$slots, "default", {}, () => [
          e.isString ? (a(), d("div", dt, P(e.errors), 1)) : e.isError ? (a(), d("div", ut, P(e.errors.message), 1)) : (a(), d("div", ht, [
            z("ul", vt, [
              (a(!0), d(I, null, D(e.errors, (m, o) => (a(), d("li", { key: o }, P(m), 1))), 128))
            ])
          ]))
        ])
      ]),
      E(_, {
        size: e.size,
        variant: "danger",
        block: "",
        onClick: t[0] || (t[0] = (m) => e.$emit("fix", m, e.error))
      }, {
        default: A(() => [
          O(" Fix Errors ")
        ]),
        _: 1
      }, 8, ["size"])
    ])
  ]);
}
const pt = /* @__PURE__ */ K(rt, [["render", ft]]), gt = S({
  props: {
    active: {
      type: [String, Number],
      required: !0
    },
    highestStep: {
      type: Number,
      required: !0
    },
    slots: {
      type: Array,
      required: !0
    }
  },
  methods: {
    label(e) {
      var t;
      return (t = e == null ? void 0 : e.props) == null ? void 0 : t.label;
    }
  }
});
const mt = { class: "wizard-progress" }, yt = { class: "wizard-progress-label" };
function bt(e, t, i, r, s, f) {
  return a(), d("div", mt, [
    (a(!0), d(I, null, D(e.slots, (_, m) => (a(), d("div", {
      key: m,
      class: N(["wizard-progress-step", {
        active: m === e.active,
        disabled: m > e.highestStep,
        complete: m + 1 <= e.highestStep
      }])
    }, [
      z("div", yt, P(e.label(_)), 1)
    ], 2))), 128))
  ]);
}
const $t = /* @__PURE__ */ K(gt, [["render", bt]]), zt = S({
  mixins: [
    re
  ],
  props: {
    title: {
      type: String,
      default: "Success!"
    }
  }
});
const _t = { class: "wizard-success" }, xt = { class: "wizard-success-icon" }, St = /* @__PURE__ */ z("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ z("path", {
    fill: "#55b776",
    d: "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
  })
], -1), Pt = {
  key: 0,
  class: "wizard-success-title"
};
function wt(e, t, i, r, s, f) {
  return a(), d("div", _t, [
    z("div", xt, [
      g(e.$slots, "icon", {}, () => [
        St
      ])
    ]),
    g(e.$slots, "title", { title: e.title }, () => [
      e.title ? (a(), d("h3", Pt, P(e.title), 1)) : j("", !0)
    ]),
    g(e.$slots, "default")
  ]);
}
const kt = /* @__PURE__ */ K(zt, [["render", wt]]), Ct = { class: "wizard" }, At = { class: "wizard-content" }, Bt = { key: 2 };
let B = C(void 0), W = C(void 0), y = C(0), x = C(0), R = C(!1), M = C(), p = C();
function ne() {
  var e;
  return (e = p.value) == null ? void 0 : e.next();
}
function ae() {
  var e;
  return (e = p.value) == null ? void 0 : e.prev();
}
function oe(e) {
  var t;
  return (t = p.value) == null ? void 0 : t.goto(e);
}
function le() {
  R.value = !0, M.value = void 0;
}
function ce(e) {
  R.value = !0, M.value = e || new Error();
}
function Et() {
  var e, t;
  return ((t = (e = se()).default) == null ? void 0 : t.call(e)) || [];
}
function H() {
  return Et().length || 0;
}
const Lt = { next: ne, prev: ae, goto: oe, failed: ce, success: le, totalSlots: H }, G = q(() => y.value === H() - 1), de = q(() => y.value === 0), Wt = [
  {
    id: "back",
    align: "left",
    label: "Back",
    variant: "secondary",
    onClick: () => {
      var e;
      de.value || (e = p.value) == null || e.prev();
    }
  },
  {
    id: "submit",
    align: "right",
    variant: "primary",
    label: () => G.value ? "Submit" : "Next",
    onClick: async () => {
      var e;
      G.value ? R.value = !0 : (e = p.value) == null || e.next();
    }
  }
], jt = /* @__PURE__ */ S({
  __name: "Wizard",
  props: {
    active: { default: void 0 },
    buttons: { default: () => Wt },
    indicator: { default: "spinner" },
    size: { default: "md" }
  },
  emits: ["fix", "enter", "leave", "after-enter", "after-leave", "before-enter", "before-leave"],
  setup(e, { expose: t, emit: i }) {
    const r = e, s = se(), f = C(r.buttons);
    function _(n, l) {
      var h, v;
      (h = p.value) != null && h.$refs.slide && ((v = p.value) == null || v.$refs.slide.$refs.node.$emit("enter", n, l)), i("enter", n, l), B.value = n, W.value = l, y.value = Number(n.key), x.value = Math.max(x.value, y.value);
    }
    function m(n, l) {
      var h, v;
      (h = p.value) != null && h.$refs.slide && ((v = p.value) == null || v.$refs.slide.$refs.node.$emit("leave", n, l)), i("leave", n, l), B.value = n, W.value = l, y.value = Number(n.key), x.value = Math.max(x.value, y.value);
    }
    function o(n, l) {
      var h, v;
      (h = p.value) != null && h.$refs.slide && ((v = p.value) == null || v.$refs.slide.$refs.node.$emit("after-enter", n, l)), i("after-enter", n, l), B.value = n, W.value = l, y.value = Number(n.key), x.value = Math.max(x.value, y.value);
    }
    function u(n, l) {
      var h, v;
      (h = p.value) != null && h.$refs.slide && ((v = p.value) == null || v.$refs.slide.$refs.node.$emit("after-enter", n, l)), i("after-leave", n, l), B.value = n, W.value = l, y.value = Number(n.key), x.value = Math.max(x.value, y.value);
    }
    function c(n, l) {
      var h, v;
      (h = p.value) != null && h.$refs.slide && ((v = p.value) == null || v.$refs.slide.$refs.node.$emit("after-enter", n, l)), i("before-enter", n, l), B.value = n, W.value = l, y.value = Number(n.key), x.value = Math.max(x.value, y.value);
    }
    function b(n, l) {
      var h, v;
      (h = p.value) != null && h.$refs.slide && ((v = p.value) == null || v.$refs.slide.$refs.node.$emit("after-enter", n, l)), i("before-leave", n, l), B.value = n, W.value = l, y.value = Number(n.key), x.value = Math.max(x.value, y.value);
    }
    function $(n, l) {
      i("fix", n, l), n.defaultPrevented || (R.value = !1);
    }
    return t({
      next: ne,
      prev: ae,
      goto: oe,
      failed: ce,
      success: le,
      totalSlots: H
    }), (n, l) => {
      var h, v;
      return a(), d("div", Ct, [
        R.value ? M.value ? (a(), d("div", Bt, [
          g(n.$slots, "error", { error: M.value }, () => [
            E(pt, {
              error: M.value,
              onFix: $
            }, null, 8, ["error"])
          ])
        ])) : g(n.$slots, "success", { key: 1 }, () => [
          E(kt)
        ]) : (a(), d(I, { key: 0 }, [
          g(n.$slots, "progress", {
            active: y.value,
            highestStep: x.value
          }, () => {
            var Q, U;
            return [
              H() > 1 ? (a(), k($t, {
                key: 0,
                active: y.value,
                "highest-step": x.value,
                slots: (U = (Q = w(s)).default) == null ? void 0 : U.call(Q)
              }, null, 8, ["active", "highest-step", "slots"])) : j("", !0)
            ];
          }),
          z("div", At, [
            E(w(_e), {
              ref_key: "deck",
              ref: p,
              slots: (v = (h = w(s)).default) == null ? void 0 : v.call(h),
              onEnter: _,
              onLeave: m,
              onAfterEnter: o,
              onAfterLeave: u,
              onBeforeEnter: c,
              onBeforeLeave: b
            }, null, 8, ["slots"])
          ]),
          E(Ue, {
            active: y.value,
            "current-slot": B.value,
            buttons: f.value,
            indicator: e.indicator,
            "is-first-slot": w(de),
            "is-last-slot": w(G),
            size: e.size,
            "total-slots": H(),
            context: Lt
          }, null, 8, ["active", "current-slot", "buttons", "indicator", "is-first-slot", "is-last-slot", "size", "total-slots"])
        ], 64))
      ]);
    };
  }
});
const Nt = S({
  props: {
    center: {
      type: Boolean,
      default: !0
    },
    tag: {
      type: String,
      default: "h2"
    }
  }
});
function Ot(e, t, i, r, s, f) {
  return a(), k(V(e.tag), {
    class: N(["wizard-header", { "wizard-header-center": e.center }])
  }, {
    default: A(() => [
      g(e.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const It = /* @__PURE__ */ K(Nt, [["render", Ot]]), Mt = { class: "wizard-step" }, Rt = /* @__PURE__ */ S({
  __name: "WizardStep",
  emits: ["enter", "leave", "after-enter", "after-leave", "before-enter", "before-leave"],
  setup(e) {
    return (t, i) => (a(), d("div", Mt, [
      g(t.$slots, "default", { ref: "content" })
    ]));
  }
});
export {
  jt as Wizard,
  Ue as WizardControls,
  pt as WizardError,
  It as WizardHeader,
  $t as WizardProgress,
  Rt as WizardStep,
  kt as WizardSuccess
};
//# sourceMappingURL=wizard.js.map
