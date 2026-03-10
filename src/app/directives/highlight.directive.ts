import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Transaction } from '../models/models';

@Directive({
  selector: '[appOverdueHighlight]'
})
export class OverdueHighlightDirective implements OnInit {
  @Input('appOverdueHighlight') transaction!: Transaction;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.transaction?.status === 'overdue') {
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #f44336');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff8f8');
    }
  }
}

// PopularBook Directive
import { Directive as Dir2, ElementRef as ElRef2, Input as Inp2, OnInit as OI2, Renderer2 as R2 } from '@angular/core';
import { Book } from '../models/models';

@Directive({
  selector: '[appPopularBook]'
})
export class PopularBookDirective implements OI2 {
  @Inp2('appPopularBook') book!: Book;

  constructor(private el: ElRef2, private renderer: R2) {}

  ngOnInit(): void {
    if (this.book?.isPopular) {
      this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 0 0 2px #ff9800');
    }
  }
}
