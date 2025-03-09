async function fetchRandomIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;

        document.getElementById('ip-info').textContent = `Random IP: ${ip}`;
        fetchIPInfo(ip);
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}

async function fetchIPInfo(ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();

        const { latitude, longitude, city, country_name } = data;

        document.getElementById('ip-info').textContent += ` - ${city}, ${country_name}`;

        const map = L.map('map').setView([latitude, longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        
        L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`${city}, ${country_name}`)
            .openPopup();
    } catch (error) {
        console.error('Error fetching IP info:', error);
    }
}
