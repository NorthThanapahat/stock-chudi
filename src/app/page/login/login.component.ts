import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router } from '@angular/router';
import { UtilService } from 'src/shared/util/util.service';
import { DataProvider } from 'src/shared/data/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  error = {
    isErr: false,
    username: false,
    password: false
  }
  constructor(private db: AngularFireDatabase,
    private router: Router,
    private util: UtilService,
    public data: DataProvider) {


  }

  ngOnInit() {
    this.username = '';
    this.password = '';

  }

  Login() {
    if (this.username == '') {
      this.error.username = true;
      this.error.isErr = true;
    }
    if (this.password == '') {
      this.error.password = true;
      this.error.isErr = true;
    }

    if (!this.error.isErr) {
      this.util.ShowLoading();
      setTimeout(() => {

        this.db.object('/User/Username').valueChanges().subscribe(username => {
          if (this.username == username) {
            this.db.object('User/Password').valueChanges().subscribe(password => {
              this.util.HideLoading();
              if (this.password == password) {
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigateByUrl('home');
              } else {
                console.log('err');
                this.util.MessageError();
              }


            })
          } else {
            this.util.HideLoading();
            console.log('err');
            this.util.MessageError();
          }
        });
      }, 1000)
    }



  }
}
