# Generic List Component Documentation

## Overview

The `GenericListComponent` is a reusable Angular component that standardizes the display of admin list pages across the application. It provides a consistent Material Design UI for listing entities with features like pagination, sorting, filtering, and common actions (add, edit, delete).

## Features

- Responsive design that adapts to screen sizes
- Dynamic column visibility based on screen size
- Sortable columns
- Text filtering
- Pagination
- Common actions (add, edit, delete)
- Notification system
- Support for various column types

## Usage

### Import the Component

Ensure the GenericListComponent is imported in your module:

```typescript
import { GenericListComponent } from "../../shared/layout/generic-list/generic-list.component";
```

### Basic Implementation

1. In your component TS file:

```typescript
@Component({
  selector: "app-your-list",
  templateUrl: "./your-list.component.html",
})
export class YourListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = ["id", "name", "description", "actions"];
  hideableColumns: string[] = ["description"]; // Columns to hide on small screens
  dataSource = new MatTableDataSource<YourModel>([]);

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;

  constructor(private yourService: YourService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.yourService.getItems().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (error) => {
        this.showNotification("Error loading data: " + error.message, "Close");
      },
    });
  }

  // Event handlers
  onAdd() {
    this.router.navigate(["your/path/form"], { state: { mode: "add" } });
  }

  onEdit(item: YourModel) {
    this.router.navigate(["your/path/form"], {
      state: { id: item.id, mode: "edit" },
    });
  }

  onDelete(item: YourModel) {
    this.yourService.deleteItem(item.id).subscribe({
      next: () => {
        this.loadData();
        this.showNotification("Item successfully deleted", "Close");
      },
      error: (error) => {
        this.showNotification("Error deleting item: " + error.message, "Close");
      },
    });
  }

  // Helper method for notifications
  showNotification(message: string, action: string = "Close") {
    this.genericList?.showNotification(message, action);
  }
}
```

2. In your component HTML file:

```html
<app-generic-list title="Your Items" addButtonText="Create Item" searchPlaceholder="Search items" [dataSource]="dataSource" [allColumns]="allColumns" [hideableColumns]="hideableColumns" (add)="onAdd()" (edit)="onEdit($event)" (delete)="onDelete($event)"> </app-generic-list>
```

## Input Properties

| Property          | Type                    | Default                       | Description                                   |
| ----------------- | ----------------------- | ----------------------------- | --------------------------------------------- |
| title             | string                  | 'Items'                       | Title displayed at the top of the component   |
| addButtonText     | string                  | 'Add Item'                    | Text for the add button                       |
| searchPlaceholder | string                  | 'Search items'                | Placeholder text for the search input         |
| noDataMessage     | string                  | 'No data matching the filter' | Message shown when no data matches the filter |
| dataSource        | MatTableDataSource<any> | new MatTableDataSource([])    | Data source for the table                     |
| allColumns        | string[]                | []                            | All columns to be displayed in the table      |
| hideableColumns   | string[]                | []                            | Columns that will be hidden on small screens  |
| pageSizeOptions   | number[]                | [5, 10, 25, 100]              | Options for the number of items per page      |
| defaultPageSize   | number                  | 10                            | Default number of items per page              |

## Output Events

| Event  | Type                 | Description                                                            |
| ------ | -------------------- | ---------------------------------------------------------------------- |
| add    | EventEmitter<void>   | Emitted when the add button is clicked                                 |
| edit   | EventEmitter<any>    | Emitted when an edit action is triggered, with the item as payload     |
| delete | EventEmitter<any>    | Emitted when a delete action is triggered, with the item as payload    |
| filter | EventEmitter<string> | Emitted when the filter input changes, with the filter text as payload |

## Supported Column Types

The GenericListComponent supports various column types:

### ID Columns

Supports various ID fields: `id`, `topicId`, `projectId`, `proposalId`, `presentationId`, `organisationId`, `userId`, `classroomId`

### Basic Columns

- `name`: Displays the name property
- `title`: Displays the title property
- `description`: Displays the description with truncation and tooltip for long text
- `origin`: Displays the origin property
- `address`: Displays the address property
- `level`: Displays the level property (for classrooms)

### User-specific Columns

- `userName`: Displays the username
- `givenName`: Displays the user's given name
- `familyName`: Displays the user's family name
- `userLevel`: Displays the user's permission level

### Relationship Columns

- `topics`: Displays topic names from a related topics array
- `student`, `coach`, `expert`: Displays the userName property of related entities

### Actions Column

- `actions`: Provides edit and delete buttons with Material icons

## Responsive Behavior

The component adapts to screen sizes:

- On large screens, all columns are displayed
- On small screens (width < 800px), columns specified in `hideableColumns` are hidden

## Notification System

Use the `showNotification` method to display notifications:

```typescript
this.genericList.showNotification("Your message", "Action Button Text", durationInMs);
```

## Examples

### Topic List Example

```typescript
allColumns: string[] = ['topicId', 'name', 'description', 'actions'];
hideableColumns: string[] = ['description'];
```

### Proposal List Example

```typescript
allColumns: string[] = ['proposalId', 'title', 'description', 'origin', 'topics', 'actions'];
hideableColumns: string[] = ['description', 'topics'];
```

### Presentation List Example

```typescript
allColumns: string[] = ['presentationId', 'student', 'coach', 'expert', 'actions'];
hideableColumns: string[] = [];
```

### Organisation List Example

```typescript
allColumns: string[] = ['organisationId', 'name', 'address', 'actions'];
hideableColumns: string[] = [];
```

### Project List Example

```typescript
allColumns: string[] = ['projectId', 'title', 'description', 'actions'];
hideableColumns: string[] = ['description'];
```

### User List Example

```typescript
allColumns: string[] = ['userId', 'userName', 'givenName', 'familyName', 'userLevel', 'actions'];
hideableColumns: string[] = ['givenName', 'familyName'];
```

### Classroom List Example

```typescript
allColumns: string[] = ['classroomId', 'name', 'level', 'actions'];
hideableColumns: string[] = [];
```
