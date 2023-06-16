import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';

import { UsuarioStorageService } from '../usuario-storage-service';
import { Usuario } from 'src/app/model/usuario';
import { Shared } from 'src/app/util/shared';

@Component({
  selector: 'app-lista-u',
  templateUrl: './lista-u.component.html',
  styleUrls: ['./lista-u.component.css'],
  providers: [ UsuarioStorageService ],
})
export class ListaUComponent implements OnInit {

  usuarios?: Usuario[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(public router: Router, private usuarioService: UsuarioStorageService) {
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.usuarios = this.usuarioService.getUsuarios();
  }

  adicionarUsuario() {
    this.router.navigate(['/usuario/cadastro']);
  }

  editarUsuario(usuario: {id: number; nome: any; cpf: any; descricao: any;}): void {
    this.router.navigate(['/usuario/cadastro', usuario.id, usuario.nome, usuario.cpf, usuario.descricao]);
  }

  deletarUsuario(usuario: {id: number; nome: any; cpf: any; descricao: any; }): void {
    let dialogo = confirm("Deseja realmente excluir o usuário #" + usuario.id +"?");
    if (dialogo) {
      let response: boolean = this.usuarioService.delete(usuario);
      this.isShowMessage = true;
      this.isSuccess = response;
      if (response) {
        this.message = 'O usuário foi excluido com sucesso!';
      } else {
        this.message = 'Erro ao excluior o usuário!';
      }
      this.usuarios = this.usuarioService.getUsuarios();
    }
  }
}
