import { ComponentFactoryResolver, ElementRef, OnDestroy, Type } from '@angular/core';
import { SimpleModalComponent } from './simple-modal.component';
/**
 * The modal backdrop wrapping wrapper to the modal
 */
export declare class SimpleModalWrapperComponent implements OnDestroy {
    private resolver;
    /**
     * Target viewContainer to insert modal content component
     */
    viewContainer: any;
    /**
     * Link wrapper DOM element
     */
    wrapper: ElementRef;
    /**
     * Wrapper modal and fade classes
     */
    modalClasses: string;
    /**
     * Dialog content componet
     * @type {SimpleModalComponent}
     */
    content: SimpleModalComponent<any, any>;
    /**
     * Click outside callback
     */
    clickOutsideCallback: (event: any) => void;
    /**
     * Constructor
     * @param {ComponentFactoryResolver} resolver
     */
    constructor(resolver: ComponentFactoryResolver);
    /**
     * Adds content modal component to wrapper
     * @param {Type<SimpleModalComponent>} component
     * @return {SimpleModalComponent}
     */
    addComponent<T, T1>(component: Type<SimpleModalComponent<T, T1>>): SimpleModalComponent<any, any>;
    /**
     * Configures the function to call when you click on background of a modal but not the contents
     * @param callback
     */
    onClickOutsideModalContent(callback: () => void): void;
    ngOnDestroy(): void;
}
