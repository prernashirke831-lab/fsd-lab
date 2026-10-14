"""Builds the standalone (double-click) HTML pages for the React assignments
from the Vite source files, so the code is written only once."""
import re, pathlib
root = pathlib.Path(__file__).parent
src = root / "react-vite-project" / "src"
css = (src / "styles.css").read_text()

def strip(code):
    code = re.sub(r'^import .*?;\s*$', '', code, flags=re.M)
    return code.replace("export default function", "function")

pages = {
  "assignment-4-react-profile-card": ("Assignment 4 – React Profile Card", ["components/ProfileCard.jsx", "pages/Assignment4.jsx"], "Assignment4", 4),
  "assignment-5-react-controlled-form": ("Assignment 5 – Controlled React Form", ["pages/Assignment5.jsx"], "Assignment5", 5),
  "assignment-6-react-counter": ("Assignment 6 – React Counter App", ["pages/Assignment6.jsx"], "Assignment6", 6),
}
for folder, (title, files, comp, n) in pages.items():
    code = "\n".join(strip((src / f).read_text()) for f in files)
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<style>
{css}
.back{{display:inline-block;margin-bottom:1rem;color:var(--accent);font-weight:600;text-decoration:none}}
</style>
</head>
<body>
<div class="app">
  <a class="back" href="../index.html">All assignments</a>
  <div id="root"></div>
</div>
<!-- React 18 + Babel loaded from CDN so this file opens with a double-click (internet needed). -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.development.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.development.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.9/babel.min.js"></script>
<script type="text/babel">
const {{ useState }} = React;
{code}
ReactDOM.createRoot(document.getElementById("root")).render(<{comp} />);
</script>
</body>
</html>
"""
    (root / folder / "index.html").write_text(html)
    print("built", folder)
