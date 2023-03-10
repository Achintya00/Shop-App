'use strict';
(self.webpackChunkshop_app = self.webpackChunkshop_app || []).push([
  [179],
  {
    101: (Je, oe, F) => {
      var E = F(895),
        d = F(650);
      class ne extends E.w_ {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class te extends ne {
        static makeCurrent() {
          (0, E.HT)(new te());
        }
        onAndCancel(t, e, o) {
          return (
            t.addEventListener(e, o, !1),
            () => {
              t.removeEventListener(e, o, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return 'window' === e
            ? window
            : 'document' === e
            ? t
            : 'body' === e
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const e = (function J() {
            return (
              (K = K || document.querySelector('base')),
              K ? K.getAttribute('href') : null
            );
          })();
          return null == e
            ? null
            : (function fe(r) {
                (ue = ue || document.createElement('a')),
                  ue.setAttribute('href', r);
                const t = ue.pathname;
                return '/' === t.charAt(0) ? t : `/${t}`;
              })(e);
        }
        resetBaseElement() {
          K = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (0, E.Mx)(document.cookie, t);
        }
      }
      let ue,
        K = null;
      const ye = new d.OlP('TRANSITION_ID'),
        j = [
          {
            provide: d.ip1,
            useFactory: function q(r, t, e) {
              return () => {
                e.get(d.CZH).donePromise.then(() => {
                  const o = (0, E.q)(),
                    l = t.querySelectorAll(`style[ng-transition="${r}"]`);
                  for (let f = 0; f < l.length; f++) o.remove(l[f]);
                });
              };
            },
            deps: [ye, E.K0, d.zs3],
            multi: !0,
          },
        ];
      let Ge = (() => {
        class r {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)();
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      const he = new d.OlP('EventManagerPlugins');
      let Te = (() => {
        class r {
          constructor(e, o) {
            (this._zone = o),
              (this._eventNameToPlugin = new Map()),
              e.forEach((l) => (l.manager = this)),
              (this._plugins = e.slice().reverse());
          }
          addEventListener(e, o, l) {
            return this._findPluginFor(o).addEventListener(e, o, l);
          }
          addGlobalEventListener(e, o, l) {
            return this._findPluginFor(o).addGlobalEventListener(e, o, l);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(e) {
            const o = this._eventNameToPlugin.get(e);
            if (o) return o;
            const l = this._plugins;
            for (let f = 0; f < l.length; f++) {
              const p = l[f];
              if (p.supports(e)) return this._eventNameToPlugin.set(e, p), p;
            }
            throw new Error(`No event manager plugin found for event ${e}`);
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(he), d.LFG(d.R0b));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      class it {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, o) {
          const l = (0, E.q)().getGlobalEventTarget(this._doc, t);
          if (!l)
            throw new Error(`Unsupported event target ${l} for event ${e}`);
          return this.addEventListener(l, e, o);
        }
      }
      let Y = (() => {
          class r {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(e) {
              const o = new Set();
              e.forEach((l) => {
                this._stylesSet.has(l) || (this._stylesSet.add(l), o.add(l));
              }),
                this.onStylesAdded(o);
            }
            onStylesAdded(e) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
            r
          );
        })(),
        Qe = (() => {
          class r extends Y {
            constructor(e) {
              super(),
                (this._doc = e),
                (this._hostNodes = new Map()),
                this._hostNodes.set(e.head, []);
            }
            _addStylesToHost(e, o, l) {
              e.forEach((f) => {
                const p = this._doc.createElement('style');
                (p.textContent = f), l.push(o.appendChild(p));
              });
            }
            addHost(e) {
              const o = [];
              this._addStylesToHost(this._stylesSet, e, o),
                this._hostNodes.set(e, o);
            }
            removeHost(e) {
              const o = this._hostNodes.get(e);
              o && o.forEach(me), this._hostNodes.delete(e);
            }
            onStylesAdded(e) {
              this._hostNodes.forEach((o, l) => {
                this._addStylesToHost(e, l, o);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((e) => e.forEach(me));
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.LFG(E.K0));
            }),
            (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
            r
          );
        })();
      function me(r) {
        (0, E.q)().remove(r);
      }
      const Fe = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        pe = /%COMP%/g;
      function Ne(r, t) {
        return t.flat(100).map((e) => e.replace(pe, r));
      }
      function xe(r) {
        return (t) => {
          if ('__ngUnwrap__' === t) return r;
          !1 === r(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let lt = (() => {
        class r {
          constructor(e, o, l) {
            (this.eventManager = e),
              (this.sharedStylesHost = o),
              (this.appId = l),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Ee(e));
          }
          createRenderer(e, o) {
            if (!e || !o) return this.defaultRenderer;
            switch (o.encapsulation) {
              case d.ifc.Emulated: {
                let l = this.rendererByCompId.get(o.id);
                return (
                  l ||
                    ((l = new G(
                      this.eventManager,
                      this.sharedStylesHost,
                      o,
                      this.appId
                    )),
                    this.rendererByCompId.set(o.id, l)),
                  l.applyToHost(e),
                  l
                );
              }
              case d.ifc.ShadowDom:
                return new re(this.eventManager, this.sharedStylesHost, e, o);
              default:
                if (!this.rendererByCompId.has(o.id)) {
                  const l = Ne(o.id, o.styles);
                  this.sharedStylesHost.addStyles(l),
                    this.rendererByCompId.set(o.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(Te), d.LFG(Qe), d.LFG(d.AFp));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      class Ee {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(Fe[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          ($(t) ? t.content : t).appendChild(e);
        }
        insertBefore(t, e, o) {
          t && ($(t) ? t.content : t).insertBefore(e, o);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let o = 'string' == typeof t ? document.querySelector(t) : t;
          if (!o)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (o.textContent = ''), o;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, o, l) {
          if (l) {
            e = l + ':' + e;
            const f = Fe[l];
            f ? t.setAttributeNS(f, e, o) : t.setAttribute(e, o);
          } else t.setAttribute(e, o);
        }
        removeAttribute(t, e, o) {
          if (o) {
            const l = Fe[o];
            l ? t.removeAttributeNS(l, e) : t.removeAttribute(`${o}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, o, l) {
          l & (d.JOm.DashCase | d.JOm.Important)
            ? t.style.setProperty(e, o, l & d.JOm.Important ? 'important' : '')
            : (t.style[e] = o);
        }
        removeStyle(t, e, o) {
          o & d.JOm.DashCase ? t.style.removeProperty(e) : (t.style[e] = '');
        }
        setProperty(t, e, o) {
          t[e] = o;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, o) {
          return 'string' == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, xe(o))
            : this.eventManager.addEventListener(t, e, xe(o));
        }
      }
      function $(r) {
        return 'TEMPLATE' === r.tagName && void 0 !== r.content;
      }
      class G extends Ee {
        constructor(t, e, o, l) {
          super(t), (this.component = o);
          const f = Ne(l + '-' + o.id, o.styles);
          e.addStyles(f),
            (this.contentAttr = (function ge(r) {
              return '_ngcontent-%COMP%'.replace(pe, r);
            })(l + '-' + o.id)),
            (this.hostAttr = (function He(r) {
              return '_nghost-%COMP%'.replace(pe, r);
            })(l + '-' + o.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, '');
        }
        createElement(t, e) {
          const o = super.createElement(t, e);
          return super.setAttribute(o, this.contentAttr, ''), o;
        }
      }
      class re extends Ee {
        constructor(t, e, o, l) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = o),
            (this.shadowRoot = o.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const f = Ne(l.id, l.styles);
          for (let p = 0; p < f.length; p++) {
            const y = document.createElement('style');
            (y.textContent = f[p]), this.shadowRoot.appendChild(y);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, o) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, o);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let ee = (() => {
        class r extends it {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return !0;
          }
          addEventListener(e, o, l) {
            return (
              e.addEventListener(o, l, !1),
              () => this.removeEventListener(e, o, l)
            );
          }
          removeEventListener(e, o, l) {
            return e.removeEventListener(o, l);
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(E.K0));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      const De = ['alt', 'control', 'meta', 'shift'],
        ve = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        Kt = {
          alt: (r) => r.altKey,
          control: (r) => r.ctrlKey,
          meta: (r) => r.metaKey,
          shift: (r) => r.shiftKey,
        };
      let ke = (() => {
        class r extends it {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return null != r.parseEventName(e);
          }
          addEventListener(e, o, l) {
            const f = r.parseEventName(o),
              p = r.eventCallback(f.fullKey, l, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() =>
                (0, E.q)().onAndCancel(e, f.domEventName, p)
              );
          }
          static parseEventName(e) {
            const o = e.toLowerCase().split('.'),
              l = o.shift();
            if (0 === o.length || ('keydown' !== l && 'keyup' !== l))
              return null;
            const f = r._normalizeKey(o.pop());
            let p = '',
              y = o.indexOf('code');
            if (
              (y > -1 && (o.splice(y, 1), (p = 'code.')),
              De.forEach((S) => {
                const R = o.indexOf(S);
                R > -1 && (o.splice(R, 1), (p += S + '.'));
              }),
              (p += f),
              0 != o.length || 0 === f.length)
            )
              return null;
            const D = {};
            return (D.domEventName = l), (D.fullKey = p), D;
          }
          static matchEventFullKeyCode(e, o) {
            let l = ve[e.key] || e.key,
              f = '';
            return (
              o.indexOf('code.') > -1 && ((l = e.code), (f = 'code.')),
              !(null == l || !l) &&
                ((l = l.toLowerCase()),
                ' ' === l ? (l = 'space') : '.' === l && (l = 'dot'),
                De.forEach((p) => {
                  p !== l && (0, Kt[p])(e) && (f += p + '.');
                }),
                (f += l),
                f === o)
            );
          }
          static eventCallback(e, o, l) {
            return (f) => {
              r.matchEventFullKeyCode(f, e) && l.runGuarded(() => o(f));
            };
          }
          static _normalizeKey(e) {
            return 'esc' === e ? 'escape' : e;
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(E.K0));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      const Cl = (0, d.eFA)(d._c5, 'browser', [
          { provide: d.Lbi, useValue: E.bD },
          {
            provide: d.g9A,
            useValue: function Jn() {
              te.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: E.K0,
            useFactory: function Ai() {
              return (0, d.RDi)(document), document;
            },
            deps: [],
          },
        ]),
        Ur = new d.OlP(''),
        Ws = [
          {
            provide: d.rWj,
            useClass: class L {
              addToWindow(t) {
                (d.dqk.getAngularTestability = (o, l = !0) => {
                  const f = t.findTestabilityInTree(o, l);
                  if (null == f)
                    throw new Error('Could not find testability for element.');
                  return f;
                }),
                  (d.dqk.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (d.dqk.getAllAngularRootElements = () =>
                    t.getAllRootElements()),
                  d.dqk.frameworkStabilizers ||
                    (d.dqk.frameworkStabilizers = []),
                  d.dqk.frameworkStabilizers.push((o) => {
                    const l = d.dqk.getAllAngularTestabilities();
                    let f = l.length,
                      p = !1;
                    const y = function (D) {
                      (p = p || D), f--, 0 == f && o(p);
                    };
                    l.forEach(function (D) {
                      D.whenStable(y);
                    });
                  });
              }
              findTestabilityInTree(t, e, o) {
                return null == e
                  ? null
                  : t.getTestability(e) ??
                      (o
                        ? (0, E.q)().isShadowRoot(e)
                          ? this.findTestabilityInTree(t, e.host, !0)
                          : this.findTestabilityInTree(t, e.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: d.lri, useClass: d.dDg, deps: [d.R0b, d.eoX, d.rWj] },
          { provide: d.dDg, useClass: d.dDg, deps: [d.R0b, d.eoX, d.rWj] },
        ],
        an = [
          { provide: d.zSh, useValue: 'root' },
          {
            provide: d.qLn,
            useFactory: function qn() {
              return new d.qLn();
            },
            deps: [],
          },
          { provide: he, useClass: ee, multi: !0, deps: [E.K0, d.R0b, d.Lbi] },
          { provide: he, useClass: ke, multi: !0, deps: [E.K0] },
          { provide: lt, useClass: lt, deps: [Te, Qe, d.AFp] },
          { provide: d.FYo, useExisting: lt },
          { provide: Y, useExisting: Qe },
          { provide: Qe, useClass: Qe, deps: [E.K0] },
          { provide: Te, useClass: Te, deps: [he, d.R0b] },
          { provide: E.JF, useClass: Ge, deps: [] },
          [],
        ];
      let Po = (() => {
          class r {
            constructor(e) {}
            static withServerTransition(e) {
              return {
                ngModule: r,
                providers: [
                  { provide: d.AFp, useValue: e.appId },
                  { provide: ye, useExisting: d.AFp },
                  j,
                ],
              };
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.LFG(Ur, 12));
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({
              providers: [...an, ...Ws],
              imports: [E.ez, d.hGG],
            })),
            r
          );
        })(),
        Ti = (() => {
          class r {
            constructor(e) {
              this._doc = e;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(e) {
              this._doc.title = e || '';
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.LFG(E.K0));
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: function (e) {
                let o = null;
                return (
                  (o = e
                    ? new e()
                    : (function yn() {
                        return new Ti((0, d.LFG)(E.K0));
                      })()),
                  o
                );
              },
              providedIn: 'root',
            })),
            r
          );
        })();
      typeof window < 'u' && window;
      let Sl = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: function (e) {
                let o = null;
                return (o = e ? new (e || r)() : d.LFG(Nn)), o;
              },
              providedIn: 'root',
            })),
            r
          );
        })(),
        Nn = (() => {
          class r extends Sl {
            constructor(e) {
              super(), (this._doc = e);
            }
            sanitize(e, o) {
              if (null == o) return null;
              switch (e) {
                case d.q3G.NONE:
                  return o;
                case d.q3G.HTML:
                  return (0, d.qzn)(o, 'HTML')
                    ? (0, d.z3N)(o)
                    : (0, d.EiD)(this._doc, String(o)).toString();
                case d.q3G.STYLE:
                  return (0, d.qzn)(o, 'Style') ? (0, d.z3N)(o) : o;
                case d.q3G.SCRIPT:
                  if ((0, d.qzn)(o, 'Script')) return (0, d.z3N)(o);
                  throw new Error('unsafe value used in a script context');
                case d.q3G.URL:
                  return (0, d.qzn)(o, 'URL')
                    ? (0, d.z3N)(o)
                    : (0, d.mCW)(String(o));
                case d.q3G.RESOURCE_URL:
                  if ((0, d.qzn)(o, 'ResourceURL')) return (0, d.z3N)(o);
                  throw new Error(
                    `unsafe value used in a resource URL context (see ${d.JZr})`
                  );
                default:
                  throw new Error(
                    `Unexpected SecurityContext ${e} (see ${d.JZr})`
                  );
              }
            }
            bypassSecurityTrustHtml(e) {
              return (0, d.JVY)(e);
            }
            bypassSecurityTrustStyle(e) {
              return (0, d.L6k)(e);
            }
            bypassSecurityTrustScript(e) {
              return (0, d.eBb)(e);
            }
            bypassSecurityTrustUrl(e) {
              return (0, d.LAX)(e);
            }
            bypassSecurityTrustResourceUrl(e) {
              return (0, d.pB0)(e);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.LFG(E.K0));
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: function (e) {
                let o = null;
                return (
                  (o = e
                    ? new e()
                    : (function Dh(r) {
                        return new Nn(r.get(E.K0));
                      })(d.LFG(d.zs3))),
                  o
                );
              },
              providedIn: 'root',
            })),
            r
          );
        })();
      var Ie = F(76),
        en = F(751);
      const { isArray: Oi } = Array,
        { getPrototypeOf: Ks, prototype: Al, keys: kn } = Object;
      function Pi(r) {
        if (1 === r.length) {
          const t = r[0];
          if (Oi(t)) return { args: t, keys: null };
          if (
            (function gd(r) {
              return r && 'object' == typeof r && Ks(r) === Al;
            })(t)
          ) {
            const e = kn(t);
            return { args: e.map((o) => t[o]), keys: e };
          }
        }
        return { args: r, keys: null };
      }
      var ei = F(421),
        rr = F(669),
        Nt = F(403),
        Pe = F(4);
      const { isArray: $r } = Array;
      function Qs(r) {
        return (0, Pe.U)((t) =>
          (function _d(r, t) {
            return $r(t) ? r(...t) : r(t);
          })(r, t)
        );
      }
      function Xs(r, t) {
        return r.reduce((e, o, l) => ((e[o] = t[l]), e), {});
      }
      function zr(...r) {
        const t = (0, rr.jO)(r),
          { args: e, keys: o } = Pi(r),
          l = new en.y((f) => {
            const { length: p } = e;
            if (!p) return void f.complete();
            const y = new Array(p);
            let D = p,
              S = p;
            for (let R = 0; R < p; R++) {
              let B = !1;
              (0, ei.Xf)(e[R]).subscribe(
                (0, Nt.x)(
                  f,
                  (ae) => {
                    B || ((B = !0), S--), (y[R] = ae);
                  },
                  () => D--,
                  void 0,
                  () => {
                    (!D || !B) && (S || f.next(o ? Xs(o, y) : y), f.complete());
                  }
                )
              );
            }
          });
        return t ? l.pipe(Qs(t)) : l;
      }
      let rt = (() => {
          class r {
            constructor(e, o) {
              (this._renderer = e),
                (this._elementRef = o),
                (this.onChange = (l) => {}),
                (this.onTouched = () => {});
            }
            setProperty(e, o) {
              this._renderer.setProperty(this._elementRef.nativeElement, e, o);
            }
            registerOnTouched(e) {
              this.onTouched = e;
            }
            registerOnChange(e) {
              this.onChange = e;
            }
            setDisabledState(e) {
              this.setProperty('disabled', e);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.Y36(d.Qsj), d.Y36(d.SBq));
            }),
            (r.??dir = d.lG2({ type: r })),
            r
          );
        })(),
        Dt = (() => {
          class r extends rt {}
          return (
            (r.??fac = (function () {
              let t;
              return function (o) {
                return (t || (t = d.n5z(r)))(o || r);
              };
            })()),
            (r.??dir = d.lG2({ type: r, features: [d.qOj] })),
            r
          );
        })();
      const _t = new d.OlP('NgValueAccessor'),
        Ln = { provide: _t, useExisting: (0, d.Gpc)(() => mt), multi: !0 },
        qe = new d.OlP('CompositionEventMode');
      let mt = (() => {
        class r extends rt {
          constructor(e, o, l) {
            super(e, o),
              (this._compositionMode = l),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function de() {
                  const r = (0, E.q)() ? (0, E.q)().getUserAgent() : '';
                  return /android (\d+)/.test(r.toLowerCase());
                })());
          }
          writeValue(e) {
            this.setProperty('value', e ?? '');
          }
          _handleInput(e) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(e);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(e) {
            (this._composing = !1), this._compositionMode && this.onChange(e);
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.Y36(d.Qsj), d.Y36(d.SBq), d.Y36(qe, 8));
          }),
          (r.??dir = d.lG2({
            type: r,
            selectors: [
              ['input', 'formControlName', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControlName', ''],
              ['input', 'formControl', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControl', ''],
              ['input', 'ngModel', '', 3, 'type', 'checkbox'],
              ['textarea', 'ngModel', ''],
              ['', 'ngDefaultControl', ''],
            ],
            hostBindings: function (e, o) {
              1 & e &&
                d.NdJ('input', function (f) {
                  return o._handleInput(f.target.value);
                })('blur', function () {
                  return o.onTouched();
                })('compositionstart', function () {
                  return o._compositionStart();
                })('compositionend', function (f) {
                  return o._compositionEnd(f.target.value);
                });
            },
            features: [d._Bn([Ln]), d.qOj],
          })),
          r
        );
      })();
      function tn(r) {
        return (
          null == r ||
          (('string' == typeof r || Array.isArray(r)) && 0 === r.length)
        );
      }
      function $t(r) {
        return null != r && 'number' == typeof r.length;
      }
      const vt = new d.OlP('NgValidators'),
        dt = new d.OlP('NgAsyncValidators'),
        Lo =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class qr {
        static min(t) {
          return We(t);
        }
        static max(t) {
          return Wr(t);
        }
        static required(t) {
          return pi(t);
        }
        static requiredTrue(t) {
          return (function or(r) {
            return !0 === r.value ? null : { required: !0 };
          })(t);
        }
        static email(t) {
          return (function mi(r) {
            return tn(r.value) || Lo.test(r.value) ? null : { email: !0 };
          })(t);
        }
        static minLength(t) {
          return zt(t);
        }
        static maxLength(t) {
          return Yr(t);
        }
        static pattern(t) {
          return (function gi(r) {
            if (!r) return mn;
            let t, e;
            return (
              'string' == typeof r
                ? ((e = ''),
                  '^' !== r.charAt(0) && (e += '^'),
                  (e += r),
                  '$' !== r.charAt(r.length - 1) && (e += '$'),
                  (t = new RegExp(e)))
                : ((e = r.toString()), (t = r)),
              (o) => {
                if (tn(o.value)) return null;
                const l = o.value;
                return t.test(l)
                  ? null
                  : { pattern: { requiredPattern: e, actualValue: l } };
              }
            );
          })(t);
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          return Zr(t);
        }
        static composeAsync(t) {
          return Ni(t);
        }
      }
      function We(r) {
        return (t) => {
          if (tn(t.value) || tn(r)) return null;
          const e = parseFloat(t.value);
          return !isNaN(e) && e < r
            ? { min: { min: r, actual: t.value } }
            : null;
        };
      }
      function Wr(r) {
        return (t) => {
          if (tn(t.value) || tn(r)) return null;
          const e = parseFloat(t.value);
          return !isNaN(e) && e > r
            ? { max: { max: r, actual: t.value } }
            : null;
        };
      }
      function pi(r) {
        return tn(r.value) ? { required: !0 } : null;
      }
      function zt(r) {
        return (t) =>
          tn(t.value) || !$t(t.value)
            ? null
            : t.value.length < r
            ? { minlength: { requiredLength: r, actualLength: t.value.length } }
            : null;
      }
      function Yr(r) {
        return (t) =>
          $t(t.value) && t.value.length > r
            ? { maxlength: { requiredLength: r, actualLength: t.value.length } }
            : null;
      }
      function mn(r) {
        return null;
      }
      function sr(r) {
        return null != r;
      }
      function Vo(r) {
        return (0, d.QGY)(r) ? (0, Ie.D)(r) : r;
      }
      function bt(r) {
        let t = {};
        return (
          r.forEach((e) => {
            t = null != e ? { ...t, ...e } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function Vn(r, t) {
        return t.map((e) => e(r));
      }
      function ea(r) {
        return r.map((t) =>
          (function Js(r) {
            return !r.validate;
          })(t)
            ? t
            : (e) => t.validate(e)
        );
      }
      function Zr(r) {
        if (!r) return null;
        const t = r.filter(sr);
        return 0 == t.length
          ? null
          : function (e) {
              return bt(Vn(e, t));
            };
      }
      function ar(r) {
        return null != r ? Zr(ea(r)) : null;
      }
      function Ni(r) {
        if (!r) return null;
        const t = r.filter(sr);
        return 0 == t.length
          ? null
          : function (e) {
              return zr(Vn(e, t).map(Vo)).pipe((0, Pe.U)(bt));
            };
      }
      function Gt(r) {
        return null != r ? Ni(ea(r)) : null;
      }
      function bd(r, t) {
        return null === r ? [t] : Array.isArray(r) ? [...r, t] : [r, t];
      }
      function cn(r) {
        return r._rawValidators;
      }
      function wn(r) {
        return r._rawAsyncValidators;
      }
      function Kr(r) {
        return r ? (Array.isArray(r) ? r : [r]) : [];
      }
      function _i(r, t) {
        return Array.isArray(r) ? r.includes(t) : r === t;
      }
      function Qr(r, t) {
        const e = Kr(t);
        return (
          Kr(r).forEach((l) => {
            _i(e, l) || e.push(l);
          }),
          e
        );
      }
      function Dn(r, t) {
        return Kr(t).filter((e) => !_i(r, e));
      }
      class Tl {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = ar(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = Gt(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, e) {
          return !!this.control && this.control.hasError(t, e);
        }
        getError(t, e) {
          return this.control ? this.control.getError(t, e) : null;
        }
      }
      class dn extends Tl {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class ti extends Tl {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class Il {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let ta = (() => {
          class r extends Il {
            constructor(e) {
              super(e);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.Y36(ti, 2));
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['', 'formControlName', ''],
                ['', 'ngModel', ''],
                ['', 'formControl', ''],
              ],
              hostVars: 14,
              hostBindings: function (e, o) {
                2 & e &&
                  d.ekj('ng-untouched', o.isUntouched)(
                    'ng-touched',
                    o.isTouched
                  )('ng-pristine', o.isPristine)('ng-dirty', o.isDirty)(
                    'ng-valid',
                    o.isValid
                  )('ng-invalid', o.isInvalid)('ng-pending', o.isPending);
              },
              features: [d.qOj],
            })),
            r
          );
        })(),
        Fl = (() => {
          class r extends Il {
            constructor(e) {
              super(e);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.Y36(dn, 10));
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['', 'formGroupName', ''],
                ['', 'formArrayName', ''],
                ['', 'ngModelGroup', ''],
                ['', 'formGroup', ''],
                ['form', 3, 'ngNoForm', ''],
                ['', 'ngForm', ''],
              ],
              hostVars: 16,
              hostBindings: function (e, o) {
                2 & e &&
                  d.ekj('ng-untouched', o.isUntouched)(
                    'ng-touched',
                    o.isTouched
                  )('ng-pristine', o.isPristine)('ng-dirty', o.isDirty)(
                    'ng-valid',
                    o.isValid
                  )('ng-invalid', o.isInvalid)('ng-pending', o.isPending)(
                    'ng-submitted',
                    o.isSubmitted
                  );
              },
              features: [d.qOj],
            })),
            r
          );
        })();
      const lr = 'VALID',
        Xr = 'INVALID',
        cr = 'PENDING',
        Jr = 'DISABLED';
      function Uo(r) {
        return (eo(r) ? r.validators : r) || null;
      }
      function gn(r, t) {
        return (eo(t) ? t.asyncValidators : r) || null;
      }
      function eo(r) {
        return null != r && !Array.isArray(r) && 'object' == typeof r;
      }
      class to {
        constructor(t, e) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(e);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === lr;
        }
        get invalid() {
          return this.status === Xr;
        }
        get pending() {
          return this.status == cr;
        }
        get disabled() {
          return this.status === Jr;
        }
        get enabled() {
          return this.status !== Jr;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : 'change';
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(Qr(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(Qr(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(Dn(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(Dn(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return _i(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return _i(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((e) => {
              e.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((e) => {
              e.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = cr),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = Jr),
            (this.errors = null),
            this._forEachChild((o) => {
              o.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: e }),
            this._onDisabledChange.forEach((o) => o(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = lr),
            this._forEachChild((o) => {
              o.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: e }),
            this._onDisabledChange.forEach((o) => o(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === lr || this.status === cr) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((e) => e._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Jr : lr;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = cr), (this._hasOwnPendingAsyncValidator = !0);
            const e = Vo(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe((o) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(o, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          let e = t;
          return null == e ||
            (Array.isArray(e) || (e = e.split('.')), 0 === e.length)
            ? null
            : e.reduce((o, l) => o && o._find(l), this);
        }
        getError(t, e) {
          const o = e ? this.get(e) : this;
          return o && o.errors ? o.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new d.vpe()), (this.statusChanges = new d.vpe());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Jr
            : this.errors
            ? Xr
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(cr)
            ? cr
            : this._anyControlsHaveStatus(Xr)
            ? Xr
            : lr;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((e) => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          eo(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function ia(r) {
              return Array.isArray(r) ? ar(r) : r || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function kl(r) {
              return Array.isArray(r) ? Gt(r) : r || null;
            })(this._rawAsyncValidators));
        }
      }
      class Ut extends to {
        constructor(t, e, o) {
          super(Uo(e), gn(o, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e),
              e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange),
              e);
        }
        addControl(t, e, o = {}) {
          this.registerControl(t, e),
            this.updateValueAndValidity({ emitEvent: o.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, e = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: e.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, e, o = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity({ emitEvent: o.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          (function jo(r, t, e) {
            r._forEachChild((o, l) => {
              if (void 0 === e[l]) throw new d.vHH(1002, '');
            });
          })(this, 0, t),
            Object.keys(t).forEach((o) => {
              (function Ht(r, t, e) {
                const o = r.controls;
                if (!(t ? Object.keys(o) : o).length) throw new d.vHH(1e3, '');
                if (!o[e]) throw new d.vHH(1001, '');
              })(this, !0, o),
                this.controls[o].setValue(t[o], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          null != t &&
            (Object.keys(t).forEach((o) => {
              const l = this.controls[o];
              l && l.patchValue(t[o], { onlySelf: !0, emitEvent: e.emitEvent });
            }),
            this.updateValueAndValidity(e));
        }
        reset(t = {}, e = {}) {
          this._forEachChild((o, l) => {
            o.reset(t[l], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, e, o) => ((t[o] = e.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (e, o) => !!o._syncPendingControls() || e
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((e) => {
            const o = this.controls[e];
            o && t(o, e);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [e, o] of Object.entries(this.controls))
            if (this.contains(e) && t(o)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (e, o, l) => ((o.enabled || this.disabled) && (e[l] = o.value), e)
          );
        }
        _reduceChildren(t, e) {
          let o = t;
          return (
            this._forEachChild((l, f) => {
              o = e(o, l, f);
            }),
            o
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      const io = new d.OlP('CallSetDisabledState', {
          providedIn: 'root',
          factory: () => dr,
        }),
        dr = 'always';
      function Bn(r, t, e = dr) {
        zo(r, t),
          t.valueAccessor.writeValue(r.value),
          (r.disabled || 'always' === e) &&
            t.valueAccessor.setDisabledState?.(r.disabled),
          (function Dd(r, t) {
            t.valueAccessor.registerOnChange((e) => {
              (r._pendingValue = e),
                (r._pendingChange = !0),
                (r._pendingDirty = !0),
                'change' === r.updateOn && Vl(r, t);
            });
          })(r, t),
          (function Bl(r, t) {
            const e = (o, l) => {
              t.valueAccessor.writeValue(o), l && t.viewToModelUpdate(o);
            };
            r.registerOnChange(e),
              t._registerOnDestroy(() => {
                r._unregisterOnChange(e);
              });
          })(r, t),
          (function xd(r, t) {
            t.valueAccessor.registerOnTouched(() => {
              (r._pendingTouched = !0),
                'blur' === r.updateOn && r._pendingChange && Vl(r, t),
                'submit' !== r.updateOn && r.markAsTouched();
            });
          })(r, t),
          (function Ue(r, t) {
            if (t.valueAccessor.setDisabledState) {
              const e = (o) => {
                t.valueAccessor.setDisabledState(o);
              };
              r.registerOnDisabledChange(e),
                t._registerOnDestroy(() => {
                  r._unregisterOnDisabledChange(e);
                });
            }
          })(r, t);
      }
      function ro(r, t, e = !0) {
        const o = () => {};
        t.valueAccessor &&
          (t.valueAccessor.registerOnChange(o),
          t.valueAccessor.registerOnTouched(o)),
          Ll(r, t),
          r &&
            (t._invokeOnDestroyCallbacks(),
            r._registerOnCollectionChange(() => {}));
      }
      function ur(r, t) {
        r.forEach((e) => {
          e.registerOnValidatorChange && e.registerOnValidatorChange(t);
        });
      }
      function zo(r, t) {
        const e = cn(r);
        null !== t.validator
          ? r.setValidators(bd(e, t.validator))
          : 'function' == typeof e && r.setValidators([e]);
        const o = wn(r);
        null !== t.asyncValidator
          ? r.setAsyncValidators(bd(o, t.asyncValidator))
          : 'function' == typeof o && r.setAsyncValidators([o]);
        const l = () => r.updateValueAndValidity();
        ur(t._rawValidators, l), ur(t._rawAsyncValidators, l);
      }
      function Ll(r, t) {
        let e = !1;
        if (null !== r) {
          if (null !== t.validator) {
            const l = cn(r);
            if (Array.isArray(l) && l.length > 0) {
              const f = l.filter((p) => p !== t.validator);
              f.length !== l.length && ((e = !0), r.setValidators(f));
            }
          }
          if (null !== t.asyncValidator) {
            const l = wn(r);
            if (Array.isArray(l) && l.length > 0) {
              const f = l.filter((p) => p !== t.asyncValidator);
              f.length !== l.length && ((e = !0), r.setAsyncValidators(f));
            }
          }
        }
        const o = () => {};
        return ur(t._rawValidators, o), ur(t._rawAsyncValidators, o), e;
      }
      function Vl(r, t) {
        r._pendingDirty && r.markAsDirty(),
          r.setValue(r._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(r._pendingValue),
          (r._pendingChange = !1);
      }
      function Cd(r, t) {
        zo(r, t);
      }
      function Hn(r, t) {
        r._syncPendingControls(),
          t.forEach((e) => {
            const o = e.control;
            'submit' === o.updateOn &&
              o._pendingChange &&
              (e.viewToModelUpdate(o._pendingValue), (o._pendingChange = !1));
          });
      }
      const Md = { provide: dn, useExisting: (0, d.Gpc)(() => At) },
        fr = (() => Promise.resolve())();
      let At = (() => {
        class r extends dn {
          constructor(e, o, l) {
            super(),
              (this.callSetDisabledState = l),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new d.vpe()),
              (this.form = new Ut({}, ar(e), Gt(o)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(e) {
            fr.then(() => {
              const o = this._findContainer(e.path);
              (e.control = o.registerControl(e.name, e.control)),
                Bn(e.control, e, this.callSetDisabledState),
                e.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(e);
            });
          }
          getControl(e) {
            return this.form.get(e.path);
          }
          removeControl(e) {
            fr.then(() => {
              const o = this._findContainer(e.path);
              o && o.removeControl(e.name), this._directives.delete(e);
            });
          }
          addFormGroup(e) {
            fr.then(() => {
              const o = this._findContainer(e.path),
                l = new Ut({});
              Cd(l, e),
                o.registerControl(e.name, l),
                l.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(e) {
            fr.then(() => {
              const o = this._findContainer(e.path);
              o && o.removeControl(e.name);
            });
          }
          getFormGroup(e) {
            return this.form.get(e.path);
          }
          updateModel(e, o) {
            fr.then(() => {
              this.form.get(e.path).setValue(o);
            });
          }
          setValue(e) {
            this.control.setValue(e);
          }
          onSubmit(e) {
            return (
              (this.submitted = !0),
              Hn(this.form, this._directives),
              this.ngSubmit.emit(e),
              'dialog' === e?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(e) {
            this.form.reset(e), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(e) {
            return e.pop(), e.length ? this.form.get(e) : this.form;
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.Y36(vt, 10), d.Y36(dt, 10), d.Y36(io, 8));
          }),
          (r.??dir = d.lG2({
            type: r,
            selectors: [
              ['form', 3, 'ngNoForm', '', 3, 'formGroup', ''],
              ['ng-form'],
              ['', 'ngForm', ''],
            ],
            hostBindings: function (e, o) {
              1 & e &&
                d.NdJ('submit', function (f) {
                  return o.onSubmit(f);
                })('reset', function () {
                  return o.onReset();
                });
            },
            inputs: { options: ['ngFormOptions', 'options'] },
            outputs: { ngSubmit: 'ngSubmit' },
            exportAs: ['ngForm'],
            features: [d._Bn([Md]), d.qOj],
          })),
          r
        );
      })();
      function Cn(r, t) {
        const e = r.indexOf(t);
        e > -1 && r.splice(e, 1);
      }
      function Li(r) {
        return (
          'object' == typeof r &&
          null !== r &&
          2 === Object.keys(r).length &&
          'value' in r &&
          'disabled' in r
        );
      }
      const hr = class extends to {
          constructor(t = null, e, o) {
            super(Uo(e), gn(o, e)),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(t),
              this._setUpdateStrategy(e),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              eo(e) &&
                (e.nonNullable || e.initialValueIsDefault) &&
                (this.defaultValue = Li(t) ? t.value : t);
          }
          setValue(t, e = {}) {
            (this.value = this._pendingValue = t),
              this._onChange.length &&
                !1 !== e.emitModelToViewChange &&
                this._onChange.forEach((o) =>
                  o(this.value, !1 !== e.emitViewToModelChange)
                ),
              this.updateValueAndValidity(e);
          }
          patchValue(t, e = {}) {
            this.setValue(t, e);
          }
          reset(t = this.defaultValue, e = {}) {
            this._applyFormState(t),
              this.markAsPristine(e),
              this.markAsUntouched(e),
              this.setValue(this.value, e),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(t) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(t) {
            this._onChange.push(t);
          }
          _unregisterOnChange(t) {
            Cn(this._onChange, t);
          }
          registerOnDisabledChange(t) {
            this._onDisabledChange.push(t);
          }
          _unregisterOnDisabledChange(t) {
            Cn(this._onDisabledChange, t);
          }
          _forEachChild(t) {}
          _syncPendingControls() {
            return !(
              'submit' !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(t) {
            Li(t)
              ? ((this.value = this._pendingValue = t.value),
                t.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = t);
          }
        },
        Sh = { provide: ti, useExisting: (0, d.Gpc)(() => oo) },
        $l = (() => Promise.resolve())();
      let oo = (() => {
          class r extends ti {
            constructor(e, o, l, f, p, y) {
              super(),
                (this._changeDetectorRef = p),
                (this.callSetDisabledState = y),
                (this.control = new hr()),
                (this._registered = !1),
                (this.update = new d.vpe()),
                (this._parent = e),
                this._setValidators(o),
                this._setAsyncValidators(l),
                (this.valueAccessor = (function qo(r, t) {
                  if (!t) return null;
                  let e, o, l;
                  return (
                    Array.isArray(t),
                    t.forEach((f) => {
                      f.constructor === mt
                        ? (e = f)
                        : (function Go(r) {
                            return Object.getPrototypeOf(r.constructor) === Dt;
                          })(f)
                        ? (o = f)
                        : (l = f);
                    }),
                    l || o || e || null
                  );
                })(0, f));
            }
            ngOnChanges(e) {
              if ((this._checkForErrors(), !this._registered || 'name' in e)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const o = e.name.previousValue;
                  this.formDirective.removeControl({
                    name: o,
                    path: this._getPath(o),
                  });
                }
                this._setUpControl();
              }
              'isDisabled' in e && this._updateDisabled(e),
                (function oa(r, t) {
                  if (!r.hasOwnProperty('model')) return !1;
                  const e = r.model;
                  return !!e.isFirstChange() || !Object.is(t, e.currentValue);
                })(e, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(e) {
              (this.viewModel = e), this.update.emit(e);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              Bn(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(e) {
              $l.then(() => {
                this.control.setValue(e, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(e) {
              const o = e.isDisabled.currentValue,
                l = 0 !== o && (0, d.D6c)(o);
              $l.then(() => {
                l && !this.control.disabled
                  ? this.control.disable()
                  : !l && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(e) {
              return this._parent
                ? (function $o(r, t) {
                    return [...t.path, r];
                  })(e, this._parent)
                : [e];
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(
                d.Y36(dn, 9),
                d.Y36(vt, 10),
                d.Y36(dt, 10),
                d.Y36(_t, 10),
                d.Y36(d.sBO, 8),
                d.Y36(io, 8)
              );
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                [
                  '',
                  'ngModel',
                  '',
                  3,
                  'formControlName',
                  '',
                  3,
                  'formControl',
                  '',
                ],
              ],
              inputs: {
                name: 'name',
                isDisabled: ['disabled', 'isDisabled'],
                model: ['ngModel', 'model'],
                options: ['ngModelOptions', 'options'],
              },
              outputs: { update: 'ngModelChange' },
              exportAs: ['ngModel'],
              features: [d._Bn([Sh]), d.qOj, d.TTD],
            })),
            r
          );
        })(),
        la = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', ''],
              ],
              hostAttrs: ['novalidate', ''],
            })),
            r
          );
        })();
      const Ad = { provide: _t, useExisting: (0, d.Gpc)(() => ca), multi: !0 };
      let ca = (() => {
          class r extends Dt {
            writeValue(e) {
              this.setProperty('value', e ?? '');
            }
            registerOnChange(e) {
              this.onChange = (o) => {
                e('' == o ? null : parseFloat(o));
              };
            }
          }
          return (
            (r.??fac = (function () {
              let t;
              return function (o) {
                return (t || (t = d.n5z(r)))(o || r);
              };
            })()),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['input', 'type', 'number', 'formControlName', ''],
                ['input', 'type', 'number', 'formControl', ''],
                ['input', 'type', 'number', 'ngModel', ''],
              ],
              hostBindings: function (e, o) {
                1 & e &&
                  d.NdJ('input', function (f) {
                    return o.onChange(f.target.value);
                  })('blur', function () {
                    return o.onTouched();
                  });
              },
              features: [d._Bn([Ad]), d.qOj],
            })),
            r
          );
        })(),
        zl = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({})),
            r
          );
        })();
      const Ih = { provide: dn, useExisting: (0, d.Gpc)(() => da) };
      let da = (() => {
        class r extends dn {
          constructor(e, o, l) {
            super(),
              (this.callSetDisabledState = l),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new d.vpe()),
              this._setValidators(e),
              this._setAsyncValidators(o);
          }
          ngOnChanges(e) {
            this._checkFormPresent(),
              e.hasOwnProperty('form') &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form));
          }
          ngOnDestroy() {
            this.form &&
              (Ll(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}));
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(e) {
            const o = this.form.get(e.path);
            return (
              Bn(o, e, this.callSetDisabledState),
              o.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(e),
              o
            );
          }
          getControl(e) {
            return this.form.get(e.path);
          }
          removeControl(e) {
            ro(e.control || null, e, !1),
              (function Hl(r, t) {
                const e = r.indexOf(t);
                e > -1 && r.splice(e, 1);
              })(this.directives, e);
          }
          addFormGroup(e) {
            this._setUpFormContainer(e);
          }
          removeFormGroup(e) {
            this._cleanUpFormContainer(e);
          }
          getFormGroup(e) {
            return this.form.get(e.path);
          }
          addFormArray(e) {
            this._setUpFormContainer(e);
          }
          removeFormArray(e) {
            this._cleanUpFormContainer(e);
          }
          getFormArray(e) {
            return this.form.get(e.path);
          }
          updateModel(e, o) {
            this.form.get(e.path).setValue(o);
          }
          onSubmit(e) {
            return (
              (this.submitted = !0),
              Hn(this.form, this.directives),
              this.ngSubmit.emit(e),
              'dialog' === e?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(e) {
            this.form.reset(e), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach((e) => {
              const o = e.control,
                l = this.form.get(e.path);
              o !== l &&
                (ro(o || null, e),
                ((r) => r instanceof hr)(l) &&
                  (Bn(l, e, this.callSetDisabledState), (e.control = l)));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _setUpFormContainer(e) {
            const o = this.form.get(e.path);
            Cd(o, e), o.updateValueAndValidity({ emitEvent: !1 });
          }
          _cleanUpFormContainer(e) {
            if (this.form) {
              const o = this.form.get(e.path);
              o &&
                (function Ed(r, t) {
                  return Ll(r, t);
                })(o, e) &&
                o.updateValueAndValidity({ emitEvent: !1 });
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {});
          }
          _updateValidators() {
            zo(this.form, this), this._oldForm && Ll(this._oldForm, this);
          }
          _checkFormPresent() {}
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.Y36(vt, 10), d.Y36(dt, 10), d.Y36(io, 8));
          }),
          (r.??dir = d.lG2({
            type: r,
            selectors: [['', 'formGroup', '']],
            hostBindings: function (e, o) {
              1 & e &&
                d.NdJ('submit', function (f) {
                  return o.onSubmit(f);
                })('reset', function () {
                  return o.onReset();
                });
            },
            inputs: { form: ['formGroup', 'form'] },
            outputs: { ngSubmit: 'ngSubmit' },
            exportAs: ['ngForm'],
            features: [d._Bn([Ih]), d.qOj, d.TTD],
          })),
          r
        );
      })();
      function ni(r) {
        return 'number' == typeof r ? r : parseInt(r, 10);
      }
      function En(r) {
        return 'number' == typeof r ? r : parseFloat(r);
      }
      let Wt = (() => {
        class r {
          constructor() {
            this._validator = mn;
          }
          ngOnChanges(e) {
            if (this.inputName in e) {
              const o = this.normalizeInput(e[this.inputName].currentValue);
              (this._enabled = this.enabled(o)),
                (this._validator = this._enabled
                  ? this.createValidator(o)
                  : mn),
                this._onChange && this._onChange();
            }
          }
          validate(e) {
            return this._validator(e);
          }
          registerOnValidatorChange(e) {
            this._onChange = e;
          }
          enabled(e) {
            return null != e;
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)();
          }),
          (r.??dir = d.lG2({ type: r, features: [d.TTD] })),
          r
        );
      })();
      const ii = { provide: vt, useExisting: (0, d.Gpc)(() => Hi), multi: !0 };
      let Hi = (() => {
        class r extends Wt {
          constructor() {
            super(...arguments),
              (this.inputName = 'max'),
              (this.normalizeInput = (e) => En(e)),
              (this.createValidator = (e) => Wr(e));
          }
        }
        return (
          (r.??fac = (function () {
            let t;
            return function (o) {
              return (t || (t = d.n5z(r)))(o || r);
            };
          })()),
          (r.??dir = d.lG2({
            type: r,
            selectors: [
              ['input', 'type', 'number', 'max', '', 'formControlName', ''],
              ['input', 'type', 'number', 'max', '', 'formControl', ''],
              ['input', 'type', 'number', 'max', '', 'ngModel', ''],
            ],
            hostVars: 1,
            hostBindings: function (e, o) {
              2 & e && d.uIk('max', o._enabled ? o.max : null);
            },
            inputs: { max: 'max' },
            features: [d._Bn([ii]), d.qOj],
          })),
          r
        );
      })();
      const pr = { provide: vt, useExisting: (0, d.Gpc)(() => Yo), multi: !0 };
      let Yo = (() => {
        class r extends Wt {
          constructor() {
            super(...arguments),
              (this.inputName = 'min'),
              (this.normalizeInput = (e) => En(e)),
              (this.createValidator = (e) => We(e));
          }
        }
        return (
          (r.??fac = (function () {
            let t;
            return function (o) {
              return (t || (t = d.n5z(r)))(o || r);
            };
          })()),
          (r.??dir = d.lG2({
            type: r,
            selectors: [
              ['input', 'type', 'number', 'min', '', 'formControlName', ''],
              ['input', 'type', 'number', 'min', '', 'formControl', ''],
              ['input', 'type', 'number', 'min', '', 'ngModel', ''],
            ],
            hostVars: 1,
            hostBindings: function (e, o) {
              2 & e && d.uIk('min', o._enabled ? o.min : null);
            },
            inputs: { min: 'min' },
            features: [d._Bn([pr]), d.qOj],
          })),
          r
        );
      })();
      const Wl = { provide: vt, useExisting: (0, d.Gpc)(() => mr), multi: !0 };
      let mr = (() => {
        class r extends Wt {
          constructor() {
            super(...arguments),
              (this.inputName = 'required'),
              (this.normalizeInput = d.D6c),
              (this.createValidator = (e) => pi);
          }
          enabled(e) {
            return e;
          }
        }
        return (
          (r.??fac = (function () {
            let t;
            return function (o) {
              return (t || (t = d.n5z(r)))(o || r);
            };
          })()),
          (r.??dir = d.lG2({
            type: r,
            selectors: [
              [
                '',
                'required',
                '',
                'formControlName',
                '',
                3,
                'type',
                'checkbox',
              ],
              ['', 'required', '', 'formControl', '', 3, 'type', 'checkbox'],
              ['', 'required', '', 'ngModel', '', 3, 'type', 'checkbox'],
            ],
            hostVars: 1,
            hostBindings: function (e, o) {
              2 & e && d.uIk('required', o._enabled ? '' : null);
            },
            inputs: { required: 'required' },
            features: [d._Bn([Wl]), d.qOj],
          })),
          r
        );
      })();
      const k_ = { provide: vt, useExisting: (0, d.Gpc)(() => Yn), multi: !0 };
      let Yn = (() => {
        class r extends Wt {
          constructor() {
            super(...arguments),
              (this.inputName = 'minlength'),
              (this.normalizeInput = (e) => ni(e)),
              (this.createValidator = (e) => zt(e));
          }
        }
        return (
          (r.??fac = (function () {
            let t;
            return function (o) {
              return (t || (t = d.n5z(r)))(o || r);
            };
          })()),
          (r.??dir = d.lG2({
            type: r,
            selectors: [
              ['', 'minlength', '', 'formControlName', ''],
              ['', 'minlength', '', 'formControl', ''],
              ['', 'minlength', '', 'ngModel', ''],
            ],
            hostVars: 1,
            hostBindings: function (e, o) {
              2 & e && d.uIk('minlength', o._enabled ? o.minlength : null);
            },
            inputs: { minlength: 'minlength' },
            features: [d._Bn([k_]), d.qOj],
          })),
          r
        );
      })();
      const L_ = { provide: vt, useExisting: (0, d.Gpc)(() => Zo), multi: !0 };
      let Zo = (() => {
          class r extends Wt {
            constructor() {
              super(...arguments),
                (this.inputName = 'maxlength'),
                (this.normalizeInput = (e) => ni(e)),
                (this.createValidator = (e) => Yr(e));
            }
          }
          return (
            (r.??fac = (function () {
              let t;
              return function (o) {
                return (t || (t = d.n5z(r)))(o || r);
              };
            })()),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['', 'maxlength', '', 'formControlName', ''],
                ['', 'maxlength', '', 'formControl', ''],
                ['', 'maxlength', '', 'ngModel', ''],
              ],
              hostVars: 1,
              hostBindings: function (e, o) {
                2 & e && d.uIk('maxlength', o._enabled ? o.maxlength : null);
              },
              inputs: { maxlength: 'maxlength' },
              features: [d._Bn([L_]), d.qOj],
            })),
            r
          );
        })(),
        kh = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [zl] })),
            r
          );
        })(),
        Vh = (() => {
          class r {
            static withConfig(e) {
              return {
                ngModule: r,
                providers: [
                  { provide: io, useValue: e.callSetDisabledState ?? dr },
                ],
              };
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [kh] })),
            r
          );
        })();
      function Ce(...r) {
        const t = (0, rr.yG)(r);
        return (0, Ie.D)(r, t);
      }
      var un = F(579);
      class Mn extends un.x {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return !e.closed && t.next(this._value), e;
        }
        getValue() {
          const { hasError: t, thrownError: e, _value: o } = this;
          if (t) throw e;
          return this._throwIfClosed(), o;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const ha = (0, F(888).d)(
        (r) =>
          function () {
            r(this),
              (this.name = 'EmptyError'),
              (this.message = 'no elements in sequence');
          }
      );
      var gr = F(671),
        Qo = F(672);
      function _r(...r) {
        const t = (0, rr.yG)(r),
          e = (0, rr.jO)(r),
          { args: o, keys: l } = Pi(r);
        if (0 === o.length) return (0, Ie.D)([], t);
        const f = new en.y(
          (function Xo(r, t, e = gr.y) {
            return (o) => {
              kd(
                t,
                () => {
                  const { length: l } = r,
                    f = new Array(l);
                  let p = l,
                    y = l;
                  for (let D = 0; D < l; D++)
                    kd(
                      t,
                      () => {
                        const S = (0, Ie.D)(r[D], t);
                        let R = !1;
                        S.subscribe(
                          (0, Nt.x)(
                            o,
                            (B) => {
                              (f[D] = B),
                                R || ((R = !0), y--),
                                y || o.next(e(f.slice()));
                            },
                            () => {
                              --p || o.complete();
                            }
                          )
                        );
                      },
                      o
                    );
                },
                o
              );
            };
          })(o, t, l ? (p) => Xs(l, p) : gr.y)
        );
        return e ? f.pipe(Qs(e)) : f;
      }
      function kd(r, t, e) {
        r ? (0, Qo.f)(e, r, t) : t();
      }
      var ao = F(189);
      function Ld(...r) {
        return (function Jo() {
          return (0, ao.J)(1);
        })()((0, Ie.D)(r, (0, rr.yG)(r)));
      }
      function Bh(r) {
        return new en.y((t) => {
          (0, ei.Xf)(r()).subscribe(t);
        });
      }
      var wt = F(635),
        Hh = F(576);
      function pa(r, t) {
        const e = (0, Hh.m)(r) ? r : () => r,
          o = (l) => l.error(e());
        return new en.y(t ? (l) => t.schedule(o, 0, l) : o);
      }
      var br = F(515),
        Vd = F(727),
        fn = F(482);
      function Uh() {
        return (0, fn.e)((r, t) => {
          let e = null;
          r._refCount++;
          const o = (0, Nt.x)(t, void 0, void 0, void 0, () => {
            if (!r || r._refCount <= 0 || 0 < --r._refCount)
              return void (e = null);
            const l = r._connection,
              f = e;
            (e = null),
              l && (!f || l === f) && l.unsubscribe(),
              t.unsubscribe();
          });
          r.subscribe(o), o.closed || (e = r.connect());
        });
      }
      class j_ extends en.y {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            (0, fn.A)(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new Vd.w0();
            const e = this.getSubject();
            t.add(
              this.source.subscribe(
                (0, Nt.x)(
                  e,
                  void 0,
                  () => {
                    this._teardown(), e.complete();
                  },
                  (o) => {
                    this._teardown(), e.error(o);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = Vd.w0.EMPTY));
          }
          return t;
        }
        refCount() {
          return Uh()(this);
        }
      }
      function Sn(r, t) {
        return (0, fn.e)((e, o) => {
          let l = null,
            f = 0,
            p = !1;
          const y = () => p && !l && o.complete();
          e.subscribe(
            (0, Nt.x)(
              o,
              (D) => {
                l?.unsubscribe();
                let S = 0;
                const R = f++;
                (0, ei.Xf)(r(D, R)).subscribe(
                  (l = (0, Nt.x)(
                    o,
                    (B) => o.next(t ? t(D, B, R, S++) : B),
                    () => {
                      (l = null), y();
                    }
                  ))
                );
              },
              () => {
                (p = !0), y();
              }
            )
          );
        });
      }
      function es(r) {
        return r <= 0
          ? () => br.E
          : (0, fn.e)((t, e) => {
              let o = 0;
              t.subscribe(
                (0, Nt.x)(e, (l) => {
                  ++o <= r && (e.next(l), r <= o && e.complete());
                })
              );
            });
      }
      function $_(...r) {
        const t = (0, rr.yG)(r);
        return (0, fn.e)((e, o) => {
          (t ? Ld(r, e, t) : Ld(r, e)).subscribe(o);
        });
      }
      function gt(r, t) {
        return (0, fn.e)((e, o) => {
          let l = 0;
          e.subscribe((0, Nt.x)(o, (f) => r.call(t, f, l++) && o.next(f)));
        });
      }
      var rn = F(577);
      function yr(r) {
        return (0, fn.e)((t, e) => {
          let o = !1;
          t.subscribe(
            (0, Nt.x)(
              e,
              (l) => {
                (o = !0), e.next(l);
              },
              () => {
                o || e.next(r), e.complete();
              }
            )
          );
        });
      }
      function jh(r = Zn) {
        return (0, fn.e)((t, e) => {
          let o = !1;
          t.subscribe(
            (0, Nt.x)(
              e,
              (l) => {
                (o = !0), e.next(l);
              },
              () => (o ? e.complete() : e.error(r()))
            )
          );
        });
      }
      function Zn() {
        return new ha();
      }
      function An(r, t) {
        const e = arguments.length >= 2;
        return (o) =>
          o.pipe(
            r ? gt((l, f) => r(l, f, o)) : gr.y,
            es(1),
            e ? yr(t) : jh(() => new ha())
          );
      }
      function Ui(r, t) {
        return (0, Hh.m)(t) ? (0, rn.z)(r, t, 1) : (0, rn.z)(r, 1);
      }
      function Tt(r, t, e) {
        const o =
          (0, Hh.m)(r) || t || e ? { next: r, error: t, complete: e } : r;
        return o
          ? (0, fn.e)((l, f) => {
              var p;
              null === (p = o.subscribe) || void 0 === p || p.call(o);
              let y = !0;
              l.subscribe(
                (0, Nt.x)(
                  f,
                  (D) => {
                    var S;
                    null === (S = o.next) || void 0 === S || S.call(o, D),
                      f.next(D);
                  },
                  () => {
                    var D;
                    (y = !1),
                      null === (D = o.complete) || void 0 === D || D.call(o),
                      f.complete();
                  },
                  (D) => {
                    var S;
                    (y = !1),
                      null === (S = o.error) || void 0 === S || S.call(o, D),
                      f.error(D);
                  },
                  () => {
                    var D, S;
                    y &&
                      (null === (D = o.unsubscribe) ||
                        void 0 === D ||
                        D.call(o)),
                      null === (S = o.finalize) || void 0 === S || S.call(o);
                  }
                )
              );
            })
          : gr.y;
      }
      function Un(r) {
        return (0, fn.e)((t, e) => {
          let f,
            o = null,
            l = !1;
          (o = t.subscribe(
            (0, Nt.x)(e, void 0, void 0, (p) => {
              (f = (0, ei.Xf)(r(p, Un(r)(t)))),
                o ? (o.unsubscribe(), (o = null), f.subscribe(e)) : (l = !0);
            })
          )),
            l && (o.unsubscribe(), (o = null), f.subscribe(e));
        });
      }
      function z_(r, t, e, o, l) {
        return (f, p) => {
          let y = e,
            D = t,
            S = 0;
          f.subscribe(
            (0, Nt.x)(
              p,
              (R) => {
                const B = S++;
                (D = y ? r(D, R, B) : ((y = !0), R)), o && p.next(D);
              },
              l &&
                (() => {
                  y && p.next(D), p.complete();
                })
            )
          );
        };
      }
      function G_(r, t) {
        return (0, fn.e)(z_(r, t, arguments.length >= 2, !0));
      }
      function Bd(r) {
        return r <= 0
          ? () => br.E
          : (0, fn.e)((t, e) => {
              let o = [];
              t.subscribe(
                (0, Nt.x)(
                  e,
                  (l) => {
                    o.push(l), r < o.length && o.shift();
                  },
                  () => {
                    for (const l of o) e.next(l);
                    e.complete();
                  },
                  void 0,
                  () => {
                    o = null;
                  }
                )
              );
            });
      }
      function q_(r, t) {
        const e = arguments.length >= 2;
        return (o) =>
          o.pipe(
            r ? gt((l, f) => r(l, f, o)) : gr.y,
            Bd(1),
            e ? yr(t) : jh(() => new ha())
          );
      }
      function ji(r) {
        return (0, fn.e)((t, e) => {
          try {
            t.subscribe(e);
          } finally {
            e.add(r);
          }
        });
      }
      const Ze = 'primary',
        ts = Symbol('RouteTitle');
      class W_ {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function ns(r) {
        return new W_(r);
      }
      function Y_(r, t, e) {
        const o = e.path.split('/');
        if (
          o.length > r.length ||
          ('full' === e.pathMatch && (t.hasChildren() || o.length < r.length))
        )
          return null;
        const l = {};
        for (let f = 0; f < o.length; f++) {
          const p = o[f],
            y = r[f];
          if (p.startsWith(':')) l[p.substring(1)] = y;
          else if (p !== y.path) return null;
        }
        return { consumed: r.slice(0, o.length), posParams: l };
      }
      function bi(r, t) {
        const e = r ? Object.keys(r) : void 0,
          o = t ? Object.keys(t) : void 0;
        if (!e || !o || e.length != o.length) return !1;
        let l;
        for (let f = 0; f < e.length; f++)
          if (((l = e[f]), !$h(r[l], t[l]))) return !1;
        return !0;
      }
      function $h(r, t) {
        if (Array.isArray(r) && Array.isArray(t)) {
          if (r.length !== t.length) return !1;
          const e = [...r].sort(),
            o = [...t].sort();
          return e.every((l, f) => o[f] === l);
        }
        return r === t;
      }
      function Yl(r) {
        return Array.prototype.concat.apply([], r);
      }
      function ma(r) {
        return r.length > 0 ? r[r.length - 1] : null;
      }
      function Lt(r, t) {
        for (const e in r) r.hasOwnProperty(e) && t(r[e], e);
      }
      function $i(r) {
        return (0, d.CqO)(r)
          ? r
          : (0, d.QGY)(r)
          ? (0, Ie.D)(Promise.resolve(r))
          : Ce(r);
      }
      const vr = !1,
        K_ = {
          exact: function jd(r, t, e) {
            if (
              !os(r.segments, t.segments) ||
              !wr(r.segments, t.segments, e) ||
              r.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const o in t.children)
              if (!r.children[o] || !jd(r.children[o], t.children[o], e))
                return !1;
            return !0;
          },
          subset: Gh,
        },
        Ud = {
          exact: function Zl(r, t) {
            return bi(r, t);
          },
          subset: function Q_(r, t) {
            return (
              Object.keys(t).length <= Object.keys(r).length &&
              Object.keys(t).every((e) => $h(r[e], t[e]))
            );
          },
          ignored: () => !0,
        };
      function is(r, t, e) {
        return (
          K_[e.paths](r.root, t.root, e.matrixParams) &&
          Ud[e.queryParams](r.queryParams, t.queryParams) &&
          !('exact' === e.fragment && r.fragment !== t.fragment)
        );
      }
      function Gh(r, t, e) {
        return lo(r, t, t.segments, e);
      }
      function lo(r, t, e, o) {
        if (r.segments.length > e.length) {
          const l = r.segments.slice(0, e.length);
          return !(!os(l, e) || t.hasChildren() || !wr(l, e, o));
        }
        if (r.segments.length === e.length) {
          if (!os(r.segments, e) || !wr(r.segments, e, o)) return !1;
          for (const l in t.children)
            if (!r.children[l] || !Gh(r.children[l], t.children[l], o))
              return !1;
          return !0;
        }
        {
          const l = e.slice(0, r.segments.length),
            f = e.slice(r.segments.length);
          return (
            !!(os(r.segments, l) && wr(r.segments, l, o) && r.children[Ze]) &&
            lo(r.children[Ze], t, f, o)
          );
        }
      }
      function wr(r, t, e) {
        return t.every((o, l) => Ud[e](r[l].parameters, o.parameters));
      }
      class co {
        constructor(t = new nt([], {}), e = {}, o = null) {
          (this.root = t), (this.queryParams = e), (this.fragment = o);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ns(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Kl.serialize(this);
        }
      }
      class nt {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            Lt(e, (o, l) => (o.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return _a(this);
        }
      }
      class rs {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = ns(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Xl(this);
        }
      }
      function os(r, t) {
        return r.length === t.length && r.every((e, o) => e.path === t[o].path);
      }
      let ga = (() => {
        class r {}
        return (
          (r.??fac = function (e) {
            return new (e || r)();
          }),
          (r.??prov = d.Yz7({
            token: r,
            factory: function () {
              return new $d();
            },
            providedIn: 'root',
          })),
          r
        );
      })();
      class $d {
        parse(t) {
          const e = new eb(t);
          return new co(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          const e = `/${ba(t.root, !0)}`,
            o = (function Vw(r) {
              const t = Object.keys(r)
                .map((e) => {
                  const o = r[e];
                  return Array.isArray(o)
                    ? o.map((l) => `${Gd(e)}=${Gd(l)}`).join('&')
                    : `${Gd(e)}=${Gd(o)}`;
                })
                .filter((e) => !!e);
              return t.length ? `?${t.join('&')}` : '';
            })(t.queryParams);
          return `${e}${o}${
            'string' == typeof t.fragment
              ? `#${(function qh(r) {
                  return encodeURI(r);
                })(t.fragment)}`
              : ''
          }`;
        }
      }
      const Kl = new $d();
      function _a(r) {
        return r.segments.map((t) => Xl(t)).join('/');
      }
      function ba(r, t) {
        if (!r.hasChildren()) return _a(r);
        if (t) {
          const e = r.children[Ze] ? ba(r.children[Ze], !1) : '',
            o = [];
          return (
            Lt(r.children, (l, f) => {
              f !== Ze && o.push(`${f}:${ba(l, !1)}`);
            }),
            o.length > 0 ? `${e}(${o.join('//')})` : e
          );
        }
        {
          const e = (function J_(r, t) {
            let e = [];
            return (
              Lt(r.children, (o, l) => {
                l === Ze && (e = e.concat(t(o, l)));
              }),
              Lt(r.children, (o, l) => {
                l !== Ze && (e = e.concat(t(o, l)));
              }),
              e
            );
          })(r, (o, l) =>
            l === Ze ? [ba(r.children[Ze], !1)] : [`${l}:${ba(o, !1)}`]
          );
          return 1 === Object.keys(r.children).length && null != r.children[Ze]
            ? `${_a(r)}/${e[0]}`
            : `${_a(r)}/(${e.join('//')})`;
        }
      }
      function zd(r) {
        return encodeURIComponent(r)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',');
      }
      function Gd(r) {
        return zd(r).replace(/%3B/gi, ';');
      }
      function Wh(r) {
        return zd(r)
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29')
          .replace(/%26/gi, '&');
      }
      function Ql(r) {
        return decodeURIComponent(r);
      }
      function Yh(r) {
        return Ql(r.replace(/\+/g, '%20'));
      }
      function Xl(r) {
        return `${Wh(r.path)}${(function Lw(r) {
          return Object.keys(r)
            .map((t) => `;${Wh(t)}=${Wh(r[t])}`)
            .join('');
        })(r.parameters)}`;
      }
      const qd = /^[^\/()?;=#]+/;
      function Wd(r) {
        const t = r.match(qd);
        return t ? t[0] : '';
      }
      const Bw = /^[^=?&#]+/,
        Uw = /^[^&#]+/;
      class eb {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional('/'),
            '' === this.remaining ||
            this.peekStartsWith('?') ||
            this.peekStartsWith('#')
              ? new nt([], {})
              : new nt([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional('&'));
          return t;
        }
        parseFragment() {
          return this.consumeOptional('#')
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ('' === this.remaining) return {};
          this.consumeOptional('/');
          const t = [];
          for (
            this.peekStartsWith('(') || t.push(this.parseSegment());
            this.peekStartsWith('/') &&
            !this.peekStartsWith('//') &&
            !this.peekStartsWith('/(');

          )
            this.capture('/'), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith('/(') &&
            (this.capture('/'), (e = this.parseParens(!0)));
          let o = {};
          return (
            this.peekStartsWith('(') && (o = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (o[Ze] = new nt(t, e)),
            o
          );
        }
        parseSegment() {
          const t = Wd(this.remaining);
          if ('' === t && this.peekStartsWith(';')) throw new d.vHH(4009, vr);
          return this.capture(t), new rs(Ql(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(';'); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = Wd(this.remaining);
          if (!e) return;
          this.capture(e);
          let o = '';
          if (this.consumeOptional('=')) {
            const l = Wd(this.remaining);
            l && ((o = l), this.capture(o));
          }
          t[Ql(e)] = Ql(o);
        }
        parseQueryParam(t) {
          const e = (function Hw(r) {
            const t = r.match(Bw);
            return t ? t[0] : '';
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let o = '';
          if (this.consumeOptional('=')) {
            const p = (function jw(r) {
              const t = r.match(Uw);
              return t ? t[0] : '';
            })(this.remaining);
            p && ((o = p), this.capture(o));
          }
          const l = Yh(e),
            f = Yh(o);
          if (t.hasOwnProperty(l)) {
            let p = t[l];
            Array.isArray(p) || ((p = [p]), (t[l] = p)), p.push(f);
          } else t[l] = f;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture('(');
            !this.consumeOptional(')') && this.remaining.length > 0;

          ) {
            const o = Wd(this.remaining),
              l = this.remaining[o.length];
            if ('/' !== l && ')' !== l && ';' !== l) throw new d.vHH(4010, vr);
            let f;
            o.indexOf(':') > -1
              ? ((f = o.slice(0, o.indexOf(':'))),
                this.capture(f),
                this.capture(':'))
              : t && (f = Ze);
            const p = this.parseChildren();
            (e[f] = 1 === Object.keys(p).length ? p[Ze] : new nt([], p)),
              this.consumeOptional('//');
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new d.vHH(4011, vr);
        }
      }
      function Jl(r) {
        return r.segments.length > 0 ? new nt([], { [Ze]: r }) : r;
      }
      function ss(r) {
        const t = {};
        for (const o of Object.keys(r.children)) {
          const f = ss(r.children[o]);
          (f.segments.length > 0 || f.hasChildren()) && (t[o] = f);
        }
        return (function Zh(r) {
          if (1 === r.numberOfChildren && r.children[Ze]) {
            const t = r.children[Ze];
            return new nt(r.segments.concat(t.segments), t.children);
          }
          return r;
        })(new nt(r.segments, t));
      }
      function Dr(r) {
        return r instanceof co;
      }
      function ib(r, t, e, o, l) {
        if (0 === e.length) return ls(t.root, t.root, t.root, o, l);
        const f = (function Yd(r) {
          if ('string' == typeof r[0] && 1 === r.length && '/' === r[0])
            return new Qh(!0, 0, r);
          let t = 0,
            e = !1;
          const o = r.reduce((l, f, p) => {
            if ('object' == typeof f && null != f) {
              if (f.outlets) {
                const y = {};
                return (
                  Lt(f.outlets, (D, S) => {
                    y[S] = 'string' == typeof D ? D.split('/') : D;
                  }),
                  [...l, { outlets: y }]
                );
              }
              if (f.segmentPath) return [...l, f.segmentPath];
            }
            return 'string' != typeof f
              ? [...l, f]
              : 0 === p
              ? (f.split('/').forEach((y, D) => {
                  (0 == D && '.' === y) ||
                    (0 == D && '' === y
                      ? (e = !0)
                      : '..' === y
                      ? t++
                      : '' != y && l.push(y));
                }),
                l)
              : [...l, f];
          }, []);
          return new Qh(e, t, o);
        })(e);
        return f.toRoot()
          ? ls(t.root, t.root, new nt([], {}), o, l)
          : (function p(D) {
              const S = (function Tn(r, t, e, o) {
                  if (r.isAbsolute) return new cs(t.root, !0, 0);
                  if (-1 === o) return new cs(e, e === t.root, 0);
                  return (function tc(r, t, e) {
                    let o = r,
                      l = t,
                      f = e;
                    for (; f > l; ) {
                      if (((f -= l), (o = o.parent), !o))
                        throw new d.vHH(4005, !1);
                      l = o.segments.length;
                    }
                    return new cs(o, !1, l - f);
                  })(e, o + (as(r.commands[0]) ? 0 : 1), r.numberOfDoubleDots);
                })(f, t, r.snapshot?._urlSegment, D),
                R = S.processChildren
                  ? Vt(S.segmentGroup, S.index, f.commands)
                  : ya(S.segmentGroup, S.index, f.commands);
              return ls(t.root, S.segmentGroup, R, o, l);
            })(r.snapshot?._lastPathIndex);
      }
      function as(r) {
        return (
          'object' == typeof r && null != r && !r.outlets && !r.segmentPath
        );
      }
      function uo(r) {
        return 'object' == typeof r && null != r && r.outlets;
      }
      function ls(r, t, e, o, l) {
        let p,
          f = {};
        o &&
          Lt(o, (D, S) => {
            f[S] = Array.isArray(D) ? D.map((R) => `${R}`) : `${D}`;
          }),
          (p = r === t ? e : Kh(r, t, e));
        const y = Jl(ss(p));
        return new co(y, f, l);
      }
      function Kh(r, t, e) {
        const o = {};
        return (
          Lt(r.children, (l, f) => {
            o[f] = l === t ? e : Kh(l, t, e);
          }),
          new nt(r.segments, o)
        );
      }
      class Qh {
        constructor(t, e, o) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = o),
            t && o.length > 0 && as(o[0]))
          )
            throw new d.vHH(4003, !1);
          const l = o.find(uo);
          if (l && l !== ma(o)) throw new d.vHH(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            '/' == this.commands[0]
          );
        }
      }
      class cs {
        constructor(t, e, o) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = o);
        }
      }
      function ya(r, t, e) {
        if (
          (r || (r = new nt([], {})),
          0 === r.segments.length && r.hasChildren())
        )
          return Vt(r, t, e);
        const o = (function va(r, t, e) {
            let o = 0,
              l = t;
            const f = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; l < r.segments.length; ) {
              if (o >= e.length) return f;
              const p = r.segments[l],
                y = e[o];
              if (uo(y)) break;
              const D = `${y}`,
                S = o < e.length - 1 ? e[o + 1] : null;
              if (l > 0 && void 0 === D) break;
              if (D && S && 'object' == typeof S && void 0 === S.outlets) {
                if (!Zd(D, S, p)) return f;
                o += 2;
              } else {
                if (!Zd(D, {}, p)) return f;
                o++;
              }
              l++;
            }
            return { match: !0, pathIndex: l, commandIndex: o };
          })(r, t, e),
          l = e.slice(o.commandIndex);
        if (o.match && o.pathIndex < r.segments.length) {
          const f = new nt(r.segments.slice(0, o.pathIndex), {});
          return (
            (f.children[Ze] = new nt(
              r.segments.slice(o.pathIndex),
              r.children
            )),
            Vt(f, 0, l)
          );
        }
        return o.match && 0 === l.length
          ? new nt(r.segments, {})
          : o.match && !r.hasChildren()
          ? nc(r, t, e)
          : o.match
          ? Vt(r, 0, l)
          : nc(r, t, e);
      }
      function Vt(r, t, e) {
        if (0 === e.length) return new nt(r.segments, {});
        {
          const o = (function Xh(r) {
              return uo(r[0]) ? r[0].outlets : { [Ze]: r };
            })(e),
            l = {};
          return !o[Ze] &&
            r.children[Ze] &&
            1 === r.numberOfChildren &&
            0 === r.children[Ze].segments.length
            ? Vt(r.children[Ze], t, e)
            : (Lt(o, (f, p) => {
                'string' == typeof f && (f = [f]),
                  null !== f && (l[p] = ya(r.children[p], t, f));
              }),
              Lt(r.children, (f, p) => {
                void 0 === o[p] && (l[p] = f);
              }),
              new nt(r.segments, l));
        }
      }
      function nc(r, t, e) {
        const o = r.segments.slice(0, t);
        let l = 0;
        for (; l < e.length; ) {
          const f = e[l];
          if (uo(f)) {
            const D = Jh(f.outlets);
            return new nt(o, D);
          }
          if (0 === l && as(e[0])) {
            o.push(new rs(r.segments[t].path, ep(e[0]))), l++;
            continue;
          }
          const p = uo(f) ? f.outlets[Ze] : `${f}`,
            y = l < e.length - 1 ? e[l + 1] : null;
          p && y && as(y)
            ? (o.push(new rs(p, ep(y))), (l += 2))
            : (o.push(new rs(p, {})), l++);
        }
        return new nt(o, {});
      }
      function Jh(r) {
        const t = {};
        return (
          Lt(r, (e, o) => {
            'string' == typeof e && (e = [e]),
              null !== e && (t[o] = nc(new nt([], {}), 0, e));
          }),
          t
        );
      }
      function ep(r) {
        const t = {};
        return Lt(r, (e, o) => (t[o] = `${e}`)), t;
      }
      function Zd(r, t, e) {
        return r == e.path && bi(t, e.parameters);
      }
      const wa = 'imperative';
      class ri {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class Kd extends ri {
        constructor(t, e, o = 'imperative', l = null) {
          super(t, e),
            (this.type = 0),
            (this.navigationTrigger = o),
            (this.restoredState = l);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class xr extends ri {
        constructor(t, e, o) {
          super(t, e), (this.urlAfterRedirects = o), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class ic extends ri {
        constructor(t, e, o, l) {
          super(t, e), (this.reason = o), (this.code = l), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class tp extends ri {
        constructor(t, e, o, l) {
          super(t, e), (this.reason = o), (this.code = l), (this.type = 16);
        }
      }
      class rc extends ri {
        constructor(t, e, o, l) {
          super(t, e), (this.error = o), (this.target = l), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class Qd extends ri {
        constructor(t, e, o, l) {
          super(t, e),
            (this.urlAfterRedirects = o),
            (this.state = l),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class ob extends ri {
        constructor(t, e, o, l) {
          super(t, e),
            (this.urlAfterRedirects = o),
            (this.state = l),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Da extends ri {
        constructor(t, e, o, l, f) {
          super(t, e),
            (this.urlAfterRedirects = o),
            (this.state = l),
            (this.shouldActivate = f),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class sb extends ri {
        constructor(t, e, o, l) {
          super(t, e),
            (this.urlAfterRedirects = o),
            (this.state = l),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class ab extends ri {
        constructor(t, e, o, l) {
          super(t, e),
            (this.urlAfterRedirects = o),
            (this.state = l),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Xd {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class Jd {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class np {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class ds {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class eu {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class ip {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class rp {
        constructor(t, e, o) {
          (this.routerEvent = t),
            (this.position = e),
            (this.anchor = o),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let lb = (() => {
          class r {
            createUrlTree(e, o, l, f, p, y) {
              return ib(e || o.root, l, f, p, y);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
            r
          );
        })(),
        cb = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: function (t) {
                return lb.??fac(t);
              },
              providedIn: 'root',
            })),
            r
          );
        })();
      class op {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = nu(t, this._root);
          return e ? e.children.map((o) => o.value) : [];
        }
        firstChild(t) {
          const e = nu(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = oc(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((l) => l.value)
                .filter((l) => l !== t);
        }
        pathFromRoot(t) {
          return oc(t, this._root).map((e) => e.value);
        }
      }
      function nu(r, t) {
        if (r === t.value) return t;
        for (const e of t.children) {
          const o = nu(r, e);
          if (o) return o;
        }
        return null;
      }
      function oc(r, t) {
        if (r === t.value) return [t];
        for (const e of t.children) {
          const o = oc(r, e);
          if (o.length) return o.unshift(t), o;
        }
        return [];
      }
      class oi {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function fo(r) {
        const t = {};
        return r && r.children.forEach((e) => (t[e.value.outlet] = e)), t;
      }
      class sc extends op {
        constructor(t, e) {
          super(t), (this.snapshot = e), ou(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function sp(r, t) {
        const e = (function db(r, t) {
            const p = new xa([], {}, {}, '', {}, Ze, t, null, r.root, -1, {});
            return new ru('', new oi(p, []));
          })(r, t),
          o = new Mn([new rs('', {})]),
          l = new Mn({}),
          f = new Mn({}),
          p = new Mn({}),
          y = new Mn(''),
          D = new Cr(o, l, p, y, f, Ze, t, e.root);
        return (D.snapshot = e.root), new sc(new oi(D, []), e);
      }
      class Cr {
        constructor(t, e, o, l, f, p, y, D) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = o),
            (this.fragment = l),
            (this.data = f),
            (this.outlet = p),
            (this.component = y),
            (this.title =
              this.data?.pipe((0, Pe.U)((S) => S[ts])) ?? Ce(void 0)),
            (this._futureSnapshot = D);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe((0, Pe.U)((t) => ns(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(
                (0, Pe.U)((t) => ns(t))
              )),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function iu(r, t = 'emptyOnly') {
        const e = r.pathFromRoot;
        let o = 0;
        if ('always' !== t)
          for (o = e.length - 1; o >= 1; ) {
            const l = e[o],
              f = e[o - 1];
            if (l.routeConfig && '' === l.routeConfig.path) o--;
            else {
              if (f.component) break;
              o--;
            }
          }
        return (function ho(r) {
          return r.reduce(
            (t, e) => ({
              params: { ...t.params, ...e.params },
              data: { ...t.data, ...e.data },
              resolve: {
                ...e.data,
                ...t.resolve,
                ...e.routeConfig?.data,
                ...e._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(e.slice(o));
      }
      class xa {
        get title() {
          return this.data?.[ts];
        }
        constructor(t, e, o, l, f, p, y, D, S, R, B) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = o),
            (this.fragment = l),
            (this.data = f),
            (this.outlet = p),
            (this.component = y),
            (this.routeConfig = D),
            (this._urlSegment = S),
            (this._lastPathIndex = R),
            (this._resolve = B);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = ns(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ns(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((o) => o.toString())
            .join('/')}', path:'${
            this.routeConfig ? this.routeConfig.path : ''
          }')`;
        }
      }
      class ru extends op {
        constructor(t, e) {
          super(e), (this.url = t), ou(this, e);
        }
        toString() {
          return ub(this._root);
        }
      }
      function ou(r, t) {
        (t.value._routerState = r), t.children.forEach((e) => ou(r, e));
      }
      function ub(r) {
        const t =
          r.children.length > 0 ? ` { ${r.children.map(ub).join(', ')} } ` : '';
        return `${r.value}${t}`;
      }
      function us(r) {
        if (r.snapshot) {
          const t = r.snapshot,
            e = r._futureSnapshot;
          (r.snapshot = e),
            bi(t.queryParams, e.queryParams) ||
              r.queryParams.next(e.queryParams),
            t.fragment !== e.fragment && r.fragment.next(e.fragment),
            bi(t.params, e.params) || r.params.next(e.params),
            (function Z_(r, t) {
              if (r.length !== t.length) return !1;
              for (let e = 0; e < r.length; ++e) if (!bi(r[e], t[e])) return !1;
              return !0;
            })(t.url, e.url) || r.url.next(e.url),
            bi(t.data, e.data) || r.data.next(e.data);
        } else
          (r.snapshot = r._futureSnapshot), r.data.next(r._futureSnapshot.data);
      }
      function su(r, t) {
        const e =
          bi(r.params, t.params) &&
          (function X_(r, t) {
            return (
              os(r, t) && r.every((e, o) => bi(e.parameters, t[o].parameters))
            );
          })(r.url, t.url);
        return (
          e &&
          !(!r.parent != !t.parent) &&
          (!r.parent || su(r.parent, t.parent))
        );
      }
      function fs(r, t, e) {
        if (e && r.shouldReuseRoute(t.value, e.value.snapshot)) {
          const o = e.value;
          o._futureSnapshot = t.value;
          const l = (function lp(r, t, e) {
            return t.children.map((o) => {
              for (const l of e.children)
                if (r.shouldReuseRoute(o.value, l.value.snapshot))
                  return fs(r, o, l);
              return fs(r, o);
            });
          })(r, t, e);
          return new oi(o, l);
        }
        {
          if (r.shouldAttach(t.value)) {
            const f = r.retrieve(t.value);
            if (null !== f) {
              const p = f.route;
              return (
                (p.value._futureSnapshot = t.value),
                (p.children = t.children.map((y) => fs(r, y))),
                p
              );
            }
          }
          const o = (function au(r) {
              return new Cr(
                new Mn(r.url),
                new Mn(r.params),
                new Mn(r.queryParams),
                new Mn(r.fragment),
                new Mn(r.data),
                r.outlet,
                r.component,
                r
              );
            })(t.value),
            l = t.children.map((f) => fs(r, f));
          return new oi(o, l);
        }
      }
      const ac = 'ngNavigationCancelingError';
      function Ca(r, t) {
        const { redirectTo: e, navigationBehaviorOptions: o } = Dr(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          l = Ea(!1, 0, t);
        return (l.url = e), (l.navigationBehaviorOptions = o), l;
      }
      function Ea(r, t, e) {
        const o = new Error('NavigationCancelingError: ' + (r || ''));
        return (o[ac] = !0), (o.cancellationCode = t), e && (o.url = e), o;
      }
      function lu(r) {
        return lc(r) && Dr(r.url);
      }
      function lc(r) {
        return r && r[ac];
      }
      class cu {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new po()),
            (this.attachRef = null);
        }
      }
      let po = (() => {
        class r {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(e, o) {
            const l = this.getOrCreateContext(e);
            (l.outlet = o), this.contexts.set(e, l);
          }
          onChildOutletDestroyed(e) {
            const o = this.getContext(e);
            o && ((o.outlet = null), (o.attachRef = null));
          }
          onOutletDeactivated() {
            const e = this.contexts;
            return (this.contexts = new Map()), e;
          }
          onOutletReAttached(e) {
            this.contexts = e;
          }
          getOrCreateContext(e) {
            let o = this.getContext(e);
            return o || ((o = new cu()), this.contexts.set(e, o)), o;
          }
          getContext(e) {
            return this.contexts.get(e) || null;
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)();
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac, providedIn: 'root' })),
          r
        );
      })();
      const Er = !1;
      let du = (() => {
        class r {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = Ze),
              (this.activateEvents = new d.vpe()),
              (this.deactivateEvents = new d.vpe()),
              (this.attachEvents = new d.vpe()),
              (this.detachEvents = new d.vpe()),
              (this.parentContexts = (0, d.f3M)(po)),
              (this.location = (0, d.f3M)(d.s_b)),
              (this.changeDetector = (0, d.f3M)(d.sBO)),
              (this.environmentInjector = (0, d.f3M)(d.lqb));
          }
          ngOnChanges(e) {
            if (e.name) {
              const { firstChange: o, previousValue: l } = e.name;
              if (o) return;
              this.isTrackedInParentContexts(l) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(l)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(e) {
            return this.parentContexts.getContext(e)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const e = this.parentContexts.getContext(this.name);
            e?.route &&
              (e.attachRef
                ? this.attach(e.attachRef, e.route)
                : this.activateWith(e.route, e.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new d.vHH(4012, Er);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new d.vHH(4012, Er);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new d.vHH(4012, Er);
            this.location.detach();
            const e = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(e.instance),
              e
            );
          }
          attach(e, o) {
            (this.activated = e),
              (this._activatedRoute = o),
              this.location.insert(e.hostView),
              this.attachEvents.emit(e.instance);
          }
          deactivate() {
            if (this.activated) {
              const e = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(e);
            }
          }
          activateWith(e, o) {
            if (this.isActivated) throw new d.vHH(4013, Er);
            this._activatedRoute = e;
            const l = this.location,
              p = e.snapshot.component,
              y = this.parentContexts.getOrCreateContext(this.name).children,
              D = new cp(e, y, l.injector);
            if (
              o &&
              (function fb(r) {
                return !!r.resolveComponentFactory;
              })(o)
            ) {
              const S = o.resolveComponentFactory(p);
              this.activated = l.createComponent(S, l.length, D);
            } else
              this.activated = l.createComponent(p, {
                index: l.length,
                injector: D,
                environmentInjector: o ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)();
          }),
          (r.??dir = d.lG2({
            type: r,
            selectors: [['router-outlet']],
            inputs: { name: 'name' },
            outputs: {
              activateEvents: 'activate',
              deactivateEvents: 'deactivate',
              attachEvents: 'attach',
              detachEvents: 'detach',
            },
            exportAs: ['outlet'],
            standalone: !0,
            features: [d.TTD],
          })),
          r
        );
      })();
      class cp {
        constructor(t, e, o) {
          (this.route = t), (this.childContexts = e), (this.parent = o);
        }
        get(t, e) {
          return t === Cr
            ? this.route
            : t === po
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      let uu = (() => {
        class r {}
        return (
          (r.??fac = function (e) {
            return new (e || r)();
          }),
          (r.??cmp = d.Xpm({
            type: r,
            selectors: [['ng-component']],
            standalone: !0,
            features: [d.jDz],
            decls: 1,
            vars: 0,
            template: function (e, o) {
              1 & e && d._UZ(0, 'router-outlet');
            },
            dependencies: [du],
            encapsulation: 2,
          })),
          r
        );
      })();
      function dp(r, t) {
        return (
          r.providers &&
            !r._injector &&
            (r._injector = (0, d.MMx)(r.providers, t, `Route: ${r.path}`)),
          r._injector ?? t
        );
      }
      function hu(r) {
        const t = r.children && r.children.map(hu),
          e = t ? { ...r, children: t } : { ...r };
        return (
          !e.component &&
            !e.loadComponent &&
            (t || e.loadChildren) &&
            e.outlet &&
            e.outlet !== Ze &&
            (e.component = uu),
          e
        );
      }
      function In(r) {
        return r.outlet || Ze;
      }
      function fp(r, t) {
        const e = r.filter((o) => In(o) === t);
        return e.push(...r.filter((o) => In(o) !== t)), e;
      }
      function hs(r) {
        if (!r) return null;
        if (r.routeConfig?._injector) return r.routeConfig._injector;
        for (let t = r.parent; t; t = t.parent) {
          const e = t.routeConfig;
          if (e?._loadedInjector) return e._loadedInjector;
          if (e?._injector) return e._injector;
        }
        return null;
      }
      class pu {
        constructor(t, e, o, l) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = o),
            (this.forwardEvent = l);
        }
        activate(t) {
          const e = this.futureState._root,
            o = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, o, t),
            us(this.futureState.root),
            this.activateChildRoutes(e, o, t);
        }
        deactivateChildRoutes(t, e, o) {
          const l = fo(e);
          t.children.forEach((f) => {
            const p = f.value.outlet;
            this.deactivateRoutes(f, l[p], o), delete l[p];
          }),
            Lt(l, (f, p) => {
              this.deactivateRouteAndItsChildren(f, o);
            });
        }
        deactivateRoutes(t, e, o) {
          const l = t.value,
            f = e ? e.value : null;
          if (l === f)
            if (l.component) {
              const p = o.getContext(l.outlet);
              p && this.deactivateChildRoutes(t, e, p.children);
            } else this.deactivateChildRoutes(t, e, o);
          else f && this.deactivateRouteAndItsChildren(e, o);
        }
        deactivateRouteAndItsChildren(t, e) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const o = e.getContext(t.value.outlet),
            l = o && t.value.component ? o.children : e,
            f = fo(t);
          for (const p of Object.keys(f))
            this.deactivateRouteAndItsChildren(f[p], l);
          if (o && o.outlet) {
            const p = o.outlet.detach(),
              y = o.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: p,
              route: t,
              contexts: y,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const o = e.getContext(t.value.outlet),
            l = o && t.value.component ? o.children : e,
            f = fo(t);
          for (const p of Object.keys(f))
            this.deactivateRouteAndItsChildren(f[p], l);
          o &&
            o.outlet &&
            (o.outlet.deactivate(),
            o.children.onOutletDeactivated(),
            (o.attachRef = null),
            (o.resolver = null),
            (o.route = null));
        }
        activateChildRoutes(t, e, o) {
          const l = fo(e);
          t.children.forEach((f) => {
            this.activateRoutes(f, l[f.value.outlet], o),
              this.forwardEvent(new ip(f.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new ds(t.value.snapshot));
        }
        activateRoutes(t, e, o) {
          const l = t.value,
            f = e ? e.value : null;
          if ((us(l), l === f))
            if (l.component) {
              const p = o.getOrCreateContext(l.outlet);
              this.activateChildRoutes(t, e, p.children);
            } else this.activateChildRoutes(t, e, o);
          else if (l.component) {
            const p = o.getOrCreateContext(l.outlet);
            if (this.routeReuseStrategy.shouldAttach(l.snapshot)) {
              const y = this.routeReuseStrategy.retrieve(l.snapshot);
              this.routeReuseStrategy.store(l.snapshot, null),
                p.children.onOutletReAttached(y.contexts),
                (p.attachRef = y.componentRef),
                (p.route = y.route.value),
                p.outlet && p.outlet.attach(y.componentRef, y.route.value),
                us(y.route.value),
                this.activateChildRoutes(t, null, p.children);
            } else {
              const y = hs(l.snapshot),
                D = y?.get(d._Vd) ?? null;
              (p.attachRef = null),
                (p.route = l),
                (p.resolver = D),
                (p.injector = y),
                p.outlet && p.outlet.activateWith(l, p.injector),
                this.activateChildRoutes(t, null, p.children);
            }
          } else this.activateChildRoutes(t, null, o);
        }
      }
      class mu {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Ma {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function hp(r, t, e) {
        const o = r._root;
        return Sa(o, t ? t._root : null, e, [o.value]);
      }
      function ps(r, t) {
        const e = Symbol(),
          o = t.get(r, e);
        return o === e
          ? 'function' != typeof r || (0, d.Z0I)(r)
            ? t.get(r)
            : r
          : o;
      }
      function Sa(
        r,
        t,
        e,
        o,
        l = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const f = fo(t);
        return (
          r.children.forEach((p) => {
            (function _b(
              r,
              t,
              e,
              o,
              l = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const f = r.value,
                p = t ? t.value : null,
                y = e ? e.getContext(r.value.outlet) : null;
              if (p && f.routeConfig === p.routeConfig) {
                const D = (function bb(r, t, e) {
                  if ('function' == typeof e) return e(r, t);
                  switch (e) {
                    case 'pathParamsChange':
                      return !os(r.url, t.url);
                    case 'pathParamsOrQueryParamsChange':
                      return (
                        !os(r.url, t.url) || !bi(r.queryParams, t.queryParams)
                      );
                    case 'always':
                      return !0;
                    case 'paramsOrQueryParamsChange':
                      return !su(r, t) || !bi(r.queryParams, t.queryParams);
                    default:
                      return !su(r, t);
                  }
                })(p, f, f.routeConfig.runGuardsAndResolvers);
                D
                  ? l.canActivateChecks.push(new mu(o))
                  : ((f.data = p.data), (f._resolvedData = p._resolvedData)),
                  Sa(r, t, f.component ? (y ? y.children : null) : e, o, l),
                  D &&
                    y &&
                    y.outlet &&
                    y.outlet.isActivated &&
                    l.canDeactivateChecks.push(new Ma(y.outlet.component, p));
              } else
                p && Aa(t, y, l),
                  l.canActivateChecks.push(new mu(o)),
                  Sa(r, null, f.component ? (y ? y.children : null) : e, o, l);
            })(p, f[p.value.outlet], e, o.concat([p.value]), l),
              delete f[p.value.outlet];
          }),
          Lt(f, (p, y) => Aa(p, e.getContext(y), l)),
          l
        );
      }
      function Aa(r, t, e) {
        const o = fo(r),
          l = r.value;
        Lt(o, (f, p) => {
          Aa(f, l.component ? (t ? t.children.getContext(p) : null) : t, e);
        }),
          e.canDeactivateChecks.push(
            new Ma(
              l.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              l
            )
          );
      }
      function $n(r) {
        return 'function' == typeof r;
      }
      function gu(r) {
        return r instanceof ha || 'EmptyError' === r?.name;
      }
      const dc = Symbol('INITIAL_VALUE');
      function gs() {
        return Sn((r) =>
          _r(r.map((t) => t.pipe(es(1), $_(dc)))).pipe(
            (0, Pe.U)((t) => {
              for (const e of t)
                if (!0 !== e) {
                  if (e === dc) return dc;
                  if (!1 === e || e instanceof co) return e;
                }
              return !0;
            }),
            gt((t) => t !== dc),
            es(1)
          )
        );
      }
      function Eb(r) {
        return (0, wt.z)(
          Tt((t) => {
            if (Dr(t)) throw Ca(0, t);
          }),
          (0, Pe.U)((t) => !0 === t)
        );
      }
      const Ia = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function Mb(r, t, e, o, l) {
        const f = bp(r, t, e);
        return f.matched
          ? (function _u(r, t, e, o) {
              const l = t.canMatch;
              return l && 0 !== l.length
                ? Ce(
                    l.map((p) => {
                      const y = ps(p, r);
                      return $i(
                        (function xb(r) {
                          return r && $n(r.canMatch);
                        })(y)
                          ? y.canMatch(t, e)
                          : r.runInContext(() => y(t, e))
                      );
                    })
                  ).pipe(gs(), Eb())
                : Ce(!0);
            })((o = dp(t, o)), t, e).pipe(
              (0, Pe.U)((p) => (!0 === p ? f : { ...Ia }))
            )
          : Ce(f);
      }
      function bp(r, t, e) {
        if ('' === t.path)
          return 'full' === t.pathMatch && (r.hasChildren() || e.length > 0)
            ? { ...Ia }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: e,
                parameters: {},
                positionalParamSegments: {},
              };
        const l = (t.matcher || Y_)(e, r, t);
        if (!l) return { ...Ia };
        const f = {};
        Lt(l.posParams, (y, D) => {
          f[D] = y.path;
        });
        const p =
          l.consumed.length > 0
            ? { ...f, ...l.consumed[l.consumed.length - 1].parameters }
            : f;
        return {
          matched: !0,
          consumedSegments: l.consumed,
          remainingSegments: e.slice(l.consumed.length),
          parameters: p,
          positionalParamSegments: l.posParams ?? {},
        };
      }
      function Fa(r, t, e, o) {
        if (
          e.length > 0 &&
          (function Tb(r, t, e) {
            return e.some((o) => Ra(r, t, o) && In(o) !== Ze);
          })(r, e, o)
        ) {
          const f = new nt(
            t,
            (function Ab(r, t, e, o) {
              const l = {};
              (l[Ze] = o),
                (o._sourceSegment = r),
                (o._segmentIndexShift = t.length);
              for (const f of e)
                if ('' === f.path && In(f) !== Ze) {
                  const p = new nt([], {});
                  (p._sourceSegment = r),
                    (p._segmentIndexShift = t.length),
                    (l[In(f)] = p);
                }
              return l;
            })(r, t, o, new nt(e, r.children))
          );
          return (
            (f._sourceSegment = r),
            (f._segmentIndexShift = t.length),
            { segmentGroup: f, slicedSegments: [] }
          );
        }
        if (
          0 === e.length &&
          (function Ib(r, t, e) {
            return e.some((o) => Ra(r, t, o));
          })(r, e, o)
        ) {
          const f = new nt(
            r.segments,
            (function Sb(r, t, e, o, l) {
              const f = {};
              for (const p of o)
                if (Ra(r, e, p) && !l[In(p)]) {
                  const y = new nt([], {});
                  (y._sourceSegment = r),
                    (y._segmentIndexShift = t.length),
                    (f[In(p)] = y);
                }
              return { ...l, ...f };
            })(r, t, e, o, r.children)
          );
          return (
            (f._sourceSegment = r),
            (f._segmentIndexShift = t.length),
            { segmentGroup: f, slicedSegments: e }
          );
        }
        const l = new nt(r.segments, r.children);
        return (
          (l._sourceSegment = r),
          (l._segmentIndexShift = t.length),
          { segmentGroup: l, slicedSegments: e }
        );
      }
      function Ra(r, t, e) {
        return (
          (!(r.hasChildren() || t.length > 0) || 'full' !== e.pathMatch) &&
          '' === e.path
        );
      }
      function Oa(r, t, e, o) {
        return (
          !!(In(r) === o || (o !== Ze && Ra(t, e, r))) &&
          ('**' === r.path || bp(t, r, e).matched)
        );
      }
      function bu(r, t, e) {
        return 0 === t.length && !r.children[e];
      }
      const _s = !1;
      class fc {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class It {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Pa(r) {
        return pa(new fc(r));
      }
      function yp(r) {
        return pa(new It(r));
      }
      class Rb {
        constructor(t, e, o, l, f) {
          (this.injector = t),
            (this.configLoader = e),
            (this.urlSerializer = o),
            (this.urlTree = l),
            (this.config = f),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = Fa(this.urlTree.root, [], [], this.config).segmentGroup,
            e = new nt(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, e, Ze)
            .pipe(
              (0, Pe.U)((f) =>
                this.createUrlTree(
                  ss(f),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Un((f) => {
                if (f instanceof It)
                  return (this.allowRedirects = !1), this.match(f.urlTree);
                throw f instanceof fc ? this.noMatchError(f) : f;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, Ze)
            .pipe(
              (0, Pe.U)((l) =>
                this.createUrlTree(ss(l), t.queryParams, t.fragment)
              )
            )
            .pipe(
              Un((l) => {
                throw l instanceof fc ? this.noMatchError(l) : l;
              })
            );
        }
        noMatchError(t) {
          return new d.vHH(4002, _s);
        }
        createUrlTree(t, e, o) {
          const l = Jl(t);
          return new co(l, e, o);
        }
        expandSegmentGroup(t, e, o, l) {
          return 0 === o.segments.length && o.hasChildren()
            ? this.expandChildren(t, e, o).pipe((0, Pe.U)((f) => new nt([], f)))
            : this.expandSegment(t, o, e, o.segments, l, !0);
        }
        expandChildren(t, e, o) {
          const l = [];
          for (const f of Object.keys(o.children))
            'primary' === f ? l.unshift(f) : l.push(f);
          return (0, Ie.D)(l).pipe(
            Ui((f) => {
              const p = o.children[f],
                y = fp(e, f);
              return this.expandSegmentGroup(t, y, p, f).pipe(
                (0, Pe.U)((D) => ({ segment: D, outlet: f }))
              );
            }),
            G_((f, p) => ((f[p.outlet] = p.segment), f), {}),
            q_()
          );
        }
        expandSegment(t, e, o, l, f, p) {
          return (0, Ie.D)(o).pipe(
            Ui((y) =>
              this.expandSegmentAgainstRoute(t, e, o, y, l, f, p).pipe(
                Un((S) => {
                  if (S instanceof fc) return Ce(null);
                  throw S;
                })
              )
            ),
            An((y) => !!y),
            Un((y, D) => {
              if (gu(y)) return bu(e, l, f) ? Ce(new nt([], {})) : Pa(e);
              throw y;
            })
          );
        }
        expandSegmentAgainstRoute(t, e, o, l, f, p, y) {
          return Oa(l, e, f, p)
            ? void 0 === l.redirectTo
              ? this.matchSegmentAgainstRoute(t, e, l, f, p)
              : y && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, e, o, l, f, p)
              : Pa(e)
            : Pa(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, o, l, f, p) {
          return '**' === l.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, o, l, p)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                o,
                l,
                f,
                p
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, o, l) {
          const f = this.applyRedirectCommands([], o.redirectTo, {});
          return o.redirectTo.startsWith('/')
            ? yp(f)
            : this.lineralizeSegments(o, f).pipe(
                (0, rn.z)((p) => {
                  const y = new nt(p, {});
                  return this.expandSegment(t, y, e, p, l, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, o, l, f, p) {
          const {
            matched: y,
            consumedSegments: D,
            remainingSegments: S,
            positionalParamSegments: R,
          } = bp(e, l, f);
          if (!y) return Pa(e);
          const B = this.applyRedirectCommands(D, l.redirectTo, R);
          return l.redirectTo.startsWith('/')
            ? yp(B)
            : this.lineralizeSegments(l, B).pipe(
                (0, rn.z)((ae) =>
                  this.expandSegment(t, e, o, ae.concat(S), p, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, o, l, f) {
          return '**' === o.path
            ? ((t = dp(o, t)),
              o.loadChildren
                ? (o._loadedRoutes
                    ? Ce({
                        routes: o._loadedRoutes,
                        injector: o._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, o)
                  ).pipe(
                    (0, Pe.U)(
                      (y) => (
                        (o._loadedRoutes = y.routes),
                        (o._loadedInjector = y.injector),
                        new nt(l, {})
                      )
                    )
                  )
                : Ce(new nt(l, {})))
            : Mb(e, o, l, t).pipe(
                Sn(
                  ({ matched: p, consumedSegments: y, remainingSegments: D }) =>
                    p
                      ? this.getChildConfig((t = o._injector ?? t), o, l).pipe(
                          (0, rn.z)((R) => {
                            const B = R.injector ?? t,
                              ae = R.routes,
                              { segmentGroup: se, slicedSegments: Q } = Fa(
                                e,
                                y,
                                D,
                                ae
                              ),
                              ce = new nt(se.segments, se.children);
                            if (0 === Q.length && ce.hasChildren())
                              return this.expandChildren(B, ae, ce).pipe(
                                (0, Pe.U)((on) => new nt(y, on))
                              );
                            if (0 === ae.length && 0 === Q.length)
                              return Ce(new nt(y, {}));
                            const ze = In(o) === f;
                            return this.expandSegment(
                              B,
                              ce,
                              ae,
                              Q,
                              ze ? Ze : f,
                              !0
                            ).pipe(
                              (0, Pe.U)(
                                (yt) =>
                                  new nt(y.concat(yt.segments), yt.children)
                              )
                            );
                          })
                        )
                      : Pa(e)
                )
              );
        }
        getChildConfig(t, e, o) {
          return e.children
            ? Ce({ routes: e.children, injector: t })
            : e.loadChildren
            ? void 0 !== e._loadedRoutes
              ? Ce({ routes: e._loadedRoutes, injector: e._loadedInjector })
              : (function Yw(r, t, e, o) {
                  const l = t.canLoad;
                  return void 0 === l || 0 === l.length
                    ? Ce(!0)
                    : Ce(
                        l.map((p) => {
                          const y = ps(p, r);
                          return $i(
                            (function yb(r) {
                              return r && $n(r.canLoad);
                            })(y)
                              ? y.canLoad(t, e)
                              : r.runInContext(() => y(t, e))
                          );
                        })
                      ).pipe(gs(), Eb());
                })(t, e, o).pipe(
                  (0, rn.z)((l) =>
                    l
                      ? this.configLoader.loadChildren(t, e).pipe(
                          Tt((f) => {
                            (e._loadedRoutes = f.routes),
                              (e._loadedInjector = f.injector);
                          })
                        )
                      : (function vp(r) {
                          return pa(Ea(_s, 3));
                        })()
                  )
                )
            : Ce({ routes: [], injector: t });
        }
        lineralizeSegments(t, e) {
          let o = [],
            l = e.root;
          for (;;) {
            if (((o = o.concat(l.segments)), 0 === l.numberOfChildren))
              return Ce(o);
            if (l.numberOfChildren > 1 || !l.children[Ze])
              return pa(new d.vHH(4e3, _s));
            l = l.children[Ze];
          }
        }
        applyRedirectCommands(t, e, o) {
          return this.applyRedirectCreateUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            o
          );
        }
        applyRedirectCreateUrlTree(t, e, o, l) {
          const f = this.createSegmentGroup(t, e.root, o, l);
          return new co(
            f,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const o = {};
          return (
            Lt(t, (l, f) => {
              if ('string' == typeof l && l.startsWith(':')) {
                const y = l.substring(1);
                o[f] = e[y];
              } else o[f] = l;
            }),
            o
          );
        }
        createSegmentGroup(t, e, o, l) {
          const f = this.createSegments(t, e.segments, o, l);
          let p = {};
          return (
            Lt(e.children, (y, D) => {
              p[D] = this.createSegmentGroup(t, y, o, l);
            }),
            new nt(f, p)
          );
        }
        createSegments(t, e, o, l) {
          return e.map((f) =>
            f.path.startsWith(':')
              ? this.findPosParam(t, f, l)
              : this.findOrReturn(f, o)
          );
        }
        findPosParam(t, e, o) {
          const l = o[e.path.substring(1)];
          if (!l) throw new d.vHH(4001, _s);
          return l;
        }
        findOrReturn(t, e) {
          let o = 0;
          for (const l of e) {
            if (l.path === t.path) return e.splice(o), l;
            o++;
          }
          return t;
        }
      }
      class Dp {}
      class Na {
        constructor(t, e, o, l, f, p, y) {
          (this.injector = t),
            (this.rootComponentType = e),
            (this.config = o),
            (this.urlTree = l),
            (this.url = f),
            (this.paramsInheritanceStrategy = p),
            (this.urlSerializer = y);
        }
        recognize() {
          const t = Fa(
            this.urlTree.root,
            [],
            [],
            this.config.filter((e) => void 0 === e.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            Ze
          ).pipe(
            (0, Pe.U)((e) => {
              if (null === e) return null;
              const o = new xa(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  Ze,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                l = new oi(o, e),
                f = new ru(this.url, l);
              return this.inheritParamsAndData(f._root), f;
            })
          );
        }
        inheritParamsAndData(t) {
          const e = t.value,
            o = iu(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(o.params)),
            (e.data = Object.freeze(o.data)),
            t.children.forEach((l) => this.inheritParamsAndData(l));
        }
        processSegmentGroup(t, e, o, l) {
          return 0 === o.segments.length && o.hasChildren()
            ? this.processChildren(t, e, o)
            : this.processSegment(t, e, o, o.segments, l);
        }
        processChildren(t, e, o) {
          return (0, Ie.D)(Object.keys(o.children)).pipe(
            Ui((l) => {
              const f = o.children[l],
                p = fp(e, l);
              return this.processSegmentGroup(t, p, f, l);
            }),
            G_((l, f) => (l && f ? (l.push(...f), l) : null)),
            (function jn(r, t = !1) {
              return (0, fn.e)((e, o) => {
                let l = 0;
                e.subscribe(
                  (0, Nt.x)(o, (f) => {
                    const p = r(f, l++);
                    (p || t) && o.next(f), !p && o.complete();
                  })
                );
              });
            })((l) => null !== l),
            yr(null),
            q_(),
            (0, Pe.U)((l) => {
              if (null === l) return null;
              const f = wu(l);
              return (
                (function vu(r) {
                  r.sort((t, e) =>
                    t.value.outlet === Ze
                      ? -1
                      : e.value.outlet === Ze
                      ? 1
                      : t.value.outlet.localeCompare(e.value.outlet)
                  );
                })(f),
                f
              );
            })
          );
        }
        processSegment(t, e, o, l, f) {
          return (0, Ie.D)(e).pipe(
            Ui((p) =>
              this.processSegmentAgainstRoute(p._injector ?? t, p, o, l, f)
            ),
            An((p) => !!p),
            Un((p) => {
              if (gu(p)) return bu(o, l, f) ? Ce([]) : Ce(null);
              throw p;
            })
          );
        }
        processSegmentAgainstRoute(t, e, o, l, f) {
          if (e.redirectTo || !Oa(e, o, l, f)) return Ce(null);
          let p;
          if ('**' === e.path) {
            const y = l.length > 0 ? ma(l).parameters : {},
              D = Du(o) + l.length;
            p = Ce({
              snapshot: new xa(
                l,
                y,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                hc(e),
                In(e),
                e.component ?? e._loadedComponent ?? null,
                e,
                Ep(o),
                D,
                kb(e)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            p = Mb(o, e, l, t).pipe(
              (0, Pe.U)(
                ({
                  matched: y,
                  consumedSegments: D,
                  remainingSegments: S,
                  parameters: R,
                }) => {
                  if (!y) return null;
                  const B = Du(o) + D.length;
                  return {
                    snapshot: new xa(
                      D,
                      R,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      hc(e),
                      In(e),
                      e.component ?? e._loadedComponent ?? null,
                      e,
                      Ep(o),
                      B,
                      kb(e)
                    ),
                    consumedSegments: D,
                    remainingSegments: S,
                  };
                }
              )
            );
          return p.pipe(
            Sn((y) => {
              if (null === y) return Ce(null);
              const {
                snapshot: D,
                consumedSegments: S,
                remainingSegments: R,
              } = y;
              t = e._injector ?? t;
              const B = e._loadedInjector ?? t,
                ae = (function xp(r) {
                  return r.children
                    ? r.children
                    : r.loadChildren
                    ? r._loadedRoutes
                    : [];
                })(e),
                { segmentGroup: se, slicedSegments: Q } = Fa(
                  o,
                  S,
                  R,
                  ae.filter((ze) => void 0 === ze.redirectTo)
                );
              if (0 === Q.length && se.hasChildren())
                return this.processChildren(B, ae, se).pipe(
                  (0, Pe.U)((ze) => (null === ze ? null : [new oi(D, ze)]))
                );
              if (0 === ae.length && 0 === Q.length) return Ce([new oi(D, [])]);
              const ce = In(e) === f;
              return this.processSegment(B, ae, se, Q, ce ? Ze : f).pipe(
                (0, Pe.U)((ze) => (null === ze ? null : [new oi(D, ze)]))
              );
            })
          );
        }
      }
      function Cp(r) {
        const t = r.value.routeConfig;
        return t && '' === t.path && void 0 === t.redirectTo;
      }
      function wu(r) {
        const t = [],
          e = new Set();
        for (const o of r) {
          if (!Cp(o)) {
            t.push(o);
            continue;
          }
          const l = t.find((f) => o.value.routeConfig === f.value.routeConfig);
          void 0 !== l ? (l.children.push(...o.children), e.add(l)) : t.push(o);
        }
        for (const o of e) {
          const l = wu(o.children);
          t.push(new oi(o.value, l));
        }
        return t.filter((o) => !e.has(o));
      }
      function Ep(r) {
        let t = r;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function Du(r) {
        let t = r,
          e = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (e += t._segmentIndexShift ?? 0);
        return e - 1;
      }
      function hc(r) {
        return r.data || {};
      }
      function kb(r) {
        return r.resolve || {};
      }
      function Ap(r) {
        return 'string' == typeof r.title || null === r.title;
      }
      function ka(r) {
        return Sn((t) => {
          const e = r(t);
          return e ? (0, Ie.D)(e).pipe((0, Pe.U)(() => t)) : Ce(t);
        });
      }
      const Mr = new d.OlP('ROUTES');
      let bs = (() => {
        class r {
          constructor(e, o) {
            (this.injector = e),
              (this.compiler = o),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(e) {
            if (this.componentLoaders.get(e))
              return this.componentLoaders.get(e);
            if (e._loadedComponent) return Ce(e._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(e);
            const o = $i(e.loadComponent()).pipe(
                (0, Pe.U)(Eu),
                Tt((f) => {
                  this.onLoadEndListener && this.onLoadEndListener(e),
                    (e._loadedComponent = f);
                }),
                ji(() => {
                  this.componentLoaders.delete(e);
                })
              ),
              l = new j_(o, () => new un.x()).pipe(Uh());
            return this.componentLoaders.set(e, l), l;
          }
          loadChildren(e, o) {
            if (this.childrenLoaders.get(o)) return this.childrenLoaders.get(o);
            if (o._loadedRoutes)
              return Ce({
                routes: o._loadedRoutes,
                injector: o._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(o);
            const f = this.loadModuleFactoryOrRoutes(o.loadChildren).pipe(
                (0, Pe.U)((y) => {
                  this.onLoadEndListener && this.onLoadEndListener(o);
                  let D,
                    S,
                    R = !1;
                  Array.isArray(y)
                    ? (S = y)
                    : ((D = y.create(e).injector),
                      (S = Yl(D.get(Mr, [], d.XFs.Self | d.XFs.Optional))));
                  return { routes: S.map(hu), injector: D };
                }),
                ji(() => {
                  this.childrenLoaders.delete(o);
                })
              ),
              p = new j_(f, () => new un.x()).pipe(Uh());
            return this.childrenLoaders.set(o, p), p;
          }
          loadModuleFactoryOrRoutes(e) {
            return $i(e()).pipe(
              (0, Pe.U)(Eu),
              (0, rn.z)((l) =>
                l instanceof d.YKP || Array.isArray(l)
                  ? Ce(l)
                  : (0, Ie.D)(this.compiler.compileModuleAsync(l))
              )
            );
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(d.zs3), d.LFG(d.Sil));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac, providedIn: 'root' })),
          r
        );
      })();
      function Eu(r) {
        return (function _o(r) {
          return r && 'object' == typeof r && 'default' in r;
        })(r)
          ? r.default
          : r;
      }
      let mc = (() => {
        class r {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new un.x()),
              (this.configLoader = (0, d.f3M)(bs)),
              (this.environmentInjector = (0, d.f3M)(d.lqb)),
              (this.urlSerializer = (0, d.f3M)(ga)),
              (this.rootContexts = (0, d.f3M)(po)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => Ce(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (l) =>
                this.events.next(new Jd(l))),
              (this.configLoader.onLoadStartListener = (l) =>
                this.events.next(new Xd(l)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(e) {
            const o = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...e, id: o });
          }
          setupNavigations(e) {
            return (
              (this.transitions = new Mn({
                id: 0,
                targetPageId: 0,
                currentUrlTree: e.currentUrlTree,
                currentRawUrl: e.currentUrlTree,
                extractedUrl: e.urlHandlingStrategy.extract(e.currentUrlTree),
                urlAfterRedirects: e.urlHandlingStrategy.extract(
                  e.currentUrlTree
                ),
                rawUrl: e.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: wa,
                restoredState: null,
                currentSnapshot: e.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: e.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                gt((o) => 0 !== o.id),
                (0, Pe.U)((o) => ({
                  ...o,
                  extractedUrl: e.urlHandlingStrategy.extract(o.rawUrl),
                })),
                Sn((o) => {
                  let l = !1,
                    f = !1;
                  return Ce(o).pipe(
                    Tt((p) => {
                      this.currentNavigation = {
                        id: p.id,
                        initialUrl: p.rawUrl,
                        extractedUrl: p.extractedUrl,
                        trigger: p.source,
                        extras: p.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Sn((p) => {
                      const y = e.browserUrlTree.toString(),
                        D =
                          !e.navigated ||
                          p.extractedUrl.toString() !== y ||
                          y !== e.currentUrlTree.toString();
                      if (
                        !D &&
                        'reload' !==
                          (p.extras.onSameUrlNavigation ??
                            e.onSameUrlNavigation)
                      ) {
                        const R = '';
                        return (
                          this.events.next(
                            new tp(p.id, e.serializeUrl(o.rawUrl), R, 0)
                          ),
                          (e.rawUrlTree = p.rawUrl),
                          p.resolve(null),
                          br.E
                        );
                      }
                      if (e.urlHandlingStrategy.shouldProcessUrl(p.rawUrl))
                        return (
                          Ip(p.source) && (e.browserUrlTree = p.extractedUrl),
                          Ce(p).pipe(
                            Sn((R) => {
                              const B = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Kd(
                                    R.id,
                                    this.urlSerializer.serialize(
                                      R.extractedUrl
                                    ),
                                    R.source,
                                    R.restoredState
                                  )
                                ),
                                B !== this.transitions?.getValue()
                                  ? br.E
                                  : Promise.resolve(R)
                              );
                            }),
                            (function Ob(r, t, e, o) {
                              return Sn((l) =>
                                (function Fb(r, t, e, o, l) {
                                  return new Rb(r, t, e, o, l).apply();
                                })(r, t, e, l.extractedUrl, o).pipe(
                                  (0, Pe.U)((f) => ({
                                    ...l,
                                    urlAfterRedirects: f,
                                  }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              e.config
                            ),
                            Tt((R) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: R.urlAfterRedirects,
                              }),
                                (o.urlAfterRedirects = R.urlAfterRedirects);
                            }),
                            (function xu(r, t, e, o, l) {
                              return (0, rn.z)((f) =>
                                (function Kw(
                                  r,
                                  t,
                                  e,
                                  o,
                                  l,
                                  f,
                                  p = 'emptyOnly'
                                ) {
                                  return new Na(r, t, e, o, l, p, f)
                                    .recognize()
                                    .pipe(
                                      Sn((y) =>
                                        null === y
                                          ? (function Zw(r) {
                                              return new en.y((t) =>
                                                t.error(r)
                                              );
                                            })(new Dp())
                                          : Ce(y)
                                      )
                                    );
                                })(
                                  r,
                                  t,
                                  e,
                                  f.urlAfterRedirects,
                                  o.serialize(f.urlAfterRedirects),
                                  o,
                                  l
                                ).pipe(
                                  (0, Pe.U)((p) => ({
                                    ...f,
                                    targetSnapshot: p,
                                  }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              e.config,
                              this.urlSerializer,
                              e.paramsInheritanceStrategy
                            ),
                            Tt((R) => {
                              if (
                                ((o.targetSnapshot = R.targetSnapshot),
                                'eager' === e.urlUpdateStrategy)
                              ) {
                                if (!R.extras.skipLocationChange) {
                                  const ae = e.urlHandlingStrategy.merge(
                                    R.urlAfterRedirects,
                                    R.rawUrl
                                  );
                                  e.setBrowserUrl(ae, R);
                                }
                                e.browserUrlTree = R.urlAfterRedirects;
                              }
                              const B = new Qd(
                                R.id,
                                this.urlSerializer.serialize(R.extractedUrl),
                                this.urlSerializer.serialize(
                                  R.urlAfterRedirects
                                ),
                                R.targetSnapshot
                              );
                              this.events.next(B);
                            })
                          )
                        );
                      if (
                        D &&
                        e.urlHandlingStrategy.shouldProcessUrl(e.rawUrlTree)
                      ) {
                        const {
                            id: R,
                            extractedUrl: B,
                            source: ae,
                            restoredState: se,
                            extras: Q,
                          } = p,
                          ce = new Kd(
                            R,
                            this.urlSerializer.serialize(B),
                            ae,
                            se
                          );
                        this.events.next(ce);
                        const ze = sp(B, this.rootComponentType).snapshot;
                        return Ce(
                          (o = {
                            ...p,
                            targetSnapshot: ze,
                            urlAfterRedirects: B,
                            extras: {
                              ...Q,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const R = '';
                        return (
                          this.events.next(
                            new tp(p.id, e.serializeUrl(o.extractedUrl), R, 1)
                          ),
                          (e.rawUrlTree = p.rawUrl),
                          p.resolve(null),
                          br.E
                        );
                      }
                    }),
                    Tt((p) => {
                      const y = new ob(
                        p.id,
                        this.urlSerializer.serialize(p.extractedUrl),
                        this.urlSerializer.serialize(p.urlAfterRedirects),
                        p.targetSnapshot
                      );
                      this.events.next(y);
                    }),
                    (0, Pe.U)(
                      (p) =>
                        (o = {
                          ...p,
                          guards: hp(
                            p.targetSnapshot,
                            p.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function Cb(r, t) {
                      return (0, rn.z)((e) => {
                        const {
                          targetSnapshot: o,
                          currentSnapshot: l,
                          guards: {
                            canActivateChecks: f,
                            canDeactivateChecks: p,
                          },
                        } = e;
                        return 0 === p.length && 0 === f.length
                          ? Ce({ ...e, guardsResult: !0 })
                          : (function uc(r, t, e, o) {
                              return (0, Ie.D)(r).pipe(
                                (0, rn.z)((l) =>
                                  (function Ww(r, t, e, o, l) {
                                    const f =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return f && 0 !== f.length
                                      ? Ce(
                                          f.map((y) => {
                                            const D = hs(t) ?? l,
                                              S = ps(y, D);
                                            return $i(
                                              (function Db(r) {
                                                return r && $n(r.canDeactivate);
                                              })(S)
                                                ? S.canDeactivate(r, t, e, o)
                                                : D.runInContext(() =>
                                                    S(r, t, e, o)
                                                  )
                                            ).pipe(An());
                                          })
                                        ).pipe(gs())
                                      : Ce(!0);
                                  })(l.component, l.route, e, t, o)
                                ),
                                An((l) => !0 !== l, !0)
                              );
                            })(p, o, l, r).pipe(
                              (0, rn.z)((y) =>
                                y &&
                                (function ms(r) {
                                  return 'boolean' == typeof r;
                                })(y)
                                  ? (function qi(r, t, e, o) {
                                      return (0, Ie.D)(t).pipe(
                                        Ui((l) =>
                                          Ld(
                                            (function mp(r, t) {
                                              return (
                                                null !== r && t && t(new np(r)),
                                                Ce(!0)
                                              );
                                            })(l.route.parent, o),
                                            (function Ta(r, t) {
                                              return (
                                                null !== r && t && t(new eu(r)),
                                                Ce(!0)
                                              );
                                            })(l.route, o),
                                            (function _p(r, t, e) {
                                              const o = t[t.length - 1],
                                                f = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((p) =>
                                                    (function mo(r) {
                                                      const t = r.routeConfig
                                                        ? r.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: r, guards: t }
                                                        : null;
                                                    })(p)
                                                  )
                                                  .filter((p) => null !== p)
                                                  .map((p) =>
                                                    Bh(() =>
                                                      Ce(
                                                        p.guards.map((D) => {
                                                          const S =
                                                              hs(p.node) ?? e,
                                                            R = ps(D, S);
                                                          return $i(
                                                            (function wb(r) {
                                                              return (
                                                                r &&
                                                                $n(
                                                                  r.canActivateChild
                                                                )
                                                              );
                                                            })(R)
                                                              ? R.canActivateChild(
                                                                  o,
                                                                  r
                                                                )
                                                              : S.runInContext(
                                                                  () => R(o, r)
                                                                )
                                                          ).pipe(An());
                                                        })
                                                      ).pipe(gs())
                                                    )
                                                  );
                                              return Ce(f).pipe(gs());
                                            })(r, l.path, e),
                                            (function gp(r, t, e) {
                                              const o = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!o || 0 === o.length)
                                                return Ce(!0);
                                              const l = o.map((f) =>
                                                Bh(() => {
                                                  const p = hs(t) ?? e,
                                                    y = ps(f, p);
                                                  return $i(
                                                    (function vb(r) {
                                                      return (
                                                        r && $n(r.canActivate)
                                                      );
                                                    })(y)
                                                      ? y.canActivate(t, r)
                                                      : p.runInContext(() =>
                                                          y(t, r)
                                                        )
                                                  ).pipe(An());
                                                })
                                              );
                                              return Ce(l).pipe(gs());
                                            })(r, l.route, e)
                                          )
                                        ),
                                        An((l) => !0 !== l, !0)
                                      );
                                    })(o, f, r, t)
                                  : Ce(y)
                              ),
                              (0, Pe.U)((y) => ({ ...e, guardsResult: y }))
                            );
                      });
                    })(this.environmentInjector, (p) => this.events.next(p)),
                    Tt((p) => {
                      if (
                        ((o.guardsResult = p.guardsResult), Dr(p.guardsResult))
                      )
                        throw Ca(0, p.guardsResult);
                      const y = new Da(
                        p.id,
                        this.urlSerializer.serialize(p.extractedUrl),
                        this.urlSerializer.serialize(p.urlAfterRedirects),
                        p.targetSnapshot,
                        !!p.guardsResult
                      );
                      this.events.next(y);
                    }),
                    gt(
                      (p) =>
                        !!p.guardsResult ||
                        (e.restoreHistory(p),
                        this.cancelNavigationTransition(p, '', 3),
                        !1)
                    ),
                    ka((p) => {
                      if (p.guards.canActivateChecks.length)
                        return Ce(p).pipe(
                          Tt((y) => {
                            const D = new sb(
                              y.id,
                              this.urlSerializer.serialize(y.extractedUrl),
                              this.urlSerializer.serialize(y.urlAfterRedirects),
                              y.targetSnapshot
                            );
                            this.events.next(D);
                          }),
                          Sn((y) => {
                            let D = !1;
                            return Ce(y).pipe(
                              (function Lb(r, t) {
                                return (0, rn.z)((e) => {
                                  const {
                                    targetSnapshot: o,
                                    guards: { canActivateChecks: l },
                                  } = e;
                                  if (!l.length) return Ce(e);
                                  let f = 0;
                                  return (0, Ie.D)(l).pipe(
                                    Ui((p) =>
                                      (function Cu(r, t, e, o) {
                                        const l = r.routeConfig,
                                          f = r._resolve;
                                        return (
                                          void 0 !== l?.title &&
                                            !Ap(l) &&
                                            (f[ts] = l.title),
                                          (function Mp(r, t, e, o) {
                                            const l = (function Sp(r) {
                                              return [
                                                ...Object.keys(r),
                                                ...Object.getOwnPropertySymbols(
                                                  r
                                                ),
                                              ];
                                            })(r);
                                            if (0 === l.length) return Ce({});
                                            const f = {};
                                            return (0, Ie.D)(l).pipe(
                                              (0, rn.z)((p) =>
                                                (function go(r, t, e, o) {
                                                  const l = hs(t) ?? o,
                                                    f = ps(r, l);
                                                  return $i(
                                                    f.resolve
                                                      ? f.resolve(t, e)
                                                      : l.runInContext(() =>
                                                          f(t, e)
                                                        )
                                                  );
                                                })(r[p], t, e, o).pipe(
                                                  An(),
                                                  Tt((y) => {
                                                    f[p] = y;
                                                  })
                                                )
                                              ),
                                              Bd(1),
                                              (function Hd(r) {
                                                return (0, Pe.U)(() => r);
                                              })(f),
                                              Un((p) => (gu(p) ? br.E : pa(p)))
                                            );
                                          })(f, r, t, o).pipe(
                                            (0, Pe.U)(
                                              (p) => (
                                                (r._resolvedData = p),
                                                (r.data = iu(r, e).resolve),
                                                l &&
                                                  Ap(l) &&
                                                  (r.data[ts] = l.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(p.route, o, r, t)
                                    ),
                                    Tt(() => f++),
                                    Bd(1),
                                    (0, rn.z)((p) =>
                                      f === l.length ? Ce(e) : br.E
                                    )
                                  );
                                });
                              })(
                                e.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Tt({
                                next: () => (D = !0),
                                complete: () => {
                                  D ||
                                    (e.restoreHistory(y),
                                    this.cancelNavigationTransition(y, '', 2));
                                },
                              })
                            );
                          }),
                          Tt((y) => {
                            const D = new ab(
                              y.id,
                              this.urlSerializer.serialize(y.extractedUrl),
                              this.urlSerializer.serialize(y.urlAfterRedirects),
                              y.targetSnapshot
                            );
                            this.events.next(D);
                          })
                        );
                    }),
                    ka((p) => {
                      const y = (D) => {
                        const S = [];
                        D.routeConfig?.loadComponent &&
                          !D.routeConfig._loadedComponent &&
                          S.push(
                            this.configLoader.loadComponent(D.routeConfig).pipe(
                              Tt((R) => {
                                D.component = R;
                              }),
                              (0, Pe.U)(() => {})
                            )
                          );
                        for (const R of D.children) S.push(...y(R));
                        return S;
                      };
                      return _r(y(p.targetSnapshot.root)).pipe(yr(), es(1));
                    }),
                    ka(() => this.afterPreactivation()),
                    (0, Pe.U)((p) => {
                      const y = (function ap(r, t, e) {
                        const o = fs(r, t._root, e ? e._root : void 0);
                        return new sc(o, t);
                      })(
                        e.routeReuseStrategy,
                        p.targetSnapshot,
                        p.currentRouterState
                      );
                      return (o = { ...p, targetRouterState: y });
                    }),
                    Tt((p) => {
                      (e.currentUrlTree = p.urlAfterRedirects),
                        (e.rawUrlTree = e.urlHandlingStrategy.merge(
                          p.urlAfterRedirects,
                          p.rawUrl
                        )),
                        (e.routerState = p.targetRouterState),
                        'deferred' === e.urlUpdateStrategy &&
                          (p.extras.skipLocationChange ||
                            e.setBrowserUrl(e.rawUrlTree, p),
                          (e.browserUrlTree = p.urlAfterRedirects));
                    }),
                    ((r, t, e) =>
                      (0, Pe.U)(
                        (o) => (
                          new pu(
                            t,
                            o.targetRouterState,
                            o.currentRouterState,
                            e
                          ).activate(r),
                          o
                        )
                      ))(this.rootContexts, e.routeReuseStrategy, (p) =>
                      this.events.next(p)
                    ),
                    Tt({
                      next: (p) => {
                        (l = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (e.navigated = !0),
                          this.events.next(
                            new xr(
                              p.id,
                              this.urlSerializer.serialize(p.extractedUrl),
                              this.urlSerializer.serialize(e.currentUrlTree)
                            )
                          ),
                          e.titleStrategy?.updateTitle(
                            p.targetRouterState.snapshot
                          ),
                          p.resolve(!0);
                      },
                      complete: () => {
                        l = !0;
                      },
                    }),
                    ji(() => {
                      l || f || this.cancelNavigationTransition(o, '', 1),
                        this.currentNavigation?.id === o.id &&
                          (this.currentNavigation = null);
                    }),
                    Un((p) => {
                      if (((f = !0), lc(p))) {
                        lu(p) || ((e.navigated = !0), e.restoreHistory(o, !0));
                        const y = new ic(
                          o.id,
                          this.urlSerializer.serialize(o.extractedUrl),
                          p.message,
                          p.cancellationCode
                        );
                        if ((this.events.next(y), lu(p))) {
                          const D = e.urlHandlingStrategy.merge(
                              p.url,
                              e.rawUrlTree
                            ),
                            S = {
                              skipLocationChange: o.extras.skipLocationChange,
                              replaceUrl:
                                'eager' === e.urlUpdateStrategy || Ip(o.source),
                            };
                          e.scheduleNavigation(D, wa, null, S, {
                            resolve: o.resolve,
                            reject: o.reject,
                            promise: o.promise,
                          });
                        } else o.resolve(!1);
                      } else {
                        e.restoreHistory(o, !0);
                        const y = new rc(
                          o.id,
                          this.urlSerializer.serialize(o.extractedUrl),
                          p,
                          o.targetSnapshot ?? void 0
                        );
                        this.events.next(y);
                        try {
                          o.resolve(e.errorHandler(p));
                        } catch (D) {
                          o.reject(D);
                        }
                      }
                      return br.E;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(e, o, l) {
            const f = new ic(
              e.id,
              this.urlSerializer.serialize(e.extractedUrl),
              o,
              l
            );
            this.events.next(f), e.resolve(!1);
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)();
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac, providedIn: 'root' })),
          r
        );
      })();
      function Ip(r) {
        return r !== wa;
      }
      let Mu = (() => {
          class r {
            buildTitle(e) {
              let o,
                l = e.root;
              for (; void 0 !== l; )
                (o = this.getResolvedTitleForRoute(l) ?? o),
                  (l = l.children.find((f) => f.outlet === Ze));
              return o;
            }
            getResolvedTitleForRoute(e) {
              return e.data[ts];
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: function () {
                return (0, d.f3M)(vs);
              },
              providedIn: 'root',
            })),
            r
          );
        })(),
        vs = (() => {
          class r extends Mu {
            constructor(e) {
              super(), (this.title = e);
            }
            updateTitle(e) {
              const o = this.buildTitle(e);
              void 0 !== o && this.title.setTitle(o);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.LFG(Ti));
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: r.??fac,
              providedIn: 'root',
            })),
            r
          );
        })(),
        Vb = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: function () {
                return (0, d.f3M)(Hb);
              },
              providedIn: 'root',
            })),
            r
          );
        })();
      class Bb {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      }
      let Hb = (() => {
        class r extends Bb {}
        return (
          (r.??fac = (function () {
            let t;
            return function (o) {
              return (t || (t = d.n5z(r)))(o || r);
            };
          })()),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac, providedIn: 'root' })),
          r
        );
      })();
      const gc = new d.OlP('', { providedIn: 'root', factory: () => ({}) });
      let Fp = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: function () {
                return (0, d.f3M)(Ub);
              },
              providedIn: 'root',
            })),
            r
          );
        })(),
        Ub = (() => {
          class r {
            shouldProcessUrl(e) {
              return !0;
            }
            extract(e) {
              return e;
            }
            merge(e, o) {
              return e;
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: r.??fac,
              providedIn: 'root',
            })),
            r
          );
        })();
      function Qw(r) {
        throw r;
      }
      function jb(r, t, e) {
        return t.parse('/');
      }
      const La = {
          paths: 'exact',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'exact',
        },
        $b = {
          paths: 'subset',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'subset',
        };
      let Yt = (() => {
          class r {
            get navigationId() {
              return this.navigationTransitions.navigationId;
            }
            get browserPageId() {
              return this.location.getState()?.??routerPageId;
            }
            get events() {
              return this.navigationTransitions.events;
            }
            constructor() {
              (this.disposed = !1),
                (this.currentPageId = 0),
                (this.console = (0, d.f3M)(d.c2e)),
                (this.isNgZoneEnabled = !1),
                (this.options = (0, d.f3M)(gc, { optional: !0 }) || {}),
                (this.errorHandler = this.options.errorHandler || Qw),
                (this.malformedUriErrorHandler =
                  this.options.malformedUriErrorHandler || jb),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.urlHandlingStrategy = (0, d.f3M)(Fp)),
                (this.routeReuseStrategy = (0, d.f3M)(Vb)),
                (this.urlCreationStrategy = (0, d.f3M)(cb)),
                (this.titleStrategy = (0, d.f3M)(Mu)),
                (this.onSameUrlNavigation =
                  this.options.onSameUrlNavigation || 'ignore'),
                (this.paramsInheritanceStrategy =
                  this.options.paramsInheritanceStrategy || 'emptyOnly'),
                (this.urlUpdateStrategy =
                  this.options.urlUpdateStrategy || 'deferred'),
                (this.canceledNavigationResolution =
                  this.options.canceledNavigationResolution || 'replace'),
                (this.config = Yl((0, d.f3M)(Mr, { optional: !0 }) ?? [])),
                (this.navigationTransitions = (0, d.f3M)(mc)),
                (this.urlSerializer = (0, d.f3M)(ga)),
                (this.location = (0, d.f3M)(E.Ye)),
                (this.isNgZoneEnabled =
                  (0, d.f3M)(d.R0b) instanceof d.R0b &&
                  d.R0b.isInAngularZone()),
                this.resetConfig(this.config),
                (this.currentUrlTree = new co()),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.routerState = sp(this.currentUrlTree, null)),
                this.navigationTransitions.setupNavigations(this).subscribe(
                  (e) => {
                    (this.lastSuccessfulId = e.id),
                      (this.currentPageId = e.targetPageId);
                  },
                  (e) => {
                    this.console.warn(`Unhandled Navigation Error: ${e}`);
                  }
                );
            }
            resetRootComponentType(e) {
              (this.routerState.root.component = e),
                (this.navigationTransitions.rootComponentType = e);
            }
            initialNavigation() {
              if (
                (this.setUpLocationChangeListener(),
                !this.navigationTransitions.hasRequestedNavigation)
              ) {
                const e = this.location.getState();
                this.navigateToSyncWithBrowser(this.location.path(!0), wa, e);
              }
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((e) => {
                  const o = 'popstate' === e.type ? 'popstate' : 'hashchange';
                  'popstate' === o &&
                    setTimeout(() => {
                      this.navigateToSyncWithBrowser(e.url, o, e.state);
                    }, 0);
                }));
            }
            navigateToSyncWithBrowser(e, o, l) {
              const f = { replaceUrl: !0 },
                p = l?.navigationId ? l : null;
              if (l) {
                const D = { ...l };
                delete D.navigationId,
                  delete D.??routerPageId,
                  0 !== Object.keys(D).length && (f.state = D);
              }
              const y = this.parseUrl(e);
              this.scheduleNavigation(y, o, p, f);
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.navigationTransitions.currentNavigation;
            }
            resetConfig(e) {
              (this.config = e.map(hu)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.navigationTransitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(),
                  (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(e, o = {}) {
              const {
                  relativeTo: l,
                  queryParams: f,
                  fragment: p,
                  queryParamsHandling: y,
                  preserveFragment: D,
                } = o,
                S = D ? this.currentUrlTree.fragment : p;
              let R = null;
              switch (y) {
                case 'merge':
                  R = { ...this.currentUrlTree.queryParams, ...f };
                  break;
                case 'preserve':
                  R = this.currentUrlTree.queryParams;
                  break;
                default:
                  R = f || null;
              }
              return (
                null !== R && (R = this.removeEmptyProps(R)),
                this.urlCreationStrategy.createUrlTree(
                  l,
                  this.routerState,
                  this.currentUrlTree,
                  e,
                  R,
                  S ?? null
                )
              );
            }
            navigateByUrl(e, o = { skipLocationChange: !1 }) {
              const l = Dr(e) ? e : this.parseUrl(e),
                f = this.urlHandlingStrategy.merge(l, this.rawUrlTree);
              return this.scheduleNavigation(f, wa, null, o);
            }
            navigate(e, o = { skipLocationChange: !1 }) {
              return (
                (function Va(r) {
                  for (let t = 0; t < r.length; t++) {
                    if (null == r[t]) throw new d.vHH(4008, !1);
                  }
                })(e),
                this.navigateByUrl(this.createUrlTree(e, o), o)
              );
            }
            serializeUrl(e) {
              return this.urlSerializer.serialize(e);
            }
            parseUrl(e) {
              let o;
              try {
                o = this.urlSerializer.parse(e);
              } catch (l) {
                o = this.malformedUriErrorHandler(l, this.urlSerializer, e);
              }
              return o;
            }
            isActive(e, o) {
              let l;
              if (
                ((l = !0 === o ? { ...La } : !1 === o ? { ...$b } : o), Dr(e))
              )
                return is(this.currentUrlTree, e, l);
              const f = this.parseUrl(e);
              return is(this.currentUrlTree, f, l);
            }
            removeEmptyProps(e) {
              return Object.keys(e).reduce((o, l) => {
                const f = e[l];
                return null != f && (o[l] = f), o;
              }, {});
            }
            scheduleNavigation(e, o, l, f, p) {
              if (this.disposed) return Promise.resolve(!1);
              let y, D, S, R;
              return (
                p
                  ? ((y = p.resolve), (D = p.reject), (S = p.promise))
                  : (S = new Promise((B, ae) => {
                      (y = B), (D = ae);
                    })),
                (R =
                  'computed' === this.canceledNavigationResolution
                    ? l && l.??routerPageId
                      ? l.??routerPageId
                      : f.replaceUrl || f.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1
                    : 0),
                this.navigationTransitions.handleNavigationRequest({
                  targetPageId: R,
                  source: o,
                  restoredState: l,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  rawUrl: e,
                  extras: f,
                  resolve: y,
                  reject: D,
                  promise: S,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                S.catch((B) => Promise.reject(B))
              );
            }
            setBrowserUrl(e, o) {
              const l = this.urlSerializer.serialize(e),
                f = {
                  ...o.extras.state,
                  ...this.generateNgRouterState(o.id, o.targetPageId),
                };
              this.location.isCurrentPathEqualTo(l) || o.extras.replaceUrl
                ? this.location.replaceState(l, '', f)
                : this.location.go(l, '', f);
            }
            restoreHistory(e, o = !1) {
              if ('computed' === this.canceledNavigationResolution) {
                const l = this.currentPageId - e.targetPageId;
                ('popstate' !== e.source &&
                  'eager' !== this.urlUpdateStrategy &&
                  this.currentUrlTree !==
                    this.getCurrentNavigation()?.finalUrl) ||
                0 === l
                  ? this.currentUrlTree ===
                      this.getCurrentNavigation()?.finalUrl &&
                    0 === l &&
                    (this.resetState(e),
                    (this.browserUrlTree = e.currentUrlTree),
                    this.resetUrlToCurrentUrlTree())
                  : this.location.historyGo(l);
              } else
                'replace' === this.canceledNavigationResolution &&
                  (o && this.resetState(e), this.resetUrlToCurrentUrlTree());
            }
            resetState(e) {
              (this.routerState = e.currentRouterState),
                (this.currentUrlTree = e.currentUrlTree),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  e.rawUrl
                ));
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                '',
                this.generateNgRouterState(
                  this.lastSuccessfulId,
                  this.currentPageId
                )
              );
            }
            generateNgRouterState(e, o) {
              return 'computed' === this.canceledNavigationResolution
                ? { navigationId: e, ??routerPageId: o }
                : { navigationId: e };
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: r.??fac,
              providedIn: 'root',
            })),
            r
          );
        })(),
        Ba = (() => {
          class r {
            constructor(e, o, l, f, p, y) {
              (this.router = e),
                (this.route = o),
                (this.tabIndexAttribute = l),
                (this.renderer = f),
                (this.el = p),
                (this.locationStrategy = y),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new un.x());
              const D = p.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = 'a' === D || 'area' === D),
                this.isAnchorElement
                  ? (this.subscription = e.events.subscribe((S) => {
                      S instanceof xr && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl('0');
            }
            set preserveFragment(e) {
              this._preserveFragment = (0, d.D6c)(e);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(e) {
              this._skipLocationChange = (0, d.D6c)(e);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(e) {
              this._replaceUrl = (0, d.D6c)(e);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(e) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue('tabindex', e);
            }
            ngOnChanges(e) {
              this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
            }
            set routerLink(e) {
              null != e
                ? ((this.commands = Array.isArray(e) ? e : [e]),
                  this.setTabIndexIfNotOnNativeEl('0'))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(e, o, l, f, p) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== e ||
                      o ||
                      l ||
                      f ||
                      p ||
                      ('string' == typeof this.target &&
                        '_self' != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
              const e =
                null === this.href
                  ? null
                  : (0, d.P3R)(
                      this.href,
                      this.el.nativeElement.tagName.toLowerCase(),
                      'href'
                    );
              this.applyAttributeValue('href', e);
            }
            applyAttributeValue(e, o) {
              const l = this.renderer,
                f = this.el.nativeElement;
              null !== o ? l.setAttribute(f, e, o) : l.removeAttribute(f, e);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(
                d.Y36(Yt),
                d.Y36(Cr),
                d.$8M('tabindex'),
                d.Y36(d.Qsj),
                d.Y36(d.SBq),
                d.Y36(E.S$)
              );
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [['', 'routerLink', '']],
              hostVars: 1,
              hostBindings: function (e, o) {
                1 & e &&
                  d.NdJ('click', function (f) {
                    return o.onClick(
                      f.button,
                      f.ctrlKey,
                      f.shiftKey,
                      f.altKey,
                      f.metaKey
                    );
                  }),
                  2 & e && d.uIk('target', o.target);
              },
              inputs: {
                target: 'target',
                queryParams: 'queryParams',
                fragment: 'fragment',
                queryParamsHandling: 'queryParamsHandling',
                state: 'state',
                relativeTo: 'relativeTo',
                preserveFragment: 'preserveFragment',
                skipLocationChange: 'skipLocationChange',
                replaceUrl: 'replaceUrl',
                routerLink: 'routerLink',
              },
              standalone: !0,
              features: [d.TTD],
            })),
            r
          );
        })();
      class Op {}
      let qb = (() => {
        class r {
          constructor(e, o, l, f, p) {
            (this.router = e),
              (this.injector = l),
              (this.preloadingStrategy = f),
              (this.loader = p);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                gt((e) => e instanceof xr),
                Ui(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(e, o) {
            const l = [];
            for (const f of o) {
              f.providers &&
                !f._injector &&
                (f._injector = (0, d.MMx)(f.providers, e, `Route: ${f.path}`));
              const p = f._injector ?? e,
                y = f._loadedInjector ?? p;
              (f.loadChildren && !f._loadedRoutes && void 0 === f.canLoad) ||
              (f.loadComponent && !f._loadedComponent)
                ? l.push(this.preloadConfig(p, f))
                : (f.children || f._loadedRoutes) &&
                  l.push(this.processRoutes(y, f.children ?? f._loadedRoutes));
            }
            return (0, Ie.D)(l).pipe((0, ao.J)());
          }
          preloadConfig(e, o) {
            return this.preloadingStrategy.preload(o, () => {
              let l;
              l =
                o.loadChildren && void 0 === o.canLoad
                  ? this.loader.loadChildren(e, o)
                  : Ce(null);
              const f = l.pipe(
                (0, rn.z)((p) =>
                  null === p
                    ? Ce(void 0)
                    : ((o._loadedRoutes = p.routes),
                      (o._loadedInjector = p.injector),
                      this.processRoutes(p.injector ?? e, p.routes))
                )
              );
              if (o.loadComponent && !o._loadedComponent) {
                const p = this.loader.loadComponent(o);
                return (0, Ie.D)([f, p]).pipe((0, ao.J)());
              }
              return f;
            });
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(
              d.LFG(Yt),
              d.LFG(d.Sil),
              d.LFG(d.lqb),
              d.LFG(Op),
              d.LFG(bs)
            );
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac, providedIn: 'root' })),
          r
        );
      })();
      const Ha = new d.OlP('');
      let _c = (() => {
        class r {
          constructor(e, o, l, f, p = {}) {
            (this.urlSerializer = e),
              (this.transitions = o),
              (this.viewportScroller = l),
              (this.zone = f),
              (this.options = p),
              (this.lastId = 0),
              (this.lastSource = 'imperative'),
              (this.restoredId = 0),
              (this.store = {}),
              (p.scrollPositionRestoration =
                p.scrollPositionRestoration || 'disabled'),
              (p.anchorScrolling = p.anchorScrolling || 'disabled');
          }
          init() {
            'disabled' !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration('manual'),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((e) => {
              e instanceof Kd
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = e.navigationTrigger),
                  (this.restoredId = e.restoredState
                    ? e.restoredState.navigationId
                    : 0))
                : e instanceof xr &&
                  ((this.lastId = e.id),
                  this.scheduleScrollEvent(
                    e,
                    this.urlSerializer.parse(e.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((e) => {
              e instanceof rp &&
                (e.position
                  ? 'top' === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : 'enabled' === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(e.position)
                  : e.anchor && 'enabled' === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(e.anchor)
                  : 'disabled' !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(e, o) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new rp(
                      e,
                      'popstate' === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      o
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (r.??fac = function (e) {
            d.$Z();
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      function bo(r, t) {
        return { ??kind: r, ??providers: t };
      }
      function Np() {
        const r = (0, d.f3M)(d.zs3);
        return (t) => {
          const e = r.get(d.z2F);
          if (t !== e.components[0]) return;
          const o = r.get(Yt),
            l = r.get(kp);
          1 === r.get(Sr) && o.initialNavigation(),
            r.get(Kb, null, d.XFs.Optional)?.setUpPreloading(),
            r.get(Ha, null, d.XFs.Optional)?.init(),
            o.resetRootComponentType(e.componentTypes[0]),
            l.closed || (l.next(), l.unsubscribe());
        };
      }
      const kp = new d.OlP('', { factory: () => new un.x() }),
        Sr = new d.OlP('', { providedIn: 'root', factory: () => 1 });
      const Kb = new d.OlP('');
      function tD(r) {
        return bo(0, [
          { provide: Kb, useExisting: qb },
          { provide: Op, useExisting: r },
        ]);
      }
      const Lp = new d.OlP('ROUTER_FORROOT_GUARD'),
        Vp = [
          E.Ye,
          { provide: ga, useClass: $d },
          Yt,
          po,
          {
            provide: Cr,
            useFactory: function Ds(r) {
              return r.routerState.root;
            },
            deps: [Yt],
          },
          bs,
          [],
        ];
      function Jb() {
        return new d.PXZ('Router', Yt);
      }
      let Bp = (() => {
        class r {
          constructor(e) {}
          static forRoot(e, o) {
            return {
              ngModule: r,
              providers: [
                Vp,
                [],
                { provide: Mr, multi: !0, useValue: e },
                {
                  provide: Lp,
                  useFactory: ty,
                  deps: [[Yt, new d.FiY(), new d.tp0()]],
                },
                { provide: gc, useValue: o || {} },
                o?.useHash
                  ? { provide: E.S$, useClass: E.Do }
                  : { provide: E.S$, useClass: E.b0 },
                {
                  provide: Ha,
                  useFactory: () => {
                    const r = (0, d.f3M)(E.EM),
                      t = (0, d.f3M)(d.R0b),
                      e = (0, d.f3M)(gc),
                      o = (0, d.f3M)(mc),
                      l = (0, d.f3M)(ga);
                    return (
                      e.scrollOffset && r.setOffset(e.scrollOffset),
                      new _c(l, o, r, t, e)
                    );
                  },
                },
                o?.preloadingStrategy
                  ? tD(o.preloadingStrategy).??providers
                  : [],
                { provide: d.PXZ, multi: !0, useFactory: Jb },
                o?.initialNavigation ? ny(o) : [],
                [
                  { provide: Up, useFactory: Np },
                  { provide: d.tb, multi: !0, useExisting: Up },
                ],
              ],
            };
          }
          static forChild(e) {
            return {
              ngModule: r,
              providers: [{ provide: Mr, multi: !0, useValue: e }],
            };
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(Lp, 8));
          }),
          (r.??mod = d.oAB({ type: r })),
          (r.??inj = d.cJS({ imports: [uu] })),
          r
        );
      })();
      function ty(r) {
        return 'guarded';
      }
      function ny(r) {
        return [
          'disabled' === r.initialNavigation
            ? bo(3, [
                {
                  provide: d.ip1,
                  multi: !0,
                  useFactory: () => {
                    const t = (0, d.f3M)(Yt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Sr, useValue: 2 },
              ]).??providers
            : [],
          'enabledBlocking' === r.initialNavigation
            ? bo(2, [
                { provide: Sr, useValue: 0 },
                {
                  provide: d.ip1,
                  multi: !0,
                  deps: [d.zs3],
                  useFactory: (t) => {
                    const e = t.get(E.V_, Promise.resolve());
                    return () =>
                      e.then(
                        () =>
                          new Promise((l) => {
                            const f = t.get(Yt),
                              p = t.get(kp);
                            (function o(l) {
                              t.get(Yt)
                                .events.pipe(
                                  gt(
                                    (p) =>
                                      p instanceof xr ||
                                      p instanceof ic ||
                                      p instanceof rc
                                  ),
                                  (0, Pe.U)(
                                    (p) =>
                                      p instanceof xr ||
                                      (p instanceof ic &&
                                        (0 === p.code || 1 === p.code) &&
                                        null)
                                  ),
                                  gt((p) => null !== p),
                                  es(1)
                                )
                                .subscribe(() => {
                                  l();
                                });
                            })(() => {
                              l(!0);
                            }),
                              (t.get(mc).afterPreactivation = () => (
                                l(!0), p.closed ? Ce(void 0) : p
                              )),
                              f.initialNavigation();
                          })
                      );
                  },
                },
              ]).??providers
            : [],
        ];
      }
      const Up = new d.OlP('');
      class Ua {
        constructor(t) {
          this.activate = t;
        }
        ngOnInit() {
          this.activate.queryParamMap.subscribe((t) => {
            console.log(t);
          });
        }
      }
      (Ua.??fac = function (t) {
        return new (t || Ua)(d.Y36(Cr));
      }),
        (Ua.??cmp = d.Xpm({
          type: Ua,
          selectors: [['app-product-detail']],
          decls: 3,
          vars: 0,
          consts: [[1, 'container']],
          template: function (t, e) {
            1 & t &&
              (d.TgZ(0, 'div', 0)(1, 'h1'),
              d._uU(2, 'Product Details'),
              d.qZA()());
          },
        }));
      class ja {}
      (ja.??fac = function (t) {
        return new (t || ja)();
      }),
        (ja.??cmp = d.Xpm({
          type: ja,
          selectors: [['app-error-page']],
          decls: 3,
          vars: 0,
          consts: [[1, 'page']],
          template: function (t, e) {
            1 & t &&
              (d.TgZ(0, 'div', 0)(1, 'h1'),
              d._uU(2, '404 Page Not Found'),
              d.qZA()());
          },
          styles: [
            '.page[_ngcontent-%COMP%]{display:flex;height:100vh;justify-content:center;align-items:center}',
          ],
        }));
      class bc {}
      class je {}
      class yi {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  'string' == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split('\n').forEach((e) => {
                            const o = e.indexOf(':');
                            if (o > 0) {
                              const l = e.slice(0, o),
                                f = l.toLowerCase(),
                                p = e.slice(o + 1).trim();
                              this.maybeSetNormalizedName(l, f),
                                this.headers.has(f)
                                  ? this.headers.get(f).push(p)
                                  : this.headers.set(f, [p]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let o = t[e];
                            const l = e.toLowerCase();
                            'string' == typeof o && (o = [o]),
                              o.length > 0 &&
                                (this.headers.set(l, o),
                                this.maybeSetNormalizedName(e, l));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: 'a' });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: 's' });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: 'd' });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof yi
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new yi();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof yi
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case 'a':
            case 's':
              let o = t.value;
              if (('string' == typeof o && (o = [o]), 0 === o.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const l = ('a' === t.op ? this.headers.get(e) : void 0) || [];
              l.push(...o), this.headers.set(e, l);
              break;
            case 'd':
              const f = t.value;
              if (f) {
                let p = this.headers.get(e);
                if (!p) return;
                (p = p.filter((y) => -1 === f.indexOf(y))),
                  0 === p.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, p);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class jp {
        encodeKey(t) {
          return zp(t);
        }
        encodeValue(t) {
          return zp(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const ay = /%(\d[a-f0-9])/gi,
        $p = {
          40: '@',
          '3A': ':',
          24: '$',
          '2C': ',',
          '3B': ';',
          '3D': '=',
          '3F': '?',
          '2F': '/',
        };
      function zp(r) {
        return encodeURIComponent(r).replace(ay, (t, e) => $p[e] ?? t);
      }
      function $a(r) {
        return `${r}`;
      }
      class Ar {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new jp()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error('Cannot specify both fromString and fromObject.');
            this.map = (function sy(r, t) {
              const e = new Map();
              return (
                r.length > 0 &&
                  r
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach((l) => {
                      const f = l.indexOf('='),
                        [p, y] =
                          -1 == f
                            ? [t.decodeKey(l), '']
                            : [
                                t.decodeKey(l.slice(0, f)),
                                t.decodeValue(l.slice(f + 1)),
                              ],
                        D = e.get(p) || [];
                      D.push(y), e.set(p, D);
                    }),
                e
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const o = t.fromObject[e],
                    l = Array.isArray(o) ? o.map($a) : [$a(o)];
                  this.map.set(e, l);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: 'a' });
        }
        appendAll(t) {
          const e = [];
          return (
            Object.keys(t).forEach((o) => {
              const l = t[o];
              Array.isArray(l)
                ? l.forEach((f) => {
                    e.push({ param: o, value: f, op: 'a' });
                  })
                : e.push({ param: o, value: l, op: 'a' });
            }),
            this.clone(e)
          );
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: 's' });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: 'd' });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((o) => e + '=' + this.encoder.encodeValue(o))
                  .join('&');
              })
              .filter((t) => '' !== t)
              .join('&')
          );
        }
        clone(t) {
          const e = new Ar({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat(t)),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case 'a':
                  case 's':
                    const e =
                      ('a' === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push($a(t.value)), this.map.set(t.param, e);
                    break;
                  case 'd':
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let o = this.map.get(t.param) || [];
                      const l = o.indexOf($a(t.value));
                      -1 !== l && o.splice(l, 1),
                        o.length > 0
                          ? this.map.set(t.param, o)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class iD {
        constructor() {
          this.map = new Map();
        }
        set(t, e) {
          return this.map.set(t, e), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function Iu(r) {
        return typeof ArrayBuffer < 'u' && r instanceof ArrayBuffer;
      }
      function Tr(r) {
        return typeof Blob < 'u' && r instanceof Blob;
      }
      function qp(r) {
        return typeof FormData < 'u' && r instanceof FormData;
      }
      class yo {
        constructor(t, e, o, l) {
          let f;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = t.toUpperCase()),
            (function Gp(r) {
              switch (r) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || l
              ? ((this.body = void 0 !== o ? o : null), (f = l))
              : (f = o),
            f &&
              ((this.reportProgress = !!f.reportProgress),
              (this.withCredentials = !!f.withCredentials),
              f.responseType && (this.responseType = f.responseType),
              f.headers && (this.headers = f.headers),
              f.context && (this.context = f.context),
              f.params && (this.params = f.params)),
            this.headers || (this.headers = new yi()),
            this.context || (this.context = new iD()),
            this.params)
          ) {
            const p = this.params.toString();
            if (0 === p.length) this.urlWithParams = e;
            else {
              const y = e.indexOf('?');
              this.urlWithParams =
                e + (-1 === y ? '?' : y < e.length - 1 ? '&' : '') + p;
            }
          } else (this.params = new Ar()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Iu(this.body) ||
              Tr(this.body) ||
              qp(this.body) ||
              (function Fu(r) {
                return (
                  typeof URLSearchParams < 'u' && r instanceof URLSearchParams
                );
              })(this.body) ||
              'string' == typeof this.body
            ? this.body
            : this.body instanceof Ar
            ? this.body.toString()
            : 'object' == typeof this.body ||
              'boolean' == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || qp(this.body)
            ? null
            : Tr(this.body)
            ? this.body.type || null
            : Iu(this.body)
            ? null
            : 'string' == typeof this.body
            ? 'text/plain'
            : this.body instanceof Ar
            ? 'application/x-www-form-urlencoded;charset=UTF-8'
            : 'object' == typeof this.body ||
              'number' == typeof this.body ||
              'boolean' == typeof this.body
            ? 'application/json'
            : null;
        }
        clone(t = {}) {
          const e = t.method || this.method,
            o = t.url || this.url,
            l = t.responseType || this.responseType,
            f = void 0 !== t.body ? t.body : this.body,
            p =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            y =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let D = t.headers || this.headers,
            S = t.params || this.params;
          const R = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (D = Object.keys(t.setHeaders).reduce(
                (B, ae) => B.set(ae, t.setHeaders[ae]),
                D
              )),
            t.setParams &&
              (S = Object.keys(t.setParams).reduce(
                (B, ae) => B.set(ae, t.setParams[ae]),
                S
              )),
            new yo(e, o, f, {
              params: S,
              headers: D,
              context: R,
              reportProgress: y,
              responseType: l,
              withCredentials: p,
            })
          );
        }
      }
      var jt = (() => (
        ((jt = jt || {})[(jt.Sent = 0)] = 'Sent'),
        (jt[(jt.UploadProgress = 1)] = 'UploadProgress'),
        (jt[(jt.ResponseHeader = 2)] = 'ResponseHeader'),
        (jt[(jt.DownloadProgress = 3)] = 'DownloadProgress'),
        (jt[(jt.Response = 4)] = 'Response'),
        (jt[(jt.User = 5)] = 'User'),
        jt
      ))();
      class Wp {
        constructor(t, e = 200, o = 'OK') {
          (this.headers = t.headers || new yi()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || o),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Yp extends Wp {
        constructor(t = {}) {
          super(t), (this.type = jt.ResponseHeader);
        }
        clone(t = {}) {
          return new Yp({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Ru extends Wp {
        constructor(t = {}) {
          super(t),
            (this.type = jt.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Ru({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Zp extends Wp {
        constructor(t) {
          super(t, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || '(unknown url)'}`
                : `Http failure response for ${t.url || '(unknown url)'}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function yc(r, t) {
        return {
          body: t,
          headers: r.headers,
          context: r.context,
          observe: r.observe,
          params: r.params,
          reportProgress: r.reportProgress,
          responseType: r.responseType,
          withCredentials: r.withCredentials,
        };
      }
      let Ou = (() => {
        class r {
          constructor(e) {
            this.handler = e;
          }
          request(e, o, l = {}) {
            let f;
            if (e instanceof yo) f = e;
            else {
              let D, S;
              (D = l.headers instanceof yi ? l.headers : new yi(l.headers)),
                l.params &&
                  (S =
                    l.params instanceof Ar
                      ? l.params
                      : new Ar({ fromObject: l.params })),
                (f = new yo(e, o, void 0 !== l.body ? l.body : null, {
                  headers: D,
                  context: l.context,
                  params: S,
                  reportProgress: l.reportProgress,
                  responseType: l.responseType || 'json',
                  withCredentials: l.withCredentials,
                }));
            }
            const p = Ce(f).pipe(Ui((D) => this.handler.handle(D)));
            if (e instanceof yo || 'events' === l.observe) return p;
            const y = p.pipe(gt((D) => D instanceof Ru));
            switch (l.observe || 'body') {
              case 'body':
                switch (f.responseType) {
                  case 'arraybuffer':
                    return y.pipe(
                      (0, Pe.U)((D) => {
                        if (null !== D.body && !(D.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.');
                        return D.body;
                      })
                    );
                  case 'blob':
                    return y.pipe(
                      (0, Pe.U)((D) => {
                        if (null !== D.body && !(D.body instanceof Blob))
                          throw new Error('Response is not a Blob.');
                        return D.body;
                      })
                    );
                  case 'text':
                    return y.pipe(
                      (0, Pe.U)((D) => {
                        if (null !== D.body && 'string' != typeof D.body)
                          throw new Error('Response is not a string.');
                        return D.body;
                      })
                    );
                  default:
                    return y.pipe((0, Pe.U)((D) => D.body));
                }
              case 'response':
                return y;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${l.observe}}`
                );
            }
          }
          delete(e, o = {}) {
            return this.request('DELETE', e, o);
          }
          get(e, o = {}) {
            return this.request('GET', e, o);
          }
          head(e, o = {}) {
            return this.request('HEAD', e, o);
          }
          jsonp(e, o) {
            return this.request('JSONP', e, {
              params: new Ar().append(o, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json',
            });
          }
          options(e, o = {}) {
            return this.request('OPTIONS', e, o);
          }
          patch(e, o, l = {}) {
            return this.request('PATCH', e, yc(l, o));
          }
          post(e, o, l = {}) {
            return this.request('POST', e, yc(l, o));
          }
          put(e, o, l = {}) {
            return this.request('PUT', e, yc(l, o));
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(bc));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      function Kp(r, t) {
        return t(r);
      }
      function Cs(r, t) {
        return (e, o) => t.intercept(e, { handle: (l) => r(l, o) });
      }
      const Qp = new d.OlP('HTTP_INTERCEPTORS'),
        Ir = new d.OlP('HTTP_INTERCEPTOR_FNS');
      function cy() {
        let r = null;
        return (t, e) => (
          null === r &&
            (r = ((0, d.f3M)(Qp, { optional: !0 }) ?? []).reduceRight(Cs, Kp)),
          r(t, e)
        );
      }
      let Pu = (() => {
        class r extends bc {
          constructor(e, o) {
            super(),
              (this.backend = e),
              (this.injector = o),
              (this.chain = null);
          }
          handle(e) {
            if (null === this.chain) {
              const o = Array.from(new Set(this.injector.get(Ir)));
              this.chain = o.reduceRight(
                (l, f) =>
                  (function ly(r, t, e) {
                    return (o, l) => e.runInContext(() => t(o, (f) => r(f, l)));
                  })(l, f, this.injector),
                Kp
              );
            }
            return this.chain(e, (o) => this.backend.handle(o));
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(je), d.LFG(d.lqb));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      const Lu = /^\)\]\}',?\n/;
      let hy = (() => {
        class r {
          constructor(e) {
            this.xhrFactory = e;
          }
          handle(e) {
            if ('JSONP' === e.method)
              throw new Error(
                'Attempted to construct Jsonp request without HttpClientJsonpModule installed.'
              );
            return new en.y((o) => {
              const l = this.xhrFactory.build();
              if (
                (l.open(e.method, e.urlWithParams),
                e.withCredentials && (l.withCredentials = !0),
                e.headers.forEach((se, Q) =>
                  l.setRequestHeader(se, Q.join(','))
                ),
                e.headers.has('Accept') ||
                  l.setRequestHeader(
                    'Accept',
                    'application/json, text/plain, */*'
                  ),
                !e.headers.has('Content-Type'))
              ) {
                const se = e.detectContentTypeHeader();
                null !== se && l.setRequestHeader('Content-Type', se);
              }
              if (e.responseType) {
                const se = e.responseType.toLowerCase();
                l.responseType = 'json' !== se ? se : 'text';
              }
              const f = e.serializeBody();
              let p = null;
              const y = () => {
                  if (null !== p) return p;
                  const se = l.statusText || 'OK',
                    Q = new yi(l.getAllResponseHeaders()),
                    ce =
                      (function fy(r) {
                        return 'responseURL' in r && r.responseURL
                          ? r.responseURL
                          : /^X-Request-URL:/m.test(r.getAllResponseHeaders())
                          ? r.getResponseHeader('X-Request-URL')
                          : null;
                      })(l) || e.url;
                  return (
                    (p = new Yp({
                      headers: Q,
                      status: l.status,
                      statusText: se,
                      url: ce,
                    })),
                    p
                  );
                },
                D = () => {
                  let { headers: se, status: Q, statusText: ce, url: ze } = y(),
                    Ye = null;
                  204 !== Q &&
                    (Ye =
                      typeof l.response > 'u' ? l.responseText : l.response),
                    0 === Q && (Q = Ye ? 200 : 0);
                  let yt = Q >= 200 && Q < 300;
                  if ('json' === e.responseType && 'string' == typeof Ye) {
                    const on = Ye;
                    Ye = Ye.replace(Lu, '');
                    try {
                      Ye = '' !== Ye ? JSON.parse(Ye) : null;
                    } catch (sn) {
                      (Ye = on),
                        yt && ((yt = !1), (Ye = { error: sn, text: Ye }));
                    }
                  }
                  yt
                    ? (o.next(
                        new Ru({
                          body: Ye,
                          headers: se,
                          status: Q,
                          statusText: ce,
                          url: ze || void 0,
                        })
                      ),
                      o.complete())
                    : o.error(
                        new Zp({
                          error: Ye,
                          headers: se,
                          status: Q,
                          statusText: ce,
                          url: ze || void 0,
                        })
                      );
                },
                S = (se) => {
                  const { url: Q } = y(),
                    ce = new Zp({
                      error: se,
                      status: l.status || 0,
                      statusText: l.statusText || 'Unknown Error',
                      url: Q || void 0,
                    });
                  o.error(ce);
                };
              let R = !1;
              const B = (se) => {
                  R || (o.next(y()), (R = !0));
                  let Q = { type: jt.DownloadProgress, loaded: se.loaded };
                  se.lengthComputable && (Q.total = se.total),
                    'text' === e.responseType &&
                      l.responseText &&
                      (Q.partialText = l.responseText),
                    o.next(Q);
                },
                ae = (se) => {
                  let Q = { type: jt.UploadProgress, loaded: se.loaded };
                  se.lengthComputable && (Q.total = se.total), o.next(Q);
                };
              return (
                l.addEventListener('load', D),
                l.addEventListener('error', S),
                l.addEventListener('timeout', S),
                l.addEventListener('abort', S),
                e.reportProgress &&
                  (l.addEventListener('progress', B),
                  null !== f &&
                    l.upload &&
                    l.upload.addEventListener('progress', ae)),
                l.send(f),
                o.next({ type: jt.Sent }),
                () => {
                  l.removeEventListener('error', S),
                    l.removeEventListener('abort', S),
                    l.removeEventListener('load', D),
                    l.removeEventListener('timeout', S),
                    e.reportProgress &&
                      (l.removeEventListener('progress', B),
                      null !== f &&
                        l.upload &&
                        l.upload.removeEventListener('progress', ae)),
                    l.readyState !== l.DONE && l.abort();
                }
              );
            });
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(E.JF));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      const Fr = new d.OlP('XSRF_ENABLED'),
        Vu = 'XSRF-TOKEN',
        Jp = new d.OlP('XSRF_COOKIE_NAME', {
          providedIn: 'root',
          factory: () => Vu,
        }),
        Bu = 'X-XSRF-TOKEN',
        em = new d.OlP('XSRF_HEADER_NAME', {
          providedIn: 'root',
          factory: () => Bu,
        });
      class tm {}
      let vc = (() => {
        class r {
          constructor(e, o, l) {
            (this.doc = e),
              (this.platform = o),
              (this.cookieName = l),
              (this.lastCookieString = ''),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ('server' === this.platform) return null;
            const e = this.doc.cookie || '';
            return (
              e !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = (0, E.Mx)(e, this.cookieName)),
                (this.lastCookieString = e)),
              this.lastToken
            );
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(E.K0), d.LFG(d.Lbi), d.LFG(Jp));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      function Es(r, t) {
        const e = r.url.toLowerCase();
        if (
          !(0, d.f3M)(Fr) ||
          'GET' === r.method ||
          'HEAD' === r.method ||
          e.startsWith('http://') ||
          e.startsWith('https://')
        )
          return t(r);
        const o = (0, d.f3M)(tm).getToken(),
          l = (0, d.f3M)(em);
        return (
          null != o &&
            !r.headers.has(l) &&
            (r = r.clone({ headers: r.headers.set(l, o) })),
          t(r)
        );
      }
      var Ct = (() => (
        ((Ct = Ct || {})[(Ct.Interceptors = 0)] = 'Interceptors'),
        (Ct[(Ct.LegacyInterceptors = 1)] = 'LegacyInterceptors'),
        (Ct[(Ct.CustomXsrfConfiguration = 2)] = 'CustomXsrfConfiguration'),
        (Ct[(Ct.NoXsrfProtection = 3)] = 'NoXsrfProtection'),
        (Ct[(Ct.JsonpSupport = 4)] = 'JsonpSupport'),
        (Ct[(Ct.RequestsMadeViaParent = 5)] = 'RequestsMadeViaParent'),
        Ct
      ))();
      function Rr(r, t) {
        return { ??kind: r, ??providers: t };
      }
      function wc(...r) {
        const t = [
          Ou,
          hy,
          Pu,
          { provide: bc, useExisting: Pu },
          { provide: je, useExisting: hy },
          { provide: Ir, useValue: Es, multi: !0 },
          { provide: Fr, useValue: !0 },
          { provide: tm, useClass: vc },
        ];
        for (const e of r) t.push(...e.??providers);
        return (0, d.MR2)(t);
      }
      const Dc = new d.OlP('LEGACY_INTERCEPTOR_FN');
      function Uu({ cookieName: r, headerName: t }) {
        const e = [];
        return (
          void 0 !== r && e.push({ provide: Jp, useValue: r }),
          void 0 !== t && e.push({ provide: em, useValue: t }),
          Rr(Ct.CustomXsrfConfiguration, e)
        );
      }
      let ju,
        rm = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({
              providers: [
                wc(
                  Rr(Ct.LegacyInterceptors, [
                    { provide: Dc, useFactory: cy },
                    { provide: Ir, useExisting: Dc, multi: !0 },
                  ]),
                  Uu({ cookieName: Vu, headerName: Bu })
                ),
              ],
            })),
            r
          );
        })();
      class Yi {
        constructor(t) {
          (this.http = t),
            (this.body = !1),
            (this.getLoginDetails$ = this.http.get('/api/Logins'));
        }
        getProducts() {
          return this.http.get('/api/ProductDetails');
        }
        postRegister(t) {
          return this.http.post('/api/RegisterUsers', t);
        }
        getProductbyId(t) {
          return this.http.get(`/api/ProductDetails/${t}`);
        }
      }
      (Yi.??fac = function (t) {
        return new (t || Yi)(d.LFG(Ou));
      }),
        (Yi.??prov = d.Yz7({ token: Yi, factory: Yi.??fac, providedIn: 'root' }));
      try {
        ju = typeof Intl < 'u' && Intl.v8BreakIterator;
      } catch {
        ju = !1;
      }
      let vo,
        Kn = (() => {
          class r {
            constructor(e) {
              (this._platformId = e),
                (this.isBrowser = this._platformId
                  ? (0, E.NF)(this._platformId)
                  : 'object' == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !ju) &&
                  typeof CSS < 'u' &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !('MSStream' in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.LFG(d.Lbi));
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: r.??fac,
              providedIn: 'root',
            })),
            r
          );
        })();
      const om = [
        'color',
        'button',
        'checkbox',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week',
      ];
      function _y() {
        if (vo) return vo;
        if ('object' != typeof document || !document)
          return (vo = new Set(om)), vo;
        let r = document.createElement('input');
        return (
          (vo = new Set(
            om.filter((t) => (r.setAttribute('type', t), r.type === t))
          )),
          vo
        );
      }
      let wo, $u;
      function za(r) {
        return (function sm() {
          if (null == wo && typeof window < 'u')
            try {
              window.addEventListener(
                'test',
                null,
                Object.defineProperty({}, 'passive', { get: () => (wo = !0) })
              );
            } finally {
              wo = wo || !1;
            }
          return wo;
        })()
          ? r
          : !!r.capture;
      }
      function Ms(r) {
        return r.composedPath ? r.composedPath()[0] : r.target;
      }
      function tf(r) {
        return gt((t, e) => r <= e);
      }
      function Cm(r, t) {
        return r === t;
      }
      var Em = F(32);
      function Ts(r) {
        return (0, fn.e)((t, e) => {
          (0, ei.Xf)(r).subscribe((0, Nt.x)(e, () => e.complete(), Em.Z)),
            !e.closed && t.subscribe(e);
        });
      }
      function li(r) {
        return null != r && 'false' != `${r}`;
      }
      function Is(r, t = 0) {
        return (function Mm(r) {
          return !isNaN(parseFloat(r)) && !isNaN(Number(r));
        })(r)
          ? Number(r)
          : t;
      }
      function nf(r) {
        return Array.isArray(r) ? r : [r];
      }
      function ci(r) {
        return r instanceof d.SBq ? r.nativeElement : r;
      }
      class tv extends Vd.w0 {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      const Ac = {
        setInterval(r, t, ...e) {
          const { delegate: o } = Ac;
          return o?.setInterval
            ? o.setInterval(r, t, ...e)
            : setInterval(r, t, ...e);
        },
        clearInterval(r) {
          const { delegate: t } = Ac;
          return (t?.clearInterval || clearInterval)(r);
        },
        delegate: void 0,
      };
      var rf = F(737);
      const Tc = { now: () => (Tc.delegate || Date).now(), delegate: void 0 };
      class el {
        constructor(t, e = el.now) {
          (this.schedulerActionCtor = t), (this.now = e);
        }
        schedule(t, e = 0, o) {
          return new this.schedulerActionCtor(this, t).schedule(o, e);
        }
      }
      el.now = Tc.now;
      const KD = new (class sf extends el {
        constructor(t, e = el.now) {
          super(t, e), (this.actions = []), (this._active = !1);
        }
        flush(t) {
          const { actions: e } = this;
          if (this._active) return void e.push(t);
          let o;
          this._active = !0;
          do {
            if ((o = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this._active = !1), o)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw o;
          }
        }
      })(
        class Co extends tv {
          constructor(t, e) {
            super(t, e),
              (this.scheduler = t),
              (this.work = e),
              (this.pending = !1);
          }
          schedule(t, e = 0) {
            var o;
            if (this.closed) return this;
            this.state = t;
            const l = this.id,
              f = this.scheduler;
            return (
              null != l && (this.id = this.recycleAsyncId(f, l, e)),
              (this.pending = !0),
              (this.delay = e),
              (this.id =
                null !== (o = this.id) && void 0 !== o
                  ? o
                  : this.requestAsyncId(f, this.id, e)),
              this
            );
          }
          requestAsyncId(t, e, o = 0) {
            return Ac.setInterval(t.flush.bind(t, this), o);
          }
          recycleAsyncId(t, e, o = 0) {
            if (null != o && this.delay === o && !1 === this.pending) return e;
            null != e && Ac.clearInterval(e);
          }
          execute(t, e) {
            if (this.closed) return new Error('executing a cancelled action');
            this.pending = !1;
            const o = this._execute(t, e);
            if (o) return o;
            !1 === this.pending &&
              null != this.id &&
              (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
          }
          _execute(t, e) {
            let l,
              o = !1;
            try {
              this.work(t);
            } catch (f) {
              (o = !0),
                (l = f || new Error('Scheduled action threw falsy error'));
            }
            if (o) return this.unsubscribe(), l;
          }
          unsubscribe() {
            if (!this.closed) {
              const { id: t, scheduler: e } = this,
                { actions: o } = e;
              (this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                (0, rf.P)(o, this),
                null != t && (this.id = this.recycleAsyncId(e, t, null)),
                (this.delay = null),
                super.unsubscribe();
            }
          }
        }
      );
      function Sm(r, t = KD) {
        return (0, fn.e)((e, o) => {
          let l = null,
            f = null,
            p = null;
          const y = () => {
            if (l) {
              l.unsubscribe(), (l = null);
              const S = f;
              (f = null), o.next(S);
            }
          };
          function D() {
            const S = p + r,
              R = t.now();
            if (R < S) return (l = this.schedule(void 0, S - R)), void o.add(l);
            y();
          }
          e.subscribe(
            (0, Nt.x)(
              o,
              (S) => {
                (f = S), (p = t.now()), l || ((l = t.schedule(D, r)), o.add(l));
              },
              () => {
                y(), o.complete();
              },
              void 0,
              () => {
                f = l = null;
              }
            )
          );
        });
      }
      const af = new Set();
      let Fs,
        Zt = (() => {
          class r {
            constructor(e) {
              (this._platform = e),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : nv);
            }
            matchMedia(e) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function Am(r) {
                    if (!af.has(r))
                      try {
                        Fs ||
                          ((Fs = document.createElement('style')),
                          Fs.setAttribute('type', 'text/css'),
                          document.head.appendChild(Fs)),
                          Fs.sheet &&
                            (Fs.sheet.insertRule(`@media ${r} {body{ }}`, 0),
                            af.add(r));
                      } catch (t) {
                        console.error(t);
                      }
                  })(e),
                this._matchMedia(e)
              );
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.LFG(Kn));
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: r.??fac,
              providedIn: 'root',
            })),
            r
          );
        })();
      function nv(r) {
        return {
          matches: 'all' === r || '' === r,
          media: r,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let iv = (() => {
        class r {
          constructor(e, o) {
            (this._mediaMatcher = e),
              (this._zone = o),
              (this._queries = new Map()),
              (this._destroySubject = new un.x());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(e) {
            return lf(nf(e)).some((l) => this._registerQuery(l).mql.matches);
          }
          observe(e) {
            let f = _r(lf(nf(e)).map((p) => this._registerQuery(p).observable));
            return (
              (f = Ld(f.pipe(es(1)), f.pipe(tf(1), Sm(0)))),
              f.pipe(
                (0, Pe.U)((p) => {
                  const y = { matches: !1, breakpoints: {} };
                  return (
                    p.forEach(({ matches: D, query: S }) => {
                      (y.matches = y.matches || D), (y.breakpoints[S] = D);
                    }),
                    y
                  );
                })
              )
            );
          }
          _registerQuery(e) {
            if (this._queries.has(e)) return this._queries.get(e);
            const o = this._mediaMatcher.matchMedia(e),
              f = {
                observable: new en.y((p) => {
                  const y = (D) => this._zone.run(() => p.next(D));
                  return (
                    o.addListener(y),
                    () => {
                      o.removeListener(y);
                    }
                  );
                }).pipe(
                  $_(o),
                  (0, Pe.U)(({ matches: p }) => ({ query: e, matches: p })),
                  Ts(this._destroySubject)
                ),
                mql: o,
              };
            return this._queries.set(e, f), f;
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(Zt), d.LFG(d.R0b));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac, providedIn: 'root' })),
          r
        );
      })();
      function lf(r) {
        return r
          .map((t) => t.split(','))
          .reduce((t, e) => t.concat(e))
          .map((t) => t.trim());
      }
      function ff(r) {
        return 0 === r.buttons || (0 === r.offsetX && 0 === r.offsetY);
      }
      function hf(r) {
        const t =
          (r.touches && r.touches[0]) ||
          (r.changedTouches && r.changedTouches[0]);
        return !(
          !t ||
          -1 !== t.identifier ||
          (null != t.radiusX && 1 !== t.radiusX) ||
          (null != t.radiusY && 1 !== t.radiusY)
        );
      }
      const km = new d.OlP('cdk-input-modality-detector-options'),
        Lm = { ignoreKeys: [18, 17, 224, 91, 16] },
        Eo = za({ passive: !0, capture: !0 });
      let Vm = (() => {
        class r {
          get mostRecentModality() {
            return this._modality.value;
          }
          constructor(e, o, l, f) {
            (this._platform = e),
              (this._mostRecentTarget = null),
              (this._modality = new Mn(null)),
              (this._lastTouchMs = 0),
              (this._onKeydown = (p) => {
                this._options?.ignoreKeys?.some((y) => y === p.keyCode) ||
                  (this._modality.next('keyboard'),
                  (this._mostRecentTarget = Ms(p)));
              }),
              (this._onMousedown = (p) => {
                Date.now() - this._lastTouchMs < 650 ||
                  (this._modality.next(ff(p) ? 'keyboard' : 'mouse'),
                  (this._mostRecentTarget = Ms(p)));
              }),
              (this._onTouchstart = (p) => {
                hf(p)
                  ? this._modality.next('keyboard')
                  : ((this._lastTouchMs = Date.now()),
                    this._modality.next('touch'),
                    (this._mostRecentTarget = Ms(p)));
              }),
              (this._options = { ...Lm, ...f }),
              (this.modalityDetected = this._modality.pipe(tf(1))),
              (this.modalityChanged = this.modalityDetected.pipe(
                (function Sc(r, t = gr.y) {
                  return (
                    (r = r ?? Cm),
                    (0, fn.e)((e, o) => {
                      let l,
                        f = !0;
                      e.subscribe(
                        (0, Nt.x)(o, (p) => {
                          const y = t(p);
                          (f || !r(l, y)) && ((f = !1), (l = y), o.next(p));
                        })
                      );
                    })
                  );
                })()
              )),
              e.isBrowser &&
                o.runOutsideAngular(() => {
                  l.addEventListener('keydown', this._onKeydown, Eo),
                    l.addEventListener('mousedown', this._onMousedown, Eo),
                    l.addEventListener('touchstart', this._onTouchstart, Eo);
                });
          }
          ngOnDestroy() {
            this._modality.complete(),
              this._platform.isBrowser &&
                (document.removeEventListener('keydown', this._onKeydown, Eo),
                document.removeEventListener(
                  'mousedown',
                  this._onMousedown,
                  Eo
                ),
                document.removeEventListener(
                  'touchstart',
                  this._onTouchstart,
                  Eo
                ));
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(
              d.LFG(Kn),
              d.LFG(d.R0b),
              d.LFG(E.K0),
              d.LFG(km, 8)
            );
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac, providedIn: 'root' })),
          r
        );
      })();
      const _v = new d.OlP('cdk-focus-monitor-default-options'),
        Rc = za({ passive: !0, capture: !0 });
      let Bm = (() => {
        class r {
          constructor(e, o, l, f, p) {
            (this._ngZone = e),
              (this._platform = o),
              (this._inputModalityDetector = l),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._originFromTouchInteraction = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0),
                  (this._windowFocusTimeoutId = window.setTimeout(
                    () => (this._windowFocused = !1)
                  ));
              }),
              (this._stopInputModalityDetector = new un.x()),
              (this._rootNodeFocusAndBlurListener = (y) => {
                for (let S = Ms(y); S; S = S.parentElement)
                  'focus' === y.type ? this._onFocus(y, S) : this._onBlur(y, S);
              }),
              (this._document = f),
              (this._detectionMode = p?.detectionMode || 0);
          }
          monitor(e, o = !1) {
            const l = ci(e);
            if (!this._platform.isBrowser || 1 !== l.nodeType) return Ce(null);
            const f =
                (function yy(r) {
                  if (
                    (function zu() {
                      if (null == $u) {
                        const r = typeof document < 'u' ? document.head : null;
                        $u = !(!r || (!r.createShadowRoot && !r.attachShadow));
                      }
                      return $u;
                    })()
                  ) {
                    const t = r.getRootNode ? r.getRootNode() : null;
                    if (
                      typeof ShadowRoot < 'u' &&
                      ShadowRoot &&
                      t instanceof ShadowRoot
                    )
                      return t;
                  }
                  return null;
                })(l) || this._getDocument(),
              p = this._elementInfo.get(l);
            if (p) return o && (p.checkChildren = !0), p.subject;
            const y = { checkChildren: o, subject: new un.x(), rootNode: f };
            return (
              this._elementInfo.set(l, y),
              this._registerGlobalListeners(y),
              y.subject
            );
          }
          stopMonitoring(e) {
            const o = ci(e),
              l = this._elementInfo.get(o);
            l &&
              (l.subject.complete(),
              this._setClasses(o),
              this._elementInfo.delete(o),
              this._removeGlobalListeners(l));
          }
          focusVia(e, o, l) {
            const f = ci(e);
            f === this._getDocument().activeElement
              ? this._getClosestElementsInfo(f).forEach(([y, D]) =>
                  this._originChanged(y, o, D)
                )
              : (this._setOrigin(o),
                'function' == typeof f.focus && f.focus(l));
          }
          ngOnDestroy() {
            this._elementInfo.forEach((e, o) => this.stopMonitoring(o));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _getFocusOrigin(e) {
            return this._origin
              ? this._originFromTouchInteraction
                ? this._shouldBeAttributedToTouch(e)
                  ? 'touch'
                  : 'program'
                : this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : e && this._isLastInteractionFromInputLabel(e)
              ? 'mouse'
              : 'program';
          }
          _shouldBeAttributedToTouch(e) {
            return (
              1 === this._detectionMode ||
              !!e?.contains(this._inputModalityDetector._mostRecentTarget)
            );
          }
          _setClasses(e, o) {
            e.classList.toggle('cdk-focused', !!o),
              e.classList.toggle('cdk-touch-focused', 'touch' === o),
              e.classList.toggle('cdk-keyboard-focused', 'keyboard' === o),
              e.classList.toggle('cdk-mouse-focused', 'mouse' === o),
              e.classList.toggle('cdk-program-focused', 'program' === o);
          }
          _setOrigin(e, o = !1) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = e),
                (this._originFromTouchInteraction = 'touch' === e && o),
                0 === this._detectionMode &&
                  (clearTimeout(this._originTimeoutId),
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    this._originFromTouchInteraction ? 650 : 1
                  )));
            });
          }
          _onFocus(e, o) {
            const l = this._elementInfo.get(o),
              f = Ms(e);
            !l ||
              (!l.checkChildren && o !== f) ||
              this._originChanged(o, this._getFocusOrigin(f), l);
          }
          _onBlur(e, o) {
            const l = this._elementInfo.get(o);
            !l ||
              (l.checkChildren &&
                e.relatedTarget instanceof Node &&
                o.contains(e.relatedTarget)) ||
              (this._setClasses(o), this._emitOrigin(l, null));
          }
          _emitOrigin(e, o) {
            e.subject.observers.length &&
              this._ngZone.run(() => e.subject.next(o));
          }
          _registerGlobalListeners(e) {
            if (!this._platform.isBrowser) return;
            const o = e.rootNode,
              l = this._rootNodeFocusListenerCount.get(o) || 0;
            l ||
              this._ngZone.runOutsideAngular(() => {
                o.addEventListener(
                  'focus',
                  this._rootNodeFocusAndBlurListener,
                  Rc
                ),
                  o.addEventListener(
                    'blur',
                    this._rootNodeFocusAndBlurListener,
                    Rc
                  );
              }),
              this._rootNodeFocusListenerCount.set(o, l + 1),
              1 == ++this._monitoredElementCount &&
                (this._ngZone.runOutsideAngular(() => {
                  this._getWindow().addEventListener(
                    'focus',
                    this._windowFocusListener
                  );
                }),
                this._inputModalityDetector.modalityDetected
                  .pipe(Ts(this._stopInputModalityDetector))
                  .subscribe((f) => {
                    this._setOrigin(f, !0);
                  }));
          }
          _removeGlobalListeners(e) {
            const o = e.rootNode;
            if (this._rootNodeFocusListenerCount.has(o)) {
              const l = this._rootNodeFocusListenerCount.get(o);
              l > 1
                ? this._rootNodeFocusListenerCount.set(o, l - 1)
                : (o.removeEventListener(
                    'focus',
                    this._rootNodeFocusAndBlurListener,
                    Rc
                  ),
                  o.removeEventListener(
                    'blur',
                    this._rootNodeFocusAndBlurListener,
                    Rc
                  ),
                  this._rootNodeFocusListenerCount.delete(o));
            }
            --this._monitoredElementCount ||
              (this._getWindow().removeEventListener(
                'focus',
                this._windowFocusListener
              ),
              this._stopInputModalityDetector.next(),
              clearTimeout(this._windowFocusTimeoutId),
              clearTimeout(this._originTimeoutId));
          }
          _originChanged(e, o, l) {
            this._setClasses(e, o),
              this._emitOrigin(l, o),
              (this._lastFocusOrigin = o);
          }
          _getClosestElementsInfo(e) {
            const o = [];
            return (
              this._elementInfo.forEach((l, f) => {
                (f === e || (l.checkChildren && f.contains(e))) &&
                  o.push([f, l]);
              }),
              o
            );
          }
          _isLastInteractionFromInputLabel(e) {
            const { _mostRecentTarget: o, mostRecentModality: l } =
              this._inputModalityDetector;
            if (
              'mouse' !== l ||
              !o ||
              o === e ||
              ('INPUT' !== e.nodeName && 'TEXTAREA' !== e.nodeName) ||
              e.disabled
            )
              return !1;
            const f = e.labels;
            if (f)
              for (let p = 0; p < f.length; p++)
                if (f[p].contains(o)) return !0;
            return !1;
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(
              d.LFG(d.R0b),
              d.LFG(Kn),
              d.LFG(Vm),
              d.LFG(E.K0, 8),
              d.LFG(_v, 8)
            );
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac, providedIn: 'root' })),
          r
        );
      })();
      const Hm = 'cdk-high-contrast-black-on-white',
        Um = 'cdk-high-contrast-white-on-black',
        mf = 'cdk-high-contrast-active';
      let bv = (() => {
        class r {
          constructor(e, o) {
            (this._platform = e),
              (this._document = o),
              (this._breakpointSubscription = (0, d.f3M)(iv)
                .observe('(forced-colors: active)')
                .subscribe(() => {
                  this._hasCheckedHighContrastMode &&
                    ((this._hasCheckedHighContrastMode = !1),
                    this._applyBodyHighContrastModeCssClasses());
                }));
          }
          getHighContrastMode() {
            if (!this._platform.isBrowser) return 0;
            const e = this._document.createElement('div');
            (e.style.backgroundColor = 'rgb(1,2,3)'),
              (e.style.position = 'absolute'),
              this._document.body.appendChild(e);
            const o = this._document.defaultView || window,
              l = o && o.getComputedStyle ? o.getComputedStyle(e) : null,
              f = ((l && l.backgroundColor) || '').replace(/ /g, '');
            switch ((e.remove(), f)) {
              case 'rgb(0,0,0)':
              case 'rgb(45,50,54)':
              case 'rgb(32,32,32)':
                return 2;
              case 'rgb(255,255,255)':
              case 'rgb(255,250,239)':
                return 1;
            }
            return 0;
          }
          ngOnDestroy() {
            this._breakpointSubscription.unsubscribe();
          }
          _applyBodyHighContrastModeCssClasses() {
            if (
              !this._hasCheckedHighContrastMode &&
              this._platform.isBrowser &&
              this._document.body
            ) {
              const e = this._document.body.classList;
              e.remove(mf, Hm, Um), (this._hasCheckedHighContrastMode = !0);
              const o = this.getHighContrastMode();
              1 === o ? e.add(mf, Hm) : 2 === o && e.add(mf, Um);
            }
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(Kn), d.LFG(E.K0));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac, providedIn: 'root' })),
          r
        );
      })();
      const yv = new d.OlP('cdk-dir-doc', {
          providedIn: 'root',
          factory: function vv() {
            return (0, d.f3M)(E.K0);
          },
        }),
        wv =
          /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
      let gf = (() => {
          class r {
            constructor(e) {
              (this.value = 'ltr'),
                (this.change = new d.vpe()),
                e &&
                  (this.value = (function Dv(r) {
                    const t = r?.toLowerCase() || '';
                    return 'auto' === t &&
                      typeof navigator < 'u' &&
                      navigator?.language
                      ? wv.test(navigator.language)
                        ? 'rtl'
                        : 'ltr'
                      : 'rtl' === t
                      ? 'rtl'
                      : 'ltr';
                  })(
                    (e.body ? e.body.dir : null) ||
                      (e.documentElement ? e.documentElement.dir : null) ||
                      'ltr'
                  ));
            }
            ngOnDestroy() {
              this.change.complete();
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.LFG(yv, 8));
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: r.??fac,
              providedIn: 'root',
            })),
            r
          );
        })(),
        _f = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({})),
            r
          );
        })();
      const px = new d.OlP('mat-sanity-checks', {
        providedIn: 'root',
        factory: function Rs() {
          return !0;
        },
      });
      let St = (() => {
        class r {
          constructor(e, o, l) {
            (this._sanityChecks = o),
              (this._document = l),
              (this._hasDoneGlobalChecks = !1),
              e._applyBodyHighContrastModeCssClasses(),
              this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
          }
          _checkIsEnabled(e) {
            return (
              !(function vy() {
                return (
                  (typeof __karma__ < 'u' && !!__karma__) ||
                  (typeof jasmine < 'u' && !!jasmine) ||
                  (typeof jest < 'u' && !!jest) ||
                  (typeof Mocha < 'u' && !!Mocha)
                );
              })() &&
              ('boolean' == typeof this._sanityChecks
                ? this._sanityChecks
                : !!this._sanityChecks[e])
            );
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(bv), d.LFG(px, 8), d.LFG(E.K0));
          }),
          (r.??mod = d.oAB({ type: r })),
          (r.??inj = d.cJS({ imports: [_f, _f] })),
          r
        );
      })();
      function Rv(r) {
        return class extends r {
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._disabled = li(t);
          }
          constructor(...t) {
            super(...t), (this._disabled = !1);
          }
        };
      }
      function Me(r, t) {
        return class extends r {
          get color() {
            return this._color;
          }
          set color(e) {
            const o = e || this.defaultColor;
            o !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  `mat-${this._color}`
                ),
              o && this._elementRef.nativeElement.classList.add(`mat-${o}`),
              (this._color = o));
          }
          constructor(...e) {
            super(...e), (this.defaultColor = t), (this.color = t);
          }
        };
      }
      function $m(r) {
        return class extends r {
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(t) {
            this._disableRipple = li(t);
          }
          constructor(...t) {
            super(...t), (this._disableRipple = !1);
          }
        };
      }
      function Ov(r, t = 0) {
        return class extends r {
          get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
          }
          set tabIndex(e) {
            this._tabIndex = null != e ? Is(e) : this.defaultTabIndex;
          }
          constructor(...e) {
            super(...e), (this._tabIndex = t), (this.defaultTabIndex = t);
          }
        };
      }
      function Pv(r) {
        return class extends r {
          updateErrorState() {
            const t = this.errorState,
              f = (
                this.errorStateMatcher || this._defaultErrorStateMatcher
              ).isErrorState(
                this.ngControl ? this.ngControl.control : null,
                this._parentFormGroup || this._parentForm
              );
            f !== t && ((this.errorState = f), this.stateChanges.next());
          }
          constructor(...t) {
            super(...t), (this.errorState = !1);
          }
        };
      }
      const Nv = new d.OlP('MAT_DATE_LOCALE', {
        providedIn: 'root',
        factory: function Oc() {
          return (0, d.f3M)(d.soG);
        },
      });
      class il {
        constructor() {
          (this._localeChanges = new un.x()),
            (this.localeChanges = this._localeChanges);
        }
        getValidDateOrNull(t) {
          return this.isDateInstance(t) && this.isValid(t) ? t : null;
        }
        deserialize(t) {
          return null == t || (this.isDateInstance(t) && this.isValid(t))
            ? t
            : this.invalid();
        }
        setLocale(t) {
          (this.locale = t), this._localeChanges.next();
        }
        compareDate(t, e) {
          return (
            this.getYear(t) - this.getYear(e) ||
            this.getMonth(t) - this.getMonth(e) ||
            this.getDate(t) - this.getDate(e)
          );
        }
        sameDate(t, e) {
          if (t && e) {
            let o = this.isValid(t),
              l = this.isValid(e);
            return o && l ? !this.compareDate(t, e) : o == l;
          }
          return t == e;
        }
        clampDate(t, e, o) {
          return e && this.compareDate(t, e) < 0
            ? e
            : o && this.compareDate(t, o) > 0
            ? o
            : t;
        }
      }
      const Ft = new d.OlP('mat-date-formats'),
        mx =
          /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
      function Pc(r, t) {
        const e = Array(r);
        for (let o = 0; o < r; o++) e[o] = t(o);
        return e;
      }
      let zm = (() => {
        class r extends il {
          constructor(e, o) {
            super(), (this.useUtcForDisplay = !1), super.setLocale(e);
          }
          getYear(e) {
            return e.getFullYear();
          }
          getMonth(e) {
            return e.getMonth();
          }
          getDate(e) {
            return e.getDate();
          }
          getDayOfWeek(e) {
            return e.getDay();
          }
          getMonthNames(e) {
            const o = new Intl.DateTimeFormat(this.locale, {
              month: e,
              timeZone: 'utc',
            });
            return Pc(12, (l) => this._format(o, new Date(2017, l, 1)));
          }
          getDateNames() {
            const e = new Intl.DateTimeFormat(this.locale, {
              day: 'numeric',
              timeZone: 'utc',
            });
            return Pc(31, (o) => this._format(e, new Date(2017, 0, o + 1)));
          }
          getDayOfWeekNames(e) {
            const o = new Intl.DateTimeFormat(this.locale, {
              weekday: e,
              timeZone: 'utc',
            });
            return Pc(7, (l) => this._format(o, new Date(2017, 0, l + 1)));
          }
          getYearName(e) {
            const o = new Intl.DateTimeFormat(this.locale, {
              year: 'numeric',
              timeZone: 'utc',
            });
            return this._format(o, e);
          }
          getFirstDayOfWeek() {
            return 0;
          }
          getNumDaysInMonth(e) {
            return this.getDate(
              this._createDateWithOverflow(
                this.getYear(e),
                this.getMonth(e) + 1,
                0
              )
            );
          }
          clone(e) {
            return new Date(e.getTime());
          }
          createDate(e, o, l) {
            let f = this._createDateWithOverflow(e, o, l);
            return f.getMonth(), f;
          }
          today() {
            return new Date();
          }
          parse(e, o) {
            return 'number' == typeof e
              ? new Date(e)
              : e
              ? new Date(Date.parse(e))
              : null;
          }
          format(e, o) {
            if (!this.isValid(e))
              throw Error('NativeDateAdapter: Cannot format invalid date.');
            const l = new Intl.DateTimeFormat(this.locale, {
              ...o,
              timeZone: 'utc',
            });
            return this._format(l, e);
          }
          addCalendarYears(e, o) {
            return this.addCalendarMonths(e, 12 * o);
          }
          addCalendarMonths(e, o) {
            let l = this._createDateWithOverflow(
              this.getYear(e),
              this.getMonth(e) + o,
              this.getDate(e)
            );
            return (
              this.getMonth(l) != (((this.getMonth(e) + o) % 12) + 12) % 12 &&
                (l = this._createDateWithOverflow(
                  this.getYear(l),
                  this.getMonth(l),
                  0
                )),
              l
            );
          }
          addCalendarDays(e, o) {
            return this._createDateWithOverflow(
              this.getYear(e),
              this.getMonth(e),
              this.getDate(e) + o
            );
          }
          toIso8601(e) {
            return [
              e.getUTCFullYear(),
              this._2digit(e.getUTCMonth() + 1),
              this._2digit(e.getUTCDate()),
            ].join('-');
          }
          deserialize(e) {
            if ('string' == typeof e) {
              if (!e) return null;
              if (mx.test(e)) {
                let o = new Date(e);
                if (this.isValid(o)) return o;
              }
            }
            return super.deserialize(e);
          }
          isDateInstance(e) {
            return e instanceof Date;
          }
          isValid(e) {
            return !isNaN(e.getTime());
          }
          invalid() {
            return new Date(NaN);
          }
          _createDateWithOverflow(e, o, l) {
            const f = new Date();
            return f.setFullYear(e, o, l), f.setHours(0, 0, 0, 0), f;
          }
          _2digit(e) {
            return ('00' + e).slice(-2);
          }
          _format(e, o) {
            const l = new Date();
            return (
              l.setUTCFullYear(o.getFullYear(), o.getMonth(), o.getDate()),
              l.setUTCHours(
                o.getHours(),
                o.getMinutes(),
                o.getSeconds(),
                o.getMilliseconds()
              ),
              e.format(l)
            );
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(Nv, 8), d.LFG(Kn));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      const kv = {
        parse: { dateInput: null },
        display: {
          dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
          monthYearLabel: { year: 'numeric', month: 'short' },
          dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
          monthYearA11yLabel: { year: 'numeric', month: 'long' },
        },
      };
      let Gm = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ providers: [{ provide: il, useClass: zm }] })),
            r
          );
        })(),
        yf = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({
              providers: [{ provide: Ft, useValue: kv }],
              imports: [Gm],
            })),
            r
          );
        })(),
        qm = (() => {
          class r {
            isErrorState(e, o) {
              return !!(e && e.invalid && (e.touched || (o && o.submitted)));
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: r.??fac,
              providedIn: 'root',
            })),
            r
          );
        })(),
        Os = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [St, St] })),
            r
          );
        })();
      class Vv {
        constructor(t, e, o, l = !1) {
          (this._renderer = t),
            (this.element = e),
            (this.config = o),
            (this._animationForciblyDisabledThroughCss = l),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const Wm = za({ passive: !0, capture: !0 });
      class Bv {
        constructor() {
          (this._events = new Map()),
            (this._delegateEventHandler = (t) => {
              const e = Ms(t);
              e &&
                this._events.get(t.type)?.forEach((o, l) => {
                  (l === e || l.contains(e)) &&
                    o.forEach((f) => f.handleEvent(t));
                });
            });
        }
        addHandler(t, e, o, l) {
          const f = this._events.get(e);
          if (f) {
            const p = f.get(o);
            p ? p.add(l) : f.set(o, new Set([l]));
          } else
            this._events.set(e, new Map([[o, new Set([l])]])),
              t.runOutsideAngular(() => {
                document.addEventListener(e, this._delegateEventHandler, Wm);
              });
        }
        removeHandler(t, e, o) {
          const l = this._events.get(t);
          if (!l) return;
          const f = l.get(e);
          f &&
            (f.delete(o),
            0 === f.size && l.delete(e),
            0 === l.size &&
              (this._events.delete(t),
              document.removeEventListener(t, this._delegateEventHandler, Wm)));
        }
      }
      const ol = { enterDuration: 225, exitDuration: 150 },
        vf = za({ passive: !0, capture: !0 }),
        wf = ['mousedown', 'touchstart'],
        Zm = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
      class Ji {
        constructor(t, e, o, l) {
          (this._target = t),
            (this._ngZone = e),
            (this._platform = l),
            (this._isPointerDown = !1),
            (this._activeRipples = new Map()),
            (this._pointerUpEventsRegistered = !1),
            l.isBrowser && (this._containerElement = ci(o));
        }
        fadeInRipple(t, e, o = {}) {
          const l = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            f = { ...ol, ...o.animation };
          o.centered &&
            ((t = l.left + l.width / 2), (e = l.top + l.height / 2));
          const p =
              o.radius ||
              (function sl(r, t, e) {
                const o = Math.max(Math.abs(r - e.left), Math.abs(r - e.right)),
                  l = Math.max(Math.abs(t - e.top), Math.abs(t - e.bottom));
                return Math.sqrt(o * o + l * l);
              })(t, e, l),
            y = t - l.left,
            D = e - l.top,
            S = f.enterDuration,
            R = document.createElement('div');
          R.classList.add('mat-ripple-element'),
            (R.style.left = y - p + 'px'),
            (R.style.top = D - p + 'px'),
            (R.style.height = 2 * p + 'px'),
            (R.style.width = 2 * p + 'px'),
            null != o.color && (R.style.backgroundColor = o.color),
            (R.style.transitionDuration = `${S}ms`),
            this._containerElement.appendChild(R);
          const B = window.getComputedStyle(R),
            se = B.transitionDuration,
            Q =
              'none' === B.transitionProperty ||
              '0s' === se ||
              '0s, 0s' === se ||
              (0 === l.width && 0 === l.height),
            ce = new Vv(this, R, o, Q);
          (R.style.transform = 'scale3d(1, 1, 1)'),
            (ce.state = 0),
            o.persistent || (this._mostRecentTransientRipple = ce);
          let ze = null;
          return (
            !Q &&
              (S || f.exitDuration) &&
              this._ngZone.runOutsideAngular(() => {
                const Ye = () => this._finishRippleTransition(ce),
                  yt = () => this._destroyRipple(ce);
                R.addEventListener('transitionend', Ye),
                  R.addEventListener('transitioncancel', yt),
                  (ze = { onTransitionEnd: Ye, onTransitionCancel: yt });
              }),
            this._activeRipples.set(ce, ze),
            (Q || !S) && this._finishRippleTransition(ce),
            ce
          );
        }
        fadeOutRipple(t) {
          if (2 === t.state || 3 === t.state) return;
          const e = t.element,
            o = { ...ol, ...t.config.animation };
          (e.style.transitionDuration = `${o.exitDuration}ms`),
            (e.style.opacity = '0'),
            (t.state = 2),
            (t._animationForciblyDisabledThroughCss || !o.exitDuration) &&
              this._finishRippleTransition(t);
        }
        fadeOutAll() {
          this._getActiveRipples().forEach((t) => t.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._getActiveRipples().forEach((t) => {
            t.config.persistent || t.fadeOut();
          });
        }
        setupTriggerEvents(t) {
          const e = ci(t);
          !this._platform.isBrowser ||
            !e ||
            e === this._triggerElement ||
            (this._removeTriggerEvents(),
            (this._triggerElement = e),
            wf.forEach((o) => {
              Ji._eventManager.addHandler(this._ngZone, o, e, this);
            }));
        }
        handleEvent(t) {
          'mousedown' === t.type
            ? this._onMousedown(t)
            : 'touchstart' === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._ngZone.runOutsideAngular(() => {
                Zm.forEach((e) => {
                  this._triggerElement.addEventListener(e, this, vf);
                });
              }),
              (this._pointerUpEventsRegistered = !0));
        }
        _finishRippleTransition(t) {
          0 === t.state
            ? this._startFadeOutTransition(t)
            : 2 === t.state && this._destroyRipple(t);
        }
        _startFadeOutTransition(t) {
          const e = t === this._mostRecentTransientRipple,
            { persistent: o } = t.config;
          (t.state = 1), !o && (!e || !this._isPointerDown) && t.fadeOut();
        }
        _destroyRipple(t) {
          const e = this._activeRipples.get(t) ?? null;
          this._activeRipples.delete(t),
            this._activeRipples.size || (this._containerRect = null),
            t === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            (t.state = 3),
            null !== e &&
              (t.element.removeEventListener(
                'transitionend',
                e.onTransitionEnd
              ),
              t.element.removeEventListener(
                'transitioncancel',
                e.onTransitionCancel
              )),
            t.element.remove();
        }
        _onMousedown(t) {
          const e = ff(t),
            o =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled &&
            !e &&
            !o &&
            ((this._isPointerDown = !0),
            this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled && !hf(t)) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const e = t.changedTouches;
            for (let o = 0; o < e.length; o++)
              this.fadeInRipple(
                e[o].clientX,
                e[o].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          this._isPointerDown &&
            ((this._isPointerDown = !1),
            this._getActiveRipples().forEach((t) => {
              !t.config.persistent &&
                (1 === t.state ||
                  (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _getActiveRipples() {
          return Array.from(this._activeRipples.keys());
        }
        _removeTriggerEvents() {
          const t = this._triggerElement;
          t &&
            (wf.forEach((e) => Ji._eventManager.removeHandler(e, t, this)),
            this._pointerUpEventsRegistered &&
              Zm.forEach((e) => t.removeEventListener(e, this, vf)));
        }
      }
      Ji._eventManager = new Bv();
      const Hv = new d.OlP('mat-ripple-global-options');
      let Nc = (() => {
          class r {
            get disabled() {
              return this._disabled;
            }
            set disabled(e) {
              e && this.fadeOutAllNonPersistent(),
                (this._disabled = e),
                this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(e) {
              (this._trigger = e), this._setupTriggerEventsIfEnabled();
            }
            constructor(e, o, l, f, p) {
              (this._elementRef = e),
                (this._animationMode = p),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = f || {}),
                (this._rippleRenderer = new Ji(this, o, e, l));
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            fadeOutAllNonPersistent() {
              this._rippleRenderer.fadeOutAllNonPersistent();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: {
                  ...this._globalOptions.animation,
                  ...('NoopAnimations' === this._animationMode
                    ? { enterDuration: 0, exitDuration: 0 }
                    : {}),
                  ...this.animation,
                },
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(e, o = 0, l) {
              return 'number' == typeof e
                ? this._rippleRenderer.fadeInRipple(e, o, {
                    ...this.rippleConfig,
                    ...l,
                  })
                : this._rippleRenderer.fadeInRipple(0, 0, {
                    ...this.rippleConfig,
                    ...e,
                  });
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(
                d.Y36(d.SBq),
                d.Y36(d.R0b),
                d.Y36(Kn),
                d.Y36(Hv, 8),
                d.Y36(d.QbO, 8)
              );
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['', 'mat-ripple', ''],
                ['', 'matRipple', ''],
              ],
              hostAttrs: [1, 'mat-ripple'],
              hostVars: 2,
              hostBindings: function (e, o) {
                2 & e && d.ekj('mat-ripple-unbounded', o.unbounded);
              },
              inputs: {
                color: ['matRippleColor', 'color'],
                unbounded: ['matRippleUnbounded', 'unbounded'],
                centered: ['matRippleCentered', 'centered'],
                radius: ['matRippleRadius', 'radius'],
                animation: ['matRippleAnimation', 'animation'],
                disabled: ['matRippleDisabled', 'disabled'],
                trigger: ['matRippleTrigger', 'trigger'],
              },
              exportAs: ['matRipple'],
            })),
            r
          );
        })(),
        Km = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [St, St] })),
            r
          );
        })();
      const Qm = ['mat-button', ''],
        al = [
          [
            ['', 8, 'material-icons', 3, 'iconPositionEnd', ''],
            ['mat-icon', 3, 'iconPositionEnd', ''],
            ['', 'matButtonIcon', '', 3, 'iconPositionEnd', ''],
          ],
          '*',
          [
            ['', 'iconPositionEnd', '', 8, 'material-icons'],
            ['mat-icon', 'iconPositionEnd', ''],
            ['', 'matButtonIcon', '', 'iconPositionEnd', ''],
          ],
        ],
        qv = [
          '.material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])',
          '*',
          '.material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]',
        ],
        Xm = ['mat-icon-button', ''],
        Yv = ['*'],
        Jm = [
          {
            selector: 'mat-button',
            mdcClasses: ['mdc-button', 'mat-mdc-button'],
          },
          {
            selector: 'mat-flat-button',
            mdcClasses: [
              'mdc-button',
              'mdc-button--unelevated',
              'mat-mdc-unelevated-button',
            ],
          },
          {
            selector: 'mat-raised-button',
            mdcClasses: [
              'mdc-button',
              'mdc-button--raised',
              'mat-mdc-raised-button',
            ],
          },
          {
            selector: 'mat-stroked-button',
            mdcClasses: [
              'mdc-button',
              'mdc-button--outlined',
              'mat-mdc-outlined-button',
            ],
          },
          { selector: 'mat-fab', mdcClasses: ['mdc-fab', 'mat-mdc-fab'] },
          {
            selector: 'mat-mini-fab',
            mdcClasses: ['mdc-fab', 'mdc-fab--mini', 'mat-mdc-mini-fab'],
          },
          {
            selector: 'mat-icon-button',
            mdcClasses: ['mdc-icon-button', 'mat-mdc-icon-button'],
          },
        ],
        Zv = Me(
          Rv(
            $m(
              class {
                constructor(r) {
                  this._elementRef = r;
                }
              }
            )
          )
        );
      let xf = (() => {
          class r extends Zv {
            constructor(e, o, l, f) {
              super(e),
                (this._platform = o),
                (this._ngZone = l),
                (this._animationMode = f),
                (this._focusMonitor = (0, d.f3M)(Bm)),
                (this._isFab = !1);
              const p = e.nativeElement.classList;
              for (const y of Jm)
                this._hasHostAttributes(y.selector) &&
                  y.mdcClasses.forEach((D) => {
                    p.add(D);
                  });
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(e = 'program', o) {
              e
                ? this._focusMonitor.focusVia(
                    this._elementRef.nativeElement,
                    e,
                    o
                  )
                : this._elementRef.nativeElement.focus(o);
            }
            _hasHostAttributes(...e) {
              return e.some((o) =>
                this._elementRef.nativeElement.hasAttribute(o)
              );
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
          }
          return (
            (r.??fac = function (e) {
              d.$Z();
            }),
            (r.??dir = d.lG2({
              type: r,
              viewQuery: function (e, o) {
                if ((1 & e && d.Gf(Nc, 5), 2 & e)) {
                  let l;
                  d.iGM((l = d.CRH())) && (o.ripple = l.first);
                }
              },
              features: [d.qOj],
            })),
            r
          );
        })(),
        ll = (() => {
          class r extends xf {
            constructor(e, o, l, f) {
              super(e, o, l, f);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(
                d.Y36(d.SBq),
                d.Y36(Kn),
                d.Y36(d.R0b),
                d.Y36(d.QbO, 8)
              );
            }),
            (r.??cmp = d.Xpm({
              type: r,
              selectors: [
                ['button', 'mat-button', ''],
                ['button', 'mat-raised-button', ''],
                ['button', 'mat-flat-button', ''],
                ['button', 'mat-stroked-button', ''],
              ],
              hostVars: 7,
              hostBindings: function (e, o) {
                2 & e &&
                  (d.uIk('disabled', o.disabled || null),
                  d.ekj(
                    '_mat-animation-noopable',
                    'NoopAnimations' === o._animationMode
                  )('mat-unthemed', !o.color)('mat-mdc-button-base', !0));
              },
              inputs: {
                disabled: 'disabled',
                disableRipple: 'disableRipple',
                color: 'color',
              },
              exportAs: ['matButton'],
              features: [d.qOj],
              attrs: Qm,
              ngContentSelectors: qv,
              decls: 8,
              vars: 6,
              consts: [
                [1, 'mat-mdc-button-persistent-ripple'],
                [1, 'mdc-button__label'],
                [1, 'mat-mdc-focus-indicator'],
                [
                  'matRipple',
                  '',
                  1,
                  'mat-mdc-button-ripple',
                  3,
                  'matRippleDisabled',
                  'matRippleTrigger',
                ],
                [1, 'mat-mdc-button-touch-target'],
              ],
              template: function (e, o) {
                1 & e &&
                  (d.F$t(al),
                  d._UZ(0, 'span', 0),
                  d.Hsn(1),
                  d.TgZ(2, 'span', 1),
                  d.Hsn(3, 1),
                  d.qZA(),
                  d.Hsn(4, 2),
                  d._UZ(5, 'span', 2)(6, 'span', 3)(7, 'span', 4)),
                  2 & e &&
                    (d.ekj('mdc-button__ripple', !o._isFab)(
                      'mdc-fab__ripple',
                      o._isFab
                    ),
                    d.xp6(6),
                    d.Q6J('matRippleDisabled', o._isRippleDisabled())(
                      'matRippleTrigger',
                      o._elementRef.nativeElement
                    ));
              },
              dependencies: [Nc],
              styles: [
                '.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:rgba(0,0,0,0)}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button[hidden]{display:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__progress-indicator{font-size:0;position:absolute;transform:translate(-50%, -50%);top:50%;left:50%;line-height:initial}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + 4px\n    );display:none}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring{border-color:CanvasText}}.mdc-button .mdc-button__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring::after{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{display:block}}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:rgba(0,0,0,0)}.mat-mdc-button{height:var(--mdc-text-button-container-height, 36px);border-radius:var(--mdc-text-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-button:not(:disabled){color:var(--mdc-text-button-label-text-color, inherit)}.mat-mdc-button:disabled{color:var(--mdc-text-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-button .mdc-button__ripple{border-radius:var(--mdc-text-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-unelevated-button{height:var(--mdc-filled-button-container-height, 36px);border-radius:var(--mdc-filled-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-unelevated-button:not(:disabled){background-color:var(--mdc-filled-button-container-color, transparent)}.mat-mdc-unelevated-button:disabled{background-color:var(--mdc-filled-button-disabled-container-color, rgba(0, 0, 0, 0.12))}.mat-mdc-unelevated-button:not(:disabled){color:var(--mdc-filled-button-label-text-color, inherit)}.mat-mdc-unelevated-button:disabled{color:var(--mdc-filled-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-unelevated-button .mdc-button__ripple{border-radius:var(--mdc-filled-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-raised-button{height:var(--mdc-protected-button-container-height, 36px);border-radius:var(--mdc-protected-button-container-shape, var(--mdc-shape-small, 4px));box-shadow:var(--mdc-protected-button-container-elevation, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:not(:disabled){background-color:var(--mdc-protected-button-container-color, transparent)}.mat-mdc-raised-button:disabled{background-color:var(--mdc-protected-button-disabled-container-color, rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:not(:disabled){color:var(--mdc-protected-button-label-text-color, inherit)}.mat-mdc-raised-button:disabled{color:var(--mdc-protected-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-raised-button .mdc-button__ripple{border-radius:var(--mdc-protected-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-raised-button.mdc-ripple-upgraded--background-focused,.mat-mdc-raised-button:not(.mdc-ripple-upgraded):focus{box-shadow:var(--mdc-protected-button-focus-container-elevation, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:hover{box-shadow:var(--mdc-protected-button-hover-container-elevation, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:not(:disabled):active{box-shadow:var(--mdc-protected-button-pressed-container-elevation, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mat-mdc-raised-button:disabled{box-shadow:var(--mdc-protected-button-disabled-container-elevation, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-outlined-button{height:var(--mdc-outlined-button-container-height, 36px);border-radius:var(--mdc-outlined-button-container-shape, var(--mdc-shape-small, 4px));padding:0 15px 0 15px;border-width:var(--mdc-outlined-button-outline-width, 1px)}.mat-mdc-outlined-button:not(:disabled){color:var(--mdc-outlined-button-label-text-color, inherit)}.mat-mdc-outlined-button:disabled{color:var(--mdc-outlined-button-disabled-label-text-color, rgba(0, 0, 0, 0.38))}.mat-mdc-outlined-button .mdc-button__ripple{border-radius:var(--mdc-outlined-button-container-shape, var(--mdc-shape-small, 4px))}.mat-mdc-outlined-button:not(:disabled){border-color:var(--mdc-outlined-button-outline-color, rgba(0, 0, 0, 0.12))}.mat-mdc-outlined-button:disabled{border-color:var(--mdc-outlined-button-disabled-outline-color, rgba(0, 0, 0, 0.12))}.mat-mdc-outlined-button.mdc-button--icon-trailing{padding:0 11px 0 15px}.mat-mdc-outlined-button.mdc-button--icon-leading{padding:0 15px 0 11px}.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:var(--mdc-outlined-button-outline-width, 1px)}.mat-mdc-outlined-button .mdc-button__touch{left:calc(-1 * var(--mdc-outlined-button-outline-width, 1px));width:calc(100% + 2 * var(--mdc-outlined-button-outline-width, 1px))}.mat-mdc-button,.mat-mdc-unelevated-button,.mat-mdc-raised-button,.mat-mdc-outlined-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0;background-color:var(--mat-mdc-button-persistent-ripple-color)}.mat-mdc-button .mat-ripple-element,.mat-mdc-unelevated-button .mat-ripple-element,.mat-mdc-raised-button .mat-ripple-element,.mat-mdc-outlined-button .mat-ripple-element{background-color:var(--mat-mdc-button-ripple-color)}.mat-mdc-button .mdc-button__label,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-outlined-button .mdc-button__label{z-index:1}.mat-mdc-button .mat-mdc-focus-indicator,.mat-mdc-unelevated-button .mat-mdc-focus-indicator,.mat-mdc-raised-button .mat-mdc-focus-indicator,.mat-mdc-outlined-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-unelevated-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-raised-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-outlined-button:focus .mat-mdc-focus-indicator::before{content:""}.mat-mdc-button[disabled],.mat-mdc-unelevated-button[disabled],.mat-mdc-raised-button[disabled],.mat-mdc-outlined-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-button .mat-mdc-button-touch-target,.mat-mdc-unelevated-button .mat-mdc-button-touch-target,.mat-mdc-raised-button .mat-mdc-button-touch-target,.mat-mdc-outlined-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mat-mdc-button._mat-animation-noopable,.mat-mdc-unelevated-button._mat-animation-noopable,.mat-mdc-raised-button._mat-animation-noopable,.mat-mdc-outlined-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-button>.mat-icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}[dir=rtl] .mat-mdc-button>.mat-icon,.mat-mdc-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:0}.mat-mdc-button .mdc-button__label+.mat-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-mdc-button .mdc-button__label+.mat-icon,.mat-mdc-button .mdc-button__label+.mat-icon[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-unelevated-button>.mat-icon,.mat-mdc-raised-button>.mat-icon,.mat-mdc-outlined-button>.mat-icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem;margin-left:-4px;margin-right:8px}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon,[dir=rtl] .mat-mdc-raised-button>.mat-icon,[dir=rtl] .mat-mdc-outlined-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon[dir=rtl],.mat-mdc-raised-button>.mat-icon[dir=rtl],.mat-mdc-outlined-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:0}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon,[dir=rtl] .mat-mdc-raised-button>.mat-icon,[dir=rtl] .mat-mdc-outlined-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon[dir=rtl],.mat-mdc-raised-button>.mat-icon[dir=rtl],.mat-mdc-outlined-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mat-mdc-unelevated-button .mdc-button__label+.mat-icon,.mat-mdc-raised-button .mdc-button__label+.mat-icon,.mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-raised-button .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-outlined-button .mdc-button__label+.mat-icon,.mat-mdc-unelevated-button .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-raised-button .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-outlined-button .mdc-button__label+.mat-icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:-1px}.mat-mdc-unelevated-button .mat-mdc-focus-indicator::before,.mat-mdc-raised-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-mdc-outlined-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 3px) * -1)}',
                '.cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            r
          );
        })(),
        ng = (() => {
          class r extends xf {
            constructor(e, o, l, f) {
              super(e, o, l, f);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(
                d.Y36(d.SBq),
                d.Y36(Kn),
                d.Y36(d.R0b),
                d.Y36(d.QbO, 8)
              );
            }),
            (r.??cmp = d.Xpm({
              type: r,
              selectors: [['button', 'mat-icon-button', '']],
              hostVars: 7,
              hostBindings: function (e, o) {
                2 & e &&
                  (d.uIk('disabled', o.disabled || null),
                  d.ekj(
                    '_mat-animation-noopable',
                    'NoopAnimations' === o._animationMode
                  )('mat-unthemed', !o.color)('mat-mdc-button-base', !0));
              },
              inputs: {
                disabled: 'disabled',
                disableRipple: 'disableRipple',
                color: 'color',
              },
              exportAs: ['matButton'],
              features: [d.qOj],
              attrs: Xm,
              ngContentSelectors: Yv,
              decls: 5,
              vars: 3,
              consts: [
                [
                  1,
                  'mat-mdc-button-persistent-ripple',
                  'mdc-icon-button__ripple',
                ],
                [1, 'mat-mdc-focus-indicator'],
                [
                  'matRipple',
                  '',
                  1,
                  'mat-mdc-button-ripple',
                  3,
                  'matRippleDisabled',
                  'matRippleCentered',
                  'matRippleTrigger',
                ],
                [1, 'mat-mdc-button-touch-target'],
              ],
              template: function (e, o) {
                1 & e &&
                  (d.F$t(),
                  d._UZ(0, 'span', 0),
                  d.Hsn(1),
                  d._UZ(2, 'span', 1)(3, 'span', 2)(4, 'span', 3)),
                  2 & e &&
                    (d.xp6(3),
                    d.Q6J('matRippleDisabled', o._isRippleDisabled())(
                      'matRippleCentered',
                      !0
                    )('matRippleTrigger', o._elementRef.nativeElement));
              },
              dependencies: [Nc],
              styles: [
                '.mdc-icon-button{font-size:24px;width:48px;height:48px;padding:12px}.mdc-icon-button .mdc-icon-button__focus-ring{max-height:48px;max-width:48px}.mdc-icon-button.mdc-icon-button--reduced-size .mdc-icon-button__ripple{width:40px;height:40px;margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-icon-button.mdc-icon-button--reduced-size .mdc-icon-button__focus-ring{max-height:40px;max-width:40px}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:rgba(0,0,0,0);fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}@media screen and (forced-colors: active){.mdc-icon-button.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-icon-button:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{display:block}}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button[hidden]{display:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%;display:none}@media screen and (forced-colors: active){.mdc-icon-button__focus-ring{border-color:CanvasText}}.mdc-icon-button__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-icon-button__focus-ring::after{border-color:CanvasText}}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button__link{height:100%;left:0;outline:none;position:absolute;top:0;width:100%}.mat-mdc-icon-button{height:var(--mdc-icon-button-state-layer-size, 48px);width:var(--mdc-icon-button-state-layer-size, 48px);color:var(--mdc-icon-button-icon-color, inherit);border-radius:50%;flex-shrink:0;text-align:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-icon-button .mdc-button__icon{font-size:var(--mdc-icon-button-icon-size, 24px)}.mat-mdc-icon-button svg,.mat-mdc-icon-button img{width:var(--mdc-icon-button-icon-size, 24px);height:var(--mdc-icon-button-icon-size, 24px)}.mat-mdc-icon-button:disabled{opacity:var(--mdc-icon-button-disabled-icon-opacity, 0.38)}.mat-mdc-icon-button:disabled{color:var(--mdc-icon-button-disabled-icon-color, #000)}.mat-mdc-icon-button svg{vertical-align:baseline}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none;opacity:1}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0;background-color:var(--mat-mdc-button-persistent-ripple-color)}.mat-mdc-icon-button .mat-ripple-element{background-color:var(--mat-mdc-button-ripple-color)}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-icon-button:focus .mat-mdc-focus-indicator::before{content:""}.mat-mdc-icon-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mat-mdc-icon-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple{border-radius:50%}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}',
                '.cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            r
          );
        })(),
        ig = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [St, Km, St] })),
            r
          );
        })();
      var e0 = F(451);
      class rg {}
      class t0 {}
      const er = '*';
      function n0(r, t) {
        return { type: 7, name: r, definitions: t, options: {} };
      }
      function og(r, t = null) {
        return { type: 4, styles: t, timings: r };
      }
      function sg(r, t = null) {
        return { type: 2, steps: r, options: t };
      }
      function Lc(r) {
        return { type: 6, styles: r, offset: null };
      }
      function ag(r, t, e) {
        return { type: 0, name: r, styles: t, options: e };
      }
      function o0(r, t, e = null) {
        return { type: 1, expr: r, animation: t, options: e };
      }
      function ug(r) {
        Promise.resolve().then(r);
      }
      class cl {
        constructor(t = 0, e = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = t + e);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          ug(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach((o) => o()), (e.length = 0);
        }
      }
      class Vc {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let e = 0,
            o = 0,
            l = 0;
          const f = this.players.length;
          0 == f
            ? ug(() => this._onFinish())
            : this.players.forEach((p) => {
                p.onDone(() => {
                  ++e == f && this._onFinish();
                }),
                  p.onDestroy(() => {
                    ++o == f && this._onDestroy();
                  }),
                  p.onStart(() => {
                    ++l == f && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (p, y) => Math.max(p, y.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((t) => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach((o) => {
            const l = o.totalTime ? Math.min(1, e / o.totalTime) : 1;
            o.setPosition(l);
          });
        }
        getPosition() {
          const t = this.players.reduce(
            (e, o) => (null === e || o.totalTime > e.totalTime ? o : e),
            null
          );
          return null != t ? t.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach((o) => o()), (e.length = 0);
        }
      }
      let Ef = (() => {
          class r {
            create(e) {
              return typeof MutationObserver > 'u'
                ? null
                : new MutationObserver(e);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: r.??fac,
              providedIn: 'root',
            })),
            r
          );
        })(),
        Ps = (() => {
          class r {
            constructor(e) {
              (this._mutationObserverFactory = e),
                (this._observedElements = new Map());
            }
            ngOnDestroy() {
              this._observedElements.forEach((e, o) =>
                this._cleanupObserver(o)
              );
            }
            observe(e) {
              const o = ci(e);
              return new en.y((l) => {
                const p = this._observeElement(o).subscribe(l);
                return () => {
                  p.unsubscribe(), this._unobserveElement(o);
                };
              });
            }
            _observeElement(e) {
              if (this._observedElements.has(e))
                this._observedElements.get(e).count++;
              else {
                const o = new un.x(),
                  l = this._mutationObserverFactory.create((f) => o.next(f));
                l &&
                  l.observe(e, {
                    characterData: !0,
                    childList: !0,
                    subtree: !0,
                  }),
                  this._observedElements.set(e, {
                    observer: l,
                    stream: o,
                    count: 1,
                  });
              }
              return this._observedElements.get(e).stream;
            }
            _unobserveElement(e) {
              this._observedElements.has(e) &&
                (this._observedElements.get(e).count--,
                this._observedElements.get(e).count ||
                  this._cleanupObserver(e));
            }
            _cleanupObserver(e) {
              if (this._observedElements.has(e)) {
                const { observer: o, stream: l } =
                  this._observedElements.get(e);
                o && o.disconnect(),
                  l.complete(),
                  this._observedElements.delete(e);
              }
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.LFG(Ef));
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: r.??fac,
              providedIn: 'root',
            })),
            r
          );
        })(),
        fg = (() => {
          class r {
            get disabled() {
              return this._disabled;
            }
            set disabled(e) {
              (this._disabled = li(e)),
                this._disabled ? this._unsubscribe() : this._subscribe();
            }
            get debounce() {
              return this._debounce;
            }
            set debounce(e) {
              (this._debounce = Is(e)), this._subscribe();
            }
            constructor(e, o, l) {
              (this._contentObserver = e),
                (this._elementRef = o),
                (this._ngZone = l),
                (this.event = new d.vpe()),
                (this._disabled = !1),
                (this._currentSubscription = null);
            }
            ngAfterContentInit() {
              !this._currentSubscription && !this.disabled && this._subscribe();
            }
            ngOnDestroy() {
              this._unsubscribe();
            }
            _subscribe() {
              this._unsubscribe();
              const e = this._contentObserver.observe(this._elementRef);
              this._ngZone.runOutsideAngular(() => {
                this._currentSubscription = (
                  this.debounce ? e.pipe(Sm(this.debounce)) : e
                ).subscribe(this.event);
              });
            }
            _unsubscribe() {
              this._currentSubscription?.unsubscribe();
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.Y36(Ps), d.Y36(d.SBq), d.Y36(d.R0b));
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [['', 'cdkObserveContent', '']],
              inputs: {
                disabled: ['cdkObserveContentDisabled', 'disabled'],
                debounce: 'debounce',
              },
              outputs: { event: 'cdkObserveContent' },
              exportAs: ['cdkObserveContent'],
            })),
            r
          );
        })(),
        a0 = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ providers: [Ef] })),
            r
          );
        })();
      const Lx = ['matFormFieldNotchedOutline', ''],
        hg = ['*'],
        Mf = ['textField'],
        l0 = ['iconPrefixContainer'],
        Sf = ['textPrefixContainer'];
      function c0(r, t) {
        1 & r && d._UZ(0, 'span', 19);
      }
      function pg(r, t) {
        if (1 & r) {
          const e = d.EpF();
          d.TgZ(0, 'label', 17),
            d.NdJ('cdkObserveContent', function () {
              d.CHM(e);
              const l = d.oxw(2);
              return d.KtG(l._refreshOutlineNotchWidth());
            }),
            d.Hsn(1, 1),
            d.YNc(2, c0, 1, 0, 'span', 18),
            d.qZA();
        }
        if (2 & r) {
          const e = d.oxw(2);
          d.Q6J('floating', e._shouldLabelFloat())(
            'cdkObserveContentDisabled',
            !e._hasOutline()
          )('id', e._labelId),
            d.uIk('for', e._control.id)('aria-owns', e._control.id),
            d.xp6(2),
            d.Q6J('ngIf', !e.hideRequiredMarker && e._control.required);
        }
      }
      function Af(r, t) {
        if ((1 & r && d.YNc(0, pg, 3, 6, 'label', 16), 2 & r)) {
          const e = d.oxw();
          d.Q6J('ngIf', e._hasFloatingLabel());
        }
      }
      function mg(r, t) {
        1 & r && d._UZ(0, 'div', 20);
      }
      function gg(r, t) {}
      function _g(r, t) {
        if ((1 & r && d.YNc(0, gg, 0, 0, 'ng-template', 22), 2 & r)) {
          d.oxw(2);
          const e = d.MAs(1);
          d.Q6J('ngTemplateOutlet', e);
        }
      }
      function bg(r, t) {
        if (
          (1 & r &&
            (d.TgZ(0, 'div', 21),
            d.YNc(1, _g, 1, 1, 'ng-template', 9),
            d.qZA()),
          2 & r)
        ) {
          const e = d.oxw();
          d.Q6J('matFormFieldNotchedOutlineOpen', e._shouldLabelFloat())(
            'matFormFieldNotchedOutlineLabelWidth',
            e._labelWidth
          ),
            d.xp6(1),
            d.Q6J('ngIf', !e._forceDisplayInfixLabel());
        }
      }
      function d0(r, t) {
        1 & r && (d.TgZ(0, 'div', 23, 24), d.Hsn(2, 2), d.qZA());
      }
      function u0(r, t) {
        1 & r && (d.TgZ(0, 'div', 25, 26), d.Hsn(2, 3), d.qZA());
      }
      function f0(r, t) {}
      function h0(r, t) {
        if ((1 & r && d.YNc(0, f0, 0, 0, 'ng-template', 22), 2 & r)) {
          d.oxw();
          const e = d.MAs(1);
          d.Q6J('ngTemplateOutlet', e);
        }
      }
      function yg(r, t) {
        1 & r && (d.TgZ(0, 'div', 27), d.Hsn(1, 4), d.qZA());
      }
      function Vx(r, t) {
        1 & r && (d.TgZ(0, 'div', 28), d.Hsn(1, 5), d.qZA());
      }
      function vg(r, t) {
        1 & r && d._UZ(0, 'div', 29);
      }
      function p0(r, t) {
        if ((1 & r && (d.TgZ(0, 'div', 30), d.Hsn(1, 6), d.qZA()), 2 & r)) {
          const e = d.oxw();
          d.Q6J('@transitionMessages', e._subscriptAnimationState);
        }
      }
      function m0(r, t) {
        if ((1 & r && (d.TgZ(0, 'mat-hint', 34), d._uU(1), d.qZA()), 2 & r)) {
          const e = d.oxw(2);
          d.Q6J('id', e._hintLabelId), d.xp6(1), d.Oqu(e.hintLabel);
        }
      }
      function Bx(r, t) {
        if (
          (1 & r &&
            (d.TgZ(0, 'div', 31),
            d.YNc(1, m0, 2, 2, 'mat-hint', 32),
            d.Hsn(2, 7),
            d._UZ(3, 'div', 33),
            d.Hsn(4, 8),
            d.qZA()),
          2 & r)
        ) {
          const e = d.oxw();
          d.Q6J('@transitionMessages', e._subscriptAnimationState),
            d.xp6(1),
            d.Q6J('ngIf', e.hintLabel);
        }
      }
      const g0 = [
          '*',
          [['mat-label']],
          [
            ['', 'matPrefix', ''],
            ['', 'matIconPrefix', ''],
          ],
          [['', 'matTextPrefix', '']],
          [['', 'matTextSuffix', '']],
          [
            ['', 'matSuffix', ''],
            ['', 'matIconSuffix', ''],
          ],
          [['mat-error'], ['', 'matError', '']],
          [['mat-hint', 3, 'align', 'end']],
          [['mat-hint', 'align', 'end']],
        ],
        _0 = [
          '*',
          'mat-label',
          '[matPrefix], [matIconPrefix]',
          '[matTextPrefix]',
          '[matTextSuffix]',
          '[matSuffix], [matIconSuffix]',
          'mat-error, [matError]',
          "mat-hint:not([align='end'])",
          "mat-hint[align='end']",
        ];
      let Bc = (() => {
        class r {}
        return (
          (r.??fac = function (e) {
            return new (e || r)();
          }),
          (r.??dir = d.lG2({ type: r, selectors: [['mat-label']] })),
          r
        );
      })();
      const y0 = new d.OlP('MatError');
      let v0 = 0,
        Hc = (() => {
          class r {
            constructor() {
              (this.align = 'start'), (this.id = 'mat-mdc-hint-' + v0++);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [['mat-hint']],
              hostAttrs: [
                1,
                'mat-mdc-form-field-hint',
                'mat-mdc-form-field-bottom-align',
              ],
              hostVars: 4,
              hostBindings: function (e, o) {
                2 & e &&
                  (d.Ikx('id', o.id),
                  d.uIk('align', null),
                  d.ekj('mat-mdc-form-field-hint-end', 'end' === o.align));
              },
              inputs: { align: 'align', id: 'id' },
            })),
            r
          );
        })();
      const w0 = new d.OlP('MatPrefix'),
        wg = new d.OlP('MatSuffix');
      let Dg = (() => {
          class r {
            constructor() {
              this._isText = !1;
            }
            set _isTextSelector(e) {
              this._isText = !0;
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['', 'matSuffix', ''],
                ['', 'matIconSuffix', ''],
                ['', 'matTextSuffix', ''],
              ],
              inputs: { _isTextSelector: ['matTextSuffix', '_isTextSelector'] },
              features: [d._Bn([{ provide: wg, useExisting: r }])],
            })),
            r
          );
        })(),
        Ns = (() => {
          class r {
            constructor(e) {
              (this._elementRef = e), (this.floating = !1);
            }
            getWidth() {
              return (function xg(r) {
                if (null !== r.offsetParent) return r.scrollWidth;
                const e = r.cloneNode(!0);
                e.style.setProperty('position', 'absolute'),
                  e.style.setProperty(
                    'transform',
                    'translate(-9999px, -9999px)'
                  ),
                  document.documentElement.appendChild(e);
                const o = e.scrollWidth;
                return e.remove(), o;
              })(this._elementRef.nativeElement);
            }
            get element() {
              return this._elementRef.nativeElement;
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.Y36(d.SBq));
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [['label', 'matFormFieldFloatingLabel', '']],
              hostAttrs: [1, 'mdc-floating-label', 'mat-mdc-floating-label'],
              hostVars: 2,
              hostBindings: function (e, o) {
                2 & e && d.ekj('mdc-floating-label--float-above', o.floating);
              },
              inputs: { floating: 'floating' },
            })),
            r
          );
        })();
      const Tf = 'mdc-line-ripple--active',
        dl = 'mdc-line-ripple--deactivating';
      let If = (() => {
          class r {
            constructor(e, o) {
              (this._elementRef = e),
                (this._handleTransitionEnd = (l) => {
                  const f = this._elementRef.nativeElement.classList,
                    p = f.contains(dl);
                  'opacity' === l.propertyName && p && f.remove(Tf, dl);
                }),
                o.runOutsideAngular(() => {
                  e.nativeElement.addEventListener(
                    'transitionend',
                    this._handleTransitionEnd
                  );
                });
            }
            activate() {
              const e = this._elementRef.nativeElement.classList;
              e.remove(dl), e.add(Tf);
            }
            deactivate() {
              this._elementRef.nativeElement.classList.add(dl);
            }
            ngOnDestroy() {
              this._elementRef.nativeElement.removeEventListener(
                'transitionend',
                this._handleTransitionEnd
              );
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.Y36(d.SBq), d.Y36(d.R0b));
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [['div', 'matFormFieldLineRipple', '']],
              hostAttrs: [1, 'mdc-line-ripple'],
            })),
            r
          );
        })(),
        Ff = (() => {
          class r {
            constructor(e, o) {
              (this._elementRef = e),
                (this._ngZone = o),
                (this.labelWidth = 0),
                (this.open = !1);
            }
            ngAfterViewInit() {
              const e = this._elementRef.nativeElement.querySelector(
                '.mdc-floating-label'
              );
              e
                ? (this._elementRef.nativeElement.classList.add(
                    'mdc-notched-outline--upgraded'
                  ),
                  'function' == typeof requestAnimationFrame &&
                    ((e.style.transitionDuration = '0s'),
                    this._ngZone.runOutsideAngular(() => {
                      requestAnimationFrame(
                        () => (e.style.transitionDuration = '')
                      );
                    })))
                : this._elementRef.nativeElement.classList.add(
                    'mdc-notched-outline--no-label'
                  );
            }
            _getNotchWidth() {
              return this.open
                ? this.labelWidth > 0
                  ? `calc(${this.labelWidth}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`
                  : '0px'
                : null;
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.Y36(d.SBq), d.Y36(d.R0b));
            }),
            (r.??cmp = d.Xpm({
              type: r,
              selectors: [['div', 'matFormFieldNotchedOutline', '']],
              hostAttrs: [1, 'mdc-notched-outline'],
              hostVars: 2,
              hostBindings: function (e, o) {
                2 & e && d.ekj('mdc-notched-outline--notched', o.open);
              },
              inputs: {
                labelWidth: [
                  'matFormFieldNotchedOutlineLabelWidth',
                  'labelWidth',
                ],
                open: ['matFormFieldNotchedOutlineOpen', 'open'],
              },
              attrs: Lx,
              ngContentSelectors: hg,
              decls: 4,
              vars: 2,
              consts: [
                [1, 'mdc-notched-outline__leading'],
                [1, 'mdc-notched-outline__notch'],
                [1, 'mdc-notched-outline__trailing'],
              ],
              template: function (e, o) {
                1 & e &&
                  (d.F$t(),
                  d._UZ(0, 'div', 0),
                  d.TgZ(1, 'div', 1),
                  d.Hsn(2),
                  d.qZA(),
                  d._UZ(3, 'div', 2)),
                  2 & e && (d.xp6(1), d.Udp('width', o._getNotchWidth()));
              },
              encapsulation: 2,
              changeDetection: 0,
            })),
            r
          );
        })();
      const Cg = {
        transitionMessages: n0('transitionMessages', [
          ag('enter', Lc({ opacity: 1, transform: 'translateY(0%)' })),
          o0('void => enter', [
            Lc({ opacity: 0, transform: 'translateY(-5px)' }),
            og('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
          ]),
        ]),
      };
      let Eg = (() => {
        class r {}
        return (
          (r.??fac = function (e) {
            return new (e || r)();
          }),
          (r.??dir = d.lG2({ type: r })),
          r
        );
      })();
      const Mg = new d.OlP('MatFormField'),
        x0 = new d.OlP('MAT_FORM_FIELD_DEFAULT_OPTIONS');
      let Sg = 0,
        Ag = (() => {
          class r {
            get hideRequiredMarker() {
              return this._hideRequiredMarker;
            }
            set hideRequiredMarker(e) {
              this._hideRequiredMarker = li(e);
            }
            get floatLabel() {
              return this._floatLabel || this._defaults?.floatLabel || 'auto';
            }
            set floatLabel(e) {
              e !== this._floatLabel &&
                ((this._floatLabel = e),
                this._changeDetectorRef.markForCheck());
            }
            get appearance() {
              return this._appearance;
            }
            set appearance(e) {
              const o = this._appearance;
              (this._appearance = e || this._defaults?.appearance || 'fill'),
                'outline' === this._appearance &&
                  this._appearance !== o &&
                  (this._refreshOutlineNotchWidth(),
                  (this._needsOutlineLabelOffsetUpdateOnStable = !0));
            }
            get subscriptSizing() {
              return (
                this._subscriptSizing ||
                this._defaults?.subscriptSizing ||
                'fixed'
              );
            }
            set subscriptSizing(e) {
              this._subscriptSizing =
                e || this._defaults?.subscriptSizing || 'fixed';
            }
            get hintLabel() {
              return this._hintLabel;
            }
            set hintLabel(e) {
              (this._hintLabel = e), this._processHints();
            }
            get _control() {
              return this._explicitFormFieldControl || this._formFieldControl;
            }
            set _control(e) {
              this._explicitFormFieldControl = e;
            }
            constructor(e, o, l, f, p, y, D, S) {
              (this._elementRef = e),
                (this._changeDetectorRef = o),
                (this._ngZone = l),
                (this._dir = f),
                (this._platform = p),
                (this._defaults = y),
                (this._animationMode = D),
                (this._document = S),
                (this._hideRequiredMarker = !1),
                (this.color = 'primary'),
                (this._appearance = 'fill'),
                (this._subscriptSizing = null),
                (this._hintLabel = ''),
                (this._hasIconPrefix = !1),
                (this._hasTextPrefix = !1),
                (this._hasIconSuffix = !1),
                (this._hasTextSuffix = !1),
                (this._labelId = 'mat-mdc-form-field-label-' + Sg++),
                (this._hintLabelId = 'mat-mdc-hint-' + Sg++),
                (this._subscriptAnimationState = ''),
                (this._labelWidth = 0),
                (this._destroyed = new un.x()),
                (this._isFocused = null),
                (this._needsOutlineLabelOffsetUpdateOnStable = !1),
                y &&
                  (y.appearance && (this.appearance = y.appearance),
                  (this._hideRequiredMarker = Boolean(y?.hideRequiredMarker)),
                  y.color && (this.color = y.color));
            }
            ngAfterViewInit() {
              this._updateFocusState(),
                this._refreshOutlineNotchWidth(),
                this._document?.fonts?.ready
                  ? this._document.fonts.ready.then(() => {
                      this._refreshOutlineNotchWidth(),
                        this._changeDetectorRef.markForCheck();
                    })
                  : setTimeout(() => this._refreshOutlineNotchWidth(), 100),
                (this._subscriptAnimationState = 'enter'),
                this._changeDetectorRef.detectChanges();
            }
            ngAfterContentInit() {
              this._assertFormFieldControl(),
                this._initializeControl(),
                this._initializeSubscript(),
                this._initializePrefixAndSuffix(),
                this._initializeOutlineLabelOffsetSubscriptions();
            }
            ngAfterContentChecked() {
              this._assertFormFieldControl();
            }
            ngOnDestroy() {
              this._destroyed.next(), this._destroyed.complete();
            }
            getLabelId() {
              return this._hasFloatingLabel() ? this._labelId : null;
            }
            getConnectedOverlayOrigin() {
              return this._textField || this._elementRef;
            }
            _animateAndLockLabel() {
              this._hasFloatingLabel() && (this.floatLabel = 'always');
            }
            _initializeControl() {
              const e = this._control;
              e.controlType &&
                this._elementRef.nativeElement.classList.add(
                  `mat-mdc-form-field-type-${e.controlType}`
                ),
                e.stateChanges.subscribe(() => {
                  this._updateFocusState(),
                    this._syncDescribedByIds(),
                    this._changeDetectorRef.markForCheck();
                }),
                e.ngControl &&
                  e.ngControl.valueChanges &&
                  e.ngControl.valueChanges
                    .pipe(Ts(this._destroyed))
                    .subscribe(() => this._changeDetectorRef.markForCheck());
            }
            _checkPrefixAndSuffixTypes() {
              (this._hasIconPrefix = !!this._prefixChildren.find(
                (e) => !e._isText
              )),
                (this._hasTextPrefix = !!this._prefixChildren.find(
                  (e) => e._isText
                )),
                (this._hasIconSuffix = !!this._suffixChildren.find(
                  (e) => !e._isText
                )),
                (this._hasTextSuffix = !!this._suffixChildren.find(
                  (e) => e._isText
                ));
            }
            _initializePrefixAndSuffix() {
              this._checkPrefixAndSuffixTypes(),
                (0, e0.T)(
                  this._prefixChildren.changes,
                  this._suffixChildren.changes
                ).subscribe(() => {
                  this._checkPrefixAndSuffixTypes(),
                    this._changeDetectorRef.markForCheck();
                });
            }
            _initializeSubscript() {
              this._hintChildren.changes.subscribe(() => {
                this._processHints(), this._changeDetectorRef.markForCheck();
              }),
                this._errorChildren.changes.subscribe(() => {
                  this._syncDescribedByIds(),
                    this._changeDetectorRef.markForCheck();
                }),
                this._validateHints(),
                this._syncDescribedByIds();
            }
            _assertFormFieldControl() {}
            _updateFocusState() {
              this._control.focused && !this._isFocused
                ? ((this._isFocused = !0), this._lineRipple?.activate())
                : !this._control.focused &&
                  (this._isFocused || null === this._isFocused) &&
                  ((this._isFocused = !1), this._lineRipple?.deactivate()),
                this._textField?.nativeElement.classList.toggle(
                  'mdc-text-field--focused',
                  this._control.focused
                );
            }
            _initializeOutlineLabelOffsetSubscriptions() {
              this._prefixChildren.changes.subscribe(
                () => (this._needsOutlineLabelOffsetUpdateOnStable = !0)
              ),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable
                    .pipe(Ts(this._destroyed))
                    .subscribe(() => {
                      this._needsOutlineLabelOffsetUpdateOnStable &&
                        ((this._needsOutlineLabelOffsetUpdateOnStable = !1),
                        this._updateOutlineLabelOffset());
                    });
                }),
                this._dir.change
                  .pipe(Ts(this._destroyed))
                  .subscribe(
                    () => (this._needsOutlineLabelOffsetUpdateOnStable = !0)
                  );
            }
            _shouldAlwaysFloat() {
              return 'always' === this.floatLabel;
            }
            _hasOutline() {
              return 'outline' === this.appearance;
            }
            _forceDisplayInfixLabel() {
              return (
                !this._platform.isBrowser &&
                this._prefixChildren.length &&
                !this._shouldLabelFloat()
              );
            }
            _hasFloatingLabel() {
              return !!this._labelChildNonStatic || !!this._labelChildStatic;
            }
            _shouldLabelFloat() {
              return (
                this._control.shouldLabelFloat || this._shouldAlwaysFloat()
              );
            }
            _shouldForward(e) {
              const o = this._control ? this._control.ngControl : null;
              return o && o[e];
            }
            _getDisplayedMessages() {
              return this._errorChildren &&
                this._errorChildren.length > 0 &&
                this._control.errorState
                ? 'error'
                : 'hint';
            }
            _refreshOutlineNotchWidth() {
              !this._hasOutline() ||
                !this._floatingLabel ||
                (this._labelWidth = this._floatingLabel.getWidth());
            }
            _processHints() {
              this._validateHints(), this._syncDescribedByIds();
            }
            _validateHints() {}
            _syncDescribedByIds() {
              if (this._control) {
                let e = [];
                if (
                  (this._control.userAriaDescribedBy &&
                    'string' == typeof this._control.userAriaDescribedBy &&
                    e.push(...this._control.userAriaDescribedBy.split(' ')),
                  'hint' === this._getDisplayedMessages())
                ) {
                  const o = this._hintChildren
                      ? this._hintChildren.find((f) => 'start' === f.align)
                      : null,
                    l = this._hintChildren
                      ? this._hintChildren.find((f) => 'end' === f.align)
                      : null;
                  o
                    ? e.push(o.id)
                    : this._hintLabel && e.push(this._hintLabelId),
                    l && e.push(l.id);
                } else
                  this._errorChildren &&
                    e.push(...this._errorChildren.map((o) => o.id));
                this._control.setDescribedByIds(e);
              }
            }
            _updateOutlineLabelOffset() {
              if (
                !this._platform.isBrowser ||
                !this._hasOutline() ||
                !this._floatingLabel
              )
                return;
              const e = this._floatingLabel.element;
              if (!this._iconPrefixContainer && !this._textPrefixContainer)
                return void (e.style.transform = '');
              if (!this._isAttachedToDom())
                return void (this._needsOutlineLabelOffsetUpdateOnStable = !0);
              const o = this._iconPrefixContainer?.nativeElement,
                l = this._textPrefixContainer?.nativeElement,
                f = o?.getBoundingClientRect().width ?? 0,
                p = l?.getBoundingClientRect().width ?? 0;
              e.style.transform = `var(\n        --mat-mdc-form-field-label-transform,\n        translateY(-50%) translateX(calc(${
                'rtl' === this._dir.value ? '-1' : '1'
              } * (${
                f + p
              }px + var(--mat-mdc-form-field-label-offset-x, 0px))))\n    )`;
            }
            _isAttachedToDom() {
              const e = this._elementRef.nativeElement;
              if (e.getRootNode) {
                const o = e.getRootNode();
                return o && o !== e;
              }
              return document.documentElement.contains(e);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(
                d.Y36(d.SBq),
                d.Y36(d.sBO),
                d.Y36(d.R0b),
                d.Y36(gf),
                d.Y36(Kn),
                d.Y36(x0, 8),
                d.Y36(d.QbO, 8),
                d.Y36(E.K0)
              );
            }),
            (r.??cmp = d.Xpm({
              type: r,
              selectors: [['mat-form-field']],
              contentQueries: function (e, o, l) {
                if (
                  (1 & e &&
                    (d.Suo(l, Bc, 5),
                    d.Suo(l, Bc, 7),
                    d.Suo(l, Eg, 5),
                    d.Suo(l, w0, 5),
                    d.Suo(l, wg, 5),
                    d.Suo(l, y0, 5),
                    d.Suo(l, Hc, 5)),
                  2 & e)
                ) {
                  let f;
                  d.iGM((f = d.CRH())) && (o._labelChildNonStatic = f.first),
                    d.iGM((f = d.CRH())) && (o._labelChildStatic = f.first),
                    d.iGM((f = d.CRH())) && (o._formFieldControl = f.first),
                    d.iGM((f = d.CRH())) && (o._prefixChildren = f),
                    d.iGM((f = d.CRH())) && (o._suffixChildren = f),
                    d.iGM((f = d.CRH())) && (o._errorChildren = f),
                    d.iGM((f = d.CRH())) && (o._hintChildren = f);
                }
              },
              viewQuery: function (e, o) {
                if (
                  (1 & e &&
                    (d.Gf(Mf, 5),
                    d.Gf(l0, 5),
                    d.Gf(Sf, 5),
                    d.Gf(Ns, 5),
                    d.Gf(Ff, 5),
                    d.Gf(If, 5)),
                  2 & e)
                ) {
                  let l;
                  d.iGM((l = d.CRH())) && (o._textField = l.first),
                    d.iGM((l = d.CRH())) && (o._iconPrefixContainer = l.first),
                    d.iGM((l = d.CRH())) && (o._textPrefixContainer = l.first),
                    d.iGM((l = d.CRH())) && (o._floatingLabel = l.first),
                    d.iGM((l = d.CRH())) && (o._notchedOutline = l.first),
                    d.iGM((l = d.CRH())) && (o._lineRipple = l.first);
                }
              },
              hostAttrs: [1, 'mat-mdc-form-field'],
              hostVars: 42,
              hostBindings: function (e, o) {
                2 & e &&
                  d.ekj(
                    'mat-mdc-form-field-label-always-float',
                    o._shouldAlwaysFloat()
                  )('mat-mdc-form-field-has-icon-prefix', o._hasIconPrefix)(
                    'mat-mdc-form-field-has-icon-suffix',
                    o._hasIconSuffix
                  )('mat-form-field-invalid', o._control.errorState)(
                    'mat-form-field-disabled',
                    o._control.disabled
                  )('mat-form-field-autofilled', o._control.autofilled)(
                    'mat-form-field-no-animations',
                    'NoopAnimations' === o._animationMode
                  )('mat-form-field-appearance-fill', 'fill' == o.appearance)(
                    'mat-form-field-appearance-outline',
                    'outline' == o.appearance
                  )(
                    'mat-form-field-hide-placeholder',
                    o._hasFloatingLabel() && !o._shouldLabelFloat()
                  )('mat-focused', o._control.focused)(
                    'mat-primary',
                    'accent' !== o.color && 'warn' !== o.color
                  )('mat-accent', 'accent' === o.color)(
                    'mat-warn',
                    'warn' === o.color
                  )('ng-untouched', o._shouldForward('untouched'))(
                    'ng-touched',
                    o._shouldForward('touched')
                  )('ng-pristine', o._shouldForward('pristine'))(
                    'ng-dirty',
                    o._shouldForward('dirty')
                  )('ng-valid', o._shouldForward('valid'))(
                    'ng-invalid',
                    o._shouldForward('invalid')
                  )('ng-pending', o._shouldForward('pending'));
              },
              inputs: {
                hideRequiredMarker: 'hideRequiredMarker',
                color: 'color',
                floatLabel: 'floatLabel',
                appearance: 'appearance',
                subscriptSizing: 'subscriptSizing',
                hintLabel: 'hintLabel',
              },
              exportAs: ['matFormField'],
              features: [d._Bn([{ provide: Mg, useExisting: r }])],
              ngContentSelectors: _0,
              decls: 18,
              vars: 23,
              consts: [
                ['labelTemplate', ''],
                [1, 'mat-mdc-text-field-wrapper', 'mdc-text-field', 3, 'click'],
                ['textField', ''],
                ['class', 'mat-mdc-form-field-focus-overlay', 4, 'ngIf'],
                [1, 'mat-mdc-form-field-flex'],
                [
                  'matFormFieldNotchedOutline',
                  '',
                  3,
                  'matFormFieldNotchedOutlineOpen',
                  'matFormFieldNotchedOutlineLabelWidth',
                  4,
                  'ngIf',
                ],
                ['class', 'mat-mdc-form-field-icon-prefix', 4, 'ngIf'],
                ['class', 'mat-mdc-form-field-text-prefix', 4, 'ngIf'],
                [1, 'mat-mdc-form-field-infix'],
                [3, 'ngIf'],
                ['class', 'mat-mdc-form-field-text-suffix', 4, 'ngIf'],
                ['class', 'mat-mdc-form-field-icon-suffix', 4, 'ngIf'],
                ['matFormFieldLineRipple', '', 4, 'ngIf'],
                [
                  1,
                  'mat-mdc-form-field-subscript-wrapper',
                  'mat-mdc-form-field-bottom-align',
                  3,
                  'ngSwitch',
                ],
                [
                  'class',
                  'mat-mdc-form-field-error-wrapper',
                  4,
                  'ngSwitchCase',
                ],
                ['class', 'mat-mdc-form-field-hint-wrapper', 4, 'ngSwitchCase'],
                [
                  'matFormFieldFloatingLabel',
                  '',
                  3,
                  'floating',
                  'cdkObserveContentDisabled',
                  'id',
                  'cdkObserveContent',
                  4,
                  'ngIf',
                ],
                [
                  'matFormFieldFloatingLabel',
                  '',
                  3,
                  'floating',
                  'cdkObserveContentDisabled',
                  'id',
                  'cdkObserveContent',
                ],
                [
                  'aria-hidden',
                  'true',
                  'class',
                  'mat-mdc-form-field-required-marker mdc-floating-label--required',
                  4,
                  'ngIf',
                ],
                [
                  'aria-hidden',
                  'true',
                  1,
                  'mat-mdc-form-field-required-marker',
                  'mdc-floating-label--required',
                ],
                [1, 'mat-mdc-form-field-focus-overlay'],
                [
                  'matFormFieldNotchedOutline',
                  '',
                  3,
                  'matFormFieldNotchedOutlineOpen',
                  'matFormFieldNotchedOutlineLabelWidth',
                ],
                [3, 'ngTemplateOutlet'],
                [1, 'mat-mdc-form-field-icon-prefix'],
                ['iconPrefixContainer', ''],
                [1, 'mat-mdc-form-field-text-prefix'],
                ['textPrefixContainer', ''],
                [1, 'mat-mdc-form-field-text-suffix'],
                [1, 'mat-mdc-form-field-icon-suffix'],
                ['matFormFieldLineRipple', ''],
                [1, 'mat-mdc-form-field-error-wrapper'],
                [1, 'mat-mdc-form-field-hint-wrapper'],
                [3, 'id', 4, 'ngIf'],
                [1, 'mat-mdc-form-field-hint-spacer'],
                [3, 'id'],
              ],
              template: function (e, o) {
                1 & e &&
                  (d.F$t(g0),
                  d.YNc(0, Af, 1, 1, 'ng-template', null, 0, d.W1O),
                  d.TgZ(2, 'div', 1, 2),
                  d.NdJ('click', function (f) {
                    return (
                      o._control.onContainerClick &&
                      o._control.onContainerClick(f)
                    );
                  }),
                  d.YNc(4, mg, 1, 0, 'div', 3),
                  d.TgZ(5, 'div', 4),
                  d.YNc(6, bg, 2, 3, 'div', 5),
                  d.YNc(7, d0, 3, 0, 'div', 6),
                  d.YNc(8, u0, 3, 0, 'div', 7),
                  d.TgZ(9, 'div', 8),
                  d.YNc(10, h0, 1, 1, 'ng-template', 9),
                  d.Hsn(11),
                  d.qZA(),
                  d.YNc(12, yg, 2, 0, 'div', 10),
                  d.YNc(13, Vx, 2, 0, 'div', 11),
                  d.qZA(),
                  d.YNc(14, vg, 1, 0, 'div', 12),
                  d.qZA(),
                  d.TgZ(15, 'div', 13),
                  d.YNc(16, p0, 2, 1, 'div', 14),
                  d.YNc(17, Bx, 5, 2, 'div', 15),
                  d.qZA()),
                  2 & e &&
                    (d.xp6(2),
                    d.ekj('mdc-text-field--filled', !o._hasOutline())(
                      'mdc-text-field--outlined',
                      o._hasOutline()
                    )('mdc-text-field--no-label', !o._hasFloatingLabel())(
                      'mdc-text-field--disabled',
                      o._control.disabled
                    )('mdc-text-field--invalid', o._control.errorState),
                    d.xp6(2),
                    d.Q6J('ngIf', !o._hasOutline() && !o._control.disabled),
                    d.xp6(2),
                    d.Q6J('ngIf', o._hasOutline()),
                    d.xp6(1),
                    d.Q6J('ngIf', o._hasIconPrefix),
                    d.xp6(1),
                    d.Q6J('ngIf', o._hasTextPrefix),
                    d.xp6(2),
                    d.Q6J(
                      'ngIf',
                      !o._hasOutline() || o._forceDisplayInfixLabel()
                    ),
                    d.xp6(2),
                    d.Q6J('ngIf', o._hasTextSuffix),
                    d.xp6(1),
                    d.Q6J('ngIf', o._hasIconSuffix),
                    d.xp6(1),
                    d.Q6J('ngIf', !o._hasOutline()),
                    d.xp6(1),
                    d.ekj(
                      'mat-mdc-form-field-subscript-dynamic-size',
                      'dynamic' === o.subscriptSizing
                    ),
                    d.Q6J('ngSwitch', o._getDisplayedMessages()),
                    d.xp6(1),
                    d.Q6J('ngSwitchCase', 'error'),
                    d.xp6(1),
                    d.Q6J('ngSwitchCase', 'hint'));
              },
              dependencies: [E.O5, E.tP, E.RF, E.n9, fg, Hc, Ns, Ff, If],
              styles: [
                '.mdc-text-field{border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{height:28px;width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}}.mdc-text-field__affix{height:28px;opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px, var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:rgba(0,0,0,0)}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-floating-label{position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after,.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.3333333333%}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::after{border-bottom-width:2px}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);opacity:0;z-index:2}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mat-mdc-form-field-textarea-control{vertical-align:middle;resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control{font:inherit;letter-spacing:inherit;text-decoration:inherit;text-transform:inherit;border:none}.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label{line-height:normal;pointer-events:all}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color]{height:23px}.mat-mdc-text-field-wrapper{height:auto;flex:auto}.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-left:0;--mat-mdc-form-field-label-offset-x: -16px}.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-right:0}[dir=rtl] .mat-mdc-text-field-wrapper{padding-left:16px;padding-right:16px}[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-left:0}[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-right:0}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label{left:auto;right:auto}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-text-field-wrapper::before{content:none}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;position:relative}.mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-error-wrapper{position:absolute;top:0;left:0;right:0;padding:0 16px}.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper{position:static}.mat-mdc-form-field-bottom-align::before{content:"";display:inline-block;height:16px}.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before{content:unset}.mat-mdc-form-field-hint-end{order:1}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0;pointer-events:none}select.mat-mdc-form-field-input-control{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box}select.mat-mdc-form-field-input-control:not(:disabled){cursor:pointer}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;right:0;top:50%;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:0;padding-left:15px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper{outline:solid 1px}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper{outline-color:GrayText}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper{outline:dashed 3px}.cdk-high-contrast-active .mat-mdc-form-field.mat-focused .mdc-notched-outline{border:dashed 3px}.mat-mdc-form-field{--mat-mdc-form-field-floating-label-scale: 0.75;display:inline-flex;flex-direction:column;min-width:0;text-align:left}[dir=rtl] .mat-mdc-form-field{text-align:right}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%}.mat-mdc-form-field-icon-prefix,.mat-mdc-form-field-icon-suffix{align-self:center;line-height:0;pointer-events:auto}.mat-mdc-form-field-icon-prefix,[dir=rtl] .mat-mdc-form-field-icon-suffix{padding:0 4px 0 0}.mat-mdc-form-field-icon-suffix,[dir=rtl] .mat-mdc-form-field-icon-prefix{padding:0 0 0 4px}.mat-mdc-form-field-icon-prefix>.mat-icon,.mat-mdc-form-field-icon-suffix>.mat-icon{padding:12px;box-sizing:content-box}.mat-mdc-form-field-subscript-wrapper .mat-icon,.mat-mdc-form-field label .mat-icon{width:1em;height:1em;font-size:inherit}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field .mdc-notched-outline__notch{margin-left:-1px;-webkit-clip-path:inset(-9em -999em -9em 1px);clip-path:inset(-9em -999em -9em 1px)}[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch{margin-left:0;margin-right:-1px;-webkit-clip-path:inset(-9em 1px -9em -999em);clip-path:inset(-9em 1px -9em -999em)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__affix{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea{transition:none}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}',
              ],
              encapsulation: 2,
              data: { animation: [Cg.transitionMessages] },
              changeDetection: 0,
            })),
            r
          );
        })(),
        Ls = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [St, E.ez, a0, St] })),
            r
          );
        })();
      const Vs = za({ passive: !0 });
      let E0 = (() => {
          class r {
            constructor(e, o) {
              (this._platform = e),
                (this._ngZone = o),
                (this._monitoredElements = new Map());
            }
            monitor(e) {
              if (!this._platform.isBrowser) return br.E;
              const o = ci(e),
                l = this._monitoredElements.get(o);
              if (l) return l.subject;
              const f = new un.x(),
                p = 'cdk-text-field-autofilled',
                y = (D) => {
                  'cdk-text-field-autofill-start' !== D.animationName ||
                  o.classList.contains(p)
                    ? 'cdk-text-field-autofill-end' === D.animationName &&
                      o.classList.contains(p) &&
                      (o.classList.remove(p),
                      this._ngZone.run(() =>
                        f.next({ target: D.target, isAutofilled: !1 })
                      ))
                    : (o.classList.add(p),
                      this._ngZone.run(() =>
                        f.next({ target: D.target, isAutofilled: !0 })
                      ));
                };
              return (
                this._ngZone.runOutsideAngular(() => {
                  o.addEventListener('animationstart', y, Vs),
                    o.classList.add('cdk-text-field-autofill-monitored');
                }),
                this._monitoredElements.set(o, {
                  subject: f,
                  unlisten: () => {
                    o.removeEventListener('animationstart', y, Vs);
                  },
                }),
                f
              );
            }
            stopMonitoring(e) {
              const o = ci(e),
                l = this._monitoredElements.get(o);
              l &&
                (l.unlisten(),
                l.subject.complete(),
                o.classList.remove('cdk-text-field-autofill-monitored'),
                o.classList.remove('cdk-text-field-autofilled'),
                this._monitoredElements.delete(o));
            }
            ngOnDestroy() {
              this._monitoredElements.forEach((e, o) => this.stopMonitoring(o));
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.LFG(Kn), d.LFG(d.R0b));
            }),
            (r.??prov = d.Yz7({
              token: r,
              factory: r.??fac,
              providedIn: 'root',
            })),
            r
          );
        })(),
        jc = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({})),
            r
          );
        })();
      const M0 = new d.OlP('MAT_INPUT_VALUE_ACCESSOR'),
        S0 = [
          'button',
          'checkbox',
          'file',
          'hidden',
          'image',
          'radio',
          'range',
          'reset',
          'submit',
        ];
      let Tg = 0;
      const Ig = Pv(
        class {
          constructor(r, t, e, o) {
            (this._defaultErrorStateMatcher = r),
              (this._parentForm = t),
              (this._parentFormGroup = e),
              (this.ngControl = o),
              (this.stateChanges = new un.x());
          }
        }
      );
      let $c = (() => {
          class r extends Ig {
            get disabled() {
              return this._disabled;
            }
            set disabled(e) {
              (this._disabled = li(e)),
                this.focused && ((this.focused = !1), this.stateChanges.next());
            }
            get id() {
              return this._id;
            }
            set id(e) {
              this._id = e || this._uid;
            }
            get required() {
              return (
                this._required ??
                this.ngControl?.control?.hasValidator(qr.required) ??
                !1
              );
            }
            set required(e) {
              this._required = li(e);
            }
            get type() {
              return this._type;
            }
            set type(e) {
              (this._type = e || 'text'),
                this._validateType(),
                !this._isTextarea &&
                  _y().has(this._type) &&
                  (this._elementRef.nativeElement.type = this._type);
            }
            get value() {
              return this._inputValueAccessor.value;
            }
            set value(e) {
              e !== this.value &&
                ((this._inputValueAccessor.value = e),
                this.stateChanges.next());
            }
            get readonly() {
              return this._readonly;
            }
            set readonly(e) {
              this._readonly = li(e);
            }
            constructor(e, o, l, f, p, y, D, S, R, B) {
              super(y, f, p, l),
                (this._elementRef = e),
                (this._platform = o),
                (this._autofillMonitor = S),
                (this._formField = B),
                (this._uid = 'mat-input-' + Tg++),
                (this.focused = !1),
                (this.stateChanges = new un.x()),
                (this.controlType = 'mat-input'),
                (this.autofilled = !1),
                (this._disabled = !1),
                (this._type = 'text'),
                (this._readonly = !1),
                (this._neverEmptyInputTypes = [
                  'date',
                  'datetime',
                  'datetime-local',
                  'month',
                  'time',
                  'week',
                ].filter((Q) => _y().has(Q))),
                (this._iOSKeyupListener = (Q) => {
                  const ce = Q.target;
                  !ce.value &&
                    0 === ce.selectionStart &&
                    0 === ce.selectionEnd &&
                    (ce.setSelectionRange(1, 1), ce.setSelectionRange(0, 0));
                });
              const ae = this._elementRef.nativeElement,
                se = ae.nodeName.toLowerCase();
              (this._inputValueAccessor = D || ae),
                (this._previousNativeValue = this.value),
                (this.id = this.id),
                o.IOS &&
                  R.runOutsideAngular(() => {
                    e.nativeElement.addEventListener(
                      'keyup',
                      this._iOSKeyupListener
                    );
                  }),
                (this._isServer = !this._platform.isBrowser),
                (this._isNativeSelect = 'select' === se),
                (this._isTextarea = 'textarea' === se),
                (this._isInFormField = !!B),
                this._isNativeSelect &&
                  (this.controlType = ae.multiple
                    ? 'mat-native-select-multiple'
                    : 'mat-native-select');
            }
            ngAfterViewInit() {
              this._platform.isBrowser &&
                this._autofillMonitor
                  .monitor(this._elementRef.nativeElement)
                  .subscribe((e) => {
                    (this.autofilled = e.isAutofilled),
                      this.stateChanges.next();
                  });
            }
            ngOnChanges() {
              this.stateChanges.next();
            }
            ngOnDestroy() {
              this.stateChanges.complete(),
                this._platform.isBrowser &&
                  this._autofillMonitor.stopMonitoring(
                    this._elementRef.nativeElement
                  ),
                this._platform.IOS &&
                  this._elementRef.nativeElement.removeEventListener(
                    'keyup',
                    this._iOSKeyupListener
                  );
            }
            ngDoCheck() {
              this.ngControl &&
                (this.updateErrorState(),
                null !== this.ngControl.disabled &&
                  this.ngControl.disabled !== this.disabled &&
                  ((this.disabled = this.ngControl.disabled),
                  this.stateChanges.next())),
                this._dirtyCheckNativeValue(),
                this._dirtyCheckPlaceholder();
            }
            focus(e) {
              this._elementRef.nativeElement.focus(e);
            }
            _focusChanged(e) {
              e !== this.focused &&
                ((this.focused = e), this.stateChanges.next());
            }
            _onInput() {}
            _dirtyCheckNativeValue() {
              const e = this._elementRef.nativeElement.value;
              this._previousNativeValue !== e &&
                ((this._previousNativeValue = e), this.stateChanges.next());
            }
            _dirtyCheckPlaceholder() {
              const e = this._getPlaceholder();
              if (e !== this._previousPlaceholder) {
                const o = this._elementRef.nativeElement;
                (this._previousPlaceholder = e),
                  e
                    ? o.setAttribute('placeholder', e)
                    : o.removeAttribute('placeholder');
              }
            }
            _getPlaceholder() {
              return this.placeholder || null;
            }
            _validateType() {
              S0.indexOf(this._type);
            }
            _isNeverEmpty() {
              return this._neverEmptyInputTypes.indexOf(this._type) > -1;
            }
            _isBadInput() {
              let e = this._elementRef.nativeElement.validity;
              return e && e.badInput;
            }
            get empty() {
              return !(
                this._isNeverEmpty() ||
                this._elementRef.nativeElement.value ||
                this._isBadInput() ||
                this.autofilled
              );
            }
            get shouldLabelFloat() {
              if (this._isNativeSelect) {
                const e = this._elementRef.nativeElement,
                  o = e.options[0];
                return (
                  this.focused ||
                  e.multiple ||
                  !this.empty ||
                  !!(e.selectedIndex > -1 && o && o.label)
                );
              }
              return this.focused || !this.empty;
            }
            setDescribedByIds(e) {
              e.length
                ? this._elementRef.nativeElement.setAttribute(
                    'aria-describedby',
                    e.join(' ')
                  )
                : this._elementRef.nativeElement.removeAttribute(
                    'aria-describedby'
                  );
            }
            onContainerClick() {
              this.focused || this.focus();
            }
            _isInlineSelect() {
              const e = this._elementRef.nativeElement;
              return this._isNativeSelect && (e.multiple || e.size > 1);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(
                d.Y36(d.SBq),
                d.Y36(Kn),
                d.Y36(ti, 10),
                d.Y36(At, 8),
                d.Y36(da, 8),
                d.Y36(qm),
                d.Y36(M0, 10),
                d.Y36(E0),
                d.Y36(d.R0b),
                d.Y36(Mg, 8)
              );
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['input', 'matInput', ''],
                ['textarea', 'matInput', ''],
                ['select', 'matNativeControl', ''],
                ['input', 'matNativeControl', ''],
                ['textarea', 'matNativeControl', ''],
              ],
              hostAttrs: [1, 'mat-mdc-input-element'],
              hostVars: 18,
              hostBindings: function (e, o) {
                1 & e &&
                  d.NdJ('focus', function () {
                    return o._focusChanged(!0);
                  })('blur', function () {
                    return o._focusChanged(!1);
                  })('input', function () {
                    return o._onInput();
                  }),
                  2 & e &&
                    (d.Ikx('id', o.id)('disabled', o.disabled)(
                      'required',
                      o.required
                    ),
                    d.uIk('name', o.name || null)(
                      'readonly',
                      (o.readonly && !o._isNativeSelect) || null
                    )(
                      'aria-invalid',
                      o.empty && o.required ? null : o.errorState
                    )('aria-required', o.required)('id', o.id),
                    d.ekj('mat-input-server', o._isServer)(
                      'mat-mdc-form-field-textarea-control',
                      o._isInFormField && o._isTextarea
                    )('mat-mdc-form-field-input-control', o._isInFormField)(
                      'mdc-text-field__input',
                      o._isInFormField
                    )('mat-mdc-native-select-inline', o._isInlineSelect()));
              },
              inputs: {
                disabled: 'disabled',
                id: 'id',
                placeholder: 'placeholder',
                name: 'name',
                required: 'required',
                type: 'type',
                errorStateMatcher: 'errorStateMatcher',
                userAriaDescribedBy: [
                  'aria-describedby',
                  'userAriaDescribedBy',
                ],
                value: 'value',
                readonly: 'readonly',
              },
              exportAs: ['matInput'],
              features: [
                d._Bn([{ provide: Eg, useExisting: r }]),
                d.qOj,
                d.TTD,
              ],
            })),
            r
          );
        })(),
        Of = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [St, Ls, Ls, jc, St] })),
            r
          );
        })();
      var Pf = F(99);
      const Nf = ['*'];
      let ul;
      function Mo(r) {
        return (
          (function kf() {
            if (void 0 === ul && ((ul = null), typeof window < 'u')) {
              const r = window;
              void 0 !== r.trustedTypes &&
                (ul = r.trustedTypes.createPolicy('angular#components', {
                  createHTML: (t) => t,
                }));
            }
            return ul;
          })()?.createHTML(r) || r
        );
      }
      function Fg(r) {
        return Error(`Unable to find icon with the name "${r}"`);
      }
      function Rg(r) {
        return Error(
          `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${r}".`
        );
      }
      function Og(r) {
        return Error(
          `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${r}".`
        );
      }
      class Nr {
        constructor(t, e, o) {
          (this.url = t), (this.svgText = e), (this.options = o);
        }
      }
      let Bs = (() => {
        class r {
          constructor(e, o, l, f) {
            (this._httpClient = e),
              (this._sanitizer = o),
              (this._errorHandler = f),
              (this._svgIconConfigs = new Map()),
              (this._iconSetConfigs = new Map()),
              (this._cachedIconsByUrl = new Map()),
              (this._inProgressUrlFetches = new Map()),
              (this._fontCssClassesByAlias = new Map()),
              (this._resolvers = []),
              (this._defaultFontSetClass = [
                'material-icons',
                'mat-ligature-font',
              ]),
              (this._document = l);
          }
          addSvgIcon(e, o, l) {
            return this.addSvgIconInNamespace('', e, o, l);
          }
          addSvgIconLiteral(e, o, l) {
            return this.addSvgIconLiteralInNamespace('', e, o, l);
          }
          addSvgIconInNamespace(e, o, l, f) {
            return this._addSvgIconConfig(e, o, new Nr(l, null, f));
          }
          addSvgIconResolver(e) {
            return this._resolvers.push(e), this;
          }
          addSvgIconLiteralInNamespace(e, o, l, f) {
            const p = this._sanitizer.sanitize(d.q3G.HTML, l);
            if (!p) throw Og(l);
            const y = Mo(p);
            return this._addSvgIconConfig(e, o, new Nr('', y, f));
          }
          addSvgIconSet(e, o) {
            return this.addSvgIconSetInNamespace('', e, o);
          }
          addSvgIconSetLiteral(e, o) {
            return this.addSvgIconSetLiteralInNamespace('', e, o);
          }
          addSvgIconSetInNamespace(e, o, l) {
            return this._addSvgIconSetConfig(e, new Nr(o, null, l));
          }
          addSvgIconSetLiteralInNamespace(e, o, l) {
            const f = this._sanitizer.sanitize(d.q3G.HTML, o);
            if (!f) throw Og(o);
            const p = Mo(f);
            return this._addSvgIconSetConfig(e, new Nr('', p, l));
          }
          registerFontClassAlias(e, o = e) {
            return this._fontCssClassesByAlias.set(e, o), this;
          }
          classNameForFontAlias(e) {
            return this._fontCssClassesByAlias.get(e) || e;
          }
          setDefaultFontSetClass(...e) {
            return (this._defaultFontSetClass = e), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(e) {
            const o = this._sanitizer.sanitize(d.q3G.RESOURCE_URL, e);
            if (!o) throw Rg(e);
            const l = this._cachedIconsByUrl.get(o);
            return l
              ? Ce(fl(l))
              : this._loadSvgIconFromConfig(new Nr(e, null)).pipe(
                  Tt((f) => this._cachedIconsByUrl.set(o, f)),
                  (0, Pe.U)((f) => fl(f))
                );
          }
          getNamedSvgIcon(e, o = '') {
            const l = Lf(o, e);
            let f = this._svgIconConfigs.get(l);
            if (f) return this._getSvgFromConfig(f);
            if (((f = this._getIconConfigFromResolvers(o, e)), f))
              return this._svgIconConfigs.set(l, f), this._getSvgFromConfig(f);
            const p = this._iconSetConfigs.get(o);
            return p ? this._getSvgFromIconSetConfigs(e, p) : pa(Fg(l));
          }
          ngOnDestroy() {
            (this._resolvers = []),
              this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(e) {
            return e.svgText
              ? Ce(fl(this._svgElementFromConfig(e)))
              : this._loadSvgIconFromConfig(e).pipe((0, Pe.U)((o) => fl(o)));
          }
          _getSvgFromIconSetConfigs(e, o) {
            const l = this._extractIconWithNameFromAnySet(e, o);
            return l
              ? Ce(l)
              : zr(
                  o
                    .filter((p) => !p.svgText)
                    .map((p) =>
                      this._loadSvgIconSetFromConfig(p).pipe(
                        Un((y) => {
                          const S = `Loading icon set URL: ${this._sanitizer.sanitize(
                            d.q3G.RESOURCE_URL,
                            p.url
                          )} failed: ${y.message}`;
                          return (
                            this._errorHandler.handleError(new Error(S)),
                            Ce(null)
                          );
                        })
                      )
                    )
                ).pipe(
                  (0, Pe.U)(() => {
                    const p = this._extractIconWithNameFromAnySet(e, o);
                    if (!p) throw Fg(e);
                    return p;
                  })
                );
          }
          _extractIconWithNameFromAnySet(e, o) {
            for (let l = o.length - 1; l >= 0; l--) {
              const f = o[l];
              if (f.svgText && f.svgText.toString().indexOf(e) > -1) {
                const p = this._svgElementFromConfig(f),
                  y = this._extractSvgIconFromSet(p, e, f.options);
                if (y) return y;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(e) {
            return this._fetchIcon(e).pipe(
              Tt((o) => (e.svgText = o)),
              (0, Pe.U)(() => this._svgElementFromConfig(e))
            );
          }
          _loadSvgIconSetFromConfig(e) {
            return e.svgText
              ? Ce(null)
              : this._fetchIcon(e).pipe(Tt((o) => (e.svgText = o)));
          }
          _extractSvgIconFromSet(e, o, l) {
            const f = e.querySelector(`[id="${o}"]`);
            if (!f) return null;
            const p = f.cloneNode(!0);
            if ((p.removeAttribute('id'), 'svg' === p.nodeName.toLowerCase()))
              return this._setSvgAttributes(p, l);
            if ('symbol' === p.nodeName.toLowerCase())
              return this._setSvgAttributes(this._toSvgElement(p), l);
            const y = this._svgElementFromString(Mo('<svg></svg>'));
            return y.appendChild(p), this._setSvgAttributes(y, l);
          }
          _svgElementFromString(e) {
            const o = this._document.createElement('DIV');
            o.innerHTML = e;
            const l = o.querySelector('svg');
            if (!l) throw Error('<svg> tag not found');
            return l;
          }
          _toSvgElement(e) {
            const o = this._svgElementFromString(Mo('<svg></svg>')),
              l = e.attributes;
            for (let f = 0; f < l.length; f++) {
              const { name: p, value: y } = l[f];
              'id' !== p && o.setAttribute(p, y);
            }
            for (let f = 0; f < e.childNodes.length; f++)
              e.childNodes[f].nodeType === this._document.ELEMENT_NODE &&
                o.appendChild(e.childNodes[f].cloneNode(!0));
            return o;
          }
          _setSvgAttributes(e, o) {
            return (
              e.setAttribute('fit', ''),
              e.setAttribute('height', '100%'),
              e.setAttribute('width', '100%'),
              e.setAttribute('preserveAspectRatio', 'xMidYMid meet'),
              e.setAttribute('focusable', 'false'),
              o && o.viewBox && e.setAttribute('viewBox', o.viewBox),
              e
            );
          }
          _fetchIcon(e) {
            const { url: o, options: l } = e,
              f = l?.withCredentials ?? !1;
            if (!this._httpClient)
              throw (function A0() {
                return Error(
                  'Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.'
                );
              })();
            if (null == o) throw Error(`Cannot fetch icon from URL "${o}".`);
            const p = this._sanitizer.sanitize(d.q3G.RESOURCE_URL, o);
            if (!p) throw Rg(o);
            const y = this._inProgressUrlFetches.get(p);
            if (y) return y;
            const D = this._httpClient
              .get(p, { responseType: 'text', withCredentials: f })
              .pipe(
                (0, Pe.U)((S) => Mo(S)),
                ji(() => this._inProgressUrlFetches.delete(p)),
                (0, Pf.B)()
              );
            return this._inProgressUrlFetches.set(p, D), D;
          }
          _addSvgIconConfig(e, o, l) {
            return this._svgIconConfigs.set(Lf(e, o), l), this;
          }
          _addSvgIconSetConfig(e, o) {
            const l = this._iconSetConfigs.get(e);
            return l ? l.push(o) : this._iconSetConfigs.set(e, [o]), this;
          }
          _svgElementFromConfig(e) {
            if (!e.svgElement) {
              const o = this._svgElementFromString(e.svgText);
              this._setSvgAttributes(o, e.options), (e.svgElement = o);
            }
            return e.svgElement;
          }
          _getIconConfigFromResolvers(e, o) {
            for (let l = 0; l < this._resolvers.length; l++) {
              const f = this._resolvers[l](o, e);
              if (f)
                return I0(f) ? new Nr(f.url, null, f.options) : new Nr(f, null);
            }
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(
              d.LFG(Ou, 8),
              d.LFG(Sl),
              d.LFG(E.K0, 8),
              d.LFG(d.qLn)
            );
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac, providedIn: 'root' })),
          r
        );
      })();
      function fl(r) {
        return r.cloneNode(!0);
      }
      function Lf(r, t) {
        return r + ':' + t;
      }
      function I0(r) {
        return !(!r.url || !r.options);
      }
      const Ng = Me(
          class {
            constructor(r) {
              this._elementRef = r;
            }
          }
        ),
        kg = new d.OlP('MAT_ICON_DEFAULT_OPTIONS'),
        F0 = new d.OlP('mat-icon-location', {
          providedIn: 'root',
          factory: function Lg() {
            const r = (0, d.f3M)(E.K0),
              t = r ? r.location : null;
            return { getPathname: () => (t ? t.pathname + t.search : '') };
          },
        }),
        Vf = [
          'clip-path',
          'color-profile',
          'src',
          'cursor',
          'fill',
          'filter',
          'marker',
          'marker-start',
          'marker-mid',
          'marker-end',
          'mask',
          'stroke',
        ],
        bn = Vf.map((r) => `[${r}]`).join(', '),
        Hs = /^url\(['"]?#(.*?)['"]?\)$/;
      let Bf = (() => {
          class r extends Ng {
            get inline() {
              return this._inline;
            }
            set inline(e) {
              this._inline = li(e);
            }
            get svgIcon() {
              return this._svgIcon;
            }
            set svgIcon(e) {
              e !== this._svgIcon &&
                (e
                  ? this._updateSvgIcon(e)
                  : this._svgIcon && this._clearSvgElement(),
                (this._svgIcon = e));
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(e) {
              const o = this._cleanupFontValue(e);
              o !== this._fontSet &&
                ((this._fontSet = o), this._updateFontIconClasses());
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(e) {
              const o = this._cleanupFontValue(e);
              o !== this._fontIcon &&
                ((this._fontIcon = o), this._updateFontIconClasses());
            }
            constructor(e, o, l, f, p, y) {
              super(e),
                (this._iconRegistry = o),
                (this._location = f),
                (this._errorHandler = p),
                (this._inline = !1),
                (this._previousFontSetClass = []),
                (this._currentIconFetch = Vd.w0.EMPTY),
                y &&
                  (y.color && (this.color = this.defaultColor = y.color),
                  y.fontSet && (this.fontSet = y.fontSet)),
                l || e.nativeElement.setAttribute('aria-hidden', 'true');
            }
            _splitIconName(e) {
              if (!e) return ['', ''];
              const o = e.split(':');
              switch (o.length) {
                case 1:
                  return ['', o[0]];
                case 2:
                  return o;
                default:
                  throw Error(`Invalid icon name: "${e}"`);
              }
            }
            ngOnInit() {
              this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const e = this._elementsWithExternalReferences;
              if (e && e.size) {
                const o = this._location.getPathname();
                o !== this._previousPath &&
                  ((this._previousPath = o), this._prependPathToReferences(o));
              }
            }
            ngOnDestroy() {
              this._currentIconFetch.unsubscribe(),
                this._elementsWithExternalReferences &&
                  this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
              return !this.svgIcon;
            }
            _setSvgElement(e) {
              this._clearSvgElement();
              const o = this._location.getPathname();
              (this._previousPath = o),
                this._cacheChildrenWithExternalReferences(e),
                this._prependPathToReferences(o),
                this._elementRef.nativeElement.appendChild(e);
            }
            _clearSvgElement() {
              const e = this._elementRef.nativeElement;
              let o = e.childNodes.length;
              for (
                this._elementsWithExternalReferences &&
                this._elementsWithExternalReferences.clear();
                o--;

              ) {
                const l = e.childNodes[o];
                (1 !== l.nodeType || 'svg' === l.nodeName.toLowerCase()) &&
                  l.remove();
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const e = this._elementRef.nativeElement,
                o = (
                  this.fontSet
                    ? this._iconRegistry
                        .classNameForFontAlias(this.fontSet)
                        .split(/ +/)
                    : this._iconRegistry.getDefaultFontSetClass()
                ).filter((l) => l.length > 0);
              this._previousFontSetClass.forEach((l) => e.classList.remove(l)),
                o.forEach((l) => e.classList.add(l)),
                (this._previousFontSetClass = o),
                this.fontIcon !== this._previousFontIconClass &&
                  !o.includes('mat-ligature-font') &&
                  (this._previousFontIconClass &&
                    e.classList.remove(this._previousFontIconClass),
                  this.fontIcon && e.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(e) {
              return 'string' == typeof e ? e.trim().split(' ')[0] : e;
            }
            _prependPathToReferences(e) {
              const o = this._elementsWithExternalReferences;
              o &&
                o.forEach((l, f) => {
                  l.forEach((p) => {
                    f.setAttribute(p.name, `url('${e}#${p.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(e) {
              const o = e.querySelectorAll(bn),
                l = (this._elementsWithExternalReferences =
                  this._elementsWithExternalReferences || new Map());
              for (let f = 0; f < o.length; f++)
                Vf.forEach((p) => {
                  const y = o[f],
                    D = y.getAttribute(p),
                    S = D ? D.match(Hs) : null;
                  if (S) {
                    let R = l.get(y);
                    R || ((R = []), l.set(y, R)),
                      R.push({ name: p, value: S[1] });
                  }
                });
            }
            _updateSvgIcon(e) {
              if (
                ((this._svgNamespace = null),
                (this._svgName = null),
                this._currentIconFetch.unsubscribe(),
                e)
              ) {
                const [o, l] = this._splitIconName(e);
                o && (this._svgNamespace = o),
                  l && (this._svgName = l),
                  (this._currentIconFetch = this._iconRegistry
                    .getNamedSvgIcon(l, o)
                    .pipe(es(1))
                    .subscribe(
                      (f) => this._setSvgElement(f),
                      (f) => {
                        this._errorHandler.handleError(
                          new Error(
                            `Error retrieving icon ${o}:${l}! ${f.message}`
                          )
                        );
                      }
                    ));
              }
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(
                d.Y36(d.SBq),
                d.Y36(Bs),
                d.$8M('aria-hidden'),
                d.Y36(F0),
                d.Y36(d.qLn),
                d.Y36(kg, 8)
              );
            }),
            (r.??cmp = d.Xpm({
              type: r,
              selectors: [['mat-icon']],
              hostAttrs: ['role', 'img', 1, 'mat-icon', 'notranslate'],
              hostVars: 8,
              hostBindings: function (e, o) {
                2 & e &&
                  (d.uIk(
                    'data-mat-icon-type',
                    o._usingFontIcon() ? 'font' : 'svg'
                  )('data-mat-icon-name', o._svgName || o.fontIcon)(
                    'data-mat-icon-namespace',
                    o._svgNamespace || o.fontSet
                  )('fontIcon', o._usingFontIcon() ? o.fontIcon : null),
                  d.ekj('mat-icon-inline', o.inline)(
                    'mat-icon-no-color',
                    'primary' !== o.color &&
                      'accent' !== o.color &&
                      'warn' !== o.color
                  ));
              },
              inputs: {
                color: 'color',
                inline: 'inline',
                svgIcon: 'svgIcon',
                fontSet: 'fontSet',
                fontIcon: 'fontIcon',
              },
              exportAs: ['matIcon'],
              features: [d.qOj],
              ngContentSelectors: Nf,
              decls: 1,
              vars: 0,
              template: function (e, o) {
                1 & e && (d.F$t(), d.Hsn(0));
              },
              styles: [
                '.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            r
          );
        })(),
        Vg = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [St, St] })),
            r
          );
        })();
      const R0 = ['*'];
      class hl {
        constructor() {
          (this.columnIndex = 0), (this.rowIndex = 0);
        }
        get rowCount() {
          return this.rowIndex + 1;
        }
        get rowspan() {
          const t = Math.max(...this.tracker);
          return t > 1 ? this.rowCount + t - 1 : this.rowCount;
        }
        update(t, e) {
          (this.columnIndex = 0),
            (this.rowIndex = 0),
            (this.tracker = new Array(t)),
            this.tracker.fill(0, 0, this.tracker.length),
            (this.positions = e.map((o) => this._trackTile(o)));
        }
        _trackTile(t) {
          const e = this._findMatchingGap(t.colspan);
          return (
            this._markTilePosition(e, t),
            (this.columnIndex = e + t.colspan),
            new P0(this.rowIndex, e)
          );
        }
        _findMatchingGap(t) {
          let e = -1,
            o = -1;
          do {
            this.columnIndex + t > this.tracker.length
              ? (this._nextRow(),
                (e = this.tracker.indexOf(0, this.columnIndex)),
                (o = this._findGapEndIndex(e)))
              : ((e = this.tracker.indexOf(0, this.columnIndex)),
                -1 != e
                  ? ((o = this._findGapEndIndex(e)), (this.columnIndex = e + 1))
                  : (this._nextRow(),
                    (e = this.tracker.indexOf(0, this.columnIndex)),
                    (o = this._findGapEndIndex(e))));
          } while (o - e < t || 0 == o);
          return Math.max(e, 0);
        }
        _nextRow() {
          (this.columnIndex = 0), this.rowIndex++;
          for (let t = 0; t < this.tracker.length; t++)
            this.tracker[t] = Math.max(0, this.tracker[t] - 1);
        }
        _findGapEndIndex(t) {
          for (let e = t + 1; e < this.tracker.length; e++)
            if (0 != this.tracker[e]) return e;
          return this.tracker.length;
        }
        _markTilePosition(t, e) {
          for (let o = 0; o < e.colspan; o++) this.tracker[t + o] = e.rowspan;
        }
      }
      class P0 {
        constructor(t, e) {
          (this.row = t), (this.col = e);
        }
      }
      const zc = new d.OlP('MAT_GRID_LIST');
      let Hf = (() => {
        class r {
          constructor(e, o) {
            (this._element = e),
              (this._gridList = o),
              (this._rowspan = 1),
              (this._colspan = 1);
          }
          get rowspan() {
            return this._rowspan;
          }
          set rowspan(e) {
            this._rowspan = Math.round(Is(e));
          }
          get colspan() {
            return this._colspan;
          }
          set colspan(e) {
            this._colspan = Math.round(Is(e));
          }
          _setStyle(e, o) {
            this._element.nativeElement.style[e] = o;
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.Y36(d.SBq), d.Y36(zc, 8));
          }),
          (r.??cmp = d.Xpm({
            type: r,
            selectors: [['mat-grid-tile']],
            hostAttrs: [1, 'mat-grid-tile'],
            hostVars: 2,
            hostBindings: function (e, o) {
              2 & e && d.uIk('rowspan', o.rowspan)('colspan', o.colspan);
            },
            inputs: { rowspan: 'rowspan', colspan: 'colspan' },
            exportAs: ['matGridTile'],
            ngContentSelectors: R0,
            decls: 2,
            vars: 0,
            consts: [[1, 'mat-grid-tile-content']],
            template: function (e, o) {
              1 & e && (d.F$t(), d.TgZ(0, 'div', 0), d.Hsn(1), d.qZA());
            },
            styles: [
              '.mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}',
            ],
            encapsulation: 2,
            changeDetection: 0,
          })),
          r
        );
      })();
      const Uf = /^-?\d+((\.\d+)?[A-Za-z%$]?)+$/;
      class Gc {
        constructor() {
          (this._rows = 0), (this._rowspan = 0);
        }
        init(t, e, o, l) {
          (this._gutterSize = $f(t)),
            (this._rows = e.rowCount),
            (this._rowspan = e.rowspan),
            (this._cols = o),
            (this._direction = l);
        }
        getBaseTileSize(t, e) {
          return `(${t}% - (${this._gutterSize} * ${e}))`;
        }
        getTilePosition(t, e) {
          return 0 === e ? '0' : Us(`(${t} + ${this._gutterSize}) * ${e}`);
        }
        getTileSize(t, e) {
          return `(${t} * ${e}) + (${e - 1} * ${this._gutterSize})`;
        }
        setStyle(t, e, o) {
          let l = 100 / this._cols,
            f = (this._cols - 1) / this._cols;
          this.setColStyles(t, o, l, f), this.setRowStyles(t, e, l, f);
        }
        setColStyles(t, e, o, l) {
          let f = this.getBaseTileSize(o, l);
          t._setStyle(
            'rtl' === this._direction ? 'right' : 'left',
            this.getTilePosition(f, e)
          ),
            t._setStyle('width', Us(this.getTileSize(f, t.colspan)));
        }
        getGutterSpan() {
          return `${this._gutterSize} * (${this._rowspan} - 1)`;
        }
        getTileSpan(t) {
          return `${this._rowspan} * ${this.getTileSize(t, 1)}`;
        }
        getComputedHeight() {
          return null;
        }
      }
      class Hg extends Gc {
        constructor(t) {
          super(), (this.fixedRowHeight = t);
        }
        init(t, e, o, l) {
          super.init(t, e, o, l),
            (this.fixedRowHeight = $f(this.fixedRowHeight)),
            Uf.test(this.fixedRowHeight);
        }
        setRowStyles(t, e) {
          t._setStyle('top', this.getTilePosition(this.fixedRowHeight, e)),
            t._setStyle(
              'height',
              Us(this.getTileSize(this.fixedRowHeight, t.rowspan))
            );
        }
        getComputedHeight() {
          return [
            'height',
            Us(
              `${this.getTileSpan(
                this.fixedRowHeight
              )} + ${this.getGutterSpan()}`
            ),
          ];
        }
        reset(t) {
          t._setListStyle(['height', null]),
            t._tiles &&
              t._tiles.forEach((e) => {
                e._setStyle('top', null), e._setStyle('height', null);
              });
        }
      }
      class qc extends Gc {
        constructor(t) {
          super(), this._parseRatio(t);
        }
        setRowStyles(t, e, o, l) {
          (this.baseTileHeight = this.getBaseTileSize(
            o / this.rowHeightRatio,
            l
          )),
            t._setStyle(
              'marginTop',
              this.getTilePosition(this.baseTileHeight, e)
            ),
            t._setStyle(
              'paddingTop',
              Us(this.getTileSize(this.baseTileHeight, t.rowspan))
            );
        }
        getComputedHeight() {
          return [
            'paddingBottom',
            Us(
              `${this.getTileSpan(
                this.baseTileHeight
              )} + ${this.getGutterSpan()}`
            ),
          ];
        }
        reset(t) {
          t._setListStyle(['paddingBottom', null]),
            t._tiles.forEach((e) => {
              e._setStyle('marginTop', null), e._setStyle('paddingTop', null);
            });
        }
        _parseRatio(t) {
          const e = t.split(':');
          this.rowHeightRatio = parseFloat(e[0]) / parseFloat(e[1]);
        }
      }
      class jf extends Gc {
        setRowStyles(t, e) {
          let f = this.getBaseTileSize(
            100 / this._rowspan,
            (this._rows - 1) / this._rows
          );
          t._setStyle('top', this.getTilePosition(f, e)),
            t._setStyle('height', Us(this.getTileSize(f, t.rowspan)));
        }
        reset(t) {
          t._tiles &&
            t._tiles.forEach((e) => {
              e._setStyle('top', null), e._setStyle('height', null);
            });
        }
      }
      function Us(r) {
        return `calc(${r})`;
      }
      function $f(r) {
        return r.match(/([A-Za-z%]+)$/) ? r : `${r}px`;
      }
      let zf = (() => {
          class r {
            constructor(e, o) {
              (this._element = e), (this._dir = o), (this._gutter = '1px');
            }
            get cols() {
              return this._cols;
            }
            set cols(e) {
              this._cols = Math.max(1, Math.round(Is(e)));
            }
            get gutterSize() {
              return this._gutter;
            }
            set gutterSize(e) {
              this._gutter = `${e ?? ''}`;
            }
            get rowHeight() {
              return this._rowHeight;
            }
            set rowHeight(e) {
              const o = `${e ?? ''}`;
              o !== this._rowHeight &&
                ((this._rowHeight = o), this._setTileStyler(this._rowHeight));
            }
            ngOnInit() {
              this._checkCols(), this._checkRowHeight();
            }
            ngAfterContentChecked() {
              this._layoutTiles();
            }
            _checkCols() {}
            _checkRowHeight() {
              this._rowHeight || this._setTileStyler('1:1');
            }
            _setTileStyler(e) {
              this._tileStyler && this._tileStyler.reset(this),
                (this._tileStyler =
                  'fit' === e
                    ? new jf()
                    : e && e.indexOf(':') > -1
                    ? new qc(e)
                    : new Hg(e));
            }
            _layoutTiles() {
              this._tileCoordinator || (this._tileCoordinator = new hl());
              const e = this._tileCoordinator,
                o = this._tiles.filter(
                  (f) => !f._gridList || f._gridList === this
                ),
                l = this._dir ? this._dir.value : 'ltr';
              this._tileCoordinator.update(this.cols, o),
                this._tileStyler.init(this.gutterSize, e, this.cols, l),
                o.forEach((f, p) => {
                  const y = e.positions[p];
                  this._tileStyler.setStyle(f, y.row, y.col);
                }),
                this._setListStyle(this._tileStyler.getComputedHeight());
            }
            _setListStyle(e) {
              e && (this._element.nativeElement.style[e[0]] = e[1]);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.Y36(d.SBq), d.Y36(gf, 8));
            }),
            (r.??cmp = d.Xpm({
              type: r,
              selectors: [['mat-grid-list']],
              contentQueries: function (e, o, l) {
                if ((1 & e && d.Suo(l, Hf, 5), 2 & e)) {
                  let f;
                  d.iGM((f = d.CRH())) && (o._tiles = f);
                }
              },
              hostAttrs: [1, 'mat-grid-list'],
              hostVars: 1,
              hostBindings: function (e, o) {
                2 & e && d.uIk('cols', o.cols);
              },
              inputs: {
                cols: 'cols',
                gutterSize: 'gutterSize',
                rowHeight: 'rowHeight',
              },
              exportAs: ['matGridList'],
              features: [d._Bn([{ provide: zc, useExisting: r }])],
              ngContentSelectors: R0,
              decls: 2,
              vars: 0,
              template: function (e, o) {
                1 & e && (d.F$t(), d.TgZ(0, 'div'), d.Hsn(1), d.qZA());
              },
              styles: [
                '.mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            r
          );
        })(),
        So = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [Os, St, Os, St] })),
            r
          );
        })();
      class kr {
        constructor() {
          this.count = 0;
        }
        validate(t) {
          const e = t.value || void 0;
          return e?.includes('@') && e?.includes('.com')
            ? null
            : { invalidEmail: !0 };
        }
      }
      function Gf(r, t) {
        1 & r &&
          (d.TgZ(0, 'mat-hint', 11),
          d._uU(1, 'Please enter a valid username '),
          d.qZA());
      }
      (kr.??fac = function (t) {
        return new (t || kr)();
      }),
        (kr.??dir = d.lG2({
          type: kr,
          selectors: [['', 'appEmailValidation', '']],
          features: [d._Bn([{ provide: vt, useExisting: kr, multi: !0 }])],
        }));
      class Wc {
        constructor(t, e) {
          (this.login = t),
            (this.route = e),
            (this.hide = !0),
            (this.username = ''),
            (this.password = '');
        }
        ngOnInit() {
          this.login.getLoginDetails$.subscribe((t) => {
            this.loginDetails = t;
          });
        }
        hideBtn(t) {
          t.preventDefault();
        }
        loginMessage(t) {
          this.loginDetails.forEach((e) => {
            e.username === this.username && e.password === this.password
              ? this.route.navigateByUrl('')
              : alert('login Failed');
          }),
            t.resetForm();
        }
      }
      function L0(r, t) {
        1 & r &&
          (d.TgZ(0, 'mat-hint', 20),
          d._uU(1, 'Please enter a valid email '),
          d.qZA());
      }
      (Wc.??fac = function (t) {
        return new (t || Wc)(d.Y36(Yi), d.Y36(Yt));
      }),
        (Wc.??cmp = d.Xpm({
          type: Wc,
          selectors: [['app-login']],
          decls: 21,
          vars: 8,
          consts: [
            [1, 'form-container', 3, 'ngSubmit'],
            ['loginForm', 'ngForm'],
            ['cols', '1', 'rowHeight', '100vh'],
            [1, 'example-container'],
            ['appearance', 'fill', 1, 'width-100'],
            [
              'appEmailValidation',
              '',
              'required',
              '',
              'name',
              'username',
              'matInput',
              '',
              'placeholder',
              'Enter your username',
              3,
              'ngModel',
              'ngModelChange',
            ],
            ['user', 'ngModel'],
            ['class', 'hint', 'align', 'start', 4, 'ngIf'],
            [
              'required',
              '',
              'name',
              'password',
              'matInput',
              '',
              3,
              'ngModel',
              'type',
              'ngModelChange',
            ],
            ['mat-icon-button', '', 'matSuffix', '', 3, 'click'],
            ['mat-raised-button', '', 'color', 'primary', 3, 'disabled'],
            ['align', 'start', 1, 'hint'],
          ],
          template: function (t, e) {
            if (1 & t) {
              const o = d.EpF();
              d.TgZ(0, 'form', 0, 1),
                d.NdJ('ngSubmit', function () {
                  d.CHM(o);
                  const f = d.MAs(1);
                  return d.KtG(e.loginMessage(f));
                }),
                d.TgZ(2, 'mat-grid-list', 2)(3, 'mat-grid-tile')(4, 'div', 3)(
                  5,
                  'mat-form-field',
                  4
                )(6, 'mat-label'),
                d._uU(7, 'Username'),
                d.qZA(),
                d.TgZ(8, 'input', 5, 6),
                d.NdJ('ngModelChange', function (f) {
                  return (e.username = f);
                }),
                d.qZA(),
                d.YNc(10, Gf, 2, 0, 'mat-hint', 7),
                d.qZA(),
                d._UZ(11, 'br'),
                d.TgZ(12, 'mat-form-field', 4)(13, 'mat-label'),
                d._uU(14, 'Enter password'),
                d.qZA(),
                d.TgZ(15, 'input', 8),
                d.NdJ('ngModelChange', function (f) {
                  return (e.password = f);
                }),
                d.qZA(),
                d.TgZ(16, 'button', 9),
                d.NdJ('click', function (f) {
                  return (e.hide = !e.hide), e.hideBtn(f);
                }),
                d.TgZ(17, 'mat-icon'),
                d._uU(18),
                d.qZA()()(),
                d.TgZ(19, 'button', 10),
                d._uU(20, ' Submit '),
                d.qZA()()()()();
            }
            if (2 & t) {
              const o = d.MAs(1),
                l = d.MAs(9);
              d.xp6(8),
                d.Q6J('ngModel', e.username),
                d.xp6(2),
                d.Q6J(
                  'ngIf',
                  o.dirty && (null == l.errors ? null : l.errors.invalidEmail)
                ),
                d.xp6(5),
                d.Q6J('ngModel', e.password)(
                  'type',
                  e.hide ? 'password' : 'text'
                ),
                d.xp6(1),
                d.uIk('aria-label', 'Hide password')('aria-pressed', e.hide),
                d.xp6(2),
                d.Oqu(e.hide ? 'visibility_off' : 'visibility'),
                d.xp6(1),
                d.Q6J('disabled', o.invalid);
            }
          },
          dependencies: [
            E.O5,
            ll,
            ng,
            Ag,
            Bc,
            Hc,
            Dg,
            $c,
            Bf,
            zf,
            Hf,
            la,
            mt,
            ta,
            Fl,
            mr,
            oo,
            At,
            kr,
          ],
          styles: [
            '.hint[_ngcontent-%COMP%]{color:#f44336}.ml-1[_ngcontent-%COMP%]{margin-left:1%}.ml-2[_ngcontent-%COMP%]{margin-left:2%}.width-100[_ngcontent-%COMP%]{width:100%}.example-radio-button[_ngcontent-%COMP%]{margin-left:7px}.example-container[_ngcontent-%COMP%]{border:1px solid #c2185b;border-radius:7px;padding:40px;box-shadow:#00000059 0 5px 15px}',
          ],
        }));
      class Yc {
        constructor(t) {
          (this.register = t),
            (this.hide = !0),
            (this.ad = {
              firstName: '',
              lastName: '',
              city: '',
              age: void 0,
              username: '',
              password: '',
            });
        }
        ngAfterViewInit() {}
        ngOnInit() {}
        postData(t) {
          console.log(this.ad),
            this.register.postRegister(this.ad).subscribe((e) => {
              t.reset();
            });
        }
        hideBtn(t) {
          t.preventDefault();
        }
      }
      (Yc.??fac = function (t) {
        return new (t || Yc)(d.Y36(Yi));
      }),
        (Yc.??cmp = d.Xpm({
          type: Yc,
          selectors: [['app-register']],
          decls: 46,
          vars: 14,
          consts: [
            [1, 'form-container', 3, 'ngSubmit'],
            ['registerForm', 'ngForm'],
            ['cols', '1', 'rowHeight', '100vh'],
            [1, 'example-container'],
            [
              'hintLabel',
              'Max 20 characters',
              'appearance',
              'fill',
              1,
              'width-50',
            ],
            [
              'minlength',
              '3',
              'maxlength',
              '20',
              'required',
              '',
              'type',
              'text',
              'name',
              'firstName',
              'matInput',
              '',
              'placeholder',
              'Enter Your Firstname',
              3,
              'ngModel',
              'ngModelChange',
            ],
            ['fname', ''],
            ['align', 'end'],
            [
              'hintLabel',
              'Max 20 characters',
              'appearance',
              'fill',
              1,
              'width-50',
              'ml-2',
            ],
            [
              'minlength',
              '3',
              'maxlength',
              '20',
              'required',
              '',
              'name',
              'lastName',
              'type',
              'text',
              'matInput',
              '',
              'placeholder',
              'Enter your Lastname',
              3,
              'ngModel',
              'ngModelChange',
            ],
            ['lname', ''],
            ['appearance', 'fill', 1, 'width-100'],
            [
              'minlength',
              '3',
              'maxlength',
              '20',
              'required',
              '',
              'name',
              'city',
              'type',
              'text',
              'matInput',
              '',
              'placeholder',
              'Enter your City',
              3,
              'ngModel',
              'ngModelChange',
            ],
            [
              'min',
              '1',
              'max',
              '100',
              'required',
              '',
              'name',
              'age',
              'type',
              'number',
              'matInput',
              '',
              'placeholder',
              'Age',
              3,
              'ngModel',
              'ngModelChange',
            ],
            [
              'appEmailValidation',
              '',
              'required',
              '',
              'name',
              'username',
              'matInput',
              '',
              'placeholder',
              'Enter your username',
              3,
              'ngModel',
              'ngModelChange',
            ],
            ['user', 'ngModel'],
            ['class', 'hint', 'align', 'start', 4, 'ngIf'],
            [
              'required',
              '',
              'name',
              'password',
              'matInput',
              '',
              3,
              'ngModel',
              'type',
              'ngModelChange',
            ],
            ['mat-icon-button', '', 'matSuffix', '', 3, 'click'],
            ['mat-raised-button', '', 'color', 'primary', 3, 'disabled'],
            ['align', 'start', 1, 'hint'],
          ],
          template: function (t, e) {
            if (1 & t) {
              const o = d.EpF();
              d.TgZ(0, 'form', 0, 1),
                d.NdJ('ngSubmit', function () {
                  d.CHM(o);
                  const f = d.MAs(1);
                  return d.KtG(e.postData(f));
                }),
                d.TgZ(2, 'mat-grid-list', 2)(3, 'mat-grid-tile')(4, 'div', 3)(
                  5,
                  'mat-form-field',
                  4
                )(6, 'mat-label'),
                d._uU(7, 'First Name'),
                d.qZA(),
                d.TgZ(8, 'input', 5, 6),
                d.NdJ('ngModelChange', function (f) {
                  return (e.ad.firstName = f);
                }),
                d.qZA(),
                d.TgZ(10, 'mat-hint', 7),
                d._uU(11),
                d.qZA()(),
                d.TgZ(12, 'mat-form-field', 8)(13, 'mat-label'),
                d._uU(14, 'Last name'),
                d.qZA(),
                d.TgZ(15, 'input', 9, 10),
                d.NdJ('ngModelChange', function (f) {
                  return (e.ad.lastName = f);
                }),
                d.qZA(),
                d.TgZ(17, 'mat-hint', 7),
                d._uU(18),
                d.qZA()(),
                d._UZ(19, 'br'),
                d.TgZ(20, 'mat-form-field', 11)(21, 'mat-label'),
                d._uU(22, 'City'),
                d.qZA(),
                d.TgZ(23, 'input', 12),
                d.NdJ('ngModelChange', function (f) {
                  return (e.ad.city = f);
                }),
                d.qZA()(),
                d._UZ(24, 'br'),
                d.TgZ(25, 'mat-form-field', 11)(26, 'mat-label'),
                d._uU(27, 'Age'),
                d.qZA(),
                d.TgZ(28, 'input', 13),
                d.NdJ('ngModelChange', function (f) {
                  return (e.ad.age = f);
                }),
                d.qZA()(),
                d._UZ(29, 'br'),
                d.TgZ(30, 'mat-form-field', 11)(31, 'mat-label'),
                d._uU(32, 'Username'),
                d.qZA(),
                d.TgZ(33, 'input', 14, 15),
                d.NdJ('ngModelChange', function (f) {
                  return (e.ad.username = f);
                }),
                d.qZA(),
                d.YNc(35, L0, 2, 0, 'mat-hint', 16),
                d.qZA(),
                d._UZ(36, 'br'),
                d.TgZ(37, 'mat-form-field', 11)(38, 'mat-label'),
                d._uU(39, 'Enter password'),
                d.qZA(),
                d.TgZ(40, 'input', 17),
                d.NdJ('ngModelChange', function (f) {
                  return (e.ad.password = f);
                }),
                d.qZA(),
                d.TgZ(41, 'button', 18),
                d.NdJ('click', function (f) {
                  return (e.hide = !e.hide), e.hideBtn(f);
                }),
                d.TgZ(42, 'mat-icon'),
                d._uU(43),
                d.qZA()()(),
                d.TgZ(44, 'button', 19),
                d._uU(45, ' Submit '),
                d.qZA()()()()();
            }
            if (2 & t) {
              const o = d.MAs(1),
                l = d.MAs(9),
                f = d.MAs(16),
                p = d.MAs(34);
              d.xp6(8),
                d.Q6J('ngModel', e.ad.firstName),
                d.xp6(3),
                d.hij('', l.value.length, '/20'),
                d.xp6(4),
                d.Q6J('ngModel', e.ad.lastName),
                d.xp6(3),
                d.hij('', f.value.length, '/20'),
                d.xp6(5),
                d.Q6J('ngModel', e.ad.city),
                d.xp6(5),
                d.Q6J('ngModel', e.ad.age),
                d.xp6(5),
                d.Q6J('ngModel', e.ad.username),
                d.xp6(2),
                d.Q6J(
                  'ngIf',
                  o.dirty && (null == p.errors ? null : p.errors.invalidEmail)
                ),
                d.xp6(5),
                d.Q6J('ngModel', e.ad.password)(
                  'type',
                  e.hide ? 'password' : 'text'
                ),
                d.xp6(1),
                d.uIk('aria-label', 'Hide password')('aria-pressed', e.hide),
                d.xp6(2),
                d.Oqu(e.hide ? 'visibility_off' : 'visibility'),
                d.xp6(1),
                d.Q6J('disabled', o.invalid);
            }
          },
          dependencies: [
            E.O5,
            ll,
            ng,
            Ag,
            Bc,
            Hc,
            Dg,
            $c,
            Bf,
            zf,
            Hf,
            la,
            mt,
            ca,
            ta,
            Fl,
            mr,
            Yn,
            Zo,
            Yo,
            Hi,
            oo,
            At,
            kr,
          ],
          styles: [
            '.example-radio-button[_ngcontent-%COMP%]{margin-left:7px}.example-container[_ngcontent-%COMP%]{border:1px solid #c2185b;border-radius:7px;padding:40px;box-shadow:#00000059 0 5px 15px}.width-50[_ngcontent-%COMP%]{width:49%}.ml-1[_ngcontent-%COMP%]{margin-left:1%}.ml-2[_ngcontent-%COMP%]{margin-left:2%}.width-100[_ngcontent-%COMP%]{width:100%}.width-25[_ngcontent-%COMP%]{width:25%}.hint[_ngcontent-%COMP%]{color:#f44336}',
          ],
        }));
      const V0 = ['*'],
        Ug = [
          [
            ['', 'mat-card-avatar', ''],
            ['', 'matCardAvatar', ''],
          ],
          [
            ['mat-card-title'],
            ['mat-card-subtitle'],
            ['', 'mat-card-title', ''],
            ['', 'mat-card-subtitle', ''],
            ['', 'matCardTitle', ''],
            ['', 'matCardSubtitle', ''],
          ],
          '*',
        ],
        jg = [
          '[mat-card-avatar], [matCardAvatar]',
          'mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]',
          '*',
        ],
        U0 = new d.OlP('MAT_CARD_CONFIG');
      let qf = (() => {
          class r {
            constructor(e) {
              this.appearance = e?.appearance || 'raised';
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.Y36(U0, 8));
            }),
            (r.??cmp = d.Xpm({
              type: r,
              selectors: [['mat-card']],
              hostAttrs: [1, 'mat-mdc-card', 'mdc-card'],
              hostVars: 4,
              hostBindings: function (e, o) {
                2 & e &&
                  d.ekj('mat-mdc-card-outlined', 'outlined' === o.appearance)(
                    'mdc-card--outlined',
                    'outlined' === o.appearance
                  );
              },
              inputs: { appearance: 'appearance' },
              exportAs: ['matCard'],
              ngContentSelectors: V0,
              decls: 1,
              vars: 0,
              template: function (e, o) {
                1 & e && (d.F$t(), d.Hsn(0));
              },
              styles: [
                '.mdc-card{display:flex;flex-direction:column;box-sizing:border-box}.mdc-card::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none;pointer-events:none}@media screen and (forced-colors: active){.mdc-card::after{border-color:CanvasText}}.mdc-card--outlined::after{border:none}.mdc-card__content{border-radius:inherit;height:100%}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.mat-mdc-card{position:relative;border-radius:var(--mdc-elevated-card-container-shape, var(--mdc-shape-medium, 4px));background-color:var(--mdc-elevated-card-container-color, transparent);border-width:0;border-style:solid;border-color:var(--mdc-elevated-card-container-color, transparent)}.mat-mdc-card .mdc-card::after{border-radius:var(--mdc-elevated-card-container-shape, var(--mdc-shape-medium, 4px))}.mat-mdc-card-outlined{border-width:var(--mdc-outlined-card-outline-width, 1px);border-style:solid;border-color:var(--mdc-outlined-card-outline-color, transparent)}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            r
          );
        })(),
        Wf = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['mat-card-title'],
                ['', 'mat-card-title', ''],
                ['', 'matCardTitle', ''],
              ],
              hostAttrs: [1, 'mat-mdc-card-title'],
            })),
            r
          );
        })(),
        $g = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [['mat-card-content']],
              hostAttrs: [1, 'mat-mdc-card-content'],
            })),
            r
          );
        })(),
        Yf = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['mat-card-subtitle'],
                ['', 'mat-card-subtitle', ''],
                ['', 'matCardSubtitle', ''],
              ],
              hostAttrs: [1, 'mat-mdc-card-subtitle'],
            })),
            r
          );
        })(),
        zg = (() => {
          class r {
            constructor() {
              this.align = 'start';
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [['mat-card-actions']],
              hostAttrs: [1, 'mat-mdc-card-actions', 'mdc-card__actions'],
              hostVars: 2,
              hostBindings: function (e, o) {
                2 & e &&
                  d.ekj('mat-mdc-card-actions-align-end', 'end' === o.align);
              },
              inputs: { align: 'align' },
              exportAs: ['matCardActions'],
            })),
            r
          );
        })(),
        Zf = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??cmp = d.Xpm({
              type: r,
              selectors: [['mat-card-header']],
              hostAttrs: [1, 'mat-mdc-card-header'],
              ngContentSelectors: jg,
              decls: 4,
              vars: 0,
              consts: [[1, 'mat-mdc-card-header-text']],
              template: function (e, o) {
                1 & e &&
                  (d.F$t(Ug),
                  d.Hsn(0),
                  d.TgZ(1, 'div', 0),
                  d.Hsn(2, 1),
                  d.qZA(),
                  d.Hsn(3, 2));
              },
              encapsulation: 2,
              changeDetection: 0,
            })),
            r
          );
        })(),
        Kf = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['', 'mat-card-image', ''],
                ['', 'matCardImage', ''],
              ],
              hostAttrs: [1, 'mat-mdc-card-image', 'mdc-card__media'],
            })),
            r
          );
        })(),
        Qf = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [
                ['', 'mat-card-avatar', ''],
                ['', 'matCardAvatar', ''],
              ],
              hostAttrs: [1, 'mat-mdc-card-avatar'],
            })),
            r
          );
        })(),
        G0 = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [St, E.ez, St] })),
            r
          );
        })();
      const Kx = function (r) {
          return ['/product', r];
        },
        Qx = function (r) {
          return { parentData: r };
        };
      function Xx(r, t) {
        if (
          (1 & r &&
            (d.TgZ(0, 'mat-card', 3)(1, 'mat-card-header'),
            d._UZ(2, 'img', 4),
            d.TgZ(3, 'mat-card-title'),
            d._uU(4),
            d.qZA(),
            d.TgZ(5, 'mat-card-subtitle'),
            d._uU(6),
            d.qZA()(),
            d._UZ(7, 'img', 5),
            d.TgZ(8, 'mat-card-content', 6)(9, 'p'),
            d._uU(10),
            d.ALo(11, 'currency'),
            d.qZA()(),
            d.TgZ(12, 'mat-card-actions')(13, 'button', 7),
            d._uU(14, 'Add'),
            d.qZA(),
            d.TgZ(15, 'button', 8),
            d._uU(16, 'Buy'),
            d.qZA()()()),
          2 & r)
        ) {
          const e = t.$implicit,
            o = t.index;
          d.xp6(2),
            d.MGl('src', '/assets/Images/img', o, '.png', d.LSH),
            d.xp6(2),
            d.Oqu(e.pName),
            d.xp6(2),
            d.Oqu(e.pCategory),
            d.xp6(1),
            d.MGl('src', '/assets/Images/img', o, '.png', d.LSH),
            d.xp6(3),
            d.hij(' ', d.lcZ(11, 7, e.pPrice), ' '),
            d.xp6(5),
            d.Q6J('routerLink', d.VKq(9, Kx, e.pId))(
              'queryParams',
              d.VKq(11, Qx, e)
            );
        }
      }
      class Zc {
        constructor(t) {
          this.product = t;
        }
        ngOnInit() {
          this.product.getProducts().subscribe((t) => {
            (this.productData = t), console.log(this.productData);
          });
        }
      }
      (Zc.??fac = function (t) {
        return new (t || Zc)(d.Y36(Yi));
      }),
        (Zc.??cmp = d.Xpm({
          type: Zc,
          selectors: [['app-products']],
          decls: 3,
          vars: 1,
          consts: [
            [1, 'container'],
            [1, 'card-section'],
            ['class', 'example-card', 4, 'ngFor', 'ngForOf'],
            [1, 'example-card'],
            ['mat-card-avatar', '', 3, 'src'],
            [
              'mat-card-image',
              '',
              'alt',
              'Photo of a Shiba Inu',
              1,
              'container-img',
              3,
              'src',
            ],
            [1, 'card-content'],
            ['mat-raised-button', '', 'color', 'primary', 1, 'addBtn'],
            [
              'mat-raised-button',
              '',
              'color',
              'warn',
              3,
              'routerLink',
              'queryParams',
            ],
          ],
          template: function (t, e) {
            1 & t &&
              (d.TgZ(0, 'div', 0)(1, 'div', 1),
              d.YNc(2, Xx, 17, 13, 'mat-card', 2),
              d.qZA()()),
              2 & t && (d.xp6(2), d.Q6J('ngForOf', e.productData));
          },
          dependencies: [E.sg, Ba, ll, qf, zg, Qf, $g, Zf, Kf, Yf, Wf, E.H9],
          styles: [
            '.example-card[_ngcontent-%COMP%]{width:300px;display:flex;margin-bottom:20px}.container[_ngcontent-%COMP%]{max-width:980px;margin:0 auto}.card-section[_ngcontent-%COMP%]{margin-top:30px;width:100%;min-height:100vh;display:flex;justify-content:space-between;flex-wrap:wrap}.card-content[_ngcontent-%COMP%]{text-align:center}.addBtn[_ngcontent-%COMP%]{margin-right:5px}.example-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{object-fit:cover}.container-img[_ngcontent-%COMP%]{width:300px;height:300px}',
          ],
        }));
      class pl {}
      (pl.??fac = function (t) {
        return new (t || pl)();
      }),
        (pl.??cmp = d.Xpm({
          type: pl,
          selectors: [['app-home']],
          decls: 1,
          vars: 0,
          template: function (t, e) {
            1 & t && d._UZ(0, 'router-outlet');
          },
          dependencies: [du],
        }));
      const Jx = [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: pl },
        { path: 'product', component: Zc },
        { path: 'register', component: Yc },
        { path: 'login', component: Wc },
        { path: 'product/:id', component: Ua },
        {
          path: 'addProduct',
          loadChildren: () =>
            F.e(87)
              .then(F.bind(F, 87))
              .then((r) => r.AddProductModule),
        },
        { path: '**', component: ja },
      ];
      class tr {}
      (tr.??fac = function (t) {
        return new (t || tr)();
      }),
        (tr.??mod = d.oAB({ type: tr })),
        (tr.??inj = d.cJS({
          imports: [
            Bp.forRoot(Jx, { scrollPositionRestoration: 'enabled' }),
            Bp,
          ],
        }));
      const eC = ['*', [['mat-toolbar-row']]],
        Wg = ['*', 'mat-toolbar-row'],
        Kc = Me(
          class {
            constructor(r) {
              this._elementRef = r;
            }
          }
        );
      let Yg = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??dir = d.lG2({
              type: r,
              selectors: [['mat-toolbar-row']],
              hostAttrs: [1, 'mat-toolbar-row'],
              exportAs: ['matToolbarRow'],
            })),
            r
          );
        })(),
        Zg = (() => {
          class r extends Kc {
            constructor(e, o, l) {
              super(e), (this._platform = o), (this._document = l);
            }
            ngAfterViewInit() {
              this._platform.isBrowser &&
                (this._checkToolbarMixedModes(),
                this._toolbarRows.changes.subscribe(() =>
                  this._checkToolbarMixedModes()
                ));
            }
            _checkToolbarMixedModes() {}
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(d.Y36(d.SBq), d.Y36(Kn), d.Y36(E.K0));
            }),
            (r.??cmp = d.Xpm({
              type: r,
              selectors: [['mat-toolbar']],
              contentQueries: function (e, o, l) {
                if ((1 & e && d.Suo(l, Yg, 5), 2 & e)) {
                  let f;
                  d.iGM((f = d.CRH())) && (o._toolbarRows = f);
                }
              },
              hostAttrs: [1, 'mat-toolbar'],
              hostVars: 4,
              hostBindings: function (e, o) {
                2 & e &&
                  d.ekj('mat-toolbar-multiple-rows', o._toolbarRows.length > 0)(
                    'mat-toolbar-single-row',
                    0 === o._toolbarRows.length
                  );
              },
              inputs: { color: 'color' },
              exportAs: ['matToolbar'],
              features: [d.qOj],
              ngContentSelectors: Wg,
              decls: 2,
              vars: 0,
              template: function (e, o) {
                1 & e && (d.F$t(eC), d.Hsn(0), d.Hsn(1, 1));
              },
              styles: [
                '.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color: inherit;--mdc-outlined-button-label-text-color: inherit}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            r
          );
        })(),
        Qc = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [St, St] })),
            r
          );
        })();
      const Kg = ['switch'],
        q0 = ['*'],
        Qg = new d.OlP('mat-slide-toggle-default-options', {
          providedIn: 'root',
          factory: () => ({ disableToggleValue: !1 }),
        }),
        tC = { provide: _t, useExisting: (0, d.Gpc)(() => Jg), multi: !0 };
      class Xg {
        constructor(t, e) {
          (this.source = t), (this.checked = e);
        }
      }
      let W0 = 0;
      const Y0 = Ov(
        Me(
          $m(
            Rv(
              class {
                constructor(r) {
                  this._elementRef = r;
                }
              }
            )
          )
        )
      );
      let Xc = (() => {
          class r extends Y0 {
            get required() {
              return this._required;
            }
            set required(e) {
              this._required = li(e);
            }
            get checked() {
              return this._checked;
            }
            set checked(e) {
              (this._checked = li(e)), this._changeDetectorRef.markForCheck();
            }
            get inputId() {
              return `${this.id || this._uniqueId}-input`;
            }
            constructor(e, o, l, f, p, y, D) {
              super(e),
                (this._focusMonitor = o),
                (this._changeDetectorRef = l),
                (this.defaults = p),
                (this._onChange = (S) => {}),
                (this._onTouched = () => {}),
                (this._required = !1),
                (this._checked = !1),
                (this.name = null),
                (this.labelPosition = 'after'),
                (this.ariaLabel = null),
                (this.ariaLabelledby = null),
                (this.change = new d.vpe()),
                (this.toggleChange = new d.vpe()),
                (this.tabIndex = parseInt(f) || 0),
                (this.color = this.defaultColor = p.color || 'accent'),
                (this._noopAnimations = 'NoopAnimations' === y),
                (this.id = this._uniqueId = `${D}${++W0}`);
            }
            ngAfterContentInit() {
              this._focusMonitor
                .monitor(this._elementRef, !0)
                .subscribe((e) => {
                  'keyboard' === e || 'program' === e
                    ? ((this._focused = !0),
                      this._changeDetectorRef.markForCheck())
                    : e ||
                      Promise.resolve().then(() => {
                        (this._focused = !1),
                          this._onTouched(),
                          this._changeDetectorRef.markForCheck();
                      });
                });
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            writeValue(e) {
              this.checked = !!e;
            }
            registerOnChange(e) {
              this._onChange = e;
            }
            registerOnTouched(e) {
              this._onTouched = e;
            }
            setDisabledState(e) {
              (this.disabled = e), this._changeDetectorRef.markForCheck();
            }
            toggle() {
              (this.checked = !this.checked), this._onChange(this.checked);
            }
            _emitChangeEvent() {
              this._onChange(this.checked),
                this.change.emit(this._createChangeEvent(this.checked));
            }
          }
          return (
            (r.??fac = function (e) {
              d.$Z();
            }),
            (r.??dir = d.lG2({
              type: r,
              inputs: {
                name: 'name',
                id: 'id',
                labelPosition: 'labelPosition',
                ariaLabel: ['aria-label', 'ariaLabel'],
                ariaLabelledby: ['aria-labelledby', 'ariaLabelledby'],
                ariaDescribedby: ['aria-describedby', 'ariaDescribedby'],
                required: 'required',
                checked: 'checked',
              },
              outputs: { change: 'change', toggleChange: 'toggleChange' },
              features: [d.qOj],
            })),
            r
          );
        })(),
        Jg = (() => {
          class r extends Xc {
            get buttonId() {
              return `${this.id || this._uniqueId}-button`;
            }
            constructor(e, o, l, f, p, y) {
              super(e, o, l, f, p, y, 'mat-mdc-slide-toggle-'),
                (this._labelId = this._uniqueId + '-label');
            }
            _handleClick() {
              this.toggleChange.emit(),
                this.defaults.disableToggleValue ||
                  ((this.checked = !this.checked),
                  this._onChange(this.checked),
                  this.change.emit(new Xg(this, this.checked)));
            }
            focus() {
              this._switchElement.nativeElement.focus();
            }
            _createChangeEvent(e) {
              return new Xg(this, e);
            }
            _getAriaLabelledBy() {
              return this.ariaLabelledby
                ? this.ariaLabelledby
                : this.ariaLabel
                ? null
                : this._labelId;
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)(
                d.Y36(d.SBq),
                d.Y36(Bm),
                d.Y36(d.sBO),
                d.$8M('tabindex'),
                d.Y36(Qg),
                d.Y36(d.QbO, 8)
              );
            }),
            (r.??cmp = d.Xpm({
              type: r,
              selectors: [['mat-slide-toggle']],
              viewQuery: function (e, o) {
                if ((1 & e && d.Gf(Kg, 5), 2 & e)) {
                  let l;
                  d.iGM((l = d.CRH())) && (o._switchElement = l.first);
                }
              },
              hostAttrs: [1, 'mat-mdc-slide-toggle'],
              hostVars: 11,
              hostBindings: function (e, o) {
                2 & e &&
                  (d.Ikx('id', o.id),
                  d.uIk('tabindex', null)('aria-label', null)('name', null)(
                    'aria-labelledby',
                    null
                  ),
                  d.ekj('mat-mdc-slide-toggle-focused', o._focused)(
                    'mat-mdc-slide-toggle-checked',
                    o.checked
                  )('_mat-animation-noopable', o._noopAnimations));
              },
              inputs: {
                disabled: 'disabled',
                disableRipple: 'disableRipple',
                color: 'color',
                tabIndex: 'tabIndex',
              },
              exportAs: ['matSlideToggle'],
              features: [d._Bn([tC]), d.qOj],
              ngContentSelectors: q0,
              decls: 17,
              vars: 24,
              consts: [
                [1, 'mdc-form-field'],
                [
                  'role',
                  'switch',
                  'type',
                  'button',
                  1,
                  'mdc-switch',
                  3,
                  'tabIndex',
                  'disabled',
                  'click',
                ],
                ['switch', ''],
                [1, 'mdc-switch__track'],
                [1, 'mdc-switch__handle-track'],
                [1, 'mdc-switch__handle'],
                [1, 'mdc-switch__shadow'],
                [1, 'mdc-elevation-overlay'],
                [1, 'mdc-switch__ripple'],
                [
                  'mat-ripple',
                  '',
                  1,
                  'mat-mdc-slide-toggle-ripple',
                  'mat-mdc-focus-indicator',
                  3,
                  'matRippleTrigger',
                  'matRippleDisabled',
                  'matRippleCentered',
                ],
                [1, 'mdc-switch__icons'],
                [
                  'viewBox',
                  '0 0 24 24',
                  1,
                  'mdc-switch__icon',
                  'mdc-switch__icon--on',
                ],
                [
                  'd',
                  'M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z',
                ],
                [
                  'viewBox',
                  '0 0 24 24',
                  1,
                  'mdc-switch__icon',
                  'mdc-switch__icon--off',
                ],
                ['d', 'M20 13H4v-2h16v2z'],
                [3, 'for', 'click'],
              ],
              template: function (e, o) {
                if (
                  (1 & e &&
                    (d.F$t(),
                    d.TgZ(0, 'div', 0)(1, 'button', 1, 2),
                    d.NdJ('click', function () {
                      return o._handleClick();
                    }),
                    d._UZ(3, 'div', 3),
                    d.TgZ(4, 'div', 4)(5, 'div', 5)(6, 'div', 6),
                    d._UZ(7, 'div', 7),
                    d.qZA(),
                    d.TgZ(8, 'div', 8),
                    d._UZ(9, 'div', 9),
                    d.qZA(),
                    d.TgZ(10, 'div', 10),
                    d.O4$(),
                    d.TgZ(11, 'svg', 11),
                    d._UZ(12, 'path', 12),
                    d.qZA(),
                    d.TgZ(13, 'svg', 13),
                    d._UZ(14, 'path', 14),
                    d.qZA()()()()(),
                    d.kcU(),
                    d.TgZ(15, 'label', 15),
                    d.NdJ('click', function (f) {
                      return f.stopPropagation();
                    }),
                    d.Hsn(16),
                    d.qZA()()),
                  2 & e)
                ) {
                  const l = d.MAs(2);
                  d.ekj(
                    'mdc-form-field--align-end',
                    'before' == o.labelPosition
                  ),
                    d.xp6(1),
                    d.ekj('mdc-switch--selected', o.checked)(
                      'mdc-switch--unselected',
                      !o.checked
                    )('mdc-switch--checked', o.checked)(
                      'mdc-switch--disabled',
                      o.disabled
                    ),
                    d.Q6J('tabIndex', o.tabIndex)('disabled', o.disabled),
                    d.uIk('id', o.buttonId)('name', o.name)(
                      'aria-label',
                      o.ariaLabel
                    )('aria-labelledby', o._getAriaLabelledBy())(
                      'aria-describedby',
                      o.ariaDescribedby
                    )('aria-required', o.required || null)(
                      'aria-checked',
                      o.checked
                    ),
                    d.xp6(8),
                    d.Q6J('matRippleTrigger', l)(
                      'matRippleDisabled',
                      o.disableRipple || o.disabled
                    )('matRippleCentered', !0),
                    d.xp6(6),
                    d.Q6J('for', o.buttonId),
                    d.uIk('id', o._labelId);
                }
              },
              dependencies: [Nc],
              styles: [
                '.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field[hidden]{display:none}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative}.mdc-switch[hidden]{display:none}.mdc-switch:disabled{cursor:default;pointer-events:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%}@media screen and (forced-colors: active){.mdc-switch__track::before,.mdc-switch__track::after{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(-100%)}[dir=rtl] .mdc-switch__track::after,.mdc-switch__track[dir=rtl]::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track[dir=rtl]::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0)}[dir=rtl] .mdc-switch__handle-track,.mdc-switch__handle-track[dir=rtl]{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,.mdc-switch--selected .mdc-switch__handle-track[dir=rtl]{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto}[dir=rtl] .mdc-switch__handle,.mdc-switch__handle[dir=rtl]{left:auto;right:0}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media screen and (forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1}.mdc-switch:disabled .mdc-switch__ripple{display:none}.mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mdc-switch{width:var(--mdc-switch-track-width, 36px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-selected-handle-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-hover-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-focus-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-selected-pressed-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-selected-handle-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-unselected-handle-color, #616161)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-hover-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-focus-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-unselected-pressed-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-unselected-handle-color, #424242)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle::before{background:var(--mdc-switch-handle-surface-color, var(--mdc-theme-surface, #fff))}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__focus-ring-wrapper,.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{height:var(--mdc-switch-handle-height, 20px)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__handle::after{opacity:var(--mdc-switch-disabled-handle-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{border-radius:var(--mdc-switch-handle-shape, 10px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{width:var(--mdc-switch-handle-width, 20px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle-track{width:calc(100% - var(--mdc-switch-handle-width, 20px))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:var(--mdc-switch-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:var(--mdc-switch-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-selected-icon-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:var(--mdc-switch-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected .mdc-switch__icon{width:var(--mdc-switch-selected-icon-size, 18px);height:var(--mdc-switch-selected-icon-size, 18px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:var(--mdc-switch-unselected-icon-size, 18px);height:var(--mdc-switch-unselected-icon-size, 18px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-hover-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-focus-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-selected-pressed-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-hover-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-focus-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background-color:var(--mdc-switch-unselected-pressed-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-selected-hover-state-layer-opacity, 0.04)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-selected-focus-state-layer-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:var(--mdc-switch-unselected-hover-state-layer-opacity, 0.04)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:var(--mdc-switch-unselected-focus-state-layer-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__ripple{height:var(--mdc-switch-state-layer-size, 48px);width:var(--mdc-switch-state-layer-size, 48px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__track{height:var(--mdc-switch-track-height, 14px)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track{opacity:var(--mdc-switch-disabled-track-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__track::after{background:var(--mdc-switch-selected-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-hover-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-focus-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mdc-switch-selected-pressed-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track::after{background:var(--mdc-switch-disabled-selected-track-color, #424242)}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__track::before{background:var(--mdc-switch-unselected-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-hover-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-focus-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mdc-switch-unselected-pressed-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track::before{background:var(--mdc-switch-disabled-unselected-track-color, #424242)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__track{border-radius:var(--mdc-switch-track-shape, 7px)}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__ripple::after{content:"";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__ripple::after{opacity:.04;transition:opacity 75ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__ripple::after{opacity:.12}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-elevation-overlay,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            r
          );
        })(),
        Z0 = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({})),
            r
          );
        })(),
        e_ = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [Z0, St, Km, E.ez, Z0, St] })),
            r
          );
        })();
      const K0 = function (r) {
        return { default: r };
      };
      class ml {
        constructor() {
          (this.isScrolled = !1), (this.title = 'shop-app');
        }
        ngOnInit() {
          this.mode(),
            window.addEventListener('scroll', () => {
              this.isScrolled = 0 !== window.pageYOffset;
            });
        }
        darkMode(t) {
          console.log(t),
            t.checked ? (this.isDark = !0) : t.checked || (this.isDark = !1),
            localStorage.setItem('dark', JSON.stringify(this.isDark)),
            this.mode();
        }
        mode() {
          this.Idark = this.getMode();
        }
        getMode() {
          return JSON.parse(localStorage.getItem('dark')) || this.isDark;
        }
        scrollTop() {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      }
      function t_(r) {
        return new d.vHH(3e3, !1);
      }
      function uw() {
        return typeof window < 'u' && typeof window.document < 'u';
      }
      function Jc() {
        return (
          typeof process < 'u' &&
          '[object process]' === {}.toString.call(process)
        );
      }
      function Ao(r) {
        switch (r.length) {
          case 0:
            return new cl();
          case 1:
            return r[0];
          default:
            return new Vc(r);
        }
      }
      function ed(r, t, e, o, l = new Map(), f = new Map()) {
        const p = [],
          y = [];
        let D = -1,
          S = null;
        if (
          (o.forEach((R) => {
            const B = R.get('offset'),
              ae = B == D,
              se = (ae && S) || new Map();
            R.forEach((Q, ce) => {
              let ze = ce,
                Ye = Q;
              if ('offset' !== ce)
                switch (((ze = t.normalizePropertyName(ze, p)), Ye)) {
                  case '!':
                    Ye = l.get(ce);
                    break;
                  case er:
                    Ye = f.get(ce);
                    break;
                  default:
                    Ye = t.normalizeStyleValue(ce, ze, Ye, p);
                }
              se.set(ze, Ye);
            }),
              ae || y.push(se),
              (S = se),
              (D = B);
          }),
          p.length)
        )
          throw (function Lr(r) {
            return new d.vHH(3502, !1);
          })();
        return y;
      }
      function td(r, t, e, o) {
        switch (t) {
          case 'start':
            r.onStart(() => o(e && nd(e, 'start', r)));
            break;
          case 'done':
            r.onDone(() => o(e && nd(e, 'done', r)));
            break;
          case 'destroy':
            r.onDestroy(() => o(e && nd(e, 'destroy', r)));
        }
      }
      function nd(r, t, e) {
        const f = id(
            r.element,
            r.triggerName,
            r.fromState,
            r.toState,
            t || r.phaseName,
            e.totalTime ?? r.totalTime,
            !!e.disabled
          ),
          p = r._data;
        return null != p && (f._data = p), f;
      }
      function id(r, t, e, o, l = '', f = 0, p) {
        return {
          element: r,
          triggerName: t,
          fromState: e,
          toState: o,
          phaseName: l,
          totalTime: f,
          disabled: !!p,
        };
      }
      function Fn(r, t, e) {
        let o = r.get(t);
        return o || r.set(t, (o = e)), o;
      }
      function nh(r) {
        const t = r.indexOf(':');
        return [r.substring(1, t), r.slice(t + 1)];
      }
      (ml.??fac = function (t) {
        return new (t || ml)();
      }),
        (ml.??cmp = d.Xpm({
          type: ml,
          selectors: [['app-root']],
          decls: 19,
          vars: 5,
          consts: [
            [3, 'ngClass'],
            ['color', 'primary', 1, 'navbar'],
            ['routerLink', 'home', 1, 'shop'],
            [1, 'nav-links'],
            ['routerLink', 'home', 'color', 'accent'],
            ['routerLink', 'login', 'color', 'accent'],
            ['routerLink', 'product', 'color', 'accent'],
            ['routerLink', 'register', 'color', 'accent'],
            ['color', 'accent', 3, 'checked', 'change'],
            [1, 'scrollTop', 3, 'ngClass', 'click'],
            [1, 'mat-18'],
          ],
          template: function (t, e) {
            1 & t &&
              (d.TgZ(0, 'div', 0)(1, 'mat-toolbar', 1)(2, 'div', 2),
              d._uU(3, 'Shopping App'),
              d.qZA(),
              d.TgZ(4, 'div', 3)(5, 'a', 4),
              d._uU(6, 'Home'),
              d.qZA(),
              d.TgZ(7, 'a', 5),
              d._uU(8, 'Login'),
              d.qZA(),
              d.TgZ(9, 'a', 6),
              d._uU(10, 'Products'),
              d.qZA(),
              d.TgZ(11, 'a', 7),
              d._uU(12, 'Register'),
              d.qZA(),
              d.TgZ(13, 'mat-slide-toggle', 8),
              d.NdJ('change', function (l) {
                return e.darkMode(l);
              }),
              d._uU(14, 'Dark Mode'),
              d.qZA()()(),
              d._UZ(15, 'app-home'),
              d.TgZ(16, 'button', 9),
              d.NdJ('click', function () {
                return e.scrollTop();
              }),
              d.TgZ(17, 'mat-icon', 10),
              d._uU(18, 'keyboard_arrow_up'),
              d.qZA()()()),
              2 & t &&
                (d.Q6J('ngClass', e.Idark ? 'dark' : 'light'),
                d.xp6(13),
                d.Q6J('checked', e.Idark),
                d.xp6(3),
                d.Q6J('ngClass', d.VKq(3, K0, e.isScrolled)));
          },
          dependencies: [E.mk, Ba, Zg, Jg, Bf, pl],
          styles: [
            '.navbar[_ngcontent-%COMP%]{width:100%;display:flex;flex-wrap:wrap}.nav-links[_ngcontent-%COMP%]{display:flex;flex:1 1 auto;justify-content:flex-end;font-size:1.1rem}.nav-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-weight:400;padding-right:3rem;color:#ffffffe1;text-decoration:none;transition:.2s all ease-out}.nav-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#424242;transition:.2s all ease-in}.shop[_ngcontent-%COMP%]{display:flex;flex:5 1 auto;cursor:pointer}.dark[_ngcontent-%COMP%]{background-color:#424242;width:100%;min-height:100vh;transition:.4s ease-in;color:#fff}.light[_ngcontent-%COMP%]{background-color:#fff;width:100%;min-height:100vh;transition:.4s ease-out;color:#000}.scrollTop[_ngcontent-%COMP%]{background-color:#c2185b;color:#fff;position:fixed;z-index:3;bottom:0;right:0;margin:0 8px 12px 0;cursor:pointer;border:none;border-radius:5px;padding:10px 15px;box-shadow:#00000059 0 5px 15px;opacity:0;transition:.4s all ease-out}.default[_ngcontent-%COMP%]{opacity:1;transition:.4s all ease-in}',
          ],
        }));
      let js = (r, t) => !1,
        gl = (r, t, e) => [],
        ih = null;
      function rh(r) {
        const t = r.parentNode || r.host;
        return t === ih ? null : t;
      }
      (Jc() || typeof Element < 'u') &&
        (uw()
          ? ((ih = (() => document.documentElement)()),
            (js = (r, t) => {
              for (; t; ) {
                if (t === r) return !0;
                t = rh(t);
              }
              return !1;
            }))
          : (js = (r, t) => r.contains(t)),
        (gl = (r, t, e) => {
          if (e) return Array.from(r.querySelectorAll(t));
          const o = r.querySelector(t);
          return o ? [o] : [];
        }));
      let $s = null,
        fw = !1;
      const h_ = js,
        pw = gl;
      let mw = (() => {
          class r {
            validateStyleProperty(e) {
              return (function f_(r) {
                $s ||
                  (($s =
                    (function hw() {
                      return typeof document < 'u' ? document.body : null;
                    })() || {}),
                  (fw = !!$s.style && 'WebkitAppearance' in $s.style));
                let t = !0;
                return (
                  $s.style &&
                    !(function lC(r) {
                      return 'ebkit' == r.substring(1, 6);
                    })(r) &&
                    ((t = r in $s.style),
                    !t &&
                      fw &&
                      (t =
                        'Webkit' + r.charAt(0).toUpperCase() + r.slice(1) in
                        $s.style)),
                  t
                );
              })(e);
            }
            matchesElement(e, o) {
              return !1;
            }
            containsElement(e, o) {
              return h_(e, o);
            }
            getParentElement(e) {
              return rh(e);
            }
            query(e, o, l) {
              return pw(e, o, l);
            }
            computeStyle(e, o, l) {
              return l || '';
            }
            animate(e, o, l, f, p, y = [], D) {
              return new cl(l, f);
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
            r
          );
        })(),
        p_ = (() => {
          class r {}
          return (r.NOOP = new mw()), r;
        })();
      const oh = 'ng-enter',
        od = 'ng-leave',
        _l = 'ng-trigger',
        xi = '.ng-trigger',
        sh = 'ng-animating',
        bl = '.ng-animating';
      function ui(r) {
        if ('number' == typeof r) return r;
        const t = r.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : ah(parseFloat(t[1]), t[2]);
      }
      function ah(r, t) {
        return 's' === t ? 1e3 * r : r;
      }
      function zs(r, t, e) {
        return r.hasOwnProperty('duration')
          ? r
          : (function lh(r, t, e) {
              let l,
                f = 0,
                p = '';
              if ('string' == typeof r) {
                const y = r.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === y)
                  return t.push(t_()), { duration: 0, delay: 0, easing: '' };
                l = ah(parseFloat(y[1]), y[2]);
                const D = y[3];
                null != D && (f = ah(parseFloat(D), y[4]));
                const S = y[5];
                S && (p = S);
              } else l = r;
              if (!e) {
                let y = !1,
                  D = t.length;
                l < 0 &&
                  (t.push(
                    (function n_() {
                      return new d.vHH(3100, !1);
                    })()
                  ),
                  (y = !0)),
                  f < 0 &&
                    (t.push(
                      (function i_() {
                        return new d.vHH(3101, !1);
                      })()
                    ),
                    (y = !0)),
                  y && t.splice(D, 0, t_());
              }
              return { duration: l, delay: f, easing: p };
            })(r, t, e);
      }
      function Vr(r, t = {}) {
        return (
          Object.keys(r).forEach((e) => {
            t[e] = r[e];
          }),
          t
        );
      }
      function gw(r) {
        const t = new Map();
        return (
          Object.keys(r).forEach((e) => {
            t.set(e, r[e]);
          }),
          t
        );
      }
      function To(r, t = new Map(), e) {
        if (e) for (let [o, l] of e) t.set(o, l);
        for (let [o, l] of r) t.set(o, l);
        return t;
      }
      function ch(r, t, e) {
        return e ? t + ':' + e + ';' : '';
      }
      function g_(r) {
        let t = '';
        for (let e = 0; e < r.style.length; e++) {
          const o = r.style.item(e);
          t += ch(0, o, r.style.getPropertyValue(o));
        }
        for (const e in r.style)
          r.style.hasOwnProperty(e) &&
            !e.startsWith('_') &&
            (t += ch(0, fC(e), r.style[e]));
        r.setAttribute('style', t);
      }
      function Ci(r, t, e) {
        r.style &&
          (t.forEach((o, l) => {
            const f = wl(l);
            e && !e.has(l) && e.set(l, r.style[f]), (r.style[f] = o);
          }),
          Jc() && g_(r));
      }
      function Io(r, t) {
        r.style &&
          (t.forEach((e, o) => {
            const l = wl(o);
            r.style[l] = '';
          }),
          Jc() && g_(r));
      }
      function yl(r) {
        return Array.isArray(r) ? (1 == r.length ? r[0] : sg(r)) : r;
      }
      const sd = new RegExp('{{\\s*(.+?)\\s*}}', 'g');
      function dh(r) {
        let t = [];
        if ('string' == typeof r) {
          let e;
          for (; (e = sd.exec(r)); ) t.push(e[1]);
          sd.lastIndex = 0;
        }
        return t;
      }
      function vl(r, t, e) {
        const o = r.toString(),
          l = o.replace(sd, (f, p) => {
            let y = t[p];
            return (
              null == y &&
                (e.push(
                  (function di(r) {
                    return new d.vHH(3003, !1);
                  })()
                ),
                (y = '')),
              y.toString()
            );
          });
        return l == o ? r : l;
      }
      function ad(r) {
        const t = [];
        let e = r.next();
        for (; !e.done; ) t.push(e.value), (e = r.next());
        return t;
      }
      const b_ = /-+([a-z0-9])/g;
      function wl(r) {
        return r.replace(b_, (...t) => t[1].toUpperCase());
      }
      function fC(r) {
        return r.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      }
      function zn(r, t, e) {
        switch (t.type) {
          case 7:
            return r.visitTrigger(t, e);
          case 0:
            return r.visitState(t, e);
          case 1:
            return r.visitTransition(t, e);
          case 2:
            return r.visitSequence(t, e);
          case 3:
            return r.visitGroup(t, e);
          case 4:
            return r.visitAnimate(t, e);
          case 5:
            return r.visitKeyframes(t, e);
          case 6:
            return r.visitStyle(t, e);
          case 8:
            return r.visitReference(t, e);
          case 9:
            return r.visitAnimateChild(t, e);
          case 10:
            return r.visitAnimateRef(t, e);
          case 11:
            return r.visitQuery(t, e);
          case 12:
            return r.visitStagger(t, e);
          default:
            throw (function Q0(r) {
              return new d.vHH(3004, !1);
            })();
        }
      }
      function v_(r, t) {
        return window.getComputedStyle(r)[t];
      }
      function hC(r, t) {
        const e = [];
        return (
          'string' == typeof r
            ? r.split(/\s*,\s*/).forEach((o) =>
                (function pC(r, t, e) {
                  if (':' == r[0]) {
                    const D = (function ww(r, t) {
                      switch (r) {
                        case ':enter':
                          return 'void => *';
                        case ':leave':
                          return '* => void';
                        case ':increment':
                          return (e, o) => parseFloat(o) > parseFloat(e);
                        case ':decrement':
                          return (e, o) => parseFloat(o) < parseFloat(e);
                        default:
                          return (
                            t.push(
                              (function iw(r) {
                                return new d.vHH(3016, !1);
                              })()
                            ),
                            '* => *'
                          );
                      }
                    })(r, e);
                    if ('function' == typeof D) return void t.push(D);
                    r = D;
                  }
                  const o = r.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == o || o.length < 4)
                    return (
                      e.push(
                        (function l_(r) {
                          return new d.vHH(3015, !1);
                        })()
                      ),
                      t
                    );
                  const l = o[1],
                    f = o[2],
                    p = o[3];
                  t.push(Dw(l, p));
                  '<' == f[0] && !('*' == l && '*' == p) && t.push(Dw(p, l));
                })(o, e, t)
              )
            : e.push(r),
          e
        );
      }
      const mh = new Set(['true', '1']),
        gh = new Set(['false', '0']);
      function Dw(r, t) {
        const e = mh.has(r) || gh.has(r),
          o = mh.has(t) || gh.has(t);
        return (l, f) => {
          let p = '*' == r || r == l,
            y = '*' == t || t == f;
          return (
            !p && e && 'boolean' == typeof l && (p = l ? mh.has(r) : gh.has(r)),
            !y && o && 'boolean' == typeof f && (y = f ? mh.has(t) : gh.has(t)),
            p && y
          );
        };
      }
      const mC = new RegExp('s*:selfs*,?', 'g');
      function w_(r, t, e, o) {
        return new i(r).build(t, e, o);
      }
      class i {
        constructor(t) {
          this._driver = t;
        }
        build(t, e, o) {
          const l = new c(e);
          return this._resetContextStyleTimingState(l), zn(this, yl(t), l);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ''),
            (t.collectedStyles = new Map()),
            t.collectedStyles.set('', new Map()),
            (t.currentTime = 0);
        }
        visitTrigger(t, e) {
          let o = (e.queryCount = 0),
            l = (e.depCount = 0);
          const f = [],
            p = [];
          return (
            '@' == t.name.charAt(0) &&
              e.errors.push(
                (function X0() {
                  return new d.vHH(3006, !1);
                })()
              ),
            t.definitions.forEach((y) => {
              if ((this._resetContextStyleTimingState(e), 0 == y.type)) {
                const D = y,
                  S = D.name;
                S.toString()
                  .split(/\s*,\s*/)
                  .forEach((R) => {
                    (D.name = R), f.push(this.visitState(D, e));
                  }),
                  (D.name = S);
              } else if (1 == y.type) {
                const D = this.visitTransition(y, e);
                (o += D.queryCount), (l += D.depCount), p.push(D);
              } else
                e.errors.push(
                  (function oC() {
                    return new d.vHH(3007, !1);
                  })()
                );
            }),
            {
              type: 7,
              name: t.name,
              states: f,
              transitions: p,
              queryCount: o,
              depCount: l,
              options: null,
            }
          );
        }
        visitState(t, e) {
          const o = this.visitStyle(t.styles, e),
            l = (t.options && t.options.params) || null;
          if (o.containsDynamicStyles) {
            const f = new Set(),
              p = l || {};
            o.styles.forEach((y) => {
              y instanceof Map &&
                y.forEach((D) => {
                  dh(D).forEach((S) => {
                    p.hasOwnProperty(S) || f.add(S);
                  });
                });
            }),
              f.size &&
                (ad(f.values()),
                e.errors.push(
                  (function Xn(r, t) {
                    return new d.vHH(3008, !1);
                  })()
                ));
          }
          return {
            type: 0,
            name: t.name,
            style: o,
            options: l ? { params: l } : null,
          };
        }
        visitTransition(t, e) {
          (e.queryCount = 0), (e.depCount = 0);
          const o = zn(this, yl(t.animation), e);
          return {
            type: 1,
            matchers: hC(t.expr, e.errors),
            animation: o,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: m(t.options),
          };
        }
        visitSequence(t, e) {
          return {
            type: 2,
            steps: t.steps.map((o) => zn(this, o, e)),
            options: m(t.options),
          };
        }
        visitGroup(t, e) {
          const o = e.currentTime;
          let l = 0;
          const f = t.steps.map((p) => {
            e.currentTime = o;
            const y = zn(this, p, e);
            return (l = Math.max(l, e.currentTime)), y;
          });
          return (
            (e.currentTime = l), { type: 3, steps: f, options: m(t.options) }
          );
        }
        visitAnimate(t, e) {
          const o = (function h(r, t) {
            if (r.hasOwnProperty('duration')) return r;
            if ('number' == typeof r) return _(zs(r, t).duration, 0, '');
            const e = r;
            if (
              e
                .split(/\s+/)
                .some((f) => '{' == f.charAt(0) && '{' == f.charAt(1))
            ) {
              const f = _(0, 0, '');
              return (f.dynamic = !0), (f.strValue = e), f;
            }
            const l = zs(e, t);
            return _(l.duration, l.delay, l.easing);
          })(t.timings, e.errors);
          e.currentAnimateTimings = o;
          let l,
            f = t.styles ? t.styles : Lc({});
          if (5 == f.type) l = this.visitKeyframes(f, e);
          else {
            let p = t.styles,
              y = !1;
            if (!p) {
              y = !0;
              const S = {};
              o.easing && (S.easing = o.easing), (p = Lc(S));
            }
            e.currentTime += o.duration + o.delay;
            const D = this.visitStyle(p, e);
            (D.isEmptyStep = y), (l = D);
          }
          return (
            (e.currentAnimateTimings = null),
            { type: 4, timings: o, style: l, options: null }
          );
        }
        visitStyle(t, e) {
          const o = this._makeStyleAst(t, e);
          return this._validateStyleAst(o, e), o;
        }
        _makeStyleAst(t, e) {
          const o = [],
            l = Array.isArray(t.styles) ? t.styles : [t.styles];
          for (let y of l)
            'string' == typeof y
              ? y === er
                ? o.push(y)
                : e.errors.push(new d.vHH(3002, !1))
              : o.push(gw(y));
          let f = !1,
            p = null;
          return (
            o.forEach((y) => {
              if (
                y instanceof Map &&
                (y.has('easing') && ((p = y.get('easing')), y.delete('easing')),
                !f)
              )
                for (let D of y.values())
                  if (D.toString().indexOf('{{') >= 0) {
                    f = !0;
                    break;
                  }
            }),
            {
              type: 6,
              styles: o,
              easing: p,
              offset: t.offset,
              containsDynamicStyles: f,
              options: null,
            }
          );
        }
        _validateStyleAst(t, e) {
          const o = e.currentAnimateTimings;
          let l = e.currentTime,
            f = e.currentTime;
          o && f > 0 && (f -= o.duration + o.delay),
            t.styles.forEach((p) => {
              'string' != typeof p &&
                p.forEach((y, D) => {
                  const S = e.collectedStyles.get(e.currentQuerySelector),
                    R = S.get(D);
                  let B = !0;
                  R &&
                    (f != l &&
                      f >= R.startTime &&
                      l <= R.endTime &&
                      (e.errors.push(
                        (function ew(r, t, e, o, l) {
                          return new d.vHH(3010, !1);
                        })()
                      ),
                      (B = !1)),
                    (f = R.startTime)),
                    B && S.set(D, { startTime: f, endTime: l }),
                    e.options &&
                      (function __(r, t, e) {
                        const o = t.params || {},
                          l = dh(r);
                        l.length &&
                          l.forEach((f) => {
                            o.hasOwnProperty(f) ||
                              e.push(
                                (function rC(r) {
                                  return new d.vHH(3001, !1);
                                })()
                              );
                          });
                      })(y, e.options, e.errors);
                });
            });
        }
        visitKeyframes(t, e) {
          const o = { type: 5, styles: [], options: null };
          if (!e.currentAnimateTimings)
            return (
              e.errors.push(
                (function tw() {
                  return new d.vHH(3011, !1);
                })()
              ),
              o
            );
          let f = 0;
          const p = [];
          let y = !1,
            D = !1,
            S = 0;
          const R = t.steps.map((Ye) => {
            const yt = this._makeStyleAst(Ye, e);
            let on =
                null != yt.offset
                  ? yt.offset
                  : (function u(r) {
                      if ('string' == typeof r) return null;
                      let t = null;
                      if (Array.isArray(r))
                        r.forEach((e) => {
                          if (e instanceof Map && e.has('offset')) {
                            const o = e;
                            (t = parseFloat(o.get('offset'))),
                              o.delete('offset');
                          }
                        });
                      else if (r instanceof Map && r.has('offset')) {
                        const e = r;
                        (t = parseFloat(e.get('offset'))), e.delete('offset');
                      }
                      return t;
                    })(yt.styles),
              sn = 0;
            return (
              null != on && (f++, (sn = yt.offset = on)),
              (D = D || sn < 0 || sn > 1),
              (y = y || sn < S),
              (S = sn),
              p.push(sn),
              yt
            );
          });
          D &&
            e.errors.push(
              (function Jf() {
                return new d.vHH(3012, !1);
              })()
            ),
            y &&
              e.errors.push(
                (function o_() {
                  return new d.vHH(3200, !1);
                })()
              );
          const B = t.steps.length;
          let ae = 0;
          f > 0 && f < B
            ? e.errors.push(
                (function s_() {
                  return new d.vHH(3202, !1);
                })()
              )
            : 0 == f && (ae = 1 / (B - 1));
          const se = B - 1,
            Q = e.currentTime,
            ce = e.currentAnimateTimings,
            ze = ce.duration;
          return (
            R.forEach((Ye, yt) => {
              const on = ae > 0 ? (yt == se ? 1 : ae * yt) : p[yt],
                sn = on * ze;
              (e.currentTime = Q + ce.delay + sn),
                (ce.duration = sn),
                this._validateStyleAst(Ye, e),
                (Ye.offset = on),
                o.styles.push(Ye);
            }),
            o
          );
        }
        visitReference(t, e) {
          return {
            type: 8,
            animation: zn(this, yl(t.animation), e),
            options: m(t.options),
          };
        }
        visitAnimateChild(t, e) {
          return e.depCount++, { type: 9, options: m(t.options) };
        }
        visitAnimateRef(t, e) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, e),
            options: m(t.options),
          };
        }
        visitQuery(t, e) {
          const o = e.currentQuerySelector,
            l = t.options || {};
          e.queryCount++, (e.currentQuery = t);
          const [f, p] = (function s(r) {
            const t = !!r.split(/\s*,\s*/).find((e) => ':self' == e);
            return (
              t && (r = r.replace(mC, '')),
              (r = r
                .replace(/@\*/g, xi)
                .replace(/@\w+/g, (e) => xi + '-' + e.slice(1))
                .replace(/:animating/g, bl)),
              [r, t]
            );
          })(t.selector);
          (e.currentQuerySelector = o.length ? o + ' ' + f : f),
            Fn(e.collectedStyles, e.currentQuerySelector, new Map());
          const y = zn(this, yl(t.animation), e);
          return (
            (e.currentQuery = null),
            (e.currentQuerySelector = o),
            {
              type: 11,
              selector: f,
              limit: l.limit || 0,
              optional: !!l.optional,
              includeSelf: p,
              animation: y,
              originalSelector: t.selector,
              options: m(t.options),
            }
          );
        }
        visitStagger(t, e) {
          e.currentQuery ||
            e.errors.push(
              (function nw() {
                return new d.vHH(3013, !1);
              })()
            );
          const o =
            'full' === t.timings
              ? { duration: 0, delay: 0, easing: 'full' }
              : zs(t.timings, e.errors, !0);
          return {
            type: 12,
            animation: zn(this, yl(t.animation), e),
            timings: o,
            options: null,
          };
        }
      }
      class c {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function m(r) {
        return (
          r
            ? (r = Vr(r)).params &&
              (r.params = (function a(r) {
                return r ? Vr(r) : null;
              })(r.params))
            : (r = {}),
          r
        );
      }
      function _(r, t, e) {
        return { duration: r, delay: t, easing: e };
      }
      function v(r, t, e, o, l, f, p = null, y = !1) {
        return {
          type: 1,
          element: r,
          keyframes: t,
          preStyleProps: e,
          postStyleProps: o,
          duration: l,
          delay: f,
          totalTime: l + f,
          easing: p,
          subTimeline: y,
        };
      }
      class x {
        constructor() {
          this._map = new Map();
        }
        get(t) {
          return this._map.get(t) || [];
        }
        append(t, e) {
          let o = this._map.get(t);
          o || this._map.set(t, (o = [])), o.push(...e);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const O = new RegExp(':enter', 'g'),
        W = new RegExp(':leave', 'g');
      function ie(r, t, e, o, l, f = new Map(), p = new Map(), y, D, S = []) {
        return new be().buildKeyframes(r, t, e, o, l, f, p, y, D, S);
      }
      class be {
        buildKeyframes(t, e, o, l, f, p, y, D, S, R = []) {
          S = S || new x();
          const B = new z(t, e, S, l, f, R, []);
          B.options = D;
          const ae = D.delay ? ui(D.delay) : 0;
          B.currentTimeline.delayNextStep(ae),
            B.currentTimeline.setStyles([p], null, B.errors, D),
            zn(this, o, B);
          const se = B.timelines.filter((Q) => Q.containsAnimation());
          if (se.length && y.size) {
            let Q;
            for (let ce = se.length - 1; ce >= 0; ce--) {
              const ze = se[ce];
              if (ze.element === e) {
                Q = ze;
                break;
              }
            }
            Q &&
              !Q.allowOnlyTimelineStyles() &&
              Q.setStyles([y], null, B.errors, D);
          }
          return se.length
            ? se.map((Q) => Q.buildKeyframes())
            : [v(e, [], [], [], 0, ae, '', !1)];
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const o = e.subInstructions.get(e.element);
          if (o) {
            const l = e.createSubContext(t.options),
              f = e.currentTimeline.currentTime,
              p = this._visitSubInstructions(o, l, l.options);
            f != p && e.transformIntoNewTimeline(p);
          }
          e.previousNode = t;
        }
        visitAnimateRef(t, e) {
          const o = e.createSubContext(t.options);
          o.transformIntoNewTimeline(),
            this._applyAnimationRefDelays(
              [t.options, t.animation.options],
              e,
              o
            ),
            this.visitReference(t.animation, o),
            e.transformIntoNewTimeline(o.currentTimeline.currentTime),
            (e.previousNode = t);
        }
        _applyAnimationRefDelays(t, e, o) {
          for (const l of t) {
            const f = l?.delay;
            if (f) {
              const p =
                'number' == typeof f ? f : ui(vl(f, l?.params ?? {}, e.errors));
              o.delayNextStep(p);
            }
          }
        }
        _visitSubInstructions(t, e, o) {
          let f = e.currentTimeline.currentTime;
          const p = null != o.duration ? ui(o.duration) : null,
            y = null != o.delay ? ui(o.delay) : null;
          return (
            0 !== p &&
              t.forEach((D) => {
                const S = e.appendInstructionToTimeline(D, p, y);
                f = Math.max(f, S.duration + S.delay);
              }),
            f
          );
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0),
            zn(this, t.animation, e),
            (e.previousNode = t);
        }
        visitSequence(t, e) {
          const o = e.subContextCount;
          let l = e;
          const f = t.options;
          if (
            f &&
            (f.params || f.delay) &&
            ((l = e.createSubContext(f)),
            l.transformIntoNewTimeline(),
            null != f.delay)
          ) {
            6 == l.previousNode.type &&
              (l.currentTimeline.snapshotCurrentStyles(),
              (l.previousNode = Ae));
            const p = ui(f.delay);
            l.delayNextStep(p);
          }
          t.steps.length &&
            (t.steps.forEach((p) => zn(this, p, l)),
            l.currentTimeline.applyStylesToKeyframe(),
            l.subContextCount > o && l.transformIntoNewTimeline()),
            (e.previousNode = t);
        }
        visitGroup(t, e) {
          const o = [];
          let l = e.currentTimeline.currentTime;
          const f = t.options && t.options.delay ? ui(t.options.delay) : 0;
          t.steps.forEach((p) => {
            const y = e.createSubContext(t.options);
            f && y.delayNextStep(f),
              zn(this, p, y),
              (l = Math.max(l, y.currentTimeline.currentTime)),
              o.push(y.currentTimeline);
          }),
            o.forEach((p) => e.currentTimeline.mergeTimelineCollectedStyles(p)),
            e.transformIntoNewTimeline(l),
            (e.previousNode = t);
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const o = t.strValue;
            return zs(e.params ? vl(o, e.params, e.errors) : o, e.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, e) {
          const o = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
            l = e.currentTimeline;
          o.delay && (e.incrementTime(o.delay), l.snapshotCurrentStyles());
          const f = t.style;
          5 == f.type
            ? this.visitKeyframes(f, e)
            : (e.incrementTime(o.duration),
              this.visitStyle(f, e),
              l.applyStylesToKeyframe()),
            (e.currentAnimateTimings = null),
            (e.previousNode = t);
        }
        visitStyle(t, e) {
          const o = e.currentTimeline,
            l = e.currentAnimateTimings;
          !l && o.hasCurrentStyleProperties() && o.forwardFrame();
          const f = (l && l.easing) || t.easing;
          t.isEmptyStep
            ? o.applyEmptyStep(f)
            : o.setStyles(t.styles, f, e.errors, e.options),
            (e.previousNode = t);
        }
        visitKeyframes(t, e) {
          const o = e.currentAnimateTimings,
            l = e.currentTimeline.duration,
            f = o.duration,
            y = e.createSubContext().currentTimeline;
          (y.easing = o.easing),
            t.styles.forEach((D) => {
              y.forwardTime((D.offset || 0) * f),
                y.setStyles(D.styles, D.easing, e.errors, e.options),
                y.applyStylesToKeyframe();
            }),
            e.currentTimeline.mergeTimelineCollectedStyles(y),
            e.transformIntoNewTimeline(l + f),
            (e.previousNode = t);
        }
        visitQuery(t, e) {
          const o = e.currentTimeline.currentTime,
            l = t.options || {},
            f = l.delay ? ui(l.delay) : 0;
          f &&
            (6 === e.previousNode.type ||
              (0 == o && e.currentTimeline.hasCurrentStyleProperties())) &&
            (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = Ae));
          let p = o;
          const y = e.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!l.optional,
            e.errors
          );
          e.currentQueryTotal = y.length;
          let D = null;
          y.forEach((S, R) => {
            e.currentQueryIndex = R;
            const B = e.createSubContext(t.options, S);
            f && B.delayNextStep(f),
              S === e.element && (D = B.currentTimeline),
              zn(this, t.animation, B),
              B.currentTimeline.applyStylesToKeyframe(),
              (p = Math.max(p, B.currentTimeline.currentTime));
          }),
            (e.currentQueryIndex = 0),
            (e.currentQueryTotal = 0),
            e.transformIntoNewTimeline(p),
            D &&
              (e.currentTimeline.mergeTimelineCollectedStyles(D),
              e.currentTimeline.snapshotCurrentStyles()),
            (e.previousNode = t);
        }
        visitStagger(t, e) {
          const o = e.parentContext,
            l = e.currentTimeline,
            f = t.timings,
            p = Math.abs(f.duration),
            y = p * (e.currentQueryTotal - 1);
          let D = p * e.currentQueryIndex;
          switch (f.duration < 0 ? 'reverse' : f.easing) {
            case 'reverse':
              D = y - D;
              break;
            case 'full':
              D = o.currentStaggerTime;
          }
          const R = e.currentTimeline;
          D && R.delayNextStep(D);
          const B = R.currentTime;
          zn(this, t.animation, e),
            (e.previousNode = t),
            (o.currentStaggerTime =
              l.currentTime - B + (l.startTime - o.currentTimeline.startTime));
        }
      }
      const Ae = {};
      class z {
        constructor(t, e, o, l, f, p, y, D) {
          (this._driver = t),
            (this.element = e),
            (this.subInstructions = o),
            (this._enterClassName = l),
            (this._leaveClassName = f),
            (this.errors = p),
            (this.timelines = y),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Ae),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = D || new Ve(this._driver, e, 0)),
            y.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, e) {
          if (!t) return;
          const o = t;
          let l = this.options;
          null != o.duration && (l.duration = ui(o.duration)),
            null != o.delay && (l.delay = ui(o.delay));
          const f = o.params;
          if (f) {
            let p = l.params;
            p || (p = this.options.params = {}),
              Object.keys(f).forEach((y) => {
                (!e || !p.hasOwnProperty(y)) &&
                  (p[y] = vl(f[y], p, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const o = (t.params = {});
              Object.keys(e).forEach((l) => {
                o[l] = e[l];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, e, o) {
          const l = e || this.element,
            f = new z(
              this._driver,
              l,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(l, o || 0)
            );
          return (
            (f.previousNode = this.previousNode),
            (f.currentAnimateTimings = this.currentAnimateTimings),
            (f.options = this._copyOptions()),
            f.updateOptions(t),
            (f.currentQueryIndex = this.currentQueryIndex),
            (f.currentQueryTotal = this.currentQueryTotal),
            (f.parentContext = this),
            this.subContextCount++,
            f
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = Ae),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, e, o) {
          const l = {
              duration: e ?? t.duration,
              delay: this.currentTimeline.currentTime + (o ?? 0) + t.delay,
              easing: '',
            },
            f = new Et(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              l,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(f), l;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, e, o, l, f, p) {
          let y = [];
          if ((l && y.push(this.element), t.length > 0)) {
            t = (t = t.replace(O, '.' + this._enterClassName)).replace(
              W,
              '.' + this._leaveClassName
            );
            let S = this._driver.query(this.element, t, 1 != o);
            0 !== o &&
              (S = o < 0 ? S.slice(S.length + o, S.length) : S.slice(0, o)),
              y.push(...S);
          }
          return (
            !f &&
              0 == y.length &&
              p.push(
                (function a_(r) {
                  return new d.vHH(3014, !1);
                })()
              ),
            y
          );
        }
      }
      class Ve {
        constructor(t, e, o, l) {
          (this._driver = t),
            (this.element = e),
            (this.startTime = o),
            (this._elementTimelineStylesLookup = l),
            (this.duration = 0),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(e)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                e,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const e = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || e
            ? (this.forwardTime(this.currentTime + t),
              e && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, e) {
          return (
            this.applyStylesToKeyframe(),
            new Ve(
              this._driver,
              t,
              e || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, e) {
          this._localTimelineStyles.set(t, e),
            this._globalTimelineStyles.set(t, e),
            this._styleSummary.set(t, { time: this.currentTime, value: e });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && this._previousKeyframe.set('easing', t);
          for (let [e, o] of this._globalTimelineStyles)
            this._backFill.set(e, o || er), this._currentKeyframe.set(e, er);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(t, e, o, l) {
          e && this._previousKeyframe.set('easing', e);
          const f = (l && l.params) || {},
            p = (function gC(r, t) {
              const e = new Map();
              let o;
              return (
                r.forEach((l) => {
                  if ('*' === l) {
                    o = o || t.keys();
                    for (let f of o) e.set(f, er);
                  } else To(l, e);
                }),
                e
              );
            })(t, this._globalTimelineStyles);
          for (let [y, D] of p) {
            const S = vl(D, f, o);
            this._pendingStyles.set(y, S),
              this._localTimelineStyles.has(y) ||
                this._backFill.set(y, this._globalTimelineStyles.get(y) ?? er),
              this._updateStyle(y, S);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((t, e) => {
              this._currentKeyframe.set(e, t);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((t, e) => {
              this._currentKeyframe.has(e) || this._currentKeyframe.set(e, t);
            }));
        }
        snapshotCurrentStyles() {
          for (let [t, e] of this._localTimelineStyles)
            this._pendingStyles.set(t, e), this._updateStyle(t, e);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          t._styleSummary.forEach((e, o) => {
            const l = this._styleSummary.get(o);
            (!l || e.time > l.time) && this._updateStyle(o, e.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            e = new Set(),
            o = 1 === this._keyframes.size && 0 === this.duration;
          let l = [];
          this._keyframes.forEach((y, D) => {
            const S = To(y, new Map(), this._backFill);
            S.forEach((R, B) => {
              '!' === R ? t.add(B) : R === er && e.add(B);
            }),
              o || S.set('offset', D / this.duration),
              l.push(S);
          });
          const f = t.size ? ad(t.values()) : [],
            p = e.size ? ad(e.values()) : [];
          if (o) {
            const y = l[0],
              D = new Map(y);
            y.set('offset', 0), D.set('offset', 1), (l = [y, D]);
          }
          return v(
            this.element,
            l,
            f,
            p,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class Et extends Ve {
        constructor(t, e, o, l, f, p, y = !1) {
          super(t, e, p.delay),
            (this.keyframes = o),
            (this.preStyleProps = l),
            (this.postStyleProps = f),
            (this._stretchStartingKeyframe = y),
            (this.timings = {
              duration: p.duration,
              delay: p.delay,
              easing: p.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: e, duration: o, easing: l } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const f = [],
              p = o + e,
              y = e / p,
              D = To(t[0]);
            D.set('offset', 0), f.push(D);
            const S = To(t[0]);
            S.set('offset', Rt(y)), f.push(S);
            const R = t.length - 1;
            for (let B = 1; B <= R; B++) {
              let ae = To(t[B]);
              const se = ae.get('offset');
              ae.set('offset', Rt((e + se * o) / p)), f.push(ae);
            }
            (o = p), (e = 0), (l = ''), (t = f);
          }
          return v(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            o,
            e,
            l,
            !0
          );
        }
      }
      function Rt(r, t = 3) {
        const e = Math.pow(10, t - 1);
        return Math.round(r * e) / e;
      }
      class Cw {}
      const lE = new Set([
        'width',
        'height',
        'minWidth',
        'minHeight',
        'maxWidth',
        'maxHeight',
        'left',
        'top',
        'bottom',
        'right',
        'fontSize',
        'outlineWidth',
        'outlineOffset',
        'paddingTop',
        'paddingLeft',
        'paddingBottom',
        'paddingRight',
        'marginTop',
        'marginLeft',
        'marginBottom',
        'marginRight',
        'borderRadius',
        'borderWidth',
        'borderTopWidth',
        'borderLeftWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'textIndent',
        'perspective',
      ]);
      class cE extends Cw {
        normalizePropertyName(t, e) {
          return wl(t);
        }
        normalizeStyleValue(t, e, o, l) {
          let f = '';
          const p = o.toString().trim();
          if (lE.has(e) && 0 !== o && '0' !== o)
            if ('number' == typeof o) f = 'px';
            else {
              const y = o.match(/^[+-]?[\d\.]+([a-z]*)$/);
              y &&
                0 == y[1].length &&
                l.push(
                  (function Xf(r, t) {
                    return new d.vHH(3005, !1);
                  })()
                );
            }
          return p + f;
        }
      }
      function _C(r, t, e, o, l, f, p, y, D, S, R, B, ae) {
        return {
          type: 0,
          element: r,
          triggerName: t,
          isRemovalTransition: l,
          fromState: e,
          fromStyles: f,
          toState: o,
          toStyles: p,
          timelines: y,
          queriedElements: D,
          preStyleProps: S,
          postStyleProps: R,
          totalTime: B,
          errors: ae,
        };
      }
      const Ew = {};
      class bC {
        constructor(t, e, o) {
          (this._triggerName = t), (this.ast = e), (this._stateStyles = o);
        }
        match(t, e, o, l) {
          return (function dE(r, t, e, o, l) {
            return r.some((f) => f(t, e, o, l));
          })(this.ast.matchers, t, e, o, l);
        }
        buildStyles(t, e, o) {
          let l = this._stateStyles.get('*');
          return (
            void 0 !== t && (l = this._stateStyles.get(t?.toString()) || l),
            l ? l.buildStyles(e, o) : new Map()
          );
        }
        build(t, e, o, l, f, p, y, D, S, R) {
          const B = [],
            ae = (this.ast.options && this.ast.options.params) || Ew,
            Q = this.buildStyles(o, (y && y.params) || Ew, B),
            ce = (D && D.params) || Ew,
            ze = this.buildStyles(l, ce, B),
            Ye = new Set(),
            yt = new Map(),
            on = new Map(),
            sn = 'void' === l,
            ud = { params: uE(ce, ae), delay: this.ast.options?.delay },
            Br = R ? [] : ie(t, e, this.ast.animation, f, p, Q, ze, ud, S, B);
          let Gn = 0;
          if (
            (Br.forEach((Ro) => {
              Gn = Math.max(Ro.duration + Ro.delay, Gn);
            }),
            B.length)
          )
            return _C(
              e,
              this._triggerName,
              o,
              l,
              sn,
              Q,
              ze,
              [],
              [],
              yt,
              on,
              Gn,
              B
            );
          Br.forEach((Ro) => {
            const Oo = Ro.element,
              PC = Fn(yt, Oo, new Set());
            Ro.preStyleProps.forEach((Dl) => PC.add(Dl));
            const bh = Fn(on, Oo, new Set());
            Ro.postStyleProps.forEach((Dl) => bh.add(Dl)),
              Oo !== e && Ye.add(Oo);
          });
          const Fo = ad(Ye.values());
          return _C(e, this._triggerName, o, l, sn, Q, ze, Br, Fo, yt, on, Gn);
        }
      }
      function uE(r, t) {
        const e = Vr(t);
        for (const o in r) r.hasOwnProperty(o) && null != r[o] && (e[o] = r[o]);
        return e;
      }
      class fE {
        constructor(t, e, o) {
          (this.styles = t), (this.defaultParams = e), (this.normalizer = o);
        }
        buildStyles(t, e) {
          const o = new Map(),
            l = Vr(this.defaultParams);
          return (
            Object.keys(t).forEach((f) => {
              const p = t[f];
              null !== p && (l[f] = p);
            }),
            this.styles.styles.forEach((f) => {
              'string' != typeof f &&
                f.forEach((p, y) => {
                  p && (p = vl(p, l, e));
                  const D = this.normalizer.normalizePropertyName(y, e);
                  (p = this.normalizer.normalizeStyleValue(y, D, p, e)),
                    o.set(y, p);
                });
            }),
            o
          );
        }
      }
      class pE {
        constructor(t, e, o) {
          (this.name = t),
            (this.ast = e),
            (this._normalizer = o),
            (this.transitionFactories = []),
            (this.states = new Map()),
            e.states.forEach((l) => {
              this.states.set(
                l.name,
                new fE(l.style, (l.options && l.options.params) || {}, o)
              );
            }),
            yC(this.states, 'true', '1'),
            yC(this.states, 'false', '0'),
            e.transitions.forEach((l) => {
              this.transitionFactories.push(new bC(t, l, this.states));
            }),
            (this.fallbackTransition = (function mE(r, t, e) {
              return new bC(
                r,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(p, y) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                t
              );
            })(t, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, e, o, l) {
          return (
            this.transitionFactories.find((p) => p.match(t, e, o, l)) || null
          );
        }
        matchStyles(t, e, o) {
          return this.fallbackTransition.buildStyles(t, e, o);
        }
      }
      function yC(r, t, e) {
        r.has(t)
          ? r.has(e) || r.set(e, r.get(t))
          : r.has(e) && r.set(t, r.get(e));
      }
      const gE = new x();
      class _E {
        constructor(t, e, o) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = o),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(t, e) {
          const o = [],
            f = w_(this._driver, e, o, []);
          if (o.length)
            throw (function d_(r) {
              return new d.vHH(3503, !1);
            })();
          this._animations.set(t, f);
        }
        _buildPlayer(t, e, o) {
          const l = t.element,
            f = ed(0, this._normalizer, 0, t.keyframes, e, o);
          return this._driver.animate(
            l,
            f,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, e, o = {}) {
          const l = [],
            f = this._animations.get(t);
          let p;
          const y = new Map();
          if (
            (f
              ? ((p = ie(
                  this._driver,
                  e,
                  f,
                  oh,
                  od,
                  new Map(),
                  new Map(),
                  o,
                  gE,
                  l
                )),
                p.forEach((R) => {
                  const B = Fn(y, R.element, new Map());
                  R.postStyleProps.forEach((ae) => B.set(ae, null));
                }))
              : (l.push(
                  (function th() {
                    return new d.vHH(3300, !1);
                  })()
                ),
                (p = [])),
            l.length)
          )
            throw (function nr(r) {
              return new d.vHH(3504, !1);
            })();
          y.forEach((R, B) => {
            R.forEach((ae, se) => {
              R.set(se, this._driver.computeStyle(B, se, er));
            });
          });
          const S = Ao(
            p.map((R) => {
              const B = y.get(R.element);
              return this._buildPlayer(R, new Map(), B);
            })
          );
          return (
            this._playersById.set(t, S),
            S.onDestroy(() => this.destroy(t)),
            this.players.push(S),
            S
          );
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), this._playersById.delete(t);
          const o = this.players.indexOf(e);
          o >= 0 && this.players.splice(o, 1);
        }
        _getPlayer(t) {
          const e = this._playersById.get(t);
          if (!e)
            throw (function ow(r) {
              return new d.vHH(3301, !1);
            })();
          return e;
        }
        listen(t, e, o, l) {
          const f = id(e, '', '', '');
          return td(this._getPlayer(t), o, f, l), () => {};
        }
        command(t, e, o, l) {
          if ('register' == o) return void this.register(t, l[0]);
          if ('create' == o) return void this.create(t, e, l[0] || {});
          const f = this._getPlayer(t);
          switch (o) {
            case 'play':
              f.play();
              break;
            case 'pause':
              f.pause();
              break;
            case 'reset':
              f.reset();
              break;
            case 'restart':
              f.restart();
              break;
            case 'finish':
              f.finish();
              break;
            case 'init':
              f.init();
              break;
            case 'setPosition':
              f.setPosition(parseFloat(l[0]));
              break;
            case 'destroy':
              this.destroy(t);
          }
        }
      }
      const vC = 'ng-animate-queued',
        Mw = 'ng-animate-disabled',
        DE = [],
        wC = {
          namespaceId: '',
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        xE = {
          namespaceId: '',
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        Ei = '__ng_removed';
      class Sw {
        get params() {
          return this.options.params;
        }
        constructor(t, e = '') {
          this.namespaceId = e;
          const o = t && t.hasOwnProperty('value');
          if (
            ((this.value = (function SE(r) {
              return r ?? null;
            })(o ? t.value : t)),
            o)
          ) {
            const f = Vr(t);
            delete f.value, (this.options = f);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const o = this.options.params;
            Object.keys(e).forEach((l) => {
              null == o[l] && (o[l] = e[l]);
            });
          }
        }
      }
      const _h = 'void',
        Aw = new Sw(_h);
      class CE {
        constructor(t, e, o) {
          (this.id = t),
            (this.hostElement = e),
            (this._engine = o),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = 'ng-tns-' + t),
            Mi(e, this._hostClassName);
        }
        listen(t, e, o, l) {
          if (!this._triggers.has(e))
            throw (function sC(r, t) {
              return new d.vHH(3302, !1);
            })();
          if (null == o || 0 == o.length)
            throw (function sw(r) {
              return new d.vHH(3303, !1);
            })();
          if (
            !(function AE(r) {
              return 'start' == r || 'done' == r;
            })(o)
          )
            throw (function aw(r, t) {
              return new d.vHH(3400, !1);
            })();
          const f = Fn(this._elementListeners, t, []),
            p = { name: e, phase: o, callback: l };
          f.push(p);
          const y = Fn(this._engine.statesByElement, t, new Map());
          return (
            y.has(e) || (Mi(t, _l), Mi(t, _l + '-' + e), y.set(e, Aw)),
            () => {
              this._engine.afterFlush(() => {
                const D = f.indexOf(p);
                D >= 0 && f.splice(D, 1), this._triggers.has(e) || y.delete(e);
              });
            }
          );
        }
        register(t, e) {
          return !this._triggers.has(t) && (this._triggers.set(t, e), !0);
        }
        _getTrigger(t) {
          const e = this._triggers.get(t);
          if (!e)
            throw (function lw(r) {
              return new d.vHH(3401, !1);
            })();
          return e;
        }
        trigger(t, e, o, l = !0) {
          const f = this._getTrigger(e),
            p = new Tw(this.id, e, t);
          let y = this._engine.statesByElement.get(t);
          y ||
            (Mi(t, _l),
            Mi(t, _l + '-' + e),
            this._engine.statesByElement.set(t, (y = new Map())));
          let D = y.get(e);
          const S = new Sw(o, this.id);
          if (
            (!(o && o.hasOwnProperty('value')) &&
              D &&
              S.absorbOptions(D.options),
            y.set(e, S),
            D || (D = Aw),
            S.value !== _h && D.value === S.value)
          ) {
            if (
              !(function FE(r, t) {
                const e = Object.keys(r),
                  o = Object.keys(t);
                if (e.length != o.length) return !1;
                for (let l = 0; l < e.length; l++) {
                  const f = e[l];
                  if (!t.hasOwnProperty(f) || r[f] !== t[f]) return !1;
                }
                return !0;
              })(D.params, S.params)
            ) {
              const ce = [],
                ze = f.matchStyles(D.value, D.params, ce),
                Ye = f.matchStyles(S.value, S.params, ce);
              ce.length
                ? this._engine.reportError(ce)
                : this._engine.afterFlush(() => {
                    Io(t, ze), Ci(t, Ye);
                  });
            }
            return;
          }
          const ae = Fn(this._engine.playersByElement, t, []);
          ae.forEach((ce) => {
            ce.namespaceId == this.id &&
              ce.triggerName == e &&
              ce.queued &&
              ce.destroy();
          });
          let se = f.matchTransition(D.value, S.value, t, S.params),
            Q = !1;
          if (!se) {
            if (!l) return;
            (se = f.fallbackTransition), (Q = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: e,
              transition: se,
              fromState: D,
              toState: S,
              player: p,
              isFallbackTransition: Q,
            }),
            Q ||
              (Mi(t, vC),
              p.onStart(() => {
                ld(t, vC);
              })),
            p.onDone(() => {
              let ce = this.players.indexOf(p);
              ce >= 0 && this.players.splice(ce, 1);
              const ze = this._engine.playersByElement.get(t);
              if (ze) {
                let Ye = ze.indexOf(p);
                Ye >= 0 && ze.splice(Ye, 1);
              }
            }),
            this.players.push(p),
            ae.push(p),
            p
          );
        }
        deregister(t) {
          this._triggers.delete(t),
            this._engine.statesByElement.forEach((e) => e.delete(t)),
            this._elementListeners.forEach((e, o) => {
              this._elementListeners.set(
                o,
                e.filter((l) => l.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e &&
            (e.forEach((o) => o.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, e) {
          const o = this._engine.driver.query(t, xi, !0);
          o.forEach((l) => {
            if (l[Ei]) return;
            const f = this._engine.fetchNamespacesByElement(l);
            f.size
              ? f.forEach((p) => p.triggerLeaveAnimation(l, e, !1, !0))
              : this.clearElementCache(l);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              o.forEach((l) => this.clearElementCache(l))
            );
        }
        triggerLeaveAnimation(t, e, o, l) {
          const f = this._engine.statesByElement.get(t),
            p = new Map();
          if (f) {
            const y = [];
            if (
              (f.forEach((D, S) => {
                if ((p.set(S, D.value), this._triggers.has(S))) {
                  const R = this.trigger(t, S, _h, l);
                  R && y.push(R);
                }
              }),
              y.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, e, p),
                o && Ao(y).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t),
            o = this._engine.statesByElement.get(t);
          if (e && o) {
            const l = new Set();
            e.forEach((f) => {
              const p = f.name;
              if (l.has(p)) return;
              l.add(p);
              const D = this._triggers.get(p).fallbackTransition,
                S = o.get(p) || Aw,
                R = new Sw(_h),
                B = new Tw(this.id, p, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: p,
                  transition: D,
                  fromState: S,
                  toState: R,
                  player: B,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, e) {
          const o = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, e),
            this.triggerLeaveAnimation(t, e, !0))
          )
            return;
          let l = !1;
          if (o.totalAnimations) {
            const f = o.players.length ? o.playersByQueriedElement.get(t) : [];
            if (f && f.length) l = !0;
            else {
              let p = t;
              for (; (p = p.parentNode); )
                if (o.statesByElement.get(p)) {
                  l = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), l))
            o.markElementAsRemoved(this.id, t, !1, e);
          else {
            const f = t[Ei];
            (!f || f === wC) &&
              (o.afterFlush(() => this.clearElementCache(t)),
              o.destroyInnerAnimations(t),
              o._onRemovalComplete(t, e));
          }
        }
        insertNode(t, e) {
          Mi(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const e = [];
          return (
            this._queue.forEach((o) => {
              const l = o.player;
              if (l.destroyed) return;
              const f = o.element,
                p = this._elementListeners.get(f);
              p &&
                p.forEach((y) => {
                  if (y.name == o.triggerName) {
                    const D = id(
                      f,
                      o.triggerName,
                      o.fromState.value,
                      o.toState.value
                    );
                    (D._data = t), td(o.player, y.phase, D, y.callback);
                  }
                }),
                l.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      l.destroy();
                    })
                  : e.push(o);
            }),
            (this._queue = []),
            e.sort((o, l) => {
              const f = o.transition.ast.depCount,
                p = l.transition.ast.depCount;
              return 0 == f || 0 == p
                ? f - p
                : this._engine.driver.containsElement(o.element, l.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((e) => e.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let e = !1;
          return (
            this._elementListeners.has(t) && (e = !0),
            (e = !!this._queue.find((o) => o.element === t) || e),
            e
          );
        }
      }
      class EE {
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e);
        }
        constructor(t, e, o) {
          (this.bodyNode = t),
            (this.driver = e),
            (this._normalizer = o),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (l, f) => {});
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((e) => {
              e.players.forEach((o) => {
                o.queued && t.push(o);
              });
            }),
            t
          );
        }
        createNamespace(t, e) {
          const o = new CE(t, e, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, e)
              ? this._balanceNamespaceList(o, e)
              : (this.newHostElements.set(e, o), this.collectEnterElement(e)),
            (this._namespaceLookup[t] = o)
          );
        }
        _balanceNamespaceList(t, e) {
          const o = this._namespaceList,
            l = this.namespacesByHostElement;
          if (o.length - 1 >= 0) {
            let p = !1,
              y = this.driver.getParentElement(e);
            for (; y; ) {
              const D = l.get(y);
              if (D) {
                const S = o.indexOf(D);
                o.splice(S + 1, 0, t), (p = !0);
                break;
              }
              y = this.driver.getParentElement(y);
            }
            p || o.unshift(t);
          } else o.push(t);
          return l.set(e, t), t;
        }
        register(t, e) {
          let o = this._namespaceLookup[t];
          return o || (o = this.createNamespace(t, e)), o;
        }
        registerTrigger(t, e, o) {
          let l = this._namespaceLookup[t];
          l && l.register(e, o) && this.totalAnimations++;
        }
        destroy(t, e) {
          if (!t) return;
          const o = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(o.hostElement),
              delete this._namespaceLookup[t];
            const l = this._namespaceList.indexOf(o);
            l >= 0 && this._namespaceList.splice(l, 1);
          }),
            this.afterFlushAnimationsDone(() => o.destroy(e));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const e = new Set(),
            o = this.statesByElement.get(t);
          if (o)
            for (let l of o.values())
              if (l.namespaceId) {
                const f = this._fetchNamespace(l.namespaceId);
                f && e.add(f);
              }
          return e;
        }
        trigger(t, e, o, l) {
          if (D_(e)) {
            const f = this._fetchNamespace(t);
            if (f) return f.trigger(e, o, l), !0;
          }
          return !1;
        }
        insertNode(t, e, o, l) {
          if (!D_(e)) return;
          const f = e[Ei];
          if (f && f.setForRemoval) {
            (f.setForRemoval = !1), (f.setForMove = !0);
            const p = this.collectedLeaveElements.indexOf(e);
            p >= 0 && this.collectedLeaveElements.splice(p, 1);
          }
          if (t) {
            const p = this._fetchNamespace(t);
            p && p.insertNode(e, o);
          }
          l && this.collectEnterElement(e);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, e) {
          e
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), Mi(t, Mw))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), ld(t, Mw));
        }
        removeNode(t, e, o, l) {
          if (D_(e)) {
            const f = t ? this._fetchNamespace(t) : null;
            if (
              (f ? f.removeNode(e, l) : this.markElementAsRemoved(t, e, !1, l),
              o)
            ) {
              const p = this.namespacesByHostElement.get(e);
              p && p.id !== t && p.removeNode(e, l);
            }
          } else this._onRemovalComplete(e, l);
        }
        markElementAsRemoved(t, e, o, l, f) {
          this.collectedLeaveElements.push(e),
            (e[Ei] = {
              namespaceId: t,
              setForRemoval: l,
              hasAnimation: o,
              removedBeforeQueried: !1,
              previousTriggersValues: f,
            });
        }
        listen(t, e, o, l, f) {
          return D_(e) ? this._fetchNamespace(t).listen(e, o, l, f) : () => {};
        }
        _buildInstruction(t, e, o, l, f) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            o,
            l,
            t.fromState.options,
            t.toState.options,
            e,
            f
          );
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, xi, !0);
          e.forEach((o) => this.destroyActiveAnimationsForElement(o)),
            0 != this.playersByQueriedElement.size &&
              ((e = this.driver.query(t, bl, !0)),
              e.forEach((o) => this.finishActiveQueriedAnimationOnElement(o)));
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e &&
            e.forEach((o) => {
              o.queued ? (o.markedForDestroy = !0) : o.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach((o) => o.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return Ao(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const e = t[Ei];
          if (e && e.setForRemoval) {
            if (((t[Ei] = wC), e.namespaceId)) {
              this.destroyInnerAnimations(t);
              const o = this._fetchNamespace(e.namespaceId);
              o && o.clearElementCache(t);
            }
            this._onRemovalComplete(t, e.setForRemoval);
          }
          t.classList?.contains(Mw) && this.markElementAsDisabled(t, !1),
            this.driver.query(t, '.ng-animate-disabled', !0).forEach((o) => {
              this.markElementAsDisabled(o, !1);
            });
        }
        flush(t = -1) {
          let e = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((o, l) =>
                this._balanceNamespaceList(o, l)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let o = 0; o < this.collectedEnterElements.length; o++)
              Mi(this.collectedEnterElements[o], 'ng-star-inserted');
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const o = [];
            try {
              e = this._flushAnimations(o, t);
            } finally {
              for (let l = 0; l < o.length; l++) o[l]();
            }
          } else
            for (let o = 0; o < this.collectedLeaveElements.length; o++)
              this.processLeaveNode(this.collectedLeaveElements[o]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((o) => o()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const o = this._whenQuietFns;
            (this._whenQuietFns = []),
              e.length
                ? Ao(e).onDone(() => {
                    o.forEach((l) => l());
                  })
                : o.forEach((l) => l());
          }
        }
        reportError(t) {
          throw (function cw(r) {
            return new d.vHH(3402, !1);
          })();
        }
        _flushAnimations(t, e) {
          const o = new x(),
            l = [],
            f = new Map(),
            p = [],
            y = new Map(),
            D = new Map(),
            S = new Map(),
            R = new Set();
          this.disabledNodes.forEach((we) => {
            R.add(we);
            const Re = this.driver.query(we, '.ng-animate-queued', !0);
            for (let Be = 0; Be < Re.length; Be++) R.add(Re[Be]);
          });
          const B = this.bodyNode,
            ae = Array.from(this.statesByElement.keys()),
            se = CC(ae, this.collectedEnterElements),
            Q = new Map();
          let ce = 0;
          se.forEach((we, Re) => {
            const Be = oh + ce++;
            Q.set(Re, Be), we.forEach((ft) => Mi(ft, Be));
          });
          const ze = [],
            Ye = new Set(),
            yt = new Set();
          for (let we = 0; we < this.collectedLeaveElements.length; we++) {
            const Re = this.collectedLeaveElements[we],
              Be = Re[Ei];
            Be &&
              Be.setForRemoval &&
              (ze.push(Re),
              Ye.add(Re),
              Be.hasAnimation
                ? this.driver
                    .query(Re, '.ng-star-inserted', !0)
                    .forEach((ft) => Ye.add(ft))
                : yt.add(Re));
          }
          const on = new Map(),
            sn = CC(ae, Array.from(Ye));
          sn.forEach((we, Re) => {
            const Be = od + ce++;
            on.set(Re, Be), we.forEach((ft) => Mi(ft, Be));
          }),
            t.push(() => {
              se.forEach((we, Re) => {
                const Be = Q.get(Re);
                we.forEach((ft) => ld(ft, Be));
              }),
                sn.forEach((we, Re) => {
                  const Be = on.get(Re);
                  we.forEach((ft) => ld(ft, Be));
                }),
                ze.forEach((we) => {
                  this.processLeaveNode(we);
                });
            });
          const ud = [],
            Br = [];
          for (let we = this._namespaceList.length - 1; we >= 0; we--)
            this._namespaceList[we].drainQueuedTransitions(e).forEach((Be) => {
              const ft = Be.player,
                hn = Be.element;
              if ((ud.push(ft), this.collectedEnterElements.length)) {
                const Rn = hn[Ei];
                if (Rn && Rn.setForMove) {
                  if (
                    Rn.previousTriggersValues &&
                    Rn.previousTriggersValues.has(Be.triggerName)
                  ) {
                    const xl = Rn.previousTriggersValues.get(Be.triggerName),
                      Si = this.statesByElement.get(Be.element);
                    if (Si && Si.has(Be.triggerName)) {
                      const E_ = Si.get(Be.triggerName);
                      (E_.value = xl), Si.set(Be.triggerName, E_);
                    }
                  }
                  return void ft.destroy();
                }
              }
              const Hr = !B || !this.driver.containsElement(B, hn),
                fi = on.get(hn),
                Gs = Q.get(hn),
                Bt = this._buildInstruction(Be, o, Gs, fi, Hr);
              if (Bt.errors && Bt.errors.length) return void Br.push(Bt);
              if (Hr)
                return (
                  ft.onStart(() => Io(hn, Bt.fromStyles)),
                  ft.onDestroy(() => Ci(hn, Bt.toStyles)),
                  void l.push(ft)
                );
              if (Be.isFallbackTransition)
                return (
                  ft.onStart(() => Io(hn, Bt.fromStyles)),
                  ft.onDestroy(() => Ci(hn, Bt.toStyles)),
                  void l.push(ft)
                );
              const LC = [];
              Bt.timelines.forEach((Rn) => {
                (Rn.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(Rn.element) || LC.push(Rn);
              }),
                (Bt.timelines = LC),
                o.append(hn, Bt.timelines),
                p.push({ instruction: Bt, player: ft, element: hn }),
                Bt.queriedElements.forEach((Rn) => Fn(y, Rn, []).push(ft)),
                Bt.preStyleProps.forEach((Rn, xl) => {
                  if (Rn.size) {
                    let Si = D.get(xl);
                    Si || D.set(xl, (Si = new Set())),
                      Rn.forEach((E_, Rw) => Si.add(Rw));
                  }
                }),
                Bt.postStyleProps.forEach((Rn, xl) => {
                  let Si = S.get(xl);
                  Si || S.set(xl, (Si = new Set())),
                    Rn.forEach((E_, Rw) => Si.add(Rw));
                });
            });
          if (Br.length) {
            const we = [];
            Br.forEach((Re) => {
              we.push(
                (function aC(r, t) {
                  return new d.vHH(3505, !1);
                })()
              );
            }),
              ud.forEach((Re) => Re.destroy()),
              this.reportError(we);
          }
          const Gn = new Map(),
            Fo = new Map();
          p.forEach((we) => {
            const Re = we.element;
            o.has(Re) &&
              (Fo.set(Re, Re),
              this._beforeAnimationBuild(
                we.player.namespaceId,
                we.instruction,
                Gn
              ));
          }),
            l.forEach((we) => {
              const Re = we.element;
              this._getPreviousPlayers(
                Re,
                !1,
                we.namespaceId,
                we.triggerName,
                null
              ).forEach((ft) => {
                Fn(Gn, Re, []).push(ft), ft.destroy();
              });
            });
          const Ro = ze.filter((we) => MC(we, D, S)),
            Oo = new Map();
          xC(Oo, this.driver, yt, S, er).forEach((we) => {
            MC(we, D, S) && Ro.push(we);
          });
          const bh = new Map();
          se.forEach((we, Re) => {
            xC(bh, this.driver, new Set(we), D, '!');
          }),
            Ro.forEach((we) => {
              const Re = Oo.get(we),
                Be = bh.get(we);
              Oo.set(
                we,
                new Map([
                  ...Array.from(Re?.entries() ?? []),
                  ...Array.from(Be?.entries() ?? []),
                ])
              );
            });
          const Dl = [],
            NC = [],
            kC = {};
          p.forEach((we) => {
            const { element: Re, player: Be, instruction: ft } = we;
            if (o.has(Re)) {
              if (R.has(Re))
                return (
                  Be.onDestroy(() => Ci(Re, ft.toStyles)),
                  (Be.disabled = !0),
                  Be.overrideTotalTime(ft.totalTime),
                  void l.push(Be)
                );
              let hn = kC;
              if (Fo.size > 1) {
                let fi = Re;
                const Gs = [];
                for (; (fi = fi.parentNode); ) {
                  const Bt = Fo.get(fi);
                  if (Bt) {
                    hn = Bt;
                    break;
                  }
                  Gs.push(fi);
                }
                Gs.forEach((Bt) => Fo.set(Bt, hn));
              }
              const Hr = this._buildAnimation(
                Be.namespaceId,
                ft,
                Gn,
                f,
                bh,
                Oo
              );
              if ((Be.setRealPlayer(Hr), hn === kC)) Dl.push(Be);
              else {
                const fi = this.playersByElement.get(hn);
                fi && fi.length && (Be.parentPlayer = Ao(fi)), l.push(Be);
              }
            } else
              Io(Re, ft.fromStyles),
                Be.onDestroy(() => Ci(Re, ft.toStyles)),
                NC.push(Be),
                R.has(Re) && l.push(Be);
          }),
            NC.forEach((we) => {
              const Re = f.get(we.element);
              if (Re && Re.length) {
                const Be = Ao(Re);
                we.setRealPlayer(Be);
              }
            }),
            l.forEach((we) => {
              we.parentPlayer
                ? we.syncPlayerEvents(we.parentPlayer)
                : we.destroy();
            });
          for (let we = 0; we < ze.length; we++) {
            const Re = ze[we],
              Be = Re[Ei];
            if ((ld(Re, od), Be && Be.hasAnimation)) continue;
            let ft = [];
            if (y.size) {
              let Hr = y.get(Re);
              Hr && Hr.length && ft.push(...Hr);
              let fi = this.driver.query(Re, bl, !0);
              for (let Gs = 0; Gs < fi.length; Gs++) {
                let Bt = y.get(fi[Gs]);
                Bt && Bt.length && ft.push(...Bt);
              }
            }
            const hn = ft.filter((Hr) => !Hr.destroyed);
            hn.length ? TE(this, Re, hn) : this.processLeaveNode(Re);
          }
          return (
            (ze.length = 0),
            Dl.forEach((we) => {
              this.players.push(we),
                we.onDone(() => {
                  we.destroy();
                  const Re = this.players.indexOf(we);
                  this.players.splice(Re, 1);
                }),
                we.play();
            }),
            Dl
          );
        }
        elementContainsData(t, e) {
          let o = !1;
          const l = e[Ei];
          return (
            l && l.setForRemoval && (o = !0),
            this.playersByElement.has(e) && (o = !0),
            this.playersByQueriedElement.has(e) && (o = !0),
            this.statesByElement.has(e) && (o = !0),
            this._fetchNamespace(t).elementContainsData(e) || o
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, e, o, l, f) {
          let p = [];
          if (e) {
            const y = this.playersByQueriedElement.get(t);
            y && (p = y);
          } else {
            const y = this.playersByElement.get(t);
            if (y) {
              const D = !f || f == _h;
              y.forEach((S) => {
                S.queued || (!D && S.triggerName != l) || p.push(S);
              });
            }
          }
          return (
            (o || l) &&
              (p = p.filter(
                (y) => !((o && o != y.namespaceId) || (l && l != y.triggerName))
              )),
            p
          );
        }
        _beforeAnimationBuild(t, e, o) {
          const f = e.element,
            p = e.isRemovalTransition ? void 0 : t,
            y = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const D of e.timelines) {
            const S = D.element,
              R = S !== f,
              B = Fn(o, S, []);
            this._getPreviousPlayers(S, R, p, y, e.toState).forEach((se) => {
              const Q = se.getRealPlayer();
              Q.beforeDestroy && Q.beforeDestroy(), se.destroy(), B.push(se);
            });
          }
          Io(f, e.fromStyles);
        }
        _buildAnimation(t, e, o, l, f, p) {
          const y = e.triggerName,
            D = e.element,
            S = [],
            R = new Set(),
            B = new Set(),
            ae = e.timelines.map((Q) => {
              const ce = Q.element;
              R.add(ce);
              const ze = ce[Ei];
              if (ze && ze.removedBeforeQueried)
                return new cl(Q.duration, Q.delay);
              const Ye = ce !== D,
                yt = (function IE(r) {
                  const t = [];
                  return EC(r, t), t;
                })((o.get(ce) || DE).map((Gn) => Gn.getRealPlayer())).filter(
                  (Gn) => !!Gn.element && Gn.element === ce
                ),
                on = f.get(ce),
                sn = p.get(ce),
                ud = ed(0, this._normalizer, 0, Q.keyframes, on, sn),
                Br = this._buildPlayer(Q, ud, yt);
              if ((Q.subTimeline && l && B.add(ce), Ye)) {
                const Gn = new Tw(t, y, ce);
                Gn.setRealPlayer(Br), S.push(Gn);
              }
              return Br;
            });
          S.forEach((Q) => {
            Fn(this.playersByQueriedElement, Q.element, []).push(Q),
              Q.onDone(() =>
                (function ME(r, t, e) {
                  let o = r.get(t);
                  if (o) {
                    if (o.length) {
                      const l = o.indexOf(e);
                      o.splice(l, 1);
                    }
                    0 == o.length && r.delete(t);
                  }
                  return o;
                })(this.playersByQueriedElement, Q.element, Q)
              );
          }),
            R.forEach((Q) => Mi(Q, sh));
          const se = Ao(ae);
          return (
            se.onDestroy(() => {
              R.forEach((Q) => ld(Q, sh)), Ci(D, e.toStyles);
            }),
            B.forEach((Q) => {
              Fn(l, Q, []).push(se);
            }),
            se
          );
        }
        _buildPlayer(t, e, o) {
          return e.length > 0
            ? this.driver.animate(
                t.element,
                e,
                t.duration,
                t.delay,
                t.easing,
                o
              )
            : new cl(t.duration, t.delay);
        }
      }
      class Tw {
        constructor(t, e, o) {
          (this.namespaceId = t),
            (this.triggerName = e),
            (this.element = o),
            (this._player = new cl()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            this._queuedCallbacks.forEach((e, o) => {
              e.forEach((l) => td(t, o, void 0, l));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback('start')),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, e) {
          Fn(this._queuedCallbacks, t, []).push(e);
        }
        onDone(t) {
          this.queued && this._queueEvent('done', t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent('start', t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent('destroy', t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t);
        }
      }
      function D_(r) {
        return r && 1 === r.nodeType;
      }
      function DC(r, t) {
        const e = r.style.display;
        return (r.style.display = t ?? 'none'), e;
      }
      function xC(r, t, e, o, l) {
        const f = [];
        e.forEach((D) => f.push(DC(D)));
        const p = [];
        o.forEach((D, S) => {
          const R = new Map();
          D.forEach((B) => {
            const ae = t.computeStyle(S, B, l);
            R.set(B, ae), (!ae || 0 == ae.length) && ((S[Ei] = xE), p.push(S));
          }),
            r.set(S, R);
        });
        let y = 0;
        return e.forEach((D) => DC(D, f[y++])), p;
      }
      function CC(r, t) {
        const e = new Map();
        if ((r.forEach((y) => e.set(y, [])), 0 == t.length)) return e;
        const l = new Set(t),
          f = new Map();
        function p(y) {
          if (!y) return 1;
          let D = f.get(y);
          if (D) return D;
          const S = y.parentNode;
          return (D = e.has(S) ? S : l.has(S) ? 1 : p(S)), f.set(y, D), D;
        }
        return (
          t.forEach((y) => {
            const D = p(y);
            1 !== D && e.get(D).push(y);
          }),
          e
        );
      }
      function Mi(r, t) {
        r.classList?.add(t);
      }
      function ld(r, t) {
        r.classList?.remove(t);
      }
      function TE(r, t, e) {
        Ao(e).onDone(() => r.processLeaveNode(t));
      }
      function EC(r, t) {
        for (let e = 0; e < r.length; e++) {
          const o = r[e];
          o instanceof Vc ? EC(o.players, t) : t.push(o);
        }
      }
      function MC(r, t, e) {
        const o = e.get(r);
        if (!o) return !1;
        let l = t.get(r);
        return l ? o.forEach((f) => l.add(f)) : t.set(r, o), e.delete(r), !0;
      }
      class x_ {
        constructor(t, e, o) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = o),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (l, f) => {}),
            (this._transitionEngine = new EE(t, e, o)),
            (this._timelineEngine = new _E(t, e, o)),
            (this._transitionEngine.onRemovalComplete = (l, f) =>
              this.onRemovalComplete(l, f));
        }
        registerTrigger(t, e, o, l, f) {
          const p = t + '-' + l;
          let y = this._triggerCache[p];
          if (!y) {
            const D = [],
              R = w_(this._driver, f, D, []);
            if (D.length)
              throw (function eh(r, t) {
                return new d.vHH(3404, !1);
              })();
            (y = (function hE(r, t, e) {
              return new pE(r, t, e);
            })(l, R, this._normalizer)),
              (this._triggerCache[p] = y);
          }
          this._transitionEngine.registerTrigger(e, l, y);
        }
        register(t, e) {
          this._transitionEngine.register(t, e);
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e);
        }
        onInsert(t, e, o, l) {
          this._transitionEngine.insertNode(t, e, o, l);
        }
        onRemove(t, e, o, l) {
          this._transitionEngine.removeNode(t, e, l || !1, o);
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e);
        }
        process(t, e, o, l) {
          if ('@' == o.charAt(0)) {
            const [f, p] = nh(o);
            this._timelineEngine.command(f, e, p, l);
          } else this._transitionEngine.trigger(t, e, o, l);
        }
        listen(t, e, o, l, f) {
          if ('@' == o.charAt(0)) {
            const [p, y] = nh(o);
            return this._timelineEngine.listen(p, e, y, f);
          }
          return this._transitionEngine.listen(t, e, o, l, f);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      let OE = (() => {
        class r {
          constructor(e, o, l) {
            (this._element = e),
              (this._startStyles = o),
              (this._endStyles = l),
              (this._state = 0);
            let f = r.initialStylesByElement.get(e);
            f || r.initialStylesByElement.set(e, (f = new Map())),
              (this._initialStyles = f);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Ci(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Ci(this._element, this._initialStyles),
                this._endStyles &&
                  (Ci(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (r.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Io(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Io(this._element, this._endStyles),
                  (this._endStyles = null)),
                Ci(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (r.initialStylesByElement = new WeakMap()), r;
      })();
      function Iw(r) {
        let t = null;
        return (
          r.forEach((e, o) => {
            (function PE(r) {
              return 'display' === r || 'position' === r;
            })(o) && ((t = t || new Map()), t.set(o, e));
          }),
          t
        );
      }
      class SC {
        constructor(t, e, o, l) {
          (this.element = t),
            (this.keyframes = e),
            (this.options = o),
            (this._specialStyles = l),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = o.duration),
            (this._delay = o.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : new Map()),
            this.domPlayer.addEventListener('finish', () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(t) {
          const e = [];
          return (
            t.forEach((o) => {
              e.push(Object.fromEntries(o));
            }),
            e
          );
        }
        _triggerWebAnimation(t, e, o) {
          return t.animate(this._convertKeyframesToObject(e), o);
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = t * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((o, l) => {
              'offset' !== l &&
                t.set(l, this._finished ? o : v_(this.element, l));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const e = 'start' === t ? this._onStartFns : this._onDoneFns;
          e.forEach((o) => o()), (e.length = 0);
        }
      }
      class NE {
        validateStyleProperty(t) {
          return !0;
        }
        validateAnimatableStyleProperty(t) {
          return !0;
        }
        matchesElement(t, e) {
          return !1;
        }
        containsElement(t, e) {
          return h_(t, e);
        }
        getParentElement(t) {
          return rh(t);
        }
        query(t, e, o) {
          return pw(t, e, o);
        }
        computeStyle(t, e, o) {
          return window.getComputedStyle(t)[e];
        }
        animate(t, e, o, l, f, p = []) {
          const D = {
            duration: o,
            delay: l,
            fill: 0 == l ? 'both' : 'forwards',
          };
          f && (D.easing = f);
          const S = new Map(),
            R = p.filter((se) => se instanceof SC);
          (function y_(r, t) {
            return 0 === r || 0 === t;
          })(o, l) &&
            R.forEach((se) => {
              se.currentSnapshot.forEach((Q, ce) => S.set(ce, Q));
            });
          let B = (function uC(r) {
            return r.length
              ? r[0] instanceof Map
                ? r
                : r.map((t) => gw(t))
              : [];
          })(e).map((se) => To(se));
          B = (function uh(r, t, e) {
            if (e.size && t.length) {
              let o = t[0],
                l = [];
              if (
                (e.forEach((f, p) => {
                  o.has(p) || l.push(p), o.set(p, f);
                }),
                l.length)
              )
                for (let f = 1; f < t.length; f++) {
                  let p = t[f];
                  l.forEach((y) => p.set(y, v_(r, y)));
                }
            }
            return t;
          })(t, B, S);
          const ae = (function RE(r, t) {
            let e = null,
              o = null;
            return (
              Array.isArray(t) && t.length
                ? ((e = Iw(t[0])), t.length > 1 && (o = Iw(t[t.length - 1])))
                : t instanceof Map && (e = Iw(t)),
              e || o ? new OE(r, e, o) : null
            );
          })(t, B);
          return new SC(t, B, D, ae);
        }
      }
      let kE = (() => {
        class r extends rg {
          constructor(e, o) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = e.createRenderer(o.body, {
                id: '0',
                encapsulation: d.ifc.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(e) {
            const o = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const l = Array.isArray(e) ? sg(e) : e;
            return (
              AC(this._renderer, null, o, 'register', [l]),
              new LE(o, this._renderer)
            );
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(d.FYo), d.LFG(E.K0));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      class LE extends t0 {
        constructor(t, e) {
          super(), (this._id = t), (this._renderer = e);
        }
        create(t, e) {
          return new VE(this._id, t, e || {}, this._renderer);
        }
      }
      class VE {
        constructor(t, e, o, l) {
          (this.id = t),
            (this.element = e),
            (this._renderer = l),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command('create', o);
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
        }
        _command(t, ...e) {
          return AC(this._renderer, this.element, this.id, t, e);
        }
        onDone(t) {
          this._listen('done', t);
        }
        onStart(t) {
          this._listen('start', t);
        }
        onDestroy(t) {
          this._listen('destroy', t);
        }
        init() {
          this._command('init');
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command('play'), (this._started = !0);
        }
        pause() {
          this._command('pause');
        }
        restart() {
          this._command('restart');
        }
        finish() {
          this._command('finish');
        }
        destroy() {
          this._command('destroy');
        }
        reset() {
          this._command('reset'), (this._started = !1);
        }
        setPosition(t) {
          this._command('setPosition', t);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function AC(r, t, e, o, l) {
        return r.setProperty(t, `@@${e}:${o}`, l);
      }
      const TC = '@.disabled';
      let BE = (() => {
        class r {
          constructor(e, o, l) {
            (this.delegate = e),
              (this.engine = o),
              (this._zone = l),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (o.onRemovalComplete = (f, p) => {
                const y = p?.parentNode(f);
                y && p.removeChild(y, f);
              });
          }
          createRenderer(e, o) {
            const f = this.delegate.createRenderer(e, o);
            if (!(e && o && o.data && o.data.animation)) {
              let R = this._rendererCache.get(f);
              return (
                R ||
                  ((R = new IC('', f, this.engine, () =>
                    this._rendererCache.delete(f)
                  )),
                  this._rendererCache.set(f, R)),
                R
              );
            }
            const p = o.id,
              y = o.id + '-' + this._currentId;
            this._currentId++, this.engine.register(y, e);
            const D = (R) => {
              Array.isArray(R)
                ? R.forEach(D)
                : this.engine.registerTrigger(p, y, e, R.name, R);
            };
            return o.data.animation.forEach(D), new HE(this, y, f, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(e, o, l) {
            e >= 0 && e < this._microtaskId
              ? this._zone.run(() => o(l))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((f) => {
                        const [p, y] = f;
                        p(y);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([o, l]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (r.??fac = function (e) {
            return new (e || r)(d.LFG(d.FYo), d.LFG(x_), d.LFG(d.R0b));
          }),
          (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
          r
        );
      })();
      class IC {
        constructor(t, e, o, l) {
          (this.namespaceId = t),
            (this.delegate = e),
            (this.engine = o),
            (this._onDestroy = l),
            (this.destroyNode = this.delegate.destroyNode
              ? (f) => e.destroyNode(f)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy(),
            this._onDestroy?.();
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e),
            this.engine.onInsert(this.namespaceId, e, t, !1);
        }
        insertBefore(t, e, o, l = !0) {
          this.delegate.insertBefore(t, e, o),
            this.engine.onInsert(this.namespaceId, e, t, l);
        }
        removeChild(t, e, o) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, o);
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, e, o, l) {
          this.delegate.setAttribute(t, e, o, l);
        }
        removeAttribute(t, e, o) {
          this.delegate.removeAttribute(t, e, o);
        }
        addClass(t, e) {
          this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e);
        }
        setStyle(t, e, o, l) {
          this.delegate.setStyle(t, e, o, l);
        }
        removeStyle(t, e, o) {
          this.delegate.removeStyle(t, e, o);
        }
        setProperty(t, e, o) {
          '@' == e.charAt(0) && e == TC
            ? this.disableAnimations(t, !!o)
            : this.delegate.setProperty(t, e, o);
        }
        setValue(t, e) {
          this.delegate.setValue(t, e);
        }
        listen(t, e, o) {
          return this.delegate.listen(t, e, o);
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e);
        }
      }
      class HE extends IC {
        constructor(t, e, o, l, f) {
          super(e, o, l, f), (this.factory = t), (this.namespaceId = e);
        }
        setProperty(t, e, o) {
          '@' == e.charAt(0)
            ? '.' == e.charAt(1) && e == TC
              ? this.disableAnimations(t, (o = void 0 === o || !!o))
              : this.engine.process(this.namespaceId, t, e.slice(1), o)
            : this.delegate.setProperty(t, e, o);
        }
        listen(t, e, o) {
          if ('@' == e.charAt(0)) {
            const l = (function UE(r) {
              switch (r) {
                case 'body':
                  return document.body;
                case 'document':
                  return document;
                case 'window':
                  return window;
                default:
                  return r;
              }
            })(t);
            let f = e.slice(1),
              p = '';
            return (
              '@' != f.charAt(0) &&
                ([f, p] = (function jE(r) {
                  const t = r.indexOf('.');
                  return [r.substring(0, t), r.slice(t + 1)];
                })(f)),
              this.engine.listen(this.namespaceId, l, f, p, (y) => {
                this.factory.scheduleListenerCallback(y._data || -1, o, y);
              })
            );
          }
          return this.delegate.listen(t, e, o);
        }
      }
      const FC = [
          { provide: rg, useClass: kE },
          {
            provide: Cw,
            useFactory: function zE() {
              return new cE();
            },
          },
          {
            provide: x_,
            useClass: (() => {
              class r extends x_ {
                constructor(e, o, l, f) {
                  super(e.body, o, l);
                }
                ngOnDestroy() {
                  this.flush();
                }
              }
              return (
                (r.??fac = function (e) {
                  return new (e || r)(
                    d.LFG(E.K0),
                    d.LFG(p_),
                    d.LFG(Cw),
                    d.LFG(d.z2F)
                  );
                }),
                (r.??prov = d.Yz7({ token: r, factory: r.??fac })),
                r
              );
            })(),
          },
          {
            provide: d.FYo,
            useFactory: function GE(r, t, e) {
              return new BE(r, t, e);
            },
            deps: [lt, x_, d.R0b],
          },
        ],
        Fw = [
          { provide: p_, useFactory: () => new NE() },
          { provide: d.QbO, useValue: 'BrowserAnimations' },
          ...FC,
        ],
        RC = [
          { provide: p_, useClass: mw },
          { provide: d.QbO, useValue: 'NoopAnimations' },
          ...FC,
        ];
      let qE = (() => {
          class r {
            static withConfig(e) {
              return { ngModule: r, providers: e.disableAnimations ? RC : Fw };
            }
          }
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ providers: Fw, imports: [Po] })),
            r
          );
        })(),
        OC = (() => {
          class r {}
          return (
            (r.??fac = function (e) {
              return new (e || r)();
            }),
            (r.??mod = d.oAB({ type: r })),
            (r.??inj = d.cJS({ imports: [E.ez, St] })),
            r
          );
        })();
      const ZE = [ig, Qc, G0, Ls, OC, e_, Of, yf, Vg, So];
      class cd {}
      (cd.??fac = function (t) {
        return new (t || cd)();
      }),
        (cd.??mod = d.oAB({ type: cd })),
        (cd.??inj = d.cJS({
          imports: [ZE, ig, Qc, G0, Ls, OC, e_, Of, yf, Vg, So],
        }));
      class dd {}
      (dd.??fac = function (t) {
        return new (t || dd)();
      }),
        (dd.??mod = d.oAB({ type: dd, bootstrap: [ml] })),
        (dd.??inj = d.cJS({ imports: [Po, tr, qE, rm, cd, Vh] })),
        Cl()
          .bootstrapModule(dd)
          .catch((r) => console.error(r));
    },
    751: (Je, oe, F) => {
      F.d(oe, { y: () => fe });
      var E = F(930),
        d = F(727),
        ne = F(822),
        te = F(635),
        K = F(416),
        J = F(576),
        ue = F(806);
      let fe = (() => {
        class L {
          constructor(he) {
            he && (this._subscribe = he);
          }
          lift(he) {
            const Te = new L();
            return (Te.source = this), (Te.operator = he), Te;
          }
          subscribe(he, Te, it) {
            const Y = (function j(L) {
              return (
                (L && L instanceof E.Lv) ||
                ((function q(L) {
                  return (
                    L &&
                    (0, J.m)(L.next) &&
                    (0, J.m)(L.error) &&
                    (0, J.m)(L.complete)
                  );
                })(L) &&
                  (0, d.Nn)(L))
              );
            })(he)
              ? he
              : new E.Hp(he, Te, it);
            return (
              (0, ue.x)(() => {
                const { operator: Qe, source: me } = this;
                Y.add(
                  Qe
                    ? Qe.call(Y, me)
                    : me
                    ? this._subscribe(Y)
                    : this._trySubscribe(Y)
                );
              }),
              Y
            );
          }
          _trySubscribe(he) {
            try {
              return this._subscribe(he);
            } catch (Te) {
              he.error(Te);
            }
          }
          forEach(he, Te) {
            return new (Te = ye(Te))((it, Y) => {
              const Qe = new E.Hp({
                next: (me) => {
                  try {
                    he(me);
                  } catch (Fe) {
                    Y(Fe), Qe.unsubscribe();
                  }
                },
                error: Y,
                complete: it,
              });
              this.subscribe(Qe);
            });
          }
          _subscribe(he) {
            var Te;
            return null === (Te = this.source) || void 0 === Te
              ? void 0
              : Te.subscribe(he);
          }
          [ne.L]() {
            return this;
          }
          pipe(...he) {
            return (0, te.U)(he)(this);
          }
          toPromise(he) {
            return new (he = ye(he))((Te, it) => {
              let Y;
              this.subscribe(
                (Qe) => (Y = Qe),
                (Qe) => it(Qe),
                () => Te(Y)
              );
            });
          }
        }
        return (L.create = (Ge) => new L(Ge)), L;
      })();
      function ye(L) {
        var Ge;
        return null !== (Ge = L ?? K.v.Promise) && void 0 !== Ge ? Ge : Promise;
      }
    },
    579: (Je, oe, F) => {
      F.d(oe, { x: () => ue });
      var E = F(751),
        d = F(727);
      const te = (0, F(888).d)(
        (ye) =>
          function () {
            ye(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed');
          }
      );
      var K = F(737),
        J = F(806);
      let ue = (() => {
        class ye extends E.y {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(j) {
            const L = new fe(this, this);
            return (L.operator = j), L;
          }
          _throwIfClosed() {
            if (this.closed) throw new te();
          }
          next(j) {
            (0, J.x)(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const L of this.currentObservers) L.next(j);
              }
            });
          }
          error(j) {
            (0, J.x)(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = j);
                const { observers: L } = this;
                for (; L.length; ) L.shift().error(j);
              }
            });
          }
          complete() {
            (0, J.x)(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: j } = this;
                for (; j.length; ) j.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var j;
            return (
              (null === (j = this.observers) || void 0 === j
                ? void 0
                : j.length) > 0
            );
          }
          _trySubscribe(j) {
            return this._throwIfClosed(), super._trySubscribe(j);
          }
          _subscribe(j) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(j),
              this._innerSubscribe(j)
            );
          }
          _innerSubscribe(j) {
            const { hasError: L, isStopped: Ge, observers: he } = this;
            return L || Ge
              ? d.Lc
              : ((this.currentObservers = null),
                he.push(j),
                new d.w0(() => {
                  (this.currentObservers = null), (0, K.P)(he, j);
                }));
          }
          _checkFinalizedStatuses(j) {
            const { hasError: L, thrownError: Ge, isStopped: he } = this;
            L ? j.error(Ge) : he && j.complete();
          }
          asObservable() {
            const j = new E.y();
            return (j.source = this), j;
          }
        }
        return (ye.create = (q, j) => new fe(q, j)), ye;
      })();
      class fe extends ue {
        constructor(q, j) {
          super(), (this.destination = q), (this.source = j);
        }
        next(q) {
          var j, L;
          null ===
            (L =
              null === (j = this.destination) || void 0 === j
                ? void 0
                : j.next) ||
            void 0 === L ||
            L.call(j, q);
        }
        error(q) {
          var j, L;
          null ===
            (L =
              null === (j = this.destination) || void 0 === j
                ? void 0
                : j.error) ||
            void 0 === L ||
            L.call(j, q);
        }
        complete() {
          var q, j;
          null ===
            (j =
              null === (q = this.destination) || void 0 === q
                ? void 0
                : q.complete) ||
            void 0 === j ||
            j.call(q);
        }
        _subscribe(q) {
          var j, L;
          return null !==
            (L =
              null === (j = this.source) || void 0 === j
                ? void 0
                : j.subscribe(q)) && void 0 !== L
            ? L
            : d.Lc;
        }
      }
    },
    930: (Je, oe, F) => {
      F.d(oe, { Hp: () => it, Lv: () => L });
      var E = F(576),
        d = F(727),
        ne = F(416),
        te = F(849),
        K = F(32);
      const J = ye('C', void 0, void 0);
      function ye(pe, X, Se) {
        return { kind: pe, value: X, error: Se };
      }
      var q = F(410),
        j = F(806);
      class L extends d.w0 {
        constructor(X) {
          super(),
            (this.isStopped = !1),
            X
              ? ((this.destination = X), (0, d.Nn)(X) && X.add(this))
              : (this.destination = Fe);
        }
        static create(X, Se, et) {
          return new it(X, Se, et);
        }
        next(X) {
          this.isStopped
            ? me(
                (function fe(pe) {
                  return ye('N', pe, void 0);
                })(X),
                this
              )
            : this._next(X);
        }
        error(X) {
          this.isStopped
            ? me(
                (function ue(pe) {
                  return ye('E', void 0, pe);
                })(X),
                this
              )
            : ((this.isStopped = !0), this._error(X));
        }
        complete() {
          this.isStopped
            ? me(J, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(X) {
          this.destination.next(X);
        }
        _error(X) {
          try {
            this.destination.error(X);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Ge = Function.prototype.bind;
      function he(pe, X) {
        return Ge.call(pe, X);
      }
      class Te {
        constructor(X) {
          this.partialObserver = X;
        }
        next(X) {
          const { partialObserver: Se } = this;
          if (Se.next)
            try {
              Se.next(X);
            } catch (et) {
              Y(et);
            }
        }
        error(X) {
          const { partialObserver: Se } = this;
          if (Se.error)
            try {
              Se.error(X);
            } catch (et) {
              Y(et);
            }
          else Y(X);
        }
        complete() {
          const { partialObserver: X } = this;
          if (X.complete)
            try {
              X.complete();
            } catch (Se) {
              Y(Se);
            }
        }
      }
      class it extends L {
        constructor(X, Se, et) {
          let le;
          if ((super(), (0, E.m)(X) || !X))
            le = {
              next: X ?? void 0,
              error: Se ?? void 0,
              complete: et ?? void 0,
            };
          else {
            let ge;
            this && ne.v.useDeprecatedNextContext
              ? ((ge = Object.create(X)),
                (ge.unsubscribe = () => this.unsubscribe()),
                (le = {
                  next: X.next && he(X.next, ge),
                  error: X.error && he(X.error, ge),
                  complete: X.complete && he(X.complete, ge),
                }))
              : (le = X);
          }
          this.destination = new Te(le);
        }
      }
      function Y(pe) {
        ne.v.useDeprecatedSynchronousErrorHandling
          ? (0, j.O)(pe)
          : (0, te.h)(pe);
      }
      function me(pe, X) {
        const { onStoppedNotification: Se } = ne.v;
        Se && q.z.setTimeout(() => Se(pe, X));
      }
      const Fe = {
        closed: !0,
        next: K.Z,
        error: function Qe(pe) {
          throw pe;
        },
        complete: K.Z,
      };
    },
    727: (Je, oe, F) => {
      F.d(oe, { Lc: () => J, w0: () => K, Nn: () => ue });
      var E = F(576);
      const ne = (0, F(888).d)(
        (ye) =>
          function (j) {
            ye(this),
              (this.message = j
                ? `${j.length} errors occurred during unsubscription:\n${j
                    .map((L, Ge) => `${Ge + 1}) ${L.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = j);
          }
      );
      var te = F(737);
      class K {
        constructor(q) {
          (this.initialTeardown = q),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let q;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: j } = this;
            if (j)
              if (((this._parentage = null), Array.isArray(j)))
                for (const he of j) he.remove(this);
              else j.remove(this);
            const { initialTeardown: L } = this;
            if ((0, E.m)(L))
              try {
                L();
              } catch (he) {
                q = he instanceof ne ? he.errors : [he];
              }
            const { _finalizers: Ge } = this;
            if (Ge) {
              this._finalizers = null;
              for (const he of Ge)
                try {
                  fe(he);
                } catch (Te) {
                  (q = q ?? []),
                    Te instanceof ne ? (q = [...q, ...Te.errors]) : q.push(Te);
                }
            }
            if (q) throw new ne(q);
          }
        }
        add(q) {
          var j;
          if (q && q !== this)
            if (this.closed) fe(q);
            else {
              if (q instanceof K) {
                if (q.closed || q._hasParent(this)) return;
                q._addParent(this);
              }
              (this._finalizers =
                null !== (j = this._finalizers) && void 0 !== j ? j : []).push(
                q
              );
            }
        }
        _hasParent(q) {
          const { _parentage: j } = this;
          return j === q || (Array.isArray(j) && j.includes(q));
        }
        _addParent(q) {
          const { _parentage: j } = this;
          this._parentage = Array.isArray(j) ? (j.push(q), j) : j ? [j, q] : q;
        }
        _removeParent(q) {
          const { _parentage: j } = this;
          j === q
            ? (this._parentage = null)
            : Array.isArray(j) && (0, te.P)(j, q);
        }
        remove(q) {
          const { _finalizers: j } = this;
          j && (0, te.P)(j, q), q instanceof K && q._removeParent(this);
        }
      }
      K.EMPTY = (() => {
        const ye = new K();
        return (ye.closed = !0), ye;
      })();
      const J = K.EMPTY;
      function ue(ye) {
        return (
          ye instanceof K ||
          (ye &&
            'closed' in ye &&
            (0, E.m)(ye.remove) &&
            (0, E.m)(ye.add) &&
            (0, E.m)(ye.unsubscribe))
        );
      }
      function fe(ye) {
        (0, E.m)(ye) ? ye() : ye.unsubscribe();
      }
    },
    416: (Je, oe, F) => {
      F.d(oe, { v: () => E });
      const E = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: void 0,
        useDeprecatedSynchronousErrorHandling: !1,
        useDeprecatedNextContext: !1,
      };
    },
    515: (Je, oe, F) => {
      F.d(oe, { E: () => d });
      const d = new (F(751).y)((K) => K.complete());
    },
    76: (Je, oe, F) => {
      F.d(oe, { D: () => et });
      var E = F(421),
        d = F(672),
        ne = F(482),
        te = F(403);
      function K(le, ge = 0) {
        return (0, ne.e)((He, Ne) => {
          He.subscribe(
            (0, te.x)(
              Ne,
              (xe) => (0, d.f)(Ne, le, () => Ne.next(xe), ge),
              () => (0, d.f)(Ne, le, () => Ne.complete(), ge),
              (xe) => (0, d.f)(Ne, le, () => Ne.error(xe), ge)
            )
          );
        });
      }
      function J(le, ge = 0) {
        return (0, ne.e)((He, Ne) => {
          Ne.add(le.schedule(() => He.subscribe(Ne), ge));
        });
      }
      var ye = F(751),
        j = F(202),
        L = F(576);
      function he(le, ge) {
        if (!le) throw new Error('Iterable cannot be null');
        return new ye.y((He) => {
          (0, d.f)(He, ge, () => {
            const Ne = le[Symbol.asyncIterator]();
            (0, d.f)(
              He,
              ge,
              () => {
                Ne.next().then((xe) => {
                  xe.done ? He.complete() : He.next(xe.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      var Te = F(670),
        it = F(239),
        Y = F(144),
        Qe = F(495),
        me = F(206),
        Fe = F(532),
        pe = F(260);
      function et(le, ge) {
        return ge
          ? (function Se(le, ge) {
              if (null != le) {
                if ((0, Te.c)(le))
                  return (function ue(le, ge) {
                    return (0, E.Xf)(le).pipe(J(ge), K(ge));
                  })(le, ge);
                if ((0, Y.z)(le))
                  return (function q(le, ge) {
                    return new ye.y((He) => {
                      let Ne = 0;
                      return ge.schedule(function () {
                        Ne === le.length
                          ? He.complete()
                          : (He.next(le[Ne++]), He.closed || this.schedule());
                      });
                    });
                  })(le, ge);
                if ((0, it.t)(le))
                  return (function fe(le, ge) {
                    return (0, E.Xf)(le).pipe(J(ge), K(ge));
                  })(le, ge);
                if ((0, me.D)(le)) return he(le, ge);
                if ((0, Qe.T)(le))
                  return (function Ge(le, ge) {
                    return new ye.y((He) => {
                      let Ne;
                      return (
                        (0, d.f)(He, ge, () => {
                          (Ne = le[j.h]()),
                            (0, d.f)(
                              He,
                              ge,
                              () => {
                                let xe, lt;
                                try {
                                  ({ value: xe, done: lt } = Ne.next());
                                } catch (Ee) {
                                  return void He.error(Ee);
                                }
                                lt ? He.complete() : He.next(xe);
                              },
                              0,
                              !0
                            );
                        }),
                        () => (0, L.m)(Ne?.return) && Ne.return()
                      );
                    });
                  })(le, ge);
                if ((0, pe.L)(le))
                  return (function X(le, ge) {
                    return he((0, pe.Q)(le), ge);
                  })(le, ge);
              }
              throw (0, Fe.z)(le);
            })(le, ge)
          : (0, E.Xf)(le);
      }
    },
    421: (Je, oe, F) => {
      F.d(oe, { Xf: () => Ge });
      var E = F(655),
        d = F(144),
        ne = F(239),
        te = F(751),
        K = F(670),
        J = F(206),
        ue = F(532),
        fe = F(495),
        ye = F(260),
        q = F(576),
        j = F(849),
        L = F(822);
      function Ge(pe) {
        if (pe instanceof te.y) return pe;
        if (null != pe) {
          if ((0, K.c)(pe))
            return (function he(pe) {
              return new te.y((X) => {
                const Se = pe[L.L]();
                if ((0, q.m)(Se.subscribe)) return Se.subscribe(X);
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                );
              });
            })(pe);
          if ((0, d.z)(pe))
            return (function Te(pe) {
              return new te.y((X) => {
                for (let Se = 0; Se < pe.length && !X.closed; Se++)
                  X.next(pe[Se]);
                X.complete();
              });
            })(pe);
          if ((0, ne.t)(pe))
            return (function it(pe) {
              return new te.y((X) => {
                pe.then(
                  (Se) => {
                    X.closed || (X.next(Se), X.complete());
                  },
                  (Se) => X.error(Se)
                ).then(null, j.h);
              });
            })(pe);
          if ((0, J.D)(pe)) return Qe(pe);
          if ((0, fe.T)(pe))
            return (function Y(pe) {
              return new te.y((X) => {
                for (const Se of pe) if ((X.next(Se), X.closed)) return;
                X.complete();
              });
            })(pe);
          if ((0, ye.L)(pe))
            return (function me(pe) {
              return Qe((0, ye.Q)(pe));
            })(pe);
        }
        throw (0, ue.z)(pe);
      }
      function Qe(pe) {
        return new te.y((X) => {
          (function Fe(pe, X) {
            var Se, et, le, ge;
            return (0, E.mG)(this, void 0, void 0, function* () {
              try {
                for (Se = (0, E.KL)(pe); !(et = yield Se.next()).done; )
                  if ((X.next(et.value), X.closed)) return;
              } catch (He) {
                le = { error: He };
              } finally {
                try {
                  et && !et.done && (ge = Se.return) && (yield ge.call(Se));
                } finally {
                  if (le) throw le.error;
                }
              }
              X.complete();
            });
          })(pe, X).catch((Se) => X.error(Se));
        });
      }
    },
    451: (Je, oe, F) => {
      F.d(oe, { T: () => J });
      var E = F(189),
        d = F(421),
        ne = F(515),
        te = F(669),
        K = F(76);
      function J(...ue) {
        const fe = (0, te.yG)(ue),
          ye = (0, te._6)(ue, 1 / 0),
          q = ue;
        return q.length
          ? 1 === q.length
            ? (0, d.Xf)(q[0])
            : (0, E.J)(ye)((0, K.D)(q, fe))
          : ne.E;
      }
    },
    403: (Je, oe, F) => {
      F.d(oe, { x: () => d });
      var E = F(930);
      function d(te, K, J, ue, fe) {
        return new ne(te, K, J, ue, fe);
      }
      class ne extends E.Lv {
        constructor(K, J, ue, fe, ye, q) {
          super(K),
            (this.onFinalize = ye),
            (this.shouldUnsubscribe = q),
            (this._next = J
              ? function (j) {
                  try {
                    J(j);
                  } catch (L) {
                    K.error(L);
                  }
                }
              : super._next),
            (this._error = fe
              ? function (j) {
                  try {
                    fe(j);
                  } catch (L) {
                    K.error(L);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = ue
              ? function () {
                  try {
                    ue();
                  } catch (j) {
                    K.error(j);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var K;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: J } = this;
            super.unsubscribe(),
              !J &&
                (null === (K = this.onFinalize) ||
                  void 0 === K ||
                  K.call(this));
          }
        }
      }
    },
    4: (Je, oe, F) => {
      F.d(oe, { U: () => ne });
      var E = F(482),
        d = F(403);
      function ne(te, K) {
        return (0, E.e)((J, ue) => {
          let fe = 0;
          J.subscribe(
            (0, d.x)(ue, (ye) => {
              ue.next(te.call(K, ye, fe++));
            })
          );
        });
      }
    },
    189: (Je, oe, F) => {
      F.d(oe, { J: () => ne });
      var E = F(577),
        d = F(671);
      function ne(te = 1 / 0) {
        return (0, E.z)(d.y, te);
      }
    },
    577: (Je, oe, F) => {
      F.d(oe, { z: () => fe });
      var E = F(4),
        d = F(421),
        ne = F(482),
        te = F(672),
        K = F(403),
        ue = F(576);
      function fe(ye, q, j = 1 / 0) {
        return (0, ue.m)(q)
          ? fe(
              (L, Ge) =>
                (0, E.U)((he, Te) => q(L, he, Ge, Te))((0, d.Xf)(ye(L, Ge))),
              j
            )
          : ('number' == typeof q && (j = q),
            (0, ne.e)((L, Ge) =>
              (function J(ye, q, j, L, Ge, he, Te, it) {
                const Y = [];
                let Qe = 0,
                  me = 0,
                  Fe = !1;
                const pe = () => {
                    Fe && !Y.length && !Qe && q.complete();
                  },
                  X = (et) => (Qe < L ? Se(et) : Y.push(et)),
                  Se = (et) => {
                    he && q.next(et), Qe++;
                    let le = !1;
                    (0, d.Xf)(j(et, me++)).subscribe(
                      (0, K.x)(
                        q,
                        (ge) => {
                          Ge?.(ge), he ? X(ge) : q.next(ge);
                        },
                        () => {
                          le = !0;
                        },
                        void 0,
                        () => {
                          if (le)
                            try {
                              for (Qe--; Y.length && Qe < L; ) {
                                const ge = Y.shift();
                                Te ? (0, te.f)(q, Te, () => Se(ge)) : Se(ge);
                              }
                              pe();
                            } catch (ge) {
                              q.error(ge);
                            }
                        }
                      )
                    );
                  };
                return (
                  ye.subscribe(
                    (0, K.x)(q, X, () => {
                      (Fe = !0), pe();
                    })
                  ),
                  () => {
                    it?.();
                  }
                );
              })(L, Ge, ye, j)
            ));
      }
    },
    99: (Je, oe, F) => {
      F.d(oe, { B: () => K });
      var E = F(421),
        d = F(579),
        ne = F(930),
        te = F(482);
      function K(ue = {}) {
        const {
          connector: fe = () => new d.x(),
          resetOnError: ye = !0,
          resetOnComplete: q = !0,
          resetOnRefCountZero: j = !0,
        } = ue;
        return (L) => {
          let Ge,
            he,
            Te,
            it = 0,
            Y = !1,
            Qe = !1;
          const me = () => {
              he?.unsubscribe(), (he = void 0);
            },
            Fe = () => {
              me(), (Ge = Te = void 0), (Y = Qe = !1);
            },
            pe = () => {
              const X = Ge;
              Fe(), X?.unsubscribe();
            };
          return (0, te.e)((X, Se) => {
            it++, !Qe && !Y && me();
            const et = (Te = Te ?? fe());
            Se.add(() => {
              it--, 0 === it && !Qe && !Y && (he = J(pe, j));
            }),
              et.subscribe(Se),
              !Ge &&
                it > 0 &&
                ((Ge = new ne.Hp({
                  next: (le) => et.next(le),
                  error: (le) => {
                    (Qe = !0), me(), (he = J(Fe, ye, le)), et.error(le);
                  },
                  complete: () => {
                    (Y = !0), me(), (he = J(Fe, q)), et.complete();
                  },
                })),
                (0, E.Xf)(X).subscribe(Ge));
          })(L);
        };
      }
      function J(ue, fe, ...ye) {
        if (!0 === fe) return void ue();
        if (!1 === fe) return;
        const q = new ne.Hp({
          next: () => {
            q.unsubscribe(), ue();
          },
        });
        return fe(...ye).subscribe(q);
      }
    },
    410: (Je, oe, F) => {
      F.d(oe, { z: () => E });
      const E = {
        setTimeout(d, ne, ...te) {
          const { delegate: K } = E;
          return K?.setTimeout
            ? K.setTimeout(d, ne, ...te)
            : setTimeout(d, ne, ...te);
        },
        clearTimeout(d) {
          const { delegate: ne } = E;
          return (ne?.clearTimeout || clearTimeout)(d);
        },
        delegate: void 0,
      };
    },
    202: (Je, oe, F) => {
      F.d(oe, { h: () => d });
      const d = (function E() {
        return 'function' == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : '@@iterator';
      })();
    },
    822: (Je, oe, F) => {
      F.d(oe, { L: () => E });
      const E =
        ('function' == typeof Symbol && Symbol.observable) || '@@observable';
    },
    669: (Je, oe, F) => {
      F.d(oe, { _6: () => J, jO: () => te, yG: () => K });
      var E = F(576);
      function ne(ue) {
        return ue[ue.length - 1];
      }
      function te(ue) {
        return (0, E.m)(ne(ue)) ? ue.pop() : void 0;
      }
      function K(ue) {
        return (function d(ue) {
          return ue && (0, E.m)(ue.schedule);
        })(ne(ue))
          ? ue.pop()
          : void 0;
      }
      function J(ue, fe) {
        return 'number' == typeof ne(ue) ? ue.pop() : fe;
      }
    },
    737: (Je, oe, F) => {
      function E(d, ne) {
        if (d) {
          const te = d.indexOf(ne);
          0 <= te && d.splice(te, 1);
        }
      }
      F.d(oe, { P: () => E });
    },
    888: (Je, oe, F) => {
      function E(d) {
        const te = d((K) => {
          Error.call(K), (K.stack = new Error().stack);
        });
        return (
          (te.prototype = Object.create(Error.prototype)),
          (te.prototype.constructor = te),
          te
        );
      }
      F.d(oe, { d: () => E });
    },
    806: (Je, oe, F) => {
      F.d(oe, { O: () => te, x: () => ne });
      var E = F(416);
      let d = null;
      function ne(K) {
        if (E.v.useDeprecatedSynchronousErrorHandling) {
          const J = !d;
          if ((J && (d = { errorThrown: !1, error: null }), K(), J)) {
            const { errorThrown: ue, error: fe } = d;
            if (((d = null), ue)) throw fe;
          }
        } else K();
      }
      function te(K) {
        E.v.useDeprecatedSynchronousErrorHandling &&
          d &&
          ((d.errorThrown = !0), (d.error = K));
      }
    },
    672: (Je, oe, F) => {
      function E(d, ne, te, K = 0, J = !1) {
        const ue = ne.schedule(function () {
          te(), J ? d.add(this.schedule(null, K)) : this.unsubscribe();
        }, K);
        if ((d.add(ue), !J)) return ue;
      }
      F.d(oe, { f: () => E });
    },
    671: (Je, oe, F) => {
      function E(d) {
        return d;
      }
      F.d(oe, { y: () => E });
    },
    144: (Je, oe, F) => {
      F.d(oe, { z: () => E });
      const E = (d) =>
        d && 'number' == typeof d.length && 'function' != typeof d;
    },
    206: (Je, oe, F) => {
      F.d(oe, { D: () => d });
      var E = F(576);
      function d(ne) {
        return Symbol.asyncIterator && (0, E.m)(ne?.[Symbol.asyncIterator]);
      }
    },
    576: (Je, oe, F) => {
      function E(d) {
        return 'function' == typeof d;
      }
      F.d(oe, { m: () => E });
    },
    670: (Je, oe, F) => {
      F.d(oe, { c: () => ne });
      var E = F(822),
        d = F(576);
      function ne(te) {
        return (0, d.m)(te[E.L]);
      }
    },
    495: (Je, oe, F) => {
      F.d(oe, { T: () => ne });
      var E = F(202),
        d = F(576);
      function ne(te) {
        return (0, d.m)(te?.[E.h]);
      }
    },
    239: (Je, oe, F) => {
      F.d(oe, { t: () => d });
      var E = F(576);
      function d(ne) {
        return (0, E.m)(ne?.then);
      }
    },
    260: (Je, oe, F) => {
      F.d(oe, { L: () => te, Q: () => ne });
      var E = F(655),
        d = F(576);
      function ne(K) {
        return (0, E.FC)(this, arguments, function* () {
          const ue = K.getReader();
          try {
            for (;;) {
              const { value: fe, done: ye } = yield (0, E.qq)(ue.read());
              if (ye) return yield (0, E.qq)(void 0);
              yield yield (0, E.qq)(fe);
            }
          } finally {
            ue.releaseLock();
          }
        });
      }
      function te(K) {
        return (0, d.m)(K?.getReader);
      }
    },
    482: (Je, oe, F) => {
      F.d(oe, { A: () => d, e: () => ne });
      var E = F(576);
      function d(te) {
        return (0, E.m)(te?.lift);
      }
      function ne(te) {
        return (K) => {
          if (d(K))
            return K.lift(function (J) {
              try {
                return te(J, this);
              } catch (ue) {
                this.error(ue);
              }
            });
          throw new TypeError('Unable to lift unknown Observable type');
        };
      }
    },
    32: (Je, oe, F) => {
      function E() {}
      F.d(oe, { Z: () => E });
    },
    635: (Je, oe, F) => {
      F.d(oe, { U: () => ne, z: () => d });
      var E = F(671);
      function d(...te) {
        return ne(te);
      }
      function ne(te) {
        return 0 === te.length
          ? E.y
          : 1 === te.length
          ? te[0]
          : function (J) {
              return te.reduce((ue, fe) => fe(ue), J);
            };
      }
    },
    849: (Je, oe, F) => {
      F.d(oe, { h: () => ne });
      var E = F(416),
        d = F(410);
      function ne(te) {
        d.z.setTimeout(() => {
          const { onUnhandledError: K } = E.v;
          if (!K) throw te;
          K(te);
        });
      }
    },
    532: (Je, oe, F) => {
      function E(d) {
        return new TypeError(
          `You provided ${
            null !== d && 'object' == typeof d ? 'an invalid object' : `'${d}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      F.d(oe, { z: () => E });
    },
    655: (Je, oe, F) => {
      function L(V, H, $, G) {
        return new ($ || ($ = Promise))(function (ee, De) {
          function ve(ht) {
            try {
              ke(G.next(ht));
            } catch ($e) {
              De($e);
            }
          }
          function Kt(ht) {
            try {
              ke(G.throw(ht));
            } catch ($e) {
              De($e);
            }
          }
          function ke(ht) {
            ht.done
              ? ee(ht.value)
              : (function re(ee) {
                  return ee instanceof $
                    ? ee
                    : new $(function (De) {
                        De(ee);
                      });
                })(ht.value).then(ve, Kt);
          }
          ke((G = G.apply(V, H || [])).next());
        });
      }
      function pe(V) {
        return this instanceof pe ? ((this.v = V), this) : new pe(V);
      }
      function X(V, H, $) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.');
        var re,
          G = $.apply(V, H || []),
          ee = [];
        return (
          (re = {}),
          De('next'),
          De('throw'),
          De('return'),
          (re[Symbol.asyncIterator] = function () {
            return this;
          }),
          re
        );
        function De(Mt) {
          G[Mt] &&
            (re[Mt] = function (Xt) {
              return new Promise(function (On, Jn) {
                ee.push([Mt, Xt, On, Jn]) > 1 || ve(Mt, Xt);
              });
            });
        }
        function ve(Mt, Xt) {
          try {
            !(function Kt(Mt) {
              Mt.value instanceof pe
                ? Promise.resolve(Mt.value.v).then(ke, ht)
                : $e(ee[0][2], Mt);
            })(G[Mt](Xt));
          } catch (On) {
            $e(ee[0][3], On);
          }
        }
        function ke(Mt) {
          ve('next', Mt);
        }
        function ht(Mt) {
          ve('throw', Mt);
        }
        function $e(Mt, Xt) {
          Mt(Xt), ee.shift(), ee.length && ve(ee[0][0], ee[0][1]);
        }
      }
      function et(V) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.');
        var $,
          H = V[Symbol.asyncIterator];
        return H
          ? H.call(V)
          : ((V = (function it(V) {
              var H = 'function' == typeof Symbol && Symbol.iterator,
                $ = H && V[H],
                G = 0;
              if ($) return $.call(V);
              if (V && 'number' == typeof V.length)
                return {
                  next: function () {
                    return (
                      V && G >= V.length && (V = void 0),
                      { value: V && V[G++], done: !V }
                    );
                  },
                };
              throw new TypeError(
                H
                  ? 'Object is not iterable.'
                  : 'Symbol.iterator is not defined.'
              );
            })(V)),
            ($ = {}),
            G('next'),
            G('throw'),
            G('return'),
            ($[Symbol.asyncIterator] = function () {
              return this;
            }),
            $);
        function G(ee) {
          $[ee] =
            V[ee] &&
            function (De) {
              return new Promise(function (ve, Kt) {
                !(function re(ee, De, ve, Kt) {
                  Promise.resolve(Kt).then(function (ke) {
                    ee({ value: ke, done: ve });
                  }, De);
                })(ve, Kt, (De = V[ee](De)).done, De.value);
              });
            };
        }
      }
      F.d(oe, { FC: () => X, KL: () => et, mG: () => L, qq: () => pe });
    },
    895: (Je, oe, F) => {
      F.d(oe, {
        Do: () => me,
        EM: () => Nl,
        H9: () => Bo,
        HT: () => te,
        JF: () => Jr,
        K0: () => J,
        Mx: () => ln,
        NF: () => F_,
        O5: () => qr,
        RF: () => or,
        S$: () => it,
        V_: () => ye,
        Ye: () => Fe,
        b0: () => Qe,
        bD: () => xh,
        ez: () => T_,
        mk: () => qe,
        n9: () => mi,
        q: () => ne,
        sg: () => vt,
        tP: () => Vo,
        w_: () => K,
      });
      var E = F(650);
      let d = null;
      function ne() {
        return d;
      }
      function te(g) {
        d || (d = g);
      }
      class K {}
      const J = new E.OlP('DocumentToken');
      let ue = (() => {
        class g {
          historyGo(b) {
            throw new Error('Not implemented');
          }
        }
        return (
          (g.??fac = function (b) {
            return new (b || g)();
          }),
          (g.??prov = E.Yz7({
            token: g,
            factory: function () {
              return (function fe() {
                return (0, E.LFG)(q);
              })();
            },
            providedIn: 'platform',
          })),
          g
        );
      })();
      const ye = new E.OlP('Location Initialized');
      let q = (() => {
        class g extends ue {
          constructor(b) {
            super(),
              (this._doc = b),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return ne().getBaseHref(this._doc);
          }
          onPopState(b) {
            const C = ne().getGlobalEventTarget(this._doc, 'window');
            return (
              C.addEventListener('popstate', b, !1),
              () => C.removeEventListener('popstate', b)
            );
          }
          onHashChange(b) {
            const C = ne().getGlobalEventTarget(this._doc, 'window');
            return (
              C.addEventListener('hashchange', b, !1),
              () => C.removeEventListener('hashchange', b)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(b) {
            this._location.pathname = b;
          }
          pushState(b, C, T) {
            j() ? this._history.pushState(b, C, T) : (this._location.hash = T);
          }
          replaceState(b, C, T) {
            j()
              ? this._history.replaceState(b, C, T)
              : (this._location.hash = T);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(b = 0) {
            this._history.go(b);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (g.??fac = function (b) {
            return new (b || g)(E.LFG(J));
          }),
          (g.??prov = E.Yz7({
            token: g,
            factory: function () {
              return (function L() {
                return new q((0, E.LFG)(J));
              })();
            },
            providedIn: 'platform',
          })),
          g
        );
      })();
      function j() {
        return !!window.history.pushState;
      }
      function Ge(g, w) {
        if (0 == g.length) return w;
        if (0 == w.length) return g;
        let b = 0;
        return (
          g.endsWith('/') && b++,
          w.startsWith('/') && b++,
          2 == b ? g + w.substring(1) : 1 == b ? g + w : g + '/' + w
        );
      }
      function he(g) {
        const w = g.match(/#|\?|$/),
          b = (w && w.index) || g.length;
        return g.slice(0, b - ('/' === g[b - 1] ? 1 : 0)) + g.slice(b);
      }
      function Te(g) {
        return g && '?' !== g[0] ? '?' + g : g;
      }
      let it = (() => {
        class g {
          historyGo(b) {
            throw new Error('Not implemented');
          }
        }
        return (
          (g.??fac = function (b) {
            return new (b || g)();
          }),
          (g.??prov = E.Yz7({
            token: g,
            factory: function () {
              return (0, E.f3M)(Qe);
            },
            providedIn: 'root',
          })),
          g
        );
      })();
      const Y = new E.OlP('appBaseHref');
      let Qe = (() => {
          class g extends it {
            constructor(b, C) {
              super(),
                (this._platformLocation = b),
                (this._removeListenerFns = []),
                (this._baseHref =
                  C ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  (0, E.f3M)(J).location?.origin ??
                  '');
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(b) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(b),
                this._platformLocation.onHashChange(b)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(b) {
              return Ge(this._baseHref, b);
            }
            path(b = !1) {
              const C =
                  this._platformLocation.pathname +
                  Te(this._platformLocation.search),
                T = this._platformLocation.hash;
              return T && b ? `${C}${T}` : C;
            }
            pushState(b, C, T, P) {
              const U = this.prepareExternalUrl(T + Te(P));
              this._platformLocation.pushState(b, C, U);
            }
            replaceState(b, C, T, P) {
              const U = this.prepareExternalUrl(T + Te(P));
              this._platformLocation.replaceState(b, C, U);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(b = 0) {
              this._platformLocation.historyGo?.(b);
            }
          }
          return (
            (g.??fac = function (b) {
              return new (b || g)(E.LFG(ue), E.LFG(Y, 8));
            }),
            (g.??prov = E.Yz7({
              token: g,
              factory: g.??fac,
              providedIn: 'root',
            })),
            g
          );
        })(),
        me = (() => {
          class g extends it {
            constructor(b, C) {
              super(),
                (this._platformLocation = b),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != C && (this._baseHref = C);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(b) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(b),
                this._platformLocation.onHashChange(b)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(b = !1) {
              let C = this._platformLocation.hash;
              return null == C && (C = '#'), C.length > 0 ? C.substring(1) : C;
            }
            prepareExternalUrl(b) {
              const C = Ge(this._baseHref, b);
              return C.length > 0 ? '#' + C : C;
            }
            pushState(b, C, T, P) {
              let U = this.prepareExternalUrl(T + Te(P));
              0 == U.length && (U = this._platformLocation.pathname),
                this._platformLocation.pushState(b, C, U);
            }
            replaceState(b, C, T, P) {
              let U = this.prepareExternalUrl(T + Te(P));
              0 == U.length && (U = this._platformLocation.pathname),
                this._platformLocation.replaceState(b, C, U);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(b = 0) {
              this._platformLocation.historyGo?.(b);
            }
          }
          return (
            (g.??fac = function (b) {
              return new (b || g)(E.LFG(ue), E.LFG(Y, 8));
            }),
            (g.??prov = E.Yz7({ token: g, factory: g.??fac })),
            g
          );
        })(),
        Fe = (() => {
          class g {
            constructor(b) {
              (this._subject = new E.vpe()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = b);
              const C = this._locationStrategy.getBaseHref();
              (this._basePath = (function et(g) {
                if (new RegExp('^(https?:)?//').test(g)) {
                  const [, b] = g.split(/\/\/[^\/]+/);
                  return b;
                }
                return g;
              })(he(Se(C)))),
                this._locationStrategy.onPopState((T) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: T.state,
                    type: T.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(b = !1) {
              return this.normalize(this._locationStrategy.path(b));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(b, C = '') {
              return this.path() == this.normalize(b + Te(C));
            }
            normalize(b) {
              return g.stripTrailingSlash(
                (function X(g, w) {
                  return g && new RegExp(`^${g}([/;?#]|$)`).test(w)
                    ? w.substring(g.length)
                    : w;
                })(this._basePath, Se(b))
              );
            }
            prepareExternalUrl(b) {
              return (
                b && '/' !== b[0] && (b = '/' + b),
                this._locationStrategy.prepareExternalUrl(b)
              );
            }
            go(b, C = '', T = null) {
              this._locationStrategy.pushState(T, '', b, C),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(b + Te(C)),
                  T
                );
            }
            replaceState(b, C = '', T = null) {
              this._locationStrategy.replaceState(T, '', b, C),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(b + Te(C)),
                  T
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(b = 0) {
              this._locationStrategy.historyGo?.(b);
            }
            onUrlChange(b) {
              return (
                this._urlChangeListeners.push(b),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((C) => {
                    this._notifyUrlChangeListeners(C.url, C.state);
                  })),
                () => {
                  const C = this._urlChangeListeners.indexOf(b);
                  this._urlChangeListeners.splice(C, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(b = '', C) {
              this._urlChangeListeners.forEach((T) => T(b, C));
            }
            subscribe(b, C, T) {
              return this._subject.subscribe({
                next: b,
                error: C,
                complete: T,
              });
            }
          }
          return (
            (g.normalizeQueryParams = Te),
            (g.joinWithSlash = Ge),
            (g.stripTrailingSlash = he),
            (g.??fac = function (b) {
              return new (b || g)(E.LFG(it));
            }),
            (g.??prov = E.Yz7({
              token: g,
              factory: function () {
                return (function pe() {
                  return new Fe((0, E.LFG)(it));
                })();
              },
              providedIn: 'root',
            })),
            g
          );
        })();
      function Se(g) {
        return g.replace(/\/index.html$/, '');
      }
      const le = {
        ADP: [void 0, void 0, 0],
        AFN: [void 0, '\u060b', 0],
        ALL: [void 0, void 0, 0],
        AMD: [void 0, '\u058f', 2],
        AOA: [void 0, 'Kz'],
        ARS: [void 0, '$'],
        AUD: ['A$', '$'],
        AZN: [void 0, '\u20bc'],
        BAM: [void 0, 'KM'],
        BBD: [void 0, '$'],
        BDT: [void 0, '\u09f3'],
        BHD: [void 0, void 0, 3],
        BIF: [void 0, void 0, 0],
        BMD: [void 0, '$'],
        BND: [void 0, '$'],
        BOB: [void 0, 'Bs'],
        BRL: ['R$'],
        BSD: [void 0, '$'],
        BWP: [void 0, 'P'],
        BYN: [void 0, void 0, 2],
        BYR: [void 0, void 0, 0],
        BZD: [void 0, '$'],
        CAD: ['CA$', '$', 2],
        CHF: [void 0, void 0, 2],
        CLF: [void 0, void 0, 4],
        CLP: [void 0, '$', 0],
        CNY: ['CN\xa5', '\xa5'],
        COP: [void 0, '$', 2],
        CRC: [void 0, '\u20a1', 2],
        CUC: [void 0, '$'],
        CUP: [void 0, '$'],
        CZK: [void 0, 'K\u010d', 2],
        DJF: [void 0, void 0, 0],
        DKK: [void 0, 'kr', 2],
        DOP: [void 0, '$'],
        EGP: [void 0, 'E\xa3'],
        ESP: [void 0, '\u20a7', 0],
        EUR: ['\u20ac'],
        FJD: [void 0, '$'],
        FKP: [void 0, '\xa3'],
        GBP: ['\xa3'],
        GEL: [void 0, '\u20be'],
        GHS: [void 0, 'GH\u20b5'],
        GIP: [void 0, '\xa3'],
        GNF: [void 0, 'FG', 0],
        GTQ: [void 0, 'Q'],
        GYD: [void 0, '$', 2],
        HKD: ['HK$', '$'],
        HNL: [void 0, 'L'],
        HRK: [void 0, 'kn'],
        HUF: [void 0, 'Ft', 2],
        IDR: [void 0, 'Rp', 2],
        ILS: ['\u20aa'],
        INR: ['\u20b9'],
        IQD: [void 0, void 0, 0],
        IRR: [void 0, void 0, 0],
        ISK: [void 0, 'kr', 0],
        ITL: [void 0, void 0, 0],
        JMD: [void 0, '$'],
        JOD: [void 0, void 0, 3],
        JPY: ['\xa5', void 0, 0],
        KHR: [void 0, '\u17db'],
        KMF: [void 0, 'CF', 0],
        KPW: [void 0, '\u20a9', 0],
        KRW: ['\u20a9', void 0, 0],
        KWD: [void 0, void 0, 3],
        KYD: [void 0, '$'],
        KZT: [void 0, '\u20b8'],
        LAK: [void 0, '\u20ad', 0],
        LBP: [void 0, 'L\xa3', 0],
        LKR: [void 0, 'Rs'],
        LRD: [void 0, '$'],
        LTL: [void 0, 'Lt'],
        LUF: [void 0, void 0, 0],
        LVL: [void 0, 'Ls'],
        LYD: [void 0, void 0, 3],
        MGA: [void 0, 'Ar', 0],
        MGF: [void 0, void 0, 0],
        MMK: [void 0, 'K', 0],
        MNT: [void 0, '\u20ae', 2],
        MRO: [void 0, void 0, 0],
        MUR: [void 0, 'Rs', 2],
        MXN: ['MX$', '$'],
        MYR: [void 0, 'RM'],
        NAD: [void 0, '$'],
        NGN: [void 0, '\u20a6'],
        NIO: [void 0, 'C$'],
        NOK: [void 0, 'kr', 2],
        NPR: [void 0, 'Rs'],
        NZD: ['NZ$', '$'],
        OMR: [void 0, void 0, 3],
        PHP: ['\u20b1'],
        PKR: [void 0, 'Rs', 2],
        PLN: [void 0, 'z\u0142'],
        PYG: [void 0, '\u20b2', 0],
        RON: [void 0, 'lei'],
        RSD: [void 0, void 0, 0],
        RUB: [void 0, '\u20bd'],
        RWF: [void 0, 'RF', 0],
        SBD: [void 0, '$'],
        SEK: [void 0, 'kr', 2],
        SGD: [void 0, '$'],
        SHP: [void 0, '\xa3'],
        SLE: [void 0, void 0, 2],
        SLL: [void 0, void 0, 0],
        SOS: [void 0, void 0, 0],
        SRD: [void 0, '$'],
        SSP: [void 0, '\xa3'],
        STD: [void 0, void 0, 0],
        STN: [void 0, 'Db'],
        SYP: [void 0, '\xa3', 0],
        THB: [void 0, '\u0e3f'],
        TMM: [void 0, void 0, 0],
        TND: [void 0, void 0, 3],
        TOP: [void 0, 'T$'],
        TRL: [void 0, void 0, 0],
        TRY: [void 0, '\u20ba'],
        TTD: [void 0, '$'],
        TWD: ['NT$', '$', 2],
        TZS: [void 0, void 0, 2],
        UAH: [void 0, '\u20b4'],
        UGX: [void 0, void 0, 0],
        USD: ['$'],
        UYI: [void 0, void 0, 0],
        UYU: [void 0, '$'],
        UYW: [void 0, void 0, 4],
        UZS: [void 0, void 0, 2],
        VEF: [void 0, 'Bs', 2],
        VND: ['\u20ab', void 0, 0],
        VUV: [void 0, void 0, 0],
        XAF: ['FCFA', void 0, 0],
        XCD: ['EC$', '$'],
        XOF: ['F\u202fCFA', void 0, 0],
        XPF: ['CFPF', void 0, 0],
        XXX: ['\xa4'],
        YER: [void 0, void 0, 0],
        ZAR: [void 0, 'R'],
        ZMK: [void 0, void 0, 0],
        ZMW: [void 0, 'ZK'],
        ZWD: [void 0, void 0, 0],
      };
      var ge = (() => (
          ((ge = ge || {})[(ge.Decimal = 0)] = 'Decimal'),
          (ge[(ge.Percent = 1)] = 'Percent'),
          (ge[(ge.Currency = 2)] = 'Currency'),
          (ge[(ge.Scientific = 3)] = 'Scientific'),
          ge
        ))(),
        Ee = (() => (
          ((Ee = Ee || {})[(Ee.Decimal = 0)] = 'Decimal'),
          (Ee[(Ee.Group = 1)] = 'Group'),
          (Ee[(Ee.List = 2)] = 'List'),
          (Ee[(Ee.PercentSign = 3)] = 'PercentSign'),
          (Ee[(Ee.PlusSign = 4)] = 'PlusSign'),
          (Ee[(Ee.MinusSign = 5)] = 'MinusSign'),
          (Ee[(Ee.Exponential = 6)] = 'Exponential'),
          (Ee[(Ee.SuperscriptingExponent = 7)] = 'SuperscriptingExponent'),
          (Ee[(Ee.PerMille = 8)] = 'PerMille'),
          (Ee[(Ee.Infinity = 9)] = 'Infinity'),
          (Ee[(Ee.NaN = 10)] = 'NaN'),
          (Ee[(Ee.TimeSeparator = 11)] = 'TimeSeparator'),
          (Ee[(Ee.CurrencyDecimal = 12)] = 'CurrencyDecimal'),
          (Ee[(Ee.CurrencyGroup = 13)] = 'CurrencyGroup'),
          Ee
        ))();
      function $e(g, w) {
        const b = (0, E.cg1)(g),
          C = b[E.wAp.NumberSymbols][w];
        if (typeof C > 'u') {
          if (w === Ee.CurrencyDecimal)
            return b[E.wAp.NumberSymbols][Ee.Decimal];
          if (w === Ee.CurrencyGroup) return b[E.wAp.NumberSymbols][Ee.Group];
        }
        return C;
      }
      const hi = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
      function rr(g, w, b, C, T) {
        const U = (function $r(g, w = '-') {
          const b = {
              minInt: 1,
              minFrac: 0,
              maxFrac: 0,
              posPre: '',
              posSuf: '',
              negPre: '',
              negSuf: '',
              gSize: 0,
              lgSize: 0,
            },
            C = g.split(';'),
            T = C[0],
            P = C[1],
            U =
              -1 !== T.indexOf('.')
                ? T.split('.')
                : [
                    T.substring(0, T.lastIndexOf('0') + 1),
                    T.substring(T.lastIndexOf('0') + 1),
                  ],
            _e = U[0],
            st = U[1] || '';
          b.posPre = _e.substring(0, _e.indexOf('#'));
          for (let at = 0; at < st.length; at++) {
            const tt = st.charAt(at);
            '0' === tt
              ? (b.minFrac = b.maxFrac = at + 1)
              : '#' === tt
              ? (b.maxFrac = at + 1)
              : (b.posSuf += tt);
          }
          const ut = _e.split(',');
          if (
            ((b.gSize = ut[1] ? ut[1].length : 0),
            (b.lgSize = ut[2] || ut[1] ? (ut[2] || ut[1]).length : 0),
            P)
          ) {
            const at = T.length - b.posPre.length - b.posSuf.length,
              tt = P.indexOf('#');
            (b.negPre = P.substring(0, tt).replace(/'/g, '')),
              (b.negSuf = P.slice(tt + at).replace(/'/g, ''));
          } else (b.negPre = w + b.posPre), (b.negSuf = b.posSuf);
          return b;
        })(
          (function Mt(g, w) {
            return (0, E.cg1)(g)[E.wAp.NumberFormats][w];
          })(w, ge.Currency),
          $e(w, Ee.MinusSign)
        );
        return (
          (U.minFrac = (function yh(g) {
            let w;
            const b = le[g];
            return b && (w = b[2]), 'number' == typeof w ? w : 2;
          })(C)),
          (U.maxFrac = U.minFrac),
          (function ei(g, w, b, C, T, P, U = !1) {
            let _e = '',
              st = !1;
            if (isFinite(g)) {
              let ut = (function Qs(g) {
                let C,
                  T,
                  P,
                  U,
                  _e,
                  w = Math.abs(g) + '',
                  b = 0;
                for (
                  (T = w.indexOf('.')) > -1 && (w = w.replace('.', '')),
                    (P = w.search(/e/i)) > 0
                      ? (T < 0 && (T = P),
                        (T += +w.slice(P + 1)),
                        (w = w.substring(0, P)))
                      : T < 0 && (T = w.length),
                    P = 0;
                  '0' === w.charAt(P);
                  P++
                );
                if (P === (_e = w.length)) (C = [0]), (T = 1);
                else {
                  for (_e--; '0' === w.charAt(_e); ) _e--;
                  for (T -= P, C = [], U = 0; P <= _e; P++, U++)
                    C[U] = Number(w.charAt(P));
                }
                return (
                  T > 22 && ((C = C.splice(0, 21)), (b = T - 1), (T = 1)),
                  { digits: C, exponent: b, integerLen: T }
                );
              })(g);
              U &&
                (ut = (function _d(g) {
                  if (0 === g.digits[0]) return g;
                  const w = g.digits.length - g.integerLen;
                  return (
                    g.exponent
                      ? (g.exponent += 2)
                      : (0 === w
                          ? g.digits.push(0, 0)
                          : 1 === w && g.digits.push(0),
                        (g.integerLen += 2)),
                    g
                  );
                })(ut));
              let at = w.minInt,
                tt = w.minFrac,
                qt = w.maxFrac;
              if (P) {
                const ii = P.match(hi);
                if (null === ii)
                  throw new Error(`${P} is not a valid digit info`);
                const Hi = ii[1],
                  pr = ii[3],
                  Yo = ii[5];
                null != Hi && (at = zr(Hi)),
                  null != pr && (tt = zr(pr)),
                  null != Yo
                    ? (qt = zr(Yo))
                    : null != pr && tt > qt && (qt = tt);
              }
              !(function Xs(g, w, b) {
                if (w > b)
                  throw new Error(
                    `The minimum number of digits after fraction (${w}) is higher than the maximum (${b}).`
                  );
                let C = g.digits,
                  T = C.length - g.integerLen;
                const P = Math.min(Math.max(w, T), b);
                let U = P + g.integerLen,
                  _e = C[U];
                if (U > 0) {
                  C.splice(Math.max(g.integerLen, U));
                  for (let tt = U; tt < C.length; tt++) C[tt] = 0;
                } else {
                  (T = Math.max(0, T)),
                    (g.integerLen = 1),
                    (C.length = Math.max(1, (U = P + 1))),
                    (C[0] = 0);
                  for (let tt = 1; tt < U; tt++) C[tt] = 0;
                }
                if (_e >= 5)
                  if (U - 1 < 0) {
                    for (let tt = 0; tt > U; tt--) C.unshift(0), g.integerLen++;
                    C.unshift(1), g.integerLen++;
                  } else C[U - 1]++;
                for (; T < Math.max(0, P); T++) C.push(0);
                let st = 0 !== P;
                const ut = w + g.integerLen,
                  at = C.reduceRight(function (tt, qt, pt, kt) {
                    return (
                      (kt[pt] = (qt += tt) < 10 ? qt : qt - 10),
                      st && (0 === kt[pt] && pt >= ut ? kt.pop() : (st = !1)),
                      qt >= 10 ? 1 : 0
                    );
                  }, 0);
                at && (C.unshift(at), g.integerLen++);
              })(ut, tt, qt);
              let pt = ut.digits,
                kt = ut.integerLen;
              const ni = ut.exponent;
              let En = [];
              for (st = pt.every((ii) => !ii); kt < at; kt++) pt.unshift(0);
              for (; kt < 0; kt++) pt.unshift(0);
              kt > 0
                ? (En = pt.splice(kt, pt.length))
                : ((En = pt), (pt = [0]));
              const Wt = [];
              for (
                pt.length >= w.lgSize &&
                Wt.unshift(pt.splice(-w.lgSize, pt.length).join(''));
                pt.length > w.gSize;

              )
                Wt.unshift(pt.splice(-w.gSize, pt.length).join(''));
              pt.length && Wt.unshift(pt.join('')),
                (_e = Wt.join($e(b, C))),
                En.length && (_e += $e(b, T) + En.join('')),
                ni && (_e += $e(b, Ee.Exponential) + '+' + ni);
            } else _e = $e(b, Ee.Infinity);
            return (
              (_e =
                g < 0 && !st
                  ? w.negPre + _e + w.negSuf
                  : w.posPre + _e + w.posSuf),
              _e
            );
          })(g, U, w, Ee.CurrencyGroup, Ee.CurrencyDecimal, T)
            .replace('\xa4', b)
            .replace('\xa4', '')
            .trim()
        );
      }
      function zr(g) {
        const w = parseInt(g);
        if (isNaN(w))
          throw new Error('Invalid integer literal when parsing ' + g);
        return w;
      }
      function ln(g, w) {
        w = encodeURIComponent(w);
        for (const b of g.split(';')) {
          const C = b.indexOf('='),
            [T, P] = -1 == C ? [b, ''] : [b.slice(0, C), b.slice(C + 1)];
          if (T.trim() === w) return decodeURIComponent(P);
        }
        return null;
      }
      const Ln = /\s+/,
        de = [];
      let qe = (() => {
        class g {
          constructor(b, C, T, P) {
            (this._iterableDiffers = b),
              (this._keyValueDiffers = C),
              (this._ngEl = T),
              (this._renderer = P),
              (this.initialClasses = de),
              (this.stateMap = new Map());
          }
          set klass(b) {
            this.initialClasses = null != b ? b.trim().split(Ln) : de;
          }
          set ngClass(b) {
            this.rawClass = 'string' == typeof b ? b.trim().split(Ln) : b;
          }
          ngDoCheck() {
            for (const C of this.initialClasses) this._updateState(C, !0);
            const b = this.rawClass;
            if (Array.isArray(b) || b instanceof Set)
              for (const C of b) this._updateState(C, !0);
            else if (null != b)
              for (const C of Object.keys(b))
                this._updateState(C, Boolean(b[C]));
            this._applyStateDiff();
          }
          _updateState(b, C) {
            const T = this.stateMap.get(b);
            void 0 !== T
              ? (T.enabled !== C && ((T.changed = !0), (T.enabled = C)),
                (T.touched = !0))
              : this.stateMap.set(b, { enabled: C, changed: !0, touched: !0 });
          }
          _applyStateDiff() {
            for (const b of this.stateMap) {
              const C = b[0],
                T = b[1];
              T.changed
                ? (this._toggleClass(C, T.enabled), (T.changed = !1))
                : T.touched ||
                  (T.enabled && this._toggleClass(C, !1),
                  this.stateMap.delete(C)),
                (T.touched = !1);
            }
          }
          _toggleClass(b, C) {
            (b = b.trim()).length > 0 &&
              b.split(Ln).forEach((T) => {
                C
                  ? this._renderer.addClass(this._ngEl.nativeElement, T)
                  : this._renderer.removeClass(this._ngEl.nativeElement, T);
              });
          }
        }
        return (
          (g.??fac = function (b) {
            return new (b || g)(
              E.Y36(E.ZZ4),
              E.Y36(E.aQg),
              E.Y36(E.SBq),
              E.Y36(E.Qsj)
            );
          }),
          (g.??dir = E.lG2({
            type: g,
            selectors: [['', 'ngClass', '']],
            inputs: { klass: ['class', 'klass'], ngClass: 'ngClass' },
            standalone: !0,
          })),
          g
        );
      })();
      class $t {
        constructor(w, b, C, T) {
          (this.$implicit = w),
            (this.ngForOf = b),
            (this.index = C),
            (this.count = T);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let vt = (() => {
        class g {
          set ngForOf(b) {
            (this._ngForOf = b), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(b) {
            this._trackByFn = b;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(b, C, T) {
            (this._viewContainer = b),
              (this._template = C),
              (this._differs = T),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(b) {
            b && (this._template = b);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const b = this._ngForOf;
              !this._differ &&
                b &&
                (this._differ = this._differs
                  .find(b)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const b = this._differ.diff(this._ngForOf);
              b && this._applyChanges(b);
            }
          }
          _applyChanges(b) {
            const C = this._viewContainer;
            b.forEachOperation((T, P, U) => {
              if (null == T.previousIndex)
                C.createEmbeddedView(
                  this._template,
                  new $t(T.item, this._ngForOf, -1, -1),
                  null === U ? void 0 : U
                );
              else if (null == U) C.remove(null === P ? void 0 : P);
              else if (null !== P) {
                const _e = C.get(P);
                C.move(_e, U), dt(_e, T);
              }
            });
            for (let T = 0, P = C.length; T < P; T++) {
              const _e = C.get(T).context;
              (_e.index = T), (_e.count = P), (_e.ngForOf = this._ngForOf);
            }
            b.forEachIdentityChange((T) => {
              dt(C.get(T.currentIndex), T);
            });
          }
          static ngTemplateContextGuard(b, C) {
            return !0;
          }
        }
        return (
          (g.??fac = function (b) {
            return new (b || g)(E.Y36(E.s_b), E.Y36(E.Rgc), E.Y36(E.ZZ4));
          }),
          (g.??dir = E.lG2({
            type: g,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: {
              ngForOf: 'ngForOf',
              ngForTrackBy: 'ngForTrackBy',
              ngForTemplate: 'ngForTemplate',
            },
            standalone: !0,
          })),
          g
        );
      })();
      function dt(g, w) {
        g.context.$implicit = w.item;
      }
      let qr = (() => {
        class g {
          constructor(b, C) {
            (this._viewContainer = b),
              (this._context = new We()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = C);
          }
          set ngIf(b) {
            (this._context.$implicit = this._context.ngIf = b),
              this._updateView();
          }
          set ngIfThen(b) {
            Wr('ngIfThen', b),
              (this._thenTemplateRef = b),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(b) {
            Wr('ngIfElse', b),
              (this._elseTemplateRef = b),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(b, C) {
            return !0;
          }
        }
        return (
          (g.??fac = function (b) {
            return new (b || g)(E.Y36(E.s_b), E.Y36(E.Rgc));
          }),
          (g.??dir = E.lG2({
            type: g,
            selectors: [['', 'ngIf', '']],
            inputs: {
              ngIf: 'ngIf',
              ngIfThen: 'ngIfThen',
              ngIfElse: 'ngIfElse',
            },
            standalone: !0,
          })),
          g
        );
      })();
      class We {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Wr(g, w) {
        if (w && !w.createEmbeddedView)
          throw new Error(
            `${g} must be a TemplateRef, but received '${(0, E.AaK)(w)}'.`
          );
      }
      class pi {
        constructor(w, b) {
          (this._viewContainerRef = w),
            (this._templateRef = b),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(w) {
          w && !this._created
            ? this.create()
            : !w && this._created && this.destroy();
        }
      }
      let or = (() => {
          class g {
            constructor() {
              (this._defaultViews = []),
                (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(b) {
              (this._ngSwitch = b),
                0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(b) {
              this._defaultViews.push(b);
            }
            _matchCase(b) {
              const C = b == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || C),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                C
              );
            }
            _updateDefaultCases(b) {
              if (this._defaultViews.length > 0 && b !== this._defaultUsed) {
                this._defaultUsed = b;
                for (const C of this._defaultViews) C.enforceState(b);
              }
            }
          }
          return (
            (g.??fac = function (b) {
              return new (b || g)();
            }),
            (g.??dir = E.lG2({
              type: g,
              selectors: [['', 'ngSwitch', '']],
              inputs: { ngSwitch: 'ngSwitch' },
              standalone: !0,
            })),
            g
          );
        })(),
        mi = (() => {
          class g {
            constructor(b, C, T) {
              (this.ngSwitch = T), T._addCase(), (this._view = new pi(b, C));
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              );
            }
          }
          return (
            (g.??fac = function (b) {
              return new (b || g)(E.Y36(E.s_b), E.Y36(E.Rgc), E.Y36(or, 9));
            }),
            (g.??dir = E.lG2({
              type: g,
              selectors: [['', 'ngSwitchCase', '']],
              inputs: { ngSwitchCase: 'ngSwitchCase' },
              standalone: !0,
            })),
            g
          );
        })(),
        Vo = (() => {
          class g {
            constructor(b) {
              (this._viewContainerRef = b),
                (this._viewRef = null),
                (this.ngTemplateOutletContext = null),
                (this.ngTemplateOutlet = null),
                (this.ngTemplateOutletInjector = null);
            }
            ngOnChanges(b) {
              if (b.ngTemplateOutlet || b.ngTemplateOutletInjector) {
                const C = this._viewContainerRef;
                if (
                  (this._viewRef && C.remove(C.indexOf(this._viewRef)),
                  this.ngTemplateOutlet)
                ) {
                  const {
                    ngTemplateOutlet: T,
                    ngTemplateOutletContext: P,
                    ngTemplateOutletInjector: U,
                  } = this;
                  this._viewRef = C.createEmbeddedView(
                    T,
                    P,
                    U ? { injector: U } : void 0
                  );
                } else this._viewRef = null;
              } else
                this._viewRef &&
                  b.ngTemplateOutletContext &&
                  this.ngTemplateOutletContext &&
                  (this._viewRef.context = this.ngTemplateOutletContext);
            }
          }
          return (
            (g.??fac = function (b) {
              return new (b || g)(E.Y36(E.s_b));
            }),
            (g.??dir = E.lG2({
              type: g,
              selectors: [['', 'ngTemplateOutlet', '']],
              inputs: {
                ngTemplateOutletContext: 'ngTemplateOutletContext',
                ngTemplateOutlet: 'ngTemplateOutlet',
                ngTemplateOutletInjector: 'ngTemplateOutletInjector',
              },
              standalone: !0,
              features: [E.TTD],
            })),
            g
          );
        })();
      let Bo = (() => {
        class g {
          constructor(b, C = 'USD') {
            (this._locale = b), (this._defaultCurrencyCode = C);
          }
          transform(b, C = this._defaultCurrencyCode, T = 'symbol', P, U) {
            if (
              !(function Ol(g) {
                return !(null == g || '' === g || g != g);
              })(b)
            )
              return null;
            (U = U || this._locale),
              'boolean' == typeof T && (T = T ? 'symbol' : 'code');
            let _e = C || this._defaultCurrencyCode;
            'code' !== T &&
              (_e =
                'symbol' === T || 'symbol-narrow' === T
                  ? (function Le(g, w, b = 'en') {
                      const C =
                          (function qn(g) {
                            return (0, E.cg1)(g)[E.wAp.Currencies];
                          })(b)[g] ||
                          le[g] ||
                          [],
                        T = C[1];
                      return 'narrow' === w && 'string' == typeof T
                        ? T
                        : C[0] || g;
                    })(_e, 'symbol' === T ? 'wide' : 'narrow', U)
                  : T);
            try {
              return rr(
                (function Ho(g) {
                  if ('string' == typeof g && !isNaN(Number(g) - parseFloat(g)))
                    return Number(g);
                  if ('number' != typeof g)
                    throw new Error(`${g} is not a number`);
                  return g;
                })(b),
                U,
                _e,
                C,
                P
              );
            } catch (st) {
              throw (function Vn(g, w) {
                return new E.vHH(2100, !1);
              })();
            }
          }
        }
        return (
          (g.??fac = function (b) {
            return new (b || g)(E.Y36(E.soG, 16), E.Y36(E.EJc, 16));
          }),
          (g.??pipe = E.Yjl({
            name: 'currency',
            type: g,
            pure: !0,
            standalone: !0,
          })),
          g
        );
      })();
      let T_ = (() => {
        class g {}
        return (
          (g.??fac = function (b) {
            return new (b || g)();
          }),
          (g.??mod = E.oAB({ type: g })),
          (g.??inj = E.cJS({})),
          g
        );
      })();
      const xh = 'browser';
      function F_(g) {
        return g === xh;
      }
      let Nl = (() => {
        class g {}
        return (
          (g.??prov = (0, E.Yz7)({
            token: g,
            providedIn: 'root',
            factory: () => new na((0, E.LFG)(J), window),
          })),
          g
        );
      })();
      class na {
        constructor(w, b) {
          (this.document = w), (this.window = b), (this.offset = () => [0, 0]);
        }
        setOffset(w) {
          this.offset = Array.isArray(w) ? () => w : w;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(w) {
          this.supportsScrolling() && this.window.scrollTo(w[0], w[1]);
        }
        scrollToAnchor(w) {
          if (!this.supportsScrolling()) return;
          const b = (function Xr(g, w) {
            const b = g.getElementById(w) || g.getElementsByName(w)[0];
            if (b) return b;
            if (
              'function' == typeof g.createTreeWalker &&
              g.body &&
              (g.body.createShadowRoot || g.body.attachShadow)
            ) {
              const C = g.createTreeWalker(g.body, NodeFilter.SHOW_ELEMENT);
              let T = C.currentNode;
              for (; T; ) {
                const P = T.shadowRoot;
                if (P) {
                  const U =
                    P.getElementById(w) || P.querySelector(`[name="${w}"]`);
                  if (U) return U;
                }
                T = C.nextNode();
              }
            }
            return null;
          })(this.document, w);
          b && (this.scrollToElement(b), b.focus());
        }
        setHistoryScrollRestoration(w) {
          if (this.supportScrollRestoration()) {
            const b = this.window.history;
            b && b.scrollRestoration && (b.scrollRestoration = w);
          }
        }
        scrollToElement(w) {
          const b = w.getBoundingClientRect(),
            C = b.left + this.window.pageXOffset,
            T = b.top + this.window.pageYOffset,
            P = this.offset();
          this.window.scrollTo(C - P[0], T - P[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const w =
              lr(this.window.history) ||
              lr(Object.getPrototypeOf(this.window.history));
            return !(!w || (!w.writable && !w.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              'pageXOffset' in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function lr(g) {
        return Object.getOwnPropertyDescriptor(g, 'scrollRestoration');
      }
      class Jr {}
    },
    650: (Je, oe, F) => {
      F.d(oe, {
        $8M: () => gr,
        $WT: () => Gr,
        $Z: () => Vu,
        AFp: () => Yg,
        ALo: () => Cg,
        AaK: () => fe,
        CHM: () => ra,
        CRH: () => Lf,
        CZH: () => Kc,
        CqO: () => Wy,
        D6c: () => vw,
        EJc: () => Jg,
        EiD: () => bu,
        EpF: () => Gy,
        F$t: () => xm,
        F4k: () => qy,
        FYo: () => Rp,
        FiY: () => Lt,
        Gf: () => T0,
        GfV: () => Gb,
        Gpc: () => j,
        Hsn: () => Jy,
        Ikx: () => jm,
        JOm: () => zi,
        JVY: () => vb,
        JZr: () => it,
        KtG: () => Mh,
        L6k: () => wb,
        LAX: () => xb,
        LFG: () => Pt,
        LSH: () => yu,
        Lbi: () => q0,
        Lck: () => a0,
        MAs: () => $y,
        MGl: () => Sc,
        MMx: () => Sf,
        MR2: () => Pb,
        NdJ: () => Dm,
        O4$: () => Gl,
        OlP: () => wt,
        Oqu: () => Nm,
        P3R: () => Dp,
        PXZ: () => aw,
        Q6J: () => gm,
        QGY: () => wm,
        QbO: () => Xg,
        Qsj: () => zb,
        R0b: () => Xn,
        RDi: () => fp,
        Rgc: () => Vs,
        SBq: () => Va,
        Sil: () => K0,
        Suo: () => fl,
        TTD: () => Pl,
        TgZ: () => Ju,
        Udp: () => Rm,
        VKq: () => b0,
        W1O: () => Vf,
        XFs: () => Le,
        Xpm: () => ei,
        Xts: () => vu,
        Y36: () => Fr,
        YKP: () => fg,
        YNc: () => jy,
        Yjl: () => zr,
        Yz7: () => $e,
        Z0I: () => Jn,
        ZZ4: () => wl,
        _Bn: () => Ef,
        _UZ: () => bm,
        _Vd: () => La,
        _c5: () => bw,
        _uU: () => pv,
        aQg: () => uh,
        c2e: () => W0,
        cJS: () => Xt,
        cg1: () => St,
        dDg: () => iw,
        dqk: () => Xe,
        eBb: () => Db,
        eFA: () => u_,
        ekj: () => Om,
        eoX: () => c_,
        f3M: () => pd,
        g9A: () => Kg,
        h0i: () => Ps,
        hGG: () => yw,
        hij: () => uf,
        iGM: () => Pg,
        ifc: () => Nn,
        ip1: () => Wg,
        jDz: () => pg,
        kL8: () => Iv,
        kcU: () => ql,
        lG2: () => Xs,
        lcZ: () => D0,
        lqb: () => _o,
        lri: () => a_,
        mCW: () => uc,
        n5z: () => un,
        oAB: () => $r,
        oxw: () => Xy,
        pB0: () => qw,
        q3G: () => It,
        qLn: () => Ds,
        qOj: () => hm,
        qZA: () => ef,
        qzn: () => ms,
        rWj: () => l_,
        sBO: () => cC,
        s_b: () => Rf,
        soG: () => Xc,
        tb: () => Qg,
        tp0: () => vr,
        uIk: () => mm,
        vHH: () => Y,
        vpe: () => Di,
        wAp: () => Me,
        xp6: () => yi,
        z2F: () => js,
        z3N: () => $n,
        zSh: () => ka,
        zs3: () => Tr,
      });
      var E = F(579),
        d = F(727),
        ne = F(751),
        te = F(451),
        K = F(99);
      function J(n) {
        for (let i in n) if (n[i] === J) return i;
        throw Error('Could not find renamed property on target object.');
      }
      function ue(n, i) {
        for (const s in i)
          i.hasOwnProperty(s) && !n.hasOwnProperty(s) && (n[s] = i[s]);
      }
      function fe(n) {
        if ('string' == typeof n) return n;
        if (Array.isArray(n)) return '[' + n.map(fe).join(', ') + ']';
        if (null == n) return '' + n;
        if (n.overriddenName) return `${n.overriddenName}`;
        if (n.name) return `${n.name}`;
        const i = n.toString();
        if (null == i) return '' + i;
        const s = i.indexOf('\n');
        return -1 === s ? i : i.substring(0, s);
      }
      function ye(n, i) {
        return null == n || '' === n
          ? null === i
            ? ''
            : i
          : null == i || '' === i
          ? n
          : n + ' ' + i;
      }
      const q = J({ __forward_ref__: J });
      function j(n) {
        return (
          (n.__forward_ref__ = j),
          (n.toString = function () {
            return fe(this());
          }),
          n
        );
      }
      function L(n) {
        return Ge(n) ? n() : n;
      }
      function Ge(n) {
        return (
          'function' == typeof n &&
          n.hasOwnProperty(q) &&
          n.__forward_ref__ === j
        );
      }
      function he(n) {
        return n && !!n.??providers;
      }
      const it = 'https://g.co/ng/security#xss';
      class Y extends Error {
        constructor(i, s) {
          super(
            (function Qe(n, i) {
              return `NG0${Math.abs(n)}${i ? ': ' + i.trim() : ''}`;
            })(i, s)
          ),
            (this.code = i);
        }
      }
      function me(n) {
        return 'string' == typeof n ? n : null == n ? '' : String(n);
      }
      function et(n, i) {
        throw new Y(-201, !1);
      }
      function De(n, i) {
        null == n &&
          (function ve(n, i, s, a) {
            throw new Error(
              `ASSERTION ERROR: ${n}` +
                (null == a ? '' : ` [Expected=> ${s} ${a} ${i} <=Actual]`)
            );
          })(i, n, null, '!=');
      }
      function $e(n) {
        return {
          token: n.token,
          providedIn: n.providedIn || null,
          factory: n.factory,
          value: void 0,
        };
      }
      function Xt(n) {
        return { providers: n.providers || [], imports: n.imports || [] };
      }
      function On(n) {
        return qn(n, Ur) || qn(n, an);
      }
      function Jn(n) {
        return null !== On(n);
      }
      function qn(n, i) {
        return n.hasOwnProperty(i) ? n[i] : null;
      }
      function Cl(n) {
        return n && (n.hasOwnProperty(Ws) || n.hasOwnProperty(Po))
          ? n[Ws]
          : null;
      }
      const Ur = J({ ??prov: J }),
        Ws = J({ ??inj: J }),
        an = J({ ngInjectableDef: J }),
        Po = J({ ngInjectorDef: J });
      var Le = (() => (
        ((Le = Le || {})[(Le.Default = 0)] = 'Default'),
        (Le[(Le.Host = 1)] = 'Host'),
        (Le[(Le.Self = 2)] = 'Self'),
        (Le[(Le.SkipSelf = 4)] = 'SkipSelf'),
        (Le[(Le.Optional = 8)] = 'Optional'),
        Le
      ))();
      let Ys;
      function yn(n) {
        const i = Ys;
        return (Ys = n), i;
      }
      function Ti(n, i, s) {
        const a = On(n);
        return a && 'root' == a.providedIn
          ? void 0 === a.value
            ? (a.value = a.factory())
            : a.value
          : s & Le.Optional
          ? null
          : void 0 !== i
          ? i
          : void et(fe(n));
      }
      const Xe = (() =>
          (typeof globalThis < 'u' && globalThis) ||
          (typeof global < 'u' && global) ||
          (typeof window < 'u' && window) ||
          (typeof self < 'u' &&
            typeof WorkerGlobalScope < 'u' &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Jt = {},
        Pn = '__NG_DI_FLAG__',
        Ii = 'ngTempTokenPath',
        El = /\n/gm,
        hd = '__source';
      let ct;
      function ir(n) {
        const i = ct;
        return (ct = n), i;
      }
      function Zs(n, i = Le.Default) {
        if (void 0 === ct) throw new Y(-203, !1);
        return null === ct
          ? Ti(n, void 0, i)
          : ct.get(n, i & Le.Optional ? null : void 0, i);
      }
      function Pt(n, i = Le.Default) {
        return (
          (function yh() {
            return Ys;
          })() || Zs
        )(L(n), i);
      }
      function pd(n, i = Le.Default) {
        return Pt(n, ko(i));
      }
      function ko(n) {
        return typeof n > 'u' || 'number' == typeof n
          ? n
          : 0 |
              (n.optional && 8) |
              (n.host && 1) |
              (n.self && 2) |
              (n.skipSelf && 4);
      }
      function jr(n) {
        const i = [];
        for (let s = 0; s < n.length; s++) {
          const a = L(n[s]);
          if (Array.isArray(a)) {
            if (0 === a.length) throw new Y(900, !1);
            let c,
              u = Le.Default;
            for (let h = 0; h < a.length; h++) {
              const m = a[h],
                _ = Ml(m);
              'number' == typeof _
                ? -1 === _
                  ? (c = m.token)
                  : (u |= _)
                : (c = m);
            }
            i.push(Pt(c, u));
          } else i.push(Pt(a));
        }
        return i;
      }
      function Fi(n, i) {
        return (n[Pn] = i), (n.prototype[Pn] = i), n;
      }
      function Ml(n) {
        return n[Pn];
      }
      function Ri(n) {
        return { toString: n }.toString();
      }
      var Wn = (() => (
          ((Wn = Wn || {})[(Wn.OnPush = 0)] = 'OnPush'),
          (Wn[(Wn.Default = 1)] = 'Default'),
          Wn
        ))(),
        Nn = (() => {
          return (
            ((n = Nn || (Nn = {}))[(n.Emulated = 0)] = 'Emulated'),
            (n[(n.None = 2)] = 'None'),
            (n[(n.ShadowDom = 3)] = 'ShadowDom'),
            Nn
          );
          var n;
        })();
      const hi = {},
        Ie = [],
        en = J({ ??cmp: J }),
        Oi = J({ ??dir: J }),
        Ks = J({ ??pipe: J }),
        Al = J({ ??mod: J }),
        kn = J({ ??fac: J }),
        Pi = J({ __NG_ELEMENT_ID__: J });
      let gd = 0;
      function ei(n) {
        return Ri(() => {
          const s = !0 === n.standalone,
            a = {},
            c = {
              type: n.type,
              providersResolver: null,
              decls: n.decls,
              vars: n.vars,
              factory: null,
              template: n.template || null,
              consts: n.consts || null,
              ngContentSelectors: n.ngContentSelectors,
              hostBindings: n.hostBindings || null,
              hostVars: n.hostVars || 0,
              hostAttrs: n.hostAttrs || null,
              contentQueries: n.contentQueries || null,
              declaredInputs: a,
              inputs: null,
              outputs: null,
              exportAs: n.exportAs || null,
              onPush: n.changeDetection === Wn.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: s,
              dependencies: (s && n.dependencies) || null,
              getStandaloneInjector: null,
              selectors: n.selectors || Ie,
              viewQuery: n.viewQuery || null,
              features: n.features || null,
              data: n.data || {},
              encapsulation: n.encapsulation || Nn.Emulated,
              id: 'c' + gd++,
              styles: n.styles || Ie,
              _: null,
              setInput: null,
              schemas: n.schemas || null,
              tView: null,
              findHostDirectiveDefs: null,
              hostDirectives: null,
            },
            u = n.dependencies,
            h = n.features;
          return (
            (c.inputs = Qs(n.inputs, a)),
            (c.outputs = Qs(n.outputs)),
            h && h.forEach((m) => m(c)),
            (c.directiveDefs = u
              ? () => ('function' == typeof u ? u() : u).map(Nt).filter(Pe)
              : null),
            (c.pipeDefs = u
              ? () => ('function' == typeof u ? u() : u).map(_t).filter(Pe)
              : null),
            c
          );
        });
      }
      function Nt(n) {
        return rt(n) || Dt(n);
      }
      function Pe(n) {
        return null !== n;
      }
      function $r(n) {
        return Ri(() => ({
          type: n.type,
          bootstrap: n.bootstrap || Ie,
          declarations: n.declarations || Ie,
          imports: n.imports || Ie,
          exports: n.exports || Ie,
          transitiveCompileScopes: null,
          schemas: n.schemas || null,
          id: n.id || null,
        }));
      }
      function Qs(n, i) {
        if (null == n) return hi;
        const s = {};
        for (const a in n)
          if (n.hasOwnProperty(a)) {
            let c = n[a],
              u = c;
            Array.isArray(c) && ((u = c[1]), (c = c[0])),
              (s[c] = a),
              i && (i[c] = u);
          }
        return s;
      }
      const Xs = ei;
      function zr(n) {
        return {
          type: n.type,
          name: n.name,
          factory: null,
          pure: !1 !== n.pure,
          standalone: !0 === n.standalone,
          onDestroy: n.type.prototype.ngOnDestroy || null,
        };
      }
      function rt(n) {
        return n[en] || null;
      }
      function Dt(n) {
        return n[Oi] || null;
      }
      function _t(n) {
        return n[Ks] || null;
      }
      function Gr(n) {
        const i = rt(n) || Dt(n) || _t(n);
        return null !== i && i.standalone;
      }
      function ln(n, i) {
        const s = n[Al] || null;
        if (!s && !0 === i)
          throw new Error(`Type ${fe(n)} does not have '\u0275mod' property.`);
        return s;
      }
      function cn(n) {
        return Array.isArray(n) && 'object' == typeof n[1];
      }
      function wn(n) {
        return Array.isArray(n) && !0 === n[1];
      }
      function Kr(n) {
        return 0 != (4 & n.flags);
      }
      function _i(n) {
        return n.componentOffset > -1;
      }
      function Qr(n) {
        return 1 == (1 & n.flags);
      }
      function Dn(n) {
        return null !== n.template;
      }
      function Tl(n) {
        return 0 != (256 & n[2]);
      }
      function ki(n, i) {
        return n.hasOwnProperty(kn) ? n[kn] : null;
      }
      class Ch {
        constructor(i, s, a) {
          (this.previousValue = i),
            (this.currentValue = s),
            (this.firstChange = a);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Pl() {
        return Nl;
      }
      function Nl(n) {
        return n.type.prototype.ngOnChanges && (n.setInput = lr), na;
      }
      function na() {
        const n = cr(this),
          i = n?.current;
        if (i) {
          const s = n.previous;
          if (s === hi) n.previous = i;
          else for (let a in i) s[a] = i[a];
          (n.current = null), this.ngOnChanges(i);
        }
      }
      function lr(n, i, s, a) {
        const c = this.declaredInputs[s],
          u =
            cr(n) ||
            (function Jr(n, i) {
              return (n[Xr] = i);
            })(n, { previous: hi, current: null }),
          h = u.current || (u.current = {}),
          m = u.previous,
          _ = m[c];
        (h[c] = new Ch(_ && _.currentValue, i, m === hi)), (n[a] = i);
      }
      Pl.ngInherit = !0;
      const Xr = '__ngSimpleChanges__';
      function cr(n) {
        return n[Xr] || null;
      }
      function Ht(n) {
        for (; Array.isArray(n); ) n = n[0];
        return n;
      }
      function to(n, i) {
        return Ht(i[n]);
      }
      function Ut(n, i) {
        return Ht(i[n.index]);
      }
      function wd(n, i) {
        return n.data[i];
      }
      function no(n, i) {
        return n[i];
      }
      function xn(n, i) {
        const s = i[n];
        return cn(s) ? s : s[0];
      }
      function dr(n) {
        return 64 == (64 & n[2]);
      }
      function Bn(n, i) {
        return null == i ? null : n[i];
      }
      function ro(n) {
        n[18] = 0;
      }
      function ur(n, i) {
        n[5] += i;
        let s = n,
          a = n[3];
        for (
          ;
          null !== a && ((1 === i && 1 === s[5]) || (-1 === i && 0 === s[5]));

        )
          (a[5] += i), (s = a), (a = a[3]);
      }
      const Ue = { lFrame: Ad(null), bindingsEnabled: !0 };
      function Bl() {
        return Ue.bindingsEnabled;
      }
      function N() {
        return Ue.lFrame.lView;
      }
      function ot() {
        return Ue.lFrame.tView;
      }
      function ra(n) {
        return (Ue.lFrame.contextLView = n), n[8];
      }
      function Mh(n) {
        return (Ue.lFrame.contextLView = null), n;
      }
      function nn() {
        let n = oa();
        for (; null !== n && 64 === n.type; ) n = n.parent;
        return n;
      }
      function oa() {
        return Ue.lFrame.currentTNode;
      }
      function Hn(n, i) {
        const s = Ue.lFrame;
        (s.currentTNode = n), (s.isParent = i);
      }
      function qo() {
        return Ue.lFrame.isParent;
      }
      function Hl() {
        Ue.lFrame.isParent = !1;
      }
      function At() {
        const n = Ue.lFrame;
        let i = n.bindingRootIndex;
        return (
          -1 === i && (i = n.bindingRootIndex = n.tView.bindingStartIndex), i
        );
      }
      function hr() {
        return Ue.lFrame.bindingIndex++;
      }
      function P_(n, i) {
        const s = Ue.lFrame;
        (s.bindingIndex = s.bindingRootIndex = n), jl(i);
      }
      function jl(n) {
        Ue.lFrame.currentDirectiveIndex = n;
      }
      function Sd() {
        return Ue.lFrame.currentQueryIndex;
      }
      function aa(n) {
        Ue.lFrame.currentQueryIndex = n;
      }
      function Sh(n) {
        const i = n[1];
        return 2 === i.type ? i.declTNode : 1 === i.type ? n[6] : null;
      }
      function $l(n, i, s) {
        if (s & Le.SkipSelf) {
          let c = i,
            u = n;
          for (
            ;
            !((c = c.parent),
            null !== c ||
              s & Le.Host ||
              ((c = Sh(u)), null === c || ((u = u[15]), 10 & c.type)));

          );
          if (null === c) return !1;
          (i = c), (n = u);
        }
        const a = (Ue.lFrame = la());
        return (a.currentTNode = i), (a.lView = n), !0;
      }
      function oo(n) {
        const i = la(),
          s = n[1];
        (Ue.lFrame = i),
          (i.currentTNode = s.firstChild),
          (i.lView = n),
          (i.tView = s),
          (i.contextLView = n),
          (i.bindingIndex = s.bindingStartIndex),
          (i.inI18n = !1);
      }
      function la() {
        const n = Ue.lFrame,
          i = null === n ? null : n.child;
        return null === i ? Ad(n) : i;
      }
      function Ad(n) {
        const i = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: n,
          child: null,
          inI18n: !1,
        };
        return null !== n && (n.child = i), i;
      }
      function ca() {
        const n = Ue.lFrame;
        return (
          (Ue.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n
        );
      }
      const Td = ca;
      function Id() {
        const n = ca();
        (n.isParent = !0),
          (n.tView = null),
          (n.selectedIndex = -1),
          (n.contextLView = null),
          (n.elementDepthCount = 0),
          (n.currentDirectiveIndex = -1),
          (n.currentNamespace = null),
          (n.bindingRootIndex = -1),
          (n.bindingIndex = -1),
          (n.currentQueryIndex = 0);
      }
      function Qt() {
        return Ue.lFrame.selectedIndex;
      }
      function Bi(n) {
        Ue.lFrame.selectedIndex = n;
      }
      function xt() {
        const n = Ue.lFrame;
        return wd(n.tView, n.selectedIndex);
      }
      function Gl() {
        Ue.lFrame.currentNamespace = 'svg';
      }
      function ql() {
        !(function Ih() {
          Ue.lFrame.currentNamespace = null;
        })();
      }
      function so(n, i) {
        for (let s = i.directiveStart, a = i.directiveEnd; s < a; s++) {
          const u = n.data[s].type.prototype,
            {
              ngAfterContentInit: h,
              ngAfterContentChecked: m,
              ngAfterViewInit: _,
              ngAfterViewChecked: v,
              ngOnDestroy: x,
            } = u;
          h && (n.contentHooks || (n.contentHooks = [])).push(-s, h),
            m &&
              ((n.contentHooks || (n.contentHooks = [])).push(s, m),
              (n.contentCheckHooks || (n.contentCheckHooks = [])).push(s, m)),
            _ && (n.viewHooks || (n.viewHooks = [])).push(-s, _),
            v &&
              ((n.viewHooks || (n.viewHooks = [])).push(s, v),
              (n.viewCheckHooks || (n.viewCheckHooks = [])).push(s, v)),
            null != x && (n.destroyHooks || (n.destroyHooks = [])).push(s, x);
        }
      }
      function ua(n, i, s) {
        b(n, i, 3, s);
      }
      function g(n, i, s, a) {
        (3 & n[2]) === s && b(n, i, s, a);
      }
      function w(n, i) {
        let s = n[2];
        (3 & s) === i && ((s &= 2047), (s += 1), (n[2] = s));
      }
      function b(n, i, s, a) {
        const u = a ?? -1,
          h = i.length - 1;
        let m = 0;
        for (let _ = void 0 !== a ? 65535 & n[18] : 0; _ < h; _++)
          if ('number' == typeof i[_ + 1]) {
            if (((m = i[_]), null != a && m >= a)) break;
          } else
            i[_] < 0 && (n[18] += 65536),
              (m < u || -1 == u) &&
                (C(n, s, i, _), (n[18] = (4294901760 & n[18]) + _ + 2)),
              _++;
      }
      function C(n, i, s, a) {
        const c = s[a] < 0,
          u = s[a + 1],
          m = n[c ? -s[a] : s[a]];
        if (c) {
          if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === i) {
            n[2] += 2048;
            try {
              u.call(m);
            } finally {
            }
          }
        } else
          try {
            u.call(m);
          } finally {
          }
      }
      const T = -1;
      class P {
        constructor(i, s, a) {
          (this.factory = i),
            (this.resolving = !1),
            (this.canSeeViewProviders = s),
            (this.injectImpl = a);
        }
      }
      function kt(n, i, s) {
        let a = 0;
        for (; a < s.length; ) {
          const c = s[a];
          if ('number' == typeof c) {
            if (0 !== c) break;
            a++;
            const u = s[a++],
              h = s[a++],
              m = s[a++];
            n.setAttribute(i, h, m, u);
          } else {
            const u = c,
              h = s[++a];
            En(u) ? n.setProperty(i, u, h) : n.setAttribute(i, u, h), a++;
          }
        }
        return a;
      }
      function ni(n) {
        return 3 === n || 4 === n || 6 === n;
      }
      function En(n) {
        return 64 === n.charCodeAt(0);
      }
      function Wt(n, i) {
        if (null !== i && 0 !== i.length)
          if (null === n || 0 === n.length) n = i.slice();
          else {
            let s = -1;
            for (let a = 0; a < i.length; a++) {
              const c = i[a];
              'number' == typeof c
                ? (s = c)
                : 0 === s ||
                  ii(n, s, c, null, -1 === s || 2 === s ? i[++a] : null);
            }
          }
        return n;
      }
      function ii(n, i, s, a, c) {
        let u = 0,
          h = n.length;
        if (-1 === i) h = -1;
        else
          for (; u < n.length; ) {
            const m = n[u++];
            if ('number' == typeof m) {
              if (m === i) {
                h = -1;
                break;
              }
              if (m > i) {
                h = u - 1;
                break;
              }
            }
          }
        for (; u < n.length; ) {
          const m = n[u];
          if ('number' == typeof m) break;
          if (m === s) {
            if (null === a) return void (null !== c && (n[u + 1] = c));
            if (a === n[u + 1]) return void (n[u + 2] = c);
          }
          u++, null !== a && u++, null !== c && u++;
        }
        -1 !== h && (n.splice(h, 0, i), (u = h + 1)),
          n.splice(u++, 0, s),
          null !== a && n.splice(u++, 0, a),
          null !== c && n.splice(u++, 0, c);
      }
      function Hi(n) {
        return n !== T;
      }
      function pr(n) {
        return 32767 & n;
      }
      function Wl(n, i) {
        let s = (function Yo(n) {
            return n >> 16;
          })(n),
          a = i;
        for (; s > 0; ) (a = a[15]), s--;
        return a;
      }
      let Fd = !0;
      function mr(n) {
        const i = Fd;
        return (Fd = n), i;
      }
      let k_ = 0;
      const Yn = {};
      function Zo(n, i) {
        const s = Pd(n, i);
        if (-1 !== s) return s;
        const a = i[1];
        a.firstCreatePass &&
          ((n.injectorIndex = i.length),
          Od(a.data, n),
          Od(i, null),
          Od(a.blueprint, null));
        const c = Ph(n, i),
          u = n.injectorIndex;
        if (Hi(c)) {
          const h = pr(c),
            m = Wl(c, i),
            _ = m[1].data;
          for (let v = 0; v < 8; v++) i[u + v] = m[h + v] | _[h + v];
        }
        return (i[u + 8] = c), u;
      }
      function Od(n, i) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, i);
      }
      function Pd(n, i) {
        return -1 === n.injectorIndex ||
          (n.parent && n.parent.injectorIndex === n.injectorIndex) ||
          null === i[n.injectorIndex + 8]
          ? -1
          : n.injectorIndex;
      }
      function Ph(n, i) {
        if (n.parent && -1 !== n.parent.injectorIndex)
          return n.parent.injectorIndex;
        let s = 0,
          a = null,
          c = i;
        for (; null !== c; ) {
          if (((a = ha(c)), null === a)) return T;
          if ((s++, (c = c[15]), -1 !== a.injectorIndex))
            return a.injectorIndex | (s << 16);
        }
        return T;
      }
      function Nh(n, i, s) {
        !(function L_(n, i, s) {
          let a;
          'string' == typeof s
            ? (a = s.charCodeAt(0) || 0)
            : s.hasOwnProperty(Pi) && (a = s[Pi]),
            null == a && (a = s[Pi] = k_++);
          const c = 255 & a;
          i.data[n + (c >> 5)] |= 1 << c;
        })(n, i, s);
      }
      function kh(n, i, s) {
        if (s & Le.Optional || void 0 !== n) return n;
        et();
      }
      function Lh(n, i, s, a) {
        if (
          (s & Le.Optional && void 0 === a && (a = null),
          !(s & (Le.Self | Le.Host)))
        ) {
          const c = n[9],
            u = yn(void 0);
          try {
            return c ? c.get(i, a, s & Le.Optional) : Ti(i, a, s & Le.Optional);
          } finally {
            yn(u);
          }
        }
        return kh(a, 0, s);
      }
      function V_(n, i, s, a = Le.Default, c) {
        if (null !== n) {
          if (1024 & i[2]) {
            const h = (function U_(n, i, s, a, c) {
              let u = n,
                h = i;
              for (
                ;
                null !== u && null !== h && 1024 & h[2] && !(256 & h[2]);

              ) {
                const m = B_(u, h, s, a | Le.Self, Yn);
                if (m !== Yn) return m;
                let _ = u.parent;
                if (!_) {
                  const v = h[21];
                  if (v) {
                    const x = v.get(s, Yn, a);
                    if (x !== Yn) return x;
                  }
                  (_ = ha(h)), (h = h[15]);
                }
                u = _;
              }
              return c;
            })(n, i, s, a, Yn);
            if (h !== Yn) return h;
          }
          const u = B_(n, i, s, a, Yn);
          if (u !== Yn) return u;
        }
        return Lh(i, s, a, c);
      }
      function B_(n, i, s, a, c) {
        const u = (function kw(n) {
          if ('string' == typeof n) return n.charCodeAt(0) || 0;
          const i = n.hasOwnProperty(Pi) ? n[Pi] : void 0;
          return 'number' == typeof i ? (i >= 0 ? 255 & i : Ce) : i;
        })(s);
        if ('function' == typeof u) {
          if (!$l(i, n, a)) return a & Le.Host ? kh(c, 0, a) : Lh(i, s, a, c);
          try {
            const h = u(a);
            if (null != h || a & Le.Optional) return h;
            et();
          } finally {
            Td();
          }
        } else if ('number' == typeof u) {
          let h = null,
            m = Pd(n, i),
            _ = T,
            v = a & Le.Host ? i[16][6] : null;
          for (
            (-1 === m || a & Le.SkipSelf) &&
            ((_ = -1 === m ? Ph(n, i) : i[m + 8]),
            _ !== T && Vh(a, !1)
              ? ((h = i[1]), (m = pr(_)), (i = Wl(_, i)))
              : (m = -1));
            -1 !== m;

          ) {
            const x = i[1];
            if (H_(u, m, x.data)) {
              const M = Nw(m, i, s, h, a, v);
              if (M !== Yn) return M;
            }
            (_ = i[m + 8]),
              _ !== T && Vh(a, i[1].data[m + 8] === v) && H_(u, m, i)
                ? ((h = x), (m = pr(_)), (i = Wl(_, i)))
                : (m = -1);
          }
        }
        return c;
      }
      function Nw(n, i, s, a, c, u) {
        const h = i[1],
          m = h.data[n + 8],
          x = Nd(
            m,
            h,
            s,
            null == a ? _i(m) && Fd : a != h && 0 != (3 & m.type),
            c & Le.Host && u === m
          );
        return null !== x ? Ko(i, h, x, m) : Yn;
      }
      function Nd(n, i, s, a, c) {
        const u = n.providerIndexes,
          h = i.data,
          m = 1048575 & u,
          _ = n.directiveStart,
          x = u >> 20,
          I = c ? m + x : n.directiveEnd;
        for (let O = a ? m : m + x; O < I; O++) {
          const k = h[O];
          if ((O < _ && s === k) || (O >= _ && k.type === s)) return O;
        }
        if (c) {
          const O = h[_];
          if (O && Dn(O) && O.type === s) return _;
        }
        return null;
      }
      function Ko(n, i, s, a) {
        let c = n[s];
        const u = i.data;
        if (
          (function U(n) {
            return n instanceof P;
          })(c)
        ) {
          const h = c;
          h.resolving &&
            (function pe(n, i) {
              const s = i ? `. Dependency path: ${i.join(' > ')} > ${n}` : '';
              throw new Y(
                -200,
                `Circular dependency in DI detected for ${n}${s}`
              );
            })(
              (function Fe(n) {
                return 'function' == typeof n
                  ? n.name || n.toString()
                  : 'object' == typeof n &&
                    null != n &&
                    'function' == typeof n.type
                  ? n.type.name || n.type.toString()
                  : me(n);
              })(u[s])
            );
          const m = mr(h.canSeeViewProviders);
          h.resolving = !0;
          const _ = h.injectImpl ? yn(h.injectImpl) : null;
          $l(n, a, Le.Default);
          try {
            (c = n[s] = h.factory(void 0, u, n, a)),
              i.firstCreatePass &&
                s >= a.directiveStart &&
                (function Fh(n, i, s) {
                  const {
                    ngOnChanges: a,
                    ngOnInit: c,
                    ngDoCheck: u,
                  } = i.type.prototype;
                  if (a) {
                    const h = Nl(i);
                    (s.preOrderHooks || (s.preOrderHooks = [])).push(n, h),
                      (
                        s.preOrderCheckHooks || (s.preOrderCheckHooks = [])
                      ).push(n, h);
                  }
                  c &&
                    (s.preOrderHooks || (s.preOrderHooks = [])).push(0 - n, c),
                    u &&
                      ((s.preOrderHooks || (s.preOrderHooks = [])).push(n, u),
                      (
                        s.preOrderCheckHooks || (s.preOrderCheckHooks = [])
                      ).push(n, u));
                })(s, u[s], i);
          } finally {
            null !== _ && yn(_), mr(m), (h.resolving = !1), Td();
          }
        }
        return c;
      }
      function H_(n, i, s) {
        return !!(s[i + (n >> 5)] & (1 << n));
      }
      function Vh(n, i) {
        return !(n & Le.Self || (n & Le.Host && i));
      }
      class fa {
        constructor(i, s) {
          (this._tNode = i), (this._lView = s);
        }
        get(i, s, a) {
          return V_(this._tNode, this._lView, i, ko(a), s);
        }
      }
      function Ce() {
        return new fa(nn(), N());
      }
      function un(n) {
        return Ri(() => {
          const i = n.prototype.constructor,
            s = i[kn] || Mn(i),
            a = Object.prototype;
          let c = Object.getPrototypeOf(n.prototype).constructor;
          for (; c && c !== a; ) {
            const u = c[kn] || Mn(c);
            if (u && u !== s) return u;
            c = Object.getPrototypeOf(c);
          }
          return (u) => new u();
        });
      }
      function Mn(n) {
        return Ge(n)
          ? () => {
              const i = Mn(L(n));
              return i && i();
            }
          : ki(n);
      }
      function ha(n) {
        const i = n[1],
          s = i.type;
        return 2 === s ? i.declTNode : 1 === s ? n[6] : null;
      }
      function gr(n) {
        return (function Pw(n, i) {
          if ('class' === i) return n.classes;
          if ('style' === i) return n.styles;
          const s = n.attrs;
          if (s) {
            const a = s.length;
            let c = 0;
            for (; c < a; ) {
              const u = s[c];
              if (ni(u)) break;
              if (0 === u) c += 2;
              else if ('number' == typeof u)
                for (c++; c < a && 'string' == typeof s[c]; ) c++;
              else {
                if (u === i) return s[c + 1];
                c += 2;
              }
            }
          }
          return null;
        })(nn(), n);
      }
      const _r = '__parameters__';
      function Jo(n, i, s) {
        return Ri(() => {
          const a = (function ao(n) {
            return function (...s) {
              if (n) {
                const a = n(...s);
                for (const c in a) this[c] = a[c];
              }
            };
          })(i);
          function c(...u) {
            if (this instanceof c) return a.apply(this, u), this;
            const h = new c(...u);
            return (m.annotation = h), m;
            function m(_, v, x) {
              const M = _.hasOwnProperty(_r)
                ? _[_r]
                : Object.defineProperty(_, _r, { value: [] })[_r];
              for (; M.length <= x; ) M.push(null);
              return (M[x] = M[x] || []).push(h), _;
            }
          }
          return (
            s && (c.prototype = Object.create(s.prototype)),
            (c.prototype.ngMetadataName = n),
            (c.annotationCls = c),
            c
          );
        });
      }
      class wt {
        constructor(i, s) {
          (this._desc = i),
            (this.ngMetadataName = 'InjectionToken'),
            (this.??prov = void 0),
            'number' == typeof s
              ? (this.__NG_ELEMENT_ID__ = s)
              : void 0 !== s &&
                (this.??prov = $e({
                  token: this,
                  providedIn: s.providedIn || 'root',
                  factory: s.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function An(n, i) {
        n.forEach((s) => (Array.isArray(s) ? An(s, i) : i(s)));
      }
      function Ui(n, i, s) {
        i >= n.length ? n.push(s) : n.splice(i, 0, s);
      }
      function Tt(n, i) {
        return i >= n.length - 1 ? n.pop() : n.splice(i, 1)[0];
      }
      function Un(n, i) {
        const s = [];
        for (let a = 0; a < n; a++) s.push(i);
        return s;
      }
      function jn(n, i, s) {
        let a = ji(n, i);
        return (
          a >= 0
            ? (n[1 | a] = s)
            : ((a = ~a),
              (function Bd(n, i, s, a) {
                let c = n.length;
                if (c == i) n.push(s, a);
                else if (1 === c) n.push(a, n[0]), (n[0] = s);
                else {
                  for (c--, n.push(n[c - 1], n[c]); c > i; )
                    (n[c] = n[c - 2]), c--;
                  (n[i] = s), (n[i + 1] = a);
                }
              })(n, a, i, s)),
          a
        );
      }
      function Hd(n, i) {
        const s = ji(n, i);
        if (s >= 0) return n[1 | s];
      }
      function ji(n, i) {
        return (function ts(n, i, s) {
          let a = 0,
            c = n.length >> s;
          for (; c !== a; ) {
            const u = a + ((c - a) >> 1),
              h = n[u << s];
            if (i === h) return u << s;
            h > i ? (c = u) : (a = u + 1);
          }
          return ~(c << s);
        })(n, i, 1);
      }
      const Lt = Fi(Jo('Optional'), 8),
        vr = Fi(Jo('SkipSelf'), 4);
      var zi = (() => (
        ((zi = zi || {})[(zi.Important = 1)] = 'Important'),
        (zi[(zi.DashCase = 2)] = 'DashCase'),
        zi
      ))();
      const uo = new Map();
      let ls = 0;
      const ya = '__ngContext__';
      function Vt(n, i) {
        cn(i)
          ? ((n[ya] = i[20]),
            (function Qh(n) {
              uo.set(n[20], n);
            })(i))
          : (n[ya] = i);
      }
      function Qd(n, i) {
        return undefined(n, i);
      }
      function Da(n) {
        const i = n[3];
        return wn(i) ? i[3] : i;
      }
      function Xd(n) {
        return np(n[13]);
      }
      function Jd(n) {
        return np(n[4]);
      }
      function np(n) {
        for (; null !== n && !wn(n); ) n = n[4];
        return n;
      }
      function ds(n, i, s, a, c) {
        if (null != a) {
          let u,
            h = !1;
          wn(a) ? (u = a) : cn(a) && ((h = !0), (a = a[0]));
          const m = Ht(a);
          0 === n && null !== s
            ? null == c
              ? xa(i, s, m)
              : ho(i, s, m, c || null, !0)
            : 1 === n && null !== s
            ? ho(i, s, m, c || null, !0)
            : 2 === n
            ? (function cu(n, i, s) {
                const a = us(n, i);
                a &&
                  (function ou(n, i, s, a) {
                    n.removeChild(i, s, a);
                  })(n, a, i, s);
              })(i, m, h)
            : 3 === n && i.destroyNode(m),
            null != u &&
              (function fb(n, i, s, a, c) {
                const u = s[7];
                u !== Ht(s) && ds(i, n, a, u, c);
                for (let m = 10; m < s.length; m++) {
                  const _ = s[m];
                  Er(_[1], _, n, i, a, u);
                }
              })(i, n, u, s, c);
        }
      }
      function tu(n, i, s) {
        return n.createElement(i, s);
      }
      function oc(n, i) {
        const s = n[9],
          a = s.indexOf(i),
          c = i[3];
        512 & i[2] && ((i[2] &= -513), ur(c, -1)), s.splice(a, 1);
      }
      function oi(n, i) {
        if (n.length <= 10) return;
        const s = 10 + i,
          a = n[s];
        if (a) {
          const c = a[17];
          null !== c && c !== n && oc(c, a), i > 0 && (n[s - 1][4] = a[4]);
          const u = Tt(n, 10 + i);
          !(function $w(n, i) {
            Er(n, i, i[11], 2, null, null), (i[0] = null), (i[6] = null);
          })(a[1], a);
          const h = u[19];
          null !== h && h.detachView(u[1]),
            (a[3] = null),
            (a[4] = null),
            (a[2] &= -65);
        }
        return a;
      }
      function fo(n, i) {
        if (!(128 & i[2])) {
          const s = i[11];
          s.destroyNode && Er(n, i, s, 3, null, null),
            (function cb(n) {
              let i = n[13];
              if (!i) return sc(n[1], n);
              for (; i; ) {
                let s = null;
                if (cn(i)) s = i[13];
                else {
                  const a = i[10];
                  a && (s = a);
                }
                if (!s) {
                  for (; i && !i[4] && i !== n; )
                    cn(i) && sc(i[1], i), (i = i[3]);
                  null === i && (i = n), cn(i) && sc(i[1], i), (s = i && i[4]);
                }
                i = s;
              }
            })(i);
        }
      }
      function sc(n, i) {
        if (!(128 & i[2])) {
          (i[2] &= -65),
            (i[2] |= 128),
            (function db(n, i) {
              let s;
              if (null != n && null != (s = n.destroyHooks))
                for (let a = 0; a < s.length; a += 2) {
                  const c = i[s[a]];
                  if (!(c instanceof P)) {
                    const u = s[a + 1];
                    if (Array.isArray(u))
                      for (let h = 0; h < u.length; h += 2) {
                        const m = c[u[h]],
                          _ = u[h + 1];
                        try {
                          _.call(m);
                        } finally {
                        }
                      }
                    else
                      try {
                        u.call(c);
                      } finally {
                      }
                  }
                }
            })(n, i),
            (function sp(n, i) {
              const s = n.cleanup,
                a = i[7];
              let c = -1;
              if (null !== s)
                for (let u = 0; u < s.length - 1; u += 2)
                  if ('string' == typeof s[u]) {
                    const h = s[u + 3];
                    h >= 0 ? a[(c = h)]() : a[(c = -h)].unsubscribe(), (u += 2);
                  } else {
                    const h = a[(c = s[u + 1])];
                    s[u].call(h);
                  }
              if (null !== a) {
                for (let u = c + 1; u < a.length; u++) (0, a[u])();
                i[7] = null;
              }
            })(n, i),
            1 === i[1].type && i[11].destroy();
          const s = i[17];
          if (null !== s && wn(i[3])) {
            s !== i[3] && oc(s, i);
            const a = i[19];
            null !== a && a.detachView(n);
          }
          !(function cs(n) {
            uo.delete(n[20]);
          })(i);
        }
      }
      function Cr(n, i, s) {
        return (function iu(n, i, s) {
          let a = i;
          for (; null !== a && 40 & a.type; ) a = (i = a).parent;
          if (null === a) return s[0];
          {
            const { componentOffset: c } = a;
            if (c > -1) {
              const { encapsulation: u } = n.data[a.directiveStart + c];
              if (u === Nn.None || u === Nn.Emulated) return null;
            }
            return Ut(a, s);
          }
        })(n, i.parent, s);
      }
      function ho(n, i, s, a, c) {
        n.insertBefore(i, s, a, c);
      }
      function xa(n, i, s) {
        n.appendChild(i, s);
      }
      function ru(n, i, s, a, c) {
        null !== a ? ho(n, i, s, a, c) : xa(n, i, s);
      }
      function us(n, i) {
        return n.parentNode(i);
      }
      function ap(n, i, s) {
        return lp(n, i, s);
      }
      let fu,
        In,
        cc,
        lp = function fs(n, i, s) {
          return 40 & n.type ? Ut(n, s) : null;
        };
      function Ca(n, i, s, a) {
        const c = Cr(n, a, i),
          u = i[11],
          m = ap(a.parent || i[6], a, i);
        if (null != c)
          if (Array.isArray(s))
            for (let _ = 0; _ < s.length; _++) ru(u, c, s[_], m, !1);
          else ru(u, c, s, m, !1);
      }
      function Ea(n, i) {
        if (null !== i) {
          const s = i.type;
          if (3 & s) return Ut(i, n);
          if (4 & s) return lc(-1, n[i.index]);
          if (8 & s) {
            const a = i.child;
            if (null !== a) return Ea(n, a);
            {
              const c = n[i.index];
              return wn(c) ? lc(-1, c) : Ht(c);
            }
          }
          if (32 & s) return Qd(i, n)() || Ht(n[i.index]);
          {
            const a = lu(n, i);
            return null !== a
              ? Array.isArray(a)
                ? a[0]
                : Ea(Da(n[16]), a)
              : Ea(n, i.next);
          }
        }
        return null;
      }
      function lu(n, i) {
        return null !== i ? n[16][6].projection[i.projection] : null;
      }
      function lc(n, i) {
        const s = 10 + n + 1;
        if (s < i.length) {
          const a = i[s],
            c = a[1].firstChild;
          if (null !== c) return Ea(a, c);
        }
        return i[7];
      }
      function po(n, i, s, a, c, u, h) {
        for (; null != s; ) {
          const m = a[s.index],
            _ = s.type;
          if (
            (h && 0 === i && (m && Vt(Ht(m), a), (s.flags |= 2)),
            32 != (32 & s.flags))
          )
            if (8 & _) po(n, i, s.child, a, c, u, !1), ds(i, n, c, m, u);
            else if (32 & _) {
              const v = Qd(s, a);
              let x;
              for (; (x = v()); ) ds(i, n, c, x, u);
              ds(i, n, c, m, u);
            } else 16 & _ ? cp(n, i, a, s, c, u) : ds(i, n, c, m, u);
          s = h ? s.projectionNext : s.next;
        }
      }
      function Er(n, i, s, a, c, u) {
        po(s, a, n.firstChild, i, c, u, !1);
      }
      function cp(n, i, s, a, c, u) {
        const h = s[16],
          _ = h[6].projection[a.projection];
        if (Array.isArray(_))
          for (let v = 0; v < _.length; v++) ds(i, n, c, _[v], u);
        else po(n, i, _, h[3], c, u, !0);
      }
      function hb(n, i, s) {
        '' === s
          ? n.removeAttribute(i, 'class')
          : n.setAttribute(i, 'class', s);
      }
      function pb(n, i, s) {
        const { mergedAttrs: a, classes: c, styles: u } = s;
        null !== a && kt(n, i, a),
          null !== c && hb(n, i, c),
          null !== u &&
            (function dp(n, i, s) {
              n.setAttribute(i, 'style', s);
            })(n, i, u);
      }
      function Gi(n) {
        return (
          (function up() {
            if (void 0 === fu && ((fu = null), Xe.trustedTypes))
              try {
                fu = Xe.trustedTypes.createPolicy('angular', {
                  createHTML: (n) => n,
                  createScript: (n) => n,
                  createScriptURL: (n) => n,
                });
              } catch {}
            return fu;
          })()?.createHTML(n) || n
        );
      }
      function fp(n) {
        In = n;
      }
      function hp(n) {
        return (
          (function pu() {
            if (void 0 === cc && ((cc = null), Xe.trustedTypes))
              try {
                cc = Xe.trustedTypes.createPolicy('angular#unsafe-bypass', {
                  createHTML: (n) => n,
                  createScript: (n) => n,
                  createScriptURL: (n) => n,
                });
              } catch {}
            return cc;
          })()?.createScriptURL(n) || n
        );
      }
      class mo {
        constructor(i) {
          this.changingThisBreaksApplicationSecurity = i;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${it})`;
        }
      }
      class ps extends mo {
        getTypeName() {
          return 'HTML';
        }
      }
      class Sa extends mo {
        getTypeName() {
          return 'Style';
        }
      }
      class _b extends mo {
        getTypeName() {
          return 'Script';
        }
      }
      class bb extends mo {
        getTypeName() {
          return 'URL';
        }
      }
      class Aa extends mo {
        getTypeName() {
          return 'ResourceURL';
        }
      }
      function $n(n) {
        return n instanceof mo ? n.changingThisBreaksApplicationSecurity : n;
      }
      function ms(n, i) {
        const s = (function yb(n) {
          return (n instanceof mo && n.getTypeName()) || null;
        })(n);
        if (null != s && s !== i) {
          if ('ResourceURL' === s && 'URL' === i) return !0;
          throw new Error(`Required a safe ${i}, got a ${s} (see ${it})`);
        }
        return s === i;
      }
      function vb(n) {
        return new ps(n);
      }
      function wb(n) {
        return new Sa(n);
      }
      function Db(n) {
        return new _b(n);
      }
      function xb(n) {
        return new bb(n);
      }
      function qw(n) {
        return new Aa(n);
      }
      class gu {
        constructor(i) {
          this.inertDocumentHelper = i;
        }
        getInertBodyElement(i) {
          i = '<body><remove></remove>' + i;
          try {
            const s = new window.DOMParser().parseFromString(
              Gi(i),
              'text/html'
            ).body;
            return null === s
              ? this.inertDocumentHelper.getInertBodyElement(i)
              : (s.removeChild(s.firstChild), s);
          } catch {
            return null;
          }
        }
      }
      class dc {
        constructor(i) {
          if (
            ((this.defaultDoc = i),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                'sanitization-inert'
              )),
            null == this.inertDocument.body)
          ) {
            const s = this.inertDocument.createElement('html');
            this.inertDocument.appendChild(s);
            const a = this.inertDocument.createElement('body');
            s.appendChild(a);
          }
        }
        getInertBodyElement(i) {
          const s = this.inertDocument.createElement('template');
          if ('content' in s) return (s.innerHTML = Gi(i)), s;
          const a = this.inertDocument.createElement('body');
          return (
            (a.innerHTML = Gi(i)),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(a),
            a
          );
        }
        stripCustomNsAttrs(i) {
          const s = i.attributes;
          for (let c = s.length - 1; 0 < c; c--) {
            const h = s.item(c).name;
            ('xmlns:ns1' === h || 0 === h.indexOf('ns1:')) &&
              i.removeAttribute(h);
          }
          let a = i.firstChild;
          for (; a; )
            a.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(a),
              (a = a.nextSibling);
        }
      }
      const Cb =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      function uc(n) {
        return (n = String(n)).match(Cb) ? n : 'unsafe:' + n;
      }
      function qi(n) {
        const i = {};
        for (const s of n.split(',')) i[s] = !0;
        return i;
      }
      function Ta(...n) {
        const i = {};
        for (const s of n)
          for (const a in s) s.hasOwnProperty(a) && (i[a] = !0);
        return i;
      }
      const mp = qi('area,br,col,hr,img,wbr'),
        gp = qi('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        _p = qi('rp,rt'),
        _u = Ta(
          mp,
          Ta(
            gp,
            qi(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
            )
          ),
          Ta(
            _p,
            qi(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
            )
          ),
          Ta(_p, gp)
        ),
        Ia = qi('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        Fa = Ta(
          Ia,
          qi(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
          ),
          qi(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
          )
        ),
        Sb = qi('script,style,template');
      class Ab {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(i) {
          let s = i.firstChild,
            a = !0;
          for (; s; )
            if (
              (s.nodeType === Node.ELEMENT_NODE
                ? (a = this.startElement(s))
                : s.nodeType === Node.TEXT_NODE
                ? this.chars(s.nodeValue)
                : (this.sanitizedSomething = !0),
              a && s.firstChild)
            )
              s = s.firstChild;
            else
              for (; s; ) {
                s.nodeType === Node.ELEMENT_NODE && this.endElement(s);
                let c = this.checkClobberedElement(s, s.nextSibling);
                if (c) {
                  s = c;
                  break;
                }
                s = this.checkClobberedElement(s, s.parentNode);
              }
          return this.buf.join('');
        }
        startElement(i) {
          const s = i.nodeName.toLowerCase();
          if (!_u.hasOwnProperty(s))
            return (this.sanitizedSomething = !0), !Sb.hasOwnProperty(s);
          this.buf.push('<'), this.buf.push(s);
          const a = i.attributes;
          for (let c = 0; c < a.length; c++) {
            const u = a.item(c),
              h = u.name,
              m = h.toLowerCase();
            if (!Fa.hasOwnProperty(m)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let _ = u.value;
            Ia[m] && (_ = uc(_)), this.buf.push(' ', h, '="', Ra(_), '"');
          }
          return this.buf.push('>'), !0;
        }
        endElement(i) {
          const s = i.nodeName.toLowerCase();
          _u.hasOwnProperty(s) &&
            !mp.hasOwnProperty(s) &&
            (this.buf.push('</'), this.buf.push(s), this.buf.push('>'));
        }
        chars(i) {
          this.buf.push(Ra(i));
        }
        checkClobberedElement(i, s) {
          if (
            s &&
            (i.compareDocumentPosition(s) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${i.outerHTML}`
            );
          return s;
        }
      }
      const Tb = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        Ib = /([^\#-~ |!])/g;
      function Ra(n) {
        return n
          .replace(/&/g, '&amp;')
          .replace(Tb, function (i) {
            return (
              '&#' +
              (1024 * (i.charCodeAt(0) - 55296) +
                (i.charCodeAt(1) - 56320) +
                65536) +
              ';'
            );
          })
          .replace(Ib, function (i) {
            return '&#' + i.charCodeAt(0) + ';';
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      let Oa;
      function bu(n, i) {
        let s = null;
        try {
          Oa =
            Oa ||
            (function pp(n) {
              const i = new dc(n);
              return (function gs() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    Gi(''),
                    'text/html'
                  );
                } catch {
                  return !1;
                }
              })()
                ? new gu(i)
                : i;
            })(n);
          let a = i ? String(i) : '';
          s = Oa.getInertBodyElement(a);
          let c = 5,
            u = a;
          do {
            if (0 === c)
              throw new Error(
                'Failed to sanitize html because the input is unstable'
              );
            c--, (a = u), (u = s.innerHTML), (s = Oa.getInertBodyElement(a));
          } while (a !== u);
          return Gi(new Ab().sanitizeChildren(_s(s) || s));
        } finally {
          if (s) {
            const a = _s(s) || s;
            for (; a.firstChild; ) a.removeChild(a.firstChild);
          }
        }
      }
      function _s(n) {
        return 'content' in n &&
          (function fc(n) {
            return (
              n.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === n.nodeName
            );
          })(n)
          ? n.content
          : null;
      }
      var It = (() => (
        ((It = It || {})[(It.NONE = 0)] = 'NONE'),
        (It[(It.HTML = 1)] = 'HTML'),
        (It[(It.STYLE = 2)] = 'STYLE'),
        (It[(It.SCRIPT = 3)] = 'SCRIPT'),
        (It[(It.URL = 4)] = 'URL'),
        (It[(It.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
        It
      ))();
      function yu(n) {
        const i = Na();
        return i
          ? i.sanitize(It.URL, n) || ''
          : ms(n, 'URL')
          ? $n(n)
          : uc(me(n));
      }
      function vp(n) {
        const i = Na();
        if (i) return hp(i.sanitize(It.RESOURCE_URL, n) || '');
        if (ms(n, 'ResourceURL')) return hp($n(n));
        throw new Y(904, !1);
      }
      function Dp(n, i, s) {
        return (function wp(n, i) {
          return ('src' === i &&
            ('embed' === n ||
              'frame' === n ||
              'iframe' === n ||
              'media' === n ||
              'script' === n)) ||
            ('href' === i && ('base' === n || 'link' === n))
            ? vp
            : yu;
        })(
          i,
          s
        )(n);
      }
      function Na() {
        const n = N();
        return n && n[12];
      }
      const vu = new wt('ENVIRONMENT_INITIALIZER'),
        xp = new wt('INJECTOR', -1),
        Cp = new wt('INJECTOR_DEF_TYPES');
      class wu {
        get(i, s = Jt) {
          if (s === Jt) {
            const a = new Error(`NullInjectorError: No provider for ${fe(i)}!`);
            throw ((a.name = 'NullInjectorError'), a);
          }
          return s;
        }
      }
      function Pb(n) {
        return { ??providers: n };
      }
      function Ep(...n) {
        return { ??providers: Du(0, n), ??fromNgModule: !0 };
      }
      function Du(n, ...i) {
        const s = [],
          a = new Set();
        let c;
        return (
          An(i, (u) => {
            const h = u;
            hc(h, s, [], a) && (c || (c = []), c.push(h));
          }),
          void 0 !== c && Nb(c, s),
          s
        );
      }
      function Nb(n, i) {
        for (let s = 0; s < n.length; s++) {
          const { providers: c } = n[s];
          xu(c, (u) => {
            i.push(u);
          });
        }
      }
      function hc(n, i, s, a) {
        if (!(n = L(n))) return !1;
        let c = null,
          u = Cl(n);
        const h = !u && rt(n);
        if (u || h) {
          if (h && !h.standalone) return !1;
          c = n;
        } else {
          const _ = n.ngModule;
          if (((u = Cl(_)), !u)) return !1;
          c = _;
        }
        const m = a.has(c);
        if (h) {
          if (m) return !1;
          if ((a.add(c), h.dependencies)) {
            const _ =
              'function' == typeof h.dependencies
                ? h.dependencies()
                : h.dependencies;
            for (const v of _) hc(v, i, s, a);
          }
        } else {
          if (!u) return !1;
          {
            if (null != u.imports && !m) {
              let v;
              a.add(c);
              try {
                An(u.imports, (x) => {
                  hc(x, i, s, a) && (v || (v = []), v.push(x));
                });
              } finally {
              }
              void 0 !== v && Nb(v, i);
            }
            if (!m) {
              const v = ki(c) || (() => new c());
              i.push(
                { provide: c, useFactory: v, deps: Ie },
                { provide: Cp, useValue: c, multi: !0 },
                { provide: vu, useValue: () => Pt(c), multi: !0 }
              );
            }
            const _ = u.providers;
            null == _ ||
              m ||
              xu(_, (x) => {
                i.push(x);
              });
          }
        }
        return c !== n && void 0 !== n.providers;
      }
      function xu(n, i) {
        for (let s of n)
          he(s) && (s = s.??providers), Array.isArray(s) ? xu(s, i) : i(s);
      }
      const Lb = J({ provide: String, useValue: J });
      function Cu(n) {
        return null !== n && 'object' == typeof n && Lb in n;
      }
      function go(n) {
        return 'function' == typeof n;
      }
      const ka = new wt('Set Injector scope.'),
        pc = {},
        Tp = {};
      let Mr;
      function bs() {
        return void 0 === Mr && (Mr = new wu()), Mr;
      }
      class _o {}
      class Eu extends _o {
        get destroyed() {
          return this._destroyed;
        }
        constructor(i, s, a, c) {
          super(),
            (this.parent = s),
            (this.source = a),
            (this.scopes = c),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Su(i, (h) => this.processProvider(h)),
            this.records.set(xp, vs(void 0, this)),
            c.has('environment') && this.records.set(_o, vs(void 0, this));
          const u = this.records.get(ka);
          null != u && 'string' == typeof u.value && this.scopes.add(u.value),
            (this.injectorDefTypes = new Set(this.get(Cp.multi, Ie, Le.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const i of this._ngOnDestroyHooks) i.ngOnDestroy();
            for (const i of this._onDestroyHooks) i();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(i) {
          this._onDestroyHooks.push(i);
        }
        runInContext(i) {
          this.assertNotDestroyed();
          const s = ir(this),
            a = yn(void 0);
          try {
            return i();
          } finally {
            ir(s), yn(a);
          }
        }
        get(i, s = Jt, a = Le.Default) {
          this.assertNotDestroyed(), (a = ko(a));
          const c = ir(this),
            u = yn(void 0);
          try {
            if (!(a & Le.SkipSelf)) {
              let m = this.records.get(i);
              if (void 0 === m) {
                const _ =
                  (function Hb(n) {
                    return (
                      'function' == typeof n ||
                      ('object' == typeof n && n instanceof wt)
                    );
                  })(i) && On(i);
                (m = _ && this.injectableDefInScope(_) ? vs(ys(i), pc) : null),
                  this.records.set(i, m);
              }
              if (null != m) return this.hydrate(i, m);
            }
            return (a & Le.Self ? bs() : this.parent).get(
              i,
              (s = a & Le.Optional && s === Jt ? null : s)
            );
          } catch (h) {
            if ('NullInjectorError' === h.name) {
              if (((h[Ii] = h[Ii] || []).unshift(fe(i)), c)) throw h;
              return (function wh(n, i, s, a) {
                const c = n[Ii];
                throw (
                  (i[hd] && c.unshift(i[hd]),
                  (n.message = (function md(n, i, s, a = null) {
                    n =
                      n && '\n' === n.charAt(0) && '\u0275' == n.charAt(1)
                        ? n.slice(2)
                        : n;
                    let c = fe(i);
                    if (Array.isArray(i)) c = i.map(fe).join(' -> ');
                    else if ('object' == typeof i) {
                      let u = [];
                      for (let h in i)
                        if (i.hasOwnProperty(h)) {
                          let m = i[h];
                          u.push(
                            h +
                              ':' +
                              ('string' == typeof m ? JSON.stringify(m) : fe(m))
                          );
                        }
                      c = `{${u.join(', ')}}`;
                    }
                    return `${s}${a ? '(' + a + ')' : ''}[${c}]: ${n.replace(
                      El,
                      '\n  '
                    )}`;
                  })('\n' + n.message, c, s, a)),
                  (n.ngTokenPath = c),
                  (n[Ii] = null),
                  n)
                );
              })(h, i, 'R3InjectorError', this.source);
            }
            throw h;
          } finally {
            yn(u), ir(c);
          }
        }
        resolveInjectorInitializers() {
          const i = ir(this),
            s = yn(void 0);
          try {
            const a = this.get(vu.multi, Ie, Le.Self);
            for (const c of a) c();
          } finally {
            ir(i), yn(s);
          }
        }
        toString() {
          const i = [],
            s = this.records;
          for (const a of s.keys()) i.push(fe(a));
          return `R3Injector[${i.join(', ')}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new Y(205, !1);
        }
        processProvider(i) {
          let s = go((i = L(i))) ? i : L(i && i.provide);
          const a = (function Ip(n) {
            return Cu(n) ? vs(void 0, n.useValue) : vs(Mu(n), pc);
          })(i);
          if (go(i) || !0 !== i.multi) this.records.get(s);
          else {
            let c = this.records.get(s);
            c ||
              ((c = vs(void 0, pc, !0)),
              (c.factory = () => jr(c.multi)),
              this.records.set(s, c)),
              (s = i),
              c.multi.push(i);
          }
          this.records.set(s, a);
        }
        hydrate(i, s) {
          return (
            s.value === pc && ((s.value = Tp), (s.value = s.factory())),
            'object' == typeof s.value &&
              s.value &&
              (function Bb(n) {
                return (
                  null !== n &&
                  'object' == typeof n &&
                  'function' == typeof n.ngOnDestroy
                );
              })(s.value) &&
              this._ngOnDestroyHooks.add(s.value),
            s.value
          );
        }
        injectableDefInScope(i) {
          if (!i.providedIn) return !1;
          const s = L(i.providedIn);
          return 'string' == typeof s
            ? 'any' === s || this.scopes.has(s)
            : this.injectorDefTypes.has(s);
        }
      }
      function ys(n) {
        const i = On(n),
          s = null !== i ? i.factory : ki(n);
        if (null !== s) return s;
        if (n instanceof wt) throw new Y(204, !1);
        if (n instanceof Function)
          return (function mc(n) {
            const i = n.length;
            if (i > 0) throw (Un(i, '?'), new Y(204, !1));
            const s = (function Ai(n) {
              const i = n && (n[Ur] || n[an]);
              if (i) {
                const s = (function qs(n) {
                  if (n.hasOwnProperty('name')) return n.name;
                  const i = ('' + n).match(/^function\s*([^\s(]+)/);
                  return null === i ? '' : i[1];
                })(n);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${s}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${s}" class.`
                  ),
                  i
                );
              }
              return null;
            })(n);
            return null !== s ? () => s.factory(n) : () => new n();
          })(n);
        throw new Y(204, !1);
      }
      function Mu(n, i, s) {
        let a;
        if (go(n)) {
          const c = L(n);
          return ki(c) || ys(c);
        }
        if (Cu(n)) a = () => L(n.useValue);
        else if (
          (function Sp(n) {
            return !(!n || !n.useFactory);
          })(n)
        )
          a = () => n.useFactory(...jr(n.deps || []));
        else if (
          (function Mp(n) {
            return !(!n || !n.useExisting);
          })(n)
        )
          a = () => Pt(L(n.useExisting));
        else {
          const c = L(n && (n.useClass || n.provide));
          if (
            !(function Vb(n) {
              return !!n.deps;
            })(n)
          )
            return ki(c) || ys(c);
          a = () => new c(...jr(n.deps));
        }
        return a;
      }
      function vs(n, i, s = !1) {
        return { factory: n, value: i, multi: s ? [] : void 0 };
      }
      function Su(n, i) {
        for (const s of n)
          Array.isArray(s) ? Su(s, i) : s && he(s) ? Su(s.??providers, i) : i(s);
      }
      class gc {}
      class Fp {}
      class jb {
        resolveComponentFactory(i) {
          throw (function Ub(n) {
            const i = Error(
              `No component factory found for ${fe(
                n
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (i.ngComponent = n), i;
          })(i);
        }
      }
      let La = (() => {
        class n {}
        return (n.NULL = new jb()), n;
      })();
      function $b() {
        return Yt(nn(), N());
      }
      function Yt(n, i) {
        return new Va(Ut(n, i));
      }
      let Va = (() => {
        class n {
          constructor(s) {
            this.nativeElement = s;
          }
        }
        return (n.__NG_ELEMENT_ID__ = $b), n;
      })();
      function Ba(n) {
        return n instanceof Va ? n.nativeElement : n;
      }
      class Rp {}
      let zb = (() => {
          class n {}
          return (
            (n.__NG_ELEMENT_ID__ = () =>
              (function Op() {
                const n = N(),
                  s = xn(nn().index, n);
                return (cn(s) ? s : n)[11];
              })()),
            n
          );
        })(),
        Xw = (() => {
          class n {}
          return (
            (n.??prov = $e({
              token: n,
              providedIn: 'root',
              factory: () => null,
            })),
            n
          );
        })();
      class Gb {
        constructor(i) {
          (this.full = i),
            (this.major = i.split('.')[0]),
            (this.minor = i.split('.')[1]),
            (this.patch = i.split('.').slice(2).join('.'));
        }
      }
      const qb = new Gb('15.1.4'),
        Ha = {};
      function Pp(n) {
        return n.ngOriginalError;
      }
      class Ds {
        constructor() {
          this._console = console;
        }
        handleError(i) {
          const s = this._findOriginalError(i);
          this._console.error('ERROR', i),
            s && this._console.error('ORIGINAL ERROR', s);
        }
        _findOriginalError(i) {
          let s = i && Pp(i);
          for (; s && Pp(s); ) s = Pp(s);
          return s || null;
        }
      }
      function Wi(n) {
        return n instanceof Function ? n() : n;
      }
      function xs(n, i, s) {
        let a = n.length;
        for (;;) {
          const c = n.indexOf(i, s);
          if (-1 === c) return c;
          if (0 === c || n.charCodeAt(c - 1) <= 32) {
            const u = i.length;
            if (c + u === a || n.charCodeAt(c + u) <= 32) return c;
          }
          s = c + 1;
        }
      }
      const Xb = 'ng-template';
      function Lp(n, i, s) {
        let a = 0;
        for (; a < n.length; ) {
          let c = n[a++];
          if (s && 'class' === c) {
            if (((c = n[a]), -1 !== xs(c.toLowerCase(), i, 0))) return !0;
          } else if (1 === c) {
            for (; a < n.length && 'string' == typeof (c = n[a++]); )
              if (c.toLowerCase() === i) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Vp(n) {
        return 4 === n.type && n.value !== Xb;
      }
      function Jb(n, i, s) {
        return i === (4 !== n.type || s ? n.value : Xb);
      }
      function Bp(n, i, s) {
        let a = 4;
        const c = n.attrs || [],
          u = (function ny(n) {
            for (let i = 0; i < n.length; i++) if (ni(n[i])) return i;
            return n.length;
          })(c);
        let h = !1;
        for (let m = 0; m < i.length; m++) {
          const _ = i[m];
          if ('number' != typeof _) {
            if (!h)
              if (4 & a) {
                if (
                  ((a = 2 | (1 & a)),
                  ('' !== _ && !Jb(n, _, s)) || ('' === _ && 1 === i.length))
                ) {
                  if (si(a)) return !1;
                  h = !0;
                }
              } else {
                const v = 8 & a ? _ : i[++m];
                if (8 & a && null !== n.attrs) {
                  if (!Lp(n.attrs, v, s)) {
                    if (si(a)) return !1;
                    h = !0;
                  }
                  continue;
                }
                const M = ey(8 & a ? 'class' : _, c, Vp(n), s);
                if (-1 === M) {
                  if (si(a)) return !1;
                  h = !0;
                  continue;
                }
                if ('' !== v) {
                  let I;
                  I = M > u ? '' : c[M + 1].toLowerCase();
                  const O = 8 & a ? I : null;
                  if ((O && -1 !== xs(O, v, 0)) || (2 & a && v !== I)) {
                    if (si(a)) return !1;
                    h = !0;
                  }
                }
              }
          } else {
            if (!h && !si(a) && !si(_)) return !1;
            if (h && si(_)) continue;
            (h = !1), (a = _ | (1 & a));
          }
        }
        return si(a) || h;
      }
      function si(n) {
        return 0 == (1 & n);
      }
      function ey(n, i, s, a) {
        if (null === i) return -1;
        let c = 0;
        if (a || !s) {
          let u = !1;
          for (; c < i.length; ) {
            const h = i[c];
            if (h === n) return c;
            if (3 === h || 6 === h) u = !0;
            else {
              if (1 === h || 2 === h) {
                let m = i[++c];
                for (; 'string' == typeof m; ) m = i[++c];
                continue;
              }
              if (4 === h) break;
              if (0 === h) {
                c += 4;
                continue;
              }
            }
            c += u ? 1 : 2;
          }
          return -1;
        }
        return (function Up(n, i) {
          let s = n.indexOf(4);
          if (s > -1)
            for (s++; s < n.length; ) {
              const a = n[s];
              if ('number' == typeof a) return -1;
              if (a === i) return s;
              s++;
            }
          return -1;
        })(i, n);
      }
      function Hp(n, i, s = !1) {
        for (let a = 0; a < i.length; a++) if (Bp(n, i[a], s)) return !0;
        return !1;
      }
      function iy(n, i) {
        e: for (let s = 0; s < i.length; s++) {
          const a = i[s];
          if (n.length === a.length) {
            for (let c = 0; c < n.length; c++) if (n[c] !== a[c]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function ry(n, i) {
        return n ? ':not(' + i.trim() + ')' : i;
      }
      function Ua(n) {
        let i = n[0],
          s = 1,
          a = 2,
          c = '',
          u = !1;
        for (; s < n.length; ) {
          let h = n[s];
          if ('string' == typeof h)
            if (2 & a) {
              const m = n[++s];
              c += '[' + h + (m.length > 0 ? '="' + m + '"' : '') + ']';
            } else 8 & a ? (c += '.' + h) : 4 & a && (c += ' ' + h);
          else
            '' !== c && !si(h) && ((i += ry(u, c)), (c = '')),
              (a = h),
              (u = u || !si(a));
          s++;
        }
        return '' !== c && (i += ry(u, c)), i;
      }
      const je = {};
      function yi(n) {
        oy(ot(), N(), Qt() + n, !1);
      }
      function oy(n, i, s, a) {
        if (!a)
          if (3 == (3 & i[2])) {
            const u = n.preOrderCheckHooks;
            null !== u && ua(i, u, s);
          } else {
            const u = n.preOrderHooks;
            null !== u && g(i, u, 0, s);
          }
        Bi(s);
      }
      function Gp(n, i = null, s = null, a) {
        const c = Iu(n, i, s, a);
        return c.resolveInjectorInitializers(), c;
      }
      function Iu(n, i = null, s = null, a, c = new Set()) {
        const u = [s || Ie, Ep(n)];
        return (
          (a = a || ('object' == typeof n ? void 0 : fe(n))),
          new Eu(u, i || bs(), a || null, c)
        );
      }
      let Tr = (() => {
        class n {
          static create(s, a) {
            if (Array.isArray(s)) return Gp({ name: '' }, a, s, '');
            {
              const c = s.name ?? '';
              return Gp({ name: c }, s.parent, s.providers, c);
            }
          }
        }
        return (
          (n.THROW_IF_NOT_FOUND = Jt),
          (n.NULL = new wu()),
          (n.??prov = $e({
            token: n,
            providedIn: 'any',
            factory: () => Pt(xp),
          })),
          (n.__NG_ELEMENT_ID__ = -1),
          n
        );
      })();
      function Fr(n, i = Le.Default) {
        const s = N();
        return null === s ? Pt(n, i) : V_(nn(), s, L(n), i);
      }
      function Vu() {
        throw new Error('invalid');
      }
      function Bu(n, i) {
        const s = n.contentQueries;
        if (null !== s)
          for (let a = 0; a < s.length; a += 2) {
            const u = s[a + 1];
            if (-1 !== u) {
              const h = n.data[u];
              aa(s[a]), h.contentQueries(2, i[u], u);
            }
          }
      }
      function vc(n, i, s, a, c, u, h, m, _, v, x) {
        const M = i.blueprint.slice();
        return (
          (M[0] = c),
          (M[2] = 76 | a),
          (null !== x || (n && 1024 & n[2])) && (M[2] |= 1024),
          ro(M),
          (M[3] = M[15] = n),
          (M[8] = s),
          (M[10] = h || (n && n[10])),
          (M[11] = m || (n && n[11])),
          (M[12] = _ || (n && n[12]) || null),
          (M[9] = v || (n && n[9]) || null),
          (M[6] = u),
          (M[20] = (function Kh() {
            return ls++;
          })()),
          (M[21] = x),
          (M[16] = 2 == i.type ? n[16] : M),
          M
        );
      }
      function Es(n, i, s, a, c) {
        let u = n.data[i];
        if (null === u)
          (u = (function nm(n, i, s, a, c) {
            const u = oa(),
              h = qo(),
              _ = (n.data[i] = (function uD(n, i, s, a, c, u) {
                return {
                  type: s,
                  index: a,
                  insertBeforeIndex: null,
                  injectorIndex: i ? i.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: c,
                  attrs: u,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: i,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, h ? u : u && u.parent, s, i, a, c));
            return (
              null === n.firstChild && (n.firstChild = _),
              null !== u &&
                (h
                  ? null == u.child && null !== _.parent && (u.child = _)
                  : null === u.next && (u.next = _)),
              _
            );
          })(n, i, s, a, c)),
            (function Ul() {
              return Ue.lFrame.inI18n;
            })() && (u.flags |= 32);
        else if (64 & u.type) {
          (u.type = s), (u.value = a), (u.attrs = c);
          const h = (function Go() {
            const n = Ue.lFrame,
              i = n.currentTNode;
            return n.isParent ? i : i.parent;
          })();
          u.injectorIndex = null === h ? -1 : h.injectorIndex;
        }
        return Hn(u, !0), u;
      }
      function Ct(n, i, s, a) {
        if (0 === s) return -1;
        const c = i.length;
        for (let u = 0; u < s; u++)
          i.push(a), n.blueprint.push(a), n.data.push(null);
        return c;
      }
      function Rr(n, i, s) {
        oo(i);
        try {
          const a = n.viewQuery;
          null !== a && um(1, a, s);
          const c = n.template;
          null !== c && py(n, i, c, 1, s),
            n.firstCreatePass && (n.firstCreatePass = !1),
            n.staticContentQueries && Bu(n, i),
            n.staticViewQueries && um(2, n.viewQuery, s);
          const u = n.components;
          null !== u &&
            (function tm(n, i) {
              for (let s = 0; s < i.length; s++) bD(n, i[s]);
            })(i, u);
        } catch (a) {
          throw (
            (n.firstCreatePass &&
              ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)),
            a)
          );
        } finally {
          (i[2] &= -5), Id();
        }
      }
      function wc(n, i, s, a) {
        const c = i[2];
        if (128 != (128 & c)) {
          oo(i);
          try {
            ro(i),
              (function Li(n) {
                return (Ue.lFrame.bindingIndex = n);
              })(n.bindingStartIndex),
              null !== s && py(n, i, s, 2, a);
            const h = 3 == (3 & c);
            if (h) {
              const v = n.preOrderCheckHooks;
              null !== v && ua(i, v, null);
            } else {
              const v = n.preOrderHooks;
              null !== v && g(i, v, 0, null), w(i, 0);
            }
            if (
              ((function Dy(n) {
                for (let i = Xd(n); null !== i; i = Jd(i)) {
                  if (!i[2]) continue;
                  const s = i[9];
                  for (let a = 0; a < s.length; a++) {
                    const c = s[a];
                    512 & c[2] || ur(c[3], 1), (c[2] |= 512);
                  }
                }
              })(i),
              (function wy(n) {
                for (let i = Xd(n); null !== i; i = Jd(i))
                  for (let s = 10; s < i.length; s++) {
                    const a = i[s],
                      c = a[1];
                    dr(a) && wc(c, a, c.template, a[8]);
                  }
              })(i),
              null !== n.contentQueries && Bu(n, i),
              h)
            ) {
              const v = n.contentCheckHooks;
              null !== v && ua(i, v);
            } else {
              const v = n.contentHooks;
              null !== v && g(i, v, 1), w(i, 1);
            }
            !(function Jp(n, i) {
              const s = n.hostBindingOpCodes;
              if (null !== s)
                try {
                  for (let a = 0; a < s.length; a++) {
                    const c = s[a];
                    if (c < 0) Bi(~c);
                    else {
                      const u = c,
                        h = s[++a],
                        m = s[++a];
                      P_(h, u), m(2, i[u]);
                    }
                  }
                } finally {
                  Bi(-1);
                }
            })(n, i);
            const m = n.components;
            null !== m &&
              (function em(n, i) {
                for (let s = 0; s < i.length; s++) _D(n, i[s]);
              })(i, m);
            const _ = n.viewQuery;
            if ((null !== _ && um(2, _, a), h)) {
              const v = n.viewCheckHooks;
              null !== v && ua(i, v);
            } else {
              const v = n.viewHooks;
              null !== v && g(i, v, 2), w(i, 2);
            }
            !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
              (i[2] &= -41),
              512 & i[2] && ((i[2] &= -513), ur(i[3], -1));
          } finally {
            Id();
          }
        }
      }
      function py(n, i, s, a, c) {
        const u = Qt(),
          h = 2 & a;
        try {
          Bi(-1), h && i.length > 22 && oy(n, i, 22, !1), s(a, c);
        } finally {
          Bi(u);
        }
      }
      function Dc(n, i, s) {
        if (Kr(i)) {
          const c = i.directiveEnd;
          for (let u = i.directiveStart; u < c; u++) {
            const h = n.data[u];
            h.contentQueries && h.contentQueries(1, s[u], u);
          }
        }
      }
      function Hu(n, i, s) {
        Bl() &&
          ((function Do(n, i, s, a) {
            const c = s.directiveStart,
              u = s.directiveEnd;
            _i(s) &&
              (function pD(n, i, s) {
                const a = Ut(i, n),
                  c = my(s),
                  u = n[10],
                  h = Gu(
                    n,
                    vc(
                      n,
                      c,
                      null,
                      s.onPush ? 32 : 16,
                      a,
                      i,
                      u,
                      u.createRenderer(a, s),
                      null,
                      null,
                      null
                    )
                  );
                n[i.index] = h;
              })(i, s, n.data[c + s.componentOffset]),
              n.firstCreatePass || Zo(s, i),
              Vt(a, i);
            const h = s.initialInputs;
            for (let m = c; m < u; m++) {
              const _ = n.data[m],
                v = Ko(i, n, m, s);
              Vt(v, i),
                null !== h && mD(0, m - c, v, _, 0, h),
                Dn(_) && (xn(s.index, i)[8] = Ko(i, n, m, s));
            }
          })(n, i, s, Ut(s, i)),
          64 == (64 & s.flags) && by(n, i, s));
      }
      function Uu(n, i, s = Ut) {
        const a = i.localNames;
        if (null !== a) {
          let c = i.index + 1;
          for (let u = 0; u < a.length; u += 2) {
            const h = a[u + 1],
              m = -1 === h ? s(i, n) : n[h];
            n[c++] = m;
          }
        }
      }
      function my(n) {
        const i = n.tView;
        return null === i || i.incompleteFirstPass
          ? (n.tView = im(
              1,
              null,
              n.template,
              n.decls,
              n.vars,
              n.directiveDefs,
              n.pipeDefs,
              n.viewQuery,
              n.schemas,
              n.consts
            ))
          : i;
      }
      function im(n, i, s, a, c, u, h, m, _, v) {
        const x = 22 + a,
          M = x + c,
          I = (function cD(n, i) {
            const s = [];
            for (let a = 0; a < i; a++) s.push(a < n ? null : je);
            return s;
          })(x, M),
          O = 'function' == typeof v ? v() : v;
        return (I[1] = {
          type: n,
          blueprint: I,
          template: s,
          queries: null,
          viewQuery: m,
          declTNode: i,
          data: I.slice().fill(null, x),
          bindingStartIndex: x,
          expandoStartIndex: M,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof u ? u() : u,
          pipeRegistry: 'function' == typeof h ? h() : h,
          firstChild: null,
          schemas: _,
          consts: O,
          incompleteFirstPass: !1,
        });
      }
      function rm(n, i, s, a) {
        const c = xy(i);
        null === s
          ? c.push(a)
          : (c.push(s), n.firstCreatePass && Cy(n).push(a, c.length - 1));
      }
      function gy(n, i, s, a) {
        for (let c in n)
          if (n.hasOwnProperty(c)) {
            s = null === s ? {} : s;
            const u = n[c];
            null === a
              ? Yi(s, i, c, u)
              : a.hasOwnProperty(c) && Yi(s, i, a[c], u);
          }
        return s;
      }
      function Yi(n, i, s, a) {
        n.hasOwnProperty(s) ? n[s].push(i, a) : (n[s] = [i, a]);
      }
      function Qn(n, i, s, a, c, u, h, m) {
        const _ = Ut(i, s);
        let x,
          v = i.inputs;
        !m && null != v && (x = v[a])
          ? (fm(n, s, x, a, c), _i(i) && vo(s, i.index))
          : 3 & i.type &&
            ((a = (function Kn(n) {
              return 'class' === n
                ? 'className'
                : 'for' === n
                ? 'htmlFor'
                : 'formaction' === n
                ? 'formAction'
                : 'innerHtml' === n
                ? 'innerHTML'
                : 'readonly' === n
                ? 'readOnly'
                : 'tabindex' === n
                ? 'tabIndex'
                : n;
            })(a)),
            (c = null != h ? h(c, i.value || '', a) : c),
            u.setProperty(_, a, c));
      }
      function vo(n, i) {
        const s = xn(i, n);
        16 & s[2] || (s[2] |= 32);
      }
      function wo(n, i, s, a) {
        let c = !1;
        if (Bl()) {
          const u = null === a ? null : { '': -1 },
            h = (function $u(n, i) {
              const s = n.directiveRegistry;
              let a = null,
                c = null;
              if (s)
                for (let u = 0; u < s.length; u++) {
                  const h = s[u];
                  if (Hp(i, h.selectors, !1))
                    if ((a || (a = []), Dn(h)))
                      if (null !== h.findHostDirectiveDefs) {
                        const m = [];
                        (c = c || new Map()),
                          h.findHostDirectiveDefs(h, m, c),
                          a.unshift(...m, h),
                          zu(n, i, m.length);
                      } else a.unshift(h), zu(n, i, 0);
                    else
                      (c = c || new Map()),
                        h.findHostDirectiveDefs?.(h, a, c),
                        a.push(h);
                }
              return null === a ? null : [a, c];
            })(n, s);
          let m, _;
          null === h ? (m = _ = null) : ([m, _] = h),
            null !== m && ((c = !0), sm(n, i, s, m, u, _)),
            u &&
              (function yy(n, i, s) {
                if (i) {
                  const a = (n.localNames = []);
                  for (let c = 0; c < i.length; c += 2) {
                    const u = s[i[c + 1]];
                    if (null == u) throw new Y(-301, !1);
                    a.push(i[c], u);
                  }
                }
              })(s, a, u);
        }
        return (s.mergedAttrs = Wt(s.mergedAttrs, s.attrs)), c;
      }
      function sm(n, i, s, a, c, u) {
        for (let v = 0; v < a.length; v++) Nh(Zo(s, i), n, a[v].type);
        !(function Ms(n, i, s) {
          (n.flags |= 1),
            (n.directiveStart = i),
            (n.directiveEnd = i + s),
            (n.providerIndexes = i);
        })(s, n.data.length, a.length);
        for (let v = 0; v < a.length; v++) {
          const x = a[v];
          x.providersResolver && x.providersResolver(x);
        }
        let h = !1,
          m = !1,
          _ = Ct(n, i, a.length, null);
        for (let v = 0; v < a.length; v++) {
          const x = a[v];
          (s.mergedAttrs = Wt(s.mergedAttrs, x.hostAttrs)),
            vy(n, s, i, _, x),
            hD(_, x, c),
            null !== x.contentQueries && (s.flags |= 4),
            (null !== x.hostBindings ||
              null !== x.hostAttrs ||
              0 !== x.hostVars) &&
              (s.flags |= 64);
          const M = x.type.prototype;
          !h &&
            (M.ngOnChanges || M.ngOnInit || M.ngDoCheck) &&
            ((n.preOrderHooks || (n.preOrderHooks = [])).push(s.index),
            (h = !0)),
            !m &&
              (M.ngOnChanges || M.ngDoCheck) &&
              ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                s.index
              ),
              (m = !0)),
            _++;
        }
        !(function ju(n, i, s) {
          const c = i.directiveEnd,
            u = n.data,
            h = i.attrs,
            m = [];
          let _ = null,
            v = null;
          for (let x = i.directiveStart; x < c; x++) {
            const M = u[x],
              I = s ? s.get(M) : null,
              k = I ? I.outputs : null;
            (_ = gy(M.inputs, x, _, I ? I.inputs : null)),
              (v = gy(M.outputs, x, v, k));
            const W = null === _ || null === h || Vp(i) ? null : gD(_, x, h);
            m.push(W);
          }
          null !== _ &&
            (_.hasOwnProperty('class') && (i.flags |= 8),
            _.hasOwnProperty('style') && (i.flags |= 16)),
            (i.initialInputs = m),
            (i.inputs = _),
            (i.outputs = v);
        })(n, s, u);
      }
      function by(n, i, s) {
        const a = s.directiveStart,
          c = s.directiveEnd,
          u = s.index,
          h = (function N_() {
            return Ue.lFrame.currentDirectiveIndex;
          })();
        try {
          Bi(u);
          for (let m = a; m < c; m++) {
            const _ = n.data[m],
              v = i[m];
            jl(m),
              (null !== _.hostBindings ||
                0 !== _.hostVars ||
                null !== _.hostAttrs) &&
                fD(_, v);
          }
        } finally {
          Bi(-1), jl(h);
        }
      }
      function fD(n, i) {
        null !== n.hostBindings && n.hostBindings(1, i);
      }
      function zu(n, i, s) {
        (i.componentOffset = s),
          (n.components || (n.components = [])).push(i.index);
      }
      function hD(n, i, s) {
        if (s) {
          if (i.exportAs)
            for (let a = 0; a < i.exportAs.length; a++) s[i.exportAs[a]] = n;
          Dn(i) && (s[''] = n);
        }
      }
      function vy(n, i, s, a, c) {
        n.data[a] = c;
        const u = c.factory || (c.factory = ki(c.type)),
          h = new P(u, Dn(c), Fr);
        (n.blueprint[a] = h),
          (s[a] = h),
          (function za(n, i, s, a, c) {
            const u = c.hostBindings;
            if (u) {
              let h = n.hostBindingOpCodes;
              null === h && (h = n.hostBindingOpCodes = []);
              const m = ~i.index;
              (function xc(n) {
                let i = n.length;
                for (; i > 0; ) {
                  const s = n[--i];
                  if ('number' == typeof s && s < 0) return s;
                }
                return 0;
              })(h) != m && h.push(m),
                h.push(s, a, u);
            }
          })(n, i, a, Ct(n, s, c.hostVars, je), c);
      }
      function Zi(n, i, s, a, c, u) {
        const h = Ut(n, i);
        !(function am(n, i, s, a, c, u, h) {
          if (null == u) n.removeAttribute(i, c, s);
          else {
            const m = null == h ? me(u) : h(u, a || '', c);
            n.setAttribute(i, c, m, s);
          }
        })(i[11], h, u, n.value, s, a, c);
      }
      function mD(n, i, s, a, c, u) {
        const h = u[i];
        if (null !== h) {
          const m = a.setInput;
          for (let _ = 0; _ < h.length; ) {
            const v = h[_++],
              x = h[_++],
              M = h[_++];
            null !== m ? a.setInput(s, M, v, x) : (s[x] = M);
          }
        }
      }
      function gD(n, i, s) {
        let a = null,
          c = 0;
        for (; c < s.length; ) {
          const u = s[c];
          if (0 !== u)
            if (5 !== u) {
              if ('number' == typeof u) break;
              if (n.hasOwnProperty(u)) {
                null === a && (a = []);
                const h = n[u];
                for (let m = 0; m < h.length; m += 2)
                  if (h[m] === i) {
                    a.push(u, h[m + 1], s[c + 1]);
                    break;
                  }
              }
              c += 2;
            } else c += 2;
          else c += 4;
        }
        return a;
      }
      function lm(n, i, s, a) {
        return [n, !0, !1, i, null, 0, a, s, null, null];
      }
      function _D(n, i) {
        const s = xn(i, n);
        if (dr(s)) {
          const a = s[1];
          48 & s[2] ? wc(a, s, a.template, s[8]) : s[5] > 0 && cm(s);
        }
      }
      function cm(n) {
        for (let a = Xd(n); null !== a; a = Jd(a))
          for (let c = 10; c < a.length; c++) {
            const u = a[c];
            if (dr(u))
              if (512 & u[2]) {
                const h = u[1];
                wc(h, u, h.template, u[8]);
              } else u[5] > 0 && cm(u);
          }
        const s = n[1].components;
        if (null !== s)
          for (let a = 0; a < s.length; a++) {
            const c = xn(s[a], n);
            dr(c) && c[5] > 0 && cm(c);
          }
      }
      function bD(n, i) {
        const s = xn(i, n),
          a = s[1];
        (function yD(n, i) {
          for (let s = i.length; s < n.blueprint.length; s++)
            i.push(n.blueprint[s]);
        })(a, s),
          Rr(a, s, s[8]);
      }
      function Gu(n, i) {
        return n[13] ? (n[14][4] = i) : (n[13] = i), (n[14] = i), i;
      }
      function dm(n) {
        for (; n; ) {
          n[2] |= 32;
          const i = Da(n);
          if (Tl(n) && !i) return n;
          n = i;
        }
        return null;
      }
      function qu(n, i, s, a = !0) {
        const c = i[10];
        c.begin && c.begin();
        try {
          wc(n, i, n.template, s);
        } catch (h) {
          throw (a && My(i, h), h);
        } finally {
          c.end && c.end();
        }
      }
      function um(n, i, s) {
        aa(0), i(n, s);
      }
      function xy(n) {
        return n[7] || (n[7] = []);
      }
      function Cy(n) {
        return n.cleanup || (n.cleanup = []);
      }
      function My(n, i) {
        const s = n[9],
          a = s ? s.get(Ds, null) : null;
        a && a.handleError(i);
      }
      function fm(n, i, s, a, c) {
        for (let u = 0; u < s.length; ) {
          const h = s[u++],
            m = s[u++],
            _ = i[h],
            v = n.data[h];
          null !== v.setInput ? v.setInput(_, c, a, m) : (_[m] = c);
        }
      }
      function Wu(n, i, s) {
        let a = s ? n.styles : null,
          c = s ? n.classes : null,
          u = 0;
        if (null !== i)
          for (let h = 0; h < i.length; h++) {
            const m = i[h];
            'number' == typeof m
              ? (u = m)
              : 1 == u
              ? (c = ye(c, m))
              : 2 == u && (a = ye(a, m + ': ' + i[++h] + ';'));
          }
        s ? (n.styles = a) : (n.stylesWithoutHost = a),
          s ? (n.classes = c) : (n.classesWithoutHost = c);
      }
      function Yu(n, i, s, a, c = !1) {
        for (; null !== s; ) {
          const u = i[s.index];
          if ((null !== u && a.push(Ht(u)), wn(u)))
            for (let m = 10; m < u.length; m++) {
              const _ = u[m],
                v = _[1].firstChild;
              null !== v && Yu(_[1], _, v, a);
            }
          const h = s.type;
          if (8 & h) Yu(n, i, s.child, a);
          else if (32 & h) {
            const m = Qd(s, i);
            let _;
            for (; (_ = m()); ) a.push(_);
          } else if (16 & h) {
            const m = lu(i, s);
            if (Array.isArray(m)) a.push(...m);
            else {
              const _ = Da(i[16]);
              Yu(_[1], _, m, a, !0);
            }
          }
          s = c ? s.projectionNext : s.next;
        }
        return a;
      }
      class Cc {
        get rootNodes() {
          const i = this._lView,
            s = i[1];
          return Yu(s, i, s.firstChild, []);
        }
        constructor(i, s) {
          (this._lView = i),
            (this._cdRefInjectingView = s),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[8];
        }
        set context(i) {
          this._lView[8] = i;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const i = this._lView[3];
            if (wn(i)) {
              const s = i[8],
                a = s ? s.indexOf(this) : -1;
              a > -1 && (oi(i, a), Tt(s, a));
            }
            this._attachedToViewContainer = !1;
          }
          fo(this._lView[1], this._lView);
        }
        onDestroy(i) {
          rm(this._lView[1], this._lView, null, i);
        }
        markForCheck() {
          dm(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          qu(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new Y(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function zw(n, i) {
              Er(n, i, i[11], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(i) {
          if (this._attachedToViewContainer) throw new Y(902, !1);
          this._appRef = i;
        }
      }
      class vD extends Cc {
        constructor(i) {
          super(i), (this._view = i);
        }
        detectChanges() {
          const i = this._view;
          qu(i[1], i, i[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Sy extends La {
        constructor(i) {
          super(), (this.ngModule = i);
        }
        resolveComponentFactory(i) {
          const s = rt(i);
          return new Ec(s, this.ngModule);
        }
      }
      function Ay(n) {
        const i = [];
        for (let s in n)
          n.hasOwnProperty(s) && i.push({ propName: n[s], templateName: s });
        return i;
      }
      class DD {
        constructor(i, s) {
          (this.injector = i), (this.parentInjector = s);
        }
        get(i, s, a) {
          a = ko(a);
          const c = this.injector.get(i, Ha, a);
          return c !== Ha || s === Ha ? c : this.parentInjector.get(i, s, a);
        }
      }
      class Ec extends Fp {
        get inputs() {
          return Ay(this.componentDef.inputs);
        }
        get outputs() {
          return Ay(this.componentDef.outputs);
        }
        constructor(i, s) {
          super(),
            (this.componentDef = i),
            (this.ngModule = s),
            (this.componentType = i.type),
            (this.selector = (function ja(n) {
              return n.map(Ua).join(',');
            })(i.selectors)),
            (this.ngContentSelectors = i.ngContentSelectors
              ? i.ngContentSelectors
              : []),
            (this.isBoundToModule = !!s);
        }
        create(i, s, a, c) {
          let u = (c = c || this.ngModule) instanceof _o ? c : c?.injector;
          u &&
            null !== this.componentDef.getStandaloneInjector &&
            (u = this.componentDef.getStandaloneInjector(u) || u);
          const h = u ? new DD(i, u) : i,
            m = h.get(Rp, null);
          if (null === m) throw new Y(407, !1);
          const _ = h.get(Xw, null),
            v = m.createRenderer(null, this.componentDef),
            x = this.componentDef.selectors[0][0] || 'div',
            M = a
              ? (function dD(n, i, s) {
                  return n.selectRootElement(i, s === Nn.ShadowDom);
                })(v, a, this.componentDef.encapsulation)
              : tu(
                  v,
                  x,
                  (function wD(n) {
                    const i = n.toLowerCase();
                    return 'svg' === i ? 'svg' : 'math' === i ? 'math' : null;
                  })(x)
                ),
            I = this.componentDef.onPush ? 288 : 272,
            O = im(0, null, null, 1, 0, null, null, null, null, null),
            k = vc(null, O, null, I, null, null, m, v, _, h, null);
          let W, ie;
          oo(k);
          try {
            const be = this.componentDef;
            let Ae,
              z = null;
            be.findHostDirectiveDefs
              ? ((Ae = []),
                (z = new Map()),
                be.findHostDirectiveDefs(be, Ae, z),
                Ae.push(be))
              : (Ae = [be]);
            const Ve = (function CD(n, i) {
                const s = n[1];
                return (n[22] = i), Es(s, 22, 2, '#host', null);
              })(k, M),
              Et = (function ED(n, i, s, a, c, u, h, m) {
                const _ = c[1];
                !(function MD(n, i, s, a) {
                  for (const c of n)
                    i.mergedAttrs = Wt(i.mergedAttrs, c.hostAttrs);
                  null !== i.mergedAttrs &&
                    (Wu(i, i.mergedAttrs, !0), null !== s && pb(a, s, i));
                })(a, n, i, h);
                const v = u.createRenderer(i, s),
                  x = vc(
                    c,
                    my(s),
                    null,
                    s.onPush ? 32 : 16,
                    c[n.index],
                    n,
                    u,
                    v,
                    m || null,
                    null,
                    null
                  );
                return (
                  _.firstCreatePass && zu(_, n, a.length - 1),
                  Gu(c, x),
                  (c[n.index] = x)
                );
              })(Ve, M, be, Ae, k, m, v);
            (ie = wd(O, 22)),
              M &&
                (function AD(n, i, s, a) {
                  if (a) kt(n, s, ['ng-version', qb.full]);
                  else {
                    const { attrs: c, classes: u } = (function bc(n) {
                      const i = [],
                        s = [];
                      let a = 1,
                        c = 2;
                      for (; a < n.length; ) {
                        let u = n[a];
                        if ('string' == typeof u)
                          2 === c
                            ? '' !== u && i.push(u, n[++a])
                            : 8 === c && s.push(u);
                        else {
                          if (!si(c)) break;
                          c = u;
                        }
                        a++;
                      }
                      return { attrs: i, classes: s };
                    })(i.selectors[0]);
                    c && kt(n, s, c),
                      u && u.length > 0 && hb(n, s, u.join(' '));
                  }
                })(v, be, M, a),
              void 0 !== s &&
                (function TD(n, i, s) {
                  const a = (n.projection = []);
                  for (let c = 0; c < i.length; c++) {
                    const u = s[c];
                    a.push(null != u ? Array.from(u) : null);
                  }
                })(ie, this.ngContentSelectors, s),
              (W = (function SD(n, i, s, a, c, u) {
                const h = nn(),
                  m = c[1],
                  _ = Ut(h, c);
                sm(m, c, h, s, null, a);
                for (let x = 0; x < s.length; x++)
                  Vt(Ko(c, m, h.directiveStart + x, h), c);
                by(m, c, h), _ && Vt(_, c);
                const v = Ko(c, m, h.directiveStart + h.componentOffset, h);
                if (((n[8] = c[8] = v), null !== u)) for (const x of u) x(v, i);
                return Dc(m, h, n), v;
              })(Et, be, Ae, z, k, [ID])),
              Rr(O, k, null);
          } finally {
            Id();
          }
          return new xD(this.componentType, W, Yt(ie, k), k, ie);
        }
      }
      class xD extends gc {
        constructor(i, s, a, c, u) {
          super(),
            (this.location = a),
            (this._rootLView = c),
            (this._tNode = u),
            (this.instance = s),
            (this.hostView = this.changeDetectorRef = new vD(c)),
            (this.componentType = i);
        }
        setInput(i, s) {
          const a = this._tNode.inputs;
          let c;
          if (null !== a && (c = a[i])) {
            const u = this._rootLView;
            fm(u[1], u, c, i, s), vo(u, this._tNode.index);
          }
        }
        get injector() {
          return new fa(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(i) {
          this.hostView.onDestroy(i);
        }
      }
      function ID() {
        const n = nn();
        so(N()[1], n);
      }
      function hm(n) {
        let i = (function Ty(n) {
            return Object.getPrototypeOf(n.prototype).constructor;
          })(n.type),
          s = !0;
        const a = [n];
        for (; i; ) {
          let c;
          if (Dn(n)) c = i.??cmp || i.??dir;
          else {
            if (i.??cmp) throw new Y(903, !1);
            c = i.??dir;
          }
          if (c) {
            if (s) {
              a.push(c);
              const h = n;
              (h.inputs = pm(n.inputs)),
                (h.declaredInputs = pm(n.declaredInputs)),
                (h.outputs = pm(n.outputs));
              const m = c.hostBindings;
              m && PD(n, m);
              const _ = c.viewQuery,
                v = c.contentQueries;
              if (
                (_ && RD(n, _),
                v && OD(n, v),
                ue(n.inputs, c.inputs),
                ue(n.declaredInputs, c.declaredInputs),
                ue(n.outputs, c.outputs),
                Dn(c) && c.data.animation)
              ) {
                const x = n.data;
                x.animation = (x.animation || []).concat(c.data.animation);
              }
            }
            const u = c.features;
            if (u)
              for (let h = 0; h < u.length; h++) {
                const m = u[h];
                m && m.ngInherit && m(n), m === hm && (s = !1);
              }
          }
          i = Object.getPrototypeOf(i);
        }
        !(function FD(n) {
          let i = 0,
            s = null;
          for (let a = n.length - 1; a >= 0; a--) {
            const c = n[a];
            (c.hostVars = i += c.hostVars),
              (c.hostAttrs = Wt(c.hostAttrs, (s = Wt(s, c.hostAttrs))));
          }
        })(a);
      }
      function pm(n) {
        return n === hi ? {} : n === Ie ? [] : n;
      }
      function RD(n, i) {
        const s = n.viewQuery;
        n.viewQuery = s
          ? (a, c) => {
              i(a, c), s(a, c);
            }
          : i;
      }
      function OD(n, i) {
        const s = n.contentQueries;
        n.contentQueries = s
          ? (a, c, u) => {
              i(a, c, u), s(a, c, u);
            }
          : i;
      }
      function PD(n, i) {
        const s = n.hostBindings;
        n.hostBindings = s
          ? (a, c) => {
              i(a, c), s(a, c);
            }
          : i;
      }
      let Zu = null;
      function Ss() {
        if (!Zu) {
          const n = Xe.Symbol;
          if (n && n.iterator) Zu = n.iterator;
          else {
            const i = Object.getOwnPropertyNames(Map.prototype);
            for (let s = 0; s < i.length; ++s) {
              const a = i[s];
              'entries' !== a &&
                'size' !== a &&
                Map.prototype[a] === Map.prototype.entries &&
                (Zu = a);
            }
          }
        }
        return Zu;
      }
      function Ku(n) {
        return (
          !!Qu(n) && (Array.isArray(n) || (!(n instanceof Map) && Ss() in n))
        );
      }
      function Qu(n) {
        return null !== n && ('function' == typeof n || 'object' == typeof n);
      }
      function _n(n, i, s) {
        return !Object.is(n[i], s) && ((n[i] = s), !0);
      }
      function mm(n, i, s, a) {
        const c = N();
        return _n(c, hr(), i) && (ot(), Zi(xt(), c, n, i, s, a)), mm;
      }
      function qa(n, i, s, a) {
        return _n(n, hr(), s) ? i + me(s) + a : je;
      }
      function jy(n, i, s, a, c, u, h, m) {
        const _ = N(),
          v = ot(),
          x = n + 22,
          M = v.firstCreatePass
            ? (function zD(n, i, s, a, c, u, h, m, _) {
                const v = i.consts,
                  x = Es(i, n, 4, h || null, Bn(v, m));
                wo(i, s, x, Bn(v, _)), so(i, x);
                const M = (x.tViews = im(
                  2,
                  x,
                  a,
                  c,
                  u,
                  i.directiveRegistry,
                  i.pipeRegistry,
                  null,
                  i.schemas,
                  v
                ));
                return (
                  null !== i.queries &&
                    (i.queries.template(i, x),
                    (M.queries = i.queries.embeddedTView(x))),
                  x
                );
              })(x, v, _, i, s, a, c, u, h)
            : v.data[x];
        Hn(M, !1);
        const I = _[11].createComment('');
        Ca(v, _, I, M),
          Vt(I, _),
          Gu(_, (_[x] = lm(I, _, I, M))),
          Qr(M) && Hu(v, _, M),
          null != h && Uu(_, M, m);
      }
      function $y(n) {
        return no(
          (function O_() {
            return Ue.lFrame.contextLView;
          })(),
          22 + n
        );
      }
      function gm(n, i, s) {
        const a = N();
        return _n(a, hr(), i) && Qn(ot(), xt(), a, n, i, a[11], s, !1), gm;
      }
      function _m(n, i, s, a, c) {
        const h = c ? 'class' : 'style';
        fm(n, s, i.inputs[h], h, a);
      }
      function Ju(n, i, s, a) {
        const c = N(),
          u = ot(),
          h = 22 + n,
          m = c[11],
          _ = (c[h] = tu(
            m,
            i,
            (function da() {
              return Ue.lFrame.currentNamespace;
            })()
          )),
          v = u.firstCreatePass
            ? (function qD(n, i, s, a, c, u, h) {
                const m = i.consts,
                  v = Es(i, n, 2, c, Bn(m, u));
                return (
                  wo(i, s, v, Bn(m, h)),
                  null !== v.attrs && Wu(v, v.attrs, !1),
                  null !== v.mergedAttrs && Wu(v, v.mergedAttrs, !0),
                  null !== i.queries && i.queries.elementStart(i, v),
                  v
                );
              })(h, u, c, 0, i, s, a)
            : u.data[h];
        return (
          Hn(v, !0),
          pb(m, _, v),
          32 != (32 & v.flags) && Ca(u, c, _, v),
          0 ===
            (function Dd() {
              return Ue.lFrame.elementDepthCount;
            })() && Vt(_, c),
          (function xd() {
            Ue.lFrame.elementDepthCount++;
          })(),
          Qr(v) && (Hu(u, c, v), Dc(u, v, c)),
          null !== a && Uu(c, v),
          Ju
        );
      }
      function ef() {
        let n = nn();
        qo() ? Hl() : ((n = n.parent), Hn(n, !1));
        const i = n;
        !(function Vl() {
          Ue.lFrame.elementDepthCount--;
        })();
        const s = ot();
        return (
          s.firstCreatePass && (so(s, n), Kr(n) && s.queries.elementEnd(n)),
          null != i.classesWithoutHost &&
            (function at(n) {
              return 0 != (8 & n.flags);
            })(i) &&
            _m(s, i, N(), i.classesWithoutHost, !0),
          null != i.stylesWithoutHost &&
            (function tt(n) {
              return 0 != (16 & n.flags);
            })(i) &&
            _m(s, i, N(), i.stylesWithoutHost, !1),
          ef
        );
      }
      function bm(n, i, s, a) {
        return Ju(n, i, s, a), ef(), bm;
      }
      function Gy() {
        return N();
      }
      function wm(n) {
        return !!n && 'function' == typeof n.then;
      }
      function qy(n) {
        return !!n && 'function' == typeof n.subscribe;
      }
      const Wy = qy;
      function Dm(n, i, s, a) {
        const c = N(),
          u = ot(),
          h = nn();
        return (
          (function Zy(n, i, s, a, c, u, h) {
            const m = Qr(a),
              v = n.firstCreatePass && Cy(n),
              x = i[8],
              M = xy(i);
            let I = !0;
            if (3 & a.type || h) {
              const W = Ut(a, i),
                ie = h ? h(W) : W,
                be = M.length,
                Ae = h ? (Ve) => h(Ht(Ve[a.index])) : a.index;
              let z = null;
              if (
                (!h &&
                  m &&
                  (z = (function YD(n, i, s, a) {
                    const c = n.cleanup;
                    if (null != c)
                      for (let u = 0; u < c.length - 1; u += 2) {
                        const h = c[u];
                        if (h === s && c[u + 1] === a) {
                          const m = i[7],
                            _ = c[u + 2];
                          return m.length > _ ? m[_] : null;
                        }
                        'string' == typeof h && (u += 2);
                      }
                    return null;
                  })(n, i, c, a.index)),
                null !== z)
              )
                ((z.__ngLastListenerFn__ || z).__ngNextListenerFn__ = u),
                  (z.__ngLastListenerFn__ = u),
                  (I = !1);
              else {
                u = Qy(a, i, x, u, !1);
                const Ve = s.listen(ie, c, u);
                M.push(u, Ve), v && v.push(c, Ae, be, be + 1);
              }
            } else u = Qy(a, i, x, u, !1);
            const O = a.outputs;
            let k;
            if (I && null !== O && (k = O[c])) {
              const W = k.length;
              if (W)
                for (let ie = 0; ie < W; ie += 2) {
                  const Et = i[k[ie]][k[ie + 1]].subscribe(u),
                    Rt = M.length;
                  M.push(u, Et), v && v.push(c, a.index, Rt, -(Rt + 1));
                }
            }
          })(u, c, c[11], h, n, i, a),
          Dm
        );
      }
      function Ky(n, i, s, a) {
        try {
          return !1 !== s(a);
        } catch (c) {
          return My(n, c), !1;
        }
      }
      function Qy(n, i, s, a, c) {
        return function u(h) {
          if (h === Function) return a;
          dm(n.componentOffset > -1 ? xn(n.index, i) : i);
          let _ = Ky(i, 0, a, h),
            v = u.__ngNextListenerFn__;
          for (; v; ) (_ = Ky(i, 0, v, h) && _), (v = v.__ngNextListenerFn__);
          return c && !1 === _ && (h.preventDefault(), (h.returnValue = !1)), _;
        };
      }
      function Xy(n = 1) {
        return (function zl(n) {
          return (Ue.lFrame.contextLView = (function Ah(n, i) {
            for (; n > 0; ) (i = i[15]), n--;
            return i;
          })(n, Ue.lFrame.contextLView))[8];
        })(n);
      }
      function ZD(n, i) {
        let s = null;
        const a = (function ty(n) {
          const i = n.attrs;
          if (null != i) {
            const s = i.indexOf(5);
            if (!(1 & s)) return i[s + 1];
          }
          return null;
        })(n);
        for (let c = 0; c < i.length; c++) {
          const u = i[c];
          if ('*' !== u) {
            if (null === a ? Hp(n, u, !0) : iy(a, u)) return c;
          } else s = c;
        }
        return s;
      }
      function xm(n) {
        const i = N()[16][6];
        if (!i.projection) {
          const a = (i.projection = Un(n ? n.length : 1, null)),
            c = a.slice();
          let u = i.child;
          for (; null !== u; ) {
            const h = n ? ZD(u, n) : 0;
            null !== h &&
              (c[h] ? (c[h].projectionNext = u) : (a[h] = u), (c[h] = u)),
              (u = u.next);
          }
        }
      }
      function Jy(n, i = 0, s) {
        const a = N(),
          c = ot(),
          u = Es(c, 22 + n, 16, null, s || null);
        null === u.projection && (u.projection = i),
          Hl(),
          32 != (32 & u.flags) &&
            (function du(n, i, s) {
              cp(i[11], 0, i, s, Cr(n, s, i), ap(s.parent || i[6], s, i));
            })(c, a, u);
      }
      function Sc(n, i, s, a, c) {
        const u = N(),
          h = qa(u, i, s, a);
        return h !== je && Qn(ot(), xt(), u, n, h, u[11], c, !1), Sc;
      }
      function ci(n, i) {
        return (n << 17) | (i << 2);
      }
      function xo(n) {
        return (n >> 17) & 32767;
      }
      function rf(n) {
        return 2 | n;
      }
      function Co(n) {
        return (131068 & n) >> 2;
      }
      function Tc(n, i) {
        return (-131069 & n) | (i << 2);
      }
      function sf(n) {
        return 1 | n;
      }
      function af(n, i, s, a, c) {
        const u = n[s + 1],
          h = null === i;
        let m = a ? xo(u) : Co(u),
          _ = !1;
        for (; 0 !== m && (!1 === _ || h); ) {
          const x = n[m + 1];
          Fs(n[m], i) && ((_ = !0), (n[m + 1] = a ? sf(x) : rf(x))),
            (m = a ? xo(x) : Co(x));
        }
        _ && (n[s + 1] = a ? rf(u) : sf(u));
      }
      function Fs(n, i) {
        return (
          null === n ||
          null == i ||
          (Array.isArray(n) ? n[1] : n) === i ||
          (!(!Array.isArray(n) || 'string' != typeof i) && ji(n, i) >= 0)
        );
      }
      function Rm(n, i, s) {
        return vi(n, i, s, !1), Rm;
      }
      function Om(n, i) {
        return vi(n, i, null, !0), Om;
      }
      function vi(n, i, s, a) {
        const c = N(),
          u = ot(),
          h = (function Vi(n) {
            const i = Ue.lFrame,
              s = i.bindingIndex;
            return (i.bindingIndex = i.bindingIndex + n), s;
          })(2);
        u.firstUpdatePass &&
          (function Pm(n, i, s, a) {
            const c = n.data;
            if (null === c[s + 1]) {
              const u = c[Qt()],
                h = (function ov(n, i) {
                  return i >= n.expandoStartIndex;
                })(n, s);
              (function hv(n, i) {
                return 0 != (n.flags & (i ? 8 : 16));
              })(u, a) &&
                null === i &&
                !h &&
                (i = !1),
                (i = (function sv(n, i, s, a) {
                  const c = (function sa(n) {
                    const i = Ue.lFrame.currentDirectiveIndex;
                    return -1 === i ? null : n[i];
                  })(n);
                  let u = a ? i.residualClasses : i.residualStyles;
                  if (null === c)
                    0 === (a ? i.classBindings : i.styleBindings) &&
                      ((s = Fc((s = Ic(null, n, i, s, a)), i.attrs, a)),
                      (u = null));
                  else {
                    const h = i.directiveStylingLast;
                    if (-1 === h || n[h] !== c)
                      if (((s = Ic(c, n, i, s, a)), null === u)) {
                        let _ = (function av(n, i, s) {
                          const a = s ? i.classBindings : i.styleBindings;
                          if (0 !== Co(a)) return n[xo(a)];
                        })(n, i, a);
                        void 0 !== _ &&
                          Array.isArray(_) &&
                          ((_ = Ic(null, n, i, _[1], a)),
                          (_ = Fc(_, i.attrs, a)),
                          (function lv(n, i, s, a) {
                            n[xo(s ? i.classBindings : i.styleBindings)] = a;
                          })(n, i, a, _));
                      } else
                        u = (function cv(n, i, s) {
                          let a;
                          const c = i.directiveEnd;
                          for (let u = 1 + i.directiveStylingLast; u < c; u++)
                            a = Fc(a, n[u].hostAttrs, s);
                          return Fc(a, i.attrs, s);
                        })(n, i, a);
                  }
                  return (
                    void 0 !== u &&
                      (a ? (i.residualClasses = u) : (i.residualStyles = u)),
                    s
                  );
                })(c, u, i, a)),
                (function Sm(n, i, s, a, c, u) {
                  let h = u ? i.classBindings : i.styleBindings,
                    m = xo(h),
                    _ = Co(h);
                  n[a] = s;
                  let x,
                    v = !1;
                  if (
                    (Array.isArray(s)
                      ? ((x = s[1]), (null === x || ji(s, x) > 0) && (v = !0))
                      : (x = s),
                    c)
                  )
                    if (0 !== _) {
                      const I = xo(n[m + 1]);
                      (n[a + 1] = ci(I, m)),
                        0 !== I && (n[I + 1] = Tc(n[I + 1], a)),
                        (n[m + 1] = (function Ac(n, i) {
                          return (131071 & n) | (i << 17);
                        })(n[m + 1], a));
                    } else
                      (n[a + 1] = ci(m, 0)),
                        0 !== m && (n[m + 1] = Tc(n[m + 1], a)),
                        (m = a);
                  else
                    (n[a + 1] = ci(_, 0)),
                      0 === m ? (m = a) : (n[_ + 1] = Tc(n[_ + 1], a)),
                      (_ = a);
                  v && (n[a + 1] = rf(n[a + 1])),
                    af(n, x, a, !0),
                    af(n, x, a, !1),
                    (function QD(n, i, s, a, c) {
                      const u = c ? n.residualClasses : n.residualStyles;
                      null != u &&
                        'string' == typeof i &&
                        ji(u, i) >= 0 &&
                        (s[a + 1] = sf(s[a + 1]));
                    })(i, x, n, a, u),
                    (h = ci(m, _)),
                    u ? (i.classBindings = h) : (i.styleBindings = h);
                })(c, u, i, s, h, a);
            }
          })(u, n, h, a),
          i !== je &&
            _n(c, h, i) &&
            (function uv(n, i, s, a, c, u, h, m) {
              if (!(3 & i.type)) return;
              const _ = n.data,
                v = _[m + 1],
                x = (function el(n) {
                  return 1 == (1 & n);
                })(v)
                  ? fv(_, i, s, c, Co(v), h)
                  : void 0;
              df(x) ||
                (df(u) ||
                  ((function tv(n) {
                    return 2 == (2 & n);
                  })(v) &&
                    (u = fv(_, null, s, c, m, h))),
                (function uu(n, i, s, a, c) {
                  if (i) c ? n.addClass(s, a) : n.removeClass(s, a);
                  else {
                    let u = -1 === a.indexOf('-') ? void 0 : zi.DashCase;
                    null == c
                      ? n.removeStyle(s, a, u)
                      : ('string' == typeof c &&
                          c.endsWith('!important') &&
                          ((c = c.slice(0, -10)), (u |= zi.Important)),
                        n.setStyle(s, a, c, u));
                  }
                })(a, h, to(Qt(), s), c, u));
            })(
              u,
              u.data[Qt()],
              c,
              c[11],
              n,
              (c[h + 1] = (function ox(n, i) {
                return (
                  null == n ||
                    ('string' == typeof i
                      ? (n += i)
                      : 'object' == typeof n && (n = fe($n(n)))),
                  n
                );
              })(i, s)),
              a,
              h
            );
      }
      function Ic(n, i, s, a, c) {
        let u = null;
        const h = s.directiveEnd;
        let m = s.directiveStylingLast;
        for (
          -1 === m ? (m = s.directiveStart) : m++;
          m < h && ((u = i[m]), (a = Fc(a, u.hostAttrs, c)), u !== n);

        )
          m++;
        return null !== n && (s.directiveStylingLast = m), a;
      }
      function Fc(n, i, s) {
        const a = s ? 1 : 2;
        let c = -1;
        if (null !== i)
          for (let u = 0; u < i.length; u++) {
            const h = i[u];
            'number' == typeof h
              ? (c = h)
              : c === a &&
                (Array.isArray(n) || (n = void 0 === n ? [] : ['', n]),
                jn(n, h, !!s || i[++u]));
          }
        return void 0 === n ? null : n;
      }
      function fv(n, i, s, a, c, u) {
        const h = null === i;
        let m;
        for (; c > 0; ) {
          const _ = n[c],
            v = Array.isArray(_),
            x = v ? _[1] : _,
            M = null === x;
          let I = s[c + 1];
          I === je && (I = M ? Ie : void 0);
          let O = M ? Hd(I, a) : x === a ? I : void 0;
          if ((v && !df(O) && (O = Hd(_, a)), df(O) && ((m = O), h))) return m;
          const k = n[c + 1];
          c = h ? xo(k) : Co(k);
        }
        if (null !== i) {
          let _ = u ? i.residualClasses : i.residualStyles;
          null != _ && (m = Hd(_, a));
        }
        return m;
      }
      function df(n) {
        return void 0 !== n;
      }
      function pv(n, i = '') {
        const s = N(),
          a = ot(),
          c = n + 22,
          u = a.firstCreatePass ? Es(a, c, 1, i, null) : a.data[c],
          h = (s[c] = (function eu(n, i) {
            return n.createText(i);
          })(s[11], i));
        Ca(a, s, h, u), Hn(u, !1);
      }
      function Nm(n) {
        return uf('', n, ''), Nm;
      }
      function uf(n, i, s) {
        const a = N(),
          c = qa(a, n, i, s);
        return (
          c !== je &&
            (function Or(n, i, s) {
              const a = to(i, n);
              !(function ip(n, i, s) {
                n.setValue(i, s);
              })(n[11], a, s);
            })(a, Qt(), c),
          uf
        );
      }
      function jm(n, i, s) {
        const a = N();
        return _n(a, hr(), i) && Qn(ot(), xt(), a, n, i, a[11], s, !0), jm;
      }
      const Pr = void 0;
      var hx = [
        'en',
        [['a', 'p'], ['AM', 'PM'], Pr],
        [['AM', 'PM'], Pr, Pr],
        [
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ],
        Pr,
        [
          ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        ],
        Pr,
        [
          ['B', 'A'],
          ['BC', 'AD'],
          ['Before Christ', 'Anno Domini'],
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', Pr, "{1} 'at' {0}", Pr],
        [
          '.',
          ',',
          ';',
          '%',
          '+',
          '-',
          'E',
          '\xd7',
          '\u2030',
          '\u221e',
          'NaN',
          ':',
        ],
        ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        function fx(n) {
          const s = Math.floor(Math.abs(n)),
            a = n.toString().replace(/^[^.]*\.?/, '').length;
          return 1 === s && 0 === a ? 1 : 5;
        },
      ];
      let Rs = {};
      function St(n) {
        const i = (function $m(n) {
          return n.toLowerCase().replace(/_/g, '-');
        })(n);
        let s = Fv(i);
        if (s) return s;
        const a = i.split('-')[0];
        if (((s = Fv(a)), s)) return s;
        if ('en' === a) return hx;
        throw new Y(701, !1);
      }
      function Iv(n) {
        return St(n)[Me.PluralCase];
      }
      function Fv(n) {
        return (
          n in Rs ||
            (Rs[n] =
              Xe.ng &&
              Xe.ng.common &&
              Xe.ng.common.locales &&
              Xe.ng.common.locales[n]),
          Rs[n]
        );
      }
      var Me = (() => (
        ((Me = Me || {})[(Me.LocaleId = 0)] = 'LocaleId'),
        (Me[(Me.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
        (Me[(Me.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
        (Me[(Me.DaysFormat = 3)] = 'DaysFormat'),
        (Me[(Me.DaysStandalone = 4)] = 'DaysStandalone'),
        (Me[(Me.MonthsFormat = 5)] = 'MonthsFormat'),
        (Me[(Me.MonthsStandalone = 6)] = 'MonthsStandalone'),
        (Me[(Me.Eras = 7)] = 'Eras'),
        (Me[(Me.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
        (Me[(Me.WeekendRange = 9)] = 'WeekendRange'),
        (Me[(Me.DateFormat = 10)] = 'DateFormat'),
        (Me[(Me.TimeFormat = 11)] = 'TimeFormat'),
        (Me[(Me.DateTimeFormat = 12)] = 'DateTimeFormat'),
        (Me[(Me.NumberSymbols = 13)] = 'NumberSymbols'),
        (Me[(Me.NumberFormats = 14)] = 'NumberFormats'),
        (Me[(Me.CurrencyCode = 15)] = 'CurrencyCode'),
        (Me[(Me.CurrencySymbol = 16)] = 'CurrencySymbol'),
        (Me[(Me.CurrencyName = 17)] = 'CurrencyName'),
        (Me[(Me.Currencies = 18)] = 'Currencies'),
        (Me[(Me.Directionality = 19)] = 'Directionality'),
        (Me[(Me.PluralCase = 20)] = 'PluralCase'),
        (Me[(Me.ExtraData = 21)] = 'ExtraData'),
        Me
      ))();
      const nl = 'en-US';
      let Pc = nl;
      function lg(n, i, s, a, c) {
        if (((n = L(n)), Array.isArray(n)))
          for (let u = 0; u < n.length; u++) lg(n[u], i, s, a, c);
        else {
          const u = ot(),
            h = N();
          let m = go(n) ? n : L(n.provide),
            _ = Mu(n);
          const v = nn(),
            x = 1048575 & v.providerIndexes,
            M = v.directiveStart,
            I = v.providerIndexes >> 20;
          if (go(n) || !n.multi) {
            const O = new P(_, c, Fr),
              k = dg(m, i, c ? x : x + I, M);
            -1 === k
              ? (Nh(Zo(v, h), u, m),
                cg(u, n, i.length),
                i.push(m),
                v.directiveStart++,
                v.directiveEnd++,
                c && (v.providerIndexes += 1048576),
                s.push(O),
                h.push(O))
              : ((s[k] = O), (h[k] = O));
          } else {
            const O = dg(m, i, x + I, M),
              k = dg(m, i, x, x + I),
              ie = k >= 0 && s[k];
            if ((c && !ie) || (!c && !(O >= 0 && s[O]))) {
              Nh(Zo(v, h), u, m);
              const be = (function Cf(n, i, s, a, c) {
                const u = new P(n, s, Fr);
                return (
                  (u.multi = []),
                  (u.index = i),
                  (u.componentProviders = 0),
                  s0(u, c, a && !s),
                  u
                );
              })(c ? cl : ug, s.length, c, a, _);
              !c && ie && (s[k].providerFactory = be),
                cg(u, n, i.length, 0),
                i.push(m),
                v.directiveStart++,
                v.directiveEnd++,
                c && (v.providerIndexes += 1048576),
                s.push(be),
                h.push(be);
            } else cg(u, n, O > -1 ? O : k, s0(s[c ? k : O], _, !c && a));
            !c && a && ie && s[k].componentProviders++;
          }
        }
      }
      function cg(n, i, s, a) {
        const c = go(i),
          u = (function Ap(n) {
            return !!n.useClass;
          })(i);
        if (c || u) {
          const _ = (u ? L(i.useClass) : i).prototype.ngOnDestroy;
          if (_) {
            const v = n.destroyHooks || (n.destroyHooks = []);
            if (!c && i.multi) {
              const x = v.indexOf(s);
              -1 === x ? v.push(s, [a, _]) : v[x + 1].push(a, _);
            } else v.push(s, _);
          }
        }
      }
      function s0(n, i, s) {
        return s && n.componentProviders++, n.multi.push(i) - 1;
      }
      function dg(n, i, s, a) {
        for (let c = s; c < a; c++) if (i[c] === n) return c;
        return -1;
      }
      function ug(n, i, s, a) {
        return Vc(this.multi, []);
      }
      function cl(n, i, s, a) {
        const c = this.multi;
        let u;
        if (this.providerFactory) {
          const h = this.providerFactory.componentProviders,
            m = Ko(s, s[1], this.providerFactory.index, a);
          (u = m.slice(0, h)), Vc(c, u);
          for (let _ = h; _ < m.length; _++) u.push(m[_]);
        } else (u = []), Vc(c, u);
        return u;
      }
      function Vc(n, i) {
        for (let s = 0; s < n.length; s++) i.push((0, n[s])());
        return i;
      }
      function Ef(n, i = []) {
        return (s) => {
          s.providersResolver = (a, c) =>
            (function kx(n, i, s) {
              const a = ot();
              if (a.firstCreatePass) {
                const c = Dn(n);
                lg(s, a.data, a.blueprint, c, !0),
                  lg(i, a.data, a.blueprint, c, !1);
              }
            })(a, c ? c(n) : n, i);
        };
      }
      class Ps {}
      class fg {}
      function a0(n, i) {
        return new hg(n, i ?? null);
      }
      class hg extends Ps {
        constructor(i, s) {
          super(),
            (this._parent = s),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Sy(this));
          const a = ln(i);
          (this._bootstrapComponents = Wi(a.bootstrap)),
            (this._r3Injector = Iu(
              i,
              s,
              [
                { provide: Ps, useValue: this },
                { provide: La, useValue: this.componentFactoryResolver },
              ],
              fe(i),
              new Set(['environment'])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(i));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const i = this._r3Injector;
          !i.destroyed && i.destroy(),
            this.destroyCbs.forEach((s) => s()),
            (this.destroyCbs = null);
        }
        onDestroy(i) {
          this.destroyCbs.push(i);
        }
      }
      class Mf extends fg {
        constructor(i) {
          super(), (this.moduleType = i);
        }
        create(i) {
          return new hg(this.moduleType, i);
        }
      }
      class l0 extends Ps {
        constructor(i, s, a) {
          super(),
            (this.componentFactoryResolver = new Sy(this)),
            (this.instance = null);
          const c = new Eu(
            [
              ...i,
              { provide: Ps, useValue: this },
              { provide: La, useValue: this.componentFactoryResolver },
            ],
            s || bs(),
            a,
            new Set(['environment'])
          );
          (this.injector = c), c.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(i) {
          this.injector.onDestroy(i);
        }
      }
      function Sf(n, i, s = null) {
        return new l0(n, i, s).injector;
      }
      let c0 = (() => {
        class n {
          constructor(s) {
            (this._injector = s), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(s) {
            if (!s.standalone) return null;
            if (!this.cachedInjectors.has(s.id)) {
              const a = Du(0, s.type),
                c =
                  a.length > 0
                    ? Sf([a], this._injector, `Standalone[${s.type.name}]`)
                    : null;
              this.cachedInjectors.set(s.id, c);
            }
            return this.cachedInjectors.get(s.id);
          }
          ngOnDestroy() {
            try {
              for (const s of this.cachedInjectors.values())
                null !== s && s.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (n.??prov = $e({
            token: n,
            providedIn: 'environment',
            factory: () => new n(Pt(_o)),
          })),
          n
        );
      })();
      function pg(n) {
        n.getStandaloneInjector = (i) =>
          i.get(c0).getOrCreateStandaloneInjector(n);
      }
      function b0(n, i, s, a) {
        return xg(N(), At(), n, i, s, a);
      }
      function xg(n, i, s, a, c, u) {
        const h = i + s;
        return _n(n, h, c)
          ? (function Ki(n, i, s) {
              return (n[i] = s);
            })(n, h + 1, u ? a.call(u, c) : a(c))
          : (function Ns(n, i) {
              const s = n[i];
              return s === je ? void 0 : s;
            })(n, h + 1);
      }
      function Cg(n, i) {
        const s = ot();
        let a;
        const c = n + 22;
        s.firstCreatePass
          ? ((a = (function Eg(n, i) {
              if (i)
                for (let s = i.length - 1; s >= 0; s--) {
                  const a = i[s];
                  if (n === a.name) return a;
                }
            })(i, s.pipeRegistry)),
            (s.data[c] = a),
            a.onDestroy &&
              (s.destroyHooks || (s.destroyHooks = [])).push(c, a.onDestroy))
          : (a = s.data[c]);
        const u = a.factory || (a.factory = ki(a.type)),
          h = yn(Fr);
        try {
          const m = mr(!1),
            _ = u();
          return (
            mr(m),
            (function GD(n, i, s, a) {
              s >= n.data.length &&
                ((n.data[s] = null), (n.blueprint[s] = null)),
                (i[s] = a);
            })(s, N(), c, _),
            _
          );
        } finally {
          yn(h);
        }
      }
      function D0(n, i, s) {
        const a = n + 22,
          c = N(),
          u = no(c, a);
        return (function ks(n, i) {
          return n[1].data[i].pure;
        })(c, a)
          ? xg(c, At(), i, u.transform, s, u)
          : u.transform(s);
      }
      function Uc(n) {
        return (i) => {
          setTimeout(n, void 0, i);
        };
      }
      const Di = class C0 extends E.x {
        constructor(i = !1) {
          super(), (this.__isAsync = i);
        }
        emit(i) {
          super.next(i);
        }
        subscribe(i, s, a) {
          let c = i,
            u = s || (() => null),
            h = a;
          if (i && 'object' == typeof i) {
            const _ = i;
            (c = _.next?.bind(_)),
              (u = _.error?.bind(_)),
              (h = _.complete?.bind(_));
          }
          this.__isAsync && ((u = Uc(u)), c && (c = Uc(c)), h && (h = Uc(h)));
          const m = super.subscribe({ next: c, error: u, complete: h });
          return i instanceof d.w0 && i.add(m), m;
        }
      };
      function Ag() {
        return this._results[Ss()]();
      }
      class Ls {
        get changes() {
          return this._changes || (this._changes = new Di());
        }
        constructor(i = !1) {
          (this._emitDistinctChangesOnly = i),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const s = Ss(),
            a = Ls.prototype;
          a[s] || (a[s] = Ag);
        }
        get(i) {
          return this._results[i];
        }
        map(i) {
          return this._results.map(i);
        }
        filter(i) {
          return this._results.filter(i);
        }
        find(i) {
          return this._results.find(i);
        }
        reduce(i, s) {
          return this._results.reduce(i, s);
        }
        forEach(i) {
          this._results.forEach(i);
        }
        some(i) {
          return this._results.some(i);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(i, s) {
          const a = this;
          a.dirty = !1;
          const c = (function Zn(n) {
            return n.flat(Number.POSITIVE_INFINITY);
          })(i);
          (this._changesDetected = !(function jh(n, i, s) {
            if (n.length !== i.length) return !1;
            for (let a = 0; a < n.length; a++) {
              let c = n[a],
                u = i[a];
              if ((s && ((c = s(c)), (u = s(u))), u !== c)) return !1;
            }
            return !0;
          })(a._results, c, s)) &&
            ((a._results = c),
            (a.length = c.length),
            (a.last = c[this.length - 1]),
            (a.first = c[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let Vs = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = zx), n;
      })();
      const E0 = Vs,
        $x = class extends E0 {
          constructor(i, s, a) {
            super(),
              (this._declarationLView = i),
              (this._declarationTContainer = s),
              (this.elementRef = a);
          }
          createEmbeddedView(i, s) {
            const a = this._declarationTContainer.tViews,
              c = vc(
                this._declarationLView,
                a,
                i,
                16,
                null,
                a.declTNode,
                null,
                null,
                null,
                null,
                s || null
              );
            c[17] = this._declarationLView[this._declarationTContainer.index];
            const h = this._declarationLView[19];
            return (
              null !== h && (c[19] = h.createEmbeddedView(a)),
              Rr(a, c, i),
              new Cc(c)
            );
          }
        };
      function zx() {
        return jc(nn(), N());
      }
      function jc(n, i) {
        return 4 & n.type ? new $x(i, n, Yt(n, i)) : null;
      }
      let Rf = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = M0), n;
      })();
      function M0() {
        return Of(nn(), N());
      }
      const S0 = Rf,
        Tg = class extends S0 {
          constructor(i, s, a) {
            super(),
              (this._lContainer = i),
              (this._hostTNode = s),
              (this._hostLView = a);
          }
          get element() {
            return Yt(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new fa(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const i = Ph(this._hostTNode, this._hostLView);
            if (Hi(i)) {
              const s = Wl(i, this._hostLView),
                a = pr(i);
              return new fa(s[1].data[a + 8], s);
            }
            return new fa(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(i) {
            const s = Ig(this._lContainer);
            return (null !== s && s[i]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(i, s, a) {
            let c, u;
            'number' == typeof a
              ? (c = a)
              : null != a && ((c = a.index), (u = a.injector));
            const h = i.createEmbeddedView(s || {}, u);
            return this.insert(h, c), h;
          }
          createComponent(i, s, a, c, u) {
            const h =
              i &&
              !(function yr(n) {
                return 'function' == typeof n;
              })(i);
            let m;
            if (h) m = s;
            else {
              const M = s || {};
              (m = M.index),
                (a = M.injector),
                (c = M.projectableNodes),
                (u = M.environmentInjector || M.ngModuleRef);
            }
            const _ = h ? i : new Ec(rt(i)),
              v = a || this.parentInjector;
            if (!u && null == _.ngModule) {
              const I = (h ? v : this.parentInjector).get(_o, null);
              I && (u = I);
            }
            const x = _.create(v, c, void 0, u);
            return this.insert(x.hostView, m), x;
          }
          insert(i, s) {
            const a = i._lView,
              c = a[1];
            if (
              (function $o(n) {
                return wn(n[3]);
              })(a)
            ) {
              const x = this.indexOf(i);
              if (-1 !== x) this.detach(x);
              else {
                const M = a[3],
                  I = new Tg(M, M[6], M[3]);
                I.detach(I.indexOf(i));
              }
            }
            const u = this._adjustIndex(s),
              h = this._lContainer;
            !(function op(n, i, s, a) {
              const c = 10 + a,
                u = s.length;
              a > 0 && (s[c - 1][4] = i),
                a < u - 10
                  ? ((i[4] = s[c]), Ui(s, 10 + a, i))
                  : (s.push(i), (i[4] = null)),
                (i[3] = s);
              const h = i[17];
              null !== h &&
                s !== h &&
                (function nu(n, i) {
                  const s = n[9];
                  i[16] !== i[3][3][16] && (n[2] = !0),
                    null === s ? (n[9] = [i]) : s.push(i);
                })(h, i);
              const m = i[19];
              null !== m && m.insertView(n), (i[2] |= 64);
            })(c, a, h, u);
            const m = lc(u, h),
              _ = a[11],
              v = us(_, h[7]);
            return (
              null !== v &&
                (function lb(n, i, s, a, c, u) {
                  (a[0] = c), (a[6] = i), Er(n, a, s, 1, c, u);
                })(c, h[6], _, a, v, m),
              i.attachToViewContainerRef(),
              Ui($c(h), u, i),
              i
            );
          }
          move(i, s) {
            return this.insert(i, s);
          }
          indexOf(i) {
            const s = Ig(this._lContainer);
            return null !== s ? s.indexOf(i) : -1;
          }
          remove(i) {
            const s = this._adjustIndex(i, -1),
              a = oi(this._lContainer, s);
            a && (Tt($c(this._lContainer), s), fo(a[1], a));
          }
          detach(i) {
            const s = this._adjustIndex(i, -1),
              a = oi(this._lContainer, s);
            return a && null != Tt($c(this._lContainer), s) ? new Cc(a) : null;
          }
          _adjustIndex(i, s = 0) {
            return i ?? this.length + s;
          }
        };
      function Ig(n) {
        return n[8];
      }
      function $c(n) {
        return n[8] || (n[8] = []);
      }
      function Of(n, i) {
        let s;
        const a = i[n.index];
        if (wn(a)) s = a;
        else {
          let c;
          if (8 & n.type) c = Ht(a);
          else {
            const u = i[11];
            c = u.createComment('');
            const h = Ut(n, i);
            ho(
              u,
              us(u, h),
              c,
              (function su(n, i) {
                return n.nextSibling(i);
              })(u, h),
              !1
            );
          }
          (i[n.index] = s = lm(a, i, c, n)), Gu(i, s);
        }
        return new Tg(s, n, i);
      }
      class Pf {
        constructor(i) {
          (this.queryList = i), (this.matches = null);
        }
        clone() {
          return new Pf(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Nf {
        constructor(i = []) {
          this.queries = i;
        }
        createEmbeddedView(i) {
          const s = i.queries;
          if (null !== s) {
            const a =
                null !== i.contentQueries ? i.contentQueries[0] : s.length,
              c = [];
            for (let u = 0; u < a; u++) {
              const h = s.getByIndex(u);
              c.push(this.queries[h.indexInDeclarationView].clone());
            }
            return new Nf(c);
          }
          return null;
        }
        insertView(i) {
          this.dirtyQueriesWithMatches(i);
        }
        detachView(i) {
          this.dirtyQueriesWithMatches(i);
        }
        dirtyQueriesWithMatches(i) {
          for (let s = 0; s < this.queries.length; s++)
            null !== Lg(i, s).matches && this.queries[s].setDirty();
        }
      }
      class ul {
        constructor(i, s, a = null) {
          (this.predicate = i), (this.flags = s), (this.read = a);
        }
      }
      class kf {
        constructor(i = []) {
          this.queries = i;
        }
        elementStart(i, s) {
          for (let a = 0; a < this.queries.length; a++)
            this.queries[a].elementStart(i, s);
        }
        elementEnd(i) {
          for (let s = 0; s < this.queries.length; s++)
            this.queries[s].elementEnd(i);
        }
        embeddedTView(i) {
          let s = null;
          for (let a = 0; a < this.length; a++) {
            const c = null !== s ? s.length : 0,
              u = this.getByIndex(a).embeddedTView(i, c);
            u &&
              ((u.indexInDeclarationView = a),
              null !== s ? s.push(u) : (s = [u]));
          }
          return null !== s ? new kf(s) : null;
        }
        template(i, s) {
          for (let a = 0; a < this.queries.length; a++)
            this.queries[a].template(i, s);
        }
        getByIndex(i) {
          return this.queries[i];
        }
        get length() {
          return this.queries.length;
        }
        track(i) {
          this.queries.push(i);
        }
      }
      class Mo {
        constructor(i, s = -1) {
          (this.metadata = i),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = s);
        }
        elementStart(i, s) {
          this.isApplyingToNode(s) && this.matchTNode(i, s);
        }
        elementEnd(i) {
          this._declarationNodeIndex === i.index &&
            (this._appliesToNextNode = !1);
        }
        template(i, s) {
          this.elementStart(i, s);
        }
        embeddedTView(i, s) {
          return this.isApplyingToNode(i)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-i.index, s),
              new Mo(this.metadata))
            : null;
        }
        isApplyingToNode(i) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const s = this._declarationNodeIndex;
            let a = i.parent;
            for (; null !== a && 8 & a.type && a.index !== s; ) a = a.parent;
            return s === (null !== a ? a.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(i, s) {
          const a = this.metadata.predicate;
          if (Array.isArray(a))
            for (let c = 0; c < a.length; c++) {
              const u = a[c];
              this.matchTNodeWithReadOption(i, s, Fg(s, u)),
                this.matchTNodeWithReadOption(i, s, Nd(s, i, u, !1, !1));
            }
          else
            a === Vs
              ? 4 & s.type && this.matchTNodeWithReadOption(i, s, -1)
              : this.matchTNodeWithReadOption(i, s, Nd(s, i, a, !1, !1));
        }
        matchTNodeWithReadOption(i, s, a) {
          if (null !== a) {
            const c = this.metadata.read;
            if (null !== c)
              if (c === Va || c === Rf || (c === Vs && 4 & s.type))
                this.addMatch(s.index, -2);
              else {
                const u = Nd(s, i, c, !1, !1);
                null !== u && this.addMatch(s.index, u);
              }
            else this.addMatch(s.index, a);
          }
        }
        addMatch(i, s) {
          null === this.matches
            ? (this.matches = [i, s])
            : this.matches.push(i, s);
        }
      }
      function Fg(n, i) {
        const s = n.localNames;
        if (null !== s)
          for (let a = 0; a < s.length; a += 2) if (s[a] === i) return s[a + 1];
        return null;
      }
      function Rg(n, i, s, a) {
        return -1 === s
          ? (function A0(n, i) {
              return 11 & n.type ? Yt(n, i) : 4 & n.type ? jc(n, i) : null;
            })(i, n)
          : -2 === s
          ? (function Og(n, i, s) {
              return s === Va
                ? Yt(i, n)
                : s === Vs
                ? jc(i, n)
                : s === Rf
                ? Of(i, n)
                : void 0;
            })(n, i, a)
          : Ko(n, n[1], s, i);
      }
      function Nr(n, i, s, a) {
        const c = i[19].queries[a];
        if (null === c.matches) {
          const u = n.data,
            h = s.matches,
            m = [];
          for (let _ = 0; _ < h.length; _ += 2) {
            const v = h[_];
            m.push(v < 0 ? null : Rg(i, u[v], h[_ + 1], s.metadata.read));
          }
          c.matches = m;
        }
        return c.matches;
      }
      function Bs(n, i, s, a) {
        const c = n.queries.getByIndex(s),
          u = c.matches;
        if (null !== u) {
          const h = Nr(n, i, c, s);
          for (let m = 0; m < u.length; m += 2) {
            const _ = u[m];
            if (_ > 0) a.push(h[m / 2]);
            else {
              const v = u[m + 1],
                x = i[-_];
              for (let M = 10; M < x.length; M++) {
                const I = x[M];
                I[17] === I[3] && Bs(I[1], I, v, a);
              }
              if (null !== x[9]) {
                const M = x[9];
                for (let I = 0; I < M.length; I++) {
                  const O = M[I];
                  Bs(O[1], O, v, a);
                }
              }
            }
          }
        }
        return a;
      }
      function Pg(n) {
        const i = N(),
          s = ot(),
          a = Sd();
        aa(a + 1);
        const c = Lg(s, a);
        if (
          n.dirty &&
          (function io(n) {
            return 4 == (4 & n[2]);
          })(i) ===
            (2 == (2 & c.metadata.flags))
        ) {
          if (null === c.matches) n.reset([]);
          else {
            const u = c.crossesNgTemplate ? Bs(s, i, a, []) : Nr(s, i, c, a);
            n.reset(u, Ba), n.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function T0(n, i, s) {
        const a = ot();
        a.firstCreatePass &&
          (kg(a, new ul(n, i, s), -1),
          2 == (2 & i) && (a.staticViewQueries = !0)),
          Ng(a, N(), i);
      }
      function fl(n, i, s, a) {
        const c = ot();
        if (c.firstCreatePass) {
          const u = nn();
          kg(c, new ul(i, s, a), u.index),
            (function F0(n, i) {
              const s = n.contentQueries || (n.contentQueries = []);
              i !== (s.length ? s[s.length - 1] : -1) &&
                s.push(n.queries.length - 1, i);
            })(c, n),
            2 == (2 & s) && (c.staticContentQueries = !0);
        }
        Ng(c, N(), s);
      }
      function Lf() {
        return (function I0(n, i) {
          return n[19].queries[i].queryList;
        })(N(), Sd());
      }
      function Ng(n, i, s) {
        const a = new Ls(4 == (4 & s));
        rm(n, i, a, a.destroy),
          null === i[19] && (i[19] = new Nf()),
          i[19].queries.push(new Pf(a));
      }
      function kg(n, i, s) {
        null === n.queries && (n.queries = new kf()),
          n.queries.track(new Mo(i, s));
      }
      function Lg(n, i) {
        return n.queries.getByIndex(i);
      }
      function Vf(n, i) {
        return jc(n, i);
      }
      function tr(...n) {}
      const Wg = new wt('Application Initializer');
      let Kc = (() => {
        class n {
          constructor(s) {
            (this.appInits = s),
              (this.resolve = tr),
              (this.reject = tr),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((a, c) => {
                (this.resolve = a), (this.reject = c);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const s = [],
              a = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let c = 0; c < this.appInits.length; c++) {
                const u = this.appInits[c]();
                if (wm(u)) s.push(u);
                else if (Wy(u)) {
                  const h = new Promise((m, _) => {
                    u.subscribe({ complete: m, error: _ });
                  });
                  s.push(h);
                }
              }
            Promise.all(s)
              .then(() => {
                a();
              })
              .catch((c) => {
                this.reject(c);
              }),
              0 === s.length && a(),
              (this.initialized = !0);
          }
        }
        return (
          (n.??fac = function (s) {
            return new (s || n)(Pt(Wg, 8));
          }),
          (n.??prov = $e({ token: n, factory: n.??fac, providedIn: 'root' })),
          n
        );
      })();
      const Yg = new wt('AppId', {
        providedIn: 'root',
        factory: function Zg() {
          return `${Qc()}${Qc()}${Qc()}`;
        },
      });
      function Qc() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Kg = new wt('Platform Initializer'),
        q0 = new wt('Platform ID', {
          providedIn: 'platform',
          factory: () => 'unknown',
        }),
        Qg = new wt('appBootstrapListener'),
        Xg = new wt('AnimationModuleType');
      let W0 = (() => {
        class n {
          log(s) {
            console.log(s);
          }
          warn(s) {
            console.warn(s);
          }
        }
        return (
          (n.??fac = function (s) {
            return new (s || n)();
          }),
          (n.??prov = $e({ token: n, factory: n.??fac, providedIn: 'platform' })),
          n
        );
      })();
      const Xc = new wt('LocaleId', {
          providedIn: 'root',
          factory: () =>
            pd(Xc, Le.Optional | Le.SkipSelf) ||
            (function Y0() {
              return (typeof $localize < 'u' && $localize.locale) || nl;
            })(),
        }),
        Jg = new wt('DefaultCurrencyCode', {
          providedIn: 'root',
          factory: () => 'USD',
        });
      class e_ {
        constructor(i, s) {
          (this.ngModuleFactory = i), (this.componentFactories = s);
        }
      }
      let K0 = (() => {
        class n {
          compileModuleSync(s) {
            return new Mf(s);
          }
          compileModuleAsync(s) {
            return Promise.resolve(this.compileModuleSync(s));
          }
          compileModuleAndAllComponentsSync(s) {
            const a = this.compileModuleSync(s),
              u = Wi(ln(s).declarations).reduce((h, m) => {
                const _ = rt(m);
                return _ && h.push(new Ec(_)), h;
              }, []);
            return new e_(a, u);
          }
          compileModuleAndAllComponentsAsync(s) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(s));
          }
          clearCache() {}
          clearCacheFor(s) {}
          getModuleId(s) {}
        }
        return (
          (n.??fac = function (s) {
            return new (s || n)();
          }),
          (n.??prov = $e({ token: n, factory: n.??fac, providedIn: 'root' })),
          n
        );
      })();
      const Q0 = (() => Promise.resolve(0))();
      function Xf(n) {
        typeof Zone > 'u'
          ? Q0.then(() => {
              n && n.apply(null, null);
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', n);
      }
      class Xn {
        constructor({
          enableLongStackTrace: i = !1,
          shouldCoalesceEventChangeDetection: s = !1,
          shouldCoalesceRunChangeDetection: a = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Di(!1)),
            (this.onMicrotaskEmpty = new Di(!1)),
            (this.onStable = new Di(!1)),
            (this.onError = new Di(!1)),
            typeof Zone > 'u')
          )
            throw new Y(908, !1);
          Zone.assertZonePatched();
          const c = this;
          (c._nesting = 0),
            (c._outer = c._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (c._inner = c._inner.fork(new Zone.TaskTrackingZoneSpec())),
            i &&
              Zone.longStackTraceZoneSpec &&
              (c._inner = c._inner.fork(Zone.longStackTraceZoneSpec)),
            (c.shouldCoalesceEventChangeDetection = !a && s),
            (c.shouldCoalesceRunChangeDetection = a),
            (c.lastRequestAnimationFrameId = -1),
            (c.nativeRequestAnimationFrame = (function X0() {
              let n = Xe.requestAnimationFrame,
                i = Xe.cancelAnimationFrame;
              if (typeof Zone < 'u' && n && i) {
                const s = n[Zone.__symbol__('OriginalDelegate')];
                s && (n = s);
                const a = i[Zone.__symbol__('OriginalDelegate')];
                a && (i = a);
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: i,
              };
            })().nativeRequestAnimationFrame),
            (function tw(n) {
              const i = () => {
                !(function ew(n) {
                  n.isCheckStableRunning ||
                    -1 !== n.lastRequestAnimationFrameId ||
                    ((n.lastRequestAnimationFrameId =
                      n.nativeRequestAnimationFrame.call(Xe, () => {
                        n.fakeTopEventTask ||
                          (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                            'fakeTopEventTask',
                            () => {
                              (n.lastRequestAnimationFrameId = -1),
                                Jf(n),
                                (n.isCheckStableRunning = !0),
                                r_(n),
                                (n.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          n.fakeTopEventTask.invoke();
                      })),
                    Jf(n));
                })(n);
              };
              n._inner = n._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (s, a, c, u, h, m) => {
                  try {
                    return o_(n), s.invokeTask(c, u, h, m);
                  } finally {
                    ((n.shouldCoalesceEventChangeDetection &&
                      'eventTask' === u.type) ||
                      n.shouldCoalesceRunChangeDetection) &&
                      i(),
                      s_(n);
                  }
                },
                onInvoke: (s, a, c, u, h, m, _) => {
                  try {
                    return o_(n), s.invoke(c, u, h, m, _);
                  } finally {
                    n.shouldCoalesceRunChangeDetection && i(), s_(n);
                  }
                },
                onHasTask: (s, a, c, u) => {
                  s.hasTask(c, u),
                    a === c &&
                      ('microTask' == u.change
                        ? ((n._hasPendingMicrotasks = u.microTask),
                          Jf(n),
                          r_(n))
                        : 'macroTask' == u.change &&
                          (n.hasPendingMacrotasks = u.macroTask));
                },
                onHandleError: (s, a, c, u) => (
                  s.handleError(c, u),
                  n.runOutsideAngular(() => n.onError.emit(u)),
                  !1
                ),
              });
            })(c);
        }
        static isInAngularZone() {
          return typeof Zone < 'u' && !0 === Zone.current.get('isAngularZone');
        }
        static assertInAngularZone() {
          if (!Xn.isInAngularZone()) throw new Y(909, !1);
        }
        static assertNotInAngularZone() {
          if (Xn.isInAngularZone()) throw new Y(909, !1);
        }
        run(i, s, a) {
          return this._inner.run(i, s, a);
        }
        runTask(i, s, a, c) {
          const u = this._inner,
            h = u.scheduleEventTask('NgZoneEvent: ' + c, i, J0, tr, tr);
          try {
            return u.runTask(h, s, a);
          } finally {
            u.cancelTask(h);
          }
        }
        runGuarded(i, s, a) {
          return this._inner.runGuarded(i, s, a);
        }
        runOutsideAngular(i) {
          return this._outer.run(i);
        }
      }
      const J0 = {};
      function r_(n) {
        if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
          try {
            n._nesting++, n.onMicrotaskEmpty.emit(null);
          } finally {
            if ((n._nesting--, !n.hasPendingMicrotasks))
              try {
                n.runOutsideAngular(() => n.onStable.emit(null));
              } finally {
                n.isStable = !0;
              }
          }
      }
      function Jf(n) {
        n.hasPendingMicrotasks = !!(
          n._hasPendingMicrotasks ||
          ((n.shouldCoalesceEventChangeDetection ||
            n.shouldCoalesceRunChangeDetection) &&
            -1 !== n.lastRequestAnimationFrameId)
        );
      }
      function o_(n) {
        n._nesting++,
          n.isStable && ((n.isStable = !1), n.onUnstable.emit(null));
      }
      function s_(n) {
        n._nesting--, r_(n);
      }
      class nw {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Di()),
            (this.onMicrotaskEmpty = new Di()),
            (this.onStable = new Di()),
            (this.onError = new Di());
        }
        run(i, s, a) {
          return i.apply(s, a);
        }
        runGuarded(i, s, a) {
          return i.apply(s, a);
        }
        runOutsideAngular(i) {
          return i();
        }
        runTask(i, s, a, c) {
          return i.apply(s, a);
        }
      }
      const a_ = new wt(''),
        l_ = new wt('');
      let eh,
        iw = (() => {
          class n {
            constructor(s, a, c) {
              (this._ngZone = s),
                (this.registry = a),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                eh ||
                  ((function rw(n) {
                    eh = n;
                  })(c),
                  c.addToWindow(a)),
                this._watchAngularEvents(),
                s.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > 'u'
                      ? null
                      : Zone.current.get('TaskTrackingZone');
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Xn.assertNotInAngularZone(),
                        Xf(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Xf(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let s = this._callbacks.pop();
                    clearTimeout(s.timeoutId), s.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let s = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (a) =>
                    !a.updateCb ||
                    !a.updateCb(s) ||
                    (clearTimeout(a.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((s) => ({
                    source: s.source,
                    creationLocation: s.creationLocation,
                    data: s.data,
                  }))
                : [];
            }
            addCallback(s, a, c) {
              let u = -1;
              a &&
                a > 0 &&
                (u = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (h) => h.timeoutId !== u
                  )),
                    s(this._didWork, this.getPendingTasks());
                }, a)),
                this._callbacks.push({ doneCb: s, timeoutId: u, updateCb: c });
            }
            whenStable(s, a, c) {
              if (c && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(s, a, c), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(s) {
              this.registry.registerApplication(s, this);
            }
            unregisterApplication(s) {
              this.registry.unregisterApplication(s);
            }
            findProviders(s, a, c) {
              return [];
            }
          }
          return (
            (n.??fac = function (s) {
              return new (s || n)(Pt(Xn), Pt(c_), Pt(l_));
            }),
            (n.??prov = $e({ token: n, factory: n.??fac })),
            n
          );
        })(),
        c_ = (() => {
          class n {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(s, a) {
              this._applications.set(s, a);
            }
            unregisterApplication(s) {
              this._applications.delete(s);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(s) {
              return this._applications.get(s) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(s, a = !0) {
              return eh?.findTestabilityInTree(this, s, a) ?? null;
            }
          }
          return (
            (n.??fac = function (s) {
              return new (s || n)();
            }),
            (n.??prov = $e({
              token: n,
              factory: n.??fac,
              providedIn: 'platform',
            })),
            n
          );
        })(),
        Lr = null;
      const d_ = new wt('AllowMultipleToken'),
        th = new wt('PlatformDestroyListeners');
      class aw {
        constructor(i, s) {
          (this.name = i), (this.token = s);
        }
      }
      function u_(n, i, s = []) {
        const a = `Platform: ${i}`,
          c = new wt(a);
        return (u = []) => {
          let h = ed();
          if (!h || h.injector.get(d_, !1)) {
            const m = [...s, ...u, { provide: c, useValue: !0 }];
            n
              ? n(m)
              : (function lw(n) {
                  if (Lr && !Lr.get(d_, !1)) throw new Y(400, !1);
                  Lr = n;
                  const i = n.get(td);
                  (function dw(n) {
                    const i = n.get(Kg, null);
                    i && i.forEach((s) => s());
                  })(n);
                })(
                  (function Jc(n = [], i) {
                    return Tr.create({
                      name: i,
                      providers: [
                        { provide: ka, useValue: 'platform' },
                        { provide: th, useValue: new Set([() => (Lr = null)]) },
                        ...n,
                      ],
                    });
                  })(m, a)
                );
          }
          return (function uw(n) {
            const i = ed();
            if (!i) throw new Y(401, !1);
            return i;
          })();
        };
      }
      function ed() {
        return Lr?.get(td) ?? null;
      }
      let td = (() => {
        class n {
          constructor(s) {
            (this._injector = s),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(s, a) {
            const c = (function id(n, i) {
                let s;
                return (
                  (s =
                    'noop' === n
                      ? new nw()
                      : ('zone.js' === n ? void 0 : n) || new Xn(i)),
                  s
                );
              })(
                a?.ngZone,
                (function nd(n) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!n || !n.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!n || !n.ngZoneRunCoalescing) || !1,
                  };
                })(a)
              ),
              u = [{ provide: Xn, useValue: c }];
            return c.run(() => {
              const h = Tr.create({
                  providers: u,
                  parent: this.injector,
                  name: s.moduleType.name,
                }),
                m = s.create(h),
                _ = m.injector.get(Ds, null);
              if (!_) throw new Y(402, !1);
              return (
                c.runOutsideAngular(() => {
                  const v = c.onError.subscribe({
                    next: (x) => {
                      _.handleError(x);
                    },
                  });
                  m.onDestroy(() => {
                    gl(this._modules, m), v.unsubscribe();
                  });
                }),
                (function Fn(n, i, s) {
                  try {
                    const a = s();
                    return wm(a)
                      ? a.catch((c) => {
                          throw (
                            (i.runOutsideAngular(() => n.handleError(c)), c)
                          );
                        })
                      : a;
                  } catch (a) {
                    throw (i.runOutsideAngular(() => n.handleError(a)), a);
                  }
                })(_, c, () => {
                  const v = m.injector.get(Kc);
                  return (
                    v.runInitializers(),
                    v.donePromise.then(
                      () => (
                        (function zm(n) {
                          De(n, 'Expected localeId to be defined'),
                            'string' == typeof n &&
                              (Pc = n.toLowerCase().replace(/_/g, '-'));
                        })(m.injector.get(Xc, nl) || nl),
                        this._moduleDoBootstrap(m),
                        m
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(s, a = []) {
            const c = nh({}, a);
            return (function ow(n, i, s) {
              const a = new Mf(s);
              return Promise.resolve(a);
            })(0, 0, s).then((u) => this.bootstrapModuleFactory(u, c));
          }
          _moduleDoBootstrap(s) {
            const a = s.injector.get(js);
            if (s._bootstrapComponents.length > 0)
              s._bootstrapComponents.forEach((c) => a.bootstrap(c));
            else {
              if (!s.instance.ngDoBootstrap) throw new Y(-403, !1);
              s.instance.ngDoBootstrap(a);
            }
            this._modules.push(s);
          }
          onDestroy(s) {
            this._destroyListeners.push(s);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new Y(404, !1);
            this._modules.slice().forEach((a) => a.destroy()),
              this._destroyListeners.forEach((a) => a());
            const s = this._injector.get(th, null);
            s && (s.forEach((a) => a()), s.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (n.??fac = function (s) {
            return new (s || n)(Pt(Tr));
          }),
          (n.??prov = $e({ token: n, factory: n.??fac, providedIn: 'platform' })),
          n
        );
      })();
      function nh(n, i) {
        return Array.isArray(i) ? i.reduce(nh, n) : { ...n, ...i };
      }
      let js = (() => {
        class n {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(s, a, c) {
            (this._zone = s),
              (this._injector = a),
              (this._exceptionHandler = c),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const u = new ne.y((m) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    m.next(this._stable), m.complete();
                  });
              }),
              h = new ne.y((m) => {
                let _;
                this._zone.runOutsideAngular(() => {
                  _ = this._zone.onStable.subscribe(() => {
                    Xn.assertNotInAngularZone(),
                      Xf(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), m.next(!0));
                      });
                  });
                });
                const v = this._zone.onUnstable.subscribe(() => {
                  Xn.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        m.next(!1);
                      }));
                });
                return () => {
                  _.unsubscribe(), v.unsubscribe();
                };
              });
            this.isStable = (0, te.T)(u, h.pipe((0, K.B)()));
          }
          bootstrap(s, a) {
            const c = s instanceof Fp;
            if (!this._injector.get(Kc).done)
              throw (!c && Gr(s), new Y(405, false));
            let h;
            (h = c ? s : this._injector.get(La).resolveComponentFactory(s)),
              this.componentTypes.push(h.componentType);
            const m = (function sw(n) {
                return n.isBoundToModule;
              })(h)
                ? void 0
                : this._injector.get(Ps),
              v = h.create(Tr.NULL, [], a || h.selector, m),
              x = v.location.nativeElement,
              M = v.injector.get(a_, null);
            return (
              M?.registerApplication(x),
              v.onDestroy(() => {
                this.detachView(v.hostView),
                  gl(this.components, v),
                  M?.unregisterApplication(x);
              }),
              this._loadComponent(v),
              v
            );
          }
          tick() {
            if (this._runningTick) throw new Y(101, !1);
            try {
              this._runningTick = !0;
              for (let s of this._views) s.detectChanges();
            } catch (s) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(s)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(s) {
            const a = s;
            this._views.push(a), a.attachToAppRef(this);
          }
          detachView(s) {
            const a = s;
            gl(this._views, a), a.detachFromAppRef();
          }
          _loadComponent(s) {
            this.attachView(s.hostView), this.tick(), this.components.push(s);
            const a = this._injector.get(Qg, []);
            a.push(...this._bootstrapListeners), a.forEach((c) => c(s));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((s) => s()),
                  this._views.slice().forEach((s) => s.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(s) {
            return (
              this._destroyListeners.push(s),
              () => gl(this._destroyListeners, s)
            );
          }
          destroy() {
            if (this._destroyed) throw new Y(406, !1);
            const s = this._injector;
            s.destroy && !s.destroyed && s.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (n.??fac = function (s) {
            return new (s || n)(Pt(Xn), Pt(_o), Pt(Ds));
          }),
          (n.??prov = $e({ token: n, factory: n.??fac, providedIn: 'root' })),
          n
        );
      })();
      function gl(n, i) {
        const s = n.indexOf(i);
        s > -1 && n.splice(s, 1);
      }
      let cC = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = hw), n;
      })();
      function hw(n) {
        return (function h_(n, i, s) {
          if (_i(n) && !s) {
            const a = xn(n.index, i);
            return new Cc(a, a);
          }
          return 47 & n.type ? new Cc(i[16], i) : null;
        })(nn(), N(), 16 == (16 & n));
      }
      class ch {
        constructor() {}
        supports(i) {
          return Ku(i);
        }
        create(i) {
          return new Ci(i);
        }
      }
      const g_ = (n, i) => i;
      class Ci {
        constructor(i) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = i || g_);
        }
        forEachItem(i) {
          let s;
          for (s = this._itHead; null !== s; s = s._next) i(s);
        }
        forEachOperation(i) {
          let s = this._itHead,
            a = this._removalsHead,
            c = 0,
            u = null;
          for (; s || a; ) {
            const h = !a || (s && s.currentIndex < sd(a, c, u)) ? s : a,
              m = sd(h, c, u),
              _ = h.currentIndex;
            if (h === a) c--, (a = a._nextRemoved);
            else if (((s = s._next), null == h.previousIndex)) c++;
            else {
              u || (u = []);
              const v = m - c,
                x = _ - c;
              if (v != x) {
                for (let I = 0; I < v; I++) {
                  const O = I < u.length ? u[I] : (u[I] = 0),
                    k = O + I;
                  x <= k && k < v && (u[I] = O + 1);
                }
                u[h.previousIndex] = x - v;
              }
            }
            m !== _ && i(h, m, _);
          }
        }
        forEachPreviousItem(i) {
          let s;
          for (s = this._previousItHead; null !== s; s = s._nextPrevious) i(s);
        }
        forEachAddedItem(i) {
          let s;
          for (s = this._additionsHead; null !== s; s = s._nextAdded) i(s);
        }
        forEachMovedItem(i) {
          let s;
          for (s = this._movesHead; null !== s; s = s._nextMoved) i(s);
        }
        forEachRemovedItem(i) {
          let s;
          for (s = this._removalsHead; null !== s; s = s._nextRemoved) i(s);
        }
        forEachIdentityChange(i) {
          let s;
          for (
            s = this._identityChangesHead;
            null !== s;
            s = s._nextIdentityChange
          )
            i(s);
        }
        diff(i) {
          if ((null == i && (i = []), !Ku(i))) throw new Y(900, !1);
          return this.check(i) ? this : null;
        }
        onDestroy() {}
        check(i) {
          this._reset();
          let c,
            u,
            h,
            s = this._itHead,
            a = !1;
          if (Array.isArray(i)) {
            this.length = i.length;
            for (let m = 0; m < this.length; m++)
              (u = i[m]),
                (h = this._trackByFn(m, u)),
                null !== s && Object.is(s.trackById, h)
                  ? (a && (s = this._verifyReinsertion(s, u, h, m)),
                    Object.is(s.item, u) || this._addIdentityChange(s, u))
                  : ((s = this._mismatch(s, u, h, m)), (a = !0)),
                (s = s._next);
          } else
            (c = 0),
              (function UD(n, i) {
                if (Array.isArray(n))
                  for (let s = 0; s < n.length; s++) i(n[s]);
                else {
                  const s = n[Ss()]();
                  let a;
                  for (; !(a = s.next()).done; ) i(a.value);
                }
              })(i, (m) => {
                (h = this._trackByFn(c, m)),
                  null !== s && Object.is(s.trackById, h)
                    ? (a && (s = this._verifyReinsertion(s, m, h, c)),
                      Object.is(s.item, m) || this._addIdentityChange(s, m))
                    : ((s = this._mismatch(s, m, h, c)), (a = !0)),
                  (s = s._next),
                  c++;
              }),
              (this.length = c);
          return this._truncate(s), (this.collection = i), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let i;
            for (
              i = this._previousItHead = this._itHead;
              null !== i;
              i = i._next
            )
              i._nextPrevious = i._next;
            for (i = this._additionsHead; null !== i; i = i._nextAdded)
              i.previousIndex = i.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                i = this._movesHead;
              null !== i;
              i = i._nextMoved
            )
              i.previousIndex = i.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(i, s, a, c) {
          let u;
          return (
            null === i ? (u = this._itTail) : ((u = i._prev), this._remove(i)),
            null !==
            (i =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(a, null))
              ? (Object.is(i.item, s) || this._addIdentityChange(i, s),
                this._reinsertAfter(i, u, c))
              : null !==
                (i =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(a, c))
              ? (Object.is(i.item, s) || this._addIdentityChange(i, s),
                this._moveAfter(i, u, c))
              : (i = this._addAfter(new Io(s, a), u, c)),
            i
          );
        }
        _verifyReinsertion(i, s, a, c) {
          let u =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(a, null);
          return (
            null !== u
              ? (i = this._reinsertAfter(u, i._prev, c))
              : i.currentIndex != c &&
                ((i.currentIndex = c), this._addToMoves(i, c)),
            i
          );
        }
        _truncate(i) {
          for (; null !== i; ) {
            const s = i._next;
            this._addToRemovals(this._unlink(i)), (i = s);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(i, s, a) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(i);
          const c = i._prevRemoved,
            u = i._nextRemoved;
          return (
            null === c ? (this._removalsHead = u) : (c._nextRemoved = u),
            null === u ? (this._removalsTail = c) : (u._prevRemoved = c),
            this._insertAfter(i, s, a),
            this._addToMoves(i, a),
            i
          );
        }
        _moveAfter(i, s, a) {
          return (
            this._unlink(i),
            this._insertAfter(i, s, a),
            this._addToMoves(i, a),
            i
          );
        }
        _addAfter(i, s, a) {
          return (
            this._insertAfter(i, s, a),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = i)
                : (this._additionsTail._nextAdded = i)),
            i
          );
        }
        _insertAfter(i, s, a) {
          const c = null === s ? this._itHead : s._next;
          return (
            (i._next = c),
            (i._prev = s),
            null === c ? (this._itTail = i) : (c._prev = i),
            null === s ? (this._itHead = i) : (s._next = i),
            null === this._linkedRecords && (this._linkedRecords = new __()),
            this._linkedRecords.put(i),
            (i.currentIndex = a),
            i
          );
        }
        _remove(i) {
          return this._addToRemovals(this._unlink(i));
        }
        _unlink(i) {
          null !== this._linkedRecords && this._linkedRecords.remove(i);
          const s = i._prev,
            a = i._next;
          return (
            null === s ? (this._itHead = a) : (s._next = a),
            null === a ? (this._itTail = s) : (a._prev = s),
            i
          );
        }
        _addToMoves(i, s) {
          return (
            i.previousIndex === s ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = i)
                  : (this._movesTail._nextMoved = i)),
            i
          );
        }
        _addToRemovals(i) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new __()),
            this._unlinkedRecords.put(i),
            (i.currentIndex = null),
            (i._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = i),
                (i._prevRemoved = null))
              : ((i._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = i)),
            i
          );
        }
        _addIdentityChange(i, s) {
          return (
            (i.item = s),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = i)
                : (this._identityChangesTail._nextIdentityChange = i)),
            i
          );
        }
      }
      class Io {
        constructor(i, s) {
          (this.item = i),
            (this.trackById = s),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class yl {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(i) {
          null === this._head
            ? ((this._head = this._tail = i),
              (i._nextDup = null),
              (i._prevDup = null))
            : ((this._tail._nextDup = i),
              (i._prevDup = this._tail),
              (i._nextDup = null),
              (this._tail = i));
        }
        get(i, s) {
          let a;
          for (a = this._head; null !== a; a = a._nextDup)
            if (
              (null === s || s <= a.currentIndex) &&
              Object.is(a.trackById, i)
            )
              return a;
          return null;
        }
        remove(i) {
          const s = i._prevDup,
            a = i._nextDup;
          return (
            null === s ? (this._head = a) : (s._nextDup = a),
            null === a ? (this._tail = s) : (a._prevDup = s),
            null === this._head
          );
        }
      }
      class __ {
        constructor() {
          this.map = new Map();
        }
        put(i) {
          const s = i.trackById;
          let a = this.map.get(s);
          a || ((a = new yl()), this.map.set(s, a)), a.add(i);
        }
        get(i, s) {
          const c = this.map.get(i);
          return c ? c.get(i, s) : null;
        }
        remove(i) {
          const s = i.trackById;
          return this.map.get(s).remove(i) && this.map.delete(s), i;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function sd(n, i, s) {
        const a = n.previousIndex;
        if (null === a) return a;
        let c = 0;
        return s && a < s.length && (c = s[a]), a + i + c;
      }
      class dh {
        constructor() {}
        supports(i) {
          return i instanceof Map || Qu(i);
        }
        create() {
          return new vl();
        }
      }
      class vl {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(i) {
          let s;
          for (s = this._mapHead; null !== s; s = s._next) i(s);
        }
        forEachPreviousItem(i) {
          let s;
          for (s = this._previousMapHead; null !== s; s = s._nextPrevious) i(s);
        }
        forEachChangedItem(i) {
          let s;
          for (s = this._changesHead; null !== s; s = s._nextChanged) i(s);
        }
        forEachAddedItem(i) {
          let s;
          for (s = this._additionsHead; null !== s; s = s._nextAdded) i(s);
        }
        forEachRemovedItem(i) {
          let s;
          for (s = this._removalsHead; null !== s; s = s._nextRemoved) i(s);
        }
        diff(i) {
          if (i) {
            if (!(i instanceof Map || Qu(i))) throw new Y(900, !1);
          } else i = new Map();
          return this.check(i) ? this : null;
        }
        onDestroy() {}
        check(i) {
          this._reset();
          let s = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(i, (a, c) => {
              if (s && s.key === c)
                this._maybeAddToChanges(s, a),
                  (this._appendAfter = s),
                  (s = s._next);
              else {
                const u = this._getOrCreateRecordForKey(c, a);
                s = this._insertBeforeOrAppend(s, u);
              }
            }),
            s)
          ) {
            s._prev && (s._prev._next = null), (this._removalsHead = s);
            for (let a = s; null !== a; a = a._nextRemoved)
              a === this._mapHead && (this._mapHead = null),
                this._records.delete(a.key),
                (a._nextRemoved = a._next),
                (a.previousValue = a.currentValue),
                (a.currentValue = null),
                (a._prev = null),
                (a._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(i, s) {
          if (i) {
            const a = i._prev;
            return (
              (s._next = i),
              (s._prev = a),
              (i._prev = s),
              a && (a._next = s),
              i === this._mapHead && (this._mapHead = s),
              (this._appendAfter = i),
              i
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = s), (s._prev = this._appendAfter))
              : (this._mapHead = s),
            (this._appendAfter = s),
            null
          );
        }
        _getOrCreateRecordForKey(i, s) {
          if (this._records.has(i)) {
            const c = this._records.get(i);
            this._maybeAddToChanges(c, s);
            const u = c._prev,
              h = c._next;
            return (
              u && (u._next = h),
              h && (h._prev = u),
              (c._next = null),
              (c._prev = null),
              c
            );
          }
          const a = new ad(i);
          return (
            this._records.set(i, a),
            (a.currentValue = s),
            this._addToAdditions(a),
            a
          );
        }
        _reset() {
          if (this.isDirty) {
            let i;
            for (
              this._previousMapHead = this._mapHead, i = this._previousMapHead;
              null !== i;
              i = i._next
            )
              i._nextPrevious = i._next;
            for (i = this._changesHead; null !== i; i = i._nextChanged)
              i.previousValue = i.currentValue;
            for (i = this._additionsHead; null != i; i = i._nextAdded)
              i.previousValue = i.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(i, s) {
          Object.is(s, i.currentValue) ||
            ((i.previousValue = i.currentValue),
            (i.currentValue = s),
            this._addToChanges(i));
        }
        _addToAdditions(i) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = i)
            : ((this._additionsTail._nextAdded = i), (this._additionsTail = i));
        }
        _addToChanges(i) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = i)
            : ((this._changesTail._nextChanged = i), (this._changesTail = i));
        }
        _forEach(i, s) {
          i instanceof Map
            ? i.forEach(s)
            : Object.keys(i).forEach((a) => s(i[a], a));
        }
      }
      class ad {
        constructor(i) {
          (this.key = i),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function b_() {
        return new wl([new ch()]);
      }
      let wl = (() => {
        class n {
          constructor(s) {
            this.factories = s;
          }
          static create(s, a) {
            if (null != a) {
              const c = a.factories.slice();
              s = s.concat(c);
            }
            return new n(s);
          }
          static extend(s) {
            return {
              provide: n,
              useFactory: (a) => n.create(s, a || b_()),
              deps: [[n, new vr(), new Lt()]],
            };
          }
          find(s) {
            const a = this.factories.find((c) => c.supports(s));
            if (null != a) return a;
            throw new Y(901, !1);
          }
        }
        return (n.??prov = $e({ token: n, providedIn: 'root', factory: b_ })), n;
      })();
      function y_() {
        return new uh([new dh()]);
      }
      let uh = (() => {
        class n {
          constructor(s) {
            this.factories = s;
          }
          static create(s, a) {
            if (a) {
              const c = a.factories.slice();
              s = s.concat(c);
            }
            return new n(s);
          }
          static extend(s) {
            return {
              provide: n,
              useFactory: (a) => n.create(s, a || y_()),
              deps: [[n, new vr(), new Lt()]],
            };
          }
          find(s) {
            const a = this.factories.find((c) => c.supports(s));
            if (a) return a;
            throw new Y(901, !1);
          }
        }
        return (n.??prov = $e({ token: n, providedIn: 'root', factory: y_ })), n;
      })();
      const bw = u_(null, 'core', []);
      let yw = (() => {
        class n {
          constructor(s) {}
        }
        return (
          (n.??fac = function (s) {
            return new (s || n)(Pt(js));
          }),
          (n.??mod = $r({ type: n })),
          (n.??inj = Xt({})),
          n
        );
      })();
      function vw(n) {
        return 'boolean' == typeof n ? n : null != n && 'false' !== n;
      }
    },
  },
  (Je) => {
    Je((Je.s = 101));
  },
]);
