import React, { useEffect, useState } from 'react'
import {useRoutes} from 'react-router-dom'
import useMap from "./route"

function App() {

  const element = useRoutes(useMap)
  return (
    <div className="App">
      {element}
    </div>
  );
}

export default App;
