import { ref as $, defineComponent as y, onMounted as et, openBlock as a, createElementBlock as c, createBlock as z, resolveDynamicComponent as W, resolveComponent as j, normalizeClass as w, renderSlot as u, createElementVNode as p, normalizeStyle as U, createVNode as S, Transition as it, withCtx as _, KeepAlive as st, inject as rt, createCommentVNode as B, toDisplayString as m, mergeProps as q, createTextVNode as k, normalizeProps as nt, guardReactiveProps as at, computed as I, unref as b, Fragment as E, renderList as R, useSlots as X } from "vue";
const ot = { class: "slide-deck-slide" };
let Z = $();
const lt = /* @__PURE__ */ y({
  __name: "Slide",
  props: {
    node: null
  },
  setup(t) {
    const e = t;
    return et(() => {
      var i, r;
      (r = (i = Z.value) == null ? void 0 : i.el) == null || r.dispatchEvent(new Event("enter"));
    }), (i, r) => (a(), c("div", ot, [
      (a(), z(W(e.node), {
        ref_key: "node",
        ref: Z
      }, null, 512))
    ]));
  }
}), ct = y({
  components: {
    Slide: lt
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
}), dt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function ut(t, e, i, r, s, d) {
  const g = j("slide");
  return a(), c("div", {
    class: w(["slide-deck", { sliding: t.sliding }])
  }, [
    u(t.$slots, "top", { active: t.currentActive }),
    p("div", {
      ref: "content",
      class: w(["slide-deck-content", { [t.direction]: !0 }]),
      style: U({ maxHeight: t.maxHeight })
    }, [
      S(it, {
        name: `slide-${t.direction}`,
        onBeforeEnter: t.onBeforeEnter,
        onEnter: t.onEnter,
        onAfterEnter: t.onAfterEnter,
        onBeforeLeave: t.onBeforeLeave,
        onLeave: t.onLeave,
        onAfterLeave: t.onAfterLeave
      }, {
        default: _(() => [
          (a(), z(st, null, [
            (a(), z(g, {
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
const ht = /* @__PURE__ */ dt(ct, [["render", ut]]);
function P(t, e = "px") {
  return t != null && t !== !1 && isFinite(t) ? `${t}${e}` : t;
}
const vt = y({
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
      registryInstance: rt(t.registry || "indicators")
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
}), ft = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
}, pt = { class: "activity-indicator-content" }, gt = {
  key: 1,
  class: "activity-indicator-label"
};
function mt(t, e, i, r, s, d) {
  return a(), c("div", {
    class: w(["activity-indicator", t.classes]),
    style: U(t.style)
  }, [
    p("div", pt, [
      t.is ? (a(), z(W(t.is()), {
        key: 0,
        class: "mx-auto"
      })) : B("", !0),
      t.label ? (a(), c("div", gt, m(t.label), 1)) : B("", !0)
    ])
  ], 6);
}
const yt = /* @__PURE__ */ ft(vt, [["render", mt]]);
var bt = Object.defineProperty, zt = (t, e, i) => e in t ? bt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, $t = (t, e, i) => (zt(t, typeof e != "symbol" ? e + "" : e, i), i), M = function() {
  return M = Object.assign || function(t) {
    for (var e, i = 1, r = arguments.length; i < r; i++) {
      e = arguments[i];
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
    }
    return t;
  }, M.apply(this, arguments);
};
function _t(t) {
  return t.toLowerCase();
}
var xt = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], St = /[^A-Z0-9]+/gi;
function Pt(t, e) {
  e === void 0 && (e = {});
  for (var i = e.splitRegexp, r = i === void 0 ? xt : i, s = e.stripRegexp, d = s === void 0 ? St : s, g = e.transform, h = g === void 0 ? _t : g, n = e.delimiter, o = n === void 0 ? " " : n, l = K(K(t, r, "$1\0$2"), d, "\0"), v = 0, f = l.length; l.charAt(v) === "\0"; )
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
function wt(t, e) {
  return e === void 0 && (e = {}), Pt(t, M({ delimiter: "." }, e));
}
function N(t, e) {
  return e === void 0 && (e = {}), wt(t, M({ delimiter: "-" }, e));
}
class kt {
  constructor(e = {}) {
    $t(this, "components"), this.components = /* @__PURE__ */ new Map(), Object.entries(e).forEach(([i, r]) => {
      this.register(i, r);
    });
  }
  get(e) {
    const i = this.components.get(
      e = N(e)
    );
    if (i)
      return i;
    throw new Error(`"${e}" has not been registered yet!`);
  }
  register(e, i) {
    return typeof e == "object" ? (Object.entries(e).forEach(([r, s]) => {
      this.register(N(r), s);
    }), this) : (this.components.set(N(e), i), this);
  }
  remove(e) {
    return this.components.delete(N(e)), this;
  }
  reset() {
    return this.components = /* @__PURE__ */ new Map(), this;
  }
}
function Ct(t = {}) {
  return new kt(t);
}
Ct();
const At = {
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
}, Bt = {
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
}, Et = y({
  mixins: [
    At,
    Bt
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
}), Lt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function Wt(t, e, i, r, s, d) {
  return a(), z(W(t.component), q(t.$attrs, {
    disabled: t.disabled,
    class: t.classes,
    role: "button"
  }), {
    default: _(() => [
      u(t.$slots, "default", {}, () => [
        k(m(t.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const Ot = /* @__PURE__ */ Lt(Et, [["render", Wt]]), Nt = function(t) {
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
    Nt(
      i == null ? void 0 : i.getComputedStyle(t).animationDuration
    )
  );
}, Ht = y({
  components: {
    ActivityIndicator: yt,
    Btn: Ot
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
}), jt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function It(t, e, i, r, s, d) {
  const g = j("activity-indicator"), h = j("btn");
  return a(), z(h, q({
    active: t.active,
    block: t.block,
    disabled: t.disabled,
    size: t.size,
    tag: t.tag,
    variant: t.variant,
    class: t.classes
  }, Object.assign({}, t.$attrs, { onClick: void 0 }), {
    onClick: e[0] || (e[0] = (n) => !t.disabled && t.$emit("click", n, {
      disable: t.disable,
      enable: t.enable,
      toggle: t.toggle,
      showActivity: t.showActivity,
      hideActivity: t.hideActivity
    }))
  }), {
    default: _(() => [
      u(t.$slots, "default", {}, () => [
        k(m(t.label), 1)
      ]),
      S(g, nt(at(t.indicatorProps)), null, 16)
    ]),
    _: 3
  }, 16, ["active", "block", "disabled", "size", "tag", "variant", "class"]);
}
const J = /* @__PURE__ */ jt(Ht, [["render", It]]), Rt = { class: "wizard-controls-left wizard-controls-section" }, Mt = { class: "wizard-controls-right wizard-controls-section" }, Vt = /* @__PURE__ */ y({
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
    const e = t, i = I(() => e.buttons.filter((n) => s(n.align) === "left")), r = I(() => e.buttons.filter((n) => s(n.align) === void 0 || n.align === "right"));
    function s(n) {
      return typeof n == "function" ? n(e.context) : n;
    }
    function d(n, o) {
      var v, f;
      const l = (f = (v = e.currentSlot) == null ? void 0 : v.props) == null ? void 0 : f[`${n.id}-${o}`];
      return l ? !!s(l) : typeof n[o] == "function" ? !!s(n[o]) : n[o];
    }
    function g(n) {
      return n === !0 || typeof n > "u";
    }
    async function h(n, o) {
      var v, f, C, D;
      const l = (f = (v = e.currentSlot) == null ? void 0 : v.props) == null ? void 0 : f[o.id];
      if (!l)
        return (C = o.onClick) == null ? void 0 : C.call(o, n, o);
      o.activity = !0, g(await Promise.resolve(s(l))) && ((D = o.onClick) == null || D.call(o, n, o)), o.activity = !1;
    }
    return (n, o) => (a(), c("div", {
      class: w(["wizard-controls", { [`wizard-controls-${e.size}`]: !0 }])
    }, [
      p("div", Rt, [
        u(n.$slots, "left", { leftButtons: b(i) }, () => [
          (a(!0), c(E, null, R(b(i), (l, v) => (a(), z(b(J), {
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
              k(m(s(l.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ]),
      p("div", Mt, [
        u(n.$slots, "right", { rightButtons: b(r) }, () => [
          (a(!0), c(E, null, R(b(r), (l, v) => (a(), z(b(J), {
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
              k(m(s(l.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ])
    ], 2));
  }
});
const Ft = {
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
}, Tt = {
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
}, qt = y({
  mixins: [
    Ft,
    Tt
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
}), Dt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function Zt(t, e, i, r, s, d) {
  return a(), z(W(t.component), q(t.$attrs, {
    disabled: t.disabled,
    class: t.classes,
    role: "button"
  }), {
    default: _(() => [
      u(t.$slots, "default", {}, () => [
        k(m(t.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const Kt = /* @__PURE__ */ Dt(qt, [["render", Zt]]), Y = {
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
}, Gt = y({
  components: {
    Btn: Kt
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
const O = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
}, Jt = { class: "wizard-error" }, Qt = { class: "wizard-error-icon" }, Ut = /* @__PURE__ */ p("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ p("path", {
    fill: "#b10805",
    d: "M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
  })
], -1), Xt = { class: "wizard-error-body" }, Yt = {
  key: 0,
  class: "wizard-error-title"
}, te = { key: 0 }, ee = { key: 1 }, ie = { key: 2 }, se = { class: "wizard-error-list" };
function re(t, e, i, r, s, d) {
  const g = j("btn");
  return a(), c("div", Jt, [
    p("div", Qt, [
      u(t.$slots, "icon", {}, () => [
        Ut
      ])
    ]),
    p("div", null, [
      p("div", Xt, [
        t.title ? (a(), c("h3", Yt, m(t.title), 1)) : B("", !0),
        u(t.$slots, "default", {}, () => [
          t.isString ? (a(), c("div", te, m(t.errors), 1)) : t.isError ? (a(), c("div", ee, m(t.errors.message), 1)) : (a(), c("div", ie, [
            p("ul", se, [
              (a(!0), c(E, null, R(t.errors, (h, n) => (a(), c("li", { key: n }, m(h), 1))), 128))
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
const ne = /* @__PURE__ */ O(Gt, [["render", re]]), ae = y({
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
const oe = { class: "wizard-progress" }, le = { class: "wizard-progress-label" };
function ce(t, e, i, r, s, d) {
  return a(), c("div", oe, [
    (a(!0), c(E, null, R(t.slots, (g, h) => (a(), c("div", {
      key: h,
      class: w(["wizard-progress-step", {
        active: h === t.active,
        disabled: h > t.highestStep,
        complete: h + 1 <= t.highestStep
      }])
    }, [
      p("div", le, m(t.label(g)), 1)
    ], 2))), 128))
  ]);
}
const de = /* @__PURE__ */ O(ae, [["render", ce]]), ue = y({
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
const he = { class: "wizard-success" }, ve = { class: "wizard-success-icon" }, fe = /* @__PURE__ */ p("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ p("path", {
    fill: "#55b776",
    d: "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
  })
], -1), pe = {
  key: 0,
  class: "wizard-success-title"
};
function ge(t, e, i, r, s, d) {
  return a(), c("div", he, [
    p("div", ve, [
      u(t.$slots, "icon", {}, () => [
        fe
      ])
    ]),
    u(t.$slots, "title", { title: t.title }, () => [
      t.title ? (a(), c("h3", pe, m(t.title), 1)) : B("", !0)
    ]),
    u(t.$slots, "default")
  ]);
}
const me = /* @__PURE__ */ O(ue, [["render", ge]]), ye = { class: "wizard" }, be = { class: "wizard-content" }, ze = { key: 2 };
let Q = $(void 0), $e = $(void 0), x = $(0), H = $(0), L = $(!1), A = $(), F = $();
function _e() {
  L.value = !0, A.value = void 0;
}
function xe(t) {
  L.value = !0, A.value = t || new Error();
}
function Se() {
  var t, e;
  return ((e = (t = X()).default) == null ? void 0 : e.call(t)) || [];
}
function V() {
  return Se().length || 0;
}
const Pe = { failed: xe, success: _e, totalSlots: V }, T = I(() => x.value === V() - 1), tt = I(() => x.value === 0), we = [
  {
    id: "back",
    align: "left",
    label: "Back",
    variant: "secondary",
    onClick: () => {
      var t;
      tt.value || (t = F.value) == null || t.prev();
    }
  },
  {
    id: "submit",
    align: "right",
    variant: "primary",
    label: () => T.value ? "Submit" : "Next",
    onClick: async () => {
      var t;
      T.value ? L.value = !0 : (t = F.value) == null || t.next();
    }
  }
], We = /* @__PURE__ */ y({
  __name: "Wizard",
  props: {
    active: { default: void 0 },
    buttons: { default: () => we },
    indicator: { default: "spinner" },
    size: { default: "md" }
  },
  emits: ["fix"],
  setup(t, { emit: e }) {
    const i = t, r = X(), s = $(i.buttons);
    function d(n, o) {
      Q.value = n, $e.value = o, x.value = Number(n.key), H.value = Math.max(H.value, x.value);
    }
    function g(n, o) {
    }
    function h(n, o) {
      e("fix", n, o), n.defaultPrevented || (L.value = !1);
    }
    return (n, o) => {
      var l, v;
      return a(), c("div", ye, [
        L.value ? A.value ? (a(), c("div", ze, [
          u(n.$slots, "error", { error: A.value }, () => [
            S(ne, {
              error: A.value,
              onFix: h
            }, null, 8, ["error"])
          ])
        ])) : u(n.$slots, "success", { key: 1 }, () => [
          S(me)
        ]) : (a(), c(E, { key: 0 }, [
          u(n.$slots, "progress", {
            active: x.value,
            highestStep: H.value
          }, () => {
            var f, C;
            return [
              V() > 1 ? (a(), z(de, {
                key: 0,
                active: x.value,
                "highest-step": H.value,
                slots: (C = (f = b(r)).default) == null ? void 0 : C.call(f)
              }, null, 8, ["active", "highest-step", "slots"])) : B("", !0)
            ];
          }),
          p("div", be, [
            S(b(ht), {
              ref_key: "deck",
              ref: F,
              slots: (v = (l = b(r)).default) == null ? void 0 : v.call(l),
              onEnter: d,
              onLeave: g
            }, null, 8, ["slots"])
          ]),
          S(Vt, {
            active: x.value,
            "current-slot": Q.value,
            buttons: s.value,
            indicator: t.indicator,
            "is-first-slot": b(tt),
            "is-last-slot": b(T),
            size: t.size,
            "total-slots": V(),
            context: Pe
          }, null, 8, ["active", "current-slot", "buttons", "indicator", "is-first-slot", "is-last-slot", "size", "total-slots"])
        ], 64))
      ]);
    };
  }
});
const ke = y({
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
function Ce(t, e, i, r, s, d) {
  return a(), z(W(t.tag), {
    class: w(["wizard-header", { "wizard-header-center": t.center }])
  }, {
    default: _(() => [
      u(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const Oe = /* @__PURE__ */ O(ke, [["render", Ce]]), Ae = {}, Be = { class: "wizard-step" };
function Ee(t, e) {
  return a(), c("div", Be, [
    u(t.$slots, "default", { ref: "content" })
  ]);
}
const Ne = /* @__PURE__ */ O(Ae, [["render", Ee]]);
export {
  We as Wizard,
  Vt as WizardControls,
  ne as WizardError,
  Oe as WizardHeader,
  de as WizardProgress,
  Ne as WizardStep,
  me as WizardSuccess
};
//# sourceMappingURL=wizard.js.map
