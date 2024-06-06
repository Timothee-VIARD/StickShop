CREATE DATABASE IF NOT EXISTS stickShop;
USE stickShop;

create table products
(
    id          int auto_increment primary key,
    name        varchar(255)         not null,
    price       double               null,
    image       varchar(255)         null,
    description text                 null,
    category    varchar(255)         null,
    quantity    int                  null,
    rating      int                  null,
    reviews     double               null,
    inStock     tinyint(1) default 0 not null
);

create table users
(
    id       int auto_increment primary key,
    username varchar(255) not null unique,
    email    varchar(255) not null unique,
    password varchar(255) not null,
    role     varchar(255) not null
);

create table profile
(
    id        int auto_increment primary key,
    userId    int not null unique,
    firstName varchar(255),
    lastName  varchar(255),
    address   varchar(255),
    phone     varchar(255),
    image     varchar(255),
    foreign key (userId) references users (id)
);

create table orders
(
    id            int auto_increment primary key,
    orderNumber   varchar(255) not null unique,
    userId        int          not null,
    orderDate     varchar(255) not null,
    deliveryDate  varchar(255) not null,
    address       varchar(255) not null,
    city          varchar(255) not null,
    zipCode       varchar(255) not null,
    country       varchar(255) not null,
    paymentMethod varchar(255) not null,
    totalPrice    varchar(255) not null,
    status        varchar(255) not null,
    foreign key (userId) references users (id)
);

INSERT INTO products (id, name, price, image, description, category, quantity, rating, reviews, inStock)
VALUES
    (1, 'Baton en bois d''olivier', 5.99, 'http://localhost:3001/images/olivier.jpg', 'Baton en bois d''olivier, provenant de la contré de la Bourgogne en France. Qualité premium garantie.', 'Baton naturel', 10, 4, 10, true),
    (2, 'Baton en bois de chêne', 9.99, 'http://localhost:3001/images/chene.jpg', 'Baton en bois de chêne, taillé à la main dans les forêts du Limousin. Résistant et élégant.', 'Baton naturel', 15, 4.5, 8, true),
    (3, 'Baton en bois de hêtre', 10.01, 'http://localhost:3001/images/hetre.jpg', 'Baton en bois de hêtre, récolté dans les montagnes des Alpes. Léger et maniable.', 'Baton naturel', 12, 4.2, 6, true),
    (4, 'Baton en bois de cerisier', 4.59, 'http://localhost:3001/images/cerisier.jpg', 'Baton en bois de cerisier, issu des vergers de Provence. Bois robuste et esthétique.', 'Baton naturel', 8, 4.3, 9, true),
    (5, 'Baton en bois de pin', 1.89, 'http://localhost:3001/images/pin.jpg', 'Baton en bois de pin, provenant des forêts du Nord de la France. Parfait pour les randonnées en montagne.', 'Baton naturel', 20, 4.1, 7, true),
    (6, 'Baton en bois de frêne', 17.99, 'http://localhost:3001/images/frene.jpg', 'Baton en bois de frêne, cueilli dans les bois de Normandie. Équilibré et solide.', 'Baton naturel', 18, 4.4, 11, true),
    (7, 'Baton en bois de sapin', 0.99, 'http://localhost:3001/images/sapin.jpg', 'Baton en bois de sapin, récolté dans les massifs forestiers des Vosges. Léger et résistant.', 'Baton naturel', 14, 4.2, 5, true),
    (8, 'Baton en bois d''épicéa', 21.99, 'http://localhost:3001/images/epicea.jpg', 'Baton en bois d''épicéa, provenant des hauteurs des Alpes. Idéal pour les longues marches en forêt.', 'Baton naturel', 13, 4.3, 8, true),
    (9, 'Baton en bois de bouleau', 6.89, 'http://localhost:3001/images/bouleau.jpg', 'Baton en bois de bouleau, sélectionné dans les forêts du Jura. Souple et élégant.', 'Baton naturel', 11, 4.5, 9, true),
    (10, 'Baton en bois d''if', 52.99, 'http://localhost:3001/images/if.jpg', 'Baton en bois d''if, rare et précieux, issu des forêts préservées des Pyrénées. Stabilité et durabilité assurées.', 'Baton naturel', 9, 4.7, 12, true),
    (11, 'Baton en bois de noyer', 21, 'http://localhost:3001/images/noyer.jpg', 'Baton en bois de noyer, récolté dans les vergers de la Vallée de la Loire. Bois noble et résistant.', 'Baton naturel', 10, 4.6, 10, true),
    (12, 'Baton en bois d''acacia', 59.99, 'http://localhost:3001/images/acacia.jpg', 'Baton en bois d''acacia, provenant des vastes plantations de la région du Midi. Durable et esthétique.', 'Baton naturel', 16, 4.3, 7, true),
    (13, 'Baton en bois de peuplier', 69.69, 'http://localhost:3001/images/peuplier.jpg', 'Baton en bois de peuplier, cultivé dans les plaines fertiles de la Beauce. Léger et facile à manier.', 'Baton naturel', 17, 4.1, 6, true),
    (14, 'Baton en bois de mélèze', 42.50, 'http://localhost:3001/images/meleze.jpg', 'Baton en bois de mélèze, provenant des forêts d''altitude des Pyrénées. Résistant aux intempéries.', 'Baton naturel', 12, 4.4, 8, true),
    (15, 'Baton en bois de saule', 99.99, 'http://localhost:3001/images/saule.jpg', 'Baton en bois de saule, taillé dans les zones humides de la Camargue. Flexibilité et légèreté.', 'Baton naturel', 14, 4.2, 5, true);

INSERT INTO users (username, email, password, role)
VALUES
    ('Admin', 'admin@admin.com', '$2b$10$CgcfBId.oQST5zd9YeovIuguT2MhLOxkm/7593Xry6VTOJWc..d9.', 'ADMIN'),
    ('User', 'user@user.com', '$2b$10$wiRd.6t6BrP99wWPEqP/ZexIXHpM3w6b9.Xuyee6Bk7weEx1BdK0W', 'USER');

INSERT INTO profile (userId, firstName, lastName, address, phone, image)
VALUES
    (1, 'Admin', 'Admin', '1 rue de l''admin', '0123456789', 'http://localhost:3001/images/adminadmin.png'),
    (2, 'User', 'User', '1 rue de l''user', '9879376542', 'http://localhost:3001/images/useruser.png');

INSERT INTO orders (orderNumber, userId, orderDate, deliveryDate, address, city, zipCode, country, paymentMethod, totalPrice, status)
VALUES
    ('2697464646', 2, '2024-01-07', '2024-01-12', '1 rue de l''user', 'Paris', '75000', 'France', 'Credit Card', '99.99', 'DELIVERED'),
    ('6785468724', 2, '2021-02-01', '2021-02-06', '10 avenue de l''user', 'Rennes', '35000', 'France', 'Paypal', '3', 'PENDING'),
    ('3254587499', 2, '2023-03-05', '2023-03-10', '8 boulevard de l''user', 'Angers', '49000', 'France', 'Credit Card', '41', 'DELIVERING'),
    ('3287555749', 2, '2021-03-01', '2021-03-06', '36 rue du baton', 'Angers', '49000', 'France', 'Credit Card', '52', 'CANCELLED'),
    ('9856472421', 2, '2020-08-03', '2020-08-08', '62 avenue du bois', 'Nantes', '41000', 'France', 'Credit Card', '69', 'DELIVERED');