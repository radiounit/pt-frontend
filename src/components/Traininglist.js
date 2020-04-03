import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import Button from '@material-ui/core/Button';
import Moment from 'moment';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
    }

    const deleteTraining = (id) => {
        if (window.confirm('Remove this training session?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {
                method: 'DELETE'
            })
                .then(res => fetchData())
                .catch(err => console.error())
        }
    }

    const columns = [
        {
            Header: 'Customer', accessor: 'customer',
            Cell: row => {
                return row.value.firstname + ' ' + row.value.lastname
            }
        },
        {
            Header: 'Activity', accessor: 'activity'
        },
        {
            Header: 'Duration', accessor: 'duration'
        },
        {
            Header: 'Date', accessor: 'date',
            Cell: row => {
                return Moment(row.value).format('DD/MM/YYYY, h:mm');
            }
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: row => <Button onClick={() => deleteTraining(row.value)}>Delete</Button>
        },
    ]


    return (
        <div style={{ maxWidth: '100%' }}>
            <ReactTable
                data={trainings}
                columns={columns}
                showPaginationBottom={false}
                sortable={true}
            />
        </div >
    );
}