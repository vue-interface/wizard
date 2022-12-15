import { ref as _, defineComponent as m, onMounted as ot, openBlock as a, createElementBlock as c, createBlock as $, resolveDynamicComponent as j, resolveComponent as R, normalizeClass as C, renderSlot as h, createElementVNode as p, normalizeStyle as X, createVNode as P, Transition as lt, withCtx as S, KeepAlive as ct, inject as dt, createCommentVNode as O, toDisplayString as y, mergeProps as Z, createTextVNode as A, normalizeProps as ut, guardReactiveProps as ht, computed as M, unref as b, Fragment as N, renderList as V, useSlots as Y } from "vue";
const vt = { class: "slide-deck-slide" };
let K = _();
const ft = /* @__PURE__ */ m({
  __name: "Slide",
  props: {
    node: null
  },
  setup(t) {
    const e = t;
    return ot(() => {
      var i, r;
      (r = (i = K.value) == null ? void 0 : i.el) == null || r.dispatchEvent(new Event("enter"));
    }), (i, r) => (a(), c("div", vt, [
      (a(), $(j(e.node), {
        ref_key: "node",
        ref: K
      }, null, 512))
    ]));
  }
}), pt = m({
  components: {
    Slide: ft
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
}), gt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function mt(t, e, i, r, s, u) {
  const g = R("slide");
  return a(), c("div", {
    class: C(["slide-deck", { sliding: t.sliding }])
  }, [
    h(t.$slots, "top", { active: t.currentActive }),
    p("div", {
      ref: "content",
      class: C(["slide-deck-content", { [t.direction]: !0 }]),
      style: X({ maxHeight: t.maxHeight })
    }, [
      P(lt, {
        name: `slide-${t.direction}`,
        onBeforeEnter: t.onBeforeEnter,
        onEnter: t.onEnter,
        onAfterEnter: t.onAfterEnter,
        onBeforeLeave: t.onBeforeLeave,
        onLeave: t.onLeave,
        onAfterLeave: t.onAfterLeave
      }, {
        default: S(() => [
          (a(), $(ct, null, [
            (a(), $(g, {
              ref: "slide",
              key: t.currentActive,
              node: t.find(t.currentActive)
            }, null, 8, ["node"]))
          ], 1024))
        ]),
        _: 1
      }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
    ], 6),
    h(t.$slots, "middle", { active: t.currentActive }),
    h(t.$slots, "bottom", { active: t.currentActive })
  ], 2);
}
const yt = /* @__PURE__ */ gt(pt, [["render", mt]]);
function w(t, e = "px") {
  return t != null && t !== !1 && isFinite(t) ? `${t}${e}` : t;
}
const bt = m({
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
      registryInstance: dt(t.registry || "indicators")
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
        width: w(this.width),
        maxWidth: w(this.maxWidth),
        minWidth: w(this.minWidth),
        height: w(this.height),
        maxHeight: w(this.maxHeight),
        minHeight: w(this.minHeight)
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
}), $t = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
}, zt = { class: "activity-indicator-content" }, _t = {
  key: 1,
  class: "activity-indicator-label"
};
function xt(t, e, i, r, s, u) {
  return a(), c("div", {
    class: C(["activity-indicator", t.classes]),
    style: X(t.style)
  }, [
    p("div", zt, [
      t.is ? (a(), $(j(t.is()), {
        key: 0,
        class: "mx-auto"
      })) : O("", !0),
      t.label ? (a(), c("div", _t, y(t.label), 1)) : O("", !0)
    ])
  ], 6);
}
const St = /* @__PURE__ */ $t(bt, [["render", xt]]);
var Pt = Object.defineProperty, wt = (t, e, i) => e in t ? Pt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, kt = (t, e, i) => (wt(t, typeof e != "symbol" ? e + "" : e, i), i), F = function() {
  return F = Object.assign || function(t) {
    for (var e, i = 1, r = arguments.length; i < r; i++) {
      e = arguments[i];
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
    }
    return t;
  }, F.apply(this, arguments);
};
function Ct(t) {
  return t.toLowerCase();
}
var At = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], Bt = /[^A-Z0-9]+/gi;
function Et(t, e) {
  e === void 0 && (e = {});
  for (var i = e.splitRegexp, r = i === void 0 ? At : i, s = e.stripRegexp, u = s === void 0 ? Bt : s, g = e.transform, v = g === void 0 ? Ct : g, l = e.delimiter, n = l === void 0 ? " " : l, o = G(G(t, r, "$1\0$2"), u, "\0"), d = 0, f = o.length; o.charAt(d) === "\0"; )
    d++;
  for (; o.charAt(f - 1) === "\0"; )
    f--;
  return o.slice(d, f).split("\0").map(v).join(n);
}
function G(t, e, i) {
  return e instanceof RegExp ? t.replace(e, i) : e.reduce(function(r, s) {
    return r.replace(s, i);
  }, t);
}
function Lt(t, e) {
  return e === void 0 && (e = {}), Et(t, F({ delimiter: "." }, e));
}
function I(t, e) {
  return e === void 0 && (e = {}), Lt(t, F({ delimiter: "-" }, e));
}
class Wt {
  constructor(e = {}) {
    kt(this, "components"), this.components = /* @__PURE__ */ new Map(), Object.entries(e).forEach(([i, r]) => {
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
function Ot(t = {}) {
  return new Wt(t);
}
Ot();
const Nt = {
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
}, Ht = {
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
}, jt = m({
  mixins: [
    Nt,
    Ht
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
}), It = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function Rt(t, e, i, r, s, u) {
  return a(), $(j(t.component), Z(t.$attrs, {
    disabled: t.disabled,
    class: t.classes,
    role: "button"
  }), {
    default: S(() => [
      h(t.$slots, "default", {}, () => [
        A(y(t.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const Mt = /* @__PURE__ */ It(jt, [["render", Rt]]), Vt = function(t) {
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
}, J = function(t, e) {
  const i = (t.ownerDocument || document).defaultView;
  setTimeout(
    e,
    Vt(
      i == null ? void 0 : i.getComputedStyle(t).animationDuration
    )
  );
}, Ft = m({
  components: {
    ActivityIndicator: St,
    Btn: Mt
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
      this.$el.classList.add("btn-hide-activity"), J(this.$el, () => {
        this.disabled || this.enable(), this.currentActivity = !1, this.$el.classList.remove("btn-activity", "btn-hide-activity"), this.$emit("hide-activity");
      });
    },
    showActivity() {
      this.currentActivity = !0, this.disable(), J(this.$el, () => {
        this.$el.classList.add("btn-activity"), this.$emit("show-activity");
      });
    },
    toggle() {
      this.currentActivity ? this.hideActivity() : this.showActivity();
    }
  }
}), Tt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function qt(t, e, i, r, s, u) {
  const g = R("activity-indicator"), v = R("btn");
  return a(), $(v, Z({
    active: t.active,
    block: t.block,
    disabled: t.disabled,
    size: t.size,
    tag: t.tag,
    variant: t.variant,
    class: t.classes
  }, Object.assign({}, t.$attrs, { onClick: void 0 }), {
    onClick: e[0] || (e[0] = (l) => !t.disabled && t.$emit("click", l, {
      disable: t.disable,
      enable: t.enable,
      toggle: t.toggle,
      showActivity: t.showActivity,
      hideActivity: t.hideActivity
    }))
  }), {
    default: S(() => [
      h(t.$slots, "default", {}, () => [
        A(y(t.label), 1)
      ]),
      P(g, ut(ht(t.indicatorProps)), null, 16)
    ]),
    _: 3
  }, 16, ["active", "block", "disabled", "size", "tag", "variant", "class"]);
}
const Q = /* @__PURE__ */ Tt(Ft, [["render", qt]]), Dt = { class: "wizard-controls-left wizard-controls-section" }, Zt = { class: "wizard-controls-right wizard-controls-section" }, Kt = /* @__PURE__ */ m({
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
    const e = t, i = M(() => e.buttons.filter((l) => s(l.align) === "left")), r = M(() => e.buttons.filter((l) => s(l.align) === void 0 || l.align === "right"));
    function s(l) {
      return typeof l == "function" ? l(e.context) : l;
    }
    function u(l, n) {
      var d, f;
      const o = (f = (d = e.currentSlot) == null ? void 0 : d.props) == null ? void 0 : f[`${l.id}-${n}`];
      return o ? !!s(o) : typeof l[n] == "function" ? !!s(l[n]) : l[n];
    }
    function g(l) {
      return l === !0 || typeof l > "u";
    }
    async function v(l, n) {
      var d, f, B, E;
      const o = (f = (d = e.currentSlot) == null ? void 0 : d.props) == null ? void 0 : f[n.id];
      if (!o)
        return (B = n.onClick) == null ? void 0 : B.call(n, l, n);
      n.activity = !0, g(await Promise.resolve(s(o))) && ((E = n.onClick) == null || E.call(n, l, n)), n.activity = !1;
    }
    return (l, n) => (a(), c("div", {
      class: C(["wizard-controls", { [`wizard-controls-${e.size}`]: !0 }])
    }, [
      p("div", Dt, [
        h(l.$slots, "left", { leftButtons: b(i) }, () => [
          (a(!0), c(N, null, V(b(i), (o, d) => (a(), $(b(Q), {
            key: `left-button-${d}`,
            type: "button",
            activity: !!u(o, "activity"),
            disabled: !!u(o, "disabled"),
            indicator: e.indicator,
            size: e.size,
            variant: String(u(o, "variant") || "secondary"),
            onClick: (f) => v(f, o)
          }, {
            default: S(() => [
              A(y(s(o.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ]),
      p("div", Zt, [
        h(l.$slots, "right", { rightButtons: b(r) }, () => [
          (a(!0), c(N, null, V(b(r), (o, d) => (a(), $(b(Q), {
            key: `right-button-${d}`,
            type: "button",
            activity: !!u(o, "activity"),
            disabled: !!u(o, "disabled"),
            indicator: e.indicator,
            size: e.size,
            variant: String(u(o, "variant")),
            onClick: (f) => v(f, o)
          }, {
            default: S(() => [
              A(y(s(o.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ])
    ], 2));
  }
});
const Gt = {
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
}, Jt = {
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
}, Qt = m({
  mixins: [
    Gt,
    Jt
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
}), Ut = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function Xt(t, e, i, r, s, u) {
  return a(), $(j(t.component), Z(t.$attrs, {
    disabled: t.disabled,
    class: t.classes,
    role: "button"
  }), {
    default: S(() => [
      h(t.$slots, "default", {}, () => [
        A(y(t.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const Yt = /* @__PURE__ */ Ut(Qt, [["render", Xt]]), tt = {
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
}, te = m({
  components: {
    Btn: Yt
  },
  mixins: [
    tt
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
const T = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
}, ee = { class: "wizard-error" }, ie = { class: "wizard-error-icon" }, se = /* @__PURE__ */ p("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ p("path", {
    fill: "#b10805",
    d: "M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
  })
], -1), re = { class: "wizard-error-body" }, ne = {
  key: 0,
  class: "wizard-error-title"
}, ae = { key: 0 }, oe = { key: 1 }, le = { key: 2 }, ce = { class: "wizard-error-list" };
function de(t, e, i, r, s, u) {
  const g = R("btn");
  return a(), c("div", ee, [
    p("div", ie, [
      h(t.$slots, "icon", {}, () => [
        se
      ])
    ]),
    p("div", null, [
      p("div", re, [
        t.title ? (a(), c("h3", ne, y(t.title), 1)) : O("", !0),
        h(t.$slots, "default", {}, () => [
          t.isString ? (a(), c("div", ae, y(t.errors), 1)) : t.isError ? (a(), c("div", oe, y(t.errors.message), 1)) : (a(), c("div", le, [
            p("ul", ce, [
              (a(!0), c(N, null, V(t.errors, (v, l) => (a(), c("li", { key: l }, y(v), 1))), 128))
            ])
          ]))
        ])
      ]),
      P(g, {
        size: t.size,
        variant: "danger",
        block: "",
        onClick: e[0] || (e[0] = (v) => t.$emit("fix", v, t.error))
      }, {
        default: S(() => [
          A(" Fix Errors ")
        ]),
        _: 1
      }, 8, ["size"])
    ])
  ]);
}
const ue = /* @__PURE__ */ T(te, [["render", de]]), he = m({
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
const ve = { class: "wizard-progress" }, fe = { class: "wizard-progress-label" };
function pe(t, e, i, r, s, u) {
  return a(), c("div", ve, [
    (a(!0), c(N, null, V(t.slots, (g, v) => (a(), c("div", {
      key: v,
      class: C(["wizard-progress-step", {
        active: v === t.active,
        disabled: v > t.highestStep,
        complete: v + 1 <= t.highestStep
      }])
    }, [
      p("div", fe, y(t.label(g)), 1)
    ], 2))), 128))
  ]);
}
const ge = /* @__PURE__ */ T(he, [["render", pe]]), me = m({
  mixins: [
    tt
  ],
  props: {
    title: {
      type: String,
      default: "Success!"
    }
  }
});
const ye = { class: "wizard-success" }, be = { class: "wizard-success-icon" }, $e = /* @__PURE__ */ p("svg", {
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
function _e(t, e, i, r, s, u) {
  return a(), c("div", ye, [
    p("div", be, [
      h(t.$slots, "icon", {}, () => [
        $e
      ])
    ]),
    h(t.$slots, "title", { title: t.title }, () => [
      t.title ? (a(), c("h3", ze, y(t.title), 1)) : O("", !0)
    ]),
    h(t.$slots, "default")
  ]);
}
const xe = /* @__PURE__ */ T(me, [["render", _e]]), Se = { class: "wizard" }, Pe = { class: "wizard-content" }, we = { key: 2 };
let q = _(void 0), U = _(void 0), z = _(0), k = _(0), H = _(!1), L = _(), x = _();
function et() {
  var t;
  return (t = x.value) == null ? void 0 : t.next();
}
function it() {
  var t;
  return (t = x.value) == null ? void 0 : t.prev();
}
function st(t) {
  var e;
  return (e = x.value) == null ? void 0 : e.goto(t);
}
function rt() {
  H.value = !0, L.value = void 0;
}
function nt(t) {
  H.value = !0, L.value = t || new Error();
}
function ke() {
  var t, e;
  return ((e = (t = Y()).default) == null ? void 0 : e.call(t)) || [];
}
function W() {
  return ke().length || 0;
}
const Ce = { next: et, prev: it, goto: st, failed: nt, success: rt, totalSlots: W }, D = M(() => z.value === W() - 1), at = M(() => z.value === 0), Ae = [
  {
    id: "back",
    align: "left",
    label: "Back",
    variant: "secondary",
    onClick: () => {
      var t;
      at.value || (t = x.value) == null || t.prev();
    }
  },
  {
    id: "submit",
    align: "right",
    variant: "primary",
    label: () => D.value ? "Submit" : "Next",
    onClick: async () => {
      var t;
      D.value ? H.value = !0 : (t = x.value) == null || t.next();
    }
  }
], Oe = /* @__PURE__ */ m({
  __name: "Wizard",
  props: {
    active: { default: void 0 },
    buttons: { default: () => Ae },
    indicator: { default: "spinner" },
    size: { default: "md" }
  },
  emits: ["fix", "enter", "leave"],
  setup(t, { expose: e, emit: i }) {
    const r = t, s = Y(), u = _(r.buttons);
    function g(n, o) {
      var d;
      (d = x.value) == null || d.$refs.slide.$refs.node.$emit("enter", n, o), i("enter", n, o), q.value = n, U.value = o, z.value = Number(n.key), k.value = Math.max(k.value, z.value);
    }
    function v(n, o) {
      var d;
      (d = x.value) == null || d.$refs.slide.$refs.node.$emit("leave", n, o), i("leave", n, o), q.value = n, U.value = o, z.value = Number(n.key), k.value = Math.max(k.value, z.value);
    }
    function l(n, o) {
      i("fix", n, o), n.defaultPrevented || (H.value = !1);
    }
    return e({
      next: et,
      prev: it,
      goto: st,
      failed: nt,
      success: rt,
      totalSlots: W
    }), (n, o) => {
      var d, f;
      return a(), c("div", Se, [
        H.value ? L.value ? (a(), c("div", we, [
          h(n.$slots, "error", { error: L.value }, () => [
            P(ue, {
              error: L.value,
              onFix: l
            }, null, 8, ["error"])
          ])
        ])) : h(n.$slots, "success", { key: 1 }, () => [
          P(xe)
        ]) : (a(), c(N, { key: 0 }, [
          h(n.$slots, "progress", {
            active: z.value,
            highestStep: k.value
          }, () => {
            var B, E;
            return [
              W() > 1 ? (a(), $(ge, {
                key: 0,
                active: z.value,
                "highest-step": k.value,
                slots: (E = (B = b(s)).default) == null ? void 0 : E.call(B)
              }, null, 8, ["active", "highest-step", "slots"])) : O("", !0)
            ];
          }),
          p("div", Pe, [
            P(b(yt), {
              ref_key: "deck",
              ref: x,
              slots: (f = (d = b(s)).default) == null ? void 0 : f.call(d),
              onEnter: g,
              onLeave: v
            }, null, 8, ["slots"])
          ]),
          P(Kt, {
            active: z.value,
            "current-slot": q.value,
            buttons: u.value,
            indicator: t.indicator,
            "is-first-slot": b(at),
            "is-last-slot": b(D),
            size: t.size,
            "total-slots": W(),
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
function Ee(t, e, i, r, s, u) {
  return a(), $(j(t.tag), {
    class: C(["wizard-header", { "wizard-header-center": t.center }])
  }, {
    default: S(() => [
      h(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const Ne = /* @__PURE__ */ T(Be, [["render", Ee]]), Le = { class: "wizard-step" }, He = /* @__PURE__ */ m({
  __name: "WizardStep",
  emits: ["enter", "leave"],
  setup(t) {
    return (e, i) => (a(), c("div", Le, [
      h(e.$slots, "default", { ref: "content" })
    ]));
  }
});
export {
  Oe as Wizard,
  Kt as WizardControls,
  ue as WizardError,
  Ne as WizardHeader,
  ge as WizardProgress,
  He as WizardStep,
  xe as WizardSuccess
};
//# sourceMappingURL=wizard.js.map
