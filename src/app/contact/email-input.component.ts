
import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
    selector: 'email-input',
    template: `
    <input type="email" [ngClass]="inputClass"
            #email
            class="form-control short-input"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            [placeholder]="cell.getTitle()"
            (click)="onClick.emit($event)"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()"
           pattern=".+@globex\.com">
    `,
})
export class EmailInputComponent extends DefaultEditor {

    constructor() {
        super();
    }
}
