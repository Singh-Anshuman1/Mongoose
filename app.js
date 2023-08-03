const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/test", { useNewUrlParser: true });  // connecting to mongodb server and creating a database named test
 
const fruitSchema = new mongoose.Schema({          // creating a fruit table schema
  name: String,
  rating: Number,
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const orange = new Fruit({
  name: "orange",
  rating: 8,
  review: "tasty",
});

const kiwi = new Fruit({
  name: "kiwi",
  rating: 6,
  review: "sour",
});

const mango = new Fruit({
  name: "mango",
  rating: 9,
  review: "yummy",
});

async function insertFruits() {             // inserting fruits into mongoDb database
  try {
    await Fruit.insertMany([orange, kiwi, mango]);
    console.log("Fruits inserted successfully!");
  } catch (error) {
    console.error("Error inserting fruits:", error);
  }
}

async function displayFruits() {                   // displaying fruits into mongoDb database
  try {
    const fruits = await Fruit.find();
    console.log(fruits);
  } catch (error) {
    console.error("Error retrieving fruits:", error);
  }
}
async function updateFruit() {
  try {
    const fruitIdToUpdate = "64caa3924e0cf4f30e98d22e";
    const updatedFruit = await Fruit.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(fruitIdToUpdate) },
      { name: "Peach" },
      { new: true } // This option returns the modified document instead of the original one
    );

    if (updatedFruit) {
      console.log("Fruit updated successfully!");
      console.log(updatedFruit);
    } else {
      console.log("Fruit not found!");
    }
  } catch (error) {
    console.error("Error updating fruit:", error);
  }
}
async function deleteFruit() {
  try {
    const fruitIdToDelete = "64caa3924e0cf4f30e98d22e";
    const deletedFruit = await Fruit.deleteOne({ _id: fruitIdToDelete });

    if (deletedFruit.deletedCount > 0) {
      console.log("Fruit deleted successfully!");
    } else {
      console.log("Fruit not found!");
    }
  } catch (error) {
    console.error("Error deleting fruit:", error);
  }
}



// We need to call the functions now (asynchronous)
async function main() {
  await insertFruits();
  await displayFruits();
  await updateFruit();
  await deleteFruit();
  mongoose.connection.close();
}

main(); // Call the main function to start the process


