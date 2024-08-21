const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(689);

    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    let rover = new Rover(689);
    let command1 = new Command("MOVE", 728);
    let command2 = new Command("MODE_CHANGE");
    let command3 = new Command("STATUS_CHECK");
    let commands = [command1, command2, command3];
    let message = new Message("Test message 8", commands);
    expect(rover.receiveMessage(message).message).toBe("Test message 8");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(689);
    let command1 = new Command("MOVE", 728);
    let command2 = new Command("STATUS_CHECK");
    let commands = [command1, command2];
    let message = new Message("Test message 9", commands);
    expect(rover.receiveMessage(message).results.length).toBe(2);
  });

  it("responds correctly to the status check command", function() {
    let rover = new Rover(689);
    let command1 = new Command("STATUS_CHECK");
    let commands = [command1];
    let message = new Message("Test message 10", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus).toEqual(expect.objectContaining({mode: "NORMAL"}));
    expect(response.results[0].roverStatus).toEqual(expect.objectContaining({generatorWatts: 110}));
    expect(response.results[0].roverStatus).toEqual(expect.objectContaining({position: 689}));
  });

  it("responds correctly to the mode change command", function() {
    let rover = new Rover(689);
    let command1 = new Command("MODE_CHANGE");
    let command2 = new Command("STATUS_CHECK");
    let commands = [command1, command2];
    let message = new Message("Test message 11", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.mode).toBe("LOW_POWER");
    response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.mode).toBe("NORMAL");
  });

  it("responds correctly to the mode change command", function() {
    let rover = new Rover(689);
    let command1 = new Command("MODE_CHANGE");
    let command2 = new Command("MOVE", 728);
    let command3 = new Command("STATUS_CHECK");
    let commands = [command1, command2, command3];
    let message = new Message("Test message 12", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBe(false);
    expect(response.results[2].roverStatus.mode).toBe("LOW_POWER");
    expect(response.results[2].roverStatus.position).toBe(689);
    
  });

  it("responds correctly to the mode change command", function() {
    let rover = new Rover(689);
    let command1 = new Command("MOVE", 728);
    let command2 = new Command("STATUS_CHECK");
    let commands = [command1, command2];
    let message = new Message("Test message 13", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.position).toBe(728);
    
  });





});
