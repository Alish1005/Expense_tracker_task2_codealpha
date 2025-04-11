import "./datatable.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useState, useEffect } from "react";
import { useDemoData } from '@mui/x-data-grid-generator';



function DataTable(props)
{
  const { columns, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 1000,
    editable: true,
    visibleFields: props.columns,
  });
  function getRowId(row)
  {
    return row.Id;
  }
  return (
    <div className="datatable overflow-y justify-self-center mt-5" style={{ width: "fit-content", height: "80vh", marginLeft: "5%" }}>
      <DataGrid
        //autoHeight
        className="dataGrid shadow"
        rows={props.row}
        columns={props.columns}
        /*columns={[...props.columns,actionColumn]}*///where actionColumn is the same of that on the normal managment pages
        /*initialState={{
        pagination: {
            paginationModel: { pageSize: 5 },
            
        },
        }}*/
        getRowId={props.getId && getRowId}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        //loading={loading}
        //pageSizeOptions={[5, 10,20,30]}
        checkboxSelection
        //disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
        disableVirtualization
        hideFooterPagination
      />
    </div>
  );
}

export default DataTable;