import { Component, inject, } from '@angular/core';
import { FormControl,  FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudjetService } from '../services/budjet.service';
import { PanelComponent } from '../panel/panel.component';
import { Ilist } from '../ilist';
import { CommonModule } from '@angular/common';
import { Service } from '../ilist';

@Component({
  selector: 'app-budjet-list',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent, CommonModule, FormsModule],
  templateUrl: './budjet-list.component.html',
  styleUrl: './budjet-list.component.scss'
})


export class BudjetListComponent  {

  budgets: Ilist [] = []
  services: Service[];
  budgetService = inject(BudjetService);
  filteredBudgets: Ilist[] = [];
  searchName: string = '';
  serachForm = new FormGroup({
    nombre: new FormControl('')
  })

  constructor(private budjetService: BudjetService) {
    this.services = this.budgetService.services;
    this.budgets = this.budgetService.fetchBudgets()
    this.filteredBudgets = this.budgets;
  }

  ngOnInit(): void {
    this.services = this.budgetService.services; 
    this.budgets = this.budjetService.fetchBudgets();
    console.log('Budgets:', this.budgets);
  }


  alrevez: boolean = true;  
sortBy(property: string): void {
  this.budgets.sort((a: Ilist, b: Ilist) => {
    let comparison = 0;

    if (property === 'totalCost') {
      comparison = a.totalCost - b.totalCost;  
    } else if (property === 'fecha') {
      const dateA = new Date(a.fecha).getTime();
      const dateB = new Date(b.fecha).getTime();
      comparison = dateA - dateB;  
    } else if (property === 'nombre') {
      comparison = a.nombre.localeCompare(b.nombre);  
    }


    return this.alrevez ? comparison : -comparison;
  });

  this.filteredBudgets = [...this.budgets];
  this.alrevez = !this.alrevez; 
}




  filterItems() {
    if (!this.searchName.trim()) {
      return this.budgets;
    }

    const filtered = this.budgets.filter(pressupost =>
      pressupost.nombre.toLowerCase().includes(this.searchName.toLowerCase())
    );

    return filtered.length > 0 ? filtered : [{ nombre: 'No hay resultados'} as Ilist];
  }
}