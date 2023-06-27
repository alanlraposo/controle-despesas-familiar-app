import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  tituloCabecalho = "Controle de despesas familiar";
  classCssHeader = "header";
  classCssHeaderLogo = "header-logo";
  classCssHeaderTitulo = "header-titulo";
}
