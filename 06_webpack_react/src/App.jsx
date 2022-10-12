import React from 'react'
import ReactDom from 'react-dom'

const App = () => {
  return (
    <div>
      <h1>React大发好</h1>
    </div>
  )
}

export default App
ReactDom.render(<App />, document.getElementById('app'))
