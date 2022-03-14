import  React, { useState } from 'react';
import { DataGrid, GridToolbarContainer,GridToolbarFilterButton,} from '@mui/x-data-grid';
import { ongetAllUsers } from '../redux/actions/simpleActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';


const CustomToolbar = ({ setFilterButtonEl }) => (
    <GridToolbarContainer>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
    </GridToolbarContainer>
  );
  CustomToolbar.propTypes = {
    setFilterButtonEl: PropTypes.func.isRequired,
  };

export default function ListView() {
    const dispatch = useDispatch();
    const users = useSelector((state)=>state.home.users);
    const [ page, setPage] = useState(1);
    const [ pageSize, setPageSize] = useState(5);
    const [ currentPageData, setCurrentPageData] = useState([]);
    const [filterButtonEl, setFilterButtonEl] = useState(null)

    useEffect(() => {
        dispatch(ongetAllUsers());
    }, [])

    console.log('>>>>>>>>>>>>>>>>>', currentPageData);

    useEffect(() => {
        if(users && users.length >=1){
            const data = users.slice(0,99).map((item,index) => {
                return {
                    id:index,
                    gender: item.gender,
                    name:item.name.title+'.'+item.name.first+' '+item.name.last,
                    email:item.email,
                    city:item.location.city,
                    state:item.location.state,
                };
            })
            setCurrentPageData(data);
        }
      
        
    }, [users])


    const columns = [
        { field: 'gender', headerName: 'Gender', width: 70, filterable: false },
        { field: 'name', headerName: 'Full Name', width: 170,},
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'city', headerName: 'City', width: 130, filterable: false },
        { field: 'state', headerName: 'State', width: 130, filterable: false },
    ];

  return (

    
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        page={page}
        filterMode='client'
        onPageChange={(newPage) => setPage(newPage)}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rows={[...currentPageData]}
        pagination
        components={{
            Toolbar: CustomToolbar,
          }}
        componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
            },
            toolbar: {
              setFilterButtonEl,
            },
          }}
      />
    </div>
  );
}