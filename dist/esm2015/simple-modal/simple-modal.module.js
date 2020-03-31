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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B6aWZsb3cvbmd4LXNpbXBsZS1tb2RhbC8iLCJzb3VyY2VzIjpbInNpbXBsZS1tb2RhbC9zaW1wbGUtbW9kYWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsd0JBQXdCLEVBQ3hCLFFBQVEsRUFFUixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUNMLHlCQUF5QixFQUN6Qiw4QkFBOEIsR0FFL0IsTUFBTSx3QkFBd0IsQ0FBQztXQVFoQix5QkFBeUI7QUFNekMsSUFBYSxpQkFBaUIseUJBQTlCLE1BQWEsaUJBQWlCO0lBc0I1QixnQkFBZSxDQUFDO0lBckJoQixNQUFNLENBQUMsT0FBTyxDQUNaLE1BQWdDLEVBQ2hDLG1CQUF3QztRQUV4QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLG1CQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtnQkFDdkQ7b0JBQ0UsT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsVUFBVSxFQUFFLHlCQUF5QjtvQkFDckMsSUFBSSxFQUFFLENBQUMsd0JBQXdCLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsQ0FBQztpQkFDckY7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLDhCQUE4QjtvQkFDdkMsUUFBUSxFQUFFLG1CQUFtQixJQUFJLHlCQUF5QjtpQkFDM0Q7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0NBR0YsQ0FBQTtBQXZCWSxpQkFBaUI7SUFaN0IsUUFBUSxDQUFDO1FBQ1IsWUFBWSxFQUFFLENBQUMsMEJBQTBCLEVBQUUsMkJBQTJCLENBQUM7UUFDdkUsU0FBUyxFQUFFO1lBQ1Qsa0JBQWtCO1lBQ2xCO2dCQUNFLE9BQU8sRUFBRSw4QkFBOEI7Z0JBQ3ZDLFFBQVEsSUFBMkI7YUFDcEM7U0FDRjtRQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixlQUFlLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSwyQkFBMkIsQ0FBQztLQUMzRSxDQUFDO0dBQ1csaUJBQWlCLENBdUI3QjtTQXZCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgSW5qZWN0b3IsXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE5nTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQgfSBmcm9tICcuL3NpbXBsZS1tb2RhbC1ob2xkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNpbXBsZU1vZGFsU2VydmljZSwgU2ltcGxlTW9kYWxTZXJ2aWNlQ29uZmlnIH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBTaW1wbGVNb2RhbFNlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwtc2VydmljZS5mYWN0b3J5JztcbmltcG9ydCB7XG4gIGRlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbnMsXG4gIERlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbkNvbmZpZyxcbiAgU2ltcGxlTW9kYWxPcHRpb25zLFxufSBmcm9tICcuL3NpbXBsZS1tb2RhbC1vcHRpb25zJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQsIFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNpbXBsZU1vZGFsU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBEZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25Db25maWcsXG4gICAgICB1c2VWYWx1ZTogZGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9ucyxcbiAgICB9LFxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQsIFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFNpbXBsZU1vZGFsTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgY29uZmlnOiBTaW1wbGVNb2RhbFNlcnZpY2VDb25maWcsXG4gICAgZGVmYXVsdE1vZGFsT3B0aW9ucz86IFNpbXBsZU1vZGFsT3B0aW9uc1xuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNpbXBsZU1vZGFsTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogU2ltcGxlTW9kYWxTZXJ2aWNlQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTaW1wbGVNb2RhbFNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogU2ltcGxlTW9kYWxTZXJ2aWNlRmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBBcHBsaWNhdGlvblJlZiwgSW5qZWN0b3IsIFNpbXBsZU1vZGFsU2VydmljZUNvbmZpZ10sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBEZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25Db25maWcsXG4gICAgICAgICAgdXNlVmFsdWU6IGRlZmF1bHRNb2RhbE9wdGlvbnMgfHwgZGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==