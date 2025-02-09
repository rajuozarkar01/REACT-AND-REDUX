copied from 
Projects\9-social-media
and this is a 
database version:

bu using 'Dummy JESON API'

if some one build up backend for you then how to use
in API Fix data will get

----------------------------------------------------------------------
Error :  resolution (07-02-2025) : Fri : 12:21
----------------------------------------------------------------------
### **Error: "Objects are not valid as a React child (found: object with keys {likes, dislikes})"**  

#### **Reason for the Error:**  
This error occurs because somewhere in your React components, you're trying to render an **object** instead of a **string** or a valid React element. Looking at your code, I see the issue is likely caused by this part in **`Post.jsx`**:

```jsx
<div className="alert alert-success reactions" role="alert">
  This post has been reacted by {post.reactions} people.
</div>
```

The issue is that `post.reactions` from **dummyjson.com** is an **object**:
```json
"reactions": { "likes": 10, "dislikes": 2 }
```
However, you're trying to render `{post.reactions}` directly, which React cannot display.

#### **Fix: Convert Object to a String**
Modify the code in **`Post.jsx`** like this:

```jsx
<div className="alert alert-success reactions" role="alert">
  This post has {post.reactions.likes} likes and {post.reactions.dislikes} dislikes.
</div>
```

If some posts do not have `reactions`, handle it safely:

```jsx
<div className="alert alert-success reactions" role="alert">
  This post has {post.reactions?.likes ?? 0} likes and {post.reactions?.dislikes ?? 0} dislikes.
</div>
```

---

## **Data Flow in Your App**
Here’s how your data flows across components:

### **1. Initial Setup in `App.jsx`**
- Uses **`useState`** to manage the active tab (`Home` or `Create Post`).
- Wraps everything in `<PostListProvider>` to provide global state.

---

### **2. Sidebar (`Sidebar.jsx`)**
- Controls which tab is active.
- Calls `setSelectedTab` to switch between **Home** and **Create Post**.

---

### **3. Home (`PostList.jsx`)**
- Fetches posts from **dummyjson.com** when clicking "Get Posts From Server".
- Calls `addInitialPosts` from **`post-list-store.jsx`** to store posts in global state.
- **Displays** posts using the `Post.jsx` component.

---

### **4. Create Post (`CreatePost.jsx`)**
- Uses form inputs with **useRef** to create a new post.
- Calls `addPost` from **`post-list-store.jsx`** to store posts in global state.

---

### **5. Post Store (`post-list-store.jsx`)**
- Manages posts using **`useReducer`**.
- Provides functions:
  - `addPost` → Adds a new post.
  - `addInitialPosts` → Stores fetched posts.
  - `deletePost` → Removes a post.

---

### **6. Rendering Posts (`Post.jsx`)**
- Displays post **title, body, tags, and reactions**.
- Has a **delete button** to remove a post.

---

### **7. Welcome Message (`WelcomeMessage.jsx`)**
- Shows **"There are no posts"** if `postList` is empty.
- Has a button to fetch posts.

---

## **Summary of the Fix**
1. Update `Post.jsx` to correctly display `reactions` (avoid rendering an object).
2. Ensure all fetched posts have the correct structure before rendering.

Let me know if you need more help! 🚀