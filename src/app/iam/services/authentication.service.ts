import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {SignUpRequest} from "../model/sign-up.request";
import {SignUpResponse} from "../model/sign-up.response";
import {SignInRequest} from "../model/sign-in.request";
import {SignInResponse} from "../model/sign-in.response";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  basePath: string = `${environment.serverBasePath}`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })};

  // Incluir el token JWT en las solicitudes
  fetchData() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible');
      return;
    }

    fetch('https://tu-api.com/data', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos:', data);
      })
      .catch(error => console.error('Error:', error));
  }

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router, private http: HttpClient) { }


  get isSignedIn() {
    return this.signedIn.asObservable();
  }

  get currentUserId() {
    return this.signedInUserId.asObservable();
  }

  get currentUsername() {
    return this.signedInUsername.asObservable();
  }

  /**
   * Sign up a new user
   * @param signUpRequest - The sign-up request containing the username and password
   * @returns - The sign-up response containing the user id and username
   */
  signUp(signUpRequest: SignUpRequest) {
    return this.http.post<SignUpResponse>(`${this.basePath}/authentication/sign-up`, signUpRequest, this.httpOptions)
      .subscribe( {
        next: (response) => {
          console.log(`Signed up as ${response.username} with id ${response.id}`);
          this.router.navigate(['/sign-in']).then();
        },
        error: (error) => {
          console.error(`Error while signing up: ${error}`);
          this.router.navigate(['/sign-up']).then();
        }
      });
  }

  /**
   * Sign in an existing user
   * @param signInRequest - The sign-in request containing the username and password
   * @returns - The sign-in response containing the user id, username, and token
   */
  signIn(signInRequest: SignInRequest) {
    console.log(signInRequest);
    return this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          this.signedIn.next(true);
          this.signedInUserId.next(response.id);
          this.signedInUsername.next(response.username);
          localStorage.setItem('token', response.token);
          console.log(`Signed in as ${response.username} with token ${response.token}`);
          this.router.navigate(['/']).then();
        },
        error: (error) => {
          console.error(`Error while signing in: ${error}`);
          this.signedIn.next(false);
          this.signedInUserId.next(0);
          this.signedInUsername.next('');
          localStorage.removeItem('token');
          this.router.navigate(['/sign-in']).then();
        }
      });
  }

  /**
   * Sign out the current user
   */
  signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInUsername.next('');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']).then();
  }

}
