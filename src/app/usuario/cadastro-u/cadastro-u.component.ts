import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data, Router } from '@angular/router';
import { NgForm } from '@angular/forms';


import { UsuarioStorageService } from '../usuario-storage-service';
import { Usuario } from 'src/app/model/usuario';
import { DescricaoUsuario } from 'src/app/model/descricao-usuario';


@Component({
  selector: 'app-cadastro-u',
  templateUrl: './cadastro-u.component.html',
  styleUrls: ['./cadastro-u.component.css'],
  providers: [ UsuarioStorageService ],
})

export class CadastroUComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  usuario!: Usuario;

  editar = false;

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  //descricoes: DescricaoUsuario[] = [{descricao: 'Pai'}, {descricao: 'Mãe'}, {descricao: 'Filho/Filha'}];

  constructor(public route: ActivatedRoute, public router: Router, private usuarioService: UsuarioStorageService) {
  }

  ngOnInit(): void {
    this.usuario = new Usuario(0, '', '', '');
    this.usuario.id = this.route.snapshot.params['id'];
    this.usuario.nome = this.route.snapshot.params['nome'];
    this.usuario.cpf = this.route.snapshot.params['cpf'];
    this.usuario.descricao = this.route.snapshot.params['descricao'];

    if(this.usuario.id != null){
      this.editar = true;
    } else {
      this.usuario.id = Math.floor((Math.random()*1000000)+1);
    }
  }

  voltarLista() {
    this.router.navigate(['/usuario']);
  }

  cadastrar() {
    console.log("cadastrar");

    this.usuario = new Usuario(this.usuario.id, this.usuario.nome, this.usuario.cpf, this.usuario.descricao);

    if(this.editar){
      this.usuarioService.update(this.usuario);
      this.message = 'Editado com sucesso!';
    } else {
      this.usuarioService.save(this.usuario);
      this.message = 'Cadastro realizado com sucesso!';
    }

    this.isSubmitted = true;
    this.isShowMessage = true;
    this.isSuccess = true;
    this.form.reset();
    this.usuario.id = Math.floor((Math.random()*1000000)+1);
  }
}

