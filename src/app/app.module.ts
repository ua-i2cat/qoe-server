import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';

import { QoeCreateComponent } from './components/qoe-create/qoe-create.component';
import { SessionListComponent } from './components/session-list/session-list.component';
import { SessionGraphComponent } from './components/session-graph/session-graph.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'session-list' },
  { path: 'create-qoe', component: QoeCreateComponent },
  { path: 'session-list', component: SessionListComponent },
  { path: 'session-graph', component: SessionGraphComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    QoeCreateComponent,
    SessionListComponent,
    SessionGraphComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  exports: [RouterModule],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
