import React from "react";
import './App.css';

function App() {
  const [boards, setBoards] = React.useState([
    {id: 1, title: 'Сделать', items: [{id: '1', task: 'Убраться'}, {id: '2', task: 'Выкинуть мусор'}, {id: '3', task: 'Помыть посуду'}]},
    {id: 2, title: 'Проверить', items: [{id: '4', task: 'Решить задачу'}, {id: '5', task: 'Почитать про JS'}, {id: '6', task: 'Поверстать'}]},
    {id: 3, title: 'Сделано', items: [{id: '7', task: 'Приготовить ужин'}, {id: '8', task: 'Сходить в магаз'}, {id: '9', task: 'Поспать'}]}
  ])
  const [currentBoard, setCurrentBoard] = React.useState(null)
  const [currentItem, setCurrentItem] = React.useState(null)
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  };

  const dragLeaveHandler = e => {
    e.target.style.boxShadow = 'none'
  };

  const dragEndHandler = e => {
    e.target.style.boxShadow = 'none'
  };

  const dragOverHandler = e => {
    e.preventDefault()
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 4px 3px gray'
    }
  };

  const dropHandler = (e, board, item) => {
    e.preventDefault()
    e.stopPropagation()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards( boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    e.target.style.boxShadow = 'none'
  };

  const dropBoardHandler = (e, board) => {
    e.preventDefault()
    e.stopPropagation()
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards( boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  };

  return (
    <div className="app">
      {
        boards.map( board => <div
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropBoardHandler(e,board)}
            className='board'
        >
          <div className='board__title'>{board.title}</div>
          {
            board.items.map( item =>
                <div
                    onDragStart={(e) => dragStartHandler(e, board, item)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e,board, item)}
                    draggable={true}
                    className='item'
            >{item.task}</div>)
          }
        </div>)
      }
    </div>
  );
}

export default App;
