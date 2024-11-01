import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { User } from '../../interfaces/user.interface';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {

  public usuarios: User[] = [];
  private dataService: DataService = inject(DataService);
  private subscription?: Subscription;

  @ViewChild(IonList) ionList?: IonList;

  ngOnInit() {
    this.subscription = this.dataService.getUsuario()
      .pipe(
        tap( data => this.usuarios = data)
      )
      .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  favourite(user: any){
    console.log("favourite", user);
    this.ionList?.closeSlidingItems();
  }

  share(user: any){
    console.log("favourite", user);
    this.ionList?.closeSlidingItems();
  }

  del(user: any){
    this.usuarios = this.usuarios.filter(u => u !== user);
    this.ionList?.closeSlidingItems();
  }

}
