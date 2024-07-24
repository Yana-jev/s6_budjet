import { Component, inject } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudjetService } from '../services/budjet.service';
import { BudjetListComponent } from '../budjet-list/budjet-list.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Validators } from '@angular/forms';
import { Ilist, Service } from '../ilist';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomeComponent, ReactiveFormsModule, PanelComponent, BudjetListComponent, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  
  budgetForm: FormGroup;
  presupuesto: number = 0;
  costeTotal: number = 0;
  services: Service[];

  formBuild = inject(FormBuilder);
  budgetService = inject(BudjetService);
  router = inject(Router);

  constructor() {
    this.budgetForm = this.budgetService.initializeBudgetForm(this.formBuild);
    this.services = this.budgetService.services;
    this.budgetForm = this.budgetService.initializeBudgetForm(this.formBuild);
    this.budgetForm.addControl('nombre', this.formBuild.control(''));
    this.budgetForm.addControl('telefono', this.formBuild.control(''));
    this.budgetForm.addControl('email', this.formBuild.control(''));
    this.budgetForm.addControl('pages', this.formBuild.control(1));
    this.budgetForm.addControl('languages', this.formBuild.control(1));
    this.budgetForm.valueChanges.subscribe(value => {
      this.calculateBudget(value);
    });
  }



  calculateBudget(value: any): void {
    this.presupuesto = this.budgetService.calculateBudget(value, this.costeTotal);
  }

  updateWebCost(coste: number): void {
    this.costeTotal = coste;
    this.calculateBudget(this.budgetForm.value);
  }

  submitBudget(): void {
    if (this.budgetForm.valid) {
      const formValue = this.budgetForm.value;
      const budget: Ilist = {
        nombre: formValue.nombre,
        telefono: formValue.telefono,
        email: formValue.email,
        fecha: new Date().toISOString(),
        services: this.budgetService.services.filter(service => formValue[service.name]),
        totalCost: this.presupuesto,
        pages: formValue.pages,
        languages: formValue.languages
      };

      this.budgetService.submitBudget(budget);
      alert('Presupuesto creado con éxito');
    } else {
      alert('Selecciona al menos un servicio');
    }
  }


  goToList(){
    this.router.navigate(['/list']); 
  }
}




