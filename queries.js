const Pool = require('pg').Pool
const pool = new Pool({
    user: 'edema_admin',
    host: 'localhost',
    database: 'edemaDB',
    password: 'edema_is_bad',
    post: 5432
})



const createRecord = (request, response) => {
    const { time, stretchRecord } = request.body

    pool.query(
        'INSERT INTO records (time, stretchRecord, UpdatedMeasurement_ID, Active) values ($1, $2, $3, $4)', [time, stretchRecord, null, 'false'], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send('Record addition successful');
        });
};

const getRecordsByHour = (request, response) => {

    pool.query(
        "SELECT AVG(Stretch_Measurement) as avg_stretch, EXTRACT(HOUR FROM Time_Measurement) as stretch_hour FROM (SELECT * FROM Measurement WHERE Active = 'yes'AND Time_Measurement::date = now()::date) GROUP BY avg_stretch ORDER BY stretch_hour ASC;", (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        });
};

const getRecordsByDay = (request, response) => {

    pool.query(
        "SELECT AVG(Stretch_Measurement) as avg_stretch, EXTRACT(DATE FROM Time_Measurement) as stretch_date FROM (SELECT * FROM Measurement  WHERE Active = 'yes') GROUP BY avg_stretch ORDER BY stretch_hour DESC LIMIT BY 90;", (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        });
};

module.exports = {
    createRecord,
    getRecordsByHour,
    getRecordsByDay
}