    USE `zadel_db`;

    -- Agregamos a la tabla auxiliar para que luego pueda referenciar los foreign keys de productos
    INSERT INTO typeProducts (categoryName) VALUES
    ('texanas'),
    ('botas'),
    ('borcegos'),
    ('zapatillas');
    INSERT INTO typeusers (name) VALUES
    ('usuario registrado'),
    ('administrador'),
    ('owner');
    -- Agregamos a la tabla de productos
    INSERT INTO products (name, description, price,discount,image,stock,typeProductId) VALUES
    ('IRGIZI NEGRO','Texana de cuero liso con detalle de costuras.',20500,54,'texana1.png',55,1),
    ('TEXANAS INTENSE','Texanas con caña más alta y bordadas a tono.',23200,50,'bota3.webp',55,1),
    ('IMORI NEGRO','Bota de cuero con detalle de estilo texano.',15250,44,'bota4.webp',55,2),
    ('IRGIZI HUESO','Texana de cuero liso con detalle de costuras',23211,14,'bota5.webp',55,1),
    ('LIMAI NEGRO','Bota de cuero graneado con detalle de cierres metálicos',25325,65,'bota6.webp',55,2),
    ('IMORI NEGRO','Texana con detalle de recortes, costuras y cierre lateral',18521,55,'bota7.png',55,1),
    ('TEXANA MEI','Texana confeccionadas en cuero, con un bordado en contraste.',23212,14,'bota8.webp',55,1),
    ('Texanas Cuero Real','Texana con cuero  y apliques alas',17524,14,'texanas.png',55,1),
    ('RS-FAST DOUBLE','Zapatilla de punta estilizada, con doble amortiguación',20225,14,'zapatillas1.jpg',55,4),
    ('RS-CURVE WNS','Zapatillas de otoño, ligeras y con interior de doble material',29524,3,'zapatillas2.jpg',55,4),
    ('RS-X BUBBLE','Zapatillas de cuero ecologico, con caña alta y amortiguación',23254,30,'zapatillas3.jpg',55,4),
    ('CRUISE RIDER SILK','Zapatillas urbanas, con suela de caucho y caña alta',20000,14,'zapatillas4.jpg',55,4),
    ('VIKKY V2 CAT','Zapatillas casuales, con empeine sintético y suela de goma',25000,14,'zapatillas5.jpg',55,4),
    ('TORI RAW METALLICS','Zapatillas inspiradas en los 80, con volumen y peso ligero',24242,60,'zapatillas6.jpg',55,4),
    ('GRAVITION','Zapatillas para correr, con superposición del antepié',25241,14,'zapatillas7.jpg',55,4),
    ('ST RUNNER V3 NL','Zapatillas urbanas, con interior acolchado y suela de goma',23541,14,'zapatillas8.jpg',55,4),
    ('JONSON SUELA','Borcegos de cuero, con suela de goma y acceso por cordones',18524,14,'borcegos1.jpg',55,3),
    ('NATURAL','Borcegos acolchonados de cuero, con suela de goma',19524,3,'borcegos2.jpg',40,3),
    ('BLACK SHOE','Borcegos de cuero con recortes en negro y forrado en poliester',20124,24,'borcegos3.jpg',55,3),
    ('BLANCK SPACE','Borcegos de cuero blanco con taco negro de 8,5cm',19854,14,'borcegos4.jpg',55,3),
    ('STUDS','Borcegos de cuero con tachas metálicas y plataforma de 4,5cm',19635,14,'borcegos5.jpg',55,3),
    ('SUP JOGGING','Borcegos de cuero negro y suela de goma con estilo deportivo ',20145,30,'borcegos6.jpg',55,3),
    ('CLASSIC BORDER','Borcegos de cuero graneado con puño elástico y estilo clásico',18524,55,'borcegos7.jpg',55,3),
    ('ALPINA','Borcegos reforzados con herrajes de cuero verde y suela de goma',19874,14,'borcegos8.jpg',55,3),
    ('GLASS CLASS','Botas cortas con hebilla de cuero en negro y tacos transparentes',23254,14,'bota1.png',55,2),
    ('ELASTIC','Bota corta de cuero, con planta de goma y acceso mediante elástico en los laterales',25452,3,'bota2.png',55,2),
    ('GAMUZERAS','Botas altas de gamuza, con suela de cuero natural y estilo abuchonado',23214,30,'bota3.png',55,2),
    ('TALL BROWN','Botas de corte militar, con elástico de cuero en la suela',19874,14,'botas4.jpg',55,2),
    ('ACRILIC','Botas cortas de cuero texturada en nude y con taco acrílico',26542,55,'botas5.jpg',55,2),
    ('TACKS OUT','Botas cortas con tachas de cuero, suela de goma y con acceso por cierre',27415,55,'botas6.jpg',55,2),
    ('INNERCOAT','Botinetas de cuero y pelo en suela, con tramas y texturas',23545,60,'bota7.png',55,2),
    ('CHAROL','Botas cortas con plataforma de charol bordó',19654,14,'botas8.jpg',55,2);

