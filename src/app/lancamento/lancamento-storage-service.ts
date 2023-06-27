import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { Constants } from 'src/app/util/constants';
import { Lancamento } from '../model/lancamento';

@Injectable()
export class LancamentoStorageService {

  lancamentos!: Lancamento[];
  private lancamentoSource!: BehaviorSubject<number>;

  constructor() {
    this.lancamentos = WebStorageUtil.get(Constants.KEY_LANCAMENTOS);
    this.lancamentoSource = new BehaviorSubject<number>(this.lancamentos.length);
  }

  save(lancamento: Lancamento) {
    this.lancamentos = WebStorageUtil.get(Constants.KEY_LANCAMENTOS);
    this.lancamentos.push(lancamento);
    WebStorageUtil.set(Constants.KEY_LANCAMENTOS, this.lancamentos);
  }

  update(lancamento: Lancamento) {
    this.lancamentos = WebStorageUtil.get(Constants.KEY_LANCAMENTOS);
    console.log(lancamento.id)
    this.delete(lancamento);
    this.save(lancamento);
  }

  delete(lancamento: Lancamento): boolean {
    this.lancamentos = WebStorageUtil.get(Constants.KEY_LANCAMENTOS);
    var newLancamentos: Lancamento[] = [];
    this.lancamentos.forEach(l => {
      if (l.id != lancamento.id){
        newLancamentos.push(l);
      }
    });

    WebStorageUtil.set(Constants.KEY_LANCAMENTOS, newLancamentos);
    return true;
  }

  getLancamentos(): Lancamento[] {
    this.lancamentos = WebStorageUtil.get(Constants.KEY_LANCAMENTOS);
    return this.lancamentos;
  }
}
