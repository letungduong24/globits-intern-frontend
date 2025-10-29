import React, { useEffect } from 'react';
import { pagingCountries } from './CountryService';

export default function CountryIndex() {

    useEffect(() => {
        loadCountries();
    }, [loadCountries]);

    async function loadCountries() {
        let searchObject = {
            pageIndex: 1,
            pageSize: 10,
        }
        let data = await pagingCountries(searchObject);
        console.log(data.data.content)
    }

    return (
        <h2>Country</h2>
    )
}