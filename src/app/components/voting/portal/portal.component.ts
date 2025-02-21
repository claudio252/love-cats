import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService } from 'src/app/core/services/cat.service';
import { Observable } from 'rxjs';
import { Cat } from 'src/app/shared/model/cat';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { ListComponent } from '../../../shared/components/list/list.component';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule, CardComponent, ListComponent],
  providers: [CatService],
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent {
  cats$!: Observable<Cat[]>;

  constructor(private catService: CatService) {
    this.cats$ = this.catService.getAll();
  }

  vote(cat: Cat) {
    this.catService.voteById(cat.id, cat);
  }
}
