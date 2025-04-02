import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebxrArComponent } from '../webxr-ar/webxr-ar.component';

@Component({
  selector: 'app-ar',
  standalone: true,
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './ar.component.html',
  styleUrl: './ar.component.css'
})
export class ArComponent implements AfterViewInit, OnInit {
  @ViewChild('viewer', { static: false }) viewer!: ElementRef;
  @ViewChild('audioElement', { static: false }) audio!: ElementRef;

  audioEnabled = false; // Para saber si el usuario activó el audio
  deviceOS: string = '';

  ngOnInit(): void {
    this.detectDeviceOS();
  }

  ngAfterViewInit() {

    
    
    if(this.viewer && this.audio) {
      const modelViewer = this.viewer.nativeElement;
      const audioElement = this.audio.nativeElement;

      modelViewer.addEventListener('load', () => {
        console.log('Modelo cargado');
        modelViewer.animationName = modelViewer.availableAnimations[0] || ''; // Selecciona la primera animación disponible
        modelViewer.play();
      });
  
      modelViewer.addEventListener('click', () => {
        console.log('Modelo clickeado');
        modelViewer.play();
      });
      
      // Detecta cuándo entra y sale del modo AR
      modelViewer.addEventListener('ar-status', (event: any) => {
        if (event.detail.status === 'session-started' && this.audioEnabled) {
          // Reproducir el audio solo si el usuario ya lo ha habilitado
          this.playAudio();
        } else if (event.detail.status === 'not-presenting') {
          // Pausar el audio cuando el AR se detiene
          audioElement.pause();
        }
      });

      // Forzar la animación si no se inicia sola
      setTimeout(() => {
        modelViewer.play();
      }, 500);
    }

    
  }

  // Se activa el audio con un clic del usuario
  playAudio() {
    const audioElement = this.audio.nativeElement;

    // En iOS, podemos necesitar un pequeño retraso para asegurar que se haya producido la interacción
    setTimeout(() => {
      if (audioElement.paused) {
        audioElement.play();
        this.audioEnabled = true;
      }
    }, 100); // Retardo de 100ms para asegurar la interacción
  }

  onARStatus(event: any) {
    const status = event.detail.status;  
    if (status === 'session-started' && this.audioEnabled) {
      const audioElement = this.audio.nativeElement;
      if (audioElement) {
        audioElement.play().catch((error: any) => {
          console.error('Error al reproducir el audio:', error);
          // Mostrar un mensaje de error al usuario
          alert('No se pudo reproducir el audio. Por favor, inténtalo de nuevo.');
        });
      }
    }
  }

  detectDeviceOS() {
    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent;
  
      if (/android/i.test(userAgent)) {
        this.deviceOS = 'Android';
      } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
        this.deviceOS = 'iOS';
        window.location.href = 'https://teamdeveloperinnovatechvr.github.io/HuevosKike/';
      } else if (/Windows NT/i.test(userAgent)) {
        this.deviceOS = 'Windows';
      } else {
        this.deviceOS = 'Unknown';
      }
  
      console.log('Sistema operativo detectado:', this.deviceOS);
    } else {
      console.log('navigator no está disponible en este entorno.');
      this.deviceOS = 'Unknown';
    }
  }
}
