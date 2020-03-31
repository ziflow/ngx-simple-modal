import * as tslib_1 from "tslib";
import { HostListener } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
/**
 * Abstract modal
 * @template T - modal data;
 * @template T1 - modal result
 */
export class SimpleModalComponent {
    /**
     * Constructor
     */
    constructor() {
        /**
         * ready$ is when all animations and focusing have comleted
         */
        this._ready$ = new BehaviorSubject(false);
        /**
         * Callback to the holders close function
         */
        this.closerCallback = () => Promise.resolve();
    }
    /**
     * Maps your object passed in the creation to fields in your own Dialog classes
     * @param {T} data
     */
    mapDataObject(data) {
        data = data || {};
        const keys = Object.keys(data);
        for (let i = 0, length = keys.length; i < length; i++) {
            const key = keys[i];
            if (typeof data[key] === 'object' && typeof this[key] === 'object') {
                Object.assign(this[key], data[key]);
            }
            else {
                this[key] = data[key];
            }
        }
    }
    /**
     * Setup observer
     * @return {Observable<T1>}
     */
    setupObserver() {
        return Observable.create(observer => {
            this.observer = observer;
            // called if observable is unsubscribed to
            return () => {
                this.close();
            };
        });
    }
    /**
     * Defines what happens when close is called - default this
     * will just call the default remove modal process. If overriden
     * must include
     * @param callback
     */
    onClosing(callback) {
        this.closerCallback = callback;
    }
    /**
     * Closes modal
     */
    close() {
        return this.closerCallback(this).then(v => {
            if (this.observer) {
                this.observer.next(this.result);
                this.observer.complete();
            }
            return v;
        });
    }
    /**
     * keypress binding ngx way
     * @param evt
     */
    onKeydownHandler(evt) {
        if (this.options && this.options.closeOnEscape) {
            this.close();
        }
    }
    get ready$() {
        return this._ready$.asObservable();
    }
    markAsReady() {
        this._ready$.next(true);
    }
}
tslib_1.__decorate([
    HostListener('document:keydown.escape', ['$event'])
], SimpleModalComponent.prototype, "onKeydownHandler", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B6aWZsb3cvbmd4LXNpbXBsZS1tb2RhbC8iLCJzb3VyY2VzIjpbInNpbXBsZS1tb2RhbC9zaW1wbGUtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWMsWUFBWSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQXFCLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVN0RTs7OztHQUlHO0FBQ0gsTUFBTSxPQUFnQixvQkFBb0I7SUFnQ3hDOztPQUVHO0lBQ0g7UUFiQTs7V0FFRztRQUNILFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUU5Qzs7V0FFRztRQUNLLG1CQUFjLEdBQWdDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUsvRCxDQUFDO0lBRWhCOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxJQUFPO1FBQ25CLElBQUksR0FBRyxJQUFJLElBQU8sRUFBRSxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUNsRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsYUFBYTtRQUNYLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUV6QiwwQ0FBMEM7WUFDMUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxTQUFTLENBQUMsUUFBcUU7UUFDN0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNILE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDMUI7WUFDRCxPQUFPLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUVILGdCQUFnQixDQUFDLEdBQWtCO1FBQ2pDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtZQUM5QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtJQUNILENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUFiQztJQURDLFlBQVksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzREQUtuRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNpbXBsZU1vZGFsT3B0aW9ucyB9IGZyb20gJy4vc2ltcGxlLW1vZGFsLW9wdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9uRGVzdHJveUxpa2Uge1xuICBuZ09uRGVzdHJveSgpOiB2b2lkO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgbW9kYWxcbiAqIEB0ZW1wbGF0ZSBUIC0gbW9kYWwgZGF0YTtcbiAqIEB0ZW1wbGF0ZSBUMSAtIG1vZGFsIHJlc3VsdFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2ltcGxlTW9kYWxDb21wb25lbnQ8VCwgVDE+IHtcbiAgLyoqXG4gICAqIE9ic2VydmVyIHRvIHJldHVybiByZXN1bHQgZnJvbSBtb2RhbFxuICAgKi9cbiAgcHJpdmF0ZSBvYnNlcnZlcjogT2JzZXJ2ZXI8VDE+O1xuXG4gIC8qKlxuICAgKiBEaWFsb2cgcmVzdWx0XG4gICAqIEB0eXBlIHtUMX1cbiAgICovXG4gIHJlc3VsdDogVDE7XG5cbiAgLyoqXG4gICAqIERpYWxvZyB3cmFwcGVyIChtb2RhbCBwbGFjZWhvbGRlcilcbiAgICovXG4gIHdyYXBwZXI6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIHJlZiBvZiBvcHRpb25zIGZvciB0aGlzIGNvbXBvbmVudFxuICAgKi9cbiAgb3B0aW9uczogU2ltcGxlTW9kYWxPcHRpb25zO1xuXG4gIC8qKlxuICAgKiByZWFkeSQgaXMgd2hlbiBhbGwgYW5pbWF0aW9ucyBhbmQgZm9jdXNpbmcgaGF2ZSBjb21sZXRlZFxuICAgKi9cbiAgX3JlYWR5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBDYWxsYmFjayB0byB0aGUgaG9sZGVycyBjbG9zZSBmdW5jdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBjbG9zZXJDYWxsYmFjazogKGNvbXBvbmVudCkgPT4gUHJvbWlzZTxhbnk+ID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLyoqXG4gICAqIE1hcHMgeW91ciBvYmplY3QgcGFzc2VkIGluIHRoZSBjcmVhdGlvbiB0byBmaWVsZHMgaW4geW91ciBvd24gRGlhbG9nIGNsYXNzZXNcbiAgICogQHBhcmFtIHtUfSBkYXRhXG4gICAqL1xuICBtYXBEYXRhT2JqZWN0KGRhdGE6IFQpOiB2b2lkIHtcbiAgICBkYXRhID0gZGF0YSB8fCA8VD57fTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBpZiAodHlwZW9mIGRhdGFba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHRoaXNba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzW2tleV0sIGRhdGFba2V5XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzW2tleV0gPSBkYXRhW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHVwIG9ic2VydmVyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VDE+fVxuICAgKi9cbiAgc2V0dXBPYnNlcnZlcigpOiBPYnNlcnZhYmxlPFQxPiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBvYnNlcnZlcjtcblxuICAgICAgLy8gY2FsbGVkIGlmIG9ic2VydmFibGUgaXMgdW5zdWJzY3JpYmVkIHRvXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgd2hhdCBoYXBwZW5zIHdoZW4gY2xvc2UgaXMgY2FsbGVkIC0gZGVmYXVsdCB0aGlzXG4gICAqIHdpbGwganVzdCBjYWxsIHRoZSBkZWZhdWx0IHJlbW92ZSBtb2RhbCBwcm9jZXNzLiBJZiBvdmVycmlkZW5cbiAgICogbXVzdCBpbmNsdWRlXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgb25DbG9zaW5nKGNhbGxiYWNrOiAoY29tcG9uZW50OiBTaW1wbGVNb2RhbENvbXBvbmVudDxhbnksIGFueT4pID0+IFByb21pc2U8YW55Pik6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VyQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgbW9kYWxcbiAgICovXG4gIGNsb3NlKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY2xvc2VyQ2FsbGJhY2sodGhpcykudGhlbih2ID0+IHtcbiAgICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIubmV4dCh0aGlzLnJlc3VsdCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGtleXByZXNzIGJpbmRpbmcgbmd4IHdheVxuICAgKiBAcGFyYW0gZXZ0XG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLmVzY2FwZScsIFsnJGV2ZW50J10pXG4gIG9uS2V5ZG93bkhhbmRsZXIoZXZ0OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuY2xvc2VPbkVzY2FwZSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCByZWFkeSQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWR5JC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG1hcmtBc1JlYWR5KCkge1xuICAgIHRoaXMuX3JlYWR5JC5uZXh0KHRydWUpO1xuICB9XG59XG4iXX0=