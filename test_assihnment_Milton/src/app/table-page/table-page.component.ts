import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { TableDataService } from '../table-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatSortModule, MatPaginatorModule],
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss',
})
export class TablePageComponent implements OnInit {

  displayedColumns: string[] = ['created_at', 'updated_at', 'title'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: any;

  dataSource: any[] = [];
  page: number = 1;
  pageSize: number = 30;
  sortBy: string = 'created_at';

  constructor(
    private router: Router,
    private tabledataService: TableDataService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1;
      this.pageSize = +params['per_page'] || 100;
      this.sortBy = params['sort'] || 'created_at';

      this.loadData();
    });
  }


  loadData() {
    this.tabledataService
      .getTotalDataCount(this.page, this.pageSize, this.sortBy)
      .subscribe((response) => {
        this.dataSource = response.items;
      });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  onSortChange(event: any) {
    this.sortBy = event.active;
    this.loadData();
  }

  updateUrlParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.page,
        per_page: this.pageSize,
        sort: this.sortBy
      },
      queryParamsHandling: 'merge',
    });
  }

  ngAfterViewInit() {    
    this.dataSource.sort = this.sort;
  }

  backToMainPage() {
    this.router.navigate(['']);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

// export interface UserData {
//   created_at: string;
//   updated_at: string;
//   title: string;
// }
