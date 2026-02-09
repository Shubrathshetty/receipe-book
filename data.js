(function() {
  const recipes = [];

  const slug = (title) =>
    title.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const imgFor = (query) =>
    `https://source.unsplash.com/900x650/?${encodeURIComponent(query)}`;

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
      image: entry.image || imgFor(entry.query || entry.title),
      ingredients: entry.ingredients,
      steps: entry.steps,
      video: entry.video || ""
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

  window.RECIPES = recipes;
})(); 
