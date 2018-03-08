import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {
    // MaterialModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  MatGridListModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatSliderModule,
  MatExpansionModule,
  MatChipsModule,
  MatTableModule,
  MatTooltipModule



} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

const modules = [
    BrowserAnimationsModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatExpansionModule,
    MatChipsModule,
    MatTableModule,
    MatTooltipModule,

    // Flex-layout
    FlexLayoutModule
];

@NgModule({
  imports: [
    CommonModule,
    ...modules
  ],
  declarations: [],
  exports: [...modules]
})
export class MaterialModule { }
