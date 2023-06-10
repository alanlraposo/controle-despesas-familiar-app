import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  @Input() lancamento!: {
    id: any;
    usuario: any;
    tipo: any;
    descricao: any;
    valor: any;
    forma: any;
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
