interface LocationData {
    lat: number;
    lng: number;
    city?: string;
    region?: string;
    country?: string;
    timestamp: number;
}

interface StoredLocation extends LocationData {
    source: 'gps' | 'ip' | 'manual';
}

const LOCATION_STORAGE_KEY = 'user_location';
const LOCATION_REFRESH_DISTANCE_KM = 10; // Refresh location if user moved more than 10km

export class LocationService {
    private static instance: LocationService;

    static getInstance(): LocationService {
        if (!LocationService.instance) {
            LocationService.instance = new LocationService();
        }
        return LocationService.instance;
    }

    // Get stored location from localStorage
    getStoredLocation(): StoredLocation | null {
        try {
            const stored = localStorage.getItem(LOCATION_STORAGE_KEY);
            if (!stored) return null;

            const location: StoredLocation = JSON.parse(stored);
            return location;
        } catch (error) {
            console.warn('Error reading stored location:', error);
            return null;
        }
    }

    // Store location data
    private storeLocation(location: StoredLocation): void {
        try {
            localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
        } catch (error) {
            console.warn('Error storing location:', error);
        }
    }

    // Clear stored location
    clearStoredLocation(): void {
        try {
            localStorage.removeItem(LOCATION_STORAGE_KEY);
        } catch (error) {
            console.warn('Error clearing stored location:', error);
        }
    }

    // Calculate distance between two coordinates in kilometers
    private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    // Check if location needs refresh based on distance moved
    private async shouldRefreshLocation(): Promise<boolean> {
        const stored = this.getStoredLocation();
        if (!stored) return true;

        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const distance = this.calculateDistance(
                        stored.lat, stored.lng,
                        position.coords.latitude, position.coords.longitude
                    );
                    
                    resolve(distance > LOCATION_REFRESH_DISTANCE_KM);
                },
                () => {
                    resolve(false); // If we can't get current position, don't refresh
                },
                {
                    timeout: 5000,
                    enableHighAccuracy: false,
                    maximumAge: 60000 // 1 minute
                }
            );
        });
    }

    // Get location using browser geolocation API
    async getCurrentLocation(): Promise<StoredLocation | null> {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                console.warn('Geolocation not supported');
                resolve(null);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    // Try to get city name from coordinates using reverse geocoding
                    const locationData = await this.reverseGeocode(latitude, longitude);
                    
                    const location: StoredLocation = {
                        lat: latitude,
                        lng: longitude,
                        city: locationData?.city,
                        region: locationData?.region,
                        country: locationData?.country,
                        timestamp: Date.now(),
                        source: 'gps'
                    };

                    this.storeLocation(location);
                    resolve(location);
                },
                (error) => {
                    console.warn('Geolocation error:', error.message);
                    // Fall back to IP-based location
                    this.getLocationFromIP().then(resolve);
                },
                {
                    timeout: 10000,
                    enableHighAccuracy: false,
                    maximumAge: 300000 // 5 minutes
                }
            );
        });
    }

    // Fallback: Get approximate location from IP
    private async getLocationFromIP(): Promise<StoredLocation | null> {
        try {
            // Using a free IP geolocation service
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch('https://ipapi.co/json/', {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) throw new Error('IP location failed');
            
            const data = await response.json();
            
            const location: StoredLocation = {
                lat: data.latitude,
                lng: data.longitude,
                city: data.city,
                region: data.region,
                country: data.country_name,
                timestamp: Date.now(),
                source: 'ip'
            };

            this.storeLocation(location);
            return location;
        } catch (error) {
            console.warn('IP geolocation failed:', error);
            return null;
        }
    }

    // Reverse geocoding to get city from coordinates
    private async reverseGeocode(lat: number, lng: number): Promise<{city?: string, region?: string, country?: string} | null> {
        try {
            // Using OpenStreetMap's free reverse geocoding service
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
                {
                    signal: controller.signal,
                    headers: {
                        'User-Agent': 'clubbera-app'
                    }
                }
            );

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('Reverse geocoding failed');

            const data = await response.json();
            const address = data.address || {};

            return {
                city: address.city || address.town || address.village,
                region: address.state || address.region,
                country: address.country
            };
        } catch (error) {
            console.warn('Reverse geocoding failed:', error);
            return null;
        }
    }

    // Get location with fallback strategy
    async getLocation(): Promise<StoredLocation | null> {
        // First, try to get stored location
        const stored = this.getStoredLocation();
        if (stored) {
            // Check if we should refresh based on distance
            const shouldRefresh = await this.shouldRefreshLocation();
            if (!shouldRefresh) {
                return stored;
            }
        }

        // If no stored location or user has moved significantly, get current location
        return this.getCurrentLocation();
    }

    // Manual location setting (for user override)
    setManualLocation(city: string, region?: string, country?: string): void {
        // You might want to geocode this to get lat/lng
        const location: StoredLocation = {
            lat: 0, // You'd get this from geocoding
            lng: 0, // You'd get this from geocoding
            city,
            region,
            country,
            timestamp: Date.now(),
            source: 'manual'
        };

        this.storeLocation(location);
    }

    // Get location string for search enhancement
    getLocationString(): string | null {
        const location = this.getStoredLocation();
        if (!location) return null;

        const parts = [location.city, location.region].filter(Boolean);
        return parts.join(', ');
    }
}

export const locationService = LocationService.getInstance();