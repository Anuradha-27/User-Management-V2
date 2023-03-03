
--For creating schema--
create schema user_management;

--To set schema--
alter database ums set search_path to user_management,public;

create type isDel as enum('0','1');

--User table--
create table users (u_id serial primary key ,
  f_name varchar(30) not null, m_name varchar(30) ,
  l_name varchar(30) not null,
  dob date not null,
  gender varchar(9) check (gender in('Male','Female','Other')),
  email varchar(50) not null,
  password varchar(255) not null ,
  apart_name varchar(50) not null,
  locality varchar(50) not null,
  landmark varchar(50) not null,
  pinCode varchar(6) not null ,
  city varchar(50) not null,
  del isDel Default '0',
  unique(email));

--State table--
create table user_management.states (s_id serial primary key,u_id int ,state_name varchar(50) not null,constraint u_id foreign key(u_id) references user_management.users(u_id));


--Query for inserting records--
insert into users(f_name,m_name,l_name,dob,gender,email,password,apart_name,locality,landmark,pincode,city)values('Anu','R','Oman','1999-11-27','Female','anu@indx.ai','anu@12','Shruti Complex','Baner','Near Laxmi Temple','411045','Pune');

insert into users(f_name,m_name,l_name,dob,gender,email,password,apart_name,locality,landmark,pincode,city)values('Mansi','S','Pasari','1999-11-29','Female','mansi@indx.ai','mansi@12','Shruti Complex','Baner','Near Laxmi Temple','411045','Pune');

insert into users(f_name,m_name,l_name,dob,gender,email,password,apart_name,locality,landmark,pincode,city)values('Kanchan','A','Mankar','1999-1-7','Female','kanchan@indx.ai','kanchan@12','Shruti Complex','Baner','Near Laxmi Temple','411045','Pune');


