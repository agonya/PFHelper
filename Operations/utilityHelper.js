class UtilityHelper {

    /**
     * @name RemoveFromArray
     * 
     * @description Removes item from array. <br>
     * Returns true if item is removed.
     * 
     * @param {array} array - An array that item will be removed from
     * @param {object} item - Item to be removed
     * 
     * @function
     * @author Tunahan Görmüş <tunahangormus@gmail.com>
     */
    removeFromArray(array, item) {
        var index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, index);
            return true;
        } else {
            return false;
        }
    }


}

export default UtilityHelper;