'use strict';

import { toggleTheme, setTheme } from './js/theme-switcher';
import { renderTaskList, appendTaskToList } from './js/render-tasks';
import { setDataToLS, getDataFromLS } from './js/local-storage-api';
import { formAddNotes, themeToggleBtn, taskList } from './js/refs';

/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/

let taskArray = [];

const STORAGE_KEY = 'notes_books';
const STORAGE_KEY_THEME = 'notes_books_theme';

// localStorage.removeItem(STORAGE_KEY);

taskArray = getDataFromLS(STORAGE_KEY, []);
// console.log(taskArray);

if (taskArray.length != 0) {
  renderTaskList(taskArray);
}

let savedTheme = getDataFromLS(STORAGE_KEY_THEME);
if (savedTheme === '') {
  savedTheme = 'theme-dark';
}
setTheme(savedTheme);

formAddNotes.addEventListener('submit', event => {
  event.preventDefault();

  const taskName = event.currentTarget.elements.taskName.value.trim();
  const taskDescription =
    event.currentTarget.elements.taskDescription.value.trim();

  if (!taskName || !taskDescription) {
    alert('Please, fill  all fields of task!');
    return;
  }

  const newTask = {
    taskName,
    taskDescription,
    id: taskArray.length + 1,
  };

  taskArray.push(newTask);
  appendTaskToList(newTask);
  setDataToLS(STORAGE_KEY, taskArray);

  formAddNotes.reset();
});

themeToggleBtn.addEventListener('click', () => {
  savedTheme = toggleTheme();
  setDataToLS(STORAGE_KEY_THEME, savedTheme);
});

taskList.addEventListener('click', event => {
  if (event.target.nodeName != 'BUTTON') {
    return;
  }

  const item = event.target.closest('.task-list-item');
  const itemId = +item.dataset.id;

  taskArray = taskArray.filter(({ id }) => id !== itemId);

  setDataToLS(STORAGE_KEY, taskArray);

  item.remove();
});
