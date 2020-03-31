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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNpbXBsZS1tb2RhbC8iLCJzb3VyY2VzIjpbInNpbXBsZS1tb2RhbC9zaW1wbGUtbW9kYWwtd3JhcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLElBQUksRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCOztHQUVHO0FBU0g7SUE0QkU7OztPQUdHO0lBQ0gscUNBQW9CLFFBQWtDO1FBQWxDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBcEJ0RDs7V0FFRztRQUNILGlCQUFZLEdBQUcsaUJBQWlCLENBQUM7SUFpQndCLENBQUM7SUFFMUQ7Ozs7T0FJRztJQUNILGtEQUFZLEdBQVosVUFBb0IsU0FBNEM7UUFDOUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRSxJQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRixJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFnQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDcEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxnRUFBMEIsR0FBMUIsVUFBMkIsUUFBb0I7UUFDN0MsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFVBQUEsS0FBSztZQUM3QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFFO2dCQUM5QixRQUFRLEVBQUUsQ0FBQzthQUNkO1FBQ0wsQ0FBQyxDQUFDO1FBQ0YsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFL0MsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELGlEQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUMvQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7Z0JBdEM2Qix3QkFBd0I7O0lBNUJnQjtRQUFyRSxTQUFTLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztzRUFBZTtJQU1wRjtRQURDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztnRUFDckM7SUFWVCwyQkFBMkI7UUFSdkMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxRQUFRLEVBQUUsc0tBSVQ7U0FDRixDQUFDO09BQ1csMkJBQTJCLENBdUV2QztJQUFELGtDQUFDO0NBQUEsQUF2RUQsSUF1RUM7U0F2RVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgUmVmbGVjdGl2ZUluamVjdG9yLFxuICBUeXBlLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2ltcGxlTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3NpbXBsZS1tb2RhbC5jb21wb25lbnQnO1xuXG4vKipcbiAqIFRoZSBtb2RhbCBiYWNrZHJvcCB3cmFwcGluZyB3cmFwcGVyIHRvIHRoZSBtb2RhbFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzaW1wbGUtbW9kYWwtd3JhcHBlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjd3JhcHBlciBbbmdDbGFzc109XCJtb2RhbENsYXNzZXNcIiBbbmdTdHlsZV09XCJ7IGRpc3BsYXk6ICdibG9jaycgfVwiIHJvbGU9XCJkaWFsb2dcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjdmlld0NvbnRhaW5lcj48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGFyZ2V0IHZpZXdDb250YWluZXIgdG8gaW5zZXJ0IG1vZGFsIGNvbnRlbnQgY29tcG9uZW50XG4gICAqL1xuICBAVmlld0NoaWxkKCd2aWV3Q29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgdmlld0NvbnRhaW5lcjtcblxuICAvKipcbiAgICogTGluayB3cmFwcGVyIERPTSBlbGVtZW50XG4gICAqL1xuICBAVmlld0NoaWxkKCd3cmFwcGVyJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgd3JhcHBlcjogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogV3JhcHBlciBtb2RhbCBhbmQgZmFkZSBjbGFzc2VzXG4gICAqL1xuICBtb2RhbENsYXNzZXMgPSAnbW9kYWwgZmFkZS1hbmltJztcblxuICAvKipcbiAgICogRGlhbG9nIGNvbnRlbnQgY29tcG9uZXRcbiAgICogQHR5cGUge1NpbXBsZU1vZGFsQ29tcG9uZW50fVxuICAgKi9cbiAgY29udGVudDogU2ltcGxlTW9kYWxDb21wb25lbnQ8YW55LCBhbnk+O1xuXG4gIC8qKlxuICAgKiBDbGljayBvdXRzaWRlIGNhbGxiYWNrXG4gICAqL1xuICBjbGlja091dHNpZGVDYWxsYmFjazogKGV2ZW50KSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcn0gcmVzb2x2ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cblxuICAvKipcbiAgICogQWRkcyBjb250ZW50IG1vZGFsIGNvbXBvbmVudCB0byB3cmFwcGVyXG4gICAqIEBwYXJhbSB7VHlwZTxTaW1wbGVNb2RhbENvbXBvbmVudD59IGNvbXBvbmVudFxuICAgKiBAcmV0dXJuIHtTaW1wbGVNb2RhbENvbXBvbmVudH1cbiAgICovXG4gIGFkZENvbXBvbmVudDxULCBUMT4oY29tcG9uZW50OiBUeXBlPFNpbXBsZU1vZGFsQ29tcG9uZW50PFQsIFQxPj4pIHtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgIGNvbnN0IGluamVjdG9yID0gUmVmbGVjdGl2ZUluamVjdG9yLmZyb21SZXNvbHZlZFByb3ZpZGVycyhbXSwgdGhpcy52aWV3Q29udGFpbmVyLmluamVjdG9yKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZShpbmplY3Rvcik7XG4gICAgdGhpcy52aWV3Q29udGFpbmVyLmluc2VydChjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgIHRoaXMuY29udGVudCA9IDxTaW1wbGVNb2RhbENvbXBvbmVudDxULCBUMT4+Y29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIHRoaXMuY29udGVudC53cmFwcGVyID0gdGhpcy53cmFwcGVyO1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlcyB0aGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHlvdSBjbGljayBvbiBiYWNrZ3JvdW5kIG9mIGEgbW9kYWwgYnV0IG5vdCB0aGUgY29udGVudHNcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBvbkNsaWNrT3V0c2lkZU1vZGFsQ29udGVudChjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuY2xpY2tPdXRzaWRlQ2FsbGJhY2sgPSBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IGNvbnRhaW5lckVsKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBjb250YWluZXJFbCA9IHRoaXMud3JhcHBlci5uYXRpdmVFbGVtZW50O1xuXG4gICAgY29udGFpbmVyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrT3V0c2lkZUNhbGxiYWNrLCBmYWxzZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5jbGlja091dHNpZGVDYWxsYmFjaykge1xuICAgICAgY29uc3QgY29udGFpbmVyRWwgPSB0aGlzLndyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnRhaW5lckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja091dHNpZGVDYWxsYmFjaywgZmFsc2UpO1xuICAgICAgdGhpcy5jbGlja091dHNpZGVDYWxsYmFjayA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=