import { createApp, reactive, computed, toRefs } from "vue";
import { RECIPES } from "./data.js";

// Text-on-gradient fallback with bold styling sized for the hero image.
const fallbackImg = (title = "Recipe") => {
  const safe = (title || "Recipe").replace(/</g, "&lt;").slice(0, 34);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%23a1c4fd'/><stop offset='1' stop-color='%23c2e9fb'/></linearGradient></defs><rect width='1200' height='900' fill='url(%23g)'/><text x='50%' y='50%' font-family='\"Poppins\", \"Segoe UI\", sans-serif' font-size='68' font-weight='700' letter-spacing='1.2' fill='%23222222' text-anchor='middle' dominant-baseline='middle'>${safe}</text><text x='50%' y='66%' font-family='\"Poppins\", \"Segoe UI\", sans-serif' font-size='22' fill='%233a3a3a' text-anchor='middle' opacity='0.7'>seasoned & served</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

createApp({
  setup() {
    const recipeMap = Object.fromEntries(RECIPES.map(r => [r.id, r]));
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("recipe");
    const fallback = localStorage.getItem("lastRecipe");
    const id = recipeMap[fromQuery] ? fromQuery : (recipeMap[fallback] ? fallback : RECIPES[0]?.id);
    const recipe = recipeMap[id];
    if (recipe && id) localStorage.setItem("lastRecipe", id);

    const state = reactive({
      recipe,
      id,
      activeStep: 0,
      checked: new Set(),
      bookmarks: new Set(JSON.parse(localStorage.getItem("bookmarks") || "[]")),
      currentImageIndex: 0
    });

    const isBookmarked = computed(() => state.bookmarks.has(state.id));
    const watchUrl = computed(() => {
      if (!state.recipe) return "";
      return `https://www.youtube.com/results?search_query=${encodeURIComponent((state.recipe.title || "recipe") + " recipe tutorial")}`;
    });

    const progressWidth = computed(() => {
      if (!state.recipe) return "0%";
      return (((state.activeStep + 1) / state.recipe.steps.length) * 100) + "%";
    });

    const persistBookmarks = () => localStorage.setItem("bookmarks", JSON.stringify([...state.bookmarks]));

    const speak = (text) => {
      if (!window.speechSynthesis) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1;
      speechSynthesis.cancel();
      speechSynthesis.speak(utter);
    };

    const toggleBookmark = () => {
      if (state.bookmarks.has(state.id)) state.bookmarks.delete(state.id);
      else state.bookmarks.add(state.id);
      persistBookmarks();
    };

    const toggleCheck = (idx) => {
      if (state.checked.has(idx)) state.checked.delete(idx);
      else state.checked.add(idx);
    };

    const nextStep = () => {
      if (!state.recipe) return;
      state.activeStep = Math.min(state.recipe.steps.length - 1, state.activeStep + 1);
      document.querySelectorAll(".step")[state.activeStep]?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const prevStep = () => {
      state.activeStep = Math.max(0, state.activeStep - 1);
      document.querySelectorAll(".step")[state.activeStep]?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const speakStep = (idx) => {
      state.activeStep = idx;
      speak(state.recipe.steps[idx]);
    };

    const readAll = () => {
      if (!state.recipe) return;
      speak(state.recipe.title + ". Ingredients: " + state.recipe.ingredients.join(", ") + ". Steps: " + state.recipe.steps.join(". "));
    };

    const startCooking = () => {
      if (!state.recipe) return;
      document.querySelector(".steps")?.scrollIntoView({ behavior: "smooth" });
      state.activeStep = 0;
      speak("Starting " + state.recipe.title + ". You have " + state.recipe.steps.length + " steps. " + state.recipe.steps[0]);
    };

    const imgError = (e, title) => {
      e.target.onerror = null;
      // Retry with a real photo tied to the recipe name to avoid text placeholders.
      e.target.src = fallbackImg(title || "recipe");
    };

    return {
      ...toRefs(state),
      isBookmarked,
      progressWidth,
      watchUrl,
      toggleBookmark,
      toggleCheck,
      nextStep,
      prevStep,
      speakStep,
      readAll,
      startCooking,
      imgError
    };
  }
}).mount("#app");
