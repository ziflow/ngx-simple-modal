import { __decorate, __spread, __param } from 'tslib';
import { CommonModule } from '@angular/common';
import { InjectionToken, ReflectiveInjector, ComponentFactoryResolver, ViewChild, ViewContainerRef, ElementRef, Component, Inject, ApplicationRef, Injector, Optional, Injectable, NgModule, HostListener } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';

var DefaultSimpleModalOptionConfig = new InjectionToken('default-simple-modal.config');
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
        var injector = ReflectiveInjector.fromResolvedProviders([], this.viewContainer.injector);
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
        { type: ComponentFactoryResolver }
    ]; };
    __decorate([
        ViewChild('viewContainer', { read: ViewContainerRef, static: true })
    ], SimpleModalWrapperComponent.prototype, "viewContainer", void 0);
    __decorate([
        ViewChild('wrapper', { read: ElementRef, static: true })
    ], SimpleModalWrapperComponent.prototype, "wrapper", void 0);
    SimpleModalWrapperComponent = __decorate([
        Component({
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
            return of(null);
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
        { type: ComponentFactoryResolver },
        { type: undefined, decorators: [{ type: Inject, args: [DefaultSimpleModalOptionConfig,] }] }
    ]; };
    __decorate([
        ViewChild('viewContainer', { read: ViewContainerRef, static: true })
    ], SimpleModalHolderComponent.prototype, "viewContainer", void 0);
    SimpleModalHolderComponent = __decorate([
        Component({
            selector: 'simple-modal-holder',
            template: '<ng-template #viewContainer></ng-template>'
        }),
        __param(1, Inject(DefaultSimpleModalOptionConfig))
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
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector },
        { type: SimpleModalServiceConfig, decorators: [{ type: Optional }] }
    ]; };
    SimpleModalService = __decorate([
        Injectable(),
        __param(3, Optional())
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
                    deps: [ComponentFactoryResolver, ApplicationRef, Injector, SimpleModalServiceConfig],
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
        NgModule({
            declarations: [SimpleModalHolderComponent, SimpleModalWrapperComponent],
            providers: [
                SimpleModalService,
                {
                    provide: DefaultSimpleModalOptionConfig,
                    useValue: ɵ0,
                },
            ],
            imports: [CommonModule],
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
        this._ready$ = new BehaviorSubject(false);
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
        return Observable.create(function (observer) {
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
        HostListener('document:keydown.escape', ['$event'])
    ], SimpleModalComponent.prototype, "onKeydownHandler", null);
    return SimpleModalComponent;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultSimpleModalOptionConfig, SimpleModalComponent, SimpleModalModule, SimpleModalService, SimpleModalServiceConfig, defaultSimpleModalOptions, SimpleModalHolderComponent as ɵa, SimpleModalWrapperComponent as ɵb, SimpleModalServiceFactory as ɵc };
//# sourceMappingURL=ngx-simple-modal.js.map
