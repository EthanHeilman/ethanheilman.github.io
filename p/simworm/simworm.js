

function infect(person){
    person.infected = true;
    person.touched = true;
    person.render.fillStyle = 'red';
    infected.push(person);


    if( infected.length > maxinfections ){
        maxinfections = infected.length;
    }

    //person.runworm = setInterval(function(){runLineWorm(person, true);}, 100);
    person.ticks = -1;
    //person.runworm = function(){runLineWorm(person, true)};
    person.runworm = function(){worm(person)};


    ping(person);
};

function disinfect(person){
    person.infected = false;
    person.render.fillStyle = 'green';
    
    person.ticks = null;
    delete infected[person];

}


//Only infect one node at a time
function runLineWorm(person){
    var bootstrap = true;

    person.trigger = INFECTION_LATENCY;
   
    for (var i = 0; i < engine.world.bodies.length; i++) {
        var body = engine.world.bodies[i];

        if (body.isStatic || body.isSleeping || body.infected)
            continue;

        var vectorToBody = {
            x: (person.position.x - body.position.x), 
            y: (person.position.y - body.position.y)
        };

        var mag = Matter.Vector.magnitude(vectorToBody);

        if( mag < INFECTION_RANGE){
                if(bootstrap && bootstrapCounter < 10 ){
                    infect(body);
                    bootstrapCounter+=1;
                    return;
                }           
        }


        if ( person.targetperson == target ){
            if( mag < INFECTION_RANGE){

                var vectorToTarget1 = {
                    x: (target.position.x - body.position.x), 
                    y: (target.position.y - body.position.y)
                };

                var mag1 = Matter.Vector.magnitude(vectorToTarget1);

                var vectorToTarget2 = {
                    x: (target.position.x - person.position.x), 
                    y: (target.position.y - person.position.y)
                };

                var mag2 = Matter.Vector.magnitude(vectorToTarget2);

                // if body is closer to target than we are infect it
                if( mag1 < mag2){
                    infect(body);
                    disinfect(person);
                    break;
                }

                 person.targetperson = null;
            }
        } else {
            if( mag < INFECTION_RANGE){
                person.trigger = GPS_LATENCY;
                person.targetperson = target;
            }
        }


    }
};

function runCompassWorm(person){
    var bootstrap = true;

    person.trigger = INFECTION_LATENCY;

    for (var i = 0; i < engine.world.bodies.length; i++) {
        var body = engine.world.bodies[i];

        if (body.isStatic || body.isSleeping || body.infected)
            continue;

        if( mag < INFECTION_RANGE){
            if(bootstrap && bootstrapCounter < 10 ){
                infect(body);
                bootstrapCounter+=1;
                return;
            }           
        }



        var vectorToBody = {
            x: (person.position.x - body.position.x), 
            y: (person.position.y - body.position.y)
        };

        var mag = Matter.Vector.magnitude(vectorToBody);

        if( mag < INFECTION_RANGE){
            infect(body);
            body.trigger = GPS_LATENCY;
            return;
        }
    }


    if ( person.velocity.x > 0 &&  person.velocity.y > 0 ) {
        if (person.position.x > target.position.x || person.position.y > target.position.y){
             disinfect(person);
         }
    } 

    if ( person.velocity.x > 0 && person.velocity.y < 0 ){
        if (person.position.x > target.position.x || person.position.y < target.position.y){
             disinfect(person);
         }
    }

    if ( person.velocity.x < 0 && person.velocity.y > 0 ){
        if (person.position.x < target.position.x || person.position.y > target.position.y){
             disinfect(person);
         }
    }

    if ( person.velocity.x < 0 && person.velocity.y < 0 ){
        if (person.position.x < target.position.x || person.position.y < target.position.y){
             disinfect(person);
         }
    }    
};

function ping(person){
    var texture = 'ping.png'
    person.render.sprite.texture = texture;

    setTimeout(function(){ unping(person); }, 100);
};

function unping(person){
    person.render.sprite.texture = null;
};


//Infect everything
function runWildfireWorm(person){

    for (var i = 0; i < engine.world.bodies.length; i++) {
        var body = engine.world.bodies[i];

        if (body.isStatic || body.isSleeping || body.infected)
            continue;

        var vector = {
            x: (person.position.x - body.position.x), 
            y: (person.position.y - body.position.y)
        };

        var mag = Matter.Vector.magnitude(vector);

        if( mag < INFECTION_RANGE){
            infect(body);
            return;
        }

    }
};


function addRandomSinks(person){

    person.sinks = [];
    var randomsink = {x: 800*Math.random(), y: 600*Math.random()}
    person.sinks.push( randomsink );

    var randomsink = {x: 800*Math.random(), y: 600*Math.random()}
    person.sinks.push( randomsink );

    var randomsink = {x: 800*Math.random(), y: 600*Math.random()}
    person.sinks.push( randomsink );

    var randomsink = {x: 800*Math.random(), y: 600*Math.random()}
    person.sinks.push( randomsink );

    var randomsink = {x: 800*Math.random(), y: 600*Math.random()}
    person.sinks.push( randomsink );

    var randomsink = {x: 800*Math.random(), y: 600*Math.random()}
    person.sinks.push( randomsink );

};


var buSinks = {};
buSinks[1] = {x: 70, y: 560, edges: [2, 5]};
buSinks[2] = {x: 70, y: 530, edges: [10, 3]};
buSinks[3] = {x: 70, y: 495, edges: [2, 4, 11]};
buSinks[4] = {x: 430, y: 495, edges: [3, 5, 7]};
buSinks[5] = {x: 430, y: 560, edges: [1, 4, 6]};
buSinks[6] = {x: 630, y: 560, edges: [5, 7, 9]};
buSinks[7] = {x: 630, y: 435, edges: [4, 6, 8, 12]};
buSinks[8] = {x: 790, y: 435, edges: [7, 9, 15]};
buSinks[9] = {x: 790, y: 555, edges: [6, 8]};
buSinks[10] = {x: 20, y: 530, edges: [2]};
buSinks[11] = {x: 70, y: 435, edges: [3, 12, 14, 21]};
buSinks[12] = {x: 265, y: 435, edges: [11, 13, 7]};
buSinks[13] = {x: 267, y: 345, edges: [14, 15, 17]};
buSinks[14] = {x: 70, y: 345, edges: [11, 13, 22]};
buSinks[15] = {x: 795, y: 344, edges: [8, 13, 18]};
buSinks[16] = {x: 267, y: 85, edges: [17, 19, 20, 23]};
buSinks[17] = {x: 267, y: 220, edges: [13, 16, 18]};
buSinks[18] = {x: 795, y: 217, edges: [15, 17, 19]};
buSinks[19] = {x: 795, y: 85, edges: [16, 18]};
buSinks[20] = {x: 67, y: 55, edges: [16]};
buSinks[21] = {x: 10, y: 435, edges: [11]};
buSinks[22] = {x: 10, y: 345, edges: [14]};
buSinks[23] = {x: 267, y: 15, edges: [16]};



function createBUPerson(){
    var personsize = 2;

    var sourcenum = Math.round(Math.random()*22+1);
    var source = buSinks[sourcenum];
    //var source = {x: 200, y: 400};

    var person = Bodies.circle(source.x, source.y, personsize, { render: { fillStyle: 'black', strokeStyle: 'white' } } );

    person.friction = 0;
    person.density = 0;

    //person.render.strokeStyle = 'blue',
    person.render.lineWidth = 0;

    //compute sink path
    person.sinks = [];

    var numsinks =  Math.round(Math.random()*10+1);

    //addRandomSinks(person);

    var oldsink = sourcenum;
    for (var i = 0; i < numsinks; i++){

        var edgenum = Math.round(Math.random()*(buSinks[oldsink].edges.length-1));

        var nextsink = buSinks[oldsink].edges[edgenum];
    

        if( nextsink != oldsink ||  buSinks[oldsink].edges.length == 1 ){
                    person.sinks.push(buSinks[nextsink]);
                    var oldsink = nextsink;

        } else {
            i--;
        }
    }
 
    person.walkingspeed = 0.0000001+Math.random()*0.000001*0.2;
    //person.walkingspeed = 0.0000000847; //Approx 0.200 pixels per tick
    return person;
}

function createPerson(){
    var personsize = 2;
    var randomsource = {x: 800*Math.random(), y: 600*Math.random()}

    var person = Bodies.circle(randomsource.x, randomsource.y, personsize, { render: { fillStyle: 'black', strokeStyle: 'white' } } );

    person.friction = 0;
    person.density = 0;

    //person.render.strokeStyle = 'blue',
    person.render.lineWidth = 0;

    addRandomSinks(person);

    person.walkingspeed = 0.0000001+Math.random()*0.000001*0.2;
    //person.walkingspeed = 0.0000000847; //Approx 0.200 pixels per tick
    return person;
}

var target;
function createTargets(){
    var texture = 'target.png'

    var randomsource = {x: 800*Math.random(), y: 600*Math.random()};

    target = Bodies.circle(randomsource.x, randomsource.y, 1, { isStatic: true, render: { sprite: { texture: texture } }  });
    target.target = true;

    //target.render.fillStyle = 'blue';
    //target.render.strokeStyle = 'blue';

    return [target];
}

function createBUTargets(){
    var texture = 'target.png'

    var source = {x: 120, y: 335};

    target = Bodies.circle(source.x, source.y, 1, { isStatic: true, render: { sprite: { texture: texture } }  });
    target.target = true;

    return [target];
}


function createBuildings(){

    var buildings = [];

    //var building1 = Bodies.rectangle(300, 300, 10, 10, { isStatic: true });

    //buildings.push(building1);

    // var building2 = Bodies.rectangle(400, 300, 30, 30, { isStatic: true, chamfer: true });

    // buildings.push(building2);

    //var building3 = Bodies.rectangle(500, 300, 10, 10, { isStatic: true });

    //buildings.push(building3);

    return buildings;
    //return [];

};


function createBUBuildings(){
    var buildings = [];


    var eng = Bodies.rectangle( (50*0.6), (900+52)*0.6, 100*0.6, 104*0.6, { isStatic: true });
    buildings.push(eng);



    var cookies = Bodies.rectangle( (50*0.6), (800)*0.6, 100*0.6, 134*0.6, { isStatic: true });
    buildings.push(cookies);

    var psy = Bodies.rectangle( (130+590)*0.6, (990)*0.6, 1180*0.6, 90*0.6, { isStatic: true });
    buildings.push(psy);

    var jamba =  Bodies.rectangle( (130+570/2)*0.6, (895-120)*0.6, 570*0.6, 80*0.6, { isStatic: true });
    buildings.push(jamba);

    var mcs = Bodies.rectangle( (130+570/2)*0.6, (990-115)*0.6, 570*0.6, 80*0.6, { isStatic: true });
    buildings.push(mcs);

    var road1a = Bodies.rectangle( (30)*0.6, (587)*0.6, 120*0.6, 10*0.6, { isStatic: true });
    road1a.render.visible = false; 
    buildings.push(road1a);

    var road1b = Bodies.rectangle( (30)*0.6, (707)*0.6, 120*0.6, 10*0.6, { isStatic: true });
    road1b.render.visible = false; 
    buildings.push(road1b);

    var tracks1 = "tracks1.png";
    var train1 = Bodies.rectangle( (40)*0.6, (650)*0.6, 120*0.6, 70*0.6,  { isStatic: true, render: { sprite: { texture: tracks1 } }  });
    buildings.push(train1);

    var tracks2 = "tracks2.png";
    var train2 = Bodies.rectangle( (130+300/2)*0.6, (650)*0.6, 300*0.6, 70*0.6,  { isStatic: true, render: { sprite: { texture: tracks2 } }  });
    //train2.render.visible = false; 
    buildings.push(train2);

    var road2a = Bodies.rectangle( (280)*0.6, (587)*0.6, 220*0.6, 10*0.6, { isStatic: true });
    road2a.render.visible = false; 
    buildings.push(road2a);

    var road2b = Bodies.rectangle( (280)*0.6, (707)*0.6, 220*0.6, 10*0.6, { isStatic: true });
    road2b.render.visible = false; 
    buildings.push(road2b);

    var tracks3 = "tracks3.png";
    var train3 = Bodies.rectangle( (600+570/2)*0.6, (650)*0.6, 820*0.6, 70*0.6, { isStatic: true, render: { sprite: { texture: tracks3 } }  });
    buildings.push(train3);

    var road3a = Bodies.rectangle( (890)*0.6, (587)*0.6, 700*0.6, 10*0.6, { isStatic: true, });
    road3a.render.visible = false; 
    buildings.push(road3a);

    var road3b = Bodies.rectangle( (890)*0.6, (707)*0.6, 700*0.6, 10*0.6, { isStatic: true });
    road3b.render.visible = false; 
    buildings.push(road3b);

    var road3c = Bodies.rectangle( (892)*0.6, (360)*0.6, 700*0.6, 2*0.6, { isStatic: true });
    road3c.render.visible = false; 
    buildings.push(road3c);

    var road3d = Bodies.rectangle( (892)*0.6, (140)*0.6, 700*0.6, 2*0.6, { isStatic: true });
    road3d.render.visible = false; 
    buildings.push(road3d);


    var lib = Bodies.rectangle( (610+570/2)*0.6, (475)*0.6, 840*0.6, 170*0.6, { isStatic: true });
    buildings.push(lib);

    var stone = Bodies.rectangle( (5)*0.6, (364)*0.6, 830*0.6, 400*0.6, { isStatic: true });
    buildings.push(stone);

    var vertroad1a = Bodies.rectangle( (450)*0.6, (260)*0.6, 10*0.6, 150*0.6, { isStatic: true});
    //buildings.push(vertroad1a);


    var vertroad1b = Bodies.rectangle( (450)*0.6, (475)*0.6, 10*0.6, 140*0.6, { isStatic: true });
    //buildings.push(vertroad1b);


    var vertroad2 = Bodies.rectangle( (450)*0.6, (064)*0.6, 10*0.6, 100*0.6, { isStatic: true });
    //buildings.push(vertroad2);

    var castle = Bodies.rectangle( (350)*0.6, (20)*0.6, 150*0.6, 200*0.6, { isStatic: true });
    buildings.push(castle);

    var buildings1 = Bodies.rectangle( (610+570/2)*0.6, (20)*0.6, 840*0.6, 200*0.6, { isStatic: true });
    buildings.push(buildings1);

    var buildings2 = Bodies.rectangle( (610+570/2)*0.6, (250)*0.6, 840*0.6, 170*0.6, { isStatic: true });
    buildings.push(buildings2);


    var comm = Bodies.rectangle( (130+570+300/2+30)*0.6, (990-100)*0.6, 300*0.6, 45*0.6, { isStatic: true });
    buildings.push(comm);

    var morse1 = Bodies.rectangle( (435+570+300/2+30 )*0.6, (990-170)*0.6, 240*0.6, 180*0.6, { isStatic: true });
    buildings.push(morse1);

    var sblogo = "sb.jpg"
    var sb = Bodies.rectangle( (630*0.6), (720+52)*0.6, 0, 0, { isStatic: true, render: { sprite: { texture: sblogo } }  });
    buildings.push(sb);

    return buildings;


};

function updateForces(body){
    if (body.isStatic || body.isSleeping)
        return;



    if( body.sinks ) {
        var indirection = {x : 0.5 - Math.random(), y: 0.5 - Math.random()};
        var sink = body.sinks[0];

        var dir = {
            x: (sink.x - body.position.x + 3*indirection.x), 
            y: (sink.y - body.position.y + 3*indirection.y) }

        var mag = Matter.Vector.magnitude(dir);

        body.force.x +=  dir.x/mag * body.walkingspeed;
        body.force.y +=  dir.y/mag * body.walkingspeed;
    } 

}


function createPeople(howMany){
    var people = []

    for (var i = 0; i < howMany; i++) { 
        //var person = createPerson();
        var person = createPersonSwitch();
        if (i == howMany-1) infect(person); //infect the first person we create
        people.push(person);
    }

    return people;
};

var container = document.getElementById('canvas-container');

function reset(){
    World.remove(engine.world, engine.world.bodies);

    //create initial people
    infected = [];
    maxinfections = 0;

    bootstrapCounter = 0;

    people = createPeople(200);

    var objects = [];
    objects = objects.concat(people);
    objects = objects.concat(createBuildingSwitch()); 
    objects = objects.concat(targetSwitch());

    // add all of the bodies to the world
    World.add(engine.world, objects);

    totalticks = 0;
    finished = false;


}


//inital conditions
INFECTION_RANGE = 30*0.6; //30 feet assuming class 2 devices http://www.bluair.pl/bluetooth-range
INFECTION_LATENCY = 15*10;
GPS_LATENCY = 30*15;

// Matter.js module aliases
Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies;



var options = {
    positionIterations: 6,
    velocityIterations: 4,
    enableSleeping: false
};

// create a Matter.js engine
engine = Engine.create(container, options);


var test = false;
var testruns = 0;
var testdata = []
var failures = 0;
function done(maxinfections, touched, totalticks, success){
    //console.debug("game over!", maxinfections, touched, totalticks);

    if (test && testruns < 10){
        console.debug(testruns);
        testdata.push([maxinfections, touched, totalticks]);
        reset();

        testruns+=1;
        //init(createPersonSwitch, createBuildingSwitch, targetSwitch, wormSwitch);
        console.debug( maxinfections, touched, totalticks);
    }

    if (!success) failures+=1;

    if (testruns == 10){
        var avgmaxinfections = 0;
        var avgtouched = 0; 
        var avgtotalticks =0;

        for (var d = 0; d< testdata.length; d++){
            var datum = testdata[d];

            avgmaxinfections += datum[0];
            avgtouched += datum[1];
            avgtotalticks += datum[2];
        }

        avgmaxinfections = avgmaxinfections/testdata.length;
        avgtouched = avgtouched/testdata.length;
        avgtotalticks = avgtotalticks/testdata.length;

        console.debug( avgmaxinfections, avgtouched, avgtotalticks, failures);
    }
};

function runtests(){

    test = true;
}


function init(createPersonFunct, createBuildingFunct, targetFunct, wormFunct){

    worm = wormFunct;

    //globals! I should probably just have one global game object and manage that but that sounds like more work.
    createPersonSwitch = createPersonFunct;
    createBuildingSwitch = createBuildingFunct;
    targetSwitch = targetFunct;
    wormSwitch = wormFunct;

    //create initial people
    infected = [];
    maxinfections = 0;

    bootstrapCounter = 0;

    people = createPeople(100);

    var objects = [];
    objects = objects.concat(people);
    objects = objects.concat(createBuildingSwitch()); 
    objects = objects.concat(targetSwitch());

    // add all of the bodies to the world
    World.add(engine.world, objects);

    //turn off gravity
    engine.world.gravity.y = 0;

    totalticks = 0;

    finished = false;

    Matter.Events.on(engine, 'afterUpdate', function() {

        if (finished){
            return;
        }

        totalticks+=1;

        var toRemove = []

        for (var i = 0; i < engine.world.bodies.length; i++) {
            var body = engine.world.bodies[i];
            updateForces(body);

            if (body.target){
                for (var j = 0; j < infected.length; j++){
                    var person = infected[j];
                    var vector = {
                        x: (person.position.x - body.position.x), 
                        y: (person.position.y - body.position.y)
                    };

                    var mag = Matter.Vector.magnitude(vector);

                    if( mag < INFECTION_RANGE){
                        var touched = 0;
                        for (var q = 0; q < engine.world.bodies.length; q++) {
                            if (engine.world.bodies[q].touched){
                                touched+=1;
                            }
                        }
                        finished = true;
                        done(maxinfections, touched, totalticks, true);

                        
                    }
                }
            } 

            if (body.infected){
                if ( (body.trigger && body.ticks > body.trigger) ||  (!body.trigger && body.ticks > INFECTION_LATENCY) ){
                    body.runworm();
                    body.ticks = 0;
                } else {
                    body.ticks += 1;
                }

                //body.ticks += 1;
            }


            if( body.sinks ) {
                var sink = body.sinks[0];

                var vector = {
                    x: (sink.x - body.position.x), 
                    y: (sink.y - body.position.y)
                };

                var mag = Matter.Vector.magnitude(vector);


                if (mag < 20) {

                    body.sinks.shift();
                    if (body.sinks.length == 0){
                        toRemove.push(body);
                        if (body.infected){
                            delete infected[infected];
                        }
                    } 

                } 

            }
        }

        World.remove(engine.world, toRemove);

        for (var i = 0; i < toRemove.length; i++){
            var person = createPersonSwitch();
            World.add(engine.world, person);

            person.render.fillStyle = 'black';
            person.render.strokeStyle = 'white';
        }
        //console.debug(infected.length );
        if (infected.length == 0){
            console.debug("failed!!");
            finished = true;
            done(maxinfections, touched, totalticks, false);

        }

    });


    // run the engine
    engine.render.options.wireframes = false;
    Engine.run(engine);
};
