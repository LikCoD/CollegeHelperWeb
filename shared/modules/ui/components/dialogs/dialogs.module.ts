import { NgModule } from '@angular/core';
import { ConfirmationDialogComponent } from '@shared/modules/ui/components/dialogs/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [ConfirmationDialogComponent],
  exports: [ConfirmationDialogComponent],
})
export class DialogsModule {}
