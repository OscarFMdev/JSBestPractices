import './style.css';
/* index.js */
import displayTasks from './modules/display-tasks';
import {
  addTask,
  checkBoxesStatus,
  deleteTask,
  edit,
} from './modules/functions';
import { store, taskArray } from './modules/store';

/* Add and remove */
const trashCans = document.querySelectorAll('.delete-icon');
const addBtn = document.querySelector('.fa-right-from-bracket');
const deleteCompleted = document.querySelector('.completed-text');
const allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
const taskTexts = document.querySelectorAll('p');
const deleteAll = document.querySelector('.reload-icon');

window.addEventListener('DOMContentLoaded', () => {
  addBtn.addEventListener('click', (e) => {
    window.location.reload();
    addTask(e);
  });

  for (let i = 0; i < trashCans.length; i += 1) {
    trashCans[i].addEventListener('click', (e) => {
      window.location.reload();
      displayTasks();
      deleteTask(e);
    });
  }

  for (let i = 0; i < taskTexts.length; i += 1) {
    taskTexts[i].addEventListener('click', (e) => {
      edit(e);
    });
  }

  function clearCompleted(elem) {
    return elem.completed !== true;
  }

  deleteCompleted.addEventListener('click', () => {
    const data = taskArray.filter(clearCompleted);
    localStorage.setItem('taskInput', JSON.stringify(data));
    window.location.reload();
  });

  for (let i = 0; i < allCheckBoxes.length; i += 1) {
    allCheckBoxes[i].addEventListener('click', (e) => {
      checkBoxesStatus(e);
    });
  }
});

deleteAll.addEventListener('click', () => {
  taskArray.splice(0, taskArray.length);
  store();
  displayTasks();
});

displayTasks();