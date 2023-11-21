import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogData } from '@shared/modules/ui/components/dialogs/confirmation-dialog/confirmation-dialog.entities';
import { Head1Component } from '@ui/text/head1.component';
import { P1Component } from '@ui/text/p1.component';
import { PrimaryButtonComponent } from '@shared/modules/ui/components/buttons/primary-button.component';
import { SecondaryButtonComponent } from '@shared/modules/ui/components/buttons/secondary-button.component';
import { IconComponent } from '@ui/images/icon.component';
import { WarnButtonComponent } from '@shared/modules/ui/components/buttons/warn-button.component';

@Component({
  selector: 'dialog-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    Head1Component,
    P1Component,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    IconComponent,
    MatDialogModule,
    WarnButtonComponent,
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent implements OnInit {
  data = inject<ConfirmationDialogData>(MAT_DIALOG_DATA);

  private dialogRef = inject(MatDialogRef);
  private hostRef = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    if (this.data.color) this.hostRef.nativeElement.classList.add(this.data.color);
  }

  confirm(): void {
    this.dialogRef.close(0);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
