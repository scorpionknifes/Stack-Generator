import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Stack } from 'src/app/services/stacks.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [

  ]
})
export class SpinnerComponent implements OnInit {

  @Input() stacks: Stack[] | null = [];
  @Output() result = new EventEmitter<Stack>();
  @ViewChild("door") door!: ElementRef;

  private spinned: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.init();
  }

  getBoxes(): any {
    return this.door.nativeElement.querySelector(".boxes");
  }


  async spin(): Promise<void> {
    this.init(false, 1, 2);
    this.getBoxes().style.transform = "translateY(0)";
  }

  init(firstInit = true, groups = 1, duration = 1): void {
    if (firstInit) {
      this.spinned = false
    } else if (this.spinned) {
      return;
    }

    const boxesClone: HTMLElement = this.getBoxes().cloneNode(false);

    const pool: Stack[] = [{ name: "❓", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png", url: "" }];
    if (!firstInit) {
      const arr = [];
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...this.stacks ?? []);
      }
      pool.push(...this.shuffle(arr));

      boxesClone.addEventListener(
        "transitionstart",
        () => {
          console.log("transitionstart");
          this.spinned = true
          this.getBoxes().querySelectorAll(".box").forEach((box: HTMLElement) => {
            box.style.filter = "blur(1px)";
          });
        },
        { once: true }
      );

      boxesClone.addEventListener(
        "transitionend",
        () => {
          console.log("transitionend");
          this.getBoxes().querySelectorAll(".box").forEach((box: HTMLElement, index: number) => {
            box.style.filter = "blur(0)";
            console.log(this.getBoxes())
            if (index > 0) this.getBoxes().removeChild(box);
          });
        },
        { once: true }
      );
    }

    for (let i = pool.length - 1; i >= 0; i--) {
      console.log(i)
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.width = this.door.nativeElement.clientWidth + "px";
      box.style.height = this.door.nativeElement.clientHeight + "px";
      const img = document.createElement("img")
      img.style.maxWidth = "100%";
      img.src = pool[i].image;
      box.appendChild(img);
      boxesClone.appendChild(box);
    }
    boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
    boxesClone.style.transform = `translateY(-${this.door.nativeElement.clientHeight * (pool.length - 1)}px)`;
    this.door.nativeElement.replaceChild(boxesClone, this.getBoxes());
    console.log(this.getBoxes())
    this.result.emit(pool[pool.length - 1]);

    // boxesClone.dispatchEvent(new Event('transitionstart'));
    // boxesClone.dispatchEvent(new Event('transitionend'));
  }

  shuffle([...stack]: Stack[]): Stack[] {
    let m = stack.length
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [stack[m], stack[i]] = [stack[i], stack[m]];
    }
    return stack;
  }
}
