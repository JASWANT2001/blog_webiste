Blog Website
Overview
This project is a blog website built using React (Vite) with a black and grey theme. Users can add, view, and delete blog posts. The site includes a responsive design for mobile users.

Features
Add New Blog: Users can create a blog post with a title, date, content, and image.

View Blogs: Blogs are displayed as cards with a clickable preview.

Full Blog View: Clicking a blog expands it to show the full content.

Delete Blog: A delete button allows users to remove unwanted blogs.

Comment Section: Users can add comments to a blog, which are stored persistently.

LocalStorage Support: Blogs and comments are saved even after a page refresh.

Dark Theme: Styled with black and grey for a modern look.

Responsive Design: Optimized for mobile and desktop views.

Technologies Used
Frontend: React (Vite), HTML, CSS, JavaScript

State Management: React Hooks (useState, useEffect)

Data Persistence: LocalStorage

Styling: CSS with a dark theme & media queries

Installation
Clone this repository:

git clone https://github.com/your-repo/blog-website.git
Navigate to the project folder:

cd blog-website
Install dependencies:

npm install
Start the development server:

npm run dev
Usage
Click the Add Blog button to open a form.

Fill in the Title, Date, Content, and Image.

Click Submit to add the blog.

Click on any blog card to open it in full view.

Add comments to the blog and click Done.

Click the Delete button to remove a blog.

The data will persist even after refreshing the page.

Responsive Design
The layout adapts to mobile screens using CSS media queries.

On smaller screens, blog cards are displayed in full width.

Future Improvements
Implement user authentication.

Add like and share buttons.

Enhance the UI with animations.

Use a backend with a database for permanent storage.
