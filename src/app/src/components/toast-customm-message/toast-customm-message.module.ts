import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastCustommMessageComponent } from './toast-customm-message.component';
import { ShareModuleModule } from '../../common/share-module/share-module.module';



@NgModule({
  declarations: [ToastCustommMessageComponent],
  imports: [
    ShareModuleModule
  ],
  exports: [
    ToastCustommMessageComponent
  ]
})
export class ToastCustommMessageModule { }
