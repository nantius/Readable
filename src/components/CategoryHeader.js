import React from 'react'
import {Link} from 'react-router-dom';
import { Header, Divider } from 'semantic-ui-react'

function CategoryHeader (props) {

    const {name} = props
    
    return(
        <div style={{marginTop: '15px'}}>
            <Link to={`/${name}`}>
            <Header as='h2'>{name.toUpperCase()}</Header>
            </Link>
            <Divider/>
        </div>
    )
}

export default CategoryHeader;