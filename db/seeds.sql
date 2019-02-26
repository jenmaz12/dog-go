USE dogGo;

INSERT INTO customers (name, petName, email, phoneNumber) VALUES ('Sam Wright', 'Myrna', 'SamBam@me.com', '4567890123');

INSERT INTO walkers (name, email, phoneNumber) VALUES ('Sally Albright', 'test@test.com', '1234567890');
INSERT INTO walkers (name, email, phoneNumber) VALUES ('Alexander Hamilton', '123@test.com', '2897653340');


INSERT INTO appointments (date, startTime, walkerChosen, customerID) VALUES ('2019-03-15', '12:30:00', 1, 1);
INSERT INTO appointments (date, startTime, walkerChosen, customerID) VALUES ('2019-03-15', '9:30:00', 1, 1);
INSERT INTO appointments (date, startTime, walkerChosen, customerID) VALUES ('2019-03-15', '12:30:00', 2, 1);
INSERT INTO appointments (date, startTime, walkerChosen, customerID) VALUES ('2019-03-17', '12:30:00', 1, 1);
INSERT INTO appointments (date, startTime, walkerChosen, customerID) VALUES ('2019-03-17', '12:30:00', 2, 1);