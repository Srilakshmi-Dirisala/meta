const redis = require('redis');
// const redisPort = 6379
// const client = redis.createClient(6378);
// const client = redis.createClient(redisPort);

const client = redis.createClient();

client.on("error", (err) => {
    console.log(`redis-error:`, err.message);
});
const getParameter = (searchTerm) => {
    return new Promise((resolve) => {
        client.get(searchTerm, async (err, data) => {
            if (err) {
                let status = {
                    message: err.message,
                    status: false
                }
                resolve(status)
            } else {
                let status = {
                    data: null,
                    status: false
                };
                if (data) {
                    status = {
                        data: JSON.parse(data),
                        status: true
                    }
                }
                resolve(status)
            }
        })
    });
}
const setParameter = (searchTerm, data) => {
    return new Promise((resolve) => {
        const expire = 24 * 60 * 60;
        client.setex(searchTerm, expire, JSON.stringify(data), async (err, data) => {
            console.log(err, data)
            if (err) {
                let status = {
                    message: err.message,
                    status: false
                }
                resolve(status)
            } else {
                let status = {
                    data: null,
                    status: true
                };

                resolve(status)
            }
        })
    });
}
const setParameterForOneHour = (searchTerm, data) => {
    return new Promise((resolve) => {
        const expire = 60 * 60;
        client.setex(searchTerm, expire, JSON.stringify(data), async (err, data) => {
            console.log(err, data)
            if (err) {
                let status = {
                    message: err.message,
                    status: false
                }
                resolve(status)
            } else {
                let status = {
                    data: null,
                    status: true
                };

                resolve(status)
            }
        })
    });
}

module.exports = { getParameter, setParameter, setParameterForOneHour }