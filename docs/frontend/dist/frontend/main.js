"use strict";
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["main"],{

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat/chat.component */ 5010);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);


class AppComponent {
  static {
    this.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 1,
      vars: 0,
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-chat");
        }
      },
      dependencies: [_chat_chat_component__WEBPACK_IMPORTED_MODULE_0__.ChatComponent],
      styles: ["[_nghost-%COMP%] {\n  display: block;\n  height: 100vh;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vLi4vLi4vLi4vYW50aWdyYXZpdHklMjBwZmUvZG9jcy9mcm9udGVuZC9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7QUNDRiIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 5010:
/*!****************************************!*\
  !*** ./src/app/chat/chat.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatComponent: () => (/* binding */ ChatComponent)
/* harmony export */ });
/* harmony import */ var C_Users_Mega_PC_Desktop_antigravity_pfe_docs_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_agent_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/agent.service */ 4587);







const _c0 = ["msgContainer"];
const _c1 = ["inputEl"];
function ChatComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChatComponent_div_1_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.toggleSidebar());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ChatComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 51)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Aucune conversation pour le moment.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function ChatComponent_div_20_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChatComponent_div_20_button_3_Template_button_click_0_listener() {
      const s_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.loadSession(s_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "svg", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "path", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", s_r5.id === ctx_r2.currentSessionId);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r5.title);
  }
}
function ChatComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 52)(1, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Aujourd'hui");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ChatComponent_div_20_button_3_Template, 5, 3, "button", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.todaySessions);
  }
}
function ChatComponent_div_21_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChatComponent_div_21_button_3_Template_button_click_0_listener() {
      const s_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.loadSession(s_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "svg", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "path", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", s_r7.id === ctx_r2.currentSessionId);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r7.title);
  }
}
function ChatComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 52)(1, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "7 derniers jours");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ChatComponent_div_21_button_3_Template, 5, 3, "button", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.olderSessions);
  }
}
function ChatComponent_section_49_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChatComponent_section_49_button_11_Template_button_click_0_listener() {
      const s_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r8).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.useSuggestion(s_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r9.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r9.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](s_r9.desc);
  }
}
function ChatComponent_section_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "section", 59)(1, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "svg", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "rect", 10)(4, "path", 11)(5, "path", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "h1", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Bonjour, Asma");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "p", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, " Je suis votre assistant financier DWEXO. D\u00E9crivez simplement ce que vous souhaitez faire \u2014 je comprends le fran\u00E7ais, \u0627\u0644\u0639\u0631\u0628\u064A\u0629, English et \u0627\u0644\u062A\u0648\u0646\u0633\u064A. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, ChatComponent_section_49_button_11_Template, 7, 3, "button", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.suggestions);
  }
}
function ChatComponent_div_50_article_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "svg", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "rect", 10)(3, "path", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
}
function ChatComponent_div_50_article_3_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, "A");
  }
}
function ChatComponent_div_50_article_3_div_10_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "D\u00E9bit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ChatComponent_div_50_article_3_div_10_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Cr\u00E9dit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ChatComponent_div_50_article_3_div_10_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Transfert");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ChatComponent_div_50_article_3_div_10_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const m_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", m_r10.transactionData.client_nom, " ");
  }
}
function ChatComponent_div_50_article_3_div_10_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const m_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", m_r10.transactionData.fournisseur_nom, " ");
  }
}
function ChatComponent_div_50_article_3_div_10_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const m_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", m_r10.transactionData.source_nom, " \u2192 ", m_r10.transactionData.destination_nom, " ");
  }
}
function ChatComponent_div_50_article_3_div_10_span_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const m_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", m_r10.transactionData.mode_paiement, " ");
  }
}
function ChatComponent_div_50_article_3_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 83)(1, "div", 84)(2, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ChatComponent_div_50_article_3_div_10_span_3_Template, 2, 0, "span", 86)(4, ChatComponent_div_50_article_3_div_10_span_4_Template, 2, 0, "span", 86)(5, ChatComponent_div_50_article_3_div_10_span_5_Template, 2, 0, "span", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "span", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 89)(11, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](13, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, ChatComponent_div_50_article_3_div_10_span_17_Template, 2, 1, "span", 93)(18, ChatComponent_div_50_article_3_div_10_span_18_Template, 2, 1, "span", 93)(19, ChatComponent_div_50_article_3_div_10_span_19_Template, 2, 2, "span", 93)(20, ChatComponent_div_50_article_3_div_10_span_20_Template, 2, 1, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const m_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("tx-debit", m_r10.transactionData.type_transaction === "debit")("tx-credit", m_r10.transactionData.type_transaction === "credit")("tx-transfert", m_r10.transactionData.type_transaction === "transfert");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", m_r10.transactionData.type_transaction === "debit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", m_r10.transactionData.type_transaction === "credit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", m_r10.transactionData.type_transaction === "transfert");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](m_r10.transactionData.numero);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("e-paye", m_r10.transactionData.etat === "Pay\u00E9")("e-attente", m_r10.transactionData.etat === "En attente")("e-annule", m_r10.transactionData.etat === "Annul\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", m_r10.transactionData.etat, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](13, 23, m_r10.transactionData.montant, "1.3-3"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](m_r10.transactionData.devise);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", m_r10.transactionData.client_nom);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", m_r10.transactionData.fournisseur_nom);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", m_r10.transactionData.source_nom);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", m_r10.transactionData.mode_paiement);
  }
}
function ChatComponent_div_50_article_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "article", 75)(1, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ChatComponent_div_50_article_3_ng_container_2_Template, 4, 0, "ng-container", 77)(3, ChatComponent_div_50_article_3_ng_template_3_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 78)(6, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, ChatComponent_div_50_article_3_div_10_Template, 21, 26, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "time", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](13, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const m_r10 = ctx.$implicit;
    const userAvatar_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("is-user", m_r10.role === "user");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("av-bot", m_r10.role === "assistant")("av-usr", m_r10.role === "user");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", m_r10.role === "assistant")("ngIfElse", userAvatar_r11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](m_r10.role === "assistant" ? "DWEXO Assistant" : "Vous");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("err", m_r10.isError);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](m_r10.content);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", m_r10.transactionData);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](13, 14, m_r10.timestamp, "HH:mm"));
  }
}
function ChatComponent_div_50_article_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "article", 75)(1, "div", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "svg", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "rect", 10)(4, "path", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 78)(6, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "DWEXO Assistant");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "span")(10, "span")(11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
}
function ChatComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 71, 1)(2, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ChatComponent_div_50_article_3_Template, 14, 17, "article", 73)(4, ChatComponent_div_50_article_4_Template, 12, 0, "article", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.messages);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r2.isLoading);
  }
}
function ChatComponent_div_52_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChatComponent_div_52_button_1_Template_button_click_0_listener() {
      const q_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.useChip(q_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const q_r13 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r2.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", q_r13.label, " ");
  }
}
function ChatComponent_div_52_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ChatComponent_div_52_button_1_Template, 2, 2, "button", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.quickChips);
  }
}
function ChatComponent__svg_svg_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "svg", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "path", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ChatComponent_div_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 102);
  }
}
class ChatComponent {
  constructor(agentService) {
    this.agentService = agentService;
    // ── État principal ────────────────────────────────
    this.messages = [];
    this.userInput = '';
    this.isLoading = false;
    this.inputFocused = false;
    this.sidebarOpen = true;
    this.currentSessionId = '';
    this.sessions = [];
    // ── Suggestions d'accueil (style ChatGPT) ─────────
    // Couvrent tous les cas DWEXO + multilingue
    this.suggestions = [{
      icon: '💳',
      title: 'Payer un fournisseur',
      desc: 'Enregistrer un débit en espèces ou virement',
      text: 'Payer un fournisseur 500 TND en espèce'
    }, {
      icon: '💰',
      title: 'Encaisser un client',
      desc: 'Créditer une caisse après encaissement',
      text: 'Encaisser 2000 TND du client Dupont SA'
    }, {
      icon: '🔄',
      title: 'Transférer des fonds',
      desc: 'Déplacer de l\'argent entre caisses',
      text: 'Virer 1000 TND vers la caisse principale'
    }, {
      icon: '📋',
      title: 'Consulter l\'historique',
      desc: 'Voir les transactions du mois en cours',
      text: 'Afficher toutes mes transactions du mois'
    }, {
      icon: '💼',
      title: 'Solde des caisses',
      desc: 'Demander en dialecte tunisien',
      text: 'صراحة شحال عندنا فالصندوق ؟'
    }, {
      icon: '🏦',
      title: 'Unpaid invoices',
      desc: 'Request in English',
      text: 'Show me all unpaid invoices'
    }];
    // ── Raccourcis rapides ────────────────────────────
    this.quickChips = [{
      label: 'Solde caisses',
      text: 'Quel est le solde de mes caisses ?'
    }, {
      label: 'Transactions',
      text: 'Liste mes transactions'
    }, {
      label: 'Nouveau débit',
      text: 'Faire un débit'
    }, {
      label: 'Nouveau crédit',
      text: 'Faire un crédit'
    }, {
      label: 'Transfert',
      text: 'Faire un transfert'
    }];
    // ── Placeholder rotatif multilingue ──────────────
    this.placeholders = ['Décrivez votre opération financière...', 'اكتب طلبك هنا...', 'Type your request in any language...', 'وصف العملية المالية...', 'قل لي شنية تحب تعمل...'];
    this.phIndex = 0;
    this.placeholder = this.placeholders[0];
  }
  ngOnInit() {
    this.newChat();
    this._rotatePlaceholder();
  }
  ngAfterViewChecked() {
    this._scrollToBottom();
  }
  // ══════════════════════════════════════════════════
  // GESTION DES SESSIONS
  // ══════════════════════════════════════════════════
  newChat() {
    // Sauvegarder la session actuelle si elle a des messages
    if (this.messages.length > 0) {
      const existing = this.sessions.find(s => s.id === this.currentSessionId);
      if (existing) existing.messages = [...this.messages];
    }
    this.currentSessionId = this.agentService.generateSessionId();
    this.messages = [];
  }
  loadSession(session) {
    this.currentSessionId = session.id;
    this.messages = [...session.messages];
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }
  // Historique groupé par date
  get todaySessions() {
    const today = new Date().toDateString();
    return this.sessions.filter(s => s.createdAt.toDateString() === today);
  }
  get olderSessions() {
    const today = new Date().toDateString();
    return this.sessions.filter(s => s.createdAt.toDateString() !== today);
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  // ══════════════════════════════════════════════════
  // ENVOI DE MESSAGE
  // ══════════════════════════════════════════════════
  send() {
    var _this = this;
    return (0,C_Users_Mega_PC_Desktop_antigravity_pfe_docs_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const text = _this.userInput.trim();
      if (!text || _this.isLoading) return;
      _this.userInput = '';
      _this.autoResize();
      // Ajouter message utilisateur
      _this.messages.push({
        role: 'user',
        content: text,
        timestamp: new Date()
      });
      _this.isLoading = true;
      try {
        const res = yield _this.agentService.sendMessage(text, _this.currentSessionId);
        _this.messages.push({
          role: 'assistant',
          content: res.response,
          timestamp: new Date(),
          transactionData: res.transaction_data
        });
        // Sauvegarder / créer la session dans l'historique
        _this._saveSession(text);
      } catch (err) {
        _this.messages.push({
          role: 'assistant',
          content: '❌ ' + (err.message || 'Erreur de connexion'),
          timestamp: new Date(),
          isError: true
        });
      } finally {
        _this.isLoading = false;
        setTimeout(() => _this.inputEl?.nativeElement?.focus(), 50);
      }
    })();
  }
  onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.send();
    }
    this.autoResize();
  }
  useSuggestion(s) {
    this.userInput = s.text;
    this.send();
  }
  useChip(q) {
    this.userInput = q.text;
    this.send();
  }
  // ══════════════════════════════════════════════════
  // PRIVÉ — utilitaires
  // ══════════════════════════════════════════════════
  _saveSession(firstMessage) {
    const existing = this.sessions.find(s => s.id === this.currentSessionId);
    if (existing) {
      existing.messages = [...this.messages];
    } else {
      // Titre = les 40 premiers caractères du premier message
      const title = firstMessage.length > 40 ? firstMessage.slice(0, 40) + '…' : firstMessage;
      this.sessions.unshift({
        id: this.currentSessionId,
        title,
        messages: [...this.messages],
        createdAt: new Date()
      });
    }
  }
  _scrollToBottom() {
    try {
      const el = this.msgContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }
  autoResize(event) {
    const el = this.inputEl?.nativeElement;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  }
  _rotatePlaceholder() {
    setInterval(() => {
      this.phIndex = (this.phIndex + 1) % this.placeholders.length;
      this.placeholder = this.placeholders[this.phIndex];
    }, 3500);
  }
  static {
    this.ɵfac = function ChatComponent_Factory(t) {
      return new (t || ChatComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_agent_service__WEBPACK_IMPORTED_MODULE_1__.AgentService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: ChatComponent,
      selectors: [["app-chat"]],
      viewQuery: function ChatComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.msgContainer = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.inputEl = _t.first);
        }
      },
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 62,
      vars: 21,
      consts: [["inputEl", ""], ["msgContainer", ""], ["userAvatar", ""], [1, "shell"], ["class", "sidebar-backdrop", "aria-hidden", "true", 3, "click", 4, "ngIf"], ["aria-label", "Historique des conversations", 1, "sidebar"], [1, "sidebar-head"], [1, "brand"], ["aria-hidden", "true", 1, "brand-icon"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "2", "y", "7", "width", "20", "height", "14", "rx", "2"], ["d", "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"], [1, "brand-name"], ["aria-label", "Fermer le menu", 1, "icon-btn", "sidebar-close", 3, "click"], ["d", "M18 6L6 18M6 6l12 12"], [1, "new-chat-btn", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M12 5v14M5 12h14"], [1, "history-scroll"], ["class", "history-empty", 4, "ngIf"], ["class", "history-group", 4, "ngIf"], [1, "sidebar-foot"], [1, "user-row"], ["aria-hidden", "true", 1, "user-av"], [1, "user-meta"], [1, "user-name"], [1, "user-plan"], [1, "main"], [1, "topbar"], [1, "topbar-left"], ["aria-label", "Ouvrir le menu", 1, "icon-btn", 3, "click"], ["d", "M3 12h18M3 6h18M3 18h18"], [1, "model-selector"], [1, "model-name"], [1, "model-badge"], [1, "topbar-right"], ["role", "status", 1, "status-badge"], ["aria-hidden", "true", 1, "pulse-dot"], ["aria-label", "Nouvelle conversation", 1, "icon-btn", 3, "click"], ["d", "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"], ["class", "welcome", "aria-label", "Accueil", 4, "ngIf"], ["class", "messages", "role", "log", "aria-live", "polite", 4, "ngIf"], [1, "input-zone"], ["class", "quick-row", 4, "ngIf"], [1, "input-box"], ["rows", "1", "aria-label", "Votre message", 3, "ngModelChange", "keydown", "input", "focus", "blur", "ngModel", "placeholder", "disabled"], ["type", "button", "aria-label", "Envoyer", 1, "send-btn", 3, "click", "disabled"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "currentColor", 4, "ngIf"], ["class", "spinner", 4, "ngIf"], [1, "input-hint"], ["aria-hidden", "true", 1, "sidebar-backdrop", 3, "click"], [1, "history-empty"], [1, "history-group"], [1, "history-label"], ["type", "button", "class", "history-item", 3, "active", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "history-item", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "history-icon"], ["d", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"], [1, "history-title"], ["aria-label", "Accueil", 1, "welcome"], ["aria-hidden", "true", 1, "welcome-logo"], ["width", "32", "height", "32", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["d", "M12 12v.01"], [1, "welcome-title"], [1, "welcome-sub"], [1, "sug-grid"], ["type", "button", "class", "sug-card", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "sug-card", 3, "click"], ["aria-hidden", "true", 1, "sug-icon"], [1, "sug-title"], [1, "sug-desc"], ["role", "log", "aria-live", "polite", 1, "messages"], [1, "msg-wrap"], ["class", "msg-row", 3, "is-user", 4, "ngFor", "ngForOf"], ["class", "msg-row", 4, "ngIf"], [1, "msg-row"], ["aria-hidden", "true", 1, "msg-av"], [4, "ngIf", "ngIfElse"], [1, "msg-body"], [1, "msg-name"], [1, "msg-text"], ["class", "tx-card", 4, "ngIf"], [1, "msg-time"], [1, "tx-card"], [1, "tx-head"], [1, "tx-type"], [4, "ngIf"], [1, "tx-num"], [1, "tx-etat"], [1, "tx-body"], [1, "tx-amount"], [1, "tx-devise"], [1, "tx-meta"], ["class", "tx-tag", 4, "ngIf"], [1, "tx-tag"], ["aria-hidden", "true", 1, "msg-av", "av-bot"], ["aria-label", "R\u00E9ponse en cours", 1, "typing"], [1, "quick-row"], ["type", "button", "class", "q-chip", 3, "disabled", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "q-chip", 3, "click", "disabled"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M3.4 20.4 22 12 3.4 3.6l2.8 7.2L17 12l-10.8 1.2-2.8 7.2z"], [1, "spinner"]],
      template: function ChatComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ChatComponent_div_1_Template, 1, 0, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "aside", 5)(3, "div", 6)(4, "div", 7)(5, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "svg", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "rect", 10)(8, "path", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "span", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "DWEXO");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "button", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChatComponent_Template_button_click_11_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.toggleSidebar());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "svg", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "path", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "button", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChatComponent_Template_button_click_14_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.newChat());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "svg", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "path", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, " Nouvelle conversation ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, ChatComponent_div_19_Template, 3, 0, "div", 19)(20, ChatComponent_div_20_Template, 4, 1, "div", 20)(21, ChatComponent_div_21_Template, 4, 1, "div", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 21)(23, "div", 22)(24, "div", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "A");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 24)(27, "span", 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Asma Amara");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "span", 26);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "DWEXO Finance");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "main", 27)(32, "header", 28)(33, "div", 29)(34, "button", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChatComponent_Template_button_click_34_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.toggleSidebar());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "svg", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](36, "path", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "div", 32)(38, "span", 33);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](39, "DWEXO Assistant");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "span", 34);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](41, "Finance");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "div", 35)(43, "div", 36);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](44, "span", 37);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](45, " En ligne ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "button", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChatComponent_Template_button_click_46_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.newChat());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "svg", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](48, "path", 39);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](49, ChatComponent_section_49_Template, 12, 1, "section", 40)(50, ChatComponent_div_50_Template, 5, 2, "div", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "footer", 42);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](52, ChatComponent_div_52_Template, 2, 1, "div", 43);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "div", 44)(54, "textarea", 45, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function ChatComponent_Template_textarea_ngModelChange_54_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.userInput, $event) || (ctx.userInput = $event);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keydown", function ChatComponent_Template_textarea_keydown_54_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onKey($event));
          })("input", function ChatComponent_Template_textarea_input_54_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.autoResize($event));
          })("focus", function ChatComponent_Template_textarea_focus_54_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.inputFocused = true);
          })("blur", function ChatComponent_Template_textarea_blur_54_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.inputFocused = false);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](56, "        ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](57, "button", 46);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ChatComponent_Template_button_click_57_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.send());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](58, ChatComponent__svg_svg_58_Template, 2, 0, "svg", 47)(59, ChatComponent_div_59_Template, 1, 0, "div", 48);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](60, "p", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](61, " DWEXO Assistant peut se tromper. V\u00E9rifiez les op\u00E9rations importantes. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("sidebar-open", ctx.sidebarOpen);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.sidebarOpen);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("open", ctx.sidebarOpen);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](17);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.sessions.length);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.todaySessions.length);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.olderSessions.length);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](28);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.messages.length === 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.messages.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.messages.length === 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("focus", ctx.inputFocused);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.userInput);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("placeholder", ctx.placeholder)("disabled", ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("ready", ctx.userInput.trim());
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.isLoading || !ctx.userInput.trim());
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
      styles: ["@charset \"UTF-8\";\n\n\n[_nghost-%COMP%] {\n  --bg: #0f0f0f;\n  --sidebar-bg: #171717;\n  --surface: #212121;\n  --surface-hover:#2a2a2a;\n  --surface-elev: #2f2f2f;\n  --border: rgba(255, 255, 255, 0.08);\n  --border-strong:rgba(255, 255, 255, 0.14);\n  --accent: #10a37f;\n  --accent-hover: #0d8f6f;\n  --accent-soft: rgba(16, 163, 127, 0.12);\n  --text-1: #ececec;\n  --text-2: #a3a3a3;\n  --text-3: #737373;\n  --danger: #ef4444;\n  --success: #22c55e;\n  --warning: #f59e0b;\n  --sidebar-w: 272px;\n  --radius-sm: 8px;\n  --radius-md: 12px;\n  --radius-lg: 16px;\n  --radius-xl: 24px;\n  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);\n  --shadow-md: 0 8px 32px rgba(0, 0, 0, 0.4);\n  --transition: 0.18s ease;\n  display: block;\n  height: 100vh;\n  font-family: \"Inter\", -apple-system, BlinkMacSystemFont, sans-serif;\n  color: var(--text-1);\n}\n\n\n\n.shell[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  background: var(--bg);\n  overflow: hidden;\n  position: relative;\n}\n\n.sidebar-backdrop[_ngcontent-%COMP%] {\n  display: none;\n}\n\n\n\n.sidebar[_ngcontent-%COMP%] {\n  width: var(--sidebar-w);\n  background: var(--sidebar-bg);\n  border-right: 1px solid var(--border);\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  z-index: 40;\n  transition: transform var(--transition), width var(--transition);\n}\n\n.sidebar-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 12px 10px;\n}\n\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n\n.brand-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: var(--radius-sm);\n  background: linear-gradient(135deg, var(--accent), #059669);\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n\n.brand-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  letter-spacing: -0.02em;\n}\n\n.sidebar-close[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.new-chat-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  margin: 4px 12px 12px;\n  padding: 10px 14px;\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-md);\n  background: transparent;\n  color: var(--text-1);\n  font-family: inherit;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background var(--transition), border-color var(--transition);\n}\n.new-chat-btn[_ngcontent-%COMP%]:hover {\n  background: var(--surface-hover);\n  border-color: rgba(255, 255, 255, 0.2);\n}\n\n.history-scroll[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0 8px 8px;\n}\n\n.history-empty[_ngcontent-%COMP%] {\n  padding: 24px 12px;\n  text-align: center;\n}\n.history-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-3);\n  line-height: 1.5;\n}\n\n.history-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n\n.history-label[_ngcontent-%COMP%] {\n  display: block;\n  padding: 8px 10px 6px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-3);\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n\n.history-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  padding: 9px 10px;\n  border: none;\n  border-radius: var(--radius-sm);\n  background: transparent;\n  color: var(--text-2);\n  font-family: inherit;\n  font-size: 13px;\n  text-align: left;\n  cursor: pointer;\n  transition: background var(--transition), color var(--transition);\n}\n.history-item[_ngcontent-%COMP%]:hover {\n  background: var(--surface-hover);\n  color: var(--text-1);\n}\n.history-item.active[_ngcontent-%COMP%] {\n  background: var(--surface);\n  color: var(--text-1);\n}\n\n.history-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  opacity: 0.55;\n}\n\n.history-title[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.sidebar-foot[_ngcontent-%COMP%] {\n  padding: 10px 12px 14px;\n  border-top: 1px solid var(--border);\n}\n\n.user-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px;\n  border-radius: var(--radius-md);\n  transition: background var(--transition);\n}\n.user-row[_ngcontent-%COMP%]:hover {\n  background: var(--surface-hover);\n}\n\n.user-av[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #6366f1, #8b5cf6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 600;\n  color: #fff;\n  flex-shrink: 0;\n}\n\n.user-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n\n.user-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--text-1);\n}\n\n.user-plan[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-3);\n}\n\n\n\n.main[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  position: relative;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 16px;\n  border-bottom: 1px solid var(--border);\n  background: rgba(15, 15, 15, 0.85);\n  backdrop-filter: blur(12px);\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n\n.topbar-left[_ngcontent-%COMP%], .topbar-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.model-selector[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.model-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: -0.01em;\n}\n\n.model-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--accent);\n  background: var(--accent-soft);\n  padding: 2px 8px;\n  border-radius: 999px;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--text-2);\n  padding: 5px 10px;\n  border-radius: 999px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n}\n\n.pulse-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--success);\n  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);\n  }\n  50% {\n    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0);\n  }\n}\n.icon-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: none;\n  border-radius: var(--radius-sm);\n  background: transparent;\n  color: var(--text-2);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background var(--transition), color var(--transition);\n}\n.icon-btn[_ngcontent-%COMP%]:hover {\n  background: var(--surface-hover);\n  color: var(--text-1);\n}\n\n\n\n.welcome[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 24px 16px;\n  animation: _ngcontent-%COMP%_fadeUp 0.45s ease both;\n  overflow-y: auto;\n}\n\n@keyframes _ngcontent-%COMP%_fadeUp {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.welcome-logo[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: var(--radius-lg);\n  background: var(--surface);\n  border: 1px solid var(--border);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--accent);\n  margin-bottom: 20px;\n}\n\n.welcome-title[_ngcontent-%COMP%] {\n  font-size: clamp(24px, 4vw, 32px);\n  font-weight: 600;\n  letter-spacing: -0.03em;\n  margin-bottom: 10px;\n  text-align: center;\n}\n\n.welcome-sub[_ngcontent-%COMP%] {\n  max-width: 520px;\n  font-size: 15px;\n  color: var(--text-2);\n  text-align: center;\n  line-height: 1.65;\n  margin-bottom: 32px;\n}\n\n.sug-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n  width: 100%;\n  max-width: 640px;\n}\n\n.sug-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 6px;\n  padding: 16px;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  background: var(--surface);\n  text-align: left;\n  cursor: pointer;\n  font-family: inherit;\n  color: inherit;\n  transition: background var(--transition), border-color var(--transition), transform var(--transition);\n  animation: _ngcontent-%COMP%_fadeUp 0.4s ease both;\n}\n.sug-card[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0.04s;\n}\n.sug-card[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.08s;\n}\n.sug-card[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.12s;\n}\n.sug-card[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 0.16s;\n}\n.sug-card[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 0.2s;\n}\n.sug-card[_ngcontent-%COMP%]:nth-child(6) {\n  animation-delay: 0.24s;\n}\n.sug-card[_ngcontent-%COMP%]:hover {\n  background: var(--surface-hover);\n  border-color: var(--border-strong);\n  transform: translateY(-1px);\n}\n\n.sug-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  line-height: 1;\n}\n\n.sug-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-1);\n}\n\n.sug-desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-3);\n  line-height: 1.45;\n}\n\n\n\n.messages[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px 0 8px;\n}\n\n.msg-wrap[_ngcontent-%COMP%] {\n  max-width: 768px;\n  margin: 0 auto;\n  padding: 0 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.msg-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  animation: _ngcontent-%COMP%_fadeUp 0.28s ease both;\n}\n.msg-row.is-user[_ngcontent-%COMP%]   .msg-body[_ngcontent-%COMP%] {\n  background: transparent;\n}\n\n.msg-av[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-top: 2px;\n  font-size: 13px;\n  font-weight: 600;\n}\n.msg-av.av-bot[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--border);\n  color: var(--accent);\n}\n.msg-av.av-usr[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #6366f1, #8b5cf6);\n  color: #fff;\n}\n\n.msg-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.msg-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-1);\n  margin-bottom: 6px;\n}\n\n.msg-text[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.7;\n  color: var(--text-1);\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.msg-text.err[_ngcontent-%COMP%] {\n  color: var(--danger);\n}\n\n.msg-time[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 8px;\n  font-size: 11px;\n  color: var(--text-3);\n}\n\n\n\n.tx-card[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  max-width: 420px;\n  transition: border-color var(--transition);\n}\n.tx-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--border-strong);\n}\n\n.tx-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 10px 14px;\n  background: rgba(255, 255, 255, 0.02);\n  border-bottom: 1px solid var(--border);\n}\n\n.tx-type[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  padding: 3px 9px;\n  border-radius: 6px;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n}\n.tx-type.tx-debit[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.12);\n  color: #f87171;\n}\n.tx-type.tx-credit[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #4ade80;\n}\n.tx-type.tx-transfert[_ngcontent-%COMP%] {\n  background: rgba(16, 163, 127, 0.12);\n  color: var(--accent);\n}\n\n.tx-num[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-family: ui-monospace, \"Cascadia Code\", monospace;\n  color: var(--text-2);\n  flex: 1;\n}\n\n.tx-etat[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.tx-etat.e-paye[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #4ade80;\n}\n.tx-etat.e-attente[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.12);\n  color: #fbbf24;\n}\n.tx-etat.e-annule[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.12);\n  color: #f87171;\n}\n\n.tx-body[_ngcontent-%COMP%] {\n  padding: 14px;\n}\n\n.tx-amount[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  letter-spacing: -0.02em;\n  margin-bottom: 10px;\n}\n\n.tx-devise[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--text-2);\n  margin-left: 4px;\n}\n\n.tx-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n\n.tx-tag[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-2);\n  background: var(--surface-elev);\n  padding: 4px 10px;\n  border-radius: 999px;\n  border: 1px solid var(--border);\n}\n\n\n\n.typing[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n  padding: 4px 0;\n}\n.typing[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  background: var(--text-3);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_dot-bounce 1.3s infinite ease-in-out;\n}\n.typing[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.15s;\n}\n.typing[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.3s;\n}\n\n@keyframes _ngcontent-%COMP%_dot-bounce {\n  0%, 80%, 100% {\n    transform: scale(0.7);\n    opacity: 0.4;\n  }\n  40% {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n\n\n.input-zone[_ngcontent-%COMP%] {\n  padding: 12px 20px 16px;\n  background: linear-gradient(to top, var(--bg) 70%, transparent);\n}\n\n.quick-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 8px;\n  max-width: 768px;\n  margin: 0 auto 12px;\n}\n\n.q-chip[_ngcontent-%COMP%] {\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 500;\n  color: var(--text-2);\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 999px;\n  padding: 7px 14px;\n  cursor: pointer;\n  transition: background var(--transition), color var(--transition), border-color var(--transition);\n  white-space: nowrap;\n}\n.q-chip[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--surface-hover);\n  color: var(--text-1);\n  border-color: var(--border-strong);\n}\n.q-chip[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.input-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n  max-width: 768px;\n  margin: 0 auto;\n  padding: 10px 12px 10px 16px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-xl);\n  box-shadow: var(--shadow-sm);\n  transition: border-color var(--transition), box-shadow var(--transition);\n}\n.input-box.focus[_ngcontent-%COMP%] {\n  border-color: rgba(16, 163, 127, 0.45);\n  box-shadow: 0 0 0 3px var(--accent-soft);\n}\n\ntextarea[_ngcontent-%COMP%] {\n  flex: 1;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--text-1);\n  font-family: inherit;\n  font-size: 15px;\n  line-height: 1.55;\n  resize: none;\n  max-height: 180px;\n  overflow-y: auto;\n  padding: 4px 0;\n}\ntextarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-3);\n}\ntextarea[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n}\n\n.send-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: none;\n  border-radius: 50%;\n  background: var(--surface-elev);\n  color: var(--text-3);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: background var(--transition), color var(--transition), transform 0.12s ease;\n}\n.send-btn.ready[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n}\n.send-btn.ready[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--accent-hover);\n  transform: scale(1.04);\n}\n.send-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  transform: none;\n}\n\n.spinner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.25);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.input-hint[_ngcontent-%COMP%] {\n  max-width: 768px;\n  margin: 10px auto 0;\n  text-align: center;\n  font-size: 11px;\n  color: var(--text-3);\n  line-height: 1.5;\n}\n\n\n\n.shell[_ngcontent-%COMP%]:not(.sidebar-open)   .sidebar[_ngcontent-%COMP%] {\n  width: 0;\n  border-right-color: transparent;\n  overflow: hidden;\n}\n\n\n\n@media (max-width: 768px) {\n  .sidebar[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    height: 100vh;\n    transform: translateX(-100%);\n    box-shadow: var(--shadow-md);\n  }\n  .shell.sidebar-open[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n  .shell.sidebar-open[_ngcontent-%COMP%]   .sidebar-backdrop[_ngcontent-%COMP%] {\n    display: block;\n    position: fixed;\n    inset: 0;\n    background: rgba(0, 0, 0, 0.55);\n    z-index: 30;\n    backdrop-filter: blur(2px);\n  }\n  .sidebar-close[_ngcontent-%COMP%] {\n    display: flex;\n  }\n  .shell[_ngcontent-%COMP%]:not(.sidebar-open)   .sidebar[_ngcontent-%COMP%] {\n    width: var(--sidebar-w);\n  }\n  .sug-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .msg-wrap[_ngcontent-%COMP%] {\n    padding: 0 14px;\n  }\n  .input-zone[_ngcontent-%COMP%] {\n    padding: 10px 14px 14px;\n  }\n  .welcome[_ngcontent-%COMP%] {\n    padding: 24px 16px 12px;\n  }\n}\n@media (min-width: 769px) {\n  .sidebar-backdrop[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uLy4uL2FudGlncmF2aXR5JTIwcGZlL2RvY3MvZnJvbnRlbmQvc3JjL2FwcC9jaGF0L2NoYXQuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NoYXQvY2hhdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUNBaEIsK0NBQUE7QUFFQTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1DQUFBO0VBQ0EseUNBQUE7RUFDQSxpQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUNBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EseUNBQUE7RUFDQSwwQ0FBQTtFQUNBLHdCQUFBO0VBRUEsY0FBQTtFQUNBLGFBQUE7RUFDQSxtRUFBQTtFQUNBLG9CQUFBO0FEQUY7O0FDR0EsNkNBQUE7QUFFQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FEREY7O0FDSUE7RUFDRSxhQUFBO0FEREY7O0FDSUEsNkNBQUE7QUFFQTtFQUNFLHVCQUFBO0VBQ0EsNkJBQUE7RUFDQSxxQ0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsZ0VBQUE7QURGRjs7QUNLQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsdUJBQUE7QURGRjs7QUNLQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0FERkY7O0FDS0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLCtCQUFBO0VBQ0EsMkRBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtF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K0JBQUE7RUFDQSxvQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSx1RkFBQTtBRG1CRjtBQ2pCRTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtBRG1CSjtBQ2pCSTtFQUNFLCtCQUFBO0VBQ0Esc0JBQUE7QURtQk47QUNmRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QURpQko7O0FDYkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLDJDQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLG9DQUFBO0FEZ0JGOztBQ2JBO0VBQ0U7SUFBSyx5QkFBQTtFRGlCTDtBQUNGO0FDZkE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBRGlCRjs7QUNkQSw2Q0FBQTtBQUVBO0VBQ0UsUUFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0JBQUE7QURnQkY7O0FDYkEsNkNBQUE7QUFFQTtFQUNFO0lBQ0UsZUFBQTtJQUNBLE1BQUE7SUFDQSxPQUFBO0lBQ0EsYUFBQTtJQUNBLDRCQUFBO0lBQ0EsNEJBQUE7RURlRjtFQ1pBO0lBQ0Usd0JBQUE7RURjRjtFQ1hBO0lBQ0UsY0FBQTtJQUNBLGVBQUE7SUFDQSxRQUFBO0lBQ0EsK0JBQUE7SUFDQSxXQUFBO0lBQ0EsMEJBQUE7RURhRjtFQ1ZBO0lBQ0UsYUFBQTtFRFlGO0VDVEE7SUFDRSx1QkFBQTtFRFdGO0VDUkE7SUFDRSwwQkFBQTtFRFVGO0VDUEE7SUFDRSxlQUFBO0VEU0Y7RUNOQTtJQUNFLHVCQUFBO0VEUUY7RUNMQTtJQUNFLHVCQUFBO0VET0Y7QUFDRjtBQ0pBO0VBQ0U7SUFDRSx3QkFBQTtFRE1GO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG4vKiBNb2Rlcm4gQ2hhdEdQVC1pbnNwaXJlZCBVSSDDosKAwpQgRFdFWE8gRmluYW5jZSAqL1xuOmhvc3Qge1xuICAtLWJnOiAjMGYwZjBmO1xuICAtLXNpZGViYXItYmc6ICMxNzE3MTc7XG4gIC0tc3VyZmFjZTogIzIxMjEyMTtcbiAgLS1zdXJmYWNlLWhvdmVyOiMyYTJhMmE7XG4gIC0tc3VyZmFjZS1lbGV2OiAjMmYyZjJmO1xuICAtLWJvcmRlcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTtcbiAgLS1ib3JkZXItc3Ryb25nOnJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNCk7XG4gIC0tYWNjZW50OiAjMTBhMzdmO1xuICAtLWFjY2VudC1ob3ZlcjogIzBkOGY2ZjtcbiAgLS1hY2NlbnQtc29mdDogcmdiYSgxNiwgMTYzLCAxMjcsIDAuMTIpO1xuICAtLXRleHQtMTogI2VjZWNlYztcbiAgLS10ZXh0LTI6ICNhM2EzYTM7XG4gIC0tdGV4dC0zOiAjNzM3MzczO1xuICAtLWRhbmdlcjogI2VmNDQ0NDtcbiAgLS1zdWNjZXNzOiAjMjJjNTVlO1xuICAtLXdhcm5pbmc6ICNmNTllMGI7XG4gIC0tc2lkZWJhci13OiAyNzJweDtcbiAgLS1yYWRpdXMtc206IDhweDtcbiAgLS1yYWRpdXMtbWQ6IDEycHg7XG4gIC0tcmFkaXVzLWxnOiAxNnB4O1xuICAtLXJhZGl1cy14bDogMjRweDtcbiAgLS1zaGFkb3ctc206IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIC0tc2hhZG93LW1kOiAwIDhweCAzMnB4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgLS10cmFuc2l0aW9uOiAwLjE4cyBlYXNlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgZm9udC1mYW1pbHk6IFwiSW50ZXJcIiwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmO1xuICBjb2xvcjogdmFyKC0tdGV4dC0xKTtcbn1cblxuLyogw6LClMKAw6LClMKAIFNoZWxsIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgCAqL1xuLnNoZWxsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZDogdmFyKC0tYmcpO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5zaWRlYmFyLWJhY2tkcm9wIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLyogw6LClMKAw6LClMKAIFNpZGViYXIgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAICovXG4uc2lkZWJhciB7XG4gIHdpZHRoOiB2YXIoLS1zaWRlYmFyLXcpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zaWRlYmFyLWJnKTtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleC1zaHJpbms6IDA7XG4gIHotaW5kZXg6IDQwO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0tdHJhbnNpdGlvbiksIHdpZHRoIHZhcigtLXRyYW5zaXRpb24pO1xufVxuXG4uc2lkZWJhci1oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAxNHB4IDEycHggMTBweDtcbn1cblxuLmJyYW5kIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5icmFuZC1pY29uIHtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLXNtKTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0tYWNjZW50KSwgIzA1OTY2OSk7XG4gIGNvbG9yOiAjZmZmO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5icmFuZC1uYW1lIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBsZXR0ZXItc3BhY2luZzogLTAuMDJlbTtcbn1cblxuLnNpZGViYXItY2xvc2Uge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4ubmV3LWNoYXQtYnRuIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBtYXJnaW46IDRweCAxMnB4IDEycHg7XG4gIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy1tZCk7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogdmFyKC0tdGV4dC0xKTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRyYW5zaXRpb24pLCBib3JkZXItY29sb3IgdmFyKC0tdHJhbnNpdGlvbik7XG59XG4ubmV3LWNoYXQtYnRuOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS1ob3Zlcik7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xufVxuXG4uaGlzdG9yeS1zY3JvbGwge1xuICBmbGV4OiAxO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwYWRkaW5nOiAwIDhweCA4cHg7XG59XG5cbi5oaXN0b3J5LWVtcHR5IHtcbiAgcGFkZGluZzogMjRweCAxMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uaGlzdG9yeS1lbXB0eSBwIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogdmFyKC0tdGV4dC0zKTtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbn1cblxuLmhpc3RvcnktZ3JvdXAge1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufVxuXG4uaGlzdG9yeS1sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiA4cHggMTBweCA2cHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRleHQtMyk7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA2ZW07XG59XG5cbi5oaXN0b3J5LWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA5cHggMTBweDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtc20pO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6IHZhcigtLXRleHQtMik7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IDEzcHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10cmFuc2l0aW9uKSwgY29sb3IgdmFyKC0tdHJhbnNpdGlvbik7XG59XG4uaGlzdG9yeS1pdGVtOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS1ob3Zlcik7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xufVxuLmhpc3RvcnktaXRlbS5hY3RpdmUge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlKTtcbiAgY29sb3I6IHZhcigtLXRleHQtMSk7XG59XG5cbi5oaXN0b3J5LWljb24ge1xuICBmbGV4LXNocmluazogMDtcbiAgb3BhY2l0eTogMC41NTtcbn1cblxuLmhpc3RvcnktdGl0bGUge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLnNpZGViYXItZm9vdCB7XG4gIHBhZGRpbmc6IDEwcHggMTJweCAxNHB4O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcbn1cblxuLnVzZXItcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBwYWRkaW5nOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy1tZCk7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgdmFyKC0tdHJhbnNpdGlvbik7XG59XG4udXNlci1yb3c6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLWhvdmVyKTtcbn1cblxuLnVzZXItYXYge1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2MzY2ZjEsICM4YjVjZjYpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogI2ZmZjtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi51c2VyLW1ldGEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi51c2VyLW5hbWUge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xufVxuXG4udXNlci1wbGFuIHtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBjb2xvcjogdmFyKC0tdGV4dC0zKTtcbn1cblxuLyogw6LClMKAw6LClMKAIE1haW4gw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAICovXG4ubWFpbiB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi13aWR0aDogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4udG9wYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEwcHggMTZweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTUsIDE1LCAxNSwgMC44NSk7XG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cigxMnB4KTtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgdG9wOiAwO1xuICB6LWluZGV4OiAxMDtcbn1cblxuLnRvcGJhci1sZWZ0LFxuLnRvcGJhci1yaWdodCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbn1cblxuLm1vZGVsLXNlbGVjdG9yIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5tb2RlbC1uYW1lIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBsZXR0ZXItc3BhY2luZzogLTAuMDFlbTtcbn1cblxuLm1vZGVsLWJhZGdlIHtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBjb2xvcjogdmFyKC0tYWNjZW50KTtcbiAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LXNvZnQpO1xuICBwYWRkaW5nOiAycHggOHB4O1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbn1cblxuLnN0YXR1cy1iYWRnZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LTIpO1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xufVxuXG4ucHVsc2UtZG90IHtcbiAgd2lkdGg6IDdweDtcbiAgaGVpZ2h0OiA3cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VjY2Vzcyk7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDAgcmdiYSgzNCwgMTk3LCA5NCwgMC41KTtcbiAgYW5pbWF0aW9uOiBwdWxzZSAycyBpbmZpbml0ZTtcbn1cblxuQGtleWZyYW1lcyBwdWxzZSB7XG4gIDAlLCAxMDAlIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAwIHJnYmEoMzQsIDE5NywgOTQsIDAuNCk7XG4gIH1cbiAgNTAlIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMCA0cHggcmdiYSgzNCwgMTk3LCA5NCwgMCk7XG4gIH1cbn1cbi5pY29uLWJ0biB7XG4gIHdpZHRoOiAzNnB4O1xuICBoZWlnaHQ6IDM2cHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLXNtKTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LTIpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRyYW5zaXRpb24pLCBjb2xvciB2YXIoLS10cmFuc2l0aW9uKTtcbn1cbi5pY29uLWJ0bjpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UtaG92ZXIpO1xuICBjb2xvcjogdmFyKC0tdGV4dC0xKTtcbn1cblxuLyogw6LClMKAw6LClMKAIFdlbGNvbWUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAICovXG4ud2VsY29tZSB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAzMnB4IDI0cHggMTZweDtcbiAgYW5pbWF0aW9uOiBmYWRlVXAgMC40NXMgZWFzZSBib3RoO1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVVcCB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEycHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuLndlbGNvbWUtbG9nbyB7XG4gIHdpZHRoOiA1NnB4O1xuICBoZWlnaHQ6IDU2cHg7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy1sZyk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY29sb3I6IHZhcigtLWFjY2VudCk7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi53ZWxjb21lLXRpdGxlIHtcbiAgZm9udC1zaXplOiBjbGFtcCgyNHB4LCA0dncsIDMycHgpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBsZXR0ZXItc3BhY2luZzogLTAuMDNlbTtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ud2VsY29tZS1zdWIge1xuICBtYXgtd2lkdGg6IDUyMHB4O1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LTIpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGxpbmUtaGVpZ2h0OiAxLjY1O1xuICBtYXJnaW4tYm90dG9tOiAzMnB4O1xufVxuXG4uc3VnLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCBtaW5tYXgoMCwgMWZyKSk7XG4gIGdhcDogMTBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogNjQwcHg7XG59XG5cbi5zdWctY2FyZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IDZweDtcbiAgcGFkZGluZzogMTZweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLWxnKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRyYW5zaXRpb24pLCBib3JkZXItY29sb3IgdmFyKC0tdHJhbnNpdGlvbiksIHRyYW5zZm9ybSB2YXIoLS10cmFuc2l0aW9uKTtcbiAgYW5pbWF0aW9uOiBmYWRlVXAgMC40cyBlYXNlIGJvdGg7XG59XG4uc3VnLWNhcmQ6bnRoLWNoaWxkKDEpIHtcbiAgYW5pbWF0aW9uLWRlbGF5OiAwLjA0cztcbn1cbi5zdWctY2FyZDpudGgtY2hpbGQoMikge1xuICBhbmltYXRpb24tZGVsYXk6IDAuMDhzO1xufVxuLnN1Zy1jYXJkOm50aC1jaGlsZCgzKSB7XG4gIGFuaW1hdGlvbi1kZWxheTogMC4xMnM7XG59XG4uc3VnLWNhcmQ6bnRoLWNoaWxkKDQpIHtcbiAgYW5pbWF0aW9uLWRlbGF5OiAwLjE2cztcbn1cbi5zdWctY2FyZDpudGgtY2hpbGQoNSkge1xuICBhbmltYXRpb24tZGVsYXk6IDAuMnM7XG59XG4uc3VnLWNhcmQ6bnRoLWNoaWxkKDYpIHtcbiAgYW5pbWF0aW9uLWRlbGF5OiAwLjI0cztcbn1cbi5zdWctY2FyZDpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UtaG92ZXIpO1xuICBib3JkZXItY29sb3I6IHZhcigtLWJvcmRlci1zdHJvbmcpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCk7XG59XG5cbi5zdWctaWNvbiB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG5cbi5zdWctdGl0bGUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xufVxuXG4uc3VnLWRlc2Mge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LTMpO1xuICBsaW5lLWhlaWdodDogMS40NTtcbn1cblxuLyogw6LClMKAw6LClMKAIE1lc3NhZ2VzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgCAqL1xuLm1lc3NhZ2VzIHtcbiAgZmxleDogMTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMjRweCAwIDhweDtcbn1cblxuLm1zZy13cmFwIHtcbiAgbWF4LXdpZHRoOiA3NjhweDtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHBhZGRpbmc6IDAgMjBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAyNHB4O1xufVxuXG4ubXNnLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTRweDtcbiAgYW5pbWF0aW9uOiBmYWRlVXAgMC4yOHMgZWFzZSBib3RoO1xufVxuLm1zZy1yb3cuaXMtdXNlciAubXNnLWJvZHkge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cblxuLm1zZy1hdiB7XG4gIHdpZHRoOiAzMnB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbi5tc2ctYXYuYXYtYm90IHtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XG4gIGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xufVxuLm1zZy1hdi5hdi11c3Ige1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjM2NmYxLCAjOGI1Y2Y2KTtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi5tc2ctYm9keSB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbn1cblxuLm1zZy1uYW1lIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGV4dC0xKTtcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xufVxuXG4ubXNnLXRleHQge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjc7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG59XG4ubXNnLXRleHQuZXJyIHtcbiAgY29sb3I6IHZhcigtLWRhbmdlcik7XG59XG5cbi5tc2ctdGltZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgY29sb3I6IHZhcigtLXRleHQtMyk7XG59XG5cbi8qIFRyYW5zYWN0aW9uIGNhcmQgKi9cbi50eC1jYXJkIHtcbiAgbWFyZ2luLXRvcDogMTRweDtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy1sZyk7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1heC13aWR0aDogNDIwcHg7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciB2YXIoLS10cmFuc2l0aW9uKTtcbn1cbi50eC1jYXJkOmhvdmVyIHtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1ib3JkZXItc3Ryb25nKTtcbn1cblxuLnR4LWhlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMik7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xufVxuXG4udHgtdHlwZSB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcGFkZGluZzogM3B4IDlweDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLnR4LXR5cGUudHgtZGViaXQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDIzOSwgNjgsIDY4LCAwLjEyKTtcbiAgY29sb3I6ICNmODcxNzE7XG59XG4udHgtdHlwZS50eC1jcmVkaXQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDM0LCAxOTcsIDk0LCAwLjEyKTtcbiAgY29sb3I6ICM0YWRlODA7XG59XG4udHgtdHlwZS50eC10cmFuc2ZlcnQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDE2LCAxNjMsIDEyNywgMC4xMik7XG4gIGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xufVxuXG4udHgtbnVtIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LWZhbWlseTogdWktbW9ub3NwYWNlLCBcIkNhc2NhZGlhIENvZGVcIiwgbW9ub3NwYWNlO1xuICBjb2xvcjogdmFyKC0tdGV4dC0yKTtcbiAgZmxleDogMTtcbn1cblxuLnR4LWV0YXQge1xuICBmb250LXNpemU6IDExcHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHBhZGRpbmc6IDJweCA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbn1cbi50eC1ldGF0LmUtcGF5ZSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMzQsIDE5NywgOTQsIDAuMTIpO1xuICBjb2xvcjogIzRhZGU4MDtcbn1cbi50eC1ldGF0LmUtYXR0ZW50ZSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNTgsIDExLCAwLjEyKTtcbiAgY29sb3I6ICNmYmJmMjQ7XG59XG4udHgtZXRhdC5lLWFubnVsZSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjM5LCA2OCwgNjgsIDAuMTIpO1xuICBjb2xvcjogI2Y4NzE3MTtcbn1cblxuLnR4LWJvZHkge1xuICBwYWRkaW5nOiAxNHB4O1xufVxuXG4udHgtYW1vdW50IHtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBsZXR0ZXItc3BhY2luZzogLTAuMDJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLnR4LWRldmlzZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6IHZhcigtLXRleHQtMik7XG4gIG1hcmdpbi1sZWZ0OiA0cHg7XG59XG5cbi50eC1tZXRhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDZweDtcbn1cblxuLnR4LXRhZyB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6IHZhcigtLXRleHQtMik7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UtZWxldik7XG4gIHBhZGRpbmc6IDRweCAxMHB4O1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcbn1cblxuLyogVHlwaW5nIGluZGljYXRvciAqL1xuLnR5cGluZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogNXB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiA0cHggMDtcbn1cbi50eXBpbmcgc3BhbiB7XG4gIHdpZHRoOiA3cHg7XG4gIGhlaWdodDogN3B4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10ZXh0LTMpO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGFuaW1hdGlvbjogZG90LWJvdW5jZSAxLjNzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xufVxuLnR5cGluZyBzcGFuOm50aC1jaGlsZCgyKSB7XG4gIGFuaW1hdGlvbi1kZWxheTogMC4xNXM7XG59XG4udHlwaW5nIHNwYW46bnRoLWNoaWxkKDMpIHtcbiAgYW5pbWF0aW9uLWRlbGF5OiAwLjNzO1xufVxuXG5Aa2V5ZnJhbWVzIGRvdC1ib3VuY2Uge1xuICAwJSwgODAlLCAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7XG4gICAgb3BhY2l0eTogMC40O1xuICB9XG4gIDQwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG4vKiDDosKUwoDDosKUwoAgSW5wdXQgem9uZSDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoAgKi9cbi5pbnB1dC16b25lIHtcbiAgcGFkZGluZzogMTJweCAyMHB4IDE2cHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIHZhcigtLWJnKSA3MCUsIHRyYW5zcGFyZW50KTtcbn1cblxuLnF1aWNrLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBtYXgtd2lkdGg6IDc2OHB4O1xuICBtYXJnaW46IDAgYXV0byAxMnB4O1xufVxuXG4ucS1jaGlwIHtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6IHZhcigtLXRleHQtMik7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgcGFkZGluZzogN3B4IDE0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10cmFuc2l0aW9uKSwgY29sb3IgdmFyKC0tdHJhbnNpdGlvbiksIGJvcmRlci1jb2xvciB2YXIoLS10cmFuc2l0aW9uKTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cbi5xLWNoaXA6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLWhvdmVyKTtcbiAgY29sb3I6IHZhcigtLXRleHQtMSk7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tYm9yZGVyLXN0cm9uZyk7XG59XG4ucS1jaGlwOmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC41O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uaW5wdXQtYm94IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICBnYXA6IDhweDtcbiAgbWF4LXdpZHRoOiA3NjhweDtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHBhZGRpbmc6IDEwcHggMTJweCAxMHB4IDE2cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMteGwpO1xuICBib3gtc2hhZG93OiB2YXIoLS1zaGFkb3ctc20pO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgdmFyKC0tdHJhbnNpdGlvbiksIGJveC1zaGFkb3cgdmFyKC0tdHJhbnNpdGlvbik7XG59XG4uaW5wdXQtYm94LmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDE2LCAxNjMsIDEyNywgMC40NSk7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCB2YXIoLS1hY2NlbnQtc29mdCk7XG59XG5cbnRleHRhcmVhIHtcbiAgZmxleDogMTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRleHQtMSk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IDE1cHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU1O1xuICByZXNpemU6IG5vbmU7XG4gIG1heC1oZWlnaHQ6IDE4MHB4O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwYWRkaW5nOiA0cHggMDtcbn1cbnRleHRhcmVhOjpwbGFjZWhvbGRlciB7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LTMpO1xufVxudGV4dGFyZWE6ZGlzYWJsZWQge1xuICBvcGFjaXR5OiAwLjU1O1xufVxuXG4uc2VuZC1idG4ge1xuICB3aWR0aDogMzZweDtcbiAgaGVpZ2h0OiAzNnB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS1lbGV2KTtcbiAgY29sb3I6IHZhcigtLXRleHQtMyk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRyYW5zaXRpb24pLCBjb2xvciB2YXIoLS10cmFuc2l0aW9uKSwgdHJhbnNmb3JtIDAuMTJzIGVhc2U7XG59XG4uc2VuZC1idG4ucmVhZHkge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQpO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5zZW5kLWJ0bi5yZWFkeTpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1ob3Zlcik7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4wNCk7XG59XG4uc2VuZC1idG46ZGlzYWJsZWQge1xuICBvcGFjaXR5OiAwLjQ1O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICB0cmFuc2Zvcm06IG5vbmU7XG59XG5cbi5zcGlubmVyIHtcbiAgd2lkdGg6IDE2cHg7XG4gIGhlaWdodDogMTZweDtcbiAgYm9yZGVyOiAycHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTtcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBhbmltYXRpb246IHNwaW4gMC43cyBsaW5lYXIgaW5maW5pdGU7XG59XG5cbkBrZXlmcmFtZXMgc3BpbiB7XG4gIHRvIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICB9XG59XG4uaW5wdXQtaGludCB7XG4gIG1heC13aWR0aDogNzY4cHg7XG4gIG1hcmdpbjogMTBweCBhdXRvIDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBjb2xvcjogdmFyKC0tdGV4dC0zKTtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbn1cblxuLyogw6LClMKAw6LClMKAIFNpZGViYXIgY29sbGFwc2UgKGRlc2t0b3ApIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgCAqL1xuLnNoZWxsOm5vdCguc2lkZWJhci1vcGVuKSAuc2lkZWJhciB7XG4gIHdpZHRoOiAwO1xuICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4vKiDDosKUwoDDosKUwoAgUmVzcG9uc2l2ZSDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoAgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuc2lkZWJhciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICBib3gtc2hhZG93OiB2YXIoLS1zaGFkb3ctbWQpO1xuICB9XG4gIC5zaGVsbC5zaWRlYmFyLW9wZW4gLnNpZGViYXIge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgfVxuICAuc2hlbGwuc2lkZWJhci1vcGVuIC5zaWRlYmFyLWJhY2tkcm9wIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgaW5zZXQ6IDA7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjU1KTtcbiAgICB6LWluZGV4OiAzMDtcbiAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnB4KTtcbiAgfVxuICAuc2lkZWJhci1jbG9zZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgfVxuICAuc2hlbGw6bm90KC5zaWRlYmFyLW9wZW4pIC5zaWRlYmFyIHtcbiAgICB3aWR0aDogdmFyKC0tc2lkZWJhci13KTtcbiAgfVxuICAuc3VnLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG4gIC5tc2ctd3JhcCB7XG4gICAgcGFkZGluZzogMCAxNHB4O1xuICB9XG4gIC5pbnB1dC16b25lIHtcbiAgICBwYWRkaW5nOiAxMHB4IDE0cHggMTRweDtcbiAgfVxuICAud2VsY29tZSB7XG4gICAgcGFkZGluZzogMjRweCAxNnB4IDEycHg7XG4gIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjlweCkge1xuICAuc2lkZWJhci1iYWNrZHJvcCB7XG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICB9XG59IiwiLyogTW9kZXJuIENoYXRHUFQtaW5zcGlyZWQgVUkgw6LCgMKUIERXRVhPIEZpbmFuY2UgKi9cclxuXHJcbjpob3N0IHtcclxuICAtLWJnOiAgICAgICAgICAgIzBmMGYwZjtcclxuICAtLXNpZGViYXItYmc6ICAgIzE3MTcxNztcclxuICAtLXN1cmZhY2U6ICAgICAgIzIxMjEyMTtcclxuICAtLXN1cmZhY2UtaG92ZXI6IzJhMmEyYTtcclxuICAtLXN1cmZhY2UtZWxldjogIzJmMmYyZjtcclxuICAtLWJvcmRlcjogICAgICAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTtcclxuICAtLWJvcmRlci1zdHJvbmc6cmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE0KTtcclxuICAtLWFjY2VudDogICAgICAgIzEwYTM3ZjtcclxuICAtLWFjY2VudC1ob3ZlcjogIzBkOGY2ZjtcclxuICAtLWFjY2VudC1zb2Z0OiAgcmdiYSgxNiwgMTYzLCAxMjcsIDAuMTIpO1xyXG4gIC0tdGV4dC0xOiAgICAgICAjZWNlY2VjO1xyXG4gIC0tdGV4dC0yOiAgICAgICAjYTNhM2EzO1xyXG4gIC0tdGV4dC0zOiAgICAgICAjNzM3MzczO1xyXG4gIC0tZGFuZ2VyOiAgICAgICAjZWY0NDQ0O1xyXG4gIC0tc3VjY2VzczogICAgICAjMjJjNTVlO1xyXG4gIC0td2FybmluZzogICAgICAjZjU5ZTBiO1xyXG4gIC0tc2lkZWJhci13OiAgICAyNzJweDtcclxuICAtLXJhZGl1cy1zbTogICAgOHB4O1xyXG4gIC0tcmFkaXVzLW1kOiAgICAxMnB4O1xyXG4gIC0tcmFkaXVzLWxnOiAgICAxNnB4O1xyXG4gIC0tcmFkaXVzLXhsOiAgICAyNHB4O1xyXG4gIC0tc2hhZG93LXNtOiAgICAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gIC0tc2hhZG93LW1kOiAgICAwIDhweCAzMnB4IHJnYmEoMCwgMCwgMCwgMC40KTtcclxuICAtLXRyYW5zaXRpb246ICAgMC4xOHMgZWFzZTtcclxuXHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICBmb250LWZhbWlseTogJ0ludGVyJywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmO1xyXG4gIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xyXG59XHJcblxyXG4vKiDDosKUwoDDosKUwoAgU2hlbGwgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAICovXHJcblxyXG4uc2hlbGwge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZyk7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5zaWRlYmFyLWJhY2tkcm9wIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4vKiDDosKUwoDDosKUwoAgU2lkZWJhciDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoAgKi9cclxuXHJcbi5zaWRlYmFyIHtcclxuICB3aWR0aDogdmFyKC0tc2lkZWJhci13KTtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1zaWRlYmFyLWJnKTtcclxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBmbGV4LXNocmluazogMDtcclxuICB6LWluZGV4OiA0MDtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0tdHJhbnNpdGlvbiksIHdpZHRoIHZhcigtLXRyYW5zaXRpb24pO1xyXG59XHJcblxyXG4uc2lkZWJhci1oZWFkIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIHBhZGRpbmc6IDE0cHggMTJweCAxMHB4O1xyXG59XHJcblxyXG4uYnJhbmQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDEwcHg7XHJcbiAgbWluLXdpZHRoOiAwO1xyXG59XHJcblxyXG4uYnJhbmQtaWNvbiB7XHJcbiAgd2lkdGg6IDMycHg7XHJcbiAgaGVpZ2h0OiAzMnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy1zbSk7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0tYWNjZW50KSwgIzA1OTY2OSk7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZsZXgtc2hyaW5rOiAwO1xyXG59XHJcblxyXG4uYnJhbmQtbmFtZSB7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IC0wLjAyZW07XHJcbn1cclxuXHJcbi5zaWRlYmFyLWNsb3NlIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4ubmV3LWNoYXQtYnRuIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZ2FwOiA4cHg7XHJcbiAgbWFyZ2luOiA0cHggMTJweCAxMnB4O1xyXG4gIHBhZGRpbmc6IDEwcHggMTRweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItc3Ryb25nKTtcclxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtbWQpO1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xyXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRyYW5zaXRpb24pLCBib3JkZXItY29sb3IgdmFyKC0tdHJhbnNpdGlvbik7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS1ob3Zlcik7XHJcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcclxuICB9XHJcbn1cclxuXHJcbi5oaXN0b3J5LXNjcm9sbCB7XHJcbiAgZmxleDogMTtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIHBhZGRpbmc6IDAgOHB4IDhweDtcclxufVxyXG5cclxuLmhpc3RvcnktZW1wdHkge1xyXG4gIHBhZGRpbmc6IDI0cHggMTJweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gIHAge1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgY29sb3I6IHZhcigtLXRleHQtMyk7XHJcbiAgICBsaW5lLWhlaWdodDogMS41O1xyXG4gIH1cclxufVxyXG5cclxuLmhpc3RvcnktZ3JvdXAge1xyXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbn1cclxuXHJcbi5oaXN0b3J5LWxhYmVsIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBwYWRkaW5nOiA4cHggMTBweCA2cHg7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgY29sb3I6IHZhcigtLXRleHQtMyk7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBsZXR0ZXItc3BhY2luZzogMC4wNmVtO1xyXG59XHJcblxyXG4uaGlzdG9yeS1pdGVtIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmc6IDlweCAxMHB4O1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtc20pO1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGNvbG9yOiB2YXIoLS10ZXh0LTIpO1xyXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRyYW5zaXRpb24pLCBjb2xvciB2YXIoLS10cmFuc2l0aW9uKTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLWhvdmVyKTtcclxuICAgIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xyXG4gIH1cclxuXHJcbiAgJi5hY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7XHJcbiAgICBjb2xvcjogdmFyKC0tdGV4dC0xKTtcclxuICB9XHJcbn1cclxuXHJcbi5oaXN0b3J5LWljb24ge1xyXG4gIGZsZXgtc2hyaW5rOiAwO1xyXG4gIG9wYWNpdHk6IDAuNTU7XHJcbn1cclxuXHJcbi5oaXN0b3J5LXRpdGxlIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuXHJcbi5zaWRlYmFyLWZvb3Qge1xyXG4gIHBhZGRpbmc6IDEwcHggMTJweCAxNHB4O1xyXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xyXG59XHJcblxyXG4udXNlci1yb3cge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDEwcHg7XHJcbiAgcGFkZGluZzogOHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy1tZCk7XHJcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10cmFuc2l0aW9uKTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLWhvdmVyKTtcclxuICB9XHJcbn1cclxuXHJcbi51c2VyLWF2IHtcclxuICB3aWR0aDogMzJweDtcclxuICBoZWlnaHQ6IDMycHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2MzY2ZjEsICM4YjVjZjYpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBmb250LXNpemU6IDEzcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBjb2xvcjogI2ZmZjtcclxuICBmbGV4LXNocmluazogMDtcclxufVxyXG5cclxuLnVzZXItbWV0YSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIG1pbi13aWR0aDogMDtcclxufVxyXG5cclxuLnVzZXItbmFtZSB7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6IHZhcigtLXRleHQtMSk7XHJcbn1cclxuXHJcbi51c2VyLXBsYW4ge1xyXG4gIGZvbnQtc2l6ZTogMTFweDtcclxuICBjb2xvcjogdmFyKC0tdGV4dC0zKTtcclxufVxyXG5cclxuLyogw6LClMKAw6LClMKAIE1haW4gw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAICovXHJcblxyXG4ubWFpbiB7XHJcbiAgZmxleDogMTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgbWluLXdpZHRoOiAwO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLnRvcGJhciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBnYXA6IDEycHg7XHJcbiAgcGFkZGluZzogMTBweCAxNnB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMTUsIDE1LCAxNSwgMC44NSk7XHJcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEycHgpO1xyXG4gIHBvc2l0aW9uOiBzdGlja3k7XHJcbiAgdG9wOiAwO1xyXG4gIHotaW5kZXg6IDEwO1xyXG59XHJcblxyXG4udG9wYmFyLWxlZnQsXHJcbi50b3BiYXItcmlnaHQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDEwcHg7XHJcbn1cclxuXHJcbi5tb2RlbC1zZWxlY3RvciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG59XHJcblxyXG4ubW9kZWwtbmFtZSB7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IC0wLjAxZW07XHJcbn1cclxuXHJcbi5tb2RlbC1iYWRnZSB7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6IHZhcigtLWFjY2VudCk7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LXNvZnQpO1xyXG4gIHBhZGRpbmc6IDJweCA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XHJcbn1cclxuXHJcbi5zdGF0dXMtYmFkZ2Uge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDZweDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgY29sb3I6IHZhcigtLXRleHQtMik7XHJcbiAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcclxufVxyXG5cclxuLnB1bHNlLWRvdCB7XHJcbiAgd2lkdGg6IDdweDtcclxuICBoZWlnaHQ6IDdweDtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VjY2Vzcyk7XHJcbiAgYm94LXNoYWRvdzogMCAwIDAgMCByZ2JhKDM0LCAxOTcsIDk0LCAwLjUpO1xyXG4gIGFuaW1hdGlvbjogcHVsc2UgMnMgaW5maW5pdGU7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgcHVsc2Uge1xyXG4gIDAlLCAxMDAlIHsgYm94LXNoYWRvdzogMCAwIDAgMCByZ2JhKDM0LCAxOTcsIDk0LCAwLjQpOyB9XHJcbiAgNTAlICAgICAgeyBib3gtc2hhZG93OiAwIDAgMCA0cHggcmdiYSgzNCwgMTk3LCA5NCwgMCk7IH1cclxufVxyXG5cclxuLmljb24tYnRuIHtcclxuICB3aWR0aDogMzZweDtcclxuICBoZWlnaHQ6IDM2cHg7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy1zbSk7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgY29sb3I6IHZhcigtLXRleHQtMik7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRyYW5zaXRpb24pLCBjb2xvciB2YXIoLS10cmFuc2l0aW9uKTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLWhvdmVyKTtcclxuICAgIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xyXG4gIH1cclxufVxyXG5cclxuLyogw6LClMKAw6LClMKAIFdlbGNvbWUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAICovXHJcblxyXG4ud2VsY29tZSB7XHJcbiAgZmxleDogMTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAzMnB4IDI0cHggMTZweDtcclxuICBhbmltYXRpb246IGZhZGVVcCAwLjQ1cyBlYXNlIGJvdGg7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG5cclxuQGtleWZyYW1lcyBmYWRlVXAge1xyXG4gIGZyb20geyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTJweCk7IH1cclxuICB0byAgIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9XHJcbn1cclxuXHJcbi53ZWxjb21lLWxvZ28ge1xyXG4gIHdpZHRoOiA1NnB4O1xyXG4gIGhlaWdodDogNTZweDtcclxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtbGcpO1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi53ZWxjb21lLXRpdGxlIHtcclxuICBmb250LXNpemU6IGNsYW1wKDI0cHgsIDR2dywgMzJweCk7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBsZXR0ZXItc3BhY2luZzogLTAuMDNlbTtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLndlbGNvbWUtc3ViIHtcclxuICBtYXgtd2lkdGg6IDUyMHB4O1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBjb2xvcjogdmFyKC0tdGV4dC0yKTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNjU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcclxufVxyXG5cclxuLnN1Zy1ncmlkIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbm1heCgwLCAxZnIpKTtcclxuICBnYXA6IDEwcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiA2NDBweDtcclxufVxyXG5cclxuLnN1Zy1jYXJkIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgZ2FwOiA2cHg7XHJcbiAgcGFkZGluZzogMTZweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy1sZyk7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XHJcbiAgY29sb3I6IGluaGVyaXQ7XHJcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10cmFuc2l0aW9uKSwgYm9yZGVyLWNvbG9yIHZhcigtLXRyYW5zaXRpb24pLCB0cmFuc2Zvcm0gdmFyKC0tdHJhbnNpdGlvbik7XHJcbiAgYW5pbWF0aW9uOiBmYWRlVXAgMC40cyBlYXNlIGJvdGg7XHJcblxyXG4gICY6bnRoLWNoaWxkKDEpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjA0czsgfVxyXG4gICY6bnRoLWNoaWxkKDIpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjA4czsgfVxyXG4gICY6bnRoLWNoaWxkKDMpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjEyczsgfVxyXG4gICY6bnRoLWNoaWxkKDQpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjE2czsgfVxyXG4gICY6bnRoLWNoaWxkKDUpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjJzOyB9XHJcbiAgJjpudGgtY2hpbGQoNikgeyBhbmltYXRpb24tZGVsYXk6IDAuMjRzOyB9XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS1ob3Zlcik7XHJcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWJvcmRlci1zdHJvbmcpO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpO1xyXG4gIH1cclxufVxyXG5cclxuLnN1Zy1pY29uIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbn1cclxuXHJcbi5zdWctdGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xyXG59XHJcblxyXG4uc3VnLWRlc2Mge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBjb2xvcjogdmFyKC0tdGV4dC0zKTtcclxuICBsaW5lLWhlaWdodDogMS40NTtcclxufVxyXG5cclxuLyogw6LClMKAw6LClMKAIE1lc3NhZ2VzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgCAqL1xyXG5cclxuLm1lc3NhZ2VzIHtcclxuICBmbGV4OiAxO1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgcGFkZGluZzogMjRweCAwIDhweDtcclxufVxyXG5cclxuLm1zZy13cmFwIHtcclxuICBtYXgtd2lkdGg6IDc2OHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIHBhZGRpbmc6IDAgMjBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAyNHB4O1xyXG59XHJcblxyXG4ubXNnLXJvdyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDE0cHg7XHJcbiAgYW5pbWF0aW9uOiBmYWRlVXAgMC4yOHMgZWFzZSBib3RoO1xyXG5cclxuICAmLmlzLXVzZXIgLm1zZy1ib2R5IHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIH1cclxufVxyXG5cclxuLm1zZy1hdiB7XHJcbiAgd2lkdGg6IDMycHg7XHJcbiAgaGVpZ2h0OiAzMnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZmxleC1zaHJpbms6IDA7XHJcbiAgbWFyZ2luLXRvcDogMnB4O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG5cclxuICAmLmF2LWJvdCB7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlKTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XHJcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50KTtcclxuICB9XHJcblxyXG4gICYuYXYtdXNyIHtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2MzY2ZjEsICM4YjVjZjYpO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgfVxyXG59XHJcblxyXG4ubXNnLWJvZHkge1xyXG4gIGZsZXg6IDE7XHJcbiAgbWluLXdpZHRoOiAwO1xyXG59XHJcblxyXG4ubXNnLW5hbWUge1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xyXG4gIG1hcmdpbi1ib3R0b206IDZweDtcclxufVxyXG5cclxuLm1zZy10ZXh0IHtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNztcclxuICBjb2xvcjogdmFyKC0tdGV4dC0xKTtcclxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XHJcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcclxuXHJcbiAgJi5lcnIge1xyXG4gICAgY29sb3I6IHZhcigtLWRhbmdlcik7XHJcbiAgfVxyXG59XHJcblxyXG4ubXNnLXRpbWUge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbi10b3A6IDhweDtcclxuICBmb250LXNpemU6IDExcHg7XHJcbiAgY29sb3I6IHZhcigtLXRleHQtMyk7XHJcbn1cclxuXHJcbi8qIFRyYW5zYWN0aW9uIGNhcmQgKi9cclxuLnR4LWNhcmQge1xyXG4gIG1hcmdpbi10b3A6IDE0cHg7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyKTtcclxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtbGcpO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgbWF4LXdpZHRoOiA0MjBweDtcclxuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgdmFyKC0tdHJhbnNpdGlvbik7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1ib3JkZXItc3Ryb25nKTtcclxuICB9XHJcbn1cclxuXHJcbi50eC1oZWFkIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGdhcDogOHB4O1xyXG4gIHBhZGRpbmc6IDEwcHggMTRweDtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xyXG59XHJcblxyXG4udHgtdHlwZSB7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgcGFkZGluZzogM3B4IDlweDtcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG5cclxuICAmLnR4LWRlYml0ICAgICB7IGJhY2tncm91bmQ6IHJnYmEoMjM5LCA2OCwgNjgsIDAuMTIpOyAgY29sb3I6ICNmODcxNzE7IH1cclxuICAmLnR4LWNyZWRpdCAgICB7IGJhY2tncm91bmQ6IHJnYmEoMzQsIDE5NywgOTQsIDAuMTIpOyAgIGNvbG9yOiAjNGFkZTgwOyB9XHJcbiAgJi50eC10cmFuc2ZlcnQgeyBiYWNrZ3JvdW5kOiByZ2JhKDE2LCAxNjMsIDEyNywgMC4xMik7IGNvbG9yOiB2YXIoLS1hY2NlbnQpOyB9XHJcbn1cclxuXHJcbi50eC1udW0ge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBmb250LWZhbWlseTogdWktbW9ub3NwYWNlLCAnQ2FzY2FkaWEgQ29kZScsIG1vbm9zcGFjZTtcclxuICBjb2xvcjogdmFyKC0tdGV4dC0yKTtcclxuICBmbGV4OiAxO1xyXG59XHJcblxyXG4udHgtZXRhdCB7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgcGFkZGluZzogMnB4IDhweDtcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcblxyXG4gICYuZS1wYXllICAgIHsgYmFja2dyb3VuZDogcmdiYSgzNCwgMTk3LCA5NCwgMC4xMik7ICBjb2xvcjogIzRhZGU4MDsgfVxyXG4gICYuZS1hdHRlbnRlIHsgYmFja2dyb3VuZDogcmdiYSgyNDUsIDE1OCwgMTEsIDAuMTIpOyBjb2xvcjogI2ZiYmYyNDsgfVxyXG4gICYuZS1hbm51bGUgIHsgYmFja2dyb3VuZDogcmdiYSgyMzksIDY4LCA2OCwgMC4xMik7ICBjb2xvcjogI2Y4NzE3MTsgfVxyXG59XHJcblxyXG4udHgtYm9keSB7XHJcbiAgcGFkZGluZzogMTRweDtcclxufVxyXG5cclxuLnR4LWFtb3VudCB7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IC0wLjAyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLnR4LWRldmlzZSB7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6IHZhcigtLXRleHQtMik7XHJcbiAgbWFyZ2luLWxlZnQ6IDRweDtcclxufVxyXG5cclxuLnR4LW1ldGEge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGdhcDogNnB4O1xyXG59XHJcblxyXG4udHgtdGFnIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgY29sb3I6IHZhcigtLXRleHQtMik7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS1lbGV2KTtcclxuICBwYWRkaW5nOiA0cHggMTBweDtcclxuICBib3JkZXItcmFkaXVzOiA5OTlweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xyXG59XHJcblxyXG4vKiBUeXBpbmcgaW5kaWNhdG9yICovXHJcbi50eXBpbmcge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiA1cHg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nOiA0cHggMDtcclxuXHJcbiAgc3BhbiB7XHJcbiAgICB3aWR0aDogN3B4O1xyXG4gICAgaGVpZ2h0OiA3cHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10ZXh0LTMpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgYW5pbWF0aW9uOiBkb3QtYm91bmNlIDEuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcblxyXG4gICAgJjpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IDAuMTVzOyB9XHJcbiAgICAmOm50aC1jaGlsZCgzKSB7IGFuaW1hdGlvbi1kZWxheTogMC4zczsgfVxyXG4gIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBkb3QtYm91bmNlIHtcclxuICAwJSwgODAlLCAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgwLjcpOyBvcGFjaXR5OiAwLjQ7IH1cclxuICA0MCUgICAgICAgICAgIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgICBvcGFjaXR5OiAxOyAgIH1cclxufVxyXG5cclxuLyogw6LClMKAw6LClMKAIElucHV0IHpvbmUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAICovXHJcblxyXG4uaW5wdXQtem9uZSB7XHJcbiAgcGFkZGluZzogMTJweCAyMHB4IDE2cHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgdmFyKC0tYmcpIDcwJSwgdHJhbnNwYXJlbnQpO1xyXG59XHJcblxyXG4ucXVpY2stcm93IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBnYXA6IDhweDtcclxuICBtYXgtd2lkdGg6IDc2OHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvIDEycHg7XHJcbn1cclxuXHJcbi5xLWNoaXAge1xyXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGNvbG9yOiB2YXIoLS10ZXh0LTIpO1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlcik7XHJcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XHJcbiAgcGFkZGluZzogN3B4IDE0cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgdmFyKC0tdHJhbnNpdGlvbiksIGNvbG9yIHZhcigtLXRyYW5zaXRpb24pLCBib3JkZXItY29sb3IgdmFyKC0tdHJhbnNpdGlvbik7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuXHJcbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLWhvdmVyKTtcclxuICAgIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1ib3JkZXItc3Ryb25nKTtcclxuICB9XHJcblxyXG4gICY6ZGlzYWJsZWQge1xyXG4gICAgb3BhY2l0eTogMC41O1xyXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxuICB9XHJcbn1cclxuXHJcbi5pbnB1dC1ib3gge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIGdhcDogOHB4O1xyXG4gIG1heC13aWR0aDogNzY4cHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcGFkZGluZzogMTBweCAxMnB4IDEwcHggMTZweDtcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy14bCk7XHJcbiAgYm94LXNoYWRvdzogdmFyKC0tc2hhZG93LXNtKTtcclxuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgdmFyKC0tdHJhbnNpdGlvbiksIGJveC1zaGFkb3cgdmFyKC0tdHJhbnNpdGlvbik7XHJcblxyXG4gICYuZm9jdXMge1xyXG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDE2LCAxNjMsIDEyNywgMC40NSk7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggdmFyKC0tYWNjZW50LXNvZnQpO1xyXG4gIH1cclxufVxyXG5cclxudGV4dGFyZWEge1xyXG4gIGZsZXg6IDE7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgY29sb3I6IHZhcigtLXRleHQtMSk7XHJcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjU1O1xyXG4gIHJlc2l6ZTogbm9uZTtcclxuICBtYXgtaGVpZ2h0OiAxODBweDtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIHBhZGRpbmc6IDRweCAwO1xyXG5cclxuICAmOjpwbGFjZWhvbGRlciB7XHJcbiAgICBjb2xvcjogdmFyKC0tdGV4dC0zKTtcclxuICB9XHJcblxyXG4gICY6ZGlzYWJsZWQge1xyXG4gICAgb3BhY2l0eTogMC41NTtcclxuICB9XHJcbn1cclxuXHJcbi5zZW5kLWJ0biB7XHJcbiAgd2lkdGg6IDM2cHg7XHJcbiAgaGVpZ2h0OiAzNnB4O1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS1lbGV2KTtcclxuICBjb2xvcjogdmFyKC0tdGV4dC0zKTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZsZXgtc2hyaW5rOiAwO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgdmFyKC0tdHJhbnNpdGlvbiksIGNvbG9yIHZhcigtLXRyYW5zaXRpb24pLCB0cmFuc2Zvcm0gMC4xMnMgZWFzZTtcclxuXHJcbiAgJi5yZWFkeSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQpO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcblxyXG4gICAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XHJcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1ob3Zlcik7XHJcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wNCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmOmRpc2FibGVkIHtcclxuICAgIG9wYWNpdHk6IDAuNDU7XHJcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xyXG4gICAgdHJhbnNmb3JtOiBub25lO1xyXG4gIH1cclxufVxyXG5cclxuLnNwaW5uZXIge1xyXG4gIHdpZHRoOiAxNnB4O1xyXG4gIGhlaWdodDogMTZweDtcclxuICBib3JkZXI6IDJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpO1xyXG4gIGJvcmRlci10b3AtY29sb3I6ICNmZmY7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGFuaW1hdGlvbjogc3BpbiAwLjdzIGxpbmVhciBpbmZpbml0ZTtcclxufVxyXG5cclxuQGtleWZyYW1lcyBzcGluIHtcclxuICB0byB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cclxufVxyXG5cclxuLmlucHV0LWhpbnQge1xyXG4gIG1heC13aWR0aDogNzY4cHg7XHJcbiAgbWFyZ2luOiAxMHB4IGF1dG8gMDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIGNvbG9yOiB2YXIoLS10ZXh0LTMpO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbn1cclxuXHJcbi8qIMOiwpTCgMOiwpTCgCBTaWRlYmFyIGNvbGxhcHNlIChkZXNrdG9wKSDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoAgKi9cclxuXHJcbi5zaGVsbDpub3QoLnNpZGViYXItb3BlbikgLnNpZGViYXIge1xyXG4gIHdpZHRoOiAwO1xyXG4gIGJvcmRlci1yaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLyogw6LClMKAw6LClMKAIFJlc3BvbnNpdmUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAICovXHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAuc2lkZWJhciB7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XHJcbiAgICBib3gtc2hhZG93OiB2YXIoLS1zaGFkb3ctbWQpO1xyXG4gIH1cclxuXHJcbiAgLnNoZWxsLnNpZGViYXItb3BlbiAuc2lkZWJhciB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XHJcbiAgfVxyXG5cclxuICAuc2hlbGwuc2lkZWJhci1vcGVuIC5zaWRlYmFyLWJhY2tkcm9wIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgaW5zZXQ6IDA7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNTUpO1xyXG4gICAgei1pbmRleDogMzA7XHJcbiAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnB4KTtcclxuICB9XHJcblxyXG4gIC5zaWRlYmFyLWNsb3NlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgfVxyXG5cclxuICAuc2hlbGw6bm90KC5zaWRlYmFyLW9wZW4pIC5zaWRlYmFyIHtcclxuICAgIHdpZHRoOiB2YXIoLS1zaWRlYmFyLXcpO1xyXG4gIH1cclxuXHJcbiAgLnN1Zy1ncmlkIHtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xyXG4gIH1cclxuXHJcbiAgLm1zZy13cmFwIHtcclxuICAgIHBhZGRpbmc6IDAgMTRweDtcclxuICB9XHJcblxyXG4gIC5pbnB1dC16b25lIHtcclxuICAgIHBhZGRpbmc6IDEwcHggMTRweCAxNHB4O1xyXG4gIH1cclxuXHJcbiAgLndlbGNvbWUge1xyXG4gICAgcGFkZGluZzogMjRweCAxNnB4IDEycHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogNzY5cHgpIHtcclxuICAuc2lkZWJhci1iYWNrZHJvcCB7XHJcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 4587:
/*!*******************************************!*\
  !*** ./src/app/services/agent.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AgentService: () => (/* binding */ AgentService)
/* harmony export */ });
/* harmony import */ var C_Users_Mega_PC_Desktop_antigravity_pfe_docs_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 6196);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);






class AgentService {
  constructor(http) {
    this.http = http;
    this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl;
  }
  // Génère un identifiant de session unique par conversation
  generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
  }
  // Détecte la langue du message (FR, EN, AR, dialecte tunisien)
  detectLanguage(message) {
    // Caractères arabes
    if (/[\u0600-\u06FF]/.test(message)) {
      return message.includes('شنية') || message.includes('متاعك') ? 'ar_TN' : 'ar';
    }
    // Détection basique de l'anglais
    if (message.toLowerCase().match(/\b(paid|received|transfer|invoice|balance)\b/i)) {
      return 'en';
    }
    // Français par défaut
    return 'fr';
  }
  // Envoie un message à l'agent et retourne sa réponse
  // L'agent détecte automatiquement le type de transaction (débit/crédit/transfert)
  sendMessage(message, sessionId) {
    var _this = this;
    return (0,C_Users_Mega_PC_Desktop_antigravity_pfe_docs_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const language = _this.detectLanguage(message);
      const body = {
        message,
        session_id: sessionId,
        language // Passe la langue détectée au backend
      };
      const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        'Content-Type': 'application/json'
      });
      try {
        const response = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.firstValueFrom)(_this.http.post(`${_this.apiUrl}/chat`, body, {
          headers
        }));
        // Assurez-vous que la réponse est un succès
        if (!response.success) {
          throw new Error(response.response || 'Erreur du serveur');
        }
        return response;
      } catch (error) {
        if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpErrorResponse) {
          switch (error.status) {
            case 0:
              throw new Error('🔌 Serveur inaccessible. Assurez-vous que le backend DWEXO tourne sur le port 8000.');
            case 401:
              throw new Error('🔐 Non autorisé. Vérifiez vos identifiants.');
            case 422:
              throw new Error('⚠️ Données invalides. Vérifiez votre requête.');
            case 500:
              throw new Error('💥 Erreur serveur. Réessayez plus tard.');
            default:
              throw new Error(`❌ Erreur ${error.status} : ${error.message}`);
          }
        }
        throw error;
      }
    })();
  }
  // Récupère l'historique d'une session (pour rechargement de page)
  getSessionHistory(sessionId) {
    var _this2 = this;
    return (0,C_Users_Mega_PC_Desktop_antigravity_pfe_docs_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.firstValueFrom)(_this2.http.get(`${_this2.apiUrl}/sessions/${sessionId}`));
        return res.history;
      } catch {
        return [];
      }
    })();
  }
  static {
    this.ɵfac = function AgentService_Factory(t) {
      return new (t || AgentService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: AgentService,
      factory: AgentService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  apiUrl: 'http://localhost:8000'
};

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.component */ 92);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);



(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, {
  providers: [(0,_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.provideHttpClient)()]
}).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map