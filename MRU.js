class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class MRUCache {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.maxSize = 4;
        this.cache = {};
    }

    put(key, value) {
        let newNode

        // if the key not present in cache
        if (this.cache[key] === undefined) newNode = new Node(key, value);

        //if we have an empty list
        if (this.size === 0) {
            this.head = newNode;
            this.tail = newNode;
            this.size++;
            this.cache[key] = newNode;
            return this;
        }

        if (this.size === this.maxSize) {
            //remove from cache
            delete this.cache[this.head.key]

            //set new tail
            this.head = this.head.next;
            this.head.prev = null;
            this.size--;
        }

        //add an item to the tail
        let current = this.head
        while(current.next){
            current = current.next
        }
        current.next = newNode
        newNode.prev = current
        this.size++;


        //add to cache
        this.cache[key] = newNode;
        return this;

    }


    get(key) {
        if (!this.cache[key]) {
            return undefined
        }

        let foundNode = this.cache[key];

        if (foundNode === this.head) return foundNode.value;

        let previous = foundNode.prev;
        let next = foundNode.next;

        if (foundNode === this.tail) {
            previous.next = null;
            this.tail = previous;
        } else {
            previous.next = next;
            next.prev = previous;
        }

        this.head.prev = foundNode;
        foundNode.next = this.head;
        foundNode.prev = null;
        this.head = foundNode;
        //console.log(foundNode, "asdasdasdasdas")
        return foundNode.value;
    }

    printcache() {
        let node = this.head;
        while (node) {
            console.log(node.key + "," + node.value);
            node = node.next;
        }
    }
}



let cache = new MRUCache();
cache.put(1, 'A');
cache.put(2, 'B');
cache.put(3, 'C');
cache.put(4, 'D');
cache.put(7, 'D');
cache.put(8, 'D');


console.log(cache.get(3));
//console.log(cache.get(8));
cache.printcache()
