import { Input, NgModule } from '@angular/core';
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
import { InputTextComponent } from 'src/app/components/input-text/input-text.component';
import { CustomButtonComponent } from 'src/app/components/custom-button/custom-button.component';
import { CustomFileComponent } from 'src/app/components/custom-file/custom-file.component';
import { CustomFormComponent } from 'src/app/components/custom-form/custom-form.component';
import { CustomTableComponent } from 'src/app/components/custom-table/custom-table.component';
import { InputNumberComponent } from 'src/app/components/input-number/input-number.component';
import { InputPasswordComponent } from 'src/app/components/input-password/input-password.component';
import { SelectComponent } from 'src/app/components/select/select.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { SpeedDialModule } from 'primeng/speeddial';
import { TieredMenuModule } from 'primeng/tieredmenu';

@NgModule({
  declarations: [
    FilterComponent,
    InputTextComponent,
    SelectComponent,
    InputPasswordComponent,
    CustomButtonComponent,
    CustomTableComponent,
    CustomFormComponent,
    InputNumberComponent,
    CustomFileComponent,

  ],
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
    DialogModule,
    MegaMenuModule,
    FloatLabelModule,
    InputNumberModule,
    SpeedDialModule,
    TieredMenuModule,
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
    DialogModule,
    MegaMenuModule,
    InputTextComponent,
    SelectComponent,
    InputPasswordComponent,
    CustomButtonComponent,
    CustomTableComponent,
    CustomFormComponent,
    InputNumberComponent,
    CustomFileComponent,
    FloatLabelModule,
    InputNumberModule,
    SpeedDialModule,
    TieredMenuModule,
  ]
})
export class ShareModuleModule { }
