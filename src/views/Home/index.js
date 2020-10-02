import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import bgImage from '../../images/Queue.svg'



function Home(props) {
    const history = useHistory()
    console.log('from Home****', props.user)
    return (
        <div >
            <div className='nav-bar'>
                <h1 className='welcome'>Welcome {props.user && props.user.name}</h1>
                <button style={{ backgroundColor: '#e63838' }}
                    onClick={() => history.replace('/')}>Logout</button>
            </div>
            <div>
                <img className='homeBg' src={bgImage} alt={'Queue'} />
            </div>
            <div className='select-option'>
                <button style={{ backgroundColor: '#1976D2', margin: 5 }} onClick={() => history.push('/company')}>Are You a Company?</button>
                <button style={{ backgroundColor: '#1976D2' }}>Are you finding/waiting for tokens?</button>
            </div>

        </div>

    )
}
const mapStateToProps = (state) => {
    console.log('state in Home', state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Home)