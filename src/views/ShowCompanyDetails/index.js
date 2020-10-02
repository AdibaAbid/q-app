import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useHistory, useParams } from 'react-router-dom'
import { getSpecificCompany, getToken } from '../../config/firebase'
import * as firebase from 'firebase';

export default function ShowCompanyDetails() {
    const { companyId } = useParams()
    const history = useHistory()
    const [companyData, setCompanyData] = useState(false)
    const [tokenOfToday, setTokenOfToday] = useState(false)

    useEffect(() => {
        fetchCompanyData()
        fetchTokenData()
    }, [])

    //Fetching specific company data
    const fetchCompanyData = async () => {
        const result = await getSpecificCompany(companyId)
        setCompanyData(result.data())
    }
    //Fetching specific company token  
    const fetchTokenData = async () => {
        const dataToken = await getToken(companyId)
        let todaysToken = {}
        dataToken.forEach(doc => {
            todaysToken = doc.data()
        })
        setTokenOfToday(todaysToken)
    }
    // console.log('companyData****', companyData)
    // console.log('Token***** ', tokenOfToday)       



    return (
        <div>
            <Button onClick={() => history.goBack()}
                variant="primary" size="lg"
                style={{ marginRight: '-100%' }}
            >Back</Button>
            {companyData && <div>
                <img src={companyData.image} style={{ height: 100 }} />
                <h3>Company Name: <span> {companyData.name}</span></h3>
                <h4>Started Since:<span> {companyData.date}</span></h4>
                <h5>Company Address:<span> {companyData.address}</span></h5>
            </div>}
            {tokenOfToday && <div>
                <h3>Total no Of Tokens Available: <span> {tokenOfToday.todayToken}</span></h3>
                <h4>Token Estimate Time:<span> {tokenOfToday.tokenEstTime}</span></h4>

            </div>}
        </div>
    )
}