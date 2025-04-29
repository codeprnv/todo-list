import React from 'react'

const TodoHeader: React.FC = () => {
  return (
    <div className='flex items-center justify-center mb-6 text-center'>
      <h1 className='text-4xl font-bold text-gray-800 mr-2 '>To-Do List</h1>
      <span className='text-4xl'>📃</span>
    </div>
  )
}

export default TodoHeader