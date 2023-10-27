import {Sidebar} from './Sidebar'
export const LayaoutDashboard = (props) =>{
    return(
        <>
            <Sidebar/>
            <section className='home'>
                {props.children}
            </section>
        </>
        
    );
}