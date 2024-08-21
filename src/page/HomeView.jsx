import { useState, useEffect } from 'react';
import TitleHead from "../components/TitleHead";

const HomeView = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const kota = '1632'; 
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const date = getCurrentDate();
  const apiUrl = import.meta.env.VITE_API_JADWAL;

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(`${apiUrl}/${kota}/${date}`);
        const data = await response.json();
        if (data.status) {
          setPrayerTimes(data.data.jadwal);
        } else {
          throw new Error('Failed to fetch prayer times');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [kota, date, apiUrl]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <>
      <TitleHead title="Home" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Waktu Sholat</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">{prayerTimes.tanggal}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-green-600">
            <div className="flex flex-col items-center bg-green-400">
              <span className="font-semibold">Subuh:</span>
              <span>{prayerTimes.subuh}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Dzuhur:</span>
              <span>{prayerTimes.dzuhur}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Ashar:</span>
              <span>{prayerTimes.ashar}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Maghrib:</span>
              <span>{prayerTimes.maghrib}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Isya:</span>
              <span>{prayerTimes.isya}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeView;
