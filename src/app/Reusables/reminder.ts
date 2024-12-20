import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reminder',
  standalone:true,
  imports:[CommonModule,
    FormsModule],
  template: `<div class="reminder-container">
  <h2>Reminder App</h2>

  <div class="add-reminder">
    <input
      type="text"
      [(ngModel)]="newReminder"
      placeholder="Add a new reminder"
    />
    <button (click)="addReminder()">Add</button>
  </div>

  <ul class="reminder-list">
    <li *ngFor="let reminder of reminders">
      <input
        type="checkbox"
        [checked]="reminder.done"
        (change)="toggleReminderStatus(reminder.id)"
      />
      <span [class.done]="reminder.done">{{ reminder.task }}</span>
      <button (click)="deleteReminder(reminder.id)">Delete</button>
    </li>
  </ul>
</div>
`,
  styles: [`
  .reminder-container {
    height: 300px;
    min-width: 325px;
    overflow-y: scroll;
    margin: 0 auto;
    background-color: #222b45;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border: .0625rem solid #101426;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
  }
  
  h2 {
    text-align: center;
    font-size: 2rem;
    color: #36b;
    margin-bottom: 20px;
  }
  
  .add-reminder {
    display: flex;
    margin-bottom: 20px;
  }
  
  .add-reminder input {
    padding: 10px;
    flex: 1;
    background-color:rgba(16, 20, 38, 0.45);
    border: 1px solid #101426;
    border-radius: 4px;
    font-size: 1rem;
    color: #fff;
    outline: none;
    margin-right: 10px;
    transition: border 0.3s ease;
  }
  
  .add-reminder button {
    padding: 10px 15px;
    background-color:rgba(16, 20, 38, 0.45);
    border: .0625rem solid #101426;
    color: white;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .add-reminder button:hover {
    background-color: #101426;
  }
  
  .reminder-list {
    list-style-type: none;
    padding: 0;
  }
  
  .reminder-list li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    margin-bottom: 12px;
    background-color: #222b45;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border: .0625rem solid #101426;
    transition: all 0.3s ease;
  }

  .reminder-list li:hover {
    background-color: #101426;
  }
  
  .reminder-list li span {
    flex: 1;
    margin-left: 10px;
  }
  
  .reminder-list li span.done {
    text-decoration: line-through;
    color: gray;
  }
  
  .reminder-list li button {
    background-color:rgb(255, 0, 0);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }

  .reminder-list li button:hover {
    background-color: #ff4747;
  }

  @media (max-width:786px) {
    .reminder-container {
        padding: 5px;
    }
  }

  `]
})
export class ReminderComponent implements OnInit {
  reminders: { id: number; task: string; done: boolean }[] = [];
  newReminder: string = '';

  ngOnInit(): void {
    this.loadReminders();
  }

  // Load reminders from local storage
  loadReminders(): void {
    const storedReminders = localStorage.getItem('reminders');
    if (storedReminders) {
      this.reminders = JSON.parse(storedReminders);
    }
  }

  // Add a new reminder
  addReminder(): void {
    if (this.newReminder.trim()) {
      const newReminder = {
        id: Date.now(),
        task: this.newReminder.trim(),
        done: false
      };
      this.reminders.push(newReminder);
      this.saveReminders();
      this.newReminder = ''; // Clear input field
    }
  }

  // Mark a reminder as done
  toggleReminderStatus(id: number): void {
    const reminder = this.reminders.find(r => r.id === id);
    if (reminder) {
      reminder.done = !reminder.done;
      this.saveReminders();
    }
  }

  // Delete a reminder
  deleteReminder(id: number): void {
    this.reminders = this.reminders.filter(r => r.id !== id);
    this.saveReminders();
  }

  // Save reminders to local storage
  saveReminders(): void {
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }
}
