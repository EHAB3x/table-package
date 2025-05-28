import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalRows!: number;
  currentPage !: number;
  totalPages !: number;
  pagesArr: number[] = [];

  constructor(
    private pagination :PaginationService
  ) {}

  ngOnInit(): void {
    this.pagination.currentPage.subscribe({
      next:(res)=>{
        this.currentPage = res;
      }
    });

    this.pagination.totalPages.subscribe({
      next:(res)=>{
        this.totalPages = res;
        this.pagination.updatePagesArr()
      }
    });

    this.pagination.pagesArr.subscribe({
      next:(res)=>{
        this.pagesArr = res;
      }
    });
  }

  ngOnChanges(): void {
    this.pagination.calcTotalPages(this.totalRows);
    if (this.totalPages > 0) {
      this.pagination.updatePagesArr()
    }
  }

  firstPage(){
    this.pagination.firstPage()
  }

  previousPage(){
    this.pagination.previousPage()
  }

  nextPage(){
    this.pagination.nextPage()
  }

  lastPage(){
    this.pagination.lastPage()
  }

  changePage(num : number){
    this.pagination.setCurrentPage(num)
  }
}
