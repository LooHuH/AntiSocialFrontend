const dataLoaded = (data) => {
    for (const index in data) {
        if (data[index] === null) {
            return false;
        }
        try {
            if (data[index].length === 0) {
                return false;
            }
        }
        catch (error) {}
    }
    return true;
};

export {dataLoaded};