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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLWhvbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2ltcGxlLW1vZGFsLyIsInNvdXJjZXMiOlsic2ltcGxlLW1vZGFsL3NpbXBsZS1tb2RhbC1ob2xkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHdCQUF3QixFQUN4QixVQUFVLEVBQ1YsTUFBTSxFQUNOLElBQUksRUFDSixnQkFBZ0IsRUFDaEIsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUNMLDhCQUE4QixHQUcvQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRy9FOzs7R0FHRztBQUtILElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBaUJyQzs7O09BR0c7SUFDSCxZQUNVLFFBQWtDLEVBQ00seUJBQTZDO1FBRHJGLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ00sOEJBQXlCLEdBQXpCLHlCQUF5QixDQUFvQjtRQWpCL0Y7OztXQUdHO1FBQ0gsV0FBTSxHQUEwQyxFQUFFLENBQUM7UUFFbkQ7O1dBRUc7UUFDSCwwQkFBcUIsR0FBRyxJQUFJLENBQUM7SUFTMUIsQ0FBQztJQUVKOzs7Ozs7T0FNRztJQUNILFFBQVEsQ0FDTixTQUE0QyxFQUM1QyxJQUFRLEVBQ1IsT0FBcUM7UUFFckMsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ25GLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FB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SnRDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsUUFBUSxFQUFFLDRDQUE0QztLQUN2RCxDQUFDO0lBd0JHLG1CQUFBLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0dBdkI5QiwwQkFBMEIsQ0FxTXRDO1NBck1ZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIFR5cGUsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgRGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9uQ29uZmlnLFxuICBTaW1wbGVNb2RhbE9wdGlvbnMsXG4gIFNpbXBsZU1vZGFsT3B0aW9uc092ZXJyaWRlcyxcbn0gZnJvbSAnLi9zaW1wbGUtbW9kYWwtb3B0aW9ucyc7XG5pbXBvcnQgeyBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3NpbXBsZS1tb2RhbC13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW1wbGVNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLmNvbXBvbmVudCc7XG5cbi8qKlxuICogVmlldyBjb250YWluZXIgbWFuYWdlciB3aGljaCBtYW5hZ2VzIGEgbGlzdCBvZiBtb2RhbHMgY3VycmVudGx5IGFjdGl2ZVxuICogaW5zaWRlIHRoZSB2aWV3dm9udGFpbmVyXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NpbXBsZS1tb2RhbC1ob2xkZXInLFxuICB0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZSAjdmlld0NvbnRhaW5lcj48L25nLXRlbXBsYXRlPicsXG59KVxuZXhwb3J0IGNsYXNzIFNpbXBsZU1vZGFsSG9sZGVyQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFRhcmdldCB2aWV3Q29udGFpbmVyIHRvIGluc2VydCBtb2RhbHNcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3ZpZXdDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSB2aWV3Q29udGFpbmVyO1xuXG4gIC8qKlxuICAgKiBtb2RhbCBjb2xsZWN0aW9uLCBtYWludGFpbmVkIGJ5IGFkZE1vZGFsIGFuZCByZW1vdmVNb2RhbFxuICAgKiBAdHlwZSB7QXJyYXk8U2ltcGxlTW9kYWxDb21wb25lbnQ+IH1cbiAgICovXG4gIG1vZGFsczogQXJyYXk8U2ltcGxlTW9kYWxDb21wb25lbnQ8YW55LCBhbnk+PiA9IFtdO1xuXG4gIC8qKlxuICAgKiBpZiBhdXRvIGZvY3VzIGlzIG9uIGFuZCBubyBlbGVtZW50IGZvY3VzZWQsIHN0b3JlIGl0IGhlcmUgdG8gYmUgcmVzdG9yZWQgYmFjayBhZnRlciBjbG9zZVxuICAgKi9cbiAgcHJldmlvdXNBY3RpdmVFbGVtZW50ID0gbnVsbDtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJ9IHJlc29sdmVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQEluamVjdChEZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25Db25maWcpIHByaXZhdGUgZGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9uczogU2ltcGxlTW9kYWxPcHRpb25zXG4gICkge31cblxuICAvKipcbiAgICogQ29uZmlndXJlcyB0aGVuIGFkZHMgbW9kYWwgdG8gdGhlIG1vZGFscyBhcnJheSwgYW5kIHBvcHVsYXRlcyB3aXRoIGRhdGEgcGFzc2VkIGluXG4gICAqIEBwYXJhbSB7VHlwZTxTaW1wbGVNb2RhbENvbXBvbmVudD59IGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge29iamVjdD99IGRhdGFcbiAgICogQHBhcmFtIHtTaW1wbGVNb2RhbE9wdGlvbnNPdmVycmlkZXM/fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8Kj59XG4gICAqL1xuICBhZGRNb2RhbDxULCBUMT4oXG4gICAgY29tcG9uZW50OiBUeXBlPFNpbXBsZU1vZGFsQ29tcG9uZW50PFQsIFQxPj4sXG4gICAgZGF0YT86IFQsXG4gICAgb3B0aW9ucz86IFNpbXBsZU1vZGFsT3B0aW9uc092ZXJyaWRlc1xuICApOiBPYnNlcnZhYmxlPFQxPiB7XG4gICAgLy8gY3JlYXRlIGNvbXBvbmVudFxuICAgIGlmICghdGhpcy52aWV3Q29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudCk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICBjb25zdCBtb2RhbFdyYXBwZXI6IFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudCA9IDxTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnQ+KFxuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlXG4gICAgKTtcbiAgICBjb25zdCBfY29tcG9uZW50OiBTaW1wbGVNb2RhbENvbXBvbmVudDxULCBUMT4gPSBtb2RhbFdyYXBwZXIuYWRkQ29tcG9uZW50KGNvbXBvbmVudCk7XG5cbiAgICAvLyBhc3NpZ24gb3B0aW9ucyByZWZzXG4gICAgX2NvbXBvbmVudC5vcHRpb25zID0gb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAvLyBzZXQgYmFzZSBjbGFzc2VzIGZvciB3cmFwcGVyXG4gICAgbW9kYWxXcmFwcGVyLm1vZGFsQ2xhc3NlcyA9IG9wdGlvbnMud3JhcHBlckRlZmF1bHRDbGFzc2VzO1xuXG4gICAgLy8gYWRkIHRvIHN0YWNrXG4gICAgdGhpcy5tb2RhbHMucHVzaChfY29tcG9uZW50KTtcblxuICAgIC8vIHdhaXQgYSB0aWNrIHRoZW4gc2V0dXAgdGhlIGZvbGxvd2luZyB3aGlsZSBhZGRpbmcgYSBtb2RhbFxuICAgIHRoaXMud2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy50b2dnbGVXcmFwcGVyQ2xhc3MobW9kYWxXcmFwcGVyLndyYXBwZXIsIG9wdGlvbnMud3JhcHBlckNsYXNzKTtcbiAgICAgIHRoaXMudG9nZ2xlQm9keUNsYXNzKG9wdGlvbnMuYm9keUNsYXNzKTtcbiAgICAgIHRoaXMud2FpdChvcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5hdXRvRm9jdXNGaXJzdEVsZW1lbnQoX2NvbXBvbmVudC53cmFwcGVyLCBvcHRpb25zLmF1dG9Gb2N1cyk7XG4gICAgICAgIF9jb21wb25lbnQubWFya0FzUmVhZHkoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gd2hlbiBjbG9zaW5nIG1vZGFsIHJlbW92ZSBpdFxuICAgIF9jb21wb25lbnQub25DbG9zaW5nKG1vZGFsID0+IHRoaXMucmVtb3ZlTW9kYWwobW9kYWwpKTtcblxuICAgIC8vIGlmIGNsaWNraW5nIG9uIGJhY2tncm91bmQgY2xvc2VzIG1vZGFsXG4gICAgdGhpcy5jb25maWd1cmVDbG9zZU9uQ2xpY2tPdXRzaWRlKG1vZGFsV3JhcHBlcik7XG5cbiAgICAvLyBtYXAgYW5kIHJldHVybiBvYnNlcnZhYmxlXG4gICAgX2NvbXBvbmVudC5tYXBEYXRhT2JqZWN0KGRhdGEpO1xuXG4gICAgcmV0dXJuIF9jb21wb25lbnQuc2V0dXBPYnNlcnZlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRyaWdnZXJzIGNvbXBvbmVudHMgY2xvc2UgZnVuY3Rpb25cbiAgICogdG8gdGFrZSBlZmZlY3RcbiAgICogQHBhcmFtIHtTaW1wbGVNb2RhbENvbXBvbmVudH0gY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcmVtb3ZlTW9kYWwoY2xvc2luZ01vZGFsOiBTaW1wbGVNb2RhbENvbXBvbmVudDxhbnksIGFueT4pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjbG9zaW5nTW9kYWwub3B0aW9ucztcbiAgICB0aGlzLnRvZ2dsZVdyYXBwZXJDbGFzcyhjbG9zaW5nTW9kYWwud3JhcHBlciwgb3B0aW9ucy53cmFwcGVyQ2xhc3MpO1xuICAgIHJldHVybiB0aGlzLndhaXQob3B0aW9ucy5hbmltYXRpb25EdXJhdGlvbikudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZU1vZGFsRnJvbUFycmF5KGNsb3NpbmdNb2RhbCk7XG4gICAgICB0aGlzLnRvZ2dsZUJvZHlDbGFzcyhvcHRpb25zLmJvZHlDbGFzcyk7XG4gICAgICB0aGlzLnJlc3RvcmVQcmV2aW91c0ZvY3VzKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5zdHJ1Y3RzIGFsbCBvcGVuIG1vZGFscyB0b1xuICAgKi9cbiAgcmVtb3ZlQWxsTW9kYWxzKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMubW9kYWxzLm1hcChtb2RhbCA9PiB0aGlzLnJlbW92ZU1vZGFsKG1vZGFsKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSBib2R5IGNsYXNzICdtb2RhbC1vcGVuJyB0byBhIGNvbmRpdGlvbiBvZiBtb2RhbHMgaW4gcG9vbCA+IDBcbiAgICogQHBhcmFtIGJvZHlDbGFzcyAtIHN0cmluZyB0byBhZGQgYW5kIHJlbW92ZSBmcm9tIGJvZHkgaW4gZG9jdW1lbnRcbiAgICovXG4gIHByaXZhdGUgdG9nZ2xlQm9keUNsYXNzKGJvZHlDbGFzczogc3RyaW5nKSB7XG4gICAgaWYgKCFib2R5Q2xhc3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgY29uc3QgYm9keUNsYXNzSXRlbXMgPSBib2R5Q2xhc3Muc3BsaXQoJyAnKTtcbiAgICBpZiAoIXRoaXMubW9kYWxzLmxlbmd0aCkge1xuICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKC4uLmJvZHlDbGFzc0l0ZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKC4uLmJvZHlDbGFzc0l0ZW1zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaWYgdGhlIG9wdGlvbiB0byBjbG9zZSBvbiBiYWNrZ3JvdW5kIGNsaWNrIGlzIHNldCwgdGhlbiBob29rIHVwIGEgY2FsbGJhY2tcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICogQHBhcmFtIG1vZGFsV3JhcHBlclxuICAgKi9cbiAgcHJpdmF0ZSBjb25maWd1cmVDbG9zZU9uQ2xpY2tPdXRzaWRlKG1vZGFsV3JhcHBlcjogU2ltcGxlTW9kYWxXcmFwcGVyQ29tcG9uZW50KSB7XG4gICAgaWYgKG1vZGFsV3JhcHBlci5jb250ZW50Lm9wdGlvbnMuY2xvc2VPbkNsaWNrT3V0c2lkZSkge1xuICAgICAgbW9kYWxXcmFwcGVyLm9uQ2xpY2tPdXRzaWRlTW9kYWxDb250ZW50KCgpID0+IHtcbiAgICAgICAgbW9kYWxXcmFwcGVyLmNvbnRlbnQuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdXRvIGZvY3VzIG8gdGhlIGZpcnN0IGVsZW1lbnQgaWYgYXV0b2ZvY3VzIGlzIG9uXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEBwYXJhbSBtb2RhbFdyYXBwZXJFbFxuICAgKi9cbiAgcHJpdmF0ZSBhdXRvRm9jdXNGaXJzdEVsZW1lbnQoY29tcG9uZW50V3JhcHBlcjogRWxlbWVudFJlZiwgYXV0b0ZvY3VzOiBib29sZWFuKSB7XG4gICAgaWYgKGF1dG9Gb2N1cykge1xuICAgICAgY29uc3QgZm9jdXNhYmxlID0gY29tcG9uZW50V3JhcHBlci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICdidXR0b24sIFtocmVmXSwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFt0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSdcbiAgICAgICk7XG4gICAgICBpZiAoZm9jdXNhYmxlICYmIGZvY3VzYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICBmb2N1c2FibGVbMF0uZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzdG9yZXMgdGhlIGxhc3QgZm9jdXMgaXMgdGhlcmUgd2FzIG9uZVxuICAgKi9cbiAgcHJpdmF0ZSByZXN0b3JlUHJldmlvdXNGb2N1cygpIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZSB0aGUgYWRkaW5nIGFuZCByZW1vdmFsIG9mIGEgd3JhcHBlciBjbGFzcyAtIHByZWRvbWluYW50bHkgYW5pbWF0aW9uIGZvY3VzZWRcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICogQHBhcmFtIG1vZGFsV3JhcHBlckVsXG4gICAqL1xuICBwcml2YXRlIHRvZ2dsZVdyYXBwZXJDbGFzcyhtb2RhbFdyYXBwZXJFbDogRWxlbWVudFJlZiwgd3JhcHBlckNsYXNzOiBzdHJpbmcpIHtcbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NMaXN0ID0gbW9kYWxXcmFwcGVyRWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgY29uc3Qgd3JhcHBlckNsYXNzSXRlbXMgPSB3cmFwcGVyQ2xhc3Muc3BsaXQoJyAnKTtcbiAgICBpZiAod3JhcHBlckNsYXNzTGlzdC50b1N0cmluZygpLmluZGV4T2Yod3JhcHBlckNsYXNzKSAhPT0gLTEpIHtcbiAgICAgIHdyYXBwZXJDbGFzc0xpc3QucmVtb3ZlKC4uLndyYXBwZXJDbGFzc0l0ZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcHBlckNsYXNzTGlzdC5hZGQoLi4ud3JhcHBlckNsYXNzSXRlbXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGEgbW9yZSByZWFkYWJsZSB0aW1lb3V0XG4gICAqIEBwYXJhbSBtc1xuICAgKi9cbiAgcHJpdmF0ZSB3YWl0KG1zOiBudW1iZXIgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZSgpLCBtcyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5zdHJ1Y3RzIHRoZSBob2xkZXIgdG8gcmVtb3ZlIHRoZSBtb2RhbCBhbmRcbiAgICogcmVtb3ZlcyB0aGlzIGNvbXBvbmVudCBmcm9tIHRoZSBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSB7U2ltcGxlTW9kYWxDb21wb25lbnR9IGNvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVNb2RhbEZyb21BcnJheShjb21wb25lbnQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMubW9kYWxzLmluZGV4T2YoY29tcG9uZW50KTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLnJlbW92ZShpbmRleCk7XG4gICAgICB0aGlzLm1vZGFscy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxufVxuIl19