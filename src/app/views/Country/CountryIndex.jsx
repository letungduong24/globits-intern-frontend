import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import CountryTable from './component/CountryTable';
import { Box, Button, TextField } from '@material-ui/core';
import CountryModal from './component/CountryModal';
import { useStore } from '../../stores';

const CountryIndex = observer(() => {
    const { countryStore } = useStore();

    useEffect(() => {
        countryStore.loadCountries();
    }, [countryStore.page, countryStore.pageSize, countryStore.keyword]);

    const handleSearchChange = (event) => {
        countryStore.setKeyword(event.target.value);
    };

    return (
        <div className='p-10 w-full'>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={3}>
                <h2>Country</h2>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                    <TextField
                        placeholder="Tìm kiếm..."
                        variant="outlined"
                        size="small"
                        value={countryStore.keyword}
                        onChange={handleSearchChange}
                        style={{ width: 300 }}
                    />
                    <Button onClick={countryStore.handleOpen} className='block' variant="contained" color="primary">
                        Add Country
                    </Button>
                </Box>
            </Box>
            <CountryTable />
            <CountryModal />
        </div>
    );
});

export default CountryIndex;