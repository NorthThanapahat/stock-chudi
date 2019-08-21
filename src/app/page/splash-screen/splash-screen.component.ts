import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from 'src/shared/data/data';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {
  
  constructor(private router : Router) { }

  ngOnInit() {
    setTimeout(()=>{
      this.router.navigateByUrl('login');
    },2000);
  }

}
