-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists authors_books;
DROP table if exists books;
DROP table if exists authors;


CREATE table authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  dob VARCHAR,
  pob VARCHAR
);

INSERT into authors (name, dob, pob) VALUES
('Daphne du Maurier', 'May 13, 1907', 'London, England'),
('Neil Gaiman', 'November 10, 1960', 'Portchester, Hampshire, England'),
('Stephen King', 'September 21, 1947', 'Portland, Maine, United States'),
('Isabel Wilkerson', '1961', 'Washington, D.C., United States'),
('Victor Hugo', 'February 26, 1802', 'Paris, France'),
('Erik Larson', 'January 3, 1954', 'Brooklyn, New York, United States');

CREATE table books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  year INT NOT NULL
);

INSERT INTO books (title, year) VALUES
('Rebecca', 1938),
('Coraline', 2002),
('The Graveyard Book', 2008),
('Doctor Sleep', 2013),
('The Warmth of Other Suns', 2010),
('Les Misérables', 1862),
('The Devil in the White City', 2003),
('The Stand', 1978);

CREATE table authors_books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author_id BIGINT,
  book_id BIGINT,
  FOREIGN KEY (author_id) REFERENCES authors(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO authors_books (author_id, book_id) VALUES
  (1, 1),
  (2, 2),
  (2, 3),
  (3, 4),
  (3, 8),
  (4, 5),
  (5, 6),
  (6, 7);
