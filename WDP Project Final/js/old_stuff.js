/**
 * Created by cchet on 2/7/2015.
 */

/**
 * This object specifies a map entry object.
 * @param key the key identifying a instance
 * @param value the value mapped to the key
 * @constructor (key, value)
 */
MapEntry = function (key, value) {
    this.key = key;
    this.value = value;
}
    ,
/**
 * This class specifies the map container which provides the opportunity
 * to map key to values and store them in the map container.
 * @constructor ()
 */
    Map = function () {
        /* #################################### */
        /* private members                      */
        /* #################################### */
        var
            entries = {};

        /* #################################### */
        /* private functions                    */
        /* #################################### */
        var
            findEntry = function (key) {
                var foundEntry = null;
                var foundIdx = -1;
                $.each(entries, function (idx, entry) {
                    foundEntry = (entry.key === key) ? entry : null;
                    foundIdx = (foundEntry != null) ? idx : -1;
                    return foundEntry == null;
                });
                if (foundEntry == null) {
                    return null;
                } else {
                    return {
                        idx: foundIdx,
                        entry: foundEntry
                    }
                }
            }

        this.get = function (key) {
            var entry = findEntry(key);
            if (entry == null) {
                return null;
            } else {
                return entry.entry;
            }
        }

        this.put = function (mapEntry) {
            if (!(mapEntry instanceof MapEntry)) {
                errorHandler.handle(Error.MAP_ENTRY_INVALID_TYPE);
                return;
            }
            var entry = findEntry(mapEntry.key);
            /* map entry not present */
            if (entry == null) {
                entries.push(mapEntry);
            }
            /* replace existing one */
            else {
                entries.splice(entry.idx, 1, entry.entry);
            }
        }

        this.replace = function (oldKey, newEntries) {
            var foundEntry = findEntry(oldKey);
            if (foundEntry != null) {
                entries.splice(foundEntry.idx, 1, newEntries);
                return foundEntry.entry;
            } else {
                return null;
            }
        }

        this.remove = function (key) {
            var entry = findEntry(key);
            /* map entry not present */
            if (entry == null) {
                errorHandler.handle(Error.MAP_KEY_NOT_FOUND);
                return null;
            }
            entries.splice(entry.idx, 1);
            return entry.entry;
        }

        this.size = function () {
            return entries.length;
        }
    }