// Importar todo
import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias en HTML

const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulfiltros = document.querySelector(".filters");
const anchorFiltro = document.querySelectorAll(".filtro");

export const crearTodoHtml = (todo) => {
    const htmlTodo = `<li class="${
        todo.completado ? "completed" : ""
    }" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${todo.completado ? "checked" : ""}>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`;

    const div = document.createElement("div");
    div.innerHTML = htmlTodo;

    // firstElementChild nos permite insertar el primer hijo del elemento sin el padre
    // es decir es aqui donde identificamos al div como padre y el li como hijo
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
};

// Eventos
txtInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = "";
    }
});

// cambiar estado completado

divTodoList.addEventListener("click", (event) => {
    // con event.target.localName podemos identificar a que elemento se le realizo un clic
    const nombreElemento = event.target.localName; // input, label, button, etc
    const todoElemento = event.target.parentElement.parentElement; // identifica los elementos padres(anterior) y si se usa otravez aparece el padre del padre
    const todoId = todoElemento.getAttribute("data-id");
    console.log(nombreElemento);
    /*console.log(todoId); */

    // si al elemento que le hice clic incluye un elemento llamado "input"
    if (nombreElemento.includes("input")) {
        todoList.marcarCompletado(todoId);

        /*******************
         todoElemento es la referencia al elemento html que creamos antes
         classList hace referencia a todas las clases
         Y si se quiere agreagar o cambiar una clases se hace con toggle
        */
        todoElemento.classList.toggle("completed"); // si existe la quita, de lo contrario la agrega
    } else if (nombreElemento.includes("button")) {
        todoList.eliminarTodo(todoId);
        // hacemos referencia al documento .todolist y le decimos que elimine un hijo
        // que en este caso seria un li
        divTodoList.removeChild(todoElemento);
    }
    console.log(todoElemento);
});

btnBorrar.addEventListener("click", () => {
    todoList.eliminarCompletados();
    console.log(todoList);
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        // con contains puedo preguntar si tiene alguna clase que busco
        if (elemento.classList.contains("completed")) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulfiltros.addEventListener("click", (event) => {
    /* // que evento es
    console.log({ event });

    // determinar donde se debe hacer el evento
    console.log(event.target.text); */
    console.log(event.target.text);

    const filtro = event.target.text;
    if (!filtro) return;

    anchorFiltro.forEach((elem) => elem.classList.remove("selected"));
    event.target.classList.add("selected");

    for (const elemento of divTodoList.children) {
        elemento.classList.remove("hidden");
        const completado = elemento.classList.contains("completed");

        switch (filtro) {
            case "Pendientes":
                if (completado) {
                    elemento.classList.add("hidden");
                }
                break;
            case "Completados":
                if (!completado) {
                    elemento.classList.add("hidden");
                }
                break;
        }
    }
});
