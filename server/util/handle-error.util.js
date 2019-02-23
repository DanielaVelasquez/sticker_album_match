var handleError = (err, res)=>{
    try {
        if (err.field) {
            res.status(400).send(err);
        } else if (err.errors[0].__raw.field) {
            res.status(400).send({field: err.errors[0].__raw.field, error: err.errors[0].__raw.error});
        }
    } catch (e) {
        res.status(500).send();
    }
}

module.exports = handleError;