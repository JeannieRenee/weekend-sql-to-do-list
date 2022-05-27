CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"isDone" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" 
	("task") 
VALUES 
	('Wash legs'),
	('Walk gecko'),
	('Weave human hair rug'),
	('Sacrifice a goat'),
	('Have existential breakdown'),
	('Ponder the absurdity of everything'),
	('Call mom');
	
SELECT * FROM "tasks";