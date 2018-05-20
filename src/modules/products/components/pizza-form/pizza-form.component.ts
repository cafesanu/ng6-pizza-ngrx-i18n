import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';

import {map} from 'rxjs/operators';

import {IPizza} from '@products/models/pizza.model';
import {ITopping} from '@products/models/topping.model';

@Component({
    selector: 'app-pizza-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './pizza-form.component.html',
    styleUrls: ['./pizza-form.component.scss']
})
export class PizzaFormComponent implements OnChanges {
    public exists: boolean = false;

    @Input() public pizza!: IPizza;
    @Input() public toppings!: ITopping[];

    @Output() public selected: EventEmitter<number[]> = new EventEmitter<number[]>();
    @Output() public create: EventEmitter<IPizza> = new EventEmitter<IPizza>();
    @Output() public update: EventEmitter<IPizza> = new EventEmitter<IPizza>();
    @Output() public remove: EventEmitter<IPizza> = new EventEmitter<IPizza>();

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            toppings: [[]]
        });
    }

    get nameControl(): FormControl {
        return <FormControl> this.form.get('name');
    }

    get nameControlInvalid(): boolean {
        return (
            this.nameControl.hasError('required') && this.nameControl.touched
        );
    }

    public ngOnChanges(changes: SimpleChanges): void { // tslint:disable-line no-unused
        if (this.pizza && this.pizza.id) {
            this.exists = true;
            this.form.patchValue(this.pizza);
        }
        // tslint:disable-next-line no-non-null-assertion
        this.form
            .get('toppings')!.valueChanges.pipe(
                map((toppings) => toppings.map((topping: ITopping) => topping.id))
            )
            .subscribe((value) => this.selected.emit(value));
    }

    public createPizza(form: FormGroup): void {
        // tslint:disable-next-line no-any
        const {value, valid}: {value: any; valid: boolean} = form;
        if (valid) {
            this.create.emit(value);
        }
    }

    public updatePizza(form: FormGroup): void {
        // tslint:disable-next-line no-any
        const {value, valid, touched}: {value: any; valid: boolean; touched: boolean} = form;
        if (touched && valid) {
            this.update.emit({...this.pizza, ...value});
        }
    }

    public removePizza(form: FormGroup): void {
        // tslint:disable-next-line no-any
        const {value}: {value: any} = form;
        this.remove.emit({...this.pizza, ...value});
    }
}
