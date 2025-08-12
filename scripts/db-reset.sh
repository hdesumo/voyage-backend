#!/bin/bash

echo "🔄 Resetting database..."

npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

echo "✅ Database reset complete."

