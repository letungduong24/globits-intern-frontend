import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import EthnicsTable from './component/EthnicsTable';
import { Box, Button, TextField } from '@material-ui/core';
import EthnicsModal from './component/EthnicsModal';
import { useStore } from '../../stores';

const EthnicsIndex = observer(() => {
    const { ethnicsStore } = useStore();

    useEffect(() => {
        ethnicsStore.loadEthnicities();
    }, [ethnicsStore.page, ethnicsStore.pageSize, ethnicsStore.keyword]);

    const handleSearchChange = (event) => {
        ethnicsStore.setKeyword(event.target.value);
    };

    return (
        <div className='p-10 w-full'>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={3}>
                <h2>Ethnics</h2>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                    <TextField
                        placeholder="Tìm kiếm..."
                        variant="outlined"
                        size="small"
                        value={ethnicsStore.keyword}
                        onChange={handleSearchChange}
                        style={{ width: 300 }}
                    />
                    <Button onClick={ethnicsStore.handleOpen} className='block' variant="contained" color="primary">
                        Add Ethnicity
                    </Button>
                </Box>
            </Box>
            <EthnicsTable />
            <EthnicsModal />
        </div>
    );
});

export default EthnicsIndex;

