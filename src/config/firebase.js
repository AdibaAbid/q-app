import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDD6PE1TS0y1ZJdhFEDt6RMZmTvVgAM6Jc",
  authDomain: "q-app-1dc90.firebaseapp.com",
  databaseURL: "https://q-app-1dc90.firebaseio.com",
  projectId: "q-app-1dc90",
  storageBucket: "q-app-1dc90.appspot.com",
  messagingSenderId: "1023500179196",
  appId: "1:1023500179196:web:4a3f0f0745f31e3bc9e979",
  measurementId: "G-7QYRV3MDWF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const storage = firebase.storage()
const db = firebase.firestore()

function fbLogin() {
  const provider = new firebase.auth.FacebookAuthProvider();
  return auth.signInWithPopup(provider)
}

function userAuth(email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
}
function userLogin(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

function getSpecificCompany(companyId) {
  const result = db.collection('CompanyInfo').doc(companyId).get()
  return result
  }

  function getToken(companyId) {
     return  db.collection('setToken')
      .where('userId', '==', companyId).get()
    //   .then(function(snaps) {
    //     snaps.forEach(function(doc) {
    //     console.log('token aya firebase se** doc.data()', doc.data())
    //   });
    // })
    }

function getTodayToken(companyId) {
      return db.collection('CompanyInfo').doc(companyId).get()
    }
function getCompanies(limit) {
      const ref = firebase.firestore().collection('CompanyInfo').limit(limit).orderBy('name')
      // if (searchText) return ref.where('companyName', '==', searchText).get()
      return ref.get()
  }

export {
    firebase, fbLogin, userAuth, userLogin, storage,
    getSpecificCompany,
    getToken,
    getTodayToken,
    getCompanies
  }