create database tudu;

drop table if exists usuarios;
create table usuarios(
 id serial primary key,
 nome varchar(150) not null,
 email varchar(150) not null,
 senha text
);

drop table if exists tarefas;
create table tarefas(
  id serial primary key,
  titulo varchar(150) not null,
  prazo date not null,
  categoria text,
  usuario_id integer not null,
  foreign key (usuario_id) references usuarios(id)
  );








