import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import Button from '@material-ui/core/Button';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';
import Addcustomer from './Addcustomer';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(res => res.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }


    const deleteCustomer = (link) => {
        if (window.confirm('Remove this customer?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchData())
                .catch(err => console.error())
        }
    }

    const addTraining = (training) => {
        fetch(`https://customerrest.herokuapp.com/api/trainings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const columns = [
        {
            sortable: false,
            filterable: false,
            Header: "",
            accessor: "links[0].href",
            Cell: row => <Addtraining addTraining={addTraining} customer={row.original} />
        },
        { Header: 'First name', accessor: 'firstname' },
        { Header: 'Last name', accessor: 'lastname' },
        { Header: 'Street Address', accessor: 'streetaddress' },
        { Header: 'Postal code', accessor: 'postcode' },
        { Header: 'City', accessor: 'city' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Phone', accessor: 'phone' },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original} />
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: row => <Button color="secondary" onClick={() => deleteCustomer(row.value)}>Delete</Button>
        },
    ]

    return (
        <div style={{ maxWidth: '100%' }}>
            <Addcustomer saveCustomer={saveCustomer}/>
            <ReactTable
                filterable={true}
                columns={columns}
                data={customers}
                showPaginationBottom={false}
                sortable={true}
            />
        </div>
    );
}