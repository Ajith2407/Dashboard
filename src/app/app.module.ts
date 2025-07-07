import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { VerificationComponent } from './verification/verification.component';
import { DataReportComponent } from './data-report/data-report.component';
import { ResultComponent } from './result/result.component';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ChartModule } from 'primeng/chart';

import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TabledataComponent } from './tabledata/tabledata.component';
import { BarchartComponent } from './barchart/barchart.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'enrollment', component: EnrollmentComponent },
      { path: 'verification', component: VerificationComponent },
      { path: 'data-report', component: DataReportComponent },
      { path: 'result', component: ResultComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    EnrollmentComponent,
    VerificationComponent,
    DataReportComponent,
    ResultComponent,
    SidebarComponent,
    LayoutComponent,
    NavbarComponent,
    TabledataComponent,
    BarchartComponent,
    FooterComponent,
  ],
  imports: [BrowserModule,CanvasJSAngularChartsModule,RouterModule.forRoot(routes), FormsModule, ChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
