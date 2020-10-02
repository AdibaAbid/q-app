import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from "react-bootstrap";
import firebase from 'firebase'
import swal from 'sweetalert'

function Token() {
    const history = useHistory()
    const { companyId } = useParams()
    const [todayToken, setTodayToken] = useState('')
    const [tokenEstTime, setTokenEstTime] = useState('')
 
    const handleSubmit = (e) => {
        e.preventDefault();

        const today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        firebase.firestore().collection("setToken")
            .add({
                todayToken,
                tokenEstTime,
                today,
                userId: companyId
            }).then(() => {
                swal("Token Updated Successfully", "success");
            }).catch((error) => {
                alert(error.message);
            })
        setTodayToken('')
        setTokenEstTime('')


    }

    const tempData = async () => {
        const db = firebase.firestore()
        const tmpComData = await db.collection("setToken").get().then(() => {
        const tokenDay = new Date()
        if(tokenDay.date === tmpComData.getDate){
            console.log("Date  is not Match", tmpComData)
        }
    }).catch((error) => {
        console.log(error.message);
    })}

    return (
        <div>
            <h1>Total no of Token's Slot</h1>
            <Button onClick={() => history.goBack()}
                variant="primary" size="lg"
                style={{ marginRight: '-100%'}}
            >Back</Button>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Token Quantity</Form.Label>
                    <Form.Control placeholder="Total no of Tokens"
                        type="number"
                        onChange={(e) => setTodayToken(e.target.value)}
                        value={todayToken} />
                </Form.Group>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Token Estimated Time</Form.Label>
                    <Form.Control placeholder="Each Token Estimate Time"
                        type="number"
                        onChange={(e) => setTokenEstTime(e.target.value)}
                        value={tokenEstTime} />
                </Form.Group>
                {/* <Button variant="primary" size="lg" type="submit" className="submit" onClick={() => history.goBack()}> */}
                <Button variant="primary" size="lg" type="submit" className="submit" onClick={tempData}>
                    Submit
                </Button>
            </Form>

           
        </div>
    )
}

export default Token;
