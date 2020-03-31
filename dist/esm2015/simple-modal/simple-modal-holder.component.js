import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, ElementRef, Inject, Type, ViewContainerRef, ViewChild, } from '@angular/core';
import { of } from 'rxjs';
import { DefaultSimpleModalOptionConfig, } from './simple-modal-options';
import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';
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
tslib_1.__decorate([
    ViewChild('viewContainer', { read: ViewContainerRef, static: true })
], SimpleModalHolderComponent.prototype, "viewContainer", void 0);
SimpleModalHolderComponent = tslib_1.__decorate([
    Component({
        selector: 'simple-modal-holder',
        template: '<ng-template #viewContainer></ng-template>'
    }),
    tslib_1.__param(1, Inject(DefaultSimpleModalOptionConfig))
], SimpleModalHolderComponent);
export { SimpleModalHolderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLWhvbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AemlmbG93L25neC1zaW1wbGUtbW9kYWwvIiwic291cmNlcyI6WyJzaW1wbGUtbW9kYWwvc2ltcGxlLW1vZGFsLWhvbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixNQUFNLEVBQ04sSUFBSSxFQUNKLGdCQUFnQixFQUNoQixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQ0wsOEJBQThCLEdBRy9CLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHL0U7OztHQUdHO0FBS0gsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFpQnJDOzs7T0FHRztJQUNILFlBQ1UsUUFBa0MsRUFDTSx5QkFBNkM7UUFEckYsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDTSw4QkFBeUIsR0FBekIseUJBQXlCLENBQW9CO1FBakIvRjs7O1dBR0c7UUFDSCxXQUFNLEdBQTBDLEVBQUUsQ0FBQztRQUVuRDs7V0FFRztRQUNILDBCQUFxQixHQUFHLElBQUksQ0FBQztJQVMxQixDQUFDO0lBRUo7Ozs7OztPQU1HO0lBQ0gsUUFBUSxDQUNOLFNBQTRDLEVBQzVDLElBQVEsRUFDUixPQUFxQztRQUVyQyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7UUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDbkYsTUFBTSxZQUFZLEdBQUcs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QkFBMEI7SUFKdEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixRQUFRLEVBQUUsNENBQTRDO0tBQ3ZELENBQUM7SUF3QkcsbUJBQUEsTUFBTSxDQUFDLDhCQUE4QixDQUFDLENBQUE7R0F2QjlCLDBCQUEwQixDQXFNdEM7U0FyTVksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBEZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25Db25maWcsXG4gIFNpbXBsZU1vZGFsT3B0aW9ucyxcbiAgU2ltcGxlTW9kYWxPcHRpb25zT3ZlcnJpZGVzLFxufSBmcm9tICcuL3NpbXBsZS1tb2RhbC1vcHRpb25zJztcbmltcG9ydCB7IFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNpbXBsZU1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwuY29tcG9uZW50JztcblxuLyoqXG4gKiBWaWV3IGNvbnRhaW5lciBtYW5hZ2VyIHdoaWNoIG1hbmFnZXMgYSBsaXN0IG9mIG1vZGFscyBjdXJyZW50bHkgYWN0aXZlXG4gKiBpbnNpZGUgdGhlIHZpZXd2b250YWluZXJcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2ltcGxlLW1vZGFsLWhvbGRlcicsXG4gIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlICN2aWV3Q29udGFpbmVyPjwvbmctdGVtcGxhdGU+Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQge1xuICAvKipcbiAgICogVGFyZ2V0IHZpZXdDb250YWluZXIgdG8gaW5zZXJ0IG1vZGFsc1xuICAgKi9cbiAgQFZpZXdDaGlsZCgndmlld0NvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIHZpZXdDb250YWluZXI7XG5cbiAgLyoqXG4gICAqIG1vZGFsIGNvbGxlY3Rpb24sIG1haW50YWluZWQgYnkgYWRkTW9kYWwgYW5kIHJlbW92ZU1vZGFsXG4gICAqIEB0eXBlIHtBcnJheTxTaW1wbGVNb2RhbENvbXBvbmVudD4gfVxuICAgKi9cbiAgbW9kYWxzOiBBcnJheTxTaW1wbGVNb2RhbENvbXBvbmVudDxhbnksIGFueT4+ID0gW107XG5cbiAgLyoqXG4gICAqIGlmIGF1dG8gZm9jdXMgaXMgb24gYW5kIG5vIGVsZW1lbnQgZm9jdXNlZCwgc3RvcmUgaXQgaGVyZSB0byBiZSByZXN0b3JlZCBiYWNrIGFmdGVyIGNsb3NlXG4gICAqL1xuICBwcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcn0gcmVzb2x2ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBASW5qZWN0KERlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbkNvbmZpZykgcHJpdmF0ZSBkZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25zOiBTaW1wbGVNb2RhbE9wdGlvbnNcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIHRoZW4gYWRkcyBtb2RhbCB0byB0aGUgbW9kYWxzIGFycmF5LCBhbmQgcG9wdWxhdGVzIHdpdGggZGF0YSBwYXNzZWQgaW5cbiAgICogQHBhcmFtIHtUeXBlPFNpbXBsZU1vZGFsQ29tcG9uZW50Pn0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7b2JqZWN0P30gZGF0YVxuICAgKiBAcGFyYW0ge1NpbXBsZU1vZGFsT3B0aW9uc092ZXJyaWRlcz99IG9wdGlvbnNcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTwqPn1cbiAgICovXG4gIGFkZE1vZGFsPFQsIFQxPihcbiAgICBjb21wb25lbnQ6IFR5cGU8U2ltcGxlTW9kYWxDb21wb25lbnQ8VCwgVDE+PixcbiAgICBkYXRhPzogVCxcbiAgICBvcHRpb25zPzogU2ltcGxlTW9kYWxPcHRpb25zT3ZlcnJpZGVzXG4gICk6IE9ic2VydmFibGU8VDE+IHtcbiAgICAvLyBjcmVhdGUgY29tcG9uZW50XG4gICAgaWYgKCF0aGlzLnZpZXdDb250YWluZXIpIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoU2ltcGxlTW9kYWxXcmFwcGVyQ29tcG9uZW50KTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgIGNvbnN0IG1vZGFsV3JhcHBlcjogU2ltcGxlTW9kYWxXcmFwcGVyQ29tcG9uZW50ID0gPFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudD4oXG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VcbiAgICApO1xuICAgIGNvbnN0IF9jb21wb25lbnQ6IFNpbXBsZU1vZGFsQ29tcG9uZW50PFQsIFQxPiA9IG1vZGFsV3JhcHBlci5hZGRDb21wb25lbnQoY29tcG9uZW50KTtcblxuICAgIC8vIGFzc2lnbiBvcHRpb25zIHJlZnNcbiAgICBfY29tcG9uZW50Lm9wdGlvbnMgPSBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25zLCBvcHRpb25zKTtcblxuICAgIC8vIHNldCBiYXNlIGNsYXNzZXMgZm9yIHdyYXBwZXJcbiAgICBtb2RhbFdyYXBwZXIubW9kYWxDbGFzc2VzID0gb3B0aW9ucy53cmFwcGVyRGVmYXVsdENsYXNzZXM7XG5cbiAgICAvLyBhZGQgdG8gc3RhY2tcbiAgICB0aGlzLm1vZGFscy5wdXNoKF9jb21wb25lbnQpO1xuXG4gICAgLy8gd2FpdCBhIHRpY2sgdGhlbiBzZXR1cCB0aGUgZm9sbG93aW5nIHdoaWxlIGFkZGluZyBhIG1vZGFsXG4gICAgdGhpcy53YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnRvZ2dsZVdyYXBwZXJDbGFzcyhtb2RhbFdyYXBwZXIud3JhcHBlciwgb3B0aW9ucy53cmFwcGVyQ2xhc3MpO1xuICAgICAgdGhpcy50b2dnbGVCb2R5Q2xhc3Mob3B0aW9ucy5ib2R5Q2xhc3MpO1xuICAgICAgdGhpcy53YWl0KG9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmF1dG9Gb2N1c0ZpcnN0RWxlbWVudChfY29tcG9uZW50LndyYXBwZXIsIG9wdGlvbnMuYXV0b0ZvY3VzKTtcbiAgICAgICAgX2NvbXBvbmVudC5tYXJrQXNSZWFkeSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyB3aGVuIGNsb3NpbmcgbW9kYWwgcmVtb3ZlIGl0XG4gICAgX2NvbXBvbmVudC5vbkNsb3NpbmcobW9kYWwgPT4gdGhpcy5yZW1vdmVNb2RhbChtb2RhbCkpO1xuXG4gICAgLy8gaWYgY2xpY2tpbmcgb24gYmFja2dyb3VuZCBjbG9zZXMgbW9kYWxcbiAgICB0aGlzLmNvbmZpZ3VyZUNsb3NlT25DbGlja091dHNpZGUobW9kYWxXcmFwcGVyKTtcblxuICAgIC8vIG1hcCBhbmQgcmV0dXJuIG9ic2VydmFibGVcbiAgICBfY29tcG9uZW50Lm1hcERhdGFPYmplY3QoZGF0YSk7XG5cbiAgICByZXR1cm4gX2NvbXBvbmVudC5zZXR1cE9ic2VydmVyKCk7XG4gIH1cblxuICAvKipcbiAgICogdHJpZ2dlcnMgY29tcG9uZW50cyBjbG9zZSBmdW5jdGlvblxuICAgKiB0byB0YWtlIGVmZmVjdFxuICAgKiBAcGFyYW0ge1NpbXBsZU1vZGFsQ29tcG9uZW50fSBjb21wb25lbnRcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICByZW1vdmVNb2RhbChjbG9zaW5nTW9kYWw6IFNpbXBsZU1vZGFsQ29tcG9uZW50PGFueSwgYW55Pik6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGNsb3NpbmdNb2RhbC5vcHRpb25zO1xuICAgIHRoaXMudG9nZ2xlV3JhcHBlckNsYXNzKGNsb3NpbmdNb2RhbC53cmFwcGVyLCBvcHRpb25zLndyYXBwZXJDbGFzcyk7XG4gICAgcmV0dXJuIHRoaXMud2FpdChvcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlTW9kYWxGcm9tQXJyYXkoY2xvc2luZ01vZGFsKTtcbiAgICAgIHRoaXMudG9nZ2xlQm9keUNsYXNzKG9wdGlvbnMuYm9keUNsYXNzKTtcbiAgICAgIHRoaXMucmVzdG9yZVByZXZpb3VzRm9jdXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0cnVjdHMgYWxsIG9wZW4gbW9kYWxzIHRvXG4gICAqL1xuICByZW1vdmVBbGxNb2RhbHMoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5tb2RhbHMubWFwKG1vZGFsID0+IHRoaXMucmVtb3ZlTW9kYWwobW9kYWwpKSk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIGJvZHkgY2xhc3MgJ21vZGFsLW9wZW4nIHRvIGEgY29uZGl0aW9uIG9mIG1vZGFscyBpbiBwb29sID4gMFxuICAgKiBAcGFyYW0gYm9keUNsYXNzIC0gc3RyaW5nIHRvIGFkZCBhbmQgcmVtb3ZlIGZyb20gYm9keSBpbiBkb2N1bWVudFxuICAgKi9cbiAgcHJpdmF0ZSB0b2dnbGVCb2R5Q2xhc3MoYm9keUNsYXNzOiBzdHJpbmcpIHtcbiAgICBpZiAoIWJvZHlDbGFzcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICBjb25zdCBib2R5Q2xhc3NJdGVtcyA9IGJvZHlDbGFzcy5zcGxpdCgnICcpO1xuICAgIGlmICghdGhpcy5tb2RhbHMubGVuZ3RoKSB7XG4gICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoLi4uYm9keUNsYXNzSXRlbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2R5LmNsYXNzTGlzdC5hZGQoLi4uYm9keUNsYXNzSXRlbXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBpZiB0aGUgb3B0aW9uIHRvIGNsb3NlIG9uIGJhY2tncm91bmQgY2xpY2sgaXMgc2V0LCB0aGVuIGhvb2sgdXAgYSBjYWxsYmFja1xuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiBAcGFyYW0gbW9kYWxXcmFwcGVyXG4gICAqL1xuICBwcml2YXRlIGNvbmZpZ3VyZUNsb3NlT25DbGlja091dHNpZGUobW9kYWxXcmFwcGVyOiBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnQpIHtcbiAgICBpZiAobW9kYWxXcmFwcGVyLmNvbnRlbnQub3B0aW9ucy5jbG9zZU9uQ2xpY2tPdXRzaWRlKSB7XG4gICAgICBtb2RhbFdyYXBwZXIub25DbGlja091dHNpZGVNb2RhbENvbnRlbnQoKCkgPT4ge1xuICAgICAgICBtb2RhbFdyYXBwZXIuY29udGVudC5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF1dG8gZm9jdXMgbyB0aGUgZmlyc3QgZWxlbWVudCBpZiBhdXRvZm9jdXMgaXMgb25cbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICogQHBhcmFtIG1vZGFsV3JhcHBlckVsXG4gICAqL1xuICBwcml2YXRlIGF1dG9Gb2N1c0ZpcnN0RWxlbWVudChjb21wb25lbnRXcmFwcGVyOiBFbGVtZW50UmVmLCBhdXRvRm9jdXM6IGJvb2xlYW4pIHtcbiAgICBpZiAoYXV0b0ZvY3VzKSB7XG4gICAgICBjb25zdCBmb2N1c2FibGUgPSBjb21wb25lbnRXcmFwcGVyLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgJ2J1dHRvbiwgW2hyZWZdLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJ1xuICAgICAgKTtcbiAgICAgIGlmIChmb2N1c2FibGUgJiYgZm9jdXNhYmxlLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGZvY3VzYWJsZVswXS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0b3JlcyB0aGUgbGFzdCBmb2N1cyBpcyB0aGVyZSB3YXMgb25lXG4gICAqL1xuICBwcml2YXRlIHJlc3RvcmVQcmV2aW91c0ZvY3VzKCkge1xuICAgIGlmICh0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlIHRoZSBhZGRpbmcgYW5kIHJlbW92YWwgb2YgYSB3cmFwcGVyIGNsYXNzIC0gcHJlZG9taW5hbnRseSBhbmltYXRpb24gZm9jdXNlZFxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiBAcGFyYW0gbW9kYWxXcmFwcGVyRWxcbiAgICovXG4gIHByaXZhdGUgdG9nZ2xlV3JhcHBlckNsYXNzKG1vZGFsV3JhcHBlckVsOiBFbGVtZW50UmVmLCB3cmFwcGVyQ2xhc3M6IHN0cmluZykge1xuICAgIGNvbnN0IHdyYXBwZXJDbGFzc0xpc3QgPSBtb2RhbFdyYXBwZXJFbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NJdGVtcyA9IHdyYXBwZXJDbGFzcy5zcGxpdCgnICcpO1xuICAgIGlmICh3cmFwcGVyQ2xhc3NMaXN0LnRvU3RyaW5nKCkuaW5kZXhPZih3cmFwcGVyQ2xhc3MpICE9PSAtMSkge1xuICAgICAgd3JhcHBlckNsYXNzTGlzdC5yZW1vdmUoLi4ud3JhcHBlckNsYXNzSXRlbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cmFwcGVyQ2xhc3NMaXN0LmFkZCguLi53cmFwcGVyQ2xhc3NJdGVtcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBmdW5jdGlvbiBmb3IgYSBtb3JlIHJlYWRhYmxlIHRpbWVvdXRcbiAgICogQHBhcmFtIG1zXG4gICAqL1xuICBwcml2YXRlIHdhaXQobXM6IG51bWJlciA9IDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiByZXNvbHZlKCksIG1zKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0cnVjdHMgdGhlIGhvbGRlciB0byByZW1vdmUgdGhlIG1vZGFsIGFuZFxuICAgKiByZW1vdmVzIHRoaXMgY29tcG9uZW50IGZyb20gdGhlIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIHtTaW1wbGVNb2RhbENvbXBvbmVudH0gY29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIHJlbW92ZU1vZGFsRnJvbUFycmF5KGNvbXBvbmVudCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tb2RhbHMuaW5kZXhPZihjb21wb25lbnQpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIucmVtb3ZlKGluZGV4KTtcbiAgICAgIHRoaXMubW9kYWxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG59XG4iXX0=