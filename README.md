# 🧩 2048verse
A modern, React-powered version of the classic **2048** game — built with clean UI, responsive design, and smooth tile animations.

🎮 **Live Demo:** [https://2048verse.netlify.app](https://2048verse.netlify.app)




https://github.com/user-attachments/assets/6706b8aa-6863-4b7a-8d36-81b584a355a7




---
## 🎮 How to Play

1. **Objective:** Combine tiles with the same number to create the **2048 tile**.  
2. **Controls:**  
   - Use the **Arrow Keys** on your keyboard to move tiles **up, down, left, or right**.  
3. **Tile Mechanics:**  
   - When two tiles with the same number collide, they **merge into one tile** with their sum.  
   - After each move, a new tile (2 or 4) appears at a random empty spot.  
4. **Scoring:**  
   - Each merged tile adds its value to your score.  
   - The score updates dynamically at the top-right of the board.  
5. **Game End:**  
   - **Win:** When you create the **2048 tile**.  
   - **Game Over:** When no moves are possible (no empty cells and no adjacent tiles can merge).  
---

## 🚀 Tech Stack

**Frontend:**
- ⚛️ React (with Hooks)
- 🎨 Tailwind CSS
- 🧠 Custom Hooks for keyboard handling
- 🧩 Modular components (Board, Cell, Overlay)

**Utilities:**
- JavaScript-based grid logic
- Functional game engine (move, merge, random tile generation)

**Deployment:**
- 🌐 Netlify

---

## 🧠 Features

✅ Smooth 4×4 grid mechanics  
✅ Dynamic tile movement and merging  
✅ Random tile generation after every move  
✅ Win (2048) & Game Over detection  
✅ Responsive design (desktop & mobile friendly)  
✅ Score tracking  
✅ Simple, clean UI using Tailwind  

---

## 💻 Run Locally

Clone the project

```bash
git clone https://github.com/Jahsid/2048-Game.git
cd 2048-Game
````

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Open your browser at:

```
http://localhost:5173
```

---

## 📁 Folder Structure

```
src/
 ├── components/
 │    ├── Board.jsx
 │    ├── Cell.jsx
 │    ├── GameOverlay.jsx
 │    ├── Title.jsx
 │
 ├── utils/
 │    ├── gameLogic.js
 │
 ├── hooks/
 │    ├── useKeyboard.js
 │
 ├── App.jsx
 ├── index.css
```

---

## 🧩 Future Improvements

* Add touch/swipe controls for mobile
* Include dark/light mode
* Add high score persistence using localStorage
* Smooth tile animations (Framer Motion or CSS transitions)

---

## 👨‍💻 Author

**Muhammed Jahsid**  
Full Stack Developer | React | Node.js | JavaScript | TypeScript  

📧 **Email:** [jahsid.me@gmail.com](mailto:jahsid.me@gmail.com)  
💼 **LinkedIn:** [linkedin.com/in/muhammed-jahsid](https://www.linkedin.com/in/muhammed-jahsid/)  
💻 **GitHub:** [github.com/Jahsid](https://github.com/Jahsid)

---
