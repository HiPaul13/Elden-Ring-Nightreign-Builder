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

export const fetchAllWeapons = async () => {
    const response = await fetch(`${BASE_URL}/weapons`); // Adjust if needed
    if (!response.ok) throw new Error('Failed to fetch weapons');
    return await response.json();
};



