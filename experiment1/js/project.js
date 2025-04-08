// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  // create an instance of the class
  let myInstance = new MyProjectClass("value1", "value2");

  // call a method on the instance
  myInstance.myMethod();

  const fillers = {
    person: ["Friend", "Buddy", "Champion", "Legend", "Star", "Rockstar", "Icon", "Superstar", "Inspiration"],
    action: ["crushed", "nailed", "slayed", "rocked", "smashed", "owned", "dominated", "aced", "killed"],
    compliment: ["amazing", "incredible", "outstanding", "next-level", "mind-blowing", "epic", "fantastic", "unbelievable", "inspiring"],
    reward: ["likes", "hearts", "shares", "followers", "cheers", "kudos", "comments", "high-fives", "support"],
    encouragement: ["give us more of this, please","keep shining", "keep doing your thing","keep it up", "you got this", "don't forget us when you're famous","stay awesome", "never stop", "keep going", "you got this", "keep slaying", "don’t stop now"]
  };
  
  const template = `$person, you absolutely $action it! 
  
  This is truly $compliment, and I’m sure you'll get a lot of $reward. Love it, $encouragement!`;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    box.innerText = story;
  }
  
  /* global clicker */
  clicker.onclick = generate;
  
  generate();
}

// let's get this party started - uncomment me
main();