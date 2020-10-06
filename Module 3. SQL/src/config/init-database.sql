DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS userGroups;

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


CREATE TABLE groups
(
    id UUID PRIMARY KEY UNIQUE,
    name VARCHAR(150) NOT NULL UNIQUE,
    permissions VARCHAR(200) NOT NULL
);
INSERT INTO groups
  (id, name, permissions)
VALUES
  (uuid_generate_v4(), 'Group 1', 'WRITE'),
  (uuid_generate_v4(), 'Group 2', 'READ'),
  (uuid_generate_v4(), 'Group 3', 'READ|WRITE');


CREATE TABLE userGroups
(
    userId UUID REFERENCES users(id) ON DELETE CASCADE,
    groupId UUID REFERENCES groups(id) ON DELETE CASCADE,
    CONSTRAINT PK_userGroups PRIMARY KEY (userId, groupId)
);
