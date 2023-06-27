import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lancamento } from '../model/lancamento';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private url = "http://localhost:3000/lancamento";

  constructor(private _httpClient: HttpClient) {  }

  getLancamentos(): Observable<Lancamento[]>{
    console.log("LancamentoService:getLancamentos");
    return this._httpClient.get<Lancamento[]>(this.url);
  }

  save(lancamento: Lancamento):Observable<Lancamento[]>{
    console.log("LancamentoService:save");
    return this._httpClient.post<Lancamento[]>(this.url, lancamento);
  }

  update(id:number, lancamento: Lancamento):Observable<Lancamento[]>{
    console.log("LancamentoService:update");
    const urlAtualizar = `${this.url}/${id}`;
    return this._httpClient.put<Lancamento[]>(urlAtualizar, lancamento);
  }

  delete(id:number):Observable<Lancamento[]>{
    console.log("LancamentoService:delete");
    const urlDeletar = `${this.url}/${id}`;
    return this._httpClient.delete<Lancamento[]>(urlDeletar);
  }
}
