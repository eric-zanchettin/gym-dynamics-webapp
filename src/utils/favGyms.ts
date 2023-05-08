export const loadFavGyms = () => {
    const favGymsLS = localStorage.getItem('favGyms');

    let _favGyms: string[] = [];
    if (favGymsLS) _favGyms = [...JSON.parse(favGymsLS)];

    return _favGyms;
};