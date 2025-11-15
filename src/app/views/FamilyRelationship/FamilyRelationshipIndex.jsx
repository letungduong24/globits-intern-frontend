import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import FamilyRelationshipTable from './component/FamilyRelationshipTable';
import { Box, Button, TextField } from '@material-ui/core';
import FamilyRelationshipModal from './component/FamilyRelationshipModal';
import { useStore } from '../../stores';

const FamilyRelationshipIndex = observer(() => {
    const { familyRelationshipStore } = useStore();

    useEffect(() => {
        familyRelationshipStore.loadFamilyRelationships();
    }, [familyRelationshipStore.page, familyRelationshipStore.pageSize, familyRelationshipStore.keyword]);

    const handleSearchChange = (event) => {
        familyRelationshipStore.setKeyword(event.target.value);
    };

    return (
        <div className='p-10 w-full'>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={3}>
                <h2>Family Relationship</h2>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                    <TextField
                        placeholder="Tìm kiếm..."
                        variant="outlined"
                        size="small"
                        value={familyRelationshipStore.keyword}
                        onChange={handleSearchChange}
                        style={{ width: 300 }}
                    />
                    <Button onClick={familyRelationshipStore.handleOpen} className='block' variant="contained" color="primary">
                        Add Family Relationship
                    </Button>
                </Box>
            </Box>
            <FamilyRelationshipTable />
            <FamilyRelationshipModal />
        </div>
    );
});

export default FamilyRelationshipIndex;

