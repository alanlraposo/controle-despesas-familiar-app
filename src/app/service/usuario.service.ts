import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = "http://localhost:3000/usuario";

  constructor(private _httpClient: HttpClient) {  }

  getUsuarios(): Observable<Usuario[]>{
    console.log("UsuarioService:getUsuarios");
    return this._httpClient.get<Usuario[]>(this.url);
  }

  save(usuario: Usuario):Observable<Usuario[]>{
    console.log("UsuarioService:save");
    return this._httpClient.post<Usuario[]>(this.url, usuario);
  }

  update(id:number, usuario: Usuario):Observable<Usuario[]>{
    console.log("UsuarioService:update");
    const urlAtualizar = `${this.url}/${id}`;
    return this._httpClient.put<Usuario[]>(urlAtualizar, usuario);
  }

  delete(id:number):Observable<Usuario[]>{
    console.log("UsuarioService:delete");
    const urlDeletar = `${this.url}/${id}`;
    return this._httpClient.delete<Usuario[]>(urlDeletar);
  }
}
