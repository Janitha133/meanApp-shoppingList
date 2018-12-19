import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getShoppingItems(){
    return this.http.get('http://localhost:3000/api/items')
      .pipe(map(res => res));
  }

  addShoppingItem(newItem){
    let headers = new HttpHeaders();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/api/item', newItem, {headers: headers})
      .pipe(map(res => res));
  }

  deleteShoppingItem(id){
    return this.http.delete('http://localhost:3000/api/item/'+id)
    .pipe(map(res => res));
  }

  updateShoppingItem(newItem){
    let headers = new HttpHeaders();
    headers.append('Content-type','application/json');
    return this.http.put('http://localhost:3000/api/item/'+newItem._id, newItem, {headers: headers})
    .pipe(map(res => res));
  }
}
