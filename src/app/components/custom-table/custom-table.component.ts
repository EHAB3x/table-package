import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
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
export class CustomTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() type: string = '';
  @Input() tableData: TableOptions[] = [];

  tableRawData: any[][] = [];
  originalTableData: TableOptions[] = [];
  columns: string[] = [];
  isempty: boolean = true;
  searchControl = new FormControl('');

  currentPage !: number;
  filteredTableData: TableOptions[] = [];
  private pageSubscription: any;

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
    this.pageSubscription = this.pagination.currentPage.subscribe((page) => {
      this.currentPage = page;
      this.initializeTableData();
    });
  }

  ngOnDestroy(): void {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
  }

  ngOnChanges(): void {
    if (this.tableData.length > 0) {
      this.originalTableData = [...this.tableData];
      this.filteredTableData = [...this.tableData];
      this.currentPage = 1;
      this.pagination.setCurrentPage(1);
      this.initializeTableData();
      this.isempty = false;
    }else{
      this.isempty = true;
    }
  }

  private initializeTableData(): void {
    if (this.filteredTableData.length > 0) {
      this.columns = Object.keys(this.filteredTableData[0]);
    }
    const start = ((this.currentPage || 1) - 1) * 10;
    const end = start + 10;
    this.tableRawData = this.filteredTableData.map(item => Object.values(item)).slice(start, end);
  }

  private restoreOriginalData(): void {
    this.filteredTableData = [...this.originalTableData];
    this.currentPage = 1;
    this.pagination.setCurrentPage(1);
    this.initializeTableData();
  }

  private filterData(filterText: string): void {
    const searchTerm = filterText.toLowerCase();
    this.filteredTableData = this.originalTableData.filter(item => {
      return Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm)
      );
    });
    this.currentPage = 1;
    this.pagination.setCurrentPage(1);
    this.initializeTableData();
  }
}
