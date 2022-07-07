create database tudu;

drop table if exists usuarios;
create table usuarios(
 id serial primary key,
 nome varchar(150) not null ,
 email varchar(150) not null unique,
 senha text
);


drop table if exists usuarios;
create table tarefas(
  id serial primary key,
  titulo varchar(150) not null,
  descricao text,
  prazo date not null,
  categoria text not null,
  anexos text,
  membro text,
  usuario_id integer not null,
  foreign key (usuario_id) references usuarios(id))
	







