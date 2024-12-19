import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // Confirmation Alert (with SweetAlert2)
  confirm(message: string, confirmButtonText = 'Yes', cancelButtonText = 'No'): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      background: '#222b45',
      color: '#fff',
      showCancelButton: true,
      confirmButtonColor: '#36b',
      cancelButtonColor: '#3085d6',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    }).then((result) => result.isConfirmed);
  }
  
  // Success Alert
  success(message: string): void {
    Swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
      background: '#222b45',
      color: '#fff',
      confirmButtonColor: '#36b',
    });
  }

  // **Warning Alert**
  warning(message: string): void {
    Swal.fire({
      title: 'Warning',
      text: message,
      icon: 'warning',
      background: '#222b45',
      color: '#fff',
      confirmButtonColor: '#f39c12', // Orange color
    });
  }
  
  // Error Alert
  error(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      background: '#222b45',
      color: '#fff',
      confirmButtonColor: '#36b',
    });
  }
}
