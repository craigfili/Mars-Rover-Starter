class Message {
   constructor(name, commands){
      //if (typeOf (name) !== 'string'){
      this.name = name;
      if (!name||typeof(name) !== 'string'){
         throw Error("Name required.");
      }
      this.commands = commands;
   }
}

module.exports = Message;