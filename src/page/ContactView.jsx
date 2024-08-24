import { useState, useEffect } from 'react';
import axios from 'axios';
import TitleHead from '../components/TitleHead';
import LoadingSpinner from '../components/LoadingSpinner';

const ContactView = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const apiKey = import.meta.env.VITE_APIKEY_CMC;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/v1/cryptocurrency/map', {
                    headers: {
                        'X-CMC_PRO_API_KEY': apiKey,
                    }
                });
                setData(response.data.data); // Assuming 'data' is the array you want
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    // Filter data based on search query
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
       
    );
    console.log(searchQuery);
    return (
        <div className="container mx-auto px-4 py-6">
            <TitleHead title="Cryptocurrency Data" />
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 text-lg rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredData.length > 0 ? (
                    filteredData.map(item => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-start"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {item.name} ({item.symbol})
                            </h2>
                            <p className="text-gray-700">Rank: {item.rank}</p>
                            <p className="text-gray-600">First Historical Data: {new Date(item.first_historical_data).toLocaleDateString()}</p>
                            <p className="text-gray-600">Last Historical Data: {new Date(item.last_historical_data).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full">No results found</p>
                )}
            </div>
        </div>
    );
};

export default ContactView;
