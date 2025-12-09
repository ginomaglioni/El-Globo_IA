import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
// FIX: Switched to DataService for consistency with the rest of the application.
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  // FIX: Make component standalone as it's loaded via routing.
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  // FIX: Injected DataService and updated variable name.
  private dataService = inject(DataService);
  
  stats = computed(() => {
    // FIX: Using the consistent dataService.
    const socios = this.dataService.socios();
    const actividades = this.dataService.actividades();
    const casilleros = this.dataService.casilleros();
    
    return [
      { 
        label: 'Socios Totales', 
        value: socios.length, 
        icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
        color: 'text-blue-500' 
      },
      { 
        label: 'Actividades Ofrecidas', 
        value: actividades.length,
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        color: 'text-green-500'
      },
      { 
        label: 'Casilleros Ocupados', 
        value: casilleros.filter(c => c.estado === 'Ocupado').length,
        icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
        color: 'text-yellow-500'
      },
      { 
        label: 'Socios morosos',
        value: socios.filter(s => !!(s as any).moroso).length, // cambiado: cast a any para evitar error TS
        icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
        color: 'text-red-500'
      }

      
    ];
  });
}
