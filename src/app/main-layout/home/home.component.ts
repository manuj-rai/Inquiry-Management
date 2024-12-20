import { Component } from '@angular/core';
import { TsParticlesComponent } from "../../Reusables/TsParticles";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TsParticlesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
