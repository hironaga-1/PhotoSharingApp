FROM mysql/mysql-server:8.0

ENV MYSQL_DATABASE=sample \
  MYSQL_USER=user \
  MYSQL_PASSWORD=password \
  MYSQL_ROOT_PASSWORD=rootpassword \
  TZ=Asia/Tokyo

COPY ./my.cnf /etc/my.cnf
RUN chmod 644 /etc/my.cnf