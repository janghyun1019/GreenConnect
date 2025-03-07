CREATE TABLE users
(
user_id varchar(24) primary key,
password varchar(64) not null,
username varchar(36) not null,
nickname varchar(36) not null UNIQUE,
email varchar(36) not null UNIQUE,
tel varchar(16) not null UNIQUE,
usertype varchar(12) ,
signup TIMESTAMP DEFAULT SYSTIMESTAMP,
terms TIMESTAMP DEFAULT SYSTIMESTAMP
);

CREATE TABLE user_profile (
    user_id    NUMBER PRIMARY KEY,
    image_url  VARCHAR2(255)
);

CREATE TABLE post
(
  post_id varchar2(64) primary key,
  user_id varchar2(32),
  user_nick_name varchar2(32),
  board_id varchar2(32),
  post_title varchar2(64) not null,
  post_content varchar2(64) not null,
  url_file_path varchar2(500),
  post_price varchar2(64),
  post_spot varchar2(64),
  post_cost varchar2(64),
  store_id number,
  post_create_at TIMESTAMP DEFAULT SYSTIMESTAMP,
  post_views number
);