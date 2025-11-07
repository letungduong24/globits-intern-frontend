import React, { useEffect, useState, useRef } from 'react';
import { deleteCountry, pagingCountries } from './CountryService';
import CountryTable from './component/CountryTable';
import { Box, Button, TextField } from '@material-ui/core';
import CountryModal from './component/CountryModal';
import { toast } from 'react-toastify';

export default function CountryIndex() {
    const [countries, setCountries] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [currentCountry, setCurrentCountry] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const searchTimeoutRef = useRef(null);

    const handleDelete = async (id) => {
        try {
            await deleteCountry(id);
            toast.success("Xóa thành công!");
            await loadCountries(page, pageSize, searchKeyword);
        } catch (error) {
            console.error("Error deleting country:", error);
            toast.error("Có lỗi khi xóa!");
        }
    }

    const handleEdit = (country) => {
        setCurrentCountry(country);
        setOpen(true);
    }

    const handleOpen = () => {
        setCurrentCountry(null);
        setOpen(true);
    };

    const handleClose = () => {
        setCurrentCountry(null);
        setOpen(false);
    };

    useEffect(() => {
        loadCountries(page, pageSize, searchKeyword);
    }, [page, pageSize, searchKeyword]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    async function loadCountries(pageIndex, size, searchKeyword = "") {
        const searchObject = {
            pageIndex: pageIndex,
            pageSize: size,
        }
        if (searchKeyword && searchKeyword.trim() !== "") {
            searchObject.keyword = searchKeyword.trim();
        }
        const response = await pagingCountries(searchObject);
        const content = response?.data?.content || [];
        
        setCountries(Array.isArray(content) ? [...content] : []);
        setTotalElements(response?.data?.totalElements || 0);
    }

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setKeyword(value);
        setPage(0); 
        
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
            setSearchKeyword(value);
        }, 500);
    }

    // Cleanup timeout khi component unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className='p-10 w-full'>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={3}>
                <h2>Country</h2>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                    <TextField
                        placeholder="Tìm kiếm..."
                        variant="outlined"
                        size="small"
                        value={keyword}
                        onChange={handleSearchChange}
                        style={{ width: 300 }}
                    />
                    <Button onClick={handleOpen} className='block' variant="contained" color="primary">
                        Add Country
                    </Button>
                </Box>
            </Box>
            <CountryTable 
                countries={countries}
                page={page}
                pageSize={pageSize}
                totalElements={totalElements}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
            <CountryModal 
                open={open} 
                handleClose={handleClose} 
                handleOpen={handleOpen}
                onSuccess={() => loadCountries(page, pageSize, searchKeyword)}
                currentCountry={currentCountry}
            />
        </div>
    )
}