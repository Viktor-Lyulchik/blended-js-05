'use strict';

import { taskList } from './refs';

export function renderTaskList(arrTaskList) {
  const listHTML = arrTaskList
    .map(
      ({
        taskName,
        taskDescription,
        id,
      }) => `<li class="task-list-item" data-id="${id}">
      <button class="task-list-item-btn">Delete</button>
      <h3>${taskName}</h3>
      <p>${taskDescription}</p>
  </li>`
    )
    .join('');
  taskList.innerHTML = listHTML;
}

export function appendTaskToList(task) {
  const { taskName, taskDescription, id } = task;
  const listItemHTML = `<li class="task-list-item" data-id="${id}">
        <button class="task-list-item-btn">Delete</button>
        <h3>${taskName}</h3>
        <p>${taskDescription}</p>
    </li>`;
  taskList.insertAdjacentHTML('beforeend', listItemHTML);
}
