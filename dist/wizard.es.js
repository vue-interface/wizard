function normalizeComponent$2(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
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
const __vue2_script$f = {
  name: "Slide",
  props: {
    node: {
      type: Object
    }
  },
  render(h) {
    return this.node;
  }
};
let __vue2_render$1, __vue2_staticRenderFns$1;
const __cssModules$f = {};
var __component__$f = /* @__PURE__ */ normalizeComponent$2(__vue2_script$f, __vue2_render$1, __vue2_staticRenderFns$1, false, __vue2_injectStyles$f, null, null, null);
function __vue2_injectStyles$f(context) {
  for (let o in __cssModules$f) {
    this[o] = __cssModules$f[o];
  }
}
var Slide = /* @__PURE__ */ function() {
  return __component__$f.exports;
}();
function isObject$1(subject) {
  return !!subject && subject.constructor === Object;
}
function first$1(array) {
  return array && array.length ? array[0] : void 0;
}
function isArray$1(value) {
  return Array.isArray(value);
}
function matches$1(properties) {
  return (subject) => {
    for (const i in properties) {
      if (isObject$1(properties[i])) {
        return subject[i] ? matches$1(properties[i])(subject[i]) : false;
      } else if (!subject || subject[i] !== properties[i]) {
        return false;
      }
    }
    return true;
  };
}
function isNull$1(value) {
  return value === null;
}
function isString$2(value) {
  return typeof value === "string";
}
function isUndefined$1(value) {
  return typeof value === "undefined";
}
function get$1(object, path, defaultValue) {
  const value = (isString$2(path) ? path.split(".") : !isArray$1(path) ? [path] : path).reduce((a, b) => a[b], object);
  return !isUndefined$1(value) && !isNull$1(value) ? value : !isUndefined$1(defaultValue) ? defaultValue : value;
}
function property$1(path) {
  return (object) => {
    return get$1(object, path);
  };
}
function isFunction$1(value) {
  return value instanceof Function;
}
function matchesProperty$1(path, value) {
  return (subject) => {
    return get$1(subject, path) === value;
  };
}
function predicate$1(value) {
  if (isObject$1(value)) {
    value = matches$1(value);
  } else if (isArray$1(value)) {
    value = matchesProperty$1(value[0], value[1]);
  } else if (!isFunction$1(value)) {
    value = property$1(value);
  }
  return value;
}
function isNumber(value) {
  return typeof value === "number" || (value ? value.toString() === "[object Number]" : false);
}
function isNumeric(value) {
  return isNumber(value) || !!value && !isArray$1(value) && !!value.toString().match(/^-?[\d.,]+$/);
}
function key(value) {
  return isNumeric(value) ? parseFloat(value) : value;
}
function findIndex(subject, value) {
  for (const i in subject) {
    if (predicate$1(value)(subject[i])) {
      return key(i);
    }
  }
  return -1;
}
function transitionDuration(el, defaultValue = "0s") {
  let duration = getComputedStyle(el).transitionDuration || getComputedStyle(el).animationDuration;
  const numeric = parseFloat(duration, 10) || 0;
  const unit2 = duration.match(/m?s/);
  switch (unit2 && unit2[0]) {
    case "s":
      return numeric * 1e3;
    default:
      return numeric;
  }
}
function transition(el, defaultValue) {
  if (!el) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    const delay = transitionDuration(el, defaultValue);
    setTimeout(() => resolve(delay), delay);
  });
}
var render$d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("keep-alive", [_c("slide", { key: _vm.currentSlide, attrs: { "node": _vm.slide(_vm.currentSlide) } })], 1);
};
var staticRenderFns$d = [];
const __vue2_script$e = {
  name: "Slides",
  components: {
    Slide
  },
  props: {
    active: {
      type: [String, Number],
      default: 0
    },
    nodes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentSlide: this.active,
      lastSlide: null
    };
  },
  watch: {
    active(value, oldValue) {
      this.lastSlide = oldValue;
      this.currentSlide = value;
    },
    currentSlide(value, oldValue) {
      this.$vnodes[oldValue] = this.$vnode.elm;
    },
    nodes(value, oldValue) {
      Object.entries(this.$vnodes).forEach(([key2, elm]) => {
        const slide = this.slide(key2);
        if (slide) {
          slide.elm = elm;
        }
      });
    }
  },
  created() {
    this.$vnodes = {};
  },
  methods: {
    slides() {
      return this.nodes.filter((vnode, i) => {
        return !!vnode.tag;
      }).map((vnode, i) => {
        if (!vnode.key || !vnode.data && !vnode.data.key) {
          vnode.data = Object.assign({}, vnode.data, {
            key: vnode.key = i
          });
        }
        return vnode;
      });
    },
    slide(index) {
      return this.findSlideByKey(index) || this.findSlideByIndex(index) || this.findSlideByIndex(0);
    },
    findSlideByQuerySelector(selector) {
      return first$1(this.findSlidesByQuerySelector(selector));
    },
    findSlidesByQuerySelector(selector) {
      return this.slides().filter((vnode) => {
        if (vnode.elm) {
          return !!vnode.elm.querySelector(selector);
        }
      });
    },
    findSlideByKey(key2) {
      return first$1(this.slides().filter((vnode) => {
        if (vnode.key === key2) {
          return vnode;
        } else if (vnode.data && vnode.data.key === key2) {
          return vnode;
        }
        return null;
      }));
    },
    findSlideByIndex(index) {
      return this.slides()[index] || null;
    },
    getSlideIndex(slide) {
      let key2 = slide;
      if (slide && !isUndefined$1(slide.data)) {
        key2 = slide.data.key;
      } else if (slide && slide.key) {
        key2 = slide.key;
      }
      return findIndex(this.slides(), (vnode, i) => {
        if (slide === vnode) {
          return true;
        } else if (vnode.data && vnode.data.key === key2) {
          return true;
        } else if (vnode.key && vnode.key === key2) {
          return true;
        } else if (i === slide) {
          return true;
        }
        return false;
      });
    }
  }
};
const __cssModules$e = {};
var __component__$e = /* @__PURE__ */ normalizeComponent$2(__vue2_script$e, render$d, staticRenderFns$d, false, __vue2_injectStyles$e, null, null, null);
function __vue2_injectStyles$e(context) {
  for (let o in __cssModules$e) {
    this[o] = __cssModules$e[o];
  }
}
var Slides = /* @__PURE__ */ function() {
  return __component__$e.exports;
}();
var render$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "slide-deck-controls" }, _vm._l(_vm.slides, function(slide, i) {
    return _c("a", { key: i, staticClass: "slide-deck-control-icon", class: { "is-active": (slide.data ? slide.data.key : slide.key) === _vm.active }, attrs: { "href": "#" }, on: { "click": function($event) {
      $event.preventDefault();
      return _vm.onClick($event, slide);
    } } }, [_vm._t("default", function() {
      return [_vm._v("\u2022")];
    })], 2);
  }), 0);
};
var staticRenderFns$c = [];
var SlideDeckControls_vue_vue_type_style_index_0_lang = "";
const __vue2_script$d = {
  name: "SlideDeckControls",
  props: {
    active: {
      type: [String, Number],
      default: 0
    },
    slides: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClick(event, slide) {
      this.$emit("click", event, slide);
    }
  }
};
const __cssModules$d = {};
var __component__$d = /* @__PURE__ */ normalizeComponent$2(__vue2_script$d, render$c, staticRenderFns$c, false, __vue2_injectStyles$d, null, null, null);
function __vue2_injectStyles$d(context) {
  for (let o in __cssModules$d) {
    this[o] = __cssModules$d[o];
  }
}
var SlideDeckControls = /* @__PURE__ */ function() {
  return __component__$d.exports;
}();
var render$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "slide-deck", class: { "slide-deck-flex": _vm.center, "is-sliding": _vm.isSliding } }, [_vm._t("top"), _c("div", { ref: "content", staticClass: "slide-deck-content", style: _vm.styles() }, [_c("transition", { attrs: { "name": "slide-" + _vm.direction }, on: { "after-enter": _vm.onSlideAfterEnter, "before-enter": _vm.onSlideBeforeEnter, "enter": _vm.onSlideEnter, "after-leave": _vm.onSlideAfterLeave, "before-leave": _vm.onSlideBeforeLeave, "leave": _vm.onSlideLeave } }, [_c("slides", { ref: "slides", attrs: { "active": _vm.currentSlide, "nodes": _vm.$slots.default } })], 1)], 1), _vm._t("middle"), _vm._t("controls", function() {
    return [_vm.controls && _vm.mounted ? _c("slide-deck-controls", { ref: "controls", attrs: { "slides": _vm.slides(), "active": _vm.currentSlide }, on: { "click": _vm.onClickControl } }) : _vm._e()];
  }, { "slides": _vm.slides(), "active": _vm.currentSlide }), _vm._t("bottom")], 2);
};
var staticRenderFns$b = [];
var SlideDeck_vue_vue_type_style_index_0_lang = "";
const __vue2_script$c = {
  name: "SlideDeck",
  components: {
    Slides,
    SlideDeckControls
  },
  props: {
    active: {
      type: [String, Number],
      default: 0
    },
    center: {
      type: Boolean,
      default: true
    },
    controls: Boolean,
    flex: {
      type: Boolean,
      default: true
    },
    overflow: {
      type: [Object, String, Element, Boolean],
      default: true
    },
    resizeMode: {
      type: [Function, Boolean, String],
      default: "auto",
      validate(value) {
        return ["auto", "initial", "inherit"].indexOf(value) !== 1;
      }
    }
  },
  data() {
    return {
      height: null,
      width: null,
      mounted: false,
      lastSlide: null,
      isSliding: false,
      currentSlide: this.active,
      direction: "forward"
    };
  },
  computed: {
    overflowElement() {
      if (this.overflow === true) {
        return this.$el;
      } else if (this.overflow instanceof Element) {
        return this.overflow;
      } else if (this.overflow && this.overflow.elm) {
        return this.overflow.elm;
      } else if (this.overflow) {
        return document.querySelector(this.overflow);
      }
      return null;
    }
  },
  watch: {
    active(value, oldValue) {
      this.lastSlide = oldValue;
      this.currentSlide = value;
    },
    isSliding(value) {
      if (this.overflowElement) {
        this.overflowElement.style.overflow = value ? "hidden" : "inherit";
      }
    },
    currentSlide(value, oldValue) {
      this.direction = this.$refs.slides.getSlideIndex(oldValue) > this.$refs.slides.getSlideIndex(value) ? "backward" : "forward";
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mounted = true;
    });
  },
  methods: {
    test(...args) {
      console.log(...args);
    },
    resize(el) {
      if (isFunction$1(this.resizeMode)) {
        this.resizeMode(el || this.$el);
      } else {
        const style = getComputedStyle(el);
        if (!el.style.width) {
          el.width = el.style.width = `calc(${style.width} + ${style.marginLeft} + ${style.marginRight})`;
        }
        if (!el.style.height) {
          el.height = el.style.height = `calc(${style.height} + ${style.marginTop} + ${style.marginBottom})`;
        }
      }
    },
    styles() {
      return {
        width: this.width,
        height: this.height
      };
    },
    slides() {
      return this.$refs.slides ? this.$refs.slides.slides() : [];
    },
    slide(index) {
      return this.$refs.slides ? this.$refs.slides.slide(index || this.active) : null;
    },
    onClickControl(event, vnode) {
      this.currentSlide = vnode.data ? vnode.data.key : vnode.key;
    },
    onSlideAfterEnter(el) {
      if (el.width) {
        el.width = el.style.width = null;
      }
      if (el.height) {
        el.height = el.style.height = null;
      }
      this.width = null;
      this.height = null;
      if (this.$refs.slides) {
        this.$emit("after-enter", this.$refs.slides.slide(this.currentSlide), this.$refs.slides.slide(this.lastSlide));
      }
    },
    onSlideBeforeEnter(el) {
      this.isSliding = true;
      if (this.$refs.slides) {
        this.$emit("before-enter", this.$refs.slides.slide(this.currentSlide), this.$refs.slides.slide(this.lastSlide));
      }
    },
    onSlideEnter(el, done) {
      this.resize(el);
      this.width = el.style.width;
      this.height = el.style.height;
      transition(el).then((delay) => {
        this.isSliding = false;
        this.$nextTick(done);
      });
      if (this.$refs.slides) {
        this.$emit("enter", this.$refs.slides.slide(this.currentSlide), this.$refs.slides.slide(this.lastSlide));
      }
    },
    onSlideAfterLeave(el) {
      if (el.width) {
        el.width = el.style.width = null;
      }
      if (el.height) {
        el.height = el.style.height = null;
      }
      this.$nextTick(() => {
        if (this.$refs.slides) {
          this.$emit("after-leave", this.$refs.slides.slide(this.lastSlide), this.$refs.slides.slide(this.currentSlide));
        }
      });
    },
    onSlideBeforeLeave(el) {
      this.resize(el);
      if (this.$refs.slides) {
        this.$emit("before-leave", this.$refs.slides.slide(this.lastSlide), this.$refs.slides.slide(this.currentSlide));
      }
    },
    onSlideLeave(el, done) {
      transition(el).then((delay) => {
        this.$nextTick(done);
      });
      if (this.$refs.slides) {
        this.$emit("leave", this.$refs.slides.slide(this.lastSlide), this.$refs.slides.slide(this.currentSlide));
      }
    }
  }
};
const __cssModules$c = {};
var __component__$c = /* @__PURE__ */ normalizeComponent$2(__vue2_script$c, render$b, staticRenderFns$b, false, __vue2_injectStyles$c, null, null, null);
function __vue2_injectStyles$c(context) {
  for (let o in __cssModules$c) {
    this[o] = __cssModules$c[o];
  }
}
var SlideDeck = /* @__PURE__ */ function() {
  return __component__$c.exports;
}();
function isObject(subject) {
  return !!subject && subject.constructor === Object;
}
function first(array) {
  return array && array.length ? array[0] : void 0;
}
function isArray(value) {
  return Array.isArray(value);
}
function matches(properties) {
  return (subject) => {
    for (const i in properties) {
      if (isObject(properties[i])) {
        return subject[i] ? matches(properties[i])(subject[i]) : false;
      } else if (!subject || subject[i] !== properties[i]) {
        return false;
      }
    }
    return true;
  };
}
function isNull(value) {
  return value === null;
}
function isString$1(value) {
  return typeof value === "string";
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function get(object, path, defaultValue) {
  const value = (isString$1(path) ? path.split(".") : !isArray(path) ? [path] : path).reduce((a, b) => a[b], object);
  return !isUndefined(value) && !isNull(value) ? value : !isUndefined(defaultValue) ? defaultValue : value;
}
function property(path) {
  return (object) => {
    return get(object, path);
  };
}
function isFunction(value) {
  return value instanceof Function;
}
function matchesProperty(path, value) {
  return (subject) => {
    return get(subject, path) === value;
  };
}
function predicate(value) {
  if (isObject(value)) {
    value = matches(value);
  } else if (isArray(value)) {
    value = matchesProperty(value[0], value[1]);
  } else if (!isFunction(value)) {
    value = property(value);
  }
  return value;
}
function find(subject, value) {
  return first(subject.filter((object) => predicate(value)(object)));
}
var Sizeable$2 = {
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
var render$a = function() {
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
var staticRenderFns$a = [];
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
const __vue2_script$b = {
  name: "Btn",
  mixins: [Sizeable$2, Variant],
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
const __cssModules$b = {};
var __component__$b = /* @__PURE__ */ normalizeComponent$1(__vue2_script$b, render$a, staticRenderFns$a, false, __vue2_injectStyles$b, null, null, null);
function __vue2_injectStyles$b(context) {
  for (let o in __cssModules$b) {
    this[o] = __cssModules$b[o];
  }
}
var Btn = /* @__PURE__ */ function() {
  return __component__$b.exports;
}();
var Sizeable$1 = {
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
var render$2$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    class: _vm.classes,
    attrs: {
      "data-toggle": _vm.toggle ? "buttons" : false,
      "role": "group"
    }
  }, [_vm._t("default")], 2);
};
var staticRenderFns$2$1 = [];
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
const __vue2_script$2$1 = {
  name: "BtnGroup",
  mixins: [Sizeable$1],
  props: {
    sizePrefix: {
      type: String,
      default() {
        return "btn-group";
      }
    },
    toggle: Boolean,
    vertical: Boolean
  },
  computed: {
    classes() {
      return {
        "btn-group": !this.vertical,
        "btn-group-toggle": this.toggle,
        "btn-group-vertical": this.vertical,
        [this.sizeableClass]: !!this.size
      };
    }
  }
};
const __cssModules$2$1 = {};
var __component__$2$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$2$1, render$2$1, staticRenderFns$2$1, false, __vue2_injectStyles$2$1, null, null, null);
function __vue2_injectStyles$2$1(context) {
  for (let o in __cssModules$2$1) {
    this[o] = __cssModules$2$1[o];
  }
}
var BtnGroup = /* @__PURE__ */ function() {
  return __component__$2$1.exports;
}();
function isString(value) {
  return typeof value === "string";
}
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
  _assign = Object.assign || function __assign2(t) {
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
      var _ref2 = _slicedToArray(_ref, 2), key2 = _ref2[0], value = _ref2[1];
      _this.register(key2, value);
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
    value: function get2(name) {
      var match = this.components[name = paramCase(name)];
      if (match) {
        return match;
      }
      throw new Error('"'.concat(name, '" has not been registered yet!'));
    }
  }, {
    key: "register",
    value: function register2(name, value) {
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
function register() {
  return registry.register.apply(registry, arguments);
}
var render$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "activity-indicator", class: _vm.classes, style: _vm.style }, [_c("div", { staticClass: "activity-indicator-content" }, [_c(_vm.component, { tag: "component", staticClass: "mx-auto" }), _vm.label ? _c("div", { staticClass: "activity-indicator-label" }, [_vm._v(" " + _vm._s(_vm.label) + " ")]) : _vm._e()], 1)]);
};
var staticRenderFns$9 = [];
var ActivityIndicator_vue_vue_type_style_index_0_lang = "";
function unit(value, uom = "px") {
  return value !== null && value !== void 0 && value !== false && isFinite(value) ? `${value}${uom}` : value;
}
const __vue2_script$a = {
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
const __cssModules$a = {};
var __component__$a = /* @__PURE__ */ normalizeComponent$2(__vue2_script$a, render$9, staticRenderFns$9, false, __vue2_injectStyles$a, null, null, null);
function __vue2_injectStyles$a(context) {
  for (let o in __cssModules$a) {
    this[o] = __cssModules$a[o];
  }
}
var ActivityIndicator = /* @__PURE__ */ function() {
  return __component__$a.exports;
}();
var Chase_vue_vue_type_style_index_0_lang = "";
var CircleFade_vue_vue_type_style_index_0_lang = "";
var CircleOrbit_vue_vue_type_style_index_0_lang = "";
var CircleTrail_vue_vue_type_style_index_0_lang = "";
var render$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  _vm._self._c || _h;
  return _vm._m(0);
};
var staticRenderFns$8 = [function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "activity-indicator-dots" }, [_c("div", { staticClass: "activity-indicator-dots-bounce1" }), _c("div", { staticClass: "activity-indicator-dots-bounce2" }), _c("div", { staticClass: "activity-indicator-dots-bounce3" })]);
}];
var Dots_vue_vue_type_style_index_0_lang = "";
const __vue2_script$9 = {};
const __cssModules$9 = {};
var __component__$9 = /* @__PURE__ */ normalizeComponent$2(__vue2_script$9, render$8, staticRenderFns$8, false, __vue2_injectStyles$9, null, null, null);
function __vue2_injectStyles$9(context) {
  for (let o in __cssModules$9) {
    this[o] = __cssModules$9[o];
  }
}
var Dots = /* @__PURE__ */ function() {
  return __component__$9.exports;
}();
var DoublePulse_vue_vue_type_style_index_0_lang = "";
var Facebook_vue_vue_type_style_index_0_lang = "";
var Grid_vue_vue_type_style_index_0_lang = "";
var Pulse_vue_vue_type_style_index_0_lang = "";
var render$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  _vm._self._c || _h;
  return _vm._m(0);
};
var staticRenderFns$7 = [function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "activity-indicator-spinner" }, [_c("div", { staticClass: "activity-indicator-spinner1 activity-indicator-spinner" }), _c("div", { staticClass: "activity-indicator-spinner2 activity-indicator-spinner" }), _c("div", { staticClass: "activity-indicator-spinner3 activity-indicator-spinner" }), _c("div", { staticClass: "activity-indicator-spinner4 activity-indicator-spinner" }), _c("div", { staticClass: "activity-indicator-spinner5 activity-indicator-spinner" }), _c("div", { staticClass: "activity-indicator-spinner6 activity-indicator-spinner" }), _c("div", { staticClass: "activity-indicator-spinner7 activity-indicator-spinner" }), _c("div", { staticClass: "activity-indicator-spinner8 activity-indicator-spinner" }), _c("div", { staticClass: "activity-indicator-spinner9 activity-indicator-spinner" }), _c("div", { staticClass: "activity-indicator-spinner10 activity-indicator-spinner" }), _c("div", { staticClass: "activity-indicator-spinner11 activity-indicator-spinner" }), _c("div", { staticClass: "activity-indicator-spinner12 activity-indicator-spinner" })]);
}];
var Spinner_vue_vue_type_style_index_0_lang = "";
const __vue2_script$8 = {};
const __cssModules$8 = {};
var __component__$8 = /* @__PURE__ */ normalizeComponent$2(__vue2_script$8, render$7, staticRenderFns$7, false, __vue2_injectStyles$8, null, null, null);
function __vue2_injectStyles$8(context) {
  for (let o in __cssModules$8) {
    this[o] = __cssModules$8[o];
  }
}
var Spinner = /* @__PURE__ */ function() {
  return __component__$8.exports;
}();
var Spotify_vue_vue_type_style_index_0_lang = "";
var Square_vue_vue_type_style_index_0_lang = "";
var SquareFold_vue_vue_type_style_index_0_lang = "";
var SquareOrbit_vue_vue_type_style_index_0_lang = "";
var render$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("button", { staticClass: "btn", class: _vm.classes, attrs: { "type": _vm.type }, on: { "click": _vm.onClick } }, [_vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(), _vm._v(" " + _vm._s(_vm.label) + " "), _vm._t("default"), _c("activity-indicator", _vm._b({}, "activity-indicator", _vm.indicatorProps, false))], 2);
};
var staticRenderFns$6 = [];
var BtnActivity_vue_vue_type_style_index_0_lang = "";
register({
  dots: Dots,
  spinner: Spinner
});
const convertAnimationDelayToInt = function(delay) {
  const num = parseFloat(delay || 0, 10);
  const matches2 = delay && delay.match(/m?s/);
  const unit2 = matches2 ? matches2[0] : false;
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
      }, (isString(this.indicator) ? {
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
const __cssModules$7 = {};
var __component__$7 = /* @__PURE__ */ normalizeComponent$2(__vue2_script$7, render$6, staticRenderFns$6, false, __vue2_injectStyles$7, null, null, null);
function __vue2_injectStyles$7(context) {
  for (let o in __cssModules$7) {
    this[o] = __cssModules$7[o];
  }
}
var BtnActivity = /* @__PURE__ */ function() {
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
var render$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard-buttons" }, [_c("btn-group", { ref: "left", staticClass: "wizard-buttons-left" }, [_vm._t("buttons-left"), _c("btn", { ref: "back", attrs: { "type": "button", "variant": _vm.backVariant, "disabled": _vm.backButton === false || _vm.active === 0 && _vm.backButton !== true, "size": _vm.sizeableClass }, on: { "click": _vm.onClickBack } }, [_vm._v(" " + _vm._s(_vm.backLabel || "Back") + " ")])], 2), _c("btn-group", { ref: "right", staticClass: "wizard-buttons-right" }, [_vm._t("buttons-right"), _vm.active === _vm.steps.length - 1 ? _c("btn-activity", { ref: "finish", attrs: { "activity": _vm.activity, "size": _vm.sizeableClass, "variant": _vm.finishVariant, "disabled": _vm.finishButton === false, "type": "button" }, on: { "click": _vm.onClickFinish } }, [_vm._v(" " + _vm._s(_vm.finishLabel || "Finish") + " ")]) : _c("btn-activity", { ref: "next", attrs: { "activity": _vm.activity, "size": _vm.sizeableClass, "variant": _vm.nextVariant, "disabled": _vm.nextButton === false, "type": "button" }, on: { "click": _vm.onClickNext } }, [_vm._v(" " + _vm._s(_vm.nextLabel || "Next") + " ")])], 2)], 1);
};
var staticRenderFns$5 = [];
var WizardButtons_vue_vue_type_style_index_0_lang = "";
const __vue2_script$6 = {
  name: "WizardButtons",
  components: {
    Btn,
    BtnGroup,
    BtnActivity
  },
  mixins: [
    Sizeable
  ],
  props: {
    active: {
      type: [String, Number],
      default: 0
    },
    activity: Boolean,
    backButton: Boolean,
    backLabel: String,
    backVariant: {
      type: String,
      default: "secondary"
    },
    finishButton: Boolean,
    finishLabel: String,
    finishVariant: {
      type: String,
      default: "success"
    },
    nextButton: Boolean,
    nextLabel: String,
    nextVariant: {
      type: String,
      default: "primary"
    },
    steps: {
      type: Array,
      required: true
    }
  },
  computed: {
    sizeableClassPrefix() {
      return "";
    }
  },
  methods: {
    onClickBack(event) {
      if (this.backButton !== false) {
        this.$emit("click:back", event);
      }
    },
    onClickFinish(event) {
      if (this.finishButton !== false) {
        this.$emit("click:finish", event);
      }
    },
    onClickNext(event) {
      if (this.nextButton !== false) {
        this.$emit("click:next", event);
      }
    }
  }
};
const __cssModules$6 = {};
var __component__$6 = /* @__PURE__ */ normalizeComponent$2(__vue2_script$6, render$5, staticRenderFns$5, false, __vue2_injectStyles$6, null, null, null);
function __vue2_injectStyles$6(context) {
  for (let o in __cssModules$6) {
    this[o] = __cssModules$6[o];
  }
}
var WizardButtons = /* @__PURE__ */ function() {
  return __component__$6.exports;
}();
const __vue2_script$5 = {
  name: "WizardStep",
  props: {
    label: String,
    backButton: {
      type: [Function, Boolean],
      default() {
        return null;
      }
    },
    validate: {
      type: [Function, Boolean],
      default() {
        return true;
      }
    }
  },
  updated() {
    this.$nextTick(this.performValidityChecks);
  },
  mounted() {
    this.$nextTick(this.performValidityChecks);
  },
  methods: {
    checkValidity(prop) {
      let value = isFunction(this[prop]) ? this[prop](this) : this[prop];
      if (value === false) {
        return false;
      }
      if (this.$refs.wizard) {
        value = isFunction(this.$refs.wizard[prop]) ? this.$refs.wizard[prop](this) : this.$refs.wizard[prop];
        if (value === false) {
          return false;
        }
      }
      return true;
    },
    performValidityChecks() {
      this.checkValidity("validate") ? this.enable() : this.disable();
      if (this.$refs.wizard && this.checkValidity("backButton")) {
        this.$refs.wizard.enableBackButton();
      } else if (this.$refs.wizard) {
        this.$refs.wizard.disableBackButton();
      }
    },
    disable() {
      if (this.$refs.wizard) {
        this.$refs.wizard.disableNextButton();
        this.$refs.wizard.disableFinishButton();
      }
    },
    enable() {
      if (this.$refs.wizard) {
        this.$refs.wizard.enableNextButton();
        this.$refs.wizard.enableFinishButton();
      }
    }
  },
  render(h) {
    if (this.$slots.default.length !== 1) {
      throw new Error("The <wizard-slot> must contain a single parent DOM node.");
    }
    return this.$slots.default[0];
  }
};
let __vue2_render, __vue2_staticRenderFns;
const __cssModules$5 = {};
var __component__$5 = /* @__PURE__ */ normalizeComponent$2(__vue2_script$5, __vue2_render, __vue2_staticRenderFns, false, __vue2_injectStyles$5, null, null, null);
function __vue2_injectStyles$5(context) {
  for (let o in __cssModules$5) {
    this[o] = __cssModules$5[o];
  }
}
var WizardStep = /* @__PURE__ */ function() {
  return __component__$5.exports;
}();
var render$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard-error" }, [_vm.icon ? _c("div", { staticClass: "wizard-error-icon" }, [_c("i", { class: _vm.icon, attrs: { "size": "3x" } })]) : _vm._e(), _vm.title ? _c("h3", { staticClass: "wizard-error-title", domProps: { "innerHTML": _vm._s(_vm.title) } }) : _vm._e(), _vm._t("default"), _c("div", { staticClass: "row justify-content-center" }, [_c("div", { staticClass: "col-sm-6" }, [_vm.errors ? _c("div", { staticClass: "my-5" }, [_c("ul", { staticClass: "mb-0 text-left" }, _vm._l(_vm.errors, function(error, i) {
    return _c("li", { key: i }, [_vm._v(" " + _vm._s(error[0]) + " ")]);
  }), 0)]) : _vm._e(), _c("btn", { attrs: { "size": "lg", "variant": "danger", "block": "" }, on: { "click": function($event) {
    return _vm.$emit("back");
  } } }, [_vm._v(" Go Back ")])], 1)])], 2);
};
var staticRenderFns$4 = [];
var WizardError_vue_vue_type_style_index_0_lang = "";
const __vue2_script$4 = {
  name: "WizardError",
  components: {
    Btn
  },
  extends: WizardStep,
  props: {
    icon: {
      type: String,
      default: "check"
    },
    title: {
      type: String,
      default: "Error!"
    },
    errors: [Array, Object]
  }
};
const __cssModules$4 = {};
var __component__$4 = /* @__PURE__ */ normalizeComponent$2(__vue2_script$4, render$4, staticRenderFns$4, false, __vue2_injectStyles$4, null, null, null);
function __vue2_injectStyles$4(context) {
  for (let o in __cssModules$4) {
    this[o] = __cssModules$4[o];
  }
}
var WizardError = /* @__PURE__ */ function() {
  return __component__$4.exports;
}();
var render$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(_vm.tag, { tag: "component", staticClass: "wizard-header", class: { "text-center": _vm.center } }, [_vm._t("default")], 2);
};
var staticRenderFns$3 = [];
var WizardHeader_vue_vue_type_style_index_0_lang = "";
const __vue2_script$3 = {
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
const __cssModules$3 = {};
var __component__$3 = /* @__PURE__ */ normalizeComponent$2(__vue2_script$3, render$3, staticRenderFns$3, false, __vue2_injectStyles$3, null, null, null);
function __vue2_injectStyles$3(context) {
  for (let o in __cssModules$3) {
    this[o] = __cssModules$3[o];
  }
}
var WizardHeader = /* @__PURE__ */ function() {
  return __component__$3.exports;
}();
var render$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard-progress" }, _vm._l(_vm.steps, function(step, i) {
    return _c("a", { key: i, staticClass: "wizard-step", class: { "active": i === _vm.active, "disabled": i > _vm.highestStep, "complete": i + 1 <= _vm.highestStep }, style: { width: 100 / _vm.steps.length + "%" }, attrs: { "href": "#", "data-step": i, "title": step.label || step.title }, on: { "click": function($event) {
      $event.preventDefault();
      return _vm.onClick($event, step);
    } } }, [step.componentOptions && step.componentOptions.propsData.label ? _c("span", { staticClass: "wizard-step-label", domProps: { "innerHTML": _vm._s(step.componentOptions.propsData.label) } }) : step.componentOptions && step.componentOptions.propsData.title ? _c("span", { staticClass: "wizard-step-label", domProps: { "innerHTML": _vm._s(step.componentOptions.propsData.title) } }) : _vm._e()]);
  }), 0);
};
var staticRenderFns$2 = [];
var WizardProgress_vue_vue_type_style_index_0_lang = "";
const __vue2_script$2 = {
  name: "WizardProgress",
  props: {
    active: {
      type: [String, Number],
      default: 0
    },
    highestStep: {
      type: Number,
      required: true
    },
    steps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    onClick(event, step) {
      if (!event.target.classList.contains("disabled")) {
        this.$emit("click", event, step);
      }
    }
  }
};
const __cssModules$2 = {};
var __component__$2 = /* @__PURE__ */ normalizeComponent$2(__vue2_script$2, render$2, staticRenderFns$2, false, __vue2_injectStyles$2, null, null, null);
function __vue2_injectStyles$2(context) {
  for (let o in __cssModules$2) {
    this[o] = __cssModules$2[o];
  }
}
var WizardProgress = /* @__PURE__ */ function() {
  return __component__$2.exports;
}();
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard-success" }, [_vm.icon ? _c("div", { staticClass: "wizard-success-icon" }, [_c("svg", { attrs: { "xmlns": "http://www.w3.org/2000/svg", "width": "34", "height": "34", "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "fill": "#55b776", "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" } })])]) : _vm._e(), _vm.title ? _c("h3", { staticClass: "wizard-success-title", domProps: { "innerHTML": _vm._s(_vm.title) } }) : _vm._e(), _vm._t("default")], 2);
};
var staticRenderFns$1 = [];
var WizardSuccess_vue_vue_type_style_index_0_lang = "";
const __vue2_script$1 = {
  name: "WizardSuccess",
  components: {},
  extends: WizardStep,
  props: {
    icon: {
      type: String,
      default: "check"
    },
    title: {
      type: String,
      default: "Success!"
    }
  }
};
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent$2(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var WizardSuccess = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wizard" }, [_vm.header && !_vm.isFinished ? _c("wizard-header", { ref: "header", domProps: { "innerHTML": _vm._s(_vm.header) } }) : _vm._e(), !_vm.isFinished ? _c("wizard-progress", { ref: "progress", attrs: { "active": _vm.currentStep, "highest-step": _vm.highestStep, "steps": _vm.steps }, on: { "click": _vm.onProgressClick } }) : _vm._e(), _c("div", { ref: "content", staticClass: "wizard-content" }, [!_vm.isFinished ? _vm._t("content") : _vm._e(), !_vm.isFinished ? _c("slide-deck", { ref: "slideDeck", attrs: { "active": _vm.currentStep, "resize-model": _vm.resizeMode }, on: { "before-enter": _vm.onBeforeEnter, "enter": _vm.onEnter, "leave": _vm.onLeave } }, [_vm._t("default")], 2) : _vm.isFinished && !_vm.hasFailed ? _vm._t("success", function() {
    return [_c("wizard-success", { ref: "success" })];
  }) : _vm.isFinished && _vm.hasFailed ? _vm._t("error", function() {
    return [_c("wizard-error", { ref: "error", attrs: { "errors": _vm.errors }, on: { "back": _vm.onClickTest } })];
  }) : _vm._e()], 2), _vm.buttons && !_vm.isFinished ? _vm._t("buttons", function() {
    return [_c("hr"), _c("wizard-buttons", { ref: "buttons", attrs: { "size": "lg", "steps": _vm.steps, "active": _vm.currentStep, "activity": _vm.activity, "back-button": !_vm.isBackButtonDisabled, "next-button": !_vm.isNextButtonDisabled, "finish-button": !_vm.isFinishButtonDisabled }, on: { "click:back": _vm.onClickBack, "click:finish": _vm.onClickFinish, "click:next": _vm.onClickNext } })];
  }) : _vm._e()], 2);
};
var staticRenderFns = [];
var Wizard_vue_vue_type_style_index_0_lang = "";
const __vue2_script = {
  name: "Wizard",
  components: {
    SlideDeck,
    WizardButtons,
    WizardError,
    WizardHeader,
    WizardProgress,
    WizardSuccess
  },
  props: {
    active: {
      type: [String, Number],
      default: 0
    },
    activity: Boolean,
    buttons: {
      type: Boolean,
      default: true
    },
    completed: [String, Number],
    header: String,
    backButton: Boolean,
    nextButton: Boolean,
    finishButton: Boolean,
    resizeMode: {
      type: [Function, Boolean, String],
      default: "auto",
      validate(value) {
        return ["auto", "initial", "inherit"].indexOf(value) !== 1;
      }
    },
    validate: {
      type: [Function, Boolean],
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      steps: [],
      errors: null,
      hasFailed: false,
      isFinished: false,
      currentStep: this.index(),
      highestStep: this.index(this.completed),
      isBackButtonDisabled: this.backButton === false,
      isNextButtonDisabled: this.nextButton === false,
      isFinishButtonDisabled: this.finishButton === false
    };
  },
  watch: {
    active() {
      this.currentStep = this.index();
    },
    currentStep(value) {
      this.$emit("update:active", value);
    }
  },
  mounted() {
    const slide = this.$refs.slideDeck.slide(this.currentStep);
    if (slide) {
      (slide.componentInstance || slide.context).$refs.wizard = this;
      (slide.componentInstance || slide.context).$emit("enter");
      this.$emit("enter", slide);
    }
    this.steps = this.$refs.slideDeck.slides();
  },
  methods: {
    back() {
      this.currentStep = Math.max(this.currentStep - 1, 0);
    },
    disableButtons() {
      this.isBackButtonDisabled = true;
      this.isFinishButtonDisabled = true;
      this.isNextButtonDisabled = true;
    },
    disableBackButton() {
      this.isBackButtonDisabled = true;
    },
    disableFinishButton() {
      this.isFinishButtonDisabled = true;
    },
    disableNextButton() {
      this.isNextButtonDisabled = true;
    },
    emitBubbleEvent(key2, ...args) {
      this.$refs.slideDeck.slide(this.currentStep).componentInstance.$emit.apply(this.$refs.slideDeck.slide(this.currentStep).componentInstance, args = [key2].concat(args));
      this.$emit.apply(this, args);
    },
    enableButtons() {
      this.isBackButtonDisabled = false;
      this.isFinishButtonDisabled = false;
      this.isNextButtonDisabled = false;
    },
    enableBackButton() {
      this.isBackButtonDisabled = false;
    },
    enableFinishButton() {
      this.isFinishButtonDisabled = false;
    },
    enableNextButton() {
      this.isNextButtonDisabled = false;
    },
    finish(status, errors = null) {
      this.errors = errors;
      this.hasFailed = status === false;
      this.isFinished = true;
    },
    index(key2 = null) {
      return Math.max(0, this.$slots.default.indexOf(find(this.$slots.default, ["key", key2 || this.active]) || this.$slots.default[key2 || this.active]));
    },
    goto(index) {
      this.$emit("update:active", this.currentStep = Math.min(this.currentStep + 1, index));
    },
    next() {
      this.$emit("update:active", this.currentStep = Math.min(this.currentStep + 1, this.$refs.slideDeck.slides().length - 1));
    },
    onBeforeEnter(slide, prev) {
      slide.context.$emit("before-enter", slide, prev);
      this.$emit("before-enter", slide, prev);
    },
    onClickTest(event) {
      this.isFinished = false;
    },
    onClickBack(event) {
      this.emitBubbleEvent("back", event);
      if (event.defaultPrevented !== true) {
        this.back();
      }
    },
    onClickFinish(event) {
      this.emitBubbleEvent("finish", event);
      if (event.defaultPrevented !== true) {
        this.finish(true);
      }
    },
    onClickNext(event) {
      this.emitBubbleEvent("next", event);
      if (event.defaultPrevented !== true) {
        this.next();
      }
    },
    onEnter(slide, prev) {
      this.highestStep = Math.max(this.highestStep, this.$refs.slideDeck.$refs.slides.getSlideIndex(slide));
      this.$nextTick(() => {
        slide.componentInstance.$refs.wizard = this;
        slide.context.$emit("enter", slide, prev);
        this.$emit("enter", slide, prev);
      });
    },
    onLeave(slide, prev) {
      slide.context.$emit("leave", slide, prev);
      this.$emit("leave", slide, prev);
    },
    onProgressClick(event, slide) {
      if (this.$refs.slideDeck) {
        this.currentStep = this.$refs.slideDeck.$refs.slides.getSlideIndex(slide);
      } else {
        this.isFinished = false;
        this.currentStep = this.index(slide.key);
      }
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent$2(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var Wizard = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { Wizard, WizardButtons, WizardError, WizardHeader, WizardProgress, WizardStep, WizardSuccess };
