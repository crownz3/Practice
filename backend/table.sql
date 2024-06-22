create table user(
    id int primary key AUTO_INCREAMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    passwrod varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email),

);

insert into user(name,contactNumber,email,passwrod,status,role) values ('Admin', '8903424281', 'admin@gmail.com', 'admin', 'true', 'admin');