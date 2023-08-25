import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonButtonComponent } from "./components/common-button";
import { InputImageComponent } from "./components/input-image";
import { InputTextComponent } from "./components/input-text";
import { OutputImageComponent } from "./components/output-image";
import { OutputTextComponent } from "./components/output-text";

@NgModule({
  declarations: [
    CommonButtonComponent,
    InputImageComponent,
    InputTextComponent,
    OutputImageComponent,
    OutputTextComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    CommonButtonComponent,
    InputImageComponent,
    InputTextComponent,
    OutputImageComponent,
    OutputTextComponent
  ]
})
export class FeaturesModule { }
