class Rover {
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message){
      let returnObject = {};
      let result = [];
      let arr = message.commands;
      returnObject["message"] = message.name;
      
      for (let i=0; i < arr.length; i++){
         if (arr[i].commandType === "MOVE")
            result.push(this.move(arr[i].value));
         else if (arr[i].commandType === "STATUS_CHECK") {
            result.push(this.statusCheck());}
         else if (arr[i].commandType === "MODE_CHANGE"){
            result.push(this.modeChange());
         }
      }
      returnObject.results = result;
      return returnObject;
   }

   move(newPos){
      let returnObject = {};
      if (this.mode === "NORMAL"){
         this.position = newPos;
         returnObject["completed"] = true;
         return returnObject;
      }
      else {
         returnObject["completed"] = false;
         return returnObject;
         }
      }
   statusCheck(){
      let returnObject = {};
      let status = {};
      returnObject["completed"] = true;
      status["mode"] = this.mode;
      status["generatorWatts"] = this.generatorWatts;
      status["position"] = this.position;
      returnObject.roverStatus = status;
      return returnObject;
   }
   modeChange(){
      let returnObject = {};
      if (this.mode === "NORMAL"){
         this.mode = "LOW_POWER"
         returnObject["completed"] = true;
         return returnObject;
      }
      else if (this.mode === "LOW_POWER"){
         this.mode = "NORMAL";
         returnObject["completed"] = true;
         return returnObject;
      }
      else {
         returnObject["completed"] = false;
         return returnObject;
      }
   }

}

module.exports = Rover;