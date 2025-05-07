const userDataStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
}