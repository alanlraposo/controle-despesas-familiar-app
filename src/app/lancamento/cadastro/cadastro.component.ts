import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {
  id!: number;
  usuario!: string;
  tipo!: string;
  descricao!: string;
  valor!: number;
  forma!: string;
  constructor(public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.usuario = this.route.snapshot.params['usuario'];
    this.tipo = this.route.snapshot.params['tipo'];
    this.descricao = this.route.snapshot.params['descricao'];
    this.valor = this.route.snapshot.params['valor'];
    this.forma = this.route.snapshot.params['forma'];
  }
}
