import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private httpClient: HttpClient,
    private injector: Injector
  ) { }

  /**
   * @returns Generate the http header with token
   */
  // private tokenHeader(filter: iKeyValue[] = []): HttpHeaders {
  //   const auth = this.injector.get(AuthService);
  //   const token = auth.getToken();
  //   if (token) {
  //     if (filter && filter.length > 0) return new HttpHeaders().set('Authorization', 'Bearer ' + token).set('filters', JSON.stringify(filter));
  //     return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  //   } else {
  //     auth.logout();
  //     return null;
  //   }
    
  // }

  // public login(api: string, endPoint: string, body: any): Observable<any> {
    
  //   let headers: HttpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   });

  //   return this.httpClient.post(api + endPoint, body, 
  //     {
  //       headers: headers,
  //       reportProgress: true,
  //       observe: 'body'
  //     }
  //   );
  // }

  /**
   *  This method will be used for calling the post method
   * @param api API String
   * @param endPoint Endpoint String
   * @param body Body that need to passed 
   * @param isToken Boolean value for adding the header with token or not
   * @returns return a stream of values to observer
   */
  // public create(api: string, endPoint: string, body: any, isToken: boolean): Observable<any> {
  //   return this.httpClient.post(api + endPoint, body, {
  //     headers: isToken ? this.tokenHeader() : new HttpHeaders(),
  //     reportProgress: true,
  //     observe: 'body',
  //     withCredentials: true
  //   });
  // }

  /**
   * Used for post with content-type urlencoded
   * @param api 
   * @param endPoint 
   * @param body 
   * @param token 
   * @returns 
   */
  // public createWithFormBody(api: string, endPoint: string, body: any, token: boolean): Observable<any> {
  //   const auth = this.injector.get(AuthService);
    
  //   let headers: HttpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Authorization': token ? ('Bearer ' + auth.getToken()) : ''
  //   });

  //   return this.httpClient.post(api + endPoint, body, 
  //     {
  //       headers: headers,
  //       reportProgress: true,
  //       observe: 'body'
  //     }
  //   );
  // }

  /**
   * This method will be used for calling the get method
   * @param api API String
   * @param endPoint Endpoint String
   * @param isToken Boolean value for adding the header with token or not
   * @returns return a stream of values to observer
   */
   public read(api: string, endPoint: string): Observable<any> {
    return this.httpClient.get(api + endPoint, {
      // headers: isToken ? this.tokenHeader(filter) : new HttpHeaders(),
      reportProgress: true,
      observe: 'body',
      withCredentials: true
    });
  }

  /**
   * This method will be used for calling the put method
   * @param api API String
   * @param endPoint Endpoint String
   * @param body Body that need to passed 
   * @param isToken Boolean value for adding the header with token or not
   * @returns return a stream of values to observer
   */
  // public update(api: string, endPoint: string, body: any, isToken: boolean): Observable<any> {
  //   return this.httpClient.put(api + endPoint, body, {
  //     headers: isToken ? this.tokenHeader() : new HttpHeaders(),
  //     reportProgress: true,
  //     observe: 'body'
  //   })
  // }

  /**
   * This method will be used for calling the delete method
   * @param api API String
   * @param endPoint Endpoint String
   * @param body Body that need to passed 
   * @param isToken Boolean value for adding the header with token or not
   * @returns return a stream of values to observer
   */
  // public delete(api: string, endPoint: string, isToken: boolean, body: any): Observable<any> {
  //   const auth = this.injector.get(AuthService);
  //   let headers: HttpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json; charset=utf8',
  //     'Authorization': isToken ? ('Bearer ' + auth.getToken()) : '',
  //     'object': body ? (typeof body === 'string' ? JSON.parse(body): body): body
  //   });

  //   return this.httpClient.delete(api + endPoint, {
  //     headers: headers,
  //     reportProgress: true,
  //     observe: 'body',
  //     body: body
  //   });

  // }

   /**
   * This method will be used for calling the put method
   * @param api API String
   * @param endPoint Endpoint String
   * @param body Body that need to passed 
   * @param isToken Boolean value for adding the header with token or not
   * @returns return a stream of values to observer
   */
  //  public patch(api: string, endPoint: string, body: any, isToken: boolean): Observable<any> {
  //   return this.httpClient.patch(api + endPoint, body, {
  //     headers: isToken ? this.tokenHeader() : new HttpHeaders(),
  //     reportProgress: true,
  //     observe: 'body'
  //   })
  // }

  /**
   * To read the json from assets/eots/configurations folder
   * @param filename json file name
   * @returns the observable data
  */
  // public readFromJson(filename: string): Observable<any> {
  //   return this.read(
  //     'assets/eots/configurations/',
  //     filename,
  //     false
  //   );
  // }
}
