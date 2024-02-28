import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
//import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { TableDataService } from '../table-data.service';
import { HttpClient } from '@angular/common/http';
//import { TableDataColumns } from '../api.type';
// import { TableDataColumns } from '../api.type';

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatSortModule, MatPaginatorModule],
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss',
})
export class TablePageComponent implements OnInit{
 displayedColumns: string[] = ['created_at', 'updated_at', 'title'];

  //dataSource! : any ;
  //totalDataCount: number =0;
 // dataSource= new MatTableDataSource<any>();

  constructor(private router: Router, private tabledataService: TableDataService, private route: ActivatedRoute,private http: HttpClient) {
  //this.dataSource.items= {};
    //this.dataSource = new MatTableDataSource(users);
   // this.tableDataFetch();
  }

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort = new MatSort();
 dataSource: any[] = [];
  page: number = 1;
  pageSize: number = 30;
  sortBy: string = 'created_at';

  ngOnInit(){

    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1;
      this.pageSize = +params['per_page'] || 100;
      this.sortBy = params['sort'] || 'created_at';

      this.loadData();
    });
  }

  loadData() {
    this.tabledataService.getTotalDataCount(this.page, this.pageSize, this.sortBy).subscribe((response) => {
      console.log('response',response);
      this.dataSource = response.items; // Assuming your data structure is in the 'items' property
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
      queryParams: { page: this.page, per_page: this.pageSize, sort: this.sortBy },
      queryParamsHandling: 'merge',
    });
  }

  //  ngAfterViewInit() {
  //    this.dataSource.paginator = this.paginator;
  //    this.paginator.page
    //  .pipe(
        // startWith({}),
        // switchMap(() => {
          //this.isLoading = true;
          // this.test$(
            // this.paginator.pageIndex + 1,
            // this.paginator.pageSize
        //   ).pipe(catchError(() => observableOf(null)));
        // }),
     // ))
    // console.log("cqlling");
    //  this.fetchData(this.paginator.pageIndex + 1,
    //   this.paginator.pageSize);  
  // }

  //  test$(){
    
  //   this.fetchData(this.paginator.pageIndex + 1,
  //     this.paginator.pageSize);
   //}

  //  ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //  }

     //this.fetchTableData();
   // this.fetchTotalDataCount();
   //this.fetchData();
    //this.dataSource.sort = this.sort;

    // this.dataSource.paginator = this.paginator;
    // this.paginator.pageSize = 10;
  

  // fetchTableData(){
    
  //   this.tabledataService.fetchData().subscribe(
  //     (data) => {
  //       console.log('data###', this.dataSource);
        // this.dataSource= data;
       //this.dataSource = new MatTableDataSource(data);

  //     },
  //     (error) => {
  //       console.error('Error', error);
  //     }
  //   );
  // }

  // fetchTotalDataCount(){
  //   const page = this.paginator.pageIndex + 1;
  //   this.tabledataService.getTotalDataCount(page, this.pageSize).subscribe((data) => {
  //     this.dataSource.data = data;
  //   });
  // }
  
   
  

  // fetchTotalDataCount() {
  //   this.tabledataService.getTotalDataCount().subscribe(count => {
  //     this.totalDataCount = count;
  //     console.log('count',count);
  //   });
  // }

  //fetchData(): void {
    // Make an HTTP request to your API endpoint
    // this.http.get<any>('https://api.github.com/search/issues?q=repo:angular/components').subscribe(response =>{
    //   this.dataSource = response.items;
   // this.http.get<any>('https://api.github.com/search/issues?q=repo:angular/components'+'&page='+pageSize)
   //this.tabledataService.getTotalDataCount(this.paginator.pageIndex + 1, this.paginator.pageSize).subscribe(response => {
      //  console.log(response);   
      // this.dataSource.response = response.items; // Assuming your data is in a 'data' property
      // this.paginator.length=response.total_count
       // this.totalDataCount = response.total_count; // Get the total row count
       // console.log('totalDataCount',this.totalDataCount);
      //});
  //}

  // onPageChange(){
  //   this.fetchData();
  // }


  backToMainPage(){
    this.router.navigate(['']);
  }

}


// export interface UserData {
//   created_at: string;
//   updated_at: string;
//   title: string;
// }
