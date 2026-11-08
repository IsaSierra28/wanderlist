# Week 7 Reflection – Wanderlist

## 1. What I understand now

**Saving and loading.** Without saving, my places live only in React state, which is memory. When the app closes, the memory is gone and the list resets to my three starting places. To fix that I wrote two small functions in `storage.ts`. `savePlaces` turns the array into a string with `JSON.stringify` and stores it in AsyncStorage. `loadPlaces` reads the string back and parses it. The provider calls `loadPlaces` once in a `useEffect` with an empty dependency array, so it runs only when the app starts. A second `useEffect` saves every time `places` changes. The part that took me longest was the `ready` flag. Without it, the save effect also runs on the first render, before loading has finished. It would overwrite the saved list with the three starting places, and my data would be lost on every restart. The flag means "don't save until you have loaded".

**Navigation and route params.** The place detail screen lives in `place/[id].tsx`. The brackets mean the file name is a variable, so one screen can show any place. When I tap a card, the router passes that place's `id`. Inside the screen I read it with `useLocalSearchParams` and look the place up in the shared list. Without the param, I would need a separate screen for every place, or the detail screen would not know which place to show. I also learned that the param always arrives as a string. That is fine for me because my ids are strings, but it would bite me with numeric ids.

## 2. Where I actually am

**Solid:** Getting a place from the list to its detail screen feels solid, and so does the shared `PlacesProvider`. I can explain how data flows from the provider, through `usePlaces`, to the screens. I also feel good about the typed `Place` model, because TypeScript tells me when I use a field wrong.

**Not yet:** I could not rebuild the camera flow (permission request, then `launchCameraAsync`, then storing the `photoUri`) from a blank file without looking at the docs. I follow each step, but I could not tell you why the permission has to be requested before launching the camera, or what happens to the photo file if the user denies it. I also can follow `async/await` inside `useEffect`, but I don't fully understand why the effect function itself can't be `async`, which is why I wrap it in an inner `load()` function. [EDIT: add any other gap that is true for you.]

**What I would redo:** My context functions like `addPlace` and `setPhoto` use `setPlaces([...places, place])`, which reads the current `places` value. If two updates happened in the same render, one could be lost. The safer pattern is `setPlaces(prev => ...)`. I would also add error handling around `JSON.parse` in `loadPlaces`, because corrupted saved data would currently crash the app on startup.

## 3. Where my Final Project stands

[EDIT: this section has to come from you, because only you know your Final Project. Fill in these three things:]

- **Built and running today:** [e.g. screens, features, data that already work]
- **Next:** [the next two or three things you will build]
- **Blocker (to bring to class):** [the one concrete thing stopping you, stated precisely]
