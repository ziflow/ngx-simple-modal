import * as tslib_1 from "tslib";
var SimpleModalModule_1;
import { CommonModule } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Injector, NgModule, } from '@angular/core';
import { SimpleModalHolderComponent } from './simple-modal-holder.component';
import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';
import { SimpleModalService, SimpleModalServiceConfig } from './simple-modal.service';
import { SimpleModalServiceFactory } from './simple-modal-service.factory';
import { defaultSimpleModalOptions, DefaultSimpleModalOptionConfig, } from './simple-modal-options';
const ɵ0 = defaultSimpleModalOptions;
let SimpleModalModule = SimpleModalModule_1 = class SimpleModalModule {
    constructor() { }
    static forRoot(config, defaultModalOptions) {
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
    }
};
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
export { SimpleModalModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zaW1wbGUtbW9kYWwvIiwic291cmNlcyI6WyJzaW1wbGUtbW9kYWwvc2ltcGxlLW1vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsY0FBYyxFQUNkLHdCQUF3QixFQUN4QixRQUFRLEVBRVIsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsOEJBQThCLEdBRS9CLE1BQU0sd0JBQXdCLENBQUM7V0FRaEIseUJBQXlCO0FBTXpDLElBQWEsaUJBQWlCLHlCQUE5QixNQUFhLGlCQUFpQjtJQXNCNUIsZ0JBQWUsQ0FBQztJQXJCaEIsTUFBTSxDQUFDLE9BQU8sQ0FDWixNQUFnQyxFQUNoQyxtQkFBd0M7UUFFeEMsT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQ3ZEO29CQUNFLE9BQU8sRUFBRSxrQkFBa0I7b0JBQzNCLFVBQVUsRUFBRSx5QkFBeUI7b0JBQ3JDLElBQUksRUFBRSxDQUFDLHdCQUF3QixFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLENBQUM7aUJBQ3JGO2dCQUNEO29CQUNFLE9BQU8sRUFBRSw4QkFBOEI7b0JBQ3ZDLFFBQVEsRUFBRSxtQkFBbUIsSUFBSSx5QkFBeUI7aUJBQzNEO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUdGLENBQUE7QUF2QlksaUJBQWlCO0lBWjdCLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRSxDQUFDLDBCQUEwQixFQUFFLDJCQUEyQixDQUFDO1FBQ3ZFLFNBQVMsRUFBRTtZQUNULGtCQUFrQjtZQUNsQjtnQkFDRSxPQUFPLEVBQUUsOEJBQThCO2dCQUN2QyxRQUFRLElBQTJCO2FBQ3BDO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsZUFBZSxFQUFFLENBQUMsMEJBQTBCLEVBQUUsMkJBQTJCLENBQUM7S0FDM0UsQ0FBQztHQUNXLGlCQUFpQixDQXVCN0I7U0F2QlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEluamVjdG9yLFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBOZ01vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNpbXBsZU1vZGFsSG9sZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwtaG9sZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3NpbXBsZS1tb2RhbC13cmFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW1wbGVNb2RhbFNlcnZpY2UsIFNpbXBsZU1vZGFsU2VydmljZUNvbmZpZyB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2ltcGxlTW9kYWxTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLXNlcnZpY2UuZmFjdG9yeSc7XG5pbXBvcnQge1xuICBkZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25zLFxuICBEZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25Db25maWcsXG4gIFNpbXBsZU1vZGFsT3B0aW9ucyxcbn0gZnJvbSAnLi9zaW1wbGUtbW9kYWwtb3B0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1NpbXBsZU1vZGFsSG9sZGVyQ29tcG9uZW50LCBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTaW1wbGVNb2RhbFNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogRGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9uQ29uZmlnLFxuICAgICAgdXNlVmFsdWU6IGRlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbnMsXG4gICAgfSxcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW1NpbXBsZU1vZGFsSG9sZGVyQ29tcG9uZW50LCBTaW1wbGVNb2RhbFdyYXBwZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVNb2RhbE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIGNvbmZpZzogU2ltcGxlTW9kYWxTZXJ2aWNlQ29uZmlnLFxuICAgIGRlZmF1bHRNb2RhbE9wdGlvbnM/OiBTaW1wbGVNb2RhbE9wdGlvbnNcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTaW1wbGVNb2RhbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFNpbXBsZU1vZGFsU2VydmljZUNvbmZpZywgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU2ltcGxlTW9kYWxTZXJ2aWNlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IFNpbXBsZU1vZGFsU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQXBwbGljYXRpb25SZWYsIEluamVjdG9yLCBTaW1wbGVNb2RhbFNlcnZpY2VDb25maWddLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9uQ29uZmlnLFxuICAgICAgICAgIHVzZVZhbHVlOiBkZWZhdWx0TW9kYWxPcHRpb25zIHx8IGRlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHt9XG59XG4iXX0=