import { defineComponent as k, computed as j, openBlock as o, createElementBlock as p, normalizeClass as T, createElementVNode as w, renderSlot as S, Fragment as M, renderList as H, createBlock as R, unref as _, withCtx as L, createTextVNode as Z, toDisplayString as x, resolveComponent as ne, createCommentVNode as G, createVNode as N, inject as ae, toRaw as oe, createStaticVNode as le, ref as C, useSlots as U, resolveDynamicComponent as ce } from "vue";
import { SlideDeck as de } from "@vue-interface/slide-deck";
import { BtnActivity as K } from "@vue-interface/btn-activity";
import { Btn as ue } from "@vue-interface/btn";
const ve = { class: "wizard-controls-left wizard-controls-section" }, pe = { class: "wizard-controls-right wizard-controls-section" }, fe = /* @__PURE__ */ k({
  __name: "WizardControls",
  props: {
    active: {},
    buttons: {},
    context: { default: () => ({}) },
    currentSlot: {},
    indicator: {},
    isFirstSlot: { type: Boolean },
    isLastSlot: { type: Boolean },
    size: {},
    totalSlots: {}
  },
  setup(e) {
    const t = e, i = j(() => t.buttons.filter((n) => s(n.align) === "left")), c = j(() => t.buttons.filter((n) => s(n.align) === void 0 || n.align === "right"));
    function s(n) {
      return typeof n == "function" ? n(t.context) : n;
    }
    function $(n, d) {
      var m, g;
      const a = (g = (m = t.currentSlot) == null ? void 0 : m.props) == null ? void 0 : g[`${n.id}-${d}`];
      return a ? !!s(a) : typeof n[d] == "function" ? !!s(n[d]) : n[d];
    }
    function b(n) {
      return n === !0 || typeof n > "u";
    }
    async function y(n, d) {
      var m, g, r, l;
      const a = (g = (m = t.currentSlot) == null ? void 0 : m.props) == null ? void 0 : g[d.id];
      if (!a)
        return (r = d.onClick) == null ? void 0 : r.call(d, n, d);
      d.activity = !0, b(await Promise.resolve(s(a))) && ((l = d.onClick) == null || l.call(d, n, d)), d.activity = !1;
    }
    return (n, d) => (o(), p("div", {
      class: T(["wizard-controls", { [`wizard-controls-${t.size}`]: !0 }])
    }, [
      w("div", ve, [
        S(n.$slots, "left", { leftButtons: i.value }, () => [
          (o(!0), p(M, null, H(i.value, (a, m) => (o(), R(_(K), {
            key: `left-button-${m}`,
            type: "button",
            activity: !!$(a, "activity"),
            disabled: !!$(a, "disabled"),
            indicator: t.indicator,
            size: t.size,
            variant: String($(a, "variant") || "secondary"),
            onClick: (g) => y(g, a)
          }, {
            default: L(() => [
              Z(x(s(a.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ]),
      w("div", pe, [
        S(n.$slots, "right", { rightButtons: c.value }, () => [
          (o(!0), p(M, null, H(c.value, (a, m) => (o(), R(_(K), {
            key: `right-button-${m}`,
            type: "button",
            activity: !!$(a, "activity"),
            disabled: !!$(a, "disabled"),
            indicator: t.indicator,
            size: t.size,
            variant: String($(a, "variant")),
            onClick: (g) => y(g, a)
          }, {
            default: L(() => [
              Z(x(s(a.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ])
    ], 2));
  }
});
const X = k({
  props: {
    /**
     * The generic component prefix.
     */
    componentPrefix: String,
    /**
     * The size name.
     */
    size: String,
    /**
     * The sizable prefix. Should use to component prefix, unless the
     * sizeable prefix is different than the component prefix.
     */
    sizePrefix: String
  },
  computed: {
    /**
     * The computed sizeable class prefix.
     */
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    /**
     * Determines if the size already has the prefix.
     */
    hasSizeablePrefix() {
      return this.size === void 0 ? !1 : !!this.size.match(
        new RegExp(`^${this.sizeableClassPrefix}`)
      );
    },
    /**
     * The size classes that get injected into the DOM.
     */
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}), he = k({
  components: {
    Btn: ue
  },
  mixins: [
    X
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
const V = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [c, s] of t)
    i[c] = s;
  return i;
}, ye = { class: "wizard-error" }, me = { class: "wizard-error-icon" }, ge = /* @__PURE__ */ w("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ w("path", {
    fill: "#b10805",
    d: "M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
  })
], -1), _e = { class: "wizard-error-body" }, $e = {
  key: 0,
  class: "wizard-error-title"
}, ze = { key: 0 }, we = { key: 1 }, Se = { key: 2 }, be = { class: "wizard-error-list" };
function ke(e, t, i, c, s, $) {
  const b = ne("Btn");
  return o(), p("div", ye, [
    w("div", me, [
      S(e.$slots, "icon", {}, () => [
        ge
      ])
    ]),
    w("div", null, [
      w("div", _e, [
        e.title ? (o(), p("h3", $e, x(e.title), 1)) : G("", !0),
        S(e.$slots, "default", {}, () => [
          e.isString ? (o(), p("div", ze, x(e.errors), 1)) : e.isError ? (o(), p("div", we, x(e.errors.message), 1)) : (o(), p("div", Se, [
            w("ul", be, [
              (o(!0), p(M, null, H(e.errors, (y, n) => (o(), p("li", { key: n }, x(y), 1))), 128))
            ])
          ]))
        ])
      ]),
      N(b, {
        size: e.size,
        variant: "danger",
        block: "",
        onClick: t[0] || (t[0] = (y) => e.$emit("fix", y, e.error))
      }, {
        default: L(() => [
          Z(" Fix Errors ")
        ]),
        _: 1
      }, 8, ["size"])
    ])
  ]);
}
const xe = /* @__PURE__ */ V(he, [["render", ke]]), Ce = k({
  props: {
    /**
     * The index or key of the active step.
     */
    active: {
      type: [String, Number],
      required: !0
    },
    /**
     * The wizard highest available to the user.
     */
    highestStep: {
      type: Number,
      required: !0
    },
    /**
     * The wizard slots.
     */
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
const Be = { class: "wizard-progress" }, We = { class: "wizard-progress-label" };
function Ee(e, t, i, c, s, $) {
  return o(), p("div", Be, [
    (o(!0), p(M, null, H(e.slots, (b, y) => (o(), p("div", {
      key: y,
      class: T(["wizard-progress-step", {
        active: y === e.active,
        disabled: y > e.highestStep,
        complete: y + 1 <= e.highestStep
      }])
    }, [
      w("div", We, x(e.label(b)), 1)
    ], 2))), 128))
  ]);
}
const Ne = /* @__PURE__ */ V(Ce, [["render", Ee]]), Pe = k({
  mixins: [
    X
  ],
  props: {
    title: {
      type: String,
      default: "Success!"
    }
  }
});
const Ae = { class: "wizard-success" }, Me = { class: "wizard-success-icon" }, Fe = /* @__PURE__ */ w("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ w("path", {
    fill: "#55b776",
    d: "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
  })
], -1), Oe = {
  key: 0,
  class: "wizard-success-title"
};
function je(e, t, i, c, s, $) {
  return o(), p("div", Ae, [
    w("div", Me, [
      S(e.$slots, "icon", {}, () => [
        Fe
      ])
    ]),
    S(e.$slots, "title", { title: e.title }, () => [
      e.title ? (o(), p("h3", Oe, x(e.title), 1)) : G("", !0)
    ]),
    S(e.$slots, "default")
  ]);
}
const He = /* @__PURE__ */ V(Pe, [["render", je]]);
var Re = Object.defineProperty, Le = (e, t, i) => t in e ? Re(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, qe = (e, t, i) => (Le(e, typeof t != "symbol" ? t + "" : t, i), i), q = function() {
  return q = Object.assign || function(e) {
    for (var t, i = 1, c = arguments.length; i < c; i++) {
      t = arguments[i];
      for (var s in t)
        Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
    }
    return e;
  }, q.apply(this, arguments);
};
function Ve(e) {
  return e.toLowerCase();
}
var Ze = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], De = /[^A-Z0-9]+/gi;
function Te(e, t) {
  t === void 0 && (t = {});
  for (var i = t.splitRegexp, c = i === void 0 ? Ze : i, s = t.stripRegexp, $ = s === void 0 ? De : s, b = t.transform, y = b === void 0 ? Ve : b, n = t.delimiter, d = n === void 0 ? " " : n, a = Q(Q(e, c, "$1\0$2"), $, "\0"), m = 0, g = a.length; a.charAt(m) === "\0"; )
    m++;
  for (; a.charAt(g - 1) === "\0"; )
    g--;
  return a.slice(m, g).split("\0").map(y).join(d);
}
function Q(e, t, i) {
  return t instanceof RegExp ? e.replace(t, i) : t.reduce(function(c, s) {
    return c.replace(s, i);
  }, e);
}
function Ge(e, t) {
  return t === void 0 && (t = {}), Te(e, q({ delimiter: "." }, t));
}
function O(e, t) {
  return t === void 0 && (t = {}), Ge(e, q({ delimiter: "-" }, t));
}
class Ie {
  constructor(t = {}) {
    qe(this, "components"), this.components = /* @__PURE__ */ new Map(), Object.entries(t).forEach(([i, c]) => {
      this.register(i, c);
    });
  }
  get(t) {
    const i = this.components.get(
      t = O(t)
    );
    if (i)
      return i;
    throw new Error(`"${t}" has not been registered yet!`);
  }
  register(t, i) {
    return typeof t == "object" ? (Object.entries(t).forEach(([c, s]) => {
      this.register(O(c), s);
    }), this) : (this.components.set(O(t), i), this);
  }
  remove(t) {
    return this.components.delete(O(t)), this;
  }
  reset() {
    return this.components = /* @__PURE__ */ new Map(), this;
  }
}
function Je(e = {}) {
  return new Ie(e);
}
const Ke = Je();
function W(e, t = "px") {
  return e != null && e !== !1 && isFinite(e) ? `${e}${t}` : e;
}
k({
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
        width: W(this.width),
        maxWidth: W(this.maxWidth),
        minWidth: W(this.minWidth),
        height: W(this.height),
        maxHeight: W(this.maxHeight),
        minHeight: W(this.minHeight)
      };
    }
  },
  methods: {
    componentFromRegistry(e) {
      var t;
      try {
        return (t = ae(this.registry || "indicators", Ke)) == null ? void 0 : t.get(e);
      } catch {
      }
    },
    component() {
      return typeof this.type == "string" ? this.componentFromRegistry(this.type) : oe(this.type);
    }
  }
});
const Qe = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [c, s] of t)
    i[c] = s;
  return i;
}, Ue = {}, Xe = { class: "activity-indicator-spinner" }, Ye = /* @__PURE__ */ le('<div class="activity-indicator-spinner1 activity-indicator-spinner"></div><div class="activity-indicator-spinner2 activity-indicator-spinner"></div><div class="activity-indicator-spinner3 activity-indicator-spinner"></div><div class="activity-indicator-spinner4 activity-indicator-spinner"></div><div class="activity-indicator-spinner5 activity-indicator-spinner"></div><div class="activity-indicator-spinner6 activity-indicator-spinner"></div><div class="activity-indicator-spinner7 activity-indicator-spinner"></div><div class="activity-indicator-spinner8 activity-indicator-spinner"></div><div class="activity-indicator-spinner9 activity-indicator-spinner"></div><div class="activity-indicator-spinner10 activity-indicator-spinner"></div><div class="activity-indicator-spinner11 activity-indicator-spinner"></div><div class="activity-indicator-spinner12 activity-indicator-spinner"></div>', 12), et = [
  Ye
];
function tt(e, t) {
  return o(), p("div", Xe, et);
}
const it = /* @__PURE__ */ Qe(Ue, [["render", tt]]), rt = { class: "wizard" }, st = { class: "wizard-content" }, nt = { key: 2 };
let B = C(), E = C(), h = C(0), z = C(0), F = C(!1), P = C(), f = C();
function Y() {
  var e;
  return (e = f.value) == null ? void 0 : e.next();
}
function ee() {
  var e;
  return (e = f.value) == null ? void 0 : e.prev();
}
function te(e) {
  var t;
  return (t = f.value) == null ? void 0 : t.goto(e);
}
function ie() {
  F.value = !0, P.value = void 0;
}
function re(e) {
  F.value = !0, P.value = e || new Error();
}
function at() {
  var e, t;
  return ((t = (e = U()).default) == null ? void 0 : t.call(e)) || [];
}
function A() {
  return at().length || 0;
}
const ot = { next: Y, prev: ee, goto: te, failed: re, success: ie, totalSlots: A }, D = j(() => h.value === A() - 1), se = j(() => h.value === 0), lt = [
  {
    id: "back",
    align: "left",
    label: "Back",
    variant: "secondary",
    onClick: () => {
      var e;
      se.value || (e = f.value) == null || e.prev();
    }
  },
  {
    id: "submit",
    align: "right",
    variant: "primary",
    label: () => D.value ? "Submit" : "Next",
    onClick: async () => {
      var e;
      D.value ? F.value = !0 : (e = f.value) == null || e.next();
    }
  }
], yt = /* @__PURE__ */ k({
  __name: "Wizard",
  props: {
    active: { default: void 0 },
    buttons: { default: () => lt },
    indicator: { default: it },
    size: { default: "md" }
  },
  emits: ["fix", "enter", "leave", "after-enter", "after-leave", "before-enter", "before-leave"],
  setup(e, { expose: t, emit: i }) {
    const c = e, s = U(), $ = C(c.buttons);
    function b(r, l) {
      var u, v;
      (u = f.value) != null && u.$refs.slide && ((v = f.value) == null || v.$refs.slide.$refs.node.$emit("enter", r, l)), B.value = r, E.value = l, h.value = Number(r.key), z.value = Math.max(z.value, h.value);
    }
    function y(r, l) {
      var u, v;
      (u = f.value) != null && u.$refs.slide && ((v = f.value) == null || v.$refs.slide.$refs.node.$emit("leave", r, l)), B.value = r, E.value = l, h.value = Number(r.key), z.value = Math.max(z.value, h.value);
    }
    function n(r, l) {
      var u, v;
      (u = f.value) != null && u.$refs.slide && ((v = f.value) == null || v.$refs.slide.$refs.node.$emit("after-enter", r, l)), B.value = r, E.value = l, h.value = Number(r.key), z.value = Math.max(z.value, h.value);
    }
    function d(r, l) {
      var u, v;
      (u = f.value) != null && u.$refs.slide && ((v = f.value) == null || v.$refs.slide.$refs.node.$emit("after-leave", r, l)), B.value = r, E.value = l, h.value = Number(r.key), z.value = Math.max(z.value, h.value);
    }
    function a(r, l) {
      var u, v;
      (u = f.value) != null && u.$refs.slide && ((v = f.value) == null || v.$refs.slide.$refs.node.$emit("before-enter", r, l)), B.value = r, E.value = l, h.value = Number(r.key), z.value = Math.max(z.value, h.value);
    }
    function m(r, l) {
      var u, v;
      (u = f.value) != null && u.$refs.slide && ((v = f.value) == null || v.$refs.slide.$refs.node.$emit("before-leave", r, l)), B.value = r, E.value = l, h.value = Number(r.key), z.value = Math.max(z.value, h.value);
    }
    function g(r, l) {
      i("fix", r, l), r.defaultPrevented || (F.value = !1);
    }
    return t({
      next: Y,
      prev: ee,
      goto: te,
      failed: re,
      success: ie,
      totalSlots: A
    }), (r, l) => {
      var u, v;
      return o(), p("div", rt, [
        _(F) ? _(P) ? (o(), p("div", nt, [
          S(r.$slots, "error", { error: _(P) }, () => [
            N(xe, {
              error: _(P),
              onFix: g
            }, null, 8, ["error"])
          ])
        ])) : S(r.$slots, "success", { key: 1 }, () => [
          N(He)
        ]) : (o(), p(M, { key: 0 }, [
          S(r.$slots, "progress", {
            active: _(h),
            highestStep: _(z)
          }, () => {
            var I, J;
            return [
              A() > 1 ? (o(), R(Ne, {
                key: 0,
                active: _(h),
                "highest-step": _(z),
                slots: (J = (I = _(s)).default) == null ? void 0 : J.call(I)
              }, null, 8, ["active", "highest-step", "slots"])) : G("", !0)
            ];
          }),
          w("div", st, [
            N(_(de), {
              ref_key: "deck",
              ref: f,
              slots: (v = (u = _(s)).default) == null ? void 0 : v.call(u),
              onEnter: b,
              onLeave: y,
              onAfterEnter: n,
              onAfterLeave: d,
              onBeforeEnter: a,
              onBeforeLeave: m
            }, null, 8, ["slots"])
          ]),
          N(fe, {
            active: _(h),
            "current-slot": _(B),
            buttons: $.value,
            indicator: r.indicator,
            "is-first-slot": se.value,
            "is-last-slot": D.value,
            size: r.size,
            "total-slots": A(),
            context: ot
          }, null, 8, ["active", "current-slot", "buttons", "indicator", "is-first-slot", "is-last-slot", "size", "total-slots"])
        ], 64))
      ]);
    };
  }
});
const ct = k({
  props: {
    /**
     * The HTML tag.
     */
    center: {
      type: Boolean,
      default: !0
    },
    /**
     * The HTML tag.
     */
    tag: {
      type: String,
      default: "h2"
    }
  }
});
function dt(e, t, i, c, s, $) {
  return o(), R(ce(e.tag), {
    class: T(["wizard-header", { "wizard-header-center": e.center }])
  }, {
    default: L(() => [
      S(e.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const mt = /* @__PURE__ */ V(ct, [["render", dt]]), ut = { class: "wizard-step" }, gt = /* @__PURE__ */ k({
  __name: "WizardStep",
  setup(e) {
    return (t, i) => (o(), p("div", ut, [
      S(t.$slots, "default", { ref: "content" })
    ]));
  }
});
export {
  yt as Wizard,
  fe as WizardControls,
  xe as WizardError,
  mt as WizardHeader,
  Ne as WizardProgress,
  gt as WizardStep,
  He as WizardSuccess
};
//# sourceMappingURL=wizard.js.map
