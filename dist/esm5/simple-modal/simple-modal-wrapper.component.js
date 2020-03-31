import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, ReflectiveInjector, Type, ViewChild, ViewContainerRef, } from '@angular/core';
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
    tslib_1.__decorate([
        ViewChild('viewContainer', { read: ViewContainerRef, static: true })
    ], SimpleModalWrapperComponent.prototype, "viewContainer", void 0);
    tslib_1.__decorate([
        ViewChild('wrapper', { read: ElementRef, static: true })
    ], SimpleModalWrapperComponent.prototype, "wrapper", void 0);
    SimpleModalWrapperComponent = tslib_1.__decorate([
        Component({
            selector: 'simple-modal-wrapper',
            template: "\n    <div #wrapper [ngClass]=\"modalClasses\" [ngStyle]=\"{ display: 'block' }\" role=\"dialog\">\n      <ng-template #viewContainer></ng-template>\n    </div>\n  "
        })
    ], SimpleModalWrapperComponent);
    return SimpleModalWrapperComponent;
}());
export { SimpleModalWrapperComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHppZmxvdy9uZ3gtc2ltcGxlLW1vZGFsLyIsInNvdXJjZXMiOlsic2ltcGxlLW1vZGFsL3NpbXBsZS1tb2RhbC13cmFwcGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsVUFBVSxFQUNWLFNBQVMsRUFDVCxrQkFBa0IsRUFDbEIsSUFBSSxFQUNKLFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFHdkI7O0dBRUc7QUFTSDtJQTRCRTs7O09BR0c7SUFDSCxxQ0FBb0IsUUFBa0M7UUFBbEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFwQnREOztXQUVHO1FBQ0gsaUJBQVksR0FBRyxpQkFBaUIsQ0FBQztJQWlCd0IsQ0FBQztJQUUxRDs7OztPQUlHO0lBQ0gsa0RBQVksR0FBWixVQUFvQixTQUE0QztRQUM5RCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLElBQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNGLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQWdDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDbEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILGdFQUEwQixHQUExQixVQUEyQixRQUFvQjtRQUM3QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsVUFBQSxLQUFLO1lBQzdCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7Z0JBQzlCLFFBQVEsRUFBRSxDQUFDO2FBQ2Q7UUFDTCxDQUFDLENBQUM7UUFDRixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUUvQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsaURBQVcsR0FBWDtRQUNFLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQy9DLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7SUFDSCxDQUFDOztnQkF0QzZCLHdCQUF3Qjs7SUE1QmdCO1FBQXJFLFNBQVMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3NFQUFlO0lBTXBGO1FBREMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2dFQUNyQztJQVZULDJCQUEyQjtRQVJ2QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFFBQVEsRUFBRSxzS0FJVDtTQUNGLENBQUM7T0FDVywyQkFBMkIsQ0F1RXZDO0lBQUQsa0NBQUM7Q0FBQSxBQXZFRCxJQXVFQztTQXZFWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBSZWZsZWN0aXZlSW5qZWN0b3IsXG4gIFR5cGUsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaW1wbGVNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLmNvbXBvbmVudCc7XG5cbi8qKlxuICogVGhlIG1vZGFsIGJhY2tkcm9wIHdyYXBwaW5nIHdyYXBwZXIgdG8gdGhlIG1vZGFsXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NpbXBsZS1tb2RhbC13cmFwcGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICN3cmFwcGVyIFtuZ0NsYXNzXT1cIm1vZGFsQ2xhc3Nlc1wiIFtuZ1N0eWxlXT1cInsgZGlzcGxheTogJ2Jsb2NrJyB9XCIgcm9sZT1cImRpYWxvZ1wiPlxuICAgICAgPG5nLXRlbXBsYXRlICN2aWV3Q29udGFpbmVyPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUYXJnZXQgdmlld0NvbnRhaW5lciB0byBpbnNlcnQgbW9kYWwgY29udGVudCBjb21wb25lbnRcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3ZpZXdDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSB2aWV3Q29udGFpbmVyO1xuXG4gIC8qKlxuICAgKiBMaW5rIHdyYXBwZXIgRE9NIGVsZW1lbnRcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3dyYXBwZXInLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICB3cmFwcGVyOiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1vZGFsIGFuZCBmYWRlIGNsYXNzZXNcbiAgICovXG4gIG1vZGFsQ2xhc3NlcyA9ICdtb2RhbCBmYWRlLWFuaW0nO1xuXG4gIC8qKlxuICAgKiBEaWFsb2cgY29udGVudCBjb21wb25ldFxuICAgKiBAdHlwZSB7U2ltcGxlTW9kYWxDb21wb25lbnR9XG4gICAqL1xuICBjb250ZW50OiBTaW1wbGVNb2RhbENvbXBvbmVudDxhbnksIGFueT47XG5cbiAgLyoqXG4gICAqIENsaWNrIG91dHNpZGUgY2FsbGJhY2tcbiAgICovXG4gIGNsaWNrT3V0c2lkZUNhbGxiYWNrOiAoZXZlbnQpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyfSByZXNvbHZlclxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7fVxuXG4gIC8qKlxuICAgKiBBZGRzIGNvbnRlbnQgbW9kYWwgY29tcG9uZW50IHRvIHdyYXBwZXJcbiAgICogQHBhcmFtIHtUeXBlPFNpbXBsZU1vZGFsQ29tcG9uZW50Pn0gY29tcG9uZW50XG4gICAqIEByZXR1cm4ge1NpbXBsZU1vZGFsQ29tcG9uZW50fVxuICAgKi9cbiAgYWRkQ29tcG9uZW50PFQsIFQxPihjb21wb25lbnQ6IFR5cGU8U2ltcGxlTW9kYWxDb21wb25lbnQ8VCwgVDE+Pikge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG4gICAgY29uc3QgaW5qZWN0b3IgPSBSZWZsZWN0aXZlSW5qZWN0b3IuZnJvbVJlc29sdmVkUHJvdmlkZXJzKFtdLCB0aGlzLnZpZXdDb250YWluZXIuaW5qZWN0b3IpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGZhY3RvcnkuY3JlYXRlKGluamVjdG9yKTtcbiAgICB0aGlzLnZpZXdDb250YWluZXIuaW5zZXJ0KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgdGhpcy5jb250ZW50ID0gPFNpbXBsZU1vZGFsQ29tcG9uZW50PFQsIFQxPj5jb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgdGhpcy5jb250ZW50LndyYXBwZXIgPSB0aGlzLndyYXBwZXI7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIHRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4geW91IGNsaWNrIG9uIGJhY2tncm91bmQgb2YgYSBtb2RhbCBidXQgbm90IHRoZSBjb250ZW50c1xuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xpY2tPdXRzaWRlTW9kYWxDb250ZW50KGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5jbGlja091dHNpZGVDYWxsYmFjayA9IGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gY29udGFpbmVyRWwpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGNvbnRhaW5lckVsID0gdGhpcy53cmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBjb250YWluZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tPdXRzaWRlQ2FsbGJhY2ssIGZhbHNlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmNsaWNrT3V0c2lkZUNhbGxiYWNrKSB7XG4gICAgICBjb25zdCBjb250YWluZXJFbCA9IHRoaXMud3JhcHBlci5uYXRpdmVFbGVtZW50O1xuICAgICAgY29udGFpbmVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrT3V0c2lkZUNhbGxiYWNrLCBmYWxzZSk7XG4gICAgICB0aGlzLmNsaWNrT3V0c2lkZUNhbGxiYWNrID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==