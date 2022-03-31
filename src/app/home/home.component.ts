import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { Stack, StacksService } from '../services/stacks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public stackOne$!: Observable<Stack[]>
  public stackTwo$!: Observable<Stack[]>
  public stackThree$!: Observable<Stack[]>
  public stackFour$!: Observable<Stack[]>

  @ViewChild(SpinnerComponent) private spinner!: SpinnerComponent

  constructor(private stackService: StacksService) { }
  ngOnInit(): void {
    this.stackOne$ = this.stackService.getStackOne();
    this.stackTwo$ = this.stackService.getStackTwo();
    this.stackThree$ = this.stackService.getStackThree();
    this.stackFour$ = this.stackService.getStackFour();

    this.stackService.init();
  }

  spin(): void {
    this.spinner.spin();
  }
}
