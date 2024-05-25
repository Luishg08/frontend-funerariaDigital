import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { AdquirirPlanComponent } from './adquirir-plan/adquirir-plan.component';

@NgModule({
  declarations: [
    AdquirirPlanComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule
  ]
})
export class ParametrosModule { }
