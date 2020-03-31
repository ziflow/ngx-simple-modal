import { __decorate, __param } from 'tslib';
import { CommonModule } from '@angular/common';
import { InjectionToken, ReflectiveInjector, ComponentFactoryResolver, ViewChild, ViewContainerRef, ElementRef, Component, Inject, ApplicationRef, Injector, Optional, Injectable, NgModule, HostListener } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';

const DefaultSimpleModalOptionConfig = new InjectionToken('default-simple-modal.config');
const defaultSimpleModalOptions = {
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
let SimpleModalWrapperComponent = class SimpleModalWrapperComponent {
    /**
     * Constructor
     * @param {ComponentFactoryResolver} resolver
     */
    constructor(resolver) {
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
    addComponent(component) {
        const factory = this.resolver.resolveComponentFactory(component);
        const injector = ReflectiveInjector.fromResolvedProviders([], this.viewContainer.injector);
        const componentRef = factory.create(injector);
        this.viewContainer.insert(componentRef.hostView);
        this.content = componentRef.instance;
        this.content.wrapper = this.wrapper;
        return this.content;
    }
    /**
     * Configures the function to call when you click on background of a modal but not the contents
     * @param callback
     */
    onClickOutsideModalContent(callback) {
        this.clickOutsideCallback = event => {
            if (event.target === containerEl) {
                callback();
            }
        };
        const containerEl = this.wrapper.nativeElement;
        containerEl.addEventListener('click', this.clickOutsideCallback, false);
    }
    ngOnDestroy() {
        if (this.clickOutsideCallback) {
            const containerEl = this.wrapper.nativeElement;
            containerEl.removeEventListener('click', this.clickOutsideCallback, false);
            this.clickOutsideCallback = null;
        }
    }
};
SimpleModalWrapperComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
__decorate([
    ViewChild('viewContainer', { read: ViewContainerRef, static: true })
], SimpleModalWrapperComponent.prototype, "viewContainer", void 0);
__decorate([
    ViewChild('wrapper', { read: ElementRef, static: true })
], SimpleModalWrapperComponent.prototype, "wrapper", void 0);
SimpleModalWrapperComponent = __decorate([
    Component({
        selector: 'simple-modal-wrapper',
        template: `
    <div #wrapper [ngClass]="modalClasses" [ngStyle]="{ display: 'block' }" role="dialog">
      <ng-template #viewContainer></ng-template>
    </div>
  `
    })
], SimpleModalWrapperComponent);

/**
 * View container manager which manages a list of modals currently active
 * inside the viewvontainer
 */
let SimpleModalHolderComponent = class SimpleModalHolderComponent {
    /**
     * Constructor
     * @param {ComponentFactoryResolver} resolver
     */
    constructor(resolver, defaultSimpleModalOptions) {
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
    addModal(component, data, options) {
        // create component
        if (!this.viewContainer) {
            return of(null);
        }
        const factory = this.resolver.resolveComponentFactory(SimpleModalWrapperComponent);
        const componentRef = this.viewContainer.createComponent(factory);
        const modalWrapper = (componentRef.instance);
        const _component = modalWrapper.addComponent(component);
        // assign options refs
        _component.options = options = Object.assign({}, this.defaultSimpleModalOptions, options);
        // set base classes for wrapper
        modalWrapper.modalClasses = options.wrapperDefaultClasses;
        // add to stack
        this.modals.push(_component);
        // wait a tick then setup the following while adding a modal
        this.wait().then(() => {
            this.toggleWrapperClass(modalWrapper.wrapper, options.wrapperClass);
            this.toggleBodyClass(options.bodyClass);
            this.wait(options.animationDuration).then(() => {
                this.autoFocusFirstElement(_component.wrapper, options.autoFocus);
                _component.markAsReady();
            });
        });
        // when closing modal remove it
        _component.onClosing(modal => this.removeModal(modal));
        // if clicking on background closes modal
        this.configureCloseOnClickOutside(modalWrapper);
        // map and return observable
        _component.mapDataObject(data);
        return _component.setupObserver();
    }
    /**
     * triggers components close function
     * to take effect
     * @param {SimpleModalComponent} component
     * @returns {Promise<void>}
     */
    removeModal(closingModal) {
        const options = closingModal.options;
        this.toggleWrapperClass(closingModal.wrapper, options.wrapperClass);
        return this.wait(options.animationDuration).then(() => {
            this.removeModalFromArray(closingModal);
            this.toggleBodyClass(options.bodyClass);
            this.restorePreviousFocus();
        });
    }
    /**
     * Instructs all open modals to
     */
    removeAllModals() {
        return Promise.all(this.modals.map(modal => this.removeModal(modal)));
    }
    /**
     * Bind a body class 'modal-open' to a condition of modals in pool > 0
     * @param bodyClass - string to add and remove from body in document
     */
    toggleBodyClass(bodyClass) {
        if (!bodyClass) {
            return;
        }
        const body = document.getElementsByTagName('body')[0];
        const bodyClassItems = bodyClass.split(' ');
        if (!this.modals.length) {
            body.classList.remove(...bodyClassItems);
        }
        else {
            body.classList.add(...bodyClassItems);
        }
    }
    /**
     * if the option to close on background click is set, then hook up a callback
     * @param options
     * @param modalWrapper
     */
    configureCloseOnClickOutside(modalWrapper) {
        if (modalWrapper.content.options.closeOnClickOutside) {
            modalWrapper.onClickOutsideModalContent(() => {
                modalWrapper.content.close();
            });
        }
    }
    /**
     * Auto focus o the first element if autofocus is on
     * @param options
     * @param modalWrapperEl
     */
    autoFocusFirstElement(componentWrapper, autoFocus) {
        if (autoFocus) {
            const focusable = componentWrapper.nativeElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable && focusable.length) {
                this.previousActiveElement = document.activeElement;
                focusable[0].focus();
            }
        }
    }
    /**
     * Restores the last focus is there was one
     */
    restorePreviousFocus() {
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
            this.previousActiveElement = null;
        }
    }
    /**
     * Configure the adding and removal of a wrapper class - predominantly animation focused
     * @param options
     * @param modalWrapperEl
     */
    toggleWrapperClass(modalWrapperEl, wrapperClass) {
        const wrapperClassList = modalWrapperEl.nativeElement.classList;
        const wrapperClassItems = wrapperClass.split(' ');
        if (wrapperClassList.toString().indexOf(wrapperClass) !== -1) {
            wrapperClassList.remove(...wrapperClassItems);
        }
        else {
            wrapperClassList.add(...wrapperClassItems);
        }
    }
    /**
     * Helper function for a more readable timeout
     * @param ms
     */
    wait(ms = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), ms);
        });
    }
    /**
     * Instructs the holder to remove the modal and
     * removes this component from the collection
     * @param {SimpleModalComponent} component
     */
    removeModalFromArray(component) {
        const index = this.modals.indexOf(component);
        if (index > -1) {
            this.viewContainer.remove(index);
            this.modals.splice(index, 1);
        }
    }
};
SimpleModalHolderComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: undefined, decorators: [{ type: Inject, args: [DefaultSimpleModalOptionConfig,] }] }
];
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

class SimpleModalServiceConfig {
    constructor() {
        this.container = null;
    }
}
let SimpleModalService = class SimpleModalService {
    /**
     * @param {ComponentFactoryResolver} resolver
     * @param {ApplicationRef} applicationRef
     * @param {Injector} injector
     * @param {SimpleModalServiceConfig} config
     */
    constructor(resolver, applicationRef, injector, config) {
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
    addModal(component, data, options) {
        if (!this.modalHolderComponent) {
            this.modalHolderComponent = this.createSimpleModalHolder();
        }
        return this.modalHolderComponent.addModal(component, data, options);
    }
    /**
     * Hides and removes modal from DOM, resolves promise when fully removed
     * @param {SimpleModalComponent} component
     * @return {Promise<{}>}
  
     */
    removeModal(component) {
        if (!this.modalHolderComponent) {
            return Promise.resolve({});
        }
        return this.modalHolderComponent.removeModal(component);
    }
    /**
     * Closes all modals, resolves promise when they're fully removed
     * @return {Promise<{}>}
     */
    removeAll() {
        if (!this.modalHolderComponent) {
            return Promise.resolve({});
        }
        return this.modalHolderComponent.removeAllModals();
    }
    /**
     * Accessor for contain - will auto generate from string
     * if needed or default to the root element if nothing was set
     */
    set container(c) {
        this._container = c;
    }
    get container() {
        if (typeof this._container === 'string') {
            this._container = document.getElementById(this._container);
        }
        if (!this._container && this.applicationRef['components'].length) {
            const componentRootViewContainer = this.applicationRef['components'][0];
            this.container = componentRootViewContainer.hostView
                .rootNodes[0];
        }
        // fallback
        if (!this._container || typeof this._container === 'string') {
            this._container = document.getElementsByTagName('body')[0];
        }
        return this._container;
    }
    /**
     * Creates and add to DOM modal holder component
     * @return {SimpleModalHolderComponent}
     */
    createSimpleModalHolder() {
        const componentFactory = this.resolver.resolveComponentFactory(SimpleModalHolderComponent);
        const componentRef = componentFactory.create(this.injector);
        const componentRootNode = componentRef.hostView
            .rootNodes[0];
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });
        this.container.appendChild(componentRootNode);
        return componentRef.instance;
    }
};
SimpleModalService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector },
    { type: SimpleModalServiceConfig, decorators: [{ type: Optional }] }
];
SimpleModalService = __decorate([
    Injectable(),
    __param(3, Optional())
], SimpleModalService);

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

var SimpleModalModule_1;
const ɵ0 = defaultSimpleModalOptions;
let SimpleModalModule = SimpleModalModule_1 = class SimpleModalModule {
    constructor() { }
    static forRoot(config, defaultModalOptions) {
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
    }
};
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

/**
 * Abstract modal
 * @template T - modal data;
 * @template T1 - modal result
 */
class SimpleModalComponent {
    /**
     * Constructor
     */
    constructor() {
        /**
         * ready$ is when all animations and focusing have comleted
         */
        this._ready$ = new BehaviorSubject(false);
        /**
         * Callback to the holders close function
         */
        this.closerCallback = () => Promise.resolve();
    }
    /**
     * Maps your object passed in the creation to fields in your own Dialog classes
     * @param {T} data
     */
    mapDataObject(data) {
        data = data || {};
        const keys = Object.keys(data);
        for (let i = 0, length = keys.length; i < length; i++) {
            const key = keys[i];
            if (typeof data[key] === 'object' && typeof this[key] === 'object') {
                Object.assign(this[key], data[key]);
            }
            else {
                this[key] = data[key];
            }
        }
    }
    /**
     * Setup observer
     * @return {Observable<T1>}
     */
    setupObserver() {
        return Observable.create(observer => {
            this.observer = observer;
            // called if observable is unsubscribed to
            return () => {
                this.close();
            };
        });
    }
    /**
     * Defines what happens when close is called - default this
     * will just call the default remove modal process. If overriden
     * must include
     * @param callback
     */
    onClosing(callback) {
        this.closerCallback = callback;
    }
    /**
     * Closes modal
     */
    close() {
        return this.closerCallback(this).then(v => {
            if (this.observer) {
                this.observer.next(this.result);
                this.observer.complete();
            }
            return v;
        });
    }
    /**
     * keypress binding ngx way
     * @param evt
     */
    onKeydownHandler(evt) {
        if (this.options && this.options.closeOnEscape) {
            this.close();
        }
    }
    get ready$() {
        return this._ready$.asObservable();
    }
    markAsReady() {
        this._ready$.next(true);
    }
}
__decorate([
    HostListener('document:keydown.escape', ['$event'])
], SimpleModalComponent.prototype, "onKeydownHandler", null);

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultSimpleModalOptionConfig, SimpleModalComponent, SimpleModalModule, SimpleModalService, SimpleModalServiceConfig, defaultSimpleModalOptions, SimpleModalHolderComponent as ɵa, SimpleModalWrapperComponent as ɵb, SimpleModalServiceFactory as ɵc };
//# sourceMappingURL=ngx-simple-modal.js.map
