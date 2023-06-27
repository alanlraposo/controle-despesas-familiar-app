import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';

import { UsuarioStorageService } from '../usuario-storage-service';
import { Usuario } from 'src/app/model/usuario';
import { Shared } from 'src/app/util/shared';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-lista-u',
  templateUrl: './lista-u.component.html',
  styleUrls: ['./lista-u.component.css'],
})
export class ListaUComponent implements OnInit {

  usuarios!: Usuario[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(public router: Router, private _usuarioService: UsuarioService) {
    this.carregarUsuarios();
  }

  ngOnInit(): void {
  }

  carregarUsuarios(){
    let self = this;
    let myPromise = new Promise(function(myResolve, myReject) {
      self._usuarioService.getUsuarios().subscribe(
        listaUsuarios => {
          self.usuarios = listaUsuarios.map(
            item=>{
              return new Usuario(item.id, item.nome, item.cpf, item.descricao, item.dataInclusao);
            }
          );
          myResolve("OK");
        },
        err => {
          myReject("Error");
        }
      );
    });
    myPromise.then(
      function(value) {
        console.log("Sucesso ao coletar dados da API");
      },
      function(error) {
        console.log("Erro ao coletar a lista de usuários da API!")
      }
    );
  }

  adicionarUsuario() {
    this.router.navigate(['/usuario/cadastro']);
  }

  editarUsuario(usuario: {id: number; nome: any; cpf: any; descricao: any; dataInclusao: number}): void {
    this.router.navigate(['/usuario/cadastro', usuario.id, usuario.nome, usuario.cpf, usuario.descricao, usuario.dataInclusao]);
  }

  deletarUsuario(usuario: {id: number; nome: any; cpf: any; descricao: any; dataInclusao: number}) : void {
    let dialogo = confirm("Deseja realmente excluir o usuário #" + usuario.id +"?");
    if (dialogo) {
      let self = this;
      let myPromise = new Promise(function(myResolve, myReject) {
        self._usuarioService.delete(usuario.id).subscribe(
          usuario => {
            myResolve("OK");
          },
          err => {
            myReject("Error");
          }
        );
      });

      myPromise.then(
        function(value) {
          for (let i = 0; i < self.usuarios.length; i++) {
            if (self.usuarios[i].id == usuario.id) {
              self.usuarios.splice(i, 1);
            }
          }

          self.isShowMessage = true;
          self.isSuccess = true;
          self.message = 'O usuário foi excluido com sucesso!';
        },

        function(error) {
          self.isShowMessage = true;
          self.isSuccess = false;
          self.message = 'Erro ao excluir o usuário!';
        }
      );
    }
  }
}
