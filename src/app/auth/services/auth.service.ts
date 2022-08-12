import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interface/auth.interface';
import { tap, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  private _auth: Auth | undefined;

  constructor(private http: HttpClient) { }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap(resp => this._auth = resp),
      tap(resp => localStorage.setItem('id', resp.id))
    );
  }

  verifyAuth(): Observable<boolean> {
    if (localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map( auth => {
          this._auth = auth
          return true;
        })
      );
  }

  logout() {
    this._auth = undefined
  }

  get auth(): Auth {
    return {...this._auth!};
  }
}
