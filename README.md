# Student Registration Portal

A responsive, zero-dependency web application for student admission registration, ready to deploy on any static hosting platform or web server.

## Included Files

- `index.html` — Semantic HTML5 structure for the multi-section registration form and official receipt modal.
- `style.css` — Responsive styling, form validation states, mobile breakpoints, and clean print-ready receipt styles.
- `script.js` — Client-side validation, live passport photo preview (JPG/PNG up to 2 MB), receipt generation, and JSON/CSV export logic.
- `README.md` — Project overview and deployment instructions.

## Key Features

1. **Multi-Section Form:** Captures Personal Info, Contact Details (`+91` mobile & 6-digit PIN validation), Academic Background, Guardian Info, and Declaration.
2. **Photo Upload & Validation:** Live thumbnail preview with file-type (`JPG`/`PNG`) and file-size (`<= 2 MB`) enforcement.
3. **Instant Official Receipt:** Generates a unique Registration ID (`REG-2026-XXXX`) with timestamp and embedded photo.
4. **Print & Export:** One-click **Print / Save PDF**, **Download JSON**, and **Download CSV** options.

## How to Deploy / Upload

1. Extract the ZIP archive.
2. Upload all four files (`index.html`, `style.css`, `script.js`, `README.md`) to the root directory of your hosting provider:
   - **GitHub Pages:** Push files to a repository and enable Pages under *Settings > Pages*.
   - **Netlify / Vercel:** Drag and drop the extracted folder into the deployment dashboard.
   - **cPanel / Shared Hosting:** Upload the files into your `public_html` directory.
