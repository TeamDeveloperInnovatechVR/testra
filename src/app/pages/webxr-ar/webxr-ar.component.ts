import { Component, ElementRef, ViewChild, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
declare var Lightship: any;

@Component({
  selector: 'app-webxr-ar',
  standalone: true,
  imports: [CommonModule],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
  ],
  templateUrl: './webxr-ar.component.html',
  styleUrls: ['./webxr-ar.component.css']
})
export class WebxrArComponent {
  // private lightshipInstance: any;

  // // Aquí agregamos tu API Key de Niantic Lightship
  // private apiKey = '2b7X5w9YvqmpFUPVwt1kSSOW6lZl63kEp9IF1YuyASRz1Z3hHdP763bY3rkQVEpsG9tErL';

  // ngOnInit(): void {
  //   this.initializeAR();
  // }

  // ngOnDestroy(): void {
  //   if (this.lightshipInstance) {
  //     this.lightshipInstance.destroy();  // Limpiar cuando se destruye el componente
  //   }
  // }

  // private initializeAR() {
  //   // Inicializamos el SDK de Niantic con la API Key
  //   this.lightshipInstance = new Lightship.WebAR({
  //     apiKey: this.apiKey,  // Usamos tu API Key aquí
  //     modelUrl: './Jorge_Rausch_animated.glb',  // URL a tu modelo GLTF/GLB
  //     onStart: () => {
  //       console.log('AR iniciado');
  //     },
  //     onStop: () => {
  //       console.log('AR detenido');
  //     },
  //     onError: (error: any) => {
  //       console.error('Error en AR:', error);
  //     }
  //   });

  //   // Comienza la experiencia AR
  //   this.lightshipInstance.start();
  // }
}