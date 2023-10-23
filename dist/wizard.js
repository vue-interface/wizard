import { defineComponent as k, ref as S, computed as A, openBlock as d, createElementBlock as h, normalizeClass as R, createElementVNode as b, renderSlot as w, Fragment as W, renderList as L, createBlock as F, unref as z, withCtx as M, createTextVNode as H, toDisplayString as x, resolveComponent as ae, createCommentVNode as q, createVNode as B, inject as oe, toRaw as le, createStaticVNode as ce, useSlots as T, resolveDynamicComponent as de } from "vue";
import { SlideDeck as ue } from "@vue-interface/slide-deck";
import { BtnActivity as G } from "@vue-interface/btn-activity";
import { Btn as ve } from "@vue-interface/btn";
const pe = { class: "wizard-controls-left wizard-controls-section" }, fe = { class: "wizard-controls-right wizard-controls-section" }, he = /* @__PURE__ */ k({
  __name: "WizardControls",
  props: {
    active: {},
    buttons: { type: [Array, Function] },
    context: {},
    currentSlot: {},
    indicator: {},
    isFirstSlot: { type: Boolean },
    isLastSlot: { type: Boolean },
    size: {},
    totalSlots: {}
  },
  setup(t) {
    const e = t;
    console.log(e.context);
    const s = S(typeof e.buttons == "function" ? e.buttons(e.context) : e.buttons), l = A(() => s.value.filter((a) => y(a.align) === "left")), c = A(() => s.value.filter((a) => y(a.align) === void 0 || a.align === "right"));
    function y(a) {
      return typeof a == "function" ? a(e.context) : a;
    }
    function m(a, r) {
      var v, $;
      const n = ($ = (v = e.currentSlot) == null ? void 0 : v.props) == null ? void 0 : $[`${a.id}-${r}`];
      return n ? !!y(n) : typeof a[r] == "function" ? !!y(a[r]) : a[r];
    }
    function g(a) {
      return a === !0 || typeof a > "u";
    }
    async function _(a, r) {
      var v, $, u, E;
      const n = ($ = (v = e.currentSlot) == null ? void 0 : v.props) == null ? void 0 : $[r.id];
      if (!n)
        return (u = r.onClick) == null ? void 0 : u.call(r, a, r);
      r.activity = !0, g(await Promise.resolve(y(n))) && ((E = r.onClick) == null || E.call(r, a, r)), r.activity = !1;
    }
    return (a, r) => (d(), h("div", {
      class: R(["wizard-controls", { [`wizard-controls-${e.size}`]: !0 }])
    }, [
      b("div", pe, [
        w(a.$slots, "left", { leftButtons: l.value }, () => [
          (d(!0), h(W, null, L(l.value, (n, v) => (d(), F(z(G), {
            key: `left-button-${v}`,
            type: "button",
            activity: !!m(n, "activity"),
            disabled: !!m(n, "disabled"),
            indicator: e.indicator,
            size: e.size,
            variant: String(m(n, "variant") || "secondary"),
            onClick: ($) => _($, n)
          }, {
            default: M(() => [
              H(x(y(n.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ]),
      b("div", fe, [
        w(a.$slots, "right", { rightButtons: c.value }, () => [
          (d(!0), h(W, null, L(c.value, (n, v) => (d(), F(z(G), {
            key: `right-button-${v}`,
            type: "button",
            activity: !!m(n, "activity"),
            disabled: !!m(n, "disabled"),
            indicator: e.indicator,
            size: e.size,
            variant: String(m(n, "variant")),
            onClick: ($) => _($, n)
          }, {
            default: M(() => [
              H(x(y(n.label)), 1)
            ]),
            _: 2
          }, 1032, ["activity", "disabled", "indicator", "size", "variant", "onClick"]))), 128))
        ])
      ])
    ], 2));
  }
});
const J = k({
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
}), ye = k({
  components: {
    Btn: ve
  },
  mixins: [
    J
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
  const s = t.__vccOpts || t;
  for (const [l, c] of e)
    s[l] = c;
  return s;
}, me = { class: "wizard-error" }, ge = { class: "wizard-error-icon" }, _e = /* @__PURE__ */ b("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ b("path", {
    fill: "#b10805",
    d: "M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
  })
], -1), $e = { class: "wizard-error-body" }, ze = {
  key: 0,
  class: "wizard-error-title"
}, be = { key: 0 }, we = { key: 1 }, Se = { key: 2 }, ke = { class: "wizard-error-list" };
function xe(t, e, s, l, c, y) {
  const m = ae("Btn");
  return d(), h("div", me, [
    b("div", ge, [
      w(t.$slots, "icon", {}, () => [
        _e
      ])
    ]),
    b("div", null, [
      b("div", $e, [
        t.title ? (d(), h("h3", ze, x(t.title), 1)) : q("", !0),
        w(t.$slots, "default", {}, () => [
          t.isString ? (d(), h("div", be, x(t.errors), 1)) : t.isError ? (d(), h("div", we, x(t.errors.message), 1)) : (d(), h("div", Se, [
            b("ul", ke, [
              (d(!0), h(W, null, L(t.errors, (g, _) => (d(), h("li", { key: _ }, x(g), 1))), 128))
            ])
          ]))
        ])
      ]),
      B(m, {
        size: t.size,
        variant: "danger",
        block: "",
        onClick: e[0] || (e[0] = (g) => t.$emit("fix", g, t.error))
      }, {
        default: M(() => [
          H(" Fix Errors ")
        ]),
        _: 1
      }, 8, ["size"])
    ])
  ]);
}
const Ce = /* @__PURE__ */ j(ye, [["render", xe]]), Be = k({
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
    label(t) {
      var e;
      return (e = t == null ? void 0 : t.props) == null ? void 0 : e.label;
    }
  }
});
const We = { class: "wizard-progress" }, Ee = { class: "wizard-progress-label" };
function Ne(t, e, s, l, c, y) {
  return d(), h("div", We, [
    (d(!0), h(W, null, L(t.slots, (m, g) => (d(), h("div", {
      key: g,
      class: R(["wizard-progress-step", {
        active: g === t.active,
        disabled: g > t.highestStep,
        complete: g + 1 <= t.highestStep
      }])
    }, [
      b("div", Ee, x(t.label(m)), 1)
    ], 2))), 128))
  ]);
}
const Pe = /* @__PURE__ */ j(Be, [["render", Ne]]), Ae = k({
  mixins: [
    J
  ],
  props: {
    title: {
      type: String,
      default: "Success!"
    }
  }
});
const Le = { class: "wizard-success" }, Fe = { class: "wizard-success-icon" }, Me = /* @__PURE__ */ b("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ b("path", {
    fill: "#55b776",
    d: "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
  })
], -1), Oe = {
  key: 0,
  class: "wizard-success-title"
};
function je(t, e, s, l, c, y) {
  return d(), h("div", Le, [
    b("div", Fe, [
      w(t.$slots, "icon", {}, () => [
        Me
      ])
    ]),
    w(t.$slots, "title", { title: t.title }, () => [
      t.title ? (d(), h("h3", Oe, x(t.title), 1)) : q("", !0)
    ]),
    w(t.$slots, "default")
  ]);
}
const He = /* @__PURE__ */ j(Ae, [["render", je]]);
var Re = Object.defineProperty, qe = (t, e, s) => e in t ? Re(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Ve = (t, e, s) => (qe(t, typeof e != "symbol" ? e + "" : e, s), s), O = function() {
  return O = Object.assign || function(t) {
    for (var e, s = 1, l = arguments.length; s < l; s++) {
      e = arguments[s];
      for (var c in e)
        Object.prototype.hasOwnProperty.call(e, c) && (t[c] = e[c]);
    }
    return t;
  }, O.apply(this, arguments);
};
function Ze(t) {
  return t.toLowerCase();
}
var De = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], Te = /[^A-Z0-9]+/gi;
function Ge(t, e) {
  e === void 0 && (e = {});
  for (var s = e.splitRegexp, l = s === void 0 ? De : s, c = e.stripRegexp, y = c === void 0 ? Te : c, m = e.transform, g = m === void 0 ? Ze : m, _ = e.delimiter, a = _ === void 0 ? " " : _, r = I(I(t, l, "$1\0$2"), y, "\0"), n = 0, v = r.length; r.charAt(n) === "\0"; )
    n++;
  for (; r.charAt(v - 1) === "\0"; )
    v--;
  return r.slice(n, v).split("\0").map(g).join(a);
}
function I(t, e, s) {
  return e instanceof RegExp ? t.replace(e, s) : e.reduce(function(l, c) {
    return l.replace(c, s);
  }, t);
}
function Ie(t, e) {
  return e === void 0 && (e = {}), Ge(t, O({ delimiter: "." }, e));
}
function P(t, e) {
  return e === void 0 && (e = {}), Ie(t, O({ delimiter: "-" }, e));
}
class Je {
  constructor(e = {}) {
    Ve(this, "components"), this.components = /* @__PURE__ */ new Map(), Object.entries(e).forEach(([s, l]) => {
      this.register(s, l);
    });
  }
  get(e) {
    const s = this.components.get(
      e = P(e)
    );
    if (s)
      return s;
    throw new Error(`"${e}" has not been registered yet!`);
  }
  register(e, s) {
    return typeof e == "object" ? (Object.entries(e).forEach(([l, c]) => {
      this.register(P(l), c);
    }), this) : (this.components.set(P(e), s), this);
  }
  remove(e) {
    return this.components.delete(P(e)), this;
  }
  reset() {
    return this.components = /* @__PURE__ */ new Map(), this;
  }
}
function Ke(t = {}) {
  return new Je(t);
}
const Qe = Ke();
function C(t, e = "px") {
  return t != null && t !== !1 && isFinite(t) ? `${t}${e}` : t;
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
        width: C(this.width),
        maxWidth: C(this.maxWidth),
        minWidth: C(this.minWidth),
        height: C(this.height),
        maxHeight: C(this.maxHeight),
        minHeight: C(this.minHeight)
      };
    }
  },
  methods: {
    componentFromRegistry(t) {
      var e;
      try {
        return (e = oe(this.registry || "indicators", Qe)) == null ? void 0 : e.get(t);
      } catch {
      }
    },
    component() {
      return typeof this.type == "string" ? this.componentFromRegistry(this.type) : le(this.type);
    }
  }
});
const Ue = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [l, c] of e)
    s[l] = c;
  return s;
}, Xe = {}, Ye = { class: "activity-indicator-spinner" }, et = /* @__PURE__ */ ce('<div class="activity-indicator-spinner1 activity-indicator-spinner"></div><div class="activity-indicator-spinner2 activity-indicator-spinner"></div><div class="activity-indicator-spinner3 activity-indicator-spinner"></div><div class="activity-indicator-spinner4 activity-indicator-spinner"></div><div class="activity-indicator-spinner5 activity-indicator-spinner"></div><div class="activity-indicator-spinner6 activity-indicator-spinner"></div><div class="activity-indicator-spinner7 activity-indicator-spinner"></div><div class="activity-indicator-spinner8 activity-indicator-spinner"></div><div class="activity-indicator-spinner9 activity-indicator-spinner"></div><div class="activity-indicator-spinner10 activity-indicator-spinner"></div><div class="activity-indicator-spinner11 activity-indicator-spinner"></div><div class="activity-indicator-spinner12 activity-indicator-spinner"></div>', 12), tt = [
  et
];
function it(t, e) {
  return d(), h("div", Ye, tt);
}
const rt = /* @__PURE__ */ Ue(Xe, [["render", it]]), st = { class: "wizard" }, nt = { class: "wizard-content" }, at = { key: 2 }, ft = /* @__PURE__ */ k({
  __name: "Wizard",
  props: {
    active: { default: void 0 },
    buttons: { type: [Array, Function], default: void 0 },
    indicator: { default: rt },
    size: { default: "md" },
    submitLabel: { default: "Submit" },
    nextLabel: { default: "Next" },
    prevLabel: { default: "Back" }
  },
  emits: ["fix", "enter", "leave", "after-enter", "after-leave", "before-enter", "before-leave"],
  setup(t, { expose: e, emit: s }) {
    const l = t, c = A(() => r.value === 0), y = A(() => r.value === N() - 1), m = S(l.buttons ?? [
      {
        id: "back",
        align: "left",
        label: l.prevLabel,
        variant: "btn-secondary",
        onClick: () => {
          var i;
          c.value || (i = u.value) == null || i.prev();
        }
      },
      {
        id: "submit",
        align: "right",
        variant: "btn-primary",
        label: () => y.value ? l.submitLabel : l.nextLabel,
        onClick: async () => {
          var i;
          y.value ? v.value = !0 : (i = u.value) == null || i.next();
        }
      }
    ]), g = T();
    let _ = S(), a = S(), r = S(0), n = S(0), v = S(!1), $ = S(), u = S();
    function E() {
      var i;
      return (i = u.value) == null ? void 0 : i.next();
    }
    function K() {
      var i;
      return (i = u.value) == null ? void 0 : i.prev();
    }
    function Q(i) {
      var o;
      return (o = u.value) == null ? void 0 : o.goto(i);
    }
    function U() {
      v.value = !0, $.value = void 0;
    }
    function X(i) {
      v.value = !0, $.value = i || new Error();
    }
    function N() {
      var i, o;
      return ((o = (i = T()).default) == null ? void 0 : o.call(i).length) || 0;
    }
    function Y(i, o) {
      var p, f;
      (p = u.value) != null && p.$refs.slide && ((f = u.value) == null || f.$refs.slide.$refs.node.$emit("enter", i, o)), _.value = i, a.value = o, r.value = Number(i.key), n.value = Math.max(n.value, r.value);
    }
    function ee(i, o) {
      var p, f;
      (p = u.value) != null && p.$refs.slide && ((f = u.value) == null || f.$refs.slide.$refs.node.$emit("leave", i, o)), _.value = i, a.value = o, r.value = Number(i.key), n.value = Math.max(n.value, r.value);
    }
    function te(i, o) {
      var p, f;
      (p = u.value) != null && p.$refs.slide && ((f = u.value) == null || f.$refs.slide.$refs.node.$emit("after-enter", i, o)), _.value = i, a.value = o, r.value = Number(i.key), n.value = Math.max(n.value, r.value);
    }
    function ie(i, o) {
      var p, f;
      (p = u.value) != null && p.$refs.slide && ((f = u.value) == null || f.$refs.slide.$refs.node.$emit("after-leave", i, o)), _.value = i, a.value = o, r.value = Number(i.key), n.value = Math.max(n.value, r.value);
    }
    function re(i, o) {
      var p, f;
      (p = u.value) != null && p.$refs.slide && ((f = u.value) == null || f.$refs.slide.$refs.node.$emit("before-enter", i, o)), _.value = i, a.value = o, r.value = Number(i.key), n.value = Math.max(n.value, r.value);
    }
    function se(i, o) {
      var p, f;
      (p = u.value) != null && p.$refs.slide && ((f = u.value) == null || f.$refs.slide.$refs.node.$emit("before-leave", i, o)), _.value = i, a.value = o, r.value = Number(i.key), n.value = Math.max(n.value, r.value);
    }
    function ne(i, o) {
      s("fix", i, o), i.defaultPrevented || (v.value = !1);
    }
    const V = { next: E, prev: K, goto: Q, failed: X, success: U, totalSlots: N, isFirstSlot: c, isLastSlot: y, finished: v };
    return e(V), (i, o) => {
      var p, f;
      return d(), h("div", st, [
        z(v) ? z($) ? (d(), h("div", at, [
          w(i.$slots, "error", { error: z($) }, () => [
            B(Ce, {
              error: z($),
              onFix: ne
            }, null, 8, ["error"])
          ])
        ])) : w(i.$slots, "success", { key: 1 }, () => [
          B(He)
        ]) : (d(), h(W, { key: 0 }, [
          w(i.$slots, "progress", {
            active: z(r),
            highestStep: z(n)
          }, () => {
            var Z, D;
            return [
              N() > 1 ? (d(), F(Pe, {
                key: 0,
                active: z(r),
                "highest-step": z(n),
                slots: (D = (Z = z(g)).default) == null ? void 0 : D.call(Z)
              }, null, 8, ["active", "highest-step", "slots"])) : q("", !0)
            ];
          }),
          b("div", nt, [
            B(z(ue), {
              ref_key: "deck",
              ref: u,
              slots: (f = (p = z(g)).default) == null ? void 0 : f.call(p),
              onEnter: Y,
              onLeave: ee,
              onAfterEnter: te,
              onAfterLeave: ie,
              onBeforeEnter: re,
              onBeforeLeave: se
            }, null, 8, ["slots"])
          ]),
          B(he, {
            active: z(r),
            "current-slot": z(_),
            buttons: m.value,
            indicator: i.indicator,
            "is-first-slot": c.value,
            "is-last-slot": y.value,
            size: i.size,
            "total-slots": N(),
            context: V
          }, null, 8, ["active", "current-slot", "buttons", "indicator", "is-first-slot", "is-last-slot", "size", "total-slots"])
        ], 64))
      ]);
    };
  }
});
const ot = k({
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
function lt(t, e, s, l, c, y) {
  return d(), F(de(t.tag), {
    class: R(["wizard-header", { "wizard-header-center": t.center }])
  }, {
    default: M(() => [
      w(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
const ht = /* @__PURE__ */ j(ot, [["render", lt]]), ct = { class: "wizard-step" }, yt = /* @__PURE__ */ k({
  __name: "WizardStep",
  setup(t) {
    return (e, s) => (d(), h("div", ct, [
      w(e.$slots, "default", { ref: "content" })
    ]));
  }
});
export {
  ft as Wizard,
  he as WizardControls,
  Ce as WizardError,
  ht as WizardHeader,
  Pe as WizardProgress,
  yt as WizardStep,
  He as WizardSuccess
};
//# sourceMappingURL=wizard.js.map
