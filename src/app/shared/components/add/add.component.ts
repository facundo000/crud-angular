import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private router: Router) {}

  // Obtiene la ruta base (products o brands)
  getBaseRoute(): string {
    const currentRoute = this.router.url.split('/')[1]; // Ej: "products" o "brands"
    return currentRoute;
  }

  // Genera la ruta de agregar dinámica
  getAddRoute(): string {
    const currentPath = this.router.url.split('/')[1]; // Ej: "products" o "brands"
  return `/${currentPath}/add${currentPath.charAt(0).toUpperCase() + currentPath.slice(1)}`;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
