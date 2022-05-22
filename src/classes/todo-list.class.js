import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        //this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter((todo) => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        // Recordar que para realizar un setItem se debe realziar con string
        // this.todos es un objeto y se guardara como [Object object] y no se vera nada.
        // Ahora para resolver este prblema se debe manejar de tal manera que podamos verlo como string
        // Para esto se utilizara un JSON.stringify(), que lo transformara en un json de string
        localStorage.setItem("todo", JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        /* if (localStorage.getItem("todo")) {
            // como almacena string, todo lo que esta en todo es string
            // se necesita realizar la inversa de stringify para volver a dejarlo como objeto
            // para esto usamos JSON.parse(string)
            this.todos = JSON.parse(localStorage.getItem("todo"));
        } else {
            this.todos = [];
        } */

        this.todos = localStorage.getItem("todo")
            ? JSON.parse(localStorage.getItem("todo"))
            : [];

        this.todos = this.todos.map((obj) => Todo.fromJson(obj));
    }
}
