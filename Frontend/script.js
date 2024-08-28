const BASE_URL = "http://localhost:8080";
var ID = getID();
var currentLevel = 0;
var dot_position = [0,3,6,2,2,8,2,5,7]




document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('start').addEventListener('click', doStart); 
        document.getElementById('submit').addEventListener('click', doSubmit); 
        document.getElementById('gohome').addEventListener('click', doGoHome);
        document.getElementById('gohome2').addEventListener('click', doGoHome);  
    
   
});


var questions = [
    {
        level: "Culture",
        topQuestion: "Do you have a collaborative culture (e.g. big but not specific/highly detailed goals with no fixed delivery dates)?",
        extraQuestions:[
            "Project managers coordinate between all the different teams working on the same project, and the teams have highly specialised responsibilities.",
            "Our development teams focus on achieving small, defined objectives quickly and then moving immediately to the next one",
            "A lot of up-front planning goes into documenting each step of a project before it even begins.",
            "Each team contain a mix of members whose different areas of expertise cover the full spectrum of skills needed for crafting a releasable increment."       
        ],
        answers: [false, false, false, false, false]
    },
    {
        level: "Product/Service Design",
        topQuestion: " Is your product and design data driven (that is they are rapidly prototyped, deployed and evaluated based on real customer usage before deciding on further development or retirement)",
        extraQuestions:[
            "We have product roadmaps spanning months or even years into the future. Our releases typically happen every six months to one year, sometimes even longer.",
            "There is pressure to deliver features, fast, and releases happen on a regular planned basis. (For example, 'We'll Feature X in two months, Feature Y in four months and Feature Z in six months'—with no deviation from the schedule).",
            "We release large sets of related features all at once as comprehensive updates.",
            "Our releases are usually small-scale iterative changes to existing features/services"      
        ],
        answers: [false, false, false, false, false]
    },
    {
        level: "Team",
        topQuestion: " Are teams Devops teams that is self contained teams responsible for all development and deployment to production and production is monitored by SRE teams?",
        extraQuestions:[
            "All decisions are made by managers, and teams must seek permission before changing any part of the project plan, no matter how small",
            "Applications are developed as several large components, with one team per component fully and vertically responsible for the build.",
            "We have separate teams of specialists to handle different areas: design, architecture, security, testing, etc. When our team's piece of a project is finished, we hand it off to    the next team",
            "Our teams are mixed: We have developers, QA/testing, someone with server experience, etc. all in one group. We don't talk to other teams very much since our teams are meant to be self-sufficient and independent."
                  
        ],
        answers: [false, false, false, false, false]
    },
    {
        level: "Process",
        topQuestion: " Do you use research and experimentation techniques for large and complex problems - using lots of proof of concepts to compare options, using Kanban to clarify the project then Agile methods like Scrum once problem is well understood?",
        extraQuestions:[
            "We do all our planning up front, and then hand off to teams for execution. Managers handle the collaboration and communication between our teams. ",
            "A team will work on one small, defined project and deliver it in two to four weeks. If a new feature request comes in the middle of a delivery cycle, we may or may not be able to add it in.",
            "If a new feature request comes in the middle of a delivery cycle, we have to wait for the next cycle to plan for and incorporate it.",
            "If we can't coordinate or fix an issue on the last day or two of a production cycle, we can't ship—so when a bug or some other problem pops up it's hard to do anything more than a quick fix. (Following up to address an issue in more depth requires a dedicated sprint so we can focus on it)"       
        ],
        answers: [false, false, false, false, false]
    },
    {
        level: "Architecture",
        topQuestion: "Do you have a microprocessor architecture built from independently deployable services?",
        extraQuestions:[
            "Our system is very big. Few people understand the whole thing. We fear the domino effect: If you change something, you have to be very careful because it could break something else.",
            "Our application(s) is(are) divided into components, probably no more than five or six, communicating through networking.",
            "When we deliver, everything is delivered together, all ready on the same day and at a uniformly high level of quality.",
            "The scope of an app in development is defined by the deployment schedule. Each feature or piece of functionality is broken down into deliverable chunks that fit into the schedule."   
        ],
        answers: [false, false, false, false, false],
    },
    {
        level: "Maintenance",
        topQuestion: "Does your system collect metrics, alerts tracing and logging to provide a view of the running system and try to keep itself alive through self healing if things begin to deteriorate?",
        extraQuestions:[
            "We have some simple automation, like scripts, for alerting large-scale issues and outages in the field. We find out about many smaller problems from user reports.",
            "Our systems have full and continuous monitoring, and our Ops team spends lots of time checking on alerts. A lot of time, our system alerts turn out to be nothing.",
            "When problems arise, we have to open each server to understand what happened because we don't have central logs or tracing. Then we fix it manually: someone from Operations logs into a production server and follows a preset procedure.",
            "Some of our system update processes are fully automated and patches can be applied quickly—but a human still has to initialise the process. " 
        ],
        answers: [false, false, false, false, false],
    },
    {
        level: "Delivery",
        topQuestion: "Do you deliver multiple times a day your releasable software?",
        extraQuestions:[
            "We do 'big bang' releases that roll lots of changes into one new version, every six to 12 months. A lot of up-front planning goes into our next release before any actual development begins.",
            "Our delivery process includes some test automation and automated build, but outside of final integration. In an emergency, we can make manual updates to the production codebase.", 
            "We don't like to make changes to our production code, even emergency ones, because there are so many dependencies. Change is risky. Once we release a software version all changes have to wait for the next version roll out.",
            "New functionality requests typically can be accommodated within a few weeks, if they are urgent."  
        ],
        answers: [false, false, false, false, false]
    },
    {
        level: "Provisioning",
        topQuestion: "Do you run on Kubernetes?",
        extraQuestions:[
            "Operations team is in charge of provisioning, period. You have to write a ticket to provision a machine—engineers can't self-service.",
            "A machine can be provisioned (possibly even autoprovisioned) in hours, or maybe a day or two, and the process is fully automated by Ops.",
            "Developers write applications, and specify what they will need to run successfully in production (OS, libraries, dependent tools). The Ops team manually configures the production machines to meet the machine dependencies the Dev team specified.",
            "Provisioning is a mix of automation and manual work. Any task taking longer than a week to provision to VM breaks the production cycle, so is a nonstarter."     
        ],
        answers: [false, false, false, false, false]
    },
    {
        level: "Infrastructure",
        topQuestion: "Do you deploy your software in containers?",
        extraQuestions:[
            "We have multiple physical servers in our own private data center (either on premises or co-located). If one of our servers goes down, we have to manually provision its replacement.",
            "We don't use physical servers—we have VMs. We also have some instances in the cloud, which we manage manually.",
            "A data centre failure is just about the worst disaster we can imagine.",
            "Provisioning infrastructure is a mix of automation and manual work, so a new VM can take a couple of days to set up."
        ],
        answers: [false, false, false, false, false]
    }
]



function doSubmit(){
    //First yes or no
    //If yes go to next section
    //If no output more questions
    //submit questions then go to next section
    //repeat until no more questions
    //On final submit go back to homepage... for now

    
    if(currentLevel <= (questions.length-2)){
        if(document.getElementsByClassName("form-control")[1].style.display == 'none'){
            const yes = document.getElementById("yes-0");
            const no = document.getElementById("no-0");
            
            if (yes.checked){
                //post question answers and get back the position of the dot...
                //go to next section of questions
                collectAnswers();
                postAnswers();
                currentLevel++;
                refreshPage();
                nextQuestions();
                
            }
            else if(no.checked){
                //generate the rest of the questions for the session
                showSecondaryQuestions();   
            }
        }
        else{
            collectAnswers();
            postAnswers();
            currentLevel++;
            refreshPage();
            nextQuestions();
        }
    }
    else{
        //What to do on final submit
        if(document.getElementsByClassName("form-control")[1].style.display == 'none'){            
            const yes = document.getElementById("yes-0");
            const no = document.getElementById("no-0");
            if (yes.checked){
                //post question answers and get back the position of the dot...
                //go home
                collectAnswers();
                postAnswers();
                finalSubmitDisplayAnswers();
                displayMatrix();
                
            }
            else if(no.checked){
                //generate the rest of the questions for the session
                showSecondaryQuestions();   
            }
        }
        else{
            collectAnswers();
            postAnswers();
            finalSubmitDisplayAnswers();
            displayMatrix();
        }
    }
}

async function postAnswers() {
    const url = BASE_URL + "/matrix-tool/submit";
    const data = {id: ID, questionNumber: currentLevel+1, questionAnswers: questions[currentLevel]["answers"]};
    
    try {
        const response = await fetch(url, {
            method: "POST", 
            mode: "cors",
            headers: {"Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:8080"},
            body: JSON.stringify(data),
          });
        const result = await response.json();
        dot_position[currentLevel] = result["value"];
        
               
        
    } catch (error) {
        console.log("Error in postAnswers():"+ error);
    }
    
  }
  
  function collectAnswers(){
    let g = document.querySelectorAll('input[type="radio"]');
        for(let i = 0; i<5; i++){
            questions[currentLevel]["answers"][i] = g[2*i].checked;
        }
  }
 


function doStart(){
    document.getElementById('Homepage').style.display='none';
    document.getElementById('withoutmatrix').style.display='block';
    //getID();
}

async function getID() {
    try{
        const response = await fetch(BASE_URL + "/matrix-tool/new-user",{
            method: "GET", 
            mode: "cors",
            headers: {"Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:8080"},
          });
        const idJSON = await response.json();
        ID = idJSON;
        return ID
    }
    catch(error){
        console.log("Error in getID():"+ error);
    }
}
  
function nextQuestions(){
    document.getElementById("top-level").innerHTML = questions[currentLevel]["topQuestion"];
    for(let i = 1; i <5; i++){
        document.getElementById("q"+i).innerHTML = questions[currentLevel]["extraQuestions"][i-1];
    }
 }

function refreshPage(){
    let g = document.querySelectorAll('input[type="radio"]');
    for(let i = 0; i < g.length; i++){
        g[i].checked = false;
    }
    var q = document.getElementsByClassName("form-control")
    q[0].style.display='block';
    for(let i = 1; i < q.length; i++){
        q[i].style.display='none';
    }
    document.getElementById("level-name").innerHTML = questions[currentLevel]["level"];
 }

 function showSecondaryQuestions(){
    var q = document.getElementsByClassName("form-control")
    q[0].style.display='none';
    for(let i = 0; i < q.length; i++){
        q[i].style.display='block';
    }    
 }

 function doGoHome() {
    document.getElementById('Homepage').style.display='block';
    document.getElementById('withoutmatrix').style.display='none';
    document.getElementById('matrix').style.display='none';
  }

  function finalSubmitDisplayAnswers(){
    refreshPage();
    document.getElementById("withoutmatrix").style.display='none';
    document.getElementById("Homepage").style.display='none';
    let stringQ = "User ID:" + ID + "<br>";
    for(let i = 0; i <questions.length; i++){
        stringQ = stringQ+"<br>Question " + (i+1) + ": "+questions[i]["answers"];
        stringQ = stringQ + "    Score: " + dot_position[currentLevel];
        
    }
    const box = stringQ;
    document.getElementById("matrix").getElementsByTagName("p")[0].innerHTML = box;
    document.getElementById('matrix').style.display='block';
    
  }

  
function displayMatrix(){
    google.charts.load('current', {
        packages: ['corechart', 'line']
      });
      google.charts.setOnLoadCallback(drawBasic);
      
      function drawBasic() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Level');
        data.addColumn('number', 'Maturity');
        data.addColumn('number', 'Maturity2');
        data.addColumn('number', 'point1');
        data.addColumn({ type: 'string', role: 'annotation' });
        data.addColumn('number', 'point2');
        data.addColumn({ type: 'string', role: 'annotation' });
        data.addColumn('number', 'point3');
        data.addColumn({ type: 'string', role: 'annotation' });
        data.addColumn('number', 'point3');
        data.addColumn({ type: 'string', role: 'annotation' });
        data.addColumn('number', 'point3');
        data.addColumn({ type: 'string', role: 'annotation' }); // Annotation column
        //data.addColumn('number', 'point3');
       
      
        data.addRows([
        [questions[0]["level"], dot_position[0],8-dot_position[0],1,"Individualist", 3, "Predictive",5,"Iterative",7,"Collaborative",9,"Experimental"],
          [questions[1]["level"], dot_position[1],8-dot_position[1],1,"Arbitrary", 3, "Long-term Plan",5,"Feature Driven",7,"Data Driven",9,"All Driven"],
          [questions[2]["level"], dot_position[2],8-dot_position[2],1,"No Organisation", 3, "Hierarchy",5,"Cross-functional Teams",7,"DevOps/SRE",9,"Internal Supply Chains"],
          [questions[3]["level"], dot_position[3],8-dot_position[3],1,"Random", 3, "Waterfall",5,"Agile",7,"Design Thinking",9,"Distributed"],
          [questions[4]["level"], dot_position[4],8-dot_position[4],1,"Emerging from trial and error", 3, "Tightly Coupled Monolith",5,"Client Server",7,"Microservices",9,"Functions"],
          [questions[5]["level"], dot_position[5],8-dot_position[5],1,"Respond to User Complaints", 3, "Ad-hoc Monitoring",5,"Alerting",7,"Full Observability",9,"AI"],
          [questions[6]["level"], dot_position[6],8-dot_position[6],1,"Irregular Releases", 3, "Periodic Releases",5,"Continuous Integration",7,"Continuous Delivery",9,"Continuous Deployment"],
          [questions[7]["level"], dot_position[7],8-dot_position[7],1,"Manual", 3, "Scripted",5,"Config management",7,"Orchestration",9,"Serverless"],
          [questions[8]["level"], dot_position[8],8-dot_position[8],1,"Single Server", 3, "Multiple Servers",5,"VMs",7,"Containers",9,"Edge Computing"]
        ]);
        
      
        var options = {
            title: '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 NO PROCESS \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0   \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 WATERFALL \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 AGILE \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 CLOUD NATIVE \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0NEXT',
            titleTextStyle: {
              fontSize: 18, // Adjust the font size as needed
              bold: true, // Make the title text bold
              alignment: 'center'
            },
            subtitle: 'NO PROCESSS           WATERFALL           AGILE           CLOUD NATIVE           NEXT', // Add a subtitle
            subtitleTextStyle: {
              fontSize: 14, // Adjust the font size as needed
              alignment: 'center'
            },
          hAxis: {
            textPosition: 'out',
            position: 'top',
            max: 9,
            fontSize: 10,
            gridlines: {
                color: 'black', // Change the gridline color
                count: 3, // Set the number of gridlines
            },
           
          },
          vAxis: {
            position: 'right',
            fontSize: 10,
            max: 9,
            gridlines: {
                color: 'black', // Change the gridline color
                count: 3, // Set the number of gridlines
            },
            // Move the vertical axis to the right side
            baselineColor: 'blue', // Change the color of the vertical axis line
            baselineWidth: 2,
            ticks: [0, 2, 4, 6, 8, 10],
          },
          axes: {
            y: {
              0: {side: 'right'}
            }
          },
          isStacked: true,
            annotations: {
            stem: {
              length: 0
            },
            textStyle: {
                fontSize: 10, // Adjust the font size as needed
                color: 'black', // Change the color to your desired annotation color
              },
               },  
          orientation: 'vertical',
          series: {
            0: { // Define series 0 for connecting the points with a line
              type: 'steppedArea',
              visibleInLegend: false,
              colour: 'red'
            },
            1: {
              type: 'steppedArea', // Define series 1 for the points only
              visibleInLegend: false,
              colour: 'blue'
            },
            2: {
              type: 'scatter', // Define series 1 for the points only
              pointSize: 3, // Increase point size for better visibility
              visibleInLegend: false,
              pointLabelPosiion: 'right',
              pointColour: 'black'
            },
            3: {
              type: 'scatter', // Define series 1 for the points only
              pointSize: 3, // Increase point size for better visibility
              visibleInLegend: false,
              pointLabelPosiion: 'left',
              pointColour: 'black'
            },
            4: {
              type: 'scatter', // Define series 1 for the points only
              pointSize: 3, // Increase point size for better visibility
              visibleInLegend: false,
              pointLabelPosiion: 'right',
              pointColour: 'black'
            },
            5: {
              type: 'scatter', // Define series 1 for the points only
              pointSize: 3, // Increase point size for better visibility
              visibleInLegend: false,
              pointLabelPosiion: 'right',
              pointColour: 'black'
            },
            6: {
              type: 'scatter', // Define series 1 for the points only
              pointSize: 3, // Increase point size for better visibility
              visibleInLegend: false,
              pointLabelPosiion: 'right',
              pointColour: 'black'
            }
          },
          chartArea: {
            width: '100%', // Adjust the width as needed
            height: '900%', // Adjust the height as needed
            left: 140, // Adjust the left margin as needed
            top: 100, // Adjust the top margin as needed
          },
        };
        options.hAxis.ticks = [0,2,4,6,8,10];
        
        var container = document.getElementById('myChart');
      
        var chart = new google.visualization.ComboChart(container);
        
        google.visualization.events.addOneTimeListener(chart, 'ready', function () {
          Array.prototype.forEach.call(container.getElementsByTagName('text'), function (text, index) {
            var textAnchor = text.getAttribute('text-anchor');
          var yOffset = 15; // Adjust the value as needed
              console.log(textAnchor);
          if (textAnchor === 'middle') {
            // Move annotations to the right
            text.setAttribute('x', parseFloat(text.getAttribute('x')) + yOffset);
          } else if (textAnchor === 'start') {
            // Move annotations up
            text.setAttribute('y', parseFloat(text.getAttribute('y')) - yOffset);
          }
          });
        });
      
        chart.draw(data, options);
      }
      
}

 

