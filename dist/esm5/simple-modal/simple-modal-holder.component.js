import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, ElementRef, Inject, Type, ViewContainerRef, ViewChild, } from '@angular/core';
import { of } from 'rxjs';
import { DefaultSimpleModalOptionConfig, } from './simple-modal-options';
import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';
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
            (_a = body.classList).remove.apply(_a, tslib_1.__spread(bodyClassItems));
        }
        else {
            (_b = body.classList).add.apply(_b, tslib_1.__spread(bodyClassItems));
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
            wrapperClassList.remove.apply(wrapperClassList, tslib_1.__spread(wrapperClassItems));
        }
        else {
            wrapperClassList.add.apply(wrapperClassList, tslib_1.__spread(wrapperClassItems));
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
    return SimpleModalHolderComponent;
}());
export { SimpleModalHolderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLWhvbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AemlmbG93L25neC1zaW1wbGUtbW9kYWwvIiwic291cmNlcyI6WyJzaW1wbGUtbW9kYWwvc2ltcGxlLW1vZGFsLWhvbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixNQUFNLEVBQ04sSUFBSSxFQUNKLGdCQUFnQixFQUNoQixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQ0wsOEJBQThCLEdBRy9CLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHL0U7OztHQUdHO0FBS0g7SUFpQkU7OztPQUdHO0lBQ0gsb0NBQ1UsUUFBa0MsRUFDTSx5QkFBNkM7UUFEckYsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDTSw4QkFBeUIsR0FBekIseUJBQXlCLENBQW9CO1FBakIvRjs7O1dBR0c7UUFDSCxXQUFNLEdBQTBDLEVBQUUsQ0FBQztRQUVuRDs7V0FFRztRQUNILDBCQUFxQixHQUFHLElBQUksQ0FBQztJQVMxQixDQUFDO0lBRUo7Ozs7OztPQU1HO0lBQ0gsNkNBQVEsR0FBUixVQUNFLFNBQTRDLEVBQzVDLElBQVEsRUFDUixPQUFxQztRQUh2QyxpQkE2Q0M7UUF4Q0MsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ25GLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxh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LGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7cUVBQWU7SUFKekUsMEJBQTBCO1FBSnRDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsUUFBUSxFQUFFLDRDQUE0QztTQUN2RCxDQUFDO1FBd0JHLG1CQUFBLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO09BdkI5QiwwQkFBMEIsQ0FxTXRDO0lBQUQsaUNBQUM7Q0FBQSxBQXJNRCxJQXFNQztTQXJNWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBUeXBlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIERlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbkNvbmZpZyxcbiAgU2ltcGxlTW9kYWxPcHRpb25zLFxuICBTaW1wbGVNb2RhbE9wdGlvbnNPdmVycmlkZXMsXG59IGZyb20gJy4vc2ltcGxlLW1vZGFsLW9wdGlvbnMnO1xuaW1wb3J0IHsgU2ltcGxlTW9kYWxXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwtd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2ltcGxlTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3NpbXBsZS1tb2RhbC5jb21wb25lbnQnO1xuXG4vKipcbiAqIFZpZXcgY29udGFpbmVyIG1hbmFnZXIgd2hpY2ggbWFuYWdlcyBhIGxpc3Qgb2YgbW9kYWxzIGN1cnJlbnRseSBhY3RpdmVcbiAqIGluc2lkZSB0aGUgdmlld3ZvbnRhaW5lclxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzaW1wbGUtbW9kYWwtaG9sZGVyJyxcbiAgdGVtcGxhdGU6ICc8bmctdGVtcGxhdGUgI3ZpZXdDb250YWluZXI+PC9uZy10ZW1wbGF0ZT4nLFxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVNb2RhbEhvbGRlckNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBUYXJnZXQgdmlld0NvbnRhaW5lciB0byBpbnNlcnQgbW9kYWxzXG4gICAqL1xuICBAVmlld0NoaWxkKCd2aWV3Q29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgdmlld0NvbnRhaW5lcjtcblxuICAvKipcbiAgICogbW9kYWwgY29sbGVjdGlvbiwgbWFpbnRhaW5lZCBieSBhZGRNb2RhbCBhbmQgcmVtb3ZlTW9kYWxcbiAgICogQHR5cGUge0FycmF5PFNpbXBsZU1vZGFsQ29tcG9uZW50PiB9XG4gICAqL1xuICBtb2RhbHM6IEFycmF5PFNpbXBsZU1vZGFsQ29tcG9uZW50PGFueSwgYW55Pj4gPSBbXTtcblxuICAvKipcbiAgICogaWYgYXV0byBmb2N1cyBpcyBvbiBhbmQgbm8gZWxlbWVudCBmb2N1c2VkLCBzdG9yZSBpdCBoZXJlIHRvIGJlIHJlc3RvcmVkIGJhY2sgYWZ0ZXIgY2xvc2VcbiAgICovXG4gIHByZXZpb3VzQWN0aXZlRWxlbWVudCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyfSByZXNvbHZlclxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIEBJbmplY3QoRGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9uQ29uZmlnKSBwcml2YXRlIGRlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbnM6IFNpbXBsZU1vZGFsT3B0aW9uc1xuICApIHt9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgdGhlbiBhZGRzIG1vZGFsIHRvIHRoZSBtb2RhbHMgYXJyYXksIGFuZCBwb3B1bGF0ZXMgd2l0aCBkYXRhIHBhc3NlZCBpblxuICAgKiBAcGFyYW0ge1R5cGU8U2ltcGxlTW9kYWxDb21wb25lbnQ+fSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtvYmplY3Q/fSBkYXRhXG4gICAqIEBwYXJhbSB7U2ltcGxlTW9kYWxPcHRpb25zT3ZlcnJpZGVzP30gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPCo+fVxuICAgKi9cbiAgYWRkTW9kYWw8VCwgVDE+KFxuICAgIGNvbXBvbmVudDogVHlwZTxTaW1wbGVNb2RhbENvbXBvbmVudDxULCBUMT4+LFxuICAgIGRhdGE/OiBULFxuICAgIG9wdGlvbnM/OiBTaW1wbGVNb2RhbE9wdGlvbnNPdmVycmlkZXNcbiAgKTogT2JzZXJ2YWJsZTxUMT4ge1xuICAgIC8vIGNyZWF0ZSBjb21wb25lbnRcbiAgICBpZiAoIXRoaXMudmlld0NvbnRhaW5lcikge1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnQpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgY29uc3QgbW9kYWxXcmFwcGVyOiBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnQgPSA8U2ltcGxlTW9kYWxXcmFwcGVyQ29tcG9uZW50PihcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVxuICAgICk7XG4gICAgY29uc3QgX2NvbXBvbmVudDogU2ltcGxlTW9kYWxDb21wb25lbnQ8VCwgVDE+ID0gbW9kYWxXcmFwcGVyLmFkZENvbXBvbmVudChjb21wb25lbnQpO1xuXG4gICAgLy8gYXNzaWduIG9wdGlvbnMgcmVmc1xuICAgIF9jb21wb25lbnQub3B0aW9ucyA9IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgLy8gc2V0IGJhc2UgY2xhc3NlcyBmb3Igd3JhcHBlclxuICAgIG1vZGFsV3JhcHBlci5tb2RhbENsYXNzZXMgPSBvcHRpb25zLndyYXBwZXJEZWZhdWx0Q2xhc3NlcztcblxuICAgIC8vIGFkZCB0byBzdGFja1xuICAgIHRoaXMubW9kYWxzLnB1c2goX2NvbXBvbmVudCk7XG5cbiAgICAvLyB3YWl0IGEgdGljayB0aGVuIHNldHVwIHRoZSBmb2xsb3dpbmcgd2hpbGUgYWRkaW5nIGEgbW9kYWxcbiAgICB0aGlzLndhaXQoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMudG9nZ2xlV3JhcHBlckNsYXNzKG1vZGFsV3JhcHBlci53cmFwcGVyLCBvcHRpb25zLndyYXBwZXJDbGFzcyk7XG4gICAgICB0aGlzLnRvZ2dsZUJvZHlDbGFzcyhvcHRpb25zLmJvZHlDbGFzcyk7XG4gICAgICB0aGlzLndhaXQob3B0aW9ucy5hbmltYXRpb25EdXJhdGlvbikudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuYXV0b0ZvY3VzRmlyc3RFbGVtZW50KF9jb21wb25lbnQud3JhcHBlciwgb3B0aW9ucy5hdXRvRm9jdXMpO1xuICAgICAgICBfY29tcG9uZW50Lm1hcmtBc1JlYWR5KCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHdoZW4gY2xvc2luZyBtb2RhbCByZW1vdmUgaXRcbiAgICBfY29tcG9uZW50Lm9uQ2xvc2luZyhtb2RhbCA9PiB0aGlzLnJlbW92ZU1vZGFsKG1vZGFsKSk7XG5cbiAgICAvLyBpZiBjbGlja2luZyBvbiBiYWNrZ3JvdW5kIGNsb3NlcyBtb2RhbFxuICAgIHRoaXMuY29uZmlndXJlQ2xvc2VPbkNsaWNrT3V0c2lkZShtb2RhbFdyYXBwZXIpO1xuXG4gICAgLy8gbWFwIGFuZCByZXR1cm4gb2JzZXJ2YWJsZVxuICAgIF9jb21wb25lbnQubWFwRGF0YU9iamVjdChkYXRhKTtcblxuICAgIHJldHVybiBfY29tcG9uZW50LnNldHVwT2JzZXJ2ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0cmlnZ2VycyBjb21wb25lbnRzIGNsb3NlIGZ1bmN0aW9uXG4gICAqIHRvIHRha2UgZWZmZWN0XG4gICAqIEBwYXJhbSB7U2ltcGxlTW9kYWxDb21wb25lbnR9IGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHJlbW92ZU1vZGFsKGNsb3NpbmdNb2RhbDogU2ltcGxlTW9kYWxDb21wb25lbnQ8YW55LCBhbnk+KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBvcHRpb25zID0gY2xvc2luZ01vZGFsLm9wdGlvbnM7XG4gICAgdGhpcy50b2dnbGVXcmFwcGVyQ2xhc3MoY2xvc2luZ01vZGFsLndyYXBwZXIsIG9wdGlvbnMud3JhcHBlckNsYXNzKTtcbiAgICByZXR1cm4gdGhpcy53YWl0KG9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVNb2RhbEZyb21BcnJheShjbG9zaW5nTW9kYWwpO1xuICAgICAgdGhpcy50b2dnbGVCb2R5Q2xhc3Mob3B0aW9ucy5ib2R5Q2xhc3MpO1xuICAgICAgdGhpcy5yZXN0b3JlUHJldmlvdXNGb2N1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RydWN0cyBhbGwgb3BlbiBtb2RhbHMgdG9cbiAgICovXG4gIHJlbW92ZUFsbE1vZGFscygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLm1vZGFscy5tYXAobW9kYWwgPT4gdGhpcy5yZW1vdmVNb2RhbChtb2RhbCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgYm9keSBjbGFzcyAnbW9kYWwtb3BlbicgdG8gYSBjb25kaXRpb24gb2YgbW9kYWxzIGluIHBvb2wgPiAwXG4gICAqIEBwYXJhbSBib2R5Q2xhc3MgLSBzdHJpbmcgdG8gYWRkIGFuZCByZW1vdmUgZnJvbSBib2R5IGluIGRvY3VtZW50XG4gICAqL1xuICBwcml2YXRlIHRvZ2dsZUJvZHlDbGFzcyhib2R5Q2xhc3M6IHN0cmluZykge1xuICAgIGlmICghYm9keUNsYXNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICAgIGNvbnN0IGJvZHlDbGFzc0l0ZW1zID0gYm9keUNsYXNzLnNwbGl0KCcgJyk7XG4gICAgaWYgKCF0aGlzLm1vZGFscy5sZW5ndGgpIHtcbiAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSguLi5ib2R5Q2xhc3NJdGVtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCguLi5ib2R5Q2xhc3NJdGVtcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGlmIHRoZSBvcHRpb24gdG8gY2xvc2Ugb24gYmFja2dyb3VuZCBjbGljayBpcyBzZXQsIHRoZW4gaG9vayB1cCBhIGNhbGxiYWNrXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEBwYXJhbSBtb2RhbFdyYXBwZXJcbiAgICovXG4gIHByaXZhdGUgY29uZmlndXJlQ2xvc2VPbkNsaWNrT3V0c2lkZShtb2RhbFdyYXBwZXI6IFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudCkge1xuICAgIGlmIChtb2RhbFdyYXBwZXIuY29udGVudC5vcHRpb25zLmNsb3NlT25DbGlja091dHNpZGUpIHtcbiAgICAgIG1vZGFsV3JhcHBlci5vbkNsaWNrT3V0c2lkZU1vZGFsQ29udGVudCgoKSA9PiB7XG4gICAgICAgIG1vZGFsV3JhcHBlci5jb250ZW50LmNsb3NlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXV0byBmb2N1cyBvIHRoZSBmaXJzdCBlbGVtZW50IGlmIGF1dG9mb2N1cyBpcyBvblxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiBAcGFyYW0gbW9kYWxXcmFwcGVyRWxcbiAgICovXG4gIHByaXZhdGUgYXV0b0ZvY3VzRmlyc3RFbGVtZW50KGNvbXBvbmVudFdyYXBwZXI6IEVsZW1lbnRSZWYsIGF1dG9Gb2N1czogYm9vbGVhbikge1xuICAgIGlmIChhdXRvRm9jdXMpIHtcbiAgICAgIGNvbnN0IGZvY3VzYWJsZSA9IGNvbXBvbmVudFdyYXBwZXIubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAnYnV0dG9uLCBbaHJlZl0sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknXG4gICAgICApO1xuICAgICAgaWYgKGZvY3VzYWJsZSAmJiBmb2N1c2FibGUubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgZm9jdXNhYmxlWzBdLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc3RvcmVzIHRoZSBsYXN0IGZvY3VzIGlzIHRoZXJlIHdhcyBvbmVcbiAgICovXG4gIHByaXZhdGUgcmVzdG9yZVByZXZpb3VzRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50KSB7XG4gICAgICB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmUgdGhlIGFkZGluZyBhbmQgcmVtb3ZhbCBvZiBhIHdyYXBwZXIgY2xhc3MgLSBwcmVkb21pbmFudGx5IGFuaW1hdGlvbiBmb2N1c2VkXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEBwYXJhbSBtb2RhbFdyYXBwZXJFbFxuICAgKi9cbiAgcHJpdmF0ZSB0b2dnbGVXcmFwcGVyQ2xhc3MobW9kYWxXcmFwcGVyRWw6IEVsZW1lbnRSZWYsIHdyYXBwZXJDbGFzczogc3RyaW5nKSB7XG4gICAgY29uc3Qgd3JhcHBlckNsYXNzTGlzdCA9IG1vZGFsV3JhcHBlckVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGNvbnN0IHdyYXBwZXJDbGFzc0l0ZW1zID0gd3JhcHBlckNsYXNzLnNwbGl0KCcgJyk7XG4gICAgaWYgKHdyYXBwZXJDbGFzc0xpc3QudG9TdHJpbmcoKS5pbmRleE9mKHdyYXBwZXJDbGFzcykgIT09IC0xKSB7XG4gICAgICB3cmFwcGVyQ2xhc3NMaXN0LnJlbW92ZSguLi53cmFwcGVyQ2xhc3NJdGVtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBwZXJDbGFzc0xpc3QuYWRkKC4uLndyYXBwZXJDbGFzc0l0ZW1zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIGZvciBhIG1vcmUgcmVhZGFibGUgdGltZW91dFxuICAgKiBAcGFyYW0gbXNcbiAgICovXG4gIHByaXZhdGUgd2FpdChtczogbnVtYmVyID0gMCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoKSwgbXMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RydWN0cyB0aGUgaG9sZGVyIHRvIHJlbW92ZSB0aGUgbW9kYWwgYW5kXG4gICAqIHJlbW92ZXMgdGhpcyBjb21wb25lbnQgZnJvbSB0aGUgY29sbGVjdGlvblxuICAgKiBAcGFyYW0ge1NpbXBsZU1vZGFsQ29tcG9uZW50fSBjb21wb25lbnRcbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlTW9kYWxGcm9tQXJyYXkoY29tcG9uZW50KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm1vZGFscy5pbmRleE9mKGNvbXBvbmVudCk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5yZW1vdmUoaW5kZXgpO1xuICAgICAgdGhpcy5tb2RhbHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==