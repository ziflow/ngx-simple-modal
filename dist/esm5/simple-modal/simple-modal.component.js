import * as tslib_1 from "tslib";
import { HostListener } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
/**
 * Abstract modal
 * @template T - modal data;
 * @template T1 - modal result
 */
var SimpleModalComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function SimpleModalComponent() {
        /**
         * ready$ is when all animations and focusing have comleted
         */
        this._ready$ = new BehaviorSubject(false);
        /**
         * Callback to the holders close function
         */
        this.closerCallback = function () { return Promise.resolve(); };
    }
    /**
     * Maps your object passed in the creation to fields in your own Dialog classes
     * @param {T} data
     */
    SimpleModalComponent.prototype.mapDataObject = function (data) {
        data = data || {};
        var keys = Object.keys(data);
        for (var i = 0, length_1 = keys.length; i < length_1; i++) {
            var key = keys[i];
            if (typeof data[key] === 'object' && typeof this[key] === 'object') {
                Object.assign(this[key], data[key]);
            }
            else {
                this[key] = data[key];
            }
        }
    };
    /**
     * Setup observer
     * @return {Observable<T1>}
     */
    SimpleModalComponent.prototype.setupObserver = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.observer = observer;
            // called if observable is unsubscribed to
            return function () {
                _this.close();
            };
        });
    };
    /**
     * Defines what happens when close is called - default this
     * will just call the default remove modal process. If overriden
     * must include
     * @param callback
     */
    SimpleModalComponent.prototype.onClosing = function (callback) {
        this.closerCallback = callback;
    };
    /**
     * Closes modal
     */
    SimpleModalComponent.prototype.close = function () {
        var _this = this;
        return this.closerCallback(this).then(function (v) {
            if (_this.observer) {
                _this.observer.next(_this.result);
                _this.observer.complete();
            }
            return v;
        });
    };
    /**
     * keypress binding ngx way
     * @param evt
     */
    SimpleModalComponent.prototype.onKeydownHandler = function (evt) {
        if (this.options && this.options.closeOnEscape) {
            this.close();
        }
    };
    Object.defineProperty(SimpleModalComponent.prototype, "ready$", {
        get: function () {
            return this._ready$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    SimpleModalComponent.prototype.markAsReady = function () {
        this._ready$.next(true);
    };
    tslib_1.__decorate([
        HostListener('document:keydown.escape', ['$event'])
    ], SimpleModalComponent.prototype, "onKeydownHandler", null);
    return SimpleModalComponent;
}());
export { SimpleModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zaW1wbGUtbW9kYWwvIiwic291cmNlcyI6WyJzaW1wbGUtbW9kYWwvc2ltcGxlLW1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFjLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFxQixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFTdEU7Ozs7R0FJRztBQUNIO0lBZ0NFOztPQUVHO0lBQ0g7UUFiQTs7V0FFRztRQUNILFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUU5Qzs7V0FFRztRQUNLLG1CQUFjLEdBQWdDLGNBQU0sT0FBQSxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQWpCLENBQWlCLENBQUM7SUFLL0QsQ0FBQztJQUVoQjs7O09BR0c7SUFDSCw0Q0FBYSxHQUFiLFVBQWMsSUFBTztRQUNuQixJQUFJLEdBQUcsSUFBSSxJQUFPLEVBQUUsQ0FBQztRQUNyQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxRQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDbEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDckM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILDRDQUFhLEdBQWI7UUFBQSxpQkFTQztRQVJDLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVE7WUFDL0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFFekIsMENBQTBDO1lBQzFDLE9BQU87Z0JBQ0wsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCx3Q0FBUyxHQUFULFVBQVUsUUFBcUU7UUFDN0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsb0NBQUssR0FBTDtRQUFBLGlCQVFDO1FBUEMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7WUFDckMsSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDMUI7WUFDRCxPQUFPLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUVILCtDQUFnQixHQUFoQixVQUFpQixHQUFrQjtRQUNqQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDOUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRUQsc0JBQUksd0NBQU07YUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVELDBDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBWkQ7UUFEQyxZQUFZLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnRUFLbkQ7SUFTSCwyQkFBQztDQUFBLEFBOUdELElBOEdDO1NBOUdxQixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBTaW1wbGVNb2RhbE9wdGlvbnMgfSBmcm9tICcuL3NpbXBsZS1tb2RhbC1vcHRpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBPbkRlc3Ryb3lMaWtlIHtcbiAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG4vKipcbiAqIEFic3RyYWN0IG1vZGFsXG4gKiBAdGVtcGxhdGUgVCAtIG1vZGFsIGRhdGE7XG4gKiBAdGVtcGxhdGUgVDEgLSBtb2RhbCByZXN1bHRcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNpbXBsZU1vZGFsQ29tcG9uZW50PFQsIFQxPiB7XG4gIC8qKlxuICAgKiBPYnNlcnZlciB0byByZXR1cm4gcmVzdWx0IGZyb20gbW9kYWxcbiAgICovXG4gIHByaXZhdGUgb2JzZXJ2ZXI6IE9ic2VydmVyPFQxPjtcblxuICAvKipcbiAgICogRGlhbG9nIHJlc3VsdFxuICAgKiBAdHlwZSB7VDF9XG4gICAqL1xuICByZXN1bHQ6IFQxO1xuXG4gIC8qKlxuICAgKiBEaWFsb2cgd3JhcHBlciAobW9kYWwgcGxhY2Vob2xkZXIpXG4gICAqL1xuICB3cmFwcGVyOiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiByZWYgb2Ygb3B0aW9ucyBmb3IgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIG9wdGlvbnM6IFNpbXBsZU1vZGFsT3B0aW9ucztcblxuICAvKipcbiAgICogcmVhZHkkIGlzIHdoZW4gYWxsIGFuaW1hdGlvbnMgYW5kIGZvY3VzaW5nIGhhdmUgY29tbGV0ZWRcbiAgICovXG4gIF9yZWFkeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKipcbiAgICogQ2FsbGJhY2sgdG8gdGhlIGhvbGRlcnMgY2xvc2UgZnVuY3Rpb25cbiAgICovXG4gIHByaXZhdGUgY2xvc2VyQ2FsbGJhY2s6IChjb21wb25lbnQpID0+IFByb21pc2U8YW55PiA9ICgpID0+IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qKlxuICAgKiBNYXBzIHlvdXIgb2JqZWN0IHBhc3NlZCBpbiB0aGUgY3JlYXRpb24gdG8gZmllbGRzIGluIHlvdXIgb3duIERpYWxvZyBjbGFzc2VzXG4gICAqIEBwYXJhbSB7VH0gZGF0YVxuICAgKi9cbiAgbWFwRGF0YU9iamVjdChkYXRhOiBUKTogdm9pZCB7XG4gICAgZGF0YSA9IGRhdGEgfHwgPFQ+e307XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB0aGlzW2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpc1trZXldLCBkYXRhW2tleV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1trZXldID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCBvYnNlcnZlclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQxPn1cbiAgICovXG4gIHNldHVwT2JzZXJ2ZXIoKTogT2JzZXJ2YWJsZTxUMT4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiB7XG4gICAgICB0aGlzLm9ic2VydmVyID0gb2JzZXJ2ZXI7XG5cbiAgICAgIC8vIGNhbGxlZCBpZiBvYnNlcnZhYmxlIGlzIHVuc3Vic2NyaWJlZCB0b1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHdoYXQgaGFwcGVucyB3aGVuIGNsb3NlIGlzIGNhbGxlZCAtIGRlZmF1bHQgdGhpc1xuICAgKiB3aWxsIGp1c3QgY2FsbCB0aGUgZGVmYXVsdCByZW1vdmUgbW9kYWwgcHJvY2Vzcy4gSWYgb3ZlcnJpZGVuXG4gICAqIG11c3QgaW5jbHVkZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xvc2luZyhjYWxsYmFjazogKGNvbXBvbmVudDogU2ltcGxlTW9kYWxDb21wb25lbnQ8YW55LCBhbnk+KSA9PiBQcm9taXNlPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlckNhbGxiYWNrID0gY2FsbGJhY2s7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIG1vZGFsXG4gICAqL1xuICBjbG9zZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNsb3NlckNhbGxiYWNrKHRoaXMpLnRoZW4odiA9PiB7XG4gICAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgICB0aGlzLm9ic2VydmVyLm5leHQodGhpcy5yZXN1bHQpO1xuICAgICAgICB0aGlzLm9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdjtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBrZXlwcmVzcyBiaW5kaW5nIG5neCB3YXlcbiAgICogQHBhcmFtIGV2dFxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5lc2NhcGUnLCBbJyRldmVudCddKVxuICBvbktleWRvd25IYW5kbGVyKGV2dDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmNsb3NlT25Fc2NhcGUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgcmVhZHkkKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWFkeSQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBtYXJrQXNSZWFkeSgpIHtcbiAgICB0aGlzLl9yZWFkeSQubmV4dCh0cnVlKTtcbiAgfVxufVxuIl19