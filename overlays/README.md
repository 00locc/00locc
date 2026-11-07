# Church lower thirds for Wirecast

`lower-third.html` is one self-contained file: fonts and code are built in, so it
keeps working even if the internet drops during a service.

## 1. Put it on the church Mac
1. Download `lower-third.html` from this repo (open the file on GitHub → **Download raw file**).
2. Make a folder, e.g. `Documents/Overlays`, and put the file there.
3. Optional: put your church logo in the same folder, named **`logo.png`**.

## 2. Make the overlays
Double-click `lower-third.html` to open the **Lower Third Maker** in Chrome or Safari.

- Type the **Section** (e.g. Divine Service), **Role** (e.g. Scripture Reading) and **Name**.
- Pick a **Look** (Royal, Light, Minimal) and an **accent colour**.
- For the whole service, fill in **Whole service at once**, one line each:
  `Divine Service | Scripture Reading | Elder Kwame Asante`

## 3. Add them to Wirecast — pick one way

**A. Still images (simplest, most reliable)**
1. Click **Download all PNGs (ZIP)** and unzip it.
2. Drag the PNGs into an upper layer in Wirecast (above your cameras).
3. Click a shot to show it; click **Clear Layer** to hide it. Use the **Smooth** transition for a fade.

**B. Animated (slides in)**
1. Click **Link** next to a person (or **Copy Wirecast link**).
2. In Wirecast: **+** on an upper layer → **Web Page** → paste the link → size **1920 × 1080**.
3. The bar slides in each time the page loads. If it doesn't replay when the shot goes live,
   use Wirecast's option to reload the page when the shot goes live, or use the still PNGs.

### Link options (for advanced use)
`lower-third.html?section=…&role=…&name=…&theme=royal|light|minimal&accent=d4a63a&logo=1&anim=0`

## For whoever edits the design
Edit `src/lower-third.src.html`, then rebuild:
```
npm install --prefix overlays/src html-to-image@1.11.11 jszip@3.10.1 @fontsource/montserrat@5
node overlays/src/build.js
```
