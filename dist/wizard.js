import { ref as B, defineComponent as w, onMounted as ht, openBlock as a, createElementBlock as d, createBlock as A, resolveDynamicComponent as D, resolveComponent as F, normalizeClass as N, renderSlot as $, createElementVNode as z, normalizeStyle as it, createVNode as P, Transition as vt, withCtx as E, KeepAlive as ft, inject as pt, toRaw as mt, toDisplayString as k, createCommentVNode as Z, mergeProps as st, createTextVNode as H, normalizeProps as yt, guardReactiveProps as gt, computed as V, unref as h, Fragment as M, renderList as T, useSlots as rt } from "vue";
const $t = { class: "slide-deck-slide" };
let X = B();
const bt = /* @__PURE__ */ w({
  __name: "Slide",
  props: {
    node: null
  },
  setup(t) {
    const e = t;
    return ht(() => {
      var i, r;
      (r = (i = X.value) == null ? void 0 : i.el) == null || r.dispatchEvent(new Event("enter"));
    }), (i, r) => (a(), d("div", $t, [
      (a(), A(D(e.node), {
        ref_key: "node",
        ref: X
      }, null, 512))
    ]));
  }
}), _t = w({
  components: {
    Slide: bt
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
}), zt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function St(t, e, i, r, s, p) {
  const S = F("Slide");
  return a(), d("div", {
    class: N(["slide-deck", { sliding: t.sliding }])
  }, [
    $(t.$slots, "top", { active: t.currentActive }),
    z("div", {
      ref: "content",
      class: N(["slide-deck-content", { [t.direction]: !0 }]),
      style: it({ maxHeight: t.maxHeight })
    }, [
      P(vt, {
        name: `slide-${t.direction}`,
        onBeforeEnter: t.onBeforeEnter,
        onEnter: t.onEnter,
        onAfterEnter: t.onAfterEnter,
        onBeforeLeave: t.onBeforeLeave,
        onLeave: t.onLeave,
        onAfterLeave: t.onAfterLeave
      }, {
        default: E(() => [
          (a(), A(ft, null, [
            (a(), A(S, {
              ref: "slide",
              key: t.currentActive,
              node: t.find(t.currentActive)
            }, null, 8, ["node"]))
          ], 1024))
        ]),
        _: 1
      }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
    ], 6),
    $(t.$slots, "middle", { active: t.currentActive }),
    $(t.$slots, "bottom", { active: t.currentActive })
  ], 2);
}
const xt = /* @__PURE__ */ zt(_t, [["render", St]]);
var wt = Object.defineProperty, kt = (t, e, i) => e in t ? wt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, At = (t, e, i) => (kt(t, typeof e != "symbol" ? e + "" : e, i), i), q = function() {
  return q = Object.assign || function(t) {
    for (var e, i = 1, r = arguments.length; i < r; i++) {
      e = arguments[i];
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
    }
    return t;
  }, q.apply(this, arguments);
};
function Bt(t) {
  return t.toLowerCase();
}
var Ct = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], Pt = /[^A-Z0-9]+/gi;
function Et(t, e) {
  e === void 0 && (e = {});
  for (var i = e.splitRegexp, r = i === void 0 ? Ct : i, s = e.stripRegexp, p = s === void 0 ? Pt : s, S = e.transform, y = S === void 0 ? Bt : S, o = e.delimiter, u = o === void 0 ? " " : o, l = Y(Y(t, r, "$1\0$2"), p, "\0"), b = 0, _ = l.length; l.charAt(b) === "\0"; )
    b++;
  for (; l.charAt(_ - 1) === "\0"; )
    _--;
  return l.slice(b, _).split("\0").map(y).join(u);
}
function Y(t, e, i) {
  return e instanceof RegExp ? t.replace(e, i) : e.reduce(function(r, s) {
    return r.replace(s, i);
  }, t);
}
function Lt(t, e) {
  return e === void 0 && (e = {}), Et(t, q({ delimiter: "." }, e));
}
function I(t, e) {
  return e === void 0 && (e = {}), Lt(t, q({ delimiter: "-" }, e));
}
class Wt {
  constructor(e = {}) {
    At(this, "components"), this.components = /* @__PURE__ */ new Map(), Object.entries(e).forEach(([i, r]) => {
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
function Nt(t = {}) {
  return new Wt(t);
}
const Ot = Nt();
function L(t, e = "px") {
  return t != null && t !== !1 && isFinite(t) ? `${t}${e}` : t;
}
const jt = w({
  props: {
    absolute: Boolean,
    center: Boolean,
    label: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "md"
    },
    registry: {
      type: String,
      default: "indicators"
    },
    type: {
      type: [Object, String],
      required: !0
    },
    height: {
      type: [String, Number],
      default: void 0
    },
    maxHeight: {
      type: [String, Number],
      default: void 0
    },
    minHeight: {
      type: [String, Number],
      default: void 0
    },
    width: {
      type: [String, Number],
      default: void 0
    },
    maxWidth: {
      type: [String, Number],
      default: void 0
    },
    minWidth: {
      type: [String, Number],
      default: void 0
    }
  },
  data: () => ({
    is: null
  }),
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
  methods: {
    componentFromRegistry(t) {
      var e;
      try {
        return (e = pt(this.registry || "indicators", Ot)) == null ? void 0 : e.get(t);
      } catch {
      }
    },
    component() {
      return typeof this.type == "string" ? this.componentFromRegistry(this.type) : mt(this.type);
    }
  }
}), Ht = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
}, Mt = { class: "activity-indicator-content" }, Rt = {
  key: 0,
  class: "activity-indicator-label"
};
function It(t, e, i, r, s, p) {
  return a(), d("div", {
    class: N(["activity-indicator", t.classes]),
    style: it(t.style)
  }, [
    z("div", Mt, [
      (a(), A(D(t.component()), { class: "mx-auto" })),
      t.label ? (a(), d("div", Rt, k(t.label), 1)) : Z("", !0)
    ])
  ], 6);
}
const Ft = /* @__PURE__ */ Ht(jt, [["render", It]]), G = w({
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
}), Vt = {
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
      return this.variant === void 0 ? !1 : !!this.variant.match(
        new RegExp(`^${this.variantClassPrefix}`)
      );
    },
    variantClass() {
      return this.variant ? !this.variantClassPrefix || this.hasVariantPrefix ? this.variant : `${this.variantClassPrefix}-${this.variant}` : "";
    }
  }
}, Tt = w({
  mixins: [
    G,
    Vt
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
}), qt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function Dt(t, e, i, r, s, p) {
  return a(), A(D(t.component), st(t.$attrs, {
    disabled: t.disabled,
    class: t.classes,
    role: "button"
  }), {
    default: E(() => [
      $(t.$slots, "default", {}, () => [
        H(k(t.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const nt = /* @__PURE__ */ qt(Tt, [["render", Dt]]), Zt = function(t) {
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
}, tt = function(t, e) {
  const i = (t.ownerDocument || document).defaultView;
  setTimeout(
    e,
    Zt(
      i == null ? void 0 : i.getComputedStyle(t).animationDuration
    )
  );
}, Jt = w({
  components: {
    ActivityIndicator: Ft,
    Btn: nt
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
      this.$el.classList.add("btn-hide-activity"), tt(this.$el, () => {
        this.disabled || this.enable(), this.currentActivity = !1, this.$el.classList.remove("btn-activity", "btn-hide-activity"), this.$emit("hide-activity");
      });
    },
    showActivity() {
      this.currentActivity = !0, this.disable(), tt(this.$el, () => {
        this.$el.classList.add("btn-activity"), this.$emit("show-activity");
      });
    },
    toggle() {
      this.currentActivity ? this.hideActivity() : this.showActivity();
    }
  }
}), Kt = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
function Gt(t, e, i, r, s, p) {
  const S = F("ActivityIndicator"), y = F("Btn");
  return a(), A(y, st({
    active: t.active,
    block: t.block,
    disabled: t.disabled,
    size: t.size,
    tag: t.tag,
    variant: t.variant,
    class: t.classes
  }, Object.assign({}, t.$attrs, { onClick: void 0 }), {
    onClick: e[0] || (e[0] = (o) => !t.disabled && t.$emit("click", o, {
      disable: t.disable,
      enable: t.enable,
      toggle: t.toggle,
      showActivity: t.showActivity,
      hideActivity: t.hideActivity
    }))
  }), {
    default: E(() => [
      $(t.$slots, "default", {}, () => [
        H(k(t.label), 1)
      ]),
      P(S, yt(gt(t.indicatorProps)), null, 16)
    ]),
    _: 3
  }, 16, ["active", "block", "disabled", "size", "tag", "variant", "class"]);
}
const et = /* @__PURE__ */ Kt(Jt, [["render", Gt]]), Qt = { class: "wizard-controls-left wizard-controls-section" }, Ut = { class: "wizard-controls-right wizard-controls-section" }, Xt = /* @__PURE__ */ w({
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
    const e = t, i = V(() => e.buttons.filter((o) => s(o.align) === "left")), r = V(() => e.buttons.filter((o) => s(o.align) === void 0 || o.align === "right"));
    function s(o) {
      return typeof o == "function" ? o(e.context) : o;
    }
    function p(o, u) {
      var b, _;
      const l = (_ = (b = e.currentSlot) == null ? void 0 : b.props) == null ? void 0 : _[`${o.id}-${u}`];
      return l ? !!s(l) : typeof o[u] == "function" ? !!s(o[u]) : o[u];
    }
    function S(o) {
      return o === !0 || typeof o > "u";
    }
    async function y(o, u) {
      var b, _, n, c;
      const l = (_ = (b = e.currentSlot) == null ? void 0 : b.props) == null ? void 0 : _[u.id];
      if (!l)
        return (n = u.onClick) == null ? void 0 : n.call(u, o, u);
      u.activity = !0, S(await Promise.resolve(s(l))) && ((c = u.onClick) == null || c.call(u, o, u)), u.activity = !1;
    }
    return (o, u) => (a(), d("div", {
      class: N(["wizard-controls", { [`wizard-controls-${e.size}`]: !0 }])
    }, [
      z("div", Qt, [
        $(o.$slots, "left", { leftButtons: h(i) }, () => [
          (a(!0), d(M, null, T(h(i), (l, b) => (a(), A(h(et), {
            key: `left-button-${b}`,
            type: "button",
            activity: !!p(l, "activity"),
            disabled: !!p(l, "disabled"),
            indicator: e.indicator,
            size: e.size,
            variant: String(p(l, "variant") || "secondary"),
            onClick: (_) => y(_, l)
          }, {
            default: E(() => [
              H(k(s(l.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ]),
      z("div", Ut, [
        $(o.$slots, "right", { rightButtons: h(r) }, () => [
          (a(!0), d(M, null, T(h(r), (l, b) => (a(), A(h(et), {
            key: `right-button-${b}`,
            type: "button",
            activity: !!p(l, "activity"),
            disabled: !!p(l, "disabled"),
            indicator: e.indicator,
            size: e.size,
            variant: String(p(l, "variant")),
            onClick: (_) => y(_, l)
          }, {
            default: E(() => [
              H(k(s(l.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ])
    ], 2));
  }
});
const Yt = w({
  components: {
    Btn: nt
  },
  mixins: [
    G
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
const J = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
}, te = { class: "wizard-error" }, ee = { class: "wizard-error-icon" }, ie = /* @__PURE__ */ z("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ z("path", {
    fill: "#b10805",
    d: "M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
  })
], -1), se = { class: "wizard-error-body" }, re = {
  key: 0,
  class: "wizard-error-title"
}, ne = { key: 0 }, ae = { key: 1 }, oe = { key: 2 }, le = { class: "wizard-error-list" };
function ce(t, e, i, r, s, p) {
  const S = F("Btn");
  return a(), d("div", te, [
    z("div", ee, [
      $(t.$slots, "icon", {}, () => [
        ie
      ])
    ]),
    z("div", null, [
      z("div", se, [
        t.title ? (a(), d("h3", re, k(t.title), 1)) : Z("", !0),
        $(t.$slots, "default", {}, () => [
          t.isString ? (a(), d("div", ne, k(t.errors), 1)) : t.isError ? (a(), d("div", ae, k(t.errors.message), 1)) : (a(), d("div", oe, [
            z("ul", le, [
              (a(!0), d(M, null, T(t.errors, (y, o) => (a(), d("li", { key: o }, k(y), 1))), 128))
            ])
          ]))
        ])
      ]),
      P(S, {
        size: t.size,
        variant: "danger",
        block: "",
        onClick: e[0] || (e[0] = (y) => t.$emit("fix", y, t.error))
      }, {
        default: E(() => [
          H(" Fix Errors ")
        ]),
        _: 1
      }, 8, ["size"])
    ])
  ]);
}
const de = /* @__PURE__ */ J(Yt, [["render", ce]]), ue = w({
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
function fe(t, e, i, r, s, p) {
  return a(), d("div", he, [
    (a(!0), d(M, null, T(t.slots, (S, y) => (a(), d("div", {
      key: y,
      class: N(["wizard-progress-step", {
        active: y === t.active,
        disabled: y > t.highestStep,
        complete: y + 1 <= t.highestStep
      }])
    }, [
      z("div", ve, k(t.label(S)), 1)
    ], 2))), 128))
  ]);
}
const pe = /* @__PURE__ */ J(ue, [["render", fe]]), me = w({
  mixins: [
    G
  ],
  props: {
    title: {
      type: String,
      default: "Success!"
    }
  }
});
const ye = { class: "wizard-success" }, ge = { class: "wizard-success-icon" }, $e = /* @__PURE__ */ z("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ z("path", {
    fill: "#55b776",
    d: "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
  })
], -1), be = {
  key: 0,
  class: "wizard-success-title"
};
function _e(t, e, i, r, s, p) {
  return a(), d("div", ye, [
    z("div", ge, [
      $(t.$slots, "icon", {}, () => [
        $e
      ])
    ]),
    $(t.$slots, "title", { title: t.title }, () => [
      t.title ? (a(), d("h3", be, k(t.title), 1)) : Z("", !0)
    ]),
    $(t.$slots, "default")
  ]);
}
const ze = /* @__PURE__ */ J(me, [["render", _e]]), Se = { class: "wizard" }, xe = { class: "wizard-content" }, we = { key: 2 };
let C = B(void 0), W = B(void 0), g = B(0), x = B(0), R = B(!1), O = B(), m = B();
function at() {
  var t;
  return (t = m.value) == null ? void 0 : t.next();
}
function ot() {
  var t;
  return (t = m.value) == null ? void 0 : t.prev();
}
function lt(t) {
  var e;
  return (e = m.value) == null ? void 0 : e.goto(t);
}
function ct() {
  R.value = !0, O.value = void 0;
}
function dt(t) {
  R.value = !0, O.value = t || new Error();
}
function ke() {
  var t, e;
  return ((e = (t = rt()).default) == null ? void 0 : e.call(t)) || [];
}
function j() {
  return ke().length || 0;
}
const Ae = { next: at, prev: ot, goto: lt, failed: dt, success: ct, totalSlots: j }, K = V(() => g.value === j() - 1), ut = V(() => g.value === 0), Be = [
  {
    id: "back",
    align: "left",
    label: "Back",
    variant: "secondary",
    onClick: () => {
      var t;
      ut.value || (t = m.value) == null || t.prev();
    }
  },
  {
    id: "submit",
    align: "right",
    variant: "primary",
    label: () => K.value ? "Submit" : "Next",
    onClick: async () => {
      var t;
      K.value ? R.value = !0 : (t = m.value) == null || t.next();
    }
  }
], We = /* @__PURE__ */ w({
  __name: "Wizard",
  props: {
    active: { default: void 0 },
    buttons: { default: () => Be },
    indicator: { default: "spinner" },
    size: { default: "md" }
  },
  emits: ["fix", "enter", "leave", "after-enter", "after-leave", "before-enter", "before-leave"],
  setup(t, { expose: e, emit: i }) {
    const r = t, s = rt(), p = B(r.buttons);
    function S(n, c) {
      var v, f;
      (v = m.value) != null && v.$refs.slide && ((f = m.value) == null || f.$refs.slide.$refs.node.$emit("enter", n, c)), C.value = n, W.value = c, g.value = Number(n.key), x.value = Math.max(x, g);
    }
    function y(n, c) {
      var v, f;
      (v = m.value) != null && v.$refs.slide && ((f = m.value) == null || f.$refs.slide.$refs.node.$emit("leave", n, c)), C.value = n, W.value = c, g.value = Number(n.key), x.value = Math.max(x, g);
    }
    function o(n, c) {
      var v, f;
      (v = m.value) != null && v.$refs.slide && ((f = m.value) == null || f.$refs.slide.$refs.node.$emit("after-enter", n, c)), C.value = n, W.value = c, g.value = Number(n.key), x.value = Math.max(x, g);
    }
    function u(n, c) {
      var v, f;
      (v = m.value) != null && v.$refs.slide && ((f = m.value) == null || f.$refs.slide.$refs.node.$emit("after-leave", n, c)), C.value = n, W.value = c, g.value = Number(n.key), x.value = Math.max(x, g);
    }
    function l(n, c) {
      var v, f;
      (v = m.value) != null && v.$refs.slide && ((f = m.value) == null || f.$refs.slide.$refs.node.$emit("before-enter", n, c)), C.value = n, W.value = c, g.value = Number(n.key), x.value = Math.max(x, g);
    }
    function b(n, c) {
      var v, f;
      (v = m.value) != null && v.$refs.slide && ((f = m.value) == null || f.$refs.slide.$refs.node.$emit("before-leave", n, c)), C.value = n, W.value = c, g.value = Number(n.key), x.value = Math.max(x, g);
    }
    function _(n, c) {
      i("fix", n, c), n.defaultPrevented || (R.value = !1);
    }
    return e({
      next: at,
      prev: ot,
      goto: lt,
      failed: dt,
      success: ct,
      totalSlots: j
    }), (n, c) => {
      var v, f;
      return a(), d("div", Se, [
        h(R) ? h(O) ? (a(), d("div", we, [
          $(n.$slots, "error", { error: h(O) }, () => [
            P(de, {
              error: h(O),
              onFix: _
            }, null, 8, ["error"])
          ])
        ])) : $(n.$slots, "success", { key: 1 }, () => [
          P(ze)
        ]) : (a(), d(M, { key: 0 }, [
          $(n.$slots, "progress", {
            active: h(g),
            highestStep: h(x)
          }, () => {
            var Q, U;
            return [
              j() > 1 ? (a(), A(pe, {
                key: 0,
                active: h(g),
                "highest-step": h(x),
                slots: (U = (Q = h(s)).default) == null ? void 0 : U.call(Q)
              }, null, 8, ["active", "highest-step", "slots"])) : Z("", !0)
            ];
          }),
          z("div", xe, [
            P(h(xt), {
              ref_key: "deck",
              ref: m,
              slots: (f = (v = h(s)).default) == null ? void 0 : f.call(v),
              onEnter: S,
              onLeave: y,
              onAfterEnter: o,
              onAfterLeave: u,
              onBeforeEnter: l,
              onBeforeLeave: b
            }, null, 8, ["slots"])
          ]),
          P(Xt, {
            active: h(g),
            "current-slot": h(C),
            buttons: p.value,
            indicator: t.indicator,
            "is-first-slot": h(ut),
            "is-last-slot": h(K),
            size: t.size,
            "total-slots": j(),
            context: Ae
          }, null, 8, ["active", "current-slot", "buttons", "indicator", "is-first-slot", "is-last-slot", "size", "total-slots"])
        ], 64))
      ]);
    };
  }
});
const Ce = w({
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
function Pe(t, e, i, r, s, p) {
  return a(), A(D(t.tag), {
    class: N(["wizard-header", { "wizard-header-center": t.center }])
  }, {
    default: E(() => [
      $(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const Ne = /* @__PURE__ */ J(Ce, [["render", Pe]]), Ee = { class: "wizard-step" }, Oe = /* @__PURE__ */ w({
  __name: "WizardStep",
  setup(t) {
    return (e, i) => (a(), d("div", Ee, [
      $(e.$slots, "default", { ref: "content" })
    ]));
  }
});
export {
  We as Wizard,
  Xt as WizardControls,
  de as WizardError,
  Ne as WizardHeader,
  pe as WizardProgress,
  Oe as WizardStep,
  ze as WizardSuccess
};
//# sourceMappingURL=wizard.js.map
