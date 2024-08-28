here is a readme
here is a readme too
Chetachi's readme

MySQL container temporary build command before compose file is created:
docker build \
-t cnmmt/mysql-database \
--build-arg MYSQL_DATABASE=cnmmt_MySQL_database \
--build-arg MYSQL_USER=admin \
--build-arg MYSQL_PASSWORD=admin \
--build-arg MYSQL_ROOT_PASSWORD=admin \
--build-arg MYSQL_PORT_NUMBER=1000 \
.




