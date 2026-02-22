const recipes = [];

const slug = (title) =>
  title.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Food-specific images from Unsplash with direct photo IDs for reliable, high-quality food photography
const foodImages = {
  // Breakfast & Pancakes
  "pancakes": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&h=900&fit=crop",
  "breakfast": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&h=900&fit=crop",
  
  // Salads
  "salad": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=900&fit=crop",
  "garden salad": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&h=900&fit=crop",
  
  // Pasta
  "pasta": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&h=900&fit=crop",
  "tomato pasta": "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=1200&h=900&fit=crop",
  
  // Cookies & Desserts
  "cookies": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&h=900&fit=crop",
  "chocolate": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&h=900&fit=crop",
  "brownies": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&h=900&fit=crop",
  "cheesecake": "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=1200&h=900&fit=crop",
  
  // Seafood
  "salmon": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&h=900&fit=crop",
  "fish": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200&h=900&fit=crop",
  "shrimp": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=1200&h=900&fit=crop",
  
  // Rice & Risotto
  "risotto": "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1200&h=900&fit=crop",
  "rice": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&h=900&fit=crop",
  
  // Tacos & Mexican
  "tacos": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1200&h=900&fit=crop",
  "beef": "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=900&fit=crop",
  
  // Pies
  "pie": "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=1200&h=900&fit=crop",
  "apple pie": "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=1200&h=900&fit=crop",
  
  // Stir Fry & Asian
  "stir fry": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&h=900&fit=crop",
  "curry": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&h=900&fit=crop",
  "chicken": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=1200&h=900&fit=crop",
  
  // Bowls
  "bowl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=900&fit=crop",
  "buddha bowl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=900&fit=crop",
  
  // Comfort food
  "mac and cheese": "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=1200&h=900&fit=crop",
  "pizza": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=900&fit=crop",
  "burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=900&fit=crop",
  
  // Default fallback
  "default": "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=900&fit=crop"
};

const imgFor = (query, id, extra = "") => {
  const q = (query || "").toLowerCase();
  
  // Find matching image based on keywords in the query
  for (const [key, url] of Object.entries(foodImages)) {
    if (q.includes(key)) return url;
  }
  
  // Check extra keywords
  const e = (extra || "").toLowerCase();
  for (const [key, url] of Object.entries(foodImages)) {
    if (e.includes(key)) return url;
  }
  
  // Return default food image
  return foodImages.default;
};

// Build a YouTube search-based embed for each recipe
const videoFor = (title) =>
  `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent((title || "cooking") + " recipe tutorial")}`;

function addRecipe(entry) {
  const id = entry.id || slug(entry.title);
  recipes.push({
    id,
    title: entry.title,
    time: entry.time,
    level: entry.level,
    serves: entry.serves,
    tags: entry.tags,
    blurb: entry.blurb,
    image: entry.image || imgFor(
      entry.query || entry.title,
      id,
      [
        (entry.tags || []).slice(0, 2).join(" "),
        entry.ingredients?.[0]
      ].filter(Boolean).join(" ")
    ),
    ingredients: entry.ingredients,
    steps: entry.steps,
    video: entry.video || videoFor(entry.query || entry.title)
  });
}

// Curated starter set (varied categories)
[
  {
    title: "Fluffy Pancakes",
    time: "25 min",
    level: "Easy",
    serves: "4",
    tags: ["breakfast", "sweet", "quick"],
    blurb: "Tall, buttery stacks with crisp edges and cloud-soft centers.",
    query: "pancakes stack",
    video: "https://www.youtube.com/embed/IH0bX9zgKwo",
    ingredients: ["2 cups flour", "3 tbsp sugar", "2 tsp baking powder", "2 cups buttermilk", "2 eggs", "1/4 cup melted butter"],
    steps: [
      "Whisk dry ingredients in a bowl.",
      "Beat eggs, buttermilk, and melted butter separately.",
      "Combine wet and dry; small lumps are fine.",
      "Cook 1/4 cup scoops on buttered pan until golden on both sides."
    ]
  },
  {
    title: "Garden Crunch Salad",
    time: "12 min",
    level: "Easy",
    serves: "2",
    tags: ["veggie", "quick", "fresh"],
    blurb: "Juicy tomatoes, cucumber ribbons, olives, and a zippy vinaigrette.",
    query: "fresh garden salad bowl",
    ingredients: ["4 cups lettuce mix", "2 tomatoes", "1 cucumber", "1/2 cup olives", "Vinaigrette", "Salt & pepper"],
    steps: [
      "Wash, dry, and chop vegetables.",
      "Combine in a chilled bowl.",
      "Toss with vinaigrette just before serving; season to taste."
    ]
  },
  {
    title: "Tomato Basil Pasta",
    time: "30 min",
    level: "Easy",
    serves: "3",
    tags: ["comfort", "weeknight"],
    blurb: "Slow-simmered tomatoes, garlic, and torn basil over glossy pasta.",
    query: "tomato basil pasta",
    ingredients: ["400 g pasta", "3 garlic cloves", "800 g canned tomatoes", "Basil leaves", "Olive oil", "Mozzarella"],
    steps: [
      "Boil pasta in salted water; reserve 1/2 cup water.",
      "Sauté garlic in oil 30 seconds.",
      "Add tomatoes; simmer 10–15 minutes and season.",
      "Toss pasta with sauce, mozzarella, and basil."
    ]
  },
  {
    title: "Chocolate Chunk Cookies",
    time: "35 min",
    level: "Easy",
    serves: "24",
    tags: ["sweet", "bake"],
    blurb: "Chewy centers, melty chocolate pools, and caramelized edges.",
    query: "chocolate chip cookies close up",
    ingredients: ["2 1/4 cups flour", "1 tsp baking soda", "1 tsp salt", "1 cup butter", "1.5 cups sugar mix", "2 eggs", "2 tsp vanilla", "2 cups chocolate chips"],
    steps: [
      "Heat oven to 350°F; line trays.",
      "Cream butter and sugars; beat in eggs and vanilla.",
      "Mix in dry ingredients, then fold chips.",
      "Scoop and bake 10–12 minutes until edges set."
    ]
  },
  {
    title: "Herb Grilled Salmon",
    time: "18 min",
    level: "Easy",
    serves: "2",
    tags: ["weeknight", "quick", "seafood"],
    blurb: "Citrusy, herby fillets with crisped edges and flaky centers.",
    query: "grilled salmon fillet lemon herbs",
    ingredients: ["2 salmon fillets", "1 lemon", "2 tbsp olive oil", "Dill", "Salt", "Pepper"],
    steps: [
      "Pat salmon dry; season with salt, pepper, and dill.",
      "Sear skin-side down in hot oiled pan 4–5 min.",
      "Flip, add lemon juice, cook 2–3 min more."
    ]
  },
  {
    title: "Mushroom Risotto",
    time: "45 min",
    level: "Medium",
    serves: "3",
    tags: ["comfort", "veggie"],
    blurb: "Creamy arborio grains with buttery mushrooms and parmesan.",
    query: "mushroom risotto bowl",
    ingredients: ["1.5 cups arborio rice", "2 cups mushrooms", "1 onion", "4 cups broth", "Parmesan", "Butter"],
    steps: [
      "Sauté onion and mushrooms in butter.",
      "Toast rice 1 minute.",
      "Add warm broth 1 ladle at a time, stirring until absorbed.",
      "Finish with parmesan and more butter."
    ]
  },
  {
    title: "Street Beef Tacos",
    time: "22 min",
    level: "Easy",
    serves: "3",
    tags: ["quick", "weeknight"],
    blurb: "Spiced beef tucked in warm tortillas with crisp lettuce.",
    query: "beef tacos street food",
    ingredients: ["500 g ground beef", "Taco seasoning", "8 tortillas", "Lettuce", "Cheddar", "Salsa"],
    steps: [
      "Brown beef; add seasoning and splash of water.",
      "Warm tortillas.",
      "Assemble with beef, lettuce, cheese, and salsa."
    ]
  },
  {
    title: "Cinnamon Apple Pie",
    time: "1 hr 20 min",
    level: "Medium",
    serves: "8",
    tags: ["sweet", "bake"],
    blurb: "Buttery lattice crust hugging tender, spiced apples.",
    query: "apple pie lattice",
    ingredients: ["Pie crust", "6 apples", "3/4 cup sugar", "2 tsp cinnamon", "Butter", "Egg wash"],
    steps: [
      "Slice apples; toss with sugar and cinnamon.",
      "Fill crust; dot with butter.",
      "Top with lattice; brush with egg wash.",
      "Bake at 375°F until golden and bubbly."
    ]
  },
  {
    title: "Ginger Veg Stir Fry",
    time: "15 min",
    level: "Easy",
    serves: "2",
    tags: ["quick", "veggie"],
    blurb: "Snappy veggies in a glossy soy-ginger glaze.",
    query: "vegetable stir fry wok",
    ingredients: ["Mixed veggies", "1 tbsp ginger", "2 garlic cloves", "2 tbsp soy sauce", "1 tbsp oil"],
    steps: [
      "Heat oil in wok.",
      "Flash-fry ginger and garlic 20 seconds.",
      "Add veggies; toss 3–4 minutes.",
      "Finish with soy sauce and serve."
    ]
  },
  {
    title: "Golden Chicken Curry",
    time: "40 min",
    level: "Medium",
    serves: "4",
    tags: ["comfort", "weeknight"],
    blurb: "Coconut-rich gravy with tender chicken and warm spices.",
    query: "chicken curry bowl coconut",
    ingredients: ["500 g chicken", "2 onions", "2 tomatoes", "Curry paste", "1 cup coconut milk", "Oil", "Salt"],
    steps: [
      "Sauté onions until golden.",
      "Bloom curry paste 1 minute.",
      "Add chicken; brown lightly.",
      "Add tomatoes and coconut milk; simmer until thick."
    ]
  }
].forEach(addRecipe);

// Generated world tour mains
const proteins = ["chicken", "salmon", "tofu", "beef", "pork", "shrimp", "lentil", "halloumi"];
const styles = ["teriyaki", "lemon herb", "garlic butter", "spicy chipotle", "honey mustard", "ginger scallion", "mediterranean", "bbq", "creamy parmesan", "thai basil", "tikka", "moroccan"];
const bases = ["bowl", "stir fry", "pasta", "skewers", "tacos", "salad", "sheet pan", "curry", "sandwich", "rice", "wrap"];

let counter = recipes.length;
outer: for (const protein of proteins) {
  for (const style of styles) {
    const base = bases[counter % bases.length];
    const title = `${style.replace(/\b\w/g,c=>c.toUpperCase())} ${protein.charAt(0).toUpperCase()+protein.slice(1)} ${base.replace(/\b\w/g,c=>c.toUpperCase())}`;
    addRecipe({
      title,
      time: `${20 + (counter % 35)} min`,
      level: counter % 3 === 0 ? "Medium" : "Easy",
      serves: `${2 + (counter % 4)}`,
      tags: [base.replace(/\s+/g,""), protein, style.split(" ")[0]],
      blurb: `${style} ${protein} with a ${base} vibe, fast enough for weeknights.`,
      query: `${style} ${protein} ${base}`,
      ingredients: [
        `${500 + (counter % 3) * 100} g ${protein}`,
        `${style} sauce or seasoning`,
        base.includes("pasta") ? "Pasta of choice" : base.includes("rice") ? "Steamed rice" : base.includes("salad") ? "Mixed greens" : "Vegetable mix",
        "Garlic & onion",
        "Oil, salt, pepper",
        "Fresh herbs or lime"
      ],
      steps: [
        "Prep aromatics and vegetables.",
        `Marinate or season ${protein} with ${style} flavors.`,
        `Cook ${protein} until browned and nearly done.`,
        base.includes("pasta")
          ? "Boil pasta; reserve a splash of water."
          : base.includes("rice")
          ? "Steam or reheat rice."
          : base.includes("salad")
          ? "Toss greens with light dressing."
          : "Warm accompaniments.",
        base.includes("stir")
          ? "Toss everything together in the pan with sauce."
          : base.includes("bowl") || base.includes("rice")
          ? "Assemble bowls over grains and drizzle extra sauce."
          : base.includes("wrap") || base.includes("tacos")
          ? "Fill tortillas/wraps and finish with crunch."
          : "Finish with herbs and serve hot."
      ]
    });
    counter += 1;
    if (counter >= 125) break outer; // keep total >100 while reasonable size
  }
}

// Comfort carbs mini-set
const comfort = [
  "Truffle Mac and Cheese",
  "Loaded Baked Potatoes",
  "Creamy Pesto Gnocchi",
  "Smoky Baked Ziti",
  "Spinach Artichoke Lasagna",
  "Butternut Squash Ravioli",
  "Three Bean Chili",
  "Classic Beef Stew",
  "Cajun Jambalaya",
  "Seafood Paella"
];
comfort.forEach((title, i) => addRecipe({
  title,
  time: `${35 + i} min`,
  level: i % 3 === 0 ? "Medium" : "Easy",
  serves: `${4 + (i % 2)}`,
  tags: ["comfort", "hearty", i % 2 ? "weeknight" : "slow"],
  blurb: `${title} that nails cozy-night cravings with big flavor.`,
  query: title.toLowerCase(),
  ingredients: ["Carbs base", "Aromatics", "Cheese or broth", "Vegetables/protein", "Seasoning blend"],
  steps: [
    "Prep aromatics and base components.",
    "Build flavor with sautéed onions, garlic, and spices.",
    "Simmer or bake until textures meld and sauce thickens.",
    "Finish with herbs, cheese, or fresh acidity."
  ]
}));

// Fresh bowls & salads mini-set
const bowls = [
  "Mediterranean Power Bowl",
  "Spicy Korean Bibimbap",
  "Crispy Falafel Bowl",
  "Tandoori Paneer Bowl",
  "Cuban Mojo Chicken Bowl",
  "Thai Peanut Noodle Salad",
  "Watermelon Feta Salad",
  "Roasted Beet Goat Cheese Salad",
  "Crunchy Quinoa Tabbouleh",
  "Tropical Shrimp Mango Salad"
];
bowls.forEach((title, i) => addRecipe({
  title,
  time: `${18 + i} min`,
  level: "Easy",
  serves: `${2 + (i % 3)}`,
  tags: ["fresh", "veggie", "bowl"],
  blurb: `${title} loaded with color, crunch, and bright dressings.`,
  query: title.toLowerCase(),
  ingredients: ["Grain or greens base", "Featured protein/produce", "Pickled element", "Crunchy topping", "Vibrant dressing"],
  steps: [
    "Cook or rinse base (rice, quinoa, or greens).",
    "Prep and season featured protein/produce.",
    "Whisk dressing; balance salt, sweet, acid.",
    "Assemble bowl; finish with crunch and herbs."
  ]
}));

// Sweet finishes mini-set
const sweets = [
  "Lemon Blueberry Cheesecake",
  "Salted Caramel Brownies",
  "Strawberry Shortcakes",
  "Tiramisu Cups",
  "Vanilla Bean Panna Cotta",
  "Key Lime Pie Bars",
  "Banoffee Trifles",
  "Matcha Crepe Cake",
  "Molten Chocolate Lava Cakes",
  "Roasted Peach Cobbler"
];
sweets.forEach((title, i) => addRecipe({
  title,
  time: `${25 + i} min`,
  level: i % 4 === 0 ? "Advanced" : "Medium",
  serves: `${6 + (i % 3)}`,
  tags: ["sweet", "dessert"],
  blurb: `${title} to end the meal on a high note.`,
  query: title.toLowerCase(),
  ingredients: ["Base (crumb/cake)", "Creamy layer or batter", "Fruit or chocolate", "Sugar", "Flavoring"],
  steps: [
    "Prep crust or batter according to recipe.",
    "Fold in flavor additions gently.",
    "Bake/chill until set; cool briefly.",
    "Garnish before serving."
  ]
}));

// More recipes to reach 100+
const moreProteins = ["beef", "pork", "lamb", "fish", "shrimp", "tofu", "eggplant", "zucchini", "chicken", "turkey"];
const moreStyles = ["grilled", "baked", "fried", "stir-fried", "roasted", "steamed", "braised", "poached", "sautéed", "slow-cooked"];
const moreBases = ["salad", "soup", "stew", "curry", "pasta", "rice bowl", "tacos", "sandwich", "pie", "cake", "bread", "muffin", "cookie", "brownie"];

for (let i = 0; i < 50; i++) {
  const protein = moreProteins[i % moreProteins.length];
  const style = moreStyles[i % moreStyles.length];
  const base = moreBases[i % moreBases.length];
  const title = `${style.charAt(0).toUpperCase() + style.slice(1)} ${protein.charAt(0).toUpperCase() + protein.slice(1)} ${base.charAt(0).toUpperCase() + base.slice(1)}`;
  addRecipe({
    title,
    time: `${15 + (i % 30)} min`,
    level: i % 3 === 0 ? "Medium" : "Easy",
    serves: `${2 + (i % 4)}`,
    tags: [base.replace(/\s+/g,""), protein, style.split(" ")[0]],
    blurb: `Delicious ${style} ${protein} in a ${base} form, perfect for any meal.`,
    query: `${style} ${protein} ${base}`,
    ingredients: [
      `${400 + (i % 3) * 100} g ${protein}`,
      `${style} seasoning`,
      base.includes("pasta") ? "Pasta" : base.includes("rice") ? "Rice" : base.includes("salad") ? "Greens" : "Base ingredients",
      "Garlic, onion, oil",
      "Salt, pepper, herbs"
    ],
    steps: [
      "Prep ingredients.",
      `Season and cook ${protein} with ${style} method.`,
      "Prepare the base.",
      "Combine and finish.",
      "Serve hot."
    ],
    video: "https://www.youtube.com/watch?v=example"
  });
}

export const RECIPES = recipes;
export default RECIPES;
