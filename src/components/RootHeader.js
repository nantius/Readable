import React from 'react'
import {Link} from 'react-router-dom';
import { Header, Icon, Divider } from 'semantic-ui-react'
import PostFormModal from './PostFormModal';

function RootHeader(props) {

    const {location, category} = props

    const linkStyle = {
        display : 'inline-block', 
        marginRight: '20px',
        marginTop: '20px',
    }
    
    return(
     
        <div>
            {
               location !==  "/" &&
               (  
                    <Link style={linkStyle} to={`/`}><Icon size='big' name='arrow left' /></Link>
                )
             }
            
            <Header style={{marginTop: '10px'}} as='h1'>Readable</Header>
            <PostFormModal category={category} />
            <Divider/>
        </div>
    )
}

export default RootHeader;