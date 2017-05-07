import React, {Component} from 'react';  // webpack looks for the "react" module
import logo from './logo.svg'; // local file
import './App.css'; // index.js is root javascript file
import Card from './Card.js'
import { defaultRecipes } from './data.js' // imports dummy data
import RecipePage from './RecipePage.js'
import {
    BrowserRouter as Router,
    Link,
    Route
} from 'react-router-dom'

class App extends Component { // use component vs constant when the component uses it's own javascript logic

    state = { //initialize "state"; will use ES6 map function
        recipes: [], // = look for recipes array
        active: {} // = look for active object
      }

    componentWillMount() { // tells what will run before component mounts
        this.getRecipes()
    }

    getRecipes = () => {
        this.setState({ // use this instead of reassigning states; states are immutable
        recipes: defaultRecipes // this is where you tell the app to get data from database
    })
}

  getOneRecipe = (id) => {
      const recipe = this.state.recipes.find(recipe => {
          return recipe.id === id
      })
      this.setState({
          active: recipe
      })
  }

 renderRecipes = () => { // was cut from render method; replaced by Link element to give recipe a route
    const recipes = this.state.recipes // retrieves & stores recipe object data from state
    return (
        <div className="cards-container">
        {recipes.length !== 0 && recipes.map(recipe => ( /* make sure recipes are present before rendering */
        <Link key={recipe.id} to={`/recipes/${recipe.id}`}> /*if component does not have unique id, will generate warning*/
          <Card
              id={recipe.id} /*readable (public) id in React; "key" is not readable (private) */
                getOneRecipe={this.getOneRecipe}
                title={recipe.title}
                image={recipe.image}
            />
        </Link>
    ))}
</div>
  )
}

    renderRecipePage = () => {
        return (
            <RecipePage recipe={this.state.active} />
        )
    }

    // wrap entire app in react-router to use url routing
    // if route is matched, render recipe: <Route exact path="/recipes" component={this.renderRecipes} />
    // NOTE: Router did a weird thing when there were comments on the App directly ¯\(◉◡◔)/¯
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to React</h2>
                    </div>
                    <Link to="/recipes">View All Recipes</Link>
                    <Route exact path="/recipes" component={this.renderRecipes} />
                    <Route exact path="/recipes/:id" component={this.renderRecipePage} />
                </div>
            </Router>
        );
    }
}
// have to export classes to use js component
export default App;
