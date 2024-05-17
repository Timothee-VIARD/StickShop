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
    ('admin', 'admind@admin.com', 'admin', 'admin'),
    ('user', 'user@user.com', 'user', 'user');

INSERT INTO profile (user_id, firstName, lastName, address, phone, image)
VALUES
    (1, 'Admin', 'Admin', '1 rue de l''admin', '0123456789', 'http://localhost:3001/images/adminadmin.jpg'),
    (2, 'User', 'User', '1 rue de l''user', '9879376542', 'http://localhost:3001/images/useruser.jpg');