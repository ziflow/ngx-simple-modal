(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ngx-simple-modal', ['exports', '@angular/common', '@angular/core', 'rxjs'], factory) :
    (global = global || self, factory(global['ngx-simple-modal'] = {}, global.ng.common, global.ng.core, global.rxjs));
}(this, (function (exports, common, core, rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var DefaultSimpleModalOptionConfig = new core.InjectionToken('default-simple-modal.config');
    var defaultSimpleModalOptions = {
        closeOnEscape: false,
        closeOnClickOutside: false,
        bodyClass: 'modal-open',
        wrapperDefaultClasses: 'modal fade-anim',
        wrapperClass: 'in',
        animationDuration: 300,
        autoFocus: false
    };

    /**
     * The modal backdrop wrapping wrapper to the modal
     */
    var SimpleModalWrapperComponent = /** @class */ (function () {
        /**
         * Constructor
         * @param {ComponentFactoryResolver} resolver
         */
        function SimpleModalWrapperComponent(resolver) {
            this.resolver = resolver;
            /**
             * Wrapper modal and fade classes
             */
            this.modalClasses = 'modal fade-anim';
        }
        /**
         * Adds content modal component to wrapper
         * @param {Type<SimpleModalComponent>} component
         * @return {SimpleModalComponent}
         */
        SimpleModalWrapperComponent.prototype.addComponent = function (component) {
            var factory = this.resolver.resolveComponentFactory(component);
            var injector = core.ReflectiveInjector.fromResolvedProviders([], this.viewContainer.injector);
            var componentRef = factory.create(injector);
            this.viewContainer.insert(componentRef.hostView);
            this.content = componentRef.instance;
            this.content.wrapper = this.wrapper;
            return this.content;
        };
        /**
         * Configures the function to call when you click on background of a modal but not the contents
         * @param callback
         */
        SimpleModalWrapperComponent.prototype.onClickOutsideModalContent = function (callback) {
            this.clickOutsideCallback = function (event) {
                if (event.target === containerEl) {
                    callback();
                }
            };
            var containerEl = this.wrapper.nativeElement;
            containerEl.addEventListener('click', this.clickOutsideCallback, false);
        };
        SimpleModalWrapperComponent.prototype.ngOnDestroy = function () {
            if (this.clickOutsideCallback) {
                var containerEl = this.wrapper.nativeElement;
                containerEl.removeEventListener('click', this.clickOutsideCallback, false);
                this.clickOutsideCallback = null;
            }
        };
        SimpleModalWrapperComponent.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver }
        ]; };
        __decorate([
            core.ViewChild('viewContainer', { read: core.ViewContainerRef, static: true })
        ], SimpleModalWrapperComponent.prototype, "viewContainer", void 0);
        __decorate([
            core.ViewChild('wrapper', { read: core.ElementRef, static: true })
        ], SimpleModalWrapperComponent.prototype, "wrapper", void 0);
        SimpleModalWrapperComponent = __decorate([
            core.Component({
                selector: 'simple-modal-wrapper',
                template: "\n    <div #wrapper [ngClass]=\"modalClasses\" [ngStyle]=\"{ display: 'block' }\" role=\"dialog\">\n      <ng-template #viewContainer></ng-template>\n    </div>\n  "
            })
        ], SimpleModalWrapperComponent);
        return SimpleModalWrapperComponent;
    }());

    /**
     * View container manager which manages a list of modals currently active
     * inside the viewvontainer
     */
    var SimpleModalHolderComponent = /** @class */ (function () {
        /**
         * Constructor
         * @param {ComponentFactoryResolver} resolver
         */
        function SimpleModalHolderComponent(resolver, defaultSimpleModalOptions) {
            this.resolver = resolver;
            this.defaultSimpleModalOptions = defaultSimpleModalOptions;
            /**
             * modal collection, maintained by addModal and removeModal
             * @type {Array<SimpleModalComponent> }
             */
            this.modals = [];
            /**
             * if auto focus is on and no element focused, store it here to be restored back after close
             */
            this.previousActiveElement = null;
        }
        /**
         * Configures then adds modal to the modals array, and populates with data passed in
         * @param {Type<SimpleModalComponent>} component
         * @param {object?} data
         * @param {SimpleModalOptionsOverrides?} options
         * @return {Observable<*>}
         */
        SimpleModalHolderComponent.prototype.addModal = function (component, data, options) {
            var _this = this;
            // create component
            if (!this.viewContainer) {
                return rxjs.of(null);
            }
            var factory = this.resolver.resolveComponentFactory(SimpleModalWrapperComponent);
            var componentRef = this.viewContainer.createComponent(factory);
            var modalWrapper = (componentRef.instance);
            var _component = modalWrapper.addComponent(component);
            // assign options refs
            _component.options = options = Object.assign({}, this.defaultSimpleModalOptions, options);
            // set base classes for wrapper
            modalWrapper.modalClasses = options.wrapperDefaultClasses;
            // add to stack
            this.modals.push(_component);
            // wait a tick then setup the following while adding a modal
            this.wait().then(function () {
                _this.toggleWrapperClass(modalWrapper.wrapper, options.wrapperClass);
                _this.toggleBodyClass(options.bodyClass);
                _this.wait(options.animationDuration).then(function () {
                    _this.autoFocusFirstElement(_component.wrapper, options.autoFocus);
                    _component.markAsReady();
                });
            });
            // when closing modal remove it
            _component.onClosing(function (modal) { return _this.removeModal(modal); });
            // if clicking on background closes modal
            this.configureCloseOnClickOutside(modalWrapper);
            // map and return observable
            _component.mapDataObject(data);
            return _component.setupObserver();
        };
        /**
         * triggers components close function
         * to take effect
         * @param {SimpleModalComponent} component
         * @returns {Promise<void>}
         */
        SimpleModalHolderComponent.prototype.removeModal = function (closingModal) {
            var _this = this;
            var options = closingModal.options;
            this.toggleWrapperClass(closingModal.wrapper, options.wrapperClass);
            return this.wait(options.animationDuration).then(function () {
                _this.removeModalFromArray(closingModal);
                _this.toggleBodyClass(options.bodyClass);
                _this.restorePreviousFocus();
            });
        };
        /**
         * Instructs all open modals to
         */
        SimpleModalHolderComponent.prototype.removeAllModals = function () {
            var _this = this;
            return Promise.all(this.modals.map(function (modal) { return _this.removeModal(modal); }));
        };
        /**
         * Bind a body class 'modal-open' to a condition of modals in pool > 0
         * @param bodyClass - string to add and remove from body in document
         */
        SimpleModalHolderComponent.prototype.toggleBodyClass = function (bodyClass) {
            var _a, _b;
            if (!bodyClass) {
                return;
            }
            var body = document.getElementsByTagName('body')[0];
            var bodyClassItems = bodyClass.split(' ');
            if (!this.modals.length) {
                (_a = body.classList).remove.apply(_a, __spread(bodyClassItems));
            }
            else {
                (_b = body.classList).add.apply(_b, __spread(bodyClassItems));
            }
        };
        /**
         * if the option to close on background click is set, then hook up a callback
         * @param options
         * @param modalWrapper
         */
        SimpleModalHolderComponent.prototype.configureCloseOnClickOutside = function (modalWrapper) {
            if (modalWrapper.content.options.closeOnClickOutside) {
                modalWrapper.onClickOutsideModalContent(function () {
                    modalWrapper.content.close();
                });
            }
        };
        /**
         * Auto focus o the first element if autofocus is on
         * @param options
         * @param modalWrapperEl
         */
        SimpleModalHolderComponent.prototype.autoFocusFirstElement = function (componentWrapper, autoFocus) {
            if (autoFocus) {
                var focusable = componentWrapper.nativeElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusable && focusable.length) {
                    this.previousActiveElement = document.activeElement;
                    focusable[0].focus();
                }
            }
        };
        /**
         * Restores the last focus is there was one
         */
        SimpleModalHolderComponent.prototype.restorePreviousFocus = function () {
            if (this.previousActiveElement) {
                this.previousActiveElement.focus();
                this.previousActiveElement = null;
            }
        };
        /**
         * Configure the adding and removal of a wrapper class - predominantly animation focused
         * @param options
         * @param modalWrapperEl
         */
        SimpleModalHolderComponent.prototype.toggleWrapperClass = function (modalWrapperEl, wrapperClass) {
            var wrapperClassList = modalWrapperEl.nativeElement.classList;
            var wrapperClassItems = wrapperClass.split(' ');
            if (wrapperClassList.toString().indexOf(wrapperClass) !== -1) {
                wrapperClassList.remove.apply(wrapperClassList, __spread(wrapperClassItems));
            }
            else {
                wrapperClassList.add.apply(wrapperClassList, __spread(wrapperClassItems));
            }
        };
        /**
         * Helper function for a more readable timeout
         * @param ms
         */
        SimpleModalHolderComponent.prototype.wait = function (ms) {
            if (ms === void 0) { ms = 0; }
            return new Promise(function (resolve, reject) {
                setTimeout(function () { return resolve(); }, ms);
            });
        };
        /**
         * Instructs the holder to remove the modal and
         * removes this component from the collection
         * @param {SimpleModalComponent} component
         */
        SimpleModalHolderComponent.prototype.removeModalFromArray = function (component) {
            var index = this.modals.indexOf(component);
            if (index > -1) {
                this.viewContainer.remove(index);
                this.modals.splice(index, 1);
            }
        };
        SimpleModalHolderComponent.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver },
            { type: undefined, decorators: [{ type: core.Inject, args: [DefaultSimpleModalOptionConfig,] }] }
        ]; };
        __decorate([
            core.ViewChild('viewContainer', { read: core.ViewContainerRef, static: true })
        ], SimpleModalHolderComponent.prototype, "viewContainer", void 0);
        SimpleModalHolderComponent = __decorate([
            core.Component({
                selector: 'simple-modal-holder',
                template: '<ng-template #viewContainer></ng-template>'
            }),
            __param(1, core.Inject(DefaultSimpleModalOptionConfig))
        ], SimpleModalHolderComponent);
        return SimpleModalHolderComponent;
    }());

    var SimpleModalServiceConfig = /** @class */ (function () {
        function SimpleModalServiceConfig() {
            this.container = null;
        }
        return SimpleModalServiceConfig;
    }());
    var SimpleModalService = /** @class */ (function () {
        /**
         * @param {ComponentFactoryResolver} resolver
         * @param {ApplicationRef} applicationRef
         * @param {Injector} injector
         * @param {SimpleModalServiceConfig} config
         */
        function SimpleModalService(resolver, applicationRef, injector, config) {
            this.resolver = resolver;
            this.applicationRef = applicationRef;
            this.injector = injector;
            if (config) {
                this.container = config.container;
            }
        }
        /**
         * Adds modal
         * @param {Type<SimpleModalComponent<T, T1>>} component
         * @param {T?} data
         * @param {SimpleModalOptionsOverrides?} options
         * @return {Observable<T1>}
         */
        SimpleModalService.prototype.addModal = function (component, data, options) {
            if (!this.modalHolderComponent) {
                this.modalHolderComponent = this.createSimpleModalHolder();
            }
            return this.modalHolderComponent.addModal(component, data, options);
        };
        /**
         * Hides and removes modal from DOM, resolves promise when fully removed
         * @param {SimpleModalComponent} component
         * @return {Promise<{}>}
      
         */
        SimpleModalService.prototype.removeModal = function (component) {
            if (!this.modalHolderComponent) {
                return Promise.resolve({});
            }
            return this.modalHolderComponent.removeModal(component);
        };
        /**
         * Closes all modals, resolves promise when they're fully removed
         * @return {Promise<{}>}
         */
        SimpleModalService.prototype.removeAll = function () {
            if (!this.modalHolderComponent) {
                return Promise.resolve({});
            }
            return this.modalHolderComponent.removeAllModals();
        };
        Object.defineProperty(SimpleModalService.prototype, "container", {
            get: function () {
                if (typeof this._container === 'string') {
                    this._container = document.getElementById(this._container);
                }
                if (!this._container && this.applicationRef['components'].length) {
                    var componentRootViewContainer = this.applicationRef['components'][0];
                    this.container = componentRootViewContainer.hostView
                        .rootNodes[0];
                }
                // fallback
                if (!this._container || typeof this._container === 'string') {
                    this._container = document.getElementsByTagName('body')[0];
                }
                return this._container;
            },
            /**
             * Accessor for contain - will auto generate from string
             * if needed or default to the root element if nothing was set
             */
            set: function (c) {
                this._container = c;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Creates and add to DOM modal holder component
         * @return {SimpleModalHolderComponent}
         */
        SimpleModalService.prototype.createSimpleModalHolder = function () {
            var _this = this;
            var componentFactory = this.resolver.resolveComponentFactory(SimpleModalHolderComponent);
            var componentRef = componentFactory.create(this.injector);
            var componentRootNode = componentRef.hostView
                .rootNodes[0];
            this.applicationRef.attachView(componentRef.hostView);
            componentRef.onDestroy(function () {
                _this.applicationRef.detachView(componentRef.hostView);
            });
            this.container.appendChild(componentRootNode);
            return componentRef.instance;
        };
        SimpleModalService.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver },
            { type: core.ApplicationRef },
            { type: core.Injector },
            { type: SimpleModalServiceConfig, decorators: [{ type: core.Optional }] }
        ]; };
        SimpleModalService = __decorate([
            core.Injectable(),
            __param(3, core.Optional())
        ], SimpleModalService);
        return SimpleModalService;
    }());

    /**
     * Modal service factory. Creates modal service with options
     * @param { ComponentFactoryResolver } resolver
     * @param { ApplicationRef } applicationRef
     * @param { Injector } injector
     * @param { SimpleModalServiceConfig } options
     * @return { SimpleModalService }
     */
    function SimpleModalServiceFactory(resolver, applicationRef, injector, options) {
        return new SimpleModalService(resolver, applicationRef, injector, options);
    }

    var ɵ0 = defaultSimpleModalOptions;
    var SimpleModalModule = /** @class */ (function () {
        function SimpleModalModule() {
        }
        SimpleModalModule_1 = SimpleModalModule;
        SimpleModalModule.forRoot = function (config, defaultModalOptions) {
            return {
                ngModule: SimpleModalModule_1,
                providers: [
                    { provide: SimpleModalServiceConfig, useValue: config },
                    {
                        provide: SimpleModalService,
                        useFactory: SimpleModalServiceFactory,
                        deps: [core.ComponentFactoryResolver, core.ApplicationRef, core.Injector, SimpleModalServiceConfig],
                    },
                    {
                        provide: DefaultSimpleModalOptionConfig,
                        useValue: defaultModalOptions || defaultSimpleModalOptions,
                    },
                ],
            };
        };
        var SimpleModalModule_1;
        SimpleModalModule = SimpleModalModule_1 = __decorate([
            core.NgModule({
                declarations: [SimpleModalHolderComponent, SimpleModalWrapperComponent],
                providers: [
                    SimpleModalService,
                    {
                        provide: DefaultSimpleModalOptionConfig,
                        useValue: ɵ0,
                    },
                ],
                imports: [common.CommonModule],
                entryComponents: [SimpleModalHolderComponent, SimpleModalWrapperComponent],
            })
        ], SimpleModalModule);
        return SimpleModalModule;
    }());

    /**
     * Abstract modal
     * @template T - modal data;
     * @template T1 - modal result
     */
    var SimpleModalComponent = /** @class */ (function () {
        /**
         * Constructor
         */
        function SimpleModalComponent() {
            /**
             * ready$ is when all animations and focusing have comleted
             */
            this._ready$ = new rxjs.BehaviorSubject(false);
            /**
             * Callback to the holders close function
             */
            this.closerCallback = function () { return Promise.resolve(); };
        }
        /**
         * Maps your object passed in the creation to fields in your own Dialog classes
         * @param {T} data
         */
        SimpleModalComponent.prototype.mapDataObject = function (data) {
            data = data || {};
            var keys = Object.keys(data);
            for (var i = 0, length_1 = keys.length; i < length_1; i++) {
                var key = keys[i];
                if (typeof data[key] === 'object' && typeof this[key] === 'object') {
                    Object.assign(this[key], data[key]);
                }
                else {
                    this[key] = data[key];
                }
            }
        };
        /**
         * Setup observer
         * @return {Observable<T1>}
         */
        SimpleModalComponent.prototype.setupObserver = function () {
            var _this = this;
            return rxjs.Observable.create(function (observer) {
                _this.observer = observer;
                // called if observable is unsubscribed to
                return function () {
                    _this.close();
                };
            });
        };
        /**
         * Defines what happens when close is called - default this
         * will just call the default remove modal process. If overriden
         * must include
         * @param callback
         */
        SimpleModalComponent.prototype.onClosing = function (callback) {
            this.closerCallback = callback;
        };
        /**
         * Closes modal
         */
        SimpleModalComponent.prototype.close = function () {
            var _this = this;
            return this.closerCallback(this).then(function (v) {
                if (_this.observer) {
                    _this.observer.next(_this.result);
                    _this.observer.complete();
                }
                return v;
            });
        };
        /**
         * keypress binding ngx way
         * @param evt
         */
        SimpleModalComponent.prototype.onKeydownHandler = function (evt) {
            if (this.options && this.options.closeOnEscape) {
                this.close();
            }
        };
        Object.defineProperty(SimpleModalComponent.prototype, "ready$", {
            get: function () {
                return this._ready$.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        SimpleModalComponent.prototype.markAsReady = function () {
            this._ready$.next(true);
        };
        __decorate([
            core.HostListener('document:keydown.escape', ['$event'])
        ], SimpleModalComponent.prototype, "onKeydownHandler", null);
        return SimpleModalComponent;
    }());

    exports.DefaultSimpleModalOptionConfig = DefaultSimpleModalOptionConfig;
    exports.SimpleModalComponent = SimpleModalComponent;
    exports.SimpleModalModule = SimpleModalModule;
    exports.SimpleModalService = SimpleModalService;
    exports.SimpleModalServiceConfig = SimpleModalServiceConfig;
    exports.defaultSimpleModalOptions = defaultSimpleModalOptions;
    exports.ɵa = SimpleModalHolderComponent;
    exports.ɵb = SimpleModalWrapperComponent;
    exports.ɵc = SimpleModalServiceFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-simple-modal.umd.js.map
