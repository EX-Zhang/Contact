import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Angular2SmartTableModule } from 'angular2-smart-table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { EmailInputComponent } from './contact/email-input.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactComponent,
        EmailInputComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        Angular2SmartTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
