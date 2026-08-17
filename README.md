# emrebatuatakan.github.io

Personal site. Plain static HTML and CSS, no build step. GitHub Pages serves
this repo directly from `main`.

```
index.html              the whole page
assets/css/site.css     styles (light + dark themes)
assets/js/site.js       theme toggle, resume viewer, gallery lightbox
assets/cv/              resume PDF
assets/images/frc/      FRC photos
```

## Editing

Open `index.html` and edit the text directly. There is nothing to compile.

To preview locally:

```sh
python3 -m http.server 4001
# then open http://localhost:4001
```

## Updating the resume

Replace `assets/cv/Emre-Batu-Atakan-Resume.pdf` with the new file, keeping the
same name so the links on the page keep working, then update any text in
`index.html` that changed.
