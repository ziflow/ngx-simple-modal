import * as tslib_1 from "tslib";
import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Optional, Type, } from '@angular/core';
import { SimpleModalHolderComponent } from './simple-modal-holder.component';
export class SimpleModalServiceConfig {
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
SimpleModalService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(3, Optional())
], SimpleModalService);
export { SimpleModalService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AemlmbG93L25neC1zaW1wbGUtbW9kYWwvIiwic291cmNlcyI6WyJzaW1wbGUtbW9kYWwvc2ltcGxlLW1vZGFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsd0JBQXdCLEVBQ3hCLGVBQWUsRUFDZixVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLEdBQ0wsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJN0UsTUFBTSxPQUFPLHdCQUF3QjtJQUFyQztRQUNFLGNBQVMsR0FBeUIsSUFBSSxDQUFDO0lBQ3pDLENBQUM7Q0FBQTtBQUdELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBYTdCOzs7OztPQUtHO0lBQ0gsWUFDVSxRQUFrQyxFQUNsQyxjQUE4QixFQUM5QixRQUFrQixFQUNkLE1BQWdDO1FBSHBDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRzFCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBZ0IsQ0FBQztTQUMxQztJQUNILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxRQUFRLENBQ04sU0FBNEMsRUFDNUMsSUFBUSxFQUNSLE9BQXFDO1FBRXJDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQzVEO1FBQ0QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFRLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsV0FBVyxDQUFDLFNBQXlDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDOUIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM5QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsSUFBWSxTQUFTLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBWSxTQUFTO1FBQ25CLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVEO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDaEUsTUFBTSwwQkFBMEIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxTQUFTLEdBQUksMEJBQTBCLENBQUMsUUFBaUM7aUJBQzNFLFNBQVMsQ0FBQyxDQUFDLENBQWdCLENBQUM7U0FDaEM7UUFFRCxXQUFXO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1RDtRQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssdUJBQXVCO1FBQzdCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRTNGLE1BQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsTUFBTSxpQkFBaUIsR0FBSSxZQUFZLENBQUMsUUFBaUM7YUFDdEUsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUUvQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU5QyxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFDL0IsQ0FBQztDQUNGLENBQUE7O1lBckdxQix3QkFBd0I7WUFDbEIsY0FBYztZQUNwQixRQUFRO1lBQ04sd0JBQXdCLHVCQUEzQyxRQUFROztBQXZCQSxrQkFBa0I7SUFEOUIsVUFBVSxFQUFFO0lBd0JSLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0dBdkJGLGtCQUFrQixDQXlIOUI7U0F6SFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgT3B0aW9uYWwsXG4gIFR5cGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBTaW1wbGVNb2RhbEhvbGRlckNvbXBvbmVudCB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLWhvbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2ltcGxlTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3NpbXBsZS1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2ltcGxlTW9kYWxPcHRpb25zT3ZlcnJpZGVzIH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwtb3B0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVNb2RhbFNlcnZpY2VDb25maWcge1xuICBjb250YWluZXI6IEhUTUxFbGVtZW50IHwgc3RyaW5nID0gbnVsbDtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNpbXBsZU1vZGFsU2VydmljZSB7XG4gIC8qKlxuICAgKiBQbGFjZWhvbGRlciBvZiBtb2RhbHNcbiAgICogQHR5cGUge1NpbXBsZU1vZGFsSG9sZGVyQ29tcG9uZW50fVxuICAgKi9cbiAgcHJpdmF0ZSBtb2RhbEhvbGRlckNvbXBvbmVudDogU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIEhUTUwgY29udGFpbmVyIGZvciBtb2RhbHNcbiAgICogdHlwZSB7SFRNTEVsZW1lbnQgfCBzdHJpbmd9XG4gICAqL1xuICBwcml2YXRlIF9jb250YWluZXI7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyfSByZXNvbHZlclxuICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9uUmVmfSBhcHBsaWNhdGlvblJlZlxuICAgKiBAcGFyYW0ge0luamVjdG9yfSBpbmplY3RvclxuICAgKiBAcGFyYW0ge1NpbXBsZU1vZGFsU2VydmljZUNvbmZpZ30gY29uZmlnXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgQE9wdGlvbmFsKCkgY29uZmlnOiBTaW1wbGVNb2RhbFNlcnZpY2VDb25maWdcbiAgKSB7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgdGhpcy5jb250YWluZXIgPSBjb25maWcuY29udGFpbmVyIGFzIGFueTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBtb2RhbFxuICAgKiBAcGFyYW0ge1R5cGU8U2ltcGxlTW9kYWxDb21wb25lbnQ8VCwgVDE+Pn0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7VD99IGRhdGFcbiAgICogQHBhcmFtIHtTaW1wbGVNb2RhbE9wdGlvbnNPdmVycmlkZXM/fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VDE+fVxuICAgKi9cbiAgYWRkTW9kYWw8VCwgVDE+KFxuICAgIGNvbXBvbmVudDogVHlwZTxTaW1wbGVNb2RhbENvbXBvbmVudDxULCBUMT4+LFxuICAgIGRhdGE/OiBULFxuICAgIG9wdGlvbnM/OiBTaW1wbGVNb2RhbE9wdGlvbnNPdmVycmlkZXNcbiAgKTogT2JzZXJ2YWJsZTxUMT4ge1xuICAgIGlmICghdGhpcy5tb2RhbEhvbGRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5tb2RhbEhvbGRlckNvbXBvbmVudCA9IHRoaXMuY3JlYXRlU2ltcGxlTW9kYWxIb2xkZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubW9kYWxIb2xkZXJDb21wb25lbnQuYWRkTW9kYWw8VCwgVDE+KGNvbXBvbmVudCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgYW5kIHJlbW92ZXMgbW9kYWwgZnJvbSBET00sIHJlc29sdmVzIHByb21pc2Ugd2hlbiBmdWxseSByZW1vdmVkXG4gICAqIEBwYXJhbSB7U2ltcGxlTW9kYWxDb21wb25lbnR9IGNvbXBvbmVudFxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHt9Pn1cblxuICAgKi9cbiAgcmVtb3ZlTW9kYWwoY29tcG9uZW50OiBTaW1wbGVNb2RhbENvbXBvbmVudDxhbnksIGFueT4pOiBQcm9taXNlPHt9PiB7XG4gICAgaWYgKCF0aGlzLm1vZGFsSG9sZGVyQ29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubW9kYWxIb2xkZXJDb21wb25lbnQucmVtb3ZlTW9kYWwoY29tcG9uZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgYWxsIG1vZGFscywgcmVzb2x2ZXMgcHJvbWlzZSB3aGVuIHRoZXkncmUgZnVsbHkgcmVtb3ZlZFxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHt9Pn1cbiAgICovXG4gIHJlbW92ZUFsbCgpOiBQcm9taXNlPHt9PiB7XG4gICAgaWYgKCF0aGlzLm1vZGFsSG9sZGVyQ29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubW9kYWxIb2xkZXJDb21wb25lbnQucmVtb3ZlQWxsTW9kYWxzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXNzb3IgZm9yIGNvbnRhaW4gLSB3aWxsIGF1dG8gZ2VuZXJhdGUgZnJvbSBzdHJpbmdcbiAgICogaWYgbmVlZGVkIG9yIGRlZmF1bHQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBub3RoaW5nIHdhcyBzZXRcbiAgICovXG5cbiAgcHJpdmF0ZSBzZXQgY29udGFpbmVyKGMpIHtcbiAgICB0aGlzLl9jb250YWluZXIgPSBjO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX2NvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuX2NvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jb250YWluZXIgJiYgdGhpcy5hcHBsaWNhdGlvblJlZlsnY29tcG9uZW50cyddLmxlbmd0aCkge1xuICAgICAgY29uc3QgY29tcG9uZW50Um9vdFZpZXdDb250YWluZXIgPSB0aGlzLmFwcGxpY2F0aW9uUmVmWydjb21wb25lbnRzJ11bMF07XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IChjb21wb25lbnRSb290Vmlld0NvbnRhaW5lci5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PilcbiAgICAgICAgLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyBmYWxsYmFja1xuICAgIGlmICghdGhpcy5fY29udGFpbmVyIHx8IHR5cGVvZiB0aGlzLl9jb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9jb250YWluZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbmQgYWRkIHRvIERPTSBtb2RhbCBob2xkZXIgY29tcG9uZW50XG4gICAqIEByZXR1cm4ge1NpbXBsZU1vZGFsSG9sZGVyQ29tcG9uZW50fVxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVTaW1wbGVNb2RhbEhvbGRlcigpOiBTaW1wbGVNb2RhbEhvbGRlckNvbXBvbmVudCB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQpO1xuXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gY29tcG9uZW50RmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgY29uc3QgY29tcG9uZW50Um9vdE5vZGUgPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KVxuICAgICAgLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHRoaXMuYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgY29tcG9uZW50UmVmLm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmRldGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICB9KTtcblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXBvbmVudFJvb3ROb2RlKTtcblxuICAgIHJldHVybiBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gIH1cbn1cbiJdfQ==