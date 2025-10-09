// REF: https://usehooks.com/uselocalstorage

// useState to add a state to an Object, useEffect to allow for saving
import { useEffect, useState } from "react";

// useLocalStorage is defined and exported, syncs a variable with the local storage
export default function useLocalStorage(key, initialValue) {
	// State to read from local storage
	const [value, setValue] = useState(() => {
		try {
			// Grabs saved data from localStorage
			const raw = localStorage.getItem(key);
			// Data is converted to JSON
			if (raw != null) return JSON.parse(raw);
		} catch (err) {
			// If execution fails, throw a warning
			console.warn("Failed to read localStorage, using initialValue:", err);
		}
	
		// REF: https://medium.com/@VinitKumarGupta/react-best-practices-implementing-lazy-initialization-with-usestate-c8405059191e
	
		// If nothing is stored, use the default value
		// We had to have two returns incase the inital value is using lazy initalization or manual initalization
		if (typeof initialValue === "function") {
			// Calls the inital value ONLY if its a function (lazy initalization)
			return initialValue();
			}
		// Otherwise, simply return the value
		return initialValue;
	});

	// Runs whenever the key or value changes
	useEffect(() => {
		// Current value is saved to localStorage
		localStorage.setItem(key, JSON.stringify(value));
    // Runs again whenever "key" or "value" changes
    }, [key, value]);

	// Returns the value and function so it's updated
	return [value, setValue];
}
