class Node {
  constructor(groupSize, next = null) {
    this.groupSize = groupSize;
    this.next = next;
  }
}

class Queue {
  constructor(limit = 25) {
    this.front = null;
    this.back = null;
    this.length = 0;
    this.waitingTime = 0;
    this.limit = limit;
  }

  isFull = () => this.length === this.limit;

  isEmpty = () => this.length === 0;

  peek = () =>
    this.isEmpty()
      ? `You're up, you don't need to wait!`
      : `sorry, you need to wait for ${this.waitingTime} min`;

  creatNewNode = (groupSize) => {
    const newNode = new Node(groupSize);
    if (this.isEmpty()) this.front = newNode;
    else this.back.next = newNode;

    this.back = newNode;
    this.length++;
    this.waitingTime += (groupSize * 30) / 60;
  };
  enqueue = (groupSize) => {
    if (this.isFull()) {
      console.log(
        `The queue if full, you need to wait for ${this.waitingTime} min`
      );
    } else {
      let numofPeople = groupSize;
      while (numofPeople > 12) {
        this.creatNewNode(12);
        numofPeople -= 12;
      }
      this.creatNewNode(numofPeople);
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      console.log("Queue is empty");
    } else {
      const removed = this.front;
      if (this.length === 1) {
        this.front = null;
        this.back = null;
      } else {
        this.front = removed.next;
      }
      this.length--;
      this.waitingTime -= removed.groupSize * 0.5;
      return removed.groupSize;
    }
  };
}

const ride = new Queue(25);
console.log(ride.peek());
ride.enqueue("5");
console.log(ride.peek());
ride.enqueue("10");
console.log(ride.peek());
ride.enqueue("25");
console.log(ride.peek());
ride.enqueue("30");
console.log(ride.peek());

console.log(ride.dequeue());
console.log(ride.peek());

ride.enqueue(ride.front.next.groupSize);
console.log(ride.peek());

// if (group <= 12)
// const newNode = new Node (data) ;
// else
// newgroup1 = group / 2;
// newgroup2= data - (group/2);
// if newgroup2 > 12 ?
// const  newNode = new Node(newgroup1);
// // const  newNode = new Node(newgroup2
// waitingTime= (30*group.length) /60;
