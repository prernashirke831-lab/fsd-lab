# MCA40290: Lab on Full Stack Development (Assignments 1 to 6)

Open `index.html` in a browser to see the home page with links to every assignment.

| # | Assignment | Folder | How to open |
|---|------------|--------|-------------|
| 1 | JavaScript Calculator | `assignment-1-calculator` | double-click `index.html` |
| 2 | DOM To-Do List | `assignment-2-todo` | double-click `index.html` |
| 3 | Form Validation | `assignment-3-form-validation` | double-click `index.html` |
| 4 | React Profile Card (props) | `assignment-4-react-profile-card` | double-click `index.html` (internet needed for React CDN) |
| 5 | Controlled React Form | `assignment-5-react-controlled-form` | same as above |
| 6 | React Counter (useState) | `assignment-6-react-counter` | same as above |

Assignments 4, 5 and 6 also exist as a proper Vite project in `react-vite-project/` (`npm install`, `npm run dev`).
The standalone pages are generated from that project's source by `build_react_pages.py`.

## Push to GitHub

```bash
cd fsd-lab
git init
git add .
git commit -m "Add FSD lab assignments 1-6"
git branch -M main
git remote add origin https://github.com/prernashirke831-lab/<repo-name>.git
git push -u origin main
```

Create the empty repository `<repo-name>` on GitHub first (for example `fsd-lab`).
