import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { Cat, Count, initialState, VotingMap } from 'src/app/shared/model/cat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  mostVotedList: BehaviorSubject<Cat[]>;
  currentMostVotedList: Observable<Cat[]>;

  constructor(private httpClient: HttpClient) {
    // We need to initialize local storage
    const data: VotingMap = JSON.parse(
      localStorage.getItem('data') || JSON.stringify(initialState),
    );

    if (Object.keys(data).length === 0) {
      localStorage.setItem('data', JSON.stringify(initialState));
    }

    this.mostVotedList = new BehaviorSubject<Cat[]>([]);
    this.currentMostVotedList = this.mostVotedList.asObservable();
    this.updateMostVoteCats();
  }

  getAll(): Observable<Cat[]> {
    return this.getCount().pipe(
      switchMap((countResponse: Count) => {
        const skip = Math.floor(Math.random() * countResponse.count + 1);
        return this.httpClient
          .get<
            Cat[]
          >(`${environment.apiUrl}cats?limit=${environment.maxResults}&skip=${skip}`)
          .pipe(
            map((response) => {
              return response.map((cat: Cat) => {
                const localCat: Cat | null = this.doesCatAlreadyExists(cat.id);
                return {
                  ...cat,
                  image: `${environment.baseUrl}cat/${cat.id}`,
                  votes: localCat ? localCat.votes : 0,
                };
              });
            }),
          );
      }),
    );
  }

  voteById(id: string, cat: Cat) {
    const data: VotingMap = JSON.parse(localStorage.getItem('data') || '{}');
    cat.votes = cat.votes + 1;
    data[id] = cat;
    localStorage.setItem('data', JSON.stringify(data));
    this.updateMostVoteCats();
  }

  private updateMostVoteCats(): void {
    this.mostVotedList.next(this.getMostVotedCats());
  }

  private getMostVotedCats(): Cat[] {
    const data: VotingMap = JSON.parse(localStorage.getItem('data') || '{}');

    return Object.values(data).sort((a, b) => b.votes - a.votes);
  }

  private getCount(): Observable<Count> {
    return this.httpClient.get<Count>(`${environment.apiUrl}count`);
  }

  private doesCatAlreadyExists(id: string): Cat | null {
    const data: VotingMap = JSON.parse(localStorage.getItem('data') || '{}');

    return data[id];
  }
}
