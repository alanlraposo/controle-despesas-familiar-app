import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data, Router } from '@angular/router';
import { NgForm } from '@angular/forms';


import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DescricaoUsuario } from 'src/app/model/descricao-usuario';
@Component({
  selector: 'app-cadastro-u',
  templateUrl: './cadastro-u.component.html',
  styleUrls: ['./cadastro-u.component.css']
})

export class CadastroUComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  usuario!: Usuario;

  editar = false;

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  descricaoUsuarios: DescricaoUsuario[] = [
    {descricao: 'Pai'},
    {descricao: 'Mãe'},
    {descricao: 'Filho'},
  ];

  constructor(public route: ActivatedRoute, public router: Router, private _usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.usuario = new Usuario(0, '', '', '', 0);
    this.usuario.id = this.route.snapshot.params['id'];
    this.usuario.nome = this.route.snapshot.params['nome'];
    this.usuario.cpf = this.route.snapshot.params['cpf'];
    this.usuario.descricao = this.route.snapshot.params['descricao'];
    this.usuario.dataInclusao = this.route.snapshot.params['dataInclusao'];

    if(this.usuario.id != null){
      this.editar = true;
    } else {
      this.usuario.id = new Date().getTime();
      this.usuario.dataInclusao = new Date().getTime();
    }
  }

  voltarLista() {
    this.router.navigate(['/usuario']);
  }

  salvar() {
    console.log("salvar");

    if(this.editar){

      console.log("atualizar");
      let self = this;
      let myPromise = new Promise(function(myResolve, myReject) {
          self._usuarioService.update(self.usuario.id, self.usuario).subscribe(
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
          self.isShowMessage = true;
          self.isSuccess = true;
          self.message = 'Atualizado com sucesso!';
        },
        function(error) {
          self.isShowMessage = true;
          self.isSuccess = false;
          self.message = 'Erro ao atualizar o usuário!';
        }
      );

    } else {

      console.log("cadastrar");
      let self = this;
      let myPromise = new Promise(function(myResolve, myReject) {
        self._usuarioService.save(self.usuario).subscribe(
          receita => {
            myResolve("OK");
          },
          err => {
            myReject("Error");
          }
        );
      });

      myPromise.then(
        function(value) {
          self.isShowMessage = true;
          self.isSuccess = true;
          self.message = 'Cadastrado com sucesso!';
        },
        function(error) {
          self.isShowMessage = true;
          self.isSuccess = false;
          self.message = 'Erro ao cadastrar o usuário!';
        }
      );
    }

    this.form.reset();
    this.editar = false;
    this.usuario.id = new Date().getTime();
    this.usuario.dataInclusao = new Date().getTime();
  }

  cadastrar(){

  }

  atualizar(){

  }
}

