import React, { useState, useEffect } from 'react'
import { firebase } from '../../config/firebase'
import { Button, Modal, Table, ModalFooter, Form } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import ModalBody from 'react-bootstrap/esm/ModalBody'
import { useHistory } from 'react-router-dom'
import { getSpecificCompany, getCompanies } from '../../config/firebase'
import MyMapComponent from '../component/map'

export default function Company() {
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [companyList, setCompanyList] = useState([])
    const [showTable, setTable] = useState(true)

    //Infinite Scroll Function start
    const [companies, setCompanies] = useState([])
    const [limit, setLimit] = useState(5)
    let loading = false

    const handleShow = () => setShow(true);

    useEffect(() => {
        // fetchData()
        document.addEventListener('scroll', trackScrolling)
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }
    }, []);

    useEffect(() => {
        getAllCompanies()
        console.log('limit useEffect***', limit)
        document.addEventListener('scroll', trackScrolling)
    }, [limit])

    const getAllCompanies = async () => {
        loading = true
        const companies = await getCompanies(limit)
        const list = []
        companies.forEach(doc => {
            list.push({ ...doc.data(), companyId: doc.id })
        })
        setCompanies(list)
        console.log('company info***', list)
        loading = false
    }

    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight + 10;
    }

    const trackScrolling = () => {
        const wrappedElement = document.getElementById('header')
        if (isBottom(wrappedElement) && !loading) {
            console.log('header bottom reached', limit);
            setLimit(limit + 3)

            document.removeEventListener('scroll', trackScrolling);
        }
    };
    //Infinite Scroll Function End.

    //FetchData function si not use after using Infinit Scroll
    const fetchData = async () => {
        const db = firebase.firestore()
        const data = await db.collection("CompanyInfo").get()
        const companiesShow = []
        data.forEach((doc) => {
            console.log('ID OF Document **** ', doc.id)
            companiesShow.push({ ...doc.data(), companyId: doc.id })
        })
        console.log("data aya firebase se", data.docs.map(doc => doc.data()))
        setCompanyList(companiesShow)
    }
    //Fetch Function End

    const clearForm = function () {
        document.querySelector("input[name='address']").value = ''
        document.querySelector("input[name='date']").value = ''
        document.querySelector("input[name='name']").value = ''
        document.querySelector('.form-control-file').file = ''
    }
    const companyObject = {
        name: '',
        date: '',
        image: '',
        address: ''
    }
    const [values, setValues] = useState(companyObject)
    const [fileUrl, setFileUrl] = useState(null)

    const onFileChange = function (e) {
        const file = e.target.files[0]
        const storageRef = firebase.storage().ref(`certificates/${file.name}`);
        storageRef.put(file).then(function (res) {
            console.log('res****', res)
            res.ref.getDownloadURL().then(function (url) {
                console.log('url--->', url)
                setFileUrl(url)
                console.log('file url fromstate', fileUrl)

            })
        })
    }

    const handleChangeInput = function (e) {
        const { name, value } = e.target
        console.log('valueee', value)
        setValues({
            ...values,
            [name]: value,
            image: fileUrl
        })
    }

    const submit = function () {
        setShow(false)
        const db = firebase.firestore()
        db.collection("CompanyInfo").add(values)
        clearForm()
        setTable(true)
    }


    return (
        <div style={{ height: 'auto' }} id="header">
            <h1 style={{ color: 'dodgerblue', fontSize: 28, marginTop: 15 }}>
                Add Your Company Information Here</h1>
            <div className='searchbar' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <input placeholder='Search Here' />
                <Button onClick={() => history.goBack()}
                    variant="primary" size="lg"
                >Back</Button>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Company started Date</th>
                        <th>Certificates</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {showTable &&
                        companies.map(function (item, index) {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td >{item.name}</td>
                                    <td >{item.date}</td>
                                    <td ><img height='50' src={item.image} alt='img' /></td>
                                    <td >{item.address}</td>
                                    <td>
                                        <button
                                            onClick={() => history.push(`/showCompanyDetails/${item.companyId}`)}
                                        >View Details</button>
                                        <button onClick={() => history.push(`./Token/${item.companyId}`)}>Set Token</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>

            <Button style={{ fontWeight: 'bold', fontSize: 20, float: 'right' }}
                onClick={handleShow}>+</Button>

            <Modal show={show}>
                <ModalHeader><h2>Company Information Form</h2></ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" name='name' placeholder="Enter your company name" onChange={handleChangeInput} />
                            <Form.Text className="text-muted">
                                We'll never share your comapny details with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Since Company Started</Form.Label>
                            <Form.Control type="date" name='date' onChange={handleChangeInput} />
                        </Form.Group>
                        <Form.Group>
                            <Form.File id="Certificates" label="Certificates Images" onChange={onFileChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Company Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter your company address" name='address' onChange={handleChangeInput} />
                            {/* <MyMapComponent
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                containerElement={<div style={{ height: `300px` }} />}
                                loadingElement={<div style={{ height: `60%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            /> */}
                        </Form.Group>
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button onClick={submit}>Submit</Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}