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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNpbXBsZS1tb2RhbC8iLCJzb3VyY2VzIjpbInNpbXBsZS1tb2RhbC9zaW1wbGUtbW9kYWwtd3JhcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLElBQUksRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCOztHQUVHO0FBU0gsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUE0QnRDOzs7T0FHRztJQUNILFlBQW9CLFFBQWtDO1FBQWxDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBcEJ0RDs7V0FFRztRQUNILGlCQUFZLEdBQUcsaUJBQWlCLENBQUM7SUFpQndCLENBQUM7SUFFMUQ7Ozs7T0FJRztJQUNILFlBQVksQ0FBUSxTQUE0QztRQUM5RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNGLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQWdDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDbEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILDBCQUEwQixDQUFDLFFBQW9CO1FBQzdDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUMsRUFBRTtZQUNoQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFFO2dCQUM5QixRQUFRLEVBQUUsQ0FBQzthQUNkO1FBQ0wsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFL0MsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUMvQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBdkMrQix3QkFBd0I7O0FBNUJnQjtJQUFyRSxTQUFTLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztrRUFBZTtBQU1wRjtJQURDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzs0REFDckM7QUFWVCwyQkFBMkI7SUFSdkMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxRQUFRLEVBQUU7Ozs7R0FJVDtLQUNGLENBQUM7R0FDVywyQkFBMkIsQ0F1RXZDO1NBdkVZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIFJlZmxlY3RpdmVJbmplY3RvcixcbiAgVHlwZSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNpbXBsZU1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwuY29tcG9uZW50JztcblxuLyoqXG4gKiBUaGUgbW9kYWwgYmFja2Ryb3Agd3JhcHBpbmcgd3JhcHBlciB0byB0aGUgbW9kYWxcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2ltcGxlLW1vZGFsLXdyYXBwZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgI3dyYXBwZXIgW25nQ2xhc3NdPVwibW9kYWxDbGFzc2VzXCIgW25nU3R5bGVdPVwieyBkaXNwbGF5OiAnYmxvY2snIH1cIiByb2xlPVwiZGlhbG9nXCI+XG4gICAgICA8bmctdGVtcGxhdGUgI3ZpZXdDb250YWluZXI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlTW9kYWxXcmFwcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRhcmdldCB2aWV3Q29udGFpbmVyIHRvIGluc2VydCBtb2RhbCBjb250ZW50IGNvbXBvbmVudFxuICAgKi9cbiAgQFZpZXdDaGlsZCgndmlld0NvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIHZpZXdDb250YWluZXI7XG5cbiAgLyoqXG4gICAqIExpbmsgd3JhcHBlciBET00gZWxlbWVudFxuICAgKi9cbiAgQFZpZXdDaGlsZCgnd3JhcHBlcicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIHdyYXBwZXI6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbW9kYWwgYW5kIGZhZGUgY2xhc3Nlc1xuICAgKi9cbiAgbW9kYWxDbGFzc2VzID0gJ21vZGFsIGZhZGUtYW5pbSc7XG5cbiAgLyoqXG4gICAqIERpYWxvZyBjb250ZW50IGNvbXBvbmV0XG4gICAqIEB0eXBlIHtTaW1wbGVNb2RhbENvbXBvbmVudH1cbiAgICovXG4gIGNvbnRlbnQ6IFNpbXBsZU1vZGFsQ29tcG9uZW50PGFueSwgYW55PjtcblxuICAvKipcbiAgICogQ2xpY2sgb3V0c2lkZSBjYWxsYmFja1xuICAgKi9cbiAgY2xpY2tPdXRzaWRlQ2FsbGJhY2s6IChldmVudCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJ9IHJlc29sdmVyXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XG5cbiAgLyoqXG4gICAqIEFkZHMgY29udGVudCBtb2RhbCBjb21wb25lbnQgdG8gd3JhcHBlclxuICAgKiBAcGFyYW0ge1R5cGU8U2ltcGxlTW9kYWxDb21wb25lbnQ+fSBjb21wb25lbnRcbiAgICogQHJldHVybiB7U2ltcGxlTW9kYWxDb21wb25lbnR9XG4gICAqL1xuICBhZGRDb21wb25lbnQ8VCwgVDE+KGNvbXBvbmVudDogVHlwZTxTaW1wbGVNb2RhbENvbXBvbmVudDxULCBUMT4+KSB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICBjb25zdCBpbmplY3RvciA9IFJlZmxlY3RpdmVJbmplY3Rvci5mcm9tUmVzb2x2ZWRQcm92aWRlcnMoW10sIHRoaXMudmlld0NvbnRhaW5lci5pbmplY3Rvcik7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gZmFjdG9yeS5jcmVhdGUoaW5qZWN0b3IpO1xuICAgIHRoaXMudmlld0NvbnRhaW5lci5pbnNlcnQoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICB0aGlzLmNvbnRlbnQgPSA8U2ltcGxlTW9kYWxDb21wb25lbnQ8VCwgVDE+PmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB0aGlzLmNvbnRlbnQud3JhcHBlciA9IHRoaXMud3JhcHBlcjtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgdGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB5b3UgY2xpY2sgb24gYmFja2dyb3VuZCBvZiBhIG1vZGFsIGJ1dCBub3QgdGhlIGNvbnRlbnRzXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgb25DbGlja091dHNpZGVNb2RhbENvbnRlbnQoY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLmNsaWNrT3V0c2lkZUNhbGxiYWNrID0gZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBjb250YWluZXJFbCkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgY29udGFpbmVyRWwgPSB0aGlzLndyYXBwZXIubmF0aXZlRWxlbWVudDtcblxuICAgIGNvbnRhaW5lckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja091dHNpZGVDYWxsYmFjaywgZmFsc2UpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY2xpY2tPdXRzaWRlQ2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lckVsID0gdGhpcy53cmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb250YWluZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tPdXRzaWRlQ2FsbGJhY2ssIGZhbHNlKTtcbiAgICAgIHRoaXMuY2xpY2tPdXRzaWRlQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19