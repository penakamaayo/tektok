function Node(value){
    this.value = value;
    this.next = null;
}

function List(){
    this.head = null; //first node
    this.tail = null; //last node
    this.size = 0;
}

List.prototype.add = function(value){
    this.node = new Node(value);
    
    if (this.isEmpty()){
        this.head = this.node;
        this.tail = this.node;
    }
    else {
        this.tail.next = this.node;
        this.tail = this.node;
    }
    this.size++; 
}

List.prototype.insertAt = function(position,value){
    //check if index is within range    
    if (!this.isValidIndex(position)) {
        alert("not in range");
        return;
    }
       
    var current = this.head,
        previous = null;
    
    for (var i = 0, n = this.getSize(); i <= n; i++){
        if (position === i){
          var node = new Node(value);
          
          previous ? (previous.next = node) : (this.head = node);  
          node.next = current;
            
          break;
        }
        
        previous = current;
        current = current.next;
    }
    
    this.size++;   
}

List.prototype.deleteAt = function(position){
    if (!this.isValidIndex(position)) {
        alert("not in range");
        return;
    }
    
    var current = this.head,
        previous = this.head;
    
    for (var i = 0, n = this.getSize(); i < n; i++){
        if (position === i){
            if (current === this.head){ this.head = current.next }
            else if (current === this.tail){ this.tail = previous; }
            
            previous.next = current.next;
            break;
        }
        previous = current;
        current = current.next;
    }
   
    this.size--;
}

List.prototype.isEmpty = function(){
    return this.head === null;
}

List.prototype.getSize = function(){
    return this.size;
}

List.prototype.printList = function(){
    var current = this.head;
    
    var result = '';
    while (current !== null) {
        result += current.value + " ";
        current = current.next;
    }
    alert("list: " + result);
}


List.prototype.isValidIndex = function(index){
    var list_length = this.getSize();
    return index >= 0 && index <= list_length;
}

var l = new List();

l.add('first');
l.add('second');
l.deleteAt(0);
l.add('third');
l.printList();


