#!/bin/bash

echo "🎵 LE SCRIPT - Setup Initial"
echo "================================"

# Backend setup
echo "📦 Installation backend..."
cd backend
npm install
cp .env.example .env
echo "✅ Backend prêt"

# Frontend setup
echo "📦 Installation frontend..."
cd ../frontend
npm install
echo "✅ Frontend prêt"

echo ""
echo "✨ Installation complète!"
echo ""
echo "📝 Prochaines étapes:"
echo "1. Configurez votre .env dans backend/"
echo "2. Démarrez le backend: cd backend && npm run start:dev"
echo "3. Démarrez le frontend: cd frontend && npm run dev"
echo ""
echo "🚀 Frontend: http://localhost:3000"
echo "🚀 Backend: http://localhost:3001"
echo ""
