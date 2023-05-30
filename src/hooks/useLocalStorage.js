export const useLocalStorage = (itemName) => {
    function saveItem(user) {
        sessionStorage.setItem(itemName, JSON.stringify(user));
    }

    function getItem() {
        const user = sessionStorage.getItem(itemName);
        const userToken = JSON.parse(user);
        console.log(userToken);
        return userToken;
    }

    function deleteItem() {
        sessionStorage.removeItem(itemName);
    }

    return {
        saveItem,
        getItem,
        deleteItem
    }
}