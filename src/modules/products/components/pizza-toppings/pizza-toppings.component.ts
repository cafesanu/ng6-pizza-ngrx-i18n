import {
    Component,
    Input,
    forwardRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ITopping} from '@products/models/topping.model';

const PIZZA_TOPPINGS_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PizzaToppingsComponent),
    multi: true
};

@Component({
    selector: 'app-pizza-toppings',
    providers: [PIZZA_TOPPINGS_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'pizza-toppings.component.html',
    styleUrls: ['pizza-toppings.component.scss']
})
export class PizzaToppingsComponent implements ControlValueAccessor {
    @Input() public toppings: ITopping[] = [];

    public value: ITopping[] = [];

    private onTouch!: Function; // tslint:disable-line ban-types
    private onModelChange!: Function; // tslint:disable-line ban-types

    public registerOnChange(fn: Function): void { // tslint:disable-line ban-types
        this.onModelChange = fn;
    }

    public registerOnTouched(fn: Function): void { // tslint:disable-line ban-types
        this.onTouch = fn;
    }

    public writeValue(value: ITopping[]): void {
        this.value = value;
    }

    public selectTopping(topping: ITopping): void {
        this.value = this.existsInToppings(topping)
            ? this.value.filter((item) => item.id !== topping.id)
            : this.value = [...this.value, topping];
        this.onTouch();
        this.onModelChange(this.value);
    }

    public existsInToppings(topping: ITopping): boolean {
        return this.value.some((val) => val.id === topping.id);
    }
}
