
import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';




const ElementId = {
    clearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

export const App = (elementId) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementId.TodoList, todos);
    }

    // Cuando la funcion App() se llama

    (() => {


        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();

    })()


    // Referencias HTML

    const newDescriptionInput = document.querySelector(ElementId.NewTodoInput);
    const TodoListUL = document.querySelector(ElementId.TodoList);
    const todosCompleted = document.querySelectorAll('.completed');

    // Listeners

    newDescriptionInput.addEventListener('keyup',(event) => {
        if(event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value)
        displayTodos();
        event.target.value = '';
    })

    TodoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');        
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos()
    })

    TodoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        if (event.target.className === 'destroy'){
            todoStore.deleteTodo(element.getAttribute('data-id'))
             displayTodos()
         }
    })

    addEventListener('click', (event) => {
        
        if (event.target.className === 'clear-completed'){
            todoStore.deleteCompleted();
            displayTodos()
        }
    })

}