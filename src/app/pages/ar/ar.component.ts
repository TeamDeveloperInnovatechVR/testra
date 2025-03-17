import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

@Component({
  selector: 'app-ar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ar.component.html',
  styleUrl: './ar.component.css'
})
export class ArComponent implements AfterViewInit {
  @ViewChild('arContainer', { static: true }) arContainer!: ElementRef;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  loader!: GLTFLoader;

  ngAfterViewInit() {
    this.initScene();
    this.addARButton();
    this.loadModel();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 1.5, 3); // Ajusta la posición de la cámara

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.xr.enabled = true;
    this.arContainer.nativeElement.appendChild(this.renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    this.scene.add(light);
  }

  addARButton() {
    const arButton = ARButton.createButton(this.renderer, {
      requiredFeatures: ['hit-test'], // Detecta superficies en AR
    });
    document.body.appendChild(arButton);
  }



  loadModel() {
    const objLoader = new OBJLoader();
    objLoader.load('./test.obj', (object) => {
      object.scale.set(1, 1, 1); // Ajusta el tamaño real del modelo
      this.scene.add(object);
      this.animate();
    });
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
    });
  }
}
