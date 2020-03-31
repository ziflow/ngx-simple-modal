import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, ReflectiveInjector, Type, ViewChild, ViewContainerRef, } from '@angular/core';
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
tslib_1.__decorate([
    ViewChild('viewContainer', { read: ViewContainerRef, static: true })
], SimpleModalWrapperComponent.prototype, "viewContainer", void 0);
tslib_1.__decorate([
    ViewChild('wrapper', { read: ElementRef, static: true })
], SimpleModalWrapperComponent.prototype, "wrapper", void 0);
SimpleModalWrapperComponent = tslib_1.__decorate([
    Component({
        selector: 'simple-modal-wrapper',
        template: `
    <div #wrapper [ngClass]="modalClasses" [ngStyle]="{ display: 'block' }" role="dialog">
      <ng-template #viewContainer></ng-template>
    </div>
  `
    })
], SimpleModalWrapperComponent);
export { SimpleModalWrapperComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHppZmxvdy9uZ3gtc2ltcGxlLW1vZGFsLyIsInNvdXJjZXMiOlsic2ltcGxlLW1vZGFsL3NpbXBsZS1tb2RhbC13cmFwcGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsVUFBVSxFQUNWLFNBQVMsRUFDVCxrQkFBa0IsRUFDbEIsSUFBSSxFQUNKLFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFHdkI7O0dBRUc7QUFTSCxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtJQTRCdEM7OztPQUdHO0lBQ0gsWUFBb0IsUUFBa0M7UUFBbEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFwQnREOztXQUVHO1FBQ0gsaUJBQVksR0FBRyxpQkFBaUIsQ0FBQztJQWlCd0IsQ0FBQztJQUUxRDs7OztPQUlHO0lBQ0gsWUFBWSxDQUFRLFNBQTRDO1FBQzlELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakUsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0YsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBZ0MsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUNsRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMEJBQTBCLENBQUMsUUFBb0I7UUFDN0MsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7Z0JBQzlCLFFBQVEsRUFBRSxDQUFDO2FBQ2Q7UUFDTCxDQUFDLENBQUM7UUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUUvQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQy9DLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUF2QytCLHdCQUF3Qjs7QUE1QmdCO0lBQXJFLFNBQVMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2tFQUFlO0FBTXBGO0lBREMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzREQUNyQztBQVZULDJCQUEyQjtJQVJ2QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFFBQVEsRUFBRTs7OztHQUlUO0tBQ0YsQ0FBQztHQUNXLDJCQUEyQixDQXVFdkM7U0F2RVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgUmVmbGVjdGl2ZUluamVjdG9yLFxuICBUeXBlLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2ltcGxlTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3NpbXBsZS1tb2RhbC5jb21wb25lbnQnO1xuXG4vKipcbiAqIFRoZSBtb2RhbCBiYWNrZHJvcCB3cmFwcGluZyB3cmFwcGVyIHRvIHRoZSBtb2RhbFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzaW1wbGUtbW9kYWwtd3JhcHBlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjd3JhcHBlciBbbmdDbGFzc109XCJtb2RhbENsYXNzZXNcIiBbbmdTdHlsZV09XCJ7IGRpc3BsYXk6ICdibG9jaycgfVwiIHJvbGU9XCJkaWFsb2dcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjdmlld0NvbnRhaW5lcj48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGFyZ2V0IHZpZXdDb250YWluZXIgdG8gaW5zZXJ0IG1vZGFsIGNvbnRlbnQgY29tcG9uZW50XG4gICAqL1xuICBAVmlld0NoaWxkKCd2aWV3Q29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgdmlld0NvbnRhaW5lcjtcblxuICAvKipcbiAgICogTGluayB3cmFwcGVyIERPTSBlbGVtZW50XG4gICAqL1xuICBAVmlld0NoaWxkKCd3cmFwcGVyJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgd3JhcHBlcjogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogV3JhcHBlciBtb2RhbCBhbmQgZmFkZSBjbGFzc2VzXG4gICAqL1xuICBtb2RhbENsYXNzZXMgPSAnbW9kYWwgZmFkZS1hbmltJztcblxuICAvKipcbiAgICogRGlhbG9nIGNvbnRlbnQgY29tcG9uZXRcbiAgICogQHR5cGUge1NpbXBsZU1vZGFsQ29tcG9uZW50fVxuICAgKi9cbiAgY29udGVudDogU2ltcGxlTW9kYWxDb21wb25lbnQ8YW55LCBhbnk+O1xuXG4gIC8qKlxuICAgKiBDbGljayBvdXRzaWRlIGNhbGxiYWNrXG4gICAqL1xuICBjbGlja091dHNpZGVDYWxsYmFjazogKGV2ZW50KSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcn0gcmVzb2x2ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cblxuICAvKipcbiAgICogQWRkcyBjb250ZW50IG1vZGFsIGNvbXBvbmVudCB0byB3cmFwcGVyXG4gICAqIEBwYXJhbSB7VHlwZTxTaW1wbGVNb2RhbENvbXBvbmVudD59IGNvbXBvbmVudFxuICAgKiBAcmV0dXJuIHtTaW1wbGVNb2RhbENvbXBvbmVudH1cbiAgICovXG4gIGFkZENvbXBvbmVudDxULCBUMT4oY29tcG9uZW50OiBUeXBlPFNpbXBsZU1vZGFsQ29tcG9uZW50PFQsIFQxPj4pIHtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgIGNvbnN0IGluamVjdG9yID0gUmVmbGVjdGl2ZUluamVjdG9yLmZyb21SZXNvbHZlZFByb3ZpZGVycyhbXSwgdGhpcy52aWV3Q29udGFpbmVyLmluamVjdG9yKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZShpbmplY3Rvcik7XG4gICAgdGhpcy52aWV3Q29udGFpbmVyLmluc2VydChjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgIHRoaXMuY29udGVudCA9IDxTaW1wbGVNb2RhbENvbXBvbmVudDxULCBUMT4+Y29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIHRoaXMuY29udGVudC53cmFwcGVyID0gdGhpcy53cmFwcGVyO1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlcyB0aGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHlvdSBjbGljayBvbiBiYWNrZ3JvdW5kIG9mIGEgbW9kYWwgYnV0IG5vdCB0aGUgY29udGVudHNcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBvbkNsaWNrT3V0c2lkZU1vZGFsQ29udGVudChjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuY2xpY2tPdXRzaWRlQ2FsbGJhY2sgPSBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IGNvbnRhaW5lckVsKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBjb250YWluZXJFbCA9IHRoaXMud3JhcHBlci5uYXRpdmVFbGVtZW50O1xuXG4gICAgY29udGFpbmVyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrT3V0c2lkZUNhbGxiYWNrLCBmYWxzZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5jbGlja091dHNpZGVDYWxsYmFjaykge1xuICAgICAgY29uc3QgY29udGFpbmVyRWwgPSB0aGlzLndyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnRhaW5lckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja091dHNpZGVDYWxsYmFjaywgZmFsc2UpO1xuICAgICAgdGhpcy5jbGlja091dHNpZGVDYWxsYmFjayA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=