INSERT INTO "racun" ("id", "datum", "nacinplacanja")
VALUES (nextval('racun_seq'), to_date('13.05.2022.', 'dd.mm.yyyy.'), 'placanje pouzecem' );
INSERT INTO "racun" ("id", "datum", "nacinplacanja")
VALUES (nextval('racun_seq'), to_date('21.07.2022.', 'dd.mm.yyyy.'), 'placanje platnim karticama' );
INSERT INTO "racun" ("id", "datum", "nacinplacanja")
VALUES (nextval('racun_seq'), to_date('06.05.2022.', 'dd.mm.yyyy.'), 'placanje preko racuna' );
INSERT INTO "racun" ("id", "datum", "nacinplacanja")
VALUES (nextval('racun_seq'), to_date('10.06.2022.', 'dd.mm.yyyy.'), 'placanje pouzecem');

INSERT INTO "racun" ("id", "datum", "nacinplacanja")
VALUES (-100, to_date('01.01.2000.', 'dd.mm.yyyy.'), 'Test nacin placanja');

INSERT INTO "proizvodjac" ("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'D.O.O. Kozmetika kristal', 'Artemova 3,23000 Zrenjanin', '+381 23 54 11 23');
INSERT INTO "proizvodjac" ("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'D.O.O. Esencija', 'Cara Lazara 123,23000 Zrenjanin', '+381 23 31 75 270');
INSERT INTO "proizvodjac" ("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'Glamur d.o.o.', 'Pupinova 36,21000 Novi Sad', '+381 21 56 53 555');
INSERT INTO "proizvodjac" ("id", "naziv", "adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'Women Secret D.O.O.', 'Zmaj Jovina 1B,11000 Beograd', '+381 11 69 45 000');

INSERT INTO "proizvodjac" ("id", "naziv", "adresa", "kontakt")
VALUES (-100, 'Test Naziv', 'Test adresa', 'Test kontakt');


INSERT INTO "proizvod" ("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Krema za podocnjake', 1);
INSERT INTO "proizvod" ("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Mineralni puder', 2);
INSERT INTO "proizvod" ("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Ultra precizni ajlajner', 3);
INSERT INTO "proizvod" ("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Metalic tecni ruz za usne', 3);
INSERT INTO "proizvod" ("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Serum za zatezanje lica', 4);
INSERT INTO "proizvod" ("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), 'Grejac za vosak', 4);
INSERT INTO "proizvod" ("id", "naziv", "proizvodjac")
VALUES (nextval('proizvod_seq'), '3D maskara', 4);

INSERT INTO "proizvod" ("id", "naziv", "proizvodjac")
VALUES (-100, 'Test naziv', 1);

INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 1, 3, 'kom', 1500, 2, 3);
INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 2, 2, 'kom', 2400, 2, 6);
INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 3, 5, 'kom', 12250, 2, 1);

INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 1, 2, 'kom', 1900, 1, 2);
INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 2, 4, 'kom', 4500, 1, 7);
INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 3, 6, 'kom', 4194, 1, 5);
INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 4, 4, 'kom', 2000, 1, 3);

INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 1, 5, 'kom', 5845, 3, 4);
INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 2, 6, 'kom', 14700, 3, 1);
INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 3, 9, 'kom', 10125, 3, 7);

INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 1, 8, 'kom', 5592, 4, 5);
INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 2, 3, 'kom', 2850, 4, 2);
INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (nextval('stavka_racuna_seq'), 3, 7, 'kom', 3500, 4, 4);

INSERT INTO "stavka_racuna" ("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (-100, 100, 1, 'kom', 1, 1, 1);