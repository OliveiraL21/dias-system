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
import { Menu, MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { HttpClientModule } from '@angular/common/http';
import { Card, CardModule } from 'primeng/card';
import { Table, TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { FieldsetModule } from 'primeng/fieldset';
import { ChartModule } from 'primeng/chart';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [FilterComponent],
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
    MenuModule,
    MenubarModule,
    MegaMenuModule,
    AvatarModule,
    AvatarGroupModule,
    HttpClientModule,
    CardModule,
    TableModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    TagModule,
    InputTextareaModule,
    ConfirmDialogModule,
    FileUploadModule,
    FieldsetModule,
    ChartModule,
    SplitButtonModule,
    DialogModule
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
    MenuModule,
    MegaMenuModule,
    MenubarModule,
    AvatarModule,
    AvatarGroupModule,
    HttpClientModule,
    CardModule,
    TableModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    TagModule,
    InputTextareaModule,
    ConfirmDialogModule,
    FileUploadModule,
    FilterComponent,
    FieldsetModule,
    ChartModule,
    SplitButtonModule,
    DialogModule
  ]
})
export class ShareModuleModule { }
