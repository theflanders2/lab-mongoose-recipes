const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const newRecipe = {
  title: "Creamy NY Cheesecake",
  level: 'Amateur Chef',
  ingredients: [
    "200g butter cookies",
    "100g butter",
    "200g sugar",
    "3 tbl spoon starch",
    "600g cream cheese",
    "200g low fat curd cheese",
    "150g cream",
    "1 egg",
    "2 tbl spoon lemon juice"
  ],
  cuisine: "American",
  dishType: "dessert",
  image: "https://img.chefkoch-cdn.de/rezepte/1666101274781519/bilder/946472/crop-642x428/der-unglaublich-cremige-ny-cheese-cake.jpg",
  duration: 55,
  creator: "Leonardo",
  created: 12042023
};

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';
const query = { title: 'Rigatoni alla Genovese'}
const toDelete = { title: 'Carrot Cake'}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(""); // new line
    console.log(`Connected to the database: "${x.connection.name}"`);
    console.log(""); // new line
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // console.log('Recipe', newRecipe);
    console.log('New recipe:', newRecipe.title);
    console.log(""); // new line
    return Recipe.create(newRecipe);
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Insert multile recipes at once
    // console.log('Stored recipes', data);
    // for (let i = 0; i < data.length; i++){
    //   console.log(`Stored recipe ${i+1}:`, data[i].title);
    // }
    data.forEach((recipe) => console.log(recipe.title));
    console.log(""); // new line
    return Recipe.insertMany(data);
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Update the duration in property in the queried recipe
    console.log('Recipe updated successfully');
    console.log(""); // new line
    return Recipe.findOneAndUpdate(query, { duration: 100 })
    ;
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Remove a recipe
    console.log('Recipe successfully removed');
    console.log(""); // new line
    return Recipe.deleteOne(toDelete);
    ;
  })
  .then(()=> { //close connection
    console.log("File execution successful. The connection has been successfully closed.")
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });  