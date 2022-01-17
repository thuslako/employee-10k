import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
  }
  copyright = this.sanitizer.bypassSecurityTrustHtml(`&copy;${(new Date).getFullYear()} Cafe 10K`)

}
