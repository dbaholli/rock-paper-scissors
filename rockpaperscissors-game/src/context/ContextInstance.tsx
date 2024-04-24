import { createContext } from 'react';
import { GameContextType } from '@/types/types';

export const GameContext = createContext<GameContextType | undefined>(undefined);