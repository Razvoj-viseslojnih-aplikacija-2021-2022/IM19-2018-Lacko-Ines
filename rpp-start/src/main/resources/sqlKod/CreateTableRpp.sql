DROP TABLE IF EXISTS  racun CASCADE;
DROP TABLE IF EXISTS proizvodjac CASCADE;
DROP TABLE IF EXISTS proizvod CASCADE;
DROP TABLE IF EXISTS stavka_racuna CASCADE;

DROP SEQUENCE IF EXISTS racun_seq;
DROP SEQUENCE IF EXISTS proizvodjac_seq;
DROP SEQUENCE IF EXISTS proizvod_seq;
DROP SEQUENCE IF EXISTS stavka_racuna_seq;

CREATE TABLE racun (
	id integer NOT NULL,
	datum date NOT NULL,
	nacinplacanja varchar(200) NOT NULL
);

CREATE TABLE proizvodjac (
	id integer NOT NULL,
	naziv varchar(50) NOT NULL,
	adresa varchar(200) NOT NULL,
	kontakt varchar(100) NOT NULL
);

CREATE TABLE proizvod (
	id integer NOT NULL,
	naziv varchar(50),
	proizvodjac integer NOT NULL
);

CREATE TABLE stavka_racuna (
	id integer NOT NULL,
	redni_broj integer NOT NULL,
	kolicina numeric NOT NULL,
	jedinica_mere varchar(50) NOT NULL,
	cena numeric NOT NULL,
	racun integer NOT NULL,
	proizvod integer NOT NULL
);

ALTER TABLE racun add constraint PK_Racun PRIMARY KEY(id);
ALTER TABLE proizvodjac add constraint PK_Proizvodjac PRIMARY KEY(id);
ALTER TABLE proizvod add constraint PK_Proizvod PRIMARY KEY(id);
ALTER TABLE stavka_racuna add constraint PK_Stavka_Racuna PRIMARY KEY(id);

ALTER TABLE proizvod add constraint FK_Proizvod_Proizvodjac FOREIGN KEY(proizvodjac) references proizvodjac(id);
ALTER TABLE stavka_racuna add constraint FK_Stavka_Racuna_Racun FOREIGN KEY(racun) references racun(id);
ALTER TABLE stavka_racuna add constraint FK_Stavka_Racuna_Proizvod FOREIGN KEY(proizvod) references proizvod(id);

CREATE INDEX IDXFK_Proizvod_Proizvodjac on proizvod (proizvodjac);
CREATE INDEX IDXFK_Stavka_Racuna_Racun on stavka_racuna (racun);
CREATE INDEX IDXFK_Stavka_Racuna_Proizvod on stavka_racuna (proizvod);

CREATE SEQUENCE racun_seq 
increment 1;
CREATE SEQUENCE proizvodjac_seq
increment 1;
CREATE SEQUENCE proizvod_seq
increment 1;
CREATE SEQUENCE stavka_racuna_seq
increment 1;