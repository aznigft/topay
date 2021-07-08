import React from 'react'
import DataGridDemo from './DataGridDemo'
import PaymentTable from './PaymentTable'
import Grid from '@material-ui/core/Grid';

function Todo(props) {
    return (
        <div>
            {/* <DataGridDemo/> */}
            < Grid item xs={12} />
            <PaymentTable />
        </div>
    )
}


export default Todo

