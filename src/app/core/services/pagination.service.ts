import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
currentPage : BehaviorSubject<number>;
  totalPages : BehaviorSubject<number>;
  pagesArr: BehaviorSubject<number[]>;
  pageSize: number = 10;

  constructor() {
    this.currentPage = new BehaviorSubject<number>(1);
    this.totalPages = new BehaviorSubject<number>(1);
    this.pagesArr = new BehaviorSubject<number[]>([1]);
   }

  calcTotalPages(totalRows: number){
    this.totalPages.next(Math.ceil(totalRows / this.pageSize));
    return this.totalPages;
  }

  updatePagesArr() {
    this.pagesArr.next(
      Array(this.totalPages.value)
      .fill(1)
      .map((x, i) => i + 1)
    );
  }

  previousPage(): void {
    this.currentPage.next(this.getCurrentPage() - 1);
  }

  nextPage(): void {
    this.currentPage.next(this.getCurrentPage() + 1);
  }

  firstPage(): void {
    this.currentPage.next(1)
  }

  lastPage(): void {
    this.currentPage.next(this.getTotalPages())
  }

  setCurrentPage(page :number){
    this.currentPage.next(page);
  }

  getCurrentPage(){
    return this.currentPage.value;
  }

  getTotalPages(){
    return this.totalPages.value;
  }
}
