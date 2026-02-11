import { createApp, reactive, computed, toRefs } from "vue";
import { RECIPES } from "./data.js";

// Text-on-gradient fallback with bolder styling to fill the frame nicely.
const fallbackImg = (title = "Recipe") => {
  const safe = (title || "Recipe").replace(/</g, "&lt;").slice(0, 28);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='650'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%23ff9a9e'/><stop offset='1' stop-color='%23fad0c4'/></linearGradient></defs><rect width='900' height='650' fill='url(%23g)'/><text x='50%' y='54%' font-family='\"Poppins\", \"Segoe UI\", sans-serif' font-size='52' font-weight='700' letter-spacing='1' fill='%23171717' text-anchor='middle' dominant-baseline='middle'>${safe}</text><text x='50%' y='72%' font-family='\"Poppins\", \"Segoe UI\", sans-serif' font-size='18' fill='%23333333' text-anchor='middle' opacity='0.65'>chef-crafted flavor</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

createApp({
  setup() {
    const state = reactive({
      recipes: RECIPES,
      query: "",
      activeTags: new Set(),
      bookmarks: new Set(JSON.parse(localStorage.getItem("bookmarks") || "[]")),
      peekItem: null,
      chips: ["Quick", "Veggie", "Comfort", "Sweet", "Weeknight"]
    });

    const saved = computed(() =>
      state.recipes.filter(r => state.bookmarks.has(r.id))
    );

    const filtered = computed(() => {
      const text = state.query.trim().toLowerCase();
      return state.recipes.filter(r => {
        const matchesText =
          r.title.toLowerCase().includes(text) ||
          r.blurb.toLowerCase().includes(text) ||
          r.tags.some(t => t.toLowerCase().includes(text)) ||
          r.ingredients.some(i => i.toLowerCase().includes(text));
        const matchesTag = state.activeTags.size === 0 || r.tags.some(t => state.activeTags.has(t.toLowerCase()));
        return matchesText && matchesTag;
      });
    });

    const saveBookmarks = () => localStorage.setItem("bookmarks", JSON.stringify([...state.bookmarks]));

    const toggleTag = (tag) => {
      if (state.activeTags.has(tag)) state.activeTags.delete(tag);
      else state.activeTags.add(tag);
    };

    const tagClass = (t) => t === "veggie" ? "veggie" : t === "quick" ? "quick" : t === "sweet" ? "sweet" : "";

    const openRecipe = (id) => {
      localStorage.setItem("lastRecipe", id);
      const base = (import.meta && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : "/";
      window.location.href = `${base}recipe.html?recipe=${encodeURIComponent(id)}`;
    };

    const peek = (recipe) => { state.peekItem = recipe; };

    const toggleBookmark = (id) => {
      if (state.bookmarks.has(id)) state.bookmarks.delete(id);
      else state.bookmarks.add(id);
      saveBookmarks();
    };

    const imgError = (e, title) => {
      e.target.onerror = null;
      // Retry with a fresh, food-themed photo for that recipe.
      e.target.src = fallbackImg(title || "recipe");
    };

    return { ...toRefs(state), filtered, saved, toggleTag, tagClass, openRecipe, peek, toggleBookmark, imgError };
  }
}).mount("#app");
