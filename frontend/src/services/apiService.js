// Base URL of the backend API
const BASE_URL = 'http://localhost:3000/api';

//
// ────────────────────────────────────────────────────────────────
// ▶ AUTHENTICATION
// ────────────────────────────────────────────────────────────────
//

/**
 * Logs in a user using email and password.
 * Returns a JWT token and user data on success.
 */
export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
};

/**
 * Registers a new user with optional profile picture.
 */
export async function register(username, email, password, profilePicture) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, profilePicture }),
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Registration failed');
    }

    return response.json();
};


//
// ────────────────────────────────────────────────────────────────
// ▶ USERS
// ────────────────────────────────────────────────────────────────
//

/**
 * Fetches all users. Requires admin token.
 */
export const fetchUsers = async (token) => {
    const response = await fetch(`${BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
};

/**
 * Fetches a single user by ID.
 */
export const fetchUserById = async (token, id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
};

/**
 * Creates a new user (admin-only).
 */
export const createUser = async (token, userData) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Creating User failed');
    }

    return await response.json();
};

/**
 * Updates a user by ID.
 */
export const updateUser = async (token, id, updatedData) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Updating User failed');
    }

    return await response.json();
};

/**
 * Deletes a user by ID.
 */
export const deleteUser = async (token, id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Deleting User failed');
    }

    return await response.json();
};


//
// ────────────────────────────────────────────────────────────────
// ▶ WEAPONS
// ────────────────────────────────────────────────────────────────
//

/**
 * Fetches all weapons (authenticated).
 */
export const fetchWeapons = async (token) => {
    const response = await fetch(`${BASE_URL}/weapons`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch weapons');
    return await response.json();
};

/**
 * Fetches all weapons (public / open access).
 */
export const fetchAllWeapons = async () => {
    const response = await fetch(`${BASE_URL}/weapons`);
    if (!response.ok) throw new Error('Failed to fetch weapons');
    return await response.json();
};

/**
 * Fetches one weapon by ID.
 */
export const fetchWeaponById = async (token, weaponId) => {
    const response = await fetch(`${BASE_URL}/weapons/${weaponId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weapon');
    }

    return await response.json();
};


//
// ────────────────────────────────────────────────────────────────
// ▶ BUILDS
// ────────────────────────────────────────────────────────────────
//

/**
 * Creates a new build for a user.
 */
export const createBuild = async (token, user_id) => {
    const response = await fetch(`${BASE_URL}/builds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Creating build failed');
    }

    return await response.json();
};

/**
 * Updates an existing build's name, character, and weapons.
 */
export const updateBuild = async (token, buildId, buildData) => {
    const response = await fetch(`${BASE_URL}/builds/${buildId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(buildData),
    });

    if (!response.ok) throw new Error('Failed to update build');
    return await response.json();
};

/**
 * Fetches builds for a specific user (authenticated).
 */
export const fetchUserBuilds = async (token, userId) => {
    const response = await fetch(`${BASE_URL}/builds/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch builds');
    return await response.json();
};

/**
 * Fetches public builds with optional filtering by character and sorting.
 */
export const fetchPublicBuilds = async (character, sortByLikes) => {
    const params = new URLSearchParams();
    if (character) params.append('character', character);
    if (sortByLikes) params.append('sort', 'likes');

    const response = await fetch(`${BASE_URL}/builds/public?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch builds');
    return await response.json();
};

/**
 * Likes a build (once per local user).
 */
export const likeBuild = async (buildId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/builds/${buildId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to like build');
    return await response.json();
};

/**
 * Fetches a public build by ID (for detail view).
 */
export const fetchBuildById = async (buildId) => {
    const response = await fetch(`${BASE_URL}/builds/${buildId}`);
    if (!response.ok) throw new Error('Failed to fetch build');
    return await response.json();
};

/**
 * Makes a build public (shares it).
 */
export const shareBuild = async (token, buildId) => {
    const response = await fetch(`${BASE_URL}/builds/${buildId}/share`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to share build');
    return await response.json();
};
