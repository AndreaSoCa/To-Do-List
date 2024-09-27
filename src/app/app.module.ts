import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TareaFormComponent } from './component/tarea-form/tarea-form.component';
import { TareaListComponent } from './component/tarea-list/tarea-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TareaFormComponent,
    TareaListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
