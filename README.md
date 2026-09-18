# NEXUS — Personal Blog Platform

NEXUS is a full-stack personal blog platform built with **React, Vite, React Router, Supabase, and SCSS**.

The project was created as a Week 6 Personal Blog Platform project, with a focus on building a complete authenticated application that supports public blog reading, user-owned blog creation and management, secure database access, Markdown content, responsive design, testing, and continuous integration.

But NEXUS is also a design experiment.

Its visual identity was inspired by the idea of a **futuristic digital oasis** — a place where ideas, stories, technology, and people can connect. The Matrix-inspired atmosphere represents the digital world surrounding the application, while the rabbit-hole concept represents curiosity, exploration, and the willingness to go deeper.

---

## 🌌 The NEXUS Concept

The name **NEXUS** represents a connection point.

A blog is more than a collection of pages. It is a place where one person's thoughts can connect with another person's experience. Every post becomes another point in the network.

The futuristic oasis concept gives the application a visual environment that feels different from a traditional blog. Instead of designing a simple text-based publishing platform, I wanted NEXUS to feel like entering a digital space where ideas are waiting to be explored.

### The Matrix-Inspired Theme

The futuristic visual language was inspired by digital environments, technology, terminal interfaces, glowing colors, and the feeling of entering another layer of the digital world.

The purple and cyan color palette represents the contrast between mystery and technology:

- **Purple** represents imagination, creativity, and the unknown.
- **Cyan** represents technology, connectivity, and digital information.
- **Dark backgrounds** create the feeling of entering a deeper digital environment.
- **Monospace typography** reinforces the terminal-inspired aesthetic.
- **Glowing borders and shadows** create the feeling of a living digital interface.

### 🐇 The Rabbit Hole

The rabbit hole represents curiosity.

The idea comes from the feeling of discovering something unexpected and deciding to keep exploring instead of turning back.

That idea became especially important for the NEXUS 404 page. When a visitor reaches a page that does not exist, the application does not simply display a generic error message. Instead, the visitor encounters the **Nexus-404 rabbit hole**.

The message is essentially:

> You may be lost, but there is still somewhere else to explore.

The rabbit hole therefore became a visual metaphor for both the application's error experience and the learning process behind building the project.

---

# ✨ Features

## Public Experience

- View all published blog posts
- View individual blog posts
- Read Markdown-formatted content
- See blog author information
- See publication dates
- Responsive layout for different screen sizes
- Custom NEXUS 404 experience

## Authentication

- Email/password registration
- Email/password login
- Persistent Supabase authentication sessions
- Display name stored in authentication metadata
- Authenticated user email displayed in the navigation
- Logout functionality
- Logged-in users redirected away from login and registration pages
- Protected authenticated routes
- Guest-only routes for login and registration

## Blog Management

Authenticated users can:

- Create blog posts
- View their own blog posts
- Edit their own blog posts
- Delete their own blog posts
- View individual blog details

Blog ownership is enforced through Supabase Row Level Security.

## Markdown

Blog content supports Markdown using `react-markdown`.

Supported content includes:

- Headings
- Bold text
- Italic text
- Lists
- Links
- Inline code
- Other standard Markdown formatting

Markdown is rendered with `react-markdown` rather than using `dangerouslySetInnerHTML`.

---

## 🌐 Live Demo

**Live Site:** https://nexus-blog-platform.netlify.app/

> Explore NEXUS — a futuristic digital oasis for connecting ideas, stories, and perspectives.

# 🛠️ Technologies

- React
- Vite
- React Router
- Supabase
- PostgreSQL
- SCSS
- React Markdown
- Vitest
- React Testing Library
- Oxlint
- Stylelint
- HTMLHint
- GitHub Actions
- Netlify

---

# 🗺️ Application Routes

| Route                 | Purpose                    | Access        |
| --------------------- | -------------------------- | ------------- |
| `/`                   | Public blog feed           | Public        |
| `/blogs/:blogId`      | Individual blog post       | Public        |
| `/login`              | User login                 | Logged out    |
| `/register`           | User registration          | Logged out    |
| `/my-blogs`           | Manage personal blog posts | Authenticated |
| `/blogs/new`          | Create a blog post         | Authenticated |
| `/blogs/:blogId/edit` | Edit owned blog post       | Author only   |
| `*`                   | NEXUS 404 page             | Public        |

---

# 🔐 Supabase Security

The `blogs` table uses Supabase Row Level Security.

The database allows:

- Public users to read blog posts
- Authenticated users to create their own posts
- Authors to update their own posts
- Authors to delete their own posts

Blog ownership is tied to the authenticated Supabase user through `author_id`.

The application also performs an author check before displaying the edit interface, while the database RLS policies provide the actual security boundary.

This distinction was an important part of my learning. The React application can control what a user sees and which actions are presented to them, but frontend checks alone are not enough to secure the data. The Supabase RLS policies provide the actual database-level protection.

---

# 🔑 Authentication Architecture

NEXUS uses a custom authentication hook rather than wrapping the application in an authentication Provider and React Context.

### Provider and Context Approach

One way to manage authentication in React is to create an authentication Context and place an `AuthProvider` around the application.

The Provider would hold the authentication state and authentication functions and make them available to components through Context. Components could then use a context hook to access the shared authentication information without receiving it through props.

This approach can be useful when many unrelated components throughout a large application need direct access to the same shared state.

My original version of NEXUS used this approach with:

- `AuthProvider`
- `AuthContext`
- `useAuthContext`

The Provider wrapped the application in `main.jsx`, and components accessed authentication through Context.

### The Approach I Chose for NEXUS

After reviewing the application structure and comparing it with the reference architecture, I changed NEXUS to use a custom authentication hook directly.

The final application uses:

```text
src/hooks/useAuth.js
```

The `useAuth.js` hook is called directly inside `App.jsx`.

The hook is responsible for:

- Restoring the existing Supabase session
- Tracking the current authenticated user
- Tracking the authentication loading state
- Registering users
- Logging users in
- Logging users out
- Listening for Supabase authentication state changes

The hook returns JavaScript values and functions:

```text
user
loading
signUp
signIn
signOut
```

It does not return JSX. Because it contains JavaScript logic and does not contain JSX markup, the hook uses the `.js` extension rather than `.jsx`.

This helped me understand an important difference between a **custom hook** and a **Provider component**. A custom hook is a reusable piece of JavaScript logic that can manage and return state, values, and functions. A Provider is a React component that uses Context to make shared values available to components below it in the component tree.

### How Authentication Flows Through NEXUS

The final authentication flow is:

```text
main.jsx
   ↓
BrowserRouter
   ↓
App.jsx
   ↓
useAuth()
   ↓
user + loading + authentication functions
   ↓
AppLayout / routes / pages
```

`App.jsx` receives the authentication information from `useAuth()` and passes only what is needed to other components through props.

For example, `AppLayout` receives the current user and the sign-out function:

```text
App
 ↓
AppLayout
 ↓
Header
```

The Header uses the user information to determine whether to display:

- Login/Register links for logged-out users
- The user's email, My Blogs, Create, and Log Out for authenticated users

The authentication functions are also passed where they are needed instead of making every component access a global Context.

This makes the flow of authentication information visible in the component hierarchy and keeps the authentication logic itself inside the reusable `useAuth.js` hook.

---

# 🧭 Routing Architecture and Outlet

Another important change was restructuring the application layout and routing.

The original application rendered the Header before the routes and the Footer after the routes directly inside `App.jsx`.

The final application uses a shared `AppLayout` with React Router's `Outlet`.

The structure is now:

```text
App
└── AppLayout
    ├── Header
    ├── Outlet
    │   └── Current Page
    └── Footer
```

`AppLayout.jsx` contains the shared Header and Footer and uses:

```jsx
<Outlet />
```

The `Outlet` is the location where the currently matched child route is rendered.

This means that the individual pages no longer need to independently create the overall application layout. They are rendered inside the shared layout provided by `AppLayout`.

### Protected Routes

Authenticated pages are nested inside `ProtectedRoute`.

The structure is:

```text
ProtectedRoute
└── Outlet
    ├── MyBlogs
    ├── NewBlog
    └── EditBlog
```

`ProtectedRoute` checks whether a user is authenticated.

If there is no authenticated user, the visitor is redirected to `/login`.

If a user is authenticated, `ProtectedRoute` renders its nested route through `Outlet`.

This keeps the authentication check in one routing component instead of repeating the same route protection logic on every authenticated page.

### Guest-Only Routes

Login and registration are nested inside `GuestOnlyRoute`.

The structure is:

```text
GuestOnlyRoute
└── Outlet
    ├── Login
    └── Register
```

If a user is already authenticated, `GuestOnlyRoute` redirects them back to the home page.

If there is no authenticated user, the requested guest page is rendered through `Outlet`.

### Why I Used This Structure

Using `Outlet` helped me understand the difference between a page and the application layout surrounding that page.

The layout is responsible for the shared parts of the application:

- Header
- Navigation
- Footer
- Overall application shell

The individual pages are responsible for their own content.

This means I can change the shared Header or Footer in one place without having to repeat it on every page.

It also makes the routing hierarchy easier to understand because protected and guest-only routes can contain their child routes instead of each page having to handle the same routing logic independently.

---

# 🎨 SCSS Architecture

The original `main.scss` file became too large because styles for the entire application were being kept in one file.

As part of the refactor, I divided the stylesheet into smaller SCSS partials.

The final structure is:

```text
src/styles/
├── _auth.scss
├── _blogs.scss
├── _layout.scss
├── _mixins.scss
├── _navigation.scss
├── _pages.scss
├── _reset.scss
├── _variables.scss
└── main.scss
```

The individual files have separate responsibilities:

- `_variables.scss` — colors, spacing, typography, and shared design values
- `_mixins.scss` — reusable SCSS mixins
- `_reset.scss` — global reset and base styles
- `_layout.scss` — general layout and shared element styles
- `_navigation.scss` — Header, navigation, and Footer styles
- `_blogs.scss` — blog cards, blog details, blog management, and blog form styles
- `_auth.scss` — authentication-related styling
- `_pages.scss` — page-specific styles such as Home, New Blog, Edit Blog, and the 404 page
- `main.scss` — the main stylesheet entry point that imports the partials

The final `main.scss` is intentionally small:

```scss
@use "variables";
@use "mixins";
@use "reset";
@use "layout";
@use "navigation";
@use "blogs";
@use "auth";
@use "pages";
```

This change made the stylesheet easier to navigate and maintain. Instead of searching through one very large file whenever I need to change a particular part of the application, I can go directly to the partial responsible for that area.

It also helped me understand that organizing styles is part of application architecture, not just visual design.

---

# 🗄️ Blog Database Structure

The `blogs` table contains:

- `id`
- `title`
- `excerpt`
- `content`
- `author_id`
- `author_name`
- `created_at`
- `updated_at`

Database constraints enforce:

- Title: 3–120 characters
- Excerpt: 10–250 characters
- Content: minimum 50 characters
- Author name: 2–80 characters

The application updates `updated_at` whenever a blog post is edited.

---

# 🧪 Testing & Code Quality

The project includes Vitest and React Testing Library tests for important user interactions.

Current tests verify:

1. Blog content shorter than 50 characters displays a validation error and prevents submission.
2. Valid blog information is submitted correctly after client-side whitespace trimming.

The project also uses automated quality checks through GitHub Actions.

The CI workflow checks:

```text
JavaScript lint
SCSS lint
HTML lint
Vitest
Production build
```

Local quality checks can also be run with:

```bash
npm run lint
npm run lint:scss
npm run lint:html
npm run test
npm run build
```

---

# ✅ Refactor Verification

After completing the architecture changes, I tested the application rather than relying only on the code compiling.

The final local verification included:

- JavaScript/React lint — passed with 0 warnings and 0 errors
- SCSS lint — passed with 0 errors and 0 warnings
- Production build — completed successfully
- Vitest — 2 tests passed
- Home page — verified
- Individual blog page — verified
- Logged-out protected route — verified
- Login page — verified
- Authenticated navigation — verified
- My Blogs page — verified
- Create Blog page — verified
- Edit Blog page — verified
- Shared Header — verified
- Shared Footer — verified
- Supabase blog data — verified
- Nested routing with `Outlet` — verified

I also tested the protected `/my-blogs` route while logged out and confirmed that it redirected to the login page.

After logging in, I confirmed that the authenticated navigation and user-owned blog posts appeared correctly.

These checks gave me confidence that the architectural refactor addressed the instructor feedback without breaking the existing NEXUS functionality or design.

---

# 📁 Project Structure

```text
src/
├── assets/
├── components/
│   ├── auth/
│   ├── blogs/
│   ├── layout/
│   └── routing/
├── hooks/
│   ├── useAuth.js
│   └── useBlogs.js
├── layouts/
│   └── AppLayout.jsx
├── lib/
├── pages/
├── styles/
│   ├── _auth.scss
│   ├── _blogs.scss
│   ├── _layout.scss
│   ├── _mixins.scss
│   ├── _navigation.scss
│   ├── _pages.scss
│   ├── _reset.scss
│   ├── _variables.scss
│   └── main.scss
└── test/

supabase/
├── migrations/
└── queries/

.github/
└── workflows/
    └── ci.yml

public/
└── _redirects
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/pearla-mutombo/week6-blog-platform.git
cd week6-blog-platform
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env.local` file containing:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Do not commit `.env.local` or Supabase secrets to GitHub.

A `.env.example` file is included to show the required environment variable names.

## 4. Start the development server

```bash
npm run dev
```

## 5. Run the quality checks

```bash
npm run lint
npm run lint:scss
npm run lint:html
npm run test
npm run build
```

---

# 🌐 Deployment

The application is designed for deployment with Netlify.

The project includes:

```text
public/_redirects
```

with the SPA redirect:

```text
/* /index.html 200
```

This allows React Router routes to continue working when a user directly refreshes a nested URL.

---

# 💭 Personal Reflection

## What I Learned

This project helped me understand how the different pieces of a modern web application work together.

I already knew how to create individual React components, but this project pushed me further into thinking about the application as a complete system.

I learned how to use React Router to organize public and protected pages, how a custom authentication hook can manage Supabase authentication state, and how Supabase can provide both authentication and database functionality.

One of the most important lessons was understanding the difference between an authentication Provider and a custom hook. My original implementation used Context and an `AuthProvider`, but after studying the reference architecture and thinking about the needs of this application, I changed NEXUS to use `useAuth.js` directly from `App.jsx`.

That change helped me understand that a hook does not have to provide JSX or wrap an application. A hook can simply manage reusable JavaScript logic and return state and functions that a component can use.

I also learned more about React Router's `Outlet` and how a shared layout can contain the Header, Footer, and the current page without repeating the same layout structure on every page.

One of the most important lessons was understanding that frontend authorization and database security are not the same thing. I learned that hiding an edit button or checking the current user in React is useful for the user experience, but the database must still enforce ownership through Row Level Security.

I also gained more experience creating reusable components and custom hooks instead of putting all of the application logic inside individual pages.

## Challenges I Encountered

One of the biggest challenges was connecting the different parts of the application correctly.

Authentication, protected routes, Supabase queries, ownership rules, and React state all depend on one another. A problem in one area could affect another part of the application.

Understanding the difference between using a Provider and using a custom hook was also an important challenge. At first, I understood the two approaches mainly as different ways of accessing authentication information. After working through the architecture, I better understood that they solve the problem differently. Context and a Provider distribute shared state through the React component tree, while a custom hook can keep reusable logic in one place and return the information needed by the component that calls it.

The routing architecture was another challenge. I needed to understand how `Outlet` works and how nested routes can be used to render different pages inside a shared layout.

The SCSS structure also became a challenge as the application grew. Having most of the styles in one large `main.scss` file made the stylesheet harder to maintain. Breaking the styles into smaller partials required me to identify which styles belonged together and how they should be imported.

Understanding Supabase Row Level Security was another important challenge. I had to learn how authenticated users are identified through `auth.uid()` and how policies can restrict database operations to the owner of a record.

Routing and deployment were also areas that required careful attention. A React single-page application needs the server to redirect unknown routes back to `index.html`, which is why the Netlify `_redirects` file became an important part of the project.

Testing was another area where I had to think differently. Instead of only checking whether the application looked correct in the browser, I learned how to test actual user behavior with React Testing Library and `userEvent`.

## How I Solved the Challenges

I approached the project by breaking the larger application into smaller pieces.

I created reusable components for authentication and blog forms, custom hooks for authentication and blog data, protected routing for authenticated pages, guest-only routing for authentication pages, a shared application layout, and separate pages for each major user experience.

When I received feedback about the authentication architecture, I compared my implementation with the reference architecture and changed the application instead of simply explaining why my original approach worked.

I removed the authentication Provider and Context structure and moved the authentication logic into `useAuth.js`.

I also changed the hook files from `.jsx` to `.js` because the hooks return JavaScript state and functions rather than JSX.

For routing, I created `AppLayout` and used `Outlet` so that the current page is rendered inside the shared application structure. I also used `ProtectedRoute` and `GuestOnlyRoute` as nested route components.

For the stylesheet, I divided the large `main.scss` file into smaller partials based on responsibility. The main stylesheet now acts as the entry point instead of containing all of the application's styles.

For database security, I used Supabase RLS policies to make ownership part of the database rules.

For form behavior, I added client-side validation while keeping the database constraints as the final protection for the stored data.

For quality control, I added automated tests and GitHub Actions so that the project could verify its own code before changes were merged.

## What I Would Take Into My Future Projects

The biggest takeaway from this project is that becoming a better developer is not only about learning more syntax.

It is about learning how to think about an application as a complete system.

This project strengthened my understanding of:

- React component architecture
- React Router
- Nested routes
- `Outlet`
- Protected routes
- Guest-only routes
- Authentication
- Custom React hooks
- Supabase
- PostgreSQL
- Row Level Security
- CRUD operations
- API/database communication
- Reusable components
- Form validation
- Markdown rendering
- SCSS architecture
- Responsive design
- Accessibility
- Automated testing
- Git and GitHub workflows
- Pull requests
- Continuous integration
- Deployment preparation
- Debugging

Most importantly, I learned to be more patient and methodical when solving problems.

Instead of being discouraged when something did not work immediately, I learned to investigate the problem, isolate the cause, test a solution, and verify the result.

That mindset is one of the most valuable skills I am taking from this project.

## Final Reflection

NEXUS represents more than a completed assignment for me.

It represents the transition from learning individual technologies to understanding how those technologies work together to create a real application.

The futuristic oasis and rabbit-hole concept reflects that experience. Building an application often feels like entering a rabbit hole: one problem leads to another discovery, and every new discovery creates an opportunity to learn something deeper.

The instructor feedback on this project also became part of that learning process. Instead of only looking at whether the application worked, I had to look more closely at how the application was structured and why I chose certain architectural decisions.

That process helped me understand that writing working code is only one part of development. Being able to explain why the code is structured a certain way, keep the architecture maintainable, and recognize when an existing approach can be improved are also important parts of becoming a better developer.

I know there is still much more for me to learn as a developer, but this project gave me greater confidence in my ability to build, debug, test, secure, document, and deploy a full web application.

**NEXUS is a reminder that curiosity is part of development — and sometimes going down the rabbit hole is exactly how we learn.**
