/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign$1 = function() {
  __assign$1 = Object.assign || function __assign22(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
function lowerCase$2(str) {
  return str.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP$2 = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP$2 = /[^A-Z0-9]+/gi;
function noCase$2(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP$2 : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP$2 : _b, _c = options.transform, transform = _c === void 0 ? lowerCase$2 : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result = replace$2(replace$2(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace$2(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}
function dotCase$1(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase$2(input, __assign$1({
    delimiter: "."
  }, options));
}
function paramCase$1(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase$1(input, __assign$1({
    delimiter: "-"
  }, options));
}
var Sizeable$1 = {
  props: {
    size: String,
    sizePrefix: {
      type: String,
      default() {
        return this.$options.name;
      }
    }
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix && paramCase$1(this.sizePrefix);
    },
    sizeableClass() {
      if (!this.size || !this.sizeableClassPrefix) {
        return "";
      }
      return `${this.sizeableClassPrefix}-${this.size}`;
    }
  }
};
function normalizeComponent$1(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script$c = {
  name: "Slide",
  props: {
    node: Object
  },
  mounted() {
    this.node.elm.dispatchEvent(new Event("enter"));
  },
  render(createElement) {
    return createElement("div", {
      staticClass: "slide-deck-slide"
    }, [this.node]);
  }
};
let __vue2_render$1, __vue2_staticRenderFns$1;
const __cssModules$c = {};
var __component__$c = /* @__PURE__ */ normalizeComponent$1(__vue2_script$c, __vue2_render$1, __vue2_staticRenderFns$1, false, __vue2_injectStyles$c, null, null, null);
function __vue2_injectStyles$c(context) {
  for (let o in __cssModules$c) {
    this[o] = __cssModules$c[o];
  }
}
var Slide = /* @__PURE__ */ function() {
  return __component__$c.exports;
}();
var render$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "slide-deck-controls" }, _vm._l(_vm.slots, function(slide, index) {
    return _c("a", { key: index, staticClass: "slide-deck-control-icon", class: { "is-active": _vm.isActive(slide, index) }, attrs: { "href": "#" }, on: { "click": function($event) {
      $event.preventDefault();
      return _vm.onClick($event, slide);
    } } }, [_vm._t("default", function() {
      return [_vm._v("\u2022")];
    }, null, Object.assign({}, { slide, index }, _vm.context))], 2);
  }), 0);
};
var staticRenderFns$a = [];
var SlideDeckControls_vue_vue_type_style_index_0_lang = "";
const __vue2_script$b = {
  props: {
    active: {
      type: [String, Number],
      default: 0
    },
    slots: {
      type: Array,
      required: true
    }
  },
  computed: {
    context() {
      return this;
    }
  },
  methods: {
    key(vnode) {
      return vnode.data ? vnode.data.key : vnode.key;
    },
    isActive(vnode, i) {
      if (this.key(vnode) === this.active) {
        return true;
      }
      if (i === this.active) {
        return true;
      }
      return false;
    },
    onClick(event, slide) {
      this.$emit("click", event, slide);
    }
  }
};
const __cssModules$b = {};
var __component__$b = /* @__PURE__ */ normalizeComponent$1(__vue2_script$b, render$a, staticRenderFns$a, false, __vue2_injectStyles$b, null, null, null);
function __vue2_injectStyles$b(context) {
  for (let o in __cssModules$b) {
    this[o] = __cssModules$b[o];
  }
}
var SlideDeckControls = /* @__PURE__ */ function() {
  return __component__$b.exports;
}();
var render$9 = function() {
  var _obj;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "slide-deck", class: { sliding: _vm.sliding } }, [_vm._t("top", null, { "active": _vm.currentActive }, this), _c("div", { ref: "content", staticClass: "slide-deck-content", class: (_obj = {}, _obj[_vm.direction] = true, _obj), style: { maxHeight: _vm.maxHeight } }, [_c("transition", { attrs: { "name": "slide-" + _vm.direction }, on: { "before-enter": _vm.onBeforeEnter, "enter": _vm.onEnter, "after-enter": _vm.onAfterEnter, "before-leave": _vm.onBeforeLeave, "leave": _vm.onLeave, "after-leave": _vm.onAfterLeave } }, [_c("keep-alive", [_c("slide", { key: _vm.currentActive, attrs: { "node": _vm.find(_vm.currentActive) } })], 1)], 1)], 1), _vm._t("middle", null, { "active": _vm.currentActive }, this), _vm._t("controls", function() {
    return [_vm.controls && _vm.mounted ? _c("slide-deck-controls", _vm._b({ ref: "controls", attrs: { "slots": _vm.slots(), "active": _vm.currentActive }, on: { "click": _vm.onClickControl }, scopedSlots: _vm._u([{ key: "default", fn: function(context) {
      return [_vm._t("bullet", null, null, context)];
    } }], null, true) }, "slide-deck-controls", this, false)) : _vm._e()];
  }, { "active": _vm.currentActive }, this), _vm._t("bottom", null, { "active": _vm.currentActive }, this)], 2);
};
var staticRenderFns$9 = [];
var SlideDeck_vue_vue_type_style_index_0_lang = "";
const __vue2_script$a = {
  name: "SlideDeck",
  components: {
    Slide,
    SlideDeckControls
  },
  props: {
    attrs: Object,
    active: {
      type: [String, Number],
      default: 0
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    controls: Boolean,
    props: Object
  },
  data() {
    return {
      currentActive: this.active,
      direction: "forward",
      maxHeight: null,
      mounted: false,
      lastSlide: null,
      sliding: false
    };
  },
  watch: {
    currentActive(value, oldValue) {
      this.lastSlide = oldValue;
      this.direction = this.findIndex(oldValue) > this.findIndex(value) ? "backward" : "forward";
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mounted = true;
      this.$emit("enter", this.slot());
    });
  },
  methods: {
    findIndex(key) {
      return this.slots().findIndex((vnode, i) => {
        if (this.key(vnode) === key) {
          return true;
        }
        if (i === key) {
          return true;
        }
        return false;
      });
    },
    find(key) {
      return this.slots()[this.findIndex(key)];
    },
    key(vnode) {
      return vnode.data && vnode.data.key || vnode.key;
    },
    goto(key) {
      if (!this.sliding) {
        this.currentActive = this.findIndex(this.key(key));
      }
    },
    next() {
      if (!this.sliding) {
        this.currentActive = Math.min(this.findIndex(this.currentActive) + 1, this.slots().length - 1);
      }
    },
    prev() {
      if (!this.sliding) {
        this.currentActive = Math.max(this.findIndex(this.currentActive) - 1, 0);
      }
    },
    resize(el) {
      const height = getComputedStyle(el).height;
      this.maxHeight = height === "0x" ? this.maxHeight : height;
    },
    slot() {
      return this.find(this.currentActive);
    },
    slots() {
      return (this.$slots.default || this.$scopedSlots.default(this)).filter((vnode) => {
        return !!vnode.tag;
      }).map((slot, key) => {
        return slot;
      });
    },
    onClickControl(event, vnode) {
      if (!this.sliding) {
        this.goto(vnode);
      }
    },
    onBeforeLeave(el) {
      this.autoResize && this.resize(el);
      this.$emit("before-leave", this.slot(), this.find(this.lastSlide));
    },
    onBeforeEnter(el) {
      this.sliding = true;
      this.$emit("before-enter", this.slot(), this.find(this.lastSlide));
    },
    onEnter(el) {
      this.$nextTick(() => {
        this.autoResize && this.resize(el);
        this.$emit("enter", this.slot(), this.find(this.lastSlide));
      });
    },
    onAfterEnter(el) {
      this.$emit("after-enter", this.slot(), this.find(this.lastSlide));
    },
    onLeave(el) {
      this.$emit("leave", this.slot(), this.find(this.lastSlide));
    },
    onAfterLeave(el) {
      this.sliding = false;
      this.$nextTick(() => {
        this.maxHeight = null;
        this.$emit("before-leave", this.slot(), this.find(this.lastSlide));
      });
    }
  }
};
const __cssModules$a = {};
var __component__$a = /* @__PURE__ */ normalizeComponent$1(__vue2_script$a, render$9, staticRenderFns$9, false, __vue2_injectStyles$a, null, null, null);
function __vue2_injectStyles$a(context) {
  for (let o in __cssModules$a) {
    this[o] = __cssModules$a[o];
  }
}
var SlideDeck = /* @__PURE__ */ function() {
  return __component__$a.exports;
}();
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var _assign = function __assign() {
  _assign = Object.assign || function __assign22(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
    }
    return t;
  };
  return _assign.apply(this, arguments);
};
function lowerCase$1(str) {
  return str.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP$1 = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP$1 = /[^A-Z0-9]+/gi;
function noCase$1(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP$1 : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP$1 : _b, _c = options.transform, transform = _c === void 0 ? lowerCase$1 : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result = replace$1(replace$1(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0") {
    start++;
  }
  while (result.charAt(end - 1) === "\0") {
    end--;
  }
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace$1(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}
function dotCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase$1(input, _assign({
    delimiter: "."
  }, options));
}
function paramCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase(input, _assign({
    delimiter: "-"
  }, options));
}
var ComponentRegistry = /* @__PURE__ */ function() {
  function ComponentRegistry2() {
    var _this = this;
    var components = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, ComponentRegistry2);
    this.components = {};
    Object.entries(components).forEach(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
      _this.register(key, value);
    });
  }
  _createClass(ComponentRegistry2, [{
    key: "validate",
    value: function validate(value) {
      if (_typeof(value) === "object" || typeof value === "function") {
        return value;
      }
      throw new Error("Invalid data type `".concat(_typeof(value), "`. Should be type `object` or `function`."));
    }
  }, {
    key: "get",
    value: function get(name) {
      var match = this.components[name = paramCase(name)];
      if (match) {
        return match;
      }
      throw new Error('"'.concat(name, '" has not been registered yet!'));
    }
  }, {
    key: "register",
    value: function register(name, value) {
      var _this2 = this;
      if (_typeof(name) === "object") {
        Object.entries(name).forEach(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), name2 = _ref4[0], module = _ref4[1];
          _this2.register(paramCase(name2), module);
        });
        return this;
      }
      this.components[paramCase(name)] = this.validate(value);
      return this;
    }
  }, {
    key: "remove",
    value: function remove(name) {
      delete this.components[paramCase(name)];
      return this;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.components = {};
      return this;
    }
  }]);
  return ComponentRegistry2;
}();
function factory() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _construct(ComponentRegistry, args);
}
const registry = factory();
var render$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "activity-indicator", class: _vm.classes, style: _vm.style }, [_c("div", { staticClass: "activity-indicator-content" }, [_c(_vm.component, { tag: "component", staticClass: "mx-auto" }), _vm.label ? _c("div", { staticClass: "activity-indicator-label" }, [_vm._v(" " + _vm._s(_vm.label) + " ")]) : _vm._e()], 1)]);
};
var staticRenderFns$8 = [];
var ActivityIndicator_vue_vue_type_style_index_0_lang = "";
function unit(value, uom = "px") {
  return value !== null && value !== void 0 && value !== false && isFinite(value) ? `${value}${uom}` : value;
}
const __vue2_script$9 = {
  name: "ActivityIndicator",
  props: {
    absolute: Boolean,
    center: Boolean,
    label: String,
    size: {
      type: String,
      default: "md"
    },
    registry: {
      type: ComponentRegistry,
      default() {
        return registry;
      }
    },
    type: {
      type: String,
      required: true
    },
    height: [String, Number],
    maxHeight: [String, Number],
    minHeight: [String, Number],
    width: [String, Number],
    maxWidth: [String, Number],
    minWidth: [String, Number]
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
        width: unit(this.width),
        maxWidth: unit(this.maxWidth),
        minWidth: unit(this.minWidth),
        height: unit(this.height),
        maxHeight: unit(this.maxHeight),
        minHeight: unit(this.minHeight)
      };
    },
    component() {
      return () => {
        const component = registry.get(this.type);
        if (component instanceof Promise) {
          return component;
        }
        if (typeof component === "function") {
          return component();
        }
        return Promise.resolve(component);
      };
    }
  }
};
const __cssModules$9 = {};
var __component__$9 = /* @__PURE__ */ normalizeComponent$1(__vue2_script$9, render$8, staticRenderFns$8, false, __vue2_injectStyles$9, null, null, null);
function __vue2_injectStyles$9(context) {
  for (let o in __cssModules$9) {
    this[o] = __cssModules$9[o];
  }
}
var ActivityIndicator = /* @__PURE__ */ function() {
  return __component__$9.exports;
}();
var Chase_vue_vue_type_style_index_0_lang = "";
var CircleFade_vue_vue_type_style_index_0_lang = "";
var CircleOrbit_vue_vue_type_style_index_0_lang = "";
var CircleTrail_vue_vue_type_style_index_0_lang = "";
var Dots_vue_vue_type_style_index_0_lang = "";
var DoublePulse_vue_vue_type_style_index_0_lang = "";
var Facebook_vue_vue_type_style_index_0_lang = "";
var Grid_vue_vue_type_style_index_0_lang = "";
var Pulse_vue_vue_type_style_index_0_lang = "";
var Spinner_vue_vue_type_style_index_0_lang = "";
var Spotify_vue_vue_type_style_index_0_lang = "";
var Square_vue_vue_type_style_index_0_lang = "";
var SquareFold_vue_vue_type_style_index_0_lang = "";
var SquareOrbit_vue_vue_type_style_index_0_lang = "";
var render$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("button", { staticClass: "btn", class: _vm.classes, attrs: { "type": _vm.type }, on: { "click": _vm.onClick } }, [_vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(), _vm._v(" " + _vm._s(_vm.label) + " "), _vm._t("default"), _c("activity-indicator", _vm._b({}, "activity-indicator", _vm.indicatorProps, false))], 2);
};
var staticRenderFns$7 = [];
var BtnActivity_vue_vue_type_style_index_0_lang = "";
const convertAnimationDelayToInt = function(delay) {
  const num = parseFloat(delay || 0, 10);
  const matches = delay && delay.match(/m?s/);
  const unit2 = matches ? matches[0] : false;
  let milliseconds;
  switch (unit2) {
    case "s":
      milliseconds = num * 1e3;
      break;
    case "ms":
    default:
      milliseconds = num;
      break;
  }
  return milliseconds || 0;
};
const animated = function(el, callback) {
  const defaultView = (el.ownerDocument || document).defaultView;
  setTimeout(() => {
    callback.apply();
  }, convertAnimationDelayToInt(defaultView.getComputedStyle(el).animationDuration));
};
const __vue2_script$8 = {
  name: "BtnActivity",
  components: {
    ActivityIndicator
  },
  props: {
    active: Boolean,
    activity: Boolean,
    block: Boolean,
    disabled: Boolean,
    label: String,
    icon: String,
    type: String,
    size: {
      type: String,
      default: "md"
    },
    variant: {
      type: String,
      default: "primary"
    },
    indicator: {
      type: [Object, String],
      default: "spinner"
    },
    orientation: {
      type: String,
      default: "right"
    }
  },
  computed: {
    classes() {
      const classes = {
        "disabled": this.disabled,
        "active": this.active,
        "btn-block": this.block,
        "btn-activity": this.activity
      };
      classes["btn-" + this.size.replace("btn-", "")] = !!this.size;
      classes["btn-" + this.variant.replace("btn-", "")] = !!this.variant;
      classes["btn-activity-" + this.orientation.replace("btn-activity-", "")] = !!this.orientation;
      classes["btn-activity-indicator-" + this.indicatorProps.type.replace("btn-activity-indicator-", "")] = !!this.indicatorProps.type;
      return classes;
    },
    indicatorProps() {
      return Object.assign({
        type: "spinner"
      }, (typeof this.indicator === "string" ? {
        type: this.indicator
      } : this.indicator) || {});
    }
  },
  watch: {
    activity(value) {
      if (value) {
        this.showActivity();
      } else {
        this.hideActivity();
      }
    }
  },
  methods: {
    disable() {
      this.$el.disabled = true;
    },
    enable() {
      this.$el.disabled = false;
    },
    showActivity() {
      this.disable();
      animated(this.$el, () => {
        this.$el.classList.add("btn-activity");
        this.$emit("show-activity");
      });
    },
    hideActivity() {
      this.$el.classList.add("btn-hide-activity");
      animated(this.$el, () => {
        this.enable();
        this.$el.classList.remove("btn-activity", "btn-hide-activity");
        this.$emit("hide-activity");
      });
    },
    onClick(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      } else {
        event.preventDefault();
      }
    }
  }
};
const __cssModules$8 = {};
var __component__$8 = /* @__PURE__ */ normalizeComponent$1(__vue2_script$8, render$7, staticRenderFns$7, false, __vue2_injectStyles$8, null, null, null);
function __vue2_injectStyles$8(context) {
  for (let o in __cssModules$8) {
    this[o] = __cssModules$8[o];
  }
}
var BtnActivity = /* @__PURE__ */ function() {
  return __component__$8.exports;
}();
var Context = {
  props: {
    active: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    active(value) {
      this.currentActive = value;
    }
  },
  data() {
    return {
      currentActive: this.active
    };
  },
  computed: {
    context() {
      return this;
    },
    isFirstSlot() {
      return this.currentActive === 0;
    },
    isLastSlot() {
      return this.currentActive === this.slots.length - 1;
    }
  },
  methods: {
    value(value, ...args) {
      return typeof value === "function" ? value.apply(this, args) : value;
    }
  }
};
var render$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard-controls", class: _vm.classes }, [_vm._t("default", function() {
    return [_c("div", { staticClass: "wizard-controls-left wizard-controls-section" }, [_vm._t("back", function() {
      return [_c("btn-activity", { ref: "back", attrs: { "type": "button", "activity": !!_vm.activity.back, "disabled": !_vm.validated.back, "indicator": _vm.indicator, "size": _vm.size, "variant": _vm.value(_vm.backVariant) }, on: { "click": _vm.onClickBack } }, [_vm._v(" " + _vm._s(_vm.value(_vm.backLabel)) + " ")])];
    }, null, _vm.context)], 2), _c("div", { staticClass: "wizard-controls-right wizard-controls-section" }, [_vm._t("submit", function() {
      return [_c("btn-activity", { ref: "submit", attrs: { "type": "button", "activity": !!_vm.activity.submit, "disabled": !_vm.validated.submit, "indicator": _vm.indicator, "size": _vm.size, "variant": _vm.value(_vm.submitVariant) }, on: { "click": _vm.onClickSubmit } }, [_vm._v(" " + _vm._s(_vm.value(_vm.submitLabel)) + " ")])];
    }, null, _vm.context)], 2)];
  }, null, _vm.context)], 2);
};
var staticRenderFns$6 = [];
var WizardControls_vue_vue_type_style_index_0_lang = "";
const __vue2_script$7 = {
  name: "WizardControls",
  components: {
    BtnActivity
  },
  mixins: [
    Context,
    Sizeable$1
  ],
  props: {
    activity: {
      type: Object,
      default: () => ({})
    },
    backLabel: {
      type: [Function, String],
      default: "Back"
    },
    backVariant: {
      type: [Function, String],
      default: "secondary"
    },
    submitLabel: {
      type: [Function, String],
      default() {
        return !this.isLastSlot ? "Next" : "Finish";
      }
    },
    submitVariant: {
      type: [Function, String],
      default: "primary"
    },
    indicator: String,
    slots: {
      type: Array,
      required: true
    },
    validated: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    classes() {
      return {
        [this.sizeableClass]: !!this.size
      };
    }
  },
  methods: {
    onClickBack(e) {
      this.$emit("back", e);
    },
    onClickSubmit(e) {
      this.$emit("submit", e);
    }
  }
};
const __cssModules$7 = {};
var __component__$7 = /* @__PURE__ */ normalizeComponent$1(__vue2_script$7, render$6, staticRenderFns$6, false, __vue2_injectStyles$7, null, null, null);
function __vue2_injectStyles$7(context) {
  for (let o in __cssModules$7) {
    this[o] = __cssModules$7[o];
  }
}
var WizardControls = /* @__PURE__ */ function() {
  return __component__$7.exports;
}();
var Sizeable = {
  props: {
    size: String,
    sizePrefix: {
      type: String,
      default() {
        return this.$options.name && this.$options.name.toLowerCase();
      }
    }
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix;
    },
    sizeableClass() {
      if (!this.size || !this.sizeableClassPrefix) {
        return "";
      }
      return `${this.sizeableClassPrefix}-${this.size}`;
    }
  }
};
var Variant = {
  props: {
    variant: String,
    variantPrefix: {
      type: String,
      default() {
        return this.$options.name && this.$options.name.toLowerCase();
      }
    }
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix;
    },
    variantClass() {
      if (!this.variant || !this.variantClassPrefix) {
        return "";
      }
      return `${this.variantClassPrefix}-${this.variant}`;
    }
  }
};
var render$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.to ? _c("router-link", {
    class: _vm.classes,
    attrs: {
      "to": _vm.to,
      "disabled": _vm.disabled,
      "role": "button"
    },
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default")], 2) : _vm.href ? _c("a", {
    class: _vm.classes,
    attrs: {
      "href": _vm.href,
      "disabled": _vm.disabled,
      "role": "button"
    },
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default")], 2) : _vm.label ? _c("label", {
    class: _vm.classes,
    attrs: {
      "disabled": _vm.disabled,
      "role": "button"
    },
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default")], 2) : _c("button", {
    class: _vm.classes,
    attrs: {
      "type": _vm.type,
      "disabled": _vm.disabled
    },
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default")], 2);
};
var staticRenderFns$5 = [];
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script$6 = {
  name: "Btn",
  mixins: [Sizeable, Variant],
  props: {
    active: Boolean,
    block: Boolean,
    disabled: Boolean,
    href: String,
    label: Boolean,
    outline: Boolean,
    to: [Object, String],
    type: String
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix + (this.outline ? "-outline" : "");
    },
    classes() {
      return ["btn", this.variantClass, this.sizeableClass, this.block ? "btn-block" : "", this.active ? "active" : ""];
    }
  },
  methods: {
    onClick(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      } else {
        event.preventDefault();
      }
    }
  }
};
const __cssModules$6 = {};
var __component__$6 = /* @__PURE__ */ normalizeComponent(__vue2_script$6, render$5, staticRenderFns$5, false, __vue2_injectStyles$6, null, null, null);
function __vue2_injectStyles$6(context) {
  for (let o in __cssModules$6) {
    this[o] = __cssModules$6[o];
  }
}
var Btn = /* @__PURE__ */ function() {
  return __component__$6.exports;
}();
var render$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard-error" }, [_c("div", { staticClass: "wizard-error-icon" }, [_vm._t("icon", function() {
    return [_c("svg", { attrs: { "xmlns": "http://www.w3.org/2000/svg", "width": "32", "height": "32", "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "fill": "#b10805", "d": "M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" } })])];
  }, null, this)], 2), _c("div", [_c("div", { staticClass: "wizard-error-body" }, [_vm.title ? _c("h3", { staticClass: "wizard-error-title", domProps: { "innerHTML": _vm._s(_vm.title) } }) : _vm._e(), _vm._t("default", function() {
    return [_vm.isString ? _c("div", [_vm._v(" " + _vm._s(_vm.errors) + " ")]) : _vm.isError ? _c("div", [_vm._v(" " + _vm._s(_vm.errors.message) + " ")]) : _c("div", [_c("ul", { staticClass: "wizard-error-list" }, _vm._l(_vm.errors, function(message, i) {
      return _c("li", { key: i }, [_vm._v(" " + _vm._s(message) + " ")]);
    }), 0)])];
  }, null, this)], 2), _c("btn", { attrs: { "size": _vm.size, "variant": "danger", "block": "" }, on: { "click": function(e) {
    return _vm.$emit("fix", e, _vm.error);
  } } }, [_vm._v(" Fix Errors ")])], 1)]);
};
var staticRenderFns$4 = [];
var WizardError_vue_vue_type_style_index_0_lang = "";
const __vue2_script$5 = {
  name: "WizardError",
  components: {
    Btn
  },
  mixins: [
    Sizeable$1
  ],
  props: {
    title: {
      type: String,
      default: "Error!"
    },
    error: {
      type: Error,
      required: true
    },
    extract: {
      type: Function,
      default(e) {
        if (e.response && e.response.data.errors) {
          return e.response.data.errors;
        }
        return e;
      }
    }
  },
  data() {
    return {
      errors: this.extract(this.error)
    };
  },
  computed: {
    isString() {
      return typeof this.errors === "string";
    },
    isError() {
      return this.errors instanceof Error;
    }
  }
};
const __cssModules$5 = {};
var __component__$5 = /* @__PURE__ */ normalizeComponent$1(__vue2_script$5, render$4, staticRenderFns$4, false, __vue2_injectStyles$5, null, null, null);
function __vue2_injectStyles$5(context) {
  for (let o in __cssModules$5) {
    this[o] = __cssModules$5[o];
  }
}
var WizardError = /* @__PURE__ */ function() {
  return __component__$5.exports;
}();
var render$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard-progress" }, _vm._l(_vm.slots, function(slot, i) {
    return _c("div", { key: i, staticClass: "wizard-progress-step", class: {
      "active": i === _vm.active,
      "disabled": i > _vm.highestStep,
      "complete": i + 1 <= _vm.highestStep
    }, on: { "click": function($event) {
      $event.preventDefault();
      return _vm.onClick($event, slot);
    } } }, [_c("div", { staticClass: "wizard-progress-label" }, [_vm._v(" " + _vm._s(_vm.label(slot)) + " ")])]);
  }), 0);
};
var staticRenderFns$3 = [];
var WizardProgress_vue_vue_type_style_index_0_lang = "";
const __vue2_script$4 = {
  name: "WizardProgress",
  props: {
    active: {
      type: [String, Number],
      required: true
    },
    highestStep: {
      type: Number,
      required: true
    },
    slots: {
      type: Array,
      required: true
    }
  },
  methods: {
    label(vnode) {
      return vnode.componentOptions && vnode.componentOptions.propsData.label;
    },
    onClick(event, slot) {
    }
  }
};
const __cssModules$4 = {};
var __component__$4 = /* @__PURE__ */ normalizeComponent$1(__vue2_script$4, render$3, staticRenderFns$3, false, __vue2_injectStyles$4, null, null, null);
function __vue2_injectStyles$4(context) {
  for (let o in __cssModules$4) {
    this[o] = __cssModules$4[o];
  }
}
var WizardProgress = /* @__PURE__ */ function() {
  return __component__$4.exports;
}();
var render$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard-success" }, [_c("div", { staticClass: "wizard-success-icon" }, [_vm._t("icon", function() {
    return [_c("svg", { attrs: { "xmlns": "http://www.w3.org/2000/svg", "width": "32", "height": "32", "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "fill": "#55b776", "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" } })])];
  }, null, this)], 2), _vm.title ? _c("h3", { staticClass: "wizard-success-title", domProps: { "innerHTML": _vm._s(_vm.title) } }) : _vm._e(), _vm._t("default", null, null, this)], 2);
};
var staticRenderFns$2 = [];
var WizardSuccess_vue_vue_type_style_index_0_lang = "";
const __vue2_script$3 = {
  name: "WizardSuccess",
  mixins: [
    Sizeable$1
  ],
  props: {
    title: {
      type: String,
      default: "Success!"
    }
  }
};
const __cssModules$3 = {};
var __component__$3 = /* @__PURE__ */ normalizeComponent$1(__vue2_script$3, render$2, staticRenderFns$2, false, __vue2_injectStyles$3, null, null, null);
function __vue2_injectStyles$3(context) {
  for (let o in __cssModules$3) {
    this[o] = __cssModules$3[o];
  }
}
var WizardSuccess = /* @__PURE__ */ function() {
  return __component__$3.exports;
}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign2 = function() {
  __assign2 = Object.assign || function __assign3(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
function lowerCase(str) {
  return str.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}
function pascalCaseTransform(input, index) {
  var firstChar = input.charAt(0);
  var lowerChars = input.substr(1).toLowerCase();
  if (index > 0 && firstChar >= "0" && firstChar <= "9") {
    return "_" + firstChar + lowerChars;
  }
  return "" + firstChar.toUpperCase() + lowerChars;
}
function pascalCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign2({
    delimiter: "",
    transform: pascalCaseTransform
  }, options));
}
function camelCaseTransform(input, index) {
  if (index === 0)
    return input.toLowerCase();
  return pascalCaseTransform(input, index);
}
function camelCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return pascalCase(input, __assign2({
    transform: camelCaseTransform
  }, options));
}
var Validators = {
  mixins: [Context],
  props: {
    validate: {
      type: Array,
      default: () => ["back", "submit"]
    }
  },
  beforeCreate() {
    Object.entries(this.$vnode.data.attrs || {}).reduce((carry, [key, value]) => {
      delete this.$attrs[key];
      return Object.assign(carry, {
        [camelCase(key)]: value
      });
    }, this.$vnode.componentOptions.validators = {});
  },
  created() {
    this.validators = this.$vnode.componentOptions.validators;
  },
  data() {
    return {
      validators: {}
    };
  },
  methods: {
    isValid(value) {
      return value === true || typeof value === "undefined";
    },
    hasCallback(key) {
      return typeof this.validators[key] !== "undefined";
    },
    callback(key) {
      if (typeof this.validators[key] === "undefined") {
        return Promise.resolve(true);
      }
      return this.promise(this.value(this.validators[key], this));
    },
    promise(value) {
      if (value instanceof Promise) {
        return value;
      }
      if (value instanceof Error) {
        return Promise.reject(error);
      }
      return Promise.resolve(value);
    },
    runValidators() {
      return this.validate.reduce((carry, key) => {
        const validator = this.validators[camelCase(`validate-${key}`)];
        return Object.assign(carry, {
          [key]: this.isValid(this.value(validator, this))
        });
      }, {});
    }
  }
};
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard", class: _vm.classes }, [!_vm.finished ? [_vm._t("progress", function() {
    return [_vm.mounted && _vm.slots.length > 1 ? _c("wizard-progress", { attrs: { "active": _vm.currentActive, "highest-step": _vm.highestStep, "slots": _vm.slots }, on: { "click": _vm.onClickProgress } }) : _vm._e()];
  }, null, _vm.context), _vm._t("header", null, null, _vm.context), _c("div", { staticClass: "wizard-content" }, [_c("slide-deck", { ref: "slideDeck", attrs: { "active": _vm.currentActive, "props": { active: _vm.currentActive, validate: _vm.validate } }, on: { "enter": _vm.onEnter, "leave": _vm.onLeave } }, [_vm._t("default")], 2)], 1), _vm._t("controls", function() {
    return [_vm.mounted && _vm.controls ? _c("wizard-controls", { ref: "controls", attrs: { "activity": _vm.activity, "active": _vm.currentActive, "validated": _vm.validated, "size": _vm.size, "slots": _vm.slots }, on: { "back": _vm.onClickBack, "submit": _vm.onClickSubmit }, scopedSlots: _vm._u([{ key: "back", fn: function(context) {
      return [_vm._t("back", null, null, context)];
    } }, { key: "submit", fn: function(context) {
      return [_vm._t("submit", null, null, context)];
    } }], null, true) }) : _vm._e()];
  }, null, this)] : !_vm.error ? [_vm._t("success", function() {
    return [_c("wizard-success", { attrs: { "size": _vm.size }, scopedSlots: _vm._u([{ key: "default", fn: function() {
      return [_vm._t("success-content")];
    }, proxy: true }], null, true) })];
  })] : [_vm._t("error", function() {
    return [_c("wizard-error", { attrs: { "error": _vm.error, "extract": _vm.errors, "size": _vm.size }, on: { "fix": _vm.onFix }, scopedSlots: _vm._u([{ key: "default", fn: function() {
      return [_vm._t("error-content")];
    }, proxy: true }], null, true) })];
  })]], 2);
};
var staticRenderFns$1 = [];
var Wizard_vue_vue_type_style_index_0_lang = "";
const __vue2_script$2 = {
  name: "Wizard",
  components: {
    SlideDeck,
    WizardControls,
    WizardError,
    WizardProgress,
    WizardSuccess
  },
  mixins: [
    Sizeable$1,
    Validators
  ],
  props: {
    activity: {
      type: Object,
      default() {
        return this.validate.reduce((carry, key) => {
          return Object.assign(carry, {
            [key]: false
          });
        }, {});
      }
    },
    controls: {
      type: Boolean,
      default: true
    },
    errors: Function,
    failed: {
      type: Function,
      default() {
      }
    },
    header: String,
    indicator: String,
    validateBack: {
      type: [Function, Boolean],
      default() {
        return this.currentActive > 0;
      }
    }
  },
  data() {
    return {
      error: null,
      finished: false,
      highestStep: 0,
      mounted: false,
      response: null,
      slots: [],
      validated: this.validate.reduce((carry, key) => {
        return Object.assign(carry, {
          [key]: true
        });
      }, {})
    };
  },
  computed: {
    classes() {
      return {
        [this.sizeableClass]: !!this.size
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mounted = true;
      this.slots = this.$refs.slideDeck.slots();
    });
  },
  methods: {
    checkValidity(prop, ...args) {
      return !!this.value(this[prop], ...args);
    },
    disableButtons() {
      Object.keys(this.validated).forEach((key) => {
        this.disable(key);
      });
    },
    disable(key) {
      this.validated[key] = true;
    },
    emitBubbleEvent(key, ...args) {
      args = [key].concat(args);
      const instance = this.$refs.slideDeck.slot().componentInstance;
      instance.$emit.apply(instance, args);
      this.$emit.apply(this, args);
    },
    enableButtons() {
      Object.keys(this.validated).forEach((key) => {
        this.enable(key);
      });
    },
    enable(key) {
      this.validated[key] = false;
    },
    handleButtonClick(event, ...args) {
      const [key, validator] = args;
      this.emitBubbleEvent(key, event, this);
      if (event.defaultPrevented) {
        return;
      }
      if (!this.slot().hasCallback(validator || key)) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        this.activity[validator || key] = true;
        this.slot().callback(validator || key).then((value) => {
          if (this.isValid(value)) {
            resolve();
          } else {
            reject(null);
          }
        }, reject);
      });
    },
    goto(index) {
      this.$resf.slideDeck.goto(index);
    },
    next() {
      this.$refs.slideDeck.next();
    },
    prev() {
      this.$refs.slideDeck.prev();
    },
    slot() {
      return this.$refs.slideDeck.slot().componentInstance;
    },
    success() {
      this.error = null;
      this.finished = true;
    },
    onClickBack(event) {
      this.handleButtonClick(event, "back").then(this.prev).finally(() => {
        this.activity.back = false;
      });
    },
    onClickProgress(event, slide) {
    },
    onClickSubmit(event) {
      if (!this.isLastSlot) {
        this.handleButtonClick(event, "next", "submit").then(this.next).finally(() => {
          this.activity.submit = false;
        });
      } else {
        this.handleButtonClick(event, "submit").then((response) => {
          let finish = Promise.resolve();
          if (this.hasCallback("submit")) {
            finish = this.callback("submit");
          }
          finish.then((response2) => {
            this.success(this.response = response2);
          }, (e) => {
            this.failed(this.error = e);
          }).finally(() => {
            this.finished = true;
            this.activity.submit = false;
          });
        });
      }
    },
    onEnter(slide, prevSlide) {
      this.currentActive = this.$refs.slideDeck.currentActive;
      this.highestStep = Math.max(this.highestStep, this.currentActive);
      slide.componentInstance.$on("validate", this.onValidate);
      slide.componentInstance.onEnter(slide, prevSlide);
    },
    onFix(event, error2) {
      this.$emit("fix", event, error2, this);
      if (!event.defaultPrevented) {
        this.finished = false;
      }
    },
    onLeave(slide, prevSlide) {
      prevSlide.componentInstance.$off("validate", this.onValidate);
      this.$nextTick(() => {
        slide.componentInstance.onLeave(slide, prevSlide);
      });
    },
    onValidate(validated) {
      const global = this.runValidators();
      this.validated = this.validate.reduce((carry, key) => {
        return Object.assign(carry, {
          [key]: validated[key] && global[key]
        });
      }, {});
    }
  }
};
const __cssModules$2 = {};
var __component__$2 = /* @__PURE__ */ normalizeComponent$1(__vue2_script$2, render$1, staticRenderFns$1, false, __vue2_injectStyles$2, null, null, null);
function __vue2_injectStyles$2(context) {
  for (let o in __cssModules$2) {
    this[o] = __cssModules$2[o];
  }
}
var Wizard = /* @__PURE__ */ function() {
  return __component__$2.exports;
}();
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(_vm.tag, { tag: "component", staticClass: "wizard-header", class: { "text-center": _vm.center } }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
var WizardHeader_vue_vue_type_style_index_0_lang = "";
const __vue2_script$1 = {
  name: "WizardHeader",
  props: {
    center: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: "h2"
    }
  }
};
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent$1(__vue2_script$1, render, staticRenderFns, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var WizardHeader = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
const __vue2_script = {
  name: "WizardStep",
  mixins: [
    Context,
    Validators
  ],
  props: {
    label: String
  },
  updated() {
    this.$nextTick(this.performValidityChecks);
  },
  methods: {
    performValidityChecks() {
      this.$emit("validate", this.runValidators());
    },
    onEnter(...args) {
      this.performValidityChecks();
      this.$emit("enter", ...args);
    },
    onLeave(...args) {
      this.$emit("leave", ...args);
    }
  },
  render(createElement) {
    return createElement("div", {
      staticClass: "wizard-slot"
    }, this.$slots.default);
  }
};
let __vue2_render, __vue2_staticRenderFns;
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent$1(__vue2_script, __vue2_render, __vue2_staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var WizardStep = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { Wizard, WizardControls, WizardError, WizardHeader, WizardProgress, WizardStep, WizardSuccess };
