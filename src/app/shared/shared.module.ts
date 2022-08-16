import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SpinnerComponent } from './component/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { SendNotiDialogComponent } from './component/send-noti-dialog/send-noti-dialog.component';
import { LineChartComponent } from './widgets/line-chart/line-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { PieChartComponent } from './widgets/pie-chart/pie-chart.component';
import { ErrorPageComponent } from './component/error-page/error-page.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ConfirmDialogComponent,
    SpinnerComponent,
    SendNotiDialogComponent,
    ErrorPageComponent,
    LineChartComponent,
    PieChartComponent,
    
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FlexLayoutModule,
    MatListModule,
    RouterModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    HighchartsChartModule

    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SpinnerComponent,
    ErrorPageComponent,
    LineChartComponent,
    PieChartComponent,
    
    
  ]
})
export class SharedModule { }
