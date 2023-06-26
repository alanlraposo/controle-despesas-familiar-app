import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//HOME
import { HomeComponent } from './home/home.component';

//LANCAMENTO
import { ListaComponent } from './lancamento/lista/lista.component';
import { CadastroComponent } from './lancamento/cadastro/cadastro.component';

//USUARIO
import { ListaUComponent } from './usuario/lista-u/lista-u.component';
import { CadastroUComponent } from './usuario/cadastro-u/cadastro-u.component';

//PAGINA NAO ENCONTRADA
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  //HOME
  { path:'', component:  HomeComponent},

  //LANCAMENTO
  { path:'lancamento', component: ListaComponent },
  { path:'lancamento/cadastro', component: CadastroComponent },
  { path:'lancamento/cadastro/:id/:usuario/:tipo/:descricao/:valor/:forma/:dataInclusao', component: CadastroComponent },

  //USUARIO
  { path:'usuario', component: ListaUComponent },
  { path:'usuario/cadastro', component: CadastroUComponent },
  { path:'usuario/cadastro/:id/:nome/:cpf/:descricao/:dataInclusao', component: CadastroUComponent },

  //PAGINA NAO ENCONTRADA
  { path:'**', pathMatch:'full',  component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
