import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tsparticles',
  standalone: true,
  imports: [],
  template: `
    <div id="particles-js"></div>
  `,
  styles: [`
    #particles-js {
      position: absolute;
      top: 45px;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  `]
})

export class TsParticlesComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    this.initParticles();
  }
  
  initParticles(): void {
    const particlesJS = (window as any)['particlesJS'];
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
      particlesContainer.style.height = `${document.body.scrollHeight}px`; // Match body height
    }

    if (particlesJS) {
      particlesJS('particles-js', {       
        particles: {         
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#ffffff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 5,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 5,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.5,
            width: 1
          },
          move: {
            enable: true,
            speed: 5,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'repulse'
            },
            onclick: {
              enable: true,
              mode: 'push'
            }
          }
        },
        retina_detect: true
      });
    }
  }
}