import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
dataList:any;
  constructor(
  private router : Router,
  private http: HttpClient) { }

  ngOnInit() {
  this.getList();
  }
openModal(){
 this.router.navigate(['add']);
console.log('ok')
  }


  getList(){
   this.http.get<any>('http://127.0.0.1:8000/api/').subscribe(res => {
  this.dataList=res;
  console.log(this.dataList);

  },
error => {
         console.log('Error list!');

       }
  );
}
delete(item){
	console.log(item);
	this.http.get<any>('http://127.0.0.1:8000/api/delete/'+item.id).subscribe(res => {
  this.getList();
  console.log(res);

  },
error => {
         console.log('Error delete!');

       }
  );
}
editData(item){

	console.log(item);
	this.http.get<any>('http://127.0.0.1:8000/api/show/'+item.id).subscribe(res => {
   const navigationExtras: NavigationExtras = {
      state: res
  };
   this.router.navigate(['/add'],navigationExtras);

  },
error => {
         console.log('Error eidt!');

       }
  );
	
}
}
