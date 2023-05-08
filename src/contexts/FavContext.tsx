import { createContext, useState } from 'react';
import { loadFavGyms } from '../utils/favGyms';

interface Fav {
    favViewOnly: boolean;
    handleFavViewOnly: () => void;
    favGyms: string[];
};

interface FavProviderProps {
    children: React.ReactNode;
};

export const FavContext = createContext(
    {} as Fav
);

export function FavProvider({ children }: FavProviderProps) {
    const [favViewOnly, setFavViewOnly] = useState<boolean>(false);
    const [favGyms, setFavGyms] = useState<string[]>(loadFavGyms());

    const handleFavViewOnly = () => {
        setFavGyms(() => loadFavGyms());
        setFavViewOnly(!favViewOnly);
    };

    return (
        <FavContext.Provider value={{ favViewOnly, handleFavViewOnly, favGyms }}>
            {children}
        </FavContext.Provider>
    );
};