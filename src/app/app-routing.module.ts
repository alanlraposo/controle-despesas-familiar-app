import { CadastroComponent } from './lancamento/cadastro/cadastro.component';
import { ListaComponent } from './lancamento/lista/lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path:'', component:  HomeComponent},
  { path:'lancamento', component: ListaComponent },
  { path:'lancamento/cadastro', component: CadastroComponent },
  { path:'lancamento/cadastro/:id/:usuario/:tipo/:descricao/:valor/:forma', component: CadastroComponent },
  { path:'usuario', component: UsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
