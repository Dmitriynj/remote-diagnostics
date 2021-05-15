create table issues (
	id serial PRIMARY KEY,
	dtc_code VARCHAR(10) NOT NULL,
	description VARCHAR(250) NOT NULL
);

create table vehicles (
	id serial PRIMARY KEY,
	mark VARCHAR(50),
	model VARCHAR(50),
	vin_code VARCHAR(70),
	production_year DATE,
	engine_volume VARCHAR(30),
	transmission VARCHAR(10),
	drive_unit VARCHAR(10),
	engine_type VARCHAR(10),
	imei_code VARCHAR(20)
);

create table users (
	id serial PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50),
	city VARCHAR(50),
	address VARCHAR(50),
	country VARCHAR(50),
	phone VARCHAR(50),
	birth_date DATE,
	avatar VARCHAR(200),
	password VARCHAR(200)
);

create table vehicle_details (
	vehicle_id INT UNIQUE,
	engine_state VARCHAR(3),
	mileage INT,
	remaining_fuel INT,
	battery_voltage DECIMAL(5,1),
	avg_speed INT,
	max_speed INT,
	latitude VARCHAR(50),
	longitude VARCHAR(50),
    CONSTRAINT fk_vehicle
      FOREIGN KEY(vehicle_id) 
	  REFERENCES vehicles(id)
);

create table vehicle_issue (
	id serial PRIMARY KEY,
	vehicle_id INT,
	issue_id INT,
	occur_date_time DATE,
	status VARCHAR(9),
    UNIQUE (id, vehicle_id, issue_id),
    CONSTRAINT fk_vehicle
      FOREIGN KEY(vehicle_id) 
	  REFERENCES vehicles(id),
    CONSTRAINT fk_issue
      FOREIGN KEY(issue_id) 
	  REFERENCES issues(id)
);

create table report (
	id serial PRIMARY KEY,
	datetime DATE,
	message VARCHAR(2000),
	vehicle_issue_id INT,
    CONSTRAINT fk_vehicle_issue
      FOREIGN KEY(vehicle_issue_id) 
	  REFERENCES vehicle_issue(id)
);