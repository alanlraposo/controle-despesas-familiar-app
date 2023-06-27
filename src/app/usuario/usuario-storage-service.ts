import { BehaviorSubject, Observable } from 'rxjs';

import { Constants } from 'src/app/util/constants';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { Usuario } from '../model/usuario';

@Injectable()
export class UsuarioStorageService {

  usuarios!: Usuario[];
  private usuarioSource!: BehaviorSubject<number>;

  constructor() {
    this.usuarios = WebStorageUtil.get(Constants.KEY_USUARIOS);
    this.usuarioSource = new BehaviorSubject<number>(this.usuarios.length);
  }

  save(usuario: Usuario) {
    this.usuarios = WebStorageUtil.get(Constants.KEY_USUARIOS);
    this.usuarios.push(usuario);
    WebStorageUtil.set(Constants.KEY_USUARIOS, this.usuarios);
  }

  update(usuario: Usuario) {
    this.usuarios = WebStorageUtil.get(Constants.KEY_USUARIOS);
    console.log(usuario.id)
    this.delete(usuario);
    this.save(usuario);
  }

  delete(usuario: Usuario): boolean {
    this.usuarios = WebStorageUtil.get(Constants.KEY_USUARIOS);
    var newUsuarios: Usuario[] = [];
    this.usuarios.forEach(u => {
      if (u.id != usuario.id){
        newUsuarios.push(u);
      }
    });

    WebStorageUtil.set(Constants.KEY_USUARIOS, newUsuarios);
    return true;
  }

  getUsuarios(): Usuario[] {
    this.usuarios = WebStorageUtil.get(Constants.KEY_USUARIOS);
    return this.usuarios;
  }

  notifyTotalUsers() {
    this.usuarioSource.next(this.getUsuarios()?.length);
  }

  asObservable(): Observable<number> {
    return this.usuarioSource;
  }
}
