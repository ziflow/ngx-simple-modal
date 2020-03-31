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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B6aWZsb3cvbmd4LXNpbXBsZS1tb2RhbC8iLCJzb3VyY2VzIjpbInNpbXBsZS1tb2RhbC9zaW1wbGUtbW9kYWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsUUFBUSxFQUVSLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLDhCQUE4QixHQUUvQixNQUFNLHdCQUF3QixDQUFDO1NBUWhCLHlCQUF5QjtBQU16QztJQXNCRTtJQUFlLENBQUM7MEJBdEJMLGlCQUFpQjtJQUNyQix5QkFBTyxHQUFkLFVBQ0UsTUFBZ0MsRUFDaEMsbUJBQXdDO1FBRXhDLE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO2dCQUN2RDtvQkFDRSxPQUFPLEVBQUUsa0JBQWtCO29CQUMzQixVQUFVLEVBQUUseUJBQXlCO29CQUNyQyxJQUFJLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixDQUFDO2lCQUNyRjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsOEJBQThCO29CQUN2QyxRQUFRLEVBQUUsbUJBQW1CLElBQUkseUJBQXlCO2lCQUMzRDthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O0lBcEJVLGlCQUFpQjtRQVo3QixRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSwyQkFBMkIsQ0FBQztZQUN2RSxTQUFTLEVBQUU7Z0JBQ1Qsa0JBQWtCO2dCQUNsQjtvQkFDRSxPQUFPLEVBQUUsOEJBQThCO29CQUN2QyxRQUFRLElBQTJCO2lCQUNwQzthQUNGO1lBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLGVBQWUsRUFBRSxDQUFDLDBCQUEwQixFQUFFLDJCQUEyQixDQUFDO1NBQzNFLENBQUM7T0FDVyxpQkFBaUIsQ0F1QjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQXZCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgSW5qZWN0b3IsXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE5nTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQgfSBmcm9tICcuL3NpbXBsZS1tb2RhbC1ob2xkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNpbXBsZU1vZGFsU2VydmljZSwgU2ltcGxlTW9kYWxTZXJ2aWNlQ29uZmlnIH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBTaW1wbGVNb2RhbFNlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi9zaW1wbGUtbW9kYWwtc2VydmljZS5mYWN0b3J5JztcbmltcG9ydCB7XG4gIGRlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbnMsXG4gIERlZmF1bHRTaW1wbGVNb2RhbE9wdGlvbkNvbmZpZyxcbiAgU2ltcGxlTW9kYWxPcHRpb25zLFxufSBmcm9tICcuL3NpbXBsZS1tb2RhbC1vcHRpb25zJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQsIFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNpbXBsZU1vZGFsU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBEZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25Db25maWcsXG4gICAgICB1c2VWYWx1ZTogZGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9ucyxcbiAgICB9LFxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbU2ltcGxlTW9kYWxIb2xkZXJDb21wb25lbnQsIFNpbXBsZU1vZGFsV3JhcHBlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFNpbXBsZU1vZGFsTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgY29uZmlnOiBTaW1wbGVNb2RhbFNlcnZpY2VDb25maWcsXG4gICAgZGVmYXVsdE1vZGFsT3B0aW9ucz86IFNpbXBsZU1vZGFsT3B0aW9uc1xuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNpbXBsZU1vZGFsTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogU2ltcGxlTW9kYWxTZXJ2aWNlQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTaW1wbGVNb2RhbFNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogU2ltcGxlTW9kYWxTZXJ2aWNlRmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBBcHBsaWNhdGlvblJlZiwgSW5qZWN0b3IsIFNpbXBsZU1vZGFsU2VydmljZUNvbmZpZ10sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBEZWZhdWx0U2ltcGxlTW9kYWxPcHRpb25Db25maWcsXG4gICAgICAgICAgdXNlVmFsdWU6IGRlZmF1bHRNb2RhbE9wdGlvbnMgfHwgZGVmYXVsdFNpbXBsZU1vZGFsT3B0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==