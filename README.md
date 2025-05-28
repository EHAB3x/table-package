# Table Package

A reusable Angular component library for displaying, filtering, and paginating tabular data. This package provides a customizable table component with built-in pagination and search functionality.

## Features
- Display tabular data with dynamic columns
- Client-side pagination
- Search/filter functionality
- Easy integration into any Angular project
- Customizable styles (SCSS, Tailwind supported)

## Installation

1. **Copy the Components and Services**
   - Copy the `custom-table` and `pagination` component folders from `src/app/components/` into your Angular project's components directory.
   - Copy the `pagination.service.ts` from `src/app/core/services/` into your project's services directory.
   - Copy the `TableType.ts` from `src/app/core/types/` into your project's types directory.

2. **Import the Components and Service**
   - Register the `PaginationService` in your module's providers (if not provided in root).
   - Import the `CustomTableComponent` and `PaginationComponent` in your module:

   ```typescript
   import { CustomTableComponent } from './components/custom-table/custom-table.component';
   import { PaginationComponent } from './components/pagination/pagination.component';
   ```

   - Add them to your module's `declarations` and `imports` arrays as needed.

3. **Add Styles**
   - Make sure to include the required styles in your `angular.json` (e.g., Tailwind, SCSS).

4. **Usage Example**

   In your template:
   ```html
   <app-custom-table
     [type]="'users'"
     [tableData]="usersDataArray">
   </app-custom-table>
   ```

   In your component:
   ```typescript
   usersDataArray: TableOptions[] = [
     { id: 1, name: 'Alice', email: 'alice@example.com' },
     { id: 2, name: 'Bob', email: 'bob@example.com' },
     // ...more data
   ];
   ```

   - The table will automatically display columns based on the keys of your data objects.
   - Pagination and search are handled internally.

5. **Customizing**
   - You can modify the table and pagination components' SCSS files for custom styles.
   - Adjust the `pageSize` in `PaginationService` as needed.

## API

### `<app-custom-table>` Inputs
- `type: string` — Optional, for custom logic or styling.
- `tableData: TableOptions[]` — The array of objects to display in the table.

## Development
- Built with Angular 19+
- Uses RxJS for reactivity
- Supports Tailwind CSS and Flowbite for styling (optional)
