const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product"); // your Product model path

dotenv.config();

const products = [
  { title: "Modern Sofa", description: "Comfortable 3-seater fabric sofa", price: 799, image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 10 },
  { title: "Wooden Dining Table", description: "Solid oak dining table for 6 people", price: 499, image: "https://images.pexels.com/photos/1866145/pexels-photo-1866145.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 8 },
  
  { title: "TV Stand", description: "Wooden TV cabinet with storage", price: 249, image: "https://images.pexels.com/photos/279747/pexels-photo-279747.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 15 },
  { title: "Wardrobe", description: "3-door wardrobe with hanging space", price: 699, image: "https://images.pexels.com/photos/1866152/pexels-photo-1866152.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 6 },
  { title: "Accent Chair", description: "Fabric accent chair with modern design", price: 129, image: "https://images.pexels.com/photos/1866153/pexels-photo-1866153.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 20 },
  { title: "Corner Shelf", description: "Wooden corner shelf for decor", price: 79, image: "https://images.pexels.com/photos/279748/pexels-photo-279748.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 22 },
  { title: "Dining Chair", description: "Set of 2 dining chairs", price: 99, image: "https://images.pexels.com/photos/1866154/pexels-photo-1866154.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 30 },
  { title: "Bar Stool", description: "Adjustable height bar stool", price: 89, image: "https://images.pexels.com/photos/279749/pexels-photo-279749.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 25 },
  { title: "Ottoman", description: "Soft ottoman for living room", price: 119, image: "https://images.pexels.com/photos/1866155/pexels-photo-1866155.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 20 },
  { title: "TV Console", description: "Modern TV console with drawers", price: 299, image: "https://images.pexels.com/photos/279750/pexels-photo-279750.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 10 },
  { title: "Side Table", description: "Minimalist wooden side table", price: 59, image: "https://images.pexels.com/photos/279751/pexels-photo-279751.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 35 },
  { title: "Gaming Chair", description: "Ergonomic chair for gamers", price: 249, image: "https://images.pexels.com/photos/1866156/pexels-photo-1866156.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 15 },
  { title: "Bookshelf Ladder", description: "Decorative bookshelf ladder", price: 199, image: "https://images.pexels.com/photos/1866157/pexels-photo-1866157.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 12 },
  { title: "Futon Sofa", description: "Convertible futon sofa bed", price: 349, image: "https://images.pexels.com/photos/1866158/pexels-photo-1866158.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 10 },
  { title: "Patio Chair", description: "Outdoor chair for garden", price: 79, image: "https://images.pexels.com/photos/279752/pexels-photo-279752.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 25 },
  { title: "Patio Table", description: "Outdoor wooden table", price: 149, image: "https://images.pexels.com/photos/279753/pexels-photo-279753.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 15 },
  { title: "Storage Cabinet", description: "Wooden storage cabinet with shelves", price: 399, image: "https://images.pexels.com/photos/279754/pexels-photo-279754.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 12 },
  { title: "Dresser", description: "6-drawer wooden dresser", price: 499, image: "https://images.pexels.com/photos/279755/pexels-photo-279755.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 8 },
  { title: "Bedside Lamp", description: "Modern bedside lamp", price: 49, image: "https://images.pexels.com/photos/279756/pexels-photo-279756.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 40 },
  { title: "Console Table", description: "Entryway console table", price: 179, image: "https://images.pexels.com/photos/279757/pexels-photo-279757.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 12 },
  { title: "Reclining Sofa", description: "Leather reclining sofa", price: 599, image: "https://images.pexels.com/photos/1866159/pexels-photo-1866159.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 6 },
  { title: "Folding Chair", description: "Portable folding chair", price: 39, image: "https://images.pexels.com/photos/279758/pexels-photo-279758.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 50 },
  { title: "Bean Bag", description: "Comfortable bean bag for lounge", price: 79, image: "https://images.pexels.com/photos/279759/pexels-photo-279759.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 30 },
  { title: "Vanity Table", description: "Dressing table with mirror", price: 299, image: "https://images.pexels.com/photos/279760/pexels-photo-279760.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 10 },
  { title: "Rocking Chair", description: "Classic wooden rocking chair", price: 159, image: "https://images.pexels.com/photos/279761/pexels-photo-279761.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 15 },
  { title: "Filing Cabinet", description: "Metal office filing cabinet", price: 199, image: "https://images.pexels.com/photos/279762/pexels-photo-279762.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 12 },
  { title: "Wall Shelf", description: "Floating wooden wall shelf", price: 69, image: "https://images.pexels.com/photos/279763/pexels-photo-279763.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 25 },
  { title: "Chaise Lounge", description: "Modern chaise lounge chair", price: 399, image: "https://images.pexels.com/photos/279764/pexels-photo-279764.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 8 },
  { title: "Entryway Bench", description: "Wooden bench for hallway", price: 149, image: "https://images.pexels.com/photos/279765/pexels-photo-279765.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 18 },
  { title: "Coffee Table Set", description: "Set of 2 nesting tables", price: 199, image: "https://images.pexels.com/photos/279766/pexels-photo-279766.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 12 },
  { title: "Outdoor Sofa", description: "Weather-resistant outdoor sofa", price: 499, image: "https://images.pexels.com/photos/279767/pexels-photo-279767.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 8 },
  { title: "Accent Cabinet", description: "Decorative accent cabinet", price: 299, image: "https://images.pexels.com/photos/279768/pexels-photo-279768.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 10 },
  { title: "Patio Umbrella", description: "Outdoor sun umbrella", price: 129, image: "https://images.pexels.com/photos/279769/pexels-photo-279769.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 20 },
  { title: "Storage Ottoman", description: "Ottoman with storage inside", price: 149, image: "https://images.pexels.com/photos/279770/pexels-photo-279770.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 15 },
  { title: "Round Dining Table", description: "Wooden round dining table", price: 349, image: "https://images.pexels.com/photos/279771/pexels-photo-279771.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 10 },
  { title: "Patio Lounge Chair", description: "Outdoor lounge chair", price: 179, image: "https://images.pexels.com/photos/279772/pexels-photo-279772.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 12 },
  { title: "Desk Lamp", description: "Adjustable LED desk lamp", price: 49, image: "https://images.pexels.com/photos/279773/pexels-photo-279773.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 30 },
  { title: "Wooden TV Stand", description: "TV stand with shelves", price: 249, image: "https://images.pexels.com/photos/279774/pexels-photo-279774.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 14 },
  { title: "Leather Armchair", description: "Comfortable leather armchair", price: 349, image: "https://images.pexels.com/photos/279775/pexels-photo-279775.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 10 },
  { title: "Folding Table", description: "Portable folding table", price: 89, image: "https://images.pexels.com/photos/279776/pexels-photo-279776.jpeg?auto=compress&cs=tinysrgb&h=500&w=500", stock: 25 }
];



const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany(); // optional: clears existing products
    await Product.insertMany(products);
    console.log("Products added successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

seedProducts();
