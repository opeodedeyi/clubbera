'use client';

import { useState } from 'react';
import SearchBar from '@/components/ui/SearchBar/SearchBar';
import styles from './DiscoverCommunities.module.css';

export default function DiscoverCommunities() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className={styles.container}>
            <div className={styles.containerTop}>
                <h1 className={styles.containerTitle}>Discover Communities <br /> around you</h1>

                <div className={styles.search}>
                    <SearchBar
                        size="large"
                        placeholder="Search for Community"
                        value={searchQuery}
                        onChange={setSearchQuery}/>
                </div>

                {/* search result */}
            </div>
        </div>
    )
}