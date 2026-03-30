# Axion Platform: Deployment Standard Operating Procedure (SOP)

## 🐳 Option 1: The Galactic Orchestration (Docker)
This is the recommended path for evaluate-local-verification.

1. **Install Docker** and Docker Compose.
2. **Setup Env**: Run `./scripts/doctor.sh` to scaffold all required `.env` files.
3. **Launch**:
   ```bash
   docker-compose up --build -d
   ```
4. **Verify**: The platform will be accessible at `http://localhost:3000`.

---

## ☁️ Option 2: The Cloud Singularity (Vercel)
For live public hosting.

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Project Link**: 
   ```bash
   cd project && vercel link
   ```
3. **Set Secrets**: Add your `OPENAI_API_KEY` and `DATABASE_URL` as Vercel Environment Variables.
4. **Deploy**:
   ```bash
   vercel deploy --prod
   ```

---

## 🩺 Maintenance Protocols
- **Self-Healing**: Run `./scripts/doctor.sh` if any service fails to start.
- **Interactive Management**: Use `./axion-cli.sh` for guided platform control.
- **CI/CD**: Every push to the `main` branch triggers the GitHub Actions pipeline for automated quality assurance.

---

**Certified Deployment Standards. Axion Intelligence.**
