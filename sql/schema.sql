
/* Superuser Commands */
create role edema_admin with login password 'edema_is_bad';
ALTER ROLE edema_admin CREATEDB;

/* Normal Schema */
CREATE DATABASE Swell_Check;
CREATE TABLE Measurement (
    Measurement_ID SERIAL PRIMARY KEY,
    Time_Measurement TIMESTAMP,
    Stretch_Measurement Integer,
    UpdatedMeasurement_ID INTEGER,
    Active BOOLEAN
);

ALTER TABLE Measurement 
    ADD CONSTRAINT fk_updated_original 
    FOREIGN KEY (UpdatedMeasurement_ID) 
    REFERENCES Measurement(Measurement_ID);

ALTER TABLE Measurement
    ALTER COLUMN Active
    SET COLUMN DEFAULT TRUE;


SELECT AVG(Stretch_Measurement) as avg_stretch,
    EXTRACT(HOUR FROM Time_Measurement) as stretch_hour
    FROM (SELECT * FROM Measurement 
    WHERE Active = 'yes'
    AND Time_Measurement::date = now()::date)
    GROUP BY avg_stretch
    ORDER BY stretch_hour ASC;

SELECT AVG(Stretch_Measurement) as avg_stretch,
    EXTRACT(DATE FROM Time_Measurement) as stretch_date
    FROM (SELECT * FROM Measurement 
    WHERE Active = 'yes')
    GROUP BY avg_stretch
    ORDER BY stretch_hour DESC
    LIMIT BY 90;

INSERT INTO Measurement(Time_Measurement, Stretch_Measurement) VALUES($time_, $measurement);

UPDATE Measurement 
    SET ACTIVE = 'false', SET UpdatedMeasurement_ID = $updated_measurementID
    WHERE Time_Measurement($TimeMeasurement);


/* dfdf