import './inputBar.css';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
function InputBar(props)
{
    const [EditData, setEditData] = useState(props.EditData)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState(0)
    useEffect(() =>
    {
        if (EditData != null)
        {
            setTitle(EditData.title);
            setDesc(EditData.description);
            setPrice(EditData.price);
        }
    }, [props.EditData])
    const add = () =>
    {
        let d = props.data;
        console.log(d);
        var i = 1;
        if (d.length != 0)
        {
            i = d[d.length - 1]['id'] + 1;
        }
        const n = { id: i, title: title, descreption: desc, price: Number(price), date: new Date() };
        props.setData([...d, n])
        localStorage.setItem("data", JSON.stringify([...d, n]))
        setTitle('');
        setDesc('')
        setPrice(0);
    }
    return (
        <div className="Inputbar col-md-3 col-lg-3 m-5">
            {EditData == null ? <span className='h5 m-5'>Add Expense</span> : <span className='h5 m-5'>Edit Data</span>}
            <TextField onChange={(e) => setTitle(e.target.value)} value={title} id="outlined-basic" label="Title" variant="outlined" />
            <TextField onChange={(e) => setDesc(e.target.value)} value={desc} id="outlined-basic" label="Descreption" variant="outlined" />
            <TextField onChange={(e) => setPrice(e.target.value)} value={price} /*error helperText="Require*"*/ id="outlined-basic" label="price" variant="outlined" />
            <button type="button" className='btn btn-success' title='Add Expense' onClick={add}><AddIcon /></button>
        </div>
    );
}

export default InputBar;