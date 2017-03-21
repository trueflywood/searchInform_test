import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class  EditDepartmentModalContext extends BSModalContext {
    text: string;
    title: string;
    name: string;
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
    selector: 'modal-content',
    templateUrl: './edit-department.component.html',
    styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentModal implements CloseGuard, ModalComponent<EditDepartmentModalContext> {
    context: EditDepartmentModalContext;
    constructor(public dialog: DialogRef<EditDepartmentModalContext>) {
        this.context = dialog.context;
        dialog.setCloseGuard(this);
    }

    beforeDismiss(): boolean {
        return false;
    }

    beforeClose(): boolean {
        return false;
    }
}

