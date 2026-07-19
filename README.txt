COUSIN BIRTHDAY WEBSITE — SETUP GUIDE
=====================================

FILES INCLUDED
--------------
index.html      Home page with birthday photo and animated greeting
quiz.html       Tricky birthday quiz
 gallery.html    Photo gallery with full-screen lightbox
video.html      Birthday video page
note.html       Animated envelope and birthday letter
styles.css      Complete responsive design and animations
script.js       Quiz, confetti, music, gallery and letter logic

FOLDERS
-------
assets/images/
assets/video/
assets/audio/

ADD THESE FILES WITH EXACT NAMES
--------------------------------
assets/images/hero.jpg
assets/images/photo1.jpg
assets/images/photo2.jpg
assets/images/photo3.jpg
assets/images/photo4.jpg
assets/images/photo5.jpg
assets/images/photo6.jpg
assets/images/video-cover.jpg
assets/video/birthday-video.mp4
assets/audio/birthday-song.mp3  (optional)

CHANGE THE BIRTHDAY GIRL'S NAME
-------------------------------
Open script.js and change:
const birthdayName = "Little Sister";

CUSTOMIZE QUIZ
--------------
Open script.js and edit the quizQuestions array.
The correctAnswer values start from zero:
0 = first option
1 = second option
2 = third option
3 = fourth option

CUSTOMIZE LETTER
----------------
Open note.html and replace the letter paragraphs and signature.

GITHUB PAGES DEPLOYMENT
-----------------------
1. Sign in to GitHub.
2. Click New repository.
3. Repository name example: my-sister-birthday.
4. Set it to Public and create repository.
5. Upload every file and the assets folder.
6. Open repository Settings.
7. Select Pages from the left menu.
8. Under Build and deployment, choose Deploy from a branch.
9. Select Branch: main and Folder: /root.
10. Click Save.
11. After deployment, your link will look like:
    https://YOUR-USERNAME.github.io/my-sister-birthday/

IMPORTANT
---------
Do not rename index.html.
Use small, compressed images for faster mobile loading.
Recommended image size: 800 to 1400 pixels wide.
Recommended video: MP4, H.264, ideally under 25 MiB for browser upload.
The GitHub web uploader accepts files up to 25 MiB. For larger files, use GitHub Desktop or the command line; normal Git repositories reject individual files at 100 MiB.
Music starts only after the visitor taps the music button because mobile browsers block automatic audio.
