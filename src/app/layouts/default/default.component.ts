import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  
  sideBarOpen = true;
  constructor(public loader: LoadingService) { }
  loading$: Observable<Boolean>
  ngOnInit(): void {
    this.loading$ = this.loader.loading$;
  }
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
