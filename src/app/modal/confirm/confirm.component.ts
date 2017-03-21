import { Component } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class ConfirmModalContext extends BSModalContext {
    text: string;
    title: string;
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
    selector: 'modal-content',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmModal implements CloseGuard, ModalComponent<ConfirmModalContext> {
    context: ConfirmModalContext;
    constructor(public dialog: DialogRef<ConfirmModalContext>) {
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

