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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLWhvbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2ltcGxlLW1vZGFsLyIsInNvdXJjZXMiOlsic2ltcGxlLW1vZGFsL3NpbXBsZS1tb2RhbC1ob2xkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHdCQUF3QixFQUN4QixVQUFVLEVBQ1YsTUFBTSxFQUNOLElBQUksRUFDSixnQkFBZ0IsRUFDaEIsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUNMLDhCQUE4QixHQUcvQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRy9FOzs7R0FHRztBQUtIO0lBaUJFOzs7T0FHRztJQUNILG9DQUNVLFFBQWtDLEVBQ00seUJBQTZDO1FBRHJGLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ00sOEJBQXlCLEdBQXpCLHlCQUF5QixDQUFvQjtRQWpCL0Y7OztXQUdHO1FBQ0gsV0FBTSxHQUEwQyxFQUFFLENBQUM7UUFFbkQ7O1dBRUc7UUFDSCwwQkFBcUIsR0FBRyxJQUFJLENBQUM7SUFTMUIsQ0FBQztJQUVKOzs7Ozs7T0FNRztJQUNILDZDQUFRLEdBQVIsVUFDRSxTQUE0QyxFQUM1QyxJQUFRLEVBQ1IsT0FBcUM7UUFIdkMsaUJBNkNDO1FBeENDLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtRQUNELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNuRixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFD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QUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3FFQUFlO0lBSnpFLDBCQUEwQjtRQUp0QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFFBQVEsRUFBRSw0Q0FBNEM7U0FDdkQsQ0FBQztRQXdCRyxtQkFBQSxNQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQTtPQXZCOUIsMEJBQTBCLENBcU10QztJQUFELGlDQUFDO0NBQUEsQUFyTUQsSUFxTUM7U0FyTVksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBEZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25Db25maWcsXG4gIFNpbXBsZU1vZGFsT3B0aW9ucyxcbiAgU2ltcGxlTW9kYWxPcHRpb25zT3ZlcnJpZGVzLFxufSBmcm9tICcuL3NpbXBsZS1tb2RhbC1vcHRpb25zJztcbmltcG9ydCB7IFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNpbXBsZU1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwuY29tcG9uZW50JztcblxuLyoqXG4gKiBWaWV3IGNvbnRhaW5lciBtYW5hZ2VyIHdoaWNoIG1hbmFnZXMgYSBsaXN0IG9mIG1vZGFscyBjdXJyZW50bHkgYWN0aXZlXG4gKiBpbnNpZGUgdGhlIHZpZXd2b250YWluZXJcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2ltcGxlLW1vZGFsLWhvbGRlcicsXG4gIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlICN2aWV3Q29udGFpbmVyPjwvbmctdGVtcGxhdGU+Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQge1xuICAvKipcbiAgICogVGFyZ2V0IHZpZXdDb250YWluZXIgdG8gaW5zZXJ0IG1vZGFsc1xuICAgKi9cbiAgQFZpZXdDaGlsZCgndmlld0NvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIHZpZXdDb250YWluZXI7XG5cbiAgLyoqXG4gICAqIG1vZGFsIGNvbGxlY3Rpb24sIG1haW50YWluZWQgYnkgYWRkTW9kYWwgYW5kIHJlbW92ZU1vZGFsXG4gICAqIEB0eXBlIHtBcnJheTxTaW1wbGVNb2RhbENvbXBvbmVudD4gfVxuICAgKi9cbiAgbW9kYWxzOiBBcnJheTxTaW1wbGVNb2RhbENvbXBvbmVudDxhbnksIGFueT4+ID0gW107XG5cbiAgLyoqXG4gICAqIGlmIGF1dG8gZm9jdXMgaXMgb24gYW5kIG5vIGVsZW1lbnQgZm9jdXNlZCwgc3RvcmUgaXQgaGVyZSB0byBiZSByZXN0b3JlZCBiYWNrIGFmdGVyIGNsb3NlXG4gICAqL1xuICBwcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcn0gcmVzb2x2ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBASW5qZWN0KERlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbkNvbmZpZykgcHJpdmF0ZSBkZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25zOiBTaW1wbGVNb2RhbE9wdGlvbnNcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIHRoZW4gYWRkcyBtb2RhbCB0byB0aGUgbW9kYWxzIGFycmF5LCBhbmQgcG9wdWxhdGVzIHdpdGggZGF0YSBwYXNzZWQgaW5cbiAgICogQHBhcmFtIHtUeXBlPFNpbXBsZU1vZGFsQ29tcG9uZW50Pn0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7b2JqZWN0P30gZGF0YVxuICAgKiBAcGFyYW0ge1NpbXBsZU1vZGFsT3B0aW9uc092ZXJyaWRlcz99IG9wdGlvbnNcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTwqPn1cbiAgICovXG4gIGFkZE1vZGFsPFQsIFQxPihcbiAgICBjb21wb25lbnQ6IFR5cGU8U2ltcGxlTW9kYWxDb21wb25lbnQ8VCwgVDE+PixcbiAgICBkYXRhPzogVCxcbiAgICBvcHRpb25zPzogU2ltcGxlTW9kYWxPcHRpb25zT3ZlcnJpZGVzXG4gICk6IE9ic2VydmFibGU8VDE+IHtcbiAgICAvLyBjcmVhdGUgY29tcG9uZW50XG4gICAgaWYgKCF0aGlzLnZpZXdDb250YWluZXIpIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoU2ltcGxlTW9kYWxXcmFwcGVyQ29tcG9uZW50KTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgIGNvbnN0IG1vZGFsV3JhcHBlcjogU2ltcGxlTW9kYWxXcmFwcGVyQ29tcG9uZW50ID0gPFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudD4oXG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VcbiAgICApO1xuICAgIGNvbnN0IF9jb21wb25lbnQ6IFNpbXBsZU1vZGFsQ29tcG9uZW50PFQsIFQxPiA9IG1vZGFsV3JhcHBlci5hZGRDb21wb25lbnQoY29tcG9uZW50KTtcblxuICAgIC8vIGFzc2lnbiBvcHRpb25zIHJlZnNcbiAgICBfY29tcG9uZW50Lm9wdGlvbnMgPSBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25zLCBvcHRpb25zKTtcblxuICAgIC8vIHNldCBiYXNlIGNsYXNzZXMgZm9yIHdyYXBwZXJcbiAgICBtb2RhbFdyYXBwZXIubW9kYWxDbGFzc2VzID0gb3B0aW9ucy53cmFwcGVyRGVmYXVsdENsYXNzZXM7XG5cbiAgICAvLyBhZGQgdG8gc3RhY2tcbiAgICB0aGlzLm1vZGFscy5wdXNoKF9jb21wb25lbnQpO1xuXG4gICAgLy8gd2FpdCBhIHRpY2sgdGhlbiBzZXR1cCB0aGUgZm9sbG93aW5nIHdoaWxlIGFkZGluZyBhIG1vZGFsXG4gICAgdGhpcy53YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnRvZ2dsZVdyYXBwZXJDbGFzcyhtb2RhbFdyYXBwZXIud3JhcHBlciwgb3B0aW9ucy53cmFwcGVyQ2xhc3MpO1xuICAgICAgdGhpcy50b2dnbGVCb2R5Q2xhc3Mob3B0aW9ucy5ib2R5Q2xhc3MpO1xuICAgICAgdGhpcy53YWl0KG9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmF1dG9Gb2N1c0ZpcnN0RWxlbWVudChfY29tcG9uZW50LndyYXBwZXIsIG9wdGlvbnMuYXV0b0ZvY3VzKTtcbiAgICAgICAgX2NvbXBvbmVudC5tYXJrQXNSZWFkeSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyB3aGVuIGNsb3NpbmcgbW9kYWwgcmVtb3ZlIGl0XG4gICAgX2NvbXBvbmVudC5vbkNsb3NpbmcobW9kYWwgPT4gdGhpcy5yZW1vdmVNb2RhbChtb2RhbCkpO1xuXG4gICAgLy8gaWYgY2xpY2tpbmcgb24gYmFja2dyb3VuZCBjbG9zZXMgbW9kYWxcbiAgICB0aGlzLmNvbmZpZ3VyZUNsb3NlT25DbGlja091dHNpZGUobW9kYWxXcmFwcGVyKTtcblxuICAgIC8vIG1hcCBhbmQgcmV0dXJuIG9ic2VydmFibGVcbiAgICBfY29tcG9uZW50Lm1hcERhdGFPYmplY3QoZGF0YSk7XG5cbiAgICByZXR1cm4gX2NvbXBvbmVudC5zZXR1cE9ic2VydmVyKCk7XG4gIH1cblxuICAvKipcbiAgICogdHJpZ2dlcnMgY29tcG9uZW50cyBjbG9zZSBmdW5jdGlvblxuICAgKiB0byB0YWtlIGVmZmVjdFxuICAgKiBAcGFyYW0ge1NpbXBsZU1vZGFsQ29tcG9uZW50fSBjb21wb25lbnRcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICByZW1vdmVNb2RhbChjbG9zaW5nTW9kYWw6IFNpbXBsZU1vZGFsQ29tcG9uZW50PGFueSwgYW55Pik6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGNsb3NpbmdNb2RhbC5vcHRpb25zO1xuICAgIHRoaXMudG9nZ2xlV3JhcHBlckNsYXNzKGNsb3NpbmdNb2RhbC53cmFwcGVyLCBvcHRpb25zLndyYXBwZXJDbGFzcyk7XG4gICAgcmV0dXJuIHRoaXMud2FpdChvcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlTW9kYWxGcm9tQXJyYXkoY2xvc2luZ01vZGFsKTtcbiAgICAgIHRoaXMudG9nZ2xlQm9keUNsYXNzKG9wdGlvbnMuYm9keUNsYXNzKTtcbiAgICAgIHRoaXMucmVzdG9yZVByZXZpb3VzRm9jdXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0cnVjdHMgYWxsIG9wZW4gbW9kYWxzIHRvXG4gICAqL1xuICByZW1vdmVBbGxNb2RhbHMoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5tb2RhbHMubWFwKG1vZGFsID0+IHRoaXMucmVtb3ZlTW9kYWwobW9kYWwpKSk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIGJvZHkgY2xhc3MgJ21vZGFsLW9wZW4nIHRvIGEgY29uZGl0aW9uIG9mIG1vZGFscyBpbiBwb29sID4gMFxuICAgKiBAcGFyYW0gYm9keUNsYXNzIC0gc3RyaW5nIHRvIGFkZCBhbmQgcmVtb3ZlIGZyb20gYm9keSBpbiBkb2N1bWVudFxuICAgKi9cbiAgcHJpdmF0ZSB0b2dnbGVCb2R5Q2xhc3MoYm9keUNsYXNzOiBzdHJpbmcpIHtcbiAgICBpZiAoIWJvZHlDbGFzcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICBjb25zdCBib2R5Q2xhc3NJdGVtcyA9IGJvZHlDbGFzcy5zcGxpdCgnICcpO1xuICAgIGlmICghdGhpcy5tb2RhbHMubGVuZ3RoKSB7XG4gICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoLi4uYm9keUNsYXNzSXRlbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2R5LmNsYXNzTGlzdC5hZGQoLi4uYm9keUNsYXNzSXRlbXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBpZiB0aGUgb3B0aW9uIHRvIGNsb3NlIG9uIGJhY2tncm91bmQgY2xpY2sgaXMgc2V0LCB0aGVuIGhvb2sgdXAgYSBjYWxsYmFja1xuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiBAcGFyYW0gbW9kYWxXcmFwcGVyXG4gICAqL1xuICBwcml2YXRlIGNvbmZpZ3VyZUNsb3NlT25DbGlja091dHNpZGUobW9kYWxXcmFwcGVyOiBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnQpIHtcbiAgICBpZiAobW9kYWxXcmFwcGVyLmNvbnRlbnQub3B0aW9ucy5jbG9zZU9uQ2xpY2tPdXRzaWRlKSB7XG4gICAgICBtb2RhbFdyYXBwZXIub25DbGlja091dHNpZGVNb2RhbENvbnRlbnQoKCkgPT4ge1xuICAgICAgICBtb2RhbFdyYXBwZXIuY29udGVudC5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF1dG8gZm9jdXMgbyB0aGUgZmlyc3QgZWxlbWVudCBpZiBhdXRvZm9jdXMgaXMgb25cbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICogQHBhcmFtIG1vZGFsV3JhcHBlckVsXG4gICAqL1xuICBwcml2YXRlIGF1dG9Gb2N1c0ZpcnN0RWxlbWVudChjb21wb25lbnRXcmFwcGVyOiBFbGVtZW50UmVmLCBhdXRvRm9jdXM6IGJvb2xlYW4pIHtcbiAgICBpZiAoYXV0b0ZvY3VzKSB7XG4gICAgICBjb25zdCBmb2N1c2FibGUgPSBjb21wb25lbnRXcmFwcGVyLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgJ2J1dHRvbiwgW2hyZWZdLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJ1xuICAgICAgKTtcbiAgICAgIGlmIChmb2N1c2FibGUgJiYgZm9jdXNhYmxlLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGZvY3VzYWJsZVswXS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0b3JlcyB0aGUgbGFzdCBmb2N1cyBpcyB0aGVyZSB3YXMgb25lXG4gICAqL1xuICBwcml2YXRlIHJlc3RvcmVQcmV2aW91c0ZvY3VzKCkge1xuICAgIGlmICh0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlIHRoZSBhZGRpbmcgYW5kIHJlbW92YWwgb2YgYSB3cmFwcGVyIGNsYXNzIC0gcHJlZG9taW5hbnRseSBhbmltYXRpb24gZm9jdXNlZFxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiBAcGFyYW0gbW9kYWxXcmFwcGVyRWxcbiAgICovXG4gIHByaXZhdGUgdG9nZ2xlV3JhcHBlckNsYXNzKG1vZGFsV3JhcHBlckVsOiBFbGVtZW50UmVmLCB3cmFwcGVyQ2xhc3M6IHN0cmluZykge1xuICAgIGNvbnN0IHdyYXBwZXJDbGFzc0xpc3QgPSBtb2RhbFdyYXBwZXJFbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NJdGVtcyA9IHdyYXBwZXJDbGFzcy5zcGxpdCgnICcpO1xuICAgIGlmICh3cmFwcGVyQ2xhc3NMaXN0LnRvU3RyaW5nKCkuaW5kZXhPZih3cmFwcGVyQ2xhc3MpICE9PSAtMSkge1xuICAgICAgd3JhcHBlckNsYXNzTGlzdC5yZW1vdmUoLi4ud3JhcHBlckNsYXNzSXRlbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cmFwcGVyQ2xhc3NMaXN0LmFkZCguLi53cmFwcGVyQ2xhc3NJdGVtcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBmdW5jdGlvbiBmb3IgYSBtb3JlIHJlYWRhYmxlIHRpbWVvdXRcbiAgICogQHBhcmFtIG1zXG4gICAqL1xuICBwcml2YXRlIHdhaXQobXM6IG51bWJlciA9IDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiByZXNvbHZlKCksIG1zKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0cnVjdHMgdGhlIGhvbGRlciB0byByZW1vdmUgdGhlIG1vZGFsIGFuZFxuICAgKiByZW1vdmVzIHRoaXMgY29tcG9uZW50IGZyb20gdGhlIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIHtTaW1wbGVNb2RhbENvbXBvbmVudH0gY29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIHJlbW92ZU1vZGFsRnJvbUFycmF5KGNvbXBvbmVudCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tb2RhbHMuaW5kZXhPZihjb21wb25lbnQpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIucmVtb3ZlKGluZGV4KTtcbiAgICAgIHRoaXMubW9kYWxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG59XG4iXX0=