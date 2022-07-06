import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  loading$ = this.loader.loading$;
  sideBarOpen = true;
  constructor(public loader: LoadingService) { }

  ngOnInit(): void {
  }
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
