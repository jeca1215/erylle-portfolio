Drop your images here, then update index.html:

1. Hero portrait
   - Add: portrait.jpg (or .png)
   - In index.html, inside <div class="hero__portrait-frame">,
     replace the placeholder <div> with:
     <img src="assets/images/portrait.jpg" alt="Portrait of Erylle">

2. About photo
   - Add: about.jpg (or .png)
   - In index.html, inside <div class="about__image">,
     replace the placeholder <div> with:
     <img src="assets/images/about.jpg" alt="Photo of Erylle">

3. CV
   - Add your CV as a PDF anywhere under assets/, e.g. assets/Erylle_CV.pdf
   - In index.html, update the "Download CV" link's href, and remove
     the preventDefault() in js/main.js for the #downloadCvBtn handler
     (or just delete that whole block once the real link is in place).
