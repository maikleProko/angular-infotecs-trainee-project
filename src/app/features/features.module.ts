import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonButtonComponent } from "./components/common-button";
import { InputImageComponent } from "./components/input-image";
import { InputTextComponent } from "./components/input-text";
import { OutputImageComponent } from "./components/output-image";
import { OutputTextComponent } from "./components/output-text";
import { RollingComponent } from "./components/rolling";

@NgModule({
  declarations: [
    CommonButtonComponent,
    InputImageComponent,
    InputTextComponent,
    OutputImageComponent,
    OutputTextComponent,
    RollingComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    CommonButtonComponent,
    InputImageComponent,
    InputTextComponent,
    OutputImageComponent,
    OutputTextComponent,
    RollingComponent
  ]
})
export class FeaturesModule { }
