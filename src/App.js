import './App.css';
import React, { useEffect, useState } from 'react';
import DataTable from './component/DataTable/DataTable.jsx';
import InputBar from './component/InputBar/InputBar.jsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { format, formatDate } from 'date-fns';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LineCharts from './component/linechart/LineCharts.jsx';

function App()
{
  const [data, setData] = useState([]);
  const [id, setId] = useState(0)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState(0)
  const [date, setDate] = useState(null)
  const [dates, setDates] = useState([]);
  const [monthes, setMonthes] = useState([]);

  const refresh = () =>
  {
    var d = JSON.parse(localStorage.getItem("data"))
    if (d != null || d != [])
    {
      setData(d)
    }
  }
  useEffect(() =>
  {
    // Create an empty object to store sums for each date
    let sumsByDate = [];
    // Iterate through the list of objects
    for (let obj of data)
    {
      // Extract price and date from each object
      let { price, date } = obj;

      // If the date already exists in the sumsByDate object, add the price to it
      // Otherwise, initialize it with the current price

      if (sumsByDate.filter(i => format(obj.date, "dd/MM/yyyy") == i.date).length > 0)
      {
        var i = sumsByDate.indexOf(sumsByDate.filter(o => o.date == format(obj.date, "dd/MM/yyyy"))[0]);
        sumsByDate[i].total += price;
      }

      else
      {
        sumsByDate = [...sumsByDate, { "total": price, "date": format(date, "dd/MM/yyyy") }]
      }
    }
    setDates(sumsByDate);

    // Create an empty object to store sums for each date
    let sumsByMonthes = [];

    // Iterate through the list of objects
    for (let obj of data)
    {
      // Extract price and date from each object
      let { price, date } = obj;

      // If the date already exists in the sumsByDate object, add the price to it
      // Otherwise, initialize it with the current price

      if (sumsByMonthes.filter(i => format(obj.date, "MMMM") == i.month).length > 0)
      {
        var i = sumsByMonthes.indexOf(sumsByMonthes.filter(o => o.month == format(obj.date, "MMMM"))[0]);
        console.log("<<<<<<<<<<<<<<<<<<<<", i)
        sumsByMonthes[i].total += price;
      }

      else
      {
        sumsByMonthes = [...sumsByMonthes, { "total": price, "month": format(date, "MMMM") }]
      }
    }
    setMonthes(sumsByMonthes);
  }, [data])
  const EditRow = (id) =>
  {
    let d = data.filter(item => item.id == id);
    setId(id);
    setTitle(d[0]['title'])
    setDesc(d[0]['description'])
    setPrice(d[0]['price'])
    setDate(d[0]['date'])
  }
  const ChangeEdit = () =>
  {
    const ind = data.map((i, index) => { return ({ "index": index, "id": i.id }) }).filter((i) => i.id == id)[0].index;
    const d = { id: id, title: title, description: desc, price: price, date: date }
    const noti = data.filter((item, index) => index < ind);
    const noti2 = data.filter((item, index) => index > ind);
    const all = [...noti, d, ...noti2];
    setData([...noti, d, ...noti2])
    localStorage.removeItem('data');
    localStorage.setItem("data", JSON.stringify(all))
  }
  const DeleteRow = (id) =>
  {
    let d = data.filter(item => item.id != id)
    setData(d);
    localStorage.setItem("data", JSON.stringify(d))
  }
  const DefaultColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", type: "string", headerName: "Title", width: 120, },
    { field: "description", type: "string", headerName: "description", width: 200, },
    { field: "price", headerName: "price", width: 80, type: "number", },
    { field: "date", headerName: "Date", renderCell: (params) => (<div>{format(new Date(params.value), 'dd/MM/yyy')}</div>), width: 110, type: "Date", },
    {
      field: "action", headerName: "Action", width: 150, sortable: false, disableExport: true, renderCell: (params) =>
      {
        return (
          <div className="action">
            <Link title='Edit' className="delete bg-transparent text-primary btn-sm" onClick={() => EditRow(params.row.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" >
              <EditIcon />
            </Link>
            <button className="delete bg-transparent text-danger border border-0 btn-sm" title='Hide' onClick={() => DeleteRow(params.row.id)}>
              <DeleteIcon />
            </button>

          </div>
        );
      },
    }
  ];
  return (
    <div className="App row">
      <Router>
        <h1 className='display-4'>Expense Tracker</h1>
        <InputBar setData={setData} data={data} />
        <DataTable columns={DefaultColumns} row={data} />
        <h5 className='mt-4'>Daily Total Expense</h5>
        <LineCharts data={dates.sort(o => o['date']).slice(-30)} xkey="date" datakey="total" title='Total Expenses' />
        <h5 className='mt-4'>Monthly Total Expense</h5>
        <LineCharts data={monthes.slice(-30)} xkey="month" datakey="total" title='Total Expenses' />
      </Router>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Row</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <TextField className='mt-3' onChange={(e) => setTitle(e.target.value)} value={title} id="outlined-basic" label="Title" variant="outlined" /><br />
              <TextField className='mt-3' onChange={(e) => setDesc(e.target.value)} value={desc} id="outlined-basic" label="description" variant="outlined" /><br />
              <TextField className='mt-3' onChange={(e) => setPrice(e.target.value)} value={price} /*error helperText="Require*"*/ id="outlined-error" label="price" variant="outlined" /><br />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={() => ChangeEdit()} data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
