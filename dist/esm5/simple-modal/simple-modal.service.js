import * as tslib_1 from "tslib";
import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Optional, Type, } from '@angular/core';
import { SimpleModalHolderComponent } from './simple-modal-holder.component';
var SimpleModalServiceConfig = /** @class */ (function () {
    function SimpleModalServiceConfig() {
        this.container = null;
    }
    return SimpleModalServiceConfig;
}());
export { SimpleModalServiceConfig };
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
    SimpleModalService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(3, Optional())
    ], SimpleModalService);
    return SimpleModalService;
}());
export { SimpleModalService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AemlmbG93L25neC1zaW1wbGUtbW9kYWwvIiwic291cmNlcyI6WyJzaW1wbGUtbW9kYWwvc2ltcGxlLW1vZGFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsd0JBQXdCLEVBQ3hCLGVBQWUsRUFDZixVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLEdBQ0wsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJN0U7SUFBQTtRQUNFLGNBQVMsR0FBeUIsSUFBSSxDQUFDO0lBQ3pDLENBQUM7SUFBRCwrQkFBQztBQUFELENBQUMsQUFGRCxJQUVDOztBQUdEO0lBYUU7Ozs7O09BS0c7SUFDSCw0QkFDVSxRQUFrQyxFQUNsQyxjQUE4QixFQUM5QixRQUFrQixFQUNkLE1BQWdDO1FBSHBDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRzFCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBZ0IsQ0FBQztTQUMxQztJQUNILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxxQ0FBUSxHQUFSLFVBQ0UsU0FBNEMsRUFDNUMsSUFBUSxFQUNSLE9BQXFDO1FBRXJDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQzVEO1FBQ0QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFRLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsd0NBQVcsR0FBWCxVQUFZLFNBQXlDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDOUIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7O09BR0c7SUFDSCxzQ0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM5QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBT0Qsc0JBQVkseUNBQVM7YUFJckI7WUFDRSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDNUQ7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDaEUsSUFBTSwwQkFBMEIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsU0FBUyxHQUFJLDBCQUEwQixDQUFDLFFBQWlDO3FCQUMzRSxTQUFTLENBQUMsQ0FBQyxDQUFnQixDQUFDO2FBQ2hDO1lBRUQsV0FBVztZQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7UUExQkQ7OztXQUdHO2FBRUgsVUFBc0IsQ0FBQztZQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQXFCRDs7O09BR0c7SUFDSyxvREFBdUIsR0FBL0I7UUFBQSxpQkFnQkM7UUFmQyxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUUzRixJQUFNLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELElBQU0saUJBQWlCLEdBQUksWUFBWSxDQUFDLFFBQWlDO2FBQ3RFLFNBQVMsQ0FBQyxDQUFDLENBQWdCLENBQUM7UUFFL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRELFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDckIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU5QyxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFDL0IsQ0FBQzs7Z0JBcEdtQix3QkFBd0I7Z0JBQ2xCLGNBQWM7Z0JBQ3BCLFFBQVE7Z0JBQ04sd0JBQXdCLHVCQUEzQyxRQUFROztJQXZCQSxrQkFBa0I7UUFEOUIsVUFBVSxFQUFFO1FBd0JSLG1CQUFBLFFBQVEsRUFBRSxDQUFBO09BdkJGLGtCQUFrQixDQXlIOUI7SUFBRCx5QkFBQztDQUFBLEFBekhELElBeUhDO1NBekhZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIE9wdGlvbmFsLFxuICBUeXBlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQgfSBmcm9tICcuL3NpbXBsZS1tb2RhbC1ob2xkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNpbXBsZU1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNpbXBsZU1vZGFsT3B0aW9uc092ZXJyaWRlcyB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLW9wdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgU2ltcGxlTW9kYWxTZXJ2aWNlQ29uZmlnIHtcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCB8IHN0cmluZyA9IG51bGw7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaW1wbGVNb2RhbFNlcnZpY2Uge1xuICAvKipcbiAgICogUGxhY2Vob2xkZXIgb2YgbW9kYWxzXG4gICAqIEB0eXBlIHtTaW1wbGVNb2RhbEhvbGRlckNvbXBvbmVudH1cbiAgICovXG4gIHByaXZhdGUgbW9kYWxIb2xkZXJDb21wb25lbnQ6IFNpbXBsZU1vZGFsSG9sZGVyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBIVE1MIGNvbnRhaW5lciBmb3IgbW9kYWxzXG4gICAqIHR5cGUge0hUTUxFbGVtZW50IHwgc3RyaW5nfVxuICAgKi9cbiAgcHJpdmF0ZSBfY29udGFpbmVyO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcn0gcmVzb2x2ZXJcbiAgICogQHBhcmFtIHtBcHBsaWNhdGlvblJlZn0gYXBwbGljYXRpb25SZWZcbiAgICogQHBhcmFtIHtJbmplY3Rvcn0gaW5qZWN0b3JcbiAgICogQHBhcmFtIHtTaW1wbGVNb2RhbFNlcnZpY2VDb25maWd9IGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIEBPcHRpb25hbCgpIGNvbmZpZzogU2ltcGxlTW9kYWxTZXJ2aWNlQ29uZmlnXG4gICkge1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lciBhcyBhbnk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbW9kYWxcbiAgICogQHBhcmFtIHtUeXBlPFNpbXBsZU1vZGFsQ29tcG9uZW50PFQsIFQxPj59IGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge1Q/fSBkYXRhXG4gICAqIEBwYXJhbSB7U2ltcGxlTW9kYWxPcHRpb25zT3ZlcnJpZGVzP30gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQxPn1cbiAgICovXG4gIGFkZE1vZGFsPFQsIFQxPihcbiAgICBjb21wb25lbnQ6IFR5cGU8U2ltcGxlTW9kYWxDb21wb25lbnQ8VCwgVDE+PixcbiAgICBkYXRhPzogVCxcbiAgICBvcHRpb25zPzogU2ltcGxlTW9kYWxPcHRpb25zT3ZlcnJpZGVzXG4gICk6IE9ic2VydmFibGU8VDE+IHtcbiAgICBpZiAoIXRoaXMubW9kYWxIb2xkZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMubW9kYWxIb2xkZXJDb21wb25lbnQgPSB0aGlzLmNyZWF0ZVNpbXBsZU1vZGFsSG9sZGVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm1vZGFsSG9sZGVyQ29tcG9uZW50LmFkZE1vZGFsPFQsIFQxPihjb21wb25lbnQsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIGFuZCByZW1vdmVzIG1vZGFsIGZyb20gRE9NLCByZXNvbHZlcyBwcm9taXNlIHdoZW4gZnVsbHkgcmVtb3ZlZFxuICAgKiBAcGFyYW0ge1NpbXBsZU1vZGFsQ29tcG9uZW50fSBjb21wb25lbnRcbiAgICogQHJldHVybiB7UHJvbWlzZTx7fT59XG5cbiAgICovXG4gIHJlbW92ZU1vZGFsKGNvbXBvbmVudDogU2ltcGxlTW9kYWxDb21wb25lbnQ8YW55LCBhbnk+KTogUHJvbWlzZTx7fT4ge1xuICAgIGlmICghdGhpcy5tb2RhbEhvbGRlckNvbXBvbmVudCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7fSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm1vZGFsSG9sZGVyQ29tcG9uZW50LnJlbW92ZU1vZGFsKGNvbXBvbmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIGFsbCBtb2RhbHMsIHJlc29sdmVzIHByb21pc2Ugd2hlbiB0aGV5J3JlIGZ1bGx5IHJlbW92ZWRcbiAgICogQHJldHVybiB7UHJvbWlzZTx7fT59XG4gICAqL1xuICByZW1vdmVBbGwoKTogUHJvbWlzZTx7fT4ge1xuICAgIGlmICghdGhpcy5tb2RhbEhvbGRlckNvbXBvbmVudCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7fSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm1vZGFsSG9sZGVyQ29tcG9uZW50LnJlbW92ZUFsbE1vZGFscygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2Vzc29yIGZvciBjb250YWluIC0gd2lsbCBhdXRvIGdlbmVyYXRlIGZyb20gc3RyaW5nXG4gICAqIGlmIG5lZWRlZCBvciBkZWZhdWx0IHRvIHRoZSByb290IGVsZW1lbnQgaWYgbm90aGluZyB3YXMgc2V0XG4gICAqL1xuXG4gIHByaXZhdGUgc2V0IGNvbnRhaW5lcihjKSB7XG4gICAgdGhpcy5fY29udGFpbmVyID0gYztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9jb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9jb250YWluZXIpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY29udGFpbmVyICYmIHRoaXMuYXBwbGljYXRpb25SZWZbJ2NvbXBvbmVudHMnXS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJvb3RWaWV3Q29udGFpbmVyID0gdGhpcy5hcHBsaWNhdGlvblJlZlsnY29tcG9uZW50cyddWzBdO1xuICAgICAgdGhpcy5jb250YWluZXIgPSAoY29tcG9uZW50Um9vdFZpZXdDb250YWluZXIuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pXG4gICAgICAgIC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gZmFsbGJhY2tcbiAgICBpZiAoIXRoaXMuX2NvbnRhaW5lciB8fCB0eXBlb2YgdGhpcy5fY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIGFkZCB0byBET00gbW9kYWwgaG9sZGVyIGNvbXBvbmVudFxuICAgKiBAcmV0dXJuIHtTaW1wbGVNb2RhbEhvbGRlckNvbXBvbmVudH1cbiAgICovXG4gIHByaXZhdGUgY3JlYXRlU2ltcGxlTW9kYWxIb2xkZXIoKTogU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFNpbXBsZU1vZGFsSG9sZGVyQ29tcG9uZW50KTtcblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJvb3ROb2RlID0gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PilcbiAgICAgIC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgIGNvbXBvbmVudFJlZi5vbkRlc3Ryb3koKCkgPT4ge1xuICAgICAgdGhpcy5hcHBsaWNhdGlvblJlZi5kZXRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wb25lbnRSb290Tm9kZSk7XG5cbiAgICByZXR1cm4gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICB9XG59XG4iXX0=