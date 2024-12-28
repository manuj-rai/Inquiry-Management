import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="todo-container">
    <h2 class="title">Todo List</h2>
  
    <div class="add-todo">
      <input
        type="text"
        [(ngModel)]="newTask"
        placeholder="Add a new task"
        class="todo-input"
      />
      <button (click)="addTodo()" class="add-btn">Add</button>
    </div>
  
    <ul class="todo-list">
      <li *ngFor="let todo of todos" class="todo-item">
        <div class="list">
        <input
          type="checkbox"
          [checked]="todo.done"
          (change)="toggleTodoStatus(todo.id)"
          class="todo-checkbox"
        />
        <span [class.done]="todo.done" class="todo-text">{{ todo.task }}</span>
        </div>
        <button (click)="deleteTodo(todo.id)" class="delete-btn">Delete</button>
      </li>
    </ul>
  </div>
  `,
  
styles: [`
  .todo-container {
    height: 243px;
    margin: 0 auto;
    background-color: #222b45;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border: .0625rem solid #101426;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
  }
  
  .title {
    font-size: 1.2rem;
    color: #36b;
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .add-todo {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
  }
  
  .todo-input {
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
  
  .todo-input:focus {
    border-color: #101426;
  }
  
  .add-btn {
    padding: 10px 15px;
    background-color:rgba(16, 20, 38, 0.45);
    border: .0625rem solid #101426;
    color: white;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .add-btn:hover {
    background-color: #101426;
  }
  
  .todo-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: 160px;
    overflow-y: scroll;
  }
  
  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    margin-right: 20px;
    margin-bottom: 12px;
    background-color: #222b45;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border: .0625rem solid #101426;
    transition: all 0.3s ease;
  }

  input.todo-checkbox {
    margin-right: 12px;
  }
  
  .todo-item:hover {
    background-color: #101426;
  }
  
  .todo-text.done {
    text-decoration: line-through;
    color: #888;
  }
  
  
  .delete-btn {
    background-color:rgb(255, 0, 0);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }
  
  .delete-btn:hover {
    background-color: #ff4747;
  }

  @media (max-width:786px) {
    .todo-container {
        padding: 5px;
        height: 270px !important;
    }
  }
  `]
  
})
export class TodoComponent {
    todos: { id: number; task: string; done: boolean }[] = [];
    newTask: string = '';
  
    constructor() {
      this.todos = this.loadTodos();
      this.todos.reverse(); 
    }
  
    // Load todos from local storage
    loadTodos(): { id: number; task: string; done: boolean }[] {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];  // Return parsed todos or an empty array if none
    }
  
    // Save todos to local storage
    saveTodos(): void {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  
    // Add a new todo
    addTodo(): void {
      if (this.newTask.trim()) {
        const newTodo = { 
          id: Date.now(),  // Generate a unique id using timestamp
          task: this.newTask,
          done: false
        };
        this.todos.unshift(newTodo);  // Add new task to the beginning of the list
        this.newTask = '';  // Clear the input
        this.saveTodos();  // Save the updated todos list to local storage
      }
    }
  
    // Mark a todo as done
    toggleTodoStatus(id: number): void {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.done = !todo.done;  // Toggle the 'done' status
        this.saveTodos();  // Save the updated todos list
      }
    }
  
    // Delete a task
    deleteTodo(id: number): void {
      this.todos = this.todos.filter(t => t.id !== id);  // Remove task by id
      this.saveTodos();  // Save the updated todos list
    }
  }
  
