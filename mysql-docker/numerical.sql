ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '1234';

CREATE DATABASE numerical;

use numerical;

CREATE TABLE sample (
    id int not null,
    sample int not null,
    method varchar(255),
	info varchar(255),
    primary key (id)
);


insert into sample
value (1, 1, "general",  '{"f(x)":"x^2 - 7", "XL":0, "XR":4, "X":1, "X1":1, "X0":0 }'),
	(2, 2, "general", '{"f(x)":"x - cos(x)", "XL":0, "XR":1, "X":1, "X1":1, "X0":0 }'),
    (3, 3, "general", '{"f(x)":"x^3 + 2*x^2 + 10*x - 20", "XL":1, "XR":2, "X":1, "X1":1, "X0":0}'),
	(4, 1, "fixpoint", '{"f(x)":"x^2 - x - 1", "g(x)":"1 + 1/x", "X":1}'),
	(5, 2, "fixpoint", '{"f(x)":"x - cos(x)", "g(x)":"cos(x)", "X":0}'),
    (6, 3, "fixpoint", '{"f(x)":"sin(x) - x^2", "g(x)":"sin(x)/x", "X":1}');
    
