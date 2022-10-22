import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
    
   }

   getConnectedNodes() {
    this.http.get(environment.server.peerDiscover.connectedPeers).subscribe((obs)=>{ console.log(obs)})
   }
}
