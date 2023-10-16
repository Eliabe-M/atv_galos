const express = require('express');
const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, collection, getDocs, deleteDoc } = require("firebase/firestore");
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const firebaseConfig = {
    apiKey: "AIzaSyAwh57Nl1OcT-xQj4YuRVFW4Xt231eOEqc",
    authDomain: "projeto-galos.firebaseapp.com",
    projectId: "projeto-galos",
    storageBucket: "projeto-galos.appspot.com",
    messagingSenderId: "170273742956",
    appId: "1:170273742956:web:f6b9d224668d6bd7763849"
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);

app.get('/', async (req, res) => {
    const db = getFirestore();
    const roostersSnapshot = await getDocs(collection(db, 'roosters'));
    const roosters = roostersSnapshot.docs.map(doc => doc.data());
    res.render('index', { roosters });
});

app.post('/login', async (req, res) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
        console.log(userCredential);
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
    }
});

app.post('/register', async (req, res) => {
    const { breed, value, size, weight } = req.body;
    const db = getFirestore();

    try {
        await setDoc(doc(db, 'roosters', breed), {
            breed: breed,
            value: value,
            size: size,
            weight: weight
        });
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
    }
});

app.get('/home', async (req, res) => {
    const db = getFirestore();
    const roostersSnapshot = await getDocs(collection(db, 'roosters'));
    const roosters = roostersSnapshot.docs.map(doc => doc.data());
    const user = auth.currentUser;
    if (user) {
        res.render('home', { user: user, roosters: roosters });
    } else {
        res.redirect('/');
    }
});

app.post('/delete', async (req, res) => {
    const { breed } = req.body;
    const db = getFirestore();
    
    try {
        await deleteDoc(doc(db, 'roosters', breed));
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));
