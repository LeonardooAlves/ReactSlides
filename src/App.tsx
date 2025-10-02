import React from 'react'
import { Link } from 'react-router-dom'

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>ReactSlides — Index</h1>
      <p>Select a slide route:</p>
      <ul>
        <li><Link to="/slide1">Slide 1</Link></li>
        <li><Link to="/slide2">Slide 2</Link></li>
        <li><Link to="/slide3">Slide 3</Link></li>
        <li><Link to="/slide4">Slide 4</Link></li>
        <li><Link to="/slide5">Slide 5</Link></li>
        <li><Link to="/slide6">Slide 6</Link></li>
        <li><Link to="/slide7">Slide 7</Link></li>
      </ul>
    </main>
  )
}
