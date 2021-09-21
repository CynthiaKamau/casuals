# casuals

run the db.sql in your database

npm install 

generate models with for windows : node_modules/sequelize-auto/bin/sequelize-auto -o "./models_generated" -d casuals -h localhost -u postgres -p 5432 -x admin -e postgres or sequelize-auto -o "./models_generated" -d casuals -h localhost -u postgres -p 5432 -x admin -e postgres

generate models with for ubuntu : sequelize-auto -o "./models" -d db_name -h localhost -u postgres -p 5432 -x admin -e postgres
