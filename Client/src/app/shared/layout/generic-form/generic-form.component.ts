import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css'],
})
export class GenericFormComponent implements OnInit, OnDestroy {
  // Input configurations
  @Input() title: string = 'Item Form';
  @Input() formGroup!: FormGroup;
  @Input() isEdit: boolean = false;
  @Input() isSubmitted: boolean = false;
  @Input() errorMessage: string = '';
  @Input() saveButtonText: string = 'Save';
  @Input() cancelButtonText: string = 'Cancel';

  // Content child for custom field templates
  @ContentChild('customFields') customFieldsTemplate!: TemplateRef<any>;
  // Standard field inputs (for different field types)
  @Input() textFields: {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
  }[] = [];

  @Input() textareaFields: {
    name: string;
    label: string;
    placeholder?: string;
    rows?: number;
    required?: boolean;
  }[] = [];

  @Input() selectFields: {
    name: string;
    label: string;
    options: { value: any; viewValue: string }[];
    placeholder?: string;
    required?: boolean;
  }[] = [];

  @Input() dateFields: {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
  }[] = [];

  // Events
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (!this.formGroup) {
      console.error('GenericFormComponent: No FormGroup provided.');
    }
  }

  ngOnDestroy(): void {
    // Clean-up if needed
  }

  // Form submission handler
  onSubmit(): void {
    if (this.formGroup && this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    }
  }

  // Cancel handler
  onCancel(): void {
    this.formCancel.emit();
  }

  // Helper to check if a field has an error
  hasError(fieldName: string, errorType: string): boolean {
    const control = this.formGroup?.get(fieldName);
    return control
      ? control.hasError(errorType) && (control.touched || control.dirty)
      : false;
  }

  // Helper to get form control
  getControl(fieldName: string): AbstractControl | null {
    return this.formGroup?.get(fieldName) || null;
  }

  // Helper method to show notifications
  showNotification(
    message: string,
    action: string = 'Close',
    duration: number = 3000
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
