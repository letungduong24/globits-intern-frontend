import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import ReligionTable from './component/ReligionTable';
import { Box, Button, TextField } from '@material-ui/core';
import ReligionModal from './component/ReligionModal';
import { useStore } from '../../stores';

const ReligionIndex = observer(() => {
    const { religionStore } = useStore();

    useEffect(() => {
        religionStore.loadReligions();
    }, [religionStore.page, religionStore.pageSize, religionStore.keyword]);

    const handleSearchChange = (event) => {
        religionStore.setKeyword(event.target.value);
    };

    return (
        <div className='p-10 w-full'>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={3}>
                <h2>Religion</h2>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                    <TextField
                        placeholder="Tìm kiếm..."
                        variant="outlined"
                        size="small"
                        value={religionStore.keyword}
                        onChange={handleSearchChange}
                        style={{ width: 300 }}
                    />
                    <Button onClick={religionStore.handleOpen} className='block' variant="contained" color="primary">
                        Add Religion
                    </Button>
                </Box>
            </Box>
            <ReligionTable />
            <ReligionModal />
        </div>
    );
});

export default ReligionIndex;

