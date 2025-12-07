
export async function getAllArtisans() {
  try {
    const response = await fetch('/data/artisans.json');
    if (!response.ok) throw new Error('Erreur lors du chargement des données');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}


export async function getTopArtisans() {
  const artisans = await getAllArtisans();
  return artisans.filter(artisan => artisan.top === true).slice(0, 3);
}


export async function getArtisansByCategory(category) {
  const artisans = await getAllArtisans();
  return artisans.filter(artisan => artisan.category === category);
}


export async function getArtisanById(id) {
  const artisans = await getAllArtisans();
  return artisans.find(artisan => artisan.id === parseInt(id));
}


export async function searchArtisans(query) {
  if (!query || query.trim() === '') return [];
  
  const artisans = await getAllArtisans();
  const searchTerm = query.toLowerCase().trim();
  
  return artisans.filter(artisan => 
    artisan.name.toLowerCase().includes(searchTerm) ||
    artisan.specialty.toLowerCase().includes(searchTerm) ||
    artisan.location.toLowerCase().includes(searchTerm)
  );
}