

# auth
http://localhost:3000/gmailAuth 


hJd#e,<RRu6&srMs?~"42DA3&$Ws9`z.
hJd#eRRu6&srMs?~42DA3&$Ws9z


CREATE USER 'monty'@'localhost' IDENTIFIED BY 'some_pass';
GRANT ALL PRIVILEGES ON *.* TO 'monty'@'localhost' WITH GRANT OPTION;

CREATE USER 'dbuser'@'%' IDENTIFIED BY 'hJd#eRRu6&srMs?~42DA3&$Ws9z';
GRANT ALL PRIVILEGES ON *.* TO 'dbuser'@'%' WITH GRANT OPTION;


# ubuntu with db

ssh deploy@167.99.52.24

    1  adduser deploy
    2  usermod -aG sudo deploy
    3  rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
    4  history

