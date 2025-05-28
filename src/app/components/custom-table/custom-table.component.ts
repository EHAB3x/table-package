import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TableOptions } from '../../core/types/TableType';
import { debounceTime } from 'rxjs';
import { PaginationService } from '../../core/services/pagination.service';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-custom-table',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, PaginationComponent],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent implements OnInit, OnChanges {
  @Input() type: string = '';
  @Input() tableData: TableOptions[] = [];

  tableRawData: any[][] = [];
  originalTableData: TableOptions[] = [];
  columns: string[] = [];
  isempty: boolean = true;
  searchControl = new FormControl('');

  currentPage !: number;

  constructor(
    private pagination : PaginationService
  ){

  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe({
      next: (searchTerm) => {
        if (!searchTerm) {
          this.restoreOriginalData();
        } else {
          this.filterData(searchTerm);
        }
      },
    });
  }

  ngOnChanges(): void {
    if (this.tableData.length > 0) {
      this.originalTableData = [...this.tableData];
      this.initializeTableData();
      this.isempty = false;
    }else{
      this.isempty = true;
    }
  }

  private initializeTableData(): void {
    this.columns = Object.keys(this.tableData[0]);
    this.tableRawData = this.tableData.map(item => Object.values(item)).slice((this.pagination.getCurrentPage() - 1) * 10, this.pagination.getCurrentPage() * 10);
  }

  private restoreOriginalData(): void {
    this.tableData = [...this.originalTableData];
    this.initializeTableData();
  }

  private filterData(filterText: string): void {
    const searchTerm = filterText.toLowerCase();

    const filteredData = this.originalTableData.filter(item => {
      return Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm)
      );
    });

    this.tableData = filteredData;
    this.updateRawData(filteredData);
  }

  private updateRawData(data: TableOptions[]): void {
    this.tableRawData = data.map(item => Object.values(item));
  }

  // onPagChange(page : number){
  //   this.initialPage = page;
  //   this.tableRawData = this.tableData.map(item => Object.values(item)).slice((this.initialPage - 1) * 10, this.initialPage * 10);
  // }
}
