const button = document.getElementById('submit-todo')

let index = 1;

button.addEventListener("click", function () {
  let input = document.getElementById('input-todo').value
  createTodo(input)
})

const syncStorage = (key, payload) => {
  localStorage.removeItem(key);
  localStorage.setItem(key, payload)
  renderCounting();
  renderTodo();
}

const createTodo = (text) => {
  const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  todos.push({
    id: index,
    title: text,
    isCompleted: false
  })

  const output = JSON.stringify(todos);

  syncStorage('todos', output);
  index++;
}

const listTodo = (todo) => {
  return `<li aria-key="${todo.id}" class="${todo.isCompleted ? '--green' : '--red'}">${todo.title}<a href="#" aria-key="${todo.id}" class="delete-todo">Hapus</a></li>`;
}


const renderCounting = () => {
  const count = document.getElementById("count-todo");

  count.innerHTML = "";

  const counting = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')).length : []

  if (!counting) {
    count.innerHTML = "Your task count : 0";
  } else {
    count.innerHTML = "Your task count : " + counting
  }

}

const renderTodo = () => {
  const wrapper = document.getElementById("list-todo");

  wrapper.innerHTML = "";

  const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

  todos.forEach(todo => {
    wrapper.innerHTML += listTodo(todo);
  })

  deleteTodoInit();
}

const deleteTodoInit = () => {
  const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

  document.querySelectorAll('.delete-todo').forEach((element) => {
    let id = element.getAttribute('aria-key');

    element.addEventListener('click', () => {
      let output = JSON.stringify(todos.filter(todo => todo.id != id));
      console.log(id);
      syncStorage('todos', output);
    });
  });
}

const main = () => {
  renderCounting()
  renderTodo()
};

window.addEventListener('load', () => main());
