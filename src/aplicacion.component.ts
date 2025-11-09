import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraLateralComponent } from './components/compartido/barra-lateral/barra-lateral.component';
import { EncabezadoComponent } from './components/compartido/encabezado/encabezado.component';
import { AutenticacionService } from './services/autenticacion.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './aplicacion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, BarraLateralComponent, EncabezadoComponent, ReactiveFormsModule]
})
export class AplicacionComponent {
  autenticacionService = inject(AutenticacionService);

  // convertir Observable a signal para poder usar usuario() y evitar subscribe en computed
  usuario = toSignal<any>(this.autenticacionService.usuarioActual, { initialValue: null });

  titulo = 'Club El Globo Management System';

  esAdmin = computed(() => {
    const u = this.usuario();
    return !!u && u.rol === 'Administrador';
  });
}
