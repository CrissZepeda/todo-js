import { Todo, TodoList } from "./classes";
import { crearTodoHtml } from "./js/componentes";

import "./style.css";

export const todoList = new TodoList();

// Se debe reconstruir el html si existe informacion en el localStorage

todoList.todos.forEach((todo) => crearTodoHtml(todo));
/* // cuando el argumento que se quiere enviar es el unico que se quiere enviar a una funcion
// o metodo se puede reducir a 
// todoList.todos.forEach(crearTodoHtml); */

/* const tarea = new Todo("Aprender javascript");

todoList.nuevoTodo(tarea);

console.log(tarea);
console.log(todoList);

crearTodoHtml(tarea); */

/* 
// para almacenar datos en el localStorage, estos deben ser string, solamente string
localStorage.setItem("mi-key", "Valor");
// sessioStorage utiliza los mismo metodos, se podria decir que son lo mismo
// a diferencia del localStorage, el sessionStorage tiene tiempo de expiracion
// Al local storage no tiene tiempo pero se le puede asignar uno.

// con setTimeOut podemos indicar que algo se ejecute despues de un tiempo
setTimeout(() => {
    // lo que se ejecutara una vez cumplido el tiempo
    localStorage.removeItem("mi-key");
}, 1500);
// en este caso 1500 es el tiempo, 1500 son 1.5 segundos
 */
