export default (req, res, next) => {
    const {
        files, body: {
            data,
        },
    } = req;
    req.body = data ? (
        { ...JSON.parse(data) }) : { };
    if (files && Object.keys(files).length) {
        Object.assign(req.body, { ...files });
    }
    return next();
};
