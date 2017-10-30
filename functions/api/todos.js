const admin = require('firebase-admin');
const db = admin.firestore();
const cname = 'todos';

exports.query = (req, res) => {
    db.collection(cname)
        .doc(req.params.id)
        .get()
        .then((d) => {
            if (!d.exists) {
                console.log(`todos - no document with id ${req.params.id}`);
                return res.status(404).json({});
            }
            const data = d.data();
            console.log(`found document with id ${req.params.id}`, data);
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.create = (req, res) => {
    const model = req.body;
    db.collection(cname)
        .doc(model.id)
        .set(model)
        .then(() => {
            res.status(200).json(model);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};
