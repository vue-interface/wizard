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
var __assign = function() {
  __assign = Object.assign || function __assign22(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
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
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace$1(input, re, value) {
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
  return noCase$1(input, __assign({
    delimiter: "."
  }, options));
}
function paramCase$1(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase$1(input, __assign({
    delimiter: "-"
  }, options));
}
var Sizeable = {
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
const __vue2_script$c = {
  name: "Slide",
  props: {
    node: Object
  },
  beforeDestroy() {
    delete this.node.elm;
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
var __component__$c = /* @__PURE__ */ normalizeComponent(__vue2_script$c, __vue2_render$1, __vue2_staticRenderFns$1, false, __vue2_injectStyles$c, null, null, null);
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
    }, null, Object.assign({ slide, index }, _vm.context))], 2);
  }), 0);
};
var staticRenderFns$a = [];
var SlideDeckControls_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".slide-deck-controls{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;color:currentColor}.slide-deck-controls.absolute{position:absolute;bottom:0;width:100%}.slide-deck-controls .slide-deck-control-icon{font-size:2em;padding:.25em .15em}.slide-deck-controls>a:hover{text-decoration:none}.slide-deck-controls :not(:last-child){margin-right:.5rem}.slide-deck-controls .slide-deck-control-icon.is-active{color:#007bff}\n")();
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
var __component__$b = /* @__PURE__ */ normalizeComponent(__vue2_script$b, render$a, staticRenderFns$a, false, __vue2_injectStyles$b, null, null, null);
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
  return _c("div", { staticClass: "slide-deck", class: { sliding: _vm.sliding } }, [_vm._t("top", null, { "active": _vm.currentActive }, this), _c("div", { ref: "content", staticClass: "slide-deck-content", class: (_obj = {}, _obj[_vm.direction] = true, _obj), style: { maxHeight: _vm.maxHeight } }, [_c("transition", { attrs: { "name": "slide-" + _vm.direction }, on: { "before-enter": _vm.onBeforeEnter, "enter": _vm.onEnter, "after-enter": _vm.onAfterEnter, "before-leave": _vm.onBeforeLeave, "leave": _vm.onLeave, "after-leave": _vm.onAfterLeave } }, [_c("keep-alive", [_c("slide", { key: _vm.currentActive, ref: "slide", attrs: { "node": _vm.find(_vm.currentActive) } })], 1)], 1)], 1), _vm._t("middle", null, { "active": _vm.currentActive }, this), _vm._t("controls", function() {
    return [_vm.controls && _vm.mounted ? _c("slide-deck-controls", _vm._b({ ref: "controls", attrs: { "slots": _vm.slots(), "active": _vm.currentActive }, on: { "click": _vm.onClickControl }, scopedSlots: _vm._u([{ key: "default", fn: function(context) {
      return [_vm._t("bullet", null, null, context)];
    } }], null, true) }, "slide-deck-controls", this, false)) : _vm._e()];
  }, { "active": _vm.currentActive }, this), _vm._t("bottom", null, { "active": _vm.currentActive }, this)], 2);
};
var staticRenderFns$9 = [];
var SlideDeck_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".slide-deck{height:auto;position:relative}.slide-deck.sliding{overflow:hidden}.slide-deck .slide-deck-content{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-transition-property:max-height;transition-property:max-height;-webkit-transition-duration:.25s;transition-duration:.25s;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;max-height:auto}.slide-deck .slide-deck-content.forward{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.slide-deck .slide-deck-content.backward{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.slide-deck .slide-deck-slide{width:100%;-ms-flex-negative:0;flex-shrink:0;-ms-flex-item-align:start;align-self:flex-start}.slide-forward-leave-active,.slide-forward-enter-active,.slide-backward-leave-active,.slide-backward-enter-active{-webkit-transition:all .25s ease-in-out;transition:all .25s ease-in-out}.slide-deck .slide-forward-enter-to,.slide-deck .slide-forward-leave-to{-webkit-transform:translateX(-100%);transform:translate(-100%)}.slide-deck .slide-backward-enter-to,.slide-deck .slide-backward-leave-to{-webkit-transform:translateX(100%);transform:translate(100%)}\n")();
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
      if (vnode.data && typeof vnode.data.key !== "undefined") {
        return vnode.data.key;
      }
      if (typeof vnode.key !== "undefined") {
        return vnode.key;
      }
      return vnode;
    },
    goto(key) {
      if (!this.sliding) {
        this.currentActive = Math.max(0, this.findIndex(this.key(key)));
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
        if (slot.componentOptions) {
          slot.componentOptions.propsData = Object.assign({}, slot.componentOptions.propsData, this.props);
        }
        if (slot.data) {
          slot.data.attrs = Object.assign({}, slot.data.attrs, this.attrs);
        }
        return Object.assign(slot, {
          key
        });
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
        this.$emit("after-leave", this.slot(), this.find(this.lastSlide));
      });
    }
  }
};
const __cssModules$a = {};
var __component__$a = /* @__PURE__ */ normalizeComponent(__vue2_script$a, render$9, staticRenderFns$9, false, __vue2_injectStyles$a, null, null, null);
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
var _assign = function __assign2() {
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
  while (result.charAt(start) === "\0") {
    start++;
  }
  while (result.charAt(end - 1) === "\0") {
    end--;
  }
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace(input, re, value) {
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
  return noCase(input, _assign({
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
      this.components[paramCase(name)] = value;
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
var ActivityIndicator_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".activity-indicator-label{margin-top:.75rem;text-align:center}.activity-indicator-xs{font-size:.5rem}.activity-indicator-sm{font-size:.75rem}.activity-indicator-md{font-size:1rem}.activity-indicator-lg{font-size:1.25rem}.activity-indicator-xl{font-size:1.75rem}.activity-indicator-center{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin:auto}.activity-indicator-absolute{position:absolute;width:100%;height:100%;top:0;left:0}\n")();
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
var __component__$9 = /* @__PURE__ */ normalizeComponent(__vue2_script$9, render$8, staticRenderFns$8, false, __vue2_injectStyles$9, null, null, null);
function __vue2_injectStyles$9(context) {
  for (let o in __cssModules$9) {
    this[o] = __cssModules$9[o];
  }
}
var ActivityIndicator = /* @__PURE__ */ function() {
  return __component__$9.exports;
}();
var Chase_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => '.activity-indicator-chase{width:2.5em;height:2.5em;position:relative;-webkit-animation:activity-indicator-chase 2.5s infinite linear both;animation:activity-indicator-chase 2.5s infinite linear both}.activity-indicator-chase-dot{width:100%;height:100%;position:absolute;left:0;top:0;-webkit-animation:activity-indicator-chase-dot 2s infinite ease-in-out both;animation:activity-indicator-chase-dot 2s infinite ease-in-out both}.activity-indicator-chase-dot:before{content:"";display:block;width:25%;height:25%;background-color:currentColor;border-radius:100%;-webkit-animation:activity-indicator-chase-dot-before 2s infinite ease-in-out both;animation:activity-indicator-chase-dot-before 2s infinite ease-in-out both}.activity-indicator-chase-dot:nth-child(1){-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.activity-indicator-chase-dot:nth-child(2){-webkit-animation-delay:-1s;animation-delay:-1s}.activity-indicator-chase-dot:nth-child(3){-webkit-animation-delay:-.9s;animation-delay:-.9s}.activity-indicator-chase-dot:nth-child(4){-webkit-animation-delay:-.8s;animation-delay:-.8s}.activity-indicator-chase-dot:nth-child(5){-webkit-animation-delay:-.7s;animation-delay:-.7s}.activity-indicator-chase-dot:nth-child(6){-webkit-animation-delay:-.6s;animation-delay:-.6s}.activity-indicator-chase-dot:nth-child(1):before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.activity-indicator-chase-dot:nth-child(2):before{-webkit-animation-delay:-1s;animation-delay:-1s}.activity-indicator-chase-dot:nth-child(3):before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.activity-indicator-chase-dot:nth-child(4):before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.activity-indicator-chase-dot:nth-child(5):before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.activity-indicator-chase-dot:nth-child(6):before{-webkit-animation-delay:-.6s;animation-delay:-.6s}@-webkit-keyframes activity-indicator-chase{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes activity-indicator-chase{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes activity-indicator-chase-dot{80%,to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes activity-indicator-chase-dot{80%,to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes activity-indicator-chase-dot-before{50%{-webkit-transform:scale(.4);transform:scale(.4)}to,0%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes activity-indicator-chase-dot-before{50%{-webkit-transform:scale(.4);transform:scale(.4)}to,0%{-webkit-transform:scale(1);transform:scale(1)}}\n')();
var CircleFade_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => '.activity-indicator-circle-fade{width:2.5em;height:2.5em;position:relative}.activity-indicator-circle-fade .activity-indicator-circle{width:100%;height:100%;position:absolute;left:0;top:0}.activity-indicator-circle-fade .activity-indicator-circle:before{content:"";display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;-webkit-animation:activity-indicator-circle-fade 1.2s infinite ease-in-out both;animation:activity-indicator-circle-fade 1.2s infinite ease-in-out both}.activity-indicator-circle-fade .activity-indicator-circle2{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.activity-indicator-circle-fade .activity-indicator-circle3{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.activity-indicator-circle-fade .activity-indicator-circle4{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.activity-indicator-circle-fade .activity-indicator-circle5{-webkit-transform:rotate(120deg);transform:rotate(120deg)}.activity-indicator-circle-fade .activity-indicator-circle6{-webkit-transform:rotate(150deg);transform:rotate(150deg)}.activity-indicator-circle-fade .activity-indicator-circle7{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.activity-indicator-circle-fade .activity-indicator-circle8{-webkit-transform:rotate(210deg);transform:rotate(210deg)}.activity-indicator-circle-fade .activity-indicator-circle9{-webkit-transform:rotate(240deg);transform:rotate(240deg)}.activity-indicator-circle-fade .activity-indicator-circle10{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.activity-indicator-circle-fade .activity-indicator-circle11{-webkit-transform:rotate(300deg);transform:rotate(300deg)}.activity-indicator-circle-fade .activity-indicator-circle12{-webkit-transform:rotate(330deg);transform:rotate(330deg)}.activity-indicator-circle-fade .activity-indicator-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.activity-indicator-circle-fade .activity-indicator-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.activity-indicator-circle-fade .activity-indicator-circle4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.activity-indicator-circle-fade .activity-indicator-circle5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.activity-indicator-circle-fade .activity-indicator-circle6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.activity-indicator-circle-fade .activity-indicator-circle7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.activity-indicator-circle-fade .activity-indicator-circle8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.activity-indicator-circle-fade .activity-indicator-circle9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.activity-indicator-circle-fade .activity-indicator-circle10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.activity-indicator-circle-fade .activity-indicator-circle11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.activity-indicator-circle-fade .activity-indicator-circle12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes activity-indicator-circle-fade{0%,39%,to{opacity:0}40%{opacity:1}}@keyframes activity-indicator-circle-fade{0%,39%,to{opacity:0}40%{opacity:1}}\n')();
var CircleOrbit_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".activity-indicator-circle-orbit{width:2.5em;height:2.5em;position:relative;text-align:center;-webkit-animation:activity-indicator-circle-orbit-rotate 2s infinite linear;animation:activity-indicator-circle-orbit-rotate 2s infinite linear}.activity-indicator-circle-orbit-dot1,.activity-indicator-circle-orbit-dot2{width:60%;height:60%;display:inline-block;position:absolute;top:0;background-color:currentColor;border-radius:100%;-webkit-animation:activity-indicator-circle-orbit-bounce 2s infinite ease-in-out;animation:activity-indicator-circle-orbit-bounce 2s infinite ease-in-out}.activity-indicator-circle-orbit-dot2{top:auto;bottom:0;-webkit-animation-delay:-1s;animation-delay:-1s}@-webkit-keyframes activity-indicator-circle-orbit-rotate{to{-webkit-transform:rotate(360deg)}}@keyframes activity-indicator-circle-orbit-rotate{to{transform:rotate(360deg);-webkit-transform:rotate(360deg)}}@-webkit-keyframes activity-indicator-circle-orbit-bounce{0%,to{-webkit-transform:scale(0)}50%{-webkit-transform:scale(1)}}@keyframes activity-indicator-circle-orbit-bounce{0%,to{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}\n")();
var CircleTrail_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => '.activity-indicator-circle-trail{width:2.5em;height:2.5em;position:relative}.activity-indicator-circle-trail .activity-indicator-child{width:100%;height:100%;position:absolute;left:0;top:0}.activity-indicator-circle-trail .activity-indicator-child:before{content:"";display:block;margin:0 auto;width:.4em;height:.4em;background-color:currentColor;border-radius:100%;-webkit-animation:activity-indicator-circle-trail 1.2s infinite ease-in-out both;animation:activity-indicator-circle-trail 1.2s infinite ease-in-out both}.activity-indicator-circle-trail .activity-indicator-circle-trail2{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.activity-indicator-circle-trail .activity-indicator-circle-trail3{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.activity-indicator-circle-trail .activity-indicator-circle-trail4{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.activity-indicator-circle-trail .activity-indicator-circle-trail5{-webkit-transform:rotate(120deg);transform:rotate(120deg)}.activity-indicator-circle-trail .activity-indicator-circle-trail6{-webkit-transform:rotate(150deg);transform:rotate(150deg)}.activity-indicator-circle-trail .activity-indicator-circle-trail7{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.activity-indicator-circle-trail .activity-indicator-circle-trail8{-webkit-transform:rotate(210deg);transform:rotate(210deg)}.activity-indicator-circle-trail .activity-indicator-circle-trail9{-webkit-transform:rotate(240deg);transform:rotate(240deg)}.activity-indicator-circle-trail .activity-indicator-circle-trail10{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.activity-indicator-circle-trail .activity-indicator-circle-trail11{-webkit-transform:rotate(300deg);transform:rotate(300deg)}.activity-indicator-circle-trail .activity-indicator-circle-trail12{-webkit-transform:rotate(330deg);transform:rotate(330deg)}.activity-indicator-circle-trail .activity-indicator-circle-trail2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.activity-indicator-circle-trail .activity-indicator-circle-trail3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.activity-indicator-circle-trail .activity-indicator-circle-trail4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.activity-indicator-circle-trail .activity-indicator-circle-trail5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.activity-indicator-circle-trail .activity-indicator-circle-trail6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.activity-indicator-circle-trail .activity-indicator-circle-trail7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.activity-indicator-circle-trail .activity-indicator-circle-trail8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.activity-indicator-circle-trail .activity-indicator-circle-trail9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.activity-indicator-circle-trail .activity-indicator-circle-trail10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.activity-indicator-circle-trail .activity-indicator-circle-trail11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.activity-indicator-circle-trail .activity-indicator-circle-trail12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes activity-indicator-circle-trail{0%,80%,to{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes activity-indicator-circle-trail{0%,80%,to{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}\n')();
var Dots_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".activity-indicator-dots{font-size:1em;position:relative}.activity-indicator-dots>div{width:1em;height:1em;background-color:currentColor;border-radius:100%;display:inline-block;-webkit-animation:activity-indicator-dots 1.4s infinite ease-in-out both;animation:activity-indicator-dots 1.4s infinite ease-in-out both}.activity-indicator-dots>div:not(:last-child){margin-right:.2em}.activity-indicator-dots .activity-indicator-dots-bounce1{-webkit-animation-delay:-.32s;animation-delay:-.32s}.activity-indicator-dots .activity-indicator-dots-bounce2{-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes activity-indicator-dots{0%,80%,to{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes activity-indicator-dots{0%,80%,to{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}\n")();
var DoublePulse_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".activity-indicator-double-pulse{width:2.5em;height:2.5em;position:relative}.activity-indicator-double-pulse-bounce1,.activity-indicator-double-pulse-bounce2{width:100%;height:100%;border-radius:50%;background-color:currentColor;opacity:.66;position:absolute;top:0;left:0;-webkit-animation:activity-indicator-double-pulse 2s infinite ease-in-out;animation:activity-indicator-double-pulse 2s infinite ease-in-out}.activity-indicator-double-pulse-bounce2{-webkit-animation-delay:-1s;animation-delay:-1s}@-webkit-keyframes activity-indicator-double-pulse{0%,to{-webkit-transform:scale(0)}50%{-webkit-transform:scale(1)}}@keyframes activity-indicator-double-pulse{0%,to{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}\n")();
var Facebook_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".activity-indicator-facebook{height:4em}.activity-indicator-facebook>div{background-color:#333;height:100%;width:6px;margin-right:2px;display:inline-block;-webkit-animation:activity-indicator-facebook 1.2s infinite ease-in-out;animation:activity-indicator-facebook 1.2s infinite ease-in-out}.activity-indicator-facebook .activity-indicator-facebook-rect2{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.activity-indicator-facebook .activity-indicator-facebook-rect3{-webkit-animation-delay:-1s;animation-delay:-1s}.activity-indicator-facebook .activity-indicator-facebook-rect4{-webkit-animation-delay:-.9s;animation-delay:-.9s}.activity-indicator-facebook .activity-indicator-facebook-rect5{-webkit-animation-delay:-.8s;animation-delay:-.8s}@-webkit-keyframes activity-indicator-facebook{0%,40%,to{-webkit-transform:scaleY(.4)}20%{-webkit-transform:scaleY(1)}}@keyframes activity-indicator-facebook{0%,40%,to{transform:scaleY(.4);-webkit-transform:scaleY(.4)}20%{transform:scaleY(1);-webkit-transform:scaleY(1)}}\n")();
var Grid_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".activity-indicator-grid{width:2.5em;height:2.5em}.activity-indicator-grid .activity-indicator-grid{width:33%;height:33%;background-color:currentColor;float:left;-webkit-animation:activity-indicator-grid 1.3s infinite ease-in-out;animation:activity-indicator-grid 1.3s infinite ease-in-out}.activity-indicator-grid .activity-indicator-grid1{-webkit-animation-delay:.2s;animation-delay:.2s}.activity-indicator-grid .activity-indicator-grid2{-webkit-animation-delay:.3s;animation-delay:.3s}.activity-indicator-grid .activity-indicator-grid3{-webkit-animation-delay:.4s;animation-delay:.4s}.activity-indicator-grid .activity-indicator-grid4{-webkit-animation-delay:.1s;animation-delay:.1s}.activity-indicator-grid .activity-indicator-grid5{-webkit-animation-delay:.2s;animation-delay:.2s}.activity-indicator-grid .activity-indicator-grid6{-webkit-animation-delay:.3s;animation-delay:.3s}.activity-indicator-grid .activity-indicator-grid7{-webkit-animation-delay:0s;animation-delay:0s}.activity-indicator-grid .activity-indicator-grid8{-webkit-animation-delay:.1s;animation-delay:.1s}.activity-indicator-grid .activity-indicator-grid9{-webkit-animation-delay:.2s;animation-delay:.2s}@-webkit-keyframes activity-indicator-grid{0%,70%,to{-webkit-transform:scale3D(1,1,1);transform:scaleZ(1)}35%{-webkit-transform:scale3D(0,0,1);transform:scale3D(0,0,1)}}@keyframes activity-indicator-grid{0%,70%,to{-webkit-transform:scale3D(1,1,1);transform:scaleZ(1)}35%{-webkit-transform:scale3D(0,0,1);transform:scale3D(0,0,1)}}\n")();
var Pulse_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".activity-indicator-pulse{width:2.5em;height:2.5em;background-color:currentColor;border-radius:100%;-webkit-animation:activity-indicator-pulse 1s infinite ease-in-out;animation:activity-indicator-pulse 1s infinite ease-in-out}@-webkit-keyframes activity-indicator-pulse{0%{-webkit-transform:scale(0)}to{-webkit-transform:scale(1);opacity:0}}@keyframes activity-indicator-pulse{0%{-webkit-transform:scale(0);transform:scale(0)}to{-webkit-transform:scale(1);transform:scale(1);opacity:0}}\n")();
var Spinner_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => '.activity-indicator-spinner{width:2.5em;height:2.5em;position:relative}.activity-indicator-spinner .activity-indicator-spinner{width:100%;height:100%;position:absolute;left:0;top:0}.activity-indicator-spinner .activity-indicator-spinner:before{content:"";display:block;margin:0 auto;width:10%;height:33.333%;background-color:currentColor;-webkit-animation:activity-indicator-spinner 1.2s infinite ease-in-out both;animation:activity-indicator-spinner 1.2s infinite ease-in-out both}.activity-indicator-spinner .activity-indicator-spinner2{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.activity-indicator-spinner .activity-indicator-spinner3{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.activity-indicator-spinner .activity-indicator-spinner4{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.activity-indicator-spinner .activity-indicator-spinner5{-webkit-transform:rotate(120deg);transform:rotate(120deg)}.activity-indicator-spinner .activity-indicator-spinner6{-webkit-transform:rotate(150deg);transform:rotate(150deg)}.activity-indicator-spinner .activity-indicator-spinner7{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.activity-indicator-spinner .activity-indicator-spinner8{-webkit-transform:rotate(210deg);transform:rotate(210deg)}.activity-indicator-spinner .activity-indicator-spinner9{-webkit-transform:rotate(240deg);transform:rotate(240deg)}.activity-indicator-spinner .activity-indicator-spinner10{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.activity-indicator-spinner .activity-indicator-spinner11{-webkit-transform:rotate(300deg);transform:rotate(300deg)}.activity-indicator-spinner .activity-indicator-spinner12{-webkit-transform:rotate(330deg);transform:rotate(330deg)}.activity-indicator-spinner .activity-indicator-spinner2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.activity-indicator-spinner .activity-indicator-spinner3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.activity-indicator-spinner .activity-indicator-spinner4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.activity-indicator-spinner .activity-indicator-spinner5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.activity-indicator-spinner .activity-indicator-spinner6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.activity-indicator-spinner .activity-indicator-spinner7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.activity-indicator-spinner .activity-indicator-spinner8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.activity-indicator-spinner .activity-indicator-spinner9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.activity-indicator-spinner .activity-indicator-spinner10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.activity-indicator-spinner .activity-indicator-spinner11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.activity-indicator-spinner .activity-indicator-spinner12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes activity-indicator-spinner{0%,39%,to{opacity:0}40%{opacity:1}}@keyframes activity-indicator-spinner{0%,39%,to{opacity:0}40%{opacity:1}}\n')();
var Spotify_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => '.activity-indicator-spotify{width:2em;height:2em;border-radius:50%;background:conic-gradient(white,black);position:relative;-webkit-animation:activity-indicator-spotify 1.4s linear infinite;animation:activity-indicator-spotify 1.4s linear infinite;-webkit-transform:translateZ(0);transform:translateZ(0)}.activity-indicator-spotify:after{background:white;width:75%;height:75%;border-radius:50%;content:"";margin:auto;position:absolute;top:0;left:0;bottom:0;right:0}@-webkit-keyframes activity-indicator-spotify{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes activity-indicator-spotify{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\n')();
var Square_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".activity-indicator-square{width:2.5em;height:2.5em;background-color:currentColor;-webkit-animation:activity-indicator-square 1.2s infinite ease-in-out;animation:activity-indicator-square 1.2s infinite ease-in-out}@-webkit-keyframes activity-indicator-square{0%{-webkit-transform:perspective(120px)}50%{-webkit-transform:perspective(120px) rotateY(180deg)}to{-webkit-transform:perspective(120px) rotateY(180deg) rotateX(180deg)}}@keyframes activity-indicator-square{0%{transform:perspective(120px) rotateX(0) rotateY(0);-webkit-transform:perspective(120px) rotateX(0deg) rotateY(0deg)}50%{transform:perspective(120px) rotateX(-180.1deg) rotateY(0);-webkit-transform:perspective(120px) rotateX(-180.1deg) rotateY(0deg)}to{transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg);-webkit-transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg)}}\n")();
var SquareFold_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => '.activity-indicator-square-fold{margin:1em;width:2.5em;height:2.5em;position:relative;-webkit-transform:rotateZ(45deg);transform:rotate(45deg)}.activity-indicator-square-fold .activity-indicator-square-fold-square{float:left;width:50%;height:50%;position:relative;-webkit-transform:scale(1.1);transform:scale(1.1)}.activity-indicator-square-fold .activity-indicator-square-fold-square:before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background-color:#333;-webkit-animation:activity-indicator-square-fold 2.4s infinite linear both;animation:activity-indicator-square-fold 2.4s infinite linear both;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}.activity-indicator-square-fold .activity-indicator-square-fold-square2{-webkit-transform:scale(1.1) rotateZ(90deg);transform:scale(1.1) rotate(90deg)}.activity-indicator-square-fold .activity-indicator-square-fold-square3{-webkit-transform:scale(1.1) rotateZ(180deg);transform:scale(1.1) rotate(180deg)}.activity-indicator-square-fold .activity-indicator-square-fold-square4{-webkit-transform:scale(1.1) rotateZ(270deg);transform:scale(1.1) rotate(270deg)}.activity-indicator-square-fold .activity-indicator-square-fold-square2:before{-webkit-animation-delay:.3s;animation-delay:.3s}.activity-indicator-square-fold .activity-indicator-square-fold-square3:before{-webkit-animation-delay:.6s;animation-delay:.6s}.activity-indicator-square-fold .activity-indicator-square-fold-square4:before{-webkit-animation-delay:.9s;animation-delay:.9s}@-webkit-keyframes activity-indicator-square-fold{0%,10%{-webkit-transform:perspective(140px) rotateX(-180deg);transform:perspective(140px) rotateX(-180deg);opacity:0}25%,75%{-webkit-transform:perspective(140px) rotateX(0deg);transform:perspective(140px) rotateX(0);opacity:1}90%,to{-webkit-transform:perspective(140px) rotateY(180deg);transform:perspective(140px) rotateY(180deg);opacity:0}}@keyframes activity-indicator-square-fold{0%,10%{-webkit-transform:perspective(140px) rotateX(-180deg);transform:perspective(140px) rotateX(-180deg);opacity:0}25%,75%{-webkit-transform:perspective(140px) rotateX(0deg);transform:perspective(140px) rotateX(0);opacity:1}90%,to{-webkit-transform:perspective(140px) rotateY(180deg);transform:perspective(140px) rotateY(180deg);opacity:0}}\n')();
var SquareOrbit_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".activity-indicator-square-orbit{margin:.5em;width:3em;height:3em;position:relative}.activity-indicator-square-orbit-cube1,.activity-indicator-square-orbit-cube2{background-color:#333;width:1em;height:1em;position:absolute;top:0;left:0;-webkit-animation:activity-indicator-square-orbit 1.8s infinite ease-in-out;animation:activity-indicator-square-orbit 1.8s infinite ease-in-out}.activity-indicator-square-orbit-cube2{-webkit-animation-delay:-.9s;animation-delay:-.9s}@-webkit-keyframes activity-indicator-square-orbit{25%{-webkit-transform:translateX(2em) rotate(-90deg) scale(.5)}50%{-webkit-transform:translateX(2em) translateY(2em) rotate(-180deg)}75%{-webkit-transform:translateX(0px) translateY(2em) rotate(-270deg) scale(.5)}to{-webkit-transform:rotate(-360deg)}}@keyframes activity-indicator-square-orbit{25%{transform:translate(2em) rotate(-90deg) scale(.5);-webkit-transform:translateX(2em) rotate(-90deg) scale(.5)}50%{transform:translate(2em) translateY(2em) rotate(-179deg);-webkit-transform:translateX(2em) translateY(2em) rotate(-179deg)}50.1%{transform:translate(2em) translateY(2em) rotate(-180deg);-webkit-transform:translateX(2em) translateY(2em) rotate(-180deg)}75%{transform:translate(0) translateY(2em) rotate(-270deg) scale(.5);-webkit-transform:translateX(0px) translateY(2em) rotate(-270deg) scale(.5)}to{transform:rotate(-360deg);-webkit-transform:rotate(-360deg)}}\n")();
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
var render$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(_vm.component, _vm._b({ tag: "component", class: _vm.classes, attrs: { "disabled": _vm.disabled, "role": "button" }, on: { "click": function($event) {
    !_vm.disabled && _vm.$emit("click", $event);
  } } }, "component", _vm.$attrs, false), [_vm._t("default", function() {
    return [_vm._v(_vm._s(_vm.label))];
  })], 2);
};
var staticRenderFns$7 = [];
const __vue2_script$8 = {
  name: "Btn",
  mixins: [
    Sizeable,
    Variant
  ],
  props: {
    active: Boolean,
    block: Boolean,
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
      if (this.tag) {
        return this.tag;
      }
      if (this.$attrs.to) {
        return "router-link";
      }
      if (this.$attrs.href) {
        return "a";
      }
      return "button";
    },
    variantClassPrefix() {
      return this.variantPrefix + (this.outline ? "-outline" : "");
    }
  }
};
const __cssModules$8 = {};
var __component__$8 = /* @__PURE__ */ normalizeComponent(__vue2_script$8, render$7, staticRenderFns$7, false, __vue2_injectStyles$8, null, null, null);
function __vue2_injectStyles$8(context) {
  for (let o in __cssModules$8) {
    this[o] = __cssModules$8[o];
  }
}
var Btn = /* @__PURE__ */ function() {
  return __component__$8.exports;
}();
var render$6 = function() {
  var this$1$1 = this;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("btn", { class: _vm.classes, attrs: { "active": _vm.active, "block": _vm.block, "disabled": _vm.disabled, "size": _vm.size, "tag": _vm.tag, "variant": _vm.variant }, on: { "click": function(e) {
    return !_vm.disabled && _vm.$emit("click", e, this$1$1);
  } } }, [_vm._t("default", function() {
    return [_vm._v(_vm._s(_vm.label))];
  }), _c("activity-indicator", _vm._b({}, "activity-indicator", _vm.indicatorProps, false))], 2);
};
var staticRenderFns$6 = [];
var BtnActivity_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => "@-webkit-keyframes btn-activity-in{0%,to{-webkit-transform:scale(1);transform:scale(1)}30%{-webkit-transform:scale(.98);transform:scale(.98)}}@keyframes btn-activity-in{0%,to{-webkit-transform:scale(1);transform:scale(1)}30%{-webkit-transform:scale(.98);transform:scale(.98)}}@-webkit-keyframes btn-activity-out{0%,to{-webkit-transform:scale(1);transform:scale(1)}70%{-webkit-transform:scale(.98);transform:scale(.98)}}@keyframes btn-activity-out{0%,to{-webkit-transform:scale(1);transform:scale(1)}70%{-webkit-transform:scale(.98);transform:scale(.98)}}.btn-activity-top,.btn.btn-activity-top,.btn-activity-bottom,.btn.btn-activity-bottom,.btn-activity-left,.btn.btn-activity-left,.btn-activity-right,.btn.btn-activity-right{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;position:relative;-webkit-transition:all 166.5ms ease-in;transition:all 166.5ms ease-in}.btn-activity-top .activity-indicator,.btn-activity-bottom .activity-indicator,.btn-activity-left .activity-indicator,.btn-activity-right .activity-indicator{opacity:0;position:absolute;visibility:hidden;-webkit-transition:opacity 333ms ease-in;transition:opacity 333ms ease-in}.btn-activity-top,.btn-activity-bottom{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.btn-activity-top .activity-indicator,.btn-activity-bottom .activity-indicator{margin-left:auto;margin-right:auto}.btn-activity-top{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.btn-activity-top .activity-indicator{padding-bottom:1em}.btn-activity-bottom .activity-indicator{padding-top:1em}.btn-activity-left,.btn-activity-right{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.btn-activity-left{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.btn-activity-left .activity-indicator{padding-right:1em}.btn-activity-right .activity-indicator{padding-left:1em}.btn-activity:not(.btn-link){-webkit-animation:btn-activity-in 333ms;animation:btn-activity-in 333ms}.btn-hide-activity:not(.btn-link){-webkit-animation:btn-activity-out 333ms;animation:btn-activity-out 333ms}.btn-activity.btn-hide-activity .activity-indicator{opacity:0}.btn-activity .activity-indicator{opacity:1;visibility:visible;position:relative;font-size:.55em}\n")();
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
const __vue2_script$7 = {
  name: "BtnActivity",
  components: {
    ActivityIndicator,
    Btn
  },
  props: {
    active: Boolean,
    activity: Boolean,
    block: Boolean,
    disabled: Boolean,
    indicator: {
      type: [Object, String],
      default: "spinner"
    },
    label: String,
    orientation: {
      type: String,
      default: "right"
    },
    size: {
      type: String,
      default: "md"
    },
    tag: String,
    variant: {
      type: String,
      default: "primary"
    }
  },
  data() {
    return {
      currentActivity: this.activity
    };
  },
  computed: {
    classes() {
      const classes = {
        "disabled": this.disabled,
        "active": this.active,
        "btn-activity": this.activity
      };
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
  mounted() {
    if (this.activity) {
      this.showActivity();
    }
  },
  methods: {
    disable() {
      this.$el.disabled = true;
      this.$el.classList.add("disabled");
    },
    enable() {
      this.$el.disabled = false;
      this.$el.classList.remove("disabled");
    },
    hideActivity() {
      this.$el.classList.add("btn-hide-activity");
      animated(this.$el, () => {
        this.enable();
        this.currentActivity = false;
        this.$el.classList.remove("btn-activity", "btn-hide-activity");
        this.$emit("hide-activity");
      });
    },
    showActivity() {
      this.currentActivity = true;
      this.disable();
      animated(this.$el, () => {
        this.$el.classList.add("btn-activity");
        this.$emit("show-activity");
      });
    },
    toggle() {
      if (!this.currentActivity) {
        this.showActivity();
      } else {
        this.hideActivity();
      }
    }
  }
};
const __cssModules$7 = {};
var __component__$7 = /* @__PURE__ */ normalizeComponent(__vue2_script$7, render$6, staticRenderFns$6, false, __vue2_injectStyles$7, null, null, null);
function __vue2_injectStyles$7(context) {
  for (let o in __cssModules$7) {
    this[o] = __cssModules$7[o];
  }
}
var BtnActivity = /* @__PURE__ */ function() {
  return __component__$7.exports;
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
var render$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard-controls", class: _vm.classes }, [_vm._t("default", function() {
    return [_c("div", { staticClass: "wizard-controls-left wizard-controls-section" }, [_vm._t("back", function() {
      return _vm._l(Object.entries(_vm.buttons).filter(function(ref) {
        ref[0];
        var button = ref[1];
        return button.align && button.align === "left";
      }), function(ref) {
        var key = ref[0];
        var button = ref[1];
        return _c("btn-activity", { key: "button-" + key, ref: key, refInFor: true, attrs: { "type": "button", "activity": !!button.activity, "disabled": !!button.disabled, "indicator": _vm.indicator, "size": _vm.size, "variant": _vm.value(button.variant) }, on: { "click": function(e) {
          return _vm.$emit(key, e);
        } } }, [_vm._v(" " + _vm._s(_vm.value(button.label)) + " ")]);
      });
    }, null, _vm.context)], 2), _c("div", { staticClass: "wizard-controls-right wizard-controls-section" }, [_vm._t("submit", function() {
      return _vm._l(Object.entries(_vm.buttons).filter(function(ref) {
        ref[0];
        var button = ref[1];
        return !button.align || button.align === "right";
      }), function(ref) {
        var key = ref[0];
        var button = ref[1];
        return _c("btn-activity", { key: "button-" + key, ref: key, refInFor: true, attrs: { "type": "button", "activity": !!button.activity, "disabled": !!button.disabled, "indicator": _vm.indicator, "size": _vm.size, "variant": _vm.value(button.variant) }, on: { "click": function(e) {
          return _vm.$emit(key, e);
        } } }, [_vm._v(" " + _vm._s(_vm.value(button.label)) + " ")]);
      });
    }, null, _vm.context)], 2)];
  }, null, _vm.context)], 2);
};
var staticRenderFns$5 = [];
var WizardControls_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".wizard-controls{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.wizard-controls-section{display:grid;gap:.5rem;grid-auto-flow:column}\n")();
const __vue2_script$6 = {
  name: "WizardControls",
  components: {
    BtnActivity
  },
  mixins: [
    Context,
    Sizeable
  ],
  props: {
    buttons: {
      type: Object,
      required: true
    },
    indicator: String,
    slots: {
      type: Array,
      required: true
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
const __cssModules$6 = {};
var __component__$6 = /* @__PURE__ */ normalizeComponent(__vue2_script$6, render$5, staticRenderFns$5, false, __vue2_injectStyles$6, null, null, null);
function __vue2_injectStyles$6(context) {
  for (let o in __cssModules$6) {
    this[o] = __cssModules$6[o];
  }
}
var WizardControls = /* @__PURE__ */ function() {
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
var WizardError_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".wizard-error{text-align:center;font-size:1.25rem}.wizard-error-title{font-size:2.5rem;color:#b10805;margin-bottom:.25rem}.wizard-error-body{margin-bottom:1rem}.wizard-error-list{margin:0 auto;list-style:disc;text-align:left;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.wizard-error-icon{color:#b10805;font-size:1.25rem;border:5px solid #b10805;border-radius:100%;text-align:center;width:7rem;height:7rem;margin:1rem auto;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.wizard-error-icon svg{width:100%;line-height:0}\n")();
const __vue2_script$5 = {
  name: "WizardError",
  components: {
    Btn
  },
  mixins: [
    Sizeable
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
var __component__$5 = /* @__PURE__ */ normalizeComponent(__vue2_script$5, render$4, staticRenderFns$4, false, __vue2_injectStyles$5, null, null, null);
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
var WizardProgress_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => '.wizard-progress{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;counter-reset:step;margin-bottom:2rem}.wizard-progress-step{-webkit-box-flex:1;-ms-flex:1;flex:1;cursor:default;font-size:1rem;position:relative;text-align:center;text-transform:uppercase}.wizard-progress-step:before{width:40px;height:40px;content:counter(step);counter-increment:step;line-height:36px;font-size:15px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin:0 auto 10px;border-radius:50%;background-color:#fff;position:relative;z-index:1;border:2px solid #008cc0;color:#008cc0}.wizard-progress-step:after{width:100%;height:2px;content:"";position:absolute;background-color:#7d7d7d;top:20px;right:0}.wizard-progress-step:first-child:after,.wizard-progress-step:last-child:after{width:50%}.wizard-progress-step:last-child:after{left:0}.wizard-progress-step.disabled{cursor:default}.wizard-progress-step.disabled:before{color:#7d7d7d;border-color:#7d7d7d}.wizard-progress-step.disabled .wizard-progress-step-label{color:#7d7d7d}.wizard-progress-step.complete:before{border-color:#55b776;color:#55b776}.wizard-progress-step.complete:after,.wizard-progress-step.complete+.wizard-progress-step:last-child:after{background:#55b776}.wizard-progress-step.complete+.wizard-progress-step:not(.complete):not(:last-child):after{background:-webkit-gradient(linear,left top,right top,color-stop(50%,#55b776),color-stop(50%,#7d7d7d));background:linear-gradient(to right,#55b776 50%,#7d7d7d 50%)}.wizard-progress-step.active:before{border-color:#b10805;color:#b10805}.wizard-progress-step.complete:before{content:"\\2713";line-height:40px;font-size:1em;font-weight:700}\n')();
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
var __component__$4 = /* @__PURE__ */ normalizeComponent(__vue2_script$4, render$3, staticRenderFns$3, false, __vue2_injectStyles$4, null, null, null);
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
var WizardSuccess_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".wizard-success{text-align:center;font-size:1.25rem}.wizard-success-title{font-size:2.5rem;color:#55b776}.wizard-success-icon{color:#55b776;font-size:3.75rem;border:5px solid #55b776;border-radius:100%;text-align:center;width:7rem;height:7rem;margin:1.25rem auto;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.wizard-success-icon svg{width:100%;line-height:0}\n")();
const __vue2_script$3 = {
  name: "WizardSuccess",
  mixins: [
    Sizeable
  ],
  props: {
    title: {
      type: String,
      default: "Success!"
    }
  }
};
const __cssModules$3 = {};
var __component__$3 = /* @__PURE__ */ normalizeComponent(__vue2_script$3, render$2, staticRenderFns$2, false, __vue2_injectStyles$3, null, null, null);
function __vue2_injectStyles$3(context) {
  for (let o in __cssModules$3) {
    this[o] = __cssModules$3[o];
  }
}
var WizardSuccess = /* @__PURE__ */ function() {
  return __component__$3.exports;
}();
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard", class: _vm.classes }, [!_vm.finished ? [_vm._t("progress", function() {
    return [_vm.mounted && _vm.slots.length > 1 ? _c("wizard-progress", { attrs: { "active": _vm.currentActive, "highest-step": _vm.highestStep, "slots": _vm.slots }, on: { "click": _vm.onClickProgress } }) : _vm._e()];
  }, null, _vm.context), _vm._t("header", null, null, _vm.context), _c("div", { staticClass: "wizard-content" }, [_c("slide-deck", { ref: "slideDeck", attrs: { "active": _vm.currentActive, "props": {
    active: _vm.currentActive,
    buttons: _vm.currentButtons
  } }, on: { "enter": _vm.onEnter, "leave": _vm.onLeave } }, [_vm._t("default")], 2)], 1), _vm._t("controls", function() {
    return [_vm.mounted && _vm.controls ? _c("wizard-controls", { ref: "controls", attrs: { "active": _vm.currentActive, "buttons": _vm.currentButtons, "size": _vm.size, "slots": _vm.slots }, on: { "back": _vm.onClickBack, "submit": _vm.onClickSubmit }, scopedSlots: _vm._u([{ key: "back", fn: function(context) {
      return [_vm._t("back", null, null, context)];
    } }, { key: "submit", fn: function(context) {
      return [_vm._t("submit", null, null, context)];
    } }], null, true) }) : _vm._e()];
  }, null, this)] : _vm.error ? [_vm._t("error", function() {
    return [_c("wizard-error", { attrs: { "error": _vm.error, "extract": _vm.errors, "size": _vm.size }, on: { "fix": _vm.onFix }, scopedSlots: _vm._u([{ key: "default", fn: function() {
      return [_vm._t("error-content")];
    }, proxy: true }], null, true) })];
  })] : [_vm._t("success", function() {
    return [_c("wizard-success", { attrs: { "size": _vm.size }, scopedSlots: _vm._u([{ key: "default", fn: function() {
      return [_vm._t("success-content")];
    }, proxy: true }], null, true) })];
  })]], 2);
};
var staticRenderFns$1 = [];
var Wizard_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".wizard .wizard-content{margin-bottom:1rem}\n")();
const defaultButton = {
  activity: false,
  align: "right",
  disabled: false,
  label: void 0,
  ref: void 0,
  variant: "secondary"
};
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
    Context,
    Sizeable
  ],
  props: {
    buttons: {
      type: Object,
      default() {
        return {
          back: {
            activity: false,
            align: "left",
            disabled: false,
            label: "Back",
            ref: "back",
            variant: "secondary"
          },
          submit: {
            activity: false,
            align: "right",
            disabled: false,
            label: () => !this.isLastSlot ? "Next" : "Submit",
            ref: "submit",
            variant: "primary"
          }
        };
      }
    },
    controls: {
      type: Boolean,
      default: true
    },
    errors: Function,
    failed: {
      type: Function,
      default: function(e) {
        this.response = null;
        this.error = e;
        this.finished = true;
      }
    },
    header: String,
    indicator: String,
    submit: Function,
    success: {
      type: Function,
      default: function(response) {
        this.response = response;
        this.error = null;
        this.finished = true;
      }
    }
  },
  data() {
    return {
      currentButtons: null,
      error: null,
      finished: false,
      highestStep: 0,
      mounted: false,
      response: null,
      slots: []
    };
  },
  computed: {
    classes() {
      return {
        [this.sizeableClass]: !!this.size
      };
    }
  },
  beforeMount() {
    this.resetButtons();
  },
  mounted() {
    this.$nextTick(() => {
      this.mounted = true;
      this.slots = this.$refs.slideDeck.slots();
    });
  },
  methods: {
    activate(key) {
      this.$set(this.currentButtons[key], "activity", true);
    },
    checkValidity(prop, ...args) {
      return !!this.value(this[prop], ...args);
    },
    deactivate(key) {
      this.$set(this.currentButtons[key], "activity", false);
    },
    disableButtons() {
      Object.keys(this.currentButtons).forEach((key) => {
        this.disable(key);
      });
    },
    disable(key) {
      this.$set(this.currentButtons[key], "disabled", true);
    },
    emitBubbleEvent(key, ...args) {
      args = [key].concat(args);
      const instance = this.$refs.slideDeck.slot().componentInstance;
      instance.$emit.apply(instance, args);
      this.$emit.apply(this, args);
    },
    enableButtons() {
      Object.keys(this.currentButtons).forEach((key) => {
        this.enable(key);
      });
    },
    enable(key) {
      this.$set(this.currentButtons[key], "disabled", false);
    },
    handleButtonCallback(key, method) {
      if (!this.slot().hasCallback(key)) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        this.activate(key);
        this.slot().callback(key).then((value) => {
          if (this.isValid(value)) {
            resolve();
          } else {
            reject(null);
          }
        }, reject);
      });
    },
    goto(index) {
      this.$refs.slideDeck.goto(index);
    },
    isValid(value) {
      return value === true || typeof value === "undefined";
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
    resetButtons() {
      return this.currentButtons = Object.fromEntries(Object.entries(this.buttons).map(([key, button]) => [
        key,
        Object.assign({}, defaultButton, button)
      ]));
    },
    onClickBack(event) {
      this.emitBubbleEvent("back", event, this);
      if (event.defaultPrevented) {
        return;
      }
      this.handleButtonCallback("back", "click").then(this.prev).finally(() => {
        this.deactivate("back");
      });
    },
    onClickProgress(event, slide) {
    },
    onClickSubmit(event) {
      this.emitBubbleEvent(!this.isLastSlot ? "next" : "submit", event, this);
      if (event.defaultPrevented) {
        return;
      }
      if (!this.isLastSlot) {
        this.handleButtonCallback("submit", "click").then(this.next).finally(() => {
          this.deactivate("submit");
        });
      } else {
        this.handleButtonCallback("submit", "click").then((response) => {
          if (this.submit) {
            Promise.resolve(this.submit(this)).finally(() => {
              this.deactivate("submit");
            });
          } else if (response instanceof Error) {
            this.failed(response);
          } else {
            this.success(response);
          }
        });
      }
    },
    onEnter(slide, prevSlide) {
      this.currentActive = this.$refs.slideDeck.currentActive;
      this.highestStep = Math.max(this.highestStep, this.currentActive);
      slide.componentInstance.onEnter(slide, prevSlide);
      this.$nextTick(() => {
        this.currentButtons = slide.componentInstance.runOverrides(this.resetButtons());
      });
    },
    onFix(event, error2) {
      this.$emit("fix", event, error2, this);
      if (!event.defaultPrevented) {
        this.finished = false;
      }
    },
    onLeave(slide, prevSlide) {
      this.$nextTick(() => {
        slide.componentInstance.onLeave(slide, prevSlide);
      });
    }
  }
};
const __cssModules$2 = {};
var __component__$2 = /* @__PURE__ */ normalizeComponent(__vue2_script$2, render$1, staticRenderFns$1, false, __vue2_injectStyles$2, null, null, null);
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
var WizardHeader_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".card>.wizard .wizard-header{margin-top:1rem}\n")();
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
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, render, staticRenderFns, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var WizardHeader = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var Overrides = {
  props: {
    buttons: {
      type: Object,
      required: true
    }
  },
  beforeCreate() {
    this.$vnode.componentOptions.overrides = Object.entries(this.$vnode.data.attrs || {}).reduce((carry, [key, value]) => {
      return Object.assign(carry, {
        [key]: value
      });
    }, {});
  },
  created() {
    this.overrides = this.$vnode.componentOptions.overrides || {};
  },
  data() {
    return {
      overrides: null
    };
  },
  methods: {
    hasCallback(key) {
      return typeof this.overrides[key] !== "undefined";
    },
    callback(key) {
      if (typeof this.overrides[key] === "undefined") {
        return Promise.resolve(true);
      }
      return this.promise(this.value(this.overrides[key], this));
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
    runOverrides(buttons) {
      for (let [key, button] of Object.entries(buttons || this.buttons)) {
        for (let [prop, value] of Object.entries(button)) {
          this.buttons[key][prop] = this.value(this.overrides[`${key}-${prop}`] || value);
        }
      }
      return this.buttons;
    }
  }
};
const __vue2_script = {
  name: "WizardStep",
  mixins: [
    Context,
    Overrides
  ],
  props: {
    label: String
  },
  updated() {
    this.$nextTick(this.performValidityChecks);
  },
  methods: {
    performValidityChecks() {
      this.$emit("validate", this.runOverrides());
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
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, __vue2_render, __vue2_staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var WizardStep = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { Wizard, WizardControls, WizardError, WizardHeader, WizardProgress, WizardStep, WizardSuccess };
