# Deploy (Netlify)

## One-time setup
1. Push this project to GitHub.
2. Netlify → **Add new site** → **Import an existing project**.
3. Choose **GitHub** and select this repo.
4. Build settings:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.`
5. Click **Deploy site**.

## Updates (every time)
1. In the project folder run:
   - `git add .`
   - `git commit -m "Update"`
   - `git push`
2. Netlify auto-deploys in ~10–60 seconds.

