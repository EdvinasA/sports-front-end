
async function getWorkouts() {
        const response = await fetch("https://localhost:7173/api/workout/1");

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data;
}

export { getWorkouts };
