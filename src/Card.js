import React from 'react'
import './Card.css' // external css

// "=>" indicates a function that will return; doesn't bind "this"
// can add a return statement if you wnat to return
const Card = ({ title, image, id, getOneRecipe }) => {

// optional styling to package with component
const imageStyle = {
  backgroundImage: `url(${image || ''})` // uses backticks to include template variable (multi-line string); "or" is for error handling
}

const onCardClick = () => {
  getOneRecipe(id)
}

  return (
    <div onClick={onCardClick} className="Card">
      <div className="image" style={imageStyle}></div>
      <p className="title">{title}</p>
    </div>
  )
}
export default Card
