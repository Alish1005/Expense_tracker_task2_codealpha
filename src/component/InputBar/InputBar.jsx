import './inputBar.css';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
function InputBar()
{
    return (
        <div className="Inputbar col-md-3 col-lg-3 m-5">
            <span className='h5 m-5'>Add Expense</span>
            <TextField id="outlined-basic" label="Title" variant="outlined" />
            <TextField id="outlined-basic" label="Descreption" variant="outlined" />
            <TextField error id="outlined-error" helperText="Require*" label="price" variant="outlined" />
            <button type="button" className='btn btn-success' title='Add Expense'><AddIcon /></button>
        </div>
    );
}

export default InputBar;