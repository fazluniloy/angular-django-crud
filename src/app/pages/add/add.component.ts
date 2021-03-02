import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

profileForm:any;
data:any;
  constructor(private router : Router,
  private http: HttpClient
  ) { 

const navigation = this.router.getCurrentNavigation();
    this.data = navigation.extras.state; 
    console.log(this.data);
  }

  ngOnInit() {
 
   this.profileForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
   if(this.data){
     console.log(this.data['title'])
     this.profileForm.patchValue(
     {
       'title':this.data['title'],
       'description':this.data.description
     })
   }

  }
onSubmit() {
  
  console.log(this.profileForm.value);
  let body = {}
  if(this.data){
 body = {
  'title': this.profileForm.value.title,
  'description': this.profileForm.value.description,
  'id':this.data.id
}

  }else{
 body = {
  'title': this.profileForm.value.title,
  'description': this.profileForm.value.description,
}
  }

  this.http.post<any>('http://127.0.0.1:8000/api/create', JSON.stringify(body)).subscribe(res => {
  this.router.navigate(['home']);
  console.log(res)
  console.log('data')
  },
error => {
         console.log('Error saving!');
        // return throwError(error);
       }
  );
}
backList(){
	this.router.navigate(['home']);
}


}
