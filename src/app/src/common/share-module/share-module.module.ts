import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { StyleClassModule } from 'primeng/styleclass';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    StyleClassModule,
    CheckboxModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule,
    BlockUIModule,
    HttpClientModule
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    StyleClassModule,
    CheckboxModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule,
    BlockUIModule,
    HttpClientModule
  ]
})
export class ShareModuleModule { }
