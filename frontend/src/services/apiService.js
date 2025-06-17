// Base URL of the backend API
const BASE_URL = 'http://localhost:3000/api';

/**
 * Logs in a user by sending email and password.
 * Returns a token if successful.
 */
export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // JSON content type
        },
        body: JSON.stringify({ email, password }), // Convert login data to JSON string
    });

    if (!response.ok) {
        const errorData = await response.json(); // Extract error details
        throw new Error(errorData.message || 'Login failed');
    }

    return await response.json(); // Return token and user info
};

/**
 * Fetches a list of all users.
 * Requires a valid token for authorization.
 */
export const fetchUsers = async (token) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication //header, payload, Signature(Secret)
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return await response.json(); // Return array of user objects
};

/**
 * Fetches a single user by ID.
 */
export const fetchUserById = async (token, id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`, //header, payload, Signature(Secret)
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    return await response.json(); // Return user object
};

/**
 * Creates a new user with the given data.
 */
export const createUser = async (token, userData) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, //header, payload, Signature(Secret)
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Creating User failed');
    }

    return await response.json(); // Return the newly created user object
};

/**
 * Updates an existing user by ID.
 * Only includes the password if explicitly provided.
 */
export const updateUser = async (token, id, updatedData) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PUT', // Use PUT to replace the full resource
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, //header, payload, Signature(Secret)
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Updating User failed');
    }

    return await response.json(); // Return updated user object
};

/**
 * Deletes a user by ID.
 */
export const deleteUser = async (token, id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`, //header, payload, Signature(Secret)
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Deleting User failed');
    }

    return await response.json(); // Return deleted user confirmation
};

export const fetchWeapons = async (token) => {
    const response = await fetch(`${BASE_URL}/weapons`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication //header, payload, Signature(Secret)
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return await response.json(); // Return array of user objects
};

// In apiService.js
export const fetchWeaponById = async (token, weaponId) => {
    const response = await fetch(`${BASE_URL}/weapons/${weaponId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weapon');
    }

    return await response.json();
};

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

    return await response.json(); // returns { buildId }
};

export const updateBuild = async (token, buildId, buildData) => {
    const response = await fetch(`${BASE_URL}/builds/${buildId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(buildData),
    });

    if (!response.ok) {
        throw new Error('Failed to update build');
    }

    return await response.json();
};

export const fetchUserBuilds = async (token, userId) => {
    const response = await fetch(`${BASE_URL}/builds/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error('Failed to fetch builds');
    return await response.json();
};


export const fetchAllWeapons = async () => {
    const response = await fetch(`${BASE_URL}/weapons`); // Adjust if needed
    if (!response.ok) throw new Error('Failed to fetch weapons');
    return await response.json();
};

export const fetchPublicBuilds = async (character, sortByLikes) => {
    const params = new URLSearchParams();
    if (character) params.append('character', character);
    if (sortByLikes) params.append('sort', 'likes');

    const response = await fetch(`${BASE_URL}/builds/public?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch builds');
    return await response.json();
};

export const likeBuild = async (buildId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/api/builds/${buildId}/like`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) throw new Error('Failed to like build');
    return await response.json();
};

export const fetchBuildById = async (buildId) => {
    const response = await fetch(`http://localhost:3000/api/builds/${buildId}`);
    if (!response.ok) throw new Error('Failed to fetch build');
    return await response.json();
};

export const shareBuild = async (token, buildId) => {
    const response = await fetch(`http://localhost:3000/api/builds/${buildId}/share`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) throw new Error('Failed to share build');
    return await response.json();
};


export async function register(username, email, password, profilePicture) {
    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, profilePicture }),
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Registration failed');
    }

    return response.json();
}



