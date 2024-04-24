create table products
(
    id          int auto_increment primary key,
    name        varchar(255) not null,
    price double null,
    image       varchar(255) null,
    description text null,
    category    varchar(255) null,
    quantity    int null,
    rating      int null,
    reviews double null,
    inStock     tinyint(1) default 0 not null
);

create table users
(
    id       int auto_increment primary key,
    username varchar(255) not null unique,
    email varchar (255) not null unique,
    password varchar(255) not null,
    role     varchar(255) not null
);