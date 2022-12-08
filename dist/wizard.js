import { ref as $, defineComponent as m, onMounted as at, openBlock as n, createElementBlock as c, createBlock as z, resolveDynamicComponent as H, resolveComponent as M, normalizeClass as w, renderSlot as u, createElementVNode as p, normalizeStyle as U, createVNode as S, Transition as ot, withCtx as _, KeepAlive as lt, inject as ct, createCommentVNode as W, toDisplayString as y, mergeProps as D, createTextVNode as k, normalizeProps as dt, guardReactiveProps as ut, computed as V, unref as b, Fragment as O, renderList as F, useSlots as X } from "vue";
const ht = { class: "slide-deck-slide" };
let Z = $();
const vt = /* @__PURE__ */ m({
  __name: "Slide",
  props: {
    node: null
  },
  setup(t) {
    const e = t;
    return at(() => {
      var i, r;
      (r = (i = Z.value) == null ? void 0 : i.el) == null || r.dispatchEvent(new Event("enter"));
    }), (i, r) => (n(), c("div", ht, [
      (n(), z(H(e.node), {
        ref_key: "node",
        ref: Z
      }, null, 512))
    ]));
  }
}), ft = m({
  components: {
    Slide: vt
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
    currentActive(t, e) {
      this.lastSlide = e, this.direction = this.findIndex(e) > this.findIndex(t) ? "backward" : "forward";
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mounted = !0, this.$emit("enter", this.slot());
    });
  },
  methods: {
    findIndex(t) {
      return this.vnodes().findIndex((e, i) => e.key === t || i === t);
    },
    find(t) {
      return this.vnodes()[this.findIndex(t)];
    },
    first() {
      this.goto(0);
    },
    last() {
      this.goto(this.vnodes().length - 1);
    },
    goto(t) {
      this.sliding || (this.currentActive = Math.max(0, t));
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
    resize(t) {
      const e = getComputedStyle(t).height;
      this.maxHeight = e === "0x" ? this.maxHeight : e;
    },
    slot() {
      return this.find(this.currentActive);
    },
    vnodes() {
      return (this.slots || this.$slots.default(this)).map((t, e) => (t.props = Object.assign(
        {},
        t.props,
        this.props,
        this.attrs
      ), Object.assign(t, {
        key: e
      })));
    },
    onClickControl(t, e) {
      this.sliding || this.goto(e);
    },
    onBeforeLeave(t) {
      this.autoResize && this.resize(t), this.$emit(
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
    onEnter(t) {
      this.$nextTick(() => {
        this.autoResize && this.resize(t), this.$emit(
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
      this.$emit(
        "leave",
        this.slot(),
        this.find(this.lastSlide)
      );
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
}), pt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function gt(t, e, i, r, s, d) {
  const g = M("slide");
  return n(), c("div", {
    class: w(["slide-deck", { sliding: t.sliding }])
  }, [
    u(t.$slots, "top", { active: t.currentActive }),
    p("div", {
      ref: "content",
      class: w(["slide-deck-content", { [t.direction]: !0 }]),
      style: U({ maxHeight: t.maxHeight })
    }, [
      S(ot, {
        name: `slide-${t.direction}`,
        onBeforeEnter: t.onBeforeEnter,
        onEnter: t.onEnter,
        onAfterEnter: t.onAfterEnter,
        onBeforeLeave: t.onBeforeLeave,
        onLeave: t.onLeave,
        onAfterLeave: t.onAfterLeave
      }, {
        default: _(() => [
          (n(), z(lt, null, [
            (n(), z(g, {
              ref: "slide",
              key: t.currentActive,
              node: t.find(t.currentActive)
            }, null, 8, ["node"]))
          ], 1024))
        ]),
        _: 1
      }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
    ], 6),
    u(t.$slots, "middle", { active: t.currentActive }),
    u(t.$slots, "bottom", { active: t.currentActive })
  ], 2);
}
const mt = /* @__PURE__ */ pt(ft, [["render", gt]]);
function P(t, e = "px") {
  return t != null && t !== !1 && isFinite(t) ? `${t}${e}` : t;
}
const yt = m({
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
  setup(t) {
    return {
      registryInstance: ct(t.registry || "indicators")
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
        width: P(this.width),
        maxWidth: P(this.maxWidth),
        minWidth: P(this.minWidth),
        height: P(this.height),
        maxHeight: P(this.maxHeight),
        minHeight: P(this.minHeight)
      };
    }
  },
  async mounted() {
    const t = await this.component();
    this.is = () => t;
  },
  methods: {
    async component() {
      let t = this.registryInstance.get(this.type);
      return t instanceof Promise ? t : (typeof t == "function" && (t = await t()), t.default ? t.default : t);
    }
  }
}), bt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
}, zt = { class: "activity-indicator-content" }, $t = {
  key: 1,
  class: "activity-indicator-label"
};
function _t(t, e, i, r, s, d) {
  return n(), c("div", {
    class: w(["activity-indicator", t.classes]),
    style: U(t.style)
  }, [
    p("div", zt, [
      t.is ? (n(), z(H(t.is()), {
        key: 0,
        class: "mx-auto"
      })) : W("", !0),
      t.label ? (n(), c("div", $t, y(t.label), 1)) : W("", !0)
    ])
  ], 6);
}
const xt = /* @__PURE__ */ bt(yt, [["render", _t]]);
var St = Object.defineProperty, Pt = (t, e, i) => e in t ? St(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, wt = (t, e, i) => (Pt(t, typeof e != "symbol" ? e + "" : e, i), i), T = function() {
  return T = Object.assign || function(t) {
    for (var e, i = 1, r = arguments.length; i < r; i++) {
      e = arguments[i];
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
    }
    return t;
  }, T.apply(this, arguments);
};
function kt(t) {
  return t.toLowerCase();
}
var Ct = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], At = /[^A-Z0-9]+/gi;
function Bt(t, e) {
  e === void 0 && (e = {});
  for (var i = e.splitRegexp, r = i === void 0 ? Ct : i, s = e.stripRegexp, d = s === void 0 ? At : s, g = e.transform, h = g === void 0 ? kt : g, a = e.delimiter, o = a === void 0 ? " " : a, l = K(K(t, r, "$1\0$2"), d, "\0"), v = 0, f = l.length; l.charAt(v) === "\0"; )
    v++;
  for (; l.charAt(f - 1) === "\0"; )
    f--;
  return l.slice(v, f).split("\0").map(h).join(o);
}
function K(t, e, i) {
  return e instanceof RegExp ? t.replace(e, i) : e.reduce(function(r, s) {
    return r.replace(s, i);
  }, t);
}
function Et(t, e) {
  return e === void 0 && (e = {}), Bt(t, T({ delimiter: "." }, e));
}
function I(t, e) {
  return e === void 0 && (e = {}), Et(t, T({ delimiter: "-" }, e));
}
class Lt {
  constructor(e = {}) {
    wt(this, "components"), this.components = /* @__PURE__ */ new Map(), Object.entries(e).forEach(([i, r]) => {
      this.register(i, r);
    });
  }
  get(e) {
    const i = this.components.get(
      e = I(e)
    );
    if (i)
      return i;
    throw new Error(`"${e}" has not been registered yet!`);
  }
  register(e, i) {
    return typeof e == "object" ? (Object.entries(e).forEach(([r, s]) => {
      this.register(I(r), s);
    }), this) : (this.components.set(I(e), i), this);
  }
  remove(e) {
    return this.components.delete(I(e)), this;
  }
  reset() {
    return this.components = /* @__PURE__ */ new Map(), this;
  }
}
function Wt(t = {}) {
  return new Lt(t);
}
Wt();
const Ot = {
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
}, Nt = {
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
}, Ht = m({
  mixins: [
    Ot,
    Nt
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
}), jt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function It(t, e, i, r, s, d) {
  return n(), z(H(t.component), D(t.$attrs, {
    disabled: t.disabled,
    class: t.classes,
    role: "button"
  }), {
    default: _(() => [
      u(t.$slots, "default", {}, () => [
        k(y(t.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const Rt = /* @__PURE__ */ jt(Ht, [["render", It]]), Mt = function(t) {
  const e = parseFloat(t || 0), i = t && t.match(/m?s/), r = i ? i[0] : !1;
  let s;
  switch (r) {
    case "s":
      s = e * 1e3;
      break;
    case "ms":
    default:
      s = e;
      break;
  }
  return s || 0;
}, G = function(t, e) {
  const i = (t.ownerDocument || document).defaultView;
  setTimeout(
    e,
    Mt(
      i == null ? void 0 : i.getComputedStyle(t).animationDuration
    )
  );
}, Vt = m({
  components: {
    ActivityIndicator: xt,
    Btn: Rt
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
    activity(t) {
      t ? this.showActivity() : this.hideActivity();
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
      this.$el.classList.add("btn-hide-activity"), G(this.$el, () => {
        this.disabled || this.enable(), this.currentActivity = !1, this.$el.classList.remove("btn-activity", "btn-hide-activity"), this.$emit("hide-activity");
      });
    },
    showActivity() {
      this.currentActivity = !0, this.disable(), G(this.$el, () => {
        this.$el.classList.add("btn-activity"), this.$emit("show-activity");
      });
    },
    toggle() {
      this.currentActivity ? this.hideActivity() : this.showActivity();
    }
  }
}), Ft = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function Tt(t, e, i, r, s, d) {
  const g = M("activity-indicator"), h = M("btn");
  return n(), z(h, D({
    active: t.active,
    block: t.block,
    disabled: t.disabled,
    size: t.size,
    tag: t.tag,
    variant: t.variant,
    class: t.classes
  }, Object.assign({}, t.$attrs, { onClick: void 0 }), {
    onClick: e[0] || (e[0] = (a) => !t.disabled && t.$emit("click", a, {
      disable: t.disable,
      enable: t.enable,
      toggle: t.toggle,
      showActivity: t.showActivity,
      hideActivity: t.hideActivity
    }))
  }), {
    default: _(() => [
      u(t.$slots, "default", {}, () => [
        k(y(t.label), 1)
      ]),
      S(g, dt(ut(t.indicatorProps)), null, 16)
    ]),
    _: 3
  }, 16, ["active", "block", "disabled", "size", "tag", "variant", "class"]);
}
const J = /* @__PURE__ */ Ft(Vt, [["render", Tt]]), qt = { class: "wizard-controls-left wizard-controls-section" }, Dt = { class: "wizard-controls-right wizard-controls-section" }, Zt = /* @__PURE__ */ m({
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
  setup(t) {
    const e = t, i = V(() => e.buttons.filter((a) => s(a.align) === "left")), r = V(() => e.buttons.filter((a) => s(a.align) === void 0 || a.align === "right"));
    function s(a) {
      return typeof a == "function" ? a(e.context) : a;
    }
    function d(a, o) {
      var v, f;
      const l = (f = (v = e.currentSlot) == null ? void 0 : v.props) == null ? void 0 : f[`${a.id}-${o}`];
      return l ? !!s(l) : typeof a[o] == "function" ? !!s(a[o]) : a[o];
    }
    function g(a) {
      return a === !0 || typeof a > "u";
    }
    async function h(a, o) {
      var v, f, A, B;
      const l = (f = (v = e.currentSlot) == null ? void 0 : v.props) == null ? void 0 : f[o.id];
      if (!l)
        return (A = o.onClick) == null ? void 0 : A.call(o, a, o);
      o.activity = !0, g(await Promise.resolve(s(l))) && ((B = o.onClick) == null || B.call(o, a, o)), o.activity = !1;
    }
    return (a, o) => (n(), c("div", {
      class: w(["wizard-controls", { [`wizard-controls-${e.size}`]: !0 }])
    }, [
      p("div", qt, [
        u(a.$slots, "left", { leftButtons: b(i) }, () => [
          (n(!0), c(O, null, F(b(i), (l, v) => (n(), z(b(J), {
            key: `left-button-${v}`,
            type: "button",
            activity: !!d(l, "activity"),
            disabled: !!d(l, "disabled"),
            indicator: e.indicator,
            size: e.size,
            variant: String(d(l, "variant") || "secondary"),
            onClick: (f) => h(f, l)
          }, {
            default: _(() => [
              k(y(s(l.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ]),
      p("div", Dt, [
        u(a.$slots, "right", { rightButtons: b(r) }, () => [
          (n(!0), c(O, null, F(b(r), (l, v) => (n(), z(b(J), {
            key: `right-button-${v}`,
            type: "button",
            activity: !!d(l, "activity"),
            disabled: !!d(l, "disabled"),
            indicator: e.indicator,
            size: e.size,
            variant: String(d(l, "variant")),
            onClick: (f) => h(f, l)
          }, {
            default: _(() => [
              k(y(s(l.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ])
    ], 2));
  }
});
const Kt = {
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
}, Gt = {
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
}, Jt = m({
  mixins: [
    Kt,
    Gt
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
}), Qt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function Ut(t, e, i, r, s, d) {
  return n(), z(H(t.component), D(t.$attrs, {
    disabled: t.disabled,
    class: t.classes,
    role: "button"
  }), {
    default: _(() => [
      u(t.$slots, "default", {}, () => [
        k(y(t.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const Xt = /* @__PURE__ */ Qt(Jt, [["render", Ut]]), Y = m({
  props: {
    componentPrefix: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: void 0
    },
    sizePrefix: {
      type: String,
      default: void 0
    }
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
}), Yt = m({
  components: {
    Btn: Xt
  },
  mixins: [
    Y
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
      default(t) {
        return t;
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
const j = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
}, te = { class: "wizard-error" }, ee = { class: "wizard-error-icon" }, ie = /* @__PURE__ */ p("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ p("path", {
    fill: "#b10805",
    d: "M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
  })
], -1), se = { class: "wizard-error-body" }, re = {
  key: 0,
  class: "wizard-error-title"
}, ne = { key: 0 }, ae = { key: 1 }, oe = { key: 2 }, le = { class: "wizard-error-list" };
function ce(t, e, i, r, s, d) {
  const g = M("btn");
  return n(), c("div", te, [
    p("div", ee, [
      u(t.$slots, "icon", {}, () => [
        ie
      ])
    ]),
    p("div", null, [
      p("div", se, [
        t.title ? (n(), c("h3", re, y(t.title), 1)) : W("", !0),
        u(t.$slots, "default", {}, () => [
          t.isString ? (n(), c("div", ne, y(t.errors), 1)) : t.isError ? (n(), c("div", ae, y(t.errors.message), 1)) : (n(), c("div", oe, [
            p("ul", le, [
              (n(!0), c(O, null, F(t.errors, (h, a) => (n(), c("li", { key: a }, y(h), 1))), 128))
            ])
          ]))
        ])
      ]),
      S(g, {
        size: t.size,
        variant: "danger",
        block: "",
        onClick: e[0] || (e[0] = (h) => t.$emit("fix", h, t.error))
      }, {
        default: _(() => [
          k(" Fix Errors ")
        ]),
        _: 1
      }, 8, ["size"])
    ])
  ]);
}
const de = /* @__PURE__ */ j(Yt, [["render", ce]]), ue = m({
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
    label(t) {
      var e;
      return (e = t == null ? void 0 : t.props) == null ? void 0 : e.label;
    }
  }
});
const he = { class: "wizard-progress" }, ve = { class: "wizard-progress-label" };
function fe(t, e, i, r, s, d) {
  return n(), c("div", he, [
    (n(!0), c(O, null, F(t.slots, (g, h) => (n(), c("div", {
      key: h,
      class: w(["wizard-progress-step", {
        active: h === t.active,
        disabled: h > t.highestStep,
        complete: h + 1 <= t.highestStep
      }])
    }, [
      p("div", ve, y(t.label(g)), 1)
    ], 2))), 128))
  ]);
}
const pe = /* @__PURE__ */ j(ue, [["render", fe]]), ge = m({
  mixins: [
    Y
  ],
  props: {
    title: {
      type: String,
      default: "Success!"
    }
  }
});
const me = { class: "wizard-success" }, ye = { class: "wizard-success-icon" }, be = /* @__PURE__ */ p("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ p("path", {
    fill: "#55b776",
    d: "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
  })
], -1), ze = {
  key: 0,
  class: "wizard-success-title"
};
function $e(t, e, i, r, s, d) {
  return n(), c("div", me, [
    p("div", ye, [
      u(t.$slots, "icon", {}, () => [
        be
      ])
    ]),
    u(t.$slots, "title", { title: t.title }, () => [
      t.title ? (n(), c("h3", ze, y(t.title), 1)) : W("", !0)
    ]),
    u(t.$slots, "default")
  ]);
}
const _e = /* @__PURE__ */ j(ge, [["render", $e]]), xe = { class: "wizard" }, Se = { class: "wizard-content" }, Pe = { key: 2 };
let Q = $(void 0), we = $(void 0), x = $(0), R = $(0), N = $(!1), E = $(), C = $();
function tt() {
  var t;
  return (t = C.value) == null ? void 0 : t.next();
}
function et() {
  var t;
  return (t = C.value) == null ? void 0 : t.prev();
}
function it(t) {
  var e;
  return (e = C.value) == null ? void 0 : e.goto(t);
}
function st() {
  N.value = !0, E.value = void 0;
}
function rt(t) {
  N.value = !0, E.value = t || new Error();
}
function ke() {
  var t, e;
  return ((e = (t = X()).default) == null ? void 0 : e.call(t)) || [];
}
function L() {
  return ke().length || 0;
}
const Ce = { next: tt, prev: et, goto: it, failed: rt, success: st, totalSlots: L }, q = V(() => x.value === L() - 1), nt = V(() => x.value === 0), Ae = [
  {
    id: "back",
    align: "left",
    label: "Back",
    variant: "secondary",
    onClick: () => {
      var t;
      nt.value || (t = C.value) == null || t.prev();
    }
  },
  {
    id: "submit",
    align: "right",
    variant: "primary",
    label: () => q.value ? "Submit" : "Next",
    onClick: async () => {
      var t;
      q.value ? N.value = !0 : (t = C.value) == null || t.next();
    }
  }
], He = /* @__PURE__ */ m({
  __name: "Wizard",
  props: {
    active: { default: void 0 },
    buttons: { default: () => Ae },
    indicator: { default: "spinner" },
    size: { default: "md" }
  },
  emits: ["fix"],
  setup(t, { expose: e, emit: i }) {
    const r = t, s = X(), d = $(r.buttons);
    function g(o, l) {
      Q.value = o, we.value = l, x.value = Number(o.key), R.value = Math.max(R.value, x.value);
    }
    function h(o, l) {
    }
    function a(o, l) {
      i("fix", o, l), o.defaultPrevented || (N.value = !1);
    }
    return e({
      next: tt,
      prev: et,
      goto: it,
      failed: rt,
      success: st,
      totalSlots: L
    }), (o, l) => {
      var v, f;
      return n(), c("div", xe, [
        N.value ? E.value ? (n(), c("div", Pe, [
          u(o.$slots, "error", { error: E.value }, () => [
            S(de, {
              error: E.value,
              onFix: a
            }, null, 8, ["error"])
          ])
        ])) : u(o.$slots, "success", { key: 1 }, () => [
          S(_e)
        ]) : (n(), c(O, { key: 0 }, [
          u(o.$slots, "progress", {
            active: x.value,
            highestStep: R.value
          }, () => {
            var A, B;
            return [
              L() > 1 ? (n(), z(pe, {
                key: 0,
                active: x.value,
                "highest-step": R.value,
                slots: (B = (A = b(s)).default) == null ? void 0 : B.call(A)
              }, null, 8, ["active", "highest-step", "slots"])) : W("", !0)
            ];
          }),
          p("div", Se, [
            S(b(mt), {
              ref_key: "deck",
              ref: C,
              slots: (f = (v = b(s)).default) == null ? void 0 : f.call(v),
              onEnter: g,
              onLeave: h
            }, null, 8, ["slots"])
          ]),
          S(Zt, {
            active: x.value,
            "current-slot": Q.value,
            buttons: d.value,
            indicator: t.indicator,
            "is-first-slot": b(nt),
            "is-last-slot": b(q),
            size: t.size,
            "total-slots": L(),
            context: Ce
          }, null, 8, ["active", "current-slot", "buttons", "indicator", "is-first-slot", "is-last-slot", "size", "total-slots"])
        ], 64))
      ]);
    };
  }
});
const Be = m({
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
function Ee(t, e, i, r, s, d) {
  return n(), z(H(t.tag), {
    class: w(["wizard-header", { "wizard-header-center": t.center }])
  }, {
    default: _(() => [
      u(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const je = /* @__PURE__ */ j(Be, [["render", Ee]]), Le = {}, We = { class: "wizard-step" };
function Oe(t, e) {
  return n(), c("div", We, [
    u(t.$slots, "default", { ref: "content" })
  ]);
}
const Ie = /* @__PURE__ */ j(Le, [["render", Oe]]);
export {
  He as Wizard,
  Zt as WizardControls,
  de as WizardError,
  je as WizardHeader,
  pe as WizardProgress,
  Ie as WizardStep,
  _e as WizardSuccess
};
//# sourceMappingURL=wizard.js.map
