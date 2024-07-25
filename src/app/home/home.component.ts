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
import { requireCheckboxesToBeCheckedValidator } from '../validation';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WelcomeComponent, ReactiveFormsModule, PanelComponent, BudjetListComponent, RouterLink, RouterOutlet, RouterLinkActive],
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
      this.openModal();
    
  }
}

openModal(): void {
  const modalElement = document.getElementById('successModal');
  if (modalElement) {
    
    const modal = new (window as any).bootstrap.Modal(modalElement);
    modal.show();
  }
}


clearForm(): void {
  this.budgetForm.reset({
    nombre: '',
    telefono: '',
    email: '',
    pages: 1,
    languages: 1
  });
  this.presupuesto = 0;
  this.costeTotal = 0;
}

  goToList(){
    this.router.navigate(['/list']); 
  }


  form = new FormGroup({
    
    myCheckboxGroup: new FormGroup({
      myCheckbox1: new FormControl(false),
      
    }, requireCheckboxesToBeCheckedValidator()),
    myCheckbox1: new FormControl(false, [Validators.requiredTrue]),
  });





}




