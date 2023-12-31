var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    function sawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = 400;
      sawBladeHitZone.y = 284;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      obstacleImage.y = -25
      obstacleImage.x = -25
      sawBladeHitZone.addChild(obstacleImage);
    }
      var enemy = game.createGameItem("enemy", 25)
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = 400;
      enemy.y = groundY - 50;
      game.addGameItem(enemy);
      enemy.velocityX = -1
      enemy.rotationalVelocity = 100
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10);
        
        enemy.shrink();
        shrink(enemy)
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.shrink();
      }
      function createEnemy(x, y) {
      createEnemy(400, groundY - 10)
    }
    function createReward(x, y) {
    var enemy = game.createGameItem("reward", 25)
      var redSquare = draw.rect(50, 50, "blue");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = groundY - y;
      game.addGameItem(enemy);
      enemy.velocityX = -1
      enemy.rotationalVelocity = 100
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(100);
        
        enemy.shrink();
    
      };
      enemy.onProjectileCollision = function () {
        game.changeIntegrity(100);
        game.increaseScore(100);
        enemy.shrink();
      }
    }
    createReward(700, groundY - 300)
   
    function createMarker(x, y) {
      var marker = game.createGameItem("marker", 25)
        var greenSquare = draw.rect(50, 50, "green");
        greenSquare.x = -25;
        greenSquare.y = -25;
        marker.addChild(greenSquare);
        marker.x = x;
        marker.y = y;
        game.addGameItem(marker);
        marker.velocityX = -1
        marker.rotationalVelocity = 100
        marker.onPlayerCollision = function () {
          game.changeIntegrity(100);
          
          marker.shrink();
        };
        marker.onProjectileCollision = startLevel();
      }
      createMarker(1200, groundY - 10);

    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]
      var levelObjects = level.gameItems 
      for(var i = 0; i < levelObjects.length; i++){
        if (levelObjects[i].type === "sawblade"){
          createSawBlade((levelObjects[i].x), (levelObjects[i].y))
        } 
        else if (levelObjects[i].type === "enemy"){
          createEnemy((levelObjects[i].x), (levelObjects[i].y))
        }
        else if (levelObjects[i].type === "reward"){
          createReward((levelObjects[i].x), (levelObjects[i].y))
        }
        else if (levelObjects[i].type === "marker"){
          createMarker((levelObjects[i].x), (levelObjects[i].y))
        }
      }


      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };                              
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
