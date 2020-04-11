import axios from 'axios';

export async function getAllData() {
    let host;
    if (window.location.origin.includes('localhost')) {
        host = 'http://localhost:5000/api/getData';
    } else {
        host = 'https://deltavis.herokuapp.com/api/getData'; //replace here
    }
    const data = await fetch(host, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    })
        .then(res => { return res.json() })
    return data
}

export async function getAcrossCompanies() {
    let host;
    if (window.location.origin.includes('localhost')) {
        host = 'http://localhost:5000/api/getAcrossCompanies';
    } else {
        host = 'https://deltavis.herokuapp.com/api/getAcrossCompanies'; //replace here
    }
    const data = await fetch(host, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    })
        .then(res => { return res.json() })
    return data
}

export async function getAcrossDepartments() {
    let host;
    if (window.location.origin.includes('localhost')) {
        host = 'http://localhost:5000/api/getAcrossDep';
    } else {
        host = 'https://deltavis.herokuapp.com/api/getAcrossDep'; //replace here
    }
    const data = await fetch(host, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    })
        .then(res => { return res.json() })
    return data
}

export async function getAcrossSen() {
    let host;
    if (window.location.origin.includes('localhost')) {
        host = 'http://localhost:5000/api/getAcrossSen';
    } else {
        host = 'https://deltavis.herokuapp.com/api/getAcrossSen'; //replace here
    }
    const data = await fetch(host, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    })
        .then(res => { return res.json() })
    return data
}

export async function getFeeling() {
    let host;
    if (window.location.origin.includes('localhost')) {
        host = 'http://localhost:5000/api/getFeel';
    } else {
        host = 'https://deltavis.herokuapp.com/api/getFeel'; //replace here
    }
    const data = await fetch(host, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    })
        .then(res => { return res.json() })
    return data
}

export async function getFeelingsBy() {
    let host;
    if (window.location.origin.includes('localhost')) {
        host = 'http://localhost:5000/api/getFeelingBy';
    } else {
        host = 'https://deltavis.herokuapp.com/api/getFeelingBy'; //replace here
    }
    const data = await fetch(host, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    })
        .then(res => { return res.json() })
    return data
}

export async function getFeelingByCompany(company) {
    let host;
    if (window.location.origin.includes('localhost')) {
        host = 'http://localhost:5000/api/getFeelingByCompany';
    } else {
        host = 'https://deltavis.herokuapp.com/api/getFeelingByCompany'; //replace here
    }
    const data = await axios.post(host, {
        company,
    })
        .then(function (response) {
           return response.data
        })
        .catch(function (error) {
            console.log(error);
        });
    return data
}