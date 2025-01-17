const express = require('express');
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json')

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json()); // support json encoded bodies

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/api/getData", function (req, res) {
    // Identifying which document we'll be accessing/reading from
    var doc = new GoogleSpreadsheet('1Ol47Yx6CkDNWo6JPPm-8vAKQ0b0iKU_N218wPVahCeY');
    // Authentication
    doc.useServiceAccountAuth(creds, function (err) {
        // Set up the sheet you'd like to get the data from. In this case 3.
        doc.getRows(1, callback)
        function callback(err, rows) {
            res.json(rows)
        }
    });
});

app.get("/api/getAcrossCompanies", function (req, res) {
    // Identifying which document we'll be accessing/reading from
    var doc = new GoogleSpreadsheet('1Ol47Yx6CkDNWo6JPPm-8vAKQ0b0iKU_N218wPVahCeY');
    // Authentication
    doc.useServiceAccountAuth(creds, function (err) {
        // Set up the sheet you'd like to get the data from. In this case 3.
        doc.getRows(2, callback)
        function callback(err, rows) {
            res.json(rows)
        }
    });
});

app.get("/api/getAcrossDep", function (req, res) {
    // Identifying which document we'll be accessing/reading from
    var doc = new GoogleSpreadsheet('1Ol47Yx6CkDNWo6JPPm-8vAKQ0b0iKU_N218wPVahCeY');
    // Authentication
    doc.useServiceAccountAuth(creds, function (err) {
        // Set up the sheet you'd like to get the data from. In this case 3.
        doc.getRows(3, callback)
        function callback(err, rows) {
            res.json(rows)
        }
    });
});

app.get("/api/getAcrossSen", function (req, res) {
    var doc = new GoogleSpreadsheet('1Ol47Yx6CkDNWo6JPPm-8vAKQ0b0iKU_N218wPVahCeY');
    // Authentication
    doc.useServiceAccountAuth(creds, function (err) {
        doc.getRows(4, callback)
        function callback(err, rows) {
            res.json(rows)
        }
    });
});

app.get("/api/getCompaniesDropdown", function (req, res) {
    // Identifying which document we'll be accessing/reading from
    var doc = new GoogleSpreadsheet('1Ol47Yx6CkDNWo6JPPm-8vAKQ0b0iKU_N218wPVahCeY');
    // Authentication
    doc.useServiceAccountAuth(creds, function (err) {
        // Set up the sheet you'd like to get the data from. In this case 3.
        doc.getRows(9, callback)
        function callback(err, rows) {
            res.json(getDefaultShape(rows))
        }
    });
});

const getDefaultShape = (rows) => {
    const data = rows.map(row => {
        return {
            'label': row.title,
            'value': row.value,
        }
    })
    return data
}

const getShapedFeeling = (rows) => {
    const data = rows.map(row => {
        return {
            'label': row.title,
            'value': row.value,
        }
    })
    return data
}

const getShapedFeeling2 = (rows) => {
    const data = rows.map(row => {
        return {
            'label': row.title,
            'Concern': row.value,
        }
    })
    return data
}

const getShapedFeeling3 = (rows) => {
    const data = rows.map(row => {
        return {
            'label': row.title,
            'Working well': row.value,
        }
    })
    return data
}


app.get("/api/getFeel", function (req, res) {
    var doc = new GoogleSpreadsheet('1Ol47Yx6CkDNWo6JPPm-8vAKQ0b0iKU_N218wPVahCeY');
    // Authentication
    doc.useServiceAccountAuth(creds, function (err) {
        doc.getRows(5, callback)
        function callback(err, rows) {
            res.json(getShapedFeeling(rows))
        }
    });
});



const getFilteredFeeling = (rows, company) => {
    var data = rows.map(row => {
        return {
            'company': row.company,
            'level': row.role,
            'feeling': row.feeling
        }
    })
    if(company !== 'All') {
        data = data.filter(item => {
            return item.company === company;
        })
        return data
    } else {
        return data
    }
}

const getFilteredFeelingRole = (data, level) => { 
    if(level !== 'All') {
        data = data.filter(item => {
            return item.level === level;
        })
        return data
    } else {
        return data
    }
}

const countTimesRepeat = (data, feeling) => {
    var times = data.reduce(function (n, item) {
        return n + (item.feeling == feeling);
    }, 0);
    return times
}

const aggregateResult = (data) => {
    var uniqueFeelings = data.map(item => {
        return !item.feeling.includes('BLANK') && item.feeling
    }) 

    const setFeelings = new Set(uniqueFeelings)
    const arrayFeelings = Array.from(setFeelings)

    const objTimes = arrayFeelings.map(feeling => {
        return {
            'label': feeling,
            value: countTimesRepeat(data, feeling)
        }
    })
    
    const sorted = objTimes.sort(function(a, b) {
        return b.value - a.value;
    });

    return sorted.slice(0,14)
}

app.post("/api/getFeelingByCompany", function (req, res) {
    var doc = new GoogleSpreadsheet('1Ol47Yx6CkDNWo6JPPm-8vAKQ0b0iKU_N218wPVahCeY');
    // Authentication
    doc.useServiceAccountAuth(creds, function (err) {
        doc.getRows(6, callback)
        function callback(err, rows) {
            const filteredByCompany = getFilteredFeeling(rows, req.body.company);
            const filteredByRole = getFilteredFeelingRole(filteredByCompany, req.body.level)
            const aggregated = aggregateResult(filteredByRole);
            res.json(aggregated)
        }
    });
});

app.get("/api/getConcerns", function (req, res) {
    var doc = new GoogleSpreadsheet('1Ol47Yx6CkDNWo6JPPm-8vAKQ0b0iKU_N218wPVahCeY');
    // Authentication
    doc.useServiceAccountAuth(creds, function (err) {
        doc.getRows(7, callback)
        function callback(err, rows) {
            res.json(getShapedFeeling2(rows))
        }
    });
});

app.get("/api/getWorkingWell", function (req, res) {
    var doc = new GoogleSpreadsheet('1Ol47Yx6CkDNWo6JPPm-8vAKQ0b0iKU_N218wPVahCeY');
    // Authentication
    doc.useServiceAccountAuth(creds, function (err) {
        doc.getRows(8, callback)
        function callback(err, rows) {
            res.json(getShapedFeeling3(rows))
        }
    });
});


// // Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);




