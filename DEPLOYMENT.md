# Clinic Website Deployment Guide

## Environment Setup

### Frontend (Netlify)
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Node Version**: 18
- **Environment Variables**:
  - `REACT_APP_API_URL=https://clinic-website-t96n.onrender.com`

### Backend (Render)
- **Runtime**: Node.js
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `NODE_ENV=production`
  - `PORT=10000` (auto-assigned by Render)
  - Database connection string
  - JWT_SECRET

## Deployment Checklist

### Pre-Deployment
- [ ] Test all API endpoints locally
- [ ] Verify environment variables are set
- [ ] Run `npm run build` successfully
- [ ] Test health check endpoint: `GET /health`
- [ ] Test warm-up endpoint: `GET /warm`

### Netlify Deployment
1. Connect repository to Netlify
2. Set build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `build`
3. Configure environment variables in Netlify dashboard
4. Deploy and verify SPA redirects work

### Render Deployment
1. Connect repository to Render
2. Select "Web Service"
3. Configure build settings:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables
5. Deploy and verify health endpoint responds

## Performance Optimization

### Cold Start Prevention
- Frontend automatically warms up backend every 10 minutes in production
- Health checks available at `/health`
- Warm-up endpoint at `/warm`

### Caching Strategy
- Static assets cached for 1 year
- Images cached for 24 hours
- API responses not cached (dynamic content)

### Security Headers
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Monitoring

### Health Checks
- Visit `https://your-netlify-site.netlify.app` (frontend)
- API health: `https://clinic-website-t96n.onrender.com/health`
- Warm-up: `https://clinic-website-t96n.onrender.com/warm`

### Common Issues
1. **Cold starts**: Wait 10-30 seconds for first request
2. **API timeouts**: Frontend handles 15-second timeouts gracefully
3. **Environment variables**: Check both Netlify and Render dashboards

## Rollback Plan
- Netlify maintains deployment history
- Render allows instant rollbacks
- Keep backup of working environment variables