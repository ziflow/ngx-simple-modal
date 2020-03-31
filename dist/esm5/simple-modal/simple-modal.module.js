import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Injector, NgModule, } from '@angular/core';
import { SimpleModalHolderComponent } from './simple-modal-holder.component';
import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';
import { SimpleModalService, SimpleModalServiceConfig } from './simple-modal.service';
import { SimpleModalServiceFactory } from './simple-modal-service.factory';
import { defaultSimpleModalOptions, DefaultSimpleModalOptionConfig, } from './simple-modal-options';
var ɵ0 = defaultSimpleModalOptions;
var SimpleModalModule = /** @class */ (function () {
    function SimpleModalModule() {
    }
    SimpleModalModule_1 = SimpleModalModule;
    SimpleModalModule.forRoot = function (config, defaultModalOptions) {
        return {
            ngModule: SimpleModalModule_1,
            providers: [
                { provide: SimpleModalServiceConfig, useValue: config },
                {
                    provide: SimpleModalService,
                    useFactory: SimpleModalServiceFactory,
                    deps: [ComponentFactoryResolver, ApplicationRef, Injector, SimpleModalServiceConfig],
                },
                {
                    provide: DefaultSimpleModalOptionConfig,
                    useValue: defaultModalOptions || defaultSimpleModalOptions,
                },
            ],
        };
    };
    var SimpleModalModule_1;
    SimpleModalModule = SimpleModalModule_1 = tslib_1.__decorate([
        NgModule({
            declarations: [SimpleModalHolderComponent, SimpleModalWrapperComponent],
            providers: [
                SimpleModalService,
                {
                    provide: DefaultSimpleModalOptionConfig,
                    useValue: ɵ0,
                },
            ],
            imports: [CommonModule],
            entryComponents: [SimpleModalHolderComponent, SimpleModalWrapperComponent],
        })
    ], SimpleModalModule);
    return SimpleModalModule;
}());
export { SimpleModalModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zaW1wbGUtbW9kYWwvIiwic291cmNlcyI6WyJzaW1wbGUtbW9kYWwvc2ltcGxlLW1vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsd0JBQXdCLEVBQ3hCLFFBQVEsRUFFUixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUNMLHlCQUF5QixFQUN6Qiw4QkFBOEIsR0FFL0IsTUFBTSx3QkFBd0IsQ0FBQztTQVFoQix5QkFBeUI7QUFNekM7SUFzQkU7SUFBZSxDQUFDOzBCQXRCTCxpQkFBaUI7SUFDckIseUJBQU8sR0FBZCxVQUNFLE1BQWdDLEVBQ2hDLG1CQUF3QztRQUV4QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLG1CQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtnQkFDdkQ7b0JBQ0UsT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsVUFBVSxFQUFFLHlCQUF5QjtvQkFDckMsSUFBSSxFQUFFLENBQUMsd0JBQXdCLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsQ0FBQztpQkFDckY7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLDhCQUE4QjtvQkFDdkMsUUFBUSxFQUFFLG1CQUFtQixJQUFJLHlCQUF5QjtpQkFDM0Q7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztJQXBCVSxpQkFBaUI7UUFaN0IsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsMEJBQTBCLEVBQUUsMkJBQTJCLENBQUM7WUFDdkUsU0FBUyxFQUFFO2dCQUNULGtCQUFrQjtnQkFDbEI7b0JBQ0UsT0FBTyxFQUFFLDhCQUE4QjtvQkFDdkMsUUFBUSxJQUEyQjtpQkFDcEM7YUFDRjtZQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixlQUFlLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSwyQkFBMkIsQ0FBQztTQUMzRSxDQUFDO09BQ1csaUJBQWlCLENBdUI3QjtJQUFELHdCQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0F2QlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEluamVjdG9yLFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBOZ01vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNpbXBsZU1vZGFsSG9sZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwtaG9sZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3NpbXBsZS1tb2RhbC13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW1wbGVNb2RhbFNlcnZpY2UsIFNpbXBsZU1vZGFsU2VydmljZUNvbmZpZyB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2ltcGxlTW9kYWxTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLXNlcnZpY2UuZmFjdG9yeSc7XG5pbXBvcnQge1xuICBkZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25zLFxuICBEZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25Db25maWcsXG4gIFNpbXBsZU1vZGFsT3B0aW9ucyxcbn0gZnJvbSAnLi9zaW1wbGUtbW9kYWwtb3B0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1NpbXBsZU1vZGFsSG9sZGVyQ29tcG9uZW50LCBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTaW1wbGVNb2RhbFNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogRGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9uQ29uZmlnLFxuICAgICAgdXNlVmFsdWU6IGRlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbnMsXG4gICAgfSxcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW1NpbXBsZU1vZGFsSG9sZGVyQ29tcG9uZW50LCBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVNb2RhbE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIGNvbmZpZzogU2ltcGxlTW9kYWxTZXJ2aWNlQ29uZmlnLFxuICAgIGRlZmF1bHRNb2RhbE9wdGlvbnM/OiBTaW1wbGVNb2RhbE9wdGlvbnNcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTaW1wbGVNb2RhbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFNpbXBsZU1vZGFsU2VydmljZUNvbmZpZywgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU2ltcGxlTW9kYWxTZXJ2aWNlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IFNpbXBsZU1vZGFsU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQXBwbGljYXRpb25SZWYsIEluamVjdG9yLCBTaW1wbGVNb2RhbFNlcnZpY2VDb25maWddLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9uQ29uZmlnLFxuICAgICAgICAgIHVzZVZhbHVlOiBkZWZhdWx0TW9kYWxPcHRpb25zIHx8IGRlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHt9XG59XG4iXX0=