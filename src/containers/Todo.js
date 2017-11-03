import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

const propTypes = {
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  createdOn: PropTypes.number.isRequired,
  // completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

Todo.propTypes = propTypes
export default Todo
