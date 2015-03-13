function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        };
    };

    return false;
};

function createDate(dateToChange){
  var d = new Date(dateToChange);
    var dateDay = d.getDate();
    var dateMonth = d.getMonth() + 1;
    var dateYear = d.getFullYear();
    var dateNewFormat = dateDay +"/" + dateMonth + "/" + dateYear;

    return dateNewFormat;

};

var main = function(){
  // console.log("logged in user is:");
  // console.log(gon.user_id);
  var dialog;
  var dialogGoal;
  var dialogComment;
  var username;
  var sessionClock;
  var incompleteTasks;
  var difficulties;
  var importances;

  if(gon.mobile === 0){
    // alert("Not a mobile")
  

   var showDifficulties = function(taskId, difficultyOptions){
    console.log("Loading difficulties");
      var difficultySelection = $('#difficulty-select'+taskId);
      var initialDifficulty = '<option value="none">Difficulty</option>';

      difficultySelection.html('');

      difficultySelection.append(initialDifficulty);

      $.each(difficultyOptions, function(i, difficulty){

        // console.log(difficulty);
        difficultyItem = '<option value='+difficulty.difficulty_ref+'>'+difficulty.name+'</option>';
        // console.log(importanceItem);
        difficultySelection.append(difficultyItem);
      });
    }; 

    var showImportances = function(taskId, importanceOptions){
       console.log("Loading importances");
      var importanceSelection = $('#importance-select'+taskId);
      var initialImportance = '<option value="none">Importance</option>';

      // console.log(importanceOptions)

      importanceSelection.html('');

      importanceSelection.append(initialImportance);

      $.each(importanceOptions, function(i, importance){

        // console.log(importance);
        importanceItem = '<option value='+importance.importance_ref+'>'+importance.name+'</option>';
        // console.log(importanceItem);
        importanceSelection.append(importanceItem);
      });
    };

    $.getJSON("/difficulties", function(data){
      difficulties = data;
      console.log(difficulties);
      showDifficulties(-1, difficulties)
    });

      $.getJSON("/importances", function(data){
      importances = data;
      showImportances(-1, importances);
    });
  
 

 $('#heat-map-panel').hide();
 $('#checklist-panel').hide();

 $(document.body).on('click', '.to_control', function(){

      $('#heat-map-panel').animate({bottom: "-200px"}, 1000).fadeOut();
      $('#control-panel').animate({top: "0px"}, 500).fadeIn();
 });

  $(document.body).on('click', '.show-heat-map',function(){
    console.log("in heat map");
     $('#control-panel').animate({bottom: "-200px"}, 1000).fadeOut();
     $('#heat-map-panel').animate({top: "0px"}, 500).fadeIn();
  
    var noResindex = $('#noResindex');
    var withResindex = $('#withResindex');
    var resindexReset = $('#resindexToBeReset');
    var heatMap = $('#heat-map-container');
   noResindex.html('');
   withResindex.html('');
   resindexReset.html('');

    $.getJSON("/tasks_with_no_resindex", function(data){
     
        console.log(noResindex);
      
      $.each(data, function(i, task){
        // console.log(task); 
       
         var taskItem = '<p>Project : '+ task.project.name +', Goal :'+ task.goal.name+'</p><input type="hidden" class="heat-map-goal'+task.id+'" value ='+task.goal.id+'></input><div class="well well-lg heat-task noResindex" value='+task.id+'>'+task.card_name +'<span class="pull-right"> Resindex to be set</span></div>';
      // console.log(taskItem);
        noResindex.append(taskItem);
        // console.log(noResindex);
      });
    });

    $.getJSON("/tasks_with_resindex", function(data){
        // var noResindex = $('#noResindex');
        // console.log(noResindex);
        var output = true;
        var endDateCheck;
      
      $.each(data, function(i, task){
        console.log(i); 

        if(i==0){
          console.log(i)
        endDateCheck = task.end_date;
        var endDate = createDate(task.end_date)
        // console.log(endDate);
        var dateItem = '<p>'+ endDate +'</p><hr></hr>';
        console.log(endDateCheck);

        }else if(task.end_date != endDateCheck){
           console.log(endDateCheck);
              endDateCheck = task.end_date;
              var endDate = createDate(task.end_date)
              console.log(endDate);
              var dateItem = '<p>'+ endDate +'</p><hr></hr>';
              output = true;
            }else{
               console.log(endDateCheck);
              output= false;
            };

        var taskItem = '<p>Project : '+ task.project.name +', Goal :'+ task.goal.name+'</p><input type="hidden" class="heat-map-goal'+task.id+'" value ='+task.goal.id+'></input><div class="well well-lg heat-task" value='+task.id+'>'+task.card_name +'<span class="pull-right"> Resindex : '+task.resindex +'</span></div>';
      // console.log(taskItem);
      if(output == true){
        withResindex.append(dateItem);
      };
        withResindex.append(taskItem);
        console.log(task.resindex);
        if(task.resindex < 1){
          $('.heat-task[value='+task.id+']').addClass('ok');
        }else if(task.resindex >1 && task.resindex <2){
          $('.heat-task[value='+task.id+']').addClass('dodgy');
        }else{
          $('.heat-task[value='+task.id+']').addClass('out');
        };
      });
    });

      $.getJSON("/tasks_resindex_to_be_reset", function(data){
        // var noResindex = $('#noResindex');
        console.log(noResindex);
      
      $.each(data, function(i, task){
        // console.log(task); 
         var taskItem = '<p>Project : '+ task.project.name +', Goal :'+ task.goal.name+'</p><input type="hidden" class="heat-map-goal'+task.id+'" value ='+task.goal.id+'></input><div class="well well-lg heat-task" value='+task.id+'>'+task.card_name +'<span class="pull-right"> Resindex : To be reset </span></div>';
      // console.log(taskItem);
        resindexReset.append(taskItem);
        console.log(resindexReset);
      });
    });
  });

  $(document.body).on('click', '.heat-task', function(e){
    console.log("in heat task click");
    $this = $(this);
    console.log($this);
    var taskId = $this.attr("value");
    console.log(taskId);

    var goalId = $('.heat-map-goal'+taskId).val();
    console.log(goalId);

    createTaskRecord(goalId,0, taskId );

  });





///just checking to see if git diff works

      var createTaskRecord = function(goal, search_type, taskIdToShow){
        var listItem;
        var search_url;
        var numberOfTasks = 0;

        switch(search_type){
          case 0 :
          search_url = "/users/" + gon.user_id + "/tasks";
          break;

          case 1 :
          search_url = "/top_10";
          break;

          case 2 :
          search_url = "/trello_only";
          break;

          case 3 :
          search_url = "/non_trello";
          break;

           case 4 :
          search_url = "/top10_trello";
          break;
           case 5 :
          search_url = "/top10_non_trello";
          break;

        };


        // console.log("search_url" + search_url)
        // $.getJSON("users/" + gon.user_id +"/tasks", function(data){
        $.getJSON(search_url, function(data){
          console.log(data);

            var listItems = $("#task-list-group");
            // console.log(data);

            listItems.html("");
            // listItems.hide();

         // recordTime = '<button id='+ card.shortlink + ' class="recordButton" >Record time against task</button>'
         // console.log(data);

      $.each(data, function(i, task){

          if(task.goal_id == goal || goal== -1){
            numberOfTasks += 1;

            if (task.effort !=0 ){
              effortMins = parseInt(task.effort * 60);
                if(effortMins > 1){
                effortHours = parseInt(effortMins / 60);
                newEffortMins = effortMins - (effortHours * 60);
                }else{
                  effortHours = 0;
                  newEffortMins = effortMins;
                }
            }else{
              effortHours = 0;
              newEffortMins = 0;
            };

            if (newEffortMins < 10){
              newEffortMins.toString();
              newEffortMins = "0" + newEffortMins;
              // console.log(newEffortMins);
            }
            // console.log(task.completed);
            
          // if (task.resindex == 0 || task.resindex == 999 || task.resindex == null){
          //   // console.log(task)

          //   if(task.resindex == 0 || task.resindex == null){

          //     var requirement = "Resindex has not been set for this job, please set the parameters below to ensure its ranking.";
          //   }else{
          //     var requirement = "Task not completed by due date - reset resindex";
          //   };
       
          //   listItem = '<div class="panel panel-default tpanel" value='+ task.id + '><button class="commentButton btn btn-xs btn-warning pull-right" value='+ task.id +' >Add a note</button><div class="panel-heading task-panel" value='+ task.id +' id="taskSource'+task.id+'" >' + task.card_name +'</div><div class="list-group-item" id= '+ task.id +'><p style="color:red"><b>'+requirement +'</b></p><div id = "resindex-wrapper2"><div id="hours-wrapper"><div class="control-group"><div class="controls"><select class="form-control estimate-sel" id="estimate-select'+task.id+'"><option value="none">Completion time</option><option value="1">One hour</option><option value="2">Two hours</option><option value="3">Three hours</option><option value="4">Four hours</option><option value="5">Five hours</option><option value="6">Six hours</option><option value="7">Seven hours</option><option value="8">Eight hours</option><option value="9">Nine hours</option><option value="10">Ten hours</option></select></div></div></div><div id="difficulty-wrapper"><div class="control-group"><div class="controls"><select class="form-control difficulty-sel" id="difficulty-select'+task.id+'"><option value="none">Difficulty</option><option value="1">Easy-done it before</option><option value="2">Something slightly different</option><option value="3">Tricky</option><option value="4">Really difficult</option><option value="5">Mission Impossible!</option></select></div></div></div><div id="importance-wrapper"><div class="control-group project-options"><div class="controls"><select class="form-control importance-sel" id="importance-select'+task.id+'"><option value="none">Importance</option><option value="5">Would do</option><option value="4">Could do soon</option><option value="3">Should do this asap</option><option value="2">Someone/I needs this</option><option value="1">Someone/I REALLY needs this!</option></select></div></div></div></div><hr><div id="dates-wrapper"><p>To be done...</p><button class="btn btn-danger today" value='+task.id+'>Today</button><button class="btn btn-warning tomorrow" value='+task.id+'>Tomorrow</button><button class="btn btn-info set_dates" value='+task.id+' data-toggle="collapse" href="#dates-to-set'+task.id+'">I want to set dates</button><hr><div id="dates-to-set'+task.id+'" class="collapse"><div class="dates"><label for="start_date">Start Date</label><input type="text" id="start_date'+task.id + '"class="start_date_sel" name="start_date"></div><div class="dates"><label for="end_date">End Date</label><input type="text" id="end_date'+ task.id + '" class="start_date_sel" name="end_date"></div></div></div></div><div class="control-group" id="submit-button-group"><div class="controls"><button class="btn btn-primary new-task" value='+task.id+'>Set Resindex</button><button class="btn btn-warning" id="refresh">Clear</button></div><p id="projectSource'+task.id +'"> Project : '+task.project.name +'</p></div>';  

          // }else{

              var startDate = new Date(task.start_date).toDateString();
              var endDate = new Date(task.end_date).toDateString();
             

              listItem = '<div class="panel panel-default tpanel" value='+ task.id + '><button class="commentButton btn btn-xs btn-warning pull-right" value='+ task.id +' ><span class="glyphicon glyphicon-pencil" title="Add a note."></span></button><button class="viewNotesButton btn btn-xs btn-warning pull-right" value='+ task.id +' ><span class ="glyphicon glyphicon-list-alt" title="Show all notes."></span></button><button class="viewChecklistButton btn btn-xs btn-warning pull-right" value='+ task.id +' ><span class ="glyphicon glyphicon-tasks" title="Go to checklists."></span></button><div class="panel-heading task-panel" value='+ task.id +' >' + task.card_name +'</div><div class="list-group-item" id= '+ task.id +'><input type="hidden" value='+ task.id + '><span class ="pull-right resindex badge" value='+task.id +' title="Tool tip to be defined."> Resindex : ' + task.resindex + '</span><p>Work done to date : ' + effortHours + ' hours ' + newEffortMins + ' mins<span class="pull-right"><button class="recordButton btn btn-xs btn-warning" value='+task.id+' ><span class="glyphicon glyphicon-time" title="Start a work session."></span></button></span></p><p> The task is set to start on '+ startDate +' and end on '+ endDate +'<span><div class="pull-left"><button class="viewDetails btn btn-xs btn-info" value='+task.id+'><span class="glyphicon glyphicon-chevron-down" title="Show details."></span></button></div><div class="pull-right" value='+ task.id +'><button class=" btn btn-xs completed btn-success" id="completed'+task.id +'" name="completed" value='+ task.id +'><span class="glyphicon glyphicon-ok" title="Mark completed."></span></button></div></span></p><p><button class="editButton btn btn-warning btn-xs pull-right" value='+ task.id + '><span class="glyphicon glyphicon-edit" title="Edit job."></span></button></p></div><div class="control-group"><div class="controls"><textarea class="form-control task_description_on_task" value='+ task.id +' style="display:none" placeholder="Add details">' + task.card_description + '</textarea></div><p id="projectSource'+task.id +'"> Project : <button class="btn btn-info btn-xs link_to_project" name='+task.goal_id+' value='+task.project.id+'>'+task.project.name +' : '+task.goal.name+'</button><button class ="btn btn-info btn-xs">Show comments</button><button class="btn btn-success btn-xs">Get documents</button><span><button class="btn btn-xs saveDescriptionEdit pull-right btn-warning" value='+ task.id +' style="display:none">Save edit</button></span></div><div class="row"><div class="col-xs-9"><div class="input-group"><input type="text" class="form-control mobile-task-name" placeholder="New note"><span class="input-group-btn"><button class="btn btn-default mobile-add" type="button">Add</button></span></div></div></div><div class="row"><div class="col-md-10"><div id="comment-task-group" style="height:200px; overflow:auto;"></div></div></div></div>';
              // };

              listItems.append(listItem);
              if(task.completed===true){
                $('.badge.resindex[value='+task.id+']').text("Completed")
                $('#completed' + task.id).text("Reopen");
                $('#completed' + task.id).addClass("done");
                $('.recordButton[value='+task.id+']').fadeOut();
              };
              if (task.resindex == 0 || task.resindex == 999 || task.resindex == null){
                showImportances(task.id, importances);
                showDifficulties(task.id, difficulties);
              }
            };
          });
          listItems.fadeIn(1000);
          $.each(data, function(i,task){
              resindexColour(task.id, task.resindex);
          });

          if(taskIdToShow == -1){
            searchResultsText(numberOfTasks, search_type);
          }else{
            console.log("just show one");
           
            $('.tpanel').hide();
            $('.tpanel[value='+taskIdToShow+']').show();
          };   
      });
    };

 $(document.body).on('click', '.link_to_project', function(){
  var goalId = $(this).attr('name');
  var projectId = $(this).val();
  showProject(projectId, goalId);
 });

 ///---Checklist functional code start------------------///


 var showChecklistPane = function(taskId){
  $('#control-panel').animate({bottom: "-200px"}, 1000).fadeOut();
  $('#checklist-panel').animate({top: "0px"}, 500).fadeIn();
  $('.add_checklist_button').val(taskId);

 };


 var hideChecklistPane = function(){
  $('#checklist-panel').animate({bottom: "-200px"}, 1000).fadeOut();
  $('#control-panel').animate({top: "0px"}, 500).fadeIn();
 };

////-------show the checklist pane --------/////
 $(document.body).on("click", ".viewChecklistButton", function(){

  $this = $(this);

  var taskId = $this.val();

  // console.log(checklist_id);

  showChecklistPane(taskId);

   // $('#control-panel').animate({bottom: "-200px"}, 1000).fadeOut();
   // $('#checklist-panel').animate({top: "0px"}, 500).fadeIn();

   showChecklists(taskId);

 });


 ///-------hide the checklist pane--------////

 $(document.body).on("click", ".to_control_from_checklist", function(){
   // $('#checklist-panel').animate({bottom: "-200px"}, 1000).fadeOut();
   // $('#control-panel').animate({top: "0px"}, 500).fadeIn();

   hideChecklistPane();

 });





 ///-------Show checklists -------////
var showChecklists = function(taskId){
 $.getJSON("/checklists?task="+taskId, function(data){
  console.log(data);

  var listItem;
  var checklists = $('#checklist-container');

  checklists.html('');
 
  $.each(data, function(i,checklist){

    listItem = '<button class="btn btn-info btn-xs checklist-button" type="button" data-toggle="collapse" data-target="#checklist'+checklist.id+'" aria-expanded="false" value='+checklist.id+'>'+checklist.name+'</button><hr></hr><div class="collapse" id="checklist'+checklist.id+'"></div>';

      checklists.append(listItem);
    });
 });
}

 ///----Add a checklist----------------------------////




 $('.add_checklist').keypress(function(){

  // console.log("Im typing in the title");
    if($('.add_checklist').hasClass("border-red")){
      $('.add_checklist').removeClass("border-red");
    };
 });

 $(document.body).on('click', '.add_checklist_button', function(){

    ///Validation code
    if($('.add_checklist').val()==""){
      $('.add_checklist').addClass("border-red");

    }else{


    console.log("button clicked");

    var $this = $(this);
    var taskId = $this.val();
    var path = "/checklists";
    var method = "POST";
    var checklist_data = {};

    checklist_data["name"] = $('.add_checklist').val();
    checklist_data["task_id"] = taskId;

    $.ajax({
      url: path,
      method: method,
      data: {checklist: checklist_data}

    }).done(function(){
      console.log("checklist loaded");
     
      showChecklists(taskId);
      $('.add_checklist').val('');
    }).fail(function(){
      console.log("there is something wrong with this");
    })
  };
 });

// showChecklists();

 ///---------checklist functional code end --------------///


///---------Checklist Item functional code start-------------------------------///////


  $(document.body).on('click', '.checklist-button', function(){
    $this = $(this);

    var checklistId = $this.val()
    // console.log(checklistId);
    if($('#checklist'+checklistId).children().length== 0){
      console.log("showing the check lists");

    showChecklist(checklistId);
    }
  });

 var showChecklist = function(checklist){

 
    $.getJSON("/checklist_items?checklist="+checklist, function(data){
      
      var checklist_list = $('#checklist'+checklist);
        checklist_list.html('');

        // console.log(data.length);

      $.each(data, function(i, checklist_item){

        var checklist_list_item = '<div class="checklistitem"><hr></hr><button class="col-sm-2 btn btn-xs btn-success checklist_button" value='+checklist_item.id+'><span class="glyphicon glyphicon-ok"></span></button><div class="col-sm-10"><p class="form-control-static checklist_text'+checklist_item.id+'">'+checklist_item.name+'</p><hr></hr></div>';
        checklist_list.append(checklist_list_item);

        if(checklist_item.completed == true){
              $('p.checklist_text'+checklist_item.id).addClass('stroke-through');
              $('.checklist_button[value='+checklist_item.id+']').addClass('cl-completed');
              $('.checklist_button[value='+checklist_item.id+']').html('<span class="glyphicon glyphicon-remove"></span>');

               $('.checklist_button[value='+checklist_item.id+']').removeClass('btn-success');

                $('.checklist_button[value='+checklist_item.id+']').addClass('btn-danger');

        };
     
        // console.log(countOfItems);
      });
        checklist_list.append('<button class="col-sm-2 btn btn-success add_item_button" value='+checklist+'>Add</button><textarea class="col-sm-10 add_checklist_text'+checklist+'" placeholder="Add a new checklist item"></textarea>');
    });

 };

 // showChecklist(1);

 //---complete a checklist item-----////

 $(document.body).on('click', '.checklist_button', function(){

  var $this = $(this);
  var id = $this.val();
  var completedValue;

  $this.toggleClass('cl-completed');

  // console.log(id);

  if ($this.hasClass('cl-completed')){
  $this.html('<span class="glyphicon glyphicon-remove"></span>');
  $this.removeClass('btn-success');
  // $this.addClass('btn-info');
  $this.addClass('btn-danger');
  // $this.toggleClass('cl-completed');
  $('p.checklist_text'+id).toggleClass('stroke-through');
  completedValue = true;
  }else{

  $this.html('<span class="glyphicon glyphicon-ok"></span>');
  $this.removeClass('btn-danger');
  $this.addClass('btn-success');
  // $this.removeClass('cl-completed');
  $('p.checklist_text'+id).toggleClass('stroke-through');
  completedValue = false;
  };

  var path = "/checklist_items/"+ id;
  var method = "PUT";
  var completeData = {};

  completeData["completed"] = completedValue;

  $.ajax({
    url:path,
    type: method,
    data: {checklist_item: completeData},
    dataType: "json"
  });
 });


 

/////--------Add a checklist item------------------////////





$(document.body).on('click', '.add_item_button', function(){
  var $this = $(this);
  var checklistId = $this.val();
  var checklist_item_text = $('.add_checklist_text'+checklistId).val();


  if(checklist_item_text == ""){
    $('.add_checklist_text'+checklistId).addClass('border-red');

  }else{

    var path = "/checklist_items";
    var method = "POST";
    var checklistItemData ={};

    checklistItemData["name"] = checklist_item_text;
    checklistItemData["completed"] = false;
    checklistItemData["checklist_id"] = checklistId;

    $.ajax({
      url: path,
      type: method,
      data: {checklist_item:checklistItemData }
      // dataType: "json"
    }).done(function(){
      console.log("Checklist item added");
      showChecklist(checklistId);
    }).fail(function(){
      console.log("This failed");
    }); 
  };
  })

/////------------------Checklist item code end--------------------------//////////////
  

 var showProject = function(project_id, goal_id){
  // console.log("in showproject");
  // var menuItems = $("#menu-container");
  var projectMenuItems = $("#project-list-container");
  var goalMenuItems = $("#goals-list-container");
  var projectItem;
  var goalItem;

  projectMenuItems.html('');
  goalMenuItems.html('');
  
  projectMenuItems.append('<p>Projects</p><hr></hr>');

  var projectPath = "users/"+gon.user_id+"/projects/"+ project_id;

  // console.log(projectPath);

  $.getJSON(projectPath, function(data){
    // console.log(data);
   var project = data.project;

    projectItem = '<button class="btn-warning btn-xs pull-right new-goal" value='+ project.id +'>New Goal</button><div class="well well-lg projects selectedProject" id=' + project.id + '>' + project.name + '<span class ="pull-right badge goals-left"> Goals : ' + project.no_of_goals + '</span></div></div>';
      projectMenuItems.append(projectItem);
      goalMenuItems.append('<p>Goals</p><hr></hr>');
    var goals = data.project.goals;
    // console.log(goals);

    $.each(goals, function(i, goal){
      if(goal.id == goal_id){
        goalItem = '<div class="well well-lg goals project' + goal.project_id + ' selectedGoal" id=' + goal.id + '> ' + goal.name + '<span class ="pull-right badge tasks-left"> Jobs open: ' + goal.no_of_tasks + '</span></div>';
      }else{
          goalItem = '<div class="well well-lg goals project' + goal.project_id + ' " id=' + goal.id + ' style="display:none"> ' + goal.name + '<span class ="pull-right badge tasks-left"> Jobs open: ' + goal.no_of_tasks + '</span></div>';
      };
          goalMenuItems.append(goalItem);
    });

      // menuItems.append(projectItem);
      // menuItems.append(goalItem);
  });
 }; 

var refreshUserProjectInfo = function(){
  incompleteTasks = gon.user_tasks;

 $('#user_tasks').text("incomplete tasks : " + gon.user_tasks + " ");
 $('#user_projects').text("projects: " +gon.user_projects + " ");
 $('#user_goals').text("goals : " + gon.user_goals + " ");
};


var resindexColour = function(taskId, resindex){
  // console.log("in resindex colour");
  // console.log(taskId);
  // console.log(resindex);

  if(resindex >1 && resindex < 1.5){
    
    // console.log('.resindex.badge[value='+ taskId +']')
      $('.resindex.badge[value='+ taskId +']').addClass('warning');
      // a.addClass('warning');
  }else if(resindex <1 && resindex >0){
    $('.resindex.badge[value='+ taskId+']').addClass('success');
  }else if (resindex==999){
      $('.resindex.badge[value='+ taskId+']').addClass('primary');
      $('.resindex.badge[value='+ taskId+']').text('reset');
  }else if(resindex== -999){
  $('.resindex.badge[value='+ taskId+']').addClass('info');
      $('.resindex.badge[value='+ taskId+']').text('completed');
  }else if(resindex > 1.51 && resindex < 20){
    $('.resindex.badge[value='+ taskId+']').addClass('danger');
  }else if(resindex == 0){
        $('.resindex.badge[value='+ taskId+']').text('to be set');
  }else{
    // console.log("what!!");
  }
};



 $( "#log_in" ).click(function(e) {
  e.preventDefault();
  $( "#log_in_form" ).slideDown( "slow", function() {
    // Animation complete.
  });
});

 $('#task_title').keypress(function(){

  // console.log("Im typing in the title");
    if($('#task_title').hasClass("border-red")){
      $('#task_title').removeClass("border-red");
    };
 });

  $('#comment-text').keypress(function(){

  // console.log("Im typing in the title");
    if($('#comment-text').hasClass("border-red")){
      $('#comment-text').removeClass("border-red");
    };
 });

///-----------Validation fo Task form---------------//////////
 var validateTaskForm = function(taskId){
  var foundError = false;

  if(taskId == -1){
   if($('#task_title').val()== ""){
    // console.log("title failed!");
    $('#task_title').addClass("border-red");
    foundError = true;
   };


   if($('#project-select').val()=="none"){
    // console.log("project failed");
    $('#project-select').addClass("border-red");
    foundError = true;

   };


   if($('#goal-select').val()=="none"){
    // console.log("project failed");
    $('#goal-select').addClass("border-red");
    foundError = true;

   };
  };

   if($('#estimate-select'+taskId).val()=="none"){
    // console.log("estimate failed");
    $('#estimate-select'+taskId).addClass("border-red");
    foundError = true;

   };


   if($('#difficulty-select'+taskId).val()=="none"){
    // console.log("difficulty failed");
    $('#difficulty-select'+taskId).addClass("border-red");
    foundError = true;

   };


   if($('#importance-select'+taskId).val()=="none"){
    // console.log("importance failed");
    $('#importance-select'+taskId).addClass("border-red");
    foundError = true;

   };
   // console.log(taskId);


    if($('#start_date'+ taskId).val()==""){
    // console.log("start date failed");
    $('#start_date' + taskId).addClass("border-red");
    foundError = true;

   };

  if($('#end_date'+ taskId).val()==""){
    // console.log("end date failed");
    $('#end_date' + taskId).addClass("border-red");
    foundError = true;

   };
   if(foundError ==false){
    createTask(taskId);
   };

  };

 ////----------------end of validation-----------------/////

 $.getJSON("/users/" + gon.user_id, function(data){
  // console.log(data);
  username = data.first_name;

 });

// createProjectList(1);

  $('#blank_task').click(function(e){
    e.preventDefault();

    // console.log("blank task works");

      taskInputReset();


      $('#comments-panel').animate({bottom: "-200px"}, 500).fadeOut();

      $('#input-panel').animate({top: "0px"}, 500).fadeIn();

  });

  var checkMenuPanel = function(){

    $('#menu-container').hasClass('frozen');

  };

    var refreshTasks = function(){
      // console.log("in referesh tasks");
      $('#task-list-group').html('');
      goalId = $('.goalSel').val();

      createTaskRecord(goalId, 0, -1);
   };


   var showComments = function(taskId){

    $('#input-panel').animate({bottom: "-200px"}, 500).fadeOut();
    $('#comments-panel').animate({top: "0px"}, 500).fadeIn();
    var commentList =  $('#comment-task-group');

      var taskName = $('.task-panel[value='+ taskId+']').text();
        $('#notes-panel-header').text('Notes for '+taskName);
  
    commentList.html('');

    $.getJSON("/tasks/"+ taskId +"/comments", function(data){

      $.each(data, function(i, comment){
        // console.log(comment);

        //commented out so that all comments are visible
        // if(comment.comment_type.comment_switch === "user"){

        listItem = '<button type="button" class="btn btn-info btn-xs pull-right">'+ comment.comment_type.name + '</button><div class="well well-sm comments" id=' + comment.id + '><h4>' + comment.ctext + '</h4></div></div>';
        commentList.append(listItem);
      // };
      });
    });
   };


     $('#goal-select').on("change", function(){
    // console.log("Im typing in the title");
      if($('#goal-select').hasClass("border-red")){
        $('#goal-select').removeClass("border-red");
      };
   });

var validateTaskFormAfterError = function(changeItem){
    var elementToCheck = "#" + changeItem ;
        // console.log(elementToCheck);
 
    // console.log(elementToCheck);


    if($(elementToCheck).hasClass("border-red")){
      $(elementToCheck).removeClass("border-red");
    };
  };


      $(document.body).on('change', '.estimate-sel', function(){
          // console.log("checking estimate-select");
   
        var changeItem = $(this).attr('id')
        validateTaskFormAfterError(changeItem);
      });

         $(document.body).on('change', '.difficulty-sel', function(){
          // console.log("checking difficulty-select");
     
        var changeItem = $(this).attr('id')
        validateTaskFormAfterError(changeItem);
      });


      $(document.body).on('change', '.importance-sel', function(){
          console.log("checking importance-select");
     
        var changeItem = $(this).attr('id')
        validateTaskFormAfterError(changeItem);
      });

      $(document.body).on('change', '.start_date_sel', function(){
          // console.log("checking start date");
     
        var changeItem = $(this).attr('id')
        validateTaskFormAfterError(changeItem);
      });
      
      $(document.body).on('change', '.end_date_sel', function(){
          // console.log("checking end date");
     
        var changeItem = $(this).attr('id')

        validateTaskFormAfterError(changeItem);
      });


  $('#project-select').on("change", function(){
    // console.log("The project has been changed");

    // console.log("Im typing in the title");
    if($('#project-select').hasClass("border-red")){
      $('#project-select').removeClass("border-red");
    };

    updateGoalList($('#project-select option:selected').val(), 0);

   });

   
    var createTask = function(sourceId){
      var goal_id;
      var taskID =$('.task-form-header').attr("id");
      // console.log(taskID);
      // console.log(sourceId);

      var data = {};

        data['importance'] = $('#importance-select'+ sourceId +' option:selected').val();
        data['difficulty'] = $('#difficulty-select'+ sourceId +' option:selected').val();
        data['start_date'] = $('#start_date'+ sourceId).val();
        data['end_date'] = $('#end_date'+ sourceId).val();
        data['estimate'] = $('#estimate-select'+sourceId +' option:selected').val();
        data['completed'] = false
     

      if(sourceId == -1){
        var goalId = $('#goal-select option:selected').val();
        var projectId = $('#project-select option:selected').val();
        data['goal_id'] = $('#goal-select option:selected').val();
        data['project_id'] = $('#project-select option:selected').val();
        data['card_name'] = $('#task_title').val();
        data['card_description'] = $('#task_description').val();
      };
 

        // console.log(data);


    if($('.task-form-header').attr("id") =="" && sourceId == -1){

      path = "/users/" + gon.user_id + "/tasks";
      method = "POST";
      goal_id = $('#goal-options option:selected').val();
      // data['goal_id'] = $('#goal-options option:selected').val();
      // data['project_id'] = $('#project-options option:selected').val();

      // console.log("id works okay");
    }else{
    if (taskID == ""){
      path = "/users/"+ gon.user_id +"/tasks/" + sourceId.toString();
      data["id"] = sourceId;
      }else{
        path = "/users/"+ gon.user_id +"/tasks/" + taskID.toString();
        data["id"] = taskID;
      };
       method = "PUT";
    }
 
 console.log("sending information...");
 console.log(data);
 
      $.ajax({ 
     
        url: path, 
        method: method,
        data: {task: data},
        dataType: "json"
      })

        postCreateTaskJobs(sourceId, taskID, method, goalId, projectId)
      };

       var postCreateTaskJobs = function(sourceId, taskId, method, goalId, projectId){
        // console.log("in post jobs");
         // searchButtonCombinations("reset_afer_update");
        if(method == "PUT"){
          if(taskId == ""){
            showComments(sourceId);
            showProject(projectId, goalId);
             // createTaskRecord(goalId, 0);
             if(searchButtonsTest() == true){
              createTaskRecord(goalId, 0, -1);
            }else{
              searchButtonCombinations("reset_afer_update");
            };
          }else{
            showComments(taskId);
            showProject(projectId, goalId);
            // createTaskRecord(goalId, 0);
            if(searchButtonsTest() == true){
              createTaskRecord(goalId, 0, -1);
            }else{
              searchButtonCombinations("reset_afer_update");
            };
          };
        }else{
           showProject(projectId, goalId);
           createTaskRecord(goalId, 0, -1);
          incompleteTasks ++;
          $('#user_tasks').text("incomplete tasks : " + incompleteTasks + " ");
          searchButtonCombinations("clear");
         };
        taskInputReset();
        //  incompleteTasks ++;
        // $('#user_tasks').text("incomplete tasks : " + incompleteTasks + " ");
       };

      $(document.body).on('click','#project-button', function(e){
        e.preventDefault();
        if(!$('#menu-container').hasClass('frozen')){
          // console.log("clicked the project button");
          $('.projectSel').val('');
          $('.goalSel').val('');
          createProjectList(0);
          $('#goals-list-container').html('')
          taskInputReset();
        };
      });


      var createProjectList = function(menuOrOptions){
        // console.log("in create project list")

        $.getJSON("users/"+ gon.user_id +"/projects", function(data){

          // $('#project-button').fadeOut(500);

            var menuItems = $("#project-list-container");
            var projectOptions = $("#project-select");
            var goalOptions = $("#goal-select");
            var projectOption;
            var projectItem;
            var projectInitialOption;
            menuItems.html('');
            projectOptions.html('');
            goalOptions.html('');

              menuItems.append('<p>Projects</p><hr></hr>');

            projectInitialOption = '<option value="none">Select prize</option>';
            // menuItems.append('<div class="well well-lg" id="project-button"><h4>Projects</h4></div>');

            goalInitialOption = '<option value="none">Select a project first</option>';

            projectOptions.append(projectInitialOption);
            goalOptions.append(goalInitialOption);

            $.each(data, function(i, project){
              if(menuOrOptions == 0){
                // console.log(project.no_of_goals)

                if(project.no_of_goals === null){
                  x = 0;
                }else{
                  x = project.no_of_goals;
                };

              projectItem = '<button class="btn-warning btn-xs pull-right new-goal" value='+ project.id +'>New Goal</button><div class="well well-lg projects" id=' + project.id + '>' + project.name + '<span class ="pull-right badge goals-left"> Goals :' + x + '</span></div></div>';
              
              projectOption = '<option value='+project.id+ '>'+ project.name +'</option>'
              menuItems.append(projectItem);
              projectOptions.append(projectOption);
            }else{
              projectOption = '<option value='+project.id+ '>'+ project.name +'</option>';
              projectOptions.append(projectOption);
            };
            });
           ;
        });
      };
  
    $(document.body).on('click', '.completed', function(e){
      e.preventDefault();

      $(this).toggleClass('done');

      // console.log("in completed");
      // console.log($(this));
      var taskId = $(this).val();
      // console.log("task id " + taskId);
      // console.log(gon.user_id);
      var path = "users/"+ gon.user_id +"/tasks/" + taskId;
      var method = "PUT";
      var dataToSend = {};
      // console.log($(this).hasClass('done'));

    if($(this).hasClass('done')){
      // console.log("in completed");

        dataToSend["completed"] = true;
        $(this).text('Reopen');
        // console.log(incompleteTasks);
        incompleteTasks -- ;
        $('#user_tasks').text("incomplete tasks : " + incompleteTasks + " ");
        $('.badge.resindex[value='+taskId+']').text("Completed");
        $('.recordButton[value='+taskId+']').fadeOut();

        // $('.badge.task-open[value='+)

      }else{
        // console.log("In non-completed")
        dataToSend["completed"] = false;
        $(this).html('<span class="glyphicon glyphicon-ok"></span>');
        incompleteTasks ++ ;
        $('#user_tasks').text("incomplete tasks : " + incompleteTasks + " ");
        $('.badge.resindex[value='+taskId+']').text("Resindex: recalculate");
         $('.recordButton[value='+taskId+']').fadeIn();

      };
      // console.log(dataToSend);
      
      $.ajax({
        url: path,
        method: method,
        data: {task: dataToSend},
        dataType: "json"
      })
      
    });

    // $(document.body).on('hover', '#task-panel', function(){
    //   console.log("hello");
    // });

//this function creates the goal list in the Control frame.

      var createGoalsList = function(projectID){
        console.log("In goalslist")
        console.log(projectID)
        var x;
        // console.log("in createGoalsList")

        var menuItems = $('#goals-list-container');
        menuItems.html('');


        if($('.goals').length==0){

        $.getJSON("/projects/"+ projectID +"/goals", function(data){
          // console.log(data);
            menuItems.append('<p>Goals</p><hr></hr>')
           $.each(data, function(i, goal){
            // console.log(goal.no_of_tasks);

                if(goal.no_of_tasks === null){
                  x = 0;
                }else{
                  x = goal.no_of_tasks;
                };
              var goalItem = '<div class="well well-lg goals project' + projectID + ' " id=' + goal.id + '> ' + goal.name + '<span class ="pull-right badge tasks-left" value='+goal.id+'"> Jobs open: ' + x + '</span></div>';
              menuItems.append(goalItem);
            }); 
          });
        };
      };

    //this function create the options available in the goal select on the new/update task

     var createGoalsOptions = function(projectID, goalSet){

        // var menuItems = $('#menu-container');
        var goalOptions = $('#goal-select');
        var goalOption;
        var goalInitialOption;

        // menuItems.html('');

        // if($('.goals').length==0){
          goalOptions.html('');

          // goalInitialOption = '<option id="no-goal">Select goal</option>';
          // goalOptions.append(goalInitialOption);

        $.getJSON("/projects/"+ projectID +"/goals", function(data){

          if(data.length == 0){
            goalInitialOption = '<option value=0 >Create some goals for the project</option>';
            goalOptions.append(goalInitialOption);
          }else{

            goalInitialOption = '<option value="none">Select goal</option>';
            goalOptions.append(goalInitialOption);
          }

           $.each(data, function(i, goal){
             goalOption = '<option value=' + goal.id+ '>' + goal.name +'</option>';
             goalOptions.append(goalOption); 
        });
           if(goalSet != 0){
            goalOptions.val(goalSet);
           }
         
      });
      // };
    };


      
     
    

      var searchResultsText = function(numberOfTasks, search_type_x){
        // console.log()
        var resultsItem = $('#things h4');
        switch(search_type_x){
          case 0:
           resultsItem.text(numberOfTasks + " jobs sorted by resindex!");
          break;
          case 1:
           resultsItem.text("Top 10 jobs sorted by resindex!");
          break;
          
          case 2:
             resultsItem.text(numberOfTasks + " Trello jobs sorted by resindex!");
          break;

          case 3:
             resultsItem.text(numberOfTasks + " non-trello jobs sorted by resindex!");

          break;


          case 4:

            resultsItem.text("Top 10 Trello jobs sorted by resindex!");

          break;


          case 5:
            resultsItem.text("Top 10 Non-Trello jobs sorted by resindex!");
          break;
        };

      };

  // setup resindex inputs

    $(document.body).on('click', '.viewDetails', function(e){
      
      var taskId = $(this).val();
      // console.log($('.task_description_on_task[value='+taskId+']'))
        if($('.task_description_on_task[value='+taskId+']').hasClass("in-view")){
          // console.log( $('.viewDetails[value='+taskId+']'));
        $('.viewDetails[value='+taskId+']').html('<span class="glyphicon glyphicon-chevron-down"></span>');
        $('.task_description_on_task[value='+taskId+']').slideUp();
        $('.task_description_on_task[value='+taskId+']').toggleClass("in-view");
        $('.saveDescriptionEdit[value='+taskId+']').hide();
        }else{
          // console.log( $('.viewDetails[value='+taskId+']'));

        $('.viewDetails[value='+taskId+']').html('<span class="glyphicon glyphicon-chevron-up"></span>');
        $('.task_description_on_task[value='+taskId+']').slideDown();
        $('.task_description_on_task[value='+taskId+']').toggleClass("in-view");
        $('.saveDescriptionEdit[value='+taskId+']').show();
      };
    });

    $(document.body).on('click', '.saveDescriptionEdit', function(e){
      var taskId = $(this).val();
      $('.task_description_on_task[value='+taskId+']').slideUp();
      $('.task_description_on_task[value='+taskId+']').toggleClass("in-view");
      $('.saveDescriptionEdit[value='+taskId+']').hide();

      updateTask(gon.user_id, taskId)
    });

      $( "#start_date-1" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
      dateFormat: "dd/mm/yy",
      onClose: function( selectedDate ) {
        $( "#end_date-1" ).datepicker( "option", "minDate", selectedDate );
      }
      });

    $( "#end_date-1" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
      dateFormat: "dd/mm/yy",
      onClose: function( selectedDate ) {
        $( "#start_date-1" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  //create a new task



  $(document.body).on('click', '.new-task', function(e){
    e.preventDefault();
    // console.log($(this).val());  
    // console.log("this works!!")    
      validateTaskForm($(this).val());
  
  });

  //record function groupings

  var recordingTimeout = function(){
    // console.log("in recording Timeout function");
  setTimeout(function(){
             // console.log("this works");
            endRecording($this);
           
          // alert("hello")

    }, 2700000);
  };



//this listener listens to event on the .projects class does not work on mobiles or tablets.


  $(document.body).on('click', '.projects', function(e){
    e.preventDefault();
    if(!$('#menu-container').hasClass('frozen')){
          $this = $(this);
          // console.log($this);

          projectID = $this.attr("id");
          // console.log("this is the project ID");
          // console.log($this)

          $('button.new-goal[value='+ projectID + ']').addClass("selectedProject");

          $this.addClass("selectedProject");
          $this.removeClass("well-lg");
          $this.addClass("well-lg");
          $('.projectSel').val(projectID);

          $('.projects:not(.selectedProject)').fadeOut(1000);
          $('.new-goal:not(.selectedProject').fadeOut(1000);
          // console.log();
          // console.log($('.goals').length);

          searchButtonCombinations("clear");


          if($('.goals').length){
            $('.goals:not(selectedGoal)').fadeIn(1000);
             $('.selectedGoal').removeClass("well-lg");
            $('.selectedGoal').addClass("well-lg");
            $('.goals.selectedGoal').removeClass('selectedGoal');
          }else{

        // }
          createGoalsList(projectID);
        };
      };
    });



  var showProjects = function(projectsToShow){
    // console.log(projectsToShow);
    $('.projects').fadeOut();
    $('.new-goal').fadeOut();
    
    $.each(projectsToShow, function(i, project){
      // console.log('.projects[id='+project+']')
      $('.projects[id='+project+']').fadeIn();
      $('.new-goal[value='+project+']').fadeIn();
    });
  };

// This function listens for events on the goals class does not work on mobiles or tablets.

  $(document.body).on('click', '.goals',function(e){
    e.preventDefault();
    if(!$('#menu-container').hasClass('frozen')){
      $this = $(this);
      // console.log($this);

      goalID = $this.attr("id");

      $this.addClass("selectedGoal");

      $this.removeClass("well-lg");

      $this.addClass("well-lg");

      $('.goals:not(.selectedGoal)').fadeOut(1000);
      // $('.new-goal:not(.selectedGoal').fadeOut(1000);
      $('.goalSel').val(goalID);
      searchButtonCombinations("clear");
      createTaskRecord(goalID, 0, -1);
    };
  });


    $(document.body).on('click', '.editButton', function(e){
      e.preventDefault();
      $this = $(this);
      // console.log($this);

      //show task frame

      $('#comments-panel').animate({bottom: "-200px"}, 1000).fadeOut();
      $('#input-panel').animate({top: "0px"},1000).fadeIn();
    
      taskID = $this.parent().parent().attr("id");
      // console.log(data);

      $.getJSON("/users/" + gon.user_id +"/tasks/" + taskID, function(data){
        // console.log(data);

          $('.task-form-header').attr('id', taskID);

        
          $('#estimate-select-1').val(data.estimate);
          $('#difficulty-select-1').val(data.difficulty);
          $('#importance-select-1').val(data.importance);
          $('#project-select').val(data.project_id);
          var startDate = createDate(data.start_date);
          var endDate = createDate(data.end_date);
          $('#start_date-1').val(startDate);
          $('#end_date-1').val(endDate);
          $('#task_title').val(data.card_name);
          $('#task_description').val(data.card_description);
          $('#new-task').text('Update');
          $('#new-task').addClass('update');
          $('.task-form-header').text('Update Task');
            updateGoalList(data.project_id, data.goal_id);  
        });
      });

    var taskInputReset = function(){
      // console.log("in input clear");
      $('.task-form-header').attr('id', '');
         // $('#slider-estimate').slider({value: 5});
         //  $('#hours_estimate').val(5);
         //  $('#slider-difficulty').slider({ value: 3 });
         //  $('#difficulty').val(3);
         //  $('#slider-importance').slider({value: 3});
         //  $('#importance').val(3)
          $('#estimate-select-1').val('none');
          $('#difficulty-select-1').val('none');
          $('#importance-select-1').val('none');
          $('#start_date-1').val('');
          $('#end_date-1').val('');
          // $('#task_title').text(data.card_name);
          $('#task_title').val('');
          $('#task_description').val('');
          $('#new-task').text('Post');
          $('#new-task').removeClass('update');
          $('#new-task').addClass('new-task');
          $('.task-form-header').text('New job')
          // $('#goal-select').fadeOut();
          $('#goal-select').html('');
          $('#goal-select').append('<option value="none">Select a project first</option>');

          $('#goal-select').val('none')
          $('#project-select').val('none')
    };

    var updateGoalList = function(a, goalSet){
      // var a = $('#project-select option:selected').val();
    // var $this = $(this);
    // console.log(a);
    // $('#goal-options').fadeIn();
    createGoalsOptions(a, goalSet);
   };

    $(document.body).on('click', '.today', function(e){
      e.preventDefault();

      // console.log("clicked today button");
      // console.log($(this).val());
      // console.log($(this).attr("class"));
       var taskId = $(this).val();
        var d = new Date;
        var dateDay = d.getDate();
        var dateMonth = d.getMonth() + 1;
        var dateYear = d.getFullYear();
        var dateStart = dateDay +"/" + dateMonth + "/" + dateYear;

      $('#start_date'+taskId).val(dateStart);
      $('#end_date'+taskId).val(dateStart);

      if($('#start_date'+taskId).hasClass("border-red")){
        $('#start_date'+taskId).removeClass("border-red")
      };


      if($('#end_date'+taskId).hasClass("border-red")){
        $('#end_date'+taskId).removeClass("border-red")
      };
    });

       $(document.body).on('click', 'button.tomorrow', function(e){
        e.preventDefault();
      // console.log("clicked tomorrow button");
        var taskId = $(this).val();
        var tomorrow = new Date;
        var d = new Date;
        var dateDay = d.getDate();
        var dateMonth = d.getMonth() + 1;
        var dateYear = d.getFullYear();
        var dateStart = dateDay +"/" + dateMonth + "/" + dateYear;
        tomorrow.setDate(tomorrow.getDate() + 1);

        var dateDayEnd = tomorrow.getDate();
        var dateMonthEnd = tomorrow.getMonth() + 1;
        var dateYearEnd = tomorrow.getFullYear();
        var dateEnd = dateDayEnd + "/" + dateMonthEnd + "/" + dateYearEnd;

        $('#start_date'+taskId).val(dateStart);
        $('#end_date'+taskId).val(dateEnd);

      if($('#start_date'+taskId).hasClass("border-red")){
        $('#start_date'+taskId).removeClass("border-red")
      };


      if($('#end_date'+taskId).hasClass("border-red")){
        $('#end_date'+taskId).removeClass("border-red")
      };
    });

  $(document.body).on('click', 'button.set_dates', function(){

    var taskId = $(this).val();

      $( "#start_date"+taskId ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
      dateFormat: "dd/mm/yy",
      onClose: function( selectedDate ) {
        $( "#end_date"+taskId ).datepicker( "option", "minDate", selectedDate );
      }
      });

    $( "#end_date"+taskId ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
      dateFormat: "dd/mm/yy",
      onClose: function( selectedDate ) {
        $( "#start_date"+taskId ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  });







    $(document.body).on('click', '.recordButton', function(e){
      e.preventDefault();
      var goalId;
      $this = $(this);
      console.log($this.val());
      var taskId = parseInt($this.parent().parent().parent().attr('id'));
      var taskId2 = $this.val();
       console.log(taskId);
       console.log(taskId2);

      if($this.hasClass("recording")){

        endRecording($this);

        goalId = $('.goalSel').val();

        createTaskRecord(goalId, 0, -1)

        // addNewComment(taskId, "effort");
        $('#menu-container').removeClass('frozen');
        ///---hide checklist pane -----////
        hideChecklistPane();
      
      }else{

          taskId = parseInt($this.parent().parent().parent().attr('id'));
          console.log($this.val());
          console.log(taskId);
          userId = gon.user_id;
       

          $this.addClass("recording");

          var commentButtonToKeep = $('.commentButton[value=' + taskId +']');
          var taskPanelToKeep = $('.tpanel[value=' + taskId + ']');
          var editButtonToRemove = $('.editButton[value=' + taskId + ']');


          commentButtonToKeep.addClass("recording");
          taskPanelToKeep.addClass("recording");
          editButtonToRemove.addClass("recording");
          $('#menu-container').addClass('frozen');
          $('.task_description_on_task[value='+ taskId + ']').show();
          $this.parent().parent().parent().addClass("active");
          $this.parent().parent().prepend('<span id="hours"></span><span id="minutes"></span><span id="seconds"></span></p><p>');


          $this.text("End work session");
          //-----show checklist pane----////
          showChecklistPane(taskId);
          showChecklists(taskId);
          record(userId, taskId, 0, -1);
          console.log($this);
          recordingTimeout($this);
          clock();
      };
    });

    


   var endRecording = function(item){

      clearInterval(recordingTimeout);

      taskId = parseInt(item.parent().parent().parent().attr('id'));
      // taskId = parseInt(item.siblings().attr('id'));
      // alert(cardId);

      recordId = parseInt(item.val());

      // $('#minutes').text(0);
      // $('#hours').text(0);
      // $('#seconds').text(0);

      item.removeClass("recording")

      item.parent().parent().parent().removeClass("active");

      item.text("Start work session");
      record(userId, taskId, recordId, -2 );
      toggleNewTaskMenuItem(1);

      stopClock();

    };

    function updateTask(user_id, task_id){
      var data_y = {};
      path = "users/" + gon.user_id + "/tasks/" + task_id;
      method = "PUT"


      // data_y["user_id"] = user_id;
      data_y["id"] = task_id;
      data_y["card_description"] = $('.task_description_on_task[value=' + task_id +']').val();


      $.ajax({
        url: path,
        method: method,
        data: {task: data_y},
        dataType: "json"

      }).success(function(data){

        record(user_id, task_id, recordId, 0)
        // console.log("completed!!");
         // resindexCards();

      });
    }


    function record(userId, taskId, recordId, action){

    var data_x = {};

    if(action === -1 ){
      path = "/time_records";
      method = "POST";
      data_x["state"] = "open";

    } else if (action === -2) {

      path = "/time_records/" + recordId;
      method = "PUT";
      data_x["state"]   = "toallocate";

    }else{
      path = "/time_records/" + recordId;
      method = "PUT";
      data_x["state"]   = "closed";
    };

    data_x["user_id"] = userId;
    data_x["task_id"] = taskId


    // console.log(data_x);
    $.ajax({
      url: path,
      method: method,
      data: {time_record: data_x},
      dataType: "json"
    }).success(function(data){
      // console.log("put data")
      // console.log(data)
      console.log("in success for new time record");
      if(action === -1){
        console.log(data);
        $('.recording').val(data.id);
        // $('.recordButton:not(.recording)').fadeOut();
        $('.tpanel:not(.recording)').fadeOut();
        $('.editButton.recording').fadeOut();
        toggleNewTaskMenuItem(0);
        showCommentPanel(taskId);
        // $('.projects').click(function(){return false;});
        // $('#project-button').off('click');
        // $('.goals').off('click');

      }else if(action === -2){
        $('.recordButton').fadeIn();
        updateTask(data_x.user_id, data_x.task_id);
      }else{
        // console.log("closed and updated")
        refreshTasks();
        showComments(taskId);
        searchButtonCombinations("reset_afer_update");
        stopClock();
      };
    });
  };

var clock = function(){
      var d = new Date;
      var timeStart = d.getTime();
      // console.log(timeStart);
      $('#hours').text('');
      $('#minutes').text('');
      $('#seconds').text('');

      sessionClock = setInterval(function() {
          var x = new Date();
          var timeNow = x.getTime();
          var timeDiff = timeNow - timeStart;

          var days = Math.floor(timeDiff / (1000 * 3600 * 24)); 
          timeDiff = timeDiff - days * (1000 * 3600 * 24)
          var hours = Math.floor(timeDiff / (1000 * 3600 ));
          timeDiff = timeDiff - hours * (1000 * 3600 );
          var minutes = Math.floor(timeDiff / (1000 * 60 ));
          timeDiff = timeDiff - minutes * (1000 * 60 )
          var seconds = timeDiff / (1000 );

          minutes = ' : ' + minutes;
          seconds = ' : ' + parseInt(seconds);
          // console.log("hours : " + hours + "minutes : " + minutes + "seconds : "+ seconds)
          
          $('#hours').text(hours);
          $('#minutes').text(minutes);
          $('#seconds').text(seconds);

    }, 33)
}

  $(document.body).on("click", '.commentButton', function(e){
    e.preventDefault();

     // console.log("new comment button pressed");

    if($('.active').length==0){
     var $this = $(this);
     // $('#taskComment_id').attr("value" )
     console.log($this.val());
     var taskID = $this.val();
   }else{
    console.log("i went here");
   var taskID = $('.active').attr('id');
   };
     console.log(taskID);
     var typeItem;
     var initialCommentType = '<option value="none">Select Note type</option>';
     // console.log(taskID);
        $('.taskComment_id').attr("value", taskID);
        $('#type-select').html('');
        $('#type-select').append(initialCommentType);

      var taskName = $('.task-panel[value='+ taskID+']').text();
        $('#ui-id-1').text('Note for '+taskName);

        $.getJSON("/comment_types", function(data){
          // console.log("comment types");
          // console.log(data);

          $.each(data, function(i, commentType){
            // console.log(commentType.comment_switch);

          if(commentType.comment_switch == "user"){
            // console.log(commentType);

             typeItem = '<option value='+ commentType.id + ' id='+commentType.comment_switch + '>'+ commentType.name +'</option>';
           $('#type-select').append(typeItem);
            };
          });
          
        });

      dialogComment.dialog( "open" );

  });

  var checkComment = function(){
    var foundError = false;
   
      if($('#comment-text').val()==""){
        $('#comment-text').addClass('border-red');
        foundError = true;
      };
      if( $('#type-select option:selected').val()=="none"){
        $('#type-select').addClass('border-red');
        foundError = true;
      };
      return foundError;
  };



    var addNewComment = function(taskId, commentType){
          // console.log("in new comment")
          var commentError = false;
          var newComment = "";
          var commentType;
          var g = new Date();
          var n = g.toString();
          var a = "";
          // var taskID = taskId; //stub
          var userID = gon.user_id; //stub
          
          var dataToSend = {};

          // console.log(taskId);

          if(commentType === "none"){
            var x = checkComment();
              if(!x){
              
            newComment = $('#comment-text').val();
            commentType = $('#type-select option:selected').val();
            }
          }else{
        
         switch(commentType){
            case "effort":
              newComment = "Effort added";
              commentType = 6;
              break;
            case "resindex":
              newComment = "Resindex change";
              commentType = 8;
          
              };
          };
          if(!x){

           a = newComment + "<p><sub> logged by: " + username +" at " + n + " </sub></p>";
            newComment = a;

             // var commentType = $('#type-select option:selected').val();

          // console.log(newComment.text)
          // $scope.newComment = $scope.newComment + ":created at "+ n;

          path = "/tasks/"+ taskId +"/comments";
          console.log('path of comment' + path);
          method = "POST";
          dataToSend["ctext"] = newComment; 
          dataToSend["task_id"] = taskId;
          dataToSend["user_id"] = userID;
          dataToSend["comment_type_id"] = commentType;

          // console.log(dataToSend);

          $.ajax({
          url: path,
          method: method,
          data: {comment: dataToSend},
          dataType: "json"
          })
          afterCommentCreate(taskId)
          //   console.log("in success function");
          // showComments(taskId);
          // dialogComment.dialog("close");
          // $('#comment-text').val("");
          // $('#type-select option:selected').val("none");
          
          };
        };

        var afterCommentCreate = function(taskId){
              // console.log("in success function");
          showComments(taskId);
          dialogComment.dialog("close");
          $('#comment-text').val("");
          $('#type-select option:selected').val("none");
        }
      

var stopClock = function(){
  clearInterval(sessionClock);

}

var addProject = function(){
  console.log("in add project");

  if($('#project-name').val()==""){

    $('#project-name').addClass('border-red');

    // }else if($('#first-goal-name').val()==""){

    // $('#goal-name').addClass('border-red');

  }else{

  // console.log("added new project");

    path = "/users/" + gon.user_id+ "/projects";
    method = "POST";

    var data_project = {};
    var goalName;
    var timeOfProjectCreation;

    data_project["name"] = $('#project-name').val();
    goalName = $('#first-goal-name').val();
    $.ajax({ 
          url: path, 
          method: method,
          data: {project: data_project}
          // dataType: "json"
    }).success(function(){
       // createFirstGoal(goalName);
       createGoals(goalName);

    });
      // setTimeout(function(){createFirstGoal(goalName)},1000);
  };
};

  var createGoals = function(goalName){
    createFirstGoal(goalName, 0);
    createFirstGoal("unassigned", 1);
  };


  var createFirstGoal = function(goalName, firstGoal){
    var data_goal = {};
    var project_id;

    $.getJSON("/get_last_project", function(data){
      console.log(data);
    
      // var goal_data = {};

      project_id = data.id

      data_goal["project_id"] = data.id;
  

      data_goal["name"] = goalName;

      console.log(data_goal);
      // goal_data["name"] = $('#first-goal-name').val();

      // console.log($('#first-goal-name').val());

      var path = "/projects/" + project_id + "/goals";
      var method = "POST";
  

    // console.log(data);
      $.ajax({ 
            url: path, 
            method: method,
            data: {goal: data_goal},
            dataType: "json"
      }).done(function(){
        if(firstGoal == 0){
          dialog.dialog("close");
          $('#project-name').val('');
          $('#first-goal-name').val('');
        };
      });
    });
  };


var addGoal = function(){

  // console.log("added new goal");
  if($('#goal-name').val()==""){
    // console.log("this fails");
    $('#goal-name').addClass('border-red');
    }else{

    data = {};

  var project_id = $('.goalproject_id').attr("id");

    // console.log("project id is" + project_id);

    data["project_id"] = $('.goalproject_id').attr("id");

    data["name"] = $('#goal-name').val();

    path = "/projects/" + project_id + "/goals";
    method = "POST";

  // console.log(data);
  $.ajax({ 
        url: path, 
        method: method,
        data: {goal: data},
        dataType: "json"
      }).success(function(){

          dialogGoal.dialog("close");
          $('#goal-name').val('');
          // $('#menu-container').html('');
        if($('.project'+project_id).length==0){
          console.log("in here");
          console.log(project_id);
          var project_ids = [];
          
          project_ids.push(project_id);
      
          showProjects(project_ids);
          createGoalsList(project_id);
        }else{
          createGoalsList(project_id);
        };
      });
    };
  };


dialogComment = $( "#new-comment-modal" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Add new comment": function(){
        var taskId = $('.taskComment_id').val();
        addNewComment(taskId, "none");
        },
        Cancel: function() {
          dialogComment.dialog( "close" );
          $('#comment-text').val("");
          $('#type-select option:selected').val("none");

        }
      },
      close: function() {
        dialogComment.dialog("close"); 
          $('#comment-text').val("");
          $('#type-select option:selected').val("none");
        // form[ 0 ].reset();
        // allFields.removeClass( "ui-state-error" );
      }
    });


dialogGoal = $( "#new-goal-modal" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Add new goal": function(){
          addGoal();
        },
  
        Cancel: function() {
          dialogGoal.dialog( "close" );
        }
      },
      close: function() {
        dialogGoal.dialog("close"); 
        // form[ 0 ].reset();
        // allFields.removeClass( "ui-state-error" );
      }
    });

dialog = $( "#new-project-modal" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Save project": addProject,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        dialog.dialog("close"); 
        // form[ 0 ].reset();
        // allFields.removeClass( "ui-state-error" );
      }
    });

// createProjectList();



$(document.body).on('click', '.viewNotesButton', function(e){
  e.preventDefault();

if($('.active').length == 0){
    $this = $(this);
// console.log($this);
    var taskId = $this.parent().first().attr("value");
  }else{
    var taskId = $('.active').attr('id');
  };


// $('#input-panel').animate({bottom: "-200px"}, 500).fadeOut();
// $('#comments-panel').animate({top: "0px"}, 500).fadeIn();
showCommentPanel(taskId);
// var taskId = $this.children().children().first().attr("value");
// console.log(taskId);

// showComments(taskId);

});

var toggleNewTaskMenuItem = function(switchInt){

    if(switchInt == 0){
      $('#blank_task').hide();
    }else{
      $('#blank_task').show();
    };

};


var showCommentPanel = function(taskId){
$('#input-panel').animate({bottom: "-200px"}, 500).fadeOut();
$('#comments-panel').animate({top: "0px"}, 500).fadeIn();
showComments(taskId);
};

$('#menu-new-project').click(function(e){
  e.preventDefault();
  // console.log("new project button pressed")
      dialog.dialog( "open" );

});

 $( "#new-project" ).click(function(e) {
  e.preventDefault();
  // console.log("new project button pressed")
      dialog.dialog( "open" );
    });

 $(document.body).on('click', 'button.new-goal', function(e) {
  // console.log("new goal button pressed")
  e.preventDefault();
  $this = $(this);
 var projectGoalId = $this.val();
  // console.log("project id is" + projectGoalId);
  
  $('.goalproject_id').attr("id", projectGoalId );
      dialogGoal.dialog( "open" );
  });

    $(document.body).on('click', '#refresh', function(e){
      e.preventDefault();
      taskInputReset();   
    });

// $('#input-panel').animate({bottom: "-200px"}, 1000).fadeOut();
// $('#comments-panel').animate({top: "0px"},3000);

// createTaskRecord();
// clock();
// createProjectList(1);
$('#comments-panel').hide();

    $('#trello_search').click(function(e){
      e.preventDefault();
    // console.log("in trello easy !!");
    var searchStringTo = $(this).attr("id");
    // createTaskRecord(0, 3);
    searchButtonCombinations(searchStringTo);
  });

      $('#top10').click(function(e){
        e.preventDefault();
    // console.log("in top10 easy !!");
    var searchStringTo = $(this).attr("id");
    // createTaskRecord(0, 3);
    searchButtonCombinations(searchStringTo);
  });


  $('#non_trello_search').click(function(e){
    e.preventDefault();
    // console.log("in non_trello easy !!");
    var searchStringTo = $(this).attr("id");
    // createTaskRecord(0, 3);
    searchButtonCombinations(searchStringTo);
  });

  var searchButtonsTest = function(){
    var trelloSearchStatus = $("#trello_search").hasClass("btn-danger");
    var nonTrelloSearchStatus = $("#non_trello_search").hasClass("btn-danger");
    var top10Status = $("#top10").hasClass("btn-danger");

     if(trelloSearchStatus == false && top10Status == false && nonTrelloSearchStatus==false){
      return true;
      }else{
      return false;
      };
    };

    var searchButtonCombinations = function(searchString){
       console.log("checking combinations....");
      if(searchString != "reset_afer_update"){
        $("#" + searchString).toggleClass("btn-danger");
      };

      console.log("checking combinations....");

   
      var trelloSearchStatus = $("#trello_search").hasClass("btn-danger");
      var nonTrelloSearchStatus = $("#non_trello_search").hasClass("btn-danger");
      var top10Status = $("#top10").hasClass("btn-danger");

      // console.log("top10 " + top10Status + " trello " + trelloSearchStatus + "nontrello " + nonTrelloSearchStatus);

      // console.log("checking combinations....");
      // console.log(nonTrelloSearchStatus);

      if(trelloSearchStatus == false && top10Status == false && nonTrelloSearchStatus==false){

        // console.log("this will clear the panel");
        $("#task-list-group").html("");
        $('#things h4').text("Jobs to do...")

      }else{
    
        switch(searchString){
          case "non_trello_search":

            if(trelloSearchStatus == true){
              $("#trello_search").removeClass("btn-danger");
              trelloSearchStatus == false;
            };

              if(top10Status==true && nonTrelloSearchStatus == false){
                createTaskRecord(-1, 1, -1);
              };
            

            if(top10Status == true && nonTrelloSearchStatus == true ){
              // console.log("top 10 and non trello")
              createTaskRecord(-1, 5, -1);
            }else if(nonTrelloSearchStatus== true){
              // console.log("passed conditions");
              createTaskRecord(-1, 3, -1);
            };
          break;

          case "trello_search":

            if(nonTrelloSearchStatus == true  && trelloSearchStatus== true){
              $("#non_trello_search").removeClass("btn-danger");
              nonTrelloSearchStatus == false;
          
            };
              if(top10Status==true && trelloSearchStatus== false){
                console.log("top 10 only");
                createTaskRecord(-1, 1, -1);
              };
          

            if(top10Status == true && trelloSearchStatus == true ){
              console.log("top 10 and  trello")
              createTaskRecord(-1, 4, -1);
            }
            if(trelloSearchStatus == true && top10Status== false){
              console.log("trello only");
              createTaskRecord(-1, 2, -1);
            };
          break;

          case "top10":

           if(top10Status == true && nonTrelloSearchStatus == false && trelloSearchStatus == false){
              console.log("just top10");
              createTaskRecord(-1, 1, -1);
            }else{
              if(nonTrelloSearchStatus == true){
                createTaskRecord(-1, 3,-1);
              }else{
                createTaskRecord(-1, 2, -1);
              };
            }
        
            if(nonTrelloSearchStatus == true && top10Status == true ){
              console.log("top 10 and non trello")
              createTaskRecord(-1, 5, -1);
            };

              if(trelloSearchStatus == true && top10Status == true ){
              console.log("top 10 and trello")
              createTaskRecord(-1, 4, -1);
            };
          break;
          case "reset_afer_update":
            if(top10Status == true && trelloSearchStatus == false && nonTrelloSearchStatus== false){
               createTaskRecord(-1, 1, -1);
            }else if(top10Status == true && trelloSearchStatus == true && nonTrelloSearchStatus== false){
              createTaskRecord(-1, 4, -1);
            }else if(top10Status == true && trelloSearchStatus == false && nonTrelloSearchStatus== true){
              createTaskRecord(-1, 5, -1);
            }else if(top10Status == false && trelloSearchStatus == false && nonTrelloSearchStatus== true){
                 createTaskRecord(-1, 3, -1);
            }else{
              createTaskRecord(-1, 2, -1);
            };
            break;

          case "clear":
            if(top10Status == true){
              $("#top10").removeClass("btn-danger");
            };
            if(trelloSearchStatus == true){
              $("#trello_search").removeClass("btn-danger");

            };
            if(nonTrelloSearchStatus==true){
              $("#non_trello_search").removeClass("btn-danger");

            };
            break;
          };
        };
      // };


    if($(".trello_message").text() == "Get your Trello boards"){
      // console.log("configuring home page");
      $('#trello_search').fadeOut();
      $('#non_trello_search').text("Show all cards");
     };
     refreshUserProjectInfo();
    };



    var createHeatMap = function(){
      $.getJSON("/users/"+gon.user_id+"/tasks", function(data){

        console.log(data);
      });
    };
  }else{
    //////--------------------mobile functionality------------------//////

    ////////----------------Add new task on Mobile------------/////
 



    $('.clock').hide();
    var tasksUrl;


    $(document.body).on('click', '.mobile-add', function(){

      var data_mt;

      data_mt = {};
      data_mt["card_name"] = $('.mobile-task-name').val();
      data_mt["project_id"] = $('#projectShown').val();
      data_mt["goal_id"] = $('#goalShown').val();


      console.log(data_mt);

      $.ajax({
        url: "/users/" + gon.user_id +"/tasks",
        method: "POST",
        data: {task: data_mt}

      }).success(function(){
        $('.mobile-task-name').val("");
        showMobileTasks(tasksUrl);
      });

    });

/////----------------show tasks--------------------/////

  var hideMobileNewTask = function(){
    $('#add-task').fadeOut();

  };

  var showMobileNewTask = function(){
    $('#add-task').fadeIn();
  };



  var showMobileTasks = function(tasksUrl){

    // $('#mobile-list').html("");

    $('#mobile-list').html("");
    $('#mobile-task-details').html('');
    // showMobileNewTask();


      $.ajax({

      url: tasksUrl,
      method: "GET",
      dataType: "json"

      }).done(function(data){


    // $.getJSON("/users/"+gon.user_id+"/tasks", function(data){
    //   console.log(data);

        var taskItem;
        var mobileList = $('#mobile-list');
        var mobileListCompleted = $('#mobile-list-completed');

        mobileList.html("");
        mobileListCompleted.html("");
        mobileListCompleted.append('<p>Completed</p>')

        $.each(data, function(i, task){

          if (task.effort !=0 ){
              effortMins = parseInt(task.effort * 60);
                if(effortMins > 1){
                effortHours = parseInt(effortMins / 60);
                newEffortMins = effortMins - (effortHours * 60);
                }else{
                  effortHours = 0;
                  newEffortMins = effortMins;
                }
            }else{
              effortHours = 0;
              newEffortMins = 0;
            };

            if (newEffortMins < 10){
              newEffortMins.toString();
              newEffortMins = "0" + newEffortMins;
              // console.log(newEffortMins);
            }

            if(task.completed ==true){

              taskItem = '<div class="well well-lg well-task-container well-task'+task.id+'"><div class= "well well-lg mobile-task mobile-thing'+task.id+'"><a href="#" class="mobile-link" style="text-decoration:line-through" value='+task.id+'>' + task.card_name + '</a><span class="pull-right">Hours : '+effortHours+' Minutes : '+newEffortMins+' </span></div><div><button class="btn btn-sm pull-right mobile-complete" value='+task.id+'><span class="glyphicon glyphicon-remove"></span></button></div></div>';

              mobileListCompleted.append(taskItem);

            }else{

          taskItem = '<div class="well well-lg well-task-container well-task'+task.id+'"><div class= "well well-lg mobile-task mobile-thing'+task.id+'"><a href="#" class="mobile-link" value='+task.id+'>' + task.card_name + '</a><span class="pull-right">Hours : '+effortHours+' Minutes : '+newEffortMins+' </span></div><div><button class="btn btn-sm pull-right recordButton" value='+task.id+'><span class="glyphicon glyphicon-time"></span></div><div></button><button class="btn btn-sm pull-right mobile-completed" value='+task.id+'><span class="glyphicon glyphicon-ok"></span></button></div></div>';

          mobileList.append(taskItem);
        };
        });
      });
    };



    $(document.body).on('click', '.mobile-completed', function(){
      var $this = $(this);
      var taskId = $this.attr("value");
      var data_comp = {};

      $this.html('<span class="glyphicon glyphicon-remove"></span>');
      $('.well-task'+taskId).fadeOut();

      data_comp["completed"] = true;

      $.ajax({
        url: "/users/" + gon.user_id + "/tasks/"+taskId,
        method: "PUT",
        data: {task: data_comp}
      }).success(function(data){

      showMobileTasks(tasksUrl);
    });
      ///---more complex need to DRY up the code.
    });

    $(document.body).on('click', '.mobile-complete', function(){
      var $this = $(this);
      var taskId = $this.attr("value");
      var data_comp = {};

      $this.html('<span class="glyphicon glyphicon-ok"></span>');
      $('.well-task'+taskId).fadeOut();

      data_comp["completed"] = false;

      $.ajax({
        url: "/users/" + gon.user_id + "/tasks/"+taskId,
        method: "PUT",
        data: {task: data_comp}
      }).success(function(data){
          showMobileTasks(tasksUrl);
      });
    });


  
    $(document.body).on("click", ".mobile-goals", function(){
      // alert("woooow!")
     var  projectId = $('#projectShown').val();
     var goalsUrl = "/projects/"+projectId +"/goals";
      showMobileGoals(goalsUrl);
      // showMobileTasks(tasksUrl);
      hideMobileNewTask();
      $('.mobile-goal').fadeOut();
      $('#add-project').fadeOut();
    });
  
/////-------show task----------------/////

$(document.body).on('click', '.mobile-link',function(){
  $this = $(this);
  var taskId = $this.attr("value");
  var mobileList = $('#mobile-list');
  var mobileTaskDetails = $('#mobile-task-details');
  hideMobileNewTask();

  mobileTaskDetails.html('');

  console.log(taskId);

  $('.well-task'+taskId).addClass("selected");
  $('.well-task-container:not(.selected)').fadeOut();
  $('#mobile-list-completed').hide();

  var commentsList = '<a href="#" id="task-comments" value='+taskId+'><div class="well well-lg">Comments</div></a>';
  var timeRecords = '<a href= "#" id="taskTimeRecords" value='+taskId+'><div class="well well-lg">Time Records</div></a>';

  mobileTaskDetails.append(commentsList);
  mobileTaskDetails.append(timeRecords);

});

$(document.body).on('click', '#task-comments',function(){
  $this = $(this);
  var taskId = $this.attr("value");

 if($('.taskComments').length == 0){
  console.log(taskId)

  $.ajax({
    url: "/users/"+gon.user_id+"/tasks/"+taskId,
    method: "GET",
    dataType: "json"

  }).success(function(data){
    $('#taskTimeRecords').fadeOut();
    console.log(data["comments"])
    var commentsToShow = data["comments"];

    // console.log(commentsToShow);
    showComments(commentsToShow);

  });
  };
})


var showComments = function(commentsToShow){
  $("#taskTimeRecords").fadeOut();
  console.log(commentsToShow)

  $.each(commentsToShow, function(i, comment){
    var commentItem = '<div class="well well-lg taskComments">'+comment.ctext+'</div>';
      $('#mobile-task-details').append(commentItem);
  });
};

///-----create mobile versions of recordButton start and end process-----////

var recordingControl = function(buttonPressed){
  $this = buttonPressed;
   
      console.log($this.val());
     
      var taskId2 = $this.val();
   
       console.log(taskId2);

      if($('.well-task'+taskId2).hasClass("recording")){

        endRecording($this);
        showMobileNewTask();

    }else{

        
          taskId = $this.val();
          console.log(taskId);
          userId = gon.user_id;
       

          $('.well-task'+taskId).addClass("recording");


          $('.clock').show();

          $('.mobile-task')


      
          mobileRecord(userId, taskId, 0, -1);
          console.log($this);
          hideMobileNewTask();
      
          $('.stop-clock-button').attr("value", taskId);
          clock();        
    };
  };


$(document.body).on('click', '.stop-clock-button', function(e){
  e.preventDefault();

  var buttonPressed = $(this);

  recordingControl(buttonPressed);

});

  

  $(document.body).on('click', '.recordButton', function(e){
      e.preventDefault();
     
    var buttonPressed = $(this);
     

      recordingControl(buttonPressed);
    });

    


    var endRecording = function(item){

      clearInterval(recordingTimeout);

      taskId = parseInt(item.val());
      // taskId = parseInt(item.siblings().attr('id'));
      // alert(cardId);

      recordId = parseInt($('.mobile-thing'+taskId).val());

      // $('#minutes').text(0);
      // $('#hours').text(0);
      // $('#seconds').text(0);

      $('.well-task'+taskId).removeClass("recording")

      // item.parent().parent().parent().removeClass("active");

      // item.text("Start work session");
      mobileRecord(userId, taskId, recordId, -2 );
      // toggleNewTaskMenuItem(1);

      stopClock();

    };

    ////-----------Time record control function ----------------/////


    function updateTask(user_id, task_id){
      var data_y = {};
      path = "users/" + gon.user_id + "/tasks/" + task_id;
      method = "PUT"

      data_y["id"] = task_id;
      // data_y["card_description"] = $('.task_description_on_task[value=' + task_id +']').val();


      $.ajax({
        url: path,
        method: method,
        data: {task: data_y},
        dataType: "json"

      }).success(function(data){

        mobileRecord(user_id, task_id, recordId, 0)
        // console.log("completed!!");
         // resindexCards();

      });
    };


    function mobileRecord(userId, taskId, recordId, action){

    var data_x = {};

    if(action === -1 ){
      path = "/time_records";
      method = "POST";
      data_x["state"] = "open";

    } else if (action === -2) {

      path = "/time_records/" + recordId;
      method = "PUT";
      data_x["state"]   = "toallocate";

    }else{
      path = "/time_records/" + recordId;
      method = "PUT";
      data_x["state"]   = "closed";
    };

    data_x["user_id"] = userId;
    data_x["task_id"] = taskId


    // console.log(data_x);
    $.ajax({
      url: path,
      method: method,
      data: {time_record: data_x},
      dataType: "json"
    }).success(function(data){
      // console.log("put data")
      // console.log(data)
      if(action === -1){
        console.log(data);
        $('.mobile-thing'+taskId).val(data.id);
        // console.log("time record "+ data.id)
        $('.well-task-container:not(.recording)').fadeOut();
        // $('.tpanel:not(.recording)').fadeOut();
        // $('.editButton.recording').fadeOut();
        // toggleNewTaskMenuItem(0);
        // showCommentPanel(taskId);
        // $('.projects').click(function(){return false;});
        // $('#project-button').off('click');
        // $('.goals').off('click');

      }else if(action === -2){
        $('.recordButton').fadeIn();
        updateTask(data_x.user_id, data_x.task_id);
      }else{
        console.log("closed and updated")
        // refreshTasks();
        // showComments(taskId);
        // searchButtonCombinations("reset_afer_update");
        stopClock();
      };
    });
  };

    ////--------------------end of time recording--------///////

 ///////////---------------mobile clock start and stop------------------//////////

  var clock = function(){
      var d = new Date;
      var timeStart = d.getTime();
      // console.log(timeStart);
      $('#hours').text('');
      $('#minutes').text('');
      $('#seconds').text('');

      sessionClock = setInterval(function() {
          var x = new Date();
          var timeNow = x.getTime();
          var timeDiff = timeNow - timeStart;

          var days = Math.floor(timeDiff / (1000 * 3600 * 24)); 
          timeDiff = timeDiff - days * (1000 * 3600 * 24)
          var hours = Math.floor(timeDiff / (1000 * 3600 ));
          timeDiff = timeDiff - hours * (1000 * 3600 );
          var minutes = Math.floor(timeDiff / (1000 * 60 ));
          timeDiff = timeDiff - minutes * (1000 * 60 )
          var seconds = timeDiff / (1000 );

          minutes = ' : ' + minutes;
          seconds = ' : ' + parseInt(seconds);
          // console.log("hours : " + hours + "minutes : " + minutes + "seconds : "+ seconds)
          
          $('#hours').text(hours);
          $('#minutes').text(minutes);
          $('#seconds').text(seconds);

    }, 33)
  }

  var stopClock = function(){
    clearInterval(sessionClock);
    $('.clock').hide();
    showMobileTasks(tasksUrl);
  }


//////-------------------end of clock functionality--------------------//////////

/////-------projects--------------/////


////---------create project----------/////

$(document.body).on("click", ".mobile-add-project", function(){

  var mobileListCompleted = $('#mobile-list-completed');

  mobileListCompleted.html("");

  $('#mobile-task-details').html('');

// $(document.body).on("click", ".mobile-add-project", function(){

  var project_data ={};

  project_data["name"] = $(".mobile-project-name").val();

  $.ajax({
    url: "users/"+gon.user_id+"/projects",
    method: "POST",
    data: {project: project_data}
   
  }).success(function(){
    console.log("success");
    showProjects();
    $('.mobile-project-name').val('');
  });

});

//----------Show the list of projects--------////

$(document.body).on('click', '.mobile-projects', function(){
  showProjects();
});

var showProjects = function(){
var projectItem;
var mobileListCompleted = $('#mobile-list-completed');

$('#add-project').fadeIn();

  mobileListCompleted.html("");

  $('#mobile-task-details').html('');

  $.ajax({

    url: "users/"+gon.user_id+"/projects",
    method: "GET",
    dataType: "json"
  }).success(function(data){
    console.log(data);
     $('#mobile-list').html('');
     $('#mobile-list-completed').html('');
    $.each(data, function(i, project){
      
      projectItem = '<a href="#" class="mobile-project-link" value='+project.id+'><div class="well well-lg mobile-project" >'+project.name+'<p><sm><span>Completed Tasks : Tasks Left </sm></span></p></div></a>';

      $('#mobile-list').append(projectItem);
    });
  });
};
///---------end of show projects--------///

////------show goals ----////
var showMobileGoals = function(goalsUrl){
var goalItem;
var mobileListCompleted = $('#mobile-list-completed');

// $('#add-project').fadeIn();

  mobileListCompleted.html("");

  $('#mobile-task-details').html('');

  $.ajax({

    url: goalsUrl,
    method: "GET",
    dataType: "json"
  }).success(function(data){
    console.log(data);
     $('#mobile-list').html('');
     $('#mobile-list-completed').html('');
    $.each(data, function(i, goal){
      
      goalItem = '<a href="#" class="mobile-goal-link" value='+goal.id+'><div class="well well-lg mobile-goal" >'+goal.name+'</div></a>';

      $('#mobile-list').append(goalItem);
    });
  });
};

//Listener to show the task associated with this project.


$(document.body).on('click', '.mobile-project-link', function(){
  // console.log($(this).attr("value"));
  var projectId = $(this).attr("value");
    $("#add-project").fadeOut();
    showMobileNewTask();
    $('#projectShown').attr("value", projectId)

  // tasksUrl = "/mobile_projects?projectId="+projectId;
  var goalsUrl = "/projects/"+ projectId + "/goals"

  $("#add-project").fadeOut();

  showMobileGoals(goalsUrl);

  // showMobileTasks(tasksUrl);
});


$(document.body).on('click', '.mobile-goal-link', function(){
  
  var goalId = $(this).attr("value");
  // var goalname = $(this).children().text();
  // console.log(goalname);
    showMobileNewTask();
    $('#goalShown').attr("value", goalId);
    $('.mobile-goals').attr("value", goalId);
    // $('.mobile-goals').text()
    $('.mobile-goals').fadeIn();

   tasksUrl = "/mobile_projects?goalId="+goalId;
  // var goalsUrl = "/projects/"+ projectId + "/goals"

  $("#add-project").fadeOut();

  showMobileTasks(tasksUrl);

  // showMobileTasks(tasksUrl);
});


var mobileInitialize = function(){

  showProjects();
}

    // hideMobileNewTask();
mobileInitialize();

}////--------------end of mobile----------------//////////
  /////-------------------end of main--------------//////////////////

};
$(document).ready(function(){
 // debugger; 
if(gon.user_id >= 1){

  main();
}
    // showImportances(-1, importances);
});
