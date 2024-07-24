import { Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Ilist, Service } from '../ilist';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BudjetService {

  budgets = signal<Ilist[]>([]);


  article: string = `Programación de una web responsiva completa.`;
  listaTotalPrice: Ilist[] = [];


  services: Service[] = [
    { name: 'SEO', price: 300, article: this.article },
    { name: 'Ads', price: 400, article: this.article },
    { name: 'Web', price: 500, article: this.article }
  ];

  calculateWebCost(pages: number, languages: number): number {
    const base: number = 0;
    const extraCost = (pages - 1) * 30 + (languages - 1) * 30;
    return base + extraCost;
  }

  calculateBudget(value: any, costeTotal: number): number {
    return this.services.reduce((acc, service) => {
      return acc + (value[service.name] ? service.price : 0);
    }, 0) + costeTotal;
  }

  initializeBudgetForm(formBuild: any): FormGroup {
    return formBuild.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/)]],
      pages: [1, [Validators.required, Validators.min(1)]],
      languages: [1, [Validators.required, Validators.min(1)]],
      SEO: false,
      Ads: false,
      Web: false
    });
  }

  submitBudget(budget: Ilist): void {
    this.budgets.update(budgets => [...budgets, budget]);
  }

  fetchBudgets(): Ilist[] {
    return this.budgets();
  }


}


