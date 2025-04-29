import TodoContainer from './Components/TodoContainer'
import { TodoProvider } from './context/TodoContext'

const App = () => {
  return (
		<TodoProvider>
			<div className="min-h-screen bg-gray-200 flex items-start justify-center py-8 px-4 ">
				<TodoContainer />
			</div>
		</TodoProvider>
	);
}

export default App