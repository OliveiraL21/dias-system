import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Tarefa } from 'src/app/models/tarefa/tarefa';


@Component({
  selector: 'app-button-tired-menu',
  templateUrl: './button-tired-menu.component.html',
  styleUrl: './button-tired-menu.component.css'
})


export class ButtonTiredMenuComponent {

  @Input() selectedTarefa: Tarefa | null = null;;
  @Input() finalizarSplitButtonItems: MenuItem[] = [];
  @Output() openPopupEmitter: EventEmitter<any> = new EventEmitter();

  openPopupTarefa(event: MouseEvent, menu: any) {
    this.openPopupEmitter.emit({ event: event, menu: menu });
  }
}
