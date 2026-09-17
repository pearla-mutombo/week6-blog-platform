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

* **Purple** represents imagination, creativity, and the unknown.
* **Cyan** represents technology, connectivity, and digital information.
* **Dark backgrounds** create the feeling of entering a deeper digital environment.
* **Monospace typography** reinforces the terminal-inspired aesthetic.
* **Glowing borders and shadows** create the feeling of a living digital interface.

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

* View all published blog posts
* View individual blog posts
* Read Markdown-formatted content
* See blog author information
* See publication dates
* Responsive layout for different screen sizes
* Custom NEXUS 404 experience

## Authentication

* Email/password registration
* Email/password login
* Persistent Supabase authentication sessions
* Display name stored in authentication metadata
* Authenticated user email displayed in the navigation
* Logout functionality
* Logged-in users redirected away from login and registration pages
* Protected authenticated routes

## Blog Management

Authenticated users can:

* Create blog posts
* View their own blog posts
* Edit their own blog posts
* Delete their own blog posts
* View individual blog details

Blog ownership is enforced through Supabase Row Level Security.

## Markdown

Blog content supports Markdown using `react-markdown`.

Supported content includes:

* Headings
* Bold text
* Italic text
* Lists
* Links
* Inline code
* Other standard Markdown formatting

Markdown is rendered with `react-markdown` rather than using `dangerouslySetInnerHTML`.

---

# 🛠️ Technologies

* React
* Vite
* React Router
* Supabase
* PostgreSQL
* SCSS
* React Markdown
* Vitest
* React Testing Library
* Oxlint
* Stylelint
* HTMLHint
* GitHub Actions
* Netlify

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

* Public users to read blog posts
* Authenticated users to create their own posts
* Authors to update their own posts
* Authors to delete their own posts

Blog ownership is tied to the authenticated Supabase user through `author_id`.

The application also performs an author check before displaying the edit interface, while the database RLS policies provide the actual security boundary.

---

# 🗄️ Blog Database Structure

The `blogs` table contains:

* `id`
* `title`
* `excerpt`
* `content`
* `author_id`
* `author_name`
* `created_at`
* `updated_at`

Database constraints enforce:

* Title: 3–120 characters
* Excerpt: 10–250 characters
* Content: minimum 50 characters
* Author name: 2–80 characters

The application updates `updated_at` whenever a blog post is edited.

---

# 🧪 Testing & Code Quality

The project includes Vitest and React Testing Library tests for important user interactions.

Current tests verify:

1. Blog content shorter than 50 characters displays a validation error and prevents submission.
2. Valid blog information is submitted correctly after client-side whitespace trimming.

The project also uses automated quality checks through GitHub Actions.

Every CI run checks:

```text
JavaScript lint
SCSS lint
HTML lint
Vitest
Production build
```

The CI workflow runs on pushes to the main project branches and pull requests targeting `main`.

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
├── lib/
├── pages/
├── styles/
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

I learned how to use React Router to organize public and protected pages, how authentication state can be shared throughout an application using React context, and how Supabase can provide both authentication and database functionality.

One of the most important lessons was understanding that frontend authorization and database security are not the same thing. I learned that hiding an edit button or checking the current user in React is useful for the user experience, but the database must still enforce ownership through Row Level Security.

I also gained more experience creating reusable components and custom hooks instead of putting all of the application logic inside individual pages.

## Challenges I Encountered

One of the biggest challenges was connecting the different parts of the application correctly.

Authentication, protected routes, Supabase queries, ownership rules, and React state all depend on one another. A problem in one area could affect another part of the application.

Understanding Supabase Row Level Security was another important challenge. I had to learn how authenticated users are identified through `auth.uid()` and how policies can restrict database operations to the owner of a record.

Routing and deployment were also areas that required careful attention. A React single-page application needs the server to redirect unknown routes back to `index.html`, which is why the Netlify `_redirects` file became an important part of the project.

Testing was another area where I had to think differently. Instead of only checking whether the application looked correct in the browser, I learned how to test actual user behavior with React Testing Library and `userEvent`.

## How I Solved the Challenges

I approached the project by breaking the larger application into smaller pieces.

I created reusable components for authentication and blog forms, custom hooks for authentication and blog data, protected routing for authenticated pages, and separate pages for each major user experience.

When something did not work, I learned to inspect the specific layer responsible for the problem instead of changing unrelated parts of the application.

For database security, I used Supabase RLS policies to make ownership part of the database rules.

For form behavior, I added client-side validation while keeping the database constraints as the final protection for the stored data.

For quality control, I added automated tests and GitHub Actions so that the project could verify its own code before changes were merged.

## What I Would Take Into My Future Projects

The biggest takeaway from this project is that becoming a better developer is not only about learning more syntax.

It is about learning how to think about an application as a complete system.

This project strengthened my understanding of:

* React component architecture
* React Router
* Protected routes
* Authentication
* Supabase
* PostgreSQL
* Row Level Security
* CRUD operations
* API/database communication
* Reusable components
* Custom React hooks
* Form validation
* Markdown rendering
* SCSS architecture
* Responsive design
* Accessibility
* Automated testing
* Git and GitHub workflows
* Pull requests
* Continuous integration
* Deployment preparation
* Debugging

Most importantly, I learned to be more patient and methodical when solving problems.

Instead of being discouraged when something did not work immediately, I learned to investigate the problem, isolate the cause, test a solution, and verify the result.

That mindset is one of the most valuable skills I am taking from this project.

## Final Reflection

NEXUS represents more than a completed assignment for me.

It represents the transition from learning individual technologies to understanding how those technologies work together to create a real application.

The futuristic oasis and rabbit-hole concept reflects that experience. Building an application often feels like entering a rabbit hole: one problem leads to another discovery, and every new discovery creates an opportunity to learn something deeper.

I know there is still much more for me to learn as a developer, but this project gave me greater confidence in my ability to build, debug, test, secure, document, and deploy a full web application.

**NEXUS is a reminder that curiosity is part of development — and sometimes going down the rabbit hole is exactly how we learn.**
