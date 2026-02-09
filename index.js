import { createApp, reactive, computed, toRefs } from "vue";
import { RECIPES } from "./data.js";

const fallbackImg = (title = "Recipe") => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='650'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%23f6d365'/><stop offset='1' stop-color='%23fda085'/></linearGradient></defs><rect width='900' height='650' fill='url(%23g)'/><text x='50%' y='52%' font-family='Segoe UI, sans-serif' font-size='42' fill='%231f2933' text-anchor='middle'>${title.replace(/</g,"&lt;").slice(0,20)}</text></svg>`;
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
      window.location.href = "recipe.html?recipe=" + encodeURIComponent(id);
    };

    const peek = (recipe) => { state.peekItem = recipe; };

    const toggleBookmark = (id) => {
      if (state.bookmarks.has(id)) state.bookmarks.delete(id);
      else state.bookmarks.add(id);
      saveBookmarks();
    };

    const imgError = (e, title) => {
      e.target.onerror = null;
      e.target.src = fallbackImg(title);
    };

    return { ...toRefs(state), filtered, saved, toggleTag, tagClass, openRecipe, peek, toggleBookmark, imgError };
  }
}).mount("#app");
