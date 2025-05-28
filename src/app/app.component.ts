import { fakeData } from './core/data/fakedata';
import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CustomTableComponent } from "./components/custom-table/custom-table.component";
import { IFakeData } from './core/interfaces/ifake-data';
@Component({
  selector: 'app-root',
  imports: [CustomTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'table-package';

  fakeData: IFakeData[] = fakeData;

  ngOnInit(): void {
    initFlowbite();
  }
}
