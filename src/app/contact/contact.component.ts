import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone:true,
  imports:[FormsModule]
})
export class ContactComponent {
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
      // You can also handle the form data here, like sending it to a server.
    } else {
      console.log('Form is invalid');
    }
  }
}
