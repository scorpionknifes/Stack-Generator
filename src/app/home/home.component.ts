import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  public stackName: string = ""
  public stackNames: string[] = ["", "", "", ""];

  @ViewChildren(SpinnerComponent) private spinners!: QueryList<SpinnerComponent>

  constructor(private stackService: StacksService) { }
  ngOnInit(): void {
    this.stackOne$ = this.stackService.getStackOne();
    this.stackTwo$ = this.stackService.getStackTwo();
    this.stackThree$ = this.stackService.getStackThree();
    this.stackFour$ = this.stackService.getStackFour();

    this.stackService.init();
  }

  async spin(): Promise<void> {
    for (const spinner of this.spinners.toArray()) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      spinner.spin();
    }
  }

  insertResult(name: string, num: number): void {
    this.stackNames[num] = name;

    this.stackName = "Generated Stack: " + this.stackNames.map(s => s[0]).join("");
  }
}
