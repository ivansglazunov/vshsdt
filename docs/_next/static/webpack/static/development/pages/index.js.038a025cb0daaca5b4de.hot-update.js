webpackHotUpdate("static/development/pages/index.js",{

/***/ "./imports/components/vshsdt/header-facults.tsx":
/*!******************************************************!*\
  !*** ./imports/components/vshsdt/header-facults.tsx ***!
  \******************************************************/
/*! exports provided: HeaderFacults, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderFacults", function() { return HeaderFacults; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_reveal_Slide__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-reveal/Slide */ "./node_modules/react-reveal/Slide.js");
/* harmony import */ var react_reveal_Slide__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_reveal_Slide__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../theme */ "./imports/theme.tsx");
/* harmony import */ var _effects__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../effects */ "./imports/components/effects.tsx");
/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../draw */ "./imports/components/draw.tsx");
/* harmony import */ var vivus__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vivus */ "./node_modules/vivus/dist/vivus.js");
/* harmony import */ var vivus__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(vivus__WEBPACK_IMPORTED_MODULE_9__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;









var HeaderFacults = function HeaderFacults(_ref) {
  var screen = _ref.screen;
  var theme = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["useTheme"])();
  var xsDown = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["useMediaQuery"])(theme.breakpoints.down('xs'));

  var vsh = __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "h4",
    component: "h1",
    align: "center"
  }, "#\u0412\u0428", __jsx("span", {
    style: {
      position: 'relative',
      display: 'inline-block'
    }
  }, "\u0421", __jsx("div", {
    style: {
      position: 'absolute',
      bottom: -4,
      width: '100%',
      height: 5
    }
  }, __jsx(_effects__WEBPACK_IMPORTED_MODULE_7__["InsideSlide"], {
    revealProps: {
      top: true,
      delay: 1200
    }
  }, __jsx("div", {
    style: {
      width: '100%',
      height: '100%',
      background: '#ffaf36'
    }
  })))), __jsx("span", {
    style: {
      position: 'relative',
      display: 'inline-block'
    }
  }, "\u0414", __jsx("div", {
    style: {
      position: 'absolute',
      bottom: -4,
      width: '100%',
      height: 5
    }
  }, __jsx(_effects__WEBPACK_IMPORTED_MODULE_7__["InsideSlide"], {
    revealProps: {
      top: true,
      delay: 1000
    }
  }, __jsx("div", {
    style: {
      width: '100%',
      height: '100%',
      background: '#cb66f5'
    }
  })))), __jsx("span", {
    style: {
      position: 'relative',
      display: 'inline-block'
    }
  }, "\u0422", __jsx("div", {
    style: {
      position: 'absolute',
      bottom: -4,
      width: '100%',
      height: 5
    }
  }, __jsx(_effects__WEBPACK_IMPORTED_MODULE_7__["InsideSlide"], {
    revealProps: {
      top: true,
      delay: 1300
    }
  }, __jsx("div", {
    style: {
      width: '100%',
      height: '100%',
      background: '#0798ff'
    }
  })))));

  return __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__["ThemeProvider"], {
    theme: _theme__WEBPACK_IMPORTED_MODULE_6__["theme"]
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    container: true,
    justify: "center",
    alignItems: "center",
    style: screen ? {
      position: 'fixed',
      top: 0,
      left: 0
    } : {}
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    xs: 12,
    sm: 11,
    md: 10,
    lg: 8
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    container: true,
    justify: "center",
    alignItems: "center"
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    xs: 12,
    style: {
      overflow: 'hidden',
      transition: 'all 1s ease',
      height: screen ? 0 : 111
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
    href: "/"
  }, __jsx("div", {
    style: {
      padding: 36,
      transition: 'all 1s ease',
      position: 'relative',
      top: screen ? 50 : 0
    }
  }, vsh))), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    style: {
      overflow: 'hidden',
      transition: 'all 1s ease',
      width: screen ? 240 : 0
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
    href: "/"
  }, __jsx("div", {
    style: {
      cursor: 'pointer',
      padding: 36,
      width: 220
    }
  }, vsh))), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    xs: xsDown ? 12 : undefined,
    style: screen ? {} : Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({
      position: 'relative'
    }, xsDown ? {
      left: -6
    } : {
      top: -6
    })
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
    href: "/style"
  }, __jsx("div", {
    style: {
      cursor: 'pointer',
      transition: 'all 1s ease',
      padding: screen ? screen === 'style' ? 12 : 6 : 42,
      width: 150,
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      margin: '0 auto'
    }
  }, __jsx(react_reveal_Slide__WEBPACK_IMPORTED_MODULE_4___default.a, {
    right: !xsDown,
    bottom: xsDown,
    ssrReveal: true,
    delay: 1000
  }, __jsx("div", {
    style: {
      background: '#ffaf36',
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
  })), __jsx("div", {
    style: {
      position: 'relative',
      zIndex: 2
    }
  }, !screen && __jsx(_draw__WEBPACK_IMPORTED_MODULE_8__["Draw"], {
    id: "_draw_1",
    animTimingFunction: vivus__WEBPACK_IMPORTED_MODULE_9___default.a.EASE_IN_OUT,
    type: "oneByOne",
    duration: 100,
    file: 'static/logo-style.svg'
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "h5",
    component: "h5",
    align: "center"
  }, "\u0421\u0442\u0438\u043B\u0438\u0441\u0442\u0438\u043A\u0438"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "body1",
    component: "div",
    align: "right"
  }, "\u0444\u0430\u043A\u0443\u043B\u044C\u0442\u0435\u0442"))))), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    xs: xsDown ? 12 : undefined,
    style: screen ? {
      zIndex: 5,
      position: 'relative'
    } : Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({
      zIndex: 5,
      position: 'relative'
    }, xsDown ? {
      left: 5
    } : {})
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
    href: "/design"
  }, __jsx("div", {
    style: {
      cursor: 'pointer',
      transition: 'all 1s ease',
      padding: screen ? screen === 'design' ? 12 : 6 : 42,
      width: 150,
      textAlign: 'center',
      position: 'relative',
      margin: '0 auto'
    }
  }, __jsx(react_reveal_Slide__WEBPACK_IMPORTED_MODULE_4___default.a, {
    top: !xsDown,
    right: xsDown,
    ssrReveal: true,
    delay: 0
  }, __jsx("div", {
    style: {
      background: '#cb66f5',
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transition: 'all 1s ease',
      boxShadow: screen ? '0 0 0 0 transparent' : '0 5px 15px 0 #00000052'
    }
  })), __jsx("div", {
    style: {
      position: 'relative',
      zIndex: 2
    }
  }, !screen && __jsx(_draw__WEBPACK_IMPORTED_MODULE_8__["Draw"], {
    id: "_draw_2",
    animTimingFunction: vivus__WEBPACK_IMPORTED_MODULE_9___default.a.EASE_IN_OUT,
    type: "oneByOne",
    duration: 2000,
    file: 'static/logo-design.svg'
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "h5",
    component: "h5",
    align: "center"
  }, "\u0414\u0438\u0437\u0430\u0439\u043D\u0430"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "body1",
    component: "div",
    align: "right"
  }, "\u0444\u0430\u043A\u0443\u043B\u044C\u0442\u0435\u0442"))))), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
    item: true,
    xs: xsDown ? 12 : undefined,
    style: screen ? {} : Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({
      position: 'relative'
    }, xsDown ? {
      left: -12
    } : {
      top: -15
    })
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
    href: "/tech"
  }, __jsx("div", {
    style: {
      cursor: 'pointer',
      transition: 'all 1s ease',
      padding: screen ? screen === 'tech' ? 12 : 6 : 42,
      width: 150,
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      margin: '0 auto'
    }
  }, __jsx(react_reveal_Slide__WEBPACK_IMPORTED_MODULE_4___default.a, {
    left: !xsDown,
    top: xsDown,
    ssrReveal: true,
    delay: 1000
  }, __jsx("div", {
    style: {
      background: '#0798ff',
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
  })), __jsx("div", {
    style: {
      position: 'relative',
      zIndex: 2
    }
  }, !screen && __jsx(_draw__WEBPACK_IMPORTED_MODULE_8__["Draw"], {
    id: "_draw_3",
    animTimingFunction: vivus__WEBPACK_IMPORTED_MODULE_9___default.a.EASE_IN_OUT,
    type: "oneByOne",
    duration: 300,
    file: 'static/logo-tech.svg'
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "h5",
    component: "h5",
    align: "center"
  }, "\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "body1",
    component: "div",
    align: "right"
  }, "\u0444\u0430\u043A\u0443\u043B\u044C\u0442\u0435\u0442"))))))))));
};
/* harmony default export */ __webpack_exports__["default"] = (HeaderFacults);

/***/ })

})
//# sourceMappingURL=index.js.038a025cb0daaca5b4de.hot-update.js.map