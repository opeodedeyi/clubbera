import React, { useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Header from "../../components/header/Header";
import MainCard from "../../components/Cards/MainCard";
import { searchActions } from "../../store/search";

import './CommunitySearch.css';


const CommunitySearch = () => {
    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;
    const query = useSelector(state => state.search.query);
    const searchResult = useSelector(state => state.search.searchResult);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/search`, {
                params: {
                    search: query,
                },
            });

            dispatch(searchActions.setSearchResult(response.data));
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header />

            <div className="community-search-container">
                <div className="community-search-filter"></div>

                <div className="community-search-card-grid">
                    {searchResult.map((comm, index) => (
                        <MainCard 
                            key={comm.uniqueURL}
                            image={comm.bannerURL}
                            title={comm.name}
                            members={comm.members}
                            description={comm.description}
                            private={comm.permissionRequired}
                            location={comm.location}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default CommunitySearch
