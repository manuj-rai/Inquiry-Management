import { Component } from '@angular/core';
import { TsParticlesComponent } from "../../Reusables/TsParticles";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TsParticlesComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}