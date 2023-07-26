import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Header from "../../components/header/Header";
import MainCard from "../../components/Cards/MainCard";
import LoadingCard from "../../components/Cards/LoadingCard";
import { searchActions } from "../../store/search";

import './CommunitySearch.css';


// const LoadingCards = () => {
//     return (
//         <>
            
//         </>
//     );
// }


const CommunitySearch = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");
    const API_URL = import.meta.env.VITE_APP_WEBSITE_API;
    const searchResult = useSelector(state => state.search.searchResult);

    const fetchData = async () => {
        try {
            dispatch(searchActions.resetState());
            const response = await axios.get(`${API_URL}/search`, {
                params: {
                    search: searchQuery,
                },
            });

            dispatch(searchActions.setSearchResult(response.data));
            dispatch(searchActions.setQuery(searchQuery));
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    return (
        <>
            <Header />

            <div className="community-search-container">
                <div className="community-search-filter"></div>

                
                {!searchResult ? (
                    <div className="community-search-card-grid">
                        <LoadingCard />
                    </div>
                ) : (
                    <div className="community-search-card-grid">
                        {searchResult.map((comm, index) => (
                            <MainCard
                                key={comm._id}
                                uniqueURL={comm.uniqueURL}
                                image={comm.bannerURL}
                                title={comm.name}
                                members={comm.members}
                                description={comm.description}
                                isPrivate={comm.permissionRequired}
                                location={comm.location}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default CommunitySearch
