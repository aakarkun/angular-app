import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const games = [
            { id: 1, name: 'Dota 2', genre: 'Multiplayer Online Battle Arena' },
            { id: 2, name: 'World of Warcraft', genre: 'Multiplayer Online Battle Arena' },
            { id: 3, name: 'League of Legends', genre: 'Multiplayer Online Battle Arena' },
            { id: 4, name: 'Far Cry 5', genre: 'First Person Shooter' },
            { id: 5, name: 'Just Cause 2', genre: 'Action-adventure' },
            { id: 6, name: 'FIFA 18', genre: 'Sports Game' },
            { id: 7, name: 'PES 18', genre: 'Sports Game' },
            { id: 8, name: 'Watch Dogs', genre: 'Action-adventure' },
            { id: 9, name: 'Harry Porter', genre: 'Action-adventure' },
            { id: 10, name: 'Spider Man', genre: 'Action-adventure' }
        ];
        return {games};
    }
}