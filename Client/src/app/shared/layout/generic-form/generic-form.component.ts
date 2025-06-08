import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldConfig, isTextArea, isSelect, isDate } from '../../models';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css'],
})
export class GenericFormComponent implements OnInit {
  @Input() title: string = 'Item Form';
  @Input() formGroup!: FormGroup;
  @Input() isEdit: boolean = false;
  @Input() isSubmitted: boolean = false;
  @Input() errorMessage: string = '';
  @Input() saveButtonText: string = 'Save';
  @Input() cancelButtonText: string = 'Cancel';
  @Input() fields: readonly FormFieldConfig[] = []; // Changed to accept readonly array

  // Content child for custom field templates
  @ContentChild('customFields') customFieldsTemplate!: TemplateRef<any>;

  // Type guard methods for template
  isTextArea = isTextArea;
  isSelect = isSelect;
  isDate = isDate;

  // Events
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  ngOnInit(): void {
    if (!this.formGroup) {
      console.error('GenericFormComponent: No FormGroup provided.');
    }
  }

  // Helper to check if a field has an error
  hasError(fieldName: string, errorType: string): boolean {
    const control = this.formGroup?.get(fieldName);
    return control
      ? control.hasError(errorType) && (control.touched || control.dirty)
      : false;
  }

  // Form action handlers
  onSubmit(): void {
    if (this.formGroup && this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
