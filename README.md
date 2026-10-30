# אתר החתונה – נסטיה ושי

אתר סטטי בעמוד אחד: `index.html` + תיקיית `assets/`.

## חיבור אישורי ההגעה והשירים ל-Google Sheets (חינם)

1. פותחים גיליון חדש ב-[Google Sheets](https://sheets.new) ונותנים לו שם, למשל "חתונה – אישורי הגעה".
2. בתפריט: **הרחבות ← Apps Script**.
3. מוחקים את מה שיש שם, ומדביקים את כל התוכן של `google-apps-script.gs`. שומרים.
4. **פריסה (Deploy) ← פריסה חדשה (New deployment)** ← סוג: **אפליקציית אינטרנט (Web app)**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. מאשרים הרשאות (Google תזהיר שהאפליקציה לא מאומתת – זה הסקריפט שלכם: Advanced ← Go to … ).
6. מעתיקים את ה-**Web app URL** (מתחיל ב-`https://script.google.com/macros/s/…/exec`).
7. ב-`index.html` מדביקים אותו בשורה:
   ```js
   const SHEET_URL = 'https://script.google.com/macros/s/…/exec';
   ```

מעכשיו כל אישור הגעה נכנס ללשונית "אישורי הגעה" וכל שיר ללשונית "שירים".

## מוזיקה משלכם (אופציונלי)

שמים קובץ MP3 בתיקיית `assets/` וכותבים ב-`index.html`:
```js
const MUSIC_URL = 'assets/song.mp3';
```
בלי זה, האתר מנגן בעצמו עיבוד עדין לקנון של פכלבל.
