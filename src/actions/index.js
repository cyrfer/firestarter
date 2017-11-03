import uuid from 'uuid'

/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const START_FETCH = 'START_FETCH'
export const END_FETCH = 'END_FETCH'
export const ERROR_FETCH = 'ERROR_FETCH'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const TodoStatus = {
  ACTIVE: 'ACTIVE',
  COMPLETE: 'COMPLETE'
}

const config = {
  api: '/api/v1',
  todos: '/todos'
}

/*
 * action creators
 */

export function addTodo(todo) {
  return { type: ADD_TODO, data: todo }
}

export const sendTodo = (text) => (dispatch) => {
  const todo = {
    id: uuid.v4(),
    createdOn: new Date().getTime(),
    text: text,
    status: TodoStatus.ACTIVE
  };
  console.log('addTodo', todo)
  dispatch(startFetch())
  fetch(config.api + config.todos, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then((res) => {
      console.log('addTodo response', res)
      // const d = res.body.json();
      const todo2 = Object.assign({onClick:(e) => { console.log('todo.click', e)}}, todo)
      dispatch(addTodo(todo2))
    })
    .catch((err) => {
      console.error('addTodo error')
      dispatch(errorFetch(err))
    })
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export function startFetch() {
  return { type: START_FETCH }
}

export function endFetch(d) {
  return { type: END_FETCH, data: d }
}

export function errorFetch(e) {
  return { type: ERROR_FETCH, error: e }
}

export const fetchTodos = () => (dispatch) => {
  console.log('fetching todos')
  dispatch(startFetch())
  fetch(config.api + config.todos)
    .then((res) => {
      const d = res.body.json();
      console.log('fetchTodos', d)
      dispatch(endFetch(d))
    })
    .catch((err) => {
      console.error('fetchTodos', err)
      dispatch(errorFetch(err))
    })
}
