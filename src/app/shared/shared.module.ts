import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountDatesPipe} from './pipes/countDates';

@NgModule({
  declarations: [
    CountDatesPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CountDatesPipe
  ],
  providers: []
})

export class SharedModule {}
