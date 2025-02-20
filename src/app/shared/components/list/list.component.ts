import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from "../list-item/list-item.component";
import { CatService } from 'src/app/core/services/cat.service';
import { Observable } from 'rxjs';
import { Cat } from '../../model/cat';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ListItemComponent
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  mostVotedCats$: Observable<Cat[]>;
  
  constructor(private catService: CatService) {
    this.mostVotedCats$ = this.catService.currentMostVotedList;
  }
}
