import { ThemeProvider, createTheme } from '@mui/material'
import MaterialTable from 'material-table';
import React from 'react'

const DataTable = (columns, data, title, actions) => {
  const defaultMaterialTheme = createTheme();
  console.log('columns', columns)
  console.log('data', columns.data)

  return (
    <div>

      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          columns={columns.columns}
          data={data}
        />
      </ThemeProvider>


    </div>
  )
}

export default DataTable