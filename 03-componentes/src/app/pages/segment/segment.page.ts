import { Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/interfaces/hero.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  // public superHeroes!: Observable<Hero[]>;
  public superHeroes = signal<Hero[]>([]);
  public segmentValue = signal("");
  public showSkeleton = signal(true);

  private dataService: DataService = inject(DataService);

  ngOnInit() {
    // this.superHeroes = this.dataService.getHeroes();
    this.dataService.getHeroes()
      .subscribe(
        data => {
          this.superHeroes.set(data)
          this.showSkeleton.set(false);
        }
      );
  }

  segmentChanged( ev: any ) {
    this.segmentValue.set(ev.detail.value);

  }

}
