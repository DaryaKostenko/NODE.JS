DROP TABLE IF EXISTS users;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users
(
    id UUID PRIMARY KEY,
    login VARCHAR(130) NOT NULL,
    password VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    isdeleted BOOLEAN NOT NULL DEFAULT FALSE
);
INSERT INTO users
  (id, login, password, age)
VALUES
  (uuid_generate_v4(), 'user1', 'password1', 21),
  (uuid_generate_v4(), 'user2', 'password2', 22),
  (uuid_generate_v4(), 'user3', 'password3', 30);