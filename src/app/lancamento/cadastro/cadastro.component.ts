import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Lancamento } from 'src/app/model/lancamento';
import { LancamentoStorageService } from '../lancamento-storage-service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [ LancamentoStorageService ]
})

export class CadastroComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  lancamento!: Lancamento;

  editar = false;

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(public route: ActivatedRoute, public router: Router, private lancamentoService: LancamentoStorageService) {
  }

  ngOnInit(): void {
    this.lancamento = new Lancamento(0, '', '', '', 0, '');
    this.lancamento.id = this.route.snapshot.params['id'];
    this.lancamento.usuario = this.route.snapshot.params['usuario'];
    this.lancamento.tipo = this.route.snapshot.params['tipo'];
    this.lancamento.descricao = this.route.snapshot.params['descricao'];
    this.lancamento.valor = this.route.snapshot.params['valor'];
    this.lancamento.forma = this.route.snapshot.params['forma'];

    if(this.lancamento.id != null){
      this.editar = true;
    } else {
      this.lancamento.id = Math.floor((Math.random()*1000000)+1);
    }
  }

  voltarLista() {
    this.router.navigate(['/lancamento']);
  }

  cadastrar() {
    console.log("cadastrar");

    this.lancamento = new Lancamento(this.lancamento.id, this.lancamento.usuario, this.lancamento.tipo, this.lancamento.descricao, this.lancamento.valor, this.lancamento.forma);

    if(this.editar){
      this.lancamentoService.update(this.lancamento);
      this.message = 'Editado com sucesso!';
    } else {
      this.lancamentoService.save(this.lancamento);
      this.message = 'Cadastro realizado com sucesso!';
    }

    this.isSubmitted = true;
    this.isShowMessage = true;
    this.isSuccess = true;
    this.form.reset();
    this.lancamento.id = Math.floor((Math.random()*1000000)+1);
  }
}
