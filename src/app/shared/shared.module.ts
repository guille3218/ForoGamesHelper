import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { icons } from './icons/icons';
import { DialogComponent } from './dialog/dialog.component';
import { TranslocoModule } from '@ngneat/transloco';
import { DemoMaterialModule } from '../material-module';


@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TranslocoModule,
    DemoMaterialModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class SharedModule {

  constructor(private readonly library: FaIconLibrary) {

    this.library.addIcons(...icons);

  }
}
