# GenericFormComponent

A reusable component for creating standardized admin forms across the application.

## Overview

The `GenericFormComponent` provides a consistent form UI and behavior for all admin forms in the application. It handles common tasks such as:

- Displaying form fields with Material Design styling
- Managing form state (add/edit modes)
- Handling form submission and cancellation
- Proper error display and validation
- Displaying validation errors
- Showing success/error notifications

## Features

- Supports text inputs and textarea fields out of the box
- Customizable form fields through content projection
- Responsive design
- Consistent styling across all admin forms
- Standardized validation error messages
- Form lifecycle management (load, submit, cancel)

## Usage

### Basic Usage

```html
<app-generic-form
  title="Create Topic"
  [formGroup]="topicForm"
  [isEdit]="isEdit"
  [isSubmitted]="isSubmitted"
  [errorMessage]="errorMessage"
  [textFields]="[
    { name: 'name', label: 'Name', placeholder: 'Topic name', required: true }
  ]"
  [textareaFields]="[
    { name: 'description', label: 'Description', placeholder: 'Topic description', rows: 5, required: true }
  ]"
  [saveButtonText]="isEdit ? 'Update' : 'Create'"
  (formSubmit)="onSubmit()"
  (formCancel)="goBack()"
>
</app-generic-form>
```

### Custom Fields

For more complex forms, you can use the content projection to add custom fields:

```html
<app-generic-form title="Create Presentation" [formGroup]="presentationForm" [isEdit]="isEdit" [isSubmitted]="isSubmitted" [errorMessage]="errorMessage" (formSubmit)="onSubmit()" (formCancel)="goBack()">
  <!-- Custom fields template -->
  <ng-template #customFields>
    <!-- Date picker field -->
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Date</mat-label>
      <input matInput [matDatepicker]="picker" formControlName="date" />
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      <mat-error *ngIf="presentationForm.get('date')?.hasError('required')"> Date is required </mat-error>
    </mat-form-field>
  </ng-template>
</app-generic-form>
```

## Inputs and Outputs

### Inputs

| Name               | Type      | Default     | Description                                           |
| ------------------ | --------- | ----------- | ----------------------------------------------------- |
| `title`            | string    | 'Item Form' | The title of the form                                 |
| `formGroup`        | FormGroup | (required)  | The Angular FormGroup that defines the form structure |
| `isEdit`           | boolean   | false       | Whether the form is in edit mode                      |
| `isSubmitted`      | boolean   | false       | Whether the form has been submitted                   |
| `errorMessage`     | string    | ''          | Error message to display above the form               |
| `saveButtonText`   | string    | 'Save'      | Text for the submit button                            |
| `cancelButtonText` | string    | 'Cancel'    | Text for the cancel button                            |
| `textFields`       | Array     | []          | Array of text input field configurations              |
| `textareaFields`   | Array     | []          | Array of textarea field configurations                |

### Outputs

| Name         | Type               | Description                                    |
| ------------ | ------------------ | ---------------------------------------------- |
| `formSubmit` | EventEmitter<any>  | Emitted when the form is submitted and valid   |
| `formCancel` | EventEmitter<void> | Emitted when the user clicks the cancel button |

## Field Configuration Types

### Text Field Configuration

```typescript
{
  name: string;       // Form control name
  label: string;      // Display label
  placeholder?: string; // Optional placeholder text
  required?: boolean;   // Whether the field is required
}
```

### Textarea Field Configuration

```typescript
{
  name: string;       // Form control name
  label: string;      // Display label
  placeholder?: string; // Optional placeholder text
  rows?: number;      // Number of visible text rows (default: 5)
  required?: boolean;   // Whether the field is required
}
```
