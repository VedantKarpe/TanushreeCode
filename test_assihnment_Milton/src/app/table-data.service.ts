import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
private apiUrl = 'https://api.github.com/search/issues?q=repo:angular/components';

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

//   getTotalDataCount(page: number, pageSize: number): Observable<any> {
//     const url = `${this.apiUrl}?page=${page}&pageSize=${pageSize}`;
//     return this.http.get<any>(url);
//     console.log('url', url);
//   }

// }

getTotalDataCount(page: number, pageSize: number, sortBy: string): Observable<any> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('per_page', pageSize.toString())
    .set('sort', sortBy);
  return this.http.get<any>(this.apiUrl, { params });  
}

}
